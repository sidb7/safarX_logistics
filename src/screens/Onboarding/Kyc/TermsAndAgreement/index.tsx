import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import WelcomeHeader from "../welcomeHeader";
import ServiceButton from "../../../../components/Button/ServiceButton";
import CustomCheckBox from "../../../../components/CheckBox";
import CompanyLogo from "../../../../assets/Navbar/ShipyaariLogos.svg";
import CrossLogo from "../../../../assets/cross.svg";
import Card from "./Card";
import CustomBottomModal from "../../../../components/CustomModal/customBottomModal";

import { useNavigate } from "react-router-dom";

type Props = {};

export const ServiceComponent = (props: Props) => {
  const isLgScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);
  const closeModal = () => setOpenModal(false);
  const [checkbox, setCheckbox] = useState();

  const BottomButton = () => {
    return (
      <div className="flex flex-col items-center  pb-4  bg-white">
        <div className="flex items-center mx-5 self-start mb-6">
          <CustomCheckBox
            onChange={(e: any) => setCheckbox(e.target.checked)}
          />
          <p className="font-normal text-[12px] text-[#494949]font-Open  ">
            I Agree with the terms & conditions
          </p>
        </div>

        <ServiceButton
          text="ACCEPT AND CONTINUE"
          className={`w-full lg:!w-[320px] font-Open  mb-1 mt-2 ${
            checkbox === true
              ? "bg-[#1C1C1C] text-white"
              : "bg-[#E8E8E8] text-[#BBBBBB]"
          }`}
          onClick={() => {
            navigate("/account/kyc-modal");
          }}
        />
      </div>
    );
  };

  const serviceCommonComponent = () => {
    return (
      <div className=" px-5 lg:px-0 ">
        <div className="hidden lg:flex justify-between items-center shadow-md h-[60px] px-6 py-4 mb-6 ">
          <img src={CompanyLogo} alt="" />
          <img src={CrossLogo} alt="" onClick={closeModal} />
        </div>
        <WelcomeHeader
          title="Welcome to Shipyaari"
          content="Terms & Agreement"
        />
        <div className=" mb-4  lg:mb-1 lg:mx-5 ">
          <Card
            title="SERVICE AGREEMENT"
            subTitleOne="Forward delivery of the shipments"
          />
        </div>
        {BottomButton()}
      </div>
    );
  };

  return (
    <div>
      {!isLgScreen && serviceCommonComponent()}

      {isLgScreen && (
        <CustomBottomModal
          isOpen={openModal}
          onRequestClose={closeModal}
          className="!p-0 !w-[500px] !h-[700px]"
          overlayClassName="flex  items-center"
        >
          {serviceCommonComponent()}
        </CustomBottomModal>
      )}
    </div>
  );
};
