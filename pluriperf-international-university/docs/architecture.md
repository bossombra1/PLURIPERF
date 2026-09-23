# Architecture PLURIPERF

## Frontend

React est organisé autour de pages, composants réutilisables, contexte d'authentification et client HTTP unique.

Les pages sont chargées avec React.lazy. BrowserRouter fournit les URLs partageables et la navigation historique.

Le client HTTP utilise credentials: include afin de transporter le cookie de session HttpOnly.

## Backend

Express est la frontière de sécurité. Chaque module expose ses routes et valide les entrées avec Zod.

La chaîne générale est :

route -> validation -> authentification/autorisation -> accès SQLite -> réponse JSON.

Les erreurs sont normalisées par middleware.

## Données

SQLite est utilisé pour conserver les données métier. Foreign keys et index sont activés.

Les tables couvrent :

- utilisateurs et réinitialisation de mot de passe ;
- vérification e-mail ;
- facultés et formations ;
- candidatures et documents ;
- rendez-vous et disponibilités ;
- contenus éditoriaux ;
- cours, inscriptions, devoirs, dépôts et notes ;
- forum, messages et notifications ;
- newsletter.

Les migrations additives nécessaires aux bases existantes sont appliquées au démarrage.

## Sécurité

Les documents sensibles sont stockés hors dossier public. Les accès sont filtrés côté serveur.

Le JWT n'est pas exposé au JavaScript du navigateur : il est placé dans un cookie HttpOnly.

Le rate limiting est appliqué aux routes API, avec une limite renforcée sur l'authentification.

## Production

Le serveur Express peut servir le build frontend et effectuer le fallback SPA pour les routes non-API.

Avant mise en production, il faut ajouter un stockage de fichiers hautement disponible, un antivirus, une journalisation d'audit et une stratégie de sauvegarde/rotation.
