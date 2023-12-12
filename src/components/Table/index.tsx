import { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import "../../styles/tableStyle.css";

interface ITablePropTypes {
  data: any;
  columns: any;
  tdclassName?: any;
  thclassName?: any;
  trclassName?: any;
  setRowSelectedData?: any;
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

  useEffect(() => {
    table?.getSelectedRowModel()?.flatRows.length > 0 &&
      setRowSelectedData &&
      setRowSelectedData(table?.getSelectedRowModel()?.flatRows);
  }, [table?.getSelectedRowModel()?.flatRows]);

  return (
    <div className="py-2">
      <table className="w-full  bg-white tableContainerStyle	">
        <thead className="border-b border-[#E8E8E8]">
          {table.getHeaderGroups()?.map((headerGroup: any) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers?.map((header: any) => (
                <th
                  key={header.id}
                  className={`px-4 font-semibold text-[14px] text-[#1C1C1C] border-b-[1px] border-b-[#E8E8E8] ${thclassName} `}
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
        <tbody className="section ">
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
  );
};
