import React from 'react';
import { ArrowRight, BookOpen, BriefcaseBusiness, CalendarDays, GraduationCap, Search } from 'lucide-react';
import { PageId, Language } from '../types';
import { getT } from '../data/translations';
import { UNIVERSITY_ASSETS } from '../assets/images';
import { ProgramSearch } from '../components/ProgramSearch';

interface HomePageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  onOpenApply: () => void;
  onOpenSearch: () => void;
  onOpenConsulting: () => void;
  onApplyForProgram: (programTitle: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ lang, onNavigate, onOpenApply, onOpenSearch, onOpenConsulting, onApplyForProgram }) => {
  const t = getT(lang);
  const fr = lang === 'fr';
  return (
    <div className="institutional-page">
      <div className="breadcrumb-band"><div className="site-container breadcrumb"><span className="breadcrumb-dot" /> <span>{fr ? 'Accueil' : 'Home'}</span><span>/</span><strong>PLURIPERF International University</strong></div></div>
      <section className="site-container home-intro">
        <div className="intro-copy"><span className="eyebrow">{fr ? 'L’UNIVERSITÉ' : 'THE UNIVERSITY'}</span><h1>{fr ? 'Former les compétences qui accompagnent le développement.' : 'Educating the skills that accompany development.'}</h1><p>{t.heroSubtitle}</p><div className="intro-actions"><button type="button" className="button-primary" onClick={onOpenApply}>{fr ? 'Candidater' : 'Apply now'} <ArrowRight size={17} /></button><button type="button" className="button-text" onClick={() => onNavigate('universite')}>{fr ? 'Découvrir PLURIPERF' : 'Discover PLURIPERF'} <ArrowRight size={16} /></button></div></div>
        <div className="stat-grid"><div><strong>2024</strong><span>{fr ? 'Année de création' : 'Year founded'}</span></div><div><strong>9</strong><span>{fr ? 'Facultés d’excellence' : 'Faculties of excellence'}</span></div><div><strong>Abidjan</strong><span>{fr ? 'Côte d’Ivoire' : 'Côte d’Ivoire'}</span></div></div>
      </section>

      <section className="site-container editorial-section editorial-history"><div className="section-index">01 <span>{fr ? 'NOTRE HISTOIRE' : 'OUR STORY'}</span></div><div className="editorial-content"><h2>{fr ? 'Une université engagée pour les organisations et les territoires.' : 'A university committed to organizations and territories.'}</h2><div className="editorial-columns"><div><p>{fr ? 'PLURIPERF International University est un établissement d’enseignement supérieur dédié au management durable, à l’écologie responsable et au leadership régénératif.' : 'PLURIPERF International University is a higher education institution dedicated to sustainable management, responsible ecology and regenerative leadership.'}</p><p>{fr ? 'Notre ambition est de relier la rigueur académique, l’expérience professionnelle et les enjeux concrets des territoires pour former des décideurs capables d’agir avec méthode.' : 'Our ambition is to connect academic rigor, professional experience and real-world challenges to educate decision-makers who act with method.'}</p><button type="button" className="button-outline" onClick={() => onNavigate('universite')}>{fr ? 'Notre institution' : 'Our institution'} <ArrowRight size={16} /></button></div><div className="school-list"><div><b>MIN</b><span>{fr ? 'Management Inspiré par la Nature' : 'Nature-Inspired Management'}</span></div><div><b>ESG</b><span>{fr ? 'Gouvernance et transformation durable' : 'Governance and sustainable transformation'}</span></div><div><b>LAB</b><span>{fr ? 'Recherche appliquée et innovation' : 'Applied research and innovation'}</span></div></div></div></div></section>

      <section className="site-container image-editorial"><div className="image-frame"><img src={UNIVERSITY_ASSETS.students} alt={fr ? 'Étudiants PLURIPERF sur le campus' : 'PLURIPERF students on campus'} /></div><div className="image-note"><span className="eyebrow">02 <span>{fr ? 'FORMATION & EXPERTISE' : 'EDUCATION & EXPERTISE'}</span></span><h2>{fr ? 'Des formations pour comprendre, décider et transformer.' : 'Programs to understand, decide and transform.'}</h2><p>{fr ? 'Des parcours en management, climat, énergie, agroécologie, innovation et gouvernance pour accompagner les transitions contemporaines.' : 'Programs in management, climate, energy, agroecology, innovation and governance to support contemporary transitions.'}</p><button type="button" className="button-text" onClick={onOpenSearch}>{fr ? 'Explorer les formations' : 'Explore programs'} <ArrowRight size={16} /></button></div></section>

      <section className="site-container numbers-section"><div className="numbers-heading"><span className="eyebrow">{fr ? 'NOS PÔLES' : 'OUR CENTRES'}</span><h2>{fr ? 'Une communauté universitaire ouverte sur le monde.' : 'A university community open to the world.'}</h2></div><div className="numbers-grid"><div><strong>13+</strong><span>{fr ? 'espaces académiques et institutionnels' : 'academic and institutional spaces'}</span></div><div><strong>4</strong><span>{fr ? 'modalités d’apprentissage' : 'learning formats'}</span></div><div><strong>100%</strong><span>{fr ? 'données et contenus en français / anglais' : 'bilingual content and data'}</span></div></div></section>

      <section className="site-container home-tools"><div className="section-heading"><div><span className="eyebrow">{fr ? 'ACCÈS DIRECT' : 'DIRECT ACCESS'}</span><h2>{fr ? 'Les services de l’université' : 'University services'}</h2></div><button type="button" className="button-text" onClick={() => onNavigate('contacts')}>{fr ? 'Tous les contacts' : 'All contacts'} <ArrowRight size={16} /></button></div><div className="service-grid"><button type="button" onClick={onOpenSearch}><Search size={22} /><span>{fr ? 'Trouver une formation' : 'Find a program'}</span><small>{fr ? 'Catalogue, facultés et parcours' : 'Catalog, faculties and pathways'}</small></button><button type="button" onClick={onOpenApply}><GraduationCap size={22} /><span>{fr ? 'Candidater' : 'Apply'}</span><small>{fr ? 'Déposer et suivre un dossier' : 'Submit and track an application'}</small></button><button type="button" onClick={onOpenConsulting}><BriefcaseBusiness size={22} /><span>{fr ? 'Cabinet d’expertise' : 'Advisory unit'}</span><small>{fr ? 'Accompagnement des organisations' : 'Support for organizations'}</small></button><button type="button" onClick={() => onNavigate('actualites')}><CalendarDays size={22} /><span>{fr ? 'Actualités' : 'News'}</span><small>{fr ? 'Vie académique et événements' : 'Academic life and events'}</small></button></div></section>

      <section className="site-container program-section"><div className="program-section-heading"><div><span className="eyebrow">{fr ? 'FORMATIONS' : 'PROGRAMS'}</span><h2>{fr ? 'Choisir son parcours' : 'Choose your pathway'}</h2></div><BookOpen size={34} strokeWidth={1.2} /></div><ProgramSearch lang={lang} onApplyForProgram={onApplyForProgram} onSelectFaculty={() => onNavigate('facultes')} /></section>

      <section className="institutional-cta"><div className="site-container cta-inner"><div><span className="eyebrow eyebrow-light">PLURIPERF INTERNATIONAL UNIVERSITY</span><h2>{fr ? 'Construisons les compétences de demain.' : 'Building tomorrow’s capabilities.'}</h2></div><div className="cta-actions"><button type="button" className="button-light" onClick={onOpenApply}>{fr ? 'Candidater' : 'Apply now'} <ArrowRight size={16} /></button><button type="button" className="button-ghost-light" onClick={() => onNavigate('contacts')}>{fr ? 'Nous contacter' : 'Contact us'}</button></div></div></section>
    </div>
  );
};

export default HomePage;
