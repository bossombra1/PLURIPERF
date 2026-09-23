import React, { useState, useEffect, useRef } from 'react';
import { Language, PageId } from '../types';
import { UNIVERSITY_SECTIONS } from '../data/universityData';
import { UNIVERSITY_ASSETS } from '../assets/images';
import { Logo } from '../components/Logo';
import {
  Building2,
  History,
  Compass,
  Quote,
  Shield,
  BookOpen,
  Leaf,
  Award,
  Globe2,
  Users2,
  ChevronRight,
  ArrowRight,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  FileText,
  ExternalLink,
  Layers,
  ArrowUpRight,
  Briefcase,
} from 'lucide-react';

interface UniversityPageProps {
  lang: Language;
  onNavigate: (page: PageId, sectionId?: string) => void;
  onOpenApply: () => void;
  initialSection?: string;
}

export const UniversityPage: React.FC<UniversityPageProps> = ({
  lang,
  onNavigate,
  onOpenApply,
  initialSection,
}) => {
  const content = UNIVERSITY_SECTIONS[lang];
  const [activeSection, setActiveSection] = useState<string>(initialSection || 'presentation');
  const [viewMode, setViewMode] = useState<'all' | 'focus'>('all');

  const navSections = [
    { id: 'presentation', label: lang === 'fr' ? 'Présentation & Chiffres' : 'Overview & Metrics', icon: Building2 },
    { id: 'vision', label: lang === 'fr' ? 'Vision & Valeurs' : 'Vision & Values', icon: Compass },
    { id: 'motPresident', label: lang === 'fr' ? 'Mot du Président' : "President's Address", icon: Quote },
    { id: 'histoire', label: lang === 'fr' ? 'Histoire & Jalons' : 'History & Milestones', icon: History },
    { id: 'gouvernance', label: lang === 'fr' ? 'Gouvernance' : 'Governance', icon: Shield },
    { id: 'min', label: lang === 'fr' ? 'Modèle MIN' : 'NIM Model', icon: Leaf },
    { id: 'modelePedagogique', label: lang === 'fr' ? 'Pédagogie' : 'Pedagogy', icon: BookOpen },
    { id: 'reconnaissances', label: lang === 'fr' ? 'Agréments & ECTS' : 'Accreditations', icon: Award },
    { id: 'mereNatureRef', label: lang === 'fr' ? 'Mère Nature' : 'Mother Nature', icon: Globe2 },
    { id: 'partenaires', label: lang === 'fr' ? 'Partenaires' : 'Partners', icon: Users2 },
  ];

  // Scroll to targeted section if initialSection is passed or changed
  useEffect(() => {
    if (initialSection) {
      setActiveSection(initialSection);
      const el = document.getElementById(initialSection);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 120);
      }
    }
  }, [initialSection]);

  // Scrollspy observer to highlight current section in navigation bar when scrolling in 'all' mode
  useEffect(() => {
    if (viewMode !== 'all') return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (const sec of navSections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [viewMode]);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (viewMode === 'focus') {
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="space-y-10 pb-20">
      {/* 1. Official Header & Editorial Signature */}
      <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200 pt-8 pb-10 px-4 sm:px-6 rounded-2xl">
        <div className="max-w-5xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-[#E85D1E] bg-orange-50 border border-orange-200/80 px-3.5 py-1.5 rounded-lg shadow-2xs">
            <Logo variant="emblem-only" size="sm" className="w-4 h-4 shrink-0" />
            <span>{lang === 'fr' ? 'Institution Universitaire Internationale' : 'International Academic Institution'}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <h1 className="text-3xl sm:text-5xl font-serif text-[#0E192D] font-bold tracking-tight">
                {lang === 'fr' ? "L'Université PLURIPERF" : 'PLURIPERF International University'}
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {lang === 'fr'
                  ? 'Pionnier académique mondial du Management Durable, de l’Écologie Appliquée et du Leadership Régénératif.'
                  : 'Global academic pioneer in Sustainable Management, Applied Ecology, and Regenerative Leadership.'}
              </p>
            </div>

            {/* Quick Actions Header */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={onOpenApply}
                className="px-5 py-2.5 bg-[#E85D1E] hover:bg-[#D44910] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 active:scale-[0.98]"
              >
                <GraduationCap className="w-4 h-4" />
                <span>{lang === 'fr' ? 'Candidater' : 'Apply Now'}</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('formations')}
                className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-xs rounded-xl transition-colors shadow-2xs flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-slate-500" />
                <span>{lang === 'fr' ? 'Voir nos formations' : 'Browse Degrees'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Direct Navigation Bar (Sticky Table of Contents) */}
      <div className="sticky top-18 z-30 bg-white/95 backdrop-blur-md border-y border-slate-200 shadow-2xs py-2.5 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Scrollable quick pills to all sections */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 hidden lg:inline">
              {lang === 'fr' ? 'Accès direct :' : 'Direct links:'}
            </span>
            {navSections.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => scrollToSection(sec.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all text-xs ${
                    isActive
                      ? 'bg-[#0E192D] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-orange-50 hover:text-[#E85D1E]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#E85D1E]' : 'text-slate-500'}`} />
                  <span>{sec.label}</span>
                </button>
              );
            })}
          </div>

          {/* Display Mode Switcher */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 shrink-0 text-xs">
            <button
              type="button"
              onClick={() => setViewMode('all')}
              className={`px-2.5 py-1 rounded-md font-bold transition-colors ${
                viewMode === 'all'
                  ? 'bg-white text-[#0E192D] shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'fr' ? 'Tout afficher directement' : 'Continuous View'}
            </button>
            <button
              type="button"
              onClick={() => setViewMode('focus')}
              className={`px-2.5 py-1 rounded-md font-bold transition-colors ${
                viewMode === 'focus'
                  ? 'bg-white text-[#0E192D] shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'fr' ? 'Chapitre par chapitre' : 'Chapter View'}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Main Direct Content Stream */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-14">
        {/* SECTION 1: PRÉSENTATION & CHIFFRES CLÉS */}
        {(viewMode === 'all' || activeSection === 'presentation') && (
          <section id="presentation" className="scroll-mt-32 space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#E85D1E] uppercase tracking-wider">
                  <Building2 className="w-4 h-4" />
                  <span>{content.presentation.title}</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest font-semibold">
                  PLURIPERF · Chapitre 01
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#0E192D] leading-tight">
                    {lang === 'fr'
                      ? 'L’Excellence Académique au Service du Vivant'
                      : 'Academic Excellence in Service of Living Systems'}
                  </h2>
                  <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                    {content.presentation.content}
                  </p>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {lang === 'fr'
                      ? 'Fondée sur une vision résolument moderne des sciences managériales, PLURIPERF transcende les modèles économiques extractifs traditionnels pour former les bâtisseurs d’un capitalisme régénératif et éco-conscient.'
                      : 'Chartered on a modern reimagining of management science, PLURIPERF transcends extractive economic models to train pioneers of regenerative, eco-conscious leadership.'}
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative group">
                    <img
                      src={UNIVERSITY_ASSETS.heroCampus}
                      alt="Campus PLURIPERF"
                      className="w-full h-64 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E192D]/80 via-transparent to-transparent flex items-end p-4">
                      <div className="text-white">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-orange-300 block">
                          {lang === 'fr' ? 'Infrastructure Mondiale' : 'Global Infrastructure'}
                        </span>
                        <span className="text-xs font-semibold">
                          {lang === 'fr' ? 'Campus Numérique & Réseau Académique International' : 'Digital Campus & Global Academic Network'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Key Academic Figures */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100">
                <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-center">
                  <span className="block text-2xl sm:text-3xl font-bold font-mono text-[#0E192D]">45+</span>
                  <span className="text-xs font-medium text-slate-600 mt-1 block">
                    {lang === 'fr' ? 'Nationalités Étudiantes' : 'Student Nationalities'}
                  </span>
                </div>
                <div className="p-4 bg-orange-50/70 border border-orange-200/70 rounded-2xl text-center">
                  <span className="block text-2xl sm:text-3xl font-bold font-mono text-[#E85D1E]">9</span>
                  <span className="text-xs font-medium text-slate-700 mt-1 block">
                    {lang === 'fr' ? 'Facultés Pionnières' : 'Pioneering Faculties'}
                  </span>
                </div>
                <div className="p-4 bg-emerald-50/70 border border-emerald-200/70 rounded-2xl text-center">
                  <span className="block text-2xl sm:text-3xl font-bold font-mono text-emerald-700">120+</span>
                  <span className="text-xs font-medium text-slate-700 mt-1 block">
                    {lang === 'fr' ? 'Partenaires & Alliances' : 'Global Partners'}
                  </span>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-center">
                  <span className="block text-2xl sm:text-3xl font-bold font-mono text-[#0E192D]">100%</span>
                  <span className="text-xs font-medium text-slate-600 mt-1 block">
                    {lang === 'fr' ? 'Crédits ECTS Transférables' : 'ECTS Accredited Credits'}
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 2: VISION & VALEURS FONDATRICES */}
        {(viewMode === 'all' || activeSection === 'vision') && (
          <section id="vision" className="scroll-mt-32 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#E85D1E] uppercase tracking-wider">
                  <Compass className="w-4 h-4" />
                  <span>{content.vision.title}</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest font-semibold">
                  PLURIPERF · Chapitre 02
                </span>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0E192D]">
                  {lang === 'fr'
                    ? 'Un Manifeste pour le Futur des Organisations'
                    : 'A Manifesto for the Future of Organizations'}
                </h2>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base max-w-4xl">
                  {content.vision.content}
                </p>
              </div>

              {/* 4 Core Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-5 bg-slate-50/90 border border-slate-200 rounded-2xl space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#E85D1E] flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <h3 className="font-bold text-sm text-[#0E192D]">
                    {lang === 'fr' ? 'Respect Absolu du Vivant' : 'Absolute Reverence for Life'}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lang === 'fr'
                      ? 'Tout modèle d’affaires, toute stratégie industrielle et tout processus managérial doivent respecter les limites biophysiques de la planète.'
                      : 'Every business model, industrial strategy, and management workflow must safely operate within planetary boundaries.'}
                  </p>
                </div>

                <div className="p-5 bg-slate-50/90 border border-slate-200 rounded-2xl space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-slate-200 text-[#0E192D] flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <h3 className="font-bold text-sm text-[#0E192D]">
                    {lang === 'fr' ? 'Rigueur Scientifique & Thermodynamique' : 'Scientific & Thermodynamic Rigor'}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lang === 'fr'
                      ? 'Refus catégorique du greenwashing. Nos formations s’appuient sur l’analyse du cycle de vie, les bilans matière-énergie et l’écologie industrielle vérifiée.'
                      : 'Uncompromising rejection of greenwashing. Our programs are grounded in lifecycle assessment, material-energy balance, and empirical industrial ecology.'}
                  </p>
                </div>

                <div className="p-5 bg-slate-50/90 border border-slate-200 rounded-2xl space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <h3 className="font-bold text-sm text-[#0E192D]">
                    {lang === 'fr' ? 'Économie Régénérative & Symbiotique' : 'Regenerative & Symbiotic Economy'}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lang === 'fr'
                      ? 'Viser au-delà de la simple neutralité : concevoir des organisations qui restaurent activement les écosystèmes et fortifient les communautés locales.'
                      : 'Aiming beyond mere neutrality: designing organizations that actively restore natural habitats and strengthen community cohesion.'}
                  </p>
                </div>

                <div className="p-5 bg-slate-50/90 border border-slate-200 rounded-2xl space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                    04
                  </div>
                  <h3 className="font-bold text-sm text-[#0E192D]">
                    {lang === 'fr' ? 'Éthique, Équité & Leadership Humaniste' : 'Ethics, Equity & Humanist Leadership'}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lang === 'fr'
                      ? 'L’excellence académique au service de l’intérêt général, avec une équité d’accès universelle via notre politique de bourses d’études mondiales.'
                      : 'Academic excellence for the common good, ensuring universal access through our global scholarship programs.'}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 3: MOT DU PRÉSIDENT-FONDATEUR */}
        {(viewMode === 'all' || activeSection === 'motPresident') && (
          <section id="motPresident" className="scroll-mt-32 space-y-6">
            <div className="bg-[#0E192D] text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Logo variant="emblem-only" size="xl" className="w-80 h-80 text-white" />
              </div>

              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-2 text-xs font-bold text-[#E85D1E] uppercase tracking-wider">
                  <Quote className="w-4 h-4" />
                  <span>{content.motPresident.title}</span>
                </div>

                <div className="border-l-4 border-[#E85D1E] pl-6 py-2 space-y-4">
                  <p className="font-serif italic text-lg sm:text-2xl text-slate-100 leading-relaxed">
                    « {content.motPresident.content} »
                  </p>
                  <div>
                    <span className="text-sm font-bold text-orange-400 block tracking-wider uppercase">
                      {content.motPresident.author}
                    </span>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      {lang === 'fr'
                        ? 'Président-Fondateur de PLURIPERF International University'
                        : 'Founding President of PLURIPERF International University'}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
                  <span className="italic">“We build new leaders for a sustainable World”</span>
                  <span className="font-mono text-[11px] text-slate-500">Charte Institutionnelle Officielle</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 4: HISTOIRE & FRISIE CHRONOLOGIQUE */}
        {(viewMode === 'all' || activeSection === 'histoire') && (
          <section id="histoire" className="scroll-mt-32 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#E85D1E] uppercase tracking-wider">
                  <History className="w-4 h-4" />
                  <span>{content.histoire.title}</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest font-semibold">
                  PLURIPERF · Chapitre 04
                </span>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0E192D]">
                  {lang === 'fr'
                    ? 'Genèse et Développement d’une Université Pionnière'
                    : 'Genesis & Trajectory of a Pioneer University'}
                </h2>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base max-w-4xl">
                  {content.histoire.content}
                </p>
              </div>

              {/* Visual Interactive Timeline */}
              <div className="relative border-l-2 border-orange-300 ml-4 sm:ml-6 space-y-8 pt-2">
                <div className="relative pl-6 sm:pl-8 group">
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#E85D1E] ring-4 ring-orange-100" />
                  <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
                    <span className="text-xs font-mono font-bold text-[#E85D1E] uppercase tracking-wider">
                      2018 · L’Origine
                    </span>
                    <h4 className="font-bold text-sm text-[#0E192D] mt-1">
                      {lang === 'fr' ? 'Création de la Chaire Exploratoire MIN' : 'Exploratory NIM Research Chair'}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {lang === 'fr'
                        ? 'Lancement des travaux fondateurs sur l’application du biomimétisme à la gouvernance d’entreprise et modélisation des 4 lois de l’écologie organisationnelle.'
                        : 'Groundbreaking research into applied biomimicry for enterprise governance and codification of the four systemic laws of organizational ecology.'}
                    </p>
                  </div>
                </div>

                <div className="relative pl-6 sm:pl-8 group">
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#0E192D] ring-4 ring-slate-200" />
                  <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
                    <span className="text-xs font-mono font-bold text-[#0E192D] uppercase tracking-wider">
                      2021 · La Charte
                    </span>
                    <h4 className="font-bold text-sm text-[#0E192D] mt-1">
                      {lang === 'fr' ? 'Fondation Officielle & Agréments Universitaires' : 'Official Charter & Global Accreditations'}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {lang === 'fr'
                        ? 'Constitution formelle de PLURIPERF International University, validation des curricula aux standards ECTS européens et mise en place des 9 facultés pionnières.'
                        : 'Formal incorporation of PLURIPERF International University, ECTS curriculum accreditation, and establishment of our 9 specialized faculties.'}
                    </p>
                  </div>
                </div>

                <div className="relative pl-6 sm:pl-8 group">
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-emerald-600 ring-4 ring-emerald-100" />
                  <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
                    <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider">
                      2024 · Le Déploiement
                    </span>
                    <h4 className="font-bold text-sm text-[#0E192D] mt-1">
                      {lang === 'fr' ? 'Campus Numérique Mondial & MIN Research Institute' : 'Global Digital Campus & MIN Institute'}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {lang === 'fr'
                        ? 'Déploiement de l’infrastructure d’enseignement à distance haute performance, alliance stratégique avec Mère Nature Global et ouverture du Cabinet d’Études ESG.'
                        : 'Launch of the premier high-availability virtual learning infrastructure, strategic alliance with Mother Nature Global, and inception of ESG Advisory.'}
                    </p>
                  </div>
                </div>

                <div className="relative pl-6 sm:pl-8 group">
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#E85D1E] ring-4 ring-orange-100" />
                  <div className="bg-orange-50/60 p-4 sm:p-5 rounded-2xl border border-orange-200/80">
                    <span className="text-xs font-mono font-bold text-[#E85D1E] uppercase tracking-wider">
                      Horizons 2026+ · Vision Panafricaine & Mondiale
                    </span>
                    <h4 className="font-bold text-sm text-[#0E192D] mt-1">
                      {lang === 'fr' ? 'Réseau Écologique et Chaires Associées UNESCO' : 'Eco-Network & UNESCO Associated Chairs'}
                    </h4>
                    <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                      {lang === 'fr'
                        ? 'Expansion continue du réseau académique, accréditations institutionnelles supplémentaires et essaimage de tiers-lieux d’expérimentation régénérative.'
                        : 'Ongoing worldwide network expansion, additional institutional accreditations, and establishment of living experimental eco-labs.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 5: GOUVERNANCE & CONSEILS */}
        {(viewMode === 'all' || activeSection === 'gouvernance') && (
          <section id="gouvernance" className="scroll-mt-32 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#E85D1E] uppercase tracking-wider">
                  <Shield className="w-4 h-4" />
                  <span>{content.gouvernance.title}</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest font-semibold">
                  PLURIPERF · Chapitre 05
                </span>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0E192D]">
                  {content.gouvernance.title}
                </h2>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base max-w-4xl">
                  {content.gouvernance.content}
                </p>
              </div>

              {/* 3 Governance Bodies */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-[#0E192D] font-bold text-sm">
                    <Shield className="w-4 h-4 text-[#E85D1E]" />
                    <span>{lang === 'fr' ? 'Conseil d’Administration' : 'Board of Directors'}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lang === 'fr'
                      ? 'Définit les orientations stratégiques, supervise l’intégrité financière et garantit l’alignement avec la mission de durabilité.'
                      : 'Steers long-term strategic direction, oversees fiduciary integrity, and safeguards adherence to sustainability mandates.'}
                  </p>
                </div>

                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-[#0E192D] font-bold text-sm">
                    <GraduationCap className="w-4 h-4 text-[#0E192D]" />
                    <span>{lang === 'fr' ? 'Sénat Académique & Pédagogique' : 'Academic Senate'}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lang === 'fr'
                      ? 'Composé des doyens des 9 facultés, il veille à la conformité des diplômes, aux barèmes d’évaluation et à la rigueur des jurys.'
                      : 'Composed of Deans from all 9 faculties, assuring strict diploma compliance, evaluation criteria, and defense juries.'}
                  </p>
                </div>

                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-[#0E192D] font-bold text-sm">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>{lang === 'fr' ? 'Comité Scientifique & Éthique' : 'Scientific & Ethics Board'}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lang === 'fr'
                      ? 'Évalue la validité des modèles MIN, supervise les protocoles de recherche et audite les publications scientifiques de l’université.'
                      : 'Evaluates empirical validity of NIM models, oversees research protocols, and peer-reviews institutional scientific output.'}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 6: LE MODÈLE MIN & PÉDAGOGIE */}
        {(viewMode === 'all' || activeSection === 'min' || activeSection === 'modelePedagogique') && (
          <section id="min" className="scroll-mt-32 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  <Leaf className="w-4 h-4" />
                  <span>{content.min.title}</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest font-semibold">
                  PLURIPERF · Chapitre 06
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0E192D]">
                    {lang === 'fr'
                      ? 'Management Inspiré par la Nature (MIN) : La Révolution Systémique'
                      : 'Nature-Inspired Management (NIM): Systemic Revolution'}
                  </h2>
                  <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                    {content.min.content}
                  </p>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {content.modelePedagogique.content}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => onNavigate('recherches')}
                      className="px-4 py-2.5 bg-[#0E192D] hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2 shadow-xs"
                    >
                      <Leaf className="w-4 h-4 text-emerald-400" />
                      <span>{lang === 'fr' ? 'Explorer la recherche MIN' : 'Explore NIM research'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate('cabinet')}
                      className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 shadow-2xs"
                    >
                      <Briefcase className="w-4 h-4 text-slate-500" />
                      <span>{lang === 'fr' ? 'Auditer une organisation' : 'Request Corporate Audit'}</span>
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative">
                    <img
                      src={UNIVERSITY_ASSETS.natureForest}
                      alt="Biomimétisme managérial"
                      className="w-full h-64 sm:h-72 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E192D]/85 via-transparent to-transparent flex items-end p-4">
                      <div className="text-white space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                          Biomimétisme Organisationnel
                        </span>
                        <p className="text-xs leading-snug">
                          {lang === 'fr'
                            ? 'La Nature résout la complexité depuis 3,8 milliards d’années sans déchet ni obsolescence.'
                            : 'Nature has solved system complexity for 3.8 billion years with zero net waste.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* The 4 Systemic Rules of Nature */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
                <div className="p-4 bg-emerald-50/60 border border-emerald-200/60 rounded-xl space-y-1">
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                    1. Énergie Solaire & Flux
                  </span>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {lang === 'fr' ? 'Fonctionner à l’énergie disponible sans dette thermodynamique.' : 'Operate on contemporary solar energy fluxes without energetic debt.'}
                  </p>
                </div>
                <div className="p-4 bg-emerald-50/60 border border-emerald-200/60 rounded-xl space-y-1">
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                    2. Boucles Cycliques
                  </span>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {lang === 'fr' ? 'Le déchet d’un sous-système devient la matière première du suivant.' : 'Waste from one subsystem becomes feedstock for another.'}
                  </p>
                </div>
                <div className="p-4 bg-emerald-50/60 border border-emerald-200/60 rounded-xl space-y-1">
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                    3. Symbiose & Coopération
                  </span>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {lang === 'fr' ? 'Priorité aux alliances mutualistes sur la concurrence prédatrice.' : 'Mutualistic cooperation takes precedence over zero-sum predation.'}
                  </p>
                </div>
                <div className="p-4 bg-emerald-50/60 border border-emerald-200/60 rounded-xl space-y-1">
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                    4. Résilience Distribuée
                  </span>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {lang === 'fr' ? 'Modularité décentralisée évitant les points de défaillance uniques.' : 'Decentralized modularity preventing single points of systemic failure.'}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 7: RECONNAISSANCES, AGRÉMENTS & ECTS */}
        {(viewMode === 'all' || activeSection === 'reconnaissances') && (
          <section id="reconnaissances" className="scroll-mt-32 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#E85D1E] uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  <span>{content.reconnaissances.title}</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest font-semibold">
                  PLURIPERF · Chapitre 07
                </span>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0E192D]">
                  {lang === 'fr'
                    ? 'Agréments Officiels, Standards ECTS & Validations Internationales'
                    : 'Official Charters, ECTS Standards & Global Endorsements'}
                </h2>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base max-w-4xl">
                  {content.reconnaissances.content}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-[#0E192D] font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{lang === 'fr' ? 'Standard Européen ECTS' : 'European ECTS Framework'}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lang === 'fr'
                      ? 'Tous nos parcours délivrent des crédits ECTS officiellement transférables entre établissements d’enseignement supérieur internationaux.'
                      : 'All degree tracks award official ECTS credits directly transferable across global academic institutions.'}
                  </p>
                </div>

                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-[#0E192D] font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{lang === 'fr' ? 'Agrément Enseignement Supérieur' : 'Chartered Higher Education'}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lang === 'fr'
                      ? 'Statuts juridiques d’université internationale garantissant la légalité et la pleine reconnaissance académique des parchemins.'
                      : 'Full legal standing as an international university ensuring complete academic standing of conferred degrees.'}
                  </p>
                </div>

                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-[#0E192D] font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{lang === 'fr' ? 'Alignement ODD Nations Unies' : 'UN SDG Alignment'}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lang === 'fr'
                      ? '100% de nos diplômes intègrent les 17 Objectifs de Développement Durable des Nations Unies dans leurs curricula obligatoires.'
                      : '100% of curricula intrinsically map to the United Nations 17 Sustainable Development Goals.'}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 8: ALLIANCE MÈRE NATURE GLOBAL */}
        {(viewMode === 'all' || activeSection === 'mereNatureRef') && (
          <section id="mereNatureRef" className="scroll-mt-32 space-y-6">
            <div className="bg-gradient-to-br from-emerald-900 to-[#0E192D] text-white rounded-3xl p-6 sm:p-10 shadow-lg space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <Globe2 className="w-4 h-4" />
                  <span>{content.mereNatureRef.title}</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-300 uppercase tracking-widest font-semibold">
                  PLURIPERF · Chapitre 08
                </span>
              </div>

              <div className="space-y-4 max-w-3xl">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  {lang === 'fr'
                    ? 'L’Alliance Mondiale pour la Régénération des Écosystèmes'
                    : 'The Global Alliance for Ecosystem Regeneration'}
                </h2>
                <p className="text-emerald-100 leading-relaxed text-sm sm:text-base">
                  {content.mereNatureRef.content}
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('mere_nature')}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-[#0E192D] font-bold rounded-xl text-xs transition-colors flex items-center gap-2 shadow"
                >
                  <Globe2 className="w-4 h-4" />
                  <span>{lang === 'fr' ? 'Découvrir le Portail Mère Nature Global' : 'Explore Mother Nature Portal'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 9: RÉSEAU MONDIAL DE PARTENAIRES */}
        {(viewMode === 'all' || activeSection === 'partenaires') && (
          <section id="partenaires" className="scroll-mt-32 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#E85D1E] uppercase tracking-wider">
                  <Users2 className="w-4 h-4" />
                  <span>{content.partenaires.title}</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest font-semibold">
                  PLURIPERF · Chapitre 09
                </span>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0E192D]">
                  {content.partenaires.title}
                </h2>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base max-w-4xl">
                  {content.partenaires.content}
                </p>
              </div>

              {/* Partner Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-2">
                {[
                  { name: 'Consortium Académique Panafricain', type: 'Alliance Universitaire' },
                  { name: 'Réseau Européen des Écoles d’Écologie', type: 'Mobilité & Recherche' },
                  { name: 'Observatoire International du Carbone', type: 'Audit Scientifique' },
                  { name: 'Institut Mondial du Biomimétisme', type: 'Laboratoire Partenaire' },
                  { name: 'Coalition Entreprises Régénératives', type: 'Stages & Recrutement' },
                  { name: 'Fonds Mondial pour la Biodiversité', type: 'Bourses de Thèse' },
                  { name: 'Fédération des Ingénieurs de Transition', type: 'Certification Pro' },
                  { name: 'Chaire UNESCO Développement Durable', type: 'Recherche Associée' },
                ].map((partner, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex flex-col justify-between hover:border-orange-300 transition-colors"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#E85D1E] block mb-1">
                      {partner.type}
                    </span>
                    <span className="font-bold text-xs text-[#0E192D] leading-snug">
                      {partner.name}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Partenaire Agréé
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 10: BANNIÈRE D'ADMISSION & CANDIDATURE OFFICIELLE */}
        <section className="bg-gradient-to-r from-[#0E192D] via-slate-900 to-[#0E192D] text-white rounded-3xl p-8 sm:p-12 shadow-xl text-center space-y-6">
          <Logo variant="emblem-only" size="lg" className="mx-auto" />
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-[#E85D1E]">
              {lang === 'fr' ? 'Cohortes Académiques Internationales' : 'Global Academic Cohort'}
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              {lang === 'fr'
                ? 'Rejoignez la Prochaine Promotion PLURIPERF'
                : 'Join the Next PLURIPERF Cohort'}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {lang === 'fr'
                ? 'Les candidatures sont évaluées au fil de l’eau par le Sénat Académique. Postulez dès aujourd’hui pour réserver votre place au sein de nos 9 facultés d’excellence.'
                : 'Applications are reviewed continuously by the Academic Senate. Apply today to secure your seat across our 9 pioneering faculties.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={onOpenApply}
              className="px-6 py-3 bg-[#E85D1E] hover:bg-[#D44910] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2 active:scale-[0.98]"
            >
              <GraduationCap className="w-4 h-4" />
              <span>{lang === 'fr' ? 'Déposer mon dossier de candidature' : 'Submit My Application'}</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('formations')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm rounded-xl transition-colors flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-orange-400" />
              <span>{lang === 'fr' ? 'Consulter le catalogue des diplômes' : 'Explore Programs'}</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
