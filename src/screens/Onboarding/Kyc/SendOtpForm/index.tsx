import { useEffect, useState } from "react";
import WelcomeHeader from "../welcomeHeader";
import { useMediaQuery } from "react-responsive";
import CustomInputBox from "../../../../components/Input";
import ServiceButton from "../../../../components/Button/ServiceButton";
import CustomBottomModal from "../../../../components/CustomModal/customBottomModal";
import CompanyLogo from "../../../../assets/Navbar/shipyaariLogos.svg";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { POST } from "../../../../utils/webService";
import {
  POST_VERIFY_AADHAR_URL,
  POST_VERIFY_GST_URL,
  POST_VERIFY_PAN_URL,
} from "../../../../utils/ApiUrls";
import { aadharRegex, panRegex, gstRegex } from "../../../../utils/regexCheck";
import { setOnOtpClientId } from "../../../../redux/reducers/onboarding";
import { toast } from "react-toastify";
import ErrorIcon from "../../../../assets/common/info-circle.svg";
import { Spinner } from "../../../../components/Spinner";

interface ITypeProps {}

const Index = (props: ITypeProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [businessType, setBusinessType] = useState<any>();

  const [aadharNumber, setAadharNumber] = useState<any>();
  const [aadharNumberError, setAadharNumberError] = useState<any>();

  const [panNumber, setPanNumber] = useState<any>();
  const [panNumberError, setPanNumberError] = useState<any>();

  const [gstNumber, setGSTNumber] = useState<any>();
  const [gstError, setgstError] = useState<any>("");

  const [otpFormBtnStatus, setOtpFormBtnStatus] = useState(false);

  const [openModal, setOpenModal] = useState(true);
  const closeModal = () => setOpenModal(true);

  const isBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  useEffect(() => {
    let btype = sessionStorage.getItem("businessType");
    setBusinessType(btype);
  }, []);

  function validateGST(gstNo: any) {
    return gstRegex.test(gstNo);
  }

  function extractPANFromGST(gstNumber: any) {
    if (!gstNumber || gstNumber.length !== 15) {
      return null;
    }

    const panNumber = gstNumber.substring(2, 12);
    setPanNumber(panNumber);
    return panNumber;
  }

  useEffect(() => {
    if (gstNumber !== "" && gstNumber !== undefined) {
      if (validateGST(gstNumber)) {
        extractPANFromGST(gstNumber);

        setgstError("");
      } else {
        setgstError("Enter Valid GST Number");
      }
    }
  }, [gstNumber]);

  const verifyAadhar = async (value: any) => {
    try {
      const payload = { adhaar_no: value };
      setLoading(true);
      const { data: response } = await POST(POST_VERIFY_AADHAR_URL, payload);

      if (response?.success) {
        setLoading(false);
        toast.success(response?.message);
        sessionStorage.setItem("aadharNumber", value);
        sessionStorage.setItem("panNumber", panNumber);

        sessionStorage.setItem("client_id", response.data.data.client_id);

        if (businessType === "individual") {
          setLoading(false);
          navigate("/onboarding/kyc-mobile-verify", {
            state: { path: "aadhaar-verification" },
          });
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
    try {
      setLoading(true);
      const payload = { gstIn: value };
      const { data: response } = await POST(POST_VERIFY_GST_URL, payload);

      if (response?.success) {
        setLoading(false);
        sessionStorage.setItem("gstNumber", value);
        sessionStorage.setItem("panNumber", panNumber);

        if (businessType === "business" || businessType === "company") {
          setLoading(false);
          sessionStorage.setItem("client_id", response.data[0].data.client_id);
          navigate("/onboarding/kyc-mobile-verify", {
            state: { path: "otp-form" },
          });
        } else {
          setLoading(false);
          navigate("/onboarding/kyc-mobile-verify");
        }
      } else {
        setLoading(false);

        toast.error(response?.message);
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    console.log("useEffect :", gstNumber, aadharNumber, panNumber);

    if (
      ((aadharNumber &&
        aadharNumber?.length !== 0 &&
        aadharNumberError === "") ||
        (gstNumber && gstNumber?.length !== 0 && gstError === "")) &&
      panNumber
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

  const onSendOtp = (e: any) => {
    try {
      e.preventDefault();
      //Individual
      if (businessType === "individual") {
        verifyAadhar(aadharNumber);
      }
      //Proprietor,Company
      else if (businessType === "business") {
        verifyGST(gstNumber);
      } else if (businessType === "company") {
        navigate("/onboarding/kyc-mobile-verify", {
          state: { path: "otp-form" },
        });
        verifyGST(gstNumber);
      } else {
        toast.error("Something Went Wrong!!");
      }
    } catch (error) {}
  };

  const sendOtpFormComponent = () => {
    return (
      <div className=" lg:px-0">
        <div className=" lg:flex justify-between items-center shadow-md h-[60px] px-6 py-4 mb-6 ">
          <img src={CompanyLogo} alt="" />
        </div>

        <WelcomeHeader
          // className="!mt-[78px]"
          title="Welcome to Shipyaari"
          content="Kindly complete your KYC"
        />

        <form onSubmit={onSendOtp}>
          <div className="flex flex-col justify-center items-center mt-[104px] lg:mt-[160px] px-5 lg:px-0 gap-y-5 mb-6">
            {businessType === "individual" ? (
              <div className={`${!isBigScreen ? "w-full" : ""}`}>
                <CustomInputBox
                  containerStyle={`lg:!w-auto`}
                  label="Aadhar Number"
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
                  lg:!w-[320px]   !font-Open`}
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
            ) : (
              <div className={`${!isBigScreen ? "w-full" : ""}`}>
                <CustomInputBox
                  containerStyle="lg:!w-auto"
                  label="GST Number"
                  value={gstNumber}
                  maxLength={15}
                  className={` ${
                    gstError !== "" &&
                    gstError !== undefined &&
                    "border-[#F35838]"
                  }  lg:!w-[320px]   !font-Open`}
                  labelClassName="!font-Open"
                  onChange={(e) => {
                    setGSTNumber(e.target.value.toUpperCase());
                  }}
                />
                {/* To display error */}
                {console.log("gstError ", gstError) as any}
                {gstError !== "" && gstError !== undefined && (
                  <div className="flex items-center gap-x-1 mt-1 ">
                    <img src={ErrorIcon} alt="" width={10} height={10} />
                    <span className="font-normal font-Open text-[#F35838] text-[10px]">
                      {gstError}
                    </span>
                  </div>
                )}
              </div>
            )}
            <div className={`${!isBigScreen ? "w-full" : ""}`}>
              <CustomInputBox
                containerStyle="lg:!w-auto"
                label="PAN Number"
                value={panNumber}
                maxLength={10}
                className={`${
                  panNumberError !== "" &&
                  panNumberError !== undefined &&
                  "border-[#F35838]"
                }   lg:!w-[320px] !font-Open`}
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
          </div>
          <div className="flex  lg:justify-center lg:items-center px-5 pb-12">
            <ServiceButton
              text="SEND OTP"
              disabled={!otpFormBtnStatus}
              btnType="submit"
              className={`bg-[#1C1C1C] !h-[36px] text-white w-full mb-5 lg:!w-[320px] !font-Open ${
                otpFormBtnStatus === true
                  ? "!bg-[#1C1C1C] !text-[#FFFFFF]"
                  : "!bg-[#E8E8E8] !text-[#BBBBBB] !border-0"
              }`}
            />
          </div>
        </form>
      </div>
    );
  };

  return (
    <div>
      {!isBigScreen && sendOtpFormComponent()}

      {isBigScreen && (
        <CustomBottomModal
          isOpen={openModal}
          onRequestClose={closeModal}
          className="!p-0 !w-[500px] !h-[700px]"
          overlayClassName="!flex   items-center"
        >
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Spinner />
            </div>
          ) : (
            sendOtpFormComponent()
          )}
        </CustomBottomModal>
      )}
    </div>
  );
};

export default Index;
