# CLAUDE.md

Ce fichier donne le contexte nécessaire pour travailler sur ce projet.

## Stack

- [NestJS](https://nestjs.com/) 11 (Node.js, TypeScript) — framework backend
- Express comme adaptateur HTTP (par défaut avec Nest)
- Jest + Supertest pour les tests unitaires et end-to-end
- ESLint + Prettier pour le linting et le formatage

Node.js 20+ est requis.

## Structure

- `src/main.ts` — point d'entrée, démarre le serveur HTTP
- `src/app.module.ts` — module racine
- `src/app.controller.ts` — route `GET /`, sert la page d'accueil (HTML)
- `src/app.service.ts` — génère le HTML de la page d'accueil (loader + contenu)
- `src/app.controller.spec.ts` — tests unitaires du contrôleur
- `test/app.e2e-spec.ts` — test end-to-end de la route `GET /`

## Comportement de la page d'accueil

La route `GET /` renvoie une page HTML autonome (CSS et JS inline) :
1. Un loader (spinner) est affiché immédiatement.
2. Après 3 secondes (`setTimeout` côté navigateur), le loader est masqué et le
   contenu de la page apparaît.

## Commandes

Installation :
```bash
npm install
```

Lancement en développement (rechargement automatique) :
```bash
npm run start:dev
```

Lancement en production :
```bash
npm run build
npm run start:prod
```

Le serveur écoute sur `http://localhost:3000` par défaut (configurable via la
variable d'environnement `PORT`).

Tests unitaires :
```bash
npm test
```

Tests end-to-end :
```bash
npm run test:e2e
```

Lint :
```bash
npm run lint
```
