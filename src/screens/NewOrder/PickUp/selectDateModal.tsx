import React from "react";
import ClockIcon from "../../../assets/common/clock.svg";
import CancelIcon from "../../../assets/common/cancel.svg";
import DynamicButtonScrollComponent from "../../../components/DynamicButtonScroll";
import { dummyDayData, dummyTimeData } from "../../../utils/dummyData";
import Button from "../../../components/Button";
import ServiceButton from "../../../components/Button/ServiceButton";

interface ITypeProps {
  onClick?: any;
}

const SelectDateModalContent = (props: ITypeProps) => {
  const { onClick } = props;

  return (
    <div className="flex flex-col gap-y-8 lg:h-screen lg:w-full lg:py-5 ">
      <div className="flex justify-between lg:mb-10 lg:px-5">
        <div className="flex gap-x-2 lg:gap-x-3">
          <img src={ClockIcon} alt="" />
          <h3 className="lg:font-normal lg:text-2xl lg:text-[#323232]">
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
        <p className="lg:font-bold lg:text-xl lg:mb-5 ">Day</p>
        <DynamicButtonScrollComponent
          items={dummyDayData}
          onClick={() => {
            alert("Hello");
          }}
        />
      </div>

      <div className="flex flex-col lg:px-5">
        <p className="lg:font-bold lg:text-xl lg:mb-5 ">Time</p>

        <DynamicButtonScrollComponent
          items={dummyTimeData}
          onClick={() => {}}
        />
      </div>

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
