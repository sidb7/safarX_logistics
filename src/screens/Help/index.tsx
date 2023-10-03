import React, { useState, useEffect } from "react";
import { Breadcrum } from "../../components/Layout/breadcrum";
import CustomButton from "../../components/Button";
import BottomLayout from "../../components/Layout/bottomLayout";
import FAQ from "./FAQs";
import Tickets from "./Tickets";
import addIcon from "../../assets/Catalogue/add.svg";
import TicketsTable from "./Tickets/table";
import RaiseTickets from "./Tickets/raiseTicket";
import AccessDenied from "../../components/AccessDenied";
import { useSelector } from "react-redux";
import { GetCurrentPath } from "../../utils/utility";

const HelpScreen = () => {
  const roles = useSelector((state: any) => state?.roles);

  const [tabName, setTabName] = useState(
    sessionStorage.getItem("helpTab") || "FAQs"
  );
  const [faqType, setFAQType] = useState("all");
  const [showTable, setShowTable] = useState(false);
  const [showRaiseTicket, setShowRaiseTicket] = useState(false);
  const [renderingComponents, setRenderingComponents] = React.useState<any>(0);
  const isActive =
    roles?.roles?.[0]?.menu?.[11]?.menu?.[renderingComponents]?.pages?.[0]
      ?.isActive;

  const listTab = [
    {
      statusName: "FAQs",
      index: 0,
    },
    {
      statusName: "Ticket",
      index: 1,
    },
    {
      statusName: "Agreements",
      index: 2,
    },
  ];

  const setScrollIndex = (id: number) => {
    let filterName = listTab.filter((array) => array?.index === id);
    let filterNewUrl = filterName[0]?.statusName
      .toLocaleLowerCase()
      .replace(/ /g, "-");

    const newUrl = `/help/${filterNewUrl}`; // Specify the new URL here

    window.history.pushState(null, "", newUrl);
    setRenderingComponents(id);
  };

  const renderComponent = () => {
    if (renderingComponents === 0) {
      return <FAQ setFAQType={setFAQType} />;
    } else if (renderingComponents === 1) {
      if (showTable) {
        return <TicketsTable />;
      } else {
        if (showRaiseTicket) {
          return <RaiseTickets />;
        } else {
          return <Tickets />;
        }
      }
    } else if (renderingComponents === 2) {
      return <p>Agreements</p>;
    }
  };
  const renderHeaderComponent = () => {
    if (renderingComponents === 1) {
      if (showTable) {
        return (
          <CustomButton
            icon={addIcon}
            showIcon={true}
            text={showTable && "RAISE TICKET"}
            className="!p-3"
            onClick={() => {
              setShowRaiseTicket(true);
              setShowTable(false);
            }}
          />
        );
      } else {
        return (
          <CustomButton
            icon={addIcon}
            showIcon={true}
            text={"VIEW ALL TICKETS"}
            className="!p-3"
            onClick={() => {
              setShowTable(true);
            }}
          />
        );
      }
    } else {
      return (
        <CustomButton
          icon={addIcon}
          showIcon={true}
          text={"CLOSE TICKET"}
          className="!p-3"
          onClick={() => {
            setShowRaiseTicket(true);
          }}
        />
      );
    }
  };
  const data = GetCurrentPath() as any;

  useEffect(() => {
    if (data[1] === "faqs") {
      setRenderingComponents(0);
      setScrollIndex(0);
    } else if (data[1] === "ticket") {
      setRenderingComponents(1);
      setScrollIndex(1);
    } else if (data[1] === "agreements") {
      setRenderingComponents(2);
      setScrollIndex(2);
    }
  }, [data]);

  return (
    <>
      {isActive ? (
        <div>
          <Breadcrum label="Help" component={renderHeaderComponent()} />
          <div className="lg:mb-24">
            <div className="mt-4 px-5 ">
              <div className="flex flex-row whitespace-nowrap mt-2 lg:h-[34px]">
                {listTab?.map(({ statusName }, index) => {
                  return (
                    <div
                      className={`flex lg:justify-center items-center border-b-2 cursor-pointer border-[#777777] px-4
${renderingComponents === index && "!border-[#004EFF]"}
`}
                      onClick={() => {
                        sessionStorage.setItem("helpTab", statusName);

                        setScrollIndex(index);
                      }}
                      key={index}
                    >
                      <span
                        className={`text-[#777777] text-[14px] lg:text-[18px]
${renderingComponents === index && "!text-[#004EFF] lg:text-[18px]"}`}
                      >
                        {statusName}
                      </span>
                    </div>
                  );
                })}
              </div>

              {renderComponent()}
              {/* {showRaiseTicket && <RaiseTickets />} */}
            </div>
            <BottomLayout callApi={() => {}} />
          </div>
        </div>
      ) : (
        <div>
          <AccessDenied />
        </div>
      )}
    </>
  );
};

export default HelpScreen;
