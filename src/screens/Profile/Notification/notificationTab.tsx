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
import { Breadcum } from "../../../components/Layout/breadcum";
import { toast } from "react-toastify";

export const ProfileNotificationTab = () => {
  // const { setData }: any = useOutletContext();
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
        accountDetails: notificationData.accountDetails,
        operationDetails: notificationData.operationDetails,
      },
    });
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await POST(GET_PROFILE_NOTIFICATION, {});
      if (data.success) {
        setNotificationData({
          accountDetails: data.data[0].accountDetails,
          operationDetails: data.data[0].operationDetails,
        });
      } else {
        toast.error(data.message);
      }
    })();
  }, []);

  console.log(notificationData);

  return (
    <div className="h-full">
      <Breadcum label="Notification" />
      <div className="mx-4 mt-4">
        <div className="flex flex-col">
          <div className="flex items-center">
            {!isItLgScreen && <img src={PersonIcon} alt="personIcon" />}
            <span className="text-[#323232] text-[12px] font-bold lg:text-[24px] lg:font-normal">
              Operational Details
            </span>
          </div>
          <div className="grid lg:grid-cols-3 mt-7 gap-7">
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
            <br />
            <div
              style={{
                boxShadow:
                  "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
              }}
              className="flex justify-between items-center rounded-md px-2 h-[44px]"
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
                // imgSrc={ToggleIcon}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-10">
          <div className="flex items-center">
            {!isItLgScreen && <img src={PersonIcon} alt="personIcon" />}
            <span className="ml-2 text-[#323232] text-[12px] font-bold lg:text-[24px] lg:font-normal">
              Account Details
            </span>
          </div>
          <div className="grid lg:grid-cols-3 mt-7 gap-7">
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
            <br />
            <div
              style={{
                boxShadow:
                  " 0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05);",
              }}
              className="flex justify-between items-center  rounded-md px-2 mt-4 h-[44px]"
            >
              <span className="flex whitespace-nowrap">
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
                // imgSrc={ToggleIcon}
              />
            </div>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-3 gap-4 mt-10">
          <div
            style={{
              boxShadow:
                "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
            }}
            className="flex justify-between items-center rounded-md px-2 h-[44px]"
          >
            <span className="flex whitespace-nowrap">
              Tracking notification
            </span>
            <ToggleButton
              initValue={notificationData?.accountDetails?.trackingNotification}
              toggleValue={(e: any) => {
                setNotificationData({
                  ...notificationData,
                  accountDetails: {
                    ...notificationData.accountDetails,
                    trackingNotification: e,
                  },
                });
              }}
              // imgSrc={ToggleIcon}
            />
          </div>

          <div
            style={{
              boxShadow:
                "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
            }}
            className="flex justify-between items-center shadow-md rounded-md px-2 h-[44px]"
          >
            <span className="whitespace-nowrap">Rating email</span>
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
          </div>
        </div>
      </div>
      <BottomLayout callApi={updateHandler} />
    </div>
  );
};
