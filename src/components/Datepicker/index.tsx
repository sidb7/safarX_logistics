import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/datePicker.css";

interface ITypeProps {
  onClick?: () => void;
}

const CustomDatePicker = (props: ITypeProps) => {
  const { onClick } = props;

  const [startDate, setStartDate] = useState();
  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date: any) => setStartDate(date)}
        placeholderText="Pick up date"
        className="datePickerWithLogo !w-full rounded h-[48px] border-[#A4A4A4] p-[16px] gap-[16px] "
        wrapperClassName="!w-full"
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={1}
        timeCaption="time"
        dateFormat="MMMM d, yyyy h:mm aa"
        onInputClick={onClick}
      />
    </div>
  );
};

export default CustomDatePicker;
