'use client';

import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

interface AppToastProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
  duration?: number;
  className?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const useAppToast = () => {
  const { toast } = useToast();

  const showToast = ({
    title,
    description,
    variant = 'default',
    duration = 3000,
    className,
    action,
  }: AppToastProps) => {
    toast({
      title,
      description,
      variant,
      duration,
      className,
      action: action ? (
        <ToastAction altText={action.label} onClick={action.onClick}>
          {action.label}
        </ToastAction>
      ) : undefined,
    });
  };

  return { showToast };
};
