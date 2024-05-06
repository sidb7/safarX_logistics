import { useEffect, useState } from "react";
import WelcomeHeader from "../welcomeHeader";
import { useMediaQuery } from "react-responsive";
import CustomInputBox from "../../../../components/Input";
import ServiceButton from "../../../../components/Button/ServiceButton";
import CustomBottomModal from "../../../../components/CustomModal/customBottomModal";
import CompanyLogo from "../../../../assets/Navbar/shipyaariLogos.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { POST } from "../../../../utils/webService";
import {
  POST_VERIFY_AADHAR_OTP_URL,
  POST_VERIFY_AADHAR_URL,
  POST_VERIFY_GST_OTP,
  POST_VERIFY_GST_URL,
  POST_VERIFY_PAN_URL,
} from "../../../../utils/ApiUrls";
import { aadharRegex, panRegex, gstRegex } from "../../../../utils/regexCheck";
import { setOnOtpClientId } from "../../../../redux/reducers/onboarding";
import { toast } from "react-hot-toast";
import ErrorIcon from "../../../../assets/common/info-circle.svg";
import { Spinner } from "../../../../components/Spinner";
import TimerCounter from "../../../../components/TimerCountdown";
import { ResponsiveState } from "../../../../utils/responsiveState";
import { LARGE_LOGO, WHITE_COMPANYNAME } from "../../../../utils/ApiUrls";

interface ITypeProps {}

