import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Card from "./card";
import ServiceButton from "../../../../components/Button/ServiceButton";
import CustomBottomModal from "../../../../components/CustomModal/customBottomModal";
import CompanyLogo from "../../../../assets/Navbar/ShipyaariLogos.svg";
import CrossLogo from "../../../../assets/cross.svg";
import WelcomeHeader from "../welcomeHeader";
import { useNavigate } from "react-router-dom";

interface ITypeProps {}

const BusinessType = (props: ITypeProps) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);
  const closeModal = () => setOpenModal(false);

  const isLgScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  const businessTypeComponent = () => {
    return (
      <div className="px-5 h-screen lg:h-full  lg:px-0">
        <div className="hidden lg:flex justify-between items-center shadow-md h-[60px] px-6 py-4 mb-6 ">
          <img src={CompanyLogo} alt="" />
          {/* <img
            src={CrossLogo}
            alt=""
            onClick={closeModal}
            className="cursor-pointer"
          /> */}
        </div>

        <WelcomeHeader
          title="Welcome to Shipyaari"
          content="Kindly complete your KYC"
        />

        <div className="flex flex-col items-center lg:justify-center  mb-[96px] lg:mb-6">
          <p className="font-semibold font-Lato text-center text-lg leading-6 text-[#1C1C1C] mb-7 lg:mb-3">
            Please confirm your business type
          </p>
          <Card
            name="business"
            value="Individual"
            title="Individual"
            subTitle="Shipper not having GST"
          />

          <Card
            name="business"
            value="Sole Proprietor"
            title="Sole Proprietor"
            subTitle="Entity having GST (Proprietorship, Partnership, HUF, AOP, or Charitable Trust etc)"
          />

          <Card
            name="business"
            value="Company"
            title="Company"
            subTitle="Entity Registered as Private Ltd, LLP, One Person Company or Public ltd under Companies Act "
          />
        </div>
        <div className="flex flex-col gap-y-4  lg:gap-y-3 lg:items-center lg:justify-center   pb-12 lg:pb-0 lg:mb-6">
          <ServiceButton
            text="PROCEED FOR KYC"
            className="bg-[#1C1C1C] !h-[36px] !w-full text-white !py-2 !px-4 lg:!w-[320px] "
            onClick={() => {
              navigate("/account/kyc-photo");
            }}
          />

          <ServiceButton
            text="SKIP FOR NOW"
            className="!text-[#004EFF]   underline !border-none"
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      {!isLgScreen && businessTypeComponent()}

      {isLgScreen && (
        <CustomBottomModal
          isOpen={openModal}
          onRequestClose={closeModal}
          className="!p-0 !w-[500px] mt-5  "
          overlayClassName="!items-center"
        >
          {businessTypeComponent()}
        </CustomBottomModal>
      )}
    </div>
  );
};

export default BusinessType;
