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
  // console.log("completed", completed, section);
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

    if (selectedSection === "brandDetails") {
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

  const shouldRenderSectionContent = (sectionName: string) => {
    if (sectionName === "bankDetails" || sectionName === "brandDetails") {
      return mandatoryCheck?.kyc;
    }
    return true;
  };

  return (
    <div
      className={`rounded-2xl my-6 p-6 transition-all duration-300 shadow-md border border-[#CFDFFF] bg-white/90 ${
        isOpen && !completed ? "bg-[#F8F8FF] shadow-xl border-[#9082FF]" : ""
      } animate-fadein`}
      style={{
        boxShadow: completed
          ? "0px 0px 0px 0px #7CCA62, 2.83px 0px 0px 0px #acf295 inset"
          : "0px 0px 0px 0px #A9D4FF, 2.83px 0px 0px 0px #A9D4FF inset",
      }}
    >
      <div
        className="flex justify-between items-center cursor-pointer select-none"
        onClick={!completed ? onClick : undefined}
      >
        <h2 className="font-Open text-[16px] lg:text-[20px] font-bold leading-5 lg:!leading-8 tracking-wide text-[#160783]">
          {title}
        </h2>
        {completed ? (
          <div className="flex gap-x-2 items-center text-center">
            <img src={successStatus} alt="successStatus" />
            <span className="text-[14px] font-semibold font-Open leading-5 text-[#7CCA62] uppercase tracking-wider">
              Completed
            </span>
          </div>
        ) : (
          <div className="cursor-pointer">
            <svg
              className={`w-6 h-6 transform transition-transform duration-300 ${
                isOpen ? "rotate-180 text-[#9082FF]" : "text-[#B8B5FF]"
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
      {!completed && isOpen && shouldRenderSectionContent(selectedSection) && (
        <div
          className={`pt-4 transition-all duration-300 animate-fadein ${
            selectedSection === "kyc" ||
            selectedSection === "bankDetails" ||
            selectedSection === "brandDetails"
              ? "flex flex-col"
              : "flex justify-between items-center"
          }`}
        >
          <div>
            <p className="font-Open text-[15px] lg:text-[16px] font-normal leading-7 lg:!leading-[26px] tracking-wide text-[#494949]">
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
              <div className="">
                <OneButton
                  text={"Know more"}
                  onClick={handleClick}
                  variant="tertiary"
                  className="!rounded-full w-full bg-[#9082FF] flex text-white px-6 py-2 font-Open font-bold text-xs uppercase border-2 border-[#9082FF] hover:bg-[#160783] hover:text-white transition-all duration-200"
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

/* Add this to your global CSS or Tailwind config:
@keyframes fadein {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadein {
  animation: fadein 0.7s cubic-bezier(0.4,0,0.2,1) both;
}
*/
