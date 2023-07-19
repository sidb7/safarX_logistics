import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Card from "./card";
import ServiceButton from "../../../../components/Button/ServiceButton";
import CustomBottomModal from "../../../../components/CustomModal/customBottomModal";
import CompanyLogo from "../../../../assets/Navbar/ShipyaariLogos.svg";
import CrossLogo from "../../../../assets/cross.svg";
import WelcomeHeader from "../welcomeHeader";
import { useNavigate } from "react-router-dom";

type Props = {};

const BusinessType = (props: Props) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);
  const closeModal = () => setOpenModal(false);

  const isBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  return (
    <div>
      <div className="px-5 relative lg:hidden">
        <WelcomeHeader
          title="Welcome to Shipyaari"
          content="Kindly complete your KYC"
        />

        <div className="flex flex-col items-center  mb-10">
          <p className="font-semibold text-[18px] text-[#1C1C1C] mb-7">
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
            subTitle="Entity having GST(Proprietorship,Partnership,HUF,AOP,or Charitable Trust etc)"
          />

          <Card
            name="business"
            value="Company"
            title="Company"
            subTitle="Entity Registered as Private Ltd, LLP, One Person Company or Public ltd under Companies Act "
          />
        </div>
        <div className="flex flex-col fixed bottom-0 right-5 left-5  pb-12">
          <ServiceButton
            text="PROCEED FOR KYC"
            className="bg-[#1C1C1C]  text-white !py-2 !px-4 mb-4"
            onClick={() => {
              navigate("/account/kyc-photo");
            }}
          />

          <ServiceButton
            text="SKIP FOR NOW"
            className="!text-[#004EFF] !font-semibold !text-[14px]  underline !border-none"
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
            <div className=" relative hidden lg:block">
              <div className="flex justify-between items-center shadow-md  p-4 ">
                <img src={CompanyLogo} alt="" />
                <img src={CrossLogo} alt="" onClick={closeModal} />
              </div>
              <WelcomeHeader
                title="Welcome to Shipyaari"
                content="Kindly complete your KYC"
              />

              <div className="flex flex-col items-center  mb-10 mx-[90px]">
                <p className="font-semibold text-[18px] text-[#1C1C1C] mb-7 lg:mb-3">
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
                  subTitle="Entity having GST(Proprietorship,Partnership,HUF,AOP,or Charitable Trust etc)"
                />

                <Card
                  name="business"
                  value="Company"
                  title="Company"
                  subTitle="Entity Registered as Private Ltd, LLP, One Person Company or Public ltd under Companies Act "
                />
                <div className="flex flex-col pb-12 lg:pb-28 xl:pb-40 w-full">
                  <ServiceButton
                    text="PROCEED FOR KYC"
                    className="bg-[#1C1C1C]  text-white !py-2 !px-4 mb-3 w-full"
                    onClick={() => {
                      navigate("/account/kyc-photo");
                    }}
                  />

                  <ServiceButton
                    text="SKIP FOR NOW"
                    className="!text-[#004EFF] !font-semibold !text-[14px]  underline !border-none"
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

export default BusinessType;
