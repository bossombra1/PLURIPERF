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
  Phone,
  Compass,
  History,
  Shield,
  Layers,
  Sparkles,
  Calendar,
  MessageSquare,
  LogOut,
  User,
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
  onOpenAppointment,
  onOpenWhatsApp,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpenGroup, setMobileOpenGroup] = useState<string | null>('universite');
  const navRef = useRef<HTMLDivElement>(null);

  const t = getT(lang);
  const activePage = String(currentPage).replace(/^\//, '').split('/')[0] || 'accueil';

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

  // Structured thematic groupings modeled after academic portals like INP-HB
  const dropdownGroups: DropdownGroup[] = [
    {
      key: 'universite',
      titleFr: "L'Université",
      titleEn: 'The University',
      activePages: [
        'universite',
        'universite_presentation',
        'universite_mot_president',
        'universite_vision',
        'universite_min',
        'universite_histoire',
        'universite_gouvernance',
        'universite_reconnaissances',
      ],
      items: [
        {
          id: 'universite_presentation',
          labelFr: 'Présentation & Chiffres clés',
          labelEn: 'Overview & Key Figures',
          descFr: 'Identité pionnière, campus et statistiques mondiales',
          descEn: 'Pioneering identity, global campus and metrics',
          icon: Building2,
        },
        {
          id: 'universite_mot_president',
          labelFr: 'Mot du Recteur-Président',
          labelEn: "Rector's Address",
          descFr: 'L’engagement solennel pour le monde durable',
          descEn: 'Solemn commitment to our planetary future',
          icon: Sparkles,
        },
        {
          id: 'universite_vision',
          labelFr: 'Vision & Valeurs Fondatrices',
          labelEn: 'Vision & Core Values',
          descFr: 'Écologie responsable, rigueur scientifique et éthique',
          descEn: 'Reverence for life, rigor and regenerative ethics',
          icon: Compass,
        },
        {
          id: 'universite_min',
          labelFr: 'Le Modèle MIN (Inspiré de la Nature)',
          labelEn: 'The NIM Model (Nature-Inspired)',
          descFr: 'Biomimétisme managérial et écologie systémique',
          descEn: 'Managerial biomimicry and systemic ecology',
          icon: Leaf,
          badge: 'Signature',
        },
        {
          id: 'universite_histoire',
          labelFr: 'Histoire & Jalons Clés',
          labelEn: 'History & Milestones',
          descFr: 'De la fondation aux campus internationaux',
          descEn: 'From inception to international campuses',
          icon: History,
        },
        {
          id: 'universite_gouvernance',
          labelFr: 'Gouvernance & Conseils',
          labelEn: 'Governance & Senates',
          descFr: 'Conseil d’administration et sénat académique',
          descEn: 'Board of directors and academic senate',
          icon: Shield,
        },
        {
          id: 'universite_reconnaissances',
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
          labelFr: 'Nos 9 Facultés d’Excellence',
          labelEn: 'Our 9 Specialized Faculties',
          descFr: 'Écologie, agroécologie, finance durable, énergies...',
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
          labelFr: 'Admissions, Concours & Bourses',
          labelEn: 'Admissions & Scholarships',
          descFr: 'Calendrier des candidatures, prérequis et bourses',
          descEn: 'Application schedule, criteria and funding',
          icon: GraduationCap,
          badge: 'Session Ouverte',
        },
      ],
    },
    {
      key: 'recherche',
      titleFr: 'Recherche & Cabinet',
      titleEn: 'Research & Consulting',
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
          descFr: 'Initiative mondiale pour la préservation des écosystèmes',
          descEn: 'Global initiative for biodiversity and climate action',
          icon: Globe2,
        },
      ],
    },
    {
      key: 'campus',
      titleFr: 'Campus & Vie Étudiante',
      titleEn: 'Campus & Resources',
      activePages: ['campus_virtuel', 'bibliotheque', 'actualites', 'carrieres'],
      items: [
        {
          id: 'campus_virtuel',
          labelFr: 'Campus Virtuel & E-Learning',
          labelEn: 'Virtual Campus & E-Learning',
          descFr: 'Plateforme académique numérique, cours et évaluations',
          descEn: 'Online LMS, live classes and coursework',
          icon: GraduationCap,
          badge: 'E-Campus',
        },
        {
          id: 'bibliotheque',
          labelFr: 'Bibliothèque & Ressources Numériques',
          labelEn: 'Library & Digital Repositories',
          descFr: 'Thèses, articles indexés, manuels et bases de données',
          descEn: 'Theses, indexed journals, e-books and archives',
          icon: Library,
        },
        {
          id: 'actualites',
          labelFr: 'Actualités & Événements',
          labelEn: 'News & Events',
          descFr: 'Colloques, soutenances, cérémonies et vie du campus',
          descEn: 'Conferences, defenses, events and academic life',
          icon: Newspaper,
        },
      ],
    },
  ];

  return (
    <header className="w-full z-40 relative bg-white" ref={navRef}>
      {/* 1. Top Bar / Toolbar - Exact INP-HB style with contact info, campus and utility links */}
      <div className="bg-white border-b border-[#eaeaea] text-xs text-[#555555]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-10">
          {/* Left contact info */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="tel:+2252722598800"
              className="flex items-center gap-1.5 hover:text-[#008629] font-medium transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#008629]" />
              <span className="hidden sm:inline">+225 27 22 59 88 00 / 05 01 80 00 19</span>
              <span className="sm:hidden">+225 27 22 59 88 00</span>
            </a>
            <div className="hidden md:flex items-center gap-1 text-[#888888]">
              <span>Campus :</span>
              <span className="font-semibold text-[#333333]">Abidjan • Yamoussoukro • Paris • Genève</span>
            </div>
            <a
              href="mailto:contact@pluriperf.com"
              className="hidden lg:flex items-center gap-1.5 hover:text-[#008629] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#008629]" />
              <span>contact@pluriperf.com</span>
            </a>
          </div>

          {/* Right utility links & Language switch */}
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              onClick={() => handleNavigate('campus_virtuel')}
              className="hover:text-[#008629] font-medium flex items-center gap-1"
            >
              <span className="w-2 h-2 rounded-full bg-[#008629]"></span>
              E-Campus
            </button>

            <button
              onClick={() => handleNavigate('bibliotheque')}
              className="hidden sm:inline-block hover:text-[#008629] transition-colors"
            >
              Bibliothèque
            </button>

            {onOpenAppointment && (
              <button
                onClick={onOpenAppointment}
                className="hidden md:flex items-center gap-1 hover:text-[#008629] transition-colors"
              >
                <Calendar className="w-3 h-3 text-[#f77f00]" />
                <span>Prendre RDV</span>
              </button>
            )}

            {/* Language switch */}
            <div className="flex items-center border border-[#e2e8f0] rounded overflow-hidden text-[11px] font-bold">
              <button
                onClick={() => handleSetLang('fr')}
                className={`px-2 py-0.5 transition-colors ${
                  lang === 'fr'
                    ? 'bg-[#008629] text-white'
                    : 'bg-gray-50 text-[#666666] hover:text-[#008629]'
                }`}
              >
                FR
              </button>
              <button
                onClick={() => handleSetLang('en')}
                className={`px-2 py-0.5 transition-colors ${
                  lang === 'en'
                    ? 'bg-[#008629] text-white'
                    : 'bg-gray-50 text-[#666666] hover:text-[#008629]'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Masthead (Navbar) - White background with soft institutional shadow */}
      <div className="bg-white shadow-[0px_4px_20px_0px_rgba(0,0,0,0.06)] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          {/* Official Logo (Left column with reserved minimum width) */}
          <div className="flex-shrink-0 flex items-center min-w-[200px] xl:min-w-[240px]">
            <button
              onClick={() => handleNavigate('accueil')}
              className="flex items-center text-left cursor-pointer group focus:outline-none"
              title="PLURIPERF International University"
            >
              <Logo size="md" variant="full-horizontal" />
            </button>
          </div>

          {/* Desktop Navigation Links - Perfectly centered between left and right */}
          <nav className="hidden lg:flex items-center justify-center flex-1 px-2 xl:px-4 gap-1 xl:gap-2">
            {/* Accueil */}
            <button
              onClick={() => handleNavigate('accueil')}
              className={`px-2.5 xl:px-3.5 py-2 text-[14px] xl:text-[15px] font-medium transition-colors cursor-pointer rounded whitespace-nowrap ${
                activePage === 'accueil'
                  ? 'text-[#008629] font-semibold'
                  : 'text-[#111827] hover:text-[#008629]'
              }`}
            >
              {lang === 'fr' ? 'Accueil' : 'Home'}
            </button>

            {/* Thematic Dropdowns */}
            {dropdownGroups.map((group) => {
              const isGroupActive = group.activePages.includes(activePage as PageId);
              const isOpen = activeDropdown === group.key;

              return (
                <div key={group.key} className="relative">
                  <button
                    onClick={() => setActiveDropdown(isOpen ? null : group.key)}
                    onMouseEnter={() => setActiveDropdown(group.key)}
                    className={`flex items-center gap-1 px-2.5 xl:px-3.5 py-2 text-[14px] xl:text-[15px] font-medium transition-colors cursor-pointer rounded whitespace-nowrap ${
                      isGroupActive
                        ? 'text-[#008629] font-semibold'
                        : 'text-[#111827] hover:text-[#008629]'
                    }`}
                  >
                    <span>{lang === 'fr' ? group.titleFr : group.titleEn}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 text-gray-500 ${
                        isOpen ? 'rotate-180 text-[#008629]' : ''
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu Panel */}
                  {isOpen && (
                    <div
                      onMouseLeave={() => setActiveDropdown(null)}
                      className={`absolute ${
                        group.key === 'campus' ? 'right-0' : 'left-0'
                      } mt-1 w-80 bg-white border border-[#eaeaea] shadow-xl rounded-md py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150`}
                    >
                      {/* Submenu Header Indicator */}
                      <div className="px-4 py-1.5 border-b border-gray-100 mb-1 flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#008629]">
                          {lang === 'fr' ? group.titleFr : group.titleEn}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {group.items.length} {lang === 'fr' ? 'rubriques' : 'sections'}
                        </span>
                      </div>

                      <div className="max-h-[70vh] overflow-y-auto divide-y divide-gray-50">
                        {group.items.map((item, idx) => {
                          const Icon = item.icon;
                          return (
                            <button
                              key={idx}
                              onClick={() => handleNavigate(item.id, item.sectionId)}
                              className="w-full text-left px-4 py-2.5 flex items-start gap-3 hover:bg-[#f8fafc] group/item transition-colors"
                            >
                              <div className="p-1.5 rounded bg-gray-100 text-[#008629] group-hover/item:bg-[#008629] group-hover/item:text-white transition-colors mt-0.5">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-sm font-semibold text-[#111827] group-hover/item:text-[#008629] transition-colors leading-tight">
                                    {lang === 'fr' ? item.labelFr : item.labelEn}
                                  </span>
                                  {item.badge && (
                                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-amber-50 text-[#f77f00] border border-amber-200">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[12px] text-gray-500 line-clamp-1 mt-0.5">
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

            {/* Contacts */}
            <button
              onClick={() => handleNavigate('contacts')}
              className={`px-2.5 xl:px-3.5 py-2 text-[14px] xl:text-[15px] font-medium transition-colors cursor-pointer rounded whitespace-nowrap ${
                activePage === 'contacts'
                  ? 'text-[#008629] font-semibold'
                  : 'text-[#111827] hover:text-[#008629]'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action buttons (Search, Login, Mobile Toggle with matching reserved width) */}
          <div className="flex-shrink-0 min-w-[200px] xl:min-w-[240px] flex items-center justify-end gap-2 sm:gap-3">
            {/* Search button */}
            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                aria-label="Recherche"
                className="p-2 text-gray-600 hover:text-[#008629] hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            {/* Login / Portal button */}
            {user ? (
              <button
                onClick={() => handleNavigate('campus_virtuel')}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded border border-[#008629] text-[#008629] hover:bg-[#008629] hover:text-white transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span className="truncate max-w-[110px]">{user.fullName}</span>
              </button>
            ) : (
              <button
                onClick={onOpenLogin}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded text-gray-700 hover:text-[#008629] border border-gray-300 hover:border-[#008629] transition-colors cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-[#008629]" />
                <span>Connexion</span>
              </button>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-[#008629] rounded focus:outline-none cursor-pointer"
              aria-label="Ouvrir le menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[120px] bottom-0 bg-white z-50 overflow-y-auto border-t border-gray-200 p-4 pb-20 shadow-2xl animate-in slide-in-from-top-4">
          <div className="space-y-3">
            {/* Direct Link: Accueil */}
            <button
              onClick={() => handleNavigate('accueil')}
              className={`w-full text-left px-4 py-3 rounded text-base font-semibold ${
                activePage === 'accueil'
                  ? 'bg-green-50 text-[#008629] border-l-4 border-[#008629]'
                  : 'text-gray-800 hover:bg-gray-50'
              }`}
            >
              {lang === 'fr' ? 'Accueil' : 'Home'}
            </button>

            {/* Thematic Dropdown Accordions */}
            {dropdownGroups.map((group) => {
              const isGroupOpen = mobileOpenGroup === group.key;
              return (
                <div key={group.key} className="border border-gray-200 rounded overflow-hidden">
                  <button
                    onClick={() => setMobileOpenGroup(isGroupOpen ? null : group.key)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 text-base font-semibold text-gray-800 hover:bg-gray-100"
                  >
                    <span>{lang === 'fr' ? group.titleFr : group.titleEn}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform ${
                        isGroupOpen ? 'rotate-180 text-[#008629]' : ''
                      }`}
                    />
                  </button>

                  {isGroupOpen && (
                    <div className="bg-white divide-y divide-gray-100 p-2 space-y-1">
                      {group.items.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleNavigate(item.id, item.sectionId)}
                            className="w-full text-left px-3 py-2.5 rounded flex items-center gap-3 hover:bg-gray-50 text-sm font-medium text-gray-700"
                          >
                            <Icon className="w-4 h-4 text-[#008629]" />
                            <div className="flex-1">
                              <div>{lang === 'fr' ? item.labelFr : item.labelEn}</div>
                              {item.badge && (
                                <span className="text-[10px] text-[#f77f00] font-semibold">
                                  • {item.badge}
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Direct Link: Contacts */}
            <button
              onClick={() => handleNavigate('contacts')}
              className={`w-full text-left px-4 py-3 rounded text-base font-semibold ${
                activePage === 'contacts'
                  ? 'bg-green-50 text-[#008629] border-l-4 border-[#008629]'
                  : 'text-gray-800 hover:bg-gray-50'
              }`}
            >
              Contact
            </button>

            {/* Quick Actions in Mobile Drawer */}
            <div className="pt-4 border-t border-gray-200 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenApply();
                }}
                className="w-full inphb-btn-primary py-3"
              >
                <GraduationCap className="w-5 h-5" />
                <span>Candidature en ligne</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleNavigate('campus_virtuel');
                }}
                className="w-full inphb-btn-secondary py-3"
              >
                <BookOpen className="w-5 h-5" />
                <span>Portail E-Campus</span>
              </button>

              {!user && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50"
                >
                  <LogIn className="w-4 h-4 text-[#008629]" />
                  <span>Se connecter</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
