import { toast } from 'sonner';
import { IError } from './interface/api';

const processError = (err: IError) => {
  const { error, message, status } = err;
  if (error && message) {
    toast.error(error, {
      description: message
    });
  } else {
    toast.error(message);
  }

  return;
};

export default processError;
