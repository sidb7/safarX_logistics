import React, { useEffect, useState } from "react";
import { GET_FILTERS_INFO_MENTIONFORORDER } from "../../../../utils/ApiUrls";
import CustomAccordian from "./filterAccordian";
import { POST } from "../../../../utils/webService";
import { Spinner } from "../../../../components/Spinner";
import { keyNameMapping } from "../../../../utils/dummyData";
import { capitalizeFirstLetter } from "../../../../utils/utility";
import PincodeFilterAccordian from "./pincodeFilterAccordian";

function FilterScreen({
  filterState,
  setFilterState,
  setFilterPayLoad,
  filterPayLoad,
  filterModal,
  persistFilterData,
}: any) {
  const [filterOptionList, setFilterOptionList] = useState([]);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [isSearchLoading, setIsSearchLoading] = useState([
    { name: "deliveryPincode", isLoading: false },
    { name: "pickupPincode", isLoading: false },
  ]);
  const [searchPincodListLoader, setSearchPincodListLoader]: any = useState([
    {
      label: "deliveryPincode",
      name: "Delivery Pincode",
      menu: [],
      isCollapse: false,
    },
    {
      label: "pickupPincode",
      name: "Pickup Pincode",
      menu: [],
      isCollapse: false,
    },
  ]);
  const [dateRange, setDateRange]: any = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;

  const reportEndDate = new Date();

  const isDateDisabled = (date: any) => {
    return date <= reportEndDate;
  };

  const convertEpoch = (epochDate: any) => {
    return epochDate?.getTime() || "";
  };

  const sourcesObj: any = {
    Zoho: "Cart - Zoho",
    Shopify: "Cart - Shopify",
    Woocommerce: "Cart - Woocommerce",
    Bulk_b2c: "Sy - Bulk B2B",
    Bulk_b2b: "Sy - Bulk B2C",
    Website: "Sy - Single Order",
    Api: "Sy - Api",
  };

  const sourcesArr = [
    "Zoho",
    "Shopify",
    "Woocommerce",
    "Bulk_b2c",
    "Bulk_b2b",
    "Website",
    "Api",
  ];

  const getFilterDropDownData = async () => {
    setIsLoading(true);
    const { data } = await POST(GET_FILTERS_INFO_MENTIONFORORDER, {});
    if (data?.success) {
      const result: any = [];

      for (const [key, name] of Object.entries(keyNameMapping)) {
        let values: any = data?.data?.[0][key]?.map(
          (obj: any) => Object.values(obj)[0]
        );

        values = values?.map((item: any) => {
          return item;
        });

        let menu = values?.map((value: any) => {
          return {
            name: sourcesArr.includes(capitalizeFirstLetter(value))
              ? sourcesObj[capitalizeFirstLetter(value)]
              : value,
            value: value,
            isActive:
              Object.keys(persistFilterData).length > 0
                ? ["deliveryPincode", "pickupPincode", "sellerId"]?.includes(
                    key
                  )
                  ? persistFilterData[key]?.includes(+value)
                  : persistFilterData[key]?.includes(value)
                : false,
          };
        });

        menu = menu.sort((a: any, b: any) => a.name.localeCompare(b.name));

        const currentObject = {
          name: name?.name,
          label: name?.label,
          isCollapse: false,
          menu: menu,
        };
        result.push(currentObject);
      }
      setFilterOptionList(result);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFilterDropDownData();
  }, []);

  return (
    <div className="my-4 h-[740px] overflow-auto">
      <div className="flex flex-col gap-y-4">
        {searchPincodListLoader.map((pincodeData: any, i: any) => {
          return (
            <PincodeFilterAccordian
              data={pincodeData}
              persistFilterData={persistFilterData}
              setFilterState={setFilterState}
              key={`${i}_${pincodeData.name}`}
            />
          );
        })}
      </div>
      <div>
        {isLoading ? (
          <div className="flex justify-center items-center h-[600px]">
            <Spinner />
          </div>
        ) : (
          <>
            {/* <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update: any) => {
              setDateRange(update);
            }}
            filterDate={isDateDisabled}
            isClearable={true}
            placeholderText="Select From & To Date"
            className="cursor-pointer border-solid border-2 datepickerCss border-sky-500 pl-6"
            dateFormat="dd/MM/yyyy"
          /> */}

            {filterOptionList &&
              filterOptionList.map((singleAccordianDataList: any, i: any) => (
                <CustomAccordian
                  key={`${i}_${singleAccordianDataList?.name}`}
                  cardClassName="lg:!px-0 lg:!mt-4"
                  filterListDatas={singleAccordianDataList}
                  isLoading={isLoading}
                  setFilterState={setFilterState}
                  filterState={filterState}
                />
              ))}
          </>
        )}
      </div>
    </div>
  );
}

export default FilterScreen;
