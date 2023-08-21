import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/locationStyle.css";

interface ITypeProps {
  onSelect: (selectedDate: Date) => void; // Change the prop name
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
          onSelect(date); // Notify parent component of the selected date
        }}
        showTimeSelect
        timeFormat="h:mm aa"
        timeIntervals={60}
        timeCaption="Time"
        dateFormat="MMMM d, yyyy h:mm aa"
        popperPlacement="bottom-start" // Open the picker directly without input
        inline // Display the picker inline
      />
    </div>
  );
};

export default CustomDatePicker;
