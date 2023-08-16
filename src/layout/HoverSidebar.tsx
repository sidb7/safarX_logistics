import { useState, useEffect } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";

import ShipyaariLogo from "../assets/webshipyaarilogo.svg";
import CompanyLogo from "../assets/ShipyaariLogos.svg";

import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { GetCurrentPath } from "../utils/utility";
import { useOutsideTriggered } from "../hooks";
import Bill from "../assets/SidePanel/bill.svg";

interface IpropTypes {
  menuData: any;
}

// const Sidebar = (props: IpropTypes) => {
const Sidebar = () => {
  //   const { menuData } = props;
  const menuData = {
    success: true,
    data: [
      {
        _id: "64c0dc10f6a4e28ac263049e",
        roleName: "SENIOR DEVELOPER",
        roleId: "919e01ca",
        companyId: "9b6c92a4-9584-4cf4-a624-58d6bd245a26",
        menu: [
          {
            id: "1",
            name: "Employee Management",
            pages: [],
            menu: [
              {
                id: "2",
                name: "Role Management",
                pages: [
                  {
                    id: "3",
                    name: "Role Management",
                    isActive: true,
                    permissions: {
                      create: true,
                      read: true,
                      update: true,
                      delete: true,
                      download: true,
                      upload: true,
                    },
                  },
                ],
                menu: [],
                path: "/employee-management/role-management",
                isActive: true,
              },
              {
                id: "4",
                name: "User Management",
                pages: [
                  {
                    id: "5",
                    name: "User Management",
                    isActive: true,
                    permissions: {
                      create: true,
                      read: true,
                      update: true,
                      delete: true,
                      download: true,
                      upload: true,
                    },
                  },
                ],
                menu: [],
                path: "/employee-management/user-management",
                isActive: true,
              },
            ],
            icon: "Menu",
            isActive: true,
          },
          {
            id: "6",
            name: "Partner Management",
            pages: [],
            menu: [
              {
                id: "7",
                name: "Overview",
                pages: [
                  {
                    id: "8",
                    name: "Overview",
                    isActive: true,
                    permissions: {
                      create: true,
                      read: true,
                      update: true,
                      delete: true,
                      download: true,
                      upload: true,
                    },
                  },
                ],
                menu: [],
                path: "/partner-management/overview",
                isActive: true,
              },
              {
                id: "9",
                name: "Partner List",
                pages: [
                  {
                    id: "10",
                    name: "Partner List",
                    isActive: true,
                    permissions: {
                      create: true,
                      read: true,
                      update: true,
                      delete: true,
                      download: true,
                      upload: true,
                    },
                  },
                ],
                menu: [],
                path: "/partner-management/partner-list",
                isActive: true,
              },
              {
                id: "11",
                name: "Billing",
                pages: [
                  {
                    id: "12",
                    name: "Billing",
                    isActive: true,
                    permissions: {
                      create: true,
                      read: true,
                      update: true,
                      delete: true,
                      download: true,
                      upload: true,
                    },
                  },
                ],
                menu: [],
                path: "/partner-management/billing",
                isActive: true,
              },
              {
                id: "13",
                name: "Servicable Pincodes",
                pages: [
                  {
                    id: "14",
                    name: "Servicable Pincodes",
                    isActive: true,
                    permissions: {
                      create: true,
                      read: true,
                      update: true,
                      delete: true,
                      download: true,
                      upload: true,
                    },
                  },
                ],
                menu: [],
                path: "/partner-management/servicable-pincodes",
                isActive: true,
              },
              {
                id: "15",
                name: "Master Services",
                pages: [
                  {
                    id: "16",
                    name: "Master Services",
                    isActive: true,
                    permissions: {
                      create: true,
                      read: true,
                      update: true,
                      delete: true,
                      download: true,
                      upload: true,
                    },
                  },
                ],
                menu: [],
                path: "/partner-management/master-services",
                isActive: true,
              },
              {
                id: "17",
                name: "Master Zones",
                pages: [
                  {
                    id: "18",
                    name: "Master Zones",
                    isActive: true,
                    permissions: {
                      create: true,
                      read: true,
                      update: true,
                      delete: true,
                      download: true,
                      upload: true,
                    },
                  },
                ],
                menu: [],
                path: "/partner-management/master-zones",
                isActive: true,
              },
            ],
            icon: "truck",
            isActive: true,
          },
          {
            id: "19",
            name: "Pricing",
            pages: [],
            menu: [
              {
                id: "20",
                name: "Plan Management",
                pages: [
                  {
                    id: "21",
                    name: "Plan Management",
                    isActive: true,
                    permissions: {
                      create: true,
                      read: true,
                      update: true,
                      delete: true,
                      download: true,
                      upload: true,
                    },
                  },
                ],
                menu: [],
                path: "/pricing/plan-management",
                isActive: true,
              },
              {
                id: "22",
                name: "Client Billing",
                pages: [
                  {
                    id: "23",
                    name: "Client Billing",
                    isActive: true,
                    permissions: {
                      create: true,
                      read: true,
                      update: true,
                      delete: true,
                      download: true,
                      upload: true,
                    },
                  },
                ],
                menu: [],
                path: "/pricing/client-billing",
                isActive: true,
              },
              {
                id: "24",
                name: "VAS Pricing",
                pages: [],
                menu: [
                  {
                    id: "25",
                    name: "Whatsapp",
                    pages: [
                      {
                        id: "26",
                        name: "Whatsapp",
                        isActive: true,
                        permissions: {
                          create: true,
                          read: true,
                          update: true,
                          delete: true,
                          download: true,
                          upload: true,
                        },
                      },
                    ],
                    menu: [],
                    path: "/pricing/vas-pricing/whatsapp",
                    isActive: true,
                  },
                  {
                    id: "27",
                    name: "SMS",
                    pages: [
                      {
                        id: "28",
                        name: "SMS",
                        isActive: true,
                        permissions: {
                          create: true,
                          read: true,
                          update: true,
                          delete: true,
                          download: true,
                          upload: true,
                        },
                      },
                    ],
                    menu: [],
                    path: "/pricing/vas-pricing/sms",
                    isActive: true,
                  },
                  {
                    id: "29",
                    name: "Cloud-Connect",
                    pages: [
                      {
                        id: "30",
                        name: "Cloud-Connect",
                        isActive: true,
                        permissions: {
                          create: true,
                          read: true,
                          update: true,
                          delete: true,
                          download: true,
                          upload: true,
                        },
                      },
                    ],
                    menu: [],
                    path: "/pricing/vas-pricing/cloud-connect",
                    isActive: true,
                  },
                  {
                    id: "31",
                    name: "Meta",
                    pages: [
                      {
                        id: "32",
                        name: "Meta",
                        isActive: true,
                        permissions: {
                          create: true,
                          read: true,
                          update: true,
                          delete: true,
                          download: true,
                          upload: true,
                        },
                      },
                    ],
                    menu: [],
                    path: "/pricing/vas-pricing/meta",
                    isActive: true,
                  },
                  {
                    id: "33",
                    name: "OpenAI",
                    pages: [
                      {
                        id: "34",
                        name: "OpenAI",
                        isActive: true,
                        permissions: {
                          create: true,
                          read: true,
                          update: true,
                          delete: true,
                          download: true,
                          upload: true,
                        },
                      },
                    ],
                    menu: [],
                    path: "/pricing/vas-pricing/openai",
                    isActive: true,
                  },
                ],
                path: "/pricing/vas-pricing",
                isActive: true,
              },
              {
                id: "35",
                name: "COD Pricing",
                pages: [
                  {
                    id: "36",
                    name: "COD Pricing",
                    isActive: true,
                    permissions: {
                      create: true,
                      read: true,
                      update: true,
                      delete: true,
                      download: true,
                      upload: true,
                    },
                  },
                ],
                menu: [],
                path: "/pricing/cod-pricing",
                isActive: true,
              },
              {
                id: "37",
                name: "Partner Costing",
                pages: [
                  {
                    id: "38",
                    name: "Partner Costing",
                    isActive: true,
                    permissions: {
                      create: true,
                      read: true,
                      update: true,
                      delete: true,
                      download: true,
                      upload: true,
                    },
                  },
                ],
                menu: [],
                path: "/pricing/partner-costing",
                isActive: true,
              },
              {
                id: "39",
                name: "HSN & Tax Details",
                pages: [
                  {
                    id: "40",
                    name: "HSN & Tax Details",
                    isActive: true,
                    permissions: {
                      create: true,
                      read: true,
                      update: true,
                      delete: true,
                      download: true,
                      upload: true,
                    },
                  },
                ],
                menu: [],
                path: "/pricing/hsn-tax-details",
                isActive: true,
              },
            ],
            icon: "bill",
            isActive: true,
          },
          {
            id: "41",
            name: "Agreements",
            pages: [],
            menu: [
              {
                id: "42",
                name: "Courier",
                pages: [
                  {
                    id: "43",
                    name: "Courier",
                    isActive: true,
                    permissions: {
                      create: true,
                      read: true,
                      update: true,
                      delete: true,
                      download: true,
                      upload: true,
                    },
                  },
                ],
                menu: [],
                path: "/agreements/courier",
                isActive: true,
              },
              {
                id: "44",
                name: "Client",
                pages: [
                  {
                    id: "45",
                    name: "Client",
                    isActive: true,
                    permissions: {
                      create: true,
                      read: true,
                      update: true,
                      delete: true,
                      download: true,
                      upload: true,
                    },
                  },
                ],
                menu: [],
                path: "/agreements/client",
                isActive: true,
              },
              {
                id: "46",
                name: "Vendor",
                pages: [
                  {
                    id: "47",
                    name: "Vendor",
                    isActive: true,
                    permissions: {
                      create: true,
                      read: true,
                      update: true,
                      delete: true,
                      download: true,
                      upload: true,
                    },
                  },
                ],
                menu: [],
                path: "/agreements/vendor",
                isActive: true,
              },
            ],
            icon: "summary",
            isActive: true,
          },
          {
            id: "48",
            name: "Client Management",
            pages: [],
            menu: [
              {
                id: "49",
                name: "Client List",
                pages: [
                  {
                    id: "50",
                    name: "Client List",
                    isActive: true,
                    permissions: {
                      create: true,
                      read: true,
                      update: true,
                      delete: true,
                      download: true,
                      upload: true,
                    },
                  },
                ],
                menu: [],
                path: "/client-management/client-list",
                isActive: true,
              },
              {
                id: "51",
                name: "Account Details",
                pages: [
                  {
                    id: "52",
                    name: "Account Details",
                    isActive: true,
                    permissions: {
                      create: true,
                      read: true,
                      update: true,
                      delete: true,
                      download: true,
                      upload: true,
                    },
                  },
                ],
                menu: [],
                path: "/client-management/account-details",
                isActive: true,
              },
              {
                id: "53",
                name: "Product Catalogue",
                pages: [
                  {
                    id: "54",
                    name: "Product Catalogue",
                    isActive: true,
                    permissions: {
                      create: true,
                      read: true,
                      update: true,
                      delete: true,
                      download: true,
                      upload: true,
                    },
                  },
                ],
                menu: [],
                path: "/client-management/product-catalogue",
                isActive: true,
              },
              {
                id: "55",
                name: "Address Book",
                pages: [
                  {
                    id: "56",
                    name: "Address Book",
                    isActive: true,
                    permissions: {
                      create: true,
                      read: true,
                      update: true,
                      delete: true,
                      download: true,
                      upload: true,
                    },
                  },
                ],
                menu: [],
                path: "/client-management/address-book",
                isActive: true,
              },
              {
                id: "57",
                name: "Credit Score",
                pages: [
                  {
                    id: "58",
                    name: "Credit Score",
                    isActive: true,
                    permissions: {
                      create: true,
                      read: true,
                      update: true,
                      delete: true,
                      download: true,
                      upload: true,
                    },
                  },
                ],
                menu: [],
                path: "/client-management/credit-score",
                isActive: true,
              },
            ],
            icon: "store",
            isActive: true,
          },
        ],
        createdBy: 1000,
        createdAt: 1690360848981,
        isActive: true,
        isDeleted: false,
        __v: 0,
      },
    ],
    message: "Roles Fetched SuccessFully !!!",
  };

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
            console.log("panel icons :", `/assets/SidePanel/${panel.icon}.svg`);

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
