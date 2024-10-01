import React, { useState } from "react";
import { Breadcrum } from "../../components/Layout/breadcrum";
import Home from "./HomeSection";
import Overview from "./OverviewSection";
import Dashboard from "./DashboardSection";

interface IIndexProps {}

const Index: React.FunctionComponent<IIndexProps> = (props) => {
  const [isMobileChannelPage, setIsMobileChannelPage] = useState(false);
  const [globalIndex, setGlobalIndex] = useState(-1);
  const [tabName, setTabName] = useState(
    localStorage.getItem("DashboardTab") || "Home"
  );

  const listTab = [
    {
      statusName: "Home",
      active: true,
      //   icon: TaskSquareIcon,
    },
    {
      statusName: "Overview",
      active: false,
      //   icon: LocationIcon,
    },
    {
      statusName: "Dashboard",
      active: false,
      //   icon: LayersIcon,
    },
  ];

  const changeUrl = (statusName: any) => {
    let replaceUrl = statusName.toLowerCase().replace(/ /g, "-");
    window.history.pushState("", "", `${replaceUrl}`);
  };

  const renderComponent = () => {
    if (tabName === "Home") {
      return <Home />;
    } else if (tabName === "Overview") {
      return <Overview />;
    } else if (tabName === "Dashboard") {
      return <Dashboard />;
    }
  };
  return (
    <>
      <div>
        <Breadcrum
          label={`${
            isMobileChannelPage ? listTab[globalIndex].statusName : "home"
          } `}
          //   component={renderHeaderComponent(setShowCombo)}
          componentClass="!px-0 lg:px-5"
          setState={() => setIsMobileChannelPage(false)}
          state={isMobileChannelPage}
        />
        <div className="">
          <div className="px-5 ">
            {/* <div className="flex flex-row  customScroll whitespace-nowrap mt-2 lg:h-[34px]">
              {listTab?.map(({ statusName }, index) => {
                return (
                  <div
                    style={{ borderBottomWidth: "3px" }}
                    className={`flex lg:justify-center items-center cursor-pointer border-[#777777] px-6
                  ${tabName === statusName && "!border-[#004EFF]"}
                  `}
                    onClick={() => {
                      localStorage.setItem("DashboardTab", statusName);
                      changeUrl(statusName);
                      setTabName(statusName);
                    }}
                    key={index}
                  >
                    <span
                      className={`text-[#777777] font-medium text-[15px] lg:text-[18px]
                    ${
                      tabName === statusName && "!text-[#004EFF] lg:text-[18px]"
                    }`}
                    >
                      {statusName}
                    </span>
                  </div>
                );
              })}
            </div> */}

            {/* {renderComponent()} */}
            <Home />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
