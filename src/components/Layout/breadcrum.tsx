import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import BackArrowIcon from "../../assets/backArrow.svg";
import { ReactElement } from "react";
import infoIcon from "../../assets/info.svg";
import CenterModal from "../../components/CustomModal/customCenterModal";
import CompanyNameContent from "../../screens/NewDashboard/HomeSection/accordianSections/CompanyNameContent";
import {
  capitalizeFirstLetter,
  retrieveLocalStorageData,
} from "../../utils/utility";
import { COMPANY_NAME } from "../../utils/ApiUrls";
import sessionManager from "../../utils/sessionManager";

interface IBreadcrumProps {
  label: string;
  component?: ReactElement;
  componentClass?: any;
  setState?: any;
  state?: boolean;
}

export const Breadcrum = ({
  label,
  component,
  componentClass,
  setState,
  state,
}: IBreadcrumProps) => {
  const companyName = COMPANY_NAME;
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  const GetCurrentPath = () => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const location = url;
    const path = location.pathname;
    const pathArray = path.split("/");
    const removedFirstPath = pathArray.slice(1);
    return removedFirstPath;
  };

  const data = GetCurrentPath();

  const fetchedLastItem = data[data?.length - 1];
  if (fetchedLastItem === "") {
    data.pop();
  }

  const handleClick = (index: number, el: any) => {
    if (index === 0 || index === data?.length - 1) return;
    return navigate(-1);
  };

  // let kycCheck = localStorage.getItem("kycValue") as any;
  const { sessionId, sellerInfo } = sessionManager({});
  // const kyc = localStorage.getItem("setKycValue") as any;
  // if (sellerInfo?.nextStep) {
  //   const kyc = sellerInfo.nextStep.kyc;
  //   setKycValue(kyc);
  // }
  // let kycCheck = localStorage.getItem("kycValue") as any;
  let kycCheck = sellerInfo;
  const kyc = kycCheck?.nextStep?.kyc;

  // const privateCompanyDetails = retrieveLocalStorageData("kycValue");
  const privateCompanyDetails = kycCheck;

  // List of invalid company names
  const invalidCompanyNames = [null, undefined, "", "N/A", "NA", "n/a", "na"];

  let privateCompanyName = privateCompanyDetails?.privateCompany?.name;
  // console.log("🚀 ~ privateCompanyName:", privateCompanyName);

  // // Add a condition to check if the name is "N/A", an empty string, or undefined
  // Add a condition to check if the name is "N/A", an empty string, or undefined
  // const isCompanyNameInvalid =
  //   !privateCompanyName ||
  //   privateCompanyName.trim() === "" ||
  //   privateCompanyName === "N/A";
  // console.log("🚀 ~ isCompanyNameInvalid:", isCompanyNameInvalid);

  // Check if the company name is invalid
  const isCompanyNameInvalid = invalidCompanyNames.includes(
    privateCompanyName?.trim()
  );
  // Check if current route is the same as "/onboarding/kyc-type"
  const isKycRoute = location.pathname === "/dashboard/overview";
  // const isCompanyNameRoute = location.pathname === "/dashboard/overview";

  const [openCentreModal, setOpenCentreModal] = useState(false);

  return (
    <>
      <div>
        {!isKycRoute && !kyc && (
          <div
            className="flex justify-between bg-[#F5BE6D] p-2 cursor-pointer rounded-sm"
            // onClick={() => navigate("/onboarding/kyc-type")}
            onClick={() => {
              navigate("/dashboard/overview", {
                state: { openSection: "kyc" }, // Pass the section you want to open
              });
            }}
          >
            <div className="flex gap-x-2 w-[150px]">
              <img src={infoIcon} alt="" />
              <p className="font-Lato text-base font-normal">KYC Pending</p>
            </div>

            <p className="text-base font-Lato text-[#160783] font-normal underline cursor-pointer">
              Click Here
            </p>
          </div>
        )}

        {kyc && !isKycRoute && isCompanyNameInvalid && (
          <div
            className="flex justify-between bg-[#F5BE6D] p-2 cursor-pointer rounded-sm"
            // onClick={() => navigate("/onboarding/kyc-type")}
            // onClick={() => {
            //   navigate("/dashboard/overview", {
            //     state: { openSection: "brandDetails" }, // Pass the section you want to open
            //   });
            // }}
            onClick={() => setOpenCentreModal(true)}
          >
            <div className="flex gap-x-2 items-center">
              <div>
                <img src={infoIcon} alt="" width={"16px"} height={"16px"} />
              </div>
              <div>
                <p className="font-Lato text-base font-normal leading-5 tracking-wide">
                  We need your Company Name to enhance your experience with
                  {""} {capitalizeFirstLetter(companyName)}.
                </p>
              </div>
            </div>

            <p className="text-base font-Lato text-[#160783] font-normal underline cursor-pointer">
              Click Here
            </p>
          </div>
        )}
      </div>
      <div className="pl-5 pt-5 pr-5 lg:p-5">
        <div className={`hidden lg:flex gap-x-2 pl-1 font-Lato `}>
          <div
            className={`flex items-center gap-x-2 cursor-pointer`}
            onClick={() => navigate("/")}
          >
            <p className="!mb-0 hover:underline text-sm font-Open font-normal text-[#1C1C1C] leading-5">
              Home
            </p>
            <div>
              <span className="text-base">/</span>
            </div>
          </div>
          {/* Render the rest of the breadcrumbs */}
          {data?.map((el: any, index: number, arr: any) => {
            return (
              <div
                className={`flex items-center gap-x-2 ${
                  index === 0 ? " cursor-not-allowed " : ""
                } `}
                key={index}
              >
                <div
                  className={`${
                    index === 0
                      ? "cursor-not-allowed text-[#777777]"
                      : el === "pincode-management"
                      ? "cursor-not-allowed"
                      : el === "manage-services"
                      ? "cursor-not-allowed"
                      : "hover:underline cursor-pointer "
                  } !mb-0 text-base text-[#777777] `}
                  onClick={() => {
                    handleClick(index, el);
                  }}
                >
                  <div
                    className={`${
                      arr.length - 1 === index
                        ? "text-sm font-Open font-semibold text-[#1C1C1C] leading-[18px] "
                        : ""
                    }`}
                  >
                    {el.charAt(0).toUpperCase() + el.slice(1)}
                  </div>
                </div>
                <div>
                  {index !== data?.length - 1 && (
                    <span className="text-base">/</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className={`flex justify-between flex-col md:flex-row`}>
          <div className="inline-flex space-x-1 items-center justify-start h-fit">
            <img
              src={BackArrowIcon}
              alt=""
              className="lg:w-[16px] cursor-pointer"
              onClick={() => {
                if (state) setState();
                navigate(-1);
              }}
            />

            <p className="pl-2 text-lg font-bold text-center whitespace-nowrap  text-[#1C1C1C] lg:text-[28px] lg:font-Lato lg:font-semibold lg:leading-9 capitalize">
              {label}
            </p>
          </div>
          {component && (
            <div
              className={`${componentClass} inline-flex space-x-2 items-center justify-start px-5`}
            >
              {component}
            </div>
          )}
        </div>
      </div>

      <CenterModal
        isOpen={openCentreModal}
        onRequestClose={() => setOpenCentreModal(false)}
        className="!flex !justify-start !items-center w-[60%] lg:!w-3/4 lg:!h-3/4 xl:!w-[45%]  xl:!h-2/3 "
      >
        <CompanyNameContent setOpenCentreModal={setOpenCentreModal} />
      </CenterModal>
    </>
  );
};
