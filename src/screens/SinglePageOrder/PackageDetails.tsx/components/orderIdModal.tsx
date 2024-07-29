import React, { useEffect, useState } from "react";
import { generateUniqueCode } from "../../../../utils/utility";
import CustomInputBox from "../../../../components/Input";
import InputBox from "../../../../components/Input";
import infoIcon from "../../../../assets/info.svg";
import AutoGenerateIcon from "../../../../assets/Product/autogenerate.svg";
import CenterModal from "../../../../components/CustomModal/customCenterModal";
import crossIcon from "../../../../assets/cross.svg";
import CopyTooltip from "../../../../components/CopyToClipboard";
import ewaybillIcon from "../../../../assets/Delivery Icon.svg";
import CustomDropDown from "../../../../components/DropDown";
import ServiceButton from "../../../../components/Button/ServiceButton";

function OrderIdModal({ onClose, state, setOrder }: any) {
  const [ewayBillDetails, setEwayBillDetails] = useState({
    eWayBillNo: "",
    transporterNo: "",
  });

  const ValidationEwayBillNumber = () => {
    if (
      ewayBillDetails.eWayBillNo.trim() === "" ||
      ewayBillDetails.transporterNo.trim() === ""
    ) {
      return true;
    }
    return false;
  };

  let data = [
    {
      id: 1,
      label: "Shadowfax Reverse",
      value: "32AAVCS6697K1ZC",
    },
    {
      id: 2,
      label: "DTDC",
      value: "29AAACD8017H1zO",
    },
    {
      id: 3,
      label: "XpressBees",
      value: "27AAGCB3904P1ZD",
    },
    {
      id: 4,
      label: "BlueDart",
      value: "27AAACB0446L1ZS",
    },
    {
      id: 5,
      label: "Fedex",
      value: "2277AABCF6516A1Z3",
    },
    {
      id: 6,
      label: "Delhivery",
      value: "06AAPCS9575E1ZR",
    },
  ];

  const onSaveEwayBillDetails = () => {
    setOrder((prevOrder: any) => {
      const updatedBoxInfo = [...prevOrder.boxInfo];
      updatedBoxInfo[state?.id] = {
        ...updatedBoxInfo[state?.id],
        eWayBillNo: ewayBillDetails?.eWayBillNo,
        transporterNo: ewayBillDetails?.transporterNo,
      };
      return { ...prevOrder, boxInfo: updatedBoxInfo };
    });
    onClose({ state: {}, isOpen: false });
  };

  useEffect(() => {
    console.log(state?.data, state?.data);
    if (
      state?.data?.eWayBillNo?.trim() !== "" ||
      state?.data?.transporterNo?.trim() !== ""
    ) {
      setEwayBillDetails({
        eWayBillNo: state?.data?.eWayBillNo,
        transporterNo: state?.data?.transporterNo,
      });
    }
  }, []);

  return (
    <>
      <div className="mx-4">
        <div className="my-5 flex justify-between items-center">
          <div className="text-[22px] flex items-center gap-x-2">
            <img src={ewaybillIcon} alt="" className="border" />
            <span>Eway Bill Number</span>
          </div>
          <button onClick={() => onClose({ state: {}, isOpen: false })}>
            <img src={crossIcon} alt="" className=" w-[25px]" />
          </button>
        </div>
        <div className="flex flex-col gap-y-6">
          <div className="mt-5">
            <div className="">
              <CustomInputBox
                inputType="text"
                label="Enter Eway Bill No."
                name="eWayBillNo"
                value={ewayBillDetails?.eWayBillNo}
                onChange={(e) => {
                  setEwayBillDetails((prevState: any) => {
                    return {
                      ...prevState,
                      eWayBillNo: e.target.value,
                    };
                  });
                }}
              />
            </div>
          </div>

          <div className="flex w-[100%] gap-x-2">
            <CustomDropDown
              heading="Transporter ID"
              name="transporterNo"
              selectClassName={`!cursor-pointer border`}
              wrapperClass={`!w-[100%]`}
              onChange={(e: any) => {
                setEwayBillDetails((prevState: any) => {
                  return {
                    ...prevState,
                    transporterNo: e.target.value,
                  };
                });
              }}
              value={ewayBillDetails?.transporterNo}
              options={data}
            />
          </div>
        </div>
      </div>
      <div
        className="flex justify-end gap-x-5  shadow-lg border-[1px] h-[68px]  bg-[#FFFFFF] px-6 py-4 rounded-tr-[32px] rounded-tl-[32px]    fixed bottom-0 "
        style={{ width: "-webkit-fill-available" }}
      >
        <ServiceButton
          text={"SAVE"}
          onClick={onSaveEwayBillDetails}
          disabled={ValidationEwayBillNumber()}
          className={` bg-[#1C1C1C] text-[#FFFFFF] h-[36px] lg:!py-2 lg:!px-4 disabled:bg-[#E8E8E8] disabled:text-[#BBB] disabled:border-none`}
        />
      </div>
    </>
  );
}

export default OrderIdModal;
