import React, { useState } from 'react';
import { Language, PageId } from '../types';
import { ADMISSIONS_CONTENT } from '../data/universityData';
import {
  GraduationCap,
  Calendar,
  DollarSign,
  Award,
  FileCheck2,
  HelpCircle,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';

interface AdmissionsPageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  onOpenApply: () => void;
  onOpenAppointment: () => void;
}

export const AdmissionsPage: React.FC<AdmissionsPageProps> = ({
  lang,
  onNavigate,
  onOpenApply,
  onOpenAppointment,
}) => {
  const content = ADMISSIONS_CONTENT[lang];
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <div className="space-y-12 pb-16">
      {/* Header from Slide 8 */}
      <section className="border-b border-slate-200 pb-8 pt-4">
        <div className="max-w-3xl space-y-3">
          <div className="text-xs uppercase tracking-widest font-semibold text-amber-600">
            {lang === 'fr' ? 'Rejoindre la Promotion' : 'Join the Cohort'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-slate-900 font-bold">
            {lang === 'fr' ? 'Admissions & Candidatures' : 'Admissions & Applications'}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {lang === 'fr'
              ? 'Une sélection sur dossier et entretien pour identifier les futurs leaders du monde durable et de la régénération.'
              : 'Holistic evaluation through dossier and interviews to select prospective leaders of systemic ecological regeneration.'}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onOpenApply}
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs sm:text-sm rounded-xl shadow transition-colors flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>{lang === 'fr' ? 'Déposer un dossier' : 'Submit Application'}</span>
            </button>
            <button
              type="button"
              onClick={onOpenAppointment}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm rounded-xl transition-colors flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>{lang === 'fr' ? 'Rendez-vous conseiller' : 'Advisor Meeting'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 1. Processus d'inscription (Slide 8) */}
      <section className="space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-xl font-serif font-bold text-slate-900">
            {lang === 'fr' ? 'Processus d’Inscription en 4 Étapes' : '4-Step Application Process'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {content.steps.map((st) => (
            <div
              key={st.step}
              className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2 relative"
            >
              <span className="font-mono text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Étape {st.step}
              </span>
              <h3 className="font-semibold text-slate-900 text-sm mt-1">{st.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Conditions d'admission & Bourses d'études */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Conditions */}
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-700">
            <FileCheck2 className="w-4 h-4 text-amber-600" />
            <span>{lang === 'fr' ? 'Conditions d’Admission' : 'Admission Requirements'}</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            {content.requirements}
          </p>
          <div className="pt-2 border-t border-slate-200/80 text-xs text-slate-500 space-y-1">
            <p>• Bachelor : Baccalauréat ou High School Diploma équivalent.</p>
            <p>• Master / MSc : Titre Bac+3 / Licence (180 ECTS) ou expérience VAE.</p>
            <p>• Doctorat : Master Recherche / DEA (300 ECTS) avec projet de thèse.</p>
          </div>
        </div>

        {/* Bourses d'études */}
        <div className="p-6 bg-emerald-50/60 rounded-2xl border border-emerald-200/80 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase text-emerald-800">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>{lang === 'fr' ? 'Bourses Mère Nature' : 'Mother Nature Scholarships'}</span>
          </div>
          <p className="text-xs text-emerald-950 leading-relaxed">
            {content.scholarships}
          </p>
          <button
            type="button"
            onClick={onOpenApply}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
          >
            <span>{lang === 'fr' ? 'Demander une bourse lors du dépôt' : 'Request scholarship in application'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3. Frais de scolarité & Calendrier académique */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-700">
            <DollarSign className="w-4 h-4 text-amber-600" />
            <span>{lang === 'fr' ? 'Frais de Scolarité & Échéanciers' : 'Tuition Fees & Payments'}</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {content.tuition}
          </p>
          <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
            <div className="flex justify-between font-medium">
              <span>Bachelor / Licence :</span>
              <span className="font-mono">3 800 € / an</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Master & MSc :</span>
              <span className="font-mono">5 200 € / an</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Doctorat / PhD :</span>
              <span className="font-mono">Financement & bourses disponibles</span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-700">
            <Calendar className="w-4 h-4 text-amber-600" />
            <span>{lang === 'fr' ? 'Calendrier Académique 2026-2027' : 'Academic Calendar 2026-2027'}</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {content.calendar}
          </p>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200/60 flex justify-between">
              <span className="font-semibold text-amber-950">Rentrée d’Automne :</span>
              <span className="font-mono text-amber-900 font-bold">15 Octobre 2026</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex justify-between">
              <span className="font-semibold text-slate-900">Rentrée de Printemps :</span>
              <span className="font-mono text-slate-700">1er Mars 2027</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. FAQ (Slide 8) */}
      <section className="space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <span>{lang === 'fr' ? 'Foire Aux Questions (FAQ)' : 'Frequently Asked Questions'}</span>
          </h2>
        </div>

        <div className="space-y-2">
          {content.faq.map((item, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden bg-white"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full text-left p-4 text-xs sm:text-sm font-semibold text-slate-900 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isOpen ? 'rotate-180 text-amber-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-600 border-t border-slate-100 leading-relaxed bg-slate-50/50">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
