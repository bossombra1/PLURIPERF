import { Language } from '../types';

export const translations = {
  fr: {
    siteTitle: 'PLURIPERF INTERNATIONAL UNIVERSITY',
    shortName: 'PLURIPERF',
    internationalSignature: "1ère Université de Management Durable, d'Écologie responsable et de Leadership régénératif",
    institutionalPromise: 'Construire les leaders du monde durable',
    institutionalPromiseEnglish: '“We build new leaders for a sustainable World”',
    heroSubtitle:
      'PLURIPERF International University forme les professionnels, entrepreneurs et dirigeants capables de régénérer les organisations, les territoires et la planète.',
    nav: {
      accueil: 'Accueil',
      universite: "L'Université",
      facultes: 'Facultés',
      admissions: 'Admissions',
      formations: 'Formations',
      campusVirtuel: 'Campus Virtuel',
      bibliotheque: 'Bibliothèque',
      cabinet: "Cabinet d'Expertise",
      mereNature: 'Mère Nature Global',
      recherches: 'Recherches & Projets',
      actualites: 'Actualités',
      carrieres: 'Carrières',
      contacts: 'Contacts',
    },
    navGroups: {
      universite: "L'Université",
      academique: "Formations & Facultés",
      rechercheImpact: "Recherche & Impact",
      campusVie: "Campus & Ressources",
    },
    buttons: {
      apply: 'Candidater',
      findProgram: 'Trouver une formation',
      login: 'Se connecter',
      consulting: 'Demander un accompagnement',
      explore: 'Découvrir nos facultés',
      contactUs: 'Nous contacter',
      search: 'Rechercher',
      reset: 'Réinitialiser',
      details: 'En savoir plus',
      submit: 'Envoyer ma candidature',
      bookAppointment: 'Prendre rendez-vous',
      downloadBrochure: 'Télécharger la brochure',
      accessPortal: 'Accéder au Campus',
      requestQuote: 'Demander un devis audit',
    },
    ctaFinal: {
      title: 'Prêt à devenir un acteur du monde durable ?',
      subtitle:
        'Rejoignez une communauté internationale de penseurs, chercheurs et pionniers du management régénératif.',
    },
    footer: {
      aboutText:
        'Établissement international d’enseignement supérieur et de recherche dédié au management durable, aux sciences écologiques appliquées et aux technologies de transition.',
      legalNotice: 'Tous droits réservés.',
      address: 'Siège Académique International & Campus Écologique Numérique',
      slogan: 'L’Excellence Académique au Service du Vivant.',
    },
  },
  en: {
    siteTitle: 'PLURIPERF INTERNATIONAL UNIVERSITY',
    shortName: 'PLURIPERF',
    internationalSignature:
      '1st University of Sustainable Management - Responsible Ecology & Regenerative Leadership',
    institutionalPromise: 'Building Leaders for a Sustainable World',
    institutionalPromiseEnglish: '“We build new leaders for a sustainable World”',
    heroSubtitle:
      'PLURIPERF International University trains professionals, entrepreneurs, and leaders capable of regenerating organizations, territories, and the planet.',
    nav: {
      accueil: 'Home',
      universite: 'The University',
      facultes: 'Faculties',
      admissions: 'Admissions',
      formations: 'Programs',
      campusVirtuel: 'Virtual Campus',
      bibliotheque: 'Digital Library',
      cabinet: 'Expert Advisory',
      mereNature: 'Mother Nature Global',
      recherches: 'Research & Projects',
      actualites: 'News & Events',
      carrieres: 'Careers',
      contacts: 'Contact',
    },
    navGroups: {
      universite: 'The University',
      academique: 'Academics & Degrees',
      rechercheImpact: 'Research & Impact',
      campusVie: 'Campus & Life',
    },
    buttons: {
      apply: 'Apply Now',
      findProgram: 'Find a Program',
      login: 'Student Login',
      consulting: 'Request Guidance',
      explore: 'Explore Faculties',
      contactUs: 'Get in Touch',
      search: 'Search',
      reset: 'Reset',
      details: 'Learn More',
      submit: 'Submit Application',
      bookAppointment: 'Book an Appointment',
      downloadBrochure: 'Download Brochure',
      accessPortal: 'Access Campus',
      requestQuote: 'Request Audit Quote',
    },
    ctaFinal: {
      title: 'Ready to become an actor of a sustainable world?',
      subtitle:
        'Join an international community of scholars, practitioners, and pioneers in regenerative leadership.',
    },
    footer: {
      aboutText:
        'International higher education and research institution dedicated to sustainable management, applied ecological sciences, and transition technologies.',
      legalNotice: 'All rights reserved.',
      address: 'International Academic Headquarters & Digital Eco-Campus',
      slogan: 'Academic Excellence in Service of the Living World.',
    },
  },
};

export const getT = (lang: Language) => translations[lang];
