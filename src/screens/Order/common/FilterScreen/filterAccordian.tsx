import React, { useState, useEffect } from "react";
import downArrowIcon from "../../../../assets/Filter/downArrow.svg";
import upArrowIcon from "../../../../assets/Filter/upArrow.svg";
import crossIcon from "../../../../assets/cross.svg";
import searchIcon from "../../../../assets/Search.svg";
import "./OrderInput.css";

import Checkbox from "../../../../components/CheckBox/index";
import { keyNameMapping } from "../../../../utils/dummyData";

interface IPropTypes {
  cardClassName?: string;
}

const Index = (props: any) => {
  const { filterListDatas, cardClassName, setFilterState, filterState } = props;

  const [filterData, setFilterData] = useState(filterListDatas);
  const [test, setTest] = useState(filterState);
  const [dummyDataForfilterSearch, setDummyDataForFilterSearch] = useState([
    ...filterListDatas?.menu,
  ]);
  const [searchInput, setSearchInput] = useState<any>("");
  // const [isShow, setIsShow] = useState<any>(false);

  useEffect(() => {
    setFilterState(filterData);
  }, [filterData]);

  useEffect(() => {
    let selectedFilterDataMenu: any = [];
    if (
      ["Delivery Pincode", "Pickup Pincode", "Seller Id"].includes(
        filterData?.name
      )
    ) {
      selectedFilterDataMenu = filterData?.menu
        ?.filter((data: any) => data?.isActive)
        .map((data: any) => +data?.value);
    } else if (["PaymentType"].includes(filterData?.name)) {
      selectedFilterDataMenu = filterData?.menu
        ?.filter((data: any) => data?.isActive)
        .map((data: any) => (data?.value === "Cod" ? true : false));
    } else {
      selectedFilterDataMenu = filterData?.menu
        ?.filter((data: any) => data?.isActive)
        .map((data: any) => data?.value);
    }

    setFilterState({
      name: filterData?.name,
      label: filterData?.label,
      isCollapse: filterData?.isCollapse,
      menu: selectedFilterDataMenu,
    });
  }, [filterData]);

  const onSearchHandler = (e: any) => {
    setSearchInput(e);
    const filtered = filterListDatas?.menu?.filter((service: any) => {
      return service.value.toLowerCase().includes(e.toLowerCase());
    });
    setFilterData({
      name: filterData?.name,
      label: filterData?.label,
      isCollapse: filterData?.isCollapse,
      menu: filtered,
    });
  };

  return (
    <>
      <div
        className={`flex flex-col px-5  mb-3 shadow-md rounded-lg   cursor-pointer ${cardClassName}`}
      >
        <div
          className={`flex  items-center justify-between px-3 py-6 h-[38px]  border-[1px]  ${
            filterData?.isCollapse
              ? "bg-[#f6f6f6] rounded-tr-lg rounded-tl-lg rounded-b-none "
              : "bg-[#FFFFFF] rounded-lg"
          }`}
        >
          <p
            className="font-semibold flex-1 py-1 text-[16px] text-[#1C1C1C]"
            onClick={() => {
              let temp: any = { ...filterData };

              if (filterData?.isCollapse === true) {
                temp.isCollapse = false;

                setFilterData(temp);
              } else {
                temp.isCollapse = true;
                setFilterData(temp);
              }
            }}
          >
            {filterListDatas?.name}
          </p>

          <div
            className={`flex ${
              filterData.isCollapse && "border shadow-md"
            }  rounded-lg  `}
          >
            <div
              className={`flex  items-center justify-center rounded-l-lg ${
                filterData.isCollapse ? "bg-[#F6F6F6]" : "bg-white"
              }  rounded-r `}
            >
              {filterData.isCollapse && (
                <>
                  <div className="flex w-[100%] border-r rounded-l-md bg-[#ffffff] h-full text-left">
                    <input
                      placeholder="Search..."
                      value={searchInput}
                      onChange={(e: any) => onSearchHandler(e.target.value)}
                      className="w-[100px] search-input-cl border-none rounded-md  h-[100%] text-[14px] py-2 "
                    />
                  </div>
                  <div className={`flex items-center justify-center`}>
                    <img
                      src={crossIcon}
                      alt="downArrowIcon"
                      onClick={() => {
                        onSearchHandler("");
                      }}
                      className="w-[24px] mx-2"
                    />
                  </div>
                </>
              )}
            </div>
            <div
              className="flex py-2 px-4  border-l rounded-r  hover:bg-[#F6F6F6]"
              onClick={() => {
                let temp: any = { ...filterData };

                if (filterData?.isCollapse === true) {
                  temp.isCollapse = false;
                  setFilterData(temp);
                } else {
                  temp.isCollapse = true;
                  setFilterData(temp);
                }
              }}
            >
              <img
                // src={filterData?.isCollapse ? upArrowIcon : downArrowIcon}
                src={downArrowIcon}
                alt="downArrowIcon"
                className={`transform w-[18px] transition-transform duration-400 ${
                  filterData?.isCollapse ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>

          {/* ------------------------------------------------------------------search filter--------------------------------------------------------------------------------------------- */}

          {/* <img
            src={filterData?.isCollapse ? upArrowIcon : downArrowIcon}
            alt="downArrowIcon"
            className={`transform transition-transform duration-400 ${
              filterData?.isCollapse ? "rotate-180" : ""
            }`}
          /> */}
        </div>
        {/* //flex flex-col */}
        {filterData?.isCollapse && (
          <div
            className={`border-b  py-0 border-r border-l grid ${
              filterData?.menu?.length > 0 && " grid-cols-2 "
            } max-h-[300px] overflow-auto rounded-bl-md rounded-br-md  transition-all duration-400 ease-in-out `}
          >
            {filterData?.menu?.length > 0 ? (
              filterData?.menu?.map((subMenu: any, index1: number) => {
                return (
                  <div className="px-2" key={index1}>
                    <button
                      className={`flex items-center  w-full border  py-5  gap-3 h-[28px]  ${
                        index1 !== filterData?.menu?.length - 1
                          ? "border-b-[#E8E8E8]"
                          : "border-b-0"
                      }  border-t-0 border-r-0 border-l-0`}
                    >
                      {/* <Checkbox
                          checked={menuData?.isActive}
                          onChange={() =>
                            handle_Level_2_Pages(
                              roleData?.id,
                              menuData?.id,
                              !menuData?.isActive
                            )
                          }
                          checkboxClassName="gap-2"
                        /> */}
                      <Checkbox
                        onChange={(e) => {
                          let temp = { ...filterData };
                          temp.menu[index1].isActive =
                            !temp.menu[index1].isActive;
                          setFilterData(temp);
                        }}
                        className="px-4"
                        label={subMenu.name}
                        checkboxClassName="gap-1"
                        name={filterData.name}
                        labelClassName="px-4 text-[black]"
                        checked={subMenu.isActive}
                        value={filterData.name}
                      />
                      {/* <p className="font-bold text-[14px] text-[#323232]">
                        {subMenu?.name}
                      </p> */}
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="py-4 text-center font-Open w-[100%] font-semibold">
                No Data Found
              </div>
            )}
          </div>
        )}
      </div>
      {/* );
      })} */}
    </>
  );
};

export default Index;
