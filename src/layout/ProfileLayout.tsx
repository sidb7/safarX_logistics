import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import BackArrowIcon from "../assets/backArrow.svg";
import { BottomNavBar } from "../components/BottomNavBar";
import { Profile } from "../screens/Profile";
const ProfileLayout = () => {
  return (
    <div className="flex flex-col h-screen justify-between ">
      <header className="fixed top-0 z-10 w-full ">
        <NavBar />
      </header>

      <div className="relative top-20">
        <div>
          <div className="inline-flex space-x-2 items-center justify-start px-5">
            <img src={BackArrowIcon} alt="" className="lg:w-[16px]" />

            <p className="text-lg font-semibold text-center text-gray-900 lg:text-[28px] ">
              Profile
            </p>
          </div>
        </div>

        <Profile />

        <main className="pb-24">
          <div className="relative top-0">
            <Outlet />
          </div>
        </main>
        <div className="lg:hidden">
          <BottomNavBar />
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
