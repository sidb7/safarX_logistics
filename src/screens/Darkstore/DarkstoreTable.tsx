import { useEffect, useRef, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { CustomTable } from "../../components/Table";
import tableCheckboxFilter from "../../assets/Darkstore/tableCheckboxFilter.png";
import { GET, POST } from "../../utils/webService";
import OnePagination from "../../components/OnePagination/OnePagination";
import {
  GET_DARKSTORE_DETAILS,
  GET_DARKSTORE_FILTER_DETAILS,
} from "../../utils/ApiUrls";

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
  updateFilterQuery,
  selectedColumn,
  filterQuery,
}: {
  open: TableColumnType | false;
  setOpen: (value: TableColumnType | false) => void;
  columnType: TableColumnType;
  filterList: any;
  setFilterList: any;
  resetFilter: (item: TableColumnType) => void;
  updateFilterQuery: (data: {
    type: TableColumnType;
    item: string;
    newFilterItem: boolean;
  }) => void;
  selectedColumn: string | null;
  filterQuery: any;
}) {
  const dropdownRef: any = useRef(null);
  const [checkedFilterItems, setCheckedFilterITems] = useState<any>([]);
  useEffect(() => {
    if (open) {
      filterQuery.map((item: any) => {
        if (Object.keys(item)[0] === columnType) {
          setCheckedFilterITems(item[columnType]["$in"]);
        }
      });
    }
  }, [open, filterQuery]);

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

  const handleCheck = (item: any) => {
    updateFilterQuery({
      type: columnType,
      item,
      newFilterItem: !checkedFilterItems.includes(item),
    });
  };

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
              onClick={() => {
                handleCheck(item);
              }}
              className="h-[30px] flex items-center gap-2 text-sm border-b py-[20px] p-3 hover:bg-[#F0F0F0] cursor-pointer"
            >
              <input
                type="checkbox"
                className="form-checkbox accent-[#0A65FF] h-[16px] w-[16px]"
                checked={
                  checkedFilterItems.length != 0 &&
                  checkedFilterItems.includes(item)
                }
                // onChange={() => {
                //   handleCheck(item);
                // }}
              />
              {item}
            </div>
          ))}
        {filterList.length === 0 && (
          <div className="animate-pulse bg-gray-200 rounded-md h-24 w-full mb-4" />
        )}
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
  const [limit, setLimit] = useState<number>(50);
  const [darkStoreData, setDarkStoreData] = useState<any>([]);
  const [filterList, setFilterList] = useState<any>([]);
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
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

  const getLengthFilterQuery = (tableType: any) => {
    const match = filterQuery.find((item: any) => tableType in item);
    const length = match?.[tableType]?.["$in"]?.length || 0;
    return length;
  };
  const [totalPages, setTotalPages] = useState<any>({
    currentPage: 1,
    totalPages: 1,
    totalInventory: 1,
  });
  const ColumnsHelper = createColumnHelper<any>();

  const fetchDarkstoreInventory = async ({
    updatedQuery,
    newLimit,
    newPageNo = 0,
  }: {
    updatedQuery?: any;
    newLimit?: number;
    newPageNo?: number;
  }) => {
    try {
      let filterArr = updatedQuery;
      if (!updatedQuery) {
        filterArr = filterQuery.filter((item: any) => {
          return item[Object.keys(item)[0]]["$in"].length > 0;
        });
      }

      const { data: response } = await POST(GET_DARKSTORE_DETAILS, {
        pageNo: newPageNo === 0 ? pageNo : newPageNo,
        limit: !newLimit ? limit : newLimit,
        filterArr,
      });
      setTotalPages({
        currentPage: response.pageNo,
        totalPages: response.totalPage,
        totalInventory: response.totalInventory,
      });
      setDarkStoreData(response.data || []);
    } catch (err) {
      console.log("Error: ", err);
    }
  };
  useEffect(() => {
    fetchDarkstoreInventory({});
  }, [filterQuery]);

  useEffect(() => {
    fetchDarkstoreInventory({});
  }, []);

  const onPageIndexChange = async (data: any) => {
    fetchDarkstoreInventory({ newPageNo: data?.currentPage });
    // setSkip((data?.currentPage - 1) * data?.itemsPerPage);
  };

  const onPerPageItemChange = async (data: any) => {
    fetchDarkstoreInventory({ newLimit: data?.itemsPerPage });
    setLimit(data?.itemsPerPage);
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

    fetchDarkstoreInventory({ updatedQuery });
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
      const filterArr = filterQuery.filter((item: any) => {
        return (
          item[Object.keys(item)[0]]["$in"].length > 0 &&
          Object.keys(item)[0] !== type
        );
      });

      const { data: response } = await POST(GET_DARKSTORE_FILTER_DETAILS, {
        filterType: type,
        filterArr,
      });

      setFilterList(response.data);
      setSelectedColumn(type);
    } catch (err) {
      console.log(err);
    }
  };

  const DarkStoreColumns = [
    ColumnsHelper.accessor("darkstore", {
      header: () => {
        return (
          <div className="relative ">
            <div className="flex justify-between items-center">
              <p
                className="font-Open text-sm font-semibold text-[#1C1C1C]"
                style={{ display: "flex" }}
              >
                Darkstore
              </p>
              <button
                onClick={() => {
                  if (darkStoreData.length == 0) {
                    return;
                  }
                  fetchFilterList(TableColumnType.Darkstore);
                  setOpen(
                    open === TableColumnType.Darkstore
                      ? false
                      : TableColumnType.Darkstore
                  );
                }}
                className={`p-[10px] rounded bg-[#EEEEEE] rounded-full ${
                  darkStoreData.length != 0
                    ? "hover:bg-[#E6E6E6]"
                    : "cursor-default"
                }`}
              >
                <img
                  src={tableCheckboxFilter}
                  alt="filter"
                  className="h-[12px] w-[12px]"
                />
                {getLengthFilterQuery(TableColumnType.Darkstore) ? (
                  <span className="text-[8px] absolute top-[-1px] right-[-4px] bg-[#3B81F6] rounded-full h-[14px] w-[14px] text-white  z-0">
                    {getLengthFilterQuery(TableColumnType.Darkstore)}
                  </span>
                ) : null}
              </button>
            </div>
            <Dropdown
              open={open}
              setOpen={setOpen}
              columnType={TableColumnType.Darkstore}
              filterList={filterList}
              setFilterList={setFilterList}
              resetFilter={resetFilter}
              updateFilterQuery={updateFilterQuery}
              selectedColumn={selectedColumn}
              filterQuery={filterQuery}
            />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="flex gap-x-2">
            {info?.row?.original?.dark_store || ""}
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
                  if (darkStoreData.length == 0) {
                    return;
                  }
                  fetchFilterList(TableColumnType.Product);
                  setOpen(
                    open === TableColumnType.Product
                      ? false
                      : TableColumnType.Product
                  );
                }}
                className={`p-[10px] bg-[#EEEEEE] rounded-full ${
                  darkStoreData.length != 0
                    ? "hover:bg-[#E6E6E6]"
                    : "cursor-default"
                }`}
              >
                <img
                  src={tableCheckboxFilter}
                  alt="filter"
                  className="h-[12px] w-[12px]"
                />
                {getLengthFilterQuery(TableColumnType.Product) ? (
                  <span className="text-[8px] absolute top-[-1px] right-[-4px] bg-[#3B81F6] rounded-full h-[14px] w-[14px] text-white  z-0">
                    {getLengthFilterQuery(TableColumnType.Product)}
                  </span>
                ) : null}
              </button>
            </div>
            <Dropdown
              open={open}
              setOpen={setOpen}
              columnType={TableColumnType.Product}
              filterList={filterList}
              setFilterList={setFilterList}
              resetFilter={resetFilter}
              updateFilterQuery={updateFilterQuery}
              selectedColumn={selectedColumn}
              filterQuery={filterQuery}
            />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="flex gap-x-2">
            {info?.row?.original?.product_name || ""}
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
                  if (darkStoreData.length == 0) {
                    return;
                  }
                  fetchFilterList(TableColumnType.SKU);
                  setOpen(
                    open === TableColumnType.SKU ? false : TableColumnType.SKU
                  );
                }}
                className={`p-[10px] rounded bg-[#EEEEEE] rounded-full ${
                  darkStoreData.length != 0
                    ? "hover:bg-[#E6E6E6]"
                    : "cursor-default"
                }`}
              >
                <img
                  src={tableCheckboxFilter}
                  alt="filter"
                  className="h-[12px] w-[12px]"
                />
                {getLengthFilterQuery(TableColumnType.SKU) ? (
                  <span className="text-[8px] absolute top-[-1px] right-[-4px] bg-[#3B81F6] rounded-full h-[14px] w-[14px] text-white  z-0">
                    {getLengthFilterQuery(TableColumnType.SKU)}
                  </span>
                ) : null}
              </button>
            </div>
            <Dropdown
              open={open}
              setOpen={setOpen}
              columnType={TableColumnType.SKU}
              filterList={filterList}
              setFilterList={setFilterList}
              resetFilter={resetFilter}
              updateFilterQuery={updateFilterQuery}
              selectedColumn={selectedColumn}
              filterQuery={filterQuery}
            />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="flex gap-x-2">{info?.row?.original?.sku || ""}</div>
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
          <div className="flex gap-x-2">{info?.row?.original?.qty || "-"}</div>
        );
      },
    }),
  ];

  return (
    <div className="">
      <CustomTable
        columnsData={DarkStoreColumns}
        rowData={darkStoreData}
        currentPage={totalPages.currentPage}
        pageSize={limit}
        parentClassName={"h-[calc(100vh-350px)] pb-[200px]"}
        rowClassName={"shadow-none"}
        rowCellClassName={
          "!border-b !border-b-lightgrey !border-solid pb-[10px] border-r-0"
        }
        theadClassName="bg-[rgba(0,0,0,0.02)] h-[50px]"
      />
      {darkStoreData.length > 0 && (
        <OnePagination
          totalItems={totalPages.totalInventory}
          itemsPerPageOptions={[50, 100, 250, 500, 1000, 5000, 10000]}
          onPageChange={onPageIndexChange}
          onItemsPerPageChange={onPerPageItemChange}
          initialItemsPerPage={limit}
          className="!pb-0 !mb-0 !mt-2 !mx-0"
          pageNo={totalPages.currentPage}
        />
      )}
    </div>
  );
}

export default DarkstoreTable;
