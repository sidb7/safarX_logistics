import NavBar from "../../../layout/Old_NavBar";
import BackArrow from "../../../assets/backArrow.svg";
import CustomButton from "../../../components/Button";
import { useState } from "react";
import { pickupAddress, deliveryAddress } from "../../../utils/dummyData";
import CustomPickUpAddress from "./customPickUpAddress";
import CustomDeliveryAddress from "./customDeliveryAddress";
import ServiceButton from "../../../components/Button/ServiceButton";
import { useNavigate } from "react-router-dom";
import DownloadIcon from "../../../assets/Label/download.svg";

const AddressBook = () => {
  const navigate = useNavigate();

  const [filterId, setFilterId] = useState(-1);
  const [statusId, setStatusId] = useState(-1);

  const [statusData, setStatusData] = useState([
    {
      statusName: "Pickup Address",
    },
    {
      statusName: "Delivery Address",
    },
  ]);

  const [filterData, setFilterData] = useState([
    { label: "Domestic", isActive: false },
    { label: "Hyperlocal", isActive: false },
    { label: "International", isActive: false },
  ]);
  return (
    <div>
      {/* <header className="fixed top-0 z-10 w-full">
                <NavBar />
            </header> */}
      <div className="mt-24 flex justify-between mx-5">
        <div className="flex gap-x-2 items-center">
          <img src={BackArrow} alt="" />
          <p className="w-[120px] font-semibold text-[18px]">Address Book</p>
        </div>
        <div className="flex items-center">
          <CustomButton
            text={"ADD ADDRESS"}
            className="!p-3"
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      </div>
      <div className="flex justify-center gap-x-2 overflow-x-scroll whitespace-nowrap mt-5 h-[34px]">
        {statusData?.map(({ statusName }, index) => {
          return (
            <div
              className={`flex justify-center items-center border-b-2 border-[#777777] px-4 ${
                statusId === index ? "!border-[#004EFF]" : ""
              }`}
              onClick={() => setStatusId(index)}
              key={index}
            >
              <span
                className={`text-[#777777] text-[14px] ${
                  statusId === index ? "!text-[#004EFF]" : ""
                }`}
              >
                {statusName}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center">
        <div className="flex  text-[14px] text-[#777777] font-medium mt-4 h-[44px]">
          {filterData?.map((singleData, index) => {
            return (
              <span
                className={`flex justify-center items-center py-[8px] px-[16px] border-[1px] border-[#A4A4A4] ${
                  filterId === index
                    ? "rounded-l-md bg-[#D2D2D2] font-medium text-[#1C1C1C]"
                    : ""
                }`}
                onClick={() => setFilterId(index)}
                key={index}
              >
                {singleData.label}
              </span>
            );
          })}
        </div>
      </div>
      {statusId === 0 ? (
        <div className="mt-6">
          <CustomPickUpAddress props={pickupAddress} />
        </div>
      ) : (
        <div className="mt-6">
          <CustomDeliveryAddress props={deliveryAddress} />
        </div>
      )}

      <footer className="w-full fixed  bottom-0 	">
        <div className="grid grid-cols-2  shadow-lg border-[1px]  bg-[#FFFFFF] gap-[32px] p-[24px] rounded-tr-[24px] rounded-tl-[24px] fixed w-full bottom-0">
          {window.location.pathname !== "/neworder/label" ? (
            <>
              <ServiceButton
                text="BACK"
                onClick={() => {
                  window.history.back();
                }}
              />
            </>
          ) : (
            <>
              <ServiceButton
                text="DOWNLOAD"
                icon={DownloadIcon}
                showIcon={true}
                className="!bg-[#F2F6FF] text-[#0066FF] border-none text-[14px] font-semibold "
              />
            </>
          )}

          <ServiceButton
            text="SAVE"
            className="bg-[#1C1C1C] text-[#FFFFFF]"
            onClick={() => {
              if (window.location.pathname === "/neworder/pickup") {
                navigate("/neworder/delivery");
              } else if (window.location.pathname === "/neworder/delivery") {
                navigate("/neworder/package");
              } else if (window.location.pathname === "/neworder/package") {
                navigate("/neworder/service");
              } else if (window.location.pathname === "/neworder/service") {
                navigate("/neworder/summary");
              } else if (window.location.pathname === "/neworder/summary") {
                navigate("/neworder/payment");
              }
            }}
          />
        </div>
      </footer>
    </div>
  );
};
export default AddressBook;
