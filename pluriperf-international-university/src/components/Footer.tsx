import React from 'react';
import { PageId, Language } from '../types';
import { getT } from '../data/translations';
import { Logo } from './Logo';
import {
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  GraduationCap,
  Calendar,
  BookOpen,
  ChevronRight,
  Facebook,
  Linkedin,
  Youtube,
  Twitter,
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

  const go = (p: PageId) => {
    if (onNavigate) {
      onNavigate(p);
    } else if (setCurrentPage) {
      setCurrentPage(p);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2b2b2b] text-[#999999] text-sm mt-auto border-t-4 border-[#008629]">
      {/* Top Institutional CTA Bar */}
      <div className="bg-[#1f1f1f] border-b border-[#383838]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h4 className="text-white text-base font-bold">
              {lang === 'fr'
                ? 'Prêt à rejoindre la 1ère université de management durable ?'
                : 'Ready to join the premier sustainable management university?'}
            </h4>
            <p className="text-xs text-[#aaaaaa] mt-1">
              {lang === 'fr'
                ? 'Les candidatures pour la prochaine session académique sont ouvertes.'
                : 'Applications for the upcoming academic intake are now open.'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenApply}
              className="inphb-btn-primary text-xs"
            >
              <GraduationCap className="w-4 h-4" />
              <span>{lang === 'fr' ? 'Déposer ma candidature' : 'Apply for Admission'}</span>
            </button>
            {onOpenAppointment && (
              <button
                onClick={onOpenAppointment}
                className="inphb-btn-secondary text-xs"
              >
                <Calendar className="w-4 h-4" />
                <span>{lang === 'fr' ? 'Entretien d’orientation' : 'Book an Interview'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: About PLURIPERF & Official Crest */}
          <div>
            <Logo variant="full-horizontal" theme="dark" size="md" />
            <p className="mt-4 text-xs leading-relaxed text-[#aaaaaa]">
              {lang === 'fr'
                ? 'PLURIPERF International University est la première institution universitaire d’excellence dédiée au Management Durable, à l’Écologie Responsable et au Leadership Régénératif.'
                : 'PLURIPERF International University is the pioneer academic institution dedicated to Regenerative Leadership, Sustainable Management, and Applied Ecology.'}
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded bg-[#383838] flex items-center justify-center text-white hover:bg-[#008629] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded bg-[#383838] flex items-center justify-center text-white hover:bg-[#008629] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded bg-[#383838] flex items-center justify-center text-white hover:bg-[#008629] transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="w-8 h-8 rounded bg-[#383838] flex items-center justify-center text-white hover:bg-[#008629] transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: L'Université & Gouvernance */}
          <div>
            <h3 className="text-white font-bold text-base uppercase tracking-wider relative pb-3 mb-4 before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-10 before:h-[2px] before:bg-[#008629]">
              {lang === 'fr' ? "L'Université" : 'The University'}
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => go('universite')}
                  className="hover:text-[#5aaf4b] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#008629]" />
                  <span>{lang === 'fr' ? 'À propos de PLURIPERF' : 'About PLURIPERF'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => go('facultes')}
                  className="hover:text-[#5aaf4b] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#008629]" />
                  <span>{lang === 'fr' ? 'Nos 9 Facultés spécialisées' : 'Our 9 Faculties'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => go('recherches')}
                  className="hover:text-[#5aaf4b] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#008629]" />
                  <span>{lang === 'fr' ? 'MIN Research Institute' : 'MIN Research Institute'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => go('cabinet')}
                  className="hover:text-[#5aaf4b] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#008629]" />
                  <span>{lang === 'fr' ? 'Cabinet de Conseil ESG & Entreprises' : 'ESG Advisory'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => go('mere_nature')}
                  className="hover:text-[#5aaf4b] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#008629]" />
                  <span>{lang === 'fr' ? 'Alliance Mère Nature' : 'Mother Nature Alliance'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => go('actualites')}
                  className="hover:text-[#5aaf4b] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#008629]" />
                  <span>{lang === 'fr' ? 'Actualités & Conférences' : 'News & Conferences'}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Formations & Espaces Numériques */}
          <div>
            <h3 className="text-white font-bold text-base uppercase tracking-wider relative pb-3 mb-4 before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-10 before:h-[2px] before:bg-[#008629]">
              {lang === 'fr' ? 'Formations & Campus' : 'Academics & Campus'}
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => go('formations')}
                  className="hover:text-[#5aaf4b] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#008629]" />
                  <span>{lang === 'fr' ? 'Offre de Formation complète' : 'All Academic Programs'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => go('admissions')}
                  className="hover:text-[#5aaf4b] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#008629]" />
                  <span>{lang === 'fr' ? 'Conditions d’Admission & Bourses' : 'Admissions & Scholarships'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => go('campus_virtuel')}
                  className="hover:text-[#5aaf4b] transition-colors flex items-center gap-1.5 font-medium text-white"
                >
                  <ChevronRight className="w-3 h-3 text-[#008629]" />
                  <span>{lang === 'fr' ? 'Campus Virtuel (E-Learning)' : 'Virtual Campus (LMS)'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => go('bibliotheque')}
                  className="hover:text-[#5aaf4b] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#008629]" />
                  <span>{lang === 'fr' ? 'Bibliothèque & Ressources Scientifiques' : 'Library & Publications'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => go('carrieres')}
                  className="hover:text-[#5aaf4b] transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[#008629]" />
                  <span>{lang === 'fr' ? 'Insertion & Carrières' : 'Careers & Placement'}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contacts Officiels & Campus */}
          <div>
            <h3 className="text-white font-bold text-base uppercase tracking-wider relative pb-3 mb-4 before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-10 before:h-[2px] before:bg-[#008629]">
              {lang === 'fr' ? 'Coordonnées Officielles' : 'Official Contacts'}
            </h3>
            <div className="space-y-3 text-xs text-[#aaaaaa]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#008629] shrink-0 mt-0.5" />
                <div>
                  <b className="text-white block">{lang === 'fr' ? 'Siège Académique :' : 'Headquarters:'}</b>
                  <span>Abidjan Cocody, Côte d’Ivoire</span>
                  <span className="block text-[11px] text-[#888888]">Campus annexes : Yamoussoukro • Paris • Genève</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#008629] shrink-0" />
                <span>+225 27 22 59 88 00 / 05 01 80 00 19</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#008629] shrink-0" />
                <a href="mailto:admissions@pluriperf.com" className="hover:text-[#5aaf4b] transition-colors">
                  admissions@pluriperf.com
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => go('contacts')}
                  className="inline-flex items-center gap-1 text-[#5aaf4b] hover:text-white font-semibold text-xs"
                >
                  <span>{lang === 'fr' ? 'Formulaire de contact & Plan' : 'Contact Form & Map'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Footer / Copyright */}
      <div className="bg-[#222222] border-t border-[#333333] text-xs text-[#777777] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} PLURIPERF International University. {lang === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <button onClick={() => go('universite')} className="hover:text-white">
              {lang === 'fr' ? 'Mentions Légales' : 'Legal Notices'}
            </button>
            <span>•</span>
            <button onClick={() => go('contacts')} className="hover:text-white">
              {lang === 'fr' ? 'Politique de Confidentialité' : 'Privacy Policy'}
            </button>
            <span>•</span>
            <span className="text-[#008629] font-medium">ECTS & Qualité Universitaire</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
