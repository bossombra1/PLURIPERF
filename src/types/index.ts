export type Language = 'fr' | 'en';

export type PageId =
  | 'accueil'
  | 'universite'
  | 'facultes'
  | 'admissions'
  | 'formations'
  | 'campus_virtuel'
  | 'bibliotheque'
  | 'cabinet'
  | 'mere_nature'
  | 'recherches'
  | 'actualites'
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
