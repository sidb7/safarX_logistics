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
  setReschedulingModal?: () => void;
  awb?: any;
};

const ReschedulingModal = ({
  reschedulingModal,
  setReschedulingModal,
  awb,
}: Props) => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<any>(null);

  const handleNavigationandModal = async () => {
    const token = sessionStorage.getItem(`${awb}`);
    try {
      const payload = {
        altno: "",
        rescheduleTime: "",
        buyerRemark: "Want to reschedule the order",
        requestType: "CANCEL",
        awb,
      };

      const data = await POSTHEADER(UPDATETRACKINGBYBUYER, payload, { token });
      console.log("data12457", data?.data?.message);
      if (data?.data?.success) {
        toast.success(data?.data?.message);
        navigate("/tracking");
        setReschedulingModal && setReschedulingModal();
      } else {
        toast.error(data?.data?.message);
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
          setReschedulingModal && setReschedulingModal();
        }}
        className="h-[550px] w-[650px]"
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
                setReschedulingModal && setReschedulingModal();
              }}
            />
          </div>

          {/*Body Section */}
          <div className="flex flex-col items-center justify-center mt-20 w-[600px]">
            <p className="text-[22px] font-Lato  mx-28 text-center font-semibold">
              {TrackingJson?.trackingJson?.reschedule?.message1}
            </p>
            <p className="text-[16px] open-sans mt-2  mx-28 text-center font-semibold">
              {TrackingJson?.trackingJson?.reschedule?.message2}
            </p>
          </div>
          <div className="flex justify-center mt-10">
            <DatePicker
              selected={startDate}
              onChange={(date: any) => setStartDate(date)}
              isClearable={true}
              customInput={
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 h-12 rounded-md border border-gray-400 min-w-[226px] w-[412px]"
                >
                  <img src={dateIcon} alt="Calendar Icon" className="mr-2" />

                  <p className="text-center text-primary-100 font-openSans text-[12px] font-normal leading-5">
                    {startDate
                      ? startDate.toLocaleDateString()
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
