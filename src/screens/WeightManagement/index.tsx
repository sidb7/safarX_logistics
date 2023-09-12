import React, { useState, useEffect, SetStateAction } from "react";

import { toast } from "react-toastify";
import { Breadcum } from "../../components/Layout/breadcrum";
import WeightFreezeBanner from "./WeightFreezeBanner";
import BottomLayout from "../../components/Layout/bottomLayout";
import WeightFreezeTable from "./WeightFreezetable";
import NewDiscrepancyTable from "./Newdiscrepancy";
import PendingDispute from "./PendingDispute";
import CompletedTable from "./CompletedTable";
import CustomButton from "../../components/Button";
import addIcon from "../../assets/Catalogue/add.svg";
import RightSideModal from "../../components/CustomModal/customRightModal";
import DiscrepancyDetails from "./DiscrepancyDetailModal";
const WeightFreeze: React.FunctionComponent = () => {
  const [isActiveFreezeweight, setActiveFreezeweight] = useState(true);
  const [filterId, setFilterId] = useState(0);
  const [activeTab, setActiveTab] = useState("Weight-Freeze");
  const [tabName, setTabName] = useState(
    sessionStorage.getItem("WeightTab") || "Weight-Freeze"
  );
  const [filterData, setFilterData] = useState([
    { label: "Weight-Freeze", isActive: false },
    { label: "New Discrepancy", isActive: false },
    { label: "Pending Dispute", isActive: false },
    { label: "Completed", isActive: false },
  ]);
  const [showRaiseTicket, setShowRaiseTicket] = useState(false);
  const [discrepancyDetailsModal, setDiscrepancyDetailsModal] = useState(false);
  const [discrepancyDetailsRightModal, setDiscrepancyDetailsRightModal] =
    useState(true);

  const disputeArray = [
    {
      count: 23,
      text: "Total Dispute Raised",
    },
    {
      count: "23%",
      text: "Weight Dispute Ratio",
    },
    {
      count: `${`\u20B9`} 24`,
      text: "Total Dispute Amount",
    },
    {
      count: 11,
      text: "Total Action Taken",
    },
  ];
  const listTab = [
    {
      statusName: "Weight-Freeze",
      active: true,
    },
    {
      statusName: "New Discrepancy",
      active: false,
    },
    {
      statusName: "Pending Dispute",
      active: false,
    },
    {
      statusName: "Completed",
      active: false,
    },
  ];

  const renderHeaderComponent = () => {
    return (
      <CustomButton
        icon={addIcon}
        showIcon={true}
        text={"RAISE TICKET"}
        className="!p-3"
        onClick={() => {
          setShowRaiseTicket(true);
        }}
      />
    );
  };

  const renderComponent = () => {
    if (tabName === "Weight-Freeze") {
      return <WeightFreezeTable />;
    } else if (tabName === "New Discrepancy") {
      return <NewDiscrepancyTable />;
    } else if (tabName === "Pending Dispute") {
      return <PendingDispute />;
    } else if (tabName === "Completed") {
      return <CompletedTable />;
    }
  };
  return (
    <div className="m-4">
      <Breadcum label="Weight Management" component={renderHeaderComponent()} />
      <div className="m-4">
        <div className="flex justify-between !mt-4 gap-4 mb-10">
          {disputeArray?.map((order: any, i: number) => (
            <div
              className="w-[17rem] h-[6.6rem] rounded-lg border-2 overflow-hidden"
              key={i}
            >
              <div className="px-6 py-4">
                <p className="text-[#1C1C1C] font-normal text-base">
                  {order?.text}
                </p>
                <div className="font-bold font-Lato mb-2  text-[2rem]">
                  {order?.count}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="m-7">
          <WeightFreezeBanner isActiveFreezeweight={isActiveFreezeweight} />
        </div>
      </div>
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
                    sessionStorage.setItem("WeightTab", statusName);
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
        <RightSideModal
          isOpen={discrepancyDetailsRightModal}
          onClose={() => setDiscrepancyDetailsRightModal(false)}
          className="!w-[389px]"
        >
          <DiscrepancyDetails
            title="Discrepancy Details"
            buttonText="UPDATE"
            inputLabel="Enter SKU no."
            onClick={() => setDiscrepancyDetailsRightModal(false)}
            // onCustomLandmarkSelection={handleLandmarkSelected}
          />
        </RightSideModal>
        <BottomLayout callApi={() => {}} />
      </div>
    </div>
  );
};

export default WeightFreeze;
