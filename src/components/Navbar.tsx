import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ExternalLink, GraduationCap, Menu, Search, X } from 'lucide-react';
import { PageId, Language } from '../types';
import { getT } from '../data/translations';
import { Logo } from './Logo';

interface NavbarProps {
  currentPage: PageId | string;
  user?: { fullName: string; role: string } | null;
  onLogout?: () => void;
  setCurrentPage?: (page: PageId) => void;
  onNavigate?: (page: PageId, sectionId?: string) => void;
  lang: Language;
  setLang?: (lang: Language) => void;
  onLanguageChange?: (lang: Language) => void;
  onOpenApply: () => void;
  onOpenSearch?: () => void;
  onOpenLogin: () => void;
  onOpenAppointment?: () => void;
  onOpenWhatsApp?: () => void;
}

const menuGroups: { key: string; labelFr: string; labelEn: string; pages: PageId[]; items: { page: PageId; fr: string; en: string }[] }[] = [
  {
    key: 'presentation', labelFr: 'PRÉSENTATION', labelEn: 'ABOUT', pages: ['universite'],
    items: [{ page: 'universite', fr: "L'Université", en: 'The University' }],
  },
  {
    key: 'academique', labelFr: 'FORMATION', labelEn: 'ACADEMICS', pages: ['formations', 'facultes', 'admissions'],
    items: [
      { page: 'formations', fr: 'Formations', en: 'Programs' },
      { page: 'facultes', fr: 'Facultés', en: 'Faculties' },
      { page: 'admissions', fr: 'Admissions', en: 'Admissions' },
    ],
  },
  {
    key: 'recherche', labelFr: 'RECHERCHES', labelEn: 'RESEARCH', pages: ['recherches'],
    items: [{ page: 'recherches', fr: 'Recherche & impact', en: 'Research & impact' }],
  },
  {
    key: 'innovation', labelFr: 'INNOVATIONS', labelEn: 'INNOVATION', pages: ['mere_nature', 'cabinet'],
    items: [
      { page: 'mere_nature', fr: 'Mère Nature Global', en: 'Mother Nature Global' },
      { page: 'cabinet', fr: "Cabinet d'expertise", en: 'Advisory unit' },
    ],
  },
  {
    key: 'vie', labelFr: "VIE À PLURIPERF", labelEn: 'CAMPUS LIFE', pages: ['campus_virtuel', 'bibliotheque', 'actualites', 'contacts'],
    items: [
      { page: 'campus_virtuel', fr: 'Campus virtuel', en: 'Virtual campus' },
      { page: 'bibliotheque', fr: 'Bibliothèque', en: 'Library' },
      { page: 'actualites', fr: 'Actualités', en: 'News' },
      { page: 'contacts', fr: 'Contacts', en: 'Contact' },
    ],
  },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPage, user, onLogout, setCurrentPage, onNavigate, lang, setLang, onLanguageChange,
  onOpenApply, onOpenSearch, onOpenLogin,
}) => {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const t = getT(lang);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) setOpen(null);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const navigate = (page: PageId) => {
    if (onNavigate) onNavigate(page);
    else setCurrentPage?.(page);
    setOpen(null);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const changeLanguage = (next: Language) => {
    onLanguageChange?.(next);
    setLang?.(next);
  };

  return (
    <header ref={navRef} className="site-header">
      <div className="utility-bar">
        <div className="site-container utility-inner">
          <div className="utility-links">
            <button type="button" onClick={() => navigate('actualites')}>Actualités</button>
            <button type="button" onClick={() => navigate('bibliotheque')}>Bibliothèque</button>
            <button type="button" onClick={() => navigate('contacts')}>Nous contacter</button>
            <span className="utility-separator">•</span>
            <span>PLURIPERF International University</span>
          </div>
          <div className="utility-actions">
            <div className="language-switch" aria-label="Choisir la langue">
              <button type="button" className={lang === 'fr' ? 'active' : ''} onClick={() => changeLanguage('fr')}>FR</button>
              <button type="button" className={lang === 'en' ? 'active' : ''} onClick={() => changeLanguage('en')}>EN</button>
            </div>
            <button type="button" className="student-link" onClick={() => navigate('campus_virtuel')}>
              <GraduationCap size={13} />
              <span>{lang === 'fr' ? 'ESPACE ÉTUDIANT' : 'STUDENT SPACE'}</span>
              <ExternalLink size={12} />
            </button>
          </div>
        </div>
      </div>

      <div className="main-nav-wrap">
        <div className="site-container main-nav">
          <button type="button" className="brand-button" onClick={() => navigate('accueil')} aria-label="Accueil PLURIPERF">
            <Logo variant="full-horizontal" theme="light" size="md" />
          </button>

          <nav className="desktop-nav" aria-label="Navigation principale">
            <button type="button" className={currentPage === 'accueil' ? 'nav-link active' : 'nav-link'} onClick={() => navigate('accueil')}>
              {t.nav.accueil.toUpperCase()}
            </button>
            {menuGroups.map((group) => {
              const active = group.pages.includes(currentPage as PageId);
              return (
                <div className="nav-group" key={group.key}>
                  <button type="button" className={`nav-link ${active || open === group.key ? 'active' : ''}`} onClick={() => setOpen(open === group.key ? null : group.key)} aria-expanded={open === group.key}>
                    {lang === 'fr' ? group.labelFr : group.labelEn}<ChevronDown size={13} />
                  </button>
                  {open === group.key && (
                    <div className="nav-dropdown">
                      {group.items.map((item) => (
                        <button type="button" key={item.page} onClick={() => navigate(item.page)} className={currentPage === item.page ? 'dropdown-item active' : 'dropdown-item'}>
                          {lang === 'fr' ? item.fr : item.en}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="nav-actions">
            {onOpenSearch && <button type="button" className="icon-action" onClick={onOpenSearch} aria-label="Rechercher"><Search size={18} /></button>}
            {user ? (
              <button type="button" className="login-action" onClick={onLogout}>{lang === 'fr' ? 'DÉCONNEXION' : 'SIGN OUT'}</button>
            ) : (
              <button type="button" className="login-action" onClick={onOpenLogin}>{lang === 'fr' ? 'CONNEXION' : 'SIGN IN'}</button>
            )}
            <button type="button" className="apply-action" onClick={onOpenApply}>{lang === 'fr' ? 'CANDIDATER' : 'APPLY'}</button>
            <button type="button" className="mobile-menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-label="Menu">
              {mobileOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-nav" role="dialog" aria-label="Menu mobile">
          <button type="button" className={currentPage === 'accueil' ? 'mobile-link active' : 'mobile-link'} onClick={() => navigate('accueil')}>Accueil</button>
          {menuGroups.map((group) => (
            <div key={group.key} className="mobile-group">
              <button type="button" className="mobile-group-title" onClick={() => setOpen(open === group.key ? null : group.key)}>
                {lang === 'fr' ? group.labelFr : group.labelEn}<ChevronDown size={15} className={open === group.key ? 'rotate-180' : ''} />
              </button>
              {open === group.key && group.items.map((item) => <button type="button" key={item.page} className="mobile-sublink" onClick={() => navigate(item.page)}>{lang === 'fr' ? item.fr : item.en}</button>)}
            </div>
          ))}
          <div className="mobile-actions">
            <button type="button" onClick={onOpenApply} className="apply-action">{lang === 'fr' ? 'CANDIDATER' : 'APPLY'}</button>
            <button type="button" onClick={onOpenLogin} className="login-action">{lang === 'fr' ? 'CONNEXION' : 'SIGN IN'}</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
