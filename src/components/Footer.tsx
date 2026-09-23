import React from 'react';
import { PageId, Language } from '../types';
import { getT } from '../data/translations';
import { Logo } from './Logo';
import {
  Globe2,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Award,
  BookOpen,
  ArrowUpRight,
} from 'lucide-react';

interface FooterProps {
  setCurrentPage?: (page: PageId) => void;
  onNavigate?: (page: PageId) => void;
  lang: Language;
  onOpenApply: () => void;
  onOpenSearch?: () => void;
  onOpenAppointment?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setCurrentPage,
  onNavigate,
  lang,
  onOpenApply,
  onOpenSearch,
  onOpenAppointment,
}) => {
  const t = getT(lang);

  const navigateTo = (page: PageId) => {
    if (onNavigate) {
      onNavigate(page);
    } else if (setCurrentPage) {
      setCurrentPage(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Upper institutional seal & commitment bar */}
      <div className="border-b border-slate-900 bg-slate-900/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">
                {lang === 'fr' ? 'Accréditations Internationales' : 'International Accreditations'}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'fr'
                  ? 'Signataire ONU PRME, Alliance Mondiale des Universités Durables, ISO 9001 & ISO 14001'
                  : 'UN PRME Signatory, Global Sustainable Universities Alliance, ISO 9001 & ISO 14001'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">
                {lang === 'fr' ? 'Pionnier Mondial MIN' : 'Global NIM Pioneer'}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'fr'
                  ? 'Chaire d’Excellence en Management Inspiré par la Nature & Living Labs'
                  : 'Chair of Excellence in Nature-Inspired Management & Living Labs'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">
                {lang === 'fr' ? 'Diplômes Reconnus & ECTS' : 'Recognized Degrees & ECTS'}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'fr'
                  ? 'Système européen de crédits transférables (Licence, Master, Doctorat, Certificats)'
                  : 'European Credit Transfer and Accumulation System (Bachelor, Master, PhD, Certificates)'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center">
              <Logo variant="full-horizontal" theme="dark" size="md" />
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {t.footer.aboutText}
            </p>

            <div className="text-xs text-slate-400 space-y-1.5 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{t.footer.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <a href="mailto:admissions@pluriperf.com" className="hover:text-white transition-colors">
                  contact@pluriperf.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Globe2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>www.pluriperf.com</span>
              </div>
            </div>
          </div>

          {/* Col 1: Académique */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
              {lang === 'fr' ? 'Académique' : 'Academic'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('facultes')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {t.nav.facultes}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('formations')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {t.nav.formations}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('admissions')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {t.nav.admissions}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('campus_virtuel')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {t.nav.campusVirtuel}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('bibliotheque')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {t.nav.bibliotheque}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Institution & Impact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
              {lang === 'fr' ? 'Pôles & Recherche' : 'Centres & Research'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('universite')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {t.nav.universite}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('recherches')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {t.nav.recherches}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('cabinet')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {t.nav.cabinet}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('mere_nature')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {t.nav.mereNature}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('actualites')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {t.nav.actualites}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Liens Utiles & Permanent Actions */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
              {lang === 'fr' ? 'Accès Rapides' : 'Quick Actions'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={onOpenApply}
                  className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
                >
                  <span>{t.buttons.apply}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenSearch}
                  className="hover:text-amber-400 transition-colors"
                >
                  {t.buttons.findProgram}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('carrieres')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {t.nav.carrieres}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('contacts')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {t.nav.contacts}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} PLURIPERF International University. {t.footer.legalNotice}
          </p>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>{t.footer.slogan}</span>
            <span>·</span>
            <span>www.pluriperf.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
