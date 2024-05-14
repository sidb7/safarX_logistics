import { useEffect, useState } from "react";
import CompanyLogo from "../../assets/webshipyaarilogo.svg";
import ShipyaariLogo from "../../assets/Navbar/shipyaariLogos.svg";
import downArrow from "../../assets/downwardArrow.svg";
import CustomButton from "../../components/Button";
import CloseMenu from "../../assets/Navbar/closeMenu.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { ResponsiveState } from "../../utils/responsiveState";
import { useSelector } from "react-redux";

interface INavBarProps {
  openMobileSideBar: any;
  setMobileSideBar: any;
}

const NavBar: React.FunctionComponent<INavBarProps> = (props) => {
  const { openMobileSideBar, setMobileSideBar } = props;
  const roles = useSelector((state: any) => state?.roles);
  const navigate = useNavigate();
  const location = useLocation();
  const [sideBarMenus, setSideBarMenus]: any = useState<any>([]);
  const { isLgScreen } = ResponsiveState();
  const [isHover, setIsHover]: any = useState<boolean>(false);

  useEffect(() => {
    let { roles: data, loading } = roles;
    let tempArr = JSON.parse(JSON.stringify(data[0]?.menu || []));
    if (loading === false) {
      tempArr?.length > 0 &&
        tempArr.forEach((e: any) => {
          e.isChild = false;
          e.isActivePath = false;
          if (e.menu) {
            e.menu?.forEach((e1: any) => {
              e1.isChild = false;
              e1.isActivePath = false;
              if (e1.menu.menu) {
                e1.menu.menu.forEach((e2: any) => {
                  e2.isActivePath = false;
                  e2.isChild = false;
                });
              }
            });
          }
        });
      setSideBarMenus([...tempArr]);
      if (tempArr.length > 0) {
        updateActivetab(tempArr);
      }
    }
  }, [roles]);

  useEffect(() => {
    if (!sideBarMenus.length) return;
    updateActivetab(sideBarMenus);
  }, [location]);

  const conditinalClass = {
    width: `${isHover ? "25rem" : "75px"}`,
    backdropFilter: `${
      isHover ? "blur(2px) opacity(1)" : "blur(0px) opacity(0)"
    }`,
    mobileWidth: `${openMobileSideBar ? "100%" : "0"}`,
  };

  const updateActivetab = (arr: any = []) => {
    const { pathname } = location;
    const [parent, ...childs] = pathname
      .split("/")
      .filter((path: any) => path !== "");
    arr?.forEach((e: any) => {
      if (e.menu) {
        if (e.isActivePath) e.isActivePath = !e.isActivePath;
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
    setSideBarMenus([...arr]);
  };

  const setIsActivePath = (index: number, childIndex: number, path: any) => {
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
    tempArr[index].menu[childIndex].isActivePath = true;
    setSideBarMenus([...tempArr]);
    if (!isLgScreen) {
      setMobileSideBar(false);
      handleClose();
    }
    navigate(path);
  };

  const opneAndCloseChild = (index: number, element: any) => {
    const { name, isChild } = element;
    if (name === "Help") {
      window.open("https://support.shipyaari.com/tickets", "_blank");
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

  return (
    <>
      <nav
        key="1"
        onMouseEnter={handleOpner}
        onMouseLeave={handleClose}
        className={`hidden absolute cursor-pointer lg:flex flex-col h-full gap-2 p-4 font-Open items-center bg-white z-20 rounded-r-lg customScroll`}
        style={{
          boxShadow: "1px 1px 8px 0px rgba(0, 0, 0, 0.12)",
          transition: `all .2s `,
          transitionTimingFunction: "ease-in-out",
          width: conditinalClass.width,
        }}
      >
        <div
          className="flex w-full !h-10 mb-6"
          onClick={() => navigate(`/dashboard/overview`)}
        >
          {isHover ? (
            <img src={ShipyaariLogo} alt="" className="!w-32 !h-8" />
          ) : (
            <img src={CompanyLogo} alt="" />
          )}
        </div>
        {sideBarMenus?.map((e: any, index: number) => {
          let iconName = e?.icon?.toLowerCase() || "";
          const iconPath = require(`../../assets/Navbar/${iconName}.svg`) || "";
          return (
            <div className="w-full flex-col" key={index}>
              <div
                key={`${e.name + index}`}
                className={`h-10 flex items-center rounded-lg px-2
} w-full ${e.isActivePath ? " !bg-[black]" : ""}`}
                onClick={() => {
                  opneAndCloseChild(index, e);
                }}
              >
                <img
                  src={iconPath}
                  className={`ml-[2px] ${e.isActivePath ? " invert" : ""}`}
                  alt=""
                />
                {isHover ? (
                  <div
                    className={` flex items-center justify-between w-full text-base font-semibold leading-5 capitalize`}
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
                <div className="flex flex-col overflow-hidden">
                  {e.menu?.map((child: any, childIndex: number) => {
                    return (
                      <div
                        key={childIndex}
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
      </nav>
      <div
        style={{
          transition: "backdrop-filter .2s",
          transitionTimingFunction: "ease-in-out",
          backdropFilter: conditinalClass.backdropFilter,
        }}
        className={`fixed h-screen z-10 top-0 left-0" ${
          isHover ? "w-full" : "w-0"
        } `}
      ></div>

      {/* Mobile Nav Bar */}
      <>
        <nav
          className={`lg:hidden absolute h-full font-Open bg-white z-20 customScroll`}
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
              className="cursor-pointer !w-6 !h-6"
              src={CloseMenu}
              alt=""
              onClick={() => setMobileSideBar(false)}
            />
          </div>
          {sideBarMenus?.length > 0 &&
            sideBarMenus?.map((e: any, index: number) => {
              let iconName = e?.icon?.toLowerCase() || "";
              const iconPath =
                require(`../../assets/Navbar/${iconName}.svg`) || "";

              return (
                <div
                  className="w-full flex-col px-6 py-4"
                  key={`${e.name + index}`}
                >
                  <div
                    className={`flex items-center gap-x-4 cursor-pointer rounded-lg p-4 justify-start w-full`}
                  >
                    <img src={iconPath} alt="" />
                    <div
                      className={` flex items-center justify-between w-full text-sm font-semibold leading-5 capitalize overflow-hidden`}
                      onClick={() => {
                        opneAndCloseChild(index, e);
                      }}
                    >
                      <p className={` whitespace-nowrap`}>{e.name} </p>

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
                      {e.menu?.map((child: any, childIndex: number) => {
                        return (
                          <div
                            key={`${child.path + childIndex}`}
                            className={` rounded-lg text-sm font-semibold cursor-pointer leading-5 capitalize p-4 `}
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
        </nav>
      </>
    </>
  );
};

export default NavBar;
