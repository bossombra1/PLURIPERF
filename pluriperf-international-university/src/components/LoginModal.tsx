import React, { useState } from 'react';
import { Language } from '../types';
import { X, LogIn, Shield, Loader2, AlertCircle, UserPlus } from 'lucide-react';
import { Logo } from './Logo';
import { useAuth } from '../context/AuthContext';
import { api, ApiError } from '../api/client';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onSuccessLogin: (persona: 'student' | 'faculty') => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, lang, onSuccessLogin }) => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [identifiant, setIdentifiant] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setNotice('');
    setLoading(true);
    try {
      if (mode === 'login') {
        const u = /@/.test(identifiant)
          ? await login(identifiant, password)
          : await login('', password, identifiant);
        onSuccessLogin(u.role === 'teacher' ? 'faculty' : 'student');
        onClose();
      } else if (mode === 'register') {
        await register(email, password, fullName);
        onSuccessLogin('student');
        onClose();
      } else {
        const res = await api.post<{ message: string }>('/auth/forgot-password', { email });
        setNotice(res.message);
      }
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : lang === 'fr' ? 'Une erreur est survenue' : 'Something went wrong',
      );
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (kind: 'student' | 'faculty') => {
    setMode('login');
    setIdentifiant(kind === 'student' ? 'PLU-2025-8842' : 'PR-NGUESSAN-001');
    setPassword('Pluri2026!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Close login modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="border-b border-slate-100 pb-4 mb-6 text-center">
          <Logo variant="full-stacked" size="md" className="mb-3" />
          <h3 className="text-xl font-serif font-bold text-slate-900">
            {lang === 'fr' ? 'Campus Numérique PLURIPERF' : 'PLURIPERF Digital Campus'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {mode === 'register'
              ? lang === 'fr' ? 'Créez votre compte étudiant en 30 secondes' : 'Create your student account in 30 seconds'
              : lang === 'fr' ? 'Chaque étudiant et enseignant dispose d’un espace personnel sécurisé' : 'Secure personal learning space for students and faculty'}
          </p>
        </div>

        {error && (
          <div className="mb-4 flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
        {notice && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-700">
            {notice}
          </div>
        )}

        {mode !== 'forgot' && (
          <div className="mb-5 bg-slate-50 p-2 rounded-xl border border-slate-200 flex items-center gap-1 text-xs">
            {(['login', 'register'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => { setMode(m); setError(''); setNotice(''); }}
                className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition-colors text-center flex items-center justify-center gap-1 ${
                  mode === m
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60 font-semibold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {m === 'register' && <UserPlus className="w-3.5 h-3.5" />}
                {m === 'login'
                  ? lang === 'fr' ? 'Connexion' : 'Sign in'
                  : lang === 'fr' ? 'Créer un compte' : 'Sign up'}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'login' && (
            <>
              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  {lang === 'fr' ? 'Email ou matricule' : 'Email or student ID'}
                </label>
                <input
                  type="text"
                  required
                  value={identifiant}
                  onChange={(e) => setIdentifiant(e.target.value)}
                  placeholder="sarah@pluriperf.com ou PLU-2025-8842"
                  className="w-full pl-3 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-slate-700 font-medium">
                    {lang === 'fr' ? 'Mot de passe' : 'Password'}
                  </label>
                  <button
                    type="button"
                    onClick={() => { setMode('forgot'); setError(''); }}
                    className="text-[11px] text-amber-600 hover:underline"
                  >
                    {lang === 'fr' ? 'Mot de passe oublié ?' : 'Forgot password?'}
                  </button>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => fillDemo('student')}
                  className="text-[11px] text-slate-400 hover:text-slate-600 underline"
                >
                  {lang === 'fr' ? 'Démo étudiant' : 'Demo student'}
                </button>
                <button
                  type="button"
                  onClick={() => fillDemo('faculty')}
                  className="text-[11px] text-slate-400 hover:text-slate-600 underline"
                >
                  {lang === 'fr' ? 'Démo enseignant' : 'Demo faculty'}
                </button>
              </div>
            </>
          )}

          {mode === 'forgot' && (
            <div>
              <label className="block text-slate-700 font-medium mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setMode('login')}
                className="mt-2 text-[11px] text-slate-400 hover:text-slate-600 underline"
              >
                {lang === 'fr' ? 'Retour à la connexion' : 'Back to sign in'}
              </button>
            </div>
          )}

          {mode === 'register' && (
            <>
              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  {lang === 'fr' ? 'Nom complet' : 'Full name'}
                </label>
                <input
                  type="text"
                  required
                  minLength={2}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  {lang === 'fr' ? 'Mot de passe (8 caractères min.)' : 'Password (min. 8 characters)'}
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg shadow transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4 text-emerald-400" />
                  <span>
                    {mode === 'login'
                      ? lang === 'fr' ? 'Accéder à mon espace' : 'Enter My Portal'
                      : mode === 'register'
                        ? lang === 'fr' ? 'Créer mon compte' : 'Create my account'
                        : lang === 'fr' ? 'Envoyer le lien' : 'Send reset link'}
                  </span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-emerald-600" />
          <span>
            {lang === 'fr'
              ? 'Connexion chiffrée SSL / TLS 256-bit — JWT signé côté serveur'
              : '256-bit SSL / TLS encrypted login — server-signed JWT'}
          </span>
        </div>
      </div>
    </div>
  );
};
