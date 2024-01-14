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
import PaginationComponent from "../../components/Pagination";

const SystemLog = () => {
  const columnsHelper = createColumnHelper<any>();
  const [systemLogData, setSystemLogData] = React.useState<any>([]);
  const roles = useSelector((state: any) => state?.roles);
  // const isActive = roles.roles?.[0]?.menu?.[8]?.menu?.[0]?.pages?.[3]?.isActive;
  const [totalItemCount, setTotalItemCount] = useState<any>();
  const [isActive, setIsActive] = useState<any>(false);
  const [isModal, setIsModal] = useState(false);
  const [logData, setLogData] = useState<any>({
    eventName: "",
    eventRecordData: {},
  });
  const [sortValue, setSortValue] = useState<any>(-1);

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
    if (sortValue === 1) {
      setSortValue(-1);
    } else {
      setSortValue(1);
    }

    try {
      const { data } = await POST(GET_SYSTEM_LOG, {
        sort: { createdAt: sortValue },
      });

      if (data?.success) {
        setSystemLogData(data?.data[0]?.data);
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
          setSystemLogData(data?.data[0]?.data);
          setTotalItemCount(data?.data[0]?.paginationData[0]?.total);
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

  //on page change index
  const onPageIndexChange = async (pageIndex: any) => {
    console.log("pageindex", pageIndex);
    const { data } = await POST(GET_SYSTEM_LOG, {
      pageNo: pageIndex?.currentPage,
      limit: pageIndex?.itemsPerPage,
    });
    if (data?.success) {
      setSystemLogData(data?.data[0]?.data);
    } else {
      toast.error(data?.message);
    }
  };

  // on per page item change
  const onPerPageItemChange = async (ItemChange: any) => {
    console.log("ItemChange", ItemChange);
    const { data } = await POST(GET_SYSTEM_LOG, {
      pageNo: ItemChange?.currentPage,
      limit: ItemChange?.itemsPerPage,
    });
    if (data?.success) {
      setSystemLogData(data?.data[0]?.data);
    } else {
      toast.error(data?.message);
    }
  };

  return (
    <>
      {isActive ? (
        <div>
          <div>
            <Breadcrum label="System Log" />
          </div>
          <div className="mx-4 customScroll">
            <CustomTable data={systemLogData} columns={systemLogColumns} />
          </div>
          {totalItemCount > 0 && (
            <PaginationComponent
              totalItems={totalItemCount}
              itemsPerPageOptions={[10, 20, 30, 50]}
              onPageChange={onPageIndexChange}
              onItemsPerPageChange={onPerPageItemChange}
              rightmodalPagination={true}
            />
          )}
          <CenterModal
            isOpen={isModal}
            onRequestClose={() => {
              setIsModal(false);
            }}
            className="!w-[350px] md:!w-[50%] !h-[70%]"
          >
            <div className=" w-full h-full gap-y-6 p-4 flex flex-col">
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

              <div className="   customScroll    ">
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
