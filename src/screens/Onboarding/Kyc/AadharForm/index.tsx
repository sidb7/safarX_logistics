import { useEffect, useState } from "react";
import WelcomeHeader from "../welcomeHeader";
import { useMediaQuery } from "react-responsive";
import CustomInputBox from "../../../../components/Input";
import ServiceButton from "../../../../components/Button/ServiceButton";
import CustomBottomModal from "../../../../components/CustomModal/customBottomModal";
import CompanyLogo from "../../../../assets/Navbar/shipyaariLogos.svg";
import ErrorIcon from "../../../../assets/common/info-circle.svg";
import MobileVerificationIcon from "../../../../assets/common/MobileVerify.gif";
import {
  POST_VERIFY_AADHAR_OTP_URL,
  POST_VERIFY_GST_OTP,
  POST_VERIFY_PAN_URL,
  POST_VERIFY_GST_URL,
} from "../../../../utils/ApiUrls";
import {
  setOnOtpClientId,
  setAadharNumberProprietor,
} from "../../../../redux/reducers/onboarding";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { POST } from "../../../../utils/webService";
import { POST_VERIFY_AADHAR_URL } from "../../../../utils/ApiUrls";
import { toast } from "react-toastify";
import { aadharRegex } from "../../../../utils/regexCheck";
import { ResponsiveState } from "../../../../utils/responsiveState";
// import TimerCounter from "../../../../components/TimerCountdown";
import TimerCounter from "../../../../components/TimerCountdown";

interface ITypeProps {}

