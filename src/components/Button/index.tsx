import { Spinner } from "../Spinner";

interface CustomButtonProps {
  text: any;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  type?: any;
  iconClass?: any;
  icon?: any;
  showIcon?: boolean;
  loading?: boolean;
}
const CustomButton = (props: CustomButtonProps) => {
  const {
    text,
    onClick,
    className,
    disabled,
    type = "button",
    showIcon = false,
    icon,
    iconClass,
    loading = false,
  } = props;
  return (
    <>
      {loading ? (
        <div
          className={`flex justify-center items-center text-white bg-black rounded-md h-9 w-full ${className}`}
        >
          <Spinner />
        </div>
      ) : (
        <button
          type={type}
          className={`flex justify-center items-center text-white bg-black rounded-md h-9 w-full ${className}`}
          onClick={onClick}
          disabled={disabled}
        >
          {showIcon && (
            <img className={`${iconClass} mr-2`} src={icon} alt="" />
          )}
          {text}
        </button>
      )}
    </>
  );
};
export default CustomButton;
