import React, { useState, useEffect } from "react";
import { Breadcrum } from "../../../../components/Layout/breadcrum";
import { CustomTable } from "../../../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import PaginationComponent from "../../../../components/Pagination";
import { GET_IMPERSONATION_LOGS } from "../../../../utils/ApiUrls";
import { POST } from "../../../../utils/webService";
import { toast } from "react-hot-toast";
import { convertEpochToDateTime } from "../../../../utils/utility";
import { Spinner } from "../../../../components/Spinner";
import JsonViewer from "./JsonViewer";

const ImpersonationLog = () => {
  const columnsHelper = createColumnHelper<any>();
  const [logData, setLogData] = useState<any>([]);
  const [totalItemCount, setTotalItemCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const columns = [
    columnsHelper.accessor("createdAt", {
      header: "Date",
      cell: (info) => (
        <div className="flex justify-center">
          {convertEpochToDateTime(info?.getValue())}
        </div>
      ),
    }),
    //commented as raised a ticket in clickup
    // columnsHelper.accessor("adminName", {
    //   header: "Admin Name",
    //   cell: (info) => info?.getValue(),
    // }),
    columnsHelper.accessor("adminId", {
      header: "Admin ID",
      cell: (info) => (
        <div className="flex justify-center">{info?.getValue()}</div>
      ),
    }),
    columnsHelper.accessor("api", {
      header: "API",
      cell: (info) => (
        <div className="flex justify-center">{info?.getValue()}</div>
      ),
    }),
    //commented as raised a ticket in clickup
    // columnsHelper.accessor("request", {
    //   header: "Request",
    //   cell: (info) => <JsonViewer jsonData={info?.getValue()} />,
    // }),
    // columnsHelper.accessor("response", {
    //   header: "Response",
    //   cell: (info) => <JsonViewer jsonData={info?.getValue()} />,
    // }),
  ];

  const fetchImpersonationLogs = async (page = 1, perPage = 10) => {
    setIsLoading(true);
    try {
      const payload = {
        skip: (page - 1) * perPage,
        limit: perPage,
        pageNo: page,
      };
      const { data } = await POST(`${GET_IMPERSONATION_LOGS}`, payload);
      if (data?.success) {
        setLogData(data?.data[0]?.data);
        setTotalItemCount(data?.data?.[0]?.metadata?.[0]?.totalCount);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error("Error fetching impersonation logs:", error);
      toast.error("Failed to fetch impersonation logs");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImpersonationLogs(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const onPageChange = (pageIndex: any) => {
    setCurrentPage(pageIndex?.currentPage);
  };

  const onItemsPerPageChange = (itemChange: any) => {
    setItemsPerPage(itemChange?.itemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };
  // console.log("tatal page count", totalItemCount)

  return (
    <div>
      <Breadcrum label="Impersonation Log" />
      <div className="mx-4">
        <div className="mx-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner />
            </div>
          ) : (
            <CustomTable data={logData} columns={columns} />
          )}
        </div>
      </div>
      {totalItemCount > 0 && !isLoading && (
        <PaginationComponent
          totalItems={totalItemCount}
          itemsPerPageOptions={[10, 20, 30, 50]}
          onPageChange={onPageChange}
          onItemsPerPageChange={onItemsPerPageChange}
          pageNo={currentPage}
          initialItemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
};

export default ImpersonationLog;
