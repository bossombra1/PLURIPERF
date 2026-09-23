# PLURIPERF International University

Portail institutionnel, académique et commercial de **PLURIPERF International University**, consacré au management durable, à l’écologie responsable et au leadership régénératif.

> **Promesse institutionnelle :** *We build new leaders for a sustainable World.*

## Application full-stack fonctionnelle

Le projet est désormais **full-stack** : un backend Express + SQLite (fichier `data/pluriperf.db`) fournit une persistance réelle, une authentification JWT complète et des routes protégées. Le frontend React y est connecté via `/api` (proxy Vite en développement).

| Domaine | État |
|---|---|
| Authentification (inscription, connexion, déconnexion, mot de passe oublié) | ✅ Backend + frontend |
| Rôles `student` `teacher` `advisor` `editor` `admin` `super_admin` | ✅ Contrôles serveur (`requireAuth` / `requireRole`) |
| Candidatures avec upload sécurisé de CV (PDF/DOC, 10 Mo max) + suivi par référence | ✅ Persistant |
| Rendez-vous conseillers (créneau unique, conseillers réels) | ✅ Persistant |
| Contact & demandes cabinet | ✅ Persistant + e-mails |
| Facultés, formations, actualités, bibliothèque, recherche | ✅ Servis par l’API (seedés depuis les données historiques) |
| Campus virtuel : forum et messagerie persistés | ✅ Base de données |
| Espace administrateur (`/admin`) : statistiques, gestion des candidatures | ✅ Protégé par rôle |
| URLs partageables (react-router) + page 404 | ✅ |
| Notifications en base + e-mails SMTP configurables | ✅ |
| Tests (Vitest + Supertest), seeds de dev, `.env.example` | ✅ |

### Installation

```bash
npm install
cp .env.example .env          # puis renseigner JWT_SECRET
npm run seed                  # crée la base + comptes de démonstration
npm run dev:all               # API (port 4000) + frontend (port 3000)
```

Comptes de démonstration (mot de passe `Pluri2026!`) :
`admin@pluriperf.com` (super_admin), `advisor@pluriperf.com`, `teacher@pluriperf.com` (matricule `PR-NGUESSAN-001`), `sarah@pluriperf.com` (étudiante, matricule `PLU-2025-8842`), `editor@pluriperf.com`.

### Commandes

```bash
npm run dev        # frontend seul
npm run dev:server # API seule (tsx watch)
npm run dev:all    # les deux
npm run seed       # base de données de développement
npm run lint       # tsc --noEmit (frontend + config)
npm run build      # vérification TS + build de production
npm test           # tests d'intégration API (Vitest + Supertest)
```

En production (`NODE_ENV=production`), le serveur Express sert le build `dist/` avec fallback SPA et applique les vérifications renforcées (`JWT_SECRET` obligatoire).

### Architecture

```
server/            API Express
  index.ts         point d'entrée (helmet, CORS, rate-limit, routes)
  db.ts            SQLite (better-sqlite3) + migrations (schema.sql)
  auth.ts          JWT, requireAuth, requireRole
  routes/          auth, applications (upload CV), appointments, contact,
                   advisory, content (facultés/programmes/news/bibliothèque/
                   recherche/forum/messagerie/notifications), admin
  seed.ts          données de développement
  schema.sql       schéma de la base
src/               Frontend React 19 + Vite + Tailwind 4
  api/client.ts    client HTTP (JWT, gestion d'erreurs uniforme)
  context/         AuthContext (session, login/register/logout)
  routes.ts        mapping URLs partageables ↔ pages
  pages/           13 pages institutionnelles + 404 + admin
  components/      navbar, footer, modales connectées à l'API
tests/             tests d'intégration API
```


Le projet fournit actuellement une expérience frontend riche et responsive. Il présente les programmes, les facultés, les admissions, le campus virtuel, la bibliothèque numérique, le cabinet d’expertise, la recherche, les actualités et les contacts. Les données et plusieurs parcours interactifs sont encore simulés localement et doivent être reliés à des services persistants avant une mise en production.

## Sommaire

