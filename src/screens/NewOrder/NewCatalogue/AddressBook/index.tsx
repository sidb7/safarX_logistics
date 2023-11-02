import React, { useState, useEffect, SetStateAction } from "react";
import AddressCard from "./addressCard";
import CustomDropDown from "../../../../components/DropDown";
import { POST } from "../../../../utils/webService";
import {
  GET_PICKUP_ADDRESS,
  GET_DELIVERY_ADDRESS,
} from "../../../../utils/ApiUrls";
import { toast } from "react-toastify";
import { Spinner } from "../../../../components/Spinner";

interface IAddressBookProps {
  setAddressTab: React.Dispatch<SetStateAction<string>>;
}

const AddressBook: React.FunctionComponent<IAddressBookProps> = ({
  setAddressTab,
}) => {
  const [filterId, setFilterId] = useState(0);
  const [address, setAddress]: any = useState();
  const [activeTab, setActiveTab] = useState("pickup");
  const [loading, setLoading] = useState(false);

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
      name: address?.contact?.name,
      phoneNumber:
        address?.contact?.mobileNo || address?.contact?.alternateMobileNo || "",
    };
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      const { data: allAddressData }: any = await POST(
        filterId === 0 ? GET_PICKUP_ADDRESS : GET_DELIVERY_ADDRESS
      );
      if (allAddressData?.success) {
        setAddress(allAddressData.data);
        setLoading(false);
      } else {
        toast.error(allAddressData?.message);
        setAddress([]);
        setLoading(false);
      }
    })();
  }, [filterId]);

  const filterComponent = (className?: string) => {
    return (
      <div className="flex  mt-6">
        <div
          className={`flex text-[14px] text-[#777777] font-medium h-[44px] cursor-pointer`}
        >
          {filterData?.map((singleData, index) => {
            return (
              <span
                key={index}
                className={`flex items-center py-[8px] px-[16px] border-[1px] border-[#A4A4A4] ${
                  filterId === index
                    ? `${
                        index === filterData.length - 1
                          ? "rounded-r-md"
                          : "rounded-l-md"
                      } bg-[#D2D2D2] font-medium text-[#1C1C1C]`
                    : ""
                }`}
                onClick={() => {
                  setFilterId(index);
                  if (index === 0) {
                    setAddressTab("pickup");
                    setActiveTab("pickup");
                  } else if (index === 1) {
                    setAddressTab("delivery");
                    setActiveTab("delivery");
                  }
                }}
              >
                {singleData.label}
              </span>
            );
          })}
        </div>
        {/* <div className="ml-2 w-[265px]">
          <CustomDropDown
            value=""
            onChange={() => {}}
            options={[
              {
                label: "Domestic",
                value: "Domestic",
              },
              {
                label: "International",
                value: "International",
              },
            ]}
            selectClassName="rounded-md bg-[#FEFEFE] !h-[45px]"
          />
        </div> */}
      </div>
    );
  };

  return (
    <>
      {loading ? (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Spinner />
        </div>
      ) : (
        <div>
          {filterComponent()}
          {/* Display Address */}
          {/* <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-0 mt-4"> */}
          <div className="flex gap-3 mt-4  flex-wrap">
            {address?.map((data: any, index: any) => {
              return (
                <AddressCard
                  cardData={cardData(data)}
                  key={index}
                  addressData={data}
                  activeTab={activeTab}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default AddressBook;
