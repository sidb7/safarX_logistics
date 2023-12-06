import { Outlet } from "react-router-dom";
import NavBar from "./Old_NavBar";
import { BottomNavBar } from "../components/BottomNavBar";
import Order from "../screens/Order/index";
const OrderLayout = () => {
  return (
    <div className="flex flex-col h-screen justify-between  ">
      <header className="fixed top-0 z-10 w-full ">
        <NavBar />
      </header>

      <div className="relative top-20 ">
        <Order />

        <main className="pb-24">
          <div className="relative top-0">
            <Outlet />
          </div>
        </main>

        {/* <BottomNavBar /> */}
      </div>
    </div>
  );
};

export default OrderLayout;
