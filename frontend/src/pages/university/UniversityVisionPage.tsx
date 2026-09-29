import React from 'react';
import { Language, PageId } from '../../types';
import { UNIVERSITY_SECTIONS } from '../../data/universityData';
import { UniversityLayout } from '../../components/UniversityLayout';
import {
  Compass,
  Target,
  Sparkles,
  HeartHandshake,
  ShieldCheck,
  Scale,
  Leaf,
  CheckCircle2,
  ArrowRight,
  Eye,
} from 'lucide-react';

interface UniversityPageProps {
  lang: Language;
  onNavigate: (page: PageId, sectionId?: string) => void;
  onOpenApply: () => void;
  onOpenAppointment?: () => void;
  onOpenWhatsApp?: () => void;
}

export const UniversityVisionPage: React.FC<UniversityPageProps> = ({
  lang,
  onNavigate,
  onOpenApply,
  onOpenAppointment,
  onOpenWhatsApp,
}) => {
  const content = UNIVERSITY_SECTIONS[lang].vision;

  return (
    <UniversityLayout
      activePageId="universite_vision"
      pageTitleFr="Vision, Mission & Valeurs Fondatrices"
      pageTitleEn="Vision, Mission & Core Values"
      pageSubtitleFr="Les piliers directeurs qui orientent nos enseignements, nos recherches et nos partenariats."
      pageSubtitleEn="The guiding foundations shaping our curricula, research laboratories, and institutional alliances."
      chapterBadgeFr="Chapitre 03 · Déontologie & Fondements"
      chapterBadgeEn="Chapter 03 · Principles & Ethics"
      lang={lang}
      onNavigate={onNavigate}
      onOpenApply={onOpenApply}
      onOpenAppointment={onOpenAppointment}
      onOpenWhatsApp={onOpenWhatsApp}
    >
      <div className="space-y-8">
        {/* VISION & MISSION DUAL CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Vision 2030 */}
          <div className="bg-white border border-[#eaeaea] p-6 rounded-sm shadow-sm border-t-4 border-t-[#008629] space-y-3">
            <div className="flex items-center gap-2 text-[#008629]">
              <Eye className="w-5 h-5 shrink-0" />
              <h2 className="text-base font-bold uppercase tracking-wider text-[#111827]">
                {lang === 'fr' ? 'Notre Vision Horizon 2030' : 'Our Horizon 2030 Vision'}
              </h2>
            </div>
            <p className="text-sm text-[#444444] leading-relaxed">
              {lang === 'fr'
                ? 'Devenir le pôle académique de référence mondiale où l’économie humaine s’aligne sur les lois du Vivant. Nous aspirons à bâtir un monde où chaque entreprise, chaque administration et chaque communauté contribue activement à la régénération de la biosphère.'
                : 'To become the global academic benchmark where human economic activity aligns with natural biomes, ensuring every enterprise and institution actively revitalizes planetary ecosystems.'}
            </p>
            <div className="pt-2 text-xs font-semibold text-[#008629] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>{lang === 'fr' ? 'Économie régénérative & circulaire' : 'Regenerative & circular economy'}</span>
            </div>
          </div>

          {/* Card 2: Mission */}
          <div className="bg-white border border-[#eaeaea] p-6 rounded-sm shadow-sm border-t-4 border-t-[#111827] space-y-3">
            <div className="flex items-center gap-2 text-[#111827]">
              <Target className="w-5 h-5 shrink-0 text-[#008629]" />
              <h2 className="text-base font-bold uppercase tracking-wider text-[#111827]">
                {lang === 'fr' ? 'Notre Mission Académique' : 'Our Academic Mission'}
              </h2>
            </div>
            <p className="text-sm text-[#444444] leading-relaxed">
              {lang === 'fr'
                ? 'Former 50 000 leaders régénératifs d’ici 2035 à travers nos 9 facultés, dotés d’une double compétence managériale et écologique. Générer une recherche scientifique bio-inspirée applicable directement sur le terrain panafricain et international.'
                : 'To train 50,000 regenerative executives and scholars by 2035, endowed with dual managerial and ecological mastery, generating bio-inspired research deployed across Africa and worldwide.'}
            </p>
            <div className="pt-2 text-xs font-semibold text-[#111827] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#008629]" />
              <span>{lang === 'fr' ? 'Capacité d’action immédiate' : 'Immediate systemic deployment'}</span>
            </div>
          </div>
        </div>

        {/* 4 CORE VALUES INP-HB GRID */}
        <section className="bg-white border border-[#eaeaea] p-6 sm:p-8 rounded-sm shadow-sm space-y-6">
          <div className="border-b border-[#eaeaea] pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#008629] block mb-1">
              {lang === 'fr' ? 'Déontologie & Principes Directeurs' : 'Core Principles & Ethics'}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#111827]">
              {lang === 'fr' ? 'Nos 4 Valeurs Cardinales' : 'Our 4 Cardinal Values'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Value 1 */}
            <div className="p-4 border border-[#f1f5f9] bg-[#f8fafc] rounded-sm space-y-2">
              <div className="flex items-center gap-2.5 text-[#008629]">
                <Leaf className="w-5 h-5 shrink-0" />
                <h4 className="font-bold text-sm text-[#111827]">
                  1. {lang === 'fr' ? 'Révérence du Vivant & Primauté de la Biosphère' : 'Reverence for Life & Biosphere Primacy'}
                </h4>
              </div>
              <p className="text-xs text-[#555555] leading-relaxed">
                {lang === 'fr'
                  ? 'Reconnaître que toute valeur économique découle des services écosystémiques rendus par la Terre. La nature n’est pas une réserve de ressources à piller, mais notre matrice d’existence et d’inspiration.'
                  : 'Recognizing that all genuine wealth stems from Earth’s living cycles. Nature is not an extractive pit, but our foundation and greatest mentor.'}
              </p>
            </div>

            {/* Value 2 */}
            <div className="p-4 border border-[#f1f5f9] bg-[#f8fafc] rounded-sm space-y-2">
              <div className="flex items-center gap-2.5 text-[#008629]">
                <Scale className="w-5 h-5 shrink-0" />
                <h4 className="font-bold text-sm text-[#111827]">
                  2. {lang === 'fr' ? 'Rigueur Scientifique & Vérité Expérimentale' : 'Scientific Rigor & Empirical Truth'}
                </h4>
              </div>
              <p className="text-xs text-[#555555] leading-relaxed">
                {lang === 'fr'
                  ? 'Rejeter tout greenwashing et toute approximation. Nos étudiants maîtrisent les bilans carbone certifiés, les analyses de cycle de vie (ACV), les normes ISO et la thermodynamique des systèmes.'
                  : 'Zero compromise with greenwashing. Our students master verifiable carbon accounting, Life Cycle Analysis (LCA), and ISO metrics.'}
              </p>
            </div>

            {/* Value 3 */}
            <div className="p-4 border border-[#f1f5f9] bg-[#f8fafc] rounded-sm space-y-2">
              <div className="flex items-center gap-2.5 text-[#008629]">
                <Sparkles className="w-5 h-5 shrink-0" />
                <h4 className="font-bold text-sm text-[#111827]">
                  3. {lang === 'fr' ? 'Innovation Régénérative & Frugalité' : 'Regenerative Innovation & Frugality'}
                </h4>
              </div>
              <p className="text-xs text-[#555555] leading-relaxed">
                {lang === 'fr'
                  ? 'Privilégier les solutions sobres, réparables et modulaires inspirées des écosystèmes forestiers (Low-Tech, biomimétisme, cycles fermés sans déchet).'
                  : 'Championing lean, repairable, modular solutions inspired by ancient forest biomes (Low-Tech, biomimicry, zero-waste loops).'}
              </p>
            </div>

            {/* Value 4 */}
            <div className="p-4 border border-[#f1f5f9] bg-[#f8fafc] rounded-sm space-y-2">
              <div className="flex items-center gap-2.5 text-[#008629]">
                <HeartHandshake className="w-5 h-5 shrink-0" />
                <h4 className="font-bold text-sm text-[#111827]">
                  4. {lang === 'fr' ? 'Intégrité, Mérite & Équité Intergénérationnelle' : 'Integrity, Merit & Intergenerational Equity'}
                </h4>
              </div>
              <p className="text-xs text-[#555555] leading-relaxed">
                {lang === 'fr'
                  ? 'Promouvoir un enseignement exigeant et méritocratique, tout en garantissant que nos décisions présentes n’obèrent pas la capacité des générations futures à vivre dignement.'
                  : 'Fostering meritocracy and excellence while safeguarding the rights of unborn generations to a habitable and thriving planet.'}
              </p>
            </div>
          </div>
        </section>

        {/* CHARTE DEONTOLOGIQUE OFFICIELLE */}
        <section className="bg-[#f0f9f1] border border-[#bbf7d0] p-6 rounded-sm space-y-3">
          <div className="flex items-center gap-2 text-[#008629]">
            <ShieldCheck className="w-5 h-5 shrink-0" />
            <h4 className="font-bold text-sm uppercase text-[#166534]">
              {lang === 'fr' ? 'Charte Déontologique Universitaire' : 'Institutional Code of Ethics'}
            </h4>
          </div>
          <p className="text-xs text-[#14532d] leading-relaxed">
            {lang === 'fr'
              ? 'Tout cursus diplômant de PLURIPERF intègre un module obligatoire de 30 heures consacré à l’Éthique du Vivant, à la Gouvernance Responsable et à la Responsabilité Sociétale des Organisations (RSO). Les auditeurs signent individuellement la charte déontologique avant la délivrance de leur diplôme.'
              : 'Every degree curriculum includes a mandatory 30-hour module dedicated to Living Ethics, Responsible Governance, and Corporate Social Responsibility. Students formally sign this charter before degree conferral.'}
          </p>
        </section>

        {/* NEXT CHAPTER BUTTON */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => onNavigate('universite_min')}
            className="inphb-btn-primary text-xs flex items-center gap-2"
          >
            <span>{lang === 'fr' ? 'Continuer : Le Modèle MIN (Bio-inspiré)' : 'Next: The NIM Model'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </UniversityLayout>
  );
};
