# Architecture PostgreSQL — PLURIPERF International

Architecture retenue pour la production :

- `frontend/` : React + Vite, déployé comme service Railway.
- `backend/` : Node.js + Express + TypeScript, déployé comme service Railway.
- PostgreSQL : base de données Railway.
- Authentification : JWT dans cookie HttpOnly.
- API : `/api/v1` avec compatibilité `/api`.

La migration depuis l'ancien backend SQLite est terminée. Le dossier `server/` historique ne doit plus être utilisé par l'application active.

## Déploiement Railway

Créer trois composants dans le projet Railway :

1. PostgreSQL.
2. Service backend basé sur `backend/railway.json`.
3. Service frontend basé sur `frontend/railway.json`.

Le frontend doit recevoir `VITE_API_URL` avec l'URL publique du backend suivie de `/api/v1`.

Le backend doit recevoir au minimum :

- `NODE_ENV=production`
- `DATABASE_URL`
- `JWT_SECRET`
- `APP_URL`
- `CORS_ORIGIN`
- les paramètres SMTP nécessaires.

Les fichiers utilisateurs (CV et documents) ne doivent pas dépendre du disque local éphémère du service backend en production. Prévoir un stockage objet/persistant avant l'ouverture complète des dépôts de fichiers.
