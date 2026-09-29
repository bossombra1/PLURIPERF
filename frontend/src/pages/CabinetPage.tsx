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
  Calendar,
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
            <span className="text-[#898888]">{lang === 'fr' ? 'Expertise' : 'Advisory'}</span>
            <span>/</span>
            <span className="text-[#008629] font-medium">
              {lang === 'fr' ? 'Cabinet de Conseil ESG & Entreprises' : 'Corporate Advisory Unit'}
            </span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111827] tracking-tight inphb-heading-accent">
                {lang === 'fr'
                  ? 'Cabinet Conseil ESG, Études & Audits'
                  : 'Corporate Advisory, ESG Audits & Training'}
              </h1>
              <p className="text-sm sm:text-base text-[#666666] max-w-2xl pt-2">
                {lang === 'fr'
                  ? 'Le Cabinet d’Expertise de PLURIPERF mobilise chercheurs et experts seniors pour accompagner organisations et gouvernements vers la neutralité carbone et la conformité ESG.'
                  : 'PLURIPERF Advisory Unit deploys senior research fellows to assist corporations and institutions in decarbonization, regulatory compliance, and regenerative leadership.'}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={onOpenConsulting}
                className="inphb-btn-primary"
              >
                <Compass className="w-4 h-4" />
                <span>{lang === 'fr' ? 'Solliciter une mission' : 'Request Advisory'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CABINET_SERVICES.map((srv) => {
            const Icon = iconMap[srv.iconName] || ShieldCheck;
            return (
              <div
                key={srv.id}
                className="bg-white border border-[#eaeaea] p-6 rounded-sm shadow-sm hover:border-[#008629] transition-all space-y-4 border-t-4 border-t-[#008629]"
              >
                <div className="w-10 h-10 rounded-sm bg-[#f0f9f1] flex items-center justify-center text-[#008629]">
                  <Icon className="w-5 h-5" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[#111827] leading-snug">
                    {lang === 'fr' ? srv.titleFr : srv.titleEn}
                  </h3>
                  <p className="text-xs text-[#666666] leading-relaxed">
                    {lang === 'fr' ? srv.descFr : srv.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Corporate Partnership Banner */}
        <section className="bg-[#008629] text-white p-8 rounded-sm shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {lang === 'fr'
                ? 'Accompagnez la transformation écologique de votre entreprise'
                : 'Accelerate your corporate ecological transition'}
            </h3>
            <p className="text-xs sm:text-sm text-white/85 max-w-xl">
              {lang === 'fr'
                ? 'Bilan carbone certifié, audits d’écologie industrielle, programmes sur-mesure pour comités de direction.'
                : 'Certified carbon audit, industrial ecology assessments, and bespoke executive coaching.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenConsulting}
            className="px-6 py-3 bg-[#f77f00] hover:bg-[#e07200] text-white font-bold text-xs rounded-sm shadow-sm transition-colors shrink-0"
          >
            {lang === 'fr' ? 'Demander un devis institutionnel' : 'Request Corporate Quote'}
          </button>
        </section>

      </div>
    </div>
  );
};
