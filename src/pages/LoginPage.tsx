import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Language } from '../types';
import { Logo } from '../components/Logo';
import { useAuth, AuthUser } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Alert, AlertDescription } from '../components/ui/alert';
import { ApiError } from '../api/client';
import { Loader2, Shield, UserPlus, LogIn } from 'lucide-react';

interface LoginPageProps {
  onSuccessLogin: (user: AuthUser) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onSuccessLogin }) => {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [identifiant, setIdentifiant] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const lang: Language = 'fr';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        const u = /@/.test(identifiant)
          ? await login(identifiant, password)
          : await login('', password, identifiant);
        onSuccessLogin(u);
      } else {
        const u = await register(email, password, fullName);
        onSuccessLogin(u);
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erreur réseau');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">

      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Logo variant="full-stacked" size="md" className="mb-4" />
          <h1 className="text-2xl font-bold text-text-primary">
            {mode === 'login' ? 'Connexion à votre espace' : 'Créer un compte étudiant'}
          </h1>
          <p className="text-sm text-text-muted">
            {mode === 'login'
              ? 'Accédez à votre tableau de bord personnel'
              : 'Rejoignez la communauté PLURIPERF en 30 secondes'}
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <>
              <div className="space-y-1">
                <label htmlFor="fullName" className="text-sm font-medium text-text-secondary">Nom complet</label>
                <Input
                  id="fullName"
                  type="text"
                  required
                  minLength={2}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jean Dupont"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="email" className="text-sm font-medium text-text-secondary">Email</label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jean@example.com"
                />
              </div>
            </>
          )}

          {mode === 'login' && (
            <div className="space-y-1">
              <label htmlFor="identifiant" className="text-sm font-medium text-text-secondary">Email ou matricule</label>
              <Input
                id="identifiant"
                type="text"
                required
                value={identifiant}
                onChange={(e) => setIdentifiant(e.target.value)}
                placeholder="PLU-2025-8842 ou jean@example.com"
              />
            </div>
          )}

          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium text-text-secondary">Mot de passe</label>
            <Input
              id="password"
              type="password"
              required
              minLength={mode === 'register' ? 8 : 1}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full" size="lg">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : mode === 'login' ? (
              <>
                <LogIn className="h-4 w-4" />
                <span>Se connecter</span>
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4" />
                <span>Créer mon compte</span>
              </>
            )}
          </Button>
        </form>

        <div className="text-center space-y-2">
          <button
            type="button"
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-sm text-primary hover:text-primary-hover underline"
          >
            {mode === 'login' ? "Pas encore de compte ? S'inscrire" : 'Déjà un compte ? Se connecter'}
          </button>
          <div>
            <Link to="/forgot-password" className="text-sm text-text-muted hover:text-text-secondary underline">
              Mot de passe oublié ?
            </Link>
          </div>
        </div>

        <div className="text-xs text-text-muted text-center flex items-center justify-center gap-1.5 pt-4 border-t border-border-subtle">
          <Shield className="h-3.5 w-3.5 text-success" />
          <span>Connexion chiffrée SSL/TLS — JWT signé côté serveur</span>
        </div>
      </div>
    </div>
  );
};

