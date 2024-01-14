import React, { useState } from "react";
import ClockIcon from "../../../assets/common/clock.svg";
import CancelIcon from "../../../assets/common/cancel.svg";
import DynamicButtonScrollComponentForDay from "../../../components/DynamicButtonScrollForDay";
import DynamicButtonScrollComponentForTime from "../../../components/DynamicButtonScrollForTime";

import { dummyDayData } from "../../../utils/dummyData";
import Button from "../../../components/Button";
import ServiceButton from "../../../components/Button/ServiceButton";
import CustomDatePicker from "../../../components/Datepicker";
import { start } from "repl";

interface ITypeProps {
  onClick?: any;
  onPickupTimeSelected: (pickupTime: string) => void;
}

export const dummyTimeData = [
  {
    label: "12:00 PM - 03:00 PM",
    value: "12:00 PM - 15:00 PM",
  },
  {
    label: "3:00 PM - 06:00 PM",
    value: "15:00 PM - 18:00 PM",
  },
  {
    label: "6:00 PM - 09:00 PM",
    value: "18:00 PM - 21:00 PM",
  },
];

const currentTime = new Date();

const SelectDateModalContent = (props: ITypeProps) => {
  const { onClick, onPickupTimeSelected } = props;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedScheduleDateTime, setSelectedScheduleDateTime] =
    useState<Date | null>(null);

  const handleDayButtonClick = (selectedDay: string) => {
    if (selectedDay === "schedule") {
      setShowDatePicker(true);
      setSelectedDay(selectedDay);
    } else {
      setShowDatePicker(false);
      setSelectedDay(selectedDay);
      setSelectedTime(null);
      setSelectedScheduleDateTime(null);
    }
  };

  const handleDayButtonClicked = (item: any) => {
    handleDayButtonClick(item.value);
  };

  const handleTimeSlotClick = (time: string) => {
    setSelectedTime(time);
  };

  const handleScheduleDateTimeChange = (selectedDate: Date) => {
    setSelectedScheduleDateTime(selectedDate);
  };

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  };

  const getFormattedTimeRange = (start: Date, end: Date) => {
    const formattedStart = start.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    const formattedEnd = end.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return `${formattedStart} - ${formattedEnd}`;
  };

  const selectedPickupTime = (() => {
    let timeRange = "";

    if (selectedScheduleDateTime) {
      const endTime = new Date(selectedScheduleDateTime);
      endTime.setHours(endTime.getHours() + 1);
      timeRange = getFormattedTimeRange(selectedScheduleDateTime, endTime);

      return `${formatDate(selectedScheduleDateTime)} ${timeRange}`;
    } else if (selectedDay === "today" && selectedTime) {
      return `${formatDate(new Date())} ${selectedTime}`;
    } else {
      return `${
        selectedDay === "tomorrow" ? formatDate(getTomorrowDate()) : selectedDay
      } ${selectedTime}`;
    }
  })();

  if (selectedTime || selectedScheduleDateTime) {
    onPickupTimeSelected(selectedPickupTime);
  }

  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  const filteredTimeData = dummyTimeData.filter((timeSlot) => {
    const [startTime, endTime] = timeSlot.value.split(" - ");
    const [startHour, startMinute] = startTime
      .split(":")
      ?.map((value) => parseInt(value));
    const [endHour, endMinute] = endTime
      .split(":")
      ?.map((value) => parseInt(value));

    if (selectedDay === "tomorrow") {
      return true;
    }

    if (
      currentHour > endHour ||
      (currentHour === endHour && currentMinute >= endMinute)
    ) {
      return false;
    }

    if (selectedDay === "today" && currentHour >= endHour) {
      return false;
    }

    return true;
  });

  return (
    <div className="flex flex-col gap-y-4 px-1 h-screen w-full py-5 ">
      <div className="flex justify-between lg:mb-10 lg:px-5">
        <div className="flex gap-x-2 lg:gap-x-3">
          <img src={ClockIcon} alt="" />
          <h3 className="lg:font-Lato lg:text-2xl lg:text-[#323232]">
            Schedule pick up
          </h3>
        </div>
        <div>
          <img
            src={CancelIcon}
            alt=""
            onClick={onClick}
            className="cursor-pointer"
          />
        </div>
      </div>

      <div className="flex flex-col lg:mb-9 lg:px-5 ">
        <p className="lg:font-bold lg:font-Lato lg:text-xl lg:mb-5 ">Day</p>
        <DynamicButtonScrollComponentForDay
          items={dummyDayData}
          onClick={handleDayButtonClicked}
          selectedDay={selectedDay}
        />
      </div>

      {showDatePicker ? (
        <div className=" lg:block  w-full lg:ml-5">
          <CustomDatePicker onSelect={handleScheduleDateTimeChange} />
        </div>
      ) : (
        <div className="flex flex-col lg:px-5">
          <p className="lg:font-bold lg:font-Lato lg:text-xl lg:mb-5 ">Time</p>
          <DynamicButtonScrollComponentForTime
            items={filteredTimeData}
            selectedTime={selectedTime}
            selectedDay={selectedDay}
            onClick={handleTimeSlotClick}
          />
        </div>
      )}

      <div className="lg:hidden ">
        <Button text="Save" onClick={onClick} />
      </div>

      <div
        className="hidden lg:flex justify-end shadow-lg border-[1px]  bg-[#FFFFFF] p-6  rounded-tr-[32px] rounded-tl-[32px]    fixed bottom-0 "
        style={{ width: "-webkit-fill-available" }}
      >
        <ServiceButton
          text="SAVE"
          onClick={onClick}
          className="bg-[#1C1C1C] text-[#FFFFFF] lg:!py-2 lg:!px-4"
        />
      </div>
    </div>
  );
};

export default SelectDateModalContent;
