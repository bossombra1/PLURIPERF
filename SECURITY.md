# Security

## Principes

- Aucun secret dans le code frontend.
- JWT dans cookie HttpOnly.
- Secure activé en production.
- SameSite=Lax.
- CORS explicite.
- Helmet.
- Rate limiting.
- Validation Zod côté serveur.
- bcrypt pour les mots de passe.
- Contrôle d'autorisation côté serveur.
- Fichiers uploadés hors dossier public.
- Noms de fichiers générés côté serveur.
- Taille et extensions contrôlées.
- Messages d'erreur ne révélant pas les informations d'authentification.

## Production obligatoire

Avant exposition publique :

1. définir un JWT_SECRET aléatoire ;
2. activer HTTPS ;
3. configurer CORS avec les origines exactes ;
4. configurer SMTP ;
5. remplacer les comptes seed ;
6. sauvegarder la base SQLite ;
7. mettre les uploads sur un stockage persistant ;
8. ajouter antivirus/scanning ;
9. activer une journalisation d'audit ;
10. définir une politique de conservation des données personnelles.

## Données personnelles

Les candidatures, CV, messages, notes et informations de compte sont des données sensibles. Leur accès doit rester limité au rôle et au périmètre fonctionnel appropriés.