- [Fonctionnalités](#fonctionnalités)
- [État du projet](#état-du-projet)
- [Technologies](#technologies)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Commandes disponibles](#commandes-disponibles)
- [Variables d’environnement](#variables-denvironnement)
- [Architecture du projet](#architecture-du-projet)
- [Navigation et état actuel](#navigation-et-état-actuel)
- [Données et contenu](#données-et-contenu)
- [Intégrations à finaliser](#intégrations-à-finaliser)
- [Build et déploiement](#build-et-déploiement)
- [Qualité, sécurité et conformité](#qualité-sécurité-et-conformité)
- [Développement](#développement)
- [Prochaines étapes](#prochaines-étapes)
- [Licence](#licence)
- [Références](#références)

## Fonctionnalités

### Portail institutionnel

Le site présente l’identité de l’université, sa vision, son modèle pédagogique inspiré de la nature, ses facultés, ses programmes, ses activités de recherche et son écosystème de partenaires.

### Parcours académiques

Le moteur de recherche permet de filtrer les formations par mot-clé, faculté, niveau d’études et modalité d’enseignement. Les fiches de programme présentent notamment la durée, les crédits ECTS, le format, la description et les débouchés professionnels.

### Admissions

Le parcours d’admission comprend une présentation des étapes, des critères, des bourses, des frais de scolarité, du calendrier académique et une FAQ. Une modale permet de simuler le dépôt d’une candidature avec un parcours en plusieurs étapes.

### Campus virtuel

Le campus virtuel présente une interface de démonstration avec les espaces suivants :

- tableau de bord étudiant ;
- cours et vidéos ;
- examens et devoirs ;
- bibliothèque ;
- notes et crédits ECTS ;
- diplômes ;
- messagerie ;
- forum communautaire.

Ces espaces utilisent actuellement des données locales et un état React en mémoire. Ils ne constituent pas encore une plateforme d’apprentissage sécurisée.

### Services et écosystème

Le dépôt inclut également des pages et interactions pour :

- la bibliothèque numérique ;
- le cabinet d’études et de conseil ;
- Mère Nature Global ;
- le MIN Research Institute ;
- les actualités et événements ;
- les carrières ;
- les campus et contacts internationaux.

### Bilinguisme

L’interface prend en charge le français et l’anglais au moyen de dictionnaires de traduction centralisés. La langue est gérée côté client et peut être changée depuis la navigation principale.

## État du projet

Le projet doit être considéré comme un **prototype frontend avancé**.

| Domaine | État actuel |
|---|---|
| Interface institutionnelle | Implémentée |
| Responsive desktop et mobile | Implémenté |
| Français et anglais | Implémenté côté client |
| Recherche de formations | Fonctionnelle avec données locales |
| Modales d’admission et de rendez-vous | Simulées côté client |
| Campus virtuel | Maquette interactive |
| Authentification | Non connectée à un fournisseur d’identité |
| Backend applicatif | Non implémenté dans ce dépôt |
| Persistance des formulaires | Non implémentée |
| CMS | Non implémenté |
| Tests automatisés | Aucun test dédié présent actuellement |
| CI/CD | Aucun workflow GitHub Actions présent actuellement |
| Routes URL persistantes | À mettre en place |

Les confirmations affichées par les formulaires ne doivent pas être interprétées comme des enregistrements officiels tant qu’un backend n’est pas connecté.

## Technologies

Le projet utilise les technologies suivantes :

- **React 19** pour l’interface utilisateur ;
- **TypeScript** pour le typage statique ;
- **Vite 8** pour le serveur de développement et le build ;
- **Tailwind CSS 4** pour le système de styles ;
- **Lucide React** pour les icônes ;
- **Motion** pour les animations lorsqu’il est utilisé par les composants ;
- **Google Fonts** pour les familles typographiques Plus Jakarta Sans, Playfair Display et JetBrains Mono.

## Prérequis

- Node.js 20 ou version ultérieure recommandée ;
- npm 10 ou version ultérieure ;
- Git ;
- un navigateur moderne prenant en charge les modules JavaScript.

## Installation

Clonez le dépôt puis placez-vous dans son répertoire :

```bash
git clone https://github.com/bossombra1/PLURIPERF.git
cd PLURIPERF
```

Installez ensuite les dépendances :

```bash
npm install
```

### Note sur les dépendances actuelles

La combinaison actuellement déclarée de Vite et d’esbuild peut provoquer une erreur de résolution npm liée aux peer dependencies. Si `npm install` échoue avec une erreur `ERESOLVE`, utilisez temporairement :

```bash
npm install --legacy-peer-deps
```

Cette commande permet de lancer le prototype, mais la solution recommandée à moyen terme consiste à aligner les versions de Vite et d’esbuild dans `package.json`, puis à régénérer un lockfile validé par l’équipe.

Démarrez le serveur de développement :

```bash
npm run dev
```

Le site est alors disponible par défaut à l’adresse `http://localhost:3000`.

## Commandes disponibles

| Commande | Description |
|---|---|
| `npm run dev` | Lance Vite en mode développement sur le port 3000. |
| `npm run lint` | Exécute le compilateur TypeScript sans générer de fichiers. |
| `npm run build` | Génère le build de production dans `dist/`. |
| `npm run preview` | Sert localement le build de production. |
| `npm run clean` | Supprime les répertoires `dist` et certains artefacts générés. |

Avant toute pull request, exécutez au minimum :

```bash
npm run lint
npm run build
```

## Variables d’environnement

Un fichier d’exemple est fourni dans `.env.example` :

```env
GEMINI_API_KEY="MY_GEMINI_API_KEY"
APP_URL="MY_APP_URL"
```

À ce jour, le code frontend ne dépend pas d’un appel Gemini identifié dans les pages principales. Ne renseignez jamais une clé privée directement dans le code ou dans un fichier commité. Les secrets doivent être injectés par l’environnement de déploiement.

## Architecture du projet

```text
.
├── public/
│   └── logo-pluriperf.svg
├── src/
│   ├── assets/
│   │   └── images/
│   ├── components/
│   │   ├── ApplicationModal.tsx
│   │   ├── AppointmentModal.tsx
│   │   ├── CabinetQuoteModal.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroGallery.tsx
│   │   ├── LoginModal.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProgramSearch.tsx
│   │   └── WhatsAppModal.tsx
│   ├── data/
│   │   ├── translations.ts
│   │   └── universityData.ts
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── UniversityPage.tsx
│   │   ├── FacultiesPage.tsx
│   │   ├── FormationsPage.tsx
│   │   ├── AdmissionsPage.tsx
│   │   ├── CampusVirtuelPage.tsx
│   │   ├── BibliothequePage.tsx
│   │   ├── CabinetPage.tsx
│   │   ├── MereNaturePage.tsx
│   │   ├── RecherchesPage.tsx
│   │   ├── ActualitesPage.tsx
│   │   └── ContactsPage.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .env.example
├── index.html
├── metadata.json
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### Rôle des répertoires

`src/pages/` contient les vues principales du portail. `src/components/` contient les éléments réutilisables de navigation, de recherche et de formulaires. `src/data/` contient les données locales actuellement utilisées par l’interface. `src/types/` définit les structures TypeScript communes aux facultés, formations, articles, projets de recherche, offres d’emploi et produits verts.

Les images institutionnelles sont importées depuis `src/assets/images/` afin d’être intégrées au bundle Vite. Leur poids devra être réévalué avant une mise en production à grande échelle.

## Navigation et état actuel

La navigation actuelle repose principalement sur un état React géré dans `App.tsx` :

```tsx
const [currentPage, setCurrentPage] = useState<PageId>('accueil');
```

Cette approche convient à une démonstration interactive, mais elle ne fournit pas encore de véritables URLs partageables. Un rechargement de page réinitialise la vue sur l’accueil.

Pour un portail public, il est recommandé d’introduire un routeur client tel que React Router ou Wouter. Chaque page devrait alors disposer d’une URL stable, par exemple :

```text
/
/universite
/facultes
/formations
/admissions
/campus-virtuel
/bibliotheque
/contacts
```

La migration devra également prévoir la gestion des URLs profondes côté serveur et l’ajout d’une page 404.

## Données et contenu

Les données métier sont regroupées dans `src/data/universityData.ts`. Elles couvrent notamment les neuf facultés, les programmes, les ressources de bibliothèque, les actualités, les offres d’emploi, les projets de recherche, les produits verts et les données du campus virtuel.

Avant toute publication institutionnelle, les éléments suivants doivent être vérifiés et validés par PLURIPERF :

- adresses et campus internationaux ;
- noms et affiliations des responsables académiques ;
- accréditations, agréments et reconnaissance des crédits ECTS ;
- frais de scolarité et conditions de paiement ;
- calendrier académique ;
- statistiques de partenaires, ouvrages et apprenants ;
- numéros de téléphone et coordonnées WhatsApp ;
- publications, brevets et projets de recherche annoncés.

Le contenu de démonstration ne doit pas être présenté comme une information officielle sans validation éditoriale et juridique.

## Intégrations à finaliser

### Candidatures

`ApplicationModal.tsx` simule un parcours de candidature et génère un numéro local. Pour une utilisation réelle, il faut ajouter un endpoint sécurisé capable de :

1. valider les données côté serveur ;
2. enregistrer la candidature ;
3. stocker le CV de manière sécurisée ;
4. envoyer un accusé de réception ;
5. fournir un espace de suivi au candidat ;
6. appliquer les règles de conservation et de suppression des données personnelles.

### Rendez-vous

`AppointmentModal.tsx` affiche actuellement une confirmation locale. Il faut le connecter à un outil de réservation réel ou à un service backend capable de gérer les disponibilités, les fuseaux horaires, les invitations et les annulations.

### WhatsApp

`WhatsAppModal.tsx` ouvre un lien WhatsApp avec un message prérempli. Le numéro doit être placé dans une configuration centralisée et vérifié. Le numéro affiché à l’utilisateur doit toujours correspondre au numéro utilisé par le lien `wa.me`.

### Campus virtuel

Le campus virtuel doit être remplacé par une architecture sécurisée comprenant une authentification, une base de données, un stockage de fichiers, des rôles étudiant/enseignant/administrateur et des contrôles d’autorisation. Les notes, diplômes, examens et devoirs sont des données sensibles et ne doivent pas rester dans l’état local du navigateur.

## Build et déploiement

Générez le build de production avec :

```bash
npm run build
```

Le résultat est écrit dans `dist/`. Pour le tester localement :

```bash
npm run preview
```

Le projet peut être déployé sur une plateforme compatible avec les applications Vite statiques, par exemple un hébergement de fichiers statiques ou un service de déploiement frontend. La plateforme choisie doit prendre en charge la réécriture des routes vers `index.html` lorsque le routage URL sera ajouté.

Le build actuel signale un bundle JavaScript principal supérieur à 500 Ko. Avant le déploiement public, il est recommandé de :

- charger les pages avec `React.lazy` ;
- séparer les modales et fonctionnalités secondaires ;
- compresser et redimensionner les images ;
- analyser le bundle avec un outil dédié ;
- définir une stratégie de cache des assets.

## Qualité, sécurité et conformité

Le projet ne contient pas encore de tests automatisés ni de pipeline CI. Une base de production devrait au minimum inclure :

- vérification TypeScript à chaque pull request ;
- build de production automatisé ;
- tests des composants interactifs ;
- tests de navigation et des formulaires ;
- contrôle des liens et des assets ;
- analyse des dépendances ;
- validation d’accessibilité avec clavier et lecteur d’écran.

Les formulaires et le campus virtuel traiteront potentiellement des données personnelles et académiques. Avant leur activation, il faudra ajouter :

- politique de confidentialité ;
- base légale du traitement ;
- mécanisme de consentement lorsque nécessaire ;
- durée de conservation ;
- procédure d’exercice des droits ;
- contrôle d’accès et journalisation ;
- chiffrement en transit et au repos ;
- protection contre le spam et les abus.

Aucune donnée personnelle réelle ne doit être commitée dans `src/data/` ou dans les fichiers de démonstration.

## Développement

Les modifications doivent rester ciblées et préserver la séparation entre contenu, composants et pages. Les nouvelles données métier doivent être ajoutées aux structures TypeScript existantes plutôt que dupliquées dans plusieurs composants.

Avant d’ouvrir une pull request :

1. vérifier le rendu desktop et mobile ;
2. tester le changement de langue ;
3. tester les parcours d’admission et de contact ;
4. vérifier les états de fermeture des modales ;
5. exécuter `npm run lint` ;
6. exécuter `npm run build` ;
7. documenter toute nouvelle variable d’environnement ou intégration externe.

## Prochaines étapes

La feuille de route recommandée est la suivante :

1. stabiliser les versions de Vite et d’esbuild ;
2. ajouter un lockfile validé et une CI GitHub Actions ;
3. intégrer un routeur avec URLs persistantes ;
4. brancher les formulaires à un backend sécurisé ;
5. ajouter une authentification pour le campus virtuel ;
6. introduire un CMS pour les formations, actualités et pages institutionnelles ;
7. valider toutes les informations officielles avec l’équipe PLURIPERF ;
8. optimiser les images et le découpage du bundle ;
9. publier les mentions légales et la politique de confidentialité ;
10. ajouter des tests automatisés et une revue d’accessibilité.

## Licence

Aucune licence open source n’est actuellement déclarée dans le dépôt. Avant toute distribution ou contribution externe, le propriétaire du projet doit ajouter un fichier `LICENSE` et préciser les conditions d’utilisation du code, des images, du logo et des contenus institutionnels.

## Références

[1]: https://react.dev/ "Documentation officielle de React"
[2]: https://www.typescriptlang.org/docs/ "Documentation officielle de TypeScript"
[3]: https://vite.dev/guide/ "Guide officiel de Vite"
[4]: https://tailwindcss.com/docs/installation/using-vite "Installation officielle de Tailwind CSS avec Vite"
[5]: https://lucide.dev/guide/packages/lucide-react "Documentation officielle de Lucide React"
[6]: https://github.com/bossombra1/PLURIPERF "Dépôt GitHub PLURIPERF International University"
