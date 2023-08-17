import React from "react";

interface IServiceButtonProps {
  text?: any;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  btnType?: any;

  icon?: any;
  showIcon?: boolean;
  iconClass?: any;
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
  } = props;

  console.log("disabled", disabled);

  return (
    <button
      className={` flex items-center font-Open justify-center leading-5 border-[1px] border-[#A4A4A4] rounded  py-[8px] gap-[8px] text-sm font-semibold text-[#1C1C1C] text-center ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {showIcon && <img className={`${iconClass} mr-2`} src={icon} alt="" />}{" "}
      {text}
    </button>
  );
};

export default ServiceButton;
