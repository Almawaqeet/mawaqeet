import { usePaystackPayment } from 'react-paystack';

interface UsePaystackConfig {
  email: string;
  amount: number;
  reference: string;
  onSuccess?: () => void;
  onClose?: () => void;
}

export const usePaystack = ({ email, amount, reference, onSuccess, onClose }: UsePaystackConfig) => {
  const config = {
    reference: reference ?? '',
    email: email ?? '',
    amount: amount ?? 0,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ?? '',
    onSuccess: onSuccess ?? (() => {}),
    onClose: onClose ?? (() => {})
  };

  const initializePayment = () => {
    const paystack = usePaystackPayment(config);
    paystack(config);
  };

  return {
    initializePayment
  };
};
