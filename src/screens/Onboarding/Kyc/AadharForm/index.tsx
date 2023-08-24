import { useState } from "react";
import WelcomeHeader from "../welcomeHeader";
import { useMediaQuery } from "react-responsive";
import CustomInputBox from "../../../../components/Input";
import ServiceButton from "../../../../components/Button/ServiceButton";
import CustomBottomModal from "../../../../components/CustomModal/customBottomModal";
import CompanyLogo from "../../../../assets/Navbar/shipyaariLogos.svg";
import ErrorIcon from "../../../../assets/common/info-circle.svg";

import {
  setOnOtpClientId,
  setAadharNumberProprietor,
} from "../../../../redux/reducers/onboarding";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { POST } from "../../../../utils/webService";
import { POST_VERIFY_AADHAR_URL } from "../../../../utils/ApiUrls";
import { toast } from "react-toastify";

interface ITypeProps {}

const Index = (props: ITypeProps) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);
  const closeModal = () => setOpenModal(true);
  const dispatch = useDispatch();
  const { aadharNumber, otpBtnStatus, aadharError } = useSelector(
    (state: any) => state?.onboarding.aadharNumberProprietor
  );

  const isBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  const aadharRegex = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/gm;

  const onSendOtp = async (e: any) => {
    try {
      e.preventDefault();
      if (aadharNumber === 0) {
        dispatch(
          setAadharNumberProprietor({ aadharError: "Enter Aadhar Number" })
        );
      }

      //API Call
      const payload = { adhaar_no: aadharNumber };
      const { data: response } = await POST(POST_VERIFY_AADHAR_URL, payload);

      if (response?.success) {
        // toast.success(response?.message);
        dispatch(setOnOtpClientId(response.data.data.client_id));
        //Navigate Urls go here
      } else {
      }

      navigate("/onboarding/kyc-mobile-verify", {
        state: { path: "aadhar-form" },
      });
    } catch (error) {
      return error;
    }
  };

  const aadharFormComponent = () => {
    return (
      <div className="px-5 lg:px-0">
        <div className="hidden lg:flex justify-between items-center shadow-md h-[60px] px-6 py-4 mb-6 ">
          <img src={CompanyLogo} alt="" />
        </div>

        <WelcomeHeader
          title="Welcome to Shipyaari"
          content="Kindly complete your KYC"
        />

        <form onSubmit={onSendOtp}>
          <div className="mt-[96px] mb-4">
            <div>
              <CustomInputBox
                containerStyle={`lg:!w-auto`}
                label="Aadhar Number"
                inputType="text"
                className={`  ${
                  aadharError !== "" && "!border-[#F35838]"
                }  lg:!w-[320px] !font-Open`}
                onChange={(e) => {
                  if (!aadharRegex.test(e.target.value)) {
                    dispatch(
                      setAadharNumberProprietor({
                        aadharError: "Enter Valid Aadhar Number",
                      })
                    );

                    dispatch(
                      setAadharNumberProprietor({
                        otpBtnStatus: false,
                      })
                    );
                  } else {
                    dispatch(
                      setAadharNumberProprietor({
                        aadharError: "",
                      })
                    );
                    dispatch(
                      setAadharNumberProprietor({
                        otpBtnStatus: true,
                      })
                    );
                  }

                  dispatch(
                    setAadharNumberProprietor({ aadharNumber: +e.target.value })
                  );
                }}
              />
              {/* To display error */}
              {aadharError !== "" && (
                <div className="flex items-center    gap-x-1 mt-1   ">
                  <img src={ErrorIcon} alt="" width={10} height={10} />
                  <span className="font-normal font-Open  text-[#F35838] text-[10px]">
                    {aadharError}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex  lg:justify-center lg:items-center  pb-12 ">
            <ServiceButton
              text="SEND OTP"
              disabled={!otpBtnStatus}
              className={`bg-[#1C1C1C] !h-[36px] text-white w-full mb-5 lg:!w-[320px] ${
                otpBtnStatus === true
                  ? "!bg-[#1C1C1C] !text-[#FFFFFF]"
                  : "!bg-[#E8E8E8] !text-[#BBBBBB] !border-0"
              } `}
              btnType="submit"
            />
          </div>
        </form>
      </div>
    );
  };

  return (
    <div>
      {/* {!isBigScreen && aadharFormComponent()} */}

      {isBigScreen && (
        <CustomBottomModal
          isOpen={openModal}
          onRequestClose={closeModal}
          className="!p-0 !w-[500px] !h-[700px]"
          overlayClassName="flex  items-center"
        >
          {aadharFormComponent()}
        </CustomBottomModal>
      )}
    </div>
  );
};

export default Index;
