import { toast } from 'sonner';


interface IError {
  error: string;
  message: string;
  status: number;
}

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
