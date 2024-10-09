import React from "react";
import OneButton from "../../../../components/Button/OneButton";

interface IPlanSectionProps {}

const PlanSection: React.FunctionComponent<IPlanSectionProps> = (props) => {
  return (
    <>
      <div className="flex flex-col mt-[10px] max-w-[690px]">
        <p className="font-Open text-[15px] font-medium leading-normal tracking-wide text-[#606060]">
          Membership Type
        </p>
        <div className="grid grid-cols-2 gap-[20px] mt-[16px]">
          <div className="px-3 py-4 bg-[#FDFDFD] border-[1px] border-[#EFEFEF] rounded-[5px] h-[80px]">
            <input
              type="radio"
              name="type"
              value={""}
              // disabled={showDownloadLebal}
              className=" mr-2 w-[15px] cursor-pointer h-[15px]"
              // checked={order?.orderType === "B2C" && order?.transit === "FORWARD"}
              // onChange={(e) => {
              //   setOrder({
              //     ...initialState,
              //     orderType: "B2C",
              //     transit: "FORWARD",
              //   });
              //   setResetOtherAddressDetails(true);
              //   setPaymentMode("PREPAID");
              // }}
            />
            <span className="font-Open text-[15px] lg:text-xl font-semibold leading-8 lg:!leading-[26px] ">
              Bronze
            </span>
            <p className="font-Open text-sm text-[#8A9399] font-normal leading-5 ml-4">
              ₹0 / Month{" "}
            </p>
          </div>
          <div className="px-3 py-4 bg-[#FDFDFD] border-[1px] border-[#EFEFEF] rounded-[5px] h-[80px]">
            {" "}
            <input
              type="radio"
              name="type"
              value={""}
              // disabled={showDownloadLebal}
              className=" mr-2 w-[15px] cursor-pointer h-[15px]"
              // checked={order?.orderType === "B2C" && order?.transit === "FORWARD"}
              // onChange={(e) => {
              //   setOrder({
              //     ...initialState,
              //     orderType: "B2C",
              //     transit: "FORWARD",
              //   });
              //   setResetOtherAddressDetails(true);
              //   setPaymentMode("PREPAID");
              // }}
            />
            <span className="font-Open text-[15px] lg:text-xl font-semibold leading-8 lg:!leading-[26px] ">
              Silver
            </span>
            <p className="font-Open text-sm text-[#8A9399] font-normal leading-5 ml-4">
              ₹499 / Month{" "}
            </p>
          </div>
          <div className="px-3 py-4 bg-[#FDFDFD] border-[1px] border-[#EFEFEF] rounded-[5px] h-[80px]">
            {" "}
            <input
              type="radio"
              name="type"
              value={""}
              // disabled={showDownloadLebal}
              className=" mr-2 w-[15px] cursor-pointer h-[15px]"
              // checked={order?.orderType === "B2C" && order?.transit === "FORWARD"}
              // onChange={(e) => {
              //   setOrder({
              //     ...initialState,
              //     orderType: "B2C",
              //     transit: "FORWARD",
              //   });
              //   setResetOtherAddressDetails(true);
              //   setPaymentMode("PREPAID");
              // }}
            />
            <span className="font-Open text-[15px] lg:text-xl font-semibold leading-8 lg:!leading-[26px] ">
              Gold
            </span>
            <p className="font-Open text-sm text-[#8A9399] font-normal leading-5 ml-4">
              ₹999 / Month{" "}
            </p>
          </div>
          <div className="px-3 py-4 bg-[#FDFDFD] border-[1px] border-[#EFEFEF] rounded-[5px] h-[80px]">
            {" "}
            <input
              type="radio"
              name="type"
              value={""}
              // disabled={showDownloadLebal}
              className=" mr-2 w-[15px] cursor-pointer h-[15px]"
              // checked={order?.orderType === "B2C" && order?.transit === "FORWARD"}
              // onChange={(e) => {
              //   setOrder({
              //     ...initialState,
              //     orderType: "B2C",
              //     transit: "FORWARD",
              //   });
              //   setResetOtherAddressDetails(true);
              //   setPaymentMode("PREPAID");
              // }}
            />
            <span className="font-Open text-[15px] lg:text-xl font-semibold leading-8 lg:!leading-[26px] ">
              Platinum
            </span>
            <p className="font-Open text-sm text-[#8A9399] font-normal leading-5 ml-4">
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
