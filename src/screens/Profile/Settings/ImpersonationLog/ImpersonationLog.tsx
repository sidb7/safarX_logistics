import React, { useState, useEffect } from "react";
import { Breadcrum } from "../../../../components/Layout/breadcrum";
import { CustomTable } from "../../../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import PaginationComponent from "../../../../components/Pagination";
import { GET_IMPERSONATION_LOGS } from "../../../../utils/ApiUrls";
import { POST } from "../../../../utils/webService";
import { toast } from "react-hot-toast";
import { convertEpochToDateTime } from "../../../../utils/utility";

const ImpersonationLog = () => {
  const columnsHelper = createColumnHelper<any>();
  const [logData, setLogData] = useState<any>([]);
  const [totalItemCount, setTotalItemCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const columns = [
    columnsHelper.accessor("createdAt", {
      header: "Date",
      cell: (info) => convertEpochToDateTime(info.getValue()),
    }),
    columnsHelper.accessor("adminName", {
      header: "Admin Name",
      cell: (info) => info.getValue(),
    }),
    columnsHelper.accessor("adminId", {
      header: "Admin ID",
      cell: (info) => info.getValue(),
    }),
    columnsHelper.accessor("api", {
      header: "API",
      cell: (info) => info.getValue(),
    }),
    columnsHelper.accessor("request", {
      header: "Request",
      cell: (info) => JSON.stringify(info.getValue()),
    }),
    columnsHelper.accessor("response", {
      header: "Response",
      cell: (info) => JSON.stringify(info.getValue()),
    }),
  ];

  const fetchImpersonationLogs = async (page = 1, perPage = 10) => {
    try {
      const payload = {
        skip: (page - 1) * perPage,
        limit: perPage,
        pageNo: page,
      };
      const { data } = await POST(`${GET_IMPERSONATION_LOGS}?isTest=true`, payload);
      if (data?.success) {
        setLogData(data?.data[0]?.data);
        setTotalItemCount(data?.data?.[0]?.metadata?.[0]?.totalCount);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error("Error fetching impersonation logs:", error);
      toast.error("Failed to fetch impersonation logs");
    }
  };

  useEffect(() => {
    fetchImpersonationLogs(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const onPageChange = (pageIndex: any) => {
    setCurrentPage(pageIndex.currentPage);
  };

  const onItemsPerPageChange = (itemChange: any) => {
    setItemsPerPage(itemChange.itemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };
  console.log("tatal page count", totalItemCount)

  return (
    <div>
      <Breadcrum label="Impersonation Log" />
      <div className="mx-4">
        <CustomTable data={logData} columns={columns} />
      </div>
      {totalItemCount > 0 && (
        <PaginationComponent
          totalItems={totalItemCount}
          itemsPerPageOptions={[10, 20, 30, 50]}
          onPageChange={onPageChange}
          onItemsPerPageChange={onItemsPerPageChange}
        />
      )}
    </div>
  );
};

export default ImpersonationLog;