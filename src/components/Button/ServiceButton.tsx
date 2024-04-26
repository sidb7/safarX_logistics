import React from "react";
import { capitalizeFirstLetterWithExclude } from "../../utils/utility";

interface IServiceButtonProps {
  text?: any;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  btnType?: any;

  icon?: any;
  showIcon?: boolean;
  iconClass?: any;
  id?: any;
}

const ServiceButton = (props: IServiceButtonProps) => {
  const {
    text,
    onClick,
    className,
    disabled,
    btnType,
    icon,
    showIcon,
    iconClass,
    id,
  } = props;

  const excludeWords = ["B2B", "B2C", "KYC","OTP"];

  return (
    <button
      className={` flex items-center font-Open justify-center leading-5 border-[1px] border-[#A4A4A4] rounded  py-[8px] gap-[8px] text-sm font-semibold text-[#1C1C1C] text-center ${className}`}
      disabled={disabled}
      onClick={onClick}
      id={id}
    >
      {showIcon && <img className={`${iconClass} mr-2`} src={icon} alt="" />}{" "}
      <p className="capitalize">
        {" "}
        {capitalizeFirstLetterWithExclude(text, excludeWords)}
      </p>
    </button>
  );
};

export default ServiceButton;
