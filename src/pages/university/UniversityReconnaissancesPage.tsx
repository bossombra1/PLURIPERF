import React from 'react';
import { Language, PageId } from '../../types';
import { UNIVERSITY_SECTIONS } from '../../data/universityData';
import { UniversityLayout } from '../../components/UniversityLayout';
import {
  Award,
  Globe2,
  CheckCircle2,
  Building2,
  FileCheck,
  ShieldCheck,
  GraduationCap,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

interface UniversityPageProps {
  lang: Language;
  onNavigate: (page: PageId, sectionId?: string) => void;
  onOpenApply: () => void;
  onOpenAppointment?: () => void;
  onOpenWhatsApp?: () => void;
}

export const UniversityReconnaissancesPage: React.FC<UniversityPageProps> = ({
  lang,
  onNavigate,
  onOpenApply,
  onOpenAppointment,
  onOpenWhatsApp,
}) => {
  const content = UNIVERSITY_SECTIONS[lang].reconnaissances;
  const partnersContent = UNIVERSITY_SECTIONS[lang].partenaires;

  const accreditations = [
    {
      titleFr: 'Système Européen de Transfert de Crédits (ECTS)',
      titleEn: 'European Credit Transfer and Accumulation System (ECTS)',
      descFr: 'Chaque parcours (Bachelor 180 ECTS, Master 120 ECTS, Doctorat 180 ECTS) confère des crédits officiels permettant les mobilités et passerelles internationales sans rupture de cursus.',
      descEn: 'Every curriculum (Bachelor 180 ECTS, Master 120 ECTS, PhD 180 ECTS) yields official academic credits enabling seamless international mobility and degree equivalencies.',
      badge: '100% ECTS',
    },
    {
      titleFr: 'Conformité aux Standards d’Excellence CAMES',
      titleEn: 'CAMES Academic Quality Framework Alignment',
      descFr: 'Programmes conçus dans le respect des grilles d’évaluation de l’enseignement supérieur panafricain pour garantir l’accès aux concours et postes de haute administration.',
      descEn: 'Curricula engineered according to pan-African higher education benchmark matrices, ensuring civil service and corporate qualification recognition.',
      badge: 'CAMES Standards',
    },
    {
      titleFr: 'Certification ISO 21001 & ISO 14001',
      titleEn: 'ISO 21001 & ISO 14001 Quality Certification',
      descFr: 'Audit externe régulier de notre système de management pour les organismes d’éducation et de notre politique d’impact environnemental zéro déchet.',
      descEn: 'Regular external third-party audit of our educational organization management system and zero-waste environmental stewardship protocol.',
      badge: 'ISO Certified',
    },
    {
      titleFr: 'Pacte Mondial des Nations Unies & Initiative PRME',
      titleEn: 'United Nations Global Compact & PRME Signatory',
      descFr: 'Adhésion formelle aux 10 principes du Pacte Mondial de l’ONU et aux Principes pour un Management Responsable dans l’Enseignement Supérieur (PRME).',
      descEn: 'Official signatory of the 10 UN Global Compact principles and the Principles for Responsible Management Education (PRME).',
      badge: 'UN Global Compact',
    },
  ];

  return (
    <UniversityLayout
      activePageId="universite_reconnaissances"
      pageTitleFr="Agréments, Reconnaissances & Partenaires"
      pageTitleEn="Accreditations, Recognitions & Global Alliances"
      pageSubtitleFr="L'assurance de diplômes certifiés et valorisés par les recruteurs du monde entier."
      pageSubtitleEn="The assurance of verified credentials recognized by global corporations and academic institutions."
      chapterBadgeFr="Chapitre 07 · Normes & Réseau Mondial"
      chapterBadgeEn="Chapter 07 · Standards & Alliances"
      lang={lang}
      onNavigate={onNavigate}
      onOpenApply={onOpenApply}
      onOpenAppointment={onOpenAppointment}
      onOpenWhatsApp={onOpenWhatsApp}
    >
      <div className="space-y-8">
        {/* OVERVIEW STATEMENT */}
        <section className="bg-white border border-[#eaeaea] p-6 sm:p-8 rounded-sm shadow-sm space-y-4">
          <div className="border-b border-[#eaeaea] pb-3 flex items-center gap-2 text-[#008629]">
            <Award className="w-5 h-5 shrink-0" />
            <h2 className="text-xl font-bold text-[#111827]">
              {lang === 'fr' ? 'La Garantie de Diplômes Internationaux' : 'Verified Global Academic Credentials'}
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-[#444444]">
            {content.content}
          </p>
        </section>

        {/* 4 ACCREDITATIONS GRID */}
        <section className="bg-white border border-[#eaeaea] p-6 sm:p-8 rounded-sm shadow-sm space-y-6">
          <div className="border-b border-[#eaeaea] pb-3">
            <h3 className="text-lg font-bold text-[#111827]">
              {lang === 'fr' ? 'Nos Agréments & Labels de Qualité' : 'Accreditations & Quality Charters'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {accreditations.map((item, idx) => (
              <div key={idx} className="p-5 border border-[#eaeaea] bg-[#f8fafc] rounded-sm space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#008629]">
                    <ShieldCheck className="w-5 h-5 shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#111827]">
                      {item.badge}
                    </span>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-[#008629]" />
                </div>
                <h4 className="font-bold text-sm text-[#111827]">
                  {lang === 'fr' ? item.titleFr : item.titleEn}
                </h4>
                <p className="text-xs text-[#555555] leading-relaxed">
                  {lang === 'fr' ? item.descFr : item.descEn}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 120+ PARTNERS GLOBAL NETWORK */}
        <section className="bg-white border border-[#eaeaea] p-6 sm:p-8 rounded-sm shadow-sm space-y-6">
          <div className="border-b border-[#eaeaea] pb-3 flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#111827]">
              {lang === 'fr' ? 'Réseau de 120+ Partenaires Stratégiques' : 'Network of 120+ Global Alliances'}
            </h3>
            <span className="text-xs font-bold text-[#008629] bg-[#eaf5ec] px-2.5 py-1 rounded">
              3 Continents
            </span>
          </div>

          <p className="text-sm leading-relaxed text-[#444444]">
            {partnersContent.content}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 border border-[#eaeaea] rounded-sm bg-[#fafafa] text-center space-y-1">
              <span className="text-2xl font-bold text-[#008629]">45+</span>
              <h5 className="font-bold text-xs text-[#111827]">{lang === 'fr' ? 'Universités Partenaires' : 'Partner Universities'}</h5>
              <p className="text-[11px] text-[#666666]">{lang === 'fr' ? 'France, Suisse, Sénégal, Maroc, Canada' : 'Europe, Africa & Americas'}</p>
            </div>

            <div className="p-4 border border-[#eaeaea] rounded-sm bg-[#fafafa] text-center space-y-1">
              <span className="text-2xl font-bold text-[#008629]">60+</span>
              <h5 className="font-bold text-xs text-[#111827]">{lang === 'fr' ? 'Groupes Industriels ESG' : 'Corporate ESG Alliances'}</h5>
              <p className="text-[11px] text-[#666666]">{lang === 'fr' ? 'Stages, alternances & insertion directe' : 'Internships & recruitment'}</p>
            </div>

            <div className="p-4 border border-[#eaeaea] rounded-sm bg-[#fafafa] text-center space-y-1">
              <span className="text-2xl font-bold text-[#008629]">15+</span>
              <h5 className="font-bold text-xs text-[#111827]">{lang === 'fr' ? 'Agences & Instituts ONU' : 'UN & Research Agencies'}</h5>
              <p className="text-[11px] text-[#666666]">{lang === 'fr' ? 'Projets conjoints de recherche climat' : 'Joint climate research'}</p>
            </div>
          </div>
        </section>

        {/* BOTTOM NAVIGATION BACK TO FACULTIES */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
          <button
            type="button"
            onClick={() => onNavigate('universite_presentation')}
            className="inphb-btn-outline text-xs"
          >
            <span>{lang === 'fr' ? 'Revenir au Chapitre 01 : Présentation' : 'Back to Chapter 01: Overview'}</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('facultes')}
            className="inphb-btn-primary text-xs flex items-center gap-2"
          >
            <GraduationCap className="w-4 h-4" />
            <span>{lang === 'fr' ? 'Explorer nos 9 Facultés' : 'Explore our 9 Faculties'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </UniversityLayout>
  );
};
