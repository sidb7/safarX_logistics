import React from "react";

interface ICustomInputWithIconProps {
  placeholder?: string;
  imgSrc?: string;
  value?: string | number;
  onClick?: () => void;
}

const CustomInputWithIcon: React.FC<ICustomInputWithIconProps> = ({
  placeholder,
  imgSrc,
  value,
  onClick,
}) => {
  return (
    <label className="relative block">
      <span className="sr-only">{placeholder}</span>
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <img src={imgSrc} alt="" className="h-5 w-5 text-slate-300" />
      </span>
      <input
        placeholder={placeholder}
        type="text"
        className="placeholder-italic placeholder-text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        value={value}
        onClick={onClick}
      />
    </label>
  );
};

export default CustomInputWithIcon;
