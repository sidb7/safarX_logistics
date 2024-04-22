import { capitalizeFirstLetterWithExclude } from "../../utils/utility";
import { Spinner } from "../Spinner";

interface CustomButtonProps {
  text: any;
  onClick: (e: any) => void;
  className?: string;
  disabled?: boolean;
  type?: any;
  iconClass?: any;
  icon?: any;
  showIcon?: boolean;
  loading?: boolean;
  onlyIcon?: boolean;
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
    onlyIcon = false,
  } = props;

  const excludeWords = ["B2B", "B2C", "KYC", "OTP"];

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
          className={`flex p-2 justify-center items-center text-white bg-black rounded-md h-9 w-full ${className}`}
          onClick={onClick}
          disabled={disabled}
        >
          {showIcon && (
            <img
              className={`${iconClass} ${onlyIcon ? "" : "mr-2"}`}
              src={icon}
              alt=""
            />
          )}
          <p className="buttonClassName md:text-[14px] font-Open font-semibold leading-5 whitespace-nowrap capitalize">
            {capitalizeFirstLetterWithExclude(text, excludeWords)}
          </p>
        </button>
      )}
    </>
  );
};
export default CustomButton;
