import React, { useEffect, useState } from "react";
import { SEARCH_PINCODE } from "../../../utils/ApiUrls";
import { GET } from "../../../utils/webService";
import { Spinner } from "../../../components/Spinner";
import Checkbox from "../../../components/CheckBox/index2";
import downArrowIcon from "../../../assets/Filter/downArrow.svg";
import upArrowIcon from "../../../assets/Filter/upArrow.svg";
import crossIcon from "../../../assets/cross.svg";

// import MultiSelectDropdown from "../../../components/MultiselectDropdown/multiSelectDropdown";
let pincodeArr: any = [];

const PinCode = (props: any) => {
  const {
    index,
    partnerList,
    changeHandler,
    setPersistFilterData,
    persistFilterData,
  } = props;
  const [priority1ServiceList, setPriority1ServiceList] = useState<any>();
  const [priority2ServiceList, setPriority2ServiceList] = useState<any>();
  const [priority3ServiceList, setPriority3ServiceList] = useState<any>();
  const [priority4ServiceList, setPriority4ServiceList] = useState<any>();
  const [searchPincodedata, setSearchPincodeData] = useState<any>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  let debounceTimer: any;

  const sortBy = [
    {
      label: "Cheapest",
      value: "Cheapest",
    },
    {
      label: "Highest",
      value: "Highest",
    },
  ];

  const getServiceBasedOnPartner = (ruleName: any, value: any, i: number) => {
    let filterPartner = partnerList?.filter(
      (el: any) => el?.partnerName === value
    );
    if (i === 0) {
      let priority1serviceArr: any = [];
      filterPartner?.[0].courierpartnerservices?.map((el: any) => {
        return priority1serviceArr.push({
          value: el?.serviceName,
          label: el?.serviceName,
        });
      });
      setPriority1ServiceList(priority1serviceArr);
    } else if (i === 1) {
      let priority2serviceArr: any = [];
      filterPartner?.[0].courierpartnerservices?.map((el: any) => {
        return priority2serviceArr.push({
          value: el?.serviceName,
          label: el?.serviceName,
        });
      });
      setPriority2ServiceList(priority2serviceArr);
    } else if (i === 2) {
      let priority3serviceArr: any = [];
      filterPartner?.[0].courierpartnerservices?.map((el: any) => {
        return priority3serviceArr.push({
          value: el?.serviceName,
          label: el?.serviceName,
        });
      });
      setPriority3ServiceList(priority3serviceArr);
    } else if (i === 3) {
      let priority4serviceArr: any = [];
      filterPartner?.[0].courierpartnerservices?.map((el: any) => {
        return priority4serviceArr.push({
          value: el?.serviceName,
          label: el?.serviceName,
        });
      });
      setPriority4ServiceList(priority4serviceArr);
    }
    changeHandler(ruleName, "priority", value, i, "partnerCol"); // return the callBack value and update the object
  };

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
          const data = await GET(url);

          if (data?.data?.success) {
            console.log("searchPincodedata", searchPincodedata);

            const result = data?.data?.data?.map((value: any, i: any) => ({
              name: value?.pincode,
              value: value?.pincode,
              isActive:
                persistFilterDataArg?.length > 0 &&
                persistFilterDataArg?.includes(value?.pincode)
                  ? true
                  : false,
            }));

            setSearchPincodeData((prevState: any) => {
              return { ...prevState, result };
            });

            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        });
      } else {
        setSearchPincodeData((prevState: any) => {
          return { ...prevState };
        });
      }
    } catch (error: any) {
      console.warn("Error in search pincode Debouncing: ", error.message);
    }
  };

  const onCheckedHandler = (e: any, index1: any) => {
    let temp = { ...searchPincodedata };

    if (e === false) {
      pincodeArr.push(temp.result[index1]?.value);
    } else {
      pincodeArr = pincodeArr.filter(
        (item: any) => item !== temp.result[index1]?.value
      );
    }
    setPersistFilterData(pincodeArr);
    temp.result[index1].isActive = !temp.result[index1].isActive;
    setSearchPincodeData(temp);
  };

  return (
    <div className="mx-5 mb-5 p-5 shadow-lg bg-white rounded-lg">
      <h1 className="text-[#1C1C1C] font-Lato font-semibold text-[28px]">
        {index + 1}. PIN Code
      </h1>
      <div className="mt-5">
        <div className="flex gap-4">
          <div>
            <h1 className="text-[18px] font-Open text-[#323232]">PIN Code</h1>
          </div>
          <div className="!w-[280px]">
            {/* Pincode list */}
            <div
              className={`flex  items-center justify-between h-[38px]  border-[1px] ${
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

              <div className={`flex `}>
                <div
                  className={`flex  items-center justify-center rounded-l-lg ${
                    searchPincodedata.isCollapse ? "bg-[#F6F6F6]" : "bg-white"
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
            <div
              className={`border-b  py-0 border-r border-l grid ${
                searchPincodedata?.result?.length > 0 && " grid-cols-2"
              } max-h-[300px] overflow-auto rounded-bl-md rounded-br-md `}
            >
              {searchPincodedata?.result?.length > 0 ? (
                !isLoading &&
                searchPincodedata?.result?.map(
                  (subMenu: any, index1: number) => {
                    return (
                      <div className="px-2  bg-white z-10" key={index1}>
                        <button
                          className={`flex cursor-pointer items-center  w-full border  py-5  gap-3 h-[28px] ${
                            index1 !== searchPincodedata?.result?.length - 1
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
                            checked={subMenu?.isActive}
                          />
                          <p className="font-bold text-[14px] text-[#323232]">
                            {subMenu?.name}
                          </p>
                        </button>
                      </div>
                    );
                  }
                )
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
            {/* <select
              onChange={(e: any) => {
                if (e.target.value !== "") {
                  changeHandler("pin_code", "pin_code", e.target.value);
                }
              }}
              className="h-full p-[5px] text-[12px] font-Open font-semibold w-full rounded-lg bg-transparent border-2 border-[#A4A4A4]"
            >
              <option value={""} className="bg-gray-100">
                Select Pincode
              </option>

              {pinCodeList?.map((option: any, i: number) => {
                return (
                  <option value={option?.pincode}>{option?.pincode}</option>
                );
              })}
            </select> */}
          </div>
        </div>
        <div className="flex items-center gap-4 mt-5">
          <div>Sort By</div>
          <div className="!w-[115px] flex !h-[48px]">
            <select
              onChange={(e: any) => {
                if (e.target.value != "") {
                  changeHandler("pin_code", "sort", e.target.value);
                }
              }}
              className="h-full p-[5px] text-[12px] font-Open font-semibold w-full rounded-lg bg-transparent border-2 border-[#A4A4A4]"
            >
              <option value={""} className="bg-gray-100">
                Select Sort
              </option>
              {sortBy?.map((option: any, i: number) => (
                <option value={option?.value}>{option?.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-5">
          <div className="flex items-center gap-4">
            <h1 className="text-[16px] font-Open font-semibold">Priority 1</h1>
            <div className="!w-[300px] !h-[48px]">
              <select
                className="h-full p-[5px] text-[12px] font-Open font-semibold w-full rounded-lg bg-transparent border-2 border-[#A4A4A4]"
                onChange={(e: any) => {
                  if (e.target.value !== "") {
                    getServiceBasedOnPartner("pin_code", e.target.value, 0);
                  }
                }}
              >
                <option value={""} className="bg-gray-100">
                  Select Partner
                </option>
                {partnerList?.map((option: any) => (
                  <option key={option.partnerId} value={option.partnerName}>
                    {option.partnerName}
                  </option>
                ))}
              </select>
            </div>
            <div className="!w-[300px] !h-[48px]">
              <select
                className="h-full p-[5px] text-[12px] font-Open font-semibold w-full rounded-lg bg-transparent border-2 border-[#A4A4A4]"
                onChange={(e: any) => {
                  if (e.target.value != "") {
                    changeHandler(
                      "pin_code",
                      "priority",
                      e.target.value,
                      0,
                      "serviceCol"
                    ); // return the callBack value and update the object
                  }
                }}
              >
                <option className="cursor-not-allowed bg-gray-100" value={""}>
                  Select Services
                </option>
                {priority1ServiceList?.map((el: any) => {
                  return (
                    <option key={el.label} value={el.value}>
                      {el.label}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <h1 className="text-[16px] font-Open font-semibold">Priority 2</h1>
            <div className="!w-[300px] !h-[48px]">
              <select
                className="h-full p-[5px] text-[12px] font-Open font-semibold w-full rounded-lg bg-transparent border-2 border-[#A4A4A4]"
                onChange={(e: any) => {
                  if (e.target.value !== "") {
                    getServiceBasedOnPartner("pin_code", e.target.value, 1);
                  }
                }}
              >
                <option value={""} className="bg-gray-100">
                  Select Partner
                </option>
                {partnerList?.map((option: any) => (
                  <option key={option.partnerId} value={option.partnerName}>
                    {option.partnerName}
                  </option>
                ))}
              </select>
            </div>
            <div className="!w-[300px] !h-[48px]">
              <select
                className="h-full p-[5px] text-[12px] font-Open font-semibold w-full rounded-lg bg-transparent border-2 border-[#A4A4A4]"
                onChange={(e: any) => {
                  if (e.target.value != "") {
                    changeHandler(
                      "pin_code",
                      "priority",
                      e.target.value,
                      1,
                      "serviceCol"
                    ); // return the callBack value and update the object
                  }
                }}
              >
                <option className="cursor-not-allowed bg-gray-100" value={""}>
                  Select Services
                </option>
                {priority2ServiceList?.map((el: any) => {
                  return (
                    <option key={el.label} value={el.value}>
                      {el.label}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <h1 className="text-[16px] font-Open font-semibold">Priority 3</h1>
            <div className="!w-[300px] !h-[48px]">
              <select
                className="h-full p-[5px] text-[12px] font-Open font-semibold w-full rounded-lg bg-transparent border-2 border-[#A4A4A4]"
                onChange={(e: any) => {
                  if (e.target.value !== "") {
                    getServiceBasedOnPartner("pin_code", e.target.value, 2);
                  }
                }}
              >
                <option value={""} className="bg-gray-100">
                  Select Partner
                </option>
                {partnerList?.map((option: any) => (
                  <option key={option.partnerId} value={option.partnerName}>
                    {option.partnerName}
                  </option>
                ))}
              </select>
            </div>
            <div className="!w-[300px] !h-[48px]">
              <select
                className="h-full p-[5px] text-[12px] font-Open font-semibold w-full rounded-lg bg-transparent border-2 border-[#A4A4A4]"
                onChange={(e: any) => {
                  if (e.target.value != "") {
                    changeHandler(
                      "pin_code",
                      "priority",
                      e.target.value,
                      2,
                      "serviceCol"
                    ); // return the callBack value and update the object
                  }
                }}
              >
                <option className="cursor-not-allowed bg-gray-100" value={""}>
                  Select Services
                </option>
                {priority3ServiceList?.map((el: any) => {
                  return (
                    <option key={el.label} value={el.value}>
                      {el.label}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <h1 className="text-[16px] font-Open font-semibold">Priority 4</h1>
            <div className="!w-[300px] !h-[48px]">
              <select
                className="h-full p-[5px] text-[12px] font-Open font-semibold w-full rounded-lg bg-transparent border-2 border-[#A4A4A4]"
                onChange={(e: any) => {
                  if (e.target.value !== "") {
                    getServiceBasedOnPartner("pin_code", e.target.value, 3);
                  }
                }}
              >
                <option value={""} className="bg-gray-100">
                  Select Partner
                </option>
                {partnerList?.map((option: any) => (
                  <option key={option.partnerId} value={option.partnerName}>
                    {option.partnerName}
                  </option>
                ))}
              </select>
            </div>
            <div className="!w-[300px] !h-[48px]">
              <select
                className="h-full p-[5px] text-[12px] font-Open font-semibold w-full rounded-lg bg-transparent border-2 border-[#A4A4A4]"
                onChange={(e: any) => {
                  if (e.target.value != "") {
                    changeHandler(
                      "pin_code",
                      "priority",
                      e.target.value,
                      3,
                      "serviceCol"
                    ); // return the callBack value and update the object
                  }
                }}
              >
                <option className="cursor-not-allowed bg-gray-100" value={""}>
                  Select Services
                </option>
                {priority4ServiceList?.map((el: any) => {
                  return (
                    <option key={el.label} value={el.value}>
                      {el.label}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinCode;
