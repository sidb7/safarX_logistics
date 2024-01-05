import React, { useEffect, useState } from "react";
import { GET_FILTERS_INFO_MENTIONFORORDER } from "../../../../utils/ApiUrls";
import CustomAccordian from "./filterAccordian";
import { POST } from "../../../../utils/webService";
import { Spinner } from "../../../../components/Spinner";
import { keyNameMapping } from "../../../../utils/dummyData";
import { capitalizeFirstLetter } from "../../../../utils/utility";

function FilterScreen({ filterState, setFilterState }: any) {
  const [filterOptionList, setFilterOptionList] = useState([]);
  const [isLoading, setIsLoading] = useState<any>(false);

  const getFilterDropDownData = async () => {
    setIsLoading(true);
    const { data } = await POST(GET_FILTERS_INFO_MENTIONFORORDER, {});
    if (data?.success) {
      const result: any = [];

      for (const [key, name] of Object.entries(keyNameMapping)) {
        const values: any = data?.data?.[0][key]?.map(
          (obj: any) => Object.values(obj)[0]
        );

        const menu = values?.map((value: any, index: number) => {
          if (key === "orderType") {
            return {
              name: value,
              value: value,
              isActive: false,
            };
          } else if (key === "paymentType") {
            return {
              name: value === "Cod" ? "COD" : capitalizeFirstLetter(value),
              value: value,
              isActive: false,
            };
          } else {
            return {
              name: capitalizeFirstLetter(value),
              value: value,
              isActive: false,
            };
          }
        });

        // const menu = values?.map((value: any, index: number) => ({
        //   name: value,
        //   value: value,
        //   isActive: false,
        // }));

        const currentObject = {
          name: name,
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
    <div className="my-4 h-[840px] overflow-auto">
      {isLoading ? (
        <div className="flex justify-center items-center h-[600px]">
          <Spinner />
        </div>
      ) : (
        <>
          {filterOptionList && (
            <CustomAccordian
              cardClassName="lg:!px-0 lg:!mt-4"
              filterListDatas={filterOptionList}
              isLoading={isLoading}
              filterState={filterState}
              setFilterState={setFilterState}
            />
          )}
        </>
      )}
    </div>
  );
}

export default FilterScreen;

//  <div>
//    <div className="my-4">
//      <CustomInputwithDropDownForOrders
//        label="Partner"
//        inputBoxName="partners"
//        //   onselect={}
//        DropDownData={allDropDownData?.partners}
//      />
//    </div>
//    <div className="my-4">
//      <CustomInputwithDropDownForOrders
//        label="SellerId"
//        inputBoxName="sellerId"
//        DropDownData={allDropDownData?.sellerId}
//      />
//    </div>
//    <div className="my-4">
//      <CustomInputwithDropDownForOrders
//        label="PickupPincode"
//        inputBoxName="pickupPincode"
//        DropDownData={allDropDownData?.pickupPincode}
//      />
//    </div>
//    <div className="my-4">
//      <CustomInputwithDropDownForOrders
//        label="Deliverypincode"
//        inputBoxName="deliverypincode"
//        DropDownData={allDropDownData?.deliverypincode}
//      />
//    </div>
//    <div className="my-4">
//      <CustomInputwithDropDownForOrders
//        label="PaymentType"
//        inputBoxName="paymentType"
//        DropDownData={allDropDownData?.paymentType}
//      />
//    </div>

//    <div className="my-4">
//      <CustomInputwithDropDownForOrders
//        label="OrderType"
//        inputBoxName="orderType"
//        DropDownData={allDropDownData?.orderType}
//      />
//    </div>
//  </div>;
