import React, { useState } from "react";
import ServiceButton from "../../../components/Button/ServiceButton";
import CustomInputBox from "../../../components/Input";
import CustomBottomModal from "../../../components/CustomModal/customBottomModal";
import { toast } from "react-toastify";
import { POST } from "../../../utils/webService";
import {
  POST_VERIFY_AADHAR_OTP_URL,
  POST_VERIFY_AADHAR_URL,
  POST_VERIFY_GST_OTP,
  POST_VERIFY_GST_URL,
  POST_VERIFY_PAN_URL,
} from "../../../utils/ApiUrls";

interface IVerifyDocumentProps {
  props: { documentName?: string; label: string };
  openModal: boolean;
  closeModal: () => void;
}
const VerifyDocument: React.FunctionComponent<IVerifyDocumentProps> = ({
  props: { documentName, label },
  openModal,
  closeModal,
}) => {
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [dataResponse, setDataResponse] = useState<any>(null);

  const sendOtp = async () => {
    if (documentName === "aadhar") {
      const payload = { adhaar_no: number };
      const { data } = await POST(POST_VERIFY_AADHAR_URL, payload);
      if (data.success) {
        toast.success(data.message);
        setDataResponse(data.data.data);
      } else {
        toast.error(data.message);
      }
    } else if (documentName === "pan") {
      const payload = { pan_no: number };
      const { data } = await POST(POST_VERIFY_PAN_URL, payload);
      if (data.success) {
        toast.success(data.message);
        closeModal();
      } else {
        toast.error(data.message);
      }
    } else if (documentName === "gst") {
      const payload = { gstIn: number };
      const { data } = await POST(POST_VERIFY_GST_URL, payload);
      if (data.success) {
        toast.success(data.message);
        setDataResponse(data.data[0].data);
      } else {
        toast.error(data.message);
      }
    }
  };

  const verifyOtp = async () => {
    if (documentName === "aadhar") {
      const payload = {
        client_id: dataResponse.client_id,
        otp: otp,
      };
      const { data } = await POST(POST_VERIFY_AADHAR_OTP_URL, payload);
      if (data.success) {
        toast.success(data.message);
        setDataResponse(data.data);
        closeModal();
      } else {
        toast.error(data.message);
      }
    } else if (documentName === "gst") {
      const payload = {
        gstIn: number,
        client_id: dataResponse.client_id,
        otp: otp,
      };
      const { data } = await POST(POST_VERIFY_GST_OTP, payload);
      if (data.success) {
        toast.success(data.message);
        setDataResponse(data.data);
        closeModal();
      } else {
        toast.error(data.message);
      }
    }
  };

  const header = () => {
    return <div className="font-bold">
      {`Verify ${label}`}
    </div>
  }
  return (
    <div>
      <CustomBottomModal
        isOpen={openModal}
        onRequestClose={closeModal}
        className="!p-0 !w-[500px] !h-[700px]"
        overlayClassName="flex  items-center"
      >
        {!dataResponse ? (
          <div className="flex flex-col justify-center items-center gap-x-4 gap-y-4 h-full">
            {header()}
            <div className="flex ">
              <CustomInputBox
                containerStyle={`!w-[320px]`}
                label={label}
                inputType="text"
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="flex">
              <ServiceButton
                text="SEND OTP"
                className={`bg-[#1C1C1C] !h-[36px] text-white w-full mb-5 !w-[320px] !bg-[#1C1C1C] !text-[#FFFFFF]  `}
                btnType="submit"
                onClick={() => sendOtp()}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-x-4 gap-y-4 h-full">
            <div className="flex ">
              <CustomInputBox
                containerStyle={`!w-[320px]`}
                label={"Enter OTP"}
                inputType="text"
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div className="flex">
              <ServiceButton
                text="VERIFY OTP"
                className={`bg-[#1C1C1C] !h-[36px] text-white w-full mb-5 !w-[320px] !bg-[#1C1C1C] !text-[#FFFFFF]  `}
                btnType="submit"
                onClick={() => verifyOtp()}
              />
            </div>
          </div>
        )}
      </CustomBottomModal>
    </div>
  );
};

export default VerifyDocument;
