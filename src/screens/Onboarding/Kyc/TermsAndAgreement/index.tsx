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
import { toast } from "react-toastify";

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
        toast.success(response?.message);
        navigate("/onboarding/kyc");
      } else {
        toast.error(response?.message);
        navigate("/onboarding/kyc-terms/service-agreement");
      }
    } catch (error) {
      return error;
    }
  };

  const BottomButton = () => {
    return (
      <div className="flex flex-col items-center px-5 lg:px-0 pb-4  bg-white">
        <div className="flex items-center lg:px-9  self-start my-1">
          <CustomCheckBox
            onChange={(e: any) => setCheckbox(e.target.checked)}
          />
          <p className="font-normal text-[12px] text-[#494949]font-Open">
            I Agree with the terms & conditions
          </p>
        </div>

        <ServiceButton
          text="ACCEPT AND CONTINUE"
          className={`w-full lg:!w-[320px] font-Open  mb-0 ${
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
        <div className="product-box sticky z-10 bg-white flex justify-between items-center w-full h-[60px] top-0 pl-5">
          <img src={CompanyLogo} alt="" />
        </div>
        <WelcomeHeader
          title="Welcome to Shipyaari"
          content="Terms & Agreement"
        />
        <div className=" px-5  lg:mb-0 lg:mx-5 ">
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
          className="!p-0 !w-[500px] !h-[700px] overflow-y-scroll"
          overlayClassName="flex  items-center"
        >
          {serviceCommonComponent()}
        </CustomBottomModal>
      )}
    </div>
  );
};
