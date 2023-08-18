import React, { useState } from "react";
import WelcomeHeader from "../welcomeHeader";
import { useMediaQuery } from "react-responsive";
import CustomInputBox from "../../../../components/InputBox";
import ServiceButton from "../../../../components/Button/ServiceButton";
import CustomBottomModal from "../../../../components/CustomModal/customBottomModal";
import CompanyLogo from "../../../../assets/Navbar/ShipyaariLogos.svg";
import CrossLogo from "../../../../assets/cross.svg";
import {
  setAadharNumber,
  setOnOtpClientId,
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
  const aadharNumber = useSelector(
    (state: any) => state?.onboarding.aadharNumber
  );

  const isBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  const onSendOtp = async (e: any) => {
    try {
      e.preventDefault();
      const payload = { adhaar_no: aadharNumber };
      const { data: response } = await POST(POST_VERIFY_AADHAR_URL, payload);
      console.log("aadhar verify", response);
      if (response?.success) {
        toast.success(response?.message);
        dispatch(setOnOtpClientId(response.data.data.client_id));
        navigate("/onboarding/kyc-mobile-verify", {
          state: { path: "aadhar-form" },
        });
      } else {
      }
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
          <div className="flex flex-col  items-center  mt-[96px]   mb-4">
            <CustomInputBox
              label="Aadhar Number"
              className="lg:!w-[320px] !font-Open"
              onChange={(e) => {
                dispatch(setAadharNumber(e.target.value));
              }}
            />
          </div>
          <div className="flex  lg:justify-center lg:items-center  pb-12 ">
            <ServiceButton
              text="SEND OTP"
              className="bg-[#1C1C1C] text-white w-full mb-5 lg:!w-[320px]"
              btnType="submit"
              onClick={() => {
                // navigate("/onboarding/kyc-mobile-verify", {
                //   state: { path: "aadhar-form" },
                // });
              }}
            />
          </div>
        </form>
      </div>
    );
  };

  return (
    <div>
      {!isBigScreen && aadharFormComponent()}

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
