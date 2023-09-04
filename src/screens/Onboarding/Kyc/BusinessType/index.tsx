import { useState } from "react";
// import { useMediaQuery } from "react-responsive";
import Card from "./card";
import ServiceButton from "../../../../components/Button/ServiceButton";
import CenterModal from "../../../../components/CustomModal/customCenterModal";
// import CustomBottomModal from "../../../../components/CustomModal/customBottomModal";
import CompanyLogo from "../../../../assets/Navbar/shipyaariLogos.svg";
import WelcomeHeader from "../welcomeHeader";
import { useNavigate } from "react-router-dom";
import { POST } from "../../../../utils/webService";
import { POST_BUSINESS_TYPE_URL } from "../../../../utils/ApiUrls";
import { ResponsiveState } from "../../../../utils/responsiveState";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

interface ITypeProps {}

const BusinessType = (props: ITypeProps) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);
  // const closeModal = () => setOpenModal(true);
  // const isLgScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  const { isLgScreen } = ResponsiveState();
  const businessType = useSelector(
    (state: any) => state?.onboarding.businessType
  );

  //Calling API on Submit

  const onSubmitBusinessType = async (value: any) => {
    try {
      const payload = { businessType: value };
      const { data: response } = await POST(POST_BUSINESS_TYPE_URL, payload);
      if (response?.success) {
        toast.success(response?.message);
        // navigate("/onboarding/kyc-photo"); // temparory hide
        navigate("/onboarding/kyc-form");
        // toast.success(response.message);
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
      <div className="flex flex-col relative w-full !h-full lg:px-0 lg:gap-y-0">
        {isLgScreen && modalTitle()}
        <div className="overflow-y-auto">
          <div className="flex justify-between items-center shadow-md h-[60px] px-6 mb-6 lg:hidden ">
            <img src={CompanyLogo} alt="" />
          </div>

          <WelcomeHeader
            // className="!mt-[85px]"
            title="Welcome to Shipyaari"
            content="Kindly complete your KYC"
          />

          <div className="flex flex-col items-center lg:justify-center mx-5 lg:mx-[90px] lg:mb-3">
            <p className="font-semibold font-Lato text-center text-lg leading-6 text-[#1C1C1C] mb-7 lg:mb-7">
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
              value="business"
              title="Business"
              subTitle="Entity having GST (Proprietorship, Partnership, HUF, AOP, or Charitable Trust etc)"
            />

            <Card
              name="business"
              value="company"
              title="Company"
              subTitle="Entity Registered as Private Ltd, LLP, One Person Company or Public ltd under Companies Act "
            />
          </div>
          <div className="flex flex-col gap-y-4 mx-5 mt-4  lg:gap-y-3 lg:items-center lg:justify-center lg:pb-0 lg:mb-6">
            <ServiceButton
              text="PROCEED FOR KYC"
              className="bg-[#1C1C1C] !font-Open !w-full text-white  !px-4 lg:!w-[320px] "
              onClick={() => {
                onSubmitBusinessType(businessType);
              }}
            />

            <ServiceButton
              text="SKIP FOR NOW"
              className="!text-[#004EFF] !font-Open  underline !border-none mt-3"
              onClick={() => navigate("/onboarding/wallet-recharge")}
            />
          </div>
        </div>
      </div>
    );
  };

  const modalTitle = () => {
    return (
      <div className="product-box sticky p-4 z-10 bg-white flex justify-between items-center w-full h-[60px] top-0">
        <img
          className="my-auto ml-6 object-contain"
          src={CompanyLogo}
          alt="Company Logo"
        />
      </div>
    );
  };
  return (
    <>
      {isLgScreen && openModal && (
        <CenterModal
          shouldCloseOnOverlayClick={false}
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          className="!w-[500px] lg:!h-4/6"
        >
          {businessTypeComponent()}
        </CenterModal>
      )}

      {!isLgScreen && businessTypeComponent()}
    </>
  );
};

export default BusinessType;
