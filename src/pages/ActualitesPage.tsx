import React, { useState, useMemo } from 'react';
import { Language, NewsArticle } from '../types';
import { NEWS_DATA } from '../data/universityData';
import {
  Calendar,
  Sparkles,
  ArrowRight,
  Globe2,
  BookOpen,
  Users2,
  Flame,
  Award,
  Filter,
} from 'lucide-react';

interface ActualitesPageProps {
  lang: Language;
}

export const ActualitesPage: React.FC<ActualitesPageProps> = ({ lang }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);

  const categories = [
    { id: 'all', labelFr: 'Toutes les actualités', labelEn: 'All News' },
    { id: 'sieds', labelFr: 'SIEDS (Salon International)', labelEn: 'SIEDS (Intl Expo)' },
    { id: 'ecologie', labelFr: 'Actualités du monde écologique', labelEn: 'Ecological World News' },
    { id: 'developpement_durable', labelFr: 'Développement durable', labelEn: 'Sustainable Development' },
    { id: 'recherche', labelFr: 'Recherches & Brevets', labelEn: 'Research & Patents' },
    { id: 'conference', labelFr: 'Conférences', labelEn: 'Conferences' },
    { id: 'cours', labelFr: 'Nouveaux cours', labelEn: 'New Courses' },
    { id: 'partenariat', labelFr: 'Partenariats', labelEn: 'Partnerships' },
    { id: 'evenement', labelFr: 'Événements', labelEn: 'Events' },
  ];

  const filteredNews = useMemo(() => {
    if (selectedCategory === 'all') return NEWS_DATA;
    return NEWS_DATA.filter((n) => n.category === selectedCategory);
  }, [selectedCategory]);

  const featuredItem = NEWS_DATA.find((n) => n.featured) || NEWS_DATA[0];

  return (
    <div className="space-y-12 pb-16">
      {/* Header from Slide 15 & 16 */}
      <section className="border-b border-slate-200 pb-8 pt-4">
        <div className="max-w-3xl space-y-3">
          <div className="text-xs uppercase tracking-widest font-semibold text-amber-600">
            {lang === 'fr' ? 'Agenda & Vie Universitaire' : 'Campus Life & Global Agenda'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-slate-900 font-bold">
            {lang === 'fr' ? 'Actualités & Agenda Institutionnel' : 'News & Institutional Events'}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {lang === 'fr'
              ? 'Toutes les dépêches de PLURIPERF : Salon International SIEDS, avancées écologiques, nouveaux cursus et accords multilatéraux.'
              : 'Official bulletins and calendar: SIEDS International Expo, ecological breakthroughs, new course launches, and global alliances.'}
          </p>
        </div>
      </section>

      {/* Featured Lead Story (SIEDS Salon international - Slide 15) */}
      <div className="bg-slate-950 text-white rounded-2xl p-6 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded border border-amber-800">
              SIEDS 2026
            </span>
            <span className="text-xs text-slate-400">{featuredItem.date}</span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-400">{featuredItem.readTime}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white leading-tight">
            {lang === 'fr' ? featuredItem.titleFr : featuredItem.titleEn}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {lang === 'fr' ? featuredItem.summaryFr : featuredItem.summaryEn}
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setActiveArticle(featuredItem)}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow transition-colors"
            >
              <span>{lang === 'fr' ? 'Lire le communiqué officiel' : 'Read official release'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Categories Toolbar conforming to Slide 15 & 16 */}
      <div className="space-y-4">
        <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-100 rounded-xl text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-white text-slate-900 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'fr' ? cat.labelFr : cat.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNews.map((article) => (
          <div
            key={article.id}
            className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold uppercase tracking-wider text-amber-600">
                  {article.category.toUpperCase()}
                </span>
                <span className="font-mono">{article.date}</span>
              </div>

              <h3 className="text-lg font-serif font-bold text-slate-900 leading-snug">
                {lang === 'fr' ? article.titleFr : article.titleEn}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'fr' ? article.summaryFr : article.summaryEn}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">{article.readTime}</span>
              <button
                type="button"
                onClick={() => setActiveArticle(article)}
                className="font-semibold text-slate-900 hover:text-amber-600 flex items-center gap-1 transition-colors"
              >
                <span>{lang === 'fr' ? 'Lire l’article' : 'Read full story'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[85vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setActiveArticle(null)}
              className="absolute right-5 top-5 p-1 text-slate-400 hover:text-slate-700"
            >
              ✕
            </button>

            <div className="border-b border-slate-100 pb-4 mb-4">
              <span className="text-xs uppercase font-semibold text-amber-600">
                {activeArticle.category.toUpperCase()} · {activeArticle.date}
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-1">
                {lang === 'fr' ? activeArticle.titleFr : activeArticle.titleEn}
              </h2>
            </div>

            <div className="py-2 space-y-4 text-sm text-slate-700 leading-relaxed">
              <p className="font-medium text-slate-900">
                {lang === 'fr' ? activeArticle.summaryFr : activeArticle.summaryEn}
              </p>
              <p>
                {lang === 'fr' ? activeArticle.contentFr : activeArticle.contentEn}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold"
              >
                {lang === 'fr' ? 'Fermer' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
