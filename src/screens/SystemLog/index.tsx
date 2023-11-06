import React, { useState } from "react";
import { Breadcrum } from "../../components/Layout/breadcrum";
import { CustomTable } from "../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import {
  capitalizeFirstLetter,
  convertEpochToDateTime,
} from "../../utils/utility";
import { POST } from "../../utils/webService";
import { GET_SYSTEM_LOG } from "../../utils/ApiUrls";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import AccessDenied from "../../components/AccessDenied";
import { checkPageAuthorized } from "../../redux/reducers/role";
import SortIcon from "../../assets/sort.svg";
import EyeIcon from "../../assets/blueEye.svg";
import CenterModal from "../../components/CustomModal/customCenterModal";
import CrossIcon from "../../assets/CloseIcon.svg";

const SystemLog = () => {
  const columnsHelper = createColumnHelper<any>();
  const [systemLogData, setSystemLogData] = React.useState<any>([]);
  const roles = useSelector((state: any) => state?.roles);
  // const isActive = roles.roles?.[0]?.menu?.[8]?.menu?.[0]?.pages?.[3]?.isActive;
  const [isActive, setIsActive] = useState<any>(false);
  const [isModal, setIsModal] = useState(false);
  const [logData, setLogData] = useState<any>({
    eventName: "",
    eventRecordData: {},
  });

  const systemLogColumns = [
    columnsHelper.accessor("userId", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#004EFF] text-center  ">
            User Id
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center first-letter:justify-center font-Open font-semibold text-sm leading-5 text-[#1C1C1C] ">
            {info.row.original.userId}
          </div>
        );
      },
    }),
    columnsHelper.accessor("userName", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#004EFF] text-center  ">
            User Name
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center font-Open font-semibold text-sm leading-5 text-[#1C1C1C] ">
            {capitalizeFirstLetter(info.row.original.userName)}
          </div>
        );
      },
    }),
    columnsHelper.accessor("eventName", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#004EFF] text-center ">
            Event Name
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center font-Open font-semibold text-sm leading-5 text-[#1C1C1C] ">
            {capitalizeFirstLetter(info.row.original.eventName)}
          </div>
        );
      },
    }),
    columnsHelper.accessor("ipAddress", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#004EFF] text-center  ">
            Ip Address
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center font-Open font-semibold text-sm leading-5 text-[#1C1C1C] ">
            {info.row.original.ipAddress}
          </div>
        );
      },
    }),

    columnsHelper.accessor("logType", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#004EFF] text-center  ">
            Log Type
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center font-Open font-semibold text-sm leading-5 text-[#1C1C1C] ">
            {capitalizeFirstLetter(info.row.original.logType)}
          </div>
        );
      },
    }),

    columnsHelper.accessor("createdAt", {
      header: () => {
        return (
          <div className="flex items-center justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px] text-[#004EFF] text-center  ">
              Created At
            </p>
            <img
              src={SortIcon}
              alt=""
              className="cursor-pointer"
              onClick={() => {
                console.log("sort");
                sortBy();
              }}
            />
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center font-Open font-semibold text-sm leading-5 text-[#1C1C1C] ">
            {convertEpochToDateTime(info.row.original.createdAt)}
          </div>
        );
      },
    }),

    columnsHelper.accessor("event", {
      header: () => {
        return (
          <div className="flex items-center justify-center">
            <p className="font-Open text-sm font-semibold leading-[18px] text-[#004EFF] text-center  ">
              Event
            </p>
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center">
            <img
              src={EyeIcon}
              className="cursor-pointer"
              alt=""
              onClick={() => {
                const data = JSON.stringify(
                  info.row.original.eventRecord?.message,
                  null,
                  2
                );

                setLogData({
                  eventName: info.row.original.eventName,
                  eventRecordData: data,
                });
                setIsModal(true);
              }}
            />
          </div>
        );
      },
    }),
  ];

  const sortBy = async () => {
    try {
      const { data } = await POST(GET_SYSTEM_LOG, {
        sort: { createdAt: -1 },
      });

      if (data?.success) {
        setSystemLogData(data?.data);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await POST(GET_SYSTEM_LOG, {});
        if (data?.success) {
          setSystemLogData(data?.data);
        } else {
          toast.error(data?.message);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  React.useEffect(() => {
    setIsActive(checkPageAuthorized("System Log"));
  }, [isActive]);

  return (
    <>
      {isActive ? (
        <div>
          <div>
            <Breadcrum label="System Log" />
          </div>
          <div className="mx-4">
            <CustomTable data={systemLogData} columns={systemLogColumns} />
          </div>
          <CenterModal
            isOpen={isModal}
            onRequestClose={() => {
              setIsModal(false);
            }}
            className="!w-[50%] !h-[70%]"
          >
            <div className=" w-full h-full gap-y-6 p-8 flex flex-col">
              <div className="flex items-center justify-between">
                <p className="font-Open text-lg font-bold">{`Event Name:  ${logData.eventName}`}</p>
                <div
                  onClick={() => {
                    setIsModal(false);
                  }}
                  className="flex justify-end"
                >
                  <img alt="" className="cursor-pointer" src={CrossIcon} />
                </div>
              </div>

              <div className="   overflow-y-auto    ">
                <pre className="font-Open text-lg ">{`${logData.eventRecordData}`}</pre>
              </div>
            </div>
          </CenterModal>
        </div>
      ) : (
        <div>
          <AccessDenied />
        </div>
      )}
    </>
  );
};

export default SystemLog;
