# CLAUDE.md

Ce fichier donne le contexte nécessaire pour travailler sur ce projet.

## Stack

- [NestJS](https://nestjs.com/) 11 (Node.js, TypeScript) — backend, sert l'app
  et un petit endpoint `/health`
- Express comme adaptateur HTTP (par défaut avec Nest)
- `client/` — frontend React 19 + Vite + TypeScript (l'outil CDP : sidebar +
  pages dédiées), buildé en statique et servi par Nest
- [shadcn/ui](https://ui.shadcn.com/) (Base UI + Tailwind CSS v4) pour les
  composants d'interface (`client/src/components/ui`)
- React Router pour la navigation entre les pages du menu
- Jest + Supertest pour les tests backend (unitaires et end-to-end)
- Vitest + React Testing Library pour les tests frontend
- ESLint + Prettier (backend) et oxlint (frontend) pour le linting

Node.js 20+ est requis.

## Structure

- `src/main.ts` — point d'entrée, démarre le serveur HTTP
- `src/app.module.ts` — module racine, sert les fichiers statiques de
  `client/dist` via `ServeStaticModule`
- `src/app.controller.ts` — route `GET /health` (santé de l'API) et route
  joker `GET /{*path}` qui renvoie `client/dist/index.html` (fallback SPA pour
  le routing côté client)
- `test/app.e2e-spec.ts` — tests end-to-end des routes `/health`, `/` et du
  fallback SPA

- `client/src/App.tsx` — déclaration des routes (React Router)
- `client/src/layouts/app-layout.tsx` — layout global (sidebar + zone de
  contenu)
- `client/src/components/app-sidebar.tsx` — sidebar avec les 5 boutons de
  menu, chacun indépendant et menant à sa propre page
- `client/src/lib/nav-items.ts` — liste des entrées du menu (titre, URL,
  icône)
- `client/src/pages/` — une page dédiée par entrée du menu (Dashboard,
  Profils clients, Segments, Sources de données, Intégrations), avec du
  contenu représentatif d'une Customer Data Platform

## Comportement de l'application

Pulse CDP est un outil de Customer Data Platform de démonstration. La sidebar
expose 5 boutons de menu indépendants, chacun menant à sa page dédiée :

1. **Tableau de bord** (`/`) — vue d'ensemble (profils, segments, événements,
   intégrations)
2. **Profils clients** (`/profiles`) — vue unifiée (360°) des clients
3. **Segments** (`/segments`) — audiences dynamiques
4. **Sources de données** (`/sources`) — flux d'événements entrants
5. **Intégrations** (`/integrations`) — destinations connectées

Le backend NestJS sert le frontend buildé (`client/dist`) en statique sur
`GET /` et retombe sur `index.html` pour toute route non-API (nécessaire pour
le routing côté client de React Router), afin que les URLs comme
`/profiles` fonctionnent aussi en accès direct.

## Commandes

Installation (backend puis frontend) :
```bash
npm install
npm --prefix client install
```

Lancement en développement :
```bash
# Terminal 1 — frontend avec rechargement à chaud (http://localhost:5173)
npm --prefix client run dev

# Terminal 2 — backend NestJS (http://localhost:3000)
npm run start:dev
```

Build complet (frontend puis backend) et lancement en production :
```bash
npm run build
npm run start:prod
```

Le serveur Nest sert l'app buildée et écoute sur `http://localhost:3000` par
défaut (configurable via la variable d'environnement `PORT`).

Tests unitaires backend :
```bash
npm test
```

Tests end-to-end backend (build le frontend au préalable) :
```bash
npm run test:e2e
```

Tests frontend :
```bash
npm run test:client
```

Lint backend :
```bash
npm run lint
```

Lint frontend :
```bash
npm --prefix client run lint
```
