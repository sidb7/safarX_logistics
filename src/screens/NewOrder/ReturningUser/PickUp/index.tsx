import LocationIcon from "../../../../assets/PickUp/Location.svg";
import CustomPickupLocation from "./customPickupLocation";
import EditIcon from "../../../../assets/PickUp/Edit.svg";
import PlusIcon from "../../../../assets/ReturningUser/plusIcon.svg"
import ProfileIcon from "../../../../assets/ReturningUser/profileIcon.svg";
import CustomContact from "./customContact";
import PhoneIcon from "../../../../assets/ReturningUser/phoneIcon.svg";
import DatePicker from "../../../../components/Datepicker/customDatePicker";
import Switch from "react-switch";
import { useState } from "react";
import {customContactData} from "../../../../utils/dummyData";
import {customPickUpData} from "../../../../utils/dummyData";
import {useNavigate} from "react-router-dom"

const ReturningPickUp = () => {
    const [toggleStatus, setToggleStatus] = useState(false);
    const navigate = useNavigate();

    const handleNavgigate = () => {
        navigate("/neworder/pickup")
    }
    return(
        <div>
             <div className="inline-flex space-x-2 items-center justify-start px-5">
                <img src={LocationIcon} alt="" />

                <p className="text-lg font-semibold text-center text-gray-900">
                Pickup location
                </p>
                
            </div>
            
            <CustomPickupLocation props={customPickUpData}/>
            
            <div className="flex justify-between mx-5">
                <div className="flex items-center gap-x-2 mt-2"  onClick={handleNavgigate}><img src={PlusIcon} alt="" /><span className="text-[#004EFF] text-[14px] w-[240px]">ADD ADDRESS</span></div>
                <p className="mt-2 border-b-2 border-[#004EFF] text-[#004EFF] text-[14px]">CHANGE</p>
            </div>
            <div className="flex items-center mt-8 mx-5 gap-x-2">
                <img src={ProfileIcon} alt="" />
                <p>Contact</p>
            </div>
            
            <CustomContact props={customContactData}/>
             <div className="flex justify-between mx-5">
                <div className="flex items-center gap-x-2 mt-2"><img src={PlusIcon} alt="" /><span className="text-[#004EFF] text-[14px] w-[240px]">ADD CONTACT</span></div>
                <p className="mt-2 border-b-2 border-[#004EFF] text-[#004EFF] text-[14px]">CHANGE</p>
            </div>
            <div className="mx-5 mt-6">
                <DatePicker />
            </div>
            <div className="mx-5 mt-5 mb-5">
          <div className="flex flex-col">
            <div
              className={`grid grid-cols-2 p-2 ${
                toggleStatus
                  ? "bg-[#E8E8E8] rounded-tr-lg rounded-tl-lg border-[1px]"
                  : "shadow-md rounded "
              }`}
            >
              <h1 className="self-center justify-start text-[14px] font-semibold text-[#1C1C1C] ">
                Custom Branding
              </h1>
              <div className="flex justify-end items-center gap-x-1">
                {toggleStatus && <img src={EditIcon} alt="" />}
                <Switch
                  onChange={() => {
                    if (toggleStatus === true) setToggleStatus(false);
                    else setToggleStatus(true);
                  }}
                  checked={toggleStatus}
                />
                <p
                  className={`${
                    toggleStatus ? "text-[#7CCA62]" : "text-[#F35838]"
                  } font-semibold text-[14px] `}
                >
                  {toggleStatus ? "ACTIVE" : "DEACTIVE"}
                </p>
              </div>
            </div>
            {toggleStatus && (
              <div className="grid grid-cols-2 grid-rows-2 gap-2 border-[1px] border-[#E8E8E8] rounded-bl-lg rounded-br-lg p-2">
                <div className="flex flex-col border-r-[2px] border-r-[#E8E8E8] ">
                  <p className="text-[10px] text-[#777777] font-normal ">
                    Brand Name and Logo
                  </p>
                  <h1 className="font-semibold text-[12px] text-[#1C1C1C] ">
                    User Detail
                  </h1>
                </div>

                <div className="flex flex-col">
                  <p className="text-[10px] text-[#777777] font-normal">
                    Contact Name
                  </p>
                  <h1 className="font-semibold text-[12px] text-[#1C1C1C]">
                    User Detail
                  </h1>
                </div>

                <div className="flex flex-col border-r-[2px] border-r-[#E8E8E8]">
                  <p className="text-[10px] text-[#777777] font-normal">
                    Brand Address
                  </p>
                  <h1 className="font-semibold text-[12px] text-[#1C1C1C]">
                    User Detail
                  </h1>
                </div>

                <div className="flex flex-col">
                  <p className="text-[10px] text-[#777777] font-normal">
                    Contact Number
                  </p>
                  <h1 className="font-semibold text-[12px] text-[#1C1C1C]">
                    User Detail
                  </h1>
                </div>
              </div>
            )}
          </div>
            </div>
        </div>
    )
}
export default ReturningPickUp;