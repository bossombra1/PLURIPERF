import React from 'react';
import { Language, PageId } from '../../types';
import { UNIVERSITY_SECTIONS } from '../../data/universityData';
import { UNIVERSITY_ASSETS } from '../../assets/images';
import { UniversityLayout } from '../../components/UniversityLayout';
import {
  Leaf,
  Layers,
  Recycle,
  Network,
  Activity,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  TreeDeciduous,
} from 'lucide-react';

interface UniversityPageProps {
  lang: Language;
  onNavigate: (page: PageId, sectionId?: string) => void;
  onOpenApply: () => void;
  onOpenAppointment?: () => void;
  onOpenWhatsApp?: () => void;
}

export const UniversityMinPage: React.FC<UniversityPageProps> = ({
  lang,
  onNavigate,
  onOpenApply,
  onOpenAppointment,
  onOpenWhatsApp,
}) => {
  const content = UNIVERSITY_SECTIONS[lang].min;

  return (
    <UniversityLayout
      activePageId="universite_min"
      pageTitleFr="Le Modèle MIN (Inspiré de la Nature)"
      pageTitleEn="The NIM Model (Nature-Inspired Management)"
      pageSubtitleFr="L'innovation pédagogique et scientifique signature de PLURIPERF International University."
      pageSubtitleEn="The signature pedagogical and managerial innovation of PLURIPERF International University."
      chapterBadgeFr="Chapitre 04 · Innovation Signature"
      chapterBadgeEn="Chapter 04 · Signature Pedagogy"
      lang={lang}
      onNavigate={onNavigate}
      onOpenApply={onOpenApply}
      onOpenAppointment={onOpenAppointment}
      onOpenWhatsApp={onOpenWhatsApp}
    >
      <div className="space-y-8">
        {/* HERO CONCEPT CARD */}
        <section className="bg-white border border-[#eaeaea] p-6 sm:p-8 rounded-sm shadow-sm space-y-6">
          <div className="border-b border-[#eaeaea] pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#008629] block mb-1">
              {lang === 'fr' ? 'Biomimétisme Managérial & Écologie Appliquée' : 'Organizational Biomimicry'}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">
              {lang === 'fr'
                ? "3,8 milliards d'années de R&D naturelle au service des organisations"
                : '3.8 billion years of nature’s R&D applied to organizations'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-4 text-sm leading-relaxed text-[#444444]">
              <p className="font-semibold text-base text-[#111827]">
                {content.content}
              </p>
              <p>
                {lang === 'fr'
                  ? "Dans la nature, la notion de déchet n'existe pas : chaque rejet d'un organisme constitue le nutriment d'un autre. Les écosystèmes forestiers prospèrent sans épuisement grâce à l'énergie solaire, la symbiose mycorhizienne et l'optimisation modulaire des ressources."
                  : "In nature, the concept of waste does not exist: the output of one organism feeds another. Forest ecosystems thrive without resource exhaustion via solar energy capture, mycorrhizal mutualism, and modular resource optimization."}
              </p>
              <p>
                {lang === 'fr'
                  ? "Le modèle MIN enseigne aux cadres et dirigeants comment appliquer ces lois universelles à la stratégie d'entreprise, à la logistique circulaire, à la gouvernance agile et aux relations humaines dans l'organisation."
                  : "The NIM framework equips executives and managers with practical methodologies to apply these universal laws to corporate strategy, circular logistics, agile governance, and team dynamics."}
              </p>
            </div>

            <div className="md:col-span-5">
              <div className="border border-[#eaeaea] overflow-hidden rounded-sm shadow-sm">
                <img
                  src={UNIVERSITY_ASSETS.natureForest}
                  alt="Écosystème forestier biomimétique"
                  className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="p-3 bg-[#f8fafc] border-t border-[#eaeaea] text-[11px] text-[#666666] flex items-center justify-between">
                  <span className="font-semibold text-[#111827]">Living Lab Agroécologique</span>
                  <span className="text-[#008629]">Forêt Pilote MIN</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 CORE PILLARS OF MIN */}
        <section className="bg-white border border-[#eaeaea] p-6 sm:p-8 rounded-sm shadow-sm space-y-6">
          <div className="border-b border-[#eaeaea] pb-3">
            <h3 className="text-lg font-bold text-[#111827]">
              {lang === 'fr' ? 'Les 3 Piliers Opérationnels du Modèle MIN' : 'The 3 Operational Pillars of NIM'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Pillar 1 */}
            <div className="p-5 border border-[#eaf5ec] bg-[#f8fafc] rounded-sm space-y-3">
              <div className="w-10 h-10 rounded bg-[#eaf5ec] flex items-center justify-center text-[#008629]">
                <Recycle className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-[#111827]">
                {lang === 'fr' ? '1. Circularité Intégrale (Zéro Déchet)' : '1. Full Circularity (Zero Waste)'}
              </h4>
              <p className="text-xs text-[#555555] leading-relaxed">
                {lang === 'fr'
                  ? 'Élimination des flux linéaires extractifs. Reconfiguration des chaînes de valeur en boucles fermées où toute matière et énergie résiduelles sont revalorisées.'
                  : 'Eliminating linear extractive flows. Converting supply chains into closed loops where residual energy and materials are perpetually reintegrated.'}
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-5 border border-[#eaf5ec] bg-[#f8fafc] rounded-sm space-y-3">
              <div className="w-10 h-10 rounded bg-[#eaf5ec] flex items-center justify-center text-[#008629]">
                <Network className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-[#111827]">
                {lang === 'fr' ? '2. Symbiose & Coopération Systémique' : '2. Symbiosis & Systemic Mutualism'}
              </h4>
              <p className="text-xs text-[#555555] leading-relaxed">
                {lang === 'fr'
                  ? 'Remplacement de la compétition destructrice par l’intelligence collective, l’interdépendance positive et les alliances territoriales inspirées des mycorhizes.'
                  : 'Replacing predatory rivalry with shared intelligence, modular resilience, and mutualistic value co-creation modeled after mycorrhizal networks.'}
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-5 border border-[#eaf5ec] bg-[#f8fafc] rounded-sm space-y-3">
              <div className="w-10 h-10 rounded bg-[#eaf5ec] flex items-center justify-center text-[#008629]">
                <Activity className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-[#111827]">
                {lang === 'fr' ? '3. Comptabilité Triple Capital CARE' : '3. Triple-Capital CARE Accounting'}
              </h4>
              <p className="text-xs text-[#555555] leading-relaxed">
                {lang === 'fr'
                  ? 'Intégration du capital naturel et du capital humain au bilan comptable au même titre que le capital financier, avec obligation de maintien des actifs vivants.'
                  : 'Embedding natural and human capital into the corporate balance sheet alongside financial capital, with strict ecological maintenance obligations.'}
              </p>
            </div>
          </div>
        </section>

        {/* COMPARATIVE MATRIX: CONVENTIONAL VS MIN */}
        <section className="bg-white border border-[#eaeaea] p-6 sm:p-8 rounded-sm shadow-sm space-y-4">
          <div className="border-b border-[#eaeaea] pb-3">
            <h3 className="text-lg font-bold text-[#111827]">
              {lang === 'fr' ? 'Matrice Comparative : Management Conventionnel vs Modèle MIN' : 'Comparative Matrix: Conventional vs NIM'}
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-[#f8fafc] text-[#111827] border-b border-[#eaeaea]">
                  <th className="py-3 px-4 font-bold uppercase tracking-wider">{lang === 'fr' ? 'Critère' : 'Dimension'}</th>
                  <th className="py-3 px-4 font-bold uppercase tracking-wider text-red-600">{lang === 'fr' ? 'Management Conventionnel' : 'Conventional Management'}</th>
                  <th className="py-3 px-4 font-bold uppercase tracking-wider text-[#008629]">{lang === 'fr' ? 'Modèle MIN (PLURIPERF)' : 'NIM Model (PLURIPERF)'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eaeaea] text-[#444444]">
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#111827]">{lang === 'fr' ? 'Rapport à la nature' : 'Nature relationship'}</td>
                  <td className="py-3 px-4 flex items-center gap-1.5 text-red-700">
                    <XCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{lang === 'fr' ? 'Extractif (matière première & décharge)' : 'Extractive (raw material & waste sink)'}</span>
                  </td>
                  <td className="py-3 px-4 text-[#008629] font-medium">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{lang === 'fr' ? 'Symbiotique & Régénératif (modèle & matrice)' : 'Symbiotic & Regenerative (mentor & matrix)'}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#111827]">{lang === 'fr' ? 'Flux de matières' : 'Material flows'}</td>
                  <td className="py-3 px-4 flex items-center gap-1.5 text-red-700">
                    <XCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{lang === 'fr' ? 'Linéaire (Extraire - Fabriquer - Jeter)' : 'Linear (Take - Make - Waste)'}</span>
                  </td>
                  <td className="py-3 px-4 text-[#008629] font-medium">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{lang === 'fr' ? 'Circulaire fermé (Zéro déchet systématique)' : 'Closed circular loop (Systemic zero waste)'}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#111827]">{lang === 'fr' ? 'Mesure du succès' : 'Success metric'}</td>
                  <td className="py-3 px-4 flex items-center gap-1.5 text-red-700">
                    <XCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{lang === 'fr' ? 'Profit monétaire pur à court terme' : 'Short-term financial margin alone'}</span>
                  </td>
                  <td className="py-3 px-4 text-[#008629] font-medium">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{lang === 'fr' ? 'Triple performance : Écologie, Social, Finance' : 'Triple-capital prosperity (Ecology, Social, Finance)'}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#111827]">{lang === 'fr' ? 'Structure organisationnelle' : 'Org structure'}</td>
                  <td className="py-3 px-4 flex items-center gap-1.5 text-red-700">
                    <XCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{lang === 'fr' ? 'Pyramidale, siloée, rigide' : 'Hierarchical, siloed, rigid'}</span>
                  </td>
                  <td className="py-3 px-4 text-[#008629] font-medium">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{lang === 'fr' ? 'Modulaire, décentralisée, résiliente' : 'Modular, decentralized, self-healing'}</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* NEXT CHAPTER BUTTON */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => onNavigate('universite_histoire')}
            className="inphb-btn-primary text-xs flex items-center gap-2"
          >
            <span>{lang === 'fr' ? 'Continuer : Histoire & Jalons Clés' : 'Next: History & Milestones'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </UniversityLayout>
  );
};
