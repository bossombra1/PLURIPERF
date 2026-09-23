import React from 'react';
import { Language, PageId } from '../types';
import { CABINET_SERVICES } from '../data/universityData';
import {
  Compass,
  Activity,
  FileCheck,
  RefreshCw,
  Award,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
} from 'lucide-react';

interface CabinetPageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  onOpenConsulting: () => void;
}

export const CabinetPage: React.FC<CabinetPageProps> = ({
  lang,
  onNavigate,
  onOpenConsulting,
}) => {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Compass,
    Activity,
    FileCheck,
    RefreshCw,
    Award,
    GraduationCap,
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Header from Slide 12 */}
      <section className="border-b border-slate-200 pb-8 pt-4">
        <div className="max-w-3xl space-y-3">
          <div className="text-xs uppercase tracking-widest font-semibold text-amber-600">
            {lang === 'fr'
              ? 'Pôle Consulting & Audits d’Entreprise'
              : 'Corporate Advisory & ESG Audits'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-slate-900 font-bold leading-tight">
            {lang === 'fr'
              ? 'EXPERTISE ENVIRONNEMENTALE - ÉTUDES - AUDIT - FORMATION'
              : 'ENVIRONMENTAL EXPERTISE - ASSESSMENTS - AUDIT - TRAINING'}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {lang === 'fr'
              ? 'Le Cabinet d’Expertise de PLURIPERF mobilise nos chercheurs et consultants seniors pour accompagner les multinationales, gouvernements et PME dans leur décarbonation et conformité réglementaire.'
              : 'PLURIPERF Advisory Unit deploys senior research fellows and industry auditors to support global corporations, regional authorities, and SMEs in deep decarbonization and regulatory compliance.'}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onOpenConsulting}
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs sm:text-sm rounded-xl shadow transition-colors"
            >
              {lang === 'fr' ? 'Demander un audit ou devis' : 'Request Audit or Quote'}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contacts')}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm rounded-xl transition-colors"
            >
              {lang === 'fr' ? 'Contacter le secrétariat' : 'Contact Advisory Desk'}
            </button>
          </div>
        </div>
      </section>

      {/* Services Grid matching all bullet points from Slide 12 */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-xl font-serif font-bold text-slate-900">
            {lang === 'fr' ? 'Nos Domaines d’Intervention' : 'Our Service Spectrum'}
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            {lang === 'fr' ? 'Interventions Mondiales' : 'Global Engagements'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CABINET_SERVICES.map((srv) => {
            const Icon = iconMap[srv.iconName] || FileCheck;
            return (
              <div
                key={srv.id}
                className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-semibold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {lang === 'fr' ? srv.titleFr : srv.titleEn}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lang === 'fr' ? srv.descFr : srv.descEn}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={onOpenConsulting}
                    className="text-xs font-semibold text-slate-800 group-hover:text-amber-600 flex items-center gap-1 transition-colors"
                  >
                    <span>{lang === 'fr' ? 'Solliciter cette expertise' : 'Engage this service'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Methodology & Quality Assurance */}
      <section className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 space-y-6">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            {lang === 'fr' ? 'Garantie d’Excellence' : 'Quality Assurance'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            {lang === 'fr'
              ? 'Méthodologies Certifiées & Adossées à la Recherche'
              : 'Research-Backed Certified Auditing'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {lang === 'fr'
              ? 'Toutes nos missions d’audit et d’évaluation d’impact environnemental sont conduites sous la supervision de directeurs de recherche affiliés au MIN Research Institute, garantissant une indépendance absolue et une conformité rigoureuse aux standards internationaux (ISO 14001, CSRD, GHG Protocol).'
              : 'All auditing and environmental assessments are performed under scientific supervision of MIN Research Institute senior fellows, ensuring peerless credibility and full CSRD / ISO compliance.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
            <div className="text-xs">
              <span className="font-semibold block text-white">Conformité CSRD & ESRS</span>
              <span className="text-slate-400">Double matérialité certifiée</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-amber-400 shrink-0" />
            <div className="text-xs">
              <span className="font-semibold block text-white">Auditeurs Agréés ISO</span>
              <span className="text-slate-400">14001, 26000, 50001</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Building2 className="w-6 h-6 text-sky-400 shrink-0" />
            <div className="text-xs">
              <span className="font-semibold block text-white">+180 Missions Réalisées</span>
              <span className="text-slate-400">Europe, Afrique, Amériques</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
