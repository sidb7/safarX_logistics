import React, { useState, useEffect } from "react";
import { Breadcrum } from "../../components/Layout/breadcrum";
import { SearchBox } from "../../components/SearchBox";
import NotificationCard from "./notificationCard";
import { useSelector } from "react-redux";
import AccessDenied from "../../components/AccessDenied";
import { checkPageAuthorized } from "../../redux/reducers/role";

interface INotificationsProps {}

const Notifications: React.FunctionComponent<INotificationsProps> = (props) => {
  const roles = useSelector((state: any) => state?.roles);
  // const isActive = roles.roles?.[0]?.menu?.[9]?.menu?.[0]?.pages?.[0]?.isActive;
  const isActive = checkPageAuthorized("Notifications");

  const [filterId, setFilterId] = useState(0);
  const [activeTab, setActiveTab] = useState("all");
  const [filterData, setFilterData] = useState([
    { label: "All", isActive: false },
    { label: "Order", isActive: false },
    { label: "Billing", isActive: false },
    { label: "Plan", isActive: false },
    { label: "Help", isActive: false },
  ]);
  const [notificationData, setNotificationData] = useState([
    {
      label:
        "Your Order no. 12345678919 has been shipped. The ETA of your order is 15th September",
      date: "08 September",
      time: "12:50 pm",
    },
    // {
    //   label:
    //     "Your Order no. 1234598765 has been shipped. The ETA of your order is 19th September",
    //   date: "08 September",
    //   time: "13:00 pm",
    // },
    // {
    //   label:
    //     "Your Order no. 5678919 has been shipped. The ETA of your order is 25th September",
    //   date: "08 July",
    //   time: "10:49 am",
    // },
    // {
    //   label:
    //     "Your Order no. 10098755 has been shipped. The ETA of your order is 15th July",
    //   date: "08 July",
    //   time: "12:50 pm",
    // },
  ]);

  const filterComponent = () => {
    return (
      <div className="flex flex-col gap-y-4 md:flex-row justify-between mx-5">
        <div
          className={`flex text-[14px] text-[#777777] font-semibold font-Open leading-[22px] h-[44px] cursor-pointer`}
        >
          {filterData?.map((singleData, index) => {
            return (
              <span
                key={index}
                className={`flex items-center py-[8px] px-[16px] border-[1px] border-[#A4A4A4] ${
                  filterId === index
                    ? `${index === filterData.length - 1 && "rounded-r-md"}
                         ${index === 0 && "rounded-l-md"}
                      bg-[#D2D2D2] font-semibold font-Open text-[#1C1C1C]`
                    : ""
                }`}
                onClick={() => {
                  setFilterId(index);
                  if (index === 0) {
                    setActiveTab("all");
                  } else if (index === 1) {
                    setActiveTab("order");
                  } else if (index === 2) {
                    setActiveTab("billing");
                  } else if (index === 2) {
                    setActiveTab("plan");
                  } else if (index === 2) {
                    setActiveTab("help");
                  }
                }}
              >
                {singleData.label}
              </span>
            );
          })}
        </div>
        <div>
          <SearchBox label="Search" value="" onChange={() => {}} />
        </div>
      </div>
    );
  };

  return (
    <>
      {isActive ? (
        <div>
          <Breadcrum label="Notifications" />
          <div className="customScroll">
            {filterComponent()}
            <div className="flex flex-col gap-y-4 mt-7 mx-4">
              {notificationData?.map((data: any, index: any) => {
                return (
                  //commented as statics data is passing and showing no data found
                  // <NotificationCard
                  //   label={data?.label}
                  //   date={data?.date}
                  //   time={data?.time}
                  //   key={index}
                  // />
                  <>
                    <div className="w-full h-96 bg-[#f7f7f7] hover:bg-[#e9e9e9] flex rounded-lg justify-center items-center">
                      No Data Found
                    </div>
                  </>
                );
              })}
            </div>
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

export default Notifications;
