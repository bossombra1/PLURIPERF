export type Language = 'fr' | 'en';

export type PageId =
  | 'accueil'
  | 'universite'
  | 'facultes'
  | 'faculte_detail'
  | 'admissions'
  | 'formations'
  | 'formation_detail'
  | 'campus_virtuel'
  | 'bibliotheque'
  | 'cabinet'
  | 'mere_nature'
  | 'recherches'
  | 'actualites'
  | 'actualite_detail'
  | 'carrieres'
  | 'contacts';

export interface Faculty {
  id: string;
  nameFr: string;
  nameEn: string;
  dean: string;
  descriptionFr: string;
  descriptionEn: string;
  keyThemesFr: string[];
  keyThemesEn: string[];
  degreesCount: number;
  highlightedProgramFr: string;
  highlightedProgramEn: string;
}

export interface Program {
  id: string;
  titleFr: string;
  titleEn: string;
  facultyId: string;
  level: 'Bachelor / Licence' | 'Master' | 'Doctorat / PhD' | 'Certificat Exécutif';
  durationFr: string;
  durationEn: string;
  modality: 'En ligne' | 'Présentiel' | 'Hybride';
  ects: number;
  descriptionFr: string;
  descriptionEn: string;
  careerOutcomesFr: string[];
  careerOutcomesEn: string[];
}

export interface LibraryItem {
  id: string;
  type: 'livre' | 'article' | 'revue' | 'podcast' | 'video' | 'rapport_onu' | 'norme_iso';
  titleFr: string;
  titleEn: string;
  author: string;
  year: number;
  categoryFr: string;
  categoryEn: string;
  fileSizeOrDuration: string;
  readTime: string;
  downloadsCount: number;
}

export interface NewsArticle {
  id: string;
  category: 'sieds' | 'ecologie' | 'developpement_durable' | 'recherche' | 'conference' | 'cours' | 'partenariat' | 'evenement';
  titleFr: string;
  titleEn: string;
  date: string;
  readTime: string;
  summaryFr: string;
  summaryEn: string;
  contentFr: string;
  contentEn: string;
  featured?: boolean;
}

export interface CareerOffer {
  id: string;
  type: 'emploi' | 'stage';
  titleFr: string;
  titleEn: string;
  company: string;
  location: string;
  contract: string;
  deadline: string;
  descriptionFr: string;
  descriptionEn: string;
}

export interface ResearchProject {
  id: string;
  titleFr: string;
  titleEn: string;
  centerFr: string;
  centerEn: string;
  leadResearcher: string;
  status: 'En cours' | 'Breveté' | 'Publié';
  year: number;
  abstractFr: string;
  abstractEn: string;
}

export interface GreenProduct {
  id: string;
  nameFr: string;
  nameEn: string;
  categoryFr: string;
  categoryEn: string;
  price: string;
  ecoImpactFr: string;
  ecoImpactEn: string;
}

export type Role = 'student' | 'teacher' | 'advisor' | 'editor' | 'admin' | 'super_admin';

export interface AuthUser {
  id: number;
  email: string;
  fullName: string;
  role: Role;
  studentRef: string | null;
}

export type ApplicationStatus = 'submitted' | 'under_review' | 'accepted' | 'rejected' | 'waitlisted';

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Application {
  id: number;
  reference: string;
  program: string;
  level: string;
  fullName: string;
  email: string;
  status: ApplicationStatus;
  createdAt: string;
}

export interface Appointment {
  id: number;
  date: string;
  timeSlot: string;
  reason: string;
  status: AppointmentStatus;
  createdAt: string;
}

export interface Course {
  id: number;
  code: string;
  titleFr: string;
  titleEn: string;
  ects: number;
  semester: string;
  program: string;
}

export interface ForumTopic {
  id: number;
  title: string;
  body?: string;
  author: string;
  created_at: string;
}

export interface Message {
  id: number;
  subject: string;
  body: string;
  sender: string;
  created_at: string;
  read_at?: string | null;
}

export interface Notification {
  id: number;
  type: string;
  payload_fr: string;
  payload_en: string;
  read_at?: string | null;
  created_at: string;
}
