import React, { useEffect, useState } from "react";
import CustomInputBox from "../../../components/Input";

const WeightRange = (props: any) => {
  const { index, partnerList, changeHandler, getDataFromBackend } = props;
  const [priority1ServiceList, setPriority1ServiceList] = useState<any>();
  const [priority2ServiceList, setPriority2ServiceList] = useState<any>();
  const [priority3ServiceList, setPriority3ServiceList] = useState<any>();
  const [priority4ServiceList, setPriority4ServiceList] = useState<any>();

  const condition = [
    {
      label: "Greater Than",
      value: "greater",
    },
    {
      label: "Less Than",
      value: "less",
    },
    {
      label: "Between",
      value: "between",
    },
  ];

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

  useEffect(() => {
    getDataFromBackend?.priority?.map((el: any, i: number) => {
      if (el?.partnerName !== "") {
        getServiceBasedOnPartner("weight_range", el?.partnerName, i);
      }
    });

    // setPersistFilterData(getDataFromBackend?.pincode);
  }, []);

  return (
    <div className="mx-5 mb-5 p-5 shadow-lg bg-white rounded-lg">
      <h1 className="text-[#1C1C1C] font-Lato font-semibold text-[28px]">
        {index + 1}. Weight Range
      </h1>
      <div className="mt-5">
        <div className="flex gap-4 items-center">
          <div>
            <h1 className="text-[18px] font-Open text-[#323232]">
              Weight Range
            </h1>
          </div>
          <div className="!w-[115px] !h-[48px]">
            <CustomInputBox
              label="From"
              className="text-[12px] font-Open font-semibold"
              defaultValue={getDataFromBackend?.from}
              onChange={(e: any) =>
                changeHandler("weight_range", "from", e.target.value)
              }
            />
          </div>
          <div className="!w-[140px] !h-[48px]">
            <select
              onChange={(e: any) => {
                if (e.target.value !== "") {
                  changeHandler("weight_range", "condition", e.target.value);
                }
              }}
              className="h-full p-[5px] text-[12px] font-Open font-semibold w-full rounded-lg bg-transparent border-2 border-[#A4A4A4]"
            >
              <option value={""} className="bg-gray-100">
                Select Condition
              </option>
              {condition?.map((option: any, i: number) => (
                <option
                  value={option?.value}
                  selected={
                    getDataFromBackend?.type === option?.value ? true : false
                  }
                >
                  {option?.label}
                </option>
              ))}
            </select>
          </div>
          <div className="!w-[115px] !h-[48px]">
            <CustomInputBox
              className="text-[12px] font-Open font-semibold"
              label="To"
              defaultValue={getDataFromBackend?.to}
              onChange={(e: any) =>
                changeHandler("weight_range", "to", e.target.value)
              }
            />
          </div>
        </div>
        <div className="flex items-center gap-4 mt-5">
          <div>Sort By</div>
          <div className="!w-[115px] flex !h-[48px]">
            <select
              onChange={(e: any) => {
                if (e.target.value != "") {
                  changeHandler("weight_range", "sort", e.target.value);
                }
              }}
              className="h-full p-[5px] text-[12px] font-Open font-semibold w-full rounded-lg bg-transparent border-2 border-[#A4A4A4]"
            >
              <option value={""} className="bg-gray-100">
                Select Sort
              </option>
              {sortBy?.map((option: any, i: number) => (
                <option
                  value={option?.value}
                  selected={
                    getDataFromBackend?.sortBy === option?.value ? true : false
                  }
                >
                  {option?.label}
                </option>
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
                    getServiceBasedOnPartner("weight_range", e.target.value, 0);
                  }
                }}
              >
                <option value={""} className="bg-gray-100">
                  Select Partner
                </option>
                {partnerList?.map((option: any) => (
                  <option
                    key={option.partnerId}
                    value={option.partnerName}
                    selected={
                      getDataFromBackend?.priority?.[0].partnerName ===
                      option?.partnerName
                        ? true
                        : false
                    }
                  >
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
                      "weight_range",
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
                    <option
                      key={el.label}
                      value={el.value}
                      selected={
                        getDataFromBackend?.priority?.[0].serviceName ===
                        el?.value
                          ? true
                          : false
                      }
                    >
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
                    getServiceBasedOnPartner("weight_range", e.target.value, 1);
                  }
                }}
              >
                <option value={""} className="bg-gray-100">
                  Select Partner
                </option>
                {partnerList?.map((option: any) => (
                  <option
                    key={option.partnerId}
                    value={option.partnerName}
                    selected={
                      getDataFromBackend?.priority?.[1].partnerName ===
                      option?.partnerName
                        ? true
                        : false
                    }
                  >
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
                      "weight_range",
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
                    <option
                      key={el.label}
                      value={el.value}
                      selected={
                        getDataFromBackend?.priority?.[1].serviceName ===
                        el?.value
                          ? true
                          : false
                      }
                    >
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
                    getServiceBasedOnPartner("weight_range", e.target.value, 2);
                  }
                }}
              >
                <option value={""} className="bg-gray-100">
                  Select Partner
                </option>
                {partnerList?.map((option: any) => (
                  <option
                    key={option.partnerId}
                    value={option.partnerName}
                    selected={
                      getDataFromBackend?.priority?.[2].partnerName ===
                      option?.partnerName
                        ? true
                        : false
                    }
                  >
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
                      "weight_range",
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
                    <option
                      key={el.label}
                      value={el.value}
                      selected={
                        getDataFromBackend?.priority?.[2].serviceName ===
                        el?.value
                          ? true
                          : false
                      }
                    >
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
                    getServiceBasedOnPartner("weight_range", e.target.value, 3);
                  }
                }}
              >
                <option value={""} className="bg-gray-100">
                  Select Partner
                </option>
                {partnerList?.map((option: any) => (
                  <option
                    key={option.partnerId}
                    value={option.partnerName}
                    selected={
                      getDataFromBackend?.priority?.[3].partnerName ===
                      option?.partnerName
                        ? true
                        : false
                    }
                  >
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
                      "weight_range",
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
                    <option
                      key={el.label}
                      value={el.value}
                      selected={
                        getDataFromBackend?.priority?.[0].serviceName ===
                        el?.value
                          ? true
                          : false
                      }
                    >
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

export default WeightRange;
