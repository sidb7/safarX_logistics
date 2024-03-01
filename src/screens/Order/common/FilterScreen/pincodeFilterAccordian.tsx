import React, { useEffect, useState } from "react";
import downArrowIcon from "../../../../assets/Filter/downArrow.svg";
import upArrowIcon from "../../../../assets/Filter/upArrow.svg";
import crossIcon from "../../../../assets/cross.svg";
import searchIcon from "../../../../assets/Search.svg";
import Checkbox from "../../../../components/CheckBox/index2";
import { SEARCH_PINCODE } from "../../../../utils/ApiUrls";
import { GET } from "../../../../utils/webService";
import { capitalizeFirstLetter } from "../../../../utils/utility";
import { Spinner } from "../../../../components/Spinner";
import { log } from "console";

function PincodeFilterAccordian({
  data,
  persistFilterData,
  setFilterState,
}: any) {
  const [searchPincodedata, setSearchPincodeData] = useState(data || {});

  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  let debounceTimer: any;

  const searchPincodeListHandler = async (
    inputData: any,
    persistFilterDataArg?: any
  ) => {
    try {
      setSearchInput(inputData);
      const url = `${SEARCH_PINCODE}?pincode=${inputData}`;

      if (inputData.length >= 3) {
        setIsLoading(true);
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(async () => {
          const { data } = await GET(url);

          if (data?.success) {
            const result = data?.data?.map((value: any, i: any) => ({
              name: value?.pincode,
              value: value?.pincode,
              isActive:
                Object.keys(persistFilterDataArg).length > 0
                  ? ["deliveryPincode", "pickupPincode", "sellerId"]?.includes(
                      searchPincodedata?.label
                    )
                    ? persistFilterDataArg[searchPincodedata?.label]?.includes(
                        +value?.pincode
                      )
                    : persistFilterDataArg[searchPincodedata?.label]?.includes(
                        value?.pincode
                      )
                  : false,
            }));

            setSearchPincodeData((prevState: any) => {
              return { ...prevState, menu: result };
            });

            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        });
      } else {
        setSearchPincodeData((prevState: any) => {
          return { ...prevState, menu: [] };
        });
      }
    } catch (error: any) {
      console.warn("Error in search pincode Debouncing: ", error.message);
    }
  };

  const onCheckedHandler = (e: any, index1: any) => {
    let temp = { ...searchPincodedata };

    let selectedFilterDataMenu: any = [];

    temp.menu[index1].isActive = !temp.menu[index1].isActive;
    setSearchPincodeData(temp);

    if (
      ["Delivery Pincode", "Pickup Pincode"].includes(searchPincodedata?.name)
    ) {
      selectedFilterDataMenu = temp?.menu
        ?.filter((data: any) => data?.isActive)
        .map((data: any) => +data?.value);
    }

    setFilterState({
      name: temp?.name,
      label: temp?.label,
      isCollapse: temp?.isCollapse,
      menu: selectedFilterDataMenu,
    });
  };

  return (
    <div>
      <div className={`flex flex-col shadow-md rounded-lg   cursor-pointer`}>
        <div
          className={`flex  items-center justify-between px-3 py-6 h-[38px]  border-[1px] ${
            searchPincodedata?.isCollapse
              ? "bg-[#f6f6f6] rounded-tr-lg rounded-tl-lg rounded-b-none"
              : "bg-[#FFFFFF] rounded-lg"
          }`}
        >
          <p
            className="font-semibold flex-1 py-3  text-[16px] text-[#1C1C1C]"
            onClick={() => {
              let temp: any = { ...searchPincodedata };

              if (searchPincodedata?.isCollapse === true) {
                temp.isCollapse = false;
                setSearchPincodeData(temp);
              } else {
                temp.isCollapse = true;
                setSearchPincodeData(temp);
              }
            }}
          >
            {searchPincodedata?.name}
          </p>

          <div
            className={`flex ${
              searchPincodedata.isCollapse && "border shadow-md"
            }  rounded-r `}
          >
            <div
              className={`flex  items-center justify-center rounded-l-lg ${
                searchPincodedata.isCollapse
                  ? "bg-[#F6F6F6] w-[180px]"
                  : "bg-white"
              }  rounded-r `}
            >
              {searchPincodedata.isCollapse && (
                <>
                  <div className="flex w-[100%] border-r rounded-l-md bg-[#ffffff] h-full text-left">
                    <input
                      placeholder="Search..."
                      value={searchInput}
                      onChange={(e: any) => {
                        searchPincodeListHandler(
                          e.target.value,
                          persistFilterData
                        );
                      }}
                      className="w-[100%] search-input-cl border-none rounded-md  h-[100%] text-[14px] py-2 "
                    />
                  </div>
                  <div className={`flex items-center justify-center`}>
                    <img
                      src={crossIcon}
                      alt="downArrowIcon"
                      onClick={() => {
                        searchPincodeListHandler("");
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
                let temp: any = { ...searchPincodedata };

                if (searchPincodedata?.isCollapse === true) {
                  temp.isCollapse = false;
                  setSearchPincodeData(temp);
                } else {
                  temp.isCollapse = true;
                  setSearchPincodeData(temp);
                }
              }}
            >
              <img
                src={downArrowIcon}
                alt="downArrowIcon"
                className={`transform w-[18px] transition-transform duration-400 ${
                  searchPincodedata?.isCollapse ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>
        </div>
        {searchPincodedata?.isCollapse && (
          <>
            <div
              className={`border-b  py-0 border-r border-l grid ${
                searchPincodedata?.menu?.length > 0 && " grid-cols-2"
              } max-h-[300px] overflow-auto rounded-bl-md rounded-br-md `}
            >
              {searchPincodedata?.menu?.length > 0 ? (
                !isLoading &&
                searchPincodedata?.menu?.map((subMenu: any, index1: number) => {
                  return (
                    <div className="px-2" key={index1}>
                      <button
                        className={`flex items-center cursor-pointer  w-full border  py-5  gap-3 h-[28px]  ${
                          index1 !== searchPincodedata?.menu?.length - 1
                            ? "border-b-[#E8E8E8]"
                            : "border-b-0"
                        }  border-t-0 border-r-0 border-l-0`}
                        onClick={(e: any) => onCheckedHandler(e, index1)}
                      >
                        <Checkbox
                          // onChange={(e) => {
                          //   let temp = { ...filterData };
                          //   temp.menu[index1].isActive =
                          //     !temp.menu[index1].isActive;
                          //   console.log("subMenu", e.target.checked);
                          //   setFilterData(temp);
                          // }}
                          className="px-4"
                          // label={subMenu.name}
                          checkboxClassName="gap-1"
                          name={subMenu.name}
                          // labelClassName="px-4 text-[black]"
                          checked={subMenu.isActive}
                          value={subMenu.name}
                        />
                        <p className="font-bold text-[14px] text-[#323232]">
                          {subMenu?.name}
                        </p>
                      </button>
                    </div>
                  );
                })
              ) : (
                <>
                  {isLoading && (
                    <div className="py-4 flex justify-center text-center font-Open w-[100%] font-semibold">
                      <Spinner />
                    </div>
                  )}
                </>
              )}
            </div>

            {!isLoading && searchPincodedata?.menu?.length === 0 && (
              <div className="py-4 border border-t-0  border-r-1 border-l-1 border-b-1 rounded flex justify-center it text-center font-Open w-[100%] font-semibold">
                Search For Pincode
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default PincodeFilterAccordian;
