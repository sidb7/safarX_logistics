import React, { useState } from "react";
import toast from "react-hot-toast";
import OneButton from "../../../../components/Button/OneButton";
import CustomInputBox from "../../../../components/Input";
import CenterModal from "../../../../components/CustomModal/customCenterModal";
import OtpVerificationModalContent from "./otpModalContent";
import { POST } from "../../../../utils/webService";
import { Spinner } from "../../../../components/Spinner";
import { SEND_GEN_OTP } from "../../../../utils/ApiUrls";
interface IPROPS {
  onClose: any;
  onSubmit: any;
}

const TrackOrderIdInput = ({
  handleTrackOrderByOrderId,
  setTrackingNo,
  trackingNo,
  buyerLoggedIn,
  loading,
  setToken,
  buyerMobileNo,
  setBuyerMobileNo,
}: any) => {
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [resendOtp, setResendOtp] = useState(false);
  const [timer, setTimer] = useState(150); // 2 min 30 sec
  const [otpLoading, setOtpLoading] = useState(false);

  const handleSendOtp = async () => {
    setOtpLoading(true);
    try {
      setResendOtp(false);
      setTimer(150);
      const body = {
        mobileNo: buyerMobileNo,
        eventName: "BUYER_TRACK_OTP",
        userType: "BUYER",
        orderId: trackingNo,
      };

      const { data } = await POST(SEND_GEN_OTP, body);

      if (!data?.success) {
        throw new Error(data?.message);
      }

      toast.success("OTP sent successfully");

      setOtpModalOpen(true);
    } catch (error: any) {
      console.error("Send OTP error:", error);
      toast.error(error?.message || "Something went wrong while sending OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <>
      {" "}
      <div className="flex flex-col w-full gap-4 md:flex-row md:items-center md:gap-5">
        {/* Order ID */}
        <div className="w-full">
          <CustomInputBox
            label="Order ID (e.g., GYSH23678119)"
            value={trackingNo}
            containerStyle="!rounded-lg"
            className="!rounded-xl !h-10"
            onChange={(e) => setTrackingNo(e.target.value)}
          />
        </div>

        {buyerLoggedIn ? (
          <div className="flex w-32 justify-center items-center">
            {loading ? (
              <Spinner className="!h-6 !w-6" />
            ) : (
              <div className="w-full md:w-auto">
                <OneButton
                  text="Track Order"
                  className={`w-full !rounded-xl border-2 py-2 px-2 md:w-auto
      ${
        trackingNo.length === 0
          ? "border-gray-300 !text-gray-400 bg-gray-100 cursor-not-allowed"
          : "border-[#160783] !text-[#160783] bg-transparent hover:bg-[#160783] hover:!text-white"
      }`}
                  onClick={() => handleTrackOrderByOrderId()}
                  variant="primary"
                  disabled={trackingNo.length === 0}
                  iconClass="!w-5 !h-5 ml-2 mr-0"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="w-full flex gap-5">
            {/* Mobile Number */}
            <div className="w-full">
              <CustomInputBox
                inputType="number"
                label="Mobile Number"
                value={buyerMobileNo}
                containerStyle="!rounded-lg"
                className="!rounded-xl !h-10"
                onChange={(e) =>
                  e.target.value?.length <= 10 &&
                  setBuyerMobileNo(e.target.value)
                }
              />
            </div>

            {/* Button */}

            <div className="flex w-32 justify-center items-center">
              {otpLoading ? (
                <Spinner className="!h-6 !w-6" />
              ) : (
                <div className="w-full md:w-auto">
                  <OneButton
                    text={"Send OTP"}
                    className="w-full !rounded-full py-4.5 px-5 md:w-auto"
                    onClick={() => handleSendOtp()}
                    variant="primary"
                    disabled={
                      buyerMobileNo?.length != 10 || trackingNo?.length == 0
                    }
                  />
                </div>
              )}
            </div>
          </div>
        )}
        <CenterModal
          isOpen={otpModalOpen}
          className="!w-[30%] !h-[40%] !absolute !z-20 !rounded-2xl"
          onRequestClose={() => setOtpModalOpen(false)}
        >
          <div>
            <OtpVerificationModalContent
              setOtpModalOpen={setOtpModalOpen}
              phoneNumber={buyerMobileNo}
              handleSendOtp={handleSendOtp}
              handleTrackOrderByOrderId={handleTrackOrderByOrderId}
              resendOtp={resendOtp}
              setResendOtp={setResendOtp}
              timer={timer}
              setTimer={setTimer}
              setToken={setToken}
              trackingNo={trackingNo}
            />
          </div>
        </CenterModal>
      </div>
    </>
  );
};

export default TrackOrderIdInput;
