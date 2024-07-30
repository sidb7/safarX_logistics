import React, { useEffect, useState } from "react";
import CourierIcon from "../../../assets/Menu.svg";
import CustomRadioButton from "../../../components/RadioButton/Index";
import CustomDropDown from "../../../components/DropDown";
import { Spinner } from "../../../components/Spinner";
import DownArrowIcon from "../../../assets/Filter/downArrow.svg";
import VanIcon from "../../../assets/vanWithoutBG.svg";
import { POST } from "../../../utils/webService";
import {
  GET_AVAILABLE_SERVICES_FOR_SINGLEORDER,
  POST_SERVICEABILITY,
} from "../../../utils/ApiUrls";
import toast from "react-hot-toast";
import { capitalizeFirstLetter } from "../../../utils/utility";
import CustomSearchDropDown from "../components/CustomSearchDropDown";
import CustomSearchBoxForService from "../components/CustomDropDownForService";

interface IIndexProps {
  order?: any;
  setOrder?: any;
  setSortServiciblity: any;
  sortServiceiblity: any;
  showDownloadLebal: any;
}

const Index: React.FunctionComponent<IIndexProps> = ({
  order,
  setOrder,
  setSortServiciblity,
  sortServiceiblity,
  showDownloadLebal,
}: IIndexProps) => {
  function validateForServicebility(order: any) {
    const pickupDetailsValid =
      order.pickupDetails.fullAddress.trim() !== "" &&
      order.pickupDetails.pincode !== 0 &&
      order.pickupDetails.contact.name.trim() !== "" &&
      order.pickupDetails.contact.mobileNo !== 0;

    const deliveryDetailsValid =
      order.deliveryDetails.fullAddress.trim() !== "" &&
      order.deliveryDetails.pincode !== 0 &&
      order.deliveryDetails.contact.name.trim() !== "" &&
      order.deliveryDetails.contact.mobileNo !== 0;

    const boxInfoValid =
      Array.isArray(order?.boxInfo) && order?.boxInfo.length > 0;

    return pickupDetailsValid && deliveryDetailsValid && boxInfoValid;
  }

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
          <div className="flex gap-x-4 items-center">
            <div className="flex justify-center items-center">
              <input
                type="radio"
                name="partners"
                value="Cheapest"
                className=" mr-2 w-[15px] cursor-pointer h-[15px]"
                // disabled={true}
                checked={sortServiceiblity === "Cheapest"}
                onChange={(e: any) => setSortServiciblity(e.target.value)}
              />
              <span className="font-semibold text-sm font-Open leading-[18px] text-[#323232]">
                Cheapest
              </span>
            </div>
            <div
              className="flex justify-center items-center "
              title="comming soon"
            >
              <input
                type="radio"
                name="partners"
                value="Fastest"
                className=" mr-2 w-[15px] cursor-pointer h-[15px]"
                disabled={true}
                checked={sortServiceiblity === "Fastest"}
                onChange={(e: any) => setSortServiciblity(e.target.value)}
              />
              <span className="font-semibold text-sm font-Open leading-[18px] text-[#323232]">
                Fastest
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div>
            <CustomSearchBoxForService
              value={""}
              initValue={""}
              sortIdentifier={sortServiceiblity}
              className={""}
              apiUrl={GET_AVAILABLE_SERVICES_FOR_SINGLEORDER}
              label={"Select Service"}
              state={order}
              setFunc={setOrder}
              disabled={!validateForServicebility(order)}
              showDownloadLebal={showDownloadLebal}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
