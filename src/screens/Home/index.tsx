import * as React from "react";
import CompanyImage from "../../../assets/Shipyaari_full_color rgb.svg";
import { ScrollNav } from "../../components/ScrollNav";
import Overview from "./Overview/Overview";
import CalenderIcon from "../../../assets/calendar.svg";
import GreenEllipse from "../../../assets/greenEllipse.svg";
import RedEllipse from "../../../assets/redEllipse.svg";
import Box from "../../../assets/Delivery Icon.svg";
import InvoiceIcon from "../../../assets/invoices.svg";
import { Breadcum } from "../../components/Layout/breadcrum";
import CustomDropDown from "../../components/DropDown";
import Orders from "./Orders";
import Exception from "./Exception";
import SyPerfromance from "./SyPerformance";

interface IOverview {}

export const Home = (props: IOverview) => {
  const [renderingComponents, setRenderingComponents] = React.useState<any>(0);

  const arrayData = [
    { index: 0, label: "Overview" },
    { index: 1, label: "Orders" },
    { index: 2, label: "Exception" },
    { index: 3, label: "SY Performance" },
  ];

  const yearArr = [
    {
      label: "Last Year",
      value: "last_year",
    },
    {
      label: "Last Quarter",
      value: "last_quarter",
    },
    {
      label: "Last Month",
      value: "last_month",
    },
    {
      label: "Last Week",
      value: "last_week",
    },
    {
      label: "Today",
      value: "today",
    },
  ];

  const setScrollIndex = (id: number) => {
    let filterName = arrayData.filter((array) => array?.index === id);
    let filterNewUrl = filterName[0]?.label
      .toLocaleLowerCase()
      .replace(/ /g, "-");

    const newUrl = `/dashboard/${filterNewUrl}`; // Specify the new URL here

    window.history.pushState(null, "", newUrl);
    setRenderingComponents(id);
  };

  React.useEffect(() => {
    const GetCurrentPath = () => {
      const currentUrl = window.location.href;
      const url = new URL(currentUrl);
      const location = url;
      const path = location.pathname;
      const pathArray = path.split("/");
      const removedFirstPath = pathArray.slice(1);
      return removedFirstPath;
    };

    const data = GetCurrentPath() as any;

    if (data[1] === "overview") {
      setRenderingComponents(0);
    } else if (data[1] === "orders") {
      setRenderingComponents(1);
    } else if (data[1] === "exception") {
      setRenderingComponents(2);
    } else if (data[1] === "sy-performance") {
      setRenderingComponents(3);
    }
  });

  return (
    <div className="m-4">
      <div>
        <Breadcum label="Home" />
      </div>
      <div className="flex justify-between">
        {/* <img className="h-[400px]" src={CompanyImage} alt="logo" /> */}
        <div>
          <ScrollNav
            arrayData={arrayData}
            showNumber={false}
            setScrollIndex={setScrollIndex}
          />
        </div>
        {renderingComponents === 0 && (
          <div>
            <CustomDropDown
              onChange={(e) => {}}
              options={yearArr}
              heading="Select Filter"
            />
          </div>
        )}
      </div>
      {renderingComponents === 0 && <Overview />}
      {renderingComponents === 1 && <Orders />}
      {renderingComponents === 2 && <Exception />}
      {renderingComponents === 3 && <SyPerfromance />}
    </div>
  );
};

export default Overview;
