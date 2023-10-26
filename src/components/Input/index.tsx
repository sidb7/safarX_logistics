import { Tooltip } from "react-tooltip";
import "../../styles/inputBox.css";
interface propTypes {
  label?: string;
  value?: string | number;
  inputMode?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  containerStyle?: string;
  inputClassName?: string;
  labelClassName?: string;
  name?: string;
  isDisabled?: boolean;
  inputType?: string;
  isRequired?: boolean;
  minLength?: number;
  maxLength?: number;
  isRightIcon?: boolean;
  rightIcon?: string;
  informativeIcon?: string;
  isInfoIcon?: boolean;
  setVisibility?: any;
  visibility?: any;
  onClick?: any;
  imageClassName?: string;
  tempLabel?: any;
  onKeyDown?: any;
  tooltipContent?: string;
  inputError?: boolean;
  errorMessage?: any;
}

const CustomInputBox: React.FunctionComponent<propTypes> = (
  props: propTypes
) => {
  const {
    label,
    value = undefined,
    inputMode = "",
    onChange = () => {},
    onBlur = () => {},
    onClick,
    placeholder = "",
    className,
    containerStyle,
    tempLabel,
    inputClassName,
    labelClassName,
    name,
    visibility,
    isDisabled,
    rightIcon,
    informativeIcon,
    isInfoIcon = false,
    inputType = "text",
    isRequired = false,
    isRightIcon = false,
    setVisibility,
    minLength,
    maxLength,
    imageClassName,
    onKeyDown,
    tooltipContent,
    inputError,
    errorMessage = false,
  } = props;

  return (
    <div className="flex  flex-col text-start  w-full">
      <div className={`relative w-[100%]  ${containerStyle}`}>
        <input
          name={name}
          type={inputType}
          placeholder={placeholder}
          className={`${className} ${
            errorMessage !== true && errorMessage !== false && "!border-[red]"
          }  ${inputError && !value ? "border-red-500" : "border-[#A4A4A4]"}
           rounded border-[1px] border-[#A4A4A4] p-[10px] focus:border-[#004eff]  gap-[10px] h-[48px] font-Open text-[12px] text-[#1C1C1C] outline-none custom-input  `}
          required={isRequired}
          onChange={(e: any) => onChange(e)}
          onBlur={(e: any) => onBlur(e)}
          value={value}
          disabled={isDisabled}
          inputMode={inputMode}
          minLength={minLength}
          maxLength={maxLength}
          onKeyDown={onKeyDown}
        />
        {/* absolute -bottom-4 px-2 left-0 */}

        <label
          className={`text-[12px] text-[#777777] absolute leading-4 font-Open custom-label ${
            (value || tempLabel) && "filled"
          } ${
            errorMessage !== true && errorMessage !== false && "!text-[red]"
          }`}
        >
          {label}
        </label>

        {isRightIcon && (
          <img
            src={rightIcon}
            alt=""
            className={`${imageClassName} absolute z-20  right-6  top-[30%] cursor-pointer w-[20px] h-[20px]`}
            onClick={() => {
              setVisibility(!visibility);
              onClick();
            }}
          />
        )}
        <div>
          {isInfoIcon && (
            <img
              src={informativeIcon}
              alt=""
              className={`${imageClassName} absolute z-20  right-1  top-[34%] cursor-pointer`}
              data-tooltip-id="my-tooltip-inline"
              data-tooltip-content={tooltipContent}
            />
          )}
          <Tooltip
            id="my-tooltip-inline"
            style={{
              backgroundColor: "bg-neutral-900",
              color: "#FFFFFF",
              // width: "fit-content",
              fontSize: "12px",
              lineHeight: "14px",
              textTransform: "capitalize",
            }}
          />
        </div>
      </div>
      {errorMessage && (
        <span className="text-[red] transition font-Open text-[11px] mt-1 px-2 ">
          {errorMessage && errorMessage}
        </span>
      )}
    </div>
  );
};

export default CustomInputBox;
