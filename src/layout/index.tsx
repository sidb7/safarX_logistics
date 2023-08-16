import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import BackArrowIcon from "../assets/backArrow.svg";
import BackArrowIconWeb from "../assets/PickUp/EssentialWeb.svg";
import Stepper from "../components/Stepper";
import ServiceButton from "../components/Button/ServiceButton";
import TickLogo from "../assets/common/Tick.svg";
import DownloadIcon from "../assets/Label/download.svg";
import { useMediaQuery } from "react-responsive";
import Sidebar from "./HoverSidebar";

const steps = [
  {
    label: "Pickup",
    isCompleted: true,
    isActive: false,
    imgSrc: TickLogo,
  },
  {
    label: "Delivery",
    isCompleted: true,
    isActive: false,
    imgSrc: TickLogo,
  },
  {
    label: "Product",
    isCompleted: true,
    isActive: false,
    imgSrc: TickLogo,
  },
  {
    label: "Service",
    isCompleted: false,
    isActive: true,
    imgSrc: TickLogo,
  },
  {
    label: "Payment",
    isCompleted: false,
    isActive: true,
    imgSrc: TickLogo,
  },
];

const Layout = () => {
  const navigate = useNavigate();
  const isItLgScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  let subMenu;

  if (
    window.location.pathname === "/neworder/service" ||
    window.location.pathname === "/neworder/summary" ||
    window.location.pathname === "/neworder/payment"
  ) {
    subMenu = "Partner list";
  } else {
    subMenu = "Order";
  }
  return (
    <>
      <div className="flex">
        <Sidebar />
        <main className="pb-52">
          <div className=" relative top-20">
            <Outlet />
          </div>
        </main>
      </div>
      {/* <div className="flex flex-col h-screen justify-between ">
        <header className="fixed top-0 z-10 w-full ">
          <NavBar />
        </header>

        <div className="relative top-20 ">
          <div className="hidden   lg:flex lg:items-center px-5 ml-14 mb-1 ">
            <p className="font-normal text-[14px] text-[#777777] mr-1">Home</p>
            <span className="font-normal text-[14px] text-[#777777] mr-1">
              /
            </span>
            <span className="font-semibold text-[14px] text-[#1C1C1C]">
              {subMenu}
            </span>
          </div>
          <div>
            <div className="inline-flex space-x-2 items-center justify-start px-5 lg:mb-8">
              <img src={BackArrowIcon} alt="" className="lg:hidden" />
              <img
                src={BackArrowIconWeb}
                alt=""
                className=" hidden  lg:block"
              />

              <p className="text-lg font-semibold text-center text-gray-900 lg:text-[28px] lg:text-[#1C1C1C]">
                Add new order
              </p>
            </div>
          </div>

          <div className="lg:mb-8">
            <Stepper steps={steps} />
          </div>

          <main className="pb-24  ">
            <div className="relative top-0">
              <Outlet />
            </div>
          </main>

          <footer className="w-full fixed  bottom-0 z-[10]">
            <div
              className={`  ${
                isItLgScreen ? "flex justify-end " : " grid grid-cols-2"
              }   shadow-lg border-[1px]  bg-[#FFFFFF] gap-[32px] p-[24px] rounded-tr-[24px] rounded-tl-[24px] fixed w-full bottom-0`}
            >
              {window.location.pathname !== "/neworder/label" ? (
                <>
                  <ServiceButton
                    text="BACK"
                    className="lg:!py-2 lg:!px-4"
                    onClick={() => {
                      window.history.back();
                    }}
                  />
                </>
              ) : (
                <>
                  <ServiceButton
                    text="DOWNLOAD"
                    icon={DownloadIcon}
                    showIcon={true}
                    className="!bg-[#F2F6FF] text-[#0066FF] border-none text-[14px] font-semibold "
                  />
                </>
              )}

              <ServiceButton
                text="NEXT"
                className="bg-[#1C1C1C] text-[#FFFFFF] lg:!py-2 lg:!px-4"
                onClick={() => {
                  console.log(window.location.pathname);

                  if (window.location.pathname === "/neworder/pickup") {
                    navigate("/neworder/delivery");
                  } else if (
                    window.location.pathname === "/neworder/delivery"
                  ) {
                    navigate("/neworder/package");
                  } else if (window.location.pathname === "/neworder/package") {
                    navigate("/neworder/service");
                  } else if (window.location.pathname === "/neworder/service") {
                    navigate("/neworder/summary");
                  } else if (window.location.pathname === "/neworder/summary") {
                    navigate("/neworder/payment");
                  }
                }}
              />
            </div>
          </footer>
        </div>
      </div> */}
    </>
  );
};

export default Layout;
