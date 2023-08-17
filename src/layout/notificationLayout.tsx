import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import BackArrowIcon from "../assets/backArrow.svg";
import ServiceButton from "../components/Button/ServiceButton";
import BottomLayout from "../components/Layout/bottomLayout";
import { Breadcrumb } from "flowbite-react";

export const NotificationLayout = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  console.log("🚀 ~ file: notificationLayout.tsx:10 ~ NotificationLayout ~ data:", data)

  return (
    <>
      <div className="flex flex-col h-screen justify-between ">
        <header className="fixed top-0 z-10 w-full ">
          <NavBar />
        </header>

        <div className="relative top-20">
          <div>
            <Breadcrumb/>
          </div>

          <main className="pb-24">
            <div className="relative top-0">
              <Outlet context={{ setData }} />
            </div>
          </main>

          <BottomLayout/>
        </div>
      </div>
    </>
  );
};
