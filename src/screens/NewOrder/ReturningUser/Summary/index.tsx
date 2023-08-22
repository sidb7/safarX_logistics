import React from "react";
import ServiceButton from "../../../../components/Button/ServiceButton";

import contactIcon from "../../../../assets/serv/contact.svg";

import locationIcon from "../../../../assets/serv/location.svg";

import phoneIcon from "../../../../assets/serv/phone.svg";
import editIcon from "../../../../assets/serv/edit.svg";

import SummaryAddressBox from "../../../../screens/NewOrder/Summary/summaryAddressBox";
import Product from "../../Summary/boxDetails";
import Service from "../../Summary/summaryService";
import DownloadIcon from "../../../../assets/Label/download.svg";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../../layout/Old_NavBar";
import BackArrowIcon from "../../../../assets/backArrow.svg";
import TickLogo from "../../../../assets/common/Tick.svg";
import Stepper from "../../../../components/Stepper";
import returningBill from "../../../../assets/ReturningUser/returningBill.svg";

const steps = [
  {
    label: "Pickup",
    isCompleted: true,
    isActive: false,
    imgSrc: TickLogo,
  },
  {
    label: "Delivery",
    isCompleted: true,
    isActive: false,
    imgSrc: TickLogo,
  },
  {
    label: "Product",
    isCompleted: true,
    isActive: false,
    imgSrc: TickLogo,
  },
  {
    label: "Service",
    isCompleted: false,
    isActive: true,
    imgSrc: TickLogo,
  },
  {
    label: "Payment",
    isCompleted: false,
    isActive: true,
    imgSrc: TickLogo,
  },
];

type Props = {};

const ReturningSummary = (props: Props) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="grid grid-cols-1 gap-y-5 p-0">
        <header className="fixed top-0 z-10 w-full ">
          <NavBar />
        </header>
        <div>
          <div className="inline-flex space-x-2 items-center justify-start px-5 mt-20">
            <img src={BackArrowIcon} alt="" />

            <p className="text-lg font-semibold text-center text-gray-900 ">
              Add new order
            </p>
          </div>
        </div>
        <div>
          <Stepper steps={steps} />
        </div>

        <div className="flex flex-row gap-2 mx-5">
          <img src={returningBill} alt="Summary Icon" />
          <p className="text-[18px] text-[#202427] font-semibold ">Summary</p>
        </div>
        <div className="flex flex-row justify-between items-center h-[48px] rounded  p-[10px] border-[1px] border-[#A4A4A4] mx-5">
          <p className="text-[12px] text-[#1C1C1C]">Generate order ID</p>
          <p className="text-[#004EFF] text-[14px] font-bold">AUTO GENERATE</p>
        </div>
        <div className="mx-5">
          <SummaryAddressBox
            locationImage={locationIcon}
            summaryTitle="Delivery Details"
            editImage={editIcon}
            locationImage2={locationIcon}
            summaryAddres="Door 12, sector 8, Shankar Nagar"
            city=" Andheri East, Mumbai 422011"
            profileImage={contactIcon}
            contactNumber="+91 12345 12345"
            contactImage={phoneIcon}
            contactName="Amith Sharma"
          />
        </div>
        <div className="mx-5">
          <SummaryAddressBox
            locationImage={locationIcon}
            summaryTitle="Pickup Details"
            editImage={editIcon}
            locationImage2={locationIcon}
            summaryAddres="Door 12, sector 8, Shankar Nagar"
            city=" Andheri East, Mumbai 422011"
            profileImage={contactIcon}
            contactNumber="+91 12345 12345"
            contactImage={phoneIcon}
            contactName="Amith Sharma"
          />
        </div>

        <div className="mx-5">
          <Product />
        </div>

        {/*Service */}
        <div className="mx-5 mb-28">
          <Service />
        </div>

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
              text="Pay ₹ 2000"
              className="bg-[#1C1C1C] text-[#FFFFFF]"
              onClick={() => {
                console.log(window.location.pathname);

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
    </div>
  );
};

export default ReturningSummary;
