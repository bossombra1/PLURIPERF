import React, { useEffect, useRef, useState } from 'react';
import { PageId, Language } from '../types';
import { Logo } from './Logo';
import {
  Award,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  ChevronDown,
  Compass,
  Globe2,
  GraduationCap,
  History,
  Layers,
  Leaf,
  Library,
  LogIn,
  Mail,
  Menu,
  Newspaper,
  Phone,
  Search,
  Shield,
  Sparkles,
  User,
  X,
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
  badgeFr?: string;
  badgeEn?: string;
}

interface DropdownGroup {
  key: string;
  titleFr: string;
  titleEn: string;
  activePages: PageId[];
  items: DropdownItem[];
}

const DROPDOWN_GROUPS: DropdownGroup[] = [
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
        labelFr: 'Mot du Président-Fondateur',
        labelEn: "Founding President's Message",
        descFr: 'L’engagement solennel pour le monde durable',
        descEn: 'Solemn commitment to our planetary future',
        icon: Sparkles,
      },
      {
        id: 'universite_vision',
        labelFr: 'Vision, Mission & Valeurs',
        labelEn: 'Vision, Mission & Values',
        descFr: 'Écologie responsable, rigueur scientifique et éthique',
        descEn: 'Reverence for life, rigor and regenerative ethics',
        icon: Compass,
      },
      {
        id: 'universite_min',
        labelFr: 'Management Inspiré par la Nature',
        labelEn: 'Nature-Inspired Management',
        descFr: 'Biomimétisme managérial et écologie systémique',
        descEn: 'Managerial biomimicry and systemic ecology',
        icon: Leaf,
        badgeFr: 'Signature',
        badgeEn: 'Signature',
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
    titleFr: 'Formations',
    titleEn: 'Academics',
    activePages: ['facultes', 'formations', 'admissions'],
    items: [
      {
        id: 'facultes',
        labelFr: 'Nos 9 Facultés d’Excellence',
        labelEn: 'Our 9 Specialized Faculties',
        descFr: 'Écologie, agroécologie, finance durable, énergies...',
        descEn: 'Ecological sciences, circularity, green transition...',
        icon: Layers,
        badgeFr: '9 Facultés',
        badgeEn: '9 Faculties',
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
        badgeFr: 'Session Ouverte',
        badgeEn: 'Applications Open',
      },
    ],
  },
  {
    key: 'recherche',
    titleFr: 'Recherche',
    titleEn: 'Research',
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
        labelFr: 'Mère Nature Global Initiative',
        labelEn: 'Mother Nature Global Initiative',
        descFr: 'Initiative mondiale pour la préservation des écosystèmes',
        descEn: 'Global initiative for biodiversity and climate action',
        icon: Globe2,
      },
    ],
  },
  {
    key: 'campus',
    titleFr: 'Campus',
    titleEn: 'Campus',
    activePages: ['campus_virtuel', 'bibliotheque', 'actualites', 'carrieres'],
    items: [
      {
        id: 'campus_virtuel',
        labelFr: 'Campus Virtuel & E-Learning',
        labelEn: 'Virtual Campus & E-Learning',
        descFr: 'Plateforme académique numérique, cours et évaluations',
        descEn: 'Online LMS, live classes and coursework',
        icon: GraduationCap,
        badgeFr: 'E-Campus',
        badgeEn: 'E-Campus',
      },
      {
        id: 'bibliotheque',
        labelFr: 'Bibliothèque Numérique',
        labelEn: 'Digital Library',
        descFr: 'Livres, articles, revues, rapports ONU et normes ISO',
        descEn: 'Books, journals, UN reports and ISO standards',
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
      {
        id: 'carrieres',
        labelFr: 'Carrières & Stages',
        labelEn: 'Careers & Internships',
        descFr: 'Offres d’emploi, stages et réseau d’entreprises',
        descEn: 'Job offers, internships and employer network',
        icon: Briefcase,
      },
    ],
  },
];

/* ---------- Classes partagées (tokens définis dans index.css) ---------- */

const navItemClass = (active: boolean) =>
  `flex items-center gap-1 whitespace-nowrap rounded px-3 py-2 text-[14px] transition-colors ${
    active ? 'font-semibold text-primary' : 'font-medium text-text-primary hover:text-primary'
  }`;

const mobileLinkClass = (active: boolean) =>
  `w-full rounded px-4 py-3 text-left text-base font-semibold ${
    active
      ? 'border-l-4 border-primary bg-primary/10 text-primary'
      : 'text-text-primary hover:bg-surface-muted'
  }`;

