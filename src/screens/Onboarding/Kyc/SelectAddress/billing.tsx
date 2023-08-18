import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Card from "./card";
import ServiceButton from "../../../../components/Button/ServiceButton";
import CustomBottomModal from "../../../../components/CustomModal/customBottomModal";
import CompanyLogo from "../../../../assets/Navbar/ShipyaariLogos.svg";
import CrossLogo from "../../../../assets/cross.svg";
import WelcomeHeader from "../welcomeHeader";
import { useNavigate } from "react-router-dom";
import AddButton from "../../../../components/Button/addButton";
import PlusIcon from "../../../../assets/plusIcon.svg";
import CustomInputBox from "../../../../components/Input";
import CustomInputWithFileUpload from "../../../../components/InputBox/InputWithFileUpload";

interface ITypeProps {}

const Billing = (props: ITypeProps) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);
  const closeModal = () => setOpenModal(true);

  const isLgScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  const addressComponent = () => {
    return (
      <div className="relative">
        <div className="px-5 lg:px-0">
          <div className=" hidden lg:flex justify-between items-center shadow-md h-[60px] px-6 py-4 mb-6 ">
            <img src={CompanyLogo} alt="" />
          </div>
          <WelcomeHeader
            title="Welcome to Shipyaari"
            content="Select your Billing Address"
          />

          <div className="w-full lg:flex lg:justify-center ">
            <div className="flex items-center justify-between     mt-2 mb-4 lg:px-5 lg:w-[320px] ">
              <p className="font-Open  font-semibold text-sm text-[#1C1C1C] leading-5  ">
                Default
              </p>

              <AddButton
                onClick={() => {}}
                text={"ADD ADDRESS"}
                icon={PlusIcon}
                showIcon={true}
                className="!bg-transparent !border-0"
                textClassName="!font-semibold !text-sm !leading-5 !font-Open"
              />
            </div>
          </div>

          <div className="flex flex-col items-center  lg:px-5 ">
            <Card
              name="address"
              value="haryana"
              isSubContent={true}
              subContent="GST"
              cardClassName="mb-6"
              title="Sauch Tower, Plot No. 72, 3rd Floor,
                  Udyog Vihar, Phase IV, Sector 18, Gurugram – 122 015, Haryana"
              titleClassName="!font-normal !text-[12px]"
            />
          </div>
          <div className="flex flex-col items-center lg:px-5 lg:h-[215px] lg:overflow-y-scroll ">
            <p
              className={`${
                !isLgScreen ? "self-start" : ""
              }   font-Open font-semibold text-sm text-[#1C1C1C] mb-4 lg:w-[320px]`}
            >
              Maharastra(4 Address Found)
            </p>
            <div className="  space-y-3 mb-6 ">
              <Card
                name="address"
                value="haryana"
                isSubContent={true}
                subContent="GST"
                title="Sauch Tower, Plot No. 72, 3rd Floor,
                  Udyog Vihar, Phase IV, Sector 18, Gurugram – 122 015, Haryana"
                titleClassName="!font-normal !text-[12px]"
              />

              <Card
                name="address"
                value="haryana"
                isSubContent={true}
                subContent="GST"
                title="Sauch Tower, Plot No. 72, 3rd Floor,
                  Udyog Vihar, Phase IV, Sector 18, Gurugram – 122 015, Haryana"
                titleClassName="!font-normal !text-[12px]"
              />

              <Card
                name="address"
                value="haryana"
                isSubContent={true}
                subContent="Aadhar"
                title="Sauch Tower, Plot No. 72, 3rd Floor,
                  Udyog Vihar, Phase IV, Sector 18, Gurugram – 122 015, Haryana"
                titleClassName="!font-normal !text-[12px]"
              />

              <Card
                name="address"
                value="haryana"
                isSubContent={true}
                subContent="Aadhar"
                title="Sauch Tower, Plot No. 72, 3rd Floor,
                  Udyog Vihar, Phase IV, Sector 18, Gurugram – 122 015, Haryana"
                titleClassName="!font-normal !text-[12px]"
              />
            </div>

            <p
              className={` ${
                !isLgScreen ? "self-start" : ""
              } font-Open  font-semibold text-sm text-[#1C1C1C] mb-4 lg:w-[320px]`}
            >
              Gujrat(3 Address Found)
            </p>

            <div className="space-y-3 mb-6 ">
              <Card
                name="address"
                value="haryana"
                isSubContent={true}
                subContent="GST"
                title="1st Floor, Plot A 3/4, Panchavati Township, Near Intercity Hall, Puna Kumbharia Road, Surat - 395 010"
                titleClassName="!font-normal !text-[12px]"
              />

              <Card
                name="address"
                value="haryana"
                isSubContent={true}
                subContent="Aadhar"
                title="1st Floor, Plot A 3/4, Panchavati Township, Near Intercity Hall, Puna Kumbharia Road, Surat - 395 010"
                titleClassName="!font-normal !text-[12px]"
              />

              <Card
                name="address"
                value="haryana"
                isSubContent={true}
                subContent="GST"
                title="1st Floor, Plot A 3/4, Panchavati Township, Near Intercity Hall, Puna Kumbharia Road, Surat - 395 010"
                titleClassName="!font-normal !text-[12px]"
              />
            </div>
          </div>

          {isLgScreen && (
            <div className="flex mt-6  lg:justify-center lg:items-center  pb-12 ">
              <ServiceButton
                text="SUBMIT"
                className="bg-[#1C1C1C] text-white w-full mb-5 lg:!w-[320px]"
                onClick={() => {
                  navigate("/onboarding/select-address-pickup");
                }}
              />
            </div>
          )}
        </div>

        {!isLgScreen && (
          <div
            className={`shadow-lg border-[1px] h-[84px]  bg-[#FFFFFF] gap-[32px] p-[24px] rounded-tr-[24px] rounded-tl-[24px] fixed  bottom-0`}
            style={{ width: "-webkit-fill-available" }}
          >
            <ServiceButton
              text="SUBMIT"
              className="bg-[#1C1C1C] !h-[36px] text-white !py-2 !px-4 mb-3 w-full  font-Open "
              onClick={() => {
                navigate("/onboarding/select-address-pickup");
              }}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {!isLgScreen && addressComponent()}

      {isLgScreen && (
        <div className="mx-4 hidden lg:block ">
          <CustomBottomModal
            isOpen={openModal}
            onRequestClose={closeModal}
            className="!p-0 !w-[500px] !h-[700px] overflow-y-auto"
            overlayClassName="flex  items-center"
          >
            {addressComponent()}
          </CustomBottomModal>
        </div>
      )}
    </div>
  );
};

export default Billing;
