import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import WelcomeHeader from "../welcomeHeader";
import ServiceButton from "../../../../components/Button/ServiceButton";
import CustomCheckBox from "../../../../components/CheckBox";
import CompanyLogo from "../../../../assets/Navbar/shipyaariLogos.svg";
import Card from "./Card";
import CustomBottomModal from "../../../../components/CustomModal/customBottomModal";
import { useNavigate } from "react-router-dom";
import { POST } from "../../../../utils/webService";
import { POST_ACCEPT_AGREEMENTS } from "../../../../utils/ApiUrls";
import { useSelector } from "react-redux";

interface ITypeProps {}

export const ServiceComponent = (props: ITypeProps) => {
  const isLgScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);
  const closeModal = () => setOpenModal(true);
  const [checkbox, setCheckbox] = useState();

  const acceptTnC = useSelector(
    (state: any) => state?.onboarding.acceptTnCStatus
  );

  const acceptService = async () => {
    try {
      const payload = {
        accepted: checkbox,
        version: "1.0.0",
        acceptNoGST: acceptTnC,
        noGSTVersion: "1.0.0",
      };
      const { data: response } = await POST(POST_ACCEPT_AGREEMENTS, payload);
      if (response?.success) {
        navigate("/onboarding/kyc");
      }
    } catch (error) {
      return error;
    }
  };

  const BottomButton = () => {
    return (
      <div className="flex flex-col items-center px-5 lg:px-0 pb-4  bg-white">
        <div className="flex items-center lg:px-9  self-start mb-6">
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
          disabled={!checkbox}
          onClick={() => {
            acceptService();
          }}
        />
      </div>
    );
  };

  const serviceCommonComponent = () => {
    return (
      <div className="lg:px-0 ">
        <div className=" lg:flex justify-between items-center shadow-md h-[60px] px-6 py-4 mb-6 ">
          <img src={CompanyLogo} alt="" />
        </div>
        <WelcomeHeader
          title="Welcome to Shipyaari"
          content="Terms & Agreement"
        />
        <div className=" px-5 mb-4 lg:mb-1 lg:mx-5 ">
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
          className="!p-0 !w-[500px] "
          overlayClassName="flex  items-center"
        >
          {serviceCommonComponent()}
        </CustomBottomModal>
      )}
    </div>
  );
};
