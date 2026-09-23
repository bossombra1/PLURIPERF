import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { api, ApiError } from '../api/client';
import type { Language, PageId } from '../types';

export const VerifyEmailPage: React.FC<{ lang: Language; onNavigate: (page: PageId) => void }> = ({ lang, onNavigate }) => {
  const [state, setState] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');
    if (!token) {
      setState('error');
      setMessage(lang === 'fr' ? 'Lien de vérification manquant.' : 'Verification link is missing.');
      return;
    }
    api.get<{ verified: boolean; message: string }>(`/auth/verify-email?token=${encodeURIComponent(token)}`)
      .then((res) => { setState('success'); setMessage(res.message); })
      .catch((error) => {
        setState('error');
        setMessage(error instanceof ApiError ? error.message : (lang === 'fr' ? 'Lien invalide ou expiré.' : 'Invalid or expired link.'));
      });
  }, [lang]);

  const success = state === 'success';
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl items-center justify-center py-16">
      <div className="w-full border border-border-ui bg-surface p-8 text-center">
        {success ? <CheckCircle2 className="mx-auto h-10 w-10 text-success" aria-hidden="true" /> : state === 'error' ? <XCircle className="mx-auto h-10 w-10 text-error" aria-hidden="true" /> : null}
        <h1 className="mt-5 text-2xl font-semibold">{lang === 'fr' ? 'Vérification de l’adresse e-mail' : 'Email verification'}</h1>
        <p className="mt-3 text-text-secondary">{state === 'loading' ? (lang === 'fr' ? 'Vérification en cours…' : 'Verifying…') : message}</p>
        {state !== 'loading' && (
          <button type="button" className="mt-6 border border-border-ui px-4 py-2 text-sm font-medium hover:bg-surface-muted" onClick={() => { window.location.assign('/login'); }}>
            {lang === 'fr' ? 'Se connecter' : 'Sign in'}
          </button>
        )}
      </div>
    </section>
  );
};
