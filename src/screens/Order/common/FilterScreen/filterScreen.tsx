import React, { useEffect, useState } from "react";
import { GET_FILTERS_INFO_MENTIONFORORDER } from "../../../../utils/ApiUrls";
import CustomAccordian from "./filterAccordian";
import { POST } from "../../../../utils/webService";
import { Spinner } from "../../../../components/Spinner";
import { keyNameMapping } from "../../../../utils/dummyData";
import { capitalizeFirstLetter } from "../../../../utils/utility";
import DatePicker from "react-datepicker";

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
  const [dateRange, setDateRange]: any = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;

  const reportEndDate = new Date();

  const isDateDisabled = (date: any) => {
    return date <= reportEndDate;
  };

  const convertEpoch = (epochDate: any) => {
    return epochDate?.getTime() || "";
  };

  const getFilterDropDownData = async () => {
    setIsLoading(true);
    const { data } = await POST(GET_FILTERS_INFO_MENTIONFORORDER, {});
    if (data?.success) {
      const result: any = [];

      for (const [key, name] of Object.entries(keyNameMapping)) {
        let values: any = data?.data?.[0][key]?.map(
          (obj: any) => Object.values(obj)[0]
        );

        values = values.map((item: any) => {
          return item;
        });

        console.log("key", key);

        const menu = values?.map((value: any) => ({
          name: capitalizeFirstLetter(value),
          value: value,
          isActive:
            Object.keys(persistFilterData).length > 0
              ? ["deliveryPincode", "pickupPincode", "sellerId"]?.includes(key)
                ? persistFilterData[key]?.includes(+value)
                : persistFilterData[key]?.includes(value)
              : false,
        }));

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

  // useEffect(() => {
  //   let tempArr: any = filterPayLoad?.filterArrOne || [];

  //   if (startDate === null && endDate === null) {
  //     tempArr = tempArr.filter(
  //       (selectedtimeRangedata: any) => !selectedtimeRangedata?.createdAt
  //     );

  //     setFilterPayLoad((prevData: any) => {
  //       return {
  //         ...prevData,
  //         filterArrOne: tempArr,
  //       };
  //     });

  //     return;
  //   } else if (endDate === null) {
  //     return;
  //   }

  //   const isAlreadyTimeRangeSet = tempArr.filter(
  //     (selectedtimeRangedata: any) => selectedtimeRangedata?.createdAt
  //   );

  //   if (isAlreadyTimeRangeSet?.length > 0) {
  //     tempArr = tempArr.filter(
  //       (selectedtimeRangedata: any) => !selectedtimeRangedata?.createdAt
  //     );

  //     setFilterPayLoad((prevData: any) => {
  //       return {
  //         ...prevData,
  //         filterArrOne: tempArr,
  //       };
  //     });
  //   }

  //   const endEpoch: any = endDate;
  //   endEpoch && endEpoch.setHours(23, 59, 59, 59);
  //   const lastendEpoch = endEpoch?.getTime();
  //   const startEpoch: any = startDate;

  //   startEpoch && startEpoch.setHours(0, 0, 0, 0);
  //   const lastStartEpoch = startEpoch?.getTime();

  //   const payload = [
  //     { createdAt: { $gte: lastStartEpoch } },
  //     { createdAt: { $lte: lastendEpoch } },
  //   ];
  //   tempArr.push(...payload);

  //   if (tempArr?.length > 1) {
  //     setFilterPayLoad((prevData: any) => {
  //       return {
  //         ...prevData,
  //         filterArrOne: [...tempArr],
  //       };
  //     });
  //   }
  // }, [startDate, endDate, dateRange]);

  // useEffect(() => {
  //   if (filterModal === false) {
  //     setFilterPayLoad({
  //       filterArrOne: [],
  //       filterArrTwo: [],
  //     });
  //   }
  // }, [filterModal]);

  useEffect(() => {
    getFilterDropDownData();
  }, []);

  return (
    <div className="my-4 h-[840px] overflow-auto">
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
  );
}

export default FilterScreen;
