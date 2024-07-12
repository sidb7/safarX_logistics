import React from "react";
import CourierIcon from "../../../assets/Menu.svg";
import CustomRadioButton from "../../../components/RadioButton/Index";
import CustomDropDown from "../../../components/DropDown";

interface IIndexProps {}

const Index: React.FunctionComponent<IIndexProps> = (props) => {
  return (
    <>
      <div className="border-[1px] rounded-md border-[#E8E8E8] border-[#004EFF] px-4 py-[22px]">
        {/* header section  */}
        <div className="flex justify-between">
          <div className="flex gap-x-2 items-center">
            <img src={CourierIcon} alt="courierIcon" />
            <p className="text-[#1C1C1C] font-Open font-semibold text-[16px] leading-[20px] capitalize">
              Courier Options
            </p>
          </div>
          <div className="flex gap-x-1 items-center">
            <CustomRadioButton
              name="singlePage"
              value="singlePage"
              //   checked={checked === "singlePage"}
              // defaultChecked=""
              onChange={() => {}}
              inputClassName="h-full m-2"
              //   style={{ accentColor: "black" }}
            />
            <span className="font-semibold text-sm font-Open leading-[18px] text-[#323232]">
              Cheapest
            </span>
            <CustomRadioButton
              name="singlePage"
              value="singlePage"
              //   checked={checked === "singlePage"}
              // defaultChecked=""
              onChange={() => {}}
              inputClassName="h-full m-2"
              //   style={{ accentColor: "black" }}
            />
            <span className="font-semibold text-sm font-Open leading-[18px] text-[#323232]">
              Fastest
            </span>
          </div>
        </div>
        {/* selection selection  */}
        <div className="pt-6">
          <CustomDropDown
            onChange={() => {}}
            value={""}
            // placeHolder="Select Service"
            options={[
              {
                label: "Pickup Address",
                value: "Pickup Address",
              },
              {
                label: "Delivery Address",
                value: "Delivery Address",
              },
            ]}
            heading="Select Service"
            wrapperClass="!h-[44px]"
          />
        </div>
      </div>
    </>
  );
};

export default Index;
