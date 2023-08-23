import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ShipyaariLogo from "../assets/webshipyaarilogo.svg";
import CompanyLogo from "../assets/ShipyaariLogos.svg";
import HamburgerLogo from "../assets/Navbar/hamMenu.svg";
import SearchLogo from "../assets/Navbar/search.svg";
import ProfileLogo from "../assets/Navbar/essential.svg";
import "../styles/navBar.css";
import Sidebar from "./hoverSideBar";
import { useOutsideTriggered } from "../hooks";
import { useNavigate } from "react-router-dom";
import { GetCurrentPath, clearLocalStorage } from "../utils/utility";
import { ToastContainer } from "react-toastify";

interface IpropTypes {
  menuData?: any;
}

// const NavBar: React.FC = () => {
const NavBar = (props: IpropTypes) => {
  const { menuData } = props;
  const navigate = useNavigate();

  const [activeUrlPath, setActiveUrlPath] = useState(GetCurrentPath()[0]);
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<any>(null);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<any>();

  const handleOutsideClick = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const sidebarRef = useRef<any>(null);
  useOutsideTriggered(sidebarRef, setOpen);

  const Nav_animation = {
    open: {
      width: "16rem",
      transition: {
        stiffness: 400,
        damping: 40,
      },
    },
    closed: {
      width: "0rem",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const toggleAccordion = (index: number) => {
    console.log("index :", index);

    if (activeItem === index) {
      setActiveItem(null);
    } else {
      setActiveItem(index);
    }
  };

  useEffect(() => {
    const currentPath = GetCurrentPath()[0];
    setActiveUrlPath(currentPath);
  }, [GetCurrentPath()[0]]);

  const handleToggle = () => {
    if (open === false) {
      console.log("click if", open);
      setOpen(true);
    } else {
      console.log("click else", open);
      setOpen(false);
    }
  };

  return (
    <div>
      <nav>
        <div className="flex justify-between items-center p-4 gap-10  h-14 navbar_style">
          <div className="flex gap-x-3 ">
            <img src={HamburgerLogo} onClick={() => handleToggle()} alt="" />
            <img src={CompanyLogo} alt="" />
          </div>

          <div className="flex gap-x-3 ">
            <img src={SearchLogo} alt="" />
            <div
              className="relative cursor-pointer col-span-1"
              ref={dropdownRef}
              onClick={() => setIsOpen(!isOpen)}
            >
              <img src={ProfileLogo} alt="" />
              {isOpen && (
                <div
                  className="origin-top-right absolute right-4 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <div className="py-1" role="none">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                      onClick={() => navigate("/profile")}
                    >
                      Your Profile
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Settings
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 cursor-pointer  text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                      onClick={() => {
                        clearLocalStorage();
                        navigate("/");
                      }}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className={open ? "min-w-[100px] min-h-screen" : "hidden"}>
        <ToastContainer />

        <div
          // onClick={() => setOpen(false)}
          className={`hidden fixed inset-0 max-h-screen z-[998] ${
            open ? "block" : "hidden"
          } `}
        ></div>

        <motion.div
          ref={sidebarRef}
          variants={Nav_animation}
          initial={{ x: 0 }}
          animate={open ? "open" : "closed"}
          className=" bg-white text-gray shadow-xl overflow-hidden h-screen"
          // onMouseEnter={() => {
          //   setSidebarWidth(sidebarRef.current?.clientWidth);
          //   setOpen(true);
          // }}
          // onMouseLeave={() => {
          //   setSidebarWidth(0);
          //   setOpen(false);
          // }}
        >
          {/* <div className="flex justify-center items-center gap-2.5 font-medium border-b py-3 border-slate-300  mx-3 cursor-pointer">
            {open ? (
              <img src={CompanyLogo} alt="" onClick={() => navigate("/")} />
            ) : (
              <img src={ShipyaariLogo} alt="" onClick={() => navigate("/")} />
            )}
          </div> */}

          <div className="flex h-full flex-col items-start gap-y-4 mt-4">
            {menuData?.data?.[0]?.menu?.map((panel: any, index: number) => {
              return (
                <div
                  key={index}
                  className={`flex flex-col w-full cursor-pointer ${
                    open ? "" : "items-center"
                  }`}
                  onClick={() => {
                    toggleAccordion(index);
                    // setOpen(true);
                  }}
                >
                  <div
                    className={` items-center ${
                      open ? "grid grid-cols-5" : "flex"
                    }`}
                  >
                    <img
                      src={`/images/SidePanel/${panel.icon}.svg`}
                      alt="Bill icon"
                      className={`
                    cursor-pointer
col-span-1 
                    ${
                      activeUrlPath ===
                      panel.name.toLowerCase().replace(/\s+/g, "-")
                        ? "bg-slate-300 rounded-lg"
                        : ""
                    }
                     p-2`}
                    />

                    {open && (
                      <div
                        className="col-span-4"
                        onClick={() => console.log("rrrr")}
                      >
                        <div className="grid grid-cols-4">
                          <p className="col-span-3"> {panel.name}</p>
                          <svg
                            className={`w-5 h-5 transform ${
                              activeItem === index ? "rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>

                        {activeItem === index && (
                          <div>
                            {panel.menu?.length > 0 &&
                              panel.menu?.map((menu: any, index: number) => {
                                return (
                                  <p
                                    key={index}
                                    className="text-xs text-gray-400 cursor-pointer"
                                    onClick={() => {
                                      navigate(menu.path);
                                    }}
                                  >
                                    {menu.name}
                                  </p>
                                );
                              })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NavBar;
