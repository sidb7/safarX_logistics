import React, { useEffect, useState } from "react";
import Checkbox from "../../../../components/CheckBox";
import CustomInputBox from "../../../../components/Input";
import TimerCounter from "../../../../components/TimerCountdown";
import CustomRadioButton from "../../../../components/RadioButton/Index";
import OneButton from "../../../../components/Button/OneButton";
import { aadharRegex, gstRegex, panRegex } from "../../../../utils/regexCheck";
import ErrorIcon from "../../../../assets/common/info-circle.svg";
import toast from "react-hot-toast";
import { POST } from "../../../../utils/webService";
import {
  COMPANY_NAME,
  GST_AGREEMENTS,
  LARGE_LOGO,
  POST_ACCEPT_AGREEMENTS,
  POST_BUSINESS_TYPE_URL,
  POST_VERIFY_AADHAR_OTP_URL,
  POST_VERIFY_AADHAR_URL,
  POST_VERIFY_GST_OTP,
  POST_VERIFY_GST_URL,
  POST_VERIFY_PAN_URL,
} from "../../../../utils/ApiUrls";
import InfoIcon from "../../../../assets/info.svg";
import { ResponsiveState } from "../../../../utils/responsiveState";
import { Tooltip } from "react-tooltip";
import CenterModal from "../../../../components/CustomModal/customCenterModal";
import Card from "../../../Onboarding/Kyc/TermsAndAgreement/Card";
import WelcomeHeader from "../../../Onboarding/Kyc/welcomeHeader";
import CloseIcon from "../../../../assets/CloseIcon.svg";
import GstContent from "../../../Onboarding/Kyc/TermsAndAgreement/gstAgreementContent";

interface IKycSectionProps {
  loadingState?: boolean;
  setLoadingState?: any;
}

