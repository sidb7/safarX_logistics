import React, { useEffect, useState } from "react";
import CourierIcon from "../../../assets/Menu.svg";
import CustomRadioButton from "../../../components/RadioButton/Index";
import CustomDropDown from "../../../components/DropDown";
import { Spinner } from "../../../components/Spinner";
import DownArrowIcon from "../../../assets/Filter/downArrow.svg";
import VanIcon from "../../../assets/vanWithoutBG.svg";
import { POST } from "../../../utils/webService";
import { POST_SERVICEABILITY } from "../../../utils/ApiUrls";
import toast from "react-hot-toast";
import { capitalizeFirstLetter } from "../../../utils/utility";
import CustomSearchDropDown from "../components/CustomSearchDropDown";
import CustomSearchBoxForService from "../components/CustomDropDownForService";

interface IIndexProps {
  order?: any;
  setOrder?: any;
}

const Index: React.FunctionComponent<IIndexProps> = ({
  order,
  setOrder,
}: IIndexProps) => {
  const [courierServiceList, setCourierServiceList] = useState([
    {
      partnerServiceId: "4410b564",
      partnerServiceName: "DTDC-B2C",
      companyServiceId: "a07d01f5",
      companyServiceName: "ECONOMY",
      partnerName: "DTDC",
      serviceMode: "SURFACE",
      appliedWeight: 35,
      invoiceValue: 1000,
      collectableAmount: 1000,
      insurance: 0,
      base: 380,
      add: 285,
      variables: 0,
      cod: 35,
      tax: 126,
      total: 826,
      zoneName: "ZONE 1",
    },
    {
      partnerServiceId: "61c4e7bb",
      partnerServiceName: "ECOM_EXPRESS_SURFACE",
      companyServiceId: "a07d01f5",
      companyServiceName: "ECONOMY",
      partnerName: "ECOM EXPRESS",
      serviceMode: "SURFACE",
      appliedWeight: 35,
      invoiceValue: 1000,
      collectableAmount: 1000,
      insurance: 0,
      base: 435,
      add: 330,
      variables: 0,
      cod: 35,
      tax: 144,
      total: 944,
      zoneName: "ZONE 1",
    },
    {
      partnerServiceId: "e4cfcac0",
      partnerServiceName: "XPRESSBEES_SURFACE",
      companyServiceId: "a07d01f5",
      companyServiceName: "ECONOMY",
      partnerName: "XPRESSBEES",
      serviceMode: "SURFACE",
      appliedWeight: 35,
      invoiceValue: 1000,
      collectableAmount: 1000,
      insurance: 0,
      base: 441,
      add: 330,
      variables: 0,
      cod: 35,
      tax: 145.08,
      total: 951.08,
      zoneName: "ZONE 1",
    },
  ]);

  return (
    <>
      <div className="border-[1px] rounded-md px-4 py-[22px]">
        {/* header section  */}
        <div className="flex justify-between">
          <div className="flex gap-x-2 items-center">
            <img src={CourierIcon} alt="courierIcon" />
            <p className="text-[#1C1C1C] font-Open font-semibold text-[16px] leading-[20px] capitalize">
              Courier Options
            </p>
          </div>
          {/* <div className="flex gap-x-1 items-center">
            <CustomRadioButton
              name="singlePage"
              value="singlePage"
              //   checked={checked === "singlePage"}
              // defaultChecked=""
              onChange={() => {}}
              inputClassName="h-full m-2"
              //   style={{ accentColor: "black" }}
            />
            <span className="font-semibold text-sm font-Open leading-[18px] text-[#323232]">
              Cheapest
            </span>
            <CustomRadioButton
              name="singlePage"
              value="singlePage"
              //   checked={checked === "singlePage"}
              // defaultChecked=""
              onChange={() => {}}
              inputClassName="h-full m-2"
              //   style={{ accentColor: "black" }}
            />
            <span className="font-semibold text-sm font-Open leading-[18px] text-[#323232]">
              Fastest
            </span>
          </div> */}
        </div>
        <div className="mt-4">
          <div>
            <CustomSearchBoxForService
              value={""}
              initValue={""}
              className=""
              apiUrl={POST_SERVICEABILITY}
              label={"Select Service"}
              state={order}
              setFunc={setOrder}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
