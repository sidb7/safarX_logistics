import React from "react";

interface INotificationCardProps {
  label?: any;
  date?: any;
  time?: any;
  className?: any;
  key?: any;
}

const NotificationCard: React.FunctionComponent<INotificationCardProps> = (
  props: INotificationCardProps
) => {
  const { label, date, time, className, key } = props;
  return (
    <div className={`${className} border-[1px] border-[#E8E8E8] rounded-lg `}>
      <div className="p-4" key={key}>
        <p className="font-Open text-base text-[#1C1C1C] font-semibold leading-[22px]">
          {label}
        </p>
        <span className="font-Open text-sm font-semibold leading-[18px] text-[#777] pr-1">
          {date}
        </span>
        <span className="font-Open text-sm text-[#777] font-normal leading-[18px]">
          {`| ${time} `}
        </span>
      </div>
    </div>
  );
};

export default NotificationCard;
