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
  } = props;

  const inputContainerClass = imgSrc && value ? "input-container-aligned" : "";

  return (
    <div className="relative flex items-center justify-center  ">
      {!value && imgSrc && (
        <img
          src={imgSrc ? imgSrc : dummyImage}
          alt=""
          className="absolute z-2 left-[18px]"
        />
      )}

      <input
        placeholder={placeholder}
        type="text"
        className="rounded  border-[1px] border-[#A4A4A4] placeholder:text-[12px] placeholder:text-[#777777] placeholder:font-Open  bg-white h-[48px] pl-[12%]  text-[12px] text-[#1C1C1C] outline-none  "
        required={isRequired}
        onChange={onChange}
        onClick={onClick}
        value={value}
      />
    </div>
  );
};

export default InputWithImage;
