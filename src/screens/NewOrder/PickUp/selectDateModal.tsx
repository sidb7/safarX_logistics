import React, { useState } from "react";
import ClockIcon from "../../../assets/common/clock.svg";
import CancelIcon from "../../../assets/common/cancel.svg";
import DynamicButtonScrollComponentForDay from "../../../components/DynamicButtonScrollForDay";
import DynamicButtonScrollComponentForTime from "../../../components/DynamicButtonScrollForTime";

import { dummyDayData, dummyTimeData } from "../../../utils/dummyData";
import Button from "../../../components/Button";
import ServiceButton from "../../../components/Button/ServiceButton";
import CustomDatePicker from "../../../components/Datepicker";

interface ITypeProps {
  onClick?: any;
  onPickupTimeSelected: (pickupTime: string) => void;
}

const SelectDateModalContent = (props: ITypeProps) => {
  const { onClick, onPickupTimeSelected } = props;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleDayButtonClick = (selectedDay: string) => {
    if (selectedDay === "schedule") {
      setShowDatePicker(true);
      setSelectedDay(selectedDay);
    } else {
      setShowDatePicker(false);
      setSelectedDay(selectedDay);
      setSelectedTime(null);
    }
  };

  const handleDayButtonClicked = (item: any) => {
    handleDayButtonClick(item.value);
  };

  const handleTimeSlotClick = (time: string) => {
    setSelectedTime(time);
  };
  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const selectedPickupTime =
    selectedDay === "today" && selectedTime
      ? `${formatDate(new Date())} ${selectedTime}`
      : `${selectedDay} ${selectedTime}`;
  console.log("selectedPickupTime", selectedPickupTime);

  if (selectedTime) {
    onPickupTimeSelected(selectedPickupTime);
  }
  return (
    <div className="flex flex-col gap-y-8 lg:h-screen lg:w-full lg:py-5 ">
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
        <div className="hidden lg:block mb-7 w-[85%] ml-5">
          <CustomDatePicker />
        </div>
      ) : (
        <div className="flex flex-col lg:px-5">
          <p className="lg:font-bold lg:font-Lato lg:text-xl lg:mb-5 ">Time</p>
          <DynamicButtonScrollComponentForTime
            items={dummyTimeData}
            selectedTime={selectedTime}
            selectedDay={selectedDay}
            onClick={handleTimeSlotClick}
          />
        </div>
      )}

      <div className="lg:hidden">
        <Button
          text="Save"
          onClick={() => {
            alert("Hello");
          }}
        />
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
