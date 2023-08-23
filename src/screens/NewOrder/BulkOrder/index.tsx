import React from "react";
import NavBar from "../../../layout/Old_NavBar";
import BackArrowIcon from "../../../assets/backArrow.svg";
import CustomButton from "../../../components/Button";
import downArrow from "../../../assets/BulkOrder/downArrow.svg";
import uploadIcon from "../../../assets/BulkOrder/uploadIcon.svg";
import WebBackArrowIcon from "../../../assets/BulkOrder/leftArrowWeb.svg";
import ServiceButton from "../../../components/Button/ServiceButton";

const BulkOrder = () => {
  return (
    <div className="h-screen flex flex-col justify-between ">
      <header className="fixed top-0 z-10 w-full ">
        <NavBar />
      </header>
      <div className=" flex flex-col  mt-20">
        <div className="hidden lg:block px-5 ml-12 mb-1 ">
          <p className="font-normal text-[14px] text-[#777777] ">
            Home/
            <span className="font-semibold text-[14px] text-[#1C1C1C]">
              Order
            </span>
          </p>
        </div>

        <div className="flex ml-10 mr-5 gap-x-2">
          <img src={BackArrowIcon} alt="" className="lg:hidden" />
          <img src={WebBackArrowIcon} alt="" className="hidden lg:block " />

          <p className="font-bold  lg:text-[28px] lg:text-[#1C1C1C] ">
            Add Bulk Order
          </p>
        </div>
      </div>
      <div className="flex   flex-col items-center ">
        <div>
          <div className="flex flex-col items-center  ">
            <CustomButton
              showIcon={true}
              icon={uploadIcon}
              text="UPLOAD"
              className="w-[114px] h-[36px] lg:font-semibold lg:text-sm  lg:mb-4 "
              onClick={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
          <p className="text-[16px] font-semibold leading-5  text-center mb-2">
            Drop files here
          </p>
          <p className="text-center text-[12px] font-normal leading-4 text-[#BBBBBB] lg:mb-9 ">
            Pdf, excel files are supported
          </p>
          <div className="flex justify-center  gap-2">
            <img src={downArrow} alt="" />
            <p className="text-[14px] text-[#004EFF] font-semibold border-b-2 border-[#004EFF]">
              SAMPLE FILE
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end px-5   shadow-lg border-[1px]  bg-[#FFFFFF]  p-6 rounded-tr-[24px] rounded-tl-[24px]  w-full ">
        <CustomButton
          className="!bg-[#E8E8E8] !font-medium !text-[14px] !text-[#BBBBBB] lg:hidden"
          text={"continue"}
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        />

        <ServiceButton
          text="CONTINUE"
          className=" hidden lg:block bg-[#E8E8E8] text-[#BBBBBB] !border-none lg:text-sm lg:!py-2 lg:!px-4"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};
export default BulkOrder;
