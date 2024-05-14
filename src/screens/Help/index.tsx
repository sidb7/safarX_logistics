import React, { useState, useEffect } from "react";
import { Breadcrum } from "../../components/Layout/breadcrum";
import CustomButton from "../../components/Button";

import FAQ from "./FAQs";
import Tickets from "./Tickets";

import AccessDenied from "../../components/AccessDenied";
import { useSelector } from "react-redux";
import { GetCurrentPath } from "../../utils/utility";

import { BottomNavBar } from "../../components/BottomNavBar";

import ViewAllTickets from "./Tickets/viewAllTickets";
import ViewTicketDetails from "./Tickets/viewTicketDetails";

const HelpScreen = () => {
  const roles = useSelector((state: any) => state?.roles);

  const [tabName, setTabName] = useState(
    localStorage.getItem("helpTab") || "FAQs"
  );
  const [faqType, setFAQType] = useState("all");
  const [showTable, setShowTable] = useState(false);
  const [showRaiseTicket, setShowRaiseTicket] = useState(false);
  const [raiseTicket, setRaiseTicket] = useState(false);
  const [viewAllTickets, setViewAllTickets] = useState(false);
  const [ticketDetails, setTicketDetails] = useState({
    showTicketDetails: false,
    ticketData: {},
  });
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

  const onClickTicket = (value: any) => {
    setViewAllTickets(false);
    setRaiseTicket(false);
    setTicketDetails({
      ...ticketDetails,
      showTicketDetails: true,
      ticketData: value,
    });
  };

  const renderComponent = () => {
    if (renderingComponents === 0) {
      return <FAQ setFAQType={setFAQType} />;
    } else if (renderingComponents === 1) {
      if (viewAllTickets) {
        return <ViewAllTickets onClick={onClickTicket} />;
      } else if (ticketDetails.showTicketDetails) {
        return <ViewTicketDetails ticketData={ticketDetails.ticketData} />;
      } else {
        return <Tickets />;
      }
    } else if (renderingComponents === 2) {
      return <p>Agreements</p>;
    }
  };
  const renderHeaderComponent = () => {
    if (renderingComponents === 1) {
      if (viewAllTickets) {
        return (
          <CustomButton
            text={"RAISE TICKET"}
            className="!w-[150px] hidden lg:block"
            onClick={() => {
              setRaiseTicket(true);
              setViewAllTickets(false);
              setTicketDetails({
                ...ticketDetails,
                showTicketDetails: false,
              });
            }}
          />
        );
      } else if (ticketDetails.showTicketDetails) {
        return (
          <CustomButton
            text={"CLOSE TICKET"}
            className="!w-[150px] hidden lg:block"
            onClick={() => {
              setRaiseTicket(true);
              setViewAllTickets(false);
              setTicketDetails({
                ...ticketDetails,
                showTicketDetails: false,
              });
            }}
          />
        );
      } else {
        return (
          <CustomButton
            text={"VIEW ALL TICKETS"}
            className="!w-[150px] text-sm hidden lg:block"
            onClick={() => {
              setViewAllTickets(true);
              setRaiseTicket(false);
              setTicketDetails({
                ...ticketDetails,
                showTicketDetails: false,
              });
            }}
          />
        );
      }
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
              <div className="flex flex-row whitespace-nowrap mt-2 mb-[32px]  lg:h-[34px]">
                {listTab?.map(({ statusName }, index) => {
                  return (
                    <div
                      className={`flex lg:justify-center items-center border-b-2 cursor-pointer border-[#777777] px-4
${renderingComponents === index && "!border-[#004EFF]"}
`}
                      onClick={() => {
                        localStorage.setItem("helpTab", statusName);

                        setScrollIndex(index);
                      }}
                      key={index}
                    >
                      <span
                        className={`text-[#777777] font-Open  leading-[18px]   lg:leading-6  font-semibold text-sm lg:text-[18px]
${renderingComponents === index && "!text-[#004EFF] lg:text-[18px]"}`}
                      >
                        {statusName}
                      </span>
                    </div>
                  );
                })}
              </div>

              {renderComponent()}
            </div>

            {/* <div className="lg:hidden mt-24">
              <BottomNavBar />
            </div> */}
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
