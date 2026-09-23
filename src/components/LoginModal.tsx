import React, { useState } from 'react';
import { Language, PageId } from '../types';
import { X, LogIn, KeyRound, UserCheck, Shield, BookOpen } from 'lucide-react';
import { Logo } from './Logo';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onSuccessLogin: (persona: 'student' | 'faculty') => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  lang,
  onSuccessLogin,
}) => {
  const [identifiant, setIdentifiant] = useState('PLU-2025-8842');
  const [password, setPassword] = useState('••••••••••••');
  const [role, setRole] = useState<'student' | 'faculty'>('student');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccessLogin(role);
    onClose();
  };

  const handleDemoSwitch = (selectedRole: 'student' | 'faculty') => {
    setRole(selectedRole);
    if (selectedRole === 'student') {
      setIdentifiant('PLU-2025-8842');
    } else {
      setIdentifiant('PR-NGUESSAN-001');
    }
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
            {lang === 'fr'
              ? 'Campus Numérique PLURIPERF'
              : 'PLURIPERF Digital Campus'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'fr'
              ? 'Chaque étudiant et enseignant dispose d’un espace personnel sécurisé'
              : 'Secure personal learning space for students and faculty'}
          </p>
        </div>

        {/* Demo persona picker */}
        <div className="mb-5 bg-slate-50 p-2 rounded-xl border border-slate-200 flex items-center gap-1 text-xs">
          <button
            type="button"
            onClick={() => handleDemoSwitch('student')}
            className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition-colors text-center ${
              role === 'student'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60 font-semibold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {lang === 'fr' ? 'Compte Étudiant (Sarah)' : 'Student (Sarah)'}
          </button>
          <button
            type="button"
            onClick={() => handleDemoSwitch('faculty')}
            className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition-colors text-center ${
              role === 'faculty'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60 font-semibold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {lang === 'fr' ? 'Enseignant (Pr. N’Guessan)' : 'Faculty (Prof. N’Guessan)'}
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-medium mb-1">
              {lang === 'fr' ? 'Identifiant / Matricule' : 'Student / Faculty ID'}
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={identifiant}
                onChange={(e) => setIdentifiant(e.target.value)}
                className="w-full pl-3 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-slate-700 font-medium">
                {lang === 'fr' ? 'Mot de passe' : 'Password'}
              </label>
              <button
                type="button"
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

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              defaultChecked
              className="rounded text-amber-600 focus:ring-amber-500"
            />
            <label htmlFor="remember" className="text-slate-600 text-[11px]">
              {lang === 'fr'
                ? 'Mémoriser ma session sur ce terminal'
                : 'Remember my session on this device'}
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg shadow transition-colors flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4 text-emerald-400" />
              <span>
                {lang === 'fr' ? 'Accéder à mon espace' : 'Enter My Portal'}
              </span>
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-emerald-600" />
          <span>
            {lang === 'fr'
              ? 'Authentification SSO chiffrée SSL / TLS 256-bit'
              : 'SSO 256-bit Encrypted SSL / TLS Security'}
          </span>
        </div>
      </div>
    </div>
  );
};
