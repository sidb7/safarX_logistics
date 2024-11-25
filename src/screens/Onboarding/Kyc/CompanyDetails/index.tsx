import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import WelcomeHeader from "../welcomeHeader";
import ServiceButton from "../../../../components/Button/ServiceButton";
import CustomInputBox from "../../../../components/InputBox";
import CustomInputWithFileUpload from "../../../../components/InputBox/InputWithFileUpload";
import CustomBottomModal from "../../../../components/CustomModal/customBottomModal";
import CompanyLogo from "../../../../assets/Navbar/shipyaariLogos.svg";
import CrossLogo from "../../../../assets/cross.svg";
import { COMPANY_NAME } from "../../../../utils/ApiUrls";

type Props = {};

const Index = (props: Props) => {
  const [openModal, setOpenModal] = useState(true);
  const closeModal = () => setOpenModal(true);

  const isBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  return (
    <div>
      <div className="lg:hidden">
        <div className=" lg:hidden flex justify-between items-center shadow-md  p-4 ">
          <img src={CompanyLogo} alt="" />
        </div>
        <WelcomeHeader
          className="mt-[58px]"
          title={`Welcome to ${COMPANY_NAME || "Shipyaari"}`}
          content="Tell us more about your company"
        />
        <div className="flex flex-col px-5 gap-y-5 mb-5">
          <CustomInputBox label="Full Address" />
          <CustomInputBox label="Pin code" />
          <CustomInputBox label="City" />
          <CustomInputBox label="State" />
          <CustomInputBox label="Brand Name" />

          <CustomInputWithFileUpload label="Upload Logo" />
        </div>
        <div className="flex flex-col   pb-12">
          <ServiceButton
            text="SUBMIT"
            className="bg-[#1C1C1C] text-white w-full mb-5"
          />
        </div>
      </div>

      {isBigScreen && (
        <div className="mx-4 hidden lg:block lg:h-[602px]">
          <CustomBottomModal
            isOpen={openModal}
            onRequestClose={closeModal}
            className="!p-0 !w-[500px] "
            overlayClassName="flex  items-center"
          >
            <div className="hidden lg:block">
              <div className="flex justify-between items-center shadow-md  p-4 ">
                <img src={CompanyLogo} alt="" />
              </div>
              <WelcomeHeader
                className="lg:!mt-[58px]"
                title={`Welcome to ${COMPANY_NAME || "Shipyaari"}`}
                content="Tell us more about your company"
              />
              <div className="flex flex-col gap-y-5 mb-5 mx-[90px]">
                <CustomInputBox label="Plot no, floor, building name" />
                <CustomInputBox label="Landmark" />
                <div className="flex gap-x-4">
                  <CustomInputBox label="City" />
                  <CustomInputBox label="Pincode" />
                </div>
                <div className="flex gap-x-4">
                  <CustomInputBox label="State" />
                  <CustomInputBox label="Country" />
                </div>
                <CustomInputBox label="Brand Name" />

                <CustomInputWithFileUpload label="Upload Logo" />
                <ServiceButton
                  text="SUBMIT"
                  className="bg-[#1C1C1C] text-white w-full mb-5"
                />
              </div>
              <div className="flex flex-col   pb-12"></div>
            </div>
          </CustomBottomModal>
        </div>
      )}
    </div>
  );
};

export default Index;
