import React, { useEffect, useState } from "react";
import { POST } from "../../utils/webService";
import {
  POST_VERIFY_AADHAR_URL,
  POST_VERIFY_GST_URL,
} from "../../utils/ApiUrls";
import { toast } from "react-hot-toast";

interface IProps {
  sec?: any;
  routeCheck?: boolean;
  setOTPNumber?: any;
}

const TimerCounter = (props: IProps) => {
  const { sec, routeCheck, setOTPNumber } = props;
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(sec);
  const [businessType, setBusinessType] = useState<any>();
  const [clientId, setClientId] = useState<any>();
  const [aadharNumber, setAadharNumber] = useState<any>();
  const [gstNumber, setGstNumber] = useState<any>();
  const [clickedOnce, setClickedOnce] = useState<any>(false);

  useEffect(() => {
    let btype = localStorage.getItem("businessType");
    let atype = localStorage.getItem("aadharNumber");
    let gtype = localStorage.getItem("gstNumber");

    setBusinessType(btype);
    setAadharNumber(atype);
    setGstNumber(gtype);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          setClickedOnce(false);
          clearInterval(interval);
        } else {
          setSeconds(sec);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const resentAadharOtp = async () => {
    try {
      const payload = { adhaar_no: aadharNumber };

      const { data: response } = await POST(POST_VERIFY_AADHAR_URL, payload);
      if (response?.success) {
        toast.success("Aadhar OTP Resent Successfully");
        setOTPNumber("");
        setMinutes(0);
        setSeconds(sec);
        localStorage.setItem("client_id", response.data.data.client_id);
        setClientId(response.data.data.client_id);
        localStorage.setItem("client_id", response.data[0].data.client_id);
      } else {
        setClickedOnce(false);
        toast.error("Aadhar OTP Resent Failed!");
      }
    } catch (error) {
      return error;
    }
  };

  const resentGstOtp = async () => {
    try {
      const payload = { gstIn: gstNumber };

      const { data: response } = await POST(POST_VERIFY_GST_URL, payload);

      if (response?.success) {
        toast.success("GST OTP Resent Successfully");
        setOTPNumber("");
        localStorage.setItem("client_id", response.data[0].data.client_id);
        setClientId(response.data[0].data.client_id);
        setMinutes(0);
        setSeconds(sec);
      } else {
        setClickedOnce(false);
        toast.error("GST Verification Failed!");
      }
    } catch (error) {
      return error;
    }
  };

  const resendOtp = async () => {
    setClickedOnce(true);
    if (
      businessType === "individual" ||
      (businessType === "business" && routeCheck === true)
    ) {
      {
        resentAadharOtp();
      }
    } else {
      {
        resentGstOtp();
      }
    }
  };

  const resendOtpTimer = () => {
    console.log("resend timer");
    const minute = minutes < 10 ? `0${minutes}` : minutes;
    const second = seconds < 10 ? `0${seconds}` : seconds;

    if (seconds > 0 || minutes > 0) {
      return (
        <>
          {minute} : {second} sec
        </>
      );
    }
  };

  return (
    <>
      {seconds !== 0 && (
        <p className="font-semibold font-Open text-[12px] text-[#494949] self-center">
          {resendOtpTimer()}
        </p>
      )}

      <div className="flex items-center gap-x-2 font-normal text-[12px] self-center">
        <p className="text-[#494949] font-Open font-normal text-xs leading-4">
          {!clickedOnce && <span>Didn't Receive Code ?</span>}
          <span
            className={`mx-1 text-[#004EFF] text-[12px] font-extrabold leading-5  ${
              seconds > 0 || (seconds > 0 && minutes === 0)
                ? "text-[#8e8e8e] cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={() => {
              if (seconds === 0 && minutes === 0) {
                resendOtp();
              }
            }}
          >
            {!clickedOnce && <span>Resend</span>}
          </span>
        </p>
      </div>
    </>
  );
};

export default TimerCounter;
