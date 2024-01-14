import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import "../../styles/customTableScroll.css";
interface ITablePropTypes {
  data: any;
  columns: any;
  fixedData?: any;
  entityIds?: any | "";
}
// const stringArr = ["roleId", "roleName", "actions"]
const CustomTableWithScroll = (props: ITablePropTypes) => {
  const { data, columns, fixedData, entityIds } = props;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="customContainer">
      <div className="table-content">
        <table className=" bg-white tableContainerStyle">
          <thead className="border-b border-[#E8E8E8]">
            {table.getHeaderGroups()?.map((headerGroup: any) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers?.map((header: any) => {
                  return (
                    <th
                      key={header.id}
                      className={` ${
                        fixedData?.includes(header?.id) ? "fixedCol" : "scroll"
                      } px-3 font-semibold text-[14px] text-[#1C1C1C] border-b-[1px] border-b-[#E8E8E8]`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="section ">
            {table.getRowModel().rows?.map((row: any, index: any) => {
              return (
                <tr
                  id={
                    entityIds === undefined
                      ? ""
                      : `${entityIds[index]}-${index}`
                  }
                  key={row.id}
                  className="group shadow-md rounded-lg hover:bg-slate-100  "
                >
                  {row.getVisibleCells()?.map((cell: any) => {
                    return (
                      <td
                        key={cell.id}
                        className={` ${
                          fixedData?.includes(cell?.column?.id)
                            ? "fixedCol"
                            : "scroll"
                        } x-3 text-left font-normal text-sm text-[#1C1C1C] border-none`}
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
      </div>
    </div>
  );
};
export default CustomTableWithScroll;
