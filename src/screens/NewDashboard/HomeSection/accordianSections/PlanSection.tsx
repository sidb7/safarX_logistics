import React from "react";
import OneButton from "../../../../components/Button/OneButton";
import CustomRadioButton from "../../../../components/RadioButton/Index";

interface IPlanSectionProps {}

const PlanSection: React.FunctionComponent<IPlanSectionProps> = (props) => {
  return (
    <>
      <div className="flex flex-col mt-[10px] max-w-[690px]">
        <p className="font-Open text-[15px] font-medium leading-normal tracking-wide text-[#606060]">
          Membership Type
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] mt-[16px]">
          <div className="px-3 py-4 bg-[#FDFDFD] border-[1px] border-[#EFEFEF] rounded-[5px]">
            <div className="flex items-center">
              <CustomRadioButton
                name="Bronze"
                value="bronze"
                // checked={checked === "singlePage"}
                // defaultChecked=""
                onChange={() => {}}
                inputClassName="h-full m-2"
                style={{ accentColor: "black" }}
              />
              <span className="font-Open text-[15px] lg:text-lg font-semibold leading-8 lg:!leading-[22px] ">
                Bronze
              </span>
            </div>
            <p className="font-Open text-sm text-[#8A9399] font-normal leading-5 ml-[30px]">
              ₹0 / Month{" "}
            </p>
          </div>
          <div className="px-3 py-4 bg-[#FDFDFD] border-[1px] border-[#EFEFEF] rounded-[5px] h-[80px]">
            <div className="flex items-center">
              <CustomRadioButton
                name="Bronze"
                value="bronze"
                // checked={checked === "singlePage"}
                // defaultChecked=""
                onChange={() => {}}
                inputClassName="h-full m-2"
                style={{ accentColor: "black" }}
              />
              <span className="font-Open text-[15px] lg:text-lg font-semibold leading-8 lg:!leading-[22px] ">
                Silver
              </span>
            </div>
            <p className="font-Open text-sm text-[#8A9399] font-normal leading-5 ml-[30px]">
              ₹499 / Month
            </p>
          </div>
          <div className="px-3 py-4 bg-[#FDFDFD] border-[1px] border-[#EFEFEF] rounded-[5px] h-[80px]">
            <div className="flex items-center">
              <CustomRadioButton
                name="Bronze"
                value="bronze"
                // checked={checked === "singlePage"}
                // defaultChecked=""
                onChange={() => {}}
                inputClassName="h-full m-2"
                style={{ accentColor: "black" }}
              />
              <span className="font-Open text-[15px] lg:text-lg font-semibold leading-8 lg:!leading-[22px] ">
                Gold
              </span>
            </div>
            <p className="font-Open text-sm text-[#8A9399] font-normal leading-5 ml-[30px]">
              ₹999 / Month
            </p>
          </div>
          <div className="px-3 py-4 bg-[#FDFDFD] border-[1px] border-[#EFEFEF] rounded-[5px] h-[80px]">
            <div className="flex items-center">
              <CustomRadioButton
                name="Bronze"
                value="bronze"
                // checked={checked === "singlePage"}
                // defaultChecked=""
                onChange={() => {}}
                inputClassName="h-full m-2"
                style={{ accentColor: "black" }}
              />
              <span className="font-Open text-[15px] lg:text-lg font-semibold leading-8 lg:!leading-[22px] ">
                Platinum
              </span>
            </div>
            <p className="font-Open text-sm text-[#8A9399] font-normal leading-5 ml-[30px]">
              Custom
            </p>
          </div>
        </div>
        <div className="flex justify-between pt-5">
          <OneButton
            text={"Pay Now"}
            onClick={() => {}}
            variant="tertiary"
            className="!bg-transparent"
          />

          <OneButton
            text={"Click Here To Know More"}
            onClick={() => {}}
            variant="tertiary"
            className="!bg-transparent"
          />
        </div>
      </div>
    </>
  );
};

export default PlanSection;
