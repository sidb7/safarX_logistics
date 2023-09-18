import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrum } from "../../components/Layout/breadcrum";
import CustomButton from "../../components/Button";
import BottomLayout from "../../components/Layout/bottomLayout";
import FAQ from "./FAQs";
import Tickets from "./Tickets";
import addIcon from "../../assets/Catalogue/add.svg";
import TicketsTable from "./Tickets/table";
import RaiseTickets from "./Tickets/raiseTicket";

const HelpScreen = () => {
  const navigate = useNavigate();
  const [tabName, setTabName] = useState(
    sessionStorage.getItem("helpTab") || "FAQs"
  );
  const [faqType, setFAQType] = useState("all");
  const [showTable, setShowTable] = useState(false);
  const [showRaiseTicket, setShowRaiseTicket] = useState(false);

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

  const renderComponent = () => {
    if (tabName === "FAQs") {
      return <FAQ setFAQType={setFAQType} />;
    } else if (tabName === "Tickets") {
      if (showTable) {
        return <TicketsTable />;
      } else {
        if (showRaiseTicket) {
          return <RaiseTickets />;
        } else {
          return <Tickets />;
        }
      }
    } else if (tabName === "Agreements") {
      return <p>Agreements</p>;
    }
  };
  const renderHeaderComponent = () => {
    if (tabName === "Tickets") {
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

  return (
    <>
      <Breadcrum label="Help" component={renderHeaderComponent()} />
      <div className="lg:mb-24">
        <div className="mt-4 px-5 ">
          <div className="flex flex-row whitespace-nowrap mt-2 lg:h-[34px]">
            {listTab?.map(({ statusName }, index) => {
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
          {/* {showRaiseTicket && <RaiseTickets />} */}
        </div>
        <BottomLayout callApi={() => {}} />
      </div>
    </>
  );
};

export default HelpScreen;
