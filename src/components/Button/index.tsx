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
const capitalizeFirstLetterWithExclude = (
  text: string,
  excludeWords: string[] = []
) => {
  return text
    .split(" ")
    .map((word) => {
      if (excludeWords.includes(word.toUpperCase())) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
};

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

  const excludeWords = ["B2B", "B2C"];

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
          <p className="buttonClassName md:text-[14px] whitespace-nowrap capitalize">
            {capitalizeFirstLetterWithExclude(text, excludeWords)}
          </p>
        </button>
      )}
    </>
  );
};
export default CustomButton;
