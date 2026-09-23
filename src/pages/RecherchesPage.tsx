import React, { useState } from 'react';
import { Language, PageId } from '../types';
import { RESEARCH_DATA } from '../data/universityData';
import { UNIVERSITY_ASSETS } from '../assets/images';
import {
  Atom,
  FlaskConical,
  BookOpen,
  Award,
  Users2,
  Calendar,
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle,
} from 'lucide-react';

interface RecherchesPageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

export const RecherchesPage: React.FC<RecherchesPageProps> = ({
  lang,
  onNavigate,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'inventions' | 'projets' | 'centres'>('all');

  const researchCenters = [
    {
      nameFr: 'Centre de Recherche en Biomatériaux et Éco-Habitat',
      nameEn: 'Center for Bio-based Materials & Eco-Habitats',
      focusFr: 'Mycélium, composites en terre crue, fibres de lin et chanvre structurel',
      focusEn: 'Mycelium, rammed earth composites, flax fibers, and structural hemp',
    },
    {
      nameFr: 'Laboratoire d’Intelligence Artificielle Frugale & Capteurs IoT',
      nameEn: 'Laboratory of Frugal AI & Micro-IoT Sensors',
      focusFr: 'Green AI, nano-modèles embarqués, détection d’incendies et surveillance hydrologique',
      focusEn: 'Green AI, embedded micro-models, wildfire warning, and hydrologic surveillance',
    },
    {
      nameFr: 'Chaire Modélisation des Systèmes Complexes & MIN',
      nameEn: 'Chair of Complex Systems Modeling & NIM',
      focusFr: 'Formalisation mathématique des cycles de vie et de la symbiose industrielle',
      focusEn: 'Mathematical formalization of life-cycles and industrial symbiosis',
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Header from Slide 14 */}
      <section className="border-b border-slate-200 pb-8 pt-4">
        <div className="max-w-3xl space-y-3">
          <div className="text-xs uppercase tracking-widest font-semibold text-amber-600">
            {lang === 'fr' ? 'Sciences & Innovations de Rupture' : 'Frontier Sciences & Breakthroughs'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-slate-900 font-bold">
            {lang === 'fr'
              ? 'RECHERCHES - INVENTIONS - PROJETS'
              : 'RESEARCH - INVENTIONS - PROJECTS'}
          </h1>
          <p className="text-xl font-serif text-slate-800 italic">
            {lang === 'fr' ? 'Le MIN Research Institute.' : 'The MIN Research Institute.'}
          </p>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {lang === 'fr'
              ? 'Institut de recherche fondamentale et appliquée de PLURIPERF, dédié à la transposition des principes du Vivant dans les technologies, les matériaux et la gouvernance.'
              : 'PLURIPERF’s fundamental and applied research institute, dedicated to translating natural principles into technologies, biomaterials, and systemic governance.'}
          </p>
        </div>
      </section>

      {/* Hero photo showcasing lab */}
      <div className="rounded-2xl overflow-hidden border border-slate-200 relative max-h-[380px]">
        <img
          src={UNIVERSITY_ASSETS.researchLab}
          alt="Laboratoire MIN Research Institute"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white max-w-2xl space-y-2">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
            {lang === 'fr' ? 'Living Labs & Éco-Laboratoires' : 'Living Labs & Eco-Laboratories'}
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-bold">
            {lang === 'fr'
              ? 'Des paillasses scientifiques aux forêts expérimentales'
              : 'From scientific benches to experimental forests'}
          </h3>
          <p className="text-xs text-slate-300">
            {lang === 'fr'
              ? 'Nos équipes travaillent en symbiose avec les écosystèmes pour breveter des solutions régénératives concrètes.'
              : 'Our researchers work hand in hand with living ecosystems to patent tangible regenerative breakthroughs.'}
          </p>
        </div>
      </div>

      {/* Slide 14: Les Inventions & Projets */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-xl font-serif font-bold text-slate-900">
              {lang === 'fr' ? 'Inventions Brevetées & Projets de Recherche' : 'Patented Inventions & Active Research'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === 'fr'
                ? 'Innovations technologiques et écologiques conçues au sein de nos centres'
                : 'Technological and ecological innovations designed in our laboratories'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RESEARCH_DATA.map((proj) => (
            <div
              key={proj.id}
              className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-amber-600 uppercase tracking-wider font-mono">
                    {proj.status}
                  </span>
                  <span className="text-slate-400 font-mono">{proj.year}</span>
                </div>

                <h3 className="text-base font-semibold text-slate-900 leading-snug">
                  {lang === 'fr' ? proj.titleFr : proj.titleEn}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'fr' ? proj.abstractFr : proj.abstractEn}
                </p>

                <div className="pt-2 text-[11px] text-slate-400 space-y-1 border-t border-slate-100">
                  <p>
                    <span className="font-medium text-slate-600">Lab :</span>{' '}
                    {lang === 'fr' ? proj.centerFr : proj.centerEn}
                  </p>
                  <p>
                    <span className="font-medium text-slate-600">Chercheurs :</span>{' '}
                    {proj.leadResearcher}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Slide 14: Centres de recherche & Laboratoires */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-600">
            {lang === 'fr' ? 'Infrastructures Scientifiques' : 'Scientific Infrastructure'}
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-1">
            {lang === 'fr' ? 'Centres de Recherche & Laboratoires Vivants' : 'Research Centers & Living Labs'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {researchCenters.map((c, i) => (
            <div key={i} className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
              <FlaskConical className="w-5 h-5 text-amber-600" />
              <h3 className="font-semibold text-slate-900 text-sm">
                {lang === 'fr' ? c.nameFr : c.nameEn}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'fr' ? c.focusFr : c.focusEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Slide 14: Conférences & Chercheurs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase text-amber-400">
            <Calendar className="w-4 h-4" />
            <span>{lang === 'fr' ? 'Conférences Internationales' : 'International Conferences'}</span>
          </div>
          <h3 className="text-lg font-serif font-bold">
            {lang === 'fr' ? 'Colloque Annuel MIN & Systèmes Vivants' : 'Annual NIM & Living Systems Symposium'}
          </h3>
          <p className="text-xs text-slate-300">
            {lang === 'fr'
              ? 'Conférence plénière réunissant les plus éminents biologistes, mathématiciens et économistes du monde.'
              : 'Plenary conference assembling leading world biologists, mathematicians, and ecological economists.'}
          </p>
          <button
            type="button"
            onClick={() => onNavigate('actualites')}
            className="text-xs text-amber-400 font-semibold hover:underline flex items-center gap-1"
          >
            <span>{lang === 'fr' ? 'Consulter le calendrier des colloques' : 'View conference schedule'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase text-emerald-600">
            <Users2 className="w-4 h-4" />
            <span>{lang === 'fr' ? 'Corps Professoral & Chercheurs' : 'Faculty & Research Fellows'}</span>
          </div>
          <h3 className="text-lg font-serif font-bold text-slate-900">
            {lang === 'fr' ? 'Plus de 85 Chercheurs Internationaux' : 'Over 85 International Fellows'}
          </h3>
          <p className="text-xs text-slate-600">
            {lang === 'fr'
              ? 'Docteurs issus des plus grandes universités internationales (Sorbonne, Oxford, MIT, Kyoto, Cheikh Anta Diop).'
              : 'Scholars trained at leading global universities (Sorbonne, Oxford, MIT, Kyoto, UCAD).'}
          </p>
          <button
            type="button"
            onClick={() => onNavigate('universite')}
            className="text-xs text-slate-900 font-semibold hover:underline flex items-center gap-1"
          >
            <span>{lang === 'fr' ? 'Voir la gouvernance et les chaires' : 'View governance & chairs'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
