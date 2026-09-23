# PLURIPERF International University

Portail universitaire institutionnel bilingue (français/anglais) avec site public, admissions, candidatures, rendez-vous, campus virtuel et administration.

## État technique

PLURIPERF est une application full-stack :

- Frontend : React 19, TypeScript, Vite 8, Tailwind CSS 4, Radix UI, Lucide React.
- Backend : Node.js, Express 4, TypeScript.
- Base : SQLite avec better-sqlite3, contraintes et migrations additives.
- Validation : Zod.
- Authentification : JWT dans cookie HttpOnly, Secure en production, SameSite=Lax.
- Sécurité : Helmet, CORS explicite, rate limiting, bcrypt, validation serveur, uploads hors dossier public.
- Tests : Vitest + Supertest.
- E-mails : Nodemailer configurable par SMTP.

## Fonctionnalités

### Public
- accueil et pages institutionnelles ;
- facultés et fiches facultés ;
- formations et fiches formations ;
- admissions ;
- bibliothèque ;
- recherche ;
- actualités et détail d'article ;
- carrières ;
- contacts ;
- cabinet ;
- français/anglais.

### Authentification
- inscription ;
- connexion par e-mail ou matricule ;
- déconnexion ;
- session persistante par cookie HttpOnly ;
- récupération et réinitialisation du mot de passe ;
- vérification d'e-mail ;
- rôles : student, teacher, advisor, editor, admin, super_admin.

### Admissions
- candidature persistante ;
- numéro de dossier ;
- CV PDF/DOC/DOCX ;
- suivi par référence ;
- suivi dans l'espace connecté ;
- traitement administratif ;
- notifications.

### Rendez-vous
- créneaux institutionnels ;
- disponibilités configurables ;
- prévention des doubles réservations côté base ;
- attribution à un conseiller ;
- confirmation, annulation et reprogrammation via API ;
- fuseau configurable.

### Campus virtuel
- tableau de bord étudiant ;
- cours et inscriptions ;
- devoirs ;
- dépôts ;
- notes et ECTS ;
- diplômes ;
- messagerie ;
- forum ;
- notifications ;
- espace enseignant ;
- affectation des enseignants aux cours ;
- correction et publication des notes.

### Administration
- utilisateurs et rôles ;
- candidatures ;
- rendez-vous ;
- facultés ;
- formations ;
- actualités ;
- bibliothèque ;
- recherche ;
- contacts ;
- demandes cabinet ;
- paramètres et statistiques.

## API

L'API versionnée est disponible sous :

/api/v1

Les anciennes routes /api restent montées pour compatibilité.

Voir docs/api.md.

## Installation

Prérequis : Node.js 20+ et npm 10+.

    git clone https://github.com/bossombra1/PLURIPERF.git
    cd PLURIPERF
    npm install
    cp .env.example .env
    npm run seed

Windows PowerShell :

    Copy-Item .env.example .env

Renseigner au minimum un JWT_SECRET long et aléatoire en environnement de production.

Ne pas utiliser npm install --legacy-peer-deps. Les versions Vite/plugin React/Tailwind sont alignées dans le lockfile.

## Développement

Terminal 1 :

    npm run dev:server

Terminal 2 :

    npm run dev

Ou :

    npm run dev:all

Frontend : http://localhost:3000
API : http://localhost:4000

## Validation

    npm install
    npm run lint
    npm run build
    npm test
    npm run build:server
    npm run seed

Health :

    GET /api/v1/health

## Comptes de développement

| Compte | Rôle |
|---|---|
| admin@pluriperf.com | super_admin |
| advisor@pluriperf.com | advisor |
| teacher@pluriperf.com | teacher |
| sarah@pluriperf.com | student |
| editor@pluriperf.com | editor |

Mot de passe de développement : Pluri2026!

Ces identifiants sont exclusivement destinés au développement et doivent être remplacés avant production.

## Variables d'environnement

Voir .env.example.

Principales variables :

- PORT
- NODE_ENV
- APP_URL
- CORS_ORIGIN
- DB_PATH
- JWT_SECRET
- JWT_EXPIRES_IN
- PASSWORD_RESET_TTL_MINUTES
- UPLOAD_DIR
- MAX_FILE_SIZE_MB
- APPOINTMENT_TIMEZONE
- SMTP_HOST
- SMTP_PORT
- SMTP_USER
- SMTP_PASS
- SMTP_SECURE
- MAIL_FROM
- MAIL_CONTACT_TO
- VITE_API_URL

## Architecture

    src/
      api/
      components/
        ui/
      context/
      data/
      pages/
      types/
      App.tsx
      index.css

    server/
      auth.ts
      config.ts
      db.ts
      middleware.ts
      mailer.ts
      routes/
      schema.sql
      seed.ts

    tests/
      setup.ts
      api.test.ts

    docs/
      api.md
      architecture.md

Les permissions sont appliquées côté serveur. Le frontend ne constitue jamais une frontière de sécurité.

## Design

L'interface utilise une direction sombre, neutre et institutionnelle avec des tokens CSS centralisés dans src/index.css.

Les primitives réutilisables sont dans src/components/ui/ : boutons, champs, sélection, cartes, dialogues, onglets, tableaux, états de chargement, états vides et erreurs.

Le support prefers-reduced-motion est intégré.

## Sécurité

- aucune clé secrète dans le frontend ;
- JWT uniquement dans cookie HttpOnly ;
- cookies Secure en production ;
- CORS avec credentials ;
- Helmet ;
- rate limiting ;
- bcrypt ;
- Zod côté serveur ;
- uploads avec taille/type contrôlés ;
- stockage des CV hors dossier public ;
- autorisation serveur par rôle ;
- contraintes SQLite pour les relations et doubles réservations ;
- réponses d'erreur uniformisées ;
- aucune donnée de mot de passe renvoyée par l'API.

Voir SECURITY.md.

## Déploiement

Avant production :

1. générer un vrai JWT_SECRET ;
2. définir NODE_ENV=production ;
3. définir APP_URL et CORS_ORIGIN ;
4. activer SMTP ;
5. définir un stockage persistant sécurisé pour la base et les uploads ;
6. configurer HTTPS ;
7. remplacer les comptes de démonstration ;
8. effectuer une sauvegarde de la base ;
9. lancer lint, build, tests et build serveur ;
10. vérifier les routes profondes SPA et les cookies.

## Limites restantes

Le socle fonctionnel est réel, mais certains éléments nécessitent encore une intégration métier avant production : antivirus pour les fichiers, stockage objet hautement disponible, véritable service de visioconférence, CI/CD, journal d'audit complet, politiques de conservation et validation officielle des contenus institutionnels.
