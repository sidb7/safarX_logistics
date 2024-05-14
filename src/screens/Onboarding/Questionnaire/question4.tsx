import Checkbox from "../../../components/CheckBox";
import DroneDeliveryGif from "../../../assets/AccountQuestions/DroneDelivery.gif";
import CustomButton from "../../../components/Button";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import WelcomeHeader from "./welcomeHeader";
import { ResponsiveState } from "../../../utils/responsiveState";
// import CloseIcon from "../../../assets/CloseIcon.svg";
import CompanyLogo from "../../../assets/CompanyLogo/shipyaari icon.svg";
// import CenterModal from "../../../components/CustomModal/customCenterModal";
import { POST } from "../../../utils/webService";
import { POST_SUBMIT_QUESTIONNAIRE } from "../../../utils/ApiUrls";
import { toast } from "react-hot-toast";
import { Spinner } from "../../../components/Spinner";
import { constructNavigationObject } from "../../../utils/utility";

export const QuestionComponent4: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const state = location.state || {};
  const { isLgScreen, isMdScreen } = ResponsiveState();
  // const [isModalOpen, setIsModalOpen] = useState(true);
  const data = state?.questionsData;
  const [questionsData, setQuestionsData] = useState(data || []);
  const [nextBtnStatus, setNextBtnStatus] = useState(false);

  // const modalTitle = () => {
  //   return (
  //     <div className="product-box flex justify-between items-center w-full h-[60px] absolute top-0">
  //       <img
  //         className="my-auto ml-6  h-[25px] object-contain"
  //         src={CompanyLogo}
  //         alt="Company Logo"
  //       />
  //       {/* <img
  //         className="my-auto mr-6"
  //         src={CloseIcon}
  //         alt="Close"
  //         onClick={() => setIsModalOpen(false)}
  //       /> */}
  //     </div>
  //   );
  // };

  //getting the sellerID
  const sellerId = localStorage.getItem("sellerId");

  const syService: any = [];

  //for gmt
  for (let i = 0; i < questionsData.length; i++) {
    if (questionsData[i]?.question === "Which product are you looking for?") {
      for (let j = 0; j < questionsData[i].options.length; j++) {
        if (questionsData[i].options[j]?.isChecked === true) {
          syService.push(questionsData[i].options[j]?.value);
        }
      }
    }
  }

  const syServiceOption = syService.join(", ");

  function handleCheckBox(element: any, index: any) {
    const { value = false } = element;
    let tempArr = questionsData;

    tempArr[3]?.options?.forEach((e: any, index2: number) => {
      e.isChecked = false;
    });
    tempArr[3].options[index].isChecked = value;
    setQuestionsData([...tempArr]);
  }

  const question = questionsData[3]?.question;

  let payload = { answerBody: questionsData };

  const nextHandler = () => {
    // if (questionsData && questionsData?.length > 0) {
    //   const filterQuestion = questionsData[3]?.options.filter(
    //     (singleData: any) => singleData.isChecked === true
    //   );
    //   if (filterQuestion?.length === 0) {
    //     return toast.error("Please Select Atleast One Option");
    //   }
    // }
    //setting thr gmt
    window?.dataLayer?.push({
      event: "sign_up_qna_sy_service",
      sellerId: sellerId,
      sy_service: syServiceOption,
    });
    const navigationObject = constructNavigationObject(
      "/onboarding/questionnaire/question5",
      window.location.search
    );
    navigate(navigationObject, {
      state: { questionsData },
    });
    // submitAnswer(payload);
  };

  useEffect(() => {
    if (questionsData && questionsData?.length > 0) {
      const filterQuestion = questionsData[3]?.options.filter(
        (singleData: any) => singleData.isChecked === true
      );
      if (filterQuestion?.length === 0) {
        setNextBtnStatus(false);
      } else {
        setNextBtnStatus(true);
      }
    }
  }, [questionsData]);

  const question4 = () => {
    return (
      <>
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <Spinner />
          </div>
        ) : (
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
            <div className="flex flex-col mx-6  md:grid md:grid-cols-2 md:mt-[32px] md:mb-[45px]">
              <div>
                <WelcomeHeader welcomeClassName="md:!mt-4" className="hidden" />
                <div className="flex justify-center">
                  <img src={DroneDeliveryGif} alt="" width="180px" />
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
                    {questionsData[3]?.options?.map(
                      (element: any, index: any) => {
                        return (
                          <Checkbox
                            key={index}
                            onChange={(element) => {
                              handleCheckBox(element, index);
                            }}
                            checked={element.isChecked}
                            name={element.value}
                            label={element.value}
                            style={{ accentColor: "black" }}
                            labelClassName="w-[250px]"
                            checkboxClassName="gap-2"
                            // labelClassName="customWrap"
                            // inputElementClass="w-[30px]"
                            // className="!flex !text-balance"
                          />
                        );
                      }
                    )}
                  </div>
                </div>
                <div className="mt-6 flex gap-x-4">
                  <CustomButton
                    className="!bg-[#E8E8E8] !text-black"
                    text="BACK"
                    onClick={() =>
                      navigate("/onboarding/questionnaire/question3", {
                        state: {
                          questionsData,
                        },
                      })
                    }
                  />
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
        )}
      </>
    );
  };

  const renderOnNext = () => {
    if (isMdScreen) {
      return (
        // <CenterModal
        //   shouldCloseOnOverlayClick={false}
        //   isOpen={isModalOpen}
        //   // onRequestClose={() => setIsModalOpen(false)}
        // >
        loading ? (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Spinner />
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen">
            {question4()}
          </div>
        )
        // </CenterModal>
      );
    } else {
      return loading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : (
        question4()
      );
    }
  };
  return (
    <>
      {/* {isMdScreen && (
        // <CenterModal
        //   shouldCloseOnOverlayClick={false}
        //   className="h-[474px] w-[700px]"
        //   isOpen={isModalOpen}
        //   // onRequestClose={() => setIsModalOpen(false)}
        // >
        <div className="flex justify-center items-center h-screen">
          {question4()}
        </div>
        // </CenterModal>
      )}

      {!isLgScreen && question4()} */}
      {renderOnNext()}
    </>
  );
};
