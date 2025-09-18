import React from "react";
import { Link } from "react-router-dom";

interface INotificationCardProps {
  label?: any;
  description?: any;
  time?: any;
  media?: any;
}

const NotificationCard: React.FunctionComponent<INotificationCardProps> = (
  props: INotificationCardProps
) => {
  const { label, description, time, media } = props;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);

    // Manually add 5 hours and 30 minutes
    date.setMinutes(date.getMinutes() + 330); // 5*60 + 30 = 330 minutes

    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Kolkata", // optional now since we've adjusted manually
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    const formatted = new Intl.DateTimeFormat("en-IN", options).formatToParts(
      date
    );

    let day = "";
    let month = "";
    let hour = "";
    let minute = "";
    let dayPeriod = "";

    formatted.forEach(({ type, value }) => {
      if (type === "day") day = value;
      if (type === "month") month = value;
      if (type === "hour") hour = value;
      if (type === "minute") minute = value;
      if (type === "dayPeriod") dayPeriod = value.toLowerCase();
    });

    const getDaySuffix = (d: string) => {
      const dayNum = parseInt(d);
      if (dayNum > 3 && dayNum < 21) return "th";
      switch (dayNum % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    const formattedDate = `${day}${getDaySuffix(day)} ${month}`;
    const formattedTime = `${hour}:${minute} ${dayPeriod}`;

    return { formattedDate, formattedTime };
  };

  const { formattedDate, formattedTime } = formatDate(time);
  return (
    <>
      <div className="bg-white rounded-lg shadow-[0px_7px_4px_0px_rgba(0,0,0,0.02),0px_3px_3px_0px_rgba(0,0,0,0.03),0px_1px_2px_0px_rgba(0,0,0,0.03)] border-l-[3px] border-[#0085FF]">
        <div className="flex flex-col px-4 py-[10px] gap-2">
          {/* Heading and date */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h2 className="font-Open text-base font-semibold leading-5 text-[#141414]">
              {label}
            </h2>
            <p className="font-Open text-xs text-[#777] font-semibold leading-[18px] whitespace-nowrap mt-1 md:mt-0">
              {formattedDate} |{" "}
              <span className="font-normal">{formattedTime}</span>
            </p>
          </div>

          {/* Description */}
          <p className="font-Open text-sm font-normal leading-5 text-[#141414] tracking-wide">
            {description}
          </p>

          {/* Links */}

          {media?.length > 0 && (
            <div className="flex gap-x-3 px-2 pt-2 text-sm font-medium text-[#160783]">
              {media.map((item: any, idx: any) => (
                <Link
                  key={idx}
                  className="hover:underline"
                  to={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.type}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationCard;
