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

export const QuestionComponent5: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};

  const { isLgScreen } = ResponsiveState();
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
        {/* <img
          className="my-auto mr-6"
          src={CloseIcon}
          alt="Close"
          onClick={() => setIsModalOpen(false)}
        /> */}
      </div>
    );
  };

  const note = () => {
    return (
      <div className=" ml-6 text-[#494949] text-xs mt-7 leading-4 font-Open">
        NOTE: KYC is mandatory for shipping orders and identification.
      </div>
    );
  };

  function handleCheckBox(element: any, index: any) {
    questionsData[4].options[index].isChecked = element;
  }

  let payload = { answerBody: questionsData };

  async function submitAnswer(payload: any) {
    try {
      const { data: response } = await POST(POST_SUBMIT_QUESTIONNAIRE, payload);
      if (response?.success === true) {
        navigate("/onboarding/kyc-type");
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error("Failed to submit question bank!!!");
      return error;
    }
  }

  const question5 = () => {
    return (
      <div className="relative h-full w-full">
        {isLgScreen && modalTitle()}
        <div className="flex flex-col mx-4 mt-10 lg:grid lg:grid-cols-2 lg:mt-[100px] lg:gap-x-4">
          <div>
            <WelcomeHeader
              welcomeLabel="For account activation kindly complete the KYC"
              welcomeClassName="lg:!mt-0"
              className="hidden"
            />
            {isLgScreen && note()}
          </div>
          <div>
            <div className="flex flex-col px-4 py-4 border-[1px] border-[#E8E8E8] rounded-md shadow-lg mt-[50px] lg:mt-0">
              <div className="">
                <span className="text-xl font-semibold leading-[26px] font-Lato">
                  {question}
                </span>
              </div>
              <div className="flex flex-col items-start mt-4">
                {questionsData[4]?.options.map((element: any, index: any) => {
                  return (
                    <Checkbox
                      disabled={true}
                      checked={true}
                      onChange={(element) => {
                        handleCheckBox(element.target.checked, index);
                      }}
                      label={element.value}
                      className="text-base font-Open font-normal leading-[22px]"
                      style={{ accentColor: "black" }}
                    />
                  );
                })}
              </div>
            </div>
            <div className="mt-6">
              <CustomButton
                text="PROCEED FOR KYC"
                onClick={() => submitAnswer(payload)}
              />
            </div>

            {/* <div className="flex justify-center text-[#004EFF] text-sm underline underline-offset-4	decoration-[#004EFF] mt-4">
              SKIP FOR NOW
            </div> */}
            {!isLgScreen && note()}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {isLgScreen && isModalOpen && (
        <CenterModal
          shouldCloseOnOverlayClick={false}
          className="h-[474px] w-[700px]"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          {question5()}
        </CenterModal>
      )}

      {!isLgScreen && question5()}
    </>
  );
};
