import React from "react";
import UploadFileIcon from "../../assets/common/Upload.svg";

interface propTypes {
  label?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  containerClass?: string;
  inputClassName?: string;
  labelClassName?: string;
  name?: string;
  isDisabled?: boolean;
  inputType?: string;
  isRequired?: boolean;
  type?: string;
  imgSrc?: string;
  uploadText?: string;
}

const InputWithFileUpload = (props: propTypes) => {
  const {
    label,
    value,
    onChange,
    placeholder,
    className,
    containerClass,
    inputClassName,
    labelClassName,
    name,
    isDisabled,
    inputType,
    isRequired = false,
    imgSrc,
    type,
    uploadText,
  } = props;

  return (
    <div className="flex justify-center items-center ">
      <div className={`relative w-[100%] ${inputClassName}`}>
        <input
          placeholder=" "
          type={type ? type : "text"}
          className={`${className}  rounded border-[1px] border-[#A4A4A4] p-[10px] gap-[10px] h-[48px] font-semibold text-[12px] text-[#1C1C1C] outline-none custom-input`}
          required={isRequired}
          title="inputBox"
        />
        <label
          className={`text-[12px] text-[#777777] absolute left-0 top-[50%] leading-4  custom-label ${labelClassName}`}
        >
          {label}
        </label>

        <div className="flex justify-center items-center  gap-2 ">
          <img
            src={imgSrc ? imgSrc : UploadFileIcon}
            alt=""
            className="absolute z-20  right-[8%] top-[30%]  "
          />
          {uploadText}
        </div>
      </div>
    </div>
  );
};

export default InputWithFileUpload;
