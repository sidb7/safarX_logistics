import React, { useEffect, useState } from "react";
import Checkbox from "../../../components/CheckBox/index2";
import downArrowIcon from "../../../assets/Filter/downArrow.svg";

let categoriesArr: any = [];

const ProductCategory = (props: any) => {
  const {
    index,
    partnerList,
    categoriesList,
    changeHandler,
    setCategoriesList,
    getDataFromBackend,
  } = props;
  const [priority1ServiceList, setPriority1ServiceList] = useState<any>();
  const [priority2ServiceList, setPriority2ServiceList] = useState<any>();
  const [priority3ServiceList, setPriority3ServiceList] = useState<any>();
  const [priority4ServiceList, setPriority4ServiceList] = useState<any>();
  const [persistFilterData, setPersistFilterData] = useState<any>([]);
  const [categories, setCategories] = useState<any>();

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

  const onCheckedHandler = (e: any, index1: any) => {
    let temp = [...categoriesList];

    if (e?.isActive) {
      // categoriesArr = categoriesArr.filter(
      //   (item: any) => item !== temp[index1]?.categoryName
      // );
      categoriesArr = persistFilterData.filter(
        (item: any) => item !== e?.categoryName
      );
      changeHandler("product_category", "product_category", categoriesArr);
      setPersistFilterData(categoriesArr);
    } else {
      categoriesArr.push(temp[index1]?.categoryName);
      let combineArr = persistFilterData.concat(temp[index1]?.categoryName);
      changeHandler("product_category", "product_category", combineArr);
      setPersistFilterData(combineArr);
    }
    temp[index1].isActive = !temp[index1].isActive;
    setCategoriesList(temp);
  };

  useEffect(() => {
    getDataFromBackend?.priority?.map((el: any, i: number) => {
      getServiceBasedOnPartner("product_category", el?.partnerName, i);
    });

    changeHandler(
      "product_category",
      "product_category",
      getDataFromBackend?.category
    );
    setPersistFilterData(getDataFromBackend?.category);
  }, []);

  return (
    <div className="mx-5 mb-5 p-5 shadow-lg bg-white rounded-lg">
      <h1 className="text-[#1C1C1C] font-Lato font-semibold text-[28px]">
        {index + 1}. Product Category
      </h1>
      <div className="mt-5">
        <div className="flex gap-4">
          <div>
            <h1 className="text-[18px] font-Open text-[#323232]">
              Product Category
            </h1>
          </div>
          <div className="!w-[300px]">
            <div
              className={`flex  items-center justify-between h-[38px]  border-[1px] ${
                categories?.isCollapse
                  ? "bg-[#f6f6f6] rounded-tr-lg rounded-tl-lg rounded-b-none"
                  : "bg-[#FFFFFF] rounded-lg"
              }`}
            >
              <p
                className="font-semibold flex-1 py-3  text-[16px] text-[#1C1C1C]"
                onClick={() => {
                  let temp: any = { ...categories };

                  if (categories?.isCollapse === true) {
                    temp.isCollapse = false;
                    setCategories(temp);
                  } else {
                    temp.isCollapse = true;
                    setCategories(temp);
                  }
                }}
              ></p>

              <div className={`flex `}>
                <div
                  className={`flex  items-center justify-center rounded-l-lg ${
                    categories?.isCollapse ? "bg-[#F6F6F6]" : "bg-white"
                  }  rounded-r `}
                ></div>
                <div
                  className="flex py-2 px-4  border-l rounded-r  hover:bg-[#F6F6F6]"
                  onClick={() => {
                    let temp: any = { ...categories };

                    if (categories?.isCollapse === true) {
                      temp.isCollapse = false;
                      setCategories(temp);
                    } else {
                      temp.isCollapse = true;
                      setCategories(temp);
                    }
                  }}
                >
                  <img
                    src={downArrowIcon}
                    alt="downArrowIcon"
                    className={`transform w-[18px] transition-transform duration-400 ${
                      categories?.isCollapse ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
            </div>
            {categories?.isCollapse === true && (
              <div
                className={`border-b  py-0 border-r border-l max-h-[300px] overflow-auto rounded-bl-md rounded-br-md `}
              >
                {categoriesList &&
                  categoriesList?.map((option: any, index: number) => (
                    <div className="px-2  bg-white z-10" key={index}>
                      <button
                        className={`flex cursor-pointer items-center  w-full border  py-5  gap-3 h-[28px] border-t-0 border-r-0 border-l-0`}
                        onClick={(e: any) => onCheckedHandler(option, index)}
                      >
                        <Checkbox
                          className="px-4"
                          checkboxClassName="gap-1 !h-[24px] !w-[24px] !rounded-lg"
                          name={option?.categoryName}
                          checked={
                            persistFilterData?.includes(option?.categoryName)
                              ? true
                              : false
                          }
                          // checked={
                          //   getDataFromBackend?.category?.includes(
                          //     option?.categoryName
                          //   )
                          //     ? true
                          //     : false
                          // }
                        />
                        <p className="font-normal font-Open text-[14px] text-[#323232]">
                          {option?.categoryName}
                        </p>
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* <div className="!w-[140px] !h-[48px]">
            <select
              onChange={(e: any) => {
                if (e.target.value !== "") {
                  changeHandler(
                    "product_category",
                    "product_category",
                    e.target.value
                  );
                }
              }}
              className="h-full p-[5px] text-[12px] font-Open font-semibold w-full rounded-lg bg-transparent border-2 border-[#A4A4A4]"
            >
              <option value={""} className="bg-gray-100">
                Select Product Category
              </option>
              {categoriesList?.map((option: any, i: number) => (
                <option value={option?.categoryName}>
                  <Checkbox
                    className="px-4"
                    checkboxClassName="gap-1"
                    // name={subMenu?.name}
                    // checked={subMenu?.isActive}
                  />
                  <p className="font-bold text-[14px] text-[#323232]">
                    {option?.categoryName}
                  </p>
                </option>
              ))}
            </select>
          </div> */}
        </div>
        <div className="flex items-center gap-4 mt-5">
          <div>Sort By</div>
          <div className="!w-[115px] flex !h-[48px]">
            <select
              onChange={(e: any) => {
                if (e.target.value != "") {
                  changeHandler("product_category", "sort", e.target.value);
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
                    getServiceBasedOnPartner(
                      "product_category",
                      e.target.value,
                      0
                    );
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
                      "product_category",
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
                    getServiceBasedOnPartner(
                      "product_category",
                      e.target.value,
                      1
                    );
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
                      "product_category",
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
                    getServiceBasedOnPartner(
                      "product_category",
                      e.target.value,
                      2
                    );
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
                      "product_category",
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
                    getServiceBasedOnPartner(
                      "product_category",
                      e.target.value,
                      3
                    );
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
                      "product_category",
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
                        getDataFromBackend?.priority?.[3].serviceName ===
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

export default ProductCategory;
