import { Tooltip } from "react-tooltip";
import "../../styles/inputBox.css";
import InfoCircle from "../../assets/info-circle.svg";
import React, { useState } from "react";

interface propTypes {
  label?: string;
  value?: string | number;
  defaultValue?: string | number;
  inputMode?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: any;
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
  autoComplete?: any;
  ref?: any;
  title?: any;
  id?: any;
  errorCondition?: {
    // regex?: RegExp | string; // Accept either a RegExp object or a string representing the regex pattern
    message?: string;
    // onBlur?: boolean; // Add this line
  };
  range?: boolean; // Add this line
  startDateValue?: string; // Add this line
  endDateValue?: string; // Add this line
}

const CustomInputBox: React.FunctionComponent<propTypes> = (
  props: propTypes
) => {
  const {
    label,
    value = undefined,
    defaultValue = undefined,
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
    autoComplete = "",
    title = "",
    ref = {},
    id,
    errorCondition, // Added errorCondition prop

    // Add the following props
    range = false,
    startDateValue = "",
    endDateValue = "",
  } = props;

  // Function to check if the error condition is met
  // const isErrorConditionMet = (value: string, onBlur: boolean = false) => {
  //   if (
  //     errorCondition &&
  //     (errorCondition.regex instanceof RegExp ||
  //       typeof errorCondition.regex === "string")
  //   ) {
  //     const regex =
  //       typeof errorCondition.regex === "string"
  //         ? new RegExp(errorCondition.regex)
  //         : errorCondition.regex;
  //     if (onBlur) {
  //       return !regex.test(value);
  //     } else {
  //       return false; // Return false if not on blur
  //     }
  //   }
  //   return false;
  // };

  // NEW: Add state variable to track focus state
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex  flex-col text-start  w-full">
      <div className={`relative w-[100%]  ${containerStyle}`}>
        <input
          ref={ref}
          name={name}
          type={inputType}
          placeholder={placeholder}
          className={`${className} ${
            errorMessage !== true &&
            errorMessage !== false &&
            "!border-[#F35838]"
          }  ${
            (!isFocused && errorCondition?.message) || (inputError && !value)
              ? "border-[#F35838]"
              : "border-[#A4A4A4]"
          }
           rounded border-[1px] w-full border-[#A4A4A4] p-[10px] focus:border-[#004eff]  gap-[10px] h-[48px] font-Open text-[12px] text-[#1C1C1C] outline-none custom-input sentry-unmask `}
          required={isRequired}
          onChange={(e: any) => onChange(e)}
          onBlur={(e) => {
            onBlur(e);
            setIsFocused(false); // Set isFocused to false on blur
          }}
          onFocus={() => setIsFocused(true)} // Set isFocused to true on focus
          autoComplete={autoComplete}
          value={value}
          defaultValue={defaultValue}
          disabled={isDisabled}
          inputMode={inputMode}
          minLength={minLength}
          maxLength={maxLength}
          onKeyDown={onKeyDown}
          title={title}
          id={id}
        />
        {/* absolute -bottom-4 px-2 left-0 */}

        <label
          className={`text-[12px] text-[#777777] absolute leading-4 font-Open custom-label transition-all ease-out ${
            (value || tempLabel || isFocused) && "filled"
          } ${
            errorMessage !== true &&
            errorMessage !== false &&
            "!text-[#F35838] "
          } ${labelClassName}`}
          htmlFor={id}
        >
          {label}
        </label>

        {isRightIcon && (
          <img
            src={rightIcon}
            alt=""
            className={`${imageClassName} absolute z-15  right-6  top-[30%] cursor-pointer w-[16px] h-[20px]`}
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
              data-tooltip-id="my-tooltip-landing"
              data-tooltip-content={tooltipContent}
            />
          )}
          <Tooltip
            id="my-tooltip-landing"
            style={{
              backgroundColor: "#4D83FF",
              color: "#FFFFFF",
              width: "270px",
              fontSize: "12px",
              lineHeight: "14px",
              textTransform: "capitalize",
            }}
          />
        </div>
      </div>
      {/* <span
        className={`text-[red] transition-all ease-out h-0 ${
          errorMessage !== false &&
          errorMessage !== true &&
          "opacity-100 h-[18px]"
        } opacity-0 delay-100 font-Open text-[11px] mt-1 px-2 `}
      >
        {errorMessage && errorMessage}
      </span> */}

      {errorMessage !== false && errorMessage !== true && (
        <div className="flex items-center gap-x-1 mt-1">
          <img src={InfoCircle} alt="" width={16} height={16} />
          <span className="font-normal text-[#F35838] text-xs leading-3">
            {errorMessage && errorMessage}
          </span>
        </div>
      )}

      {/* {inputError && !value && (
        <span
          className={`text-[red] transition-all ease-out h-[18px] delay-100 font-Open font-normal text-[12px] mt-1 px-2 leading-4`}
        >
          Field is required
        </span>
      )} */}

      {inputError && !value && (
        <div className="flex items-center gap-x-1 mt-1">
          <img src={InfoCircle} alt="" width={16} height={16} />
          <span className="font-normal text-[#F35838] text-xs leading-3 transition-all ease-out delay-100">
            Field is required
          </span>
        </div>
      )}

      {/* Render dynamic error message based on errorCondition */}
      {/* Render dynamic error message based on errorCondition */}
      {!isFocused && errorCondition?.message && (
        <div className="flex items-center gap-x-1 mt-1">
          <img src={InfoCircle} alt="" width={16} height={16} />
          <span className="font-normal text-[#F35838] text-xs leading-3">
            {errorCondition.message}
          </span>
        </div>
      )}
    </div>
  );
};

export default CustomInputBox;
