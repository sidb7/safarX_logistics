import React from "react";
import dummyImage from "../../assets/Delivery/Warehouse.svg";
import "../../styles/datePicker.css";

interface IInputProps {
  label?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  name?: string;
  isDisabled?: boolean;
  inputType?: string;
  isRequired?: boolean;
  imgSrc?: string;
  inputError?: boolean;
}

const InputWithImage = (props: IInputProps) => {
  const {
    label,
    value,
    onChange,
    onClick,
    placeholder,
    className,
    inputClassName,
    labelClassName,
    name,
    isDisabled,
    inputType,

    isRequired = false,
    imgSrc,
    inputError,
  } = props;

  const inputContainerClass = imgSrc && value ? "input-container-aligned" : "";
  const inputPaddingClass = value ? "pl-[42px]" : "pl-[9px] ";
  const caretColor = value ? "text-[#1C1C1C]" : "transparent";

  return (
    <>
      <div
        className={`${inputClassName} relative flex items-center justify-center `}
      >
        {imgSrc && (
          <img
            src={imgSrc ? imgSrc : dummyImage}
            alt=""
            className="absolute z-2 left-[18px]"
          />
        )}

        <input
          placeholder={placeholder}
          type="text"
          className={`rounded border-[1px]  ${
            inputError && !value ? "!border-red-500" : "border-[#A4A4A4]"
          } placeholder:text-[12px] placeholder:text-[#777777] placeholder:font-Open bg-white text-[12px] outline-none ${inputPaddingClass}`}
          required={isRequired}
          onChange={onChange}
          onClick={onClick}
          value={value}
          style={{ caretColor }}
        />
      </div>
      {inputError && !value && (
        <span
          className={`text-[red] transition-all ease-out h-0  h-[18px]  delay-100 font-Open text-[11px] mt-1 px-2 `}
        >
          Field is required
        </span>
      )}
    </>
  );
};

export default InputWithImage;
