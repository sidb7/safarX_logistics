import React, { useState, useEffect } from "react";
import BoxIcon from "../../../../assets/Catalogue/box.svg";
import PackageBox from "../../Product/PackageType/packageBox";
import { POST } from "../../../../utils/webService";
import {
  GET_SELLER_BOX_DETAILS,
  GET_COMPANY_BOX_DETAILS,
} from "../../../../utils/ApiUrls";
import { toast } from "react-toastify";
interface Props {}

const BoxCatalogue = (props: Props) => {
  const [filterId, setFilterId] = useState(0);
  const [filterData, setFilterData] = useState([
    { label: "Seller Box", isActive: false },
    { label: "Company Box", isActive: false },
  ]);
  const [boxDetails, setBoxDetails] = useState<any>();
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
                onClick={() => setFilterId(index)}
              >
                {singleData.label}
              </span>
            );
          })}
        </div>
      </div>
    );
  };

  useEffect(() => {
    (async () => {
      const { data: allAddressData }: any = await POST(
        filterId === 0 ? GET_SELLER_BOX_DETAILS : GET_COMPANY_BOX_DETAILS
      );
      if (allAddressData?.success) {
        setBoxDetails(allAddressData.data);
      } else {
        toast.error(allAddressData?.message);
        setBoxDetails([]);
      }
    })();
  }, [filterId]);

  return (
    <div>
      {filterComponent()}
      <div className="flex items-center mt-6 gap-x-2">
        <img src={BoxIcon} alt="" />
        <span className="font-bold font-Lato  text-lg lg:text-2xl text-[#323232] ">
          {filterId === 0 ? "Seller Box" : "Company Box"}
        </span>
      </div>

      <div className="flex overflow-x-scroll">
        <div className="flex  whitespace-nowrap overflow-x-scroll gap-x-4">
          {boxDetails?.map((data: any, index: any) => {
            return (
              // display package box
              <PackageBox
                key={index}
                packageType={data?.name}
                weight={data?.weight}
                dimension={`${data?.length} x ${data?.breadth} x ${data?.height} ${data?.measureUnit} `}
                boxType="White box"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BoxCatalogue;
