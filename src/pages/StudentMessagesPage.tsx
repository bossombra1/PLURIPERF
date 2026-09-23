import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/Logo';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Mail, ArrowLeft } from 'lucide-react';

export const StudentMessagesPage: React.FC<{ lang?: 'fr' | 'en' }> = ({ lang = 'fr' }) => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>Authentification requise.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Link to="/espace-etudiant" className="text-sm text-primary hover:text-primary-hover flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Retour au tableau de bord
            </Link>
            <h1 className="text-3xl font-bold text-text-primary">Messages</h1>
          </div>
          <Logo variant="emblem-only" size="sm" />
        </div>

        <div className="p-8 bg-surface border border-border-subtle rounded-[calc(var(--radius)+4px)] text-center">
          <Mail className="h-12 w-12 text-text-muted mx-auto mb-4" />
          <p className="text-text-muted">Aucun message pour le moment.</p>
        </div>
      </div>
    </div>
  );
};
