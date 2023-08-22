import NavBar from "../../../../layout/NavBar";
import BackArrow from "../../../assets/backArrow.svg";
import CustomButton from "../../../../components/Button";
import { useState } from "react";
import { pickupAddress, deliveryAddress } from "../../../../utils/dummyData";
import CustomPickUpAddress from "../customPickUpAddress";
import CustomDeliveryAddress from "../customDeliveryAddress";
import ServiceButton from "../../../../components/Button/ServiceButton";
import { useNavigate } from "react-router-dom";
import CustomDropDown from "../../../../components/DropDown";
import { useSelector, useDispatch } from "react-redux";
import { addressBtnName } from "../../../../redux/reducers/catalogue";
// import DownloadIcon from "../../../assets/Label/download.svg";

const AddressBook = () => {
  const navigate = useNavigate();
  const catalogueState = useSelector((state: any) => state?.catalogue);
  const dispatch = useDispatch();

  const [filterId, setFilterId] = useState(-1);
  const [statusAddress, setStatusAddress] = useState("pickup_address");

  return (
    <div>
      <div className="flex ml-5 overflow-x-scroll cursor-pointer  whitespace-nowrap mt-5 h-[48px]">
        <div
          className={`flex items-center border-solid border-2 border-[#E8E8E8] rounded-l px-4 ${
            catalogueState?.addressBtnName === "Pickup Address"
              ? " !bg-[#F6F6F6] !border-[#D2D2D2]"
              : ""
          }`}
          onClick={() => dispatch(addressBtnName("Pickup Address"))}
        >
          <span
            className={`text-[#777] text-[14px] ${
              catalogueState?.addressBtnName === "Pickup Address"
                ? "!text-[#1C1C1C]"
                : ""
            }`}
          >
            Pickup Address
          </span>
        </div>
        <div
          className={`flex items-center border-solid border-2 cursor-pointer border-[#E8E8E8] rounded-r px-4 ${
            catalogueState?.addressBtnName === "Delivery Address"
              ? " !bg-[#F6F6F6] !border-[#D2D2D2]"
              : ""
          }`}
          onClick={() => dispatch(addressBtnName("Delivery Address"))}
        >
          <span
            className={`text-[#777] text-[14px] ${
              catalogueState?.addressBtnName === "Delivery Address"
                ? "!text-[#1C1C1C]"
                : ""
            }`}
          >
            Delivery Address
          </span>
        </div>
        <div className="ml-2  w-[265px]">
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
      {catalogueState?.addressBtnName === "Pickup Address" && (
        <div className="mt-6">
          <CustomPickUpAddress props={pickupAddress} />
        </div>
      )}
      {catalogueState?.addressBtnName === "Delivery Address" && (
        <div className="mt-6">
          <CustomDeliveryAddress props={deliveryAddress} />
        </div>
      )}
    </div>
  );
};
export default AddressBook;
