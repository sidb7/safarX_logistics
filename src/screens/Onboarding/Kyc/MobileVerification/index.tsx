import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import WelcomeHeader from "../welcomeHeader";
import ServiceButton from "../../../../components/Button/ServiceButton";
import CustomBottomModal from "../../../../components/CustomModal/customBottomModal";
import MobileVerificationIcon from "../../../../assets/common/MobileVerify.gif";
import { useLocation, useNavigate } from "react-router-dom";
import CompanyLogo from "../../../../assets/Navbar/shipyaariLogos.svg";
import CustomInputBox from "../../../../components/Input";
import { POST } from "../../../../utils/webService";
import {
  POST_VERIFY_AADHAR_OTP_URL,
  POST_VERIFY_GST_OTP,
  POST_VERIFY_PAN_URL,
  POST_VERIFY_AADHAR_URL,
  POST_VERIFY_GST_URL,
} from "../../../../utils/ApiUrls";
import { toast } from "react-hot-toast";
import { Spinner } from "../../../../components/Spinner";
import { ResponsiveState } from "../../../../utils/responsiveState";

interface ITypeProps {}

const Index = (props: ITypeProps) => {
  const [businessType, setBusinessType] = useState<any>();
  const [aadharNo, setAadharNo] = useState<any>();
  const [clientId, setClientId] = useState<any>();

  const [otpNumber, setOTPNumber] = useState<any>();
  const [panCard, setPanCard] = useState<any>();

  const [gstNo, setGSTNo] = useState<any>();

  const [loading, setLoading] = useState<any>(false);

  const location = useLocation();

  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const closeModal = () => setOpenModal(true);
  const [heading, setHeading] = useState("");

  const isLgScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  const { isMdScreen } = ResponsiveState();

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

  useEffect(() => {
    let localbtype = localStorage.getItem("businessType");
    let localaadharno = localStorage.getItem("aadharNumber");
    let localclient_id = localStorage.getItem("client_id");
    let localpanNumber = localStorage.getItem("panNumber");
    let localgstNo = localStorage.getItem("gstNumber");

    setBusinessType(localbtype);
    setAadharNo(localaadharno);
    setClientId(localclient_id);
    setPanCard(localpanNumber);
    setGSTNo(localgstNo);
  }, [clientId]);

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
        localStorage.setItem("client_id", response.data.data.client_id);
        setClientId(response.data.data.client_id);

        toast.success("Aadhar OTP Resent Successfully");
      } else {
        toast.error("Aadhar OTP Resent Failed!");
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
        localStorage.setItem("client_id", response.data[0].data.client_id);
        setClientId(response.data[0].data.client_id);
        toast.success("GST OTP Resent Successfully");
      } else {
        toast.error("GST Verification Failed!");
      }
    } catch (error) {
      return error;
    }
  };

  const resendOtp = async () => {
    if (businessType === "individual" || businessType === "business") {
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

      localStorage.setItem("fullname", response?.data?.data?.full_name_split);
      if (response?.success) {
        setTimeout(() => {
          // toast.success(response?.message);
        }, 1000);
        setLoading(false);

        if (businessType === "business") {
          // navigate("/onboarding/kyc-terms/service-agreement");
          navigate("/onboarding/kyc");
        } else if (businessType === "company") {
          navigate("/onboarding/kyc");
        } else if (businessType === "individual") {
          navigate("/onboarding/kyc");
        }
      } else {
        setLoading(false);
        toast.error(response?.message);
        navigate("/onboarding/kyc-form", {
          state: {
            aadharNo,
            panCard,
            gstNo,
          },
        });
      }
    } catch (error) {
      return error;
    }
  };

  const onVerifyOtp = async (e: any) => {
    try {
      e.preventDefault();

      if (Number(otpNumber) !== 0) {
        if (businessType === "individual") {
          const payload = { client_id: clientId, otp: Number(otpNumber) };
          setLoading(true);
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
            setLoading(false);
          }
        } else if (businessType === "business") {
          if (location?.state?.path === "aadhar-form") {
            const payload = { client_id: clientId, otp: Number(otpNumber) };
            setLoading(true);
            const { data: response } = await POST(
              POST_VERIFY_AADHAR_OTP_URL,
              payload
            );
            if (response?.success) {
              // setLoading(false);
              verifyPAN(panCard);
              // toast.success(response?.message);
              //Navigate Url's go here
            } else {
              setLoading(false);
              setOTPNumber("");
              toast.error(response?.message);
              navigate("/onboarding/kyc-aadhar-form");
            }
          } else {
            const payload = {
              gstIn: gstNo,
              client_id: clientId,
              otp: Number(otpNumber),
            };

            setLoading(true);
            const { data: response } = await POST(POST_VERIFY_GST_OTP, payload);
            if (response?.success) {
              setLoading(false);
              if (location?.state?.path === "otp-form") {
                navigate("/onboarding/kyc-aadhar-form");
              }
            } else {
              setLoading(false);
              setOTPNumber("");
              toast.error(response?.message);
            }
          }
        } else if (businessType === "company") {
          setLoading(true);
          const payload = {
            gstIn: gstNo,
            client_id: clientId,
            otp: Number(otpNumber),
          };
          const { data: response } = await POST(POST_VERIFY_GST_OTP, payload);
          if (response?.success) {
            // setLoading(false);
            verifyPAN(panCard);
          } else {
            setLoading(false);
            toast.error(response?.message);
          }
        }
      } else {
        toast.error("Enter OTP");
      }
    } catch (error) {
      return error;
    }
  };

  const mobileVerificationComponent = () => {
    return (
      <div
        className={`${
          isMdScreen ? " m-auto  !w-[500px] " : "w-full !h-full"
        }flex flex-col relative md:px-0 md:gap-y-0`}
      >
        <div className={`${isMdScreen ? "custom_shadow" : ""}`}>
          <div className=" md:px-0 ">
            <div className="product-box flex  items-center w-full h-[60px] mb-6 ">
              <img
                className="my-auto ml-6  h-[25px] object-contain"
                src={CompanyLogo}
                alt=""
              />
            </div>
            {heading === "Aadhaar Verification" ? (
              <p className="flex justify-center">
                Aadhaar OTP will be valid for 10 Minutes
              </p>
            ) : (
              <p className="flex justify-center">
                GST OTP will be valid for 10 Minutes
              </p>
            )}
            <WelcomeHeader className="!mt-3" title={heading} content="" />

            <form onSubmit={onVerifyOtp}>
              <div className="px-5 md:mb-6">
                <div className="flex flex-col md:items-center ">
                  <img
                    src={MobileVerificationIcon}
                    alt=""
                    width={180}
                    height={180}
                    className="mb-8 self-center"
                  />
                  <div className="!w-full mb-2 md:mb-2">
                    <CustomInputBox
                      label="Enter OTP"
                      inputType="text"
                      inputMode="numeric"
                      containerStyle="md:!w-auto self-center"
                      className=" md:!w-[320px] !font-Open "
                      labelClassName="!font-Open"
                      maxLength={businessType === "company" ? 4 : 6}
                      value={otpNumber || ""}
                      onChange={(e: any) => {
                        if (isNaN(e.target.value)) {
                        } else {
                          setOTPNumber(+e.target.value);
                        }
                      }}
                    />
                  </div>
                  <p className="font-semibold font-Open text-[12px] text-[#494949] mb-4 self-center">
                    {resendOtpTimer()}
                  </p>

                  <div className="flex items-center gap-x-2 font-normal text-[12px] mb-6 md:mb-0 self-center">
                    <p className="text-[#494949] font-Open font-normal text-xs leading-4">
                      Didn't Receive Code ?
                      <span
                        className={`mx-1 font-normal text-[#004EFF] text-[12px]  ${
                          seconds > 0 || (seconds > 0 && minutes === 0)
                            ? "text-[#494949]"
                            : "cursor-pointer"
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
              <div className="flex flex-col md:justify-center px-4 md:items-center"></div>
              <div className="flex flex-col md:justify-center px-4 md:items-center">
                <ServiceButton
                  text="SUBMIT"
                  className="bg-[#1C1C1C] !h-[36px] !font-Open text-white md:!w-[320px] mb-5"
                  btnType="submit"
                />
              </div>
            </form>
            {/* <div className="flex flex-col lg:justify-center px-4 lg:items-center">
          <ServiceButton
            text="BACK"
            className="!bg-[#E8E8E8] !text-black !h-[36px] !font-Open  lg:!w-[320px] mb-5"
            onClick={() =>
              navigate("/onboarding/kyc-form", {
                state: {
                  aadharNo,
                  panCard,
                  gstNo,
                },
              })
            }
          />
        </div> */}
          </div>
        </div>
      </div>
    );
  };

  const renderMobileVerificationComponent = () => {
    if (isMdScreen) {
      return (
        <>
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Spinner />
            </div>
          ) : (
            <div className="flex justify-center items-center h-screen">
              {mobileVerificationComponent()}
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
        mobileVerificationComponent()
      );
    }
  };
  return <div>{renderMobileVerificationComponent()}</div>;
};

export default Index;
