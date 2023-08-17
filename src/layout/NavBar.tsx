import React from "react";
import CompanyLogo from "../assets/Navbar/ShipyaariLogos.svg";
import HamburgerLogo from "../assets/Navbar/menu.svg";
import SearchLogo from "../assets/Navbar/search.svg";
import ProfileLogo from "../assets/Navbar/Essential.svg";
import "../styles/navBar.css";
import Sidebar from "./hoverSideBar";

const NavBar: React.FC = () => {
  return (
    <div>
      <nav>
        <div className="flex justify-between items-center p-4 gap-10  h-14 navbar_style">
          <div className="flex gap-x-3 ">
            <img src={HamburgerLogo} alt="" />
            <img src={CompanyLogo} alt="" />
          </div>
          <div className="flex gap-x-3 ">
            <img src={SearchLogo} alt="" />
            <img src={ProfileLogo} alt="" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
