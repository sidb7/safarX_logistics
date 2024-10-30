import React from "react";
import OneButton from "../../../components/Button/OneButton";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import successStatus from "../../../assets/success.svg";
import KycSection from "./accordianSections/KycSection";
import BankSection from "./accordianSections/BankSection";
import BrandSection from "./accordianSections/BrandSection";
// import PlanSection from "./accordianSections/PlanSection";
// import LabelSection from "./accordianSections/LabelSection";

interface IAccordionItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  onClick: () => void;
  completed?: boolean;
  section?: any;
  selectedSection?: any;
  mandatoryCheck?: any;
  sectionRoutes?: any;
  loadingState?: any;
  setLoadingState?: any;
  bankLoadingState?: any;
  setBankLoadingState?: any;
  brandLoadingState?: any;
  setBrandLoadingState?: any;
}

const AccordionItem: React.FC<IAccordionItemProps> = ({
  title,
  content,
  isOpen,
  onClick,
  completed = false,
  section,
  selectedSection,
  mandatoryCheck,
  sectionRoutes,
  loadingState,
  setLoadingState,
  bankLoadingState,
  setBankLoadingState,
  brandLoadingState,
  setBrandLoadingState,
}) => {
  const navigate = useNavigate();
  const boxShadowStyle = completed
    ? "0px 0px 0px 0px #7CCA62, 2.83px 0px 0px 0px #acf295 inset"
    : "0px 0px 0px 0px #A9D4FF, 2.83px 0px 0px 0px #A9D4FF inset";
  const handleClick = () => {
    // Check if KYC is required and not completed
    if (selectedSection === "bankDetails") {
      if (!mandatoryCheck?.kyc) {
        toast.error("KYC is not completed. Please complete KYC to proceed."); // Show error message
        return; // Stop further execution
      }
    }

    const sectionRoute = sectionRoutes[section];

    if (sectionRoute) {
      navigate(sectionRoute);
    } else {
      console.error(`No route found for section: ${section}`);
      // Optionally, handle the case where the route is not defined
    }
  };

  const handleAccordionClose = () => {
    if (onClick) {
      onClick(); // This will close the accordion
    }
  };

  return (
    <div
      className={`border-b  rounded-[3.475px]  my-5 p-6 ${
        completed ? "border-[#7CCA62]" : "border-[#A9D4FF]"
      }`}
      style={{
        boxShadow: boxShadowStyle,
      }}
    >
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={!completed ? onClick : undefined}
      >
        <h2 className="font-Open text-[14px] lg:text-[18px] font-semibold leading-4 lg:!leading-8 tracking-wider xl:tracking-widest">
          {title}
        </h2>
        {completed ? (
          <div className="flex gap-x-2 items-center text-center">
            <img src={successStatus} alt="successStatus" />
            <span className="text-[14px] font-normal font-Open leading-5 text-[#7CCA62]">
              COMPLETED
            </span>
          </div>
        ) : (
          <div className="cursor-pointer">
            <svg
              className={`w-5 h-5 transform transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        )}
      </div>
      {!completed && isOpen && (
        <div
          className={`pt-3  ${
            selectedSection === "kyc" ||
            selectedSection === "bankDetails" ||
            selectedSection === "brandDetails"
              ? "flex flex-col"
              : "flex justify-between items-center"
          }`}
        >
          <div>
            <p className="font-Open text-[13px] lg:text-[15px] font-normal leading-8 lg:!leading-[26px] tracking-wide">
              {content}
            </p>
          </div>

          <div>
            {selectedSection === "kyc" ? (
              <KycSection
                loadingState={loadingState}
                setLoadingState={setLoadingState}
              />
            ) : selectedSection === "bankDetails" ? (
              <BankSection
                onNoSelected={handleAccordionClose}
                bankLoadingState={bankLoadingState}
                setBankLoadingState={setBankLoadingState}
              />
            ) : selectedSection === "brandDetails" ? (
              <BrandSection setBrandLoadingState={setBrandLoadingState} />
            ) : (
              <div className=" items-end text-end">
                <OneButton
                  text={"CLICK HERE"}
                  onClick={handleClick}
                  variant="tertiary"
                  className="!bg-transparent"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
