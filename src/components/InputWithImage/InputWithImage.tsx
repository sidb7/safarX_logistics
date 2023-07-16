import React from "react";
import dummyImage from "../../assets/Delivery/Warehouse.svg";

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

  return (
    <div className="relative flex items-center justify-center  ">
      <img
        src={imgSrc ? imgSrc : dummyImage}
        alt=""
        className="absolute z-20   left-[4%] "
      />

      <div className=" w-[100%]">
        <input
          placeholder={placeholder}
          type="text"
          className="rounded border-[1px] border-[#A4A4A4] placeholder:text-[12px] placeholder:text-[#777777] placeholder:font-normal  bg-white  pl-[12%]  gap-[10px] h-[48px] font-semibold text-[12px] text-[#1C1C1C] outline-none  "
          required={isRequired}
          title="inputWithImage"
          onChange={onChange}
          onClick={onClick}
          value={value}
        />
      </div>
    </div>
  );
};

export default InputWithImage;
