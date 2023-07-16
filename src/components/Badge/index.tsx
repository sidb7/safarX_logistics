import React from "react";

interface IBadgeProps {
  icon: any;
  iconAlt?: string;
  label: string;
  className: string;
}
export const Badge: React.FunctionComponent<IBadgeProps> = ({
  icon,
  label,
  className,
  iconAlt,
}) => {
  return (
    <div className={` ${className} flex justify-between border-[1px] rounded-sm text-xs font-medium py-1.5 px-3 h-[28px]`}>
      <img src={icon} alt={iconAlt} />
      <span className="ml-1">{label}</span>
    </div>
  );
};
