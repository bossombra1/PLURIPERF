# API PLURIPERF

Base URL : /api/v1

Les routes /api restent disponibles pour compatibilité.

## Santé

GET /api/v1/health

## Authentification

POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/logout
POST /api/v1/auth/forgot-password
POST /api/v1/auth/reset-password
GET /api/v1/auth/verify-email?token=...
GET /api/v1/auth/me

La session est portée par un cookie HttpOnly.

## Université

GET /api/v1/faculties
GET /api/v1/faculties/:id
GET /api/v1/programs
GET /api/v1/programs/:id

Paramètres de recherche formations : facultyId, q, level.

## Contenu

GET /api/v1/news
GET /api/v1/news/:slug
GET /api/v1/library
GET /api/v1/research

## Admissions

POST /api/v1/applications
GET /api/v1/applications/me
GET /api/v1/applications/:id
GET /api/v1/applications/track/:reference

Les CV sont envoyés en multipart/form-data avec le champ cv.

Le traitement administratif passe par :

GET /api/v1/admin/applications
PATCH /api/v1/admin/applications/:id/status

## Rendez-vous

GET /api/v1/appointments/availability?date=YYYY-MM-DD
POST /api/v1/appointments
GET /api/v1/appointments/me
PATCH /api/v1/appointments/:id
DELETE /api/v1/appointments/:id

## Contact

POST /api/v1/contact
POST /api/v1/newsletter/subscribe
POST /api/v1/advisory

## Campus étudiant

GET /api/v1/student/dashboard
GET /api/v1/student/courses
GET /api/v1/student/assignments
GET /api/v1/student/grades
GET /api/v1/student/diplomas
POST /api/v1/student/assignments/:id/submit

## Campus enseignant

GET /api/v1/teacher/dashboard
GET /api/v1/teacher/courses
POST /api/v1/teacher/assignments
GET /api/v1/teacher/assignments
GET /api/v1/teacher/assignments/:id/submissions
PATCH /api/v1/teacher/submissions/:id/grade
POST /api/v1/teacher/courses/:id/grades

Un enseignant ne peut agir que sur les cours qui lui sont affectés.

## Administration

GET /api/v1/admin/stats
GET /api/v1/admin/users
PATCH /api/v1/admin/users/:id
GET /api/v1/admin/applications
PATCH /api/v1/admin/applications/:id/status
GET /api/v1/admin/appointments
PATCH /api/v1/admin/appointments/:id/status
GET /api/v1/admin/contact-messages
PATCH /api/v1/admin/contact-messages/:id/handled
GET /api/v1/admin/advisory-requests

L'attribution du rôle super_admin est réservée à un super administrateur.