const KycSection: React.FunctionComponent<IKycSectionProps> = ({
  loadingState,
  setLoadingState,
}) => {
  const [userState, setIsUserState] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState<any>({
    individual: true,
    company: false,
  });
  const [checkbox, setCheckbox] = useState();
  const [businessType, setBusinessType] = useState("individual");
  const [aadharNumber, setAadharNumber] = useState<any>("");
  const [panNumber, setPanNumber] = useState<any>("");
  const [gstNumber, setGSTNumber] = useState<any>("");
  const [aadharNumberError, setAadharNumberError] = useState<any>();
  const [panNumberError, setPanNumberError] = useState<any>();
  const [gstError, setgstError] = useState<any>("");
  const [otpFormBtnStatus, setOtpFormBtnStatus] = useState(false);
  const [verifyBtnStatus, setVerifyBtnStatus] = useState(false);
  const [otpNumber, setOTPNumber] = useState<any>();
  const [showAaddharOtpBox, setShowAaddharOtpBox] = useState<any>();
  const [showGstOtpBox, setShowgstOtpBox] = useState<any>();
  const [verifyOTP, setVerifyOTP] = useState<any>();
  const [clientId, setClientId] = useState<any>();
  const [otpSuccess, setOtpSuccess] = useState<boolean>(false);
  const [acceptTnC, setAcceptTnC] = useState<any>();
  const [isBusinessVerified, setIsBusinessVerified] = useState(false);
  const sellerId = localStorage.getItem("sellerId");
  const [isModalOpenForServiceAgreement, setIsModalOpenForServiceAgreement] =
    useState<any>(false);
  const [isModalOpenForNonGstAgreement, setIsModalOpenForNonGstAgreement] =
    useState<any>(false);
  const { isLgScreen, isMdScreen, isMobileScreen } = ResponsiveState();
  const userNameForGst = localStorage.getItem("userName");

  // Handle selection change
  const handleSelect = (type: any) => {
    if (otpSuccess) {
      return;
    }

    setChecked({
      individual: type === "individual",
      company: type === "company",
    });

    // Reset values based on the selected type
    if (type === "individual") {
      setGSTNumber(""); // Reset GST Number if switching to individual
      setPanNumber(""); // Reset PAN Number if switching to individual
    } else if (type === "company") {
      setAadharNumber(""); // Reset Aadhar Number if switching to company
      setPanNumber(""); // Reset PAN Number if switching to company
    }
  };

  const handleGSTNumberChange = (e: any) => {
    const gstValue = e.target.value.toUpperCase(); // Convert to uppercase for consistency
    setGSTNumber(gstValue); // Allow input without validation

    // Validate GST number only after the user has entered the full 15 characters
    if (gstValue.length === 15 && gstRegex.test(gstValue)) {
      extractPANFromGST(gstValue); // Extract PAN from the valid GST number
      setgstError(""); // Clear any previous GST error
      setPanNumberError(""); // Clear PAN error

      // Extract the 6th character from GST number to determine the business type
      const sixthChar = gstValue.charAt(5);
      if (sixthChar === "C" || sixthChar === "F") {
        // If 6th character is 'C' or 'F', classify as "Company"
        setBusinessType("company");
        setChecked({ individual: false, company: true });
      } else {
        // For other characters, classify as "Business"
        setBusinessType("business");
        setChecked({ individual: false, company: true });
      }
    } else if (gstValue.length === 15) {
      // If GST number is invalid, show error after the full input
      setgstError("Enter a valid GST Number");
      setPanNumber(""); // Clear PAN number on invalid GST
    }
  };

  function extractPANFromGST(gstValue: any) {
    if (!gstValue || gstValue.length !== 15) {
      return null;
    }

    const panNumber = gstValue.substring(2, 12);
    setPanNumber(panNumber);
    return panNumber;
  }

  const onSubmitBusinessType = async () => {
    try {
      // let businessType = localStorage.getItem("businessType");
      const payload = { businessType };
      setLoading(true);
      const { data: response } = await POST(POST_BUSINESS_TYPE_URL, payload);
      if (response?.success) {
        // window?.dataLayer?.push({
        //   event: "seller_kyc_type",
        //   sellerId: sellerId,
        //   seller_kyc_type: selectedKycOption,
        // });
        localStorage.setItem("businessType", payload?.businessType);
        setLoading(false);

        if (payload.businessType === "individual") {
          // navigate("/onboarding/kyc-terms/gst-agreement");
        } else {
          // navigate("/onboarding/kyc-terms/service-agreement");
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

  const acceptStatusForNonGST = async () => {
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
        // navigate("/onboarding/kyc-terms/service-agreement");
      } else {
        setLoading(false);
        toast.error(responses?.message);
        // navigate("/onboarding/kyc-terms/service-agreement");
      }
    } catch (error) {
      return error;
    }
  };

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

        // navigate("/onboarding/kyc-form");
      } else {
        setLoading(false);
        toast.error(response?.message);
        // navigate("/onboarding/kyc-terms/service-agreement");
      }
    } catch (error) {
      return error;
    }
  };

  const getAadharOtp = async (value: any) => {
    try {
      const payload = { adhaar_no: value };
      setLoading(true);
      const { data: response } = await POST(POST_VERIFY_AADHAR_URL, payload);

      if (response?.success) {
        setOtpSuccess(true);
        setLoadingState(true);
        setLoading(false);
        toast.success(response?.message);
        setShowAaddharOtpBox(true);
        setVerifyOTP(true);

        localStorage.setItem("aadharNumber", value);
        localStorage.setItem("panNumber", panNumber);
        localStorage.setItem("client_id", response.data.data.client_id);
        setClientId(response?.data?.data?.client_id);
        let clientIdSession = localStorage.getItem("client_id");
      } else {
        setLoading(false);

        toast.error(response?.message);
      }
    } catch (error) {
      return error;
    }
  };

  const getGSTOtp = async (value: any) => {
    try {
      setLoading(true);
      const payload = { gstIn: value };
      const { data: response } = await POST(POST_VERIFY_GST_URL, payload);

      if (response?.success) {
        setOtpSuccess(true);
        setLoadingState(true);
        setLoading(false);
        localStorage.setItem("gstNumber", value);
        localStorage.setItem("panNumber", panNumber);
        localStorage.setItem("client_id", response.data[0].data.client_id);
        setShowgstOtpBox(true);
        setVerifyOTP(true);
        setgstError("");
      } else {
        setLoading(false);

        toast.error(response?.message);
      }
    } catch (error) {
      return error;
    }
  };

  const handleSubmit = async () => {
    try {
      // 1. Submit the business type
      await onSubmitBusinessType();

      // Check if business type is individual before calling the next functions
      if (businessType === "individual") {
        // 2. Accept status for non-GST
        await acceptStatusForNonGST();
      }

      // 3. Accept service
      await acceptService();

      // 4. Send OTP (merged logic)
      if (checked.individual) {
        await getAadharOtp(aadharNumber); // Individual case
      } else if (checked.company) {
        await getGSTOtp(gstNumber); // Proprietor or Company case
      } else {
        toast.error("Something Went Wrong!!");
      }

      // You can add additional logic if needed after all API calls succeed
    } catch (error) {
      console.error("An error occurred during the process:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handlePostBusinessVerification = async () => {
    if (isBusinessVerified && businessType === "business") {
      await getAadharOtp(aadharNumber); // Business case
      return;
    }
  };

  const verifyPAN = async (value: any) => {
    try {
      const payload = { pan_no: value };
      const { data: response } = await POST(POST_VERIFY_PAN_URL, payload);

      localStorage.setItem("fullname", response?.data?.data?.full_name_split);
      if (response?.success) {
        setVerifyOTP(false);
        if (businessType === "company") {
          setLoadingState(false);
          window.location.reload();
        }
        setShowAaddharOtpBox(false);
        setShowgstOtpBox(false);

        window?.dataLayer?.push({
          event: "kyc_verification",
          sellerId: sellerId,
          business_type: businessType,
          kyc_verified: true,
        });
        setLoading(false);

        if (businessType === "business") {
          // navigate("/onboarding/kyc-aadhar-form");
          setIsBusinessVerified(true);
          setVerifyOTP(false);
          setShowAaddharOtpBox(false);
        }
      } else {
        setLoading(false);
        toast.error(response?.message);
      }
    } catch (error) {
      return error;
    }
  };

  const onVerifyOtp = async () => {
    try {
      if (Number(otpNumber) !== 0) {
        let clientId_session = localStorage.getItem("client_id");
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
            setOTPNumber("");
            setShowAaddharOtpBox(false);
            setVerifyOTP(false);
            try {
              const payload = { pan_no: panNumber };
              const { data: response } = await POST(
                POST_VERIFY_PAN_URL,
                payload
              );

              localStorage.setItem(
                "fullname",
                response?.data?.data?.full_name_split
              );
              if (response?.success) {
                setVerifyOTP(false);
                setShowAaddharOtpBox(false);
                setShowgstOtpBox(false);
                setLoadingState(false);
                setLoading(false);
                toast.success("KYC Successfully Verified");
                window?.dataLayer?.push({
                  event: "kyc_verification",
                  sellerId: sellerId,
                  business_type: businessType,
                  kyc_verified: true,
                });
                window.location.reload();
                // navigate("/onboarding/kyc");
              } else {
                setLoading(false);
                toast.error(response?.message);
                setShowAaddharOtpBox(false);
                setOTPNumber("");
                setVerifyOTP(false);
              }
            } catch (error) {
              return error;
            }
          } else {
            toast.error(response?.message);
            setLoading(false);
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
            setOTPNumber("");
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
            setOTPNumber("");
            toast.error(response?.message);
          }
        } else if (businessType === "business")
          if (!isBusinessVerified) {
            setLoading(true);
            const payload = {
              gstIn: gstNumber,
              client_id: clientId_session,
              otp: otpNumber,
            };
            const { data: response } = await POST(POST_VERIFY_GST_OTP, payload);
            if (response?.success) {
              setOTPNumber("");
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
              // setLoading(false);
              setOTPNumber("");
              toast.error(response?.message);
            }
          } else {
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
              // setLoading(false);
              setLoadingState(false);
              window.location.reload();
            } else {
              toast.error(response?.message);
              setLoadingState(true);
            }
          }
      } else {
        toast.error("Enter OTP");
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
      setOtpFormBtnStatus(true);
    } else {
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

  useEffect(() => {
    if (checked.individual) {
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

  useEffect(() => {
    let data = localStorage.getItem("userInfo") as any;
    data = JSON.parse(data);

    if (data !== "" && data !== null) {
      setIsUserState(data);
    }
    const localAcceptTnC = localStorage.getItem("setAcceptTnCStatus") as any;
    setAcceptTnC(localAcceptTnC);
  }, []);

  return (
    <>
      <div className="flex flex-col">
        {/* radio button section to select the type */}
        <div className="flex justify-start items-center gap-x-2 pt-4">
          <div
            onClick={() => handleSelect("individual")}
            className={`${
              otpSuccess ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <div className="flex flex-col">
              <div className="flex items-center h-6 gap-x-2 ">
                <CustomRadioButton
                  name={"business"}
                  value={"individual"}
                  // style={{ accentColor: "black" }}
                  disabled={otpSuccess}
                  inputClassName={`${
                    otpSuccess ? "!cursor-not-allowed" : "!cursor-pointer"
                  }`}
                  onChange={() => handleSelect("individual")}
                  checked={checked.individual} // Control the checked state
                />
                <p className="capitalize font-Open text-[15px] lg:text-sm font-normal lg:font-semibold leading-8 lg:!leading-[18px] lg:tracking-wide mr-2">
                  {"Individual"}
                </p>
              </div>
            </div>
          </div>
          <div
            onClick={() => handleSelect("company")}
            className={`${
              otpSuccess ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <div className="flex flex-col">
              <div className="flex items-center h-6 gap-x-2 ">
                <CustomRadioButton
                  name={"business"}
                  value={"company"}
                  // style={{ accentColor: "black" }}
                  disabled={otpSuccess}
                  inputClassName={`${
                    otpSuccess ? "!cursor-not-allowed" : "!cursor-pointer"
                  }`}
                  onChange={() => handleSelect("company")}
                  checked={checked.company} // Control the checked state
                />
                <p className="capitalize font-Open text-[15px] lg:text-sm font-normal lg:font-semibold leading-8 lg:!leading-[18px] lg:tracking-wide mr-2">
                  {"Company"}
                </p>
              </div>
            </div>
          </div>
        </div>
        {!isBusinessVerified ? (
          <>
            {/* agreement modal part  */}
            <div className="py-3">
              {checked?.individual ? (
                <>
                  <span
                    className="font-Open text-[13px] lg:text-base font-normal leading-8 text-[#004EFF] cursor-pointer"
                    onClick={() => setIsModalOpenForNonGstAgreement(true)}
                  >
                    [Declaration of GST Non-Enrolment]{" "}
                  </span>
                  <span className="text-[#697586] px-[2px]"> &</span>{" "}
                </>
              ) : (
                <></>
              )}

              <span
                className="font-Open text-[13px] lg:text-base font-normal leading-6 text-[#004EFF] cursor-pointer"
                onClick={() => setIsModalOpenForServiceAgreement(true)}
              >
                [Service Agreement]
              </span>
            </div>
            {/* new checkbox functionality implemented */}
            <div className="pb-3">
              <Checkbox
                checked={false}
                onChange={(e: any) => setCheckbox(e.value)}
                disabled={otpSuccess}
                name={"I Agree with the terms & conditions"}
                label={"I Agree with the terms & conditions"}
                style={{ accentColor: "black", width: "14px", height: "14px" }}
                checkboxClassName="gap-2 "
                labelClassName="!font-Open !text-[13px] lg:!text-base !font-normal !leading-5 text-![#494949] self-start lg:!tracking-wide"
              />
            </div>
            {/* kyc journey   */}
            <div>
              {checked?.individual ? (
                <>
                  <div className="flex flex-col  md:flex md:flex-row gap-5 pt-1">
                    {/* aadhaar details */}
                    <div className="min-w-[240px]">
                      <CustomInputBox
                        containerStyle={`lg:!w-auto`}
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
                        isDisabled={otpSuccess}
                      />

                      {/* To display error */}

                      {aadharNumberError !== "" &&
                        aadharNumberError !== undefined && (
                          <div className="flex items-center gap-x-1 mt-1 ">
                            <img
                              src={ErrorIcon}
                              alt=""
                              width={10}
                              height={10}
                            />

                            <span className="font-normal font-Open  text-[#F35838] text-[10px]">
                              {aadharNumberError}
                            </span>
                          </div>
                        )}
                    </div>
                    {/* pan details  */}
                    <div className="min-w-[240px]">
                      <CustomInputBox
                        containerStyle="lg:!w-auto"
                        label="PAN Number"
                        id="panNumber"
                        value={panNumber}
                        maxLength={10}
                        // isDisabled={
                        //   businessType === "individual"
                        //     ? false
                        //     : panNumber !== undefined
                        // }
                        isDisabled={otpSuccess}
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
                      {panNumberError !== "" &&
                        panNumberError !== undefined && (
                          <div className="flex items-center gap-x-1 mt-1 ">
                            <img
                              src={ErrorIcon}
                              alt=""
                              width={10}
                              height={10}
                            />
                            <span className="font-normal font-Open text-[#F35838] text-[10px]">
                              {panNumberError}
                            </span>
                          </div>
                        )}
                    </div>
                  </div>
                  {showAaddharOtpBox && (
                    <>
                      <div className="flex flex-col min-w-[240px] gap-5 pt-5">
                        {/* <div className={`${!isMdScreen ? "w-full" : ""}`}> */}
                        <div className="">
                          <CustomInputBox
                            label="Enter Aadhar OTP"
                            inputType="text"
                            id={"aadharOtp"}
                            inputMode="numeric"
                            containerStyle={`lg:!w-auto`}
                            className="md:!w-[320px] !font-Open`"
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
                        <div>
                          <TimerCounter sec={59} setOTPNumber={setOTPNumber} />
                        </div>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className="flex flex-col  md:flex md:flex-row gap-5 pt-1">
                    <div className="min-w-[240px]">
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
                        onChange={(e: any) => handleGSTNumberChange(e)}
                        isDisabled={otpSuccess}
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

                    <div className="min-w-[240px]">
                      <CustomInputBox
                        containerStyle="lg:!w-auto"
                        label="PAN Number"
                        id="panNumber"
                        value={panNumber}
                        maxLength={10}
                        isDisabled={
                          checked?.individual || otpSuccess
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
                      {panNumberError !== "" &&
                        panNumberError !== undefined && (
                          <div className="flex items-center gap-x-1 mt-1 ">
                            <img
                              src={ErrorIcon}
                              alt=""
                              width={10}
                              height={10}
                            />
                            <span className="font-normal font-Open text-[#F35838] text-[10px]">
                              {panNumberError}
                            </span>
                          </div>
                        )}
                    </div>
                  </div>
                  {showGstOtpBox && (
                    <>
                      <div className="flex flex-col min-w-[240px] gap-5 pt-5">
                        {/* <div className={`${!isMdScreen ? "w-full" : ""}`}> */}
                        <div className="">
                          <CustomInputBox
                            label="Enter GST OTP"
                            id={"gstOtp"}
                            inputType="text"
                            inputMode="numeric"
                            containerStyle={`lg:!w-auto`}
                            className="md:!w-[320px] !font-Open`"
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
                        <div>
                          <TimerCounter sec={59} setOTPNumber={setOTPNumber} />
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
              {/* send otp part  */}

              <div
                className={`flex justify-start ${
                  showAaddharOtpBox || showGstOtpBox ? "null" : "pt-4"
                }`}
              >
                {verifyOTP ? (
                  <>
                    <OneButton
                      text={loading ? "Submitting..." : "Submit"}
                      onClick={onVerifyOtp}
                      disabled={!checkbox || !otpFormBtnStatus || loading}
                      variant="tertiary"
                      className="!bg-transparent"
                    />
                  </>
                ) : (
                  <>
                    <OneButton
                      text={loading ? "Sending OTP..." : "Send OTP"}
                      onClick={handleSubmit}
                      disabled={!checkbox || !otpFormBtnStatus || loading}
                      variant="tertiary"
                      className="!bg-transparent"
                    />
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex gap-y-4 pt-4">
              <p className="font-Open text-sm font-normal leading-4 text-[#1C1C1C]">
                GST Number :{" "}
                <span className="font-Open text-[15px] font-semibold leading-4 text-[#1C1C1C] mr-9">
                  {gstNumber}
                </span>{" "}
              </p>
              <p className="font-Open text-sm font-normal leading-4 text-[#1C1C1C]">
                GST Number :{" "}
                <span className="font-Open text-[15px] font-semibold leading-4 text-[#1C1C1C]">
                  {gstNumber}
                </span>{" "}
              </p>
            </div>

            <div className="flex flex-col  md:flex md:flex-row gap-5 pt-4">
              {/* aadhaar details */}
              <div className="min-w-[240px]">
                <CustomInputBox
                  containerStyle={`lg:!w-auto`}
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
                  // isDisabled={otpSuccess}
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
              {isMdScreen && (
                <>
                  <img
                    src={InfoIcon}
                    alt="tooltip-icon"
                    className={`${"cursor-pointer"}`}
                    data-tooltip-id="my-tooltip-aadhar-info-for-business"
                    data-tooltip-content={`${"Verify your Aadhaar for identity authentication and GST compliance."}`}
                  />

                  <Tooltip
                    id="my-tooltip-aadhar-info-for-business"
                    style={{
                      zIndex: 10,
                      backgroundColor: "#4D83FF",
                      borderRadius: "6px",
                      position: "absolute",
                      color: "#FFFFFF",
                      width: "280px",
                      fontSize: "12px",
                      lineHeight: "14px",
                      fontFamily: "Open Sans",
                      fontWeight: "500",
                      letterSpacing: "1px",
                      textTransform: "capitalize",
                    }}
                  />
                </>
              )}
            </div>
            {showAaddharOtpBox && (
              <>
                <div className="flex flex-col min-w-[240px] gap-5 pt-5">
                  {/* <div className={`${!isMdScreen ? "w-full" : ""}`}> */}
                  <div className="">
                    <CustomInputBox
                      label="Enter Aadhar OTP"
                      inputType="text"
                      id={"aadharOtp"}
                      inputMode="numeric"
                      containerStyle={`lg:!w-auto`}
                      className="md:!w-[320px] !font-Open`"
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
                  <div>
                    <TimerCounter
                      sec={59}
                      // setOTPNumber={setOTPNumber}
                      routeCheck={true}
                    />
                  </div>
                </div>
              </>
            )}

            {/* send otp  */}

            <div
              className={`flex justify-start ${
                showAaddharOtpBox || showGstOtpBox ? "null" : "pt-4"
              }`}
            >
              {verifyOTP ? (
                <>
                  <OneButton
                    text={loading ? "Submitting..." : "Submit"}
                    onClick={onVerifyOtp}
                    disabled={!checkbox || !otpFormBtnStatus || loading}
                    variant="tertiary"
                    className="!bg-transparent"
                  />
                </>
              ) : (
                <>
                  <OneButton
                    text={loading ? "sending OTP..." : "Send OTP"}
                    onClick={handlePostBusinessVerification}
                    disabled={!checkbox || !otpFormBtnStatus || loading}
                    variant="tertiary"
                    className="!bg-transparent"
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>
      {/* service agreement  */}
      <CenterModal
        isOpen={isModalOpenForServiceAgreement}
        onRequestClose={() => setIsModalOpenForServiceAgreement(false)}
        className="!flex !justify-center !items-center w-[60%] lg:!w-3/4 lg:!h-3/4 xl:!w-[45%]  xl:!h-2/3"
      >
        <div className="product-box  bg-white flex justify-between items-center w-full h-[60px] top-0 px-5">
          <img src={LARGE_LOGO} alt="" className="h-[25px]" />
          <img
            src={CloseIcon}
            alt="close-icon"
            onClick={() => setIsModalOpenForServiceAgreement(false)}
            className="cursor-pointer"
          />
        </div>
        <WelcomeHeader
          className=""
          title={`Welcome to ${COMPANY_NAME}`}
          content="Terms & Agreement"
        />
        {/* <ServiceAgreementContent /> */}
        <div className=" px-5 md:mb-5 md:mx-5 ">
          <Card
            title="SERVICE AGREEMENT"
            subTitleOne="Forward delivery of the shipments"
          />
        </div>
      </CenterModal>
      {/* GST Non-Enrolment  */}
      <CenterModal
        isOpen={isModalOpenForNonGstAgreement}
        onRequestClose={() => setIsModalOpenForNonGstAgreement(false)}
        className="!flex !justify-center !items-center lg:!w-3/4 lg:!h-3/4 xl:!w-[45%]  xl:!h-2/3"
      >
        <div className="product-box  bg-white flex justify-between items-center w-full h-[60px] top-0 px-5">
          <img src={LARGE_LOGO} alt="" className="h-[25px]" />
          <img
            src={CloseIcon}
            alt="close-icon"
            onClick={() => setIsModalOpenForNonGstAgreement(false)}
            className="cursor-pointer"
          />
        </div>
        <WelcomeHeader
          className=""
          title={`Welcome to ${COMPANY_NAME}`}
          content="Terms & Agreement"
        />
        {/* <ServiceAgreementContent /> */}
        <div className="md:mb-5">
          <GstContent userNameForGst={userNameForGst} />
        </div>
      </CenterModal>
    </>
  );
};

export default KycSection;
