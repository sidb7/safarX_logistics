import { useState } from "react";
import WelcomeHeader from "../welcomeHeader";
import { useMediaQuery } from "react-responsive";
import CustomInputBox from "../../../../components/Input";
import ServiceButton from "../../../../components/Button/ServiceButton";
import CustomBottomModal from "../../../../components/CustomModal/customBottomModal";
import CompanyLogo from "../../../../assets/Navbar/shipyaariLogos.svg";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setGSTNumber,
  setAadharNumber,
  setPANNumber,
  setErrorDetails,
  setVerifyDetailsForOtpBtn,
  setOtpFormBtnStatus,
  setNavigateOnOtpFormVerify,
} from "../../../../redux/reducers/onboarding";
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
  // const aadharRegex = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/gm;
  // const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/gm;
  // const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/gm;
  const [loading, setLoading] = useState(false);

  const businessType = useSelector(
    (state: any) => state?.onboarding.businessType
  );
  const gstNumber = useSelector((state: any) => state?.onboarding.gstNumber);
  const panNumber = useSelector((state: any) => state?.onboarding.panNumber);

  const aadharNumber = useSelector((state: any) =>
    state?.onboarding.aadharNumber === 0 ? "" : state?.onboarding.aadharNumber
  );

  const { gstError, panError, aadharError } = useSelector(
    (state: any) => state?.onboarding.errorDetails
  );
  const { aadharVerify, gstVerify, panVerify } = useSelector(
    (state: any) => state?.onboarding.verifyForOtpBtn
  );

  const { aadharVerifyNavigate, gstVerifyNavigate, panVerifyNavigate } =
    useSelector((state: any) => state?.onboarding.navigateOnOtpFormVerify);

  const otpFormBtnStatus = useSelector(
    (state: any) => state?.onboarding.otpFormBtnStatus
  );

  const [openModal, setOpenModal] = useState(true);
  const closeModal = () => setOpenModal(true);

  const isBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  if (businessType === "individual") {
    if (aadharVerify === true && panVerify === true) {
      dispatch(setOtpFormBtnStatus(true));
    } else {
      dispatch(setOtpFormBtnStatus(false));
    }
  } else {
    if (gstVerify === true && panVerify === true) {
      dispatch(setOtpFormBtnStatus(true));
    } else {
      dispatch(setOtpFormBtnStatus(false));
    }
  }

  const verifyAadhar = async (value: any) => {
    try {
      const payload = { adhaar_no: value };
      setLoading(true);
      const { data: response } = await POST(POST_VERIFY_AADHAR_URL, payload);

      if (response?.success) {
        setLoading(false);
        toast.success(response?.message);
        dispatch(setOnOtpClientId(response.data.data.client_id));
        dispatch(
          setNavigateOnOtpFormVerify({
            aadharVerifyNavigate: true,
          })
        );
        if (businessType === "individual") {
          setLoading(false);
          navigate("/onboarding/kyc-mobile-verify", {
            state: { path: "aadhaar-verification" },
          });
        }
      } else {
        setLoading(false);
        dispatch(
          setNavigateOnOtpFormVerify({
            aadharVerifyNavigate: false,
          })
        );

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
        dispatch(
          setNavigateOnOtpFormVerify({
            gstVerifyNavigate: true,
          })
        );
        if (businessType === "business" || businessType === "company") {
          setLoading(false);
          navigate("/onboarding/kyc-mobile-verify", {
            state: { path: "otp-form" },
          });
        } else {
          setLoading(false);
          navigate("/onboarding/kyc-mobile-verify");
        }
        dispatch(setOnOtpClientId(response.data[0].data.client_id));
      } else {
        setLoading(false);
        dispatch(
          setNavigateOnOtpFormVerify({
            gstVerifyNavigate: false,
          })
        );
        toast.error(response?.message);
      }
    } catch (error) {
      return error;
    }
  };

  const onSendOtp = (e: any) => {
    try {
      e.preventDefault();
      //Individual
      if (businessType === "individual") {
        if (aadharNumber === 0) {
          dispatch(setErrorDetails({ aadharError: "Enter Aadhar Number" }));
        }
        verifyAadhar(aadharNumber);
        if (panNumber === "") {
          dispatch(setErrorDetails({ panError: "Enter PAN Number" }));
        }

        if (businessType === "business") {
          navigate("/onboarding/kyc-mobile-verify", {
            state: { path: "otp-form" },
          });
        } else if (businessType === "company") {
          navigate("/onboarding/kyc-mobile-verify", {
            state: { path: "gst-verification" },
          });
        }
      }
      //Proprietor,Company
      else if (businessType === "business") {
        if (gstNumber === "") {
          dispatch(setErrorDetails({ gstError: "Enter GST Number" }));
        }
        verifyGST(gstNumber);

        // if (panNumber === "") {
        //   dispatch(setErrorDetails({ panError: "Enter PAN Number" }));
        // }
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
                  className={` ${aadharError !== "" && "!border-[#F35838]"}
                  lg:!w-[320px]   !font-Open`}
                  onChange={(e: any) => {
                    if (!aadharRegex.test(e.target.value)) {
                      dispatch(
                        setErrorDetails({
                          aadharError: "Enter Valid Aadhar Number",
                        })
                      );

                      dispatch(
                        setVerifyDetailsForOtpBtn({
                          aadharVerify: false,
                        })
                      );
                    } else {
                      dispatch(
                        setErrorDetails({
                          aadharError: "",
                        })
                      );
                      dispatch(
                        setVerifyDetailsForOtpBtn({
                          aadharVerify: true,
                        })
                      );
                    }

                    dispatch(setAadharNumber(e.target.value));
                  }}
                />

                {/* To display error */}
                {aadharError !== "" && (
                  <div className="flex items-center gap-x-1 mt-1 ">
                    <img src={ErrorIcon} alt="" width={10} height={10} />
                    <span className="font-normal font-Open  text-[#F35838] text-[10px]">
                      {aadharError}
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
                    gstError !== "" && "border-[#F35838]"
                  }  lg:!w-[320px]   !font-Open`}
                  labelClassName="!font-Open"
                  onChange={(e) => {
                    dispatch(setGSTNumber(e.target.value));
                    if (!gstRegex.test(e.target.value)) {
                      dispatch(
                        setErrorDetails({
                          gstError: "Enter Valid GST Number",
                        })
                      );

                      dispatch(
                        setVerifyDetailsForOtpBtn({
                          gstVerify: false,
                        })
                      );
                    } else {
                      dispatch(
                        setErrorDetails({
                          gstError: "",
                        })
                      );

                      dispatch(setVerifyDetailsForOtpBtn({ gstVerify: true }));
                    }
                  }}
                />
                {/* To display error */}
                {gstError !== "" && (
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
                  panError !== "" && "border-[#F35838]"
                }   lg:!w-[320px] !font-Open`}
                labelClassName="!font-Open"
                onChange={(e) => {
                  dispatch(setPANNumber(e.target.value.toUpperCase()));
                  if (!panRegex.test(e.target.value.toUpperCase())) {
                    dispatch(
                      setErrorDetails({
                        panError: "Enter Valid PAN Number",
                      })
                    );

                    dispatch(
                      setVerifyDetailsForOtpBtn({
                        panVerify: false,
                      })
                    );
                  } else {
                    dispatch(
                      setErrorDetails({
                        panError: "",
                      })
                    );
                    dispatch(setVerifyDetailsForOtpBtn({ panVerify: true }));
                  }
                }}
              />
              {/* To display error */}
              {panError !== "" && (
                <div className="flex items-center gap-x-1 mt-1 ">
                  <img src={ErrorIcon} alt="" width={10} height={10} />
                  <span className="font-normal font-Open text-[#F35838] text-[10px]">
                    {panError}
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
