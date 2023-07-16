import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import BackArrowIcon from "../assets/backArrow.svg";
import Stepper from "../components/Stepper";
import ServiceButton from "../components/Button/ServiceButton";
import TickLogo from "../assets/common/Tick.svg";
import DownloadIcon from "../assets/Label/download.svg";

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
  return (
    <>
      <div className="flex flex-col h-screen justify-between ">
        <header className="fixed top-0 z-10 w-full ">
          <NavBar />
        </header>

        <div className="relative top-20">
          <div>
            <div className="inline-flex space-x-2 items-center justify-start px-5">
              <img src={BackArrowIcon} alt="" />

              <p className="text-lg font-semibold text-center text-gray-900 ">
                Add new order
              </p>
            </div>
          </div>

          <div>
            <Stepper steps={steps} />
          </div>

          <main className="pb-24">
            <div className="relative top-0">
              <Outlet />
            </div>
          </main>

          <footer className="w-full fixed  bottom-0 	">
            <div className="grid grid-cols-2  shadow-lg border-[1px]  bg-[#FFFFFF] gap-[32px] p-[24px] rounded-tr-[24px] rounded-tl-[24px] fixed w-full bottom-0">
              {window.location.pathname !== "/neworder/label" ? (
                <>
                  <ServiceButton
                    text="BACK"
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
                className="bg-[#1C1C1C] text-[#FFFFFF]"
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
      </div>
    </>
  );
};

export default Layout;
