import Checkbox from "../../../../components/CheckBox";
import CargoRating from "../../../../assets/Delivery/CargoRating.gif";
import DroneDelivery from "../../../../assets/Delivery/DroneDelivery.svg";
import { useState } from "react";
import CustomDelivery from "./customDelivery";
import {customContactData, customDeliveryData} from "../../../../utils/dummyData";
import PlusIcon from "../../../../assets/ReturningUser/plusIcon.svg";
import ProfileIcon from "../../../../assets/ReturningUser/profileIcon.svg";
import CustomContact from "../PickUp/customContact";
import {useNavigate} from "react-router-dom";
import DatePicker from "../../../../components/Datepicker/customDatePicker";

const ReturningDelivery = () => {
    const [selectRecipient, setSelectRecipient] = useState({
        business: true,
        consumer: false,
      });
      const navigate = useNavigate();
      const handleNavgigate = () => {
        navigate("/neworder/delivery")
    }
    return(
        <div >
            <div className="relative z-1 mt-5   border-[1px] h-[230px] rounded border-[#EAEAEA] bg-[#FFFFFF] drop-shadow-xl px-4 pt-[40px] pb-[8px] mx-5">
                <div className="grid grid-cols-2 gap-3 ">
                <div
                    className={`relative z-1  border-[1px] rounded ${
                    selectRecipient.business === true
                        ? "border-[#1C1C1C]"
                        : "border-[#EAEAEA]"
                    } bg-[#FEFEFE] h-[150px]  p-5 cursor-pointer`}
                    onClick={() =>
                    setSelectRecipient({ business: true, consumer: false })
                    }
                >
                    <img
                    src={CargoRating}
                    alt="Cargo Rating"
                    className="h-[100%] w-[100%] object-contain"
                    />
                    <div className="flex flex-row  items-center gap-2 absolute z-2 -top-3 bg-[#FEFEFE]">
                    {selectRecipient.business && (
                        <Checkbox
                        checked={selectRecipient.business === true ? true : false}
                        />
                    )}
                    <p className="bg-white">Business</p>
                    </div>
                </div>
                <div
                    className={`relative z-1  border-[1px] rounded  bg-[#FEFEFE] h-[150px] ${
                    selectRecipient.consumer === true
                        ? "border-[#1C1C1C]"
                        : "border-[#EAEAEA]"
                    }  p-5 cursor-pointer`}
                    onClick={() =>
                    setSelectRecipient({ business: false, consumer: true })
                    }
                >
                    <img
                    src={DroneDelivery}
                    alt="Drone Delivery"
                    className="h-[100%] w-[100%] object-contain"
                    />
                    <div className="flex flex-row absolute z-2 -top-3 items-center gap-2 bg-[#FEFEFE]">
                    {selectRecipient.consumer && (
                        <Checkbox
                        checked={selectRecipient.consumer === true ? true : false}
                        />
                    )}
                    <p className="bg-white">Consumer</p>
                    </div>
                </div>
                </div>
                <p className="absolute z-2 -top-3 left-5 bg-[#00AEEF] rounded-lg w-[90px] px-[13px] py-[4px] text-[#FFFFFF] ">
                Recipient
                </p>
            </div>
            <div className="mx-5">
                <CustomDelivery props={customDeliveryData}/>
            </div>
            <div className="flex justify-between mx-5">
                <div className="flex items-center gap-x-2 mt-2"  onClick={handleNavgigate}><img src={PlusIcon} alt="" /><span className="text-[#004EFF] text-[14px] w-[240px]">ADD ADDRESS</span></div>
                <p className="mt-2 border-b-2 border-[#004EFF] text-[#004EFF] text-[14px]">CHANGE</p>
            </div>
            <div className="flex items-center mt-5 mx-5">
                <Checkbox />
                <p className="text-[#004EFF] text-[14px] font-medium">INCLUDE MY WAREHOUSE</p>
            </div>
            <div className="flex items-center mt-8  gap-x-2 mx-5">
                <img src={ProfileIcon} alt="" />
                <p className="font-medium">Contact</p>
            </div>
            <div>
                <CustomContact props={customContactData} />
            </div>
            <div className="flex justify-between mx-5">
                <div className="flex items-center gap-x-2 mt-2"  onClick={handleNavgigate}><img src={PlusIcon} alt="" /><span className="text-[#004EFF] text-[14px] w-[240px]">ADD ADDRESS</span></div>
                <p className="mt-2 border-b-2 border-[#004EFF] text-[#004EFF] text-[14px]">CHANGE</p>
            </div>
            <div className="mx-5 my-5">
                <DatePicker />
            </div>
            
        </div>
    )
}
export default ReturningDelivery;