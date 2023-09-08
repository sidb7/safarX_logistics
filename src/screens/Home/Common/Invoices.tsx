import React from "react";
import CustomDropDown from "../../../components/DropDown";

interface IInvoices {
  text?: string;
  img?: string;
  data: any;
  yearArr?: any;
}

const Invoices = (props: IInvoices) => {
  const { text, img, data, yearArr } = props;

  return (
    <div
      className={`border-[1px] border-[#E8E8E8] h-[14rem] rounded-lg overflow-hidden`}
    >
      <div
        className={`flex justify-between items-center h-[3.125rem] px-2  bg-[#F6F6F6]`}
      >
        <div className="flex">
          <img src={img} alt="AnalyticsIcon" />
          <span className="text-[1rem] font-semibold text-[#1C1C1C] ml-4">
            {text}
          </span>
        </div>
        <div>
          <CustomDropDown
            onChange={(e) => {
              console.log("e year :", e.target.value);
            }}
            options={yearArr}
            heading="Select Filter"
            wrapperClass="!bg-white"
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3 mx-6">
        {data?.map((ele: any, i: number) => {
          return (
            <div className="mt-10">
              <span className="py-6 px-8  bg-[#F6F6F6] text-[#004EFF] text-[1.37rem] font-Lato font-semibold h-[2.6rem]">
                {ele?.count}
              </span>
              <p className="text-[#494949] font-Open text-[1rem] font-normal mt-6">
                {ele?.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Invoices;
