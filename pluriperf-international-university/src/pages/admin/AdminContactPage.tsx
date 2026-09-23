import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../../components/Logo';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { api, ApiError } from '../../api/client';
import { Loader2, ArrowLeft, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ContactRow {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  handled: number;
  created_at: string;
}

export const AdminContactPage: React.FC<{ lang?: 'fr' | 'en' }> = ({ lang = 'fr' }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ContactRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || !['admin', 'super_admin'].includes(user.role)) return;
    (async () => {
      try {
        const data = await api.get<ContactRow[]>('/admin/contact-messages');
        setMessages(data);
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

  const markHandled = async (id: number) => {
    try {
      await api.patch(`/admin/contact-messages/${id}/handled`);
      setMessages((rows) => rows.map((r) => (r.id === id ? { ...r, handled: 1 } : r)));
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
            <h1 className="text-3xl font-bold text-text-primary">Messages de contact</h1>
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
        ) : messages.length === 0 ? (
          <div className="p-8 bg-surface border border-border-subtle rounded-[calc(var(--radius)+4px)] text-center">
            <Phone className="h-12 w-12 text-text-muted mx-auto mb-4" />
            <p className="text-text-muted">Aucun message.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((m) => (
              <div key={m.id} className="p-5 bg-surface border border-border-subtle rounded-[calc(var(--radius)+4px)]">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-text-primary">{m.subject}</div>
                  <span className={`px-2 py-1 text-xs rounded ${m.handled ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}`}>
                    {m.handled ? 'Traité' : 'Non traité'}
                  </span>
                </div>
                <div className="text-sm text-text-muted mb-2">{m.name} &lt;{m.email}&gt; · {m.created_at}</div>
                <p className="text-text-secondary text-sm">{m.message}</p>
                {!m.handled && (
                  <button
                    type="button"
                    onClick={() => markHandled(m.id)}
                    className="mt-3 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded hover:bg-primary-hover transition-colors"
                  >
                    Marquer comme traité
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
