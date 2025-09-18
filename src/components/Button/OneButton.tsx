import { capitalizeFirstLetterWithExclude } from "../../utils/utility";
import { Spinner } from "../Spinner";

const OneButton = (props: any) => {
  const {
    text,
    onClick,
    className,
    disabled,
    type = "button",
    showIcon = false,
    icon,
    iconClassName,
    textClassName,
    loading = false,
    spinnerClassName,
    ref,
    backgroundColour = "bg-[#160783]",
  } = props;

  return (
    <>
      {
        <div className="flex justify-center">
          <button
            type={type}
            className={`
      text-white rounded-lg 
      ${
        disabled
          ? `${
              backgroundColour !== "bg-transparent" && "bg-[#160783]"
            } cursor-not-allowed`
          : `${backgroundColour} cursor-pointer`
      }
      ${className}  py-2 px-2 // default if no className passed
    `}
            onClick={onClick}
            disabled={disabled}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.keyCode === 13) {
                e.preventDefault();
                onClick?.(e);
              }
            }}
            ref={ref}
          >
            <div className="flex items-center justify-center gap-2">
              {showIcon && <img className={iconClassName} src={icon} alt="" />}

              <p className={textClassName}>
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  capitalizeFirstLetterWithExclude(text)
                )}
              </p>
            </div>
          </button>
        </div>
      }
    </>
  );
};

export default OneButton;
