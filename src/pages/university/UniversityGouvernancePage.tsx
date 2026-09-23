import React from 'react';
import { Language, PageId } from '../../types';
import { UNIVERSITY_SECTIONS } from '../../data/universityData';
import { UniversityLayout } from '../../components/UniversityLayout';
import {
  Shield,
  Users,
  Award,
  BookCheck,
  Building,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  FileText,
} from 'lucide-react';

interface UniversityPageProps {
  lang: Language;
  onNavigate: (page: PageId, sectionId?: string) => void;
  onOpenApply: () => void;
  onOpenAppointment?: () => void;
  onOpenWhatsApp?: () => void;
}

export const UniversityGouvernancePage: React.FC<UniversityPageProps> = ({
  lang,
  onNavigate,
  onOpenApply,
  onOpenAppointment,
  onOpenWhatsApp,
}) => {
  const content = UNIVERSITY_SECTIONS[lang].gouvernance;

  return (
    <UniversityLayout
      activePageId="universite_gouvernance"
      pageTitleFr="Gouvernance & Conseils Institutionnels"
      pageTitleEn="Governance & Academic Councils"
      pageSubtitleFr="Une organisation collégiale, transparente et garante de l'intégrité de nos diplômes."
      pageSubtitleEn="A collegial, transparent governance structure safeguarding degree integrity and scientific rigor."
      chapterBadgeFr="Chapitre 06 · Instances Dirigeantes"
      chapterBadgeEn="Chapter 06 · Governance Bodies"
      lang={lang}
      onNavigate={onNavigate}
      onOpenApply={onOpenApply}
      onOpenAppointment={onOpenAppointment}
      onOpenWhatsApp={onOpenWhatsApp}
    >
      <div className="space-y-8">
        {/* OVERVIEW CARD */}
        <section className="bg-white border border-[#eaeaea] p-6 sm:p-8 rounded-sm shadow-sm space-y-4">
          <div className="border-b border-[#eaeaea] pb-3 flex items-center gap-2 text-[#008629]">
            <Shield className="w-5 h-5 shrink-0" />
            <h2 className="text-xl font-bold text-[#111827]">
              {lang === 'fr' ? 'Principes de Gouvernance Universitaire' : 'Institutional Governance Principles'}
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-[#444444]">
            {content.content}
          </p>
        </section>

        {/* 4 GOVERNANCE BODIES GRID */}
        <section className="bg-white border border-[#eaeaea] p-6 sm:p-8 rounded-sm shadow-sm space-y-6">
          <div className="border-b border-[#eaeaea] pb-3">
            <h3 className="text-lg font-bold text-[#111827]">
              {lang === 'fr' ? 'Les 4 Instances Dirigeantes Délibératives' : 'The 4 Governing Councils'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Body 1: CA */}
            <div className="p-5 border border-[#eaeaea] bg-[#f8fafc] rounded-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#008629] bg-[#eaf5ec] px-2 py-0.5 rounded">
                  Instance Suprême
                </span>
                <Building className="w-4 h-4 text-[#008629]" />
              </div>
              <h4 className="font-bold text-sm text-[#111827]">
                {lang === 'fr' ? '1. Le Conseil d’Administration (CA)' : '1. The Board of Directors'}
              </h4>
              <p className="text-xs text-[#555555] leading-relaxed">
                {lang === 'fr'
                  ? 'Présidé par le Recteur-Président, il fixe les orientations stratégiques, vote les budgets annuels, valide les créations de facultés et supervise les investissements dans les campus et Living Labs.'
                  : 'Chaired by the Rector-President, it determines institutional strategy, approves annual budgets, endorses new faculty creations, and oversees campus infrastructure investments.'}
              </p>
            </div>

            {/* Body 2: Sénat Académique */}
            <div className="p-5 border border-[#eaeaea] bg-[#f8fafc] rounded-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#008629] bg-[#eaf5ec] px-2 py-0.5 rounded">
                  Pédagogie & Rigueur
                </span>
                <GraduationCap className="w-4 h-4 text-[#008629]" />
              </div>
              <h4 className="font-bold text-sm text-[#111827]">
                {lang === 'fr' ? '2. Le Sénat Académique & Scientifique (SAS)' : '2. Academic & Scientific Senate'}
              </h4>
              <p className="text-xs text-[#555555] leading-relaxed">
                {lang === 'fr'
                  ? 'Composé des 9 doyens et de professeurs émérites internationaux, il garantit la qualité des enseignements, valide les maquettes de diplômes ECTS et attribue les financements doctoraux.'
                  : 'Convening the 9 deans and distinguished international professors, it guarantees curriculum quality, validates ECTS course syllabi, and allocates doctoral research fellowships.'}
              </p>
            </div>

            {/* Body 3: Comité d'Éthique */}
            <div className="p-5 border border-[#eaeaea] bg-[#f8fafc] rounded-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#008629] bg-[#eaf5ec] px-2 py-0.5 rounded">
                  Déontologie
                </span>
                <Award className="w-4 h-4 text-[#008629]" />
              </div>
              <h4 className="font-bold text-sm text-[#111827]">
                {lang === 'fr' ? '3. Le Comité d’Éthique & Révérence du Vivant' : '3. Ethics & Biosphere Stewardship Committee'}
              </h4>
              <p className="text-xs text-[#555555] leading-relaxed">
                {lang === 'fr'
                  ? 'Instance indépendante qui examine les projets de recherche, valide l’absence de greenwashing dans les partenariats corporatifs et garantit le respect de la charte du Vivant.'
                  : 'Independent supervisory committee reviewing research mandates, ensuring absolute anti-greenwashing compliance in partnerships, and enforcing the living ethics code.'}
              </p>
            </div>

            {/* Body 4: Décanat et Direction */}
            <div className="p-5 border border-[#eaeaea] bg-[#f8fafc] rounded-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#008629] bg-[#eaf5ec] px-2 py-0.5 rounded">
                  Opérations
                </span>
                <Users className="w-4 h-4 text-[#008629]" />
              </div>
              <h4 className="font-bold text-sm text-[#111827]">
                {lang === 'fr' ? '4. La Direction des Études & Décanat Central' : '4. Academic Affairs & Central Deanery'}
              </h4>
              <p className="text-xs text-[#555555] leading-relaxed">
                {lang === 'fr'
                  ? 'Assure la gestion courante de la scolarité, la coordination des 9 facultés, l’organisation des jurys de soutenance et la liaison avec les plateformes numériques de cours.'
                  : 'Manages daily registrar operations, inter-faculty pedagogical coordination, degree examination juries, and digital campus learning systems.'}
              </p>
            </div>
          </div>
        </section>

        {/* ORGANIZATIONAL FLOWCHART CARD */}
        <section className="bg-white border border-[#eaeaea] p-6 sm:p-8 rounded-sm shadow-sm space-y-4">
          <div className="border-b border-[#eaeaea] pb-3">
            <h3 className="text-lg font-bold text-[#111827]">
              {lang === 'fr' ? 'Organigramme Simplifié des Décisions' : 'Institutional Governance Flowchart'}
            </h3>
          </div>

          <div className="bg-[#f8fafc] border border-[#eaeaea] p-5 rounded-sm text-center space-y-4">
            <div className="inline-block bg-[#008629] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-sm shadow-xs">
              Rectorat Général & Conseil d'Administration
            </div>
            <div className="w-0.5 h-6 bg-[#008629] mx-auto"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
              <div className="bg-white border border-[#eaeaea] p-3 rounded-xs text-xs font-semibold text-[#111827]">
                Sénat Académique & Scientifique (SAS)
              </div>
              <div className="bg-white border border-[#eaeaea] p-3 rounded-xs text-xs font-semibold text-[#111827]">
                Comité d'Éthique & Déontologie
              </div>
            </div>
            <div className="w-0.5 h-6 bg-[#008629] mx-auto"></div>
            <div className="inline-block bg-white border-2 border-[#008629] text-[#008629] text-xs font-bold px-4 py-2 rounded-xs">
              Collège des 9 Doyens de Facultés & Direction des Études
            </div>
          </div>
        </section>

        {/* NEXT CHAPTER BUTTON */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => onNavigate('universite_reconnaissances')}
            className="inphb-btn-primary text-xs flex items-center gap-2"
          >
            <span>{lang === 'fr' ? 'Continuer : Agréments & Partenaires' : 'Next: Accreditations & Alliances'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </UniversityLayout>
  );
};
