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
        <div className="flex  justify-center">
          <button
            type={type}
            className={`${className} ${
              disabled
                ? `bg-[#150783a2] cursor-not-allowed`
                : `${backgroundColour} cursor-pointer`
            }`}
            onClick={onClick}
            disabled={disabled}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.keyCode === 13) {
                e.preventDefault();
                onClick?.(e);
              }
            }}
            ref={ref} // Added this line
          >
            {showIcon && (
              <img className={`${iconClassName}`} src={icon} alt="" />
            )}

            <p className={textClassName}>
              {loading ? (
                <div>Loading...</div>
              ) : (
                capitalizeFirstLetterWithExclude(text)
              )}
            </p>
          </button>
        </div>
      }
    </>
  );
};

export default OneButton;
