import { useNavigate } from "react-router-dom";
import BackArrowIcon from "../../assets/backArrow.svg";
import { ReactElement } from "react";
interface IBreadcumProps {
  label: string;
  component?: ReactElement;
}

export const Breadcum = ({ label, component }: IBreadcumProps) => {
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

  return (
    <>
      <div className="p-5">
        <div className={`hidden lg:flex gap-x-2 pl-8 font-Lato `}>
          <div
            className={`flex items-center gap-x-2 cursor-pointer`}
            onClick={() => navigate("/")}
          >
            <p className="!mb-0 hover:underline text-base  text-[#777777]">
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
                  } !mb-0  text-base  text-[#777777]`}
                  onClick={() => {
                    handleClick(index, el);
                  }}
                >
                  <div
                    className={`${
                      arr.length - 1 === index ? "text-[black] " : ""
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
        <div className="flex justify-between !h-10 ">
          <div className="inline-flex space-x-2 items-center justify-start ">
            <img
              src={BackArrowIcon}
              alt=""
              className="lg:w-[16px] cursor-pointer"
              onClick={() => navigate(-1)}
            />

            <p className="pl-2 text-lg font-bold text-center  text-[#1C1C1C] lg:text-[28px]">
              {label}
            </p>
          </div>
          {component && (
            <div className="inline-flex space-x-2 items-center justify-start px-5">
              {component}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
