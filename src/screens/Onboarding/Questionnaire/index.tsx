import { useState } from "react";
import CompanyLogo from "../../../assets/Navbar/ShipyaariLogos.svg";
import CloseIcon from "../../../assets/Navbar/ShipyaariLogos.svg";
import Slider from "react-slick";
import { ResponsiveState } from "../../../utils/responsiveState";
import { WelcomeQuestion } from "./welcome";
// import {
//   QuestionComponent1,
//   QuestionComponent2,
//   QuestionComponent3,
//   QuestionComponent4,
//   QuestionComponent5,
// } from "./question1";
import "../../../styles/navBar.css";
import "../../../styles/silkStyle.css";

export const AccountQuestion = () => {
  const { isLgScreen } = ResponsiveState();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const silderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Adjust the number of slides shown on mobile
    slidesToScroll: 1,
    initialSlide: 0, // Start from the second slide to hide the slide on the left side
  };

  const modalTitle = () => {
    return (
      <div className="product-box flex justify-between items-center w-full h-[60px] absolute top-0">
        <img
          className="my-auto ml-6  h-[25px] object-contain"
          src={CompanyLogo}
          alt="Company Logo"
        />
        <img
          className="my-auto mr-6"
          src={CloseIcon}
          alt="Close"
          onClick={() => setIsModalOpen(false)}
        />
      </div>
    );
  };

  const questionComponent = () => {};

  return (
    <div className="flex flex-col ">
      <div className="flex items-center shadow-md w-full h-[60px]">
        <img src={CompanyLogo} alt="" className="ml-6" />
      </div>

      <div className="mx-4">
        <WelcomeQuestion label="Please complete your profile" />
      </div>

      {/* <Slider {...silderSettings} className="">
        <div className="mx-2 !w-[95%]">
          <QuestionComponent1 />
        </div>
        <div className="mx-2 !w-[95%]">
          <QuestionComponent2 />
        </div>
        <div className="mx-2 !w-[95%]">
          <QuestionComponent3 />
        </div>
        <div className="mx-2 !w-[95%]">
          <QuestionComponent4 />
        </div>
        <div className="mx-2 !w-[95%]">
          <QuestionComponent5 />
        </div>
      </Slider> */}
    </div>
  );
};
