import React, { useState, useEffect } from "react";
import AddressCard from "./addressCard";
import CustomDropDown from "../../../../components/DropDown";
import { POST } from "../../../../utils/webService";
import {
  GET_PICKUP_ADDRESS,
  GET_DELIVERY_ADDRESS,
} from "../../../../utils/ApiUrls";
import { toast } from "react-toastify";

const AddressBook = () => {
  const [filterId, setFilterId] = useState(0);
  const [address, setAddress]: any = useState();

  const [filterData, setFilterData] = useState([
    { label: "Pickup Address", isActive: false },
    { label: "Delivery Address", isActive: false },
  ]);

  const cardData = (address: any) => {
    return {
      addressLabel: address?.addressType,
      address: [
        address?.flatNo,
        address?.address,
        address?.sector,
        address?.landmark,
        address?.pincode,
        address?.city,
        address?.state,
        address?.country,
      ].join(","),
      name: address?.contactName,
      phoneNumber: address?.mobileNo || address?.alternateMobileNo || "",
    };
  };

  useEffect(() => {
    (async () => {
      const { data: allAddressData }: any = await POST(
        filterId === 0 ? GET_PICKUP_ADDRESS : GET_DELIVERY_ADDRESS
      );
      if (allAddressData?.success) {
        setAddress(allAddressData.data);
      } else {
        toast.error(allAddressData?.message);
        setAddress([]);
      }
    })();
  }, [filterId]);

  const filterComponent = (className?: string) => {
    return (
      <div className="flex  mt-6">
        <div
          className={`flex text-[14px] text-[#777777] font-medium h-[44px] cursor-pointer`}
        >
          {filterData.map((singleData, index) => {
            return (
              <span
                className={`flex items-center py-[8px] px-[16px] border-[1px] border-[#A4A4A4] ${
                  filterId === index
                    ? `${
                        index === filterData.length - 1
                          ? "rounded-r-md"
                          : "rounded-l-md"
                      } bg-[#D2D2D2] font-medium text-[#1C1C1C]`
                    : ""
                }`}
                onClick={() => setFilterId(index)}
              >
                {singleData.label}
              </span>
            );
          })}
        </div>
        <div className="ml-2 w-[265px]">
          <CustomDropDown
            value=""
            onChange={() => {}}
            options={[
              {
                label: "Domestic",
                value: "Domestic",
              },
            ]}
            selectClassName="rounded-md bg-[#FEFEFE] h-9"
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      {filterComponent()}

      {/* Display Address */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-y-6 gap-x-0 mt-4">
        {address?.map((data: any, index: any) => {
          return <AddressCard cardData={cardData(data)} key={index} />;
        })}
      </div>
    </div>
  );
};

export default AddressBook;
