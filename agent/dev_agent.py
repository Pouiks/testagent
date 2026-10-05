"""Agent développeur : prend un ticket Trello, le fait réaliser par Claude Code, ouvre une PR."""
import os
import subprocess
import requests

API = "https://api.trello.com/1"
AUTH = {"key": os.environ["TRELLO_KEY"], "token": os.environ["TRELLO_TOKEN"]}
LIST_AGENT = os.environ["LIST_AGENT"]
LIST_EN_COURS = os.environ["LIST_EN_COURS"]
LIST_REVUE = os.environ["LIST_REVUE"]
LIST_HUMAIN = os.environ["LIST_HUMAIN"]
BASE = os.environ.get("BASE_BRANCH", "master")


# ---------- Petits outils ----------

def trello(method, path, **params):
    r = requests.request(method, f"{API}{path}", params={**AUTH, **params}, timeout=30)
    r.raise_for_status()
    return r.json() if r.text else None


def deplacer(card_id, list_id):
    trello("PUT", f"/cards/{card_id}", idList=list_id)


def commenter(card_id, texte):
    trello("POST", f"/cards/{card_id}/actions/comments", text=texte)


def sh(*cmd):
    print("$", cmd[0], cmd[1] if len(cmd) > 1 else "")
    subprocess.run(cmd, check=True)


def sh_ok(*cmd):
    return subprocess.run(cmd, capture_output=True, text=True).returncode == 0


# ---------- Le travail ----------

def traiter(card):
    card_id = card["id"]
    branche = f"ticket-{card['shortLink']}"

    # 1. On repart toujours d'une base propre, puis on reprend la branche du ticket
    #    si elle existe (retour du relecteur) ou on en crée une nouvelle
    sh("git", "checkout", "-f", BASE)
    sh("git", "reset", "--hard", f"origin/{BASE}")
    sh("git", "clean", "-fd")
    if sh_ok("git", "ls-remote", "--exit-code", "--heads", "origin", branche):
        sh("git", "checkout", branche)
    else:
        sh("git", "checkout", "-b", branche)

    # 2. Commentaires de la carte = retours éventuels du relecteur
    actions = trello("GET", f"/cards/{card_id}/actions", filter="commentCard")
    historique = "\n".join(f"- {a['data']['text']}" for a in reversed(actions))

    # 3. On confie le ticket à Claude Code
    prompt = f"""Tu es le développeur de ce projet. Réalise le ticket suivant.

Titre : {card['name']}

Description :
{card['desc'] or '(aucune)'}

Historique des commentaires du ticket (s'il contient des retours du relecteur, corrige-les en priorité) :
{historique or '(aucun)'}

Respecte les règles de CLAUDE.md. Écris ou mets à jour les tests et vérifie qu'ils passent.
Ne fais ni commit ni push : le script s'en charge."""

    sh("claude", "-p", prompt, "--allowedTools", "Read,Write,Edit,Glob,Grep,Bash",
       "--output-format", "stream-json", "--verbose")

    # 4. Commit et push
    sh("git", "add", "-A")
    if sh_ok("git", "diff", "--cached", "--quiet"):
        raise RuntimeError("Claude Code n'a produit aucune modification.")
    sh("git", "commit", "-m", f"{card['name']} (Trello {card['shortLink']})")
    sh("git", "push", "-u", "origin", branche)

    # 5. PR : on la crée si elle n'existe pas encore
    pr = subprocess.run(["gh", "pr", "view", branche, "--json", "url", "-q", ".url"],
                        capture_output=True, text=True)
    if pr.returncode == 0:
        url = pr.stdout.strip()
    else:
        corps = f"Ticket Trello : {card['shortUrl']}\n\nTrello-Card: {card_id}"
        url = subprocess.run(["gh", "pr", "create", "--title", card["name"], "--body", corps,
                              "--head", branche], check=True, capture_output=True, text=True).stdout.strip()

    # 6. Carte en revue
    deplacer(card_id, LIST_REVUE)
    commenter(card_id, f"🤖 Agent développeur : PR prête pour relecture → {url}")


def main():
    echecs = 0
    while True:
        # On relit la colonne à chaque tour : des cartes ont pu être ajoutées entre-temps
        cartes = trello("GET", f"/lists/{LIST_AGENT}/cards")
        if not cartes:
            print("Plus aucun ticket à traiter.")
            break

        carte = cartes[0]  # la carte du haut de la colonne passe en premier
        print(f"\n===== Ticket pris en charge : {carte['name']} =====")
        deplacer(carte["id"], LIST_EN_COURS)

        try:
            traiter(carte)
        except Exception as e:
            echecs += 1
            print(f"Échec sur ce ticket : {e}")
            deplacer(carte["id"], LIST_HUMAIN)
            commenter(carte["id"], f"🤖 Agent développeur : échec, intervention humaine nécessaire.\n{e}")
            # on passe au ticket suivant au lieu de tout arrêter

    if echecs:
        raise SystemExit(f"{echecs} ticket(s) en échec, voir la colonne Besoin d'un humain.")


if __name__ == "__main__":
    main()