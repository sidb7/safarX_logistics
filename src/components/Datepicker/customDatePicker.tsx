import React, { useState } from "react";
import CalendarIcon from "../../assets/calendar.svg";

const DatePicker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const handleDayClick = (day: number) => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day)
    );
    setIsOpen(false);
  };

  const daysArray = Array.from(
    {
      length: new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth() + 1,
        0
      ).getDate(),
    },
    (_, i) => i + 1
  );

  return (
    <></>
    // <div className="relative">
    //   <div className="relative w-full">
    //     <input
    //       readOnly
    //       type="text"
    //       value={selectedDate.toLocaleDateString()}
    //       onClick={() => setIsOpen(!isOpen)}
    //       className="pl-8 pr-2 py-1 w-full cursor-pointer"
    //     />

    //     <img
    //       src={CalendarIcon}
    //       alt=""
    //       className="absolute left-2 top-1/2 transform -translate-y-1/2"
    //     />
    //   </div>
    //   {/*
    //   {isOpen && (
    //     <div className="absolute mt-1 w-64 p-2 bg-white rounded shadow">
    //       {daysArray?.map((day) => (
    //         <button
    //           key={day}
    //           className={`block w-full text-left ${
    //             day === selectedDate.getDate() ? "bg-blue-200" : ""
    //           }`}
    //           onClick={() => handleDayClick(day)}
    //         >
    //           {day}
    //         </button>
    //       ))}
    //     </div>
    //   )} */}
    // </div>
  );
};

export default DatePicker;
