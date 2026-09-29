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
  CheckCircle,
  Building2,
} from 'lucide-react';

interface RecherchesPageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

export const RecherchesPage: React.FC<RecherchesPageProps> = ({
  lang,
  onNavigate,
}) => {
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
    <div className="bg-[#f8fafc] text-[#333333] min-h-screen">
      {/* 1. Academic Breadcrumbs & Header Banner */}
      <div className="bg-white border-b border-[#eaeaea]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
          <nav className="flex items-center gap-2 text-xs text-[#898888] mb-3">
            <button
              onClick={() => onNavigate('accueil')}
              className="hover:text-[#008629] transition-colors"
            >
              {lang === 'fr' ? 'Accueil' : 'Home'}
            </button>
            <span>/</span>
            <span className="text-[#898888]">{lang === 'fr' ? 'Recherche' : 'Research'}</span>
            <span>/</span>
            <span className="text-[#008629] font-medium">
              {lang === 'fr' ? 'MIN Research Institute' : 'NIM Research Institute'}
            </span>
          </nav>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111827] tracking-tight inphb-heading-accent">
              {lang === 'fr'
                ? 'MIN Research Institute : Recherches & Inventions'
                : 'MIN Research Institute : Science & Inventions'}
            </h1>
            <p className="text-sm sm:text-base text-[#666666] max-w-2xl pt-2">
              {lang === 'fr'
                ? 'Institut de recherche fondamentale et appliquée de PLURIPERF, dédié à la transposition des principes du Vivant dans les technologies, les matériaux et la gouvernance.'
                : 'PLURIPERF fundamental and applied research institute, translating natural principles into technological, material, and governance innovations.'}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        {/* Hero Photo Banner */}
        <div className="border border-[#eaeaea] overflow-hidden rounded-sm relative max-h-[380px] shadow-sm">
          <img
            src={UNIVERSITY_ASSETS.researchLab}
            alt="Laboratoire MIN Research Institute"
            className="w-full h-full object-cover object-center max-h-[380px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#008629] bg-white px-2 py-0.5 rounded-xs inline-block">
              {lang === 'fr' ? 'Living Labs & Laboratoires d’Expérimentation' : 'Living Labs & Scientific Facilities'}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {lang === 'fr'
                ? 'Des paillasses de laboratoire aux écosystèmes réels'
                : 'From experimental benches to living ecosystems'}
            </h2>
            <p className="text-xs text-gray-200 leading-relaxed">
              {lang === 'fr'
                ? 'Nos équipes de chercheurs doctorants et directeurs de recherche brevètent des solutions concrètes face aux défis climatiques.'
                : 'Our doctoral teams and senior fellows patent tangible solutions to pressing climate challenges.'}
            </p>
          </div>
        </div>

        {/* Centers of Excellence */}
        <section className="bg-white border border-[#eaeaea] p-6 sm:p-8 rounded-sm shadow-sm space-y-6">
          <div className="border-b border-[#eaeaea] pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#008629] block mb-1">
              CHAIRES ET LABORATOIRES
            </span>
            <h3 className="text-xl font-bold text-[#111827]">
              {lang === 'fr' ? 'Nos 3 Centres de Recherche Stratégiques' : 'Our 3 Strategic Research Centers'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {researchCenters.map((rc, idx) => (
              <div
                key={idx}
                className="border border-[#eaeaea] border-t-4 border-t-[#008629] p-5 rounded-sm bg-[#fafafa] space-y-2"
              >
                <div className="w-8 h-8 rounded bg-[#f0f9f1] flex items-center justify-center text-[#008629]">
                  <FlaskConical className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-[#111827]">
                  {lang === 'fr' ? rc.nameFr : rc.nameEn}
                </h4>
                <p className="text-xs text-[#666666] leading-relaxed">
                  {lang === 'fr' ? rc.focusFr : rc.focusEn}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Inventions & Active Research Projects */}
        <section className="space-y-6">
          <div className="border-b border-[#eaeaea] pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#008629] block mb-1">
              PRODUCTIONS SCIENTIFIQUES
            </span>
            <h3 className="text-xl font-bold text-[#111827]">
              {lang === 'fr' ? 'Inventions Brevetées & Projets en Cours' : 'Patents & Active Research Programs'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESEARCH_DATA.map((proj) => (
              <div
                key={proj.id}
                className="bg-white border border-[#eaeaea] p-6 rounded-sm shadow-sm hover:border-[#008629] transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#008629] uppercase tracking-wider font-mono text-[11px] bg-[#f0f9f1] px-2 py-0.5 rounded-xs">
                      {proj.status}
                    </span>
                    <span className="text-[#888888] font-mono">{proj.year}</span>
                  </div>

                  <h4 className="text-base font-bold text-[#111827] leading-snug">
                    {lang === 'fr' ? proj.titleFr : proj.titleEn}
                  </h4>

                  <p className="text-xs text-[#555555] leading-relaxed">
                    {lang === 'fr' ? proj.abstractFr : proj.abstractEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#eaeaea] text-[11px] text-[#888888] space-y-1">
                  <div>
                    <span className="font-semibold text-[#111827]">Lab :</span>{' '}
                    <span>{lang === 'fr' ? proj.centerFr : proj.centerEn}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#111827]">Porteur :</span>{' '}
                    <span>{proj.leadResearcher}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
