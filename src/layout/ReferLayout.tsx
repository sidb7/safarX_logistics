import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import BackArrowIcon from "../assets/backArrow.svg";
import ServiceButton from "../components/Button/ServiceButton";

export const ReferLayout = () => {
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

              <p className="text-lg font-bold text-center text-[#1C1C1C] ">
                Refer and Earn
              </p>
            </div>
          </div>

          <main className="pb-24">
            <div className="relative top-0">
              <Outlet />
            </div>
          </main>

          <footer className="w-full fixed  bottom-0 	">
            <div className="grid grid-cols-2  shadow-lg border-[1px]  bg-[#FFFFFF] gap-[32px] p-[24px] rounded-tr-[24px] rounded-tl-[24px] fixed w-full bottom-0">
              <ServiceButton text="BACK" onClick={() => navigate("/profile")} />

              <ServiceButton
                text="SAVE"
                className="bg-[#1C1C1C] text-[#FFFFFF]"
                onClick={() => {}}
              />
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};
