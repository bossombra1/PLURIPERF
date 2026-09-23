import React, { useState, useRef, useEffect } from 'react';
import { PageId, Language } from '../types';
import { getT } from '../data/translations';
import { Logo } from './Logo';
import {
  Search,
  LogIn,
  GraduationCap,
  Menu,
  X,
  ChevronDown,
  Building2,
  BookOpen,
  Award,
  Leaf,
  Briefcase,
  Globe2,
  Library,
  Newspaper,
  Mail,
  Compass,
  History,
  Shield,
  Layers,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

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

interface DropdownItem {
  id: PageId;
  sectionId?: string;
  labelFr: string;
  labelEn: string;
  descFr: string;
  descEn: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface DropdownGroup {
  key: string;
  titleFr: string;
  titleEn: string;
  activePages: PageId[];
  items: DropdownItem[];
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  user,
  onLogout,
  setCurrentPage,
  onNavigate,
  lang,
  setLang,
  onLanguageChange,
  onOpenApply,
  onOpenSearch,
  onOpenLogin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpenGroup, setMobileOpenGroup] = useState<string | null>('universite');
  const navRef = useRef<HTMLDivElement>(null);

  const t = getT(lang);\n  const activePage = String(currentPage).replace(/^\//, '').split('/')[0] || 'accueil';

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigate = (page: PageId, sectionId?: string) => {
    if (onNavigate) {
      onNavigate(page, sectionId);
    } else if (setCurrentPage) {
      setCurrentPage(page);
    }
    setActiveDropdown(null);
    setMobileMenuOpen(false);

    if (sectionId && page === activePage) {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (!sectionId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSetLang = (newLang: Language) => {
    if (onLanguageChange) {
      onLanguageChange(newLang);
    } else if (setLang) {
      setLang(newLang);
    }
  };

  // Structured thematic groupings to prevent horizontal navbar clutter
  const dropdownGroups: DropdownGroup[] = [
    {
      key: 'universite',
      titleFr: "L'Université",
      titleEn: 'The University',
      activePages: ['universite'],
      items: [
        {
          id: 'universite',
          sectionId: 'presentation',
          labelFr: 'Présentation & Chiffres clés',
          labelEn: 'Overview & Key Figures',
          descFr: 'Identité pionnière, campus et statistiques mondiales',
          descEn: 'Pioneering identity, global campus and metrics',
          icon: Building2,
        },
        {
          id: 'universite',
          sectionId: 'vision',
          labelFr: 'Vision & Valeurs Fondatrices',
          labelEn: 'Vision & Core Values',
          descFr: 'Respect du Vivant, rigueur scientifique et éthique',
          descEn: 'Reverence for life, rigor and regenerative ethics',
          icon: Compass,
        },
        {
          id: 'universite',
          sectionId: 'motPresident',
          labelFr: 'Mot du Président-Fondateur',
          labelEn: "President's Charter Address",
          descFr: 'L’engagement solennel pour le monde durable',
          descEn: 'Solemn commitment to our planetary future',
          icon: Sparkles,
        },
        {
          id: 'universite',
          sectionId: 'histoire',
          labelFr: 'Histoire & Jalons Clés',
          labelEn: 'History & Milestones',
          descFr: 'De la chaire exploratoire à l’institution mondiale',
          descEn: 'From exploratory chair to global charter',
          icon: History,
        },
        {
          id: 'universite',
          sectionId: 'gouvernance',
          labelFr: 'Gouvernance & Conseils',
          labelEn: 'Governance & Senates',
          descFr: 'Conseil d’administration, sénat et comité d’éthique',
          descEn: 'Board of directors, academic senate and ethics board',
          icon: Shield,
        },
        {
          id: 'universite',
          sectionId: 'min',
          labelFr: 'Le Modèle MIN (Inspiré de la Nature)',
          labelEn: 'The NIM Model (Nature-Inspired)',
          descFr: 'Biomimétisme managérial et écologie systémique',
          descEn: 'Managerial biomimicry and systemic ecology',
          icon: Leaf,
          badge: 'Signature',
        },
        {
          id: 'universite',
          sectionId: 'reconnaissances',
          labelFr: 'Agréments & Partenaires',
          labelEn: 'Accreditations & Alliances',
          descFr: 'Conformité ECTS, agréments et réseau de 120+ partenaires',
          descEn: 'ECTS standards, global charters and 120+ alliances',
          icon: Award,
        },
      ],
    },
    {
      key: 'academique',
      titleFr: 'Formations & Facultés',
      titleEn: 'Academics & Degrees',
      activePages: ['facultes', 'formations', 'admissions'],
      items: [
        {
          id: 'facultes',
          labelFr: 'Nos 9 Facultés Pionnières',
          labelEn: 'Our 9 Pioneer Faculties',
          descFr: 'Écologie, économie circulaire, agroécologie, énergies...',
          descEn: 'Ecological sciences, circularity, green transition...',
          icon: Layers,
          badge: '9 Facultés',
        },
        {
          id: 'formations',
          labelFr: 'Catalogue des Diplômes & Formations',
          labelEn: 'Academic Programs & Degrees',
          descFr: 'Bachelors, Masters, Doctorats / PhD et Certificats',
          descEn: 'Bachelors, Masters, PhD and Executive Certificates',
          icon: BookOpen,
        },
        {
          id: 'admissions',
          labelFr: 'Admissions, Critères & Bourses',
          labelEn: 'Admissions & Scholarships',
          descFr: 'Calendrier des candidatures, prérequis et accompagnement',
          descEn: 'Application schedule, criteria and funding',
          icon: GraduationCap,
          badge: 'Ouvert',
        },
      ],
    },
    {
      key: 'recherche',
      titleFr: 'Recherche & Impact',
      titleEn: 'Research & Impact',
      activePages: ['recherches', 'cabinet', 'mere_nature'],
      items: [
        {
          id: 'recherches',
          labelFr: 'MIN Research Institute',
          labelEn: 'MIN Research Institute',
          descFr: 'Laboratoires de recherche appliquée et brevets durables',
          descEn: 'Applied research labs and regenerative publications',
          icon: Leaf,
        },
        {
          id: 'cabinet',
          labelFr: 'Cabinet d’Études & Conseil ESG',
          labelEn: 'Consulting & ESG Advisory',
          descFr: 'Audit de régénération organisationnelle et bilans carbone',
          descEn: 'Corporate transition audits and carbon strategies',
          icon: Briefcase,
        },
        {
          id: 'mere_nature',
          labelFr: 'Alliance Mère Nature Global',
          labelEn: 'Mother Nature Global Alliance',
          descFr: 'Initiative mondiale pour la protection des écosystèmes',
          descEn: 'Global initiative for biodiversity and climate action',
          icon: Globe2,
        },
      ],
    },
    {
      key: 'campus',
      titleFr: 'Campus & Ressources',
      titleEn: 'Campus & Resources',
      activePages: ['campus_virtuel', 'bibliotheque', 'actualites'],
      items: [
        {
          id: 'campus_virtuel',
          labelFr: 'Campus Virtuel (Espace Étudiant)',
          labelEn: 'Virtual Campus (Student Portal)',
          descFr: 'Accès aux cours en ligne, examens, devoirs et messagerie',
          descEn: 'Interactive coursework, exams, grades and messaging',
          icon: GraduationCap,
          badge: 'Interactif',
        },
        {
          id: 'bibliotheque',
          labelFr: 'Bibliothèque Numérique',
          labelEn: 'Digital Library & Research Hub',
          descFr: '12 000+ ouvrages, revues scientifiques, thèses et rapports',
          descEn: '12,000+ publications, scientific journals and theses',
          icon: Library,
        },
        {
          id: 'actualites',
          labelFr: 'Actualités & Colloques',
          labelEn: 'News & Symposia',
          descFr: 'Événements scientifiques, colloques SIEDS et annonces',
          descEn: 'Academic symposia, SIEDS events and campus bulletins',
          icon: Newspaper,
        },
      ],
    },
  ];

  const isGroupActive = (group: DropdownGroup) => group.activePages.includes(activePage as PageId);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs" ref={navRef}>
      {/* Top Academic Ribbon with Official Motto */}
      <div className="bg-[#173f38] text-white text-xs py-1.5 px-4 sm:px-8 border-b border-[#b56f45]/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden text-slate-300">
            <span className="font-bold text-[#b56f45] tracking-wider text-[11px] uppercase">
              PLURIPERF
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="truncate text-slate-300 text-[11px] sm:text-xs">
              {lang === 'fr'
                ? "1ère Université de Management Durable, d'Écologie responsable et de Leadership régénératif"
                : '1st University of Sustainable Management - Responsible Ecology & Regenerative Leadership'}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Language toggle */}
            <div className="flex items-center bg-[#12332e] rounded border border-[#2a5048] p-0.5 text-[11px]">
              <button
                type="button"
                onClick={() => handleSetLang('fr')}
                className={`px-2 py-0.5 font-bold rounded transition-colors ${
                  lang === 'fr'
                    ? 'bg-[#b56f45] text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => handleSetLang('en')}
                className={`px-2 py-0.5 font-bold rounded transition-colors ${
                  lang === 'en'
                    ? 'bg-[#b56f45] text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            <span className="text-slate-600 hidden md:inline">·</span>
            <span className="text-[11px] text-[#d0ad72] hidden md:inline italic font-serif">
              {t.institutionalPromiseEnglish}
            </span>
          </div>
        </div>
      </div>

      {/* Main Bar complying with Top Bar Contract: Zone 1 (Brand), Zone 2 (Grouped Compact Nav), Zone 3 (Actions) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 min-h-[4.5rem] py-2 flex items-center justify-between gap-2 sm:gap-4 border-b border-slate-200">
        {/* Zone 1: Official Logo */}
        <button
          type="button"
          onClick={() => handleNavigate('accueil')}
          className="flex items-center text-left focus:outline-none group transition-opacity hover:opacity-95 shrink-0"
          title="Accueil PLURIPERF"
        >
          <Logo variant="full-horizontal" size="md" theme="light" />
        </button>

        {/* Zone 2: Navigation Links arranged into compact, logical dropdowns */}
        <nav className="hidden lg:flex flex-1 min-w-0 items-center justify-center gap-0.5 xl:gap-1 text-[12px] xl:text-[13px] font-semibold text-slate-700 overflow-visible">
          {/* Direct link: Accueil */}
          <button
            type="button"
            onClick={() => handleNavigate('accueil')}
            className={`px-2 xl:px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
              activePage === 'accueil'
                ? 'text-[#173f38] font-bold bg-slate-100/90 text-[#b56f45]'
                : 'text-slate-700 hover:text-[#b56f45] hover:bg-slate-50'
            }`}
          >
            {t.nav.accueil}
          </button>

          {/* Dynamic Compact Dropdown Groups */}
          {dropdownGroups.map((group) => {
            const isOpen = activeDropdown === group.key;
            const active = isGroupActive(group);
            return (
              <div
                key={group.key}
                className="relative"
                onMouseEnter={() => setActiveDropdown(group.key)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(isOpen ? null : group.key)}
                  className={`flex items-center gap-1 px-2 xl:px-3 py-2 rounded-lg transition-all whitespace-nowrap ${
                    active || isOpen
                      ? 'text-[#173f38] font-bold bg-slate-100/80 text-[#b56f45]'
                      : 'text-slate-700 hover:text-[#b56f45] hover:bg-slate-50'
                  }`}
                  aria-expanded={isOpen}
                >
                  <span>{lang === 'fr' ? group.titleFr : group.titleEn}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#b56f45]' : 'text-slate-400'
                    }`}
                  />
                </button>

                {/* Dropdown Menu Popover */}
                {isOpen && (
                  <div className="absolute left-0 top-full mt-1 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      <span>{lang === 'fr' ? group.titleFr : group.titleEn}</span>
                      <span className="text-[#b56f45] font-normal normal-case">
                        {group.items.length} {lang === 'fr' ? 'sections' : 'items'}
                      </span>
                    </div>

                    <div className="py-1 max-h-[70vh] overflow-y-auto">
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        const isCurrent =
                          activePage === item.id &&
                          (!item.sectionId ||
                            (typeof window !== 'undefined' &&
                              window.location.hash === `#${item.sectionId}`));
                        return (
                          <button
                            key={`${item.id}-${item.sectionId || ''}`}
                            type="button"
                            onClick={() => handleNavigate(item.id, item.sectionId)}
                            className={`w-full text-left px-4 py-2.5 transition-colors flex items-start gap-3 group/item ${
                              isCurrent
                                ? 'bg-[#f5ebe4] text-[#b56f45]'
                                : 'hover:bg-slate-50 text-slate-800'
                            }`}
                          >
                            <div
                              className={`p-2 rounded-xl shrink-0 transition-colors ${
                                isCurrent
                                  ? 'bg-[#b56f45] text-white'
                                  : 'bg-slate-100 text-slate-600 group-hover/item:bg-[#f1e1d6] group-hover/item:text-[#b56f45]'
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-xs text-slate-900 group-hover/item:text-[#b56f45] leading-snug">
                                  {lang === 'fr' ? item.labelFr : item.labelEn}
                                </span>
                                {item.badge && (
                                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#f1e1d6] text-[#b56f45] uppercase tracking-wide">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 leading-tight">
                                {lang === 'fr' ? item.descFr : item.descEn}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Direct link: Contacts */}
          <button
            type="button"
            onClick={() => handleNavigate('contacts')}
            className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
              activePage === 'contacts'
                ? 'text-[#173f38] font-bold bg-slate-100/90 text-[#b56f45]'
                : 'text-slate-700 hover:text-[#b56f45] hover:bg-slate-50'
            }`}
          >
            {t.nav.contacts}
          </button>
        </nav>

        {/* Zone 3: Permanent Core Actions */}
        <div className="hidden xl:flex items-center gap-2 shrink-0">
          {/* Permanent Button 1: Trouver une formation */}
          <button
            type="button"
            onClick={onOpenSearch || (() => handleNavigate('formations'))}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 rounded-lg transition-colors whitespace-nowrap"
            title={t.buttons.findProgram}
          >
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden xl:inline">{t.buttons.findProgram}</span>
            <span className="xl:hidden">{lang === 'fr' ? 'Formations' : 'Degrees'}</span>
          </button>

          {/* Permanent Button 2: Candidater */}
          <button
            type="button"
            onClick={onOpenApply}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#b56f45] hover:bg-[#995938] active:scale-[0.98] rounded-lg shadow-xs transition-all whitespace-nowrap"
          >
            <GraduationCap className="w-4 h-4" />
            <span>{t.buttons.apply}</span>
          </button>

          {/* Permanent Button 3: Espace Campus / Se connecter */}
          {user ? (
            <div className="flex items-center gap-2">
              {['admin', 'super_admin', 'advisor', 'editor'].includes(user.role) && (
                <button
                  type="button"
                  onClick={() => handleNavigate('contacts')}
                  className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors"
                  title="Administration"
                >
                  <Shield className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Admin</span>
                </button>
              )}
              <span className="hidden lg:block text-xs font-semibold text-slate-700 max-w-32 truncate">
                {user.fullName}
              </span>
              <button
                type="button"
                onClick={onLogout}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors"
              >
                <LogIn className="w-3.5 h-3.5 text-[#b56f45] rotate-180" />
                <span>{lang === 'fr' ? 'Quitter' : 'Logout'}</span>
              </button>
            </div>
          ) : (
          <button
            type="button"
            onClick={onOpenLogin}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors whitespace-nowrap shadow-2xs"
          >
            <LogIn className="w-3.5 h-3.5 text-[#b56f45]" />
            <span>{t.buttons.login}</span>
          </button>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 xl:hidden shrink-0">
          <button
            type="button"
            onClick={onOpenApply}
            className="sm:hidden px-3 py-1.5 text-xs font-bold bg-[#b56f45] text-white rounded-lg"
          >
            {t.buttons.apply}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1f5b50] hover:text-[#b56f45] hover:bg-[#f0eee8] rounded-lg"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-slate-700" />
            ) : (
              <Menu className="w-5 h-5 text-slate-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer with Accordion Groups for compact clear browsing */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-slate-200 bg-white px-3 sm:px-4 pt-3 pb-6 space-y-3 shadow-lg max-h-[calc(100vh-7rem)] overflow-y-auto">
          {/* Quick Actions Row */}
          <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-2 pb-2 border-b border-slate-100">
            <button
              type="button"
              onClick={() => {
                if (onOpenSearch) onOpenSearch();
                else handleNavigate('formations');
              }}
              className="flex items-center justify-center gap-2 min-h-10 p-2.5 text-xs font-semibold bg-slate-100 text-slate-800 rounded-lg border border-slate-200"
            >
              <Search className="w-4 h-4 text-slate-500" />
              <span>{t.buttons.findProgram}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onOpenLogin();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 p-2.5 text-xs font-semibold bg-slate-100 text-slate-800 rounded-lg border border-slate-200"
            >
              <LogIn className="w-4 h-4 text-[#b56f45]" />
              <span>{t.buttons.login}</span>
            </button>
          </div>

          {/* Direct Accueil Link */}
          <button
            type="button"
            onClick={() => handleNavigate('accueil')}
            className={`w-full text-left px-3 py-2 rounded-lg font-bold text-sm transition-colors ${
              currentPage === 'accueil'
                ? 'bg-[#f5ebe4] text-[#b56f45]'
                : 'text-slate-800 hover:bg-slate-100'
            }`}
          >
            {t.nav.accueil}
          </button>

          {/* Accordion Dropdown Groups in Mobile */}
          <div className="space-y-1.5">
            {dropdownGroups.map((group) => {
              const isOpen = mobileOpenGroup === group.key;
              const active = isGroupActive(group);
              return (
                <div key={group.key} className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setMobileOpenGroup(isOpen ? null : group.key)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold text-left transition-colors ${
                      active
                        ? 'bg-[#f5ebe4]/70 text-[#b56f45]'
                        : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <span>{lang === 'fr' ? group.titleFr : group.titleEn}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isOpen ? 'rotate-180 text-[#b56f45]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="bg-white px-2 py-1.5 space-y-1 border-t border-slate-100">
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        const isCurrent = currentPage === item.id;
                        return (
                          <button
                            key={`${item.id}-${item.sectionId || ''}`}
                            type="button"
                            onClick={() => handleNavigate(item.id, item.sectionId)}
                            className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center gap-2.5 transition-colors ${
                              isCurrent
                                ? 'bg-[#f5ebe4] text-[#b56f45] font-bold'
                                : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span className="truncate">{lang === 'fr' ? item.labelFr : item.labelEn}</span>
                            {item.badge && (
                              <span className="ml-auto text-[9px] font-bold px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded">
                                {item.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Direct Contacts Link */}
          <button
            type="button"
            onClick={() => handleNavigate('contacts')}
            className={`w-full text-left px-3 py-2 rounded-lg font-bold text-sm transition-colors ${
              currentPage === 'contacts'
                ? 'bg-[#f5ebe4] text-[#b56f45]'
                : 'text-slate-800 hover:bg-slate-100'
            }`}
          >
            {t.nav.contacts}
          </button>

          {/* Apply Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                onOpenApply();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-[#b56f45] hover:bg-[#995938] font-bold text-white rounded-lg text-sm flex items-center justify-center gap-2 shadow"
            >
              <GraduationCap className="w-4 h-4" />
              <span>{t.buttons.apply}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
