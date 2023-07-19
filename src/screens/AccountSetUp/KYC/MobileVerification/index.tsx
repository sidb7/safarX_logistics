import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import WelcomeHeader from "../welcomeHeader";
import ServiceButton from "../../../../components/Button/ServiceButton";
import CustomBottomModal from "../../../../components/CustomModal/customBottomModal";
import MobileVerificationIcon from "../../../../assets/common/MobileVerify.gif";
import { useNavigate } from "react-router-dom";
import CompanyLogo from "../../../../assets/Navbar/ShipyaariLogos.svg";
import CrossLogo from "../../../../assets/cross.svg";
import Input from "../../../../components/Input";
import InputBox from "../../../../components/InputBox";

import Otp from "./otp";

type Props = {};

const Index = (props: Props) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);
  const closeModal = () => setOpenModal(false);

  const isBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  return (
    <div>
  
      <div className="px-5 lg:hidden">
        <WelcomeHeader
          title="Mobile Verification"
          content="Enter the OTP sent to +91-8976500001"
        />
        <div className="mt-[35px]">
          <div className="flex flex-col items-center  mb-10">
            <img
              src={MobileVerificationIcon}
              alt=""
              width={180}
              height={180}
              className="mb-8"
            />
            <div className="mb-4">
              <Otp />
            </div>
            <p className="font-semibold text-[12px] text-[#494949] mb-4">
              00:30 sec
            </p>
            <div className="flex items-center gap-x-2 font-normal text-[12px] mb-4">
              <p className="text-[#494949] ">Don't receive code ?</p>
              <p className="text-[#004EFF]">Resend</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col   mb-12">
          <ServiceButton
            text="DONE"
            className="bg-[#1C1C1C] text-white w-full mb-5"
            onClick={() => {
              navigate("/account/kyc-terms");
            }}
          />
        </div>
      </div>
      
      {isBigScreen && (
        <div className="mx-4 hidden lg:block lg:h-[602px]">
          <CustomBottomModal
            isOpen={openModal}
            onRequestClose={closeModal}
            className="!p-0 !w-[500px] !h-[700px]"
            overlayClassName="flex  items-center"
          >
      <div className="hidden lg:block">
              <div className="flex justify-between items-center shadow-md  p-4 ">
                <img src={CompanyLogo} alt="" />
                <img src={CrossLogo} alt="" onClick={closeModal} />
              </div>
        <WelcomeHeader
          title="Mobile Verification"
          content="Enter the OTP sent to +91-8976500001"
        />
        <div className="mt-[35px]">
          <div className="flex flex-col items-center  mb-10 mx-[90px]">
            <img
              src={MobileVerificationIcon}
              alt=""
              width={180}
              height={180}
              className="mb-8"
            />
            <div className="mb-4 w-full">
              
              <Input label={"Enter OTP"} />
            </div>
            <p className="font-semibold text-[12px] text-[#494949] mb-4">
              00:30 sec
            </p>
            <div className="flex items-center gap-x-2 font-normal text-[12px] mb-4">
              <p className="text-[#494949] ">Don't receive code ?</p>
              <p className="text-[#004EFF]">Resend</p>
            </div>
            <ServiceButton
            text="DONE"
            className="bg-[#1C1C1C] text-white w-full mb-5"
            onClick={() => {
              navigate("/account/kyc-terms");
            }}
          />
          </div>
          
        </div>
        
      </div>
      </CustomBottomModal>
    </div>
    )}
    </div>
  );
};

export default Index;

