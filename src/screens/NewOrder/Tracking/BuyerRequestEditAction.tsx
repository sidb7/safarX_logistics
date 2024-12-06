import React, { useState } from "react";
import OneButton from "../../../components/Button/OneButton";
import crossIcon from "../../../assets/cross.svg";
import CustomInputBox from "../../../components/Input";
import toast from "react-hot-toast";
import { BUYERREQUESTACTION } from "../../../utils/ApiUrls";
import { POST } from "../../../utils/webService";

interface IPROPS {
  onSubmit: any;
  awb?: any;
  requestType?: any;
  setOpenRightSideModal?: any;
  openRightSideModal?: any;
}

const BuyerAction = (props: IPROPS) => {
  const { setOpenRightSideModal, openRightSideModal, awb, requestType } = props;
  const [remark, setRemark] = useState("");
  const [error, setError] = useState<any>("");

  const handleSubmit = async () => {
    if (remark === "" || remark === undefined) {
      toast.error("Please Enter Remark");
    } else {
      try {
        const payload = {
          sellerRemark: remark,
          requestType,
          awb,
        };
        const data = await POST(BUYERREQUESTACTION, payload);

        if (data?.data?.success) {
          toast.success(data?.data?.message);
          setOpenRightSideModal(false);
        } else {
          toast.error(data?.data?.message);
          setOpenRightSideModal(false);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

  return (
    <>
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="font-Lato  text-2xl leading-5 text-black font-normal">
          Action
        </h2>
        <img
          src={crossIcon}
          alt="EditIcon"
          className="ml-1 w-6 h-6 cursor-pointer"
          onClick={() => setOpenRightSideModal(false)}
        />
      </div>
      <div className="p-4">
        <div className="mt-4">
          <CustomInputBox
            label="Remark"
            value={remark}
            onChange={(e: any) => {
              let value = e.target.value;
              if (value === "" || value === undefined) {
                setError("Plese Enter Remark");
              } else {
                setRemark(value);
                setError("");
              }
            }}
            placeholder=""
            inputType="text"
            isRequired={true}
            minLength={1}
            maxLength={200}
            className="h-[#751px]"
          />
        </div>
      </div>

      <div className="">
        <footer className="mt-auto bottom-0 absolute w-full">
          <div className="grid grid-cols-2 gap-4 p-4 shadow-lg border bg-white rounded-tl-xl rounded-tr-xl w-full lg:flex lg:justify-end lg:gap-8 lg:p-6">
            <OneButton
              text="Back"
              variant="secondary"
              onClick={() => setOpenRightSideModal(false)}
            />
            <OneButton text="Save" onClick={handleSubmit} variant="primary" />
          </div>
        </footer>
      </div>
    </>
  );
};

export default BuyerAction;
