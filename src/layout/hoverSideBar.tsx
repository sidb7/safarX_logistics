import { useState, useEffect } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";

import ShipyaariLogo from "../assets/webshipyaarilogo.svg";
import CompanyLogo from "../assets/ShipyaariLogos.svg";

import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { GetCurrentPath } from "../utils/utility";
import { useOutsideTriggered } from "../hooks";

interface IpropTypes {
  menuData: any;
}

const Sidebar = (props: IpropTypes) => {
  const { menuData } = props;

  const [activeUrlPath, setActiveUrlPath] = useState(GetCurrentPath()[0]);

  const [sidebarWidth, setSidebarWidth] = useState(0);

  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<any>(null);

  const sidebarRef = useRef<any>(null);
  useOutsideTriggered(sidebarRef, setOpen);

  const navigate = useNavigate();

  const Nav_animation = {
    open: {
      width: "16rem",
      transition: {
        stiffness: 400,
        damping: 40,
      },
    },
    closed: {
      width: "4rem",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const toggleAccordion = (index: number) => {
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

  return (
    <div className=" min-h-screen">
      <ToastContainer />

      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
          open ? "block" : "hidden"
        } `}
      ></div>

      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: 0 }}
        animate={open ? "open" : "closed"}
        className=" bg-white text-gray shadow-xl  max-w-[16rem]  w-[16rem] 
            overflow-hidden md:relative fixed  
       h-full "
        // onMouseEnter={() => {
        //   setSidebarWidth(sidebarRef.current?.clientWidth);
        //   setOpen(true);
        // }}
        // onMouseLeave={() => {
        //   setSidebarWidth(0);
        //   setOpen(false);
        // }}
      >
        <div className="flex justify-center items-center gap-2.5 font-medium border-b py-3 border-slate-300  mx-3 cursor-pointer">
          {open ? (
            <img src={CompanyLogo} alt="" onClick={() => navigate("/")} />
          ) : (
            <img src={ShipyaariLogo} alt="" onClick={() => navigate("/")} />
          )}
        </div>

        <div className="flex flex-col items-start gap-y-4 mt-4">
          {menuData?.data?.[0]?.menu?.map((panel: any, index: number) => {
            return (
              <div
                key={index}
                className={`flex flex-col w-full cursor-pointer ${
                  open ? "" : "items-center"
                }`}
                onClick={() => {
                  toggleAccordion(index);
                  setOpen(true);
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
                    <div className="col-span-4">
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
  );
};

export default Sidebar;
