import { useMediaQuery } from "react-responsive";
import PersonIcon from "../../../assets/Profile/Notification/PersonIcon.svg";
import ToggleIcon from "../../../assets/notifications/Property 1=toggle on.svg";
import CustomInputBox from "../../../components/Input";
import ToggleButton from "../../../components/ToggleButton";
import { useEffect, useState } from "react";
import { POST } from "../../../utils/webService";
import {
  GET_PROFILE_NOTIFICATION,
  UPDATE_PROFILE_NOTIFICATION,
} from "../../../utils/ApiUrls";
import BottomLayout from "../../../components/Layout/bottomLayout";
import { Breadcum } from "../../../components/Layout/breadcrum";
import { toast } from "react-toastify";
import downArrowIcon from "../../../assets/Filter/downArrow.svg";
import upArrowIcon from "../../../assets/Filter/upArrow.svg";

export const ProfileNotificationTab = () => {
  const [openAccount, setOpenAccount] = useState(false);
  const [openOperation, setOpenOperation] = useState(false);
  const isItLgScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const [notificationData, setNotificationData] = useState({
    accountDetails: {
      email: "",
      contactNo: 0,
      notificationStatus: false,
      trackingNotification: false,
      ratingEmail: false,
    },
    operationDetails: {
      email: "",
      contactNo: 0,
      notificationStatus: false,
    },
  });

  const updateHandler = async () => {
    const { data } = await POST(UPDATE_PROFILE_NOTIFICATION, {
      notificationUpdate: {
        accountDetails: notificationData?.accountDetails,
        operationDetails: notificationData?.operationDetails,
      },
    });
    if (data.success) {
      // toast.success(data.message);
    } else {
      toast.error(data?.message);
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await POST(GET_PROFILE_NOTIFICATION, {});
      if (data?.success) {
        setNotificationData({
          accountDetails: data?.data?.[0]?.accountDetails,
          operationDetails: data?.data?.[0]?.operationDetails,
        });
      } else {
        toast.error(data?.message);
      }
    })();
  }, []);

  const mobileRender = () => {
    return (
      <div className="grid lg:grid-cols-3 gap-2">
        <div
          className={`border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 mt-4`}
        >
          <div
            className={`flex justify-between items-center h-[44px]  ${
              openOperation ? "bg-[#F6F6F6]" : "bg-white"
            }`}
          >
            <div>
              <span className="text-base font-semibold text-[#1C1C1C] ml-4">
                Operational Details
              </span>
            </div>
            <div>
              <img
                src={openOperation ? downArrowIcon : upArrowIcon}
                alt=""
                className="mr-4"
                onClick={() => setOpenOperation(!openOperation)}
              />
            </div>
          </div>
          <div
            className={`p-4 space-y-4 ${openOperation ? "block" : "hidden"}`}
          >
            <div>
              <CustomInputBox
                label="Operational email"
                value={notificationData?.operationDetails?.email}
                onChange={(e) => {
                  setNotificationData({
                    ...notificationData,
                    operationDetails: {
                      ...notificationData.operationDetails,
                      email: e.target.value,
                    },
                  });
                }}
              />
            </div>
            <div>
              <CustomInputBox
                label="Operational contact"
                inputType="text"
                inputMode="numeric"
                maxLength={10}
                value={notificationData?.operationDetails?.contactNo || ""}
                onChange={(e) => {
                  setNotificationData({
                    ...notificationData,
                    operationDetails: {
                      ...notificationData.operationDetails,
                      contactNo: +e.target.value,
                    },
                  });
                }}
              />
            </div>
            <div
              style={{
                boxShadow:
                  "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
              }}
              className="flex justify-between items-center rounded-md px-2 h-[44px] border-[2px] border-[#E8E8E8]"
            >
              <span className="whitespace-nowrap">
                Notification (Email, SMS)
              </span>
              <ToggleButton
                initValue={
                  notificationData?.operationDetails?.notificationStatus
                }
                toggleValue={(e: any) => {
                  setNotificationData({
                    ...notificationData,
                    operationDetails: {
                      ...notificationData.operationDetails,
                      notificationStatus: e,
                    },
                  });
                }}
              />
            </div>
          </div>
        </div>

        <div
          className={`border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 mt-4`}
        >
          <div
            className={`flex justify-between items-center h-[44px] ${
              openAccount ? "bg-[#F6F6F6]" : "bg-white"
            }`}
          >
            <div>
              <span className="text-base font-semibold text-[#1C1C1C] ml-4">
                Account Details
              </span>
            </div>
            <div>
              <img
                src={openAccount ? downArrowIcon : upArrowIcon}
                alt=""
                className="mr-4"
                onClick={() => setOpenAccount(!openAccount)}
              />
            </div>
          </div>
          <div className={`p-4 space-y-4 ${openAccount ? "block" : "hidden"}`}>
            <div>
              <CustomInputBox
                label="Account email"
                value={notificationData?.accountDetails?.email}
                onChange={(e) => {
                  setNotificationData({
                    ...notificationData,
                    accountDetails: {
                      ...notificationData.accountDetails,
                      email: e.target.value,
                    },
                  });
                }}
              />
            </div>
            <div>
              <CustomInputBox
                label="Account contact"
                inputType="text"
                inputMode="numeric"
                maxLength={10}
                value={notificationData?.accountDetails?.contactNo || ""}
                onChange={(e) => {
                  setNotificationData({
                    ...notificationData,
                    accountDetails: {
                      ...notificationData.accountDetails,
                      contactNo: +e.target.value,
                    },
                  });
                }}
              />
            </div>
            <div
              style={{
                boxShadow:
                  "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
              }}
              className="flex justify-between items-center rounded-md px-2 h-[44px] border-[2px] border-[#E8E8E8]"
            >
              <span className="whitespace-nowrap">
                Notification (Email, SMS)
              </span>
              <ToggleButton
                initValue={notificationData?.accountDetails?.notificationStatus}
                toggleValue={(e: any) => {
                  setNotificationData({
                    ...notificationData,
                    accountDetails: {
                      ...notificationData.accountDetails,
                      notificationStatus: e,
                    },
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const webRender = () => {
    return (
      <div className="">
        <div className="text-[#323232] text-2xl font-normal py-5">
          <span> Operational Details</span>
        </div>
        <div className="grid grid-cols-3 gap-4 gap-y-4">
          <div className="">
            <CustomInputBox
              label="Operational email"
              value={notificationData?.operationDetails?.email}
              onChange={(e) => {
                setNotificationData({
                  ...notificationData,
                  operationDetails: {
                    ...notificationData.operationDetails,
                    email: e.target.value,
                  },
                });
              }}
            />
          </div>
          <div>
            <CustomInputBox
              label="Operational contact"
              inputType="text"
              inputMode="numeric"
              maxLength={10}
              value={notificationData?.operationDetails?.contactNo || ""}
              onChange={(e) => {
                setNotificationData({
                  ...notificationData,
                  operationDetails: {
                    ...notificationData.operationDetails,
                    contactNo: +e.target.value,
                  },
                });
              }}
            />
          </div>

          <div className="grid col-start-1 col-span-1">
            <div
              style={{
                boxShadow:
                  "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
              }}
              className="flex justify-between items-center rounded-md px-2 h-[44px] "
            >
              <span className="whitespace-nowrap">
                Notification (Email, SMS)
              </span>
              <ToggleButton
                initValue={
                  notificationData?.operationDetails?.notificationStatus
                }
                toggleValue={(e: any) => {
                  setNotificationData({
                    ...notificationData,
                    operationDetails: {
                      ...notificationData.operationDetails,
                      notificationStatus: e,
                    },
                  });
                }}
              />
            </div>
          </div>
        </div>

        <div className="text-[#323232] text-2xl font-normal py-5">
          <span> Account Details</span>
        </div>
        <div className="grid grid-cols-3 gap-4 gap-y-4">
          <div>
            <CustomInputBox
              label="Account email"
              value={notificationData?.accountDetails?.email}
              onChange={(e) => {
                setNotificationData({
                  ...notificationData,
                  accountDetails: {
                    ...notificationData.accountDetails,
                    email: e.target.value,
                  },
                });
              }}
            />
          </div>
          <div>
            <CustomInputBox
              label="Account contact"
              inputType="text"
              inputMode="numeric"
              maxLength={10}
              value={notificationData?.accountDetails?.contactNo || ""}
              onChange={(e) => {
                setNotificationData({
                  ...notificationData,
                  accountDetails: {
                    ...notificationData.accountDetails,
                    contactNo: +e.target.value,
                  },
                });
              }}
            />
          </div>

          <div className="grid col-start-1 col-span-1">
            <div
              style={{
                boxShadow:
                  "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
              }}
              className="flex justify-between items-center rounded-md px-2 h-[44px] "
            >
              <span className="whitespace-nowrap">
                Notification (Email, SMS)
              </span>
              <ToggleButton
                initValue={notificationData?.accountDetails?.notificationStatus}
                toggleValue={(e: any) => {
                  setNotificationData({
                    ...notificationData,
                    accountDetails: {
                      ...notificationData.accountDetails,
                      notificationStatus: e,
                    },
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const render = () => {
    return isItLgScreen ? webRender() : mobileRender();
  };

  return (
    <div className="h-full">
      <Breadcum label="Notification" />
      <div className="mx-4 overflow-y-auto h-[calc(100%-35px)] ">
        <div className="flex flex-col">{render()}</div>

        <div className="lg:grid lg:grid-cols-3 lg:space-y-0 space-y-4 gap-4 mt-10">
          <div
            style={{
              boxShadow:
                "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
            }}
            className="flex justify-between items-center rounded-md px-2 h-[44px] border-[2px] border-[#E8E8E8]"
          >
            <span className="flex justify-end whitespace-nowrap">Tracking</span>
            <div className="flex justify-end items-center">
              <ToggleButton
                initValue={
                  notificationData?.accountDetails?.trackingNotification
                }
                toggleValue={(e: any) => {
                  setNotificationData({
                    ...notificationData,
                    accountDetails: {
                      ...notificationData.accountDetails,
                      trackingNotification: e,
                    },
                  });
                }}
              />
              <span
                className={`ml-2 font-semibold text-sm ${
                  notificationData?.accountDetails?.trackingNotification
                    ? "text-[#7CCA62]"
                    : "text-[#F35838]"
                }`}
              >
                {notificationData?.accountDetails?.trackingNotification
                  ? "ACTIVE"
                  : "DEACTIVE"}
              </span>
            </div>
          </div>

          <div
            style={{
              boxShadow:
                "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
            }}
            className="flex justify-between items-center shadow-md rounded-md px-2 h-[44px] border-[2px] border-[#E8E8E8]"
          >
            <span className="whitespace-nowrap">Rating email</span>
            <div className="flex justify-end items-center">
              <ToggleButton
                initValue={notificationData?.accountDetails?.ratingEmail}
                toggleValue={(e: any) => {
                  setNotificationData({
                    ...notificationData,
                    accountDetails: {
                      ...notificationData.accountDetails,
                      ratingEmail: e,
                    },
                  });
                }}
                //  imgSrc={ToggleIcon}
              />
              <span
                className={`ml-2 font-semibold text-sm ${
                  notificationData?.accountDetails?.ratingEmail
                    ? "text-[#7CCA62]"
                    : "text-[#F35838]"
                }`}
              >
                {notificationData?.accountDetails?.ratingEmail
                  ? "ACTIVE"
                  : "DEACTIVE"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <BottomLayout callApi={updateHandler} />
    </div>
  );
};
