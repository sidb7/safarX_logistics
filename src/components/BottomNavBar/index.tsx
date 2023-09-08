import React from "react";
import HomeIcon from "../../assets/BottomNavBar/home.svg";
import MenuIcon from "../../assets/BottomNavBar/Menu.svg";
import OrderIcon from "../../assets/BottomNavBar/order.svg";
import ReportsIcon from "../../assets/BottomNavBar/reports.svg";

export const BottomNavBar = () => {
  return (
    <div>
      <div className="fixed drop-shadow-2xl inset-x-0 bottom-0 bg-white rounded-t-3xl border-2 shadow-2xl border-slate-100 py-2 h-[88px] flex items-center">
        <div className=" px-4 w-full">
          <div className="grid grid-cols-4">
            <div className="flex justify-center items-center">
              <img src={HomeIcon} alt="Home" />
            </div>

            <div className="flex justify-center items-center">
              <img src={OrderIcon} alt="Order" />
            </div>

            <div className="flex justify-center items-center">
              <img src={MenuIcon} alt="Menu" />
            </div>

            <div className="flex justify-center items-center">
              <img src={ReportsIcon} alt="Reports" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
