import { useEffect, useState } from "react";
// import { useMediaQuery } from "react-responsive";
import Card from "./card";
import ServiceButton from "../../../../components/Button/ServiceButton";
// import CenterModal from "../../../../components/CustomModal/customCenterModal";
// import CustomBottomModal from "../../../../components/CustomModal/customBottomModal";
import CompanyLogo from "../../../../assets/Navbar/shipyaariLogos.svg";
import WelcomeHeader from "../welcomeHeader";
import { useNavigate } from "react-router-dom";
import { POST } from "../../../../utils/webService";
import { POST_BUSINESS_TYPE_URL } from "../../../../utils/ApiUrls";
import { ResponsiveState } from "../../../../utils/responsiveState";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Spinner } from "../../../../components/Spinner";

interface ITypeProps {}

const BusinessType = (props: ITypeProps) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);
  const [loading, setLoading] = useState(false);
  const { isLgScreen, isMdScreen } = ResponsiveState();

  const [checked, setChecked] = useState<any>({
    individual: false,
    bussiness: false,
    company: false,
  });
  useEffect(() => {
    // Attempt to retrieve the userInfo object from sessionStorage
    const userInfoString = sessionStorage.getItem("userInfo");
    let initialBusinessType = "";

    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      // Check if businessType is available in userInfo
      if (userInfo.businessType) {
        initialBusinessType = userInfo.businessType;
        // Also ensure businessType is set as a standalone item in sessionStorage
        sessionStorage.setItem("businessType", initialBusinessType);
      }
    }

    // If not found in userInfo, attempt to retrieve it directly from sessionStorage
    if (!initialBusinessType) {
      initialBusinessType = sessionStorage.getItem("businessType") || "";
    }

    // Use the found businessType to set the initial checked state
    if (initialBusinessType) {
      setChecked((prevState: any) => ({
        ...prevState,
        [initialBusinessType.toLowerCase()]: true,
      }));
    }
  }, []);

  //Calling API on Submit

  const onSubmitBusinessType = async () => {
    try {
      let businessType = sessionStorage.getItem("businessType");
      const payload = { businessType };
      setLoading(true);
      const { data: response } = await POST(POST_BUSINESS_TYPE_URL, payload);
      if (response?.success) {
        // toast.success(response?.message);
        setLoading(false);

        // navigate("/onboarding/kyc-photo"); // temparory hide
        // navigate("/onboarding/kyc-form");
        if (payload.businessType === "individual") {
          navigate("/onboarding/kyc-terms/gst-agreement");
        } else {
          navigate("/onboarding/kyc-terms/service-agreement");
        }

        // toast.success(response?.message);
        //Navigate Url' go here
      } else {
        toast.error("Please Select One Of The Above Business Type");
        setLoading(false);
      }
    } catch (error) {
      return error;
    }
  };

  const businessTypeComponent = () => {
    return (
      <>
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <Spinner />
          </div>
        ) : (
          <div
            className={`${
              isMdScreen ? " m-auto  !w-[500px] " : "w-full !h-full"
            }flex flex-col relative md:px-0 md:gap-y-0`}
          >
            {/* {isLgScreen && modalTitle()} */}
            <div className={`${isMdScreen ? "custom_shadow" : ""}`}>
              <div className="product-box flex justify-between items-center w-full h-[60px] top-0 pl-5">
                <img
                  className="my-auto  object-contain"
                  src={CompanyLogo}
                  alt="Company Logo"
                />
              </div>
              <div className="customScroll">
                {/* <div className="flex justify-between items-center h-[60px] px-6 mb-6 lg:hidden ">
                <img src={CompanyLogo} alt="" />
              </div> */}

                <WelcomeHeader
                  className="!mt-[44px] md:!mt-6"
                  title="Welcome to Shipyaari"
                  content="Kindly complete your KYC"
                />

                <div className="flex flex-col items-center gap-y-4 md:justify-center mx-5 md:mx-[90px] md:mb-3">
                  <p className="font-semibold font-Lato text-center text-lg leading-6 text-[#1C1C1C] mb-7 md:mb-3">
                    Please confirm your business type
                  </p>
                  <Card
                    name="business"
                    value="individual"
                    title="Individual"
                    subTitle="Shipper not having GST"
                    checked={checked.individual}
                    setChecked={setChecked}
                    onClick={setChecked}
                  />

                  {console.log("checked.business", checked.bussiness) as any}
                  <Card
                    name="business"
                    value="business"
                    title="Business"
                    subTitle="Entity having GST (Proprietorship, Partnership, HUF, AOP, or Charitable Trust etc)"
                    checked={checked.business}
                    setChecked={setChecked}
                    onClick={setChecked}
                  />

                  <Card
                    name="business"
                    value="company"
                    title="Company"
                    subTitle="Entity Registered as Private Ltd, LLP, One Person Company or Public ltd under Companies Act "
                    checked={checked.company}
                    setChecked={setChecked}
                    onClick={setChecked}
                  />
                </div>
                <div className="flex flex-col gap-y-4 mx-5 mt-[96px] md:mt-6 md:gap-y-3 md:items-center md:justify-center md:pb-0 md:mb-3">
                  <ServiceButton
                    text="PROCEED FOR KYC"
                    className="bg-[#1C1C1C] !font-Open !w-full text-white  !px-4 md:!w-[320px] "
                    onClick={() => {
                      onSubmitBusinessType();
                    }}
                  />

                  <ServiceButton
                    text="SKIP FOR NOW"
                    className="!text-[#004EFF] !font-Open  underline !border-none"
                    onClick={() => navigate("/dashboard/overview")}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  const modalTitle = () => {
    return (
      <div className="product-box sticky z-10 bg-white flex justify-between items-center w-full h-[60px] top-0 pl-5">
        <img
          className="my-auto  object-contain"
          src={CompanyLogo}
          alt="Company Logo"
        />
      </div>
    );
  };

  const renderBusinessType = () => {
    if (isMdScreen) {
      return (
        <div className="flex justify-center items-center h-screen">
          {businessTypeComponent()}
        </div>
      );
    } else {
      return loading ? (
        <div className="fixed top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Spinner />
        </div>
      ) : (
        businessTypeComponent()
      );
    }
  };
  return <>{renderBusinessType()}</>;
};

export default BusinessType;
