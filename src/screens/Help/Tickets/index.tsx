import React, { useState, useEffect, SetStateAction } from "react";
import SummaryIcon from "../../../assets/serv/Summary.svg";

import { toast } from "react-toastify";
import CustomDropDown from "../../../components/DropDown";
import { ticketTypeOptions } from "../../../utils/dummyData";

const Tickets: React.FunctionComponent = () => {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div className="grid grid-cols-1 gap-y-5 pt-5 ">
      <div className=" flex gap-2">
        <img src={SummaryIcon} alt="Summary Icon" />
        <p className="text-[18px] text-[#202427] font-semibold lg:font-normal font:lato lg:text-2xl ">
          Raise Ticket
        </p>
      </div>

      <div className="flex   ">
        {" "}
        <CustomDropDown
          value={selectedOption}
          options={ticketTypeOptions}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedOption(event.target.value);
          }}
          wrapperClass="mt-4  "
          heading="Select Ticket Type"
        />
        <CustomDropDown
          value={selectedOption}
          options={ticketTypeOptions}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedOption(event.target.value);
          }}
          wrapperClass="mt-4 ml-10 "
          heading="Issues"
        />
      </div>
    </div>
  );
};

export default Tickets;
