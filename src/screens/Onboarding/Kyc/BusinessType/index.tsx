import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Card from "./card";
import ServiceButton from "../../../../components/Button/ServiceButton";
import CustomBottomModal from "../../../../components/CustomModal/customBottomModal";
import CompanyLogo from "../../../../assets/Navbar/ShipyaariLogos.svg";
import WelcomeHeader from "../welcomeHeader";
import { useNavigate } from "react-router-dom";
import { POST } from "../../../../utils/webService";
import { POST_BUSINESS_TYPE_URL } from "../../../../utils/ApiUrls";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

interface ITypeProps {}

const BusinessType = (props: ITypeProps) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);
  const closeModal = () => setOpenModal(true);
  const isLgScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  const businessType = useSelector(
    (state: any) => state?.onboarding.businessType
  );

  //Calling API on Submit

  const onSubmitBusinessType = async (value: any) => {
    try {
      const payload = { businessType: value };
      const { data: response } = await POST(POST_BUSINESS_TYPE_URL, payload);
      if (response?.success) {
        toast.success(response.message);
        // navigate("/onboarding/kyc-photo"); // temparory hide
        navigate("/onboarding/kyc-otp-form");
        //Navigate Url' go here
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      return error;
    }
  };

  const businessTypeComponent = () => {
    return (
      <div className="px-5 h-screen lg:h-full  lg:px-0">
        <div className="hidden lg:flex justify-between items-center shadow-md h-[60px] px-6 py-4 mb-6 ">
          <img src={CompanyLogo} alt="" />
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
            value="individual"
            title="Individual"
            subTitle="Shipper not having GST"
          />

          <Card
            name="business"
            value="soleProprietor"
            title="Sole Proprietor"
            subTitle="Entity having GST (Proprietorship, Partnership, HUF, AOP, or Charitable Trust etc)"
          />

          <Card
            name="business"
            value="company"
            title="Company"
            subTitle="Entity Registered as Private Ltd, LLP, One Person Company or Public ltd under Companies Act "
          />
        </div>
        <div className="flex flex-col gap-y-4  lg:gap-y-3 lg:items-center lg:justify-center   pb-12 lg:pb-0 lg:mb-6">
          <ServiceButton
            text="PROCEED FOR KYC"
            className="bg-[#1C1C1C] !font-Open !h-[36px] !w-full text-white !py-2 !px-4 lg:!w-[320px] "
            onClick={() => {
              onSubmitBusinessType(businessType);
            }}
          />

          <ServiceButton
            text="SKIP FOR NOW"
            className="!text-[#004EFF] !font-Open  underline !border-none"
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
          className="!p-0 !w-[500px] "
          overlayClassName="!items-center"
        >
          {businessTypeComponent()}
        </CustomBottomModal>
      )}
    </div>
  );
};

export default BusinessType;
