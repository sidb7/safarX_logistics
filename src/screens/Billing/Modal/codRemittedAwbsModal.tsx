import React, { useEffect, useState } from "react";
import crossIcon from "../../../assets/cross.svg";
import { createColumnHelper } from "@tanstack/react-table";
import { CustomTable } from "../../../components/Table";
import { SearchBox } from "../../../components/SearchBox";
import CopyTooltip from "../../../components/CopyToClipboard";

function CodRemittedAwbModal({ onClick, awbs, isRecovery ,isAWB,isOrderId,isOrderNum}: any) {
  const columnsHelper = createColumnHelper();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setData(awbs?.map((trackingId: any) => ({ trackingId })) || []);
  }, [awbs]);

  const filteredData = data.filter((item: any) => {
    if (searchTerm != "") {
      const searchTerms = searchTerm.split(/[ ,]+/).filter(Boolean);
      return searchTerms.some((term) =>
        item.trackingId.toLowerCase().includes(term.toLowerCase())
      );
    } else {
      return data;
    }
  });

  const billingOrdersHeading = [
    columnsHelper.accessor("trackingId", {
      header: () => null,
      cell: (info: any) => (
        <div className="flex justify-between px-4">
          <div className="font-Open text-sm font-normal flex items-center !p-0 !m-0">
            {info.row.original?.trackingId || "No Tracking ID"}
          </div>
          <p>
            {" "}
            <CopyTooltip
              stringToBeCopied={info.row.original?.trackingId ?? ""}
            />
          </p>
        </div>
      ),
    }),
  ];

  return (
    <div>
      <div className="flex items-center justify-between p-5">
        <p className="font-semibold text-2xl">
          {isRecovery
            ? "Cod Recovery"
            : isAWB
            ? "Cod Remitted AWBS"
            : isOrderId
            ? "Order IDs"
            : isOrderNum
            ? "Order Numbers"
            : ""}
        </p>
        <img
          src={crossIcon}
          alt="Close"
          onClick={onClick}
          className="cursor-pointer w-[24px]"
        />
      </div>
      <div className="px-6 flex justify-between">
        <div className="font-semibold text-lg">
          {isOrderId
            ? "Order IDs"
            : isOrderNum
            ? "Order Numbers"
            : "Tracking IDs"}
        </div>
        <SearchBox
          customPlaceholder={
            isOrderId
            ? "Search Order ID"
            : isOrderNum
            ? "Search Order Number"
            : "Search Tracking ID"
          }
          label="Search"
          value={searchTerm}
          onChange={(e: any) => setSearchTerm(e.target.value)}
          getFullContent={() => setSearchTerm("")}
        />
      </div>
      <div className="overflow-x-auto mt-2 mx-6">
        <CustomTable
          rowData={filteredData}
          columnsData={billingOrdersHeading}
          minHeight="80vh"
          rowHeight={50}
        />
      </div>
    </div>
  );
}

export default CodRemittedAwbModal;
