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

const CustomDate = (props: IInputProps) => {
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

  return (
    <>
      <div className={`${inputClassName} relative flex items-center`}>
        <input
          placeholder={placeholder}
          type="date"
          className={`rounded border-[1px]  ${
            inputError && !value ? "!border-red-500" : "border-[#A4A4A4]"
          } placeholder:text-[12px] placeholder:text-[#777777] w-full placeholder:font-Open bg-white text-[12px] outline-none`}
          required={isRequired}
          onChange={onChange}
          onClick={onClick}
          value={value}
        />
        <label
          className={`text-[12px] text-[#777777] absolute leading-4 font-Open custom-label transition-all ease-out`}
        >
          {label}
        </label>
      </div>
    </>
  );
};

export default CustomDate;
