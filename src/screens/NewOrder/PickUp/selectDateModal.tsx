import React from "react";
import ClockIcon from "../../../assets/common/clock.svg";
import CancelIcon from "../../../assets/common/cancel.svg";
import DynamicButtonScrollComponent from "../../../components/DynamicButtonScroll";
import { dummyDayData, dummyTimeData } from "../../../utils/dummyData";
import Button from "../../../components/Button";

const SelectDateModalContent = () => {
  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex justify-between">
        <div className="flex gap-x-2">
          <img src={ClockIcon} alt="" />
          <h3>Schedule pick up</h3>
        </div>
        <div>
          <img src={CancelIcon} alt="" />
        </div>
      </div>

      <div>
        <DynamicButtonScrollComponent
          items={dummyDayData}
          onClick={() => {
            alert("Hello");
          }}
        />
      </div>

      <div>
        <DynamicButtonScrollComponent
          items={dummyTimeData}
          onClick={() => {
            alert("Hello");
          }}
        />
      </div>

      <div>
        <Button
          text="Save"
          onClick={() => {
            alert("Hello");
          }}
        />
      </div>
    </div>
  );
};

export default SelectDateModalContent;
