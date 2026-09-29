import React from 'react';
import { Language, PageId } from '../types';
import { Compass } from 'lucide-react';

interface NotFoundPageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ lang, onNavigate }) => (
  <div className="py-24 text-center space-y-6">
    <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
      <Compass className="w-8 h-8" />
    </div>
    <h1 className="text-6xl font-serif font-bold text-slate-900">404</h1>
    <p className="text-slate-600 max-w-md mx-auto text-sm">
      {lang === 'fr'
        ? 'La page que vous recherchez n’existe pas ou a été déplacée.'
        : 'The page you are looking for does not exist or has been moved.'}
    </p>
    <button
      type="button"
      onClick={() => onNavigate('accueil')}
      className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-lg shadow transition-colors"
    >
      {lang === 'fr' ? 'Retour à l’accueil' : 'Back to homepage'}
    </button>
  </div>
);