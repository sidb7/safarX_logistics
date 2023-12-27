import Checkbox from "../../../components/CheckBox";
import WarehouseTruckGif from "../../../assets/AccountQuestions/WarehouseTruck.gif";
import CustomButton from "../../../components/Button";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import WelcomeHeader from "./welcomeHeader";
// import CenterModal from "../../../components/CustomModal/customCenterModal";
import { Spinner } from "../../../components/Spinner";
import { ResponsiveState } from "../../../utils/responsiveState";
// import CloseIcon from "../../../assets/CloseIcon.svg";
import CompanyLogo from "../../../assets/CompanyLogo/shipyaari icon.svg";
import { toast } from "react-toastify";
import { POST } from "../../../utils/webService";
import { GET_QUESTIONNAIRE } from "../../../utils/ApiUrls";

export const QuestionComponent1: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { isLgScreen, isMdScreen } = ResponsiveState();
  // const [isModalOpen, setIsModalOpen] = useState(true);
  const [questionsData, setQuestionsData] = useState<any>([]);
  const [nextBtnStatus, setNextBtnStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const state = location.state || {};

  async function getQuestions() {
    try {
      setLoading(true);
      const { data: response } = await POST(GET_QUESTIONNAIRE);
      if (response?.success === true) {
        setLoading(false);
        setQuestionsData(response?.data?.questionBank);
        if (Object.keys(state).length > 0 && state?.questionsData) {
          setQuestionsData(state.questionsData);
        }
      } else {
        toast.error(response?.message);
        setLoading(false);
      }
    } catch {
      toast.error("Failed to fetch the question bank!");
      setLoading(false);
      return;
    }
  }

  useEffect(() => {
    getQuestions();
  }, []);

  const question = questionsData[0]?.question;

  function handleCheckBox(element: any, index: any) {
    const { value = false } = element;

    let tempArr = questionsData;
    tempArr[0].options[index].isChecked = value;
    setQuestionsData([...tempArr]);
  }

  const nextHandler = () => {
    navigate("/onboarding/questionnaire/question2", {
      state: { questionsData },
    });
  };

  useEffect(() => {
    if (questionsData && questionsData?.length > 0) {
      const filterQuestion = questionsData[0]?.options.filter(
        (singleData: any) => singleData.isChecked === true
      );
      if (filterQuestion?.length === 0) {
        setNextBtnStatus(false);
      } else {
        setNextBtnStatus(true);
      }
    }
  }, [questionsData]);

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
      <div
        className={` ${
          isMdScreen ? "custom_shadow m-auto  !w-[688px]" : ""
        } flex flex-col relative lg:px-0 lg:gap-y-0 rounded-lg`}
      >
        {/* {isLgScreen && modalTitle()} */}
        <div className="product-box flex items-center">
          <img
            className="m-4 h-[25px] object-contain"
            src={CompanyLogo}
            alt="CompanyLogo"
          />
        </div>
        <div className="flex flex-col mx-6 md:grid md:grid-cols-2 md:mt-[32px] md:gap-x-6 md:mb-[82px]">
          <div>
            <WelcomeHeader welcomeClassName="md:!mt-4" className="hidden" />
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
                        handleCheckBox(element, index);
                      }}
                      name={element.value}
                      label={element.value}
                      style={{ accentColor: "black" }}
                      checkboxClassName="gap-2 mt-1"
                      labelClassName="mt-1"
                    />
                  );
                })}
              </div>
            </div>
            <div className="mt-6">
              <CustomButton
                text="NEXT"
                disabled={!nextBtnStatus}
                onClick={() => nextHandler()}
                className={`${
                  nextBtnStatus === true
                    ? "!bg-[#1C1C1C] !text-[#FFFFFF]"
                    : "!bg-[#E8E8E8] !text-[#BBBBBB] !border-0"
                }`}
              />
            </div>
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
        //   className="h-[474px] w-[688px]"
        //   isOpen={isModalOpen}
        //   // onRequestClose={() => setIsModalOpen(false)}
        // >
        <div className="flex justify-center items-center h-screen">
          {question1()}
        </div>
        // </CenterModal>
      )}

      {!isLgScreen && question1()}
    </>
  );
};
