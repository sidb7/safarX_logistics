import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import WelcomeHeader from "../welcomeHeader";
import ServiceButton from "../../../../components/Button/ServiceButton";
import CustomCheckBox from "../../../../components/CheckBox";
import CompanyLogo from "../../../../assets/Navbar/shipyaariLogos.svg";
import Card from "./Card";
import CustomBottomModal from "../../../../components/CustomModal/customBottomModal";
import { useNavigate } from "react-router-dom";
import { POST } from "../../../../utils/webService";
import {
  POST_ACCEPT_AGREEMENTS,
  LARGE_LOGO,
  WHITE_COMPANYNAME,
} from "../../../../utils/ApiUrls";
import { ResponsiveState } from "../../../../utils/responsiveState";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Spinner } from "../../../../components/Spinner";
import Checkbox from "../../../../components/CheckBox";

interface ITypeProps {}

export const ServiceComponent = (props: ITypeProps) => {
  const [openModal, setOpenModal] = useState(true);
  const [checkbox, setCheckbox] = useState();
  const [acceptTnC, setAcceptTnC] = useState<any>();
  const closeModal = () => setOpenModal(true);
  const [loading, setLoading] = useState(false);
  const isLgScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  const { isMdScreen } = ResponsiveState();
  const navigate = useNavigate();

  const acceptService = async () => {
    try {
      const payload = {
        accepted: checkbox,
        version: "1.0.0",
        acceptNoGST: acceptTnC,
        noGSTVersion: "1.0.0",
      };
      setLoading(true);
      const { data: response } = await POST(POST_ACCEPT_AGREEMENTS, payload);
      if (response?.success) {
        setLoading(false);
        // toast.success(response?.message);
        // navigate("/onboarding/kyc");
        navigate("/onboarding/kyc-form");
      } else {
        setLoading(false);
        toast.error(response?.message);
        navigate("/onboarding/kyc-terms/service-agreement");
      }
    } catch (error) {
      return error;
    }
  };

  const BottomButton = () => {
    return (
      <div className="flex flex-col items-center px-5 md:px-0 pb-4  bg-white">
        {/* <div className="flex items-center md:px-9  self-start my-1 mx-1">
          <CustomCheckBox
            onChange={(e: any) => setCheckbox(e.target.checked)}
            style={{ accentColor: "black" }}
          />
          <p className="font-normal text-[12px] text-[#494949]font-Open">
            I Agree with the terms & conditions
          </p>
        </div> */}

        {/* new checkbox functionality implemented */}
        <div className="font-normal text-[12px] text-[#494949] font-Open md:px-7 self-start my-1 mx-1">
          <Checkbox
            checked={false}
            onChange={(e: any) => setCheckbox(e.value)}
            name={"I Agree with the terms & conditions"}
            label={"I Agree with the terms & conditions"}
            style={{ accentColor: "black" }}
            checkboxClassName="gap-2"
          />
        </div>

        <ServiceButton
          text="ACCEPT AND CONTINUE"
          className={`w-full md:!w-[320px] font-Open  mb-0 ${
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

  useEffect(() => {
    const localAcceptTnC = sessionStorage.getItem("setAcceptTnCStatus") as any;
    setAcceptTnC(localAcceptTnC);
  }, []);

  const serviceCommonComponent = () => {
    return (
      <div
        className={`${
          isMdScreen ? " m-auto  !w-[500px] " : "w-full !h-full"
        }flex flex-col relative md:px-0 md:gap-y-0`}
      >
        <div className={`${isMdScreen ? "custom_shadow" : ""}`}>
          <div className="product-box  bg-white flex justify-between items-center w-full h-[60px] top-0 pl-5">
            <img src={LARGE_LOGO} alt="" className="h-[25px]" />
          </div>
          <WelcomeHeader
            className="!mt-[44px] md:!mt-6"
            title={`Welcome to ${WHITE_COMPANYNAME}`}
            content="Terms & Agreement"
          />
          <div className=" px-5  md:mb-0 md:mx-5 ">
            <Card
              title="SERVICE AGREEMENT"
              subTitleOne="Forward delivery of the shipments"
            />
          </div>
          {BottomButton()}
        </div>
      </div>
    );
  };

  const renderServiceComponent = () => {
    if (isMdScreen) {
      return (
        <>
          {loading ? (
            <div className="flex justify-center items-center h-screen">
              <Spinner />
            </div>
          ) : (
            <div className="flex justify-center items-center h-[100vh] border-4 ">
              {serviceCommonComponent()}
            </div>
          )}
        </>
      );
    } else {
      return loading ? (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Spinner />
        </div>
      ) : (
        <div className="flex justify-center items-center">
          {serviceCommonComponent()}
        </div>
      );
    }
  };
  return <div>{renderServiceComponent()}</div>;
};
