import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CenterModal from "../../../components/CustomModal/customCenterModal";
import CustomInputBox from "../../../components/Input/index";
import TrackingJson from "./tracking.json";
import CrossIcon from "../../../assets/CloseIcon.svg";
import ShipyaaroLogo from "../../../assets/Shipyaari_full_color rgb.svg";
import OneButton from "../../../components/Button/OneButton";
import CustomDropDown from "../../../components/DropDown";
import { POSTHEADER } from "../../../utils/webService";
import { UPDATETRACKINGBYBUYER } from "../../../utils/ApiUrls";
import { toast } from "react-hot-toast";

type Props = {
  cancellationModalOpen?: any;
  setCancellationModalOpen?: () => void;
  awb?: any;
  buyerToken?: any;
  buyerMobileNo?: any;
};

const CancellationModal = ({
  cancellationModalOpen,
  setCancellationModalOpen,
  awb,
  buyerToken,
  buyerMobileNo,
}: Props) => {
  const navigate = useNavigate();

  const [cancelSuccess, setCancelSuccess] = useState<any>(false);
  const [cancelSelectedOption, setCancelSelectedOption] = useState<any>();
  const [reasonError, setReasonError] = useState<any>({
    reason: "",
    otherReasonError: "",
  });
  const [otherReason, setOtherReason] = useState<any>();

  const cancellingArray = [
    {
      label: "Select Reason",
      value: "Select Reason",
    },
    {
      label: "No longer needed",
      value: "No longer needed",
    },
    {
      label: "Changed my mind",
      value: "Changed my mind",
    },
    {
      label: "Found a better price elsewhere",
      value: "Found a better price elsewhere",
    },
    {
      label: "Item status delayed",
      value: "Item status delayed",
    },
    {
      label: "Other (Please Specify)",
      value: "Other",
    },
  ];

  const handleChangeOption = (value: any) => {
    setCancelSelectedOption(value);
    if (value === "Select Reason" || value === "" || value === undefined) {
      setReasonError({
        ...reasonError,
        reason: "Please select option",
      });
    } else {
      setReasonError({
        ...reasonError,
        reason: "",
      });
    }
  };

  const handleCancelApi = async () => {
    const token1 = sessionStorage.getItem(`${awb}`);
    const token = token1 || buyerToken;
    try {
      const payload = {
        altno: "",
        rescheduleTime: "",
        buyerRemark:
          cancelSelectedOption === "Other" ? otherReason : cancelSelectedOption,
        requestType: "CANCEL",
        awb,
        mobileNo: buyerMobileNo || "",
      };
      const data = await POSTHEADER(UPDATETRACKINGBYBUYER, payload, {
        token,
      });

      if (data?.data?.success) {
        toast.success(data?.data?.message);
        setOtherReason("");
        setCancelSuccess(false);
        setCancellationModalOpen && setCancellationModalOpen();
        setCancelSelectedOption("");
      } else {
        setOtherReason("");
        setCancelSuccess(false);
        setCancellationModalOpen && setCancellationModalOpen();
        toast.error(data?.data?.message);
        setCancelSelectedOption("");
        if (data?.data?.message === "Please Provide Your Token") {
          window.location.reload();
        }
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleSubmit = () => {
    if (!cancelSelectedOption || cancelSelectedOption === "Select Reason") {
      toast.error("Please select a reason");
      setCancelSuccess(true);
      setReasonError({
        ...reasonError,
        reason: "Please select a option",
      });
    } else if (cancelSelectedOption === "Other") {
      setCancelSuccess(true);
      console.log("otherReasonotherReason", otherReason);
      if (!otherReason) {
        toast.error("Plese enter the reason");
        setReasonError({
          reasonError,
          otherReasonError: "Please enter the reason",
        });
      } else {
        handleCancelApi();
        setReasonError({
          reasonError,
          otherReasonError: "",
        });
      }
    } else {
      handleCancelApi();
    }
  };

  return (
    <div>
      <CenterModal
        isOpen={cancellationModalOpen}
        onRequestClose={() => {
          setCancellationModalOpen && setCancellationModalOpen();
        }}
        // className="h-[500px] w-[650px]"
        className="h-[500px] md:h-[500px] lg:h-[540px]  w-[340px] md:w-[520px] lg:w-[650px] "
      >
        {/* <MobileNumberOtp /> */}
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
                setCancellationModalOpen && setCancellationModalOpen();
                setCancelSuccess(false);
                setCancelSelectedOption("");
                setReasonError({
                  ...reasonError,
                  reason: "",
                  otherReasonError: "",
                });
                setOtherReason("");
              }}
            />
          </div>

          {/*Body Section */}
          <div className="flex flex-col items-center justify-center mt-20 w-full">
            <p className="text-[18px] md:text-[22px]  font-Lato  mx-28 text-center font-semibold w-full">
              {cancelSuccess
                ? TrackingJson?.trackingJson?.cancelling?.message4
                : TrackingJson?.trackingJson?.cancelling?.message1}
            </p>
          </div>
          {cancelSuccess ? (
            <div className="mx-20 mt-10">
              <CustomDropDown
                onChange={(e: any) => {
                  handleChangeOption(e.target.value);
                }}
                options={cancellingArray?.map((item: any) => ({
                  label: item?.label,
                  value: item?.value,
                }))}
              />
              {
                <p className="text-red-600 mt-1 font-Open">
                  {reasonError?.reason}
                </p>
              }
              {cancelSelectedOption === "Other" && (
                <div className="mt-6">
                  <CustomInputBox
                    label="Please specify the reason"
                    onChange={(e: any) => {
                      let value = e.target.value;
                      setOtherReason(value);
                      if (value === "") {
                        setReasonError({
                          ...reasonError,
                          otherReasonError: "Plese enter the reason",
                        });
                      } else {
                        setReasonError({
                          ...reasonError,
                          otherReasonError: "",
                        });
                      }
                    }}
                  />
                  <p className="text-[14px] text-red-600 font-Open">
                    {reasonError?.otherReasonError}
                  </p>
                </div>
              )}
              <OneButton
                text={"SUBMIT"}
                variant="primary"
                onClick={() => {
                  handleSubmit();
                }}
                className="!my-10"
              />
            </div>
          ) : (
            <>
              <div className="flex justify-center  my-12 ">
                <p
                  className="text-[16px] md:text-[18px] text-center text-[#004EFF] underline underline-offset-4 font-Open font-semibold cursor-pointer  whitespace-nowrap"
                  onClick={() => {
                    setCancelSuccess(true);
                  }}
                >
                  YES, I WISH TO CANCEL
                </p>
              </div>
              <div
                className="flex justify-center my-4"
                onClick={() => {
                  setCancelSuccess(false);
                }}
              >
                <p
                  className="text-[16px] md:text-[18px] text-[#004EFF] text-center underline underline-offset-4 font-Open font-semibold  cursor-pointer"
                  onClick={() => {
                    setCancellationModalOpen && setCancellationModalOpen();
                  }}
                >
                  NO, I WANT TO ORDER
                </p>
              </div>
            </>
          )}
        </div>
      </CenterModal>
    </div>
  );
};

export default CancellationModal;
