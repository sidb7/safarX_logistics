import { Tooltip } from "react-tooltip";
import "../../styles/inputBox.css";
import InfoCircle from "../../assets/info-circle.svg";
import React, { useState, forwardRef } from "react";
import Flag from "../../assets/Flag.svg";

interface ErrorCondition {
  message?: string;
}

interface CustomInputProps {
  label?: string;
  value?: string | number;
  defaultValue?: string | number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
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
  setVisibility?: (v: boolean) => void;
  visibility?: boolean;
  imageClassName?: string;
  tempLabel?: any;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  tooltipContent?: string;
  inputError?: boolean;
  errorMessage?: string | boolean;
  autoComplete?: string;
  title?: string;
  id?: string;
  errorCondition?: ErrorCondition;
  range?: boolean;
  startDateValue?: string;
  endDateValue?: string;
  isIndNumber?: boolean;
  fixedLabel?: boolean;
}

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex items-center gap-x-1 mt-1">
    <img src={InfoCircle} alt="" width={16} height={16} />
    <span className="font-normal text-[#F35838] text-xs leading-3">
      {message}
    </span>
  </div>
);

const CustomInputBox = forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      label,
      value,
      defaultValue,
      inputMode,
      onChange,
      onBlur,
      onClick,
      placeholder = "",
      className = "",
      containerStyle = "",
      tempLabel,
      labelClassName = "",
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
      imageClassName = "",
      onKeyDown,
      tooltipContent,
      inputError,
      errorMessage = false,
      autoComplete,
      title,
      id,
      errorCondition,
      isIndNumber = false,
      fixedLabel = false,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    // --- Input Border Class ---
    const borderClass =
      (!isFocused && errorCondition?.message) || (inputError && !value)
        ? "border-[#F35838]"
        : "border-[#A4A4A4]";

    const errorText =
      typeof errorMessage === "string"
        ? errorMessage
        : inputError && !value
        ? "Field is required"
        : !isFocused && errorCondition?.message
        ? errorCondition.message
        : null;

    return (
      <div className={`${isIndNumber ? "flex" : ""}`}>
        {isIndNumber && (
          <div className="rounded-s border-[1px] border-[#A4A4A4] bg-[#E8E8E8] border-r-white pt-[15px] px-1">
            <img src={Flag} alt="flag" width={59} height={55} />
          </div>
        )}

        <div className="flex flex-col text-start w-full">
          <div className={`relative w-full ${containerStyle}`}>
            <input
              ref={ref}
              name={name}
              type={inputType}
              placeholder={placeholder}
              className={`
                ${className} 
                ${borderClass}
                rounded border-[1px] w-full p-[10px] 
                focus:border-[#160783] h-[48px]  focus:shadow-blue-50 focus:shadow-lg
                font-Open text-[12px] text-[#1C1C1C] outline-none custom-input sentry-unmask
              `}
              required={isRequired}
              onChange={onChange}
              onBlur={(e) => {
                onBlur?.(e);
                setIsFocused(false);
              }}
              onFocus={() => setIsFocused(true)}
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

            <label
              htmlFor={id}
              className={`
                text-[12px] text-[#777777] absolute leading-4 font-Open 
                transition-all ease-out bg-transparent
                ${
                  fixedLabel || value || tempLabel || isFocused ? "filled" : ""
                } 
                ${typeof errorMessage === "string" ? "!text-[#F35838]" : ""} 
                ${labelClassName}
              `}
            >
              {label}
            </label>

            {isRightIcon && (
              <img
                src={rightIcon}
                alt="right-icon"
                className={`${imageClassName} absolute right-1 top-[30%] cursor-pointer w-[16px] h-[20px]`}
                onClick={() => {
                  setVisibility?.(!visibility);
                  onClick?.();
                }}
              />
            )}
          </div>

          {errorText && <ErrorMessage message={errorText} />}
        </div>
      </div>
    );
  }
);

export default CustomInputBox;
