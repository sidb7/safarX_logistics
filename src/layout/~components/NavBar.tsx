import { useEffect, useLayoutEffect, useState } from "react";
import CompanyLogo from "../../assets/webshipyaarilogo.svg";
import ShipyaariLogo from "../../assets/Navbar/shipyaariLogos.svg";
import downArrow from "../../assets/downwardArrow.svg";
import CustomButton from "../../components/Button";
import CloseIcon from "../../assets/Navbar/closeIcon.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { GetCurrentPath } from "../../utils/utility";
import { ResponsiveState } from "../../utils/responsiveState";

interface INavBarProps {
  openMobileSideBar: any;
  setMobileSideBar: any;
}
const data = [
  {
    id: "1",
    name: "Home",
    pages: [],
    isActive: false,
    menu: [
      {
        id: "2",
        name: "Overview",
        isActive: false,
        path: "/overview",
        menu: [],
        pages: [
          {
            id: "3",
            name: "Role Management",
            isActive: false,
            permissions: {
              create: true,
              read: true,
              update: true,
              delete: true,
              upload: true,
              download: true,
            },
            routes: {
              create: "/api/v1/roles/createRole",
              read: "/api/v1/roles/fetchRole,/api/v1/roles/fetchRoleWithUsers,/api/v1/roles/fetchRoleByUser",
              update: "/api/v1/roles/updateRole",
              delete: "/api/v1/roles/deleteRole",
              upload: "",
              download: "",
            },
          },
        ],
      },
      {
        id: "4",
        name: "Orders",
        isActive: false,
        path: "/orders",
        menu: [],
        pages: [
          {
            id: "5",
            name: "User Management",
            isActive: false,
            permissions: {
              create: true,
              read: true,
              update: true,
              delete: true,
              upload: true,
              download: true,
            },
            routes: {
              create: "/api/v1/roles/createuser",
              read: "/api/v1/users/fetchuser,/api/v1/users/fetchuserWithUsers,/api/v1/users/fetchuserByUser",
              update: "/api/v1/users/updateuser",
              delete: "/api/v1/users/deleteuser",
              upload: "",
              download: "",
            },
          },
        ],
      },
      {
        id: "6",
        name: "Exception",
        isActive: false,
        path: "/exception",
        menu: [],
        pages: [
          {
            id: "7",
            name: "User Management",
            isActive: false,
            permissions: {
              create: true,
              read: true,
              update: true,
              delete: true,
              upload: true,
              download: true,
            },
            routes: {
              create: "/api/v1/roles/createuser",
              read: "/api/v1/users/fetchuser,/api/v1/users/fetchuserWithUsers,/api/v1/users/fetchuserByUser",
              update: "/api/v1/users/updateuser",
              delete: "/api/v1/users/deleteuser",
              upload: "",
              download: "",
            },
          },
        ],
      },
      {
        id: "8",
        name: "Courier",
        isActive: false,
        path: "/courier",
        menu: [],
        pages: [
          {
            id: "9",
            name: "User Management",
            isActive: false,
            permissions: {
              create: true,
              read: true,
              update: true,
              delete: true,
              upload: true,
              download: true,
            },
            routes: {
              create: "/api/v1/roles/createuser",
              read: "/api/v1/users/fetchuser,/api/v1/users/fetchuserWithUsers,/api/v1/users/fetchuserByUser",
              update: "/api/v1/users/updateuser",
              delete: "/api/v1/users/deleteuser",
              upload: "",
              download: "",
            },
          },
        ],
      },
    ],
    icon: "Menu",
  },
  {
    id: "10",
    name: "Orders",
    pages: [],
    isActive: false,
    menu: [
      {
        id: "11",
        name: "View Orders",
        isActive: false,
        path: "/order",
        menu: [],
        pages: [
          {
            id: "8",
            name: "Overview",
            isActive: false,
            permissions: {
              create: true,
              read: true,
              update: true,
              delete: true,
              upload: true,
              download: true,
            },
            routes: {
              create: "/api/v1/roles/createRole",
              read: "/api/v1/roles/fetchRole,/api/v1/roles/fetchRoleWithUsers,/api/v1/roles/fetchRoleByUser",
              update: "/api/v1/roles/updateRole",
              delete: "/api/v1/roles/deleteRole",
              upload: "",
              download: "",
            },
          },
        ],
      },
      {
        id: "12",
        name: "Add Order",
        isActive: false,
        path: "/newOrder/pickup",
        menu: [],
        pages: [
          {
            id: "10",
            name: "Partner List",
            isActive: false,
            permissions: {
              create: true,
              read: true,
              update: true,
              delete: true,
              upload: true,
              download: true,
            },
            routes: {
              create: "/api/v1/roles/createuser",
              read: "/api/v1/users/fetchuser,/api/v1/users/fetchuserWithUsers,/api/v1/users/fetchuserByUser",
              update: "/api/v1/users/updateuser",
              delete: "/api/v1/users/deleteuser",
              upload: "",
              download: "",
            },
          },
        ],
      },
    ],
    icon: "orders",
  },
  {
    id: "14",
    name: "Weight Management",
    pages: [],
    isActive: false,
    menu: [
      {
        id: "20",
        name: "Weight Freeze",
        isActive: false,
        path: "/weight-freeze",
        menu: [],
        pages: [
          {
            id: "21",
            name: "Plan Management",
            isActive: false,
            permissions: {
              create: true,
              read: true,
              update: true,
              delete: true,
              upload: true,
              download: true,
            },
            routes: {
              create: "/api/v1/roles/createRole",
              read: "/api/v1/roles/fetchRole,/api/v1/roles/fetchRoleWithUsers,/api/v1/roles/fetchRoleByUser",
              update: "/api/v1/roles/updateRole",
              delete: "/api/v1/roles/deleteRole",
              upload: "",
              download: "",
            },
          },
        ],
      },
    ],
    icon: "Weight",
  },
  {
    id: "41",
    name: "Catalogue",
    pages: [],
    isActive: false,
    menu: [
      {
        id: "42",
        name: "Channel Integration",
        isActive: false,
        path: "/channel-integration",
        menu: [],
        pages: [
          {
            id: "43",
            name: "Courier",
            isActive: false,
            permissions: {
              create: true,
              read: true,
              update: true,
              delete: true,
              upload: true,
              download: true,
            },
            routes: {
              create: "/api/v1/roles/createRole",
              read: "/api/v1/roles/fetchRole,/api/v1/roles/fetchRoleWithUsers,/api/v1/roles/fetchRoleByUser",
              update: "/api/v1/roles/updateRole",
              delete: "/api/v1/roles/deleteRole",
              upload: "",
              download: "",
            },
          },
        ],
      },
    ],
    icon: "Catalogue",
  },
  {
    id: "48",
    name: "Wallet",
    pages: [],
    isActive: false,
    menu: [
      {
        id: "49",
        name: "Recharge Wallet",
        isActive: false,
        path: "recharge-wallet",
        menu: [],
        pages: [
          {
            id: "50",
            name: "Client List",
            isActive: false,
            permissions: {
              create: true,
              read: true,
              update: true,
              delete: true,
              upload: true,
              download: true,
            },
            routes: {
              create: "/api/v1/roles/createRole",
              read: "/api/v1/roles/fetchRole,/api/v1/roles/fetchRoleWithUsers,/api/v1/roles/fetchRoleByUser",
              update: "/api/v1/roles/updateRole",
              delete: "/api/v1/roles/deleteRole",
              upload: "",
              download: "",
            },
          },
        ],
      },
    ],
    icon: "Wallet",
  },
];
const NavBar: React.FunctionComponent<INavBarProps> = (props) => {
  const { openMobileSideBar, setMobileSideBar } = props;
  const { isLgScreen } = ResponsiveState();
  const navigate = useNavigate();
  const location = useLocation();
  const [isHover, setIsHover]: any = useState(false);
  const [sideBarMenus, setSideBarMenus]: any = useState(data);
  const conditinalClass = {
    width: `${isHover ? "25rem" : "75px"}`,
    backdropFilter: `${
      isHover ? "blur(2px) opacity(1)" : "blur(0px) opacity(0)"
    }`,
    mobileWidth: `${openMobileSideBar ? "100%" : "0"}`,
  };

  useEffect(() => {
    let tempArr = sideBarMenus;
    tempArr.forEach((e: any) => {
      e.isChild = false;
      e.isActivePath = false;
      if (e.menu) {
        e.menu.forEach((e1: any) => {
          e1.isChild = false;
          e1.isActivePath = false;
          if (e1.menu.menu) {
            e1.menu.menu.foEach((e2: any) => {
              e2.isActivePath = false;
              e2.isChild = false;
            });
          }
        });
      }
    });
    setSideBarMenus([...tempArr]);
  }, []);

  useEffect(() => {
    console.log("location", location);
    let tempArr = sideBarMenus;
    tempArr.forEach((e: any) => {
      if (e.menu) {
        if (e.isActivePath) e.isActivePath = !e.isActivePath;
        e.menu.forEach((e1: any) => {
          if (e1.isActivePath) e1.isActivePath = !e1.isActivePath;
          if (location.pathname === e1.path) {
            e1.isActivePath = true;
            e.isActivePath = true;
          }
          if (e1.menu.menu) {
            e1.menu.menu.foEach((e2: any) => {
              if (e2.isActivePath) e2.isActivePath = !e2.isActivePath;
            });
          }
        });
      }
    });
  }, [location]);

  const setIsActivePath = (index: number, childIndex: number, path: any) => {
    let tempArr = sideBarMenus;
    tempArr.forEach((e: any) => {
      e.isActivePath = false;
      if (e.menu) {
        e.menu.forEach((e1: any) => {
          e1.isActivePath = false;
          if (e1.menu.menu) {
            e1.menu.menu.foEach((e2: any) => {
              e2.isActivePath = false;
            });
          }
        });
      }
    });
    tempArr[index].isActivePath = true;
    tempArr[index].menu[childIndex].isActivePath = true;
    setSideBarMenus([...tempArr]);
    if (!isLgScreen) {
      setMobileSideBar(false);
      handleClose();
    }
    navigate(path);
  };

  const opneAndCloseChild = (index: number, toggle: boolean) => {
    let arr = sideBarMenus;
    arr[index].isChild = !toggle;
    setSideBarMenus([...arr]);
  };

  const handleOpner = () => {
    setIsHover(true);
  };
  const handleClose = () => {
    sideBarMenus.forEach((e: any) => {
      if (e.isChild) e.isChild = !e.isChild;
      if (e.menu) {
        e.menu.forEach((e1: any) => {
          if (e1.isChild) e1.isChild = !e1.isChild;
          if (e1.menu.menu) {
            e1.menu.menu.foEach((e2: any) => {
              if (e2.isChild) e2.isChild = !e2.isChild;
            });
          }
        });
      }
    });
    setIsHover(false);
  };

  return (
    <>
      <nav
        onMouseEnter={handleOpner}
        onMouseLeave={handleClose}
        className={`hidden absolute cursor-pointer lg:flex flex-col h-full gap-2 p-4 font-Open items-center bg-white z-50 rounded-r-lg overflow-scroll`}
        style={{
          boxShadow: "1px 1px 8px 0px rgba(0, 0, 0, 0.12)",
          transition: `all .2s `,
          transitionTimingFunction: "ease-in-out",
          width: conditinalClass.width,
        }}
      >
        <div className="flex w-full !h-10 mb-6">
          {isHover ? (
            <img src={ShipyaariLogo} alt="" className="!w-32 !h-8" />
          ) : (
            <img src={CompanyLogo} alt="" />
          )}
        </div>
        {sideBarMenus.map((e: any, index: number) => {
          let iconName = e.icon.toLowerCase();
          const iconPath = require(`../../assets/Navbar/${iconName}.svg`);
          return (
            <div className="w-full flex-col">
              <div
                className={`h-10 flex items-center  rounded-lg ${
                  isHover ? "px-2 justify-start" : "justify-center"
                } w-full ${e.isActivePath ? " !bg-[black]" : ""}`}
                onClick={() => {
                  opneAndCloseChild(index, e.isChild);
                }}
              >
                <img
                  src={iconPath}
                  className={`${e.isActivePath ? " invert" : ""}`}
                  alt=""
                />
                {isHover ? (
                  <div
                    className={` flex items-center justify-between w-full text-base font-semibold leading-5 capitalize overflow-hidden`}
                  >
                    <p
                      className={`px-2 whitespace-nowrap ${
                        e.isActivePath ? " invert" : ""
                      }`}
                    >
                      {e.name}
                    </p>

                    <div
                      className={`${
                        e.isActivePath ? "text-white" : ""
                      } flex items-center gap-2`}
                    >
                      {`(${e.menu.length})` || 0}
                      <CustomButton
                        icon={downArrow}
                        showIcon={true}
                        onlyIcon={true}
                        className={`${
                          e.isActivePath ? " invert" : ""
                        } bg-white w-fit !p-0 !h-fit`}
                        text={""}
                        onClick={() => {}}
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              {e.isChild ? (
                <div className="flex flex-col  overflow-hidden">
                  {e.menu.map((child: any, childIndex: number) => {
                    return (
                      <div
                        className={`py-2 pl-10 rounded-lg ${
                          child.isActivePath ? "bg-[#E8E8E8]" : ""
                        }`}
                        onClick={() =>
                          setIsActivePath(index, childIndex, child.path)
                        }
                      >
                        {child.name}
                      </div>
                    );
                  })}
                </div>
              ) : (
                ""
              )}
            </div>
          );
        })}
        {/* <img
          src={`../../assets/Navbar/Weight.svg`}
          className="!w-8 !h-8"
          alt=""
        /> */}
      </nav>
      <div
        style={{
          transition: "backdrop-filter .2s",
          transitionTimingFunction: "ease-in-out",
          backdropFilter: conditinalClass.backdropFilter,
        }}
        className={`fixed h-screen  z-10 top-0 left-0" ${
          isHover ? "w-full" : "w-0"
        } `}
      ></div>

      {/* Mobile Nav Bar */}
      <>
        <nav
          className={`lg:hidden absolute  h-full font-Open bg-white z-50 overflow-scroll`}
          style={{
            boxShadow: "1px 1px 8px 0px rgba(0, 0, 0, 0.12)",
            transition: `all .2s `,
            transitionTimingFunction: "ease-in-out",
            width: conditinalClass.mobileWidth,
          }}
        >
          <div className="py-3 pl-6 pr-3 flex justify-between ">
            <p className="text-base font-semibold leading-5 capitalize ">
              Menu
            </p>
            <img
              className="cursor-pointer"
              src={CloseIcon}
              alt=""
              onClick={() => setMobileSideBar(false)}
            />
          </div>
          <div>
            {sideBarMenus.map((e: any, index: number) => {
              let iconName = e.icon.toLowerCase();
              const iconPath = require(`../../assets/Navbar/${iconName}.svg`);
              return (
                <>
                  <div className="w-full flex-col px-6 py-4">
                    <div
                      className={` flex items-center gap-x-4  rounded-lg p-4 justify-start w-full `}
                      onClick={() => {
                        opneAndCloseChild(index, e.isChild);
                      }}
                    >
                      <img src={iconPath} alt="" />
                      <div
                        className={` flex items-center  justify-between w-full  text-sm font-semibold leading-5 capitalize overflow-hidden`}
                      >
                        <p className={` whitespace-nowrap`}>{e.name}</p>

                        <div className={` flex items-center gap-2`}>
                          <CustomButton
                            icon={downArrow}
                            showIcon={true}
                            onlyIcon={true}
                            className={`
                            bg-white w-fit !p-0 !h-fit`}
                            text={""}
                            onClick={() => {}}
                          />
                        </div>
                      </div>
                    </div>
                    {e.isChild ? (
                      <div className="flex flex-col overflow-hidden ">
                        {e.menu.map((child: any, childIndex: number) => {
                          return (
                            <div
                              className={` rounded-lg  text-sm font-semibold leading-5 capitalize p-4 `}
                              onClick={() =>
                                setIsActivePath(index, childIndex, child.path)
                              }
                            >
                              {child.name}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <hr />
                </>
              );
            })}
          </div>
        </nav>
      </>
    </>
  );
};

export default NavBar;
