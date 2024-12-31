import { useEffect, useRef, useState, useCallback } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import "../../styles/tableStyle.css";

interface ITablePropTypes {
  data: any[];
  columns: any;
  tdclassName?: string;
  thclassName?: string;
  trclassName?: string;
  setRowSelectedData?: any;
  sticky?: boolean;
}

const debounce = (func: Function, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

export const CustomTable = ({
  data = [],
  columns,
  tdclassName = "",
  thclassName = "",
  trclassName = "",
  setRowSelectedData,
}: ITablePropTypes) => {
  const [rowSelection, setRowSelection] = useState({});
  const [visibleData, setVisibleData] = useState<any[]>([]);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  // const [isLoading, setIsLoading] = useState(false);
  const prevScrollTop = useRef(0);
  const chunkSize = 3;
  const initialSize = 8;

  useEffect(() => {
    if (data.length > 0) {
      setVisibleData(data.slice(0, initialSize));
    }
  }, [data]);

  const table = useReactTable({
    data: visibleData,
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    setRowSelectedData &&
      setRowSelectedData(table?.getSelectedRowModel()?.flatRows);
  }, [table?.getSelectedRowModel()?.flatRows]);

  const handleScroll = useCallback(
    debounce(() => {
      const scrollElement = tableContainerRef.current;
      if (!scrollElement) return;

      const currentScrollTop = scrollElement.scrollTop;
      const totalRows = data.length;

      if (currentScrollTop > prevScrollTop.current) {
        // Scrolling Down
        const isNearBottom =
          scrollElement.scrollHeight - scrollElement.scrollTop <=
          scrollElement.clientHeight + 50;

        if (isNearBottom && visibleData.length < totalRows) {
          // setIsLoading(true);

          setTimeout(() => {
            setVisibleData((prev) => {
              const start = prev.length;
              const end = Math.min(start + chunkSize, totalRows);
              return [...prev, ...data.slice(start, end)];
            });
            // setIsLoading(false);
          }, 800); // Simulated delay
        }
      } else {
        // Scrolling Up
        const isNearTop = scrollElement.scrollTop <= 50;

        if (isNearTop && visibleData[0]?.id > 0) {
          // setIsLoading(true);

          setTimeout(() => {
            setVisibleData((prev) => {
              const start = Math.max(0, visibleData[0]?.id - chunkSize);
              const end = visibleData[0]?.id;
              return [...data.slice(start, end), ...prev];
            });
            scrollElement.scrollTop = 100;
            // setIsLoading(false);
          }, 800);
        }
      }

      prevScrollTop.current = currentScrollTop;
    }, 200),
    [data, visibleData]
  );

  useEffect(() => {
    const container = tableContainerRef.current;
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <div
        ref={tableContainerRef}
        style={{
          overflow: "auto",
          maxHeight: "700px",
          position: "relative",
        }}
      >
        {/* Loading Overlay */}

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

        {/* Table Content */}
        <table className="w-full bg-white tableContainerStyle relative">
          <thead className={`border-b border-[#E8E8E8]`}>
            {table.getHeaderGroups()?.map((headerGroup: any) => (
              <tr key={headerGroup.id}>
                {headerGroup?.headers?.map((header: any) => (
                  <th
                    key={header?.id}
                    className={`px-4 sticky top-0 bg-white z-10 font-semibold text-[14px] text-[#1C1C1C] border-b-[1px] border-b-[#E8E8E8] ${thclassName}`}
                  >
                    {header?.isPlaceholder
                      ? null
                      : flexRender(
                          header?.column?.columnDef?.header,
                          header?.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {visibleData.map((rowData: any, index) => {
              const row = table.getRowModel().rows[index];
              return (
                <tr
                  key={row?.id}
                  className={`hover:bg-[#f8f8f8] shadow-md rounded-lg ${trclassName}`}
                >
                  {row?.getVisibleCells()?.map((cell: any) => (
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

        {/* No Data Found */}
        {table?.getRowModel().rows?.length === 0 && (
          <div className="w-full h-52 bg-[#f7f7f7] hover:bg-[#e9e9e9] flex rounded-lg justify-center items-center">
            No Data Found
          </div>
        )}
      </div>
    </>
  );
};
