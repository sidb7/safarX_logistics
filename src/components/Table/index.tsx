import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import "../../styles/tableStyle.css";
import React, { useEffect, useState, useRef, useMemo } from "react";

interface ITablePropTypes {
  rowData: any;
  columnsData: any;
  entityId?: any;
  setRowSelectedData?: any;
  currentPage: number;
  pageSize: number;
  minHeight?: string;
}

const CustomTable = (props: any) => {
  const {
    rowData,
    columnsData,
    entityId,
    setRowSelectedData,
    setIsMenuOpen,
    minHeight,
    rowHeight,
  } = props;
  const columns = React.useMemo<Array<ColumnDef<any>>>(
    () => columnsData,
    [columnsData, rowData]
  );
  const [rowSelection, setRowSelection]: any = useState([]);
  const [data, setData] = React.useState(rowData);
  // console.log(rowData.length, "DATA");

  useEffect(() => {
    setData(rowData);
  }, [rowData]);
  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });
  // console.log(data.length, ";");
  const { rows } = table?.getRowModel();

  const parentRef = React.useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: rows?.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5,
  });

  useEffect(() => {
    if (setRowSelectedData) {
      setRowSelectedData(table?.getSelectedRowModel()?.flatRows);
    }
  }, [table?.getSelectedRowModel()?.flatRows]);

  return (
    <div
      ref={parentRef}
      style={{
        maxHeight: "calc(100vh - 300px)",
        minHeight: minHeight ? minHeight : "50vh",
        overflow: "auto",
        scrollbarWidth: "thin",
      }}
      className="w-full "
    >
      <div
        className="fixed inset-0 bg-[#333333b5] flex justify-center items-center z-50"
        id="placeOrder"
        style={{
          pointerEvents: "none",
          overflow: "hidden",
          display: "none",
        }} // Prevent interaction with the table
      >
        <span className="text-white text-2xl">
          <div className="w-2/6 -ml-[15%] bg-gray-300 rounded-full absolute z-[111] h-6">
            <div
              id="progress"
              className="bg-blue-500 h-6 rounded-full"
              style={{ width: "0%" }}
            ></div>
          </div>
        </span>
      </div>
      <div
        style={{
          height: rowHeight
            ? `${rowHeight}px`
            : `${virtualizer.getTotalSize() + 40}px`, // Add padding (e.g., 20px each for top and bottom)
          paddingTop: "20px", // Top padding
          paddingBottom: "20px", // Bottom padding
        }}
        className="w-full"
      >
        <table className="w-full bg-white tableContainerStyle ">
          <thead className="border-b border-[#E8E8E8]">
            {table.getHeaderGroups()?.map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers?.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{ width: header.getSize() }}
                      className=" px-3 font-semibold text-[14px] text-[#1C1C1C] border-b-[1px] border-b-[#E8E8E8]  "
                    >
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="section">
            {virtualizer.getVirtualItems()?.map((virtualRow, index) => {
              const row = rows[virtualRow.index];
              return (
                <tr
                  className="group shadow-md rounded-lg	hover:bg-slate-200"
                  key={row.id}
                  id={
                    entityId === undefined ? "" : `${entityId[index]}-${index}`
                  }
                  data-index={virtualRow.index}
                  style={{
                    height: rowHeight
                      ? `${rowHeight}px`
                      : `${virtualRow.size}px`,
                    transform: `translateY(${
                      virtualRow.start - index * virtualRow.size
                    }px)`,
                  }}
                >
                  {row.getVisibleCells()?.map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        className="px-3 text-left font-normal text-[#1C1C1C] border-none "
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          {table.getRowModel().rows?.length === 0 && (
            <div className="w-full h-52 bg-[#f7f7f7] hover:bg-[#e9e9e9] flex rounded-lg justify-center items-center">
              No Data Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { CustomTable };
