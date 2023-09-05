import { useState } from "react";
import PlusIcon from "../../../../assets/ReturningUser/plusIcon.svg";
import ProfileIcon from "../../../../assets/ReturningUser/profileIcon.svg";
import LocationIcon from "../../../../assets/PickUp/Location.svg";
import { useNavigate } from "react-router-dom";
import PickupCard from "../PickUp/customCard";
import CustomCheckbox from "../../../../components/CheckBox";

const ReturningDelivery = () => {
  //   const [selectRecipient, setSelectRecipient] = useState({
  //     business: true,
  //     consumer: false,
  //   });
  const [returningAddress, setReturningAddress] = useState([
    {
      label: "Jhindal Warehouse",
      address: "Plot no. ICICI Bank, Andheri, Maharastra 422012",
    },
    {
      label: "Jhindal Warehouse",
      address: "Plot no. ICICI Bank, Andheri, Maharastra 422012",
    },
    {
      label: "Jhindal Warehouse",
      address: "Plot no. ICICI Bank, Andheri, Maharastra 422012",
    },
    {
      label: "Jhindal Warehouse",
      address: "Plot no. ICICI Bank, Andheri, Maharastra 422012",
    },
    {
      label: "Jhindal Warehouse",
      address: "Plot no. ICICI Bank, Andheri, Maharastra 422012",
    },
  ]);
  const [contactInfo, setContactInfo] = useState([
    {
      label: "Warehouse Associate",
      name: "Anish Sharma ",
      phoneNumber: "9969401238",
    },
    {
      label: "Warehouse Associate",
      name: "Anish Sharma ",
      phoneNumber: "9969401238",
    },
    {
      label: "Warehouse Associate",
      name: "Anish Sharma ",
      phoneNumber: "9969401238",
    },
    {
      label: "Warehouse Associate",
      name: "Anish Sharma ",
      phoneNumber: "9969401238",
    },
    {
      label: "Warehouse Associate",
      name: "Anish Sharma ",
      phoneNumber: "9969401238",
    },
  ]);
  const navigate = useNavigate();
  const handleNavgigate = () => {
    navigate("/neworder/delivery");
  };
  return (
    <div>
      <div className="inline-flex space-x-2 items-center justify-start px-5">
        <img src={LocationIcon} alt="" />

        <p className="font-Lato text-2xl font-normal leading-8 text-[#323232]">
          Your Top Delivery Address
        </p>
      </div>

      {/* address data  */}

      <div className="flex overflow-x-auto space-x-4 px-5 pt-5 pb-2">
        {returningAddress?.map((data: any, index: any) => {
          return <PickupCard cardData={data} key={index} />;
        })}
      </div>

      <div className="flex justify-between mx-5 mt-2">
        <div
          className="flex items-center gap-x-2 mt-2"
          onClick={handleNavgigate}
        >
          <img src={PlusIcon} alt="" />
          <span className="text-[#004EFF] text-[14px] w-[240px]">
            ADD ADDRESS
          </span>
        </div>
        <p className="mt-2 border-b-2 border-[#004EFF] text-[#004EFF] text-[14px]">
          CHANGE
        </p>
      </div>

      <div className="flex flex-row items-center mx-4 mt-2">
        <CustomCheckbox />
        <p className="text-[14px] font-medium uppercase leading-5 text-[#004EFF] lg:font-semibold font-Open">
          INCLUDE MY WAREHOUSE
        </p>
      </div>

      <div className="flex items-center mt-5 mx-5 gap-x-2">
        <img src={ProfileIcon} alt="" />
        <p className="font-Lato text-2xl font-normal leading-8 text-[#323232]">
          Your Top Delivery Address
        </p>
      </div>

      <div className="flex overflow-x-auto space-x-4 px-5 pt-5 pb-2">
        {contactInfo?.map((data: any, index: any) => {
          return <PickupCard cardData={data} key={index} />;
        })}
      </div>

      <div className="flex justify-between mx-5 mt-2">
        <div
          className="flex items-center gap-x-2 mt-2"
          onClick={handleNavgigate}
        >
          <img src={PlusIcon} alt="" />
          <span className="text-[#004EFF] text-[14px] w-[240px]">
            ADD CONTACT
          </span>
        </div>
        <p className="mt-2 border-b-2 border-[#004EFF] text-[#004EFF] text-[14px]">
          CHANGE
        </p>
      </div>
    </div>
  );
};
export default ReturningDelivery;
