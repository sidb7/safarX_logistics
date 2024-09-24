import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import WelcomeHeader from "../welcomeHeader";
import ServiceButton from "../../../../components/Button/ServiceButton";
import CustomCheckBox from "../../../../components/CheckBox";
import CompanyLogo from "../../../../assets/Navbar/shipyaariLogos.svg";
import CustomBottomModal from "../../../../components/CustomModal/customBottomModal";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { POST } from "../../../../utils/webService";
import {
  GST_AGREEMENTS,
  LARGE_LOGO,
  COMPANY_NAME,
} from "../../../../utils/ApiUrls";
import { toast } from "react-hot-toast";
import { Spinner } from "../../../../components/Spinner";
import { ResponsiveState } from "../../../../utils/responsiveState";
import Checkbox from "../../../../components/CheckBox";
import OneButton from "../../../../components/Button/OneButton";
import GstContent from "./gstAgreementContent";

interface ITypeProps {}

export const GSTComponent = (props: ITypeProps) => {
  const signInState = useSelector((state: any) => state?.signin);

  const isBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);
  const closeModal = () => setOpenModal(true);
  const [checkbox, setCheckbox] = useState();
  const [userState, setIsUserState] = useState<any>();

  const [loading, setLoading] = useState(false);
  const { isMdScreen } = ResponsiveState();

  const userName = localStorage.getItem("fullname")?.replace(/,/g, " ");
  const userNameForGst = localStorage.getItem("userName");
  useEffect(() => {
    let data = localStorage.getItem("userInfo") as any;
    data = JSON.parse(data);

    if (data !== "" && data !== null) {
      setIsUserState(data);
    }
  }, []);

  const acceptStatus = async () => {
    let name;
    if (userState?.firstName === undefined) {
      name = userState?.name;
    } else {
      name = userState?.firstName + " " + userState?.lastName;
    }

    const payload = { entityName: name, businessType: "logistics" };
    setLoading(true);
    const { data: responses } = await POST(GST_AGREEMENTS, payload);

    try {
      if (responses?.success) {
        setLoading(false);
        localStorage.setItem("setAcceptTnCStatus", JSON.stringify(true));
        navigate("/onboarding/kyc-terms/service-agreement");
      } else {
        setLoading(false);
        toast.error(responses?.message);
        navigate("/onboarding/kyc-terms/service-agreement");
      }
    } catch (error) {
      return error;
    }
  };

  const BottomButton = () => {
    return (
      <div className="flex flex-col px-0 md:px-0 pb-4  bg-white">
        {/* <div className="flex items-center  md:px-9 self-start my-1 mx-1">
          <CustomCheckBox
            onChange={(e: any) => setCheckbox(e.target.checked)} 
            style={{ accentColor: "black" }}
          />
          <p className="font-normal text-[12px] text-[#494949] font-Open">
            I Agree with the terms & conditions
          </p>
        </div> */}

        {/* new checkbox functionality implemented */}
        <div className=" px-5 font-normal text-[12px] text-[#494949] font-Open md:px-9 self-start my-1 mx-1">
          <Checkbox
            checked={false}
            onChange={(e: any) => setCheckbox(e.value)}
            name={"I Agree with the terms & conditions"}
            label={"I Agree with the terms & conditions"}
            style={{ accentColor: "black" }}
            checkboxClassName="gap-2"
          />
        </div>
        <div className="mt-6 flex gap-x-2 px-4">
          <div className=" w-full">
            <OneButton
              variant="secondary"
              onClick={() => navigate(-1)}
              text="BACK"
              className=" flex-1"
            />
          </div>

          <div className=" w-full">
            <OneButton
              text="ACCEPT & CONTINUE"
              disabled={!checkbox}
              onClick={() => {
                acceptStatus();
              }}
              variant="primary"
              className="w-full  mb-1 mt-0 mx-0 font-Open"
            />
          </div>
        </div>
        {/* <div className="w-[70%] pt-4">
          <OneButton
            text="ACCEPT AND CONTINUE"
            disabled={!checkbox}
            onClick={() => {
              acceptStatus();
            }}
            variant="primary"
            className="w-full  mb-1 mt-0 mx-0 font-Open"
          />
        </div> */}
        {/* <ServiceButton
          text="ACCEPT AND CONTINUE"
          disabled={!checkbox}
          className={` w-full md:!w-[320px] mb-1 mt-0 mx-5 font-Open  ${
            checkbox === true
              ? "bg-[#1C1C1C] text-white"
              : "bg-[#E8E8E8] text-[#BBBBBB]"
          }`}
          onClick={() => {
            acceptStatus();
          }}
        /> */}
      </div>
    );
  };

  const gstCommonComponent = () => {
    return (
      <div
        className={`${
          isMdScreen ? " m-auto  !w-[500px] " : "w-full !h-full"
        }flex flex-col relative md:px-0 md:gap-y-0`}
      >
        <div className={`${isMdScreen ? "custom_shadow" : ""}`}>
          <div className="product-box  bg-white flex justify-between  items-center w-full h-[60px] top-0 pl-5">
            <img src={LARGE_LOGO} alt="" className="h-[25px]" />
          </div>

          <WelcomeHeader
            className="!mt-[44px] md:!mt-6"
            title={`Welcome to ${COMPANY_NAME}`}
            content="Terms & Agreement"
          />
          < GstContent userNameForGst={userNameForGst} />
          {BottomButton()}
        </div>
      </div>
    );
  };

  const renderGstCommonComponent = () => {
    if (isMdScreen) {
      return (
        <>
          {loading ? (
            <div className="flex justify-center items-center h-screen">
              <Spinner />
            </div>
          ) : (
            <div className="flex justify-center items-center h-[100vh] border-4 ">
              {gstCommonComponent()}
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
          {gstCommonComponent()}
        </div>
      );
    }
  };
  return <div>{renderGstCommonComponent()}</div>;
};
