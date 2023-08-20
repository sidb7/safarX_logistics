import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import WelcomeHeader from "../welcomeHeader";
import ServiceButton from "../../../../components/Button/ServiceButton";
import CustomBottomModal from "../../../../components/CustomModal/customBottomModal";
import MobileVerificationIcon from "../../../../assets/common/MobileVerify.gif";
import { useLocation, useNavigate } from "react-router-dom";
import CompanyLogo from "../../../../assets/Navbar/ShipyaariLogos.svg";
import CustomInputBox from "../../../../components/Input";
import { useSelector, useDispatch } from "react-redux";
import { setOTPNumber } from "../../../../redux/reducers/onboarding";
import { POST } from "../../../../utils/webService";
import { POST_VERIFY_AADHAR_OTP_URL } from "../../../../utils/ApiUrls";
import { toast } from "react-toastify";

interface ITypeProps {}

const Index = (props: ITypeProps) => {
  const businessType = useSelector(
    (state: any) => state?.onboarding.businessType
  );
  console.log("BT", businessType);
  const clientId = useSelector((state: any) => state?.onboarding.onOtpClientId);
  const otp = useSelector((state: any) => state?.onboarding.otp);

  const location = useLocation();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);
  const closeModal = () => setOpenModal(true);

  const isLgScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  const onVerifyOtp = async (e: any) => {
    try {
      e.preventDefault();

      const payload = { client_id: clientId, otp: otp };
      const { data: response } = await POST(
        POST_VERIFY_AADHAR_OTP_URL,
        payload
      );
      if (response?.success) {
        toast.success(response?.message);
        //Navigate Url's go here
      } else {
        toast.error("OTP Verification Failed!");
      }

      if (businessType === "individual") {
        navigate("/onboarding/kyc-terms/GSTComponent");
      } else if (businessType === "soleProprietor") {
        if (location.state.path === "otp-form") {
          navigate("/onboarding/kyc-aadhar-form");
        }
        if (location.state.path === "aadhar-form") {
          navigate("/onboarding/kyc-terms/ServiceComponent");
        }
      } else {
        navigate("/onboarding/kyc-terms/ServiceComponent");
      }
    } catch (error) {
      return error;
    }
  };

  const mobileVerificationComponent = () => {
    return (
      <div className="px-5 lg:px-0 ">
        <div className="hidden lg:flex justify-between items-center shadow-md h-[60px] px-6 py-4 mb-6 ">
          <img src={CompanyLogo} alt="" />
        </div>
        <WelcomeHeader
          title="Mobile Verification"
          content="Enter the OTP sent to +91-8976500001"
        />

        <form onSubmit={onVerifyOtp}>
          <div className="lg:mb-6 lg:mx-5">
            <div className="flex flex-col lg:items-center  mb-10">
              <img
                src={MobileVerificationIcon}
                alt=""
                width={180}
                height={180}
                className="mb-8 self-center"
              />
              <div className="!w-full mb-2 lg:mb-2">
                <CustomInputBox
                  label="Enter OTP"
                  inputType="number"
                  containerStyle="lg:!w-auto"
                  className=" lg:!w-[320px] !font-Open "
                  labelClassName="!font-Open"
                  onChange={(e) => {
                    dispatch(setOTPNumber(e.target.value));
                  }}
                />
              </div>
              <p className="font-semibold font-Open text-[12px] text-[#494949] mb-4 self-center">
                00:30 sec
              </p>
              <div className="flex items-center gap-x-2 font-normal text-[12px] mb-6  self-center">
                <p className="text-[#494949] font-Open lg:font-normal">
                  Don't receive code ?
                </p>
                <p className="text-[#004EFF] font-Open lg:font-semibold">
                  Resend
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:justify-center lg:items-center lg:mb-[45px]  ">
            <ServiceButton
              text="DONE"
              className="bg-[#1C1C1C] !h-[36px] !font-Open text-white lg:!w-[320px] mb-5"
              btnType="submit"
            />
          </div>
        </form>
      </div>
    );
  };

  return (
    <div>
      {!isLgScreen && mobileVerificationComponent()}

      {isLgScreen && (
        <CustomBottomModal
          isOpen={openModal}
          onRequestClose={closeModal}
          className="!p-0 !w-[500px] !h-[700px]"
          overlayClassName="flex  items-center"
        >
          {mobileVerificationComponent()}
        </CustomBottomModal>
      )}
    </div>
  );
};

export default Index;
