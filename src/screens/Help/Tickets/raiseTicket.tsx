import React, { useState } from "react";
import { toast } from "react-hot-toast";

const RaiseTickets: React.FunctionComponent = () => {
  return (
    <div className="grid grid-cols-1 gap-y-5 pt-5 ">
      <div className="w-[1164px] h-[168px] rounded-[8px] border border-[#e8e8e8]  shadow-card  text-lg leading-[1.5]">
        <p className="bg-[#E8E8E8]">Tickets Details</p>
        <p>Date Time Priority Support Type</p>
      </div>

      <div className="w-[1164px] h-[268px] bg-[#E8E8E8] rounded-[8px] border border-[#e8e8e8]  shadow-card  text-lg leading-[1.5]">
        <p>Tickets Content</p>
      </div>
    </div>
  );
};

export default RaiseTickets;
