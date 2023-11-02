import React, { useState } from "react";
import Checkbox from "../../../components/CheckBox";
import CustomButton from "../../../components/Button";
import { useNavigate, useLocation } from "react-router-dom";
import WelcomeHeader from "./welcomeHeader";
import { toast } from "react-toastify";
// import CloseIcon from "../../../assets/CloseIcon.svg";
import CompanyLogo from "../../../assets/CompanyLogo/shipyaari icon.svg";
import { ResponsiveState } from "../../../utils/responsiveState";
import CenterModal from "../../../components/CustomModal/customCenterModal";
import { POST } from "../../../utils/webService";
import { POST_SUBMIT_QUESTIONNAIRE } from "../../../utils/ApiUrls";

export const WelcomeKyc: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};

  const { isLgScreen, isMdScreen } = ResponsiveState();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const questionsData = state?.questionsData;

  const question = questionsData[4]?.question;

  const modalTitle = () => {
    return (
      <div className="product-box flex justify-between items-center w-full h-[60px] absolute top-0">
        <img
          className="my-auto ml-6  h-[25px] object-contain"
          src={CompanyLogo}
          alt="Company Logo"
        />
      </div>
    );
  };

  const note = () => {
    return (
      <div className=" absolute bottom-[-250px]  md:relative md:top-7 md:left-[-15px]  ml-6 text-[#494949] text-xs leading-4 font-Open md:text-center">
        NOTE: KYC is mandatory for shipping orders and identification.
      </div>
    );
  };

  function handleCheckBox(element: any, index: any) {
    questionsData[4].options[index].isChecked = element;
  }

  const question5 = () => {
    return (
      <div
        className={` ${
          isMdScreen ? "custom_shadow m-auto  !w-[688px]" : ""
        } flex flex-col relative lg:px-0 lg:gap-y-0 rounded-lg`}
      >
        {/* {isLgScreen && modalTitle()} */}
        <div className="product-box flex items-center ">
          <img
            className="m-4 h-[25px] object-contain"
            src={CompanyLogo}
            alt="CompanyLogo"
          />
        </div>
        <div className="flex flex-col mx-4 md:grid md:grid-cols-2 md:mt-[32x] md:gap-x-4 md:mx-6 md:mb-[44px]">
          <div>
            <WelcomeHeader
              welcomeLabel="For account activation kindly complete the KYC"
              welcomeClassName="md:!mt-0"
              className="hidden"
            />
            {isMdScreen && note()}
          </div>
          <div>
            <div className="flex flex-col px-4 py-4 border-[1px] border-[#E8E8E8] rounded-md shadow-lg mt-[50px] md:mt-0">
              <div>
                <span className="text-xl font-semibold leading-[26px] font-Lato capitalize">
                  {question}
                </span>
              </div>
              <div className="flex flex-col items-start mt-4 capitalize font-Open text-xs font-normal leading-[22px]">
                {questionsData[4]?.options?.map((element: any, index: any) => {
                  return (
                    <Checkbox
                      key={index}
                      // disabled={true}
                      checked={true}
                      onChange={(element) => {
                        handleCheckBox(element.target.checked, index);
                      }}
                      label={element.value}
                      style={{ accentColor: "black" }}
                    />
                  );
                })}
              </div>
            </div>
            <div className="mt-6">
              <CustomButton
                text="PROCEED FOR KYC"
                onClick={() => navigate("/onboarding/kyc-type")}
              />
            </div>

            <div
              className="flex justify-center text-[#004EFF] text-sm underline underline-offset-4	decoration-[#004EFF] mt-4 cursor-pointer"
              onClick={() => navigate("/dashboard/overview")}
            >
              SKIP FOR NOW
            </div>
            {!isMdScreen && note()}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {isMdScreen && (
        // <CenterModal
        //   shouldCloseOnOverlayClick={false}
        //   className="h-[474px] w-[700px]"
        //   isOpen={isModalOpen}
        //   // onRequestClose={() => setIsModalOpen(false)}
        // >
        <div className="flex justify-center items-center h-screen">
          {question5()}
        </div>
        // </CenterModal>
      )}

      {!isLgScreen && question5()}
    </>
  );
};
