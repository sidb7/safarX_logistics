import React, { useState } from "react";
import { Breadcrum } from "../../components/Layout/breadcrum";
import { CustomTable } from "../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import {
  capitalizeFirstLetter,
  convertEpochToDateTime,
} from "../../utils/utility";
import { POST } from "../../utils/webService";
import {
  DOWNLOAD_S3_LABEL,
  FETCH_LABELS_REPORT_LIST,
  GET_SYSTEM_LOG,
} from "../../utils/ApiUrls";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import AccessDenied from "../../components/AccessDenied";
import { checkPageAuthorized } from "../../redux/reducers/role";
import SortIcon from "../../assets/sort.svg";
import EyeIcon from "../../assets/blueEye.svg";
import CenterModal from "../../components/CustomModal/customCenterModal";
import CrossIcon from "../../assets/CloseIcon.svg";
import PaginationComponent from "../../components/Pagination";

const BulkLabelList = () => {
  const columnsHelper = createColumnHelper<any>();
  const [bulkDownloadLabelList, setBulkDownloadLabelList] = React.useState<any>(
    []
  );
  const roles = useSelector((state: any) => state?.roles);
  // const isActive = roles.roles?.[0]?.menu?.[8]?.menu?.[0]?.pages?.[3]?.isActive;
  const [totalItemCount, setTotalItemCount] = useState<any>();

  React.useEffect(() => {
    (async () => {
      try {
        const { data: response } = await POST(FETCH_LABELS_REPORT_LIST, {
          limit: 10000,
          pageNo: 1,
        });
        if (response?.success) {
          setBulkDownloadLabelList(response?.data);
          setTotalItemCount(response?.totalLabelCount);
        } else {
          // toast.error(data?.message);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const downloadFile = async (name: any) => {
    try {
      const { data: response } = await POST(DOWNLOAD_S3_LABEL, {
        labelId: name,
      });
      if (response?.success) {
        toast.success(response?.message);
        window.location.href = response?.url;
      } else {
        // toast.error(data?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const bulkDownloadColumns = [
    columnsHelper.accessor("userId", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#160783] text-center  ">
            Start Date
          </p>
        );
      },
      cell: (info: any) => {
        const data = info?.row?.original;
        return (
          <div className="flex items-center justify-center first-letter:justify-center font-Open font-semibold text-sm leading-5 text-[#1C1C1C] ">
            {convertEpochToDateTime(data?.reqInitiatedAt)}
          </div>
        );
      },
    }),
    columnsHelper.accessor("userName", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#160783] text-center  ">
            End Date
          </p>
        );
      },
      cell: (info: any) => {
        const data = info?.row?.original;
        return (
          <div className="flex items-center justify-center font-Open font-semibold text-sm leading-5 text-[#1C1C1C] ">
            {convertEpochToDateTime(data?.reqCompletedAt)}
          </div>
        );
      },
    }),
    columnsHelper.accessor("eventName", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#160783] text-center ">
            Label Link
          </p>
        );
      },
      cell: (info: any) => {
        const data = info?.row?.original;
        return (
          <div className="flex items-center justify-center font-Open font-semibold text-sm leading-5 text-[#1C1C1C] ">
            <a
              className={`text-[#160783] ${
                data?.status !== "SUCCESS"
                  ? "pointer-events-none opacity-40"
                  : "cursor-pointer"
              }`}
              onClick={() => downloadFile(data?.downloadLink)}
            >
              Download Label
            </a>
          </div>
        );
      },
    }),
    columnsHelper.accessor("logType", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold w-[100px] leading-[18px] text-[#160783] text-center  ">
            Filter
          </p>
        );
      },
      cell: (info: any) => {
        const data = info?.row?.original;
        let partnerArr =
          data?.filter?.filterArrOne?.[0]?.["service.partnerName"]["$in"];
        return (
          <div className="font-Open font-semibold text-sm py-2  leading-5 text-[#1C1C1C] ">
            Partner Name:
            {partnerArr?.length > 0 ? (
              partnerArr?.map((el: any, i: any) => {
                return (
                  <p className="flex font-Open font-normal text-xs w-full my-2">
                    {el.toString()}
                  </p>
                );
              })
            ) : (
              <p className="font-normal"> N/A</p>
            )}
          </div>
        );
      },
    }),
    columnsHelper.accessor("ipAddress", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#160783] text-center  ">
            Status
          </p>
        );
      },
      cell: (info: any) => {
        const data = info?.row?.original;
        return (
          <div className="flex items-center justify-center font-Open font-semibold text-sm leading-5 text-[#1C1C1C] ">
            {data?.status}
          </div>
        );
      },
    }),
  ];

  //on page change index
  const onPageIndexChange = async (pageIndex: any) => {
    console.log("pageindex", pageIndex);
    const { data } = await POST(GET_SYSTEM_LOG, {
      pageNo: pageIndex?.currentPage,
      limit: pageIndex?.itemsPerPage,
    });
    if (data?.success) {
      setBulkDownloadLabelList(data?.data[0]?.data);
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
      setBulkDownloadLabelList(data?.data[0]?.data);
    } else {
      toast.error(data?.message);
    }
  };

  return (
    <>
      {/* {isActive ? ( */}
      <div>
        <div>
          <Breadcrum label="Bulk Label List" />
        </div>
        <div className="">
          <CustomTable
            rowData={bulkDownloadLabelList}
            columnsData={bulkDownloadColumns}
          />
        </div>
        {/* {totalItemCount > 0 && (
          <PaginationComponent
            totalItems={totalItemCount}
            itemsPerPageOptions={[
              10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000,
            ]}
            onPageChange={onPageIndexChange}
            onItemsPerPageChange={onPerPageItemChange}
            // rightmodalPagination={true}
          />
        )} */}
      </div>
      {/* ) : (
        <div>
          <AccessDenied />
        </div>
      )} */}
    </>
  );
};

export default BulkLabelList;
