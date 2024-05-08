import { Outlet } from "react-router-dom";
import SearchIcon from "../assets/Search.svg";
import PowerBoosterlogo from "../assets/powerbooster.svg";
import ProfileLogo from "../assets/Navbar/essential.svg";
import NavBar from "./Old_NavBar";
import Sidebar from "./hoverSideBar";
import { clearLocalStorage } from "../utils/utility";
import InputWithImage from "../components/InputWithImage/InputWithImage";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { POST } from "../utils/webService";
import { LOGOUT } from "../utils/ApiUrls";
import { toast } from "react-hot-toast";
import { socketCallbacks } from "../Socket";

type Props = {};

export const CommonLayout = (props: Props) => {
  const navigate = useNavigate();

  // const { menuData } = props;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<any>();

  const handleOutsideClick = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const logoutHandler = async () => {
    try {
      const { data } = await POST(LOGOUT);
      if (data?.success) {
        // socketCallbacks.disconnectSocket();

        toast.success(data?.message);
        navigate("/auth/login");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error(error);
    }

    clearLocalStorage();
    sessionStorage.clear();
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
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

  const isItMdScreen = useMediaQuery({
    query: "(min-width: 1023px)",
  });

  return (
    <div className="flex">
      {isItMdScreen ? (
        <Sidebar menuData={menuData} />
      ) : (
        <header className="fixed top-0 z-10 w-full ">
          <NavBar menuData={menuData} />
        </header>
      )}
      <main className=" flex-1 mx-auto">
        {isItMdScreen && (
          <div className="grid grid-cols-12 p-[10px] navbar_style">
            <div className="col-span-1  "></div>
            <div className="col-span-11   ">
              <header>
                <div className="grid grid-cols-12">
                  <div className="col-span-6"></div>
                  <div className="col-span-6 grid grid-cols-10 items-center  ">
                    <div className="col-span-8">
                      <InputWithImage
                        placeholder="Search"
                        // parentClassName="!w-full"
                        inputClassName="!w-[80%]"
                        imgSrc={SearchIcon}
                      />
                    </div>

                    <img src={PowerBoosterlogo} alt="" className="col-span-1" />

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
                              onClick={() => logoutHandler()}
                            >
                              Sign out
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </header>
            </div>
          </div>
        )}
        <Outlet />
      </main>
    </div>
    // <div className="flex flex-col h-screen justify-between ">
    //   <header className="fixed top-0 z-10 w-full ">
    //     <NavBar />
    //   </header>

    //   <div className="relative top-20">
    //     <main className="customScroll !h-[calc(100vh-165px)]">
    //       <div className="relative top-0">
    //         <Outlet />
    //       </div>
    //     </main>
    //   </div>
    // </div>
  );
};
