import React from "react";
import NavBar from "../../../../layout/NavBar";
import BackArrow from "../../../../assets/backArrow.svg";
import CardsWithScroll from "./CardsWithScroll";
import { dummyChannelIntegrationData } from "../../../../utils/dummyData";
import ServiceButton from "../../../../components/Button/ServiceButton";

interface IPropsTypes {}

const Index = (props: IPropsTypes) => {
  return (
    <div className="relative">
      <NavBar />
      <div className="flex flex-col p-5 ">
        <div className="flex items-center gap-x-1 mb-5">
          <img src={BackArrow} alt="" />
          <p className="font-bold text-[18px] text-[#1C1C1C]">
            Channel Integration
          </p>
        </div>
        {dummyChannelIntegrationData.map((eachChannelType, index) => {
          return (
            <CardsWithScroll eachChannelType={eachChannelType} key={index} />
          );
        })}
      </div>

      <div className="grid grid-cols-2  shadow-lg border-[1px]  bg-[#FFFFFF] gap-[32px] p-[24px] rounded-tr-[24px] rounded-tl-[24px] w-full  fixed bottom-0">
        <ServiceButton text="BACK" className="bg-[#FFFFFF] text-[#1C1C1C]" />
        <ServiceButton text="SAVE" className="bg-[#1C1C1C] text-[#FFFFFF]" />
      </div>
    </div>
  );
};

export default Index;
