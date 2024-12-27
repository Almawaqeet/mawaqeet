type Props = {
  message: string;
  className?: string;
};
const FormError: React.FC<Props> = ({ message, className }) => {
  return (
    <span
      className={`md:text-fz-sm xmd:text-fz-xss   text-red-700 ${className}`}
    >
      {message}
    </span>
  );
};

export default FormError;
