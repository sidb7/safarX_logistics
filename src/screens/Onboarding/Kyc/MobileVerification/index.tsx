import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import WelcomeHeader from "../welcomeHeader";
import ServiceButton from "../../../../components/Button/ServiceButton";
import CustomBottomModal from "../../../../components/CustomModal/customBottomModal";
import MobileVerificationIcon from "../../../../assets/common/MobileVerify.gif";
import { useLocation, useNavigate } from "react-router-dom";
import CompanyLogo from "../../../../assets/Navbar/ShipyaariLogos.svg";
import CrossLogo from "../../../../assets/cross.svg";
import CustomInputBox from "../../../../components/Input";

type Props = {};

const Index = (props: Props) => {
  const location = useLocation();

  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);
  const closeModal = () => setOpenModal(false);

  const isLgScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  const mobileVerificationComponent = () => {
    return (
      <div className="px-5 lg:px-0 ">
        <div className="hidden lg:flex justify-between items-center shadow-md h-[60px] px-6 py-4 mb-6 ">
          <img src={CompanyLogo} alt="" />
          <img
            src={CrossLogo}
            alt=""
            onClick={closeModal}
            className="cursor-pointer"
          />
        </div>
        <WelcomeHeader
          title="Mobile Verification"
          content="Enter the OTP sent to +91-8976500001"
        />
        <div className="lg:mb-6 lg:mx-5">
          <div className="flex flex-col lg:items-center  mb-10">
            <img
              src={MobileVerificationIcon}
              alt=""
              width={180}
              height={180}
              className="mb-8 self-center"
            />
            <div className="!w-full mb-2 lg:mb-2">
              <CustomInputBox
                label="Enter OTP"
                containerStyle="lg:!w-auto"
                className="lg:px-16  lg:!w-[320px] !font-Open "
              />
            </div>
            <p className="font-semibold font-Open text-[12px] text-[#494949] mb-4 self-center">
              00:30 sec
            </p>
            <div className="flex items-center gap-x-2 font-normal text-[12px] mb-6  self-center">
              <p className="text-[#494949] font-Open lg:font-normal">
                Don't receive code ?
              </p>
              <p className="text-[#004EFF] font-Open lg:font-semibold">
                Resend
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:justify-center lg:items-center lg:mb-[45px]  ">
          <ServiceButton
            text="DONE"
            className="bg-[#1C1C1C] !font-Open text-white lg:!w-[320px] mb-5"
            onClick={() => {
              if (location.state.path === "otp-form") {
                navigate("/account/kyc-aadhar-form");
              }
              if (location.state.path === "aadhar-form") {
                navigate("/account/kyc-terms/GSTComponent");
              }
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      {!isLgScreen && mobileVerificationComponent()}

      {isLgScreen && (
        <CustomBottomModal
          isOpen={openModal}
          onRequestClose={closeModal}
          className="!p-0 !w-[500px] !h-[650px]"
          overlayClassName="flex  items-center"
        >
          {mobileVerificationComponent()}
        </CustomBottomModal>
      )}
    </div>
  );
};

export default Index;
