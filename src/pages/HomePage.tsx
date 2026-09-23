import React from 'react';
import { PageId, Language } from '../types';
import { getT } from '../data/translations';
import { Logo } from '../components/Logo';
import { HeroGallery } from '../components/HeroGallery';
import { ProgramSearch } from '../components/ProgramSearch';
import { FACULTIES_DATA } from '../data/universityData';
import { UNIVERSITY_ASSETS } from '../assets/images';
import {
  GraduationCap,
  Search,
  Sparkles,
  ArrowRight,
  BookOpen,
  Briefcase,
  Leaf,
  Layers,
  Globe2,
  Users2,
  Building,
  Atom,
  Calendar,
  CheckCircle,
} from 'lucide-react';

interface HomePageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  onOpenApply: () => void;
  onOpenSearch: () => void;
  onOpenConsulting: () => void;
  onApplyForProgram: (programTitle: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  lang,
  onNavigate,
  onOpenApply,
  onOpenSearch,
  onOpenConsulting,
  onApplyForProgram,
}) => {
  const t = getT(lang);

  const quickPortalLinks: {
    page: PageId;
    titleFr: string;
    titleEn: string;
    descFr: string;
    descEn: string;
    icon: React.ComponentType<{ className?: string }>;
    accent: string;
  }[] = [
    {
      page: 'universite',
      titleFr: "L'Université & Chaire MIN",
      titleEn: 'The University & NIM Chair',
      descFr: 'Histoire, gouvernance, modèle pédagogique bio-inspiré et vision.',
      descEn: 'History, governance, bio-inspired pedagogical model, and vision.',
      icon: Building,
      accent: 'text-amber-500',
    },
    {
      page: 'facultes',
      titleFr: '9 Facultés d’Excellence',
      titleEn: '9 Centers of Excellence',
      descFr: 'Management durable, climat, énergies, agroécologie, IA verte.',
      descEn: 'Sustainable management, climate, energy, agroecology, green AI.',
      icon: Layers,
      accent: 'text-emerald-500',
    },
    {
      page: 'campus_virtuel',
      titleFr: 'Campus Virtuel Étudiant',
      titleEn: 'Virtual Student Campus',
      descFr: 'Tableau de bord personnel, cours, examens, devoirs et messagerie.',
      descEn: 'Personal dashboard, courses, exams, submissions, and messaging.',
      icon: GraduationCap,
      accent: 'text-sky-400',
    },
    {
      page: 'cabinet',
      titleFr: "Cabinet d'Expertise",
      titleEn: 'Expertise Advisory Unit',
      descFr: 'Études d’impact, audit carbone, conformité CSRD, normes ISO.',
      descEn: 'Impact assessments, carbon audits, CSRD compliance, ISO norms.',
      icon: Briefcase,
      accent: 'text-amber-600',
    },
    {
      page: 'mere_nature',
      titleFr: 'Mère Nature Global',
      titleEn: 'Mother Nature Global',
      descFr: 'TV écologique, ONG, reboisement, boutique verte et projets.',
      descEn: 'Eco Web TV, NGO, rewilding, green store, and global projects.',
      icon: Leaf,
      accent: 'text-emerald-600',
    },
    {
      page: 'recherches',
      titleFr: 'MIN Research Institute',
      titleEn: 'MIN Research Institute',
      descFr: 'Laboratoires vivants, inventions brevetées et publications.',
      descEn: 'Living labs, patented eco-inventions, and peer-reviewed papers.',
      icon: Atom,
      accent: 'text-indigo-400',
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Institutional Hero Statement */}
      <section className="pt-6 sm:pt-10">
        <div className="text-center max-w-4xl mx-auto space-y-4 mb-8 sm:mb-12">
          {/* Institutional Header tag */}
          <div className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-[#E85D1E] bg-orange-50/80 border border-orange-200/80 px-3.5 py-1.5 rounded-lg shadow-2xs">
            <Logo variant="emblem-only" size="sm" className="w-4 h-4 shrink-0" />
            <span>{t.internationalSignature}</span>
          </div>

          {/* Main Title: Construire les leaders du monde durable */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#0E192D] font-bold tracking-tight leading-[1.15]">
            {t.institutionalPromise}
          </h1>

          {/* Subtitle from slide 5 */}
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>

          {/* Quick Hero buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onOpenApply}
              className="px-6 py-3 bg-[#E85D1E] hover:bg-[#D44910] text-white font-bold text-sm rounded-xl shadow-xs transition-all flex items-center gap-2 active:scale-[0.98]"
            >
              <GraduationCap className="w-4 h-4" />
              <span>{t.buttons.apply}</span>
            </button>

            <button
              type="button"
              onClick={onOpenSearch}
              className="px-5 py-3 bg-[#0E192D] hover:bg-slate-800 text-white font-semibold text-sm rounded-xl transition-colors flex items-center gap-2 shadow-xs"
            >
              <Search className="w-4 h-4 text-orange-400" />
              <span>{t.buttons.findProgram}</span>
            </button>

            <button
              type="button"
              onClick={onOpenConsulting}
              className="px-5 py-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-sm rounded-xl transition-colors flex items-center gap-2 shadow-2xs"
            >
              <Briefcase className="w-4 h-4 text-slate-600" />
              <span>{t.buttons.consulting}</span>
            </button>
          </div>
        </div>

        {/* 2. Photo & Video Showcase Carousel (Slide 5: album photo / video) */}
        <HeroGallery
          lang={lang}
          onNavigate={onNavigate}
          onOpenApply={onOpenApply}
          onOpenSearch={onOpenSearch}
        />
      </section>

      {/* 3. Fast Interactive Navigation Tiles (Boutons cliquables vers liens des pages) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-serif font-bold text-slate-900">
              {lang === 'fr' ? 'Portail Académique & Institutionnel' : 'Academic & Institutional Hub'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {lang === 'fr'
                ? 'Accédez directement aux pôles majeurs de l’université'
                : 'Direct access to the university core divisions'}
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {lang === 'fr' ? '13 Espaces Dédiés' : '13 Dedicated Hubs'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickPortalLinks.map((item) => (
            <button
              key={item.page}
              type="button"
              onClick={() => onNavigate(item.page)}
              className="text-left p-6 rounded-xl border border-slate-200 bg-white hover:border-amber-400 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {React.createElement(item.icon, {
                    className: `w-5 h-5 ${item.accent}`,
                  })}
                </div>

                <div>
                  <h3 className="text-base font-semibold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {lang === 'fr' ? item.titleFr : item.titleEn}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {lang === 'fr' ? item.descFr : item.descEn}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-slate-700 group-hover:text-amber-600">
                <span>{lang === 'fr' ? 'Explorer cet espace' : 'Explore this hub'}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 4. Moteur de Recherche des Formations (Slide 5: Moteur de recherche des formations) */}
      <section className="space-y-4">
        <ProgramSearch
          lang={lang}
          onApplyForProgram={onApplyForProgram}
          onSelectFaculty={(facId) => onNavigate('facultes')}
        />
      </section>

      {/* 5. Key Highlights / Faculty Teaser */}
      <section className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <Atom className="w-4 h-4" />
            <span>Management Inspiré par la Nature (MIN)</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white leading-tight">
            {lang === 'fr'
              ? '3,8 milliards d’années de R&D naturelle au service de vos organisations'
              : '3.8 billion years of nature’s R&D empowering your organization'}
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            {lang === 'fr'
              ? 'Le Vivant ne produit aucun déchet, optimise l’énergie sans épuiser les réserves et privilégie la coopération symbiotique. PLURIPERF transpose ces invariants dans le management moderne.'
              : 'Living systems generate zero waste, optimize energy without depletion, and thrive on symbiotic mutualism. PLURIPERF translates these laws into leadership.'}
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => onNavigate('universite')}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-medium text-xs rounded-lg transition-colors"
            >
              {lang === 'fr' ? 'Découvrir la méthode MIN' : 'Learn the NIM framework'}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('recherches')}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs rounded-lg transition-colors"
            >
              {lang === 'fr' ? 'MIN Research Institute' : 'MIN Research Institute'}
            </button>
          </div>
        </div>

        {/* Subtle decorative background circle */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-emerald-600/10 pointer-events-none blur-3xl" />
      </section>

      {/* 6. Slide 5: Appel à l'action final (Final Call to Action) */}
      <section className="bg-gradient-to-br from-amber-50 via-white to-emerald-50 rounded-2xl border border-amber-200/80 p-8 sm:p-12 text-center space-y-6 shadow-sm">
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="w-12 h-12 bg-amber-600 text-white rounded-xl flex items-center justify-center mx-auto shadow">
            <GraduationCap className="w-6 h-6" />
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-slate-900 font-bold">
            {lang === 'fr'
              ? 'Prêt à devenir un acteur du monde durable ?'
              : 'Ready to become an actor of a sustainable world?'}
          </h2>

          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            {lang === 'fr'
              ? 'Rejoignez nos promotions internationales en présentiel ou en ligne et participez à la régénération de notre planète.'
              : 'Join our international cohorts on campus or online and drive the active regeneration of our planet.'}
          </p>
        </div>

        {/* The 3 mandatory final buttons from Slide 5: Trouver une formation - Candidater - Demander un accompagnement */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onOpenSearch}
            className="px-6 py-3 bg-[#0E192D] hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-2"
          >
            <Search className="w-4 h-4 text-orange-400" />
            <span>{lang === 'fr' ? 'Trouver une formation' : 'Find a program'}</span>
          </button>

          <button
            type="button"
            onClick={onOpenApply}
            className="px-6 py-3 bg-[#E85D1E] hover:bg-[#D44910] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 active:scale-[0.98]"
          >
            <GraduationCap className="w-4 h-4" />
            <span>{lang === 'fr' ? 'Candidater' : 'Apply now'}</span>
          </button>

          <button
            type="button"
            onClick={onOpenConsulting}
            className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs sm:text-sm font-semibold rounded-xl shadow-2xs transition-colors flex items-center gap-2"
          >
            <Briefcase className="w-4 h-4 text-slate-600" />
            <span>{lang === 'fr' ? 'Demander un accompagnement' : 'Request guidance / audit'}</span>
          </button>
        </div>
      </section>
    </div>
  );
};
