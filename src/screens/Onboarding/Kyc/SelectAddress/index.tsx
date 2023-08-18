import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Card from "./card";
import ServiceButton from "../../../../components/Button/ServiceButton";
import CustomBottomModal from "../../../../components/CustomModal/customBottomModal";
import CompanyLogo from "../../../../assets/Navbar/ShipyaariLogos.svg";
import CrossLogo from "../../../../assets/cross.svg";
import WelcomeHeader from "../welcomeHeader";
import { useNavigate } from "react-router-dom";
import PlusIcon from "../../../../assets/plusIcon.svg";
import CustomInputBox from "../../../../components/Input";
import CustomInputWithFileUpload from "../../../../components/InputBox/InputWithFileUpload";
import { POST } from "../../../../utils/webService";
import { POST_UPDATE_COMPANY_URL } from "../../../../utils/ApiUrls";
type Props = {};

const BusinessType = (props: Props) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);
  const closeModal = () => setOpenModal(true);

  const isLgScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  const onSubmitForm = (e: any) => {
    try {
      e.preventDefault();
    } catch (error) {
      return error;
    }
  };

  const addressComponent = () => {
    return (
      <div className="px-5 lg:px-0">
        <div className=" hidden lg:flex justify-between items-center shadow-md h-[60px] px-6 py-4 mb-6 ">
          <img src={CompanyLogo} alt="" />
        </div>
        <WelcomeHeader
          title="Welcome to Shipyaari"
          content="Tell us more about your company"
        />

        <div className="flex items-center justify-between mt-2 mb-4 lg:px-5  ">
          <p className="font-Open  font-semibold text-sm text-[#1C1C1C]  ">
            Address
          </p>
          <div className="flex justify-self-start gap-x-2 mb-3">
            <img src={PlusIcon} alt="" />
            <p className="text-[#004EFF] text-[14px]">ADD ADDRESS</p>
          </div>
        </div>
        <form onSubmit={onSubmitForm}>
          <div className="flex flex-col lg:px-5 ">
            <div className="mb-4">
              <Card
                name="address"
                value="haryana"
                title="Sauch Tower, Plot No. 72, 3rd Floor,
                  Udyog Vihar, Phase IV, Sector 18, Gurugram – 122 015, Haryana"
                titleClassName="!font-normal !text-[12px]"
              />
            </div>

            <div className="mb-4">
              <CustomInputBox
                label="Brand Name"
                className="font-Open"
                labelClassName="font-Open"
              />
            </div>

            <div className="mb-6">
              <CustomInputWithFileUpload
                label="Upload logo"
                className="font-Open"
              />
            </div>

            <div className="flex flex-col  w-full ">
              <ServiceButton
                text="SUBMIT"
                btnType="submit"
                className="bg-[#1C1C1C]  text-white !py-2 !px-4 mb-3 w-full  font-Open "
                onClick={() => {
                  // navigate("/account/kyc-photo");
                }}
              />
            </div>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div>
      {!isLgScreen && addressComponent()}

      {isLgScreen && (
        <div className="mx-4 hidden lg:block lg:h-[602px]">
          <CustomBottomModal
            isOpen={openModal}
            onRequestClose={closeModal}
            className="!p-0 !w-[500px] !h-[700px]"
            overlayClassName="flex  items-center"
          >
            {addressComponent()}
          </CustomBottomModal>
        </div>
      )}
    </div>
  );
};

export default BusinessType;
