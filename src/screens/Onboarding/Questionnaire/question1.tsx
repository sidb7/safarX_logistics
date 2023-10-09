import Checkbox from "../../../components/CheckBox";
import WarehouseTruckGif from "../../../assets/AccountQuestions/WarehouseTruck.gif";
import CustomButton from "../../../components/Button";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

  const location = useLocation();
  const state = location.state || {};

  async function getQuestions() {
    try {
      const { data: response } = await POST(GET_QUESTIONNAIRE);
      if (response?.success === true) {
        setQuestionsData(response?.data?.questionBank);
        if (Object.keys(state).length > 0 && state?.questionsData) {
          setQuestionsData(state.questionsData);
        }
      } else {
        toast.error(response?.message);
      }
    } catch {
      toast.error("Failed to fetch the question bank!");
      return;
    }
  }

  useEffect(() => {
    getQuestions();
  }, []);

  const question = questionsData[0]?.question;

  function handleCheckBox(element: any, index: any) {
    let tempArr = questionsData;
    tempArr[0].options[index].isChecked = element;
    setQuestionsData([...tempArr]);
  }

  const nextHandler = () => {
    if (questionsData && questionsData?.length > 0) {
      const filterQuestion = questionsData[0]?.options.filter(
        (singleData: any) => singleData.isChecked === true
      );
      if (filterQuestion?.length === 0) {
        return toast.error("Please Select Atleast One Option");
      }
    }
    navigate("/onboarding/questionnaire/question2", {
      state: { questionsData },
    });
  };

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

  const question1 = () => {
    return (
      <div className="relative h-full w-full">
        {isLgScreen && modalTitle()}
        <div className="product-box flex items-center lg:hidden">
          <img
            className="m-4 h-[25px] object-contain"
            src={CompanyLogo}
            alt="CompanyLogo"
          />
        </div>
        <div className="flex flex-col mx-4 mt-10 lg:grid lg:grid-cols-2 lg:mt-[80px] lg:gap-x-4">
          <div>
            <WelcomeHeader welcomeClassName="lg:!mt-4" className="hidden" />
            <div className="flex justify-center">
              <img src={WarehouseTruckGif} alt="" width="180px" />
            </div>
          </div>
          <div>
            <div className="flex flex-col px-4 py-4 border-[1px] border-[#E8E8E8] rounded-md shadow-lg mt-4">
              <div>
                <span className="text-xl font-semibold leading-[26px] font-Lato capitalize">
                  {question}
                </span>
              </div>
              <div className="flex flex-col items-start mt-4 capitalize font-Open text-base font-normal leading-[22px]">
                {questionsData[0]?.options?.map((element: any, index: any) => {
                  return (
                    <Checkbox
                      key={index}
                      checked={element.isChecked || false}
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
              <CustomButton text="NEXT" onClick={() => nextHandler()} />
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
          // onRequestClose={() => setIsModalOpen(false)}
        >
          {question1()}
        </CenterModal>
      )}

      {!isLgScreen && question1()}
    </>
  );
};
