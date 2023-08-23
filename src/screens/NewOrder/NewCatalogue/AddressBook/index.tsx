import React, { useState } from "react";
import AddressCard from "./addressCard";
import CustomDropDown from "../../../../components/DropDown";

const cardData = {
  addressLabel: "Warehouse Mumbai",
  address:
    "Plot No 12, sector 8, Western express way Andheri, Mumbai, Maharastra 4220112",
  name: "Navin",
  phoneNumber: "+91 12345 12345",
};

const AddressBook = () => {
  const [filterId, setFilterId] = useState(0);

  const [filterData, setFilterData] = useState([
    { label: "Pickup Address", isActive: false },
    { label: "Deliery Address", isActive: false },
  ]);

  const filterComponent = (className?: string) => {
    return (
      <div className="flex  mt-6">
        <div className={`flex text-[14px] text-[#777777] font-medium h-[44px]`}>
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
      <div className="grid grid-cols-3 gap-y-6 gap-x-0 mt-4">

        <AddressCard cardData={cardData} key="132213" />
        <AddressCard cardData={cardData} key="132213" />
        <AddressCard cardData={cardData} key="132213" />
        <AddressCard cardData={cardData} key="132213" />
      </div>
    </div>
  );
};

export default AddressBook;
