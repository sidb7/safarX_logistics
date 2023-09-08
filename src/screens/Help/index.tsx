import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Breadcum } from "../../components/Layout/breadcrum";
import CustomButton from "../../components/Button";
import BottomLayout from "../../components/Layout/bottomLayout";
import FAQ from "./FAQs";
import Tickets from "./Tickets";

const HelpScreen = () => {
  const navigate = useNavigate();
  const [tabName, setTabName] = useState(
    sessionStorage.getItem("helpTab") || "FAQs"
  );
  const listTab = [
    {
      statusName: "FAQs",
      active: true,
    },
    {
      statusName: "Tickets",
      active: false,
    },
    {
      statusName: "Agreements",
      active: false,
    },
  ];

  // const [helpCategoryTab, setHelpCategoryTab] = useState("all");

  const [faqType, setFAQType] = useState("all");
  const [productCatalogueTab, setProductCatalogueTab] =
    useState("singleProduct");

  const renderComponent = () => {
    if (tabName === "FAQs") {
      return <FAQ setFAQType={setFAQType} />;
    } else if (tabName === "Tickets") {
      return <Tickets />;
    } else if (tabName === "Agreements ") {
      return <p>Aggrements</p>;
    }
  };

  return (
    <>
      <Breadcum label="Help" />
      <div className="lg:mb-24">
        <div className="mt-4 px-5 ">
          <div className="flex flex-row whitespace-nowrap mt-2 lg:h-[34px]">
            {listTab.map(({ statusName }, index) => {
              return (
                <div
                  className={`flex lg:justify-center items-center border-b-2 cursor-pointer border-[#777777] px-4
${tabName === statusName && "!border-[#004EFF]"}
`}
                  onClick={() => {
                    sessionStorage.setItem("helpTab", statusName);
                    setTabName(statusName);
                  }}
                  key={index}
                >
                  <span
                    className={`text-[#777777] text-[14px] lg:text-[18px]
${tabName === statusName && "!text-[#004EFF] lg:text-[18px]"}`}
                  >
                    {statusName}
                  </span>
                </div>
              );
            })}
          </div>

          {renderComponent()}
        </div>
        <BottomLayout callApi={() => {}} />
      </div>
    </>
  );
};

export default HelpScreen;
