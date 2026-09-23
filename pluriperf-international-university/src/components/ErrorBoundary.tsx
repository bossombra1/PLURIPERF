import React from 'react';

interface Props { children: React.ReactNode; }
interface State { hasError: boolean; }

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('PLURIPERF UI error', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <main className="min-h-screen bg-background-deep px-6 py-16 text-text-primary">
        <div className="mx-auto max-w-2xl border border-border-ui bg-surface p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-text-muted">PLURIPERF</p>
          <h1 className="mt-3 text-2xl font-semibold">Une erreur est survenue</h1>
          <p className="mt-3 text-text-secondary">
            L’interface n’a pas pu afficher cette page correctement. Rechargez la page ou revenez à l’accueil.
          </p>
          <button
            type="button"
            className="mt-6 border border-border-ui bg-surface-elevated px-4 py-2 text-sm font-medium hover:bg-surface-muted"
            onClick={() => window.location.assign('/')}
          >
            Retour à l’accueil
          </button>
        </div>
      </main>
    );
  }
}
