import React from 'react';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { PageId, Language } from '../types';
import { getT } from '../data/translations';
import { Logo } from './Logo';

interface FooterProps {
  setCurrentPage?: (page: PageId) => void;
  onNavigate?: (page: PageId) => void;
  lang: Language;
  onOpenApply: () => void;
  onOpenSearch?: () => void;
  onOpenAppointment?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage, onNavigate, lang, onOpenApply, onOpenSearch, onOpenAppointment }) => {
  const t = getT(lang);
  const go = (page: PageId) => {
    onNavigate?.(page);
    setCurrentPage?.(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="site-container footer-topline">
        <div><span className="eyebrow eyebrow-light">PLURIPERF</span><h2>{lang === 'fr' ? 'Former, rechercher, transformer.' : 'Educate, research, transform.'}</h2></div>
        <button type="button" className="footer-cta" onClick={onOpenApply}>{lang === 'fr' ? 'Rejoindre l’université' : 'Join the university'} <ArrowUpRight size={16} /></button>
      </div>
      <div className="site-container footer-grid">
        <div className="footer-brand">
          <Logo variant="full-stacked" theme="dark" size="md" />
          <p>{t.footer.aboutText}</p>
          <div className="footer-contact"><span><MapPin size={15} /> Abidjan · Côte d’Ivoire</span><span><Phone size={15} /> +225 07 00 00 00 00</span><a href="mailto:contact@pluriperf.com"><Mail size={15} /> contact@pluriperf.com</a></div>
        </div>
        <div><h3>{lang === 'fr' ? 'L’université' : 'The university'}</h3><button type="button" onClick={() => go('universite')}>Présentation</button><button type="button" onClick={() => go('facultes')}>Facultés</button><button type="button" onClick={() => go('recherches')}>Recherche</button><button type="button" onClick={() => go('actualites')}>Actualités</button></div>
        <div><h3>{lang === 'fr' ? 'Formations' : 'Academics'}</h3><button type="button" onClick={() => go('formations')}>Catalogue</button><button type="button" onClick={() => go('admissions')}>Admissions</button><button type="button" onClick={() => go('bibliotheque')}>Bibliothèque</button><button type="button" onClick={() => go('carrieres')}>Carrières</button></div>
        <div><h3>{lang === 'fr' ? 'Accès rapide' : 'Quick access'}</h3><button type="button" onClick={onOpenApply}>{lang === 'fr' ? 'Candidater' : 'Apply now'}</button>{onOpenSearch && <button type="button" onClick={onOpenSearch}>{lang === 'fr' ? 'Trouver une formation' : 'Find a program'}</button>}{onOpenAppointment && <button type="button" onClick={onOpenAppointment}>{lang === 'fr' ? 'Prendre rendez-vous' : 'Book an appointment'}</button>}<button type="button" onClick={() => go('contacts')}>Contact</button></div>
      </div>
      <div className="site-container footer-bottom"><span>© {new Date().getFullYear()} PLURIPERF International University</span><span>{lang === 'fr' ? 'Portail institutionnel bilingue' : 'Bilingual institutional portal'}</span></div>
    </footer>
  );
};

export default Footer;
