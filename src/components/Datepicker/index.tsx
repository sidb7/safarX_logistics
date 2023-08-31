import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/locationStyle.css";

interface ITypeProps {
  onSelect: (selectedDate: Date) => void;
}

const CustomDatePicker = (props: ITypeProps) => {
  const { onSelect } = props;

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="relative flex justify-left">
      <DatePicker
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
      />
    </div>
  );
};

export default CustomDatePicker;
