import Checkbox from "../../../components/CheckBox";
import WarehouseTruckGif from "../../../assets/AccountQuestions/WarehouseTruck.gif";
import CustomButton from "../../../components/Button";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WelcomeHeader from "./welcomeHeader";
import CenterModal from "../../../components/CustomModal/customCenterModal";
import { ResponsiveState } from "../../../utils/responsiveState";
// import CloseIcon from "../../../assets/CloseIcon.svg";
import CompanyLogo from "../../../assets/CompanyLogo/shipyaari icon.svg";
import { toast } from "react-toastify";
import { POST } from "../../../utils/webService";
import { GET_QUESTIONNAIRE } from "../../../utils/ApiUrls";

export const QuestionComponent1: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { isLgScreen } = ResponsiveState();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [questionsData, setQuestionsData] = useState<any>([]);

  async function getQuestions() {
    try {
      const { data: response } = await POST(GET_QUESTIONNAIRE);
      if (response?.success === true) {
        setQuestionsData(response?.data?.questionBank);
      } else {
        toast.error(response?.message);
      }
    } catch {
      toast.error("Failed to fetch question bank!!!");
      return;
    }
  }

  const question = questionsData[0]?.question;

  useEffect(() => {
    getQuestions();
  }, []);

  function handleCheckBox(element: any, index: any) {
    questionsData[0].options[index].isChecked = element;
  }

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

  const question1 = () => {
    return (
      <div className="relative h-full w-full">
        {isLgScreen && modalTitle()}
        <div className="flex flex-col mx-4 mt-10 lg:grid lg:grid-cols-2 lg:mt-[80px] lg:gap-x-4">
          <div>
            <WelcomeHeader welcomeClassName="lg:!mt-4" className="hidden" />
            <div className="flex justify-center">
              <img src={WarehouseTruckGif} alt="" width="180px" />
            </div>
          </div>
          <div>
            <div className="flex flex-col px-4 py-4 border-[1px] border-[#E8E8E8] rounded-md shadow-lg mt-4">
              <div className="">
                <span className="text-xl font-semibold leading-[26px] font-Lato">
                  {question}
                </span>
              </div>
              <div className="flex flex-col items-start mt-4">
                {questionsData[0]?.options.map((element: any, index: any) => {
                  return (
                    <Checkbox
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
                text="NEXT"
                onClick={() =>
                  navigate("/onboarding/questionnaire/question2", {
                    state: { questionsData },
                  })
                }
              />
            </div>
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
          className="h-[474px] w-[688px]"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          {question1()}
        </CenterModal>
      )}

      {!isLgScreen && question1()}
    </>
  );
};
