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
import CloseIcon from "../../../../assets/CloseIcon.svg";

function PincodeFilterAccordian({
  data,
  persistFilterData,
  setFilterState,
  filterPayLoad,
  setPersistFilterData,
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

  const PersistFilterArr = (
    key: any,
    checkedData: any,
    isCheckedAction: any
  ) => {
    console.log(
      "persistFilterData[key]",
      persistFilterData,
      checkedData,
      isCheckedAction
    );

    let tempArr: any = [...persistFilterData[key]];
    // console.log("🚀 ~ tempArr:", tempArr);

    if (isCheckedAction) {
      tempArr = tempArr.filter((item: any) => item !== checkedData);
    } else {
      tempArr.push(checkedData);
    }
    // console.log("🚀 ~ tempArr:", tempArr);

    setPersistFilterData((prevData: any) => {
      return { ...prevData, [key]: [...tempArr] };
    });
  };

  const updateFilterArr = (
    arr: any,
    key: any,
    subKey: any,
    checkedData: any,
    isCheckedAction: any
  ) => {
    const index = arr.findIndex(
      (findArr: any) => Object.keys(findArr)[0] === key
    );
    let tempArr = [];

    if (index > -1) {
      tempArr = [...arr[index][key][subKey]];

      if (isCheckedAction) {
        tempArr = tempArr.filter((item: any) => item !== checkedData);
      } else {
        tempArr.push(checkedData);
      }
      arr[index][key][subKey] = tempArr;
    } else {
      const newObj = { [key]: { [subKey]: [checkedData] } };
      arr.push(newObj);
    }
  };

  const onCheckedHandler = (e: any, index1: any) => {
    let tempArrTwo = filterPayLoad?.filterArrTwo;
    let temp = { ...searchPincodedata };

    switch (temp?.name) {
      case "Delivery Pincode":
        updateFilterArr(
          tempArrTwo,
          "deliveryAddress.pincode",
          "$in",
          temp.menu[index1]?.value,
          e
        );
        PersistFilterArr("deliveryPincode", temp.menu[index1]?.value, e);
        break;
      case "Pickup Pincode":
        updateFilterArr(
          tempArrTwo,
          "pickupAddress.pincode",
          "$in",
          temp.menu[index1]?.value,
          e
        );
        PersistFilterArr("pickupPincode", temp.menu[index1]?.value, e);
        break;

      default:
        break;
    }

    temp.menu[index1].isActive = !temp.menu[index1].isActive;
    setSearchPincodeData(temp);
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
                      type="number"
                      onChange={(e: any) => {
                        if (e.target.value.length <= 6) {
                          searchPincodeListHandler(
                            e.target.value,
                            persistFilterData
                          );
                        }
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
            {persistFilterData[searchPincodedata?.label].length > 0 && (
              <div className="border p-4  grid grid-cols-4 gap-y-2 gap-x-2">
                {persistFilterData[searchPincodedata?.label].map(
                  (item: any, i: any) => {
                    return (
                      <div
                        className="border text-[14px] flex justify-between max-w-[90px] items-center px-2 py-1 rounded"
                        key={`${item}_${i}`}
                      >
                        <div>{item}</div>
                        <button
                          className="w-[15px]"
                          onClick={() => {
                            updateFilterArr(
                              filterPayLoad?.filterArrTwo,
                              searchPincodedata?.label === "deliveryPincode"
                                ? "deliveryAddress.pincode"
                                : "pickupAddress.pincode",
                              "$in",
                              item,
                              true
                            );
                            PersistFilterArr(
                              searchPincodedata?.label,
                              item,
                              true
                            );

                            let tempArr = [...searchPincodedata?.menu];

                            tempArr = tempArr.map((data: any, i: any) => {
                              if (data?.value === item) {
                                return { ...data, isActive: false };
                              }
                              return data;
                            });

                            setSearchPincodeData((prevData: any) => {
                              return { ...prevData, menu: tempArr };
                            });
                          }}
                        >
                          <img src={CloseIcon} alt="" />
                        </button>
                      </div>
                    );
                  }
                )}
              </div>
            )}
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
                        className={`flex items-center cursor-pointer  w-full border  py-5  gap-3 h-[28px] ${
                          index1 !== searchPincodedata?.menu?.length - 1
                            ? "border-b-[#E8E8E8]"
                            : "border-b-0"
                        } border-t-0 border-r-0 border-l-0`}
                        onClick={(e: any) =>
                          onCheckedHandler(subMenu?.isActive, index1)
                        }
                      >
                        <Checkbox
                          className="px-4"
                          checkboxClassName="gap-1"
                          name={subMenu?.name}
                          // label={subMenu.name}
                          // labelClassName="px-4 text-[black]"
                          checked={subMenu?.isActive}
                          // value={subMenu?.name}
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
