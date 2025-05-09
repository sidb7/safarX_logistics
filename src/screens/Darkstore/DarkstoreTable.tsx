import React, { useEffect, useRef, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { CustomTable } from "../../components/Table";
import tableCheckboxFilter from "../../assets/Darkstore/tableCheckboxFilter.png";
import { POST } from "../../utils/webService";
import { ca } from "date-fns/locale";
import OnePagination from "../../components/OnePagination/OnePagination";
import { set } from "lodash";

enum TableColumnType {
  Darkstore = "dark_store",
  Product = "product_name",
  SKU = "sku",
}

function Dropdown({
  open,
  setOpen,
  columnType,
  filterList,
  setFilterList,
  resetFilter,
}: {
  open: TableColumnType | false;
  setOpen: (value: TableColumnType | false) => void;
  columnType: TableColumnType;
  filterList: any;
  setFilterList: any;
  resetFilter: (item: TableColumnType) => void;
}) {
  const dropdownRef: any = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
        setFilterList([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpen]);

  if (open !== columnType) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-8 right-0 z-[1] w-48 bg-white border shadow-lg rounded flex flex-col max-h-[400px]"
    >
      <div className="overflow-y-auto max-h-[180px] scrollbar-hidden">
        {filterList &&
          filterList.map((item: any) => (
            <div
              key={item}
              className="h-[30px] flex items-center gap-2 text-sm border-b py-[20px] p-3 hover:bg-[#F0F0F0] cursor-pointer"
            >
              <input
                type="checkbox"
                className="form-checkbox accent-[#0A65FF] h-[16px] w-[16px]"
              />
              {item}
            </div>
          ))}
      </div>
      <div className="border-t py-2 mt-2 flex justify-between px-2">
        <button
          className="bg-[#0A65FF] text-white w-full text-sm rounded-sm py-[2px]"
          onClick={() => {
            resetFilter(open);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

function DarkstoreTable() {
  const [open, setOpen] = useState<TableColumnType | false>(false);
  const [pageNo, setPageNo] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);
  const [darkStoreData, setDarkStoreData] = useState<any>([]);
  const [filterList, setFilterList] = useState<any>([]);
  const [filterQuery, setFilterQuery] = useState<any>([
    {
      sku: {
        $in: [],
      },
    },
    {
      dark_store: {
        $in: [],
      },
    },
    {
      product_name: {
        $in: [],
      },
    },
  ]);

  const ColumnsHelper = createColumnHelper<any>();

  useEffect(() => {
    const fetchDarkstoreInventory = async () => {
      try {
        const GET_DARKSTORE_DETAILS =
          "http://localhost:8010/api/v1/darkStore/getInventory";
        const { data: response } = await POST(GET_DARKSTORE_DETAILS, {
          pageNo,
          limit,
        });
        setDarkStoreData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDarkstoreInventory();
  }, []);

  const onPageIndexChange = async (data: any) => {
    // setSkip((data?.currentPage - 1) * data?.itemsPerPage);
  };

  const onPerPageItemChange = async (data: any) => {
    // setItemsPerPage(data?.itemsPerPage);
    // setSkip(0);
  };

  const resetFilter = (type: TableColumnType) => {
    const updatedQuery = filterQuery.map((item: any) => {
      if (Object.keys(item)[0] === type) {
        return {
          [type]: {
            $in: [],
          },
        };
      }
      return item;
    });
    setFilterQuery(updatedQuery);
  };

  const updateFilterQuery = ({
    type,
    item,
    newFilterItem,
  }: {
    type: TableColumnType;
    item: string;
    newFilterItem: boolean;
  }) => {
    setFilterQuery((prev: any) => {
      const updated = prev.map((query: any) => {
        const key = Object.keys(query)[0];
        if (key === getKeyFromType(type)) {
          const existingItems = query[key]["$in"] || [];

          if (newFilterItem && !existingItems.includes(item)) {
            return {
              [key]: {
                $in: [...existingItems, item],
              },
            };
          } else if (!newFilterItem) {
            return {
              [key]: {
                $in: existingItems.filter((i: string) => i !== item),
              },
            };
          }
        }

        return query;
      });

      return updated;
    });
  };

  const getKeyFromType = (type: TableColumnType): string => {
    switch (type) {
      case TableColumnType.SKU:
        return "sku";
      case TableColumnType.Product:
        return "product_name";
      case TableColumnType.Darkstore:
        return "dark_store";
      default:
        return "";
    }
  };

  const fetchFilterList = async (type: TableColumnType) => {
    try {
      const GET_DARKSTORE_DETAILS =
        "http://localhost:8010/api/v1/darkStore/getFilterOptions";
      const { data: response } = await POST(GET_DARKSTORE_DETAILS, {
        filterType: type,
      });

      console.log(response.data, "response.data");
      setFilterList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const PricingColumns = [
    ColumnsHelper.accessor("darkstore", {
      header: () => {
        return (
          <div className="relative ">
            <div className="flex justify-between items-center">
              <p className="font-Open text-sm font-semibold text-[#1C1C1C]">
                Darkstore
              </p>
              <button
                onClick={() => {
                  fetchFilterList(TableColumnType.Darkstore);
                  setOpen(
                    open === TableColumnType.Darkstore
                      ? false
                      : TableColumnType.Darkstore
                  );
                }}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <img
                  src={tableCheckboxFilter}
                  alt="filter"
                  className="h-[12px] w-[12px]"
                />
              </button>
            </div>
            <Dropdown
              open={open}
              setOpen={setOpen}
              columnType={TableColumnType.Darkstore}
              filterList={filterList}
              setFilterList={setFilterList}
              resetFilter={resetFilter}
            />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="flex gap-x-2" style={{}}>
            {info.row.original.dark_store || ""}
          </div>
        );
      },
    }),
    ColumnsHelper.accessor("product", {
      header: () => {
        return (
          <div className="relative ">
            <div className="flex justify-between items-center">
              <p className="font-Open text-sm font-semibold text-[#1C1C1C]">
                Product
              </p>
              <button
                onClick={() => {
                  fetchFilterList(TableColumnType.Product);
                  setOpen(
                    open === TableColumnType.Product
                      ? false
                      : TableColumnType.Product
                  );
                }}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <img
                  src={tableCheckboxFilter}
                  alt="filter"
                  className="h-[12px] w-[12px]"
                />
              </button>
            </div>
            <Dropdown
              open={open}
              setOpen={setOpen}
              columnType={TableColumnType.Product}
              filterList={filterList}
              setFilterList={setFilterList}
              resetFilter={resetFilter}
            />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="flex gap-x-2" style={{}}>
            {info.row.original.product_name || ""}
          </div>
        );
      },
    }),
    ColumnsHelper.accessor("sku", {
      header: () => {
        return (
          <div className="relative ">
            <div className="flex justify-between items-center">
              <p className="font-Open text-sm font-semibold text-[#1C1C1C]">
                SKU
              </p>
              <button
                onClick={() => {
                  fetchFilterList(TableColumnType.SKU);
                  setOpen(
                    open === TableColumnType.SKU ? false : TableColumnType.SKU
                  );
                }}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <img
                  src={tableCheckboxFilter}
                  alt="filter"
                  className="h-[12px] w-[12px]"
                />
              </button>
            </div>
            <Dropdown
              open={open}
              setOpen={setOpen}
              columnType={TableColumnType.SKU}
              filterList={filterList}
              setFilterList={setFilterList}
              resetFilter={resetFilter}
            />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="flex gap-x-2" style={{}}>
            {info.row.original.sku || ""}
          </div>
        );
      },
    }),
    ColumnsHelper.accessor("quantity", {
      header: () => {
        return (
          <div className="flex justify-between items-center">
            <p className="font-weight[900]">Quantity</p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="flex gap-x-2" style={{}}>
            {info.row.original.qty || "-"}
          </div>
        );
      },
    }),
  ];

  return (
    <div className="mt-[15px]">
      <CustomTable
        columnsData={PricingColumns}
        rowData={darkStoreData}
        currentPage={1}
        pageSize={10}
        rowHeight={30}
        rowClassName={"shadow-none"}
        rowCellClassName={
          "!border-b !border-b-lightgrey !border-solid pb-[10px]"
        }
      />
      {darkStoreData.length > 0 && (
        <OnePagination
          totalItems={limit}
          itemsPerPageOptions={[10, 20, 50, 100, 250]}
          onPageChange={onPageIndexChange}
          onItemsPerPageChange={onPerPageItemChange}
          initialItemsPerPage={limit}
          className="pb-6 !mb-0 !mt-2 !mx-0"
        />
      )}
    </div>
  );
}

export default DarkstoreTable;
