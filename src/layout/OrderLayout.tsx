import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import BackArrowIcon from "../assets/backArrow.svg";
import { BottomNavBar } from "../components/BottomNavBar";
import Order from "../screens/Order/index";
const OrderLayout = () => {
  return (
    <div className="flex flex-col h-screen justify-between ">
      <header className="fixed top-0 z-10 w-full ">
        <NavBar />
      </header>

      <div className="relative top-20">
        <div>
          <div className="inline-flex space-x-2 items-center justify-start px-5">
            <img src={BackArrowIcon} alt="" />

            <p className="text-lg font-semibold text-center text-gray-900 ">
              Order
            </p>
          </div>
        </div>

        <Order />

        <main className="pb-24">
          <div className="relative top-0">
            <Outlet />
          </div>
        </main>

        <BottomNavBar />
      </div>
    </div>
  );
};

export default OrderLayout;
