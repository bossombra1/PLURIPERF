import React, { useState } from 'react';
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
    <div className="space-y-12 pb-16">
      {/* Header */}
      <section className="border-b border-slate-200 pb-8 pt-4">
        <div className="max-w-3xl space-y-3">
          <div className="text-xs uppercase tracking-widest font-semibold text-amber-600">
            {lang === 'fr' ? 'Offre Pédagogique Certifiée' : 'Certified Degree Programs'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-slate-900 font-bold">
            {lang === 'fr' ? 'Formations & Diplômes' : 'Degree Programs & Diplomas'}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {lang === 'fr'
              ? 'Cursus accrédités ECTS du Bachelor au Doctorat, dispensés en présentiel, 100% en ligne ou en format hybride pour étudiants et cadres en activité.'
              : 'ECTS accredited tracks from Bachelor to PhD, available on campus, 100% online, or hybrid for working professionals.'}
          </p>
        </div>
      </section>

      {/* Program Search Engine */}
      <section>
        <ProgramSearch
          lang={lang}
          onApplyForProgram={onApplyForProgram}
          onSelectFaculty={(fId) => onNavigate('facultes')}
        />
      </section>

      {/* Degree Equivalency & Quality Accreditations */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-serif font-bold text-slate-900">
          {lang === 'fr' ? 'Reconnaissance & Système Européen ECTS' : 'Recognition & European ECTS Credit System'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Bachelor (180 ECTS)</span>
            <p>3 années d’études post-baccalauréat formant des gestionnaires et techniciens de l’écologie appliquée.</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Master & MSc (120 ECTS)</span>
            <p>2 années d’approfondissement stratégique pour diriger la transition durable d’organisations complexes.</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Doctorat & PhD (180 ECTS)</span>
            <p>3 années de recherche adossées au MIN Research Institute avec soutenance devant un jury international.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
