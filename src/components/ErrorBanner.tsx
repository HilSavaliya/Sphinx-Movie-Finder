import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface ErrorBannerProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorBanner = ({ 
  message = "Something went wrong. Please try again.", 
  onRetry 
}: ErrorBannerProps) => {
  return (
    <Alert className="border-destructive/50 text-destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span>{message}</span>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry}>
            Retry
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
};