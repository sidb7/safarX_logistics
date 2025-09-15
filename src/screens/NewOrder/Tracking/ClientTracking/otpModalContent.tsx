import { useState, useEffect, useRef } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { POST } from "../../../../utils/webService";
import toast from "react-hot-toast";
import sessionManager from "../../../../utils/sessionManager";
import { VERIFY_GEN_OTP } from "../../../../utils/ApiUrls";

export default function OtpVerificationModalContent({
  phoneNumber,
  handleTrackOrderByOrderId,
  setOtpModalOpen,
  handleSendOtp,
  resendOtp,
  setResendOtp,
  timer,
  setTimer,
  setToken,
  trackingNo,
}: any) {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  // countdown effect
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t: any) => t - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setResendOtp(true);
    }
  }, [timer, resendOtp]);

  const onVerify = async (otpNumber: string) => {
    try {
      const body = {
        mobileNo: phoneNumber,
        otp: otpNumber,
        eventName: "BUYER_TRACK_OTP",
        userType: "BUYER",
        awb: trackingNo,
      };

      const { data } = await POST(VERIFY_GEN_OTP, body);

      if (!data?.success) {
        throw new Error(data?.message || "OTP verification failed");
      }
      const buyerPayload = JSON.stringify({
        token: data?.token,
        mobileNo: phoneNumber,
      });
      sessionStorage.setItem("buyerJwt", buyerPayload);
      setToken(data?.token);
      toast.success(data.message);
      setOtpModalOpen(false);

      await handleTrackOrderByOrderId();
    } catch (error: any) {
      console.error("OTP Verification error:", error);

      toast.error(error?.message || "OTP verification failed");
      setOtp(Array(6).fill(""));

      // focus first input
      inputRefs.current?.[0]?.focus();
    }
  };

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: any, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "Enter" && !otp.some((d) => d === "")) {
      onVerify(otp.join(""));
    }
  };

  const formattedTime = `${String(Math.floor(timer / 60)).padStart(
    2,
    "0"
  )}:${String(timer % 60).padStart(2, "0")}`;

  return (
    <div className="fixed inset-0 flex items-center justify-center px-3">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          {/* <button onClick={() => setOtpModalOpen(false)}>
            <BsArrowLeft className="w-6 h-6 text-gray-600" />
          </button> */}
          <h2 className="text-lg md:text-xl font-bold text-gray-800 flex-1 text-center">
            OTP Verification
          </h2>
        </div>

        {/* Instruction */}
        <p className="text-center text-sm md:text-base text-gray-600 mb-6">
          We’ve sent a 6-digit code to{" "}
          <b>
            +91-{phoneNumber.slice(0, 3)}*****{phoneNumber.slice(-2)}
          </b>
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-6 flex-wrap">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`w-10 h-10 sm:w-12 sm:h-12 md:w-12 md:h-12 text-center text-lg border ${
                otp.some((d) => d === "")
                  ? "border-gray-300"
                  : "border-blue-500"
              }  !rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          ))}
        </div>

        {/* Button */}
        <div className="w-full flex justify-center">
          <button
            disabled={otp.some((d) => d === "")}
            onClick={() => onVerify(otp.join(""))}
            className={`w-full sm:w-52 py-2 rounded-full font-medium transition ${
              otp.some((d) => d === "")
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-600 text-white hover:bg-gray-700"
            }`}
          >
            Verify & Continue
          </button>
        </div>

        {/* Resend */}
        {resendOtp ? (
          <div className="w-full flex justify-center">
            <div
              onClick={() => {
                handleSendOtp();
              }}
              className="text-center text-xs sm:text-sm w-fit text-blue-500 mt-4 cursor-pointer hover:underline"
            >
              Resend OTP
            </div>
          </div>
        ) : (
          <p className="text-center text-xs sm:text-sm text-gray-500 mt-4">
            Resend OTP in {formattedTime}
          </p>
        )}
      </div>
    </div>
  );
}
