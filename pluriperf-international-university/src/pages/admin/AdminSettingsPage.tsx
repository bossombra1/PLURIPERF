import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../../components/Logo';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { api, ApiError } from '../../api/client';
import { Loader2, ArrowLeft, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminSettingsPage: React.FC<{ lang?: 'fr' | 'en' }> = ({ lang = 'fr' }) => {
  const { user } = useAuth();
  const [stats, setStats] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || !['admin', 'super_admin'].includes(user.role)) return;
    (async () => {
      try {
        const data = await api.get<Record<string, number>>('/admin/stats');
        setStats(data);
      } catch (e) {
        setError(e instanceof ApiError ? e.message : 'Erreur de chargement');
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  if (!user || !['admin', 'super_admin'].includes(user.role)) {
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
            <h1 className="text-3xl font-bold text-text-primary">Paramètres & Statistiques</h1>
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
        ) : stats ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(stats).map(([key, value]) => (
              <div key={key} className="p-5 bg-surface border border-border-subtle rounded-[calc(var(--radius)+4px)]">
                <div className="text-3xl font-bold text-text-primary">{value}</div>
                <div className="text-sm text-text-muted mt-1">{key}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 bg-surface border border-border-subtle rounded-[calc(var(--radius)+4px)] text-center">
            <Settings className="h-12 w-12 text-text-muted mx-auto mb-4" />
            <p className="text-text-muted">Aucune statistique disponible.</p>
          </div>
        )}
      </div>
    </div>
  );
};
