import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import BackArrowIcon from "../../assets/backArrow.svg";
import { ReactElement } from "react";
import infoIcon from "../../assets/info.svg";

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
  const navigate = useNavigate();

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

  let kycCheck = sessionStorage.getItem("kycValue") as any;
  kycCheck = JSON.parse(kycCheck);
  kycCheck = kycCheck?.nextStep?.kyc;

  return (
    <>
      <div>
        {!kycCheck && (
          <div
            className="flex justify-between bg-[#F5BE6D] p-2 cursor-pointer rounded-sm"
            onClick={() => navigate("/onboarding/kyc-type")}
          >
            <div className="flex gap-x-2">
              <img src={infoIcon} alt="" />
              <p className="font-Lato text-base font-normal">KYC Pending</p>
            </div>

            <p className="text-base font-Lato text-[#004EFF] font-normal underline cursor-pointer">
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
    </>
  );
};
