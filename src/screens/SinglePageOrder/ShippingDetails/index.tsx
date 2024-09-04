import React, { useEffect, useState } from "react";
import CourierIcon from "../../../assets/Menu.svg";
import CustomRadioButton from "../../../components/RadioButton/Index";
import CustomDropDown from "../../../components/DropDown";
import { Spinner } from "../../../components/Spinner";
import VanIcon from "../../../assets/vanWithoutBG.svg";
import { POST } from "../../../utils/webService";
import downArrow from "../../../assets/downwardArrow.svg";
import {
  GET_AVAILABLE_SERVICES_FOR_SINGLEORDER,
  POST_SERVICEABILITY,
} from "../../../utils/ApiUrls";
import toast from "react-hot-toast";
import { capitalizeFirstLetter } from "../../../utils/utility";
import CustomSearchDropDown from "../components/CustomSearchDropDown";
import CustomSearchBoxForService from "../components/CustomDropDownForService";
import { useMediaQuery } from "react-responsive";
import Accordian from "../components/accordian";

interface IIndexProps {
  order?: any;
  setOrder?: any;
  setSortServiciblity: any;
  sortServiceiblity: any;
  showDownloadLebal: any;
  setShowPickupDate: any;
  resetOtherAddressDetails: any;
  setResetOtherAddressDetails: any;
  setHighLightField: any;
  highLightField: any;
}

const Index: React.FunctionComponent<IIndexProps> = ({
  order,
  setOrder,
  setSortServiciblity,
  sortServiceiblity,
  showDownloadLebal,
  setShowPickupDate,
  resetOtherAddressDetails,
  setResetOtherAddressDetails,
  setHighLightField,
  highLightField,
}: IIndexProps) => {
  const isLgScreen = useMediaQuery({ query: "(min-width: 1024px)" });
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
      <div
        className={`border-[1px] ${
          highLightField?.shippingDetails
            ? "border-[#004EFF]"
            : "border-[#E8E8E8]"
        } rounded-md`}
      >
        <Accordian
          headerChild={
            <div className="flex w-[100%] items-center justify-between">
              <div>
                <span className="mx-2 font-bold font-Open">
                  {"Courier Options"}
                </span>
              </div>
              <div>
                <button className="mx-2">
                  <img src={downArrow} />
                </button>
              </div>
            </div>
          }
        >
          <div className={`px-3 py-4`}>
            <div className={`flex justify-between`}>
              <div className="flex gap-x-2 items-center">
                <img src={CourierIcon} alt="courierIcon" />
                <p
                  className={`${
                    !isLgScreen ? "text-[14px]" : "text-[16px]"
                  } text-[#1C1C1C] font-Open font-semibold leading-[20px] capitalize`}
                >
                  Courier Options
                </p>
              </div>
              <div
                className={`flex ${
                  !isLgScreen ? "gap-x-2" : "gap-x-4"
                } items-center`}
              >
                <div className="flex justify-center items-center">
                  <input
                    type="radio"
                    name="partners"
                    value="Cheapest"
                    className=" mr-2 w-[15px] cursor-pointer h-[15px]"
                    // disabled={true}
                    checked={sortServiceiblity === "Cheapest"}
                    onChange={(e: any) => {
                      setSortServiciblity(e.target.value);
                      setHighLightField({
                        addressDetails: false,
                        packageDetails: false,
                        shippingDetails: true,
                        orderDetails: false,
                        pickupTimeDetails: false,
                      });
                    }}
                  />
                  <span
                    className={`${
                      !isLgScreen
                        ? "text-[13px] font-normal"
                        : "text-sm font-Open font-semibold"
                    } leading-[18px] text-[#323232]`}
                  >
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
                  <span
                    className={`${
                      !isLgScreen
                        ? "text-[13px] font-normal"
                        : "text-sm font-Open font-semibold"
                    } leading-[18px] text-[#323232]`}
                  >
                    Fastest
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 gap-y-4">
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
                  setShowPickupDate={setShowPickupDate}
                  resetOtherAddressDetails={resetOtherAddressDetails}
                  setResetOtherAddressDetails={setResetOtherAddressDetails}
                />
              </div>
            </div>
          </div>
        </Accordian>
      </div>
    </>
  );
};

export default Index;
