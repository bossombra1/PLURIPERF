import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface LoadingStateProps {
  className?: string;
  label?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ className, label = 'Loading…' }) => (
  <div role="status" aria-live="polite" className={cn('flex items-center justify-center gap-2 py-12 text-text-muted', className)}>
    <Loader2 className="h-5 w-5 animate-spin text-primary" aria-hidden="true" />
    <span className="text-sm">{label}</span>
  </div>
);

export const Skeleton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('animate-pulse rounded-[var(--radius)] bg-surface-muted', className)} {...props} />
  ),
);
Skeleton.displayName = 'Skeleton';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description, icon: Icon, action }) => (
  <div className="flex flex-col items-center justify-center gap-3 rounded-[calc(var(--radius)+4px)] border border-dashed border-border-ui bg-surface-muted/40 p-8 text-center">
    {Icon && <Icon className="h-10 w-10 text-text-muted" aria-hidden="true" />}
    <div className="space-y-1">
      <p className="font-semibold text-text-primary">{title}</p>
      {description && <p className="text-sm text-text-muted">{description}</p>}
    </div>
    {action}
  </div>
);

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ title = 'Error', message, onRetry }) => (
  <div role="alert" className="rounded-[calc(var(--radius)+4px)] border border-error/50 bg-error/10 p-6 text-center space-y-3">
    <p className="font-semibold text-error">{title}</p>
    <p className="text-sm text-text-secondary">{message}</p>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="rounded-[var(--radius)] border border-border-ui px-4 py-2 text-sm font-medium text-text-primary hover:bg-surface-muted transition-colors"
      >
        Retry
      </button>
    )}
  </div>
);