import ShipIcon from "../../../assets/OrderDetails/ShipIcon.svg";
import ArrowDownIcon from "../../../assets/OrderDetails/ArrowDownIcon.svg";
import TildArrowIcon from "../../../assets/OrderDetails/TildArrowIcon.svg";
import ShareIcon from "../../../assets/OrderDetails/ShareIcon.svg";

import DimensionIcon from "../../../assets/OrderDetails/DimensionIcon.svg";
import DeliveryIcon from "../../../assets/OrderDetails/DeliveryIcon.svg";
import OrderIdIcon from "../../../assets/OrderDetails/OrderId.svg";
import SKUIcon from "../../../assets/OrderDetails/SKUIcon.svg";
import ShipyaariIdIcon from "../../../assets/OrderDetails/ShipyaariId.svg";

import GpsIcon from "../../../assets/OrderDetails/GpsIcon.svg";
import UserIcon from "../../../assets/OrderDetails/UserIcon.svg";
import PhoneIcon from "../../../assets/OrderDetails/PhoneIcon.svg";
import EditIcon from "../../../assets/OrderDetails/EditIcon.svg";
import RupeeIcon from "../../../assets/OrderDetails/RupeeIcon.png";
import CustomButton from "../../../components/Button";
import { Badge } from "../../../components/Badge";
import SuccessIcon from "../../../assets/Badge/SuccessIcon.svg";
import Collapsible from "react-collapsible";
import { useState } from "react";

export const OrderDetails = () => {
  const [onOpen, setOnOpen] = useState(false);

  const OrderDetailsBody = () => {
    return (
      <>
        <div className="flex flex-col gap-y-2 text-[12px] mt-4">
          <div className="flex">
            <img src={DimensionIcon} alt="" width="16px" />
            <span className="ml-1">Dimension: </span>
            <span className="ml-1 font-medium">15 x 15 x 15 cm</span>
          </div>
          <div className="flex">
            <img src={SKUIcon} alt="" width="16px" />
            <span className="ml-1">SKU: </span>
            <span className="ml-1 font-medium">GT87Y65F</span>
          </div>
          <div className="flex">
            <img src={OrderIdIcon} alt="" width="16px" />
            <span className="ml-1">Order ID: </span>
            <span className="ml-1 font-medium">1242425</span>
          </div>
          <div className="flex">
            <img src={ShipyaariIdIcon} alt="" width="16px" />
            <span className="ml-1">Shipyaari ID: </span>
            <span className="ml-1 font-medium">87832756185</span>
          </div>
          <div className="flex">
            <img src={DeliveryIcon} alt="" width="16px" />
            <span className="ml-1">Delivery Partner: </span>
            <span className="ml-1 font-medium">Delhivery</span>
          </div>
        </div>

        <div className="grid grid-cols-6 mt-4">
          <div className="flex">From</div>
          <div className="flex flex-col text-[12px] gap-y-2 cols-span-5 whitespace-nowrap font-medium">
            <div className="flex">
              <img src={GpsIcon} alt="" width="16px" />
              <span className="ml-1">Jhindal Warehouse</span>
            </div>
            <div className="flex">
              <span className="ml-1">
                Plot no.18, Sector 7, Link road, Andheri
              </span>
            </div>
            <div className="flex">
              <img src={UserIcon} alt="" width="16px" />
              <span className="ml-1">Satish Sharma</span>
            </div>
            <div className="flex">
              <img src={PhoneIcon} alt="" width="16px" />
              <span className="ml-1">
                <a href="tel: +919735327324">+91 9735327324</a>
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-6 mt-4">
          <div className="flex">To</div>
          <div className="flex flex-col text-[12px] gap-y-2 cols-span-5 whitespace-nowrap font-medium">
            <div className="flex">
              <img src={GpsIcon} alt="" width="16px" />
              <span className="ml-1">Jhindal Warehouse</span>
            </div>
            <div className="flex">
              <span className="ml-1">
                Plot no.18, Sector 7, Link road, Andheri
              </span>
            </div>
            <div className="flex">
              <img src={UserIcon} alt="" width="16px" />
              <span className="ml-1">Satish Sharma</span>
            </div>
            <div className="flex">
              <img src={PhoneIcon} alt="" width="16px" />
              <span className="ml-1">
                <a href="tel: +919735327324">+91 9735327324</a>
              </span>
            </div>
          </div>
        </div>

        <div className="my-4 w-[114px] ">
          <CustomButton
            className="bg-white !text-black border-2 border-[#A4A4A4]"
            text="EDIT"
            onClick={() => {}}
            showIcon={true}
            icon={EditIcon}
          />
        </div>
      </>
    );
  };

  return (
    <div className="relative mt-7 border-[1px] border-[#A4A4A4] rounded-md text-[14px] text-[#1C1C1C]">
      <div className="flex flex-col mx-4 mt-4 ">
        <Badge
          label="Sucess"
          icon={SuccessIcon}
          className="absolute -top-3.5 border-[#7CCA62] bg-[#F2FAEF] text-[#7CCA62]"
        />
        <div className="flex justify-between items-center mt-2">
          <div className="flex">
            <img src={ShipIcon} alt="" />
            <span className="ml-1 text-[12px] text-[#3371FF] ">ETA: </span>
            <span className="ml-1 text-[12px] text-[#004EFF] whitespace-nowrap ">
              02 Jun
            </span>
          </div>
          <div className="flex">
            {/* <img src={RupeeIcon} alt="Rupee" /> */}
            <span className="text-[12px] font-medium">2300 </span>
            <span className="ml-1 text-[12px] text-[#3371FF]">ONLINE</span>
            <img
              className="ml-1"
              src={ArrowDownIcon}
              alt=""
              onClick={() => {
                setOnOpen(!onOpen);
              }}
            />
          </div>
        </div>

        <div className="mt-2">
          <span className="font-medium">Mac book air + Air dopes</span>
        </div>

        <div className="flex justify-between my-2">
          <div className="flex">
            <span className="">Tracking ID : </span>
            <span
              className="ml-1 font-medium"
              onClick={() => navigator.clipboard.writeText("EK401324Y3453")}
            >
              EK401324Y3453
            </span>
          </div>
          <div className="flex">
            <img src={ShareIcon} alt="" />
            <img className="ml-1" src={TildArrowIcon} alt="" />
          </div>
        </div>

        <Collapsible open={onOpen} trigger="">
          {OrderDetailsBody()}
        </Collapsible>
      </div>
    </div>
  );
};
