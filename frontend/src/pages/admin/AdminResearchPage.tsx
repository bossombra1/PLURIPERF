import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../../components/Logo';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { api, ApiError } from '../../api/client';
import { Loader2, ArrowLeft, FlaskConical } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ResearchRow {
  id: number;
  title_fr: string;
  title_en: string;
  center_fr: string;
  lead_researcher: string;
  status: string;
  year: number;
}

export const AdminResearchPage: React.FC<{ lang?: 'fr' | 'en' }> = ({ lang = 'fr' }) => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<ResearchRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || !['admin', 'super_admin', 'editor'].includes(user.role)) return;
    (async () => {
      try {
        const data = await api.get<ResearchRow[]>('/research');
        setProjects(data);
      } catch (e) {
        setError(e instanceof ApiError ? e.message : 'Erreur de chargement');
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  if (!user || !['admin', 'super_admin', 'editor'].includes(user.role)) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>Accès réservé aux administrateurs.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Link to="/admin" className="text-sm text-primary hover:text-primary-hover flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Retour à l'administration
            </Link>
            <h1 className="text-3xl font-bold text-text-primary">Recherches & Projets</h1>
          </div>
          <Logo variant="emblem-only" size="sm" />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : projects.length === 0 ? (
          <div className="p-8 bg-surface border border-border-subtle rounded-[calc(var(--radius)+4px)] text-center">
            <FlaskConical className="h-12 w-12 text-text-muted mx-auto mb-4" />
            <p className="text-text-muted">Aucun projet.</p>
          </div>
        ) : (
          <div className="bg-surface border border-border-subtle rounded-[calc(var(--radius)+4px)] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="px-4 py-3 text-left font-semibold text-text-muted">Titre (FR)</th>
                  <th className="px-4 py-3 text-left font-semibold text-text-muted">Centre</th>
                  <th className="px-4 py-3 text-left font-semibold text-text-muted">Statut</th>
                  <th className="px-4 py-3 text-left font-semibold text-text-muted">Année</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.id} className="border-b border-border-subtle">
                    <td className="px-4 py-3 text-text-primary">{p.title_fr}</td>
                    <td className="px-4 py-3 text-text-secondary">{p.center_fr}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded ${p.status === 'Publié' ? 'bg-success/20 text-success' : p.status === 'Breveté' ? 'bg-info/20 text-info' : 'bg-warning/20 text-warning'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-text-secondary">{p.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
