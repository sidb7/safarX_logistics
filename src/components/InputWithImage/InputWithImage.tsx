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
    <div
      className={`${inputClassName} relative block flex items-center justify-center `}
    >
      {!value && imgSrc && (
        <span className="absolute inset-y-0 left-0 flex items-center pl-5">
          <img src={imgSrc} alt="" className="h-5 w-5 text-slate-300" />
        </span>
      )}

      <input
        placeholder={placeholder}
        type="text"
        className=" block rounded py-2 pl-12   border-[1px] border-[#A4A4A4] placeholder:text-[12px] placeholder:text-[#777777] placeholder:font-Open  bg-white text-[12px] text-[#1C1C1C] outline-none  "
        required={isRequired}
        onChange={onChange}
        onClick={onClick}
        value={value}
      />
    </div>
  );
};

export default InputWithImage;
