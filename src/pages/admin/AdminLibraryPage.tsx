import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../../components/Logo';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { api, ApiError } from '../../api/client';
import { Loader2, ArrowLeft, Library } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LibraryRow {
  id: number;
  type: string;
  title_fr: string;
  title_en: string;
  author: string;
  year: number;
}

export const AdminLibraryPage: React.FC<{ lang?: 'fr' | 'en' }> = ({ lang = 'fr' }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<LibraryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || !['admin', 'super_admin', 'editor'].includes(user.role)) return;
    (async () => {
      try {
        const data = await api.get<LibraryRow[]>('/library');
        setItems(data);
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
            <h1 className="text-3xl font-bold text-text-primary">Bibliothèque</h1>
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
        ) : items.length === 0 ? (
          <div className="p-8 bg-surface border border-border-subtle rounded-[calc(var(--radius)+4px)] text-center">
            <Library className="h-12 w-12 text-text-muted mx-auto mb-4" />
            <p className="text-text-muted">Aucun document.</p>
          </div>
        ) : (
          <div className="bg-surface border border-border-subtle rounded-[calc(var(--radius)+4px)] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="px-4 py-3 text-left font-semibold text-text-muted">Type</th>
                  <th className="px-4 py-3 text-left font-semibold text-text-muted">Titre (FR)</th>
                  <th className="px-4 py-3 text-left font-semibold text-text-muted">Auteur</th>
                  <th className="px-4 py-3 text-left font-semibold text-text-muted">Année</th>
                </tr>
              </thead>
              <tbody>
                {items.map((i) => (
                  <tr key={i.id} className="border-b border-border-subtle">
                    <td className="px-4 py-3 text-text-muted">{i.type}</td>
                    <td className="px-4 py-3 text-text-primary">{i.title_fr}</td>
                    <td className="px-4 py-3 text-text-secondary">{i.author}</td>
                    <td className="px-4 py-3 text-text-secondary">{i.year}</td>
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
