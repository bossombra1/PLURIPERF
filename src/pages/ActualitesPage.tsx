import React, { useState, useMemo } from 'react';
import { Language, NewsArticle } from '../types';
import { NEWS_DATA } from '../data/universityData';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { BookOpen, ArrowRight } from 'lucide-react';

interface ActualitesPageProps {
  lang: Language;
}

export const ActualitesPage: React.FC<ActualitesPageProps> = ({ lang }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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
    <div className="min-h-[70vh] py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-text-primary">Actualités & Agenda Institutionnel</h1>
          <p className="text-text-muted">Toutes les dépêches de PLURIPERF : Salon International SIEDS, avancées écologiques, nouveaux cursus et accords multilatéraux.</p>
        </div>

        {featuredItem && (
          <div className="p-6 bg-surface border border-border-subtle rounded-[calc(var(--radius)+4px)]">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2 py-1 text-xs font-semibold bg-primary/20 text-primary rounded">SIEDS 2026</span>
              <span className="text-text-muted text-sm">{featuredItem.date}</span>
              <span className="text-text-muted text-sm">·</span>
              <span className="text-text-muted text-sm">{featuredItem.readTime}</span>
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-3">{lang === 'fr' ? featuredItem.titleFr : featuredItem.titleEn}</h2>
            <p className="text-text-secondary mb-4">{lang === 'fr' ? featuredItem.summaryFr : featuredItem.summaryEn}</p>
            <Button variant="outline" onClick={() => navigate(`/actualites/${featuredItem.id}`)}>
              <BookOpen className="h-4 w-4" />
              Lire l'article
            </Button>
          </div>
        )}

        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-sm rounded-[var(--radius)] whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-surface text-text-muted hover:text-text-secondary border border-border-subtle'
              }`}
            >
              {lang === 'fr' ? cat.labelFr : cat.labelEn}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNews.map((article) => (
            <div key={article.id} className="p-5 bg-surface border border-border-subtle rounded-[calc(var(--radius)+4px)] flex flex-col">
              <div className="flex items-center justify-between text-sm text-text-muted mb-3">
                <span className="text-xs uppercase font-semibold text-primary">{article.category}</span>
                <span>{article.date}</span>
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">{lang === 'fr' ? article.titleFr : article.titleEn}</h3>
              <p className="text-text-secondary text-sm flex-1">{lang === 'fr' ? article.summaryFr : article.summaryEn}</p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border-subtle">
                <span className="text-sm text-text-muted">{article.readTime}</span>
                <button
                  type="button"
                  onClick={() => navigate(`/actualites/${article.id}`)}
                  className="text-primary hover:text-primary-hover text-sm font-semibold flex items-center gap-1"
                >
                  Lire
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
