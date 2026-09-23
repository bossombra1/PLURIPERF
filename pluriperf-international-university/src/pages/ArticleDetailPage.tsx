import React from 'react';
import { Language } from '../types';
import { NEWS_DATA } from '../data/universityData';
import { useNavigate, useParams } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Calendar, ArrowLeft, BookOpen } from 'lucide-react';

interface ArticleDetailPageProps {
  lang: Language;
  articleId: string;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ lang, articleId }) => {
  const navigate = useNavigate();
  const article = NEWS_DATA.find((a) => a.id === articleId);

  if (!article) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>Article introuvable.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => navigate('/actualites')}
            className="text-sm text-primary hover:text-primary-hover flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux actualités
          </button>
          <div className="flex items-center gap-3 text-sm text-text-muted">
            <span className="text-xs uppercase font-semibold text-primary">{article.category}</span>
            <span>·</span>
            <span>{article.date}</span>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>
          <h1 className="text-3xl font-bold text-text-primary">{lang === 'fr' ? article.titleFr : article.titleEn}</h1>
        </div>

        <div className="p-6 bg-surface border border-border-subtle rounded-[calc(var(--radius)+4px)]">
          <p className="text-text-primary font-medium mb-4">{lang === 'fr' ? article.summaryFr : article.summaryEn}</p>
          <div className="text-text-secondary leading-relaxed">
            <p>{lang === 'fr' ? article.contentFr : article.contentEn}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div />
          <Button variant="outline" onClick={() => navigate('/actualites')}>
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
        </div>
      </div>
    </div>
  );
};
