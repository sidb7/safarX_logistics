import { useEffect, useRef, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import "../../styles/tableStyle.css";
import { useVirtualizer } from "@tanstack/react-virtual";

interface ITablePropTypes {
  data: any;
  columns: any;
  tdclassName?: any;
  thclassName?: any;
  trclassName?: any;
  setRowSelectedData?: any;
  sticky?: any;
}

export const CustomTable = (props: ITablePropTypes) => {
  const [rowSelection, setRowSelection]: any = useState([]);
  const {
    data,
    columns,
    tdclassName,
    thclassName,
    trclassName,
    setRowSelectedData,
    sticky,
  } = props;

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });

  const { rows } = table.getRowModel();

  //The virtualizer needs to know the scrollable container element
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 33, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    //measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== "undefined" &&
      navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 10,
  });

  useEffect(() => {
    // table?.getSelectedRowModel()?.flatRows.length > 0 &&
    setRowSelectedData &&
      setRowSelectedData(table?.getSelectedRowModel()?.flatRows);
  }, [table?.getSelectedRowModel()?.flatRows]);

  return (
    <div ref={tableContainerRef}>
      <div className="py-2">
        <table className="w-full  bg-white tableContainerStyle	">
          <thead className={`border-b border-[#E8E8E8] `}>
            {table.getHeaderGroups()?.map((headerGroup: any) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers?.map((header: any) => (
                  <th
                    key={header.id}
                    className={`px-4 sticky top-0 bg-white z-10 font-semibold text-[14px] text-[#1C1C1C] border-b-[1px] border-b-[#E8E8E8] ${thclassName}`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {/* <tbody className="section overflow-auto">
          {table.getRowModel().rows?.length > 0
            ? table.getRowModel().rows?.map((row: any) => (
                <tr
                  key={row.id}
                  className={`shadow-md rounded-lg	hover:bg-slate-100 ${trclassName}`}
                >
                  {row.getVisibleCells()?.map((cell: any) => (
                    <td
                      key={cell.id}
                      className={`px-4 text-left ${tdclassName}`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            : ""}
        </tbody> */}

          {/* new virtualized table  */}

          <tbody className="section overflow-auto">
            {rowVirtualizer.getVirtualItems().map((virtualRow, index) => {
              const row = rows[virtualRow.index];
              return (
                <tr
                  ref={(node) => rowVirtualizer.measureElement(node)} //measure dynamic row height
                  data-index={virtualRow.index} //
                  key={row.id}
                  className={`shadow-md rounded-lg	hover:bg-slate-100 ${trclassName}`}
                >
                  {row.getVisibleCells()?.map((cell: any) => (
                    <td
                      key={cell.id}
                      className={`px-4 text-left ${tdclassName}`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
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