const Index = (props: ITypeProps) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);
  const closeModal = () => setOpenModal(true);

  const [aadharNumber, setAadharNumber] = useState<any>();
  const [aadharError, setAadharError] = useState<any>();
  const [otpBtnStatus, setOtpBtnStatus] = useState<any>(false);
  const [aadharNo, setAadharNo] = useState<any>();
  const [otp, setOtp] = useState<any>(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(60);
  const [businessType, setBusinessType] = useState<any>();
  const [clientId, setClientId] = useState<any>();
  const [heading, setHeading] = useState("");
  const [otpNumber, setOTPNumber] = useState<any>();
  const [loading, setLoading] = useState<any>(false);
  const [gstNo, setGSTNo] = useState<any>();
  const [panCard, setPanCard] = useState<any>();
  const location = useLocation();
  let route = window.location.href;
  let routeCheck = route.includes("kyc-aadhar-form");

  const { isMdScreen } = ResponsiveState();

  const isBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  useEffect(() => {
    if (aadharNumber !== 0 && aadharNumber !== undefined) {
      if (aadharRegex.test(aadharNumber)) {
        setAadharError("");
        setOtpBtnStatus(true);
      } else {
        setAadharError("Enter Valid Aadhar Number");
        setOtpBtnStatus(false);
      }
    }
  }, [aadharNumber]);

  useEffect(() => {
    let localbtype = sessionStorage.getItem("businessType");

    let localaadharno = sessionStorage.getItem("aadharNumber");
    let localclient_id = sessionStorage.getItem("client_id");
    let localpanNumber = sessionStorage.getItem("panNumber");
    let localgstNo = sessionStorage.getItem("gstNumber");

    setBusinessType(localbtype);
    setAadharNo(localaadharno);
    setClientId(localclient_id);
    setPanCard(localpanNumber);
    setGSTNo(localgstNo);
  }, [clientId]);

  const onSendOtp = async (e: any) => {
    try {
      e.preventDefault();

      //API Call
      if (!otp) {
        const payload = { adhaar_no: aadharNumber };
        const { data: response } = await POST(POST_VERIFY_AADHAR_URL, payload);

        if (response?.success) {
          toast.success(response?.message);
          sessionStorage.setItem("aadharNumber", aadharNumber);
          sessionStorage.setItem("client_id", response.data.data.client_id);
          setOtp(true);
        } else {
          toast.error(response?.message);
        }
      } else {
        if (Number(otpNumber) !== 0) {
          let clientId_session = sessionStorage.getItem("client_id");
          const payload = {
            client_id: clientId_session,
            otp: Number(otpNumber),
          };
          setLoading(true);
          const { data: response } = await POST(
            POST_VERIFY_AADHAR_OTP_URL,
            payload
          );
          if (response?.success) {
            // toast.success(response?.message);
            //Navigate Url's go here
            navigate("/onboarding/kyc");
          } else {
            toast.error(response?.message);
            setLoading(false);
          }
          // }
        } else {
          toast.error("Enter OTP");
        }
      }
    } catch (error) {
      return error;
    }
  };

  const resentAadharOtp = async () => {
    try {
      const payload = { adhaar_no: aadharNo };

      const { data: response } = await POST(POST_VERIFY_AADHAR_URL, payload);

      if (response?.success) {
        setMinutes(0);
        setSeconds(60);
        sessionStorage.setItem("client_id", response.data.data.client_id);
        setClientId(response.data.data.client_id);

        toast.success("Aadhar OTP Resent Successfully");
      } else {
        toast.error("Aadhar OTP Resent Failed!");
      }
    } catch (error) {
      return error;
    }
  };

  const resendOtp = async () => {
    resentAadharOtp();
  };

  useEffect(() => {
    // const interval = setInterval(() => {
    //   if (seconds > 0) {
    //     setSeconds(seconds - 1);
    //   }
    //   if (seconds === 0) {
    //     if (minutes === 0) {
    //       clearInterval(interval);
    //     } else {
    //       setSeconds(60);
    //       setMinutes(minutes - 1);
    //     }
    //   }
    // }, 1000);
    // return () => {
    //   clearInterval(interval);
    // };
  }, [seconds]);

  // const onVerifyOtp = async (e: any) => {
  //   try {
  //     e.preventDefault();

  //     if (Number(otpNumber) !== 0) {
  //       // if (businessType === "individual") {
  //         const payload = { client_id: clientId, otp: Number(otpNumber) };
  //         setLoading(true);
  //         const { data: response } = await POST(
  //           POST_VERIFY_AADHAR_OTP_URL,
  //           payload
  //         );
  //         if (response?.success) {

  //           // toast.success(response?.message);
  //           //Navigate Url's go here
  //           navigate("/onboarding/kyc")
  //         } else {
  //           toast.error(response?.message);
  //           setLoading(false);
  //         }
  //       // }
  //     } else {
  //       toast.error("Enter OTP");
  //     }
  //   } catch (error) {
  //     return error;
  //   }
  // };

  const aadharFormComponent = () => {
    return (
      <div
        className={`${
          isMdScreen ? " m-auto  !w-[500px] " : "w-full !h-full"
        }flex flex-col relative md:px-0 md:gap-y-0`}
      >
        <div className={`${isMdScreen ? "custom_shadow" : ""}`}>
          <div>
            <div className=" md:flex justify-between items-center shadow-md h-[60px] px-6 py-4 mb-6 ">
              <img src={CompanyLogo} alt="" />
            </div>

            <WelcomeHeader
              className="!mt-[44px] md:!mt-6"
              title="Welcome to Shipyaari"
              content=""
            />

            <form onSubmit={onSendOtp}>
              <div
                className={`${
                  otp
                    ? "flex flex-col justify-center items-center"
                    : " mt-[0px] md:mt-[0px] flex flex-col justify-center items-center"
                }  px-5 md:px-0 gap-y-5 mb-6`}
              >
                <div className="!w-full md:!w-auto">
                  {otp && (
                    <p className="flex justify-center">
                      Aadhaar OTP will be valid for 10 Minutes
                    </p>
                  )}
                  <div className="flex justify-center">
                    <img
                      src={MobileVerificationIcon}
                      alt=""
                      width={180}
                      height={180}
                      className="mb-8 self-center"
                    />
                  </div>
                  <CustomInputBox
                    label="Aadhar Number"
                    inputType="text"
                    maxLength={12}
                    className={`  ${
                      aadharError !== "" &&
                      aadharError !== undefined &&
                      "!border-[#F35838]"
                    }  md:!w-[320px] !font-Open`}
                    onChange={(e) => {
                      setAadharNumber(e.target.value);
                    }}
                  />
                  {/* To display error */}
                  {aadharError !== "" && aadharError !== undefined && (
                    <div className="flex items-center    gap-x-1 mt-1   ">
                      <img src={ErrorIcon} alt="" width={10} height={10} />
                      <span className="font-normal font-Open  text-[#F35838] text-[10px]">
                        {aadharError}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {!otp && (
                <div className="flex  md:justify-center md:items-center px-5 md:px-0 pb-12 mb-[209px]">
                  <ServiceButton
                    text="SEND OTP"
                    disabled={!otpBtnStatus}
                    className={`bg-[#1C1C1C] !h-[36px] text-white w-full  md:!w-[320px] ${
                      otpBtnStatus === true
                        ? "!bg-[#1C1C1C] !text-[#FFFFFF]"
                        : "!bg-[#E8E8E8] !text-[#BBBBBB] !border-0"
                    } `}
                    btnType="submit"
                  />
                </div>
              )}

              {otp && (
                <div>
                  <div className="px-5 md:mb-6">
                    <div className="flex flex-col md:items-center ">
                      <div className="!w-full mb-2 md:mb-2">
                        <CustomInputBox
                          label="Enter Aadhaar OTP"
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
                      <p className="font-semibold font-Open text-[12px] text-[#494949] mb-4 flex flex-col justify-center">
                        <TimerCounter sec={60} routeCheck={routeCheck} />
                      </p>
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
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {!isMdScreen && aadharFormComponent()}

      {(isBigScreen || isMdScreen) && (
        <div className="flex justify-center items-center h-screen">
          {aadharFormComponent()}
        </div>
      )}
    </div>
  );
};

export default Index;
