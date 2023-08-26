import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import "../../styles/tableStyle.css";

interface ITablePropTypes {
  data: any;
  columns: any;
}

export const CustomTable = (props: ITablePropTypes) => {
  const { data, columns } = props;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="py-2">
      <table className="w-full  bg-white tableContainerStyle	">
        <thead className="border-b border-[#E8E8E8]">
          {table.getHeaderGroups().map((headerGroup: any) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header: any) => (
                <th
                  key={header.id}
                  className=" px-4 font-semibold text-[14px] text-[#1C1C1C] border-b-[1px] border-b-[#E8E8E8]  "
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
          {table.getRowModel().rows.map((row: any) => (
            <tr
              key={row.id}
              className=" shadow-md rounded-lg	hover:bg-slate-100	"
            >
              {row.getVisibleCells().map((cell: any) => (
                <td key={cell.id} className="px-4 text-left">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {/* <tfoot>
          {table.getFooterGroups().map((footerGroup: any) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header: any) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot> */}
      </table>
    </div>
  );
};
