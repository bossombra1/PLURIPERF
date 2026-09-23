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
  Building2,
  FileText,
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
            <span className="text-[#898888]">{lang === 'fr' ? 'Admissions' : 'Admissions'}</span>
            <span>/</span>
            <span className="text-[#008629] font-medium">
              {lang === 'fr' ? 'Candidatures & Bourses' : 'Applications & Scholarships'}
            </span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111827] tracking-tight inphb-heading-accent">
                {lang === 'fr' ? 'Admissions & Candidatures' : 'Admissions & Applications'}
              </h1>
              <p className="text-sm sm:text-base text-[#666666] max-w-2xl pt-2">
                {lang === 'fr'
                  ? 'Rejoignez une promotion d’excellence engagée pour la transition écologique et le management régénératif.'
                  : 'Join a premier academic cohort committed to ecological transition and regenerative management.'}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={onOpenApply}
                className="inphb-btn-primary"
              >
                <GraduationCap className="w-4 h-4" />
                <span>{lang === 'fr' ? 'Déposer un dossier' : 'Apply Online'}</span>
              </button>
              <button
                type="button"
                onClick={onOpenAppointment}
                className="inphb-btn-secondary"
              >
                <Calendar className="w-4 h-4" />
                <span>{lang === 'fr' ? 'Entretien conseiller' : 'Advisor Meeting'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        {/* Processus d'inscription en 4 étapes */}
        <section className="bg-white border border-[#eaeaea] p-6 sm:p-8 rounded-sm shadow-sm space-y-6">
          <div className="border-b border-[#eaeaea] pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#008629] block mb-1">
              {lang === 'fr' ? 'MODALITÉS DE SÉLECTION' : 'APPLICATION PROCESS'}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">
              {lang === 'fr' ? 'Processus d’Inscription en 4 Étapes' : '4-Step Application Process'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {content.steps.map((st) => (
              <div
                key={st.step}
                className="p-5 border border-[#eaeaea] bg-[#fafafa] rounded-sm relative space-y-2 border-t-4 border-t-[#008629]"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-[#008629] block">
                  Étape 0{st.step}
                </span>
                <h3 className="font-bold text-sm text-[#111827]">{st.title}</h3>
                <p className="text-xs text-[#555555] leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Conditions d'admission & Bourses d'études */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Conditions */}
          <div className="bg-white border border-[#eaeaea] p-6 sm:p-8 rounded-sm shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-[#eaeaea] pb-3">
              <FileCheck2 className="w-5 h-5 text-[#008629]" />
              <h3 className="font-bold text-base text-[#111827]">
                {lang === 'fr' ? 'Conditions d’Admission Générales' : 'Admission Requirements'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
              {content.requirements}
            </p>
            <div className="pt-2 border-t border-[#eaeaea] text-xs text-[#444444] space-y-2">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#008629] mt-1.5 shrink-0" />
                <span><b>Bachelor (Bac+3) :</b> Baccalauréat toutes séries ou diplôme étranger équivalent.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#008629] mt-1.5 shrink-0" />
                <span><b>Master / MSc (Bac+5) :</b> Titre Bac+3 / Licence (180 ECTS) ou équivalence professionnelle.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#008629] mt-1.5 shrink-0" />
                <span><b>Doctorat / PhD :</b> Master Recherche / DEA (300 ECTS) et validation du projet de recherche.</span>
              </div>
            </div>
          </div>

          {/* Bourses d'études */}
          <div className="bg-white border border-[#eaeaea] p-6 sm:p-8 rounded-sm shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-[#eaeaea] pb-3">
              <Award className="w-5 h-5 text-[#008629]" />
              <h3 className="font-bold text-base text-[#111827]">
                {lang === 'fr' ? 'Bourses d’Excellence Mère Nature' : 'Mother Nature Scholarships'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
              {content.scholarships}
            </p>
            <div className="p-4 bg-[#f0f9f1] border border-[#c3e6cb] rounded-sm text-xs text-[#155724] space-y-1">
              <b className="block">Bourses de mérite et critères sociaux :</b>
              <p>Prise en charge partielle ou totale des frais d’études pour les candidats démontrant un fort engagement écologique et un dossier académique exemplaire.</p>
            </div>
            <button
              type="button"
              onClick={onOpenApply}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008629] hover:underline"
            >
              <span>{lang === 'fr' ? 'Solliciter une bourse lors de la candidature' : 'Apply for a scholarship'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Frais de scolarité & Calendrier académique */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-[#eaeaea] p-6 sm:p-8 rounded-sm shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-[#eaeaea] pb-3">
              <DollarSign className="w-5 h-5 text-[#008629]" />
              <h3 className="font-bold text-base text-[#111827]">
                {lang === 'fr' ? 'Frais de Scolarité & Modalités' : 'Tuition Fees & Payments'}
              </h3>
            </div>
            <p className="text-xs text-[#555555] leading-relaxed">
              {content.tuition}
            </p>
            <div className="divide-y divide-[#eaeaea] border border-[#eaeaea] rounded-sm text-xs">
              <div className="p-3 flex justify-between items-center bg-[#fafafa]">
                <span className="font-medium text-[#111827]">Bachelor / Licence (3 ans) :</span>
                <span className="font-bold text-[#008629]">3 800 € / an (ou 2 500 000 FCFA)</span>
              </div>
              <div className="p-3 flex justify-between items-center bg-white">
                <span className="font-medium text-[#111827]">Master & MSc (2 ans) :</span>
                <span className="font-bold text-[#008629]">5 200 € / an (ou 3 400 000 FCFA)</span>
              </div>
              <div className="p-3 flex justify-between items-center bg-[#fafafa]">
                <span className="font-medium text-[#111827]">Doctorat / PhD (3-4 ans) :</span>
                <span className="font-bold text-[#008629]">Bourses de recherche disponibles</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#eaeaea] p-6 sm:p-8 rounded-sm shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-[#eaeaea] pb-3">
              <Calendar className="w-5 h-5 text-[#008629]" />
              <h3 className="font-bold text-base text-[#111827]">
                {lang === 'fr' ? 'Calendrier des Inscriptions 2026-2027' : 'Academic Calendar 2026-2027'}
              </h3>
            </div>
            <p className="text-xs text-[#555555] leading-relaxed">
              {content.calendar}
            </p>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#f0f9f1] border-l-4 border-l-[#008629] rounded-xs flex justify-between items-center">
                <div>
                  <span className="font-bold text-[#008629] block">Rentrée Principale d’Automne</span>
                  <span className="text-[#555555]">Date limite de dépôt : 30 Septembre 2026</span>
                </div>
                <span className="font-bold text-[#111827] text-sm">15 Octobre 2026</span>
              </div>
              <div className="p-3 bg-[#fafafa] border-l-4 border-l-[#f77f00] rounded-xs flex justify-between items-center">
                <div>
                  <span className="font-bold text-[#f77f00] block">Rentrée Décalée de Printemps</span>
                  <span className="text-[#555555]">Date limite de dépôt : 15 Février 2027</span>
                </div>
                <span className="font-bold text-[#111827] text-sm">01 Mars 2027</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <section className="bg-white border border-[#eaeaea] p-6 sm:p-8 rounded-sm shadow-sm space-y-6">
          <div className="border-b border-[#eaeaea] pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#008629] block mb-1">
              QUESTIONS FRÉQUENTES
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">
              {lang === 'fr' ? 'Foire Aux Questions (FAQ)' : 'Frequently Asked Questions'}
            </h2>
          </div>

          <div className="space-y-3">
            {content.faq.map((item, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-[#eaeaea] rounded-sm overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full text-left p-4 text-xs sm:text-sm font-semibold text-[#111827] flex items-center justify-between hover:bg-[#f8fafc] transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        isOpen ? 'rotate-180 text-[#008629]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-[#555555] border-t border-[#eaeaea] leading-relaxed bg-[#fafafa]">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
};
