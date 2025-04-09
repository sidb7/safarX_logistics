// import React, { useState } from "react";
// import CustomAccordian from "../Order/common/FilterScreen/filterAccordian";

// const TransactionFilter = ({ filterState, setFilterState }: any) => {
//   const [filterOptionList, setFilterOptionList] = useState([
//     {
//       name: "Status",
//       label: "status",
//       isCollapse: false,
//       menu: [
//         {
//           name: "DRAFT",
//           value: "DRAFT",
//           isActive: false,
//         },
//         {
//           name: "FAILED",
//           value: "FAILED",
//           isActive: false,
//         },
//         {
//           name: "ORDER_FAILED",
//           value: "ORDER_FAILED",
//           isActive: false,
//         },
//         {
//           name: "PENDING",
//           value: "PENDING",
//           isActive: false,
//         },
//         {
//           name: "Requested",
//           value: "Requested",
//           isActive: false,
//         },
//         {
//           name: "SUCCESS",
//           value: "SUCCESS",
//           isActive: false,
//         },
//         {
//           name: "TXN_FAILED",
//           value: "TXN_FAILED",
//           isActive: false,
//         },
//       ],
//     },
//   ]);
//   const [isLoading, setIsLoading] = useState<any>(false);

//   return (
//     <>
//       {filterOptionList &&
//         filterOptionList.map((singleAccordianDataList: any, i: any) => (
//           <CustomAccordian
//             key={`${i}_${singleAccordianDataList?.name}`}
//             cardClassName="lg:!px-0 lg:!mt-4"
//             filterListDatas={singleAccordianDataList}
//             isLoading={isLoading}
//             setFilterState={setFilterState}
//             filterState={filterState}
//           />
//         ))}
//     </>
//   );
// };

// export default TransactionFilter;


import React, { useState, useEffect } from "react";
import CustomAccordian from "../Order/common/FilterScreen/filterAccordian";

const TransactionFilter = ({ 
  filterState, 
  setFilterState,
  filterPayLoad,
  setFilterPayLoad,
  filterModal,
  setPersistFilterData,
  persistFilterData 
}: any) => {
  const [isLoading, setIsLoading] = useState<any>(false);
  
  const createFilterOptions = () => {
    const defaultOptions = [
      {
        name: "Status",
        label: "status",
        isCollapse: false,
        menu: [
          { name: "DRAFT", value: "DRAFT", isActive: false },
          { name: "FAILED", value: "FAILED", isActive: false },
          { name: "ORDER_FAILED", value: "ORDER_FAILED", isActive: false },
          { name: "PENDING", value: "PENDING", isActive: false },
          { name: "Requested", value: "Requested", isActive: false },
          { name: "SUCCESS", value: "SUCCESS", isActive: false },
          { name: "TXN_FAILED", value: "TXN_FAILED", isActive: false },
        ],
      },
    ];
    
    if (persistFilterData && persistFilterData.status && persistFilterData.status.length > 0) {
      defaultOptions[0].menu = defaultOptions[0].menu.map(item => ({
        ...item,
        isActive: persistFilterData.status.includes(item.value)
      }));
    }
    
    return defaultOptions;
  };
  
  const [filterOptionList, setFilterOptionList] = useState(createFilterOptions());
  
  useEffect(() => {
    setFilterOptionList(createFilterOptions());
  }, [filterModal, persistFilterData]);
  
  return (
    <>
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
  );
};

export default TransactionFilter;