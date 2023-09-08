import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import WelcomeHeader from "../welcomeHeader";
import ServiceButton from "../../../../components/Button/ServiceButton";
import CustomBottomModal from "../../../../components/CustomModal/customBottomModal";
import MobileVerificationIcon from "../../../../assets/common/MobileVerify.gif";
import { useLocation, useNavigate } from "react-router-dom";
import CompanyLogo from "../../../../assets/Navbar/shipyaariLogos.svg";
import CustomInputBox from "../../../../components/Input";
import { useSelector, useDispatch } from "react-redux";
import {
  setNavigateOnOtpFormVerify,
  setOTPNumber,
  setOnOtpClientId,
} from "../../../../redux/reducers/onboarding";
import { POST } from "../../../../utils/webService";
import {
  POST_VERIFY_AADHAR_OTP_URL,
  POST_VERIFY_GST_OTP,
  POST_VERIFY_PAN_URL,
  POST_VERIFY_AADHAR_URL,
  POST_VERIFY_GST_URL,
} from "../../../../utils/ApiUrls";
import { toast } from "react-toastify";

interface ITypeProps {}

const Index = (props: ITypeProps) => {
  const businessType = useSelector(
    (state: any) => state?.onboarding.businessType
  );

  const clientId = useSelector((state: any) => state?.onboarding.onOtpClientId);
  const otp = useSelector((state: any) => state?.onboarding.otp);
  const panCard = useSelector((state: any) => state?.onboarding.panNumber);
  const gstNo = useSelector((state: any) => state?.onboarding.gstNumber);
  const aadharNo = useSelector((state: any) => state?.onboarding?.aadharNumber);

  const location = useLocation();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const closeModal = () => setOpenModal(true);
  const [heading, setHeading] = useState("");

  const isLgScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  useEffect(() => {
    if (
      location?.state?.path === "aadhaar-verification" ||
      location?.state?.path === "aadhar-form"
    ) {
      setHeading("Aadhaar Verification");
    } else {
      setHeading("GST Verification");
    }
  }, []);
  const resendOtpTimer = () => {
    const minute = minutes < 10 ? `0${minutes}` : minutes;
    const second = seconds < 10 ? `0${seconds}` : seconds;

    if (seconds > 0 || minutes > 0) {
      return (
        <>
          {minute} : {second} sec
        </>
      );
    }
  };

  const resentAadharOtp = async () => {
    try {
      const payload = { adhaar_no: aadharNo };

      const { data: response } = await POST(POST_VERIFY_AADHAR_URL, payload);

      if (response?.success) {
        setMinutes(0);
        setSeconds(30);
        dispatch(setOnOtpClientId(response.data.data.client_id));
        dispatch(
          setNavigateOnOtpFormVerify({
            aadharVerifyNavigate: true,
          })
        );
        toast.success("Aadhar OTP resent Successfully");
      } else {
        dispatch(
          setNavigateOnOtpFormVerify({
            aadharVerifyNavigate: false,
          })
        );
        toast.error("Aadhar OTP resent Failed!");
      }
    } catch (error) {
      return error;
    }
  };

  const resentGstOtp = async () => {
    try {
      const payload = { gstIn: gstNo };
      const { data: response } = await POST(POST_VERIFY_GST_URL, payload);

      if (response?.success) {
        dispatch(
          setNavigateOnOtpFormVerify({
            gstVerifyNavigate: true,
          })
        );
        dispatch(setOnOtpClientId(response.data[0].data.client_id));
        toast.success("GST OTP resent Successfully");
      } else {
        dispatch(
          setNavigateOnOtpFormVerify({
            gstVerifyNavigate: false,
          })
        );
        toast.error("GST Verification Failed!");
      }
    } catch (error) {
      return error;
    }
  };

  const resendOtp = async () => {
    if (businessType === "individual") {
      resentAadharOtp();
    } else {
      resentGstOtp();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(30);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const verifyPAN = async (value: any) => {
    try {
      const payload = { pan_no: value };
      const { data: response } = await POST(POST_VERIFY_PAN_URL, payload);

      if (response?.success) {
        dispatch(
          setNavigateOnOtpFormVerify({
            panVerifyNavigate: true,
          })
        );

        if (businessType === "business" || businessType === "company") {
          navigate("/onboarding/kyc-terms/service-agreement");
        } else if (businessType === "individual") {
          navigate("/onboarding/kyc-terms/gst-agreement");
        }
      } else {
        dispatch(
          setNavigateOnOtpFormVerify({
            panVerifyNavigate: false,
          })
        );
        toast.error(response?.message);
      }
    } catch (error) {
      return error;
    }
  };

  const onVerifyOtp = async (e: any) => {
    try {
      e.preventDefault();

      if (businessType === "individual") {
        const payload = { client_id: clientId, otp: otp };
        const { data: response } = await POST(
          POST_VERIFY_AADHAR_OTP_URL,
          payload
        );
        if (response?.success) {
          verifyPAN(panCard);

          toast.success(response?.message);
          //Navigate Url's go here
        } else {
          toast.error(response?.message);
        }
      } else if (businessType === "business") {
        if (location?.state?.path === "aadhar-form") {
          const payload = { client_id: clientId, otp: otp };
          const { data: response } = await POST(
            POST_VERIFY_AADHAR_OTP_URL,
            payload
          );
          if (response?.success) {
            verifyPAN(panCard);
            // toast.success(response?.message);
            //Navigate Url's go here
          } else {
            toast.error(response?.message);
          }
        } else {
          const payload = {
            gstIn: gstNo,
            client_id: clientId,
            otp: otp,
          };
          const { data: response } = await POST(POST_VERIFY_GST_OTP, payload);
          if (response?.success) {
            if (location?.state?.path === "otp-form") {
              navigate("/onboarding/kyc-aadhar-form");
            }
          } else {
            toast.error(response?.message);
          }
        }
      } else if (businessType === "company") {
        const payload = {
          gstIn: gstNo,
          client_id: clientId,
          otp: otp,
        };
        const { data: response } = await POST(POST_VERIFY_GST_OTP, payload);
        if (response?.success) {
          verifyPAN(panCard);
        }
      }
    } catch (error) {
      return error;
    }
  };

  const mobileVerificationComponent = () => {
    return (
      <div className=" lg:px-0 ">
        <div className="lg:flex justify-between items-center shadow-md h-[60px] px-6 py-4 mb-6 ">
          <img src={CompanyLogo} alt="" />
        </div>
        {heading === "Aadhaar Verification" ? (
          <p className="flex justify-center mt-10">
            Aadhaar OTP will be valid for 10 Minutes
          </p>
        ) : (
          <p className="flex justify-center mt-10">
            GST OTP will be valid for 10 Minutes
          </p>
        )}
        <WelcomeHeader className="!mt-[30px]" title={heading} content="" />

        <form onSubmit={onVerifyOtp}>
          <div className="px-5 lg:mb-6">
            <div className="flex flex-col lg:items-center ">
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
                  inputType="text"
                  inputMode="numeric"
                  containerStyle="lg:!w-auto"
                  className=" lg:!w-[320px] !font-Open "
                  labelClassName="!font-Open"
                  onChange={(e) => {
                    dispatch(setOTPNumber(+e.target.value));
                  }}
                />
              </div>
              <p className="font-semibold font-Open text-[12px] text-[#494949] mb-4 self-center">
                {resendOtpTimer()}
              </p>

              <div className="flex items-center gap-x-2 font-normal text-[12px] mb-6 lg:mb-0 self-center">
                <p className="text-[#494949] font-Open font-normal text-xs leading-4">
                  Didn't Receive Code ?
                  <span
                    className={`mx-1 font-normal text-[#004EFF] text-[12px] cursor-pointer ${
                      (seconds > 0 || (seconds > 0 && minutes === 0)) &&
                      "text-[#494949]"
                    }`}
                    onClick={() => {
                      if (seconds === 0 && minutes === 0) {
                        resendOtp();
                      }
                    }}
                  >
                    Resend
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:justify-center px-4 lg:items-center"></div>
          <div className="flex flex-col lg:justify-center px-4 lg:items-center">
            <ServiceButton
              text="SUBMIT"
              className="bg-[#1C1C1C] !h-[36px] !font-Open text-white lg:!w-[320px] mb-5"
              btnType="submit"
            />
          </div>
        </form>
        <div className="flex flex-col lg:justify-center px-4 lg:items-center">
          <ServiceButton
            text="BACK"
            className="!bg-[#E8E8E8] !text-black !h-[36px] !font-Open  lg:!w-[320px] mb-5"
            onClick={() => navigate(-1)}
          />
        </div>
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
