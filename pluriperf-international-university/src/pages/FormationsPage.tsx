import React from 'react';
import { Language, PageId } from '../types';
import { ProgramSearch } from '../components/ProgramSearch';
import { Award, BookOpen, Clock, CheckCircle } from 'lucide-react';

interface FormationsPageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  onApplyForProgram: (programTitle: string) => void;
}

export const FormationsPage: React.FC<FormationsPageProps> = ({
  lang,
  onNavigate,
  onApplyForProgram,
}) => {
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
            <span className="text-[#898888]">{lang === 'fr' ? 'Études' : 'Studies'}</span>
            <span>/</span>
            <span className="text-[#008629] font-medium">
              {lang === 'fr' ? 'Offre de Formation' : 'Degree Programs'}
            </span>
          </nav>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111827] tracking-tight inphb-heading-accent">
              {lang === 'fr' ? 'Formations & Diplômes d’Excellence' : 'Degree Programs & Diplomas'}
            </h1>
            <p className="text-sm sm:text-base text-[#666666] max-w-2xl pt-2">
              {lang === 'fr'
                ? 'Cursus accrédités ECTS du Bachelor au Doctorat, dispensés en présentiel, 100% en ligne ou en format hybride pour étudiants et cadres en activité.'
                : 'ECTS accredited programs from Bachelor to PhD, delivered on campus, 100% online, or hybrid for scholars and executives.'}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Program Search Engine */}
        <section className="bg-white border border-[#eaeaea] p-6 sm:p-8 rounded-sm shadow-sm">
          <ProgramSearch
            lang={lang}
            onApplyForProgram={onApplyForProgram}
            onSelectFaculty={() => onNavigate('facultes')}
          />
        </section>

        {/* Degree Equivalency & Quality Accreditations (Exact INP-HB style) */}
        <section className="bg-white border border-[#eaeaea] rounded-sm p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-[#eaeaea] pb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#008629] block mb-1">
              ARCHITECTURE ACADÉMIQUE
            </span>
            <h3 className="text-xl font-bold text-[#111827]">
              {lang === 'fr' ? 'Reconnaissance & Système Européen ECTS' : 'Recognition & European ECTS Credit System'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-[#555555]">
            <div className="p-5 bg-[#fafafa] border border-[#eaeaea] border-t-4 border-t-[#008629] rounded-sm space-y-2">
              <span className="font-bold text-sm text-[#111827] block">Bachelor (180 ECTS)</span>
              <p className="leading-relaxed">3 années d’études post-baccalauréat formant des gestionnaires et analystes de terrain de l’écologie appliquée et du management durable.</p>
            </div>
            <div className="p-5 bg-[#fafafa] border border-[#eaeaea] border-t-4 border-t-[#008629] rounded-sm space-y-2">
              <span className="font-bold text-sm text-[#111827] block">Master & MSc (120 ECTS)</span>
              <p className="leading-relaxed">2 années d’approfondissement stratégique pour piloter la transition durable, les bilans carbone et les politiques ESG d’organisations complexes.</p>
            </div>
            <div className="p-5 bg-[#fafafa] border border-[#eaeaea] border-t-4 border-t-[#008629] rounded-sm space-y-2">
              <span className="font-bold text-sm text-[#111827] block">Doctorat & PhD (180 ECTS)</span>
              <p className="leading-relaxed">3 à 4 années de recherche doctorale au sein des chaires MIN, aboutissant à des publications scientifiques et solutions brevetées.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
