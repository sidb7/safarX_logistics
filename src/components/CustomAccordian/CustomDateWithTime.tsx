import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/locationStyle.css";

interface ITypeProps {
  onSelect: (selectedDate: Date) => void;
  disabled?: boolean;
}

const CustomDatePicker = (props: ITypeProps) => {
  const { onSelect, disabled } = props;

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const minTime = new Date();
  minTime.setHours(12, 0, 0, 0);

  const maxTime = new Date();
  maxTime.setHours(21, 0, 0, 0);

  const filterPassedTime = (time: any) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  return (
    <div className="relative flex justify-left">
      <DatePicker
        disabled={disabled}
        selected={selectedDate}
        onChange={(date: Date) => {
          setSelectedDate(date);
          onSelect(date);
        }}
        showTimeSelect
        timeFormat="h:mm aa"
        timeIntervals={180}
        timeCaption="Time"
        dateFormat="MMMM d, yyyy h:mm aa"
        popperPlacement="bottom-start"
        inline
        minDate={new Date()}
        minTime={minTime}
        maxTime={maxTime}
        filterTime={filterPassedTime}
      />
    </div>
  );
};

export default CustomDatePicker;