const Index = (props: ITypeProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const state = location.state || {};

  const [loading, setLoading] = useState(false);
  const [businessType, setBusinessType] = useState<any>();

  const [aadharNumber, setAadharNumber] = useState<any>();
  const [aadharNumberError, setAadharNumberError] = useState<any>();

  const [panNumber, setPanNumber] = useState<any>();
  const [panNumberError, setPanNumberError] = useState<any>();

  const [gstNumber, setGSTNumber] = useState<any>();
  const [gstError, setgstError] = useState<any>("");

  const [otpFormBtnStatus, setOtpFormBtnStatus] = useState(false);
  const [verifyBtnStatus, setVerifyBtnStatus] = useState(false);

  const [openModal, setOpenModal] = useState(true);
  const closeModal = () => setOpenModal(true);

  const [otpNumber, setOTPNumber] = useState<any>();
  const [showAaddharOtpBox, setShowAaddharOtpBox] = useState<any>();
  const [showGstOtpBox, setShowgstOtpBox] = useState<any>();

  const [verifyOTP, setVerifyOTP] = useState<any>();
  const [clientId, setClientId] = useState<any>();

  const isBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  const { isLgScreen, isMdScreen } = ResponsiveState();
  //getting the sellerID
  const sellerId = sessionStorage.getItem("sellerId");

  useEffect(() => {
    // Retrieve the 'kycValue' from session storage
    const kycValueString = sessionStorage.getItem("kycValue");
    if (kycValueString) {
      const kycValue = JSON.parse(kycValueString);
      const kycDetails = kycValue.kycDetails;

      // Check if kycDetails are available and update the state accordingly
      if (kycDetails && kycValue?.phpUserId?.length !== 0) {
        const { gstNumber, panNumber, aadharNumber } = kycDetails;

        const isAadharValid = aadharNumber && aadharRegex.test(aadharNumber);
        const isPanValid = panNumber && panRegex.test(panNumber);
        const isGstValid =
          gstNumber && gstNumber !== "0" && gstRegex.test(gstNumber);

        setAadharNumber(isAadharValid ? aadharNumber : "");
        if (isAadharValid !== 0) {
          setAadharNumberError(isAadharValid ? "" : "Invalid Aadhar Number");
        }

        setPanNumber(isPanValid ? panNumber : "");
        if (isPanValid !== "") {
          setPanNumberError(isPanValid ? "" : "Invalid PAN Number");
        }

        setGSTNumber(isGstValid ? gstNumber : "");
        setgstError(isGstValid ? "" : "Invalid GST Number");
      }
    }
  }, []);

  useEffect(() => {
    if (Object.keys(state).length > 0 && state) {
      setAadharNumber(state.aadharNo);
      setPanNumber(state.panCard);
      setGSTNumber(state.gstNo);
      setAadharNumberError("");
      setPanNumberError("");
      setgstError("");
    }
  }, [state]);

  useEffect(() => {
    let btype = sessionStorage.getItem("businessType");
    setBusinessType(btype);
  }, []);

  console.log("businessType", businessType);
  function validateGST(gstNo: any) {
    return gstRegex.test(gstNo);
  }

  function extractPANFromGST(gstValue: any) {
    if (!gstValue || gstValue.length !== 15) {
      return null;
    }

    const panNumber = gstValue.substring(2, 12);
    setPanNumber(panNumber);
    return panNumber;
  }

  // useEffect(() => {
  //   if (gstNumber) {
  //     extractPANFromGST(gstNumber);
  //     setgstError("");
  //     setPanNumberError("");
  //   } else {
  //     setPanNumber("");
  //   }
  // }, [gstNumber]);

  const verifyPAN = async (value: any) => {
    try {
      const payload = { pan_no: value };
      const { data: response } = await POST(POST_VERIFY_PAN_URL, payload);

      sessionStorage.setItem("fullname", response?.data?.data?.full_name_split);
      if (response?.success) {
        // setTimeout(() => {
        //   console.log("Delayed for 1 second.");
        //   // toast.success(response?.message);
        // }, 1000);
        window?.dataLayer?.push({
          event: "kyc_verification",
          sellerId: sellerId,
          business_type: businessType,
          kyc_verified: true,
        });
        setLoading(false);
        // navigate("/onboarding/kyc");
        if (businessType === "business") {
          // navigate("/onboarding/kyc-terms/service-agreement");
          navigate("/onboarding/kyc-aadhar-form");
        } else {
          navigate("/onboarding/kyc");
        }

        // window?.dataLayer?.push({
        //   event: "KYCVerification",
        //   sellerInfo: sessionStorage.getItem("userInfo"),
        // });
      } else {
        setLoading(false);
        toast.error(response?.message);

        // navigate("/onboarding/kyc-form", {
        //   state: {
        //     aadharNo,
        //     panCard,
        //     gstNo,
        //   },
        // });
      }
    } catch (error) {
      return error;
    }
  };

  const verifyAadhar = async (value: any) => {
    try {
      const payload = { adhaar_no: value };
      setLoading(true);
      const { data: response } = await POST(POST_VERIFY_AADHAR_URL, payload);

      if (response?.success) {
        setLoading(false);
        toast.success(response?.message);
        setShowAaddharOtpBox(true);
        setVerifyOTP(true);

        sessionStorage.setItem("aadharNumber", value);
        sessionStorage.setItem("panNumber", panNumber);
        sessionStorage.setItem("client_id", response.data.data.client_id);
        setClientId(response?.data?.data?.client_id);
        let clientIdSession = sessionStorage.getItem("client_id");
        console.log("clientIdSe", clientIdSession);

        if (businessType === "individual") {
          setLoading(false);
        }
      } else {
        setLoading(false);

        toast.error(response?.message);
      }
    } catch (error) {
      return error;
    }
  };

  const verifyGST = async (value: any) => {
    // setVerifyOTP(true);
    try {
      setLoading(true);
      const payload = { gstIn: value };
      const { data: response } = await POST(POST_VERIFY_GST_URL, payload);

      if (response?.success) {
        setLoading(false);
        sessionStorage.setItem("gstNumber", value);
        sessionStorage.setItem("panNumber", panNumber);
        sessionStorage.setItem("client_id", response.data[0].data.client_id);
        setShowgstOtpBox(true);
        setVerifyOTP(true);
        if (businessType === "business" || businessType === "company") {
          setLoading(false);
          sessionStorage.setItem("client_id", response.data[0].data.client_id);
        } else {
          setLoading(false);
        }
        setgstError("");
      } else {
        setLoading(false);

        toast.error(response?.message);
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    if (
      ((aadharNumber &&
        aadharNumber?.length !== 0 &&
        aadharNumberError === "") ||
        (gstNumber && gstNumber?.length !== 0 && gstError === "")) &&
      panNumber &&
      panNumber?.length !== 0 &&
      panNumberError === ""
    ) {
      console.log(">>>>>>otp true", aadharNumber?.length !== 0);
      setOtpFormBtnStatus(true);
    } else {
      console.log(">>>>>>otpfalse", aadharNumber?.length !== 0);

      setOtpFormBtnStatus(false);
    }
    // }
  }, [
    aadharNumberError,
    panNumberError,
    gstError,
    aadharNumber,
    gstNumber,
    panNumber,
  ]);

  console.log("adharNumber", aadharNumber);

  useEffect(() => {
    if (businessType === "individual") {
      if (otpNumber && otpNumber?.length === 6) {
        setVerifyBtnStatus(true);
      } else {
        setVerifyBtnStatus(false);
      }
    } else {
      if (otpNumber && otpNumber?.length === 4) {
        setVerifyBtnStatus(true);
      } else {
        setVerifyBtnStatus(false);
      }
    }
  }, [otpNumber]);

  const onSendOtp = () => {
    try {
      //Individual
      if (businessType === "individual") {
        verifyAadhar(aadharNumber);
      }
      //Proprietor,Company
      else if (businessType === "business") {
        verifyGST(gstNumber);
      } else if (businessType === "company") {
        verifyGST(gstNumber);
      } else {
        toast.error("Something Went Wrong!!");
      }
    } catch (error) {}
  };

  const onVerifyOtp = async () => {
    try {
      if (Number(otpNumber) !== 0) {
        let clientId_session = sessionStorage.getItem("client_id");
        if (businessType === "individual") {
          const payload = {
            client_id: clientId_session,
            otp: otpNumber,
          };
          setLoading(true);
          const { data: response } = await POST(
            POST_VERIFY_AADHAR_OTP_URL,
            payload
          );
          if (response?.success) {
            try {
              const payload = { pan_no: panNumber };
              const { data: response } = await POST(
                POST_VERIFY_PAN_URL,
                payload
              );

              sessionStorage.setItem(
                "fullname",
                response?.data?.data?.full_name_split
              );
              if (response?.success) {
                setLoading(false);

                window?.dataLayer?.push({
                  event: "kyc_verification",
                  sellerId: sellerId,
                  business_type: businessType,
                  kyc_verified: true,
                });
                navigate("/onboarding/kyc");
              } else {
                setLoading(false);
                toast.error(response?.message);
                setShowAaddharOtpBox(false);
                setOTPNumber("");
                setVerifyOTP(false);
                //  navigate("/onboarding/kyc-form", {
                //    state: {
                //      aadharNo,
                //      panCard,
                //      gstNo,
                //    },
                //  });
              }
            } catch (error) {
              return error;
            }
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
              // window?.dataLayer?.push({
              //   event: "KYCVerification",
              //   sellerInfo: sessionStorage.getItem("userInfo"),
              // });
              // setLoading(false);
              // verifyPAN(panNumber);
              // toast.success(response?.message);
              //Navigate Url's go here
            } else {
              // window?.dataLayer?.push({
              //   event: "KYCVerification",
              //   sellerInfo: sessionStorage.getItem("userInfo"),
              // });
              setLoading(false);
              setOTPNumber("");
              toast.error(response?.message);
              navigate("/onboarding/kyc-aadhar-form");
            }
          } else {
            const payload = {
              gstIn: gstNumber,
              client_id: clientId_session,
              otp: Number(otpNumber),
            };

            setLoading(true);
            const { data: response } = await POST(POST_VERIFY_GST_OTP, payload);
            if (response?.success) {
              setLoading(false);
              verifyPAN(panNumber);
              toast.success(response?.message);
              // if (location?.state?.path === "otp-form") {
              navigate("/onboarding/kyc-aadhar-form");
            } else {
              setLoading(false);
              setOTPNumber("");
              toast.error(response?.message);
            }
          }
        } else if (businessType === "company") {
          setLoading(true);
          const payload = {
            gstIn: gstNumber,
            client_id: clientId_session,
            otp: otpNumber,
          };
          const { data: response } = await POST(POST_VERIFY_GST_OTP, payload);
          if (response?.success) {
            // setLoading(false);
            verifyPAN(panNumber);
            //gtm
            window?.dataLayer?.push({
              event: "kyc_verification",
              sellerId: sellerId,
              business_type: businessType,
              kyc_verified: true,
            });
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

  const sendOtpFormComponent = () => {
    return (
      <div
        className={`${
          isMdScreen ? " m-auto  !w-[500px] mt-60px" : "w-full !h-full"
        }flex flex-col relative md:px-0 md:gap-y-0`}
      >
        <div className={`${isMdScreen ? "custom_shadow" : ""}`}>
          <div className=" md:flex justify-between items-center shadow-md h-[60px] px-6 py-4 mb-6 ">
            <img src={LARGE_LOGO} alt="" className="h-[25px]" />
          </div>

          <WelcomeHeader
            className="!mt-[44px] md:!mt-6"
            title={`Welcome to ${WHITE_COMPANYNAME}`}
            content="Kindly complete your KYC"
          />

          <div>
            <div className="flex flex-col justify-center items-center mt-[104px]  px-5 md:px-0 gap-y-4 mb-6">
              {businessType === "individual" ? (
                <>
                  <div className={`${!isMdScreen ? "w-full" : ""}`}>
                    <CustomInputBox
                      containerStyle={`md:!w-auto`}
                      label="Aadhar Number"
                      id={"aadharNumber"}
                      inputType="text"
                      inputMode="numeric"
                      value={aadharNumber}
                      maxLength={12}
                      labelClassName="!font-Open"
                      className={` ${
                        aadharNumberError !== "" &&
                        aadharNumberError !== undefined &&
                        "!border-[#F35838]"
                      }
                  md:!w-[320px]   !font-Open`}
                      onChange={(e: any) => {
                        if (aadharRegex.test(e.target.value)) {
                          setAadharNumberError("");
                        } else {
                          setAadharNumberError("Enter Valid Aadhar Number");
                        }
                        setAadharNumber(e.target.value);
                      }}
                    />

                    {/* To display error */}

                    {aadharNumberError !== "" &&
                      aadharNumberError !== undefined && (
                        <div className="flex items-center gap-x-1 mt-1 ">
                          <img src={ErrorIcon} alt="" width={10} height={10} />

                          <span className="font-normal font-Open  text-[#F35838] text-[10px]">
                            {aadharNumberError}
                          </span>
                        </div>
                      )}
                  </div>

                  <div className={`${!isMdScreen ? "w-full" : ""}`}>
                    <CustomInputBox
                      containerStyle="md:!w-auto"
                      label="PAN Number"
                      id="panNumber"
                      value={panNumber}
                      maxLength={10}
                      isDisabled={
                        businessType === "individual"
                          ? false
                          : panNumber !== undefined
                      }
                      className={`${
                        panNumberError !== "" &&
                        panNumberError !== undefined &&
                        "border-[#F35838]"
                      }   md:!w-[320px] !font-Open`}
                      labelClassName="!font-Open"
                      onChange={(e) => {
                        if (panRegex.test(e.target.value.toUpperCase())) {
                          setPanNumberError("");
                        } else {
                          setPanNumberError("Enter Valid PAN Number");
                        }
                        setPanNumber(e.target.value.toUpperCase());
                      }}
                    />
                    {/* To display error */}
                    {panNumberError !== "" && panNumberError !== undefined && (
                      <div className="flex items-center gap-x-1 mt-1 ">
                        <img src={ErrorIcon} alt="" width={10} height={10} />
                        <span className="font-normal font-Open text-[#F35838] text-[10px]">
                          {panNumberError}
                        </span>
                      </div>
                    )}
                  </div>

                  {showAaddharOtpBox && (
                    <>
                      <div className={`${!isMdScreen ? "w-full" : ""}`}>
                        <CustomInputBox
                          label="Enter Aadhar OTP"
                          inputType="text"
                          id={"aadharOtp"}
                          inputMode="numeric"
                          containerStyle="md:!w-auto"
                          className=" md:!w-[320px] !font-Open "
                          labelClassName="!font-Open"
                          maxLength={6}
                          value={otpNumber || ""}
                          onChange={(e: any) => {
                            if (isNaN(e.target.value)) {
                            } else {
                              setOTPNumber(e.target.value);
                            }
                          }}
                        />
                      </div>
                      <TimerCounter sec={60} setOTPNumber={setOTPNumber} />
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className={`${!isMdScreen ? "w-full" : ""}`}>
                    <CustomInputBox
                      containerStyle="md:!w-auto"
                      label="GST Number"
                      value={gstNumber}
                      id={"gstNumber"}
                      maxLength={15}
                      className={`${
                        gstError !== "" &&
                        gstError !== undefined &&
                        "border-[#F35838]"
                      }  md:!w-[320px]   !font-Open`}
                      labelClassName="!font-Open"
                      onChange={(e) => {
                        const gstValue = e.target.value.toUpperCase();

                        if (gstRegex.test(gstValue)) {
                          setGSTNumber(gstValue);
                          extractPANFromGST(gstValue);
                          setgstError("");
                          setPanNumberError("");
                        } else {
                          setGSTNumber(gstValue);
                          setgstError("Enter Valid GST Number");
                          setPanNumber("");
                        }
                      }}
                    />

                    {/* To display error */}

                    {gstError !== "" && gstError !== undefined && (
                      <div className="flex items-center gap-x-1 mt-1 ">
                        <img src={ErrorIcon} alt="" width={10} height={10} />
                        <span className="font-normal font-Open text-[#F35838] text-[10px]">
                          {gstError}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className={`${!isMdScreen ? "w-full" : ""}`}>
                    <CustomInputBox
                      containerStyle="md:!w-auto"
                      id="pannumber"
                      label="PAN Number"
                      value={panNumber}
                      maxLength={10}
                      isDisabled={
                        businessType === "individual"
                          ? false
                          : panNumber !== undefined
                      }
                      className={`${
                        panNumberError !== "" &&
                        panNumberError !== undefined &&
                        "border-[#F35838]"
                      }   md:!w-[320px] !font-Open`}
                      labelClassName="!font-Open"
                      onChange={(e) => {
                        if (panRegex.test(e.target.value.toUpperCase())) {
                          setPanNumberError("");
                        } else {
                          setPanNumberError("Enter Valid PAN Number");
                        }
                        setPanNumber(e.target.value.toUpperCase());
                      }}
                    />
                    {/* To display error */}
                    {panNumberError !== "" && panNumberError !== undefined && (
                      <div className="flex items-center gap-x-1 mt-1 ">
                        <img src={ErrorIcon} alt="" width={10} height={10} />
                        <span className="font-normal font-Open text-[#F35838] text-[10px]">
                          {panNumberError}
                        </span>
                      </div>
                    )}
                  </div>
                  {showGstOtpBox && (
                    <>
                      <div className={`${!isMdScreen ? "w-full" : ""}`}>
                        <CustomInputBox
                          label="Enter GST OTP"
                          id={"gstOtp"}
                          inputType="text"
                          inputMode="numeric"
                          containerStyle="md:!w-auto"
                          className=" md:!w-[320px] !font-Open "
                          labelClassName="!font-Open"
                          maxLength={4}
                          value={otpNumber || ""}
                          onChange={(e: any) => {
                            if (isNaN(e.target.value)) {
                            } else {
                              setOTPNumber(e.target.value);
                            }
                          }}
                        />
                      </div>
                      <TimerCounter sec={30} />
                    </>
                  )}
                </>
              )}
            </div>
            <div className="flex  md:justify-center md:items-center px-5 pb-12">
              {verifyOTP ? (
                <ServiceButton
                  text="VERIFY OTP"
                  btnType="submit"
                  onClick={() => onVerifyOtp()}
                  disabled={!verifyBtnStatus}
                  className={`bg-[#1C1C1C] !h-[36px] text-white w-full mb-5 md:!w-[320px] !font-Open ${
                    verifyBtnStatus === true
                      ? "!bg-[#1C1C1C] !text-[#FFFFFF]"
                      : "!bg-[#E8E8E8] !text-[#BBBBBB] !border-0"
                  }`}
                />
              ) : (
                <ServiceButton
                  text="Get OTP"
                  disabled={!otpFormBtnStatus}
                  btnType="submit"
                  onClick={() => onSendOtp()}
                  className={`bg-[#1C1C1C] !h-[36px] text-white w-full mb-[180px] md:!w-[320px] !font-Open ${
                    otpFormBtnStatus === true
                      ? "!bg-[#1C1C1C] !text-[#FFFFFF]"
                      : "!bg-[#E8E8E8] !text-[#BBBBBB] !border-0"
                  }`}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSendOtpFormComponent = () => {
    if (isMdScreen) {
      return (
        <>
          {loading ? (
            <div className="flex justify-center items-center h-screen">
              <Spinner />
            </div>
          ) : (
            <div className="flex justify-center items-center h-screen">
              {sendOtpFormComponent()}
            </div>
          )}
        </>
      );
    } else {
      return loading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : (
        sendOtpFormComponent()
      );
    }
  };
  return <div>{renderSendOtpFormComponent()}</div>;
};

export default Index;
