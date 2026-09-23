import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../../components/Logo';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { api, ApiError } from '../../api/client';
import { Loader2, ArrowLeft, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ApplicationRow {
  id: number;
  reference: string;
  program: string;
  full_name: string;
  email: string;
  status: string;
  created_at: string;
}

export const AdminApplicationsPage: React.FC<{ lang?: 'fr' | 'en' }> = ({ lang = 'fr' }) => {
  const { user } = useAuth();
  const [apps, setApps] = useState<ApplicationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || !['admin', 'super_admin'].includes(user.role)) return;
    (async () => {
      try {
        const data = await api.get<ApplicationRow[]>('/admin/applications');
        setApps(data);
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

  const updateStatus = async (id: number, status: string) => {
    try {
      await api.patch(`/admin/applications/${id}/status`, { status });
      setApps((rows) => rows.map((r) => (r.id === id ? { ...r, status } : r)));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Erreur de mise à jour');
    }
  };

  return (
    <div className="min-h-[70vh] py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Link to="/admin" className="text-sm text-primary hover:text-primary-hover flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Retour à l'administration
            </Link>
            <h1 className="text-3xl font-bold text-text-primary">Candidatures</h1>
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
        ) : apps.length === 0 ? (
          <div className="p-8 bg-surface border border-border-subtle rounded-[calc(var(--radius)+4px)] text-center">
            <FileText className="h-12 w-12 text-text-muted mx-auto mb-4" />
            <p className="text-text-muted">Aucune candidature pour le moment.</p>
          </div>
        ) : (
          <div className="bg-surface border border-border-subtle rounded-[calc(var(--radius)+4px)] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="px-4 py-3 text-left font-semibold text-text-muted">Référence</th>
                  <th className="px-4 py-3 text-left font-semibold text-text-muted">Candidat</th>
                  <th className="px-4 py-3 text-left font-semibold text-text-muted">Programme</th>
                  <th className="px-4 py-3 text-left font-semibold text-text-muted">Statut</th>
                </tr>
              </thead>
              <tbody>
                {apps.map((a) => (
                  <tr key={a.id} className="border-b border-border-subtle">
                    <td className="px-4 py-3 text-text-primary font-mono">{a.reference}</td>
                    <td className="px-4 py-3 text-text-secondary">
                      {a.full_name}
                      <span className="block text-text-muted text-xs">{a.email}</span>
                    </td>
                    <td className="px-4 py-3 text-text-secondary">{a.program}</td>
                    <td className="px-4 py-3">
                      <select
                        value={a.status}
                        onChange={(e) => updateStatus(a.id, e.target.value)}
                        className="bg-surface-muted border border-border-ui rounded px-2 py-1 text-text-primary"
                      >
                        <option value="submitted">Soumis</option>
                        <option value="under_review">En examen</option>
                        <option value="accepted">Accepté</option>
                        <option value="rejected">Rejeté</option>
                        <option value="waitlisted">Liste d'attente</option>
                      </select>
                    </td>
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
