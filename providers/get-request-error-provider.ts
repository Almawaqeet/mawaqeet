import { useAppToast } from '@/components/reusables/AppToast';
import { useRouter } from 'next/navigation';

/**
 * A custom hook to return a reusable error toast function
 * @returns A function that takes an error message and displays a toast
 */
export function useErrorToast() {
  const { showToast } = useAppToast();
  const router = useRouter();

  return (error: string) => {
    showToast({
      title: 'Error',
      description: error,
      variant: 'destructive',
      action: {
        label: 'Refresh',
        onClick: () => router.refresh(),
      },
    });
  };
}