const BTN_PRIMARY =
  'inline-flex items-center justify-center gap-2 rounded bg-primary font-bold text-primary-foreground transition-colors hover:bg-[color:var(--green-deep)]';
const BTN_ACCENT =
  'inline-flex items-center justify-center gap-2 rounded bg-secondary font-bold text-[#30210b] transition-colors hover:bg-[color:var(--orange-deep)]';
const BTN_OUTLINE =
  'inline-flex items-center justify-center gap-2 rounded border border-primary font-bold text-primary transition-colors hover:bg-primary/10';

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  user,
  setCurrentPage,
  onNavigate,
  lang,
  setLang,
  onLanguageChange,
  onOpenApply,
  onOpenSearch,
  onOpenLogin,
  onOpenAppointment,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpenGroup, setMobileOpenGroup] = useState<string | null>('universite');
  const navRef = useRef<HTMLElement>(null);

  const tr = (fr: string, en: string) => (lang === 'fr' ? fr : en);
  const getBadge = (item: DropdownItem) => (lang === 'fr' ? item.badgeFr : item.badgeEn);

  // Les URLs utilisent des tirets (campus-virtuel), les PageId des underscores (campus_virtuel)
  const activePage = (String(currentPage).replace(/^\//, '').split('/')[0] || 'accueil').replace(
    /-/g,
    '_'
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
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

  // « Trouver une formation » : ouvre la recherche si elle existe, sinon le catalogue
  const handleFindProgram = () => {
    if (onOpenSearch) {
      setMobileMenuOpen(false);
      onOpenSearch();
    } else {
      handleNavigate('formations');
    }
  };

  return (
    <header ref={navRef} className="relative z-40 w-full bg-white">
      {/* 1. Barre utilitaire */}
      <div className="border-b border-border-ui bg-white text-xs text-text-secondary">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-4 sm:gap-6">
            <a
              href="tel:+2252722598800"
              className="flex min-w-0 items-center gap-1.5 font-medium transition-colors hover:text-primary"
            >
              <Phone className="h-3.5 w-3.5 shrink-0 text-primary" />
              <span className="truncate">+225 27 22 59 88 00</span>
            </a>
            <div className="hidden items-center gap-1 whitespace-nowrap text-text-muted xl:flex">
              <span>{tr('Campus :', 'Campuses:')}</span>
              <span className="font-semibold text-text-primary">
                Abidjan • Yamoussoukro • Paris • Genève
              </span>
            </div>
            <a
              href="mailto:contact@pluriperf.com"
              className="hidden items-center gap-1.5 whitespace-nowrap transition-colors hover:text-primary xl:flex"
            >
              <Mail className="h-3.5 w-3.5 text-primary" />
              <span>contact@pluriperf.com</span>
            </a>
          </div>

          <div className="flex shrink-0 items-center gap-3 sm:gap-5">
            <button
              onClick={() => handleNavigate('campus_virtuel')}
              className="flex items-center gap-1.5 whitespace-nowrap font-medium transition-colors hover:text-primary"
            >
              <span className="h-2 w-2 rounded-full bg-primary" />
              E-Campus
            </button>

            <button
              onClick={() => handleNavigate('bibliotheque')}
              className="hidden whitespace-nowrap transition-colors hover:text-primary sm:inline-block"
            >
              {tr('Bibliothèque', 'Library')}
            </button>

            {onOpenAppointment && (
              <button
                onClick={onOpenAppointment}
                className="hidden items-center gap-1 whitespace-nowrap transition-colors hover:text-primary md:flex"
              >
                <Calendar className="h-3 w-3 text-secondary" />
                <span>{tr('Prendre RDV', 'Book a meeting')}</span>
              </button>
            )}

            <div
              role="group"
              aria-label={tr('Langue', 'Language')}
              className="flex items-center overflow-hidden rounded border border-border-ui text-[11px] font-bold"
            >
              {(['fr', 'en'] as const).map((code) => (
                <button
                  key={code}
                  onClick={() => handleSetLang(code)}
                  aria-pressed={lang === code}
                  className={`px-2 py-0.5 transition-colors ${
                    lang === code
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-surface-muted text-text-secondary hover:text-primary'
                  }`}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Barre principale */}
      <div className="border-b border-border-subtle bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <button
            onClick={() => handleNavigate('accueil')}
            className="flex min-w-0 shrink items-center text-left"
            title="PLURIPERF International University"
            aria-label="PLURIPERF International University"
          >
            <Logo size="md" variant="full-horizontal" />
          </button>

          {/* Navigation desktop (à partir de 1280 px) */}
          <nav
            aria-label={tr('Navigation principale', 'Main navigation')}
            className="hidden min-w-0 flex-1 items-center justify-center gap-1 xl:flex"
          >
            <button
              onClick={() => handleNavigate('accueil')}
              className={navItemClass(activePage === 'accueil')}
            >
              {tr('Accueil', 'Home')}
            </button>

            {DROPDOWN_GROUPS.map((group) => {
              const isGroupActive = group.activePages.includes(activePage as PageId);
              const isOpen = activeDropdown === group.key;
              const title = tr(group.titleFr, group.titleEn);

              return (
                <div
                  key={group.key}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(group.key)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => setActiveDropdown(group.key)}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    className={navItemClass(isGroupActive)}
                  >
                    <span>{title}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-primary' : 'text-text-muted'
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div
                      className={`absolute top-full z-50 pt-1 ${
                        group.key === 'campus' ? 'right-0' : 'left-0'
                      }`}
                    >
                      <div className="w-80 rounded-md border border-border-ui bg-white py-2 shadow-xl">
                        <div className="mb-1 flex items-center justify-between border-b border-border-subtle px-4 py-1.5">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                            {title}
                          </span>
                          <span className="text-[10px] text-text-muted">
                            {group.items.length} {tr('rubriques', 'sections')}
                          </span>
                        </div>

                        <div className="max-h-[70vh] divide-y divide-border-subtle overflow-y-auto">
                          {group.items.map((item) => {
                            const Icon = item.icon;
                            const badge = getBadge(item);
                            return (
                              <button
                                key={item.id}
                                onClick={() => handleNavigate(item.id, item.sectionId)}
                                className="group/item flex w-full items-start gap-3 px-4 py-2.5 text-left transition-colors hover:bg-surface-muted"
                              >
                                <div className="mt-0.5 rounded bg-surface-muted p-1.5 text-primary transition-colors group-hover/item:bg-primary group-hover/item:text-primary-foreground">
                                  <Icon className="h-4 w-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-sm font-semibold leading-tight text-text-primary transition-colors group-hover/item:text-primary">
                                      {tr(item.labelFr, item.labelEn)}
                                    </span>
                                    {badge && (
                                      <span className="shrink-0 rounded border border-secondary/40 bg-secondary/10 px-1.5 py-0.5 text-[10px] font-semibold text-[#6b4400]">
                                        {badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="mt-0.5 line-clamp-1 text-[12px] text-text-muted">
                                    {tr(item.descFr, item.descEn)}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <button
              onClick={() => handleNavigate('contacts')}
              className={navItemClass(activePage === 'contacts')}
            >
              Contact
            </button>
          </nav>

          {/* Actions permanentes : rechercher, se connecter, candidater */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              onClick={handleFindProgram}
              aria-label={tr('Trouver une formation', 'Find a programme')}
              title={tr('Trouver une formation', 'Find a programme')}
              className="hidden rounded-full p-2 text-text-secondary transition-colors hover:bg-surface-muted hover:text-primary sm:inline-flex"
            >
              <Search className="h-4 w-4" />
            </button>

            {user ? (
              <button
                type="button"
                onClick={() => handleNavigate('campus_virtuel')}
                aria-label={tr('Mon espace', 'My space')}
                className="flex h-9 items-center gap-2 rounded border border-primary px-2.5 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground sm:px-3"
              >
                <User className="h-4 w-4" />
                <span className="hidden max-w-[90px] truncate sm:inline">{user.fullName}</span>
                <span className="hidden lg:inline">·</span>
                <span className="hidden lg:inline text-[11px] uppercase">{user.role.replace('_', ' ')}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onOpenLogin}
                aria-label={tr('Connexion', 'Sign in')}
                className="flex h-9 items-center gap-1.5 rounded border border-border-ui px-2.5 text-xs font-semibold text-text-primary transition-colors hover:border-primary hover:text-primary sm:px-3"
              >
                <LogIn className="h-4 w-4 text-primary" />
                <span className="hidden sm:inline">{tr('Connexion', 'Sign in')}</span>
              </button>
            )}

            {user && onLogout && (
              <button
                type="button"
                onClick={async () => { await onLogout(); handleNavigate('login'); }}
                aria-label={tr('Se déconnecter', 'Sign out')}
                className="hidden h-9 items-center gap-1.5 rounded border border-border-ui px-2.5 text-xs font-semibold text-text-primary transition-colors hover:border-primary hover:text-primary lg:flex"
              >
                <LogIn className="h-4 w-4 text-primary" />
                <span>{tr('Déconnexion', 'Sign out')}</span>
              </button>
            )}

            <button
              onClick={onOpenApply}
              className={`${BTN_ACCENT} hidden h-9 px-3.5 text-xs md:inline-flex`}
            >
              <GraduationCap className="h-3.5 w-3.5" />
              <span>{tr('Candidater', 'Apply')}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={
                mobileMenuOpen ? tr('Fermer le menu', 'Close menu') : tr('Ouvrir le menu', 'Open menu')
              }
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className="rounded p-2 text-text-primary transition-colors hover:text-primary xl:hidden"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Menu mobile / tablette */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-7.5rem)] overflow-y-auto border-t border-border-ui bg-white p-4 pb-6 shadow-2xl xl:hidden"
        >
          <div className="space-y-3">
            <button
              onClick={() => handleNavigate('accueil')}
              className={mobileLinkClass(activePage === 'accueil')}
            >
              {tr('Accueil', 'Home')}
            </button>

            {DROPDOWN_GROUPS.map((group) => {
              const isGroupOpen = mobileOpenGroup === group.key;
              return (
                <div key={group.key} className="overflow-hidden rounded border border-border-ui">
                  <button
                    onClick={() => setMobileOpenGroup(isGroupOpen ? null : group.key)}
                    aria-expanded={isGroupOpen}
                    className="flex w-full items-center justify-between bg-surface-muted px-4 py-3 text-base font-semibold text-text-primary"
                  >
                    <span>{tr(group.titleFr, group.titleEn)}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        isGroupOpen ? 'rotate-180 text-primary' : 'text-text-muted'
                      }`}
                    />
                  </button>

                  {isGroupOpen && (
                    <div className="space-y-1 bg-white p-2">
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        const badge = getBadge(item);
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleNavigate(item.id, item.sectionId)}
                            className="flex w-full items-center gap-3 rounded px-3 py-2.5 text-left text-sm font-medium text-text-secondary hover:bg-surface-muted"
                          >
                            <Icon className="h-4 w-4 shrink-0 text-primary" />
                            <div className="flex-1">
                              <div>{tr(item.labelFr, item.labelEn)}</div>
                              {badge && (
                                <span className="text-[10px] font-semibold text-[#6b4400]">
                                  • {badge}
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

            <button
              onClick={() => handleNavigate('contacts')}
              className={mobileLinkClass(activePage === 'contacts')}
            >
              Contact
            </button>

            {/* Boutons permanents du cahier des charges */}
            <div className="space-y-2 border-t border-border-ui pt-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenApply();
                }}
                className={`${BTN_PRIMARY} w-full py-3 text-sm`}
              >
                <GraduationCap className="h-5 w-5" />
                <span>{tr('Candidater', 'Apply')}</span>
              </button>

              <button onClick={handleFindProgram} className={`${BTN_OUTLINE} w-full py-3 text-sm`}>
                <Search className="h-5 w-5" />
                <span>{tr('Trouver une formation', 'Find a programme')}</span>
              </button>

              {user ? (
                <button
                  onClick={() => handleNavigate('campus_virtuel')}
                  className="flex w-full items-center justify-center gap-2 rounded border border-border-ui py-3 text-sm font-semibold text-text-primary hover:bg-surface-muted"
                >
                  <User className="h-4 w-4 text-primary" />
                  <span className="truncate">{user.fullName}</span>
                </button>
                <button
                  onClick={async () => { setMobileMenuOpen(false); if (onLogout) await onLogout(); handleNavigate('login'); }}
                  className="flex w-full items-center justify-center gap-2 rounded border border-border-ui py-3 text-sm font-semibold text-text-primary hover:bg-surface-muted"
                >
                  <LogIn className="h-4 w-4 text-primary" />
                  <span>{tr('Se déconnecter', 'Sign out')}</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin();
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded border border-border-ui py-3 text-sm font-semibold text-text-primary hover:bg-surface-muted"
                >
                  <LogIn className="h-4 w-4 text-primary" />
                  <span>{tr('Se connecter', 'Sign in')}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};