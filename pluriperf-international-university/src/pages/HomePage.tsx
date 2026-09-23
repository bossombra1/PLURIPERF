import React from 'react';
import { PageId, Language } from '../types';
import { getT } from '../data/translations';
import { HeroGallery } from '../components/HeroGallery';
import {
  ArrowRight,
  BookOpen,
  Building2,
  FlaskConical,
  GraduationCap,
  Users,
  Newspaper,
  Award,
  Leaf,
  Globe2,
  Calendar,
  Clock,
  Compass,
  CheckCircle2,
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

  const links = [
    {
      page: 'universite' as PageId,
      labelFr: "L'Université",
      labelEn: 'The University',
      descFr: 'Notre histoire, notre vision et notre gouvernance institutionnelle.',
      descEn: 'Our history, vision and academic governance.',
      icon: Building2,
    },
    {
      page: 'facultes' as PageId,
      labelFr: 'Facultés et Écoles',
      labelEn: 'Faculties and Schools',
      descFr: 'Découvrez nos 9 domaines d’enseignement et d’expertise durable.',
      descEn: 'Explore our 9 fields of study and sustainable expertise.',
      icon: BookOpen,
    },
    {
      page: 'formations' as PageId,
      labelFr: 'Offre de Formation',
      labelEn: 'Degree Programs',
      descFr: 'Licences, Masters, Doctorats (PhD) et Certifications exécutives.',
      descEn: 'Bachelors, Masters, Doctoral PhDs and executive programs.',
      icon: GraduationCap,
    },
    {
      page: 'recherches' as PageId,
      labelFr: 'Recherche & Innovation',
      labelEn: 'Research & Innovation',
      descFr: 'Laboratoires MIN, productions scientifiques et brevets durables.',
      descEn: 'NIM Labs, scientific publications and green patents.',
      icon: FlaskConical,
    },
    {
      page: 'campus_virtuel' as PageId,
      labelFr: 'Vie Universitaire & E-Campus',
      labelEn: 'Campus Life & E-Learning',
      descFr: 'Campus hybride, portail étudiant et services aux apprenants.',
      descEn: 'Hybrid campus, student portal and learner support.',
      icon: Users,
    },
    {
      page: 'actualites' as PageId,
      labelFr: 'Actualités & Conférences',
      labelEn: 'News & Events',
      descFr: 'Les derniers colloques et temps forts de l’université.',
      descEn: 'Latest symposia and academic events.',
      icon: Newspaper,
    },
  ];

  return (
    <main className="bg-[#f8fafc]">
      {/* 1. Hero Gallery */}
      <HeroGallery
        lang={lang}
        onNavigate={onNavigate}
        onOpenApply={onOpenApply}
        onOpenSearch={onOpenSearch}
      />

      {/* 2. Four Key Stats Banner - Exact INP-HB color (#008629) with white metrics */}
      <section className="bg-[#008629] text-white border-b-2 border-[#006820]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/15">
          {[
            ['09', 'Facultés Spécialisées', 'Specialized Faculties'],
            ['50+', 'Formations Diplômantes', 'Degree Programs'],
            ['120+', 'Partenaires Mondiaux', 'Global Alliances'],
            ['2 500+', 'Étudiants & Auditeurs', 'Enrolled Scholars'],
          ].map(([n, fr, en]) => (
            <div key={fr} className="px-4 py-6 text-center">
              <strong className="block text-3xl sm:text-4xl font-extrabold tracking-tight">
                {n}
              </strong>
              <span className="text-[11px] sm:text-xs uppercase tracking-wider text-white/80 font-medium">
                {lang === 'fr' ? fr : en}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Welcome & Institutional Introduction */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#008629] block">
              PLURIPERF INTERNATIONAL UNIVERSITY
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] inphb-heading-accent">
              {lang === 'fr' ? 'Une Université Tournée vers l’Avenir' : 'A University Built for the Future'}
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-4">
            <p className="text-sm sm:text-base leading-relaxed text-[#444444]">
              {t.heroSubtitle}
            </p>
            <p className="text-sm text-[#666666]">
              {lang === 'fr'
                ? "Fondée sur le Modèle Pédagogique MIN (Management Inspiré de la Nature), notre université forme les futurs décideurs aux impératifs de la décarbonation, de l'économie circulaire et de la résilience organisationnelle."
                : "Anchored in the NIM (Nature-Inspired Management) pedagogical framework, our institution equips future decision-makers for decarbonization, circular economy, and organizational resilience."}
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('universite')}
                className="inphb-btn-primary text-xs"
              >
                <span>{lang === 'fr' ? 'Découvrir notre institution' : 'Discover the University'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Academic Domains Grid (INP-HB Eduma style cards with sharp borders) */}
      <section className="bg-white border-y border-[#eaeaea] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#eaeaea] pb-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#008629] block mb-1">
                PÔLES D'EXCELLENCE
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">
                {lang === 'fr' ? 'Nos Grands Domaines Universitaires' : 'Our Academic Pillars'}
              </h2>
            </div>
            <button
              onClick={() => onNavigate('facultes')}
              className="mt-3 sm:mt-0 inline-flex items-center gap-1 text-xs font-bold text-[#008629] hover:underline"
            >
              <span>{lang === 'fr' ? 'Voir toutes les facultés' : 'View all faculties'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {links.map((x) => {
              const Icon = x.icon;
              return (
                <button
                  key={x.page}
                  onClick={() => onNavigate(x.page)}
                  className="text-left bg-white border border-[#eaeaea] hover:border-[#008629] hover:shadow-md p-6 rounded-sm transition-all group relative overflow-hidden"
                >
                  <div className="w-10 h-10 rounded-sm bg-[#f0f9f1] flex items-center justify-center text-[#008629] mb-4 group-hover:bg-[#008629] group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-[#111827] group-hover:text-[#008629] transition-colors mb-2">
                    {lang === 'fr' ? x.labelFr : x.labelEn}
                  </h3>
                  <p className="text-xs text-[#666666] leading-relaxed mb-4">
                    {lang === 'fr' ? x.descFr : x.descEn}
                  </p>
                  <span className="inline-flex items-center text-xs font-semibold text-[#008629]">
                    <span>{lang === 'fr' ? 'En savoir plus' : 'Learn more'}</span>
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Featured Degrees & Programs (3 Selected Core Cycles) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#eaeaea] pb-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#008629] block mb-1">
              ORIENTATION & CURSUS
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#111827] inphb-heading-accent">
              {lang === 'fr' ? 'Trouver votre formation' : 'Find a Degree Program'}
            </h2>
            <p className="text-xs sm:text-sm text-[#666666] mt-2">
              {lang === 'fr'
                ? 'Trois cycles d’excellence accrédités ECTS, de la formation fondamentale à la recherche doctorale.'
                : 'Three accredited ECTS degree cycles, from foundational studies to advanced doctoral research.'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('formations')}
            className="mt-4 sm:mt-0 inphb-btn-secondary text-xs inline-flex items-center gap-1.5 shrink-0 self-start sm:self-end"
          >
            <span>{lang === 'fr' ? 'Voir toutes les formations (50+)' : 'View all programs (50+)'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3 Featured Cycle Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Section 1: Cycle Bachelor */}
          <div className="bg-white border border-[#eaeaea] border-t-4 border-t-[#008629] p-6 rounded-sm shadow-sm hover:border-[#008629] hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#008629] bg-[#f0f9f1] px-2.5 py-1 rounded-xs font-mono">
                  1er Cycle · Bac+3
                </span>
                <span className="text-[11px] font-semibold text-[#666666] font-mono">
                  180 ECTS
                </span>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#888888] uppercase tracking-wider block">
                  {lang === 'fr' ? 'Faculté de Management Durable' : 'Faculty of Sustainable Management'}
                </span>
                <h3 className="text-base font-bold text-[#111827] mt-1 leading-snug">
                  {lang === 'fr'
                    ? 'Bachelor en Management Durable & Entrepreneuriat Vert'
                    : 'Bachelor in Sustainable Management & Green Entrepreneurship'}
                </h3>
              </div>

              <p className="text-xs text-[#555555] leading-relaxed">
                {lang === 'fr'
                  ? 'Formation fondamentale alliant gestion d’entreprise, écologie appliquée, analyse de cycle de vie et modèle d’affaires régénératif.'
                  : 'Undergraduate degree combining business management, applied ecology, lifecycle assessment, and regenerative models.'}
              </p>

              <div className="pt-3 border-t border-[#f1f5f9] space-y-1.5 text-xs text-[#666666]">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#008629] shrink-0" />
                  <span>{lang === 'fr' ? 'Durée : 3 ans (6 semestres)' : 'Duration: 3 years (6 semesters)'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5 text-[#008629] shrink-0" />
                  <span>{lang === 'fr' ? 'Modalité : Présentiel & Hybride' : 'Format: On-Campus & Hybrid'}</span>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-[#eaeaea] flex items-center justify-between gap-2">
              <button
                onClick={() =>
                  onApplyForProgram(
                    lang === 'fr'
                      ? 'Bachelor en Management Durable & Entrepreneuriat Vert'
                      : 'Bachelor in Sustainable Management & Green Entrepreneurship'
                  )
                }
                className="inphb-btn-primary text-xs py-2 px-3 flex-1 text-center"
              >
                <span>{lang === 'fr' ? 'Candidater' : 'Apply'}</span>
              </button>
              <button
                onClick={() => onNavigate('formations')}
                className="px-3 py-2 text-xs font-semibold text-[#008629] hover:bg-[#f0f9f1] border border-[#008629] rounded-sm transition-colors text-center"
              >
                <span>{lang === 'fr' ? 'Détails' : 'Details'}</span>
              </button>
            </div>
          </div>

          {/* Section 2: Cycle Master */}
          <div className="bg-white border border-[#eaeaea] border-t-4 border-t-[#f77f00] p-6 rounded-sm shadow-sm hover:border-[#f77f00] hover:shadow-md transition-all flex flex-col justify-between relative">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#b45309] bg-[#fffbeb] px-2.5 py-1 rounded-xs font-mono">
                  2e Cycle · Bac+5
                </span>
                <span className="text-[11px] font-semibold text-[#666666] font-mono">
                  120 ECTS
                </span>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#888888] uppercase tracking-wider block">
                  {lang === 'fr' ? 'Faculté des Sciences du Climat' : 'Faculty of Climate Sciences'}
                </span>
                <h3 className="text-base font-bold text-[#111827] mt-1 leading-snug">
                  {lang === 'fr'
                    ? 'Master en Sciences du Climat & Restauration des Écosystèmes'
                    : 'MSc in Climate Science & Ecosystem Restoration'}
                </h3>
              </div>

              <p className="text-xs text-[#555555] leading-relaxed">
                {lang === 'fr'
                  ? 'Acquérir les outils scientifiques les plus avancés pour analyser les trajectoires climatiques et restaurer la biodiversité des corridors vivants.'
                  : 'Advanced scientific training in climate projection modeling, ecological engineering, and biodiversity restoration.'}
              </p>

              <div className="pt-3 border-t border-[#f1f5f9] space-y-1.5 text-xs text-[#666666]">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#f77f00] shrink-0" />
                  <span>{lang === 'fr' ? 'Durée : 2 ans (4 semestres)' : 'Duration: 2 years (4 semesters)'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5 text-[#f77f00] shrink-0" />
                  <span>{lang === 'fr' ? 'Modalité : Format Hybride & Terrain' : 'Format: Hybrid & Field Work'}</span>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-[#eaeaea] flex items-center justify-between gap-2">
              <button
                onClick={() =>
                  onApplyForProgram(
                    lang === 'fr'
                      ? 'Master en Sciences du Climat & Restauration des Écosystèmes'
                      : 'MSc in Climate Science & Ecosystem Restoration'
                  )
                }
                className="px-3 py-2 bg-[#f77f00] hover:bg-[#e07200] text-white text-xs font-bold rounded-sm transition-colors flex-1 text-center"
              >
                <span>{lang === 'fr' ? 'Candidater' : 'Apply'}</span>
              </button>
              <button
                onClick={() => onNavigate('formations')}
                className="px-3 py-2 text-xs font-semibold text-[#f77f00] hover:bg-[#fff7ed] border border-[#f77f00] rounded-sm transition-colors text-center"
              >
                <span>{lang === 'fr' ? 'Détails' : 'Details'}</span>
              </button>
            </div>
          </div>

          {/* Section 3: Cycle Doctorat / PhD */}
          <div className="bg-white border border-[#eaeaea] border-t-4 border-t-[#111827] p-6 rounded-sm shadow-sm hover:border-[#111827] hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#111827] bg-[#f1f5f9] px-2.5 py-1 rounded-xs font-mono">
                  3e Cycle · Bac+8
                </span>
                <span className="text-[11px] font-semibold text-[#666666] font-mono">
                  180 ECTS
                </span>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#888888] uppercase tracking-wider block">
                  {lang === 'fr' ? 'MIN Research Institute' : 'MIN Research Institute'}
                </span>
                <h3 className="text-base font-bold text-[#111827] mt-1 leading-snug">
                  {lang === 'fr'
                    ? 'Doctorat / PhD en Écologie Régénérative & Management MIN'
                    : 'PhD in Regenerative Ecology & Nature-Inspired Management'}
                </h3>
              </div>

              <p className="text-xs text-[#555555] leading-relaxed">
                {lang === 'fr'
                  ? 'Recherche doctorale de pointe affiliée au MIN Research Institute sur les principes du biomimétisme organisationnel et la résilience planétaire.'
                  : 'High-level doctoral research affiliated with MIN Research Institute focusing on organizational biomimicry and planetary resilience.'}
              </p>

              <div className="pt-3 border-t border-[#f1f5f9] space-y-1.5 text-xs text-[#666666]">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#111827] shrink-0" />
                  <span>{lang === 'fr' ? 'Durée : 3 ans (Thèse & Living Labs)' : 'Duration: 3 years (Dissertation & Living Labs)'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FlaskConical className="w-3.5 h-3.5 text-[#111827] shrink-0" />
                  <span>{lang === 'fr' ? 'Modalité : Présentiel & Laboratoires' : 'Format: On-Campus & Laboratories'}</span>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-[#eaeaea] flex items-center justify-between gap-2">
              <button
                onClick={() =>
                  onApplyForProgram(
                    lang === 'fr'
                      ? 'Doctorat / PhD en Écologie Régénérative & Management Inspiré par la Nature'
                      : 'PhD in Regenerative Ecology & Nature-Inspired Management'
                  )
                }
                className="px-3 py-2 bg-[#111827] hover:bg-black text-white text-xs font-bold rounded-sm transition-colors flex-1 text-center"
              >
                <span>{lang === 'fr' ? 'Candidater' : 'Apply'}</span>
              </button>
              <button
                onClick={() => onNavigate('formations')}
                className="px-3 py-2 text-xs font-semibold text-[#111827] hover:bg-gray-100 border border-[#111827] rounded-sm transition-colors text-center"
              >
                <span>{lang === 'fr' ? 'Détails' : 'Details'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Global Catalog Redirection Card */}
        <div className="mt-8 p-6 bg-white border border-[#eaeaea] rounded-sm shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-[#f0f9f1] flex items-center justify-center text-[#008629] shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#111827]">
                {lang === 'fr'
                  ? 'Consultez le catalogue interactif complet des formations'
                  : 'Access the complete interactive programs catalog'}
              </h4>
              <p className="text-xs text-[#666666]">
                {lang === 'fr'
                  ? 'Filtrez par faculté, niveau (Bachelor, Master, Doctorat, Certificat) et modalité (En ligne, Présentiel, Hybride).'
                  : 'Filter by faculty, degree level, and delivery format (Online, On-campus, Hybrid).'}
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('formations')}
            className="inphb-btn-primary text-xs shrink-0 inline-flex items-center gap-2"
          >
            <span>{lang === 'fr' ? 'Voir toutes les autres formations' : 'View all other programs'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 6. Admissions Call to Action Banner (Green INP-HB style) */}
      <section className="bg-[#008629] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.16em] text-white/80 font-bold block">
              ADMISSIONS 2026 - 2027
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {lang === 'fr'
                ? 'Bâtissez votre avenir académique avec PLURIPERF'
                : 'Build Your Academic Future with PLURIPERF'}
            </h2>
            <p className="text-xs sm:text-sm text-white/85 max-w-lg leading-relaxed">
              {lang === 'fr'
                ? 'Les inscriptions sont ouvertes pour l’ensemble des cycles de Licence, Master et Doctorat. Remplissez votre dossier en ligne dès aujourd’hui.'
                : 'Admissions are open for Bachelors, Masters, and Doctoral programs. Complete your online application today.'}
            </p>
          </div>

          <div className="flex flex-wrap md:justify-end gap-3">
            <button
              onClick={onOpenApply}
              className="px-6 py-3 bg-[#f77f00] hover:bg-[#e07200] text-white font-bold text-xs rounded-sm shadow-sm transition-colors flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>{lang === 'fr' ? 'Candidater en ligne' : 'Apply Online'}</span>
            </button>
            <button
              onClick={() => onNavigate('admissions')}
              className="px-6 py-3 border border-white text-white hover:bg-white/10 font-semibold text-xs rounded-sm transition-colors"
            >
              {lang === 'fr' ? 'Guide d’admission' : 'Admissions Guide'}
            </button>
            <button
              onClick={onOpenConsulting}
              className="px-6 py-3 bg-white text-[#111827] hover:bg-gray-100 font-semibold text-xs rounded-sm transition-colors"
            >
              {lang === 'fr' ? 'Cabinet Conseil ESG' : 'ESG Advisory'}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
