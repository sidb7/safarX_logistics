import CompanyLogo from "./../../../assets/CompanyLogo/shipyaari icon.svg";
// import CloseIcon from "./../../../assets/CloseIcon.svg";
import CustomButton from "../../../components/Button/index";
// import MobileIcon from "../../../assets/PhoneVerificationOtp/mobileVerificationIcon.svg";
import MobileGif from "../../../assets/OrderCard/Gif.gif";
import CustomInputBox from "../../../components/Input";
import { useNavigate } from "react-router-dom";
import { ResponsiveState } from "../../../utils/responsiveState";
import { useEffect, useState } from "react";
import CenterModal from "../../../components/CustomModal/customCenterModal";
import { POST_SEND_OTP_URL } from "../../../utils/ApiUrls";
import { POST } from "../../../utils/webService";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { constructNavigationObject } from "../../../utils/utility";

const Index = () => {
  const navigate = useNavigate();
  const { isLgScreen, isMdScreen } = ResponsiveState();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const [mobileNumber, setMobileNumber] = useState({
    mobileNo: 0,
  });
  const [firstName, setFirstName] = useState();
  const [email, setEmail] = useState();

  const signUpUser = useSelector((state: any) => state.signup);

  useEffect(() => {
    let temp: any = sessionStorage.getItem("userInfo");
    temp = JSON.parse(temp);
    setFirstName(temp?.firstName);
    setEmail(temp?.email);
  }, []);

  let body = {
    email,
    firstName,
    mobileNo: mobileNumber?.mobileNo,
  };

  const sendOtpOnClick = async (value: any) => {
    try {
      const { data: response } = await POST(POST_SEND_OTP_URL, value);
      if (response?.success === true) {
        const navigationObject = constructNavigationObject(
          "/onboarding/verifyOtp",
          window.location.search
        );
        navigate(navigationObject, { state: { path: body } });
        // navigate("/onboarding/verifyOtp", { state: { path: body } });
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      return error;
    }
  };

  const modalTitle = () => {
    return (
      <div className="product-box sticky z-10 bg-white flex justify-between items-center w-full h-[60px] top-0">
        <img
          className="my-auto ml-6  h-[25px] object-contain"
          src={CompanyLogo}
          alt="Company Logo"
        />
      </div>
    );
  };

  const mobileVerification = () => {
    return (
      <div
        className={` ${
          isMdScreen ? "custom_shadow m-auto !w-[500px]" : ""
        } flex flex-col relative lg:px-0 lg:gap-y-0 rounded-lg`}
      >
        {/* {isLgScreen && modalTitle()} */}
        <div className="product-box flex items-center ">
          <img
            className="m-4 h-[25px] object-contain"
            src={CompanyLogo}
            alt="CompanyLogo"
          />
        </div>

        <div className="flex flex-col  mx-4 md:mx-[90px] gap-y-8">
          <div className="flex flex-col mt-11 md:mt-6 gap-y-6">
            <p className="text-center text-[22px] font-bold font-Lato leading-7 ">
              Mobile Verification
            </p>
            <p className="text-center font-Open font-light text-[#494949] leading-[22px]">
              Please verify your phone number to proceed further.
            </p>
          </div>
          <div className=" flex flex-col gap-y-6 md:mb-11">
            <div className="flex justify-center">
              <img
                className="h-[180px] w-[180px] object-contain"
                src={MobileGif}
                alt="MobileIcon"
              />{" "}
            </div>

            <CustomInputBox
              value={mobileNumber?.mobileNo || ""}
              inputMode="numeric"
              label="Enter Your Mobile Number"
              maxLength={10}
              onChange={(e: any) => {
                if (isNaN(e.target.value)) {
                } else {
                  setMobileNumber({
                    ...mobileNumber,
                    mobileNo: +e.target.value,
                  });
                }
              }}
            />
            <CustomButton
              onClick={(e: any) => sendOtpOnClick(body)}
              text="SEND OTP"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* {isLgScreen && isModalOpen && (
        <CenterModal
          shouldCloseOnOverlayClick={false}
          isOpen={isModalOpen}
          // onRequestClose={() => setIsModalOpen(false)}
        >
          mobileVerification()
        </CenterModal>
      )} */}

      {isMdScreen && (
        <div className="flex justify-center items-center h-screen">
          {mobileVerification()}
        </div>
      )}
      {!isLgScreen && mobileVerification()}
    </>
  );
};

export default Index;
