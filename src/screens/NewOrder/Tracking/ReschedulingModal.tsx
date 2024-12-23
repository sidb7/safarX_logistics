import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CenterModal from "../../../components/CustomModal/customCenterModal";
import CustomInputBox from "../../../components/Input/index";
import TrackingJson from "./tracking.json";
import CrossIcon from "../../../assets/CloseIcon.svg";
import ShipyaaroLogo from "../../../assets/Shipyaari_full_color rgb.svg";
import OneButton from "../../../components/Button/OneButton";
import "./datePicker.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dateIcon from "../../../assets/dateIcon.svg";
import { POSTHEADER } from "../../../utils/webService";
import { UPDATETRACKINGBYBUYER } from "../../../utils/ApiUrls";
import { toast } from "react-hot-toast";

type Props = {
  reschedulingModal?: any;
  setReschedulingModal?: (value: boolean) => void; // Allow a boolean argument
  awb?: any;
};

const ReschedulingModal = ({
  reschedulingModal,
  setReschedulingModal,
  awb,
}: Props) => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<any>(null);

  const formatDateToLocalString = (date: Date) => {
    const offset = date.getTimezoneOffset() * 60000; // Offset in milliseconds
    const localDate = new Date(date.getTime() - offset);
    return localDate.toISOString().split("T")[0]; // Format: YYYY-MM-DD
  };

  const handleNavigationandModal = async () => {
    const token = sessionStorage.getItem(`${awb}`);
    console.log("beforethefunctiuon", startDate);
    try {
      if (!startDate || startDate === null) {
        toast.error("Please select the date");
      }
      const dateOnly = formatDateToLocalString(startDate);
      console.log("Formatted dateOnly:", dateOnly);

      const payload = {
        altno: "",
        rescheduleTime: dateOnly, // Send formatted date string
        buyerRemark: "Want to reschedule the order",
        requestType: "RESCHEDULE",
        awb,
      };

      const data = await POSTHEADER(UPDATETRACKINGBYBUYER, payload, { token });

      if (data?.data?.success) {
        toast.success(data?.data?.message);
        navigate("/tracking");
        setStartDate(null);
        setReschedulingModal && setReschedulingModal(false);
      } else {
        toast.error(data?.data?.message);
        setReschedulingModal && setReschedulingModal(false);
        if (data?.data?.message === "Please Provide Your Token") {
          window.location.reload();
        }
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <CenterModal
        isOpen={reschedulingModal}
        onRequestClose={() => {
          // setReschedulingModal && setReschedulingModal();
          setReschedulingModal && setReschedulingModal(false);
        }}
        // className="h-[550px] w-[650px]"
        className="h-[500px] md:h-[500px] lg:h-[540px]  w-[340px] md:w-[520px] lg:w-[650px] "
      >
        <div className="relative h-full w-full">
          {/* Header Section */}
          <div className="flex justify-between my-4 shadow-md pb-4">
            <img
              className="my-auto ml-6 h-[30px] object-contain"
              src={ShipyaaroLogo}
              alt="Company Logo"
            />
            <img
              className="my-auto mr-6 cursor-pointer"
              src={CrossIcon}
              alt="Close"
              onClick={() => {
                // setReschedulingModal && setReschedulingModal();
                setReschedulingModal && setReschedulingModal(false);
              }}
            />
          </div>

          {/*Body Section */}
          <div className="flex flex-col items-center justify-center mt-20 w-full">
            <p className="text-[18px] md:text-[22px] font-Lato  mx-28 text-center font-semibold">
              {TrackingJson?.trackingJson?.reschedule?.message1}
            </p>
            <p className="text-[16px] open-sans mt-2  mx-28 text-center font-semibold">
              {TrackingJson?.trackingJson?.reschedule?.message2}
            </p>
          </div>
          <div className="flex justify-center mt-10">
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)} // Ensure the correct type
              isClearable={true}
              customInput={
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 h-12 rounded-md border border-gray-400 min-w-[226px] w-[260px] md:w-[300px] lg:w-[420px]"
                >
                  <img src={dateIcon} alt="Calendar Icon" className="mr-2" />
                  <p className="text-center text-primary-100 font-openSans text-[12px] font-normal leading-5">
                    {startDate
                      ? startDate.toLocaleDateString("en-GB") // Display in dd/MM/yyyy
                      : "Select a Date"}
                  </p>
                </button>
              }
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
            />
          </div>
          <div className="mx-28 mt-10">
            <OneButton
              text={"SUBMIT"}
              onClick={() => {
                handleNavigationandModal();
              }}
              variant="primary"
            />
          </div>
        </div>
      </CenterModal>
    </div>
  );
};

export default ReschedulingModal;
