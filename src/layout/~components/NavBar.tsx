import { useEffect, useState } from "react";
import CompanyLogo from "../../assets/webshipyaarilogo.svg";
import ShipyaariLogo from "../../assets/Navbar/shipyaariLogos.svg";
import downArrow from "../../assets/downwardArrow.svg";
import CustomButton from "../../components/Button";
import CloseMenu from "../../assets/Navbar/closeMenu.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { ResponsiveState } from "../../utils/responsiveState";
import { useSelector } from "react-redux";
import {
  LARGE_LOGO,
  SMALL_LOGO,
  COMPANY_NAME,
  POST_SSO_URL,
} from "../../utils/ApiUrls";
import { sideBarMenusData } from "../../utils/dummyData";
import { POST } from "../../utils/webService";
import toast from "react-hot-toast";
import sessionManager from "../../utils/sessionManager";
import { FaChevronDown } from "react-icons/fa";

interface INavBarProps {
  openMobileSideBar: any;
  setMobileSideBar: any;
}

const NavBar: React.FunctionComponent<INavBarProps> = (props) => {
  const { openMobileSideBar, setMobileSideBar } = props;
  const roles = useSelector((state: any) => state?.roles);
  const isDarkStoreEnabled = useSelector(
    (state: any) => state.roles.isDarkStoreEnable
  );

  const navigate = useNavigate();
  const location = useLocation();
  const [sideBarMenus, setSideBarMenus]: any = useState<any>(
    sideBarMenusData || []
  );

  const { isLgScreen } = ResponsiveState();
  const [isHover, setIsHover]: any = useState<boolean>(false);

  useEffect(() => {
    if (!sideBarMenus.length) return;
    updateActivetab(sideBarMenusData);
  }, [location]);

  useEffect(() => {
    updateActivetab(sideBarMenusData);
  }, [isDarkStoreEnabled]);

  const conditinalClass = {
    width: `${isHover ? "25rem" : "75px"}`,
    backdropFilter: `${
      isHover ? "blur(2px) opacity(1)" : "blur(0px) opacity(0)"
    }`,
    mobileWidth: `${openMobileSideBar ? "100%" : "0"}`,
  };

  const filterMenuItems = (menu: any): any => {
    const checks = [
      {
        key: "isDarkStoreEnable",
        type: "darkstore",
        enabled: isDarkStoreEnabled,
      },
    ];

    const matchedCheck = checks.find((check) => check.type === menu.type);
    if (!matchedCheck) return false;

    const isEnabled = matchedCheck.enabled == true ? true : false;
    return isEnabled;
  };

  const updateActivetab = (arr: any = []) => {
    const { pathname } = location;
    const [parent, ...childs] = pathname
      .split("/")
      .filter((path: any) => path !== "");

    arr?.forEach((e: any) => {
      // Reset active state
      if (e.isActivePath) e.isActivePath = !e.isActivePath;

      // Handle items with direct paths
      if ((!e.menu || e.menu.length === 0) && e.path) {
        if (pathname === e.path) {
          e.isActivePath = true;
        }
      }
      // Handle items with child menus
      else if (e.menu) {
        e.menu?.forEach((e1: any) => {
          if (e1.isActivePath) e1.isActivePath = !e1.isActivePath;
          const [parentFromPaths, ...restChild] = e1.path
            .split("/")
            .filter((path: any) => path !== "");
          if (parent === parentFromPaths) {
            e.isActivePath = true;
          }
          if (pathname === e1.path) {
            e1.isActivePath = true;
          }
          if (e1.menu.menu) {
            e1.menu.menu.forEach((e2: any) => {
              if (e2.isActivePath) e2.isActivePath = !e2.isActivePath;
            });
          }
        });
      }
    });

    const filteredMenu = arr.map((item: any) => {
      if (!item.menu) return item;
      const filteredMenuItem = item.menu.filter((menuItem: any) => {
        if (!menuItem.type) return true;
        return filterMenuItems(menuItem);
      });

      return {
        ...item,
        menu: filteredMenuItem,
      };
    });
    setSideBarMenus([...filteredMenu]);
  };

  const setIsActivePath = (index: number, childIndex: number, path: any) => {
    if (path.startsWith("https://")) {
      window.open(path, "_blank");
      return;
    }
    let tempArr = sideBarMenus.map((e: any, i: number) => {
      let newE = { ...e, isActivePath: false };
      if (e.menu) {
        newE.menu = e.menu.map((e1: any, j: number) => {
          let newE1 = { ...e1, isActivePath: false };
          if (e1.menu && e1.menu.menu) {
            newE1.menu.menu = e1.menu.menu.map((e2: any) => ({
              ...e2,
              isActivePath: false,
            }));
          }
          // Highlight the selected child
          if (i === index && j === childIndex) {
            newE1.isActivePath = true;
            newE.isActivePath = true;
          }
          return newE1;
        });
      }
      return newE;
    });
    setSideBarMenus([...tempArr]);
    if (!isLgScreen) {
      setMobileSideBar(false);
      handleClose();
    }
    navigate(path);
  };

  const companyName = process.env.REACT_APP_WHITE_COMPANYNAME || "Drivaa.Run";

  const handleMenuClick = (index: number, element: any) => {
    // If menu is empty and path exists, navigate directly
    if ((!element.menu || element.menu.length === 0) && element.path) {
      if (element.path.startsWith("https://")) {
        window.open(element.path, "_blank");
        return;
      }

      // Update active states before navigation
      let tempArr = sideBarMenus;
      tempArr?.forEach((e: any) => {
        e.isActivePath = false;
        if (e.menu) {
          e.menu?.forEach((e1: any) => {
            e1.isActivePath = false;
            if (e1.menu.menu) {
              e1.menu.menu.forEach((e2: any) => {
                e2.isActivePath = false;
              });
            }
          });
        }
      });
      tempArr[index].isActivePath = true;
      setSideBarMenus([...tempArr]);

      // Handle navigation
      navigate(element.path);

      // Handle mobile menu closing
      if (!isLgScreen) {
        setMobileSideBar(false);
        handleClose();
      }
      return;
    }

    // Otherwise use existing child menu toggle logic
    opneAndCloseChild(index, element);
  };

  const opneAndCloseChild = async (index: number, element: any) => {
    const { name, isChild } = element;
    if (name === "Help") {
      if (companyName && companyName?.trim()?.toLowerCase() === "Drivaa.Run") {
        const { data: response }: any = await POST(POST_SSO_URL, {});

        if (response?.success) {
          window.open(response?.data, "_blank");
        } else {
          toast.error(response?.message);
        }
      } else {
        window.open("https://wa.me/8700391426", "_blank");
      }

      return;
    }

    let arr = sideBarMenus;
    arr[index].isChild = !isChild;
    setSideBarMenus([...arr]);
  };

  const handleOpner = () => {
    setIsHover(true);
  };
  const handleClose = () => {
    sideBarMenus?.forEach((e: any) => {
      if (e.isChild) e.isChild = !e.isChild;
      if (e.menu) {
        e.menu?.forEach((e1: any) => {
          if (e1.isChild) e1.isChild = !e1.isChild;
          if (e1.menu.menu) {
            e1.menu.menu.forEach((e2: any) => {
              if (e2.isChild) e2.isChild = !e2.isChild;
            });
          }
        });
      }
    });
    setIsHover(false);
  };

  const { sellerInfo } = sessionManager({});
  let sellerId = sellerInfo?.sellerId;

  return (
    <>
      {sellerId ? (
        <>
          <nav
            key="1"
            onMouseEnter={handleOpner}
            onMouseLeave={handleClose}
            className={`hidden absolute cursor-pointer lg:flex flex-col h-full gap-2 ps-4 py-4 font-Open items-center bg-gradient-to-b from-[#f8faff] via-[#CFDFFF] to-[#f0f0ff] z-20 rounded-r-2xl customScroll`}
            style={{
              boxShadow: "2px 0 16px 0 rgba(80, 80, 180, 0.10)",
              borderRight: "1.5px solid #e0e0e0",
              transition: `all .2s `,
              transitionTimingFunction: "ease-in-out",
              width: conditinalClass.width,
            }}
          >
            <div
              className=" w-full !h-10 mb-3  items-center flex cursor-pointer"
              onClick={() => navigate(`/dashboard/overview`)}
            >
              {isHover && (
                <img
                  src={SMALL_LOGO}
                  alt="logo"
                  className={"w-auto h-12 me-2"}
                />
              )}
              <img
                src={isHover ? LARGE_LOGO : SMALL_LOGO}
                alt="logo"
                className={isHover ? "w-40 me-2" : "w-auto h-12 me-2"}
              />
            </div>

            <div className="w-full border-b border-[#e0e0e0] mb-3"></div>
            {sideBarMenus?.map((e: any, index: number) => {
              if (e?.name !== "Notifications") {
                let iconName = e?.icon?.toLowerCase() || "";
                const iconPath =
                  require(`../../assets/Navbar/${iconName}.svg`) || "";
                return (
                  <div className="w-full flex-col" key={index}>
                    <div
                      key={`${e.name + index}`}
                      className={`h-10 flex items-center rounded-s-xl px-3 my-1 hover:bg-[#c8dbff] hover:scale-[1.03] transition-all duration-150 w-full  cursor-pointer ${
                        e.isActivePath
                          ? "bg-white  border text-white scale-[1.05]"
                          : ""
                      }`}
                      onClick={() => {
                        handleMenuClick(index, e);
                      }}
                    >
                      <img
                        src={iconPath}
                        className={`ml-[2px] w-6 h-6 ${
                          e.isActivePath ? "" : "grayscale"
                        }`}
                        alt=""
                      />

                      {isHover ? (
                        <div
                          className={`flex items-center justify-between w-full text-base font-semibold leading-5 capitalize ml-3`}
                        >
                          <p
                            className={`whitespace-nowrap ${
                              e.isActivePath ? "invert" : ""
                            }`}
                          >
                            {e.name}
                          </p>
                          {e.menu && e.menu.length > 0 && (
                            <div
                              className={`absoulte ${
                                e.isActivePath
                                  ? "text-[#9082FF] me-1"
                                  : "text-[#9082FF]"
                              } flex items-center gap-2`}
                            >
                              <FaChevronDown />
                            </div>
                          )}
                        </div>
                      ) : null}
                    </div>
                    {e.isChild ? (
                      <div className="flex flex-col overflow-hidden ml-8 border-l-2 border-[#e0e0e0] pl-3 py-1">
                        {e.menu?.map((child: any, childIndex: number) => {
                          if (
                            e?.name === "Dashboard" &&
                            child?.name === "Orders"
                          ) {
                            return null;
                          }
                          if (
                            child?.name !== "Exception" &&
                            child?.name !== "SY Performance" &&
                            child?.name !== "Weight Freeze" &&
                            child?.name !== "Credit Notes" &&
                            child?.name !== "Channel Inventory"
                          ) {
                            return (
                              <div
                                key={childIndex}
                                className={`py-2 pl-2 rounded-lg text-[15px] font-medium ${
                                  child.isActivePath
                                    ? "bg-[#91b4fa] transition-all"
                                    : "text-[#444]"
                                } hover:bg-[#c8dbff] transition-all`}
                                onClick={() =>
                                  setIsActivePath(index, childIndex, child.path)
                                }
                              >
                                {child.name}
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    ) : null}
                  </div>
                );
              }
            })}
          </nav>
          <div
            style={{
              transition: "backdrop-filter .2s",
              transitionTimingFunction: "ease-in-out",
              backdropFilter: conditinalClass.backdropFilter,
            }}
            className={`fixed h-screen z-10 top-0 left-0 ${
              isHover ? "w-full" : "w-0"
            }`}
          ></div>
          {/* Mobile Nav Bar */}
          <>
            {/* Backdrop for mobile nav */}
            <div
              className={`lg:hidden fixed inset-0 z-30 transition-all duration-300 ${
                openMobileSideBar
                  ? "bg-black/30 backdrop-blur-sm"
                  : "pointer-events-none bg-transparent"
              }`}
              style={{ opacity: openMobileSideBar ? 1 : 0 }}
              onClick={() => setMobileSideBar(false)}
            />
            <nav
              className={`lg:hidden fixed top-0 left-0 h-full z-40 font-Open bg-gradient-to-b from-[#f8faff] via-[#CFDFFF] to-[#f0f0ff] rounded-r-2xl shadow-2xl transition-all duration-300 customScroll ${
                openMobileSideBar ? "translate-x-0" : "-translate-x-full"
              }`}
              style={{
                boxShadow: "2px 0 16px 0 rgba(80, 80, 180, 0.10)",
                borderRight: "1.5px solid #e0e0e0",
                width: "80vw",
                minWidth: 260,
                maxWidth: 340,
              }}
            >
              <div className="py-3 pl-6 pr-3 flex justify-between items-center">
                <div className="flex items-center">
                  {openMobileSideBar && (
                    <img
                      src={SMALL_LOGO}
                      alt="logo"
                      className={"w-auto h-12 me-2"}
                    />
                  )}
                  <img
                    src={openMobileSideBar ? LARGE_LOGO : SMALL_LOGO}
                    alt="logo"
                    className={
                      openMobileSideBar ? "w-32 me-2" : "w-auto h-9 me-1"
                    }
                  />
                </div>
                <img
                  className="cursor-pointer !w-6 !h-6"
                  src={CloseMenu}
                  alt=""
                  onClick={() => setMobileSideBar(false)}
                />
              </div>
              <div className="w-full border-b border-[#e0e0e0] mb-2"></div>
              {sideBarMenus?.length > 0 &&
                sideBarMenus?.map((e: any, index: number) => {
                  let iconName = e?.icon?.toLowerCase() || "";
                  const iconPath =
                    require(`../../assets/Navbar/${iconName}.svg`) || "";
                  return (
                    <div
                      className="w-full flex-col px-4 py-2"
                      key={`${e.name + index}`}
                    >
                      <div
                        className={`flex items-center gap-x-4 cursor-pointer rounded-xl p-3 justify-start w-full hover:bg-[#c8dbff] ${
                          e.isActivePath
                            ? "bg-white border text-[#160783] scale-[1.04]"
                            : ""
                        } transition-all`}
                        onClick={() => handleMenuClick(index, e)}
                      >
                        <img src={iconPath} className="w-6 h-6" alt="" />
                        <div
                          className={`flex items-center justify-between w-full text-base font-semibold leading-5 capitalize overflow-hidden`}
                        >
                          <p className={`whitespace-nowrap`}>{e.name} </p>
                          {e.menu && e.menu.length > 0 && (
                            <div className={`flex items-center gap-2`}>
                              <FaChevronDown className="text-[#9082FF]" />
                            </div>
                          )}
                        </div>
                      </div>
                      {e.isChild ? (
                        <div className="flex flex-col overflow-hidden ml-6 border-l-2 border-[#e0e0e0] pl-3 py-1">
                          {e.menu?.map((child: any, childIndex: number) => {
                            return (
                              <div
                                key={`${child.path + childIndex}`}
                                className={`rounded-lg text-[15px] font-medium cursor-pointer leading-5 capitalize p-2 ${
                                  child.isActivePath
                                    ? "bg-[#e8e8e8] text-[#004EFF]"
                                    : "text-[#444]"
                                } hover:bg-[#f0f0ff] transition-all`}
                                onClick={() =>
                                  setIsActivePath(index, childIndex, child.path)
                                }
                              >
                                {child.name}
                              </div>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
            </nav>
          </>
        </>
      ) : null}
    </>
  );
};

export default NavBar;
