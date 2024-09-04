import React, { useState } from "react";
import ServiceButton from "../../../../components/Button/ServiceButton";
// import InvoiceIcon from "../../../../assets/invoiceIcon.svg";
import ServiceVerification from "../../../../assets/Service verification.svg";
import CrossIcon from "../../../../assets/CloseIcon.svg";
import InfoIcon from "../../../../assets/info.svg";
import uploadImgPre from "../../../../assets/uploadImgPre.svg";
import UploadIcon from "../../../../assets/uploadinbutton.svg";
import CustomDropDown from "../../../../components/DropDown";
import { Tooltip } from "react-tooltip";
import CustomInputBox from "../../../../components/Input";
import CustomUploadSinglePage from "../../../../components/CustomUploadSinglePage";

interface IKycContentProps {
  setIsKycModalOpen?: any;
}

const KycContent: React.FunctionComponent<IKycContentProps> = ({
  setIsKycModalOpen,
}) => {
  const [selectedtype, setSelectedType] = useState("");
  // console.log("🚀 ~ selectedtype:", selectedtype);
  const kycFlow = () => {
    if (selectedtype === "individual") {
      return (
        <>
          <div className="flex gap-x-2 items-center text-center pt-[26px] pb-[8px] px-[6px]">
            <p className="font-Open font-semibold text-base leading-5 text-[#323232] lg:whitespace-nowrap">
              Sign With Stamp
            </p>
            <img
              src={InfoIcon}
              alt="tooltip-icon"
              className={`${"cursor-pointer"}`}
              data-tooltip-id="my-tooltip-customer-type"
              data-tooltip-content={`${"content IGST Payment Status tooltip"}`}
            />
            <Tooltip
              id="my-tooltip-customer-type"
              style={{
                zIndex: 10,
                //   backgroundColor: "#60D669",
                //   borderRadius: "6px",
                position: "absolute",
                //   color: "#FFFFFF",
                width: "270px",
                fontSize: "12px",
                lineHeight: "14px",
                fontFamily: "Open Sans",
                fontWeight: "500",
                letterSpacing: "1px",
                textTransform: "capitalize",
              }}
            />
          </div>
          <div
            className={`p-3 mt-5 relative flex justify-between  border-[1px] rounded-[4px] border-[#A4A4A4] cursor-pointer `}
          >
            <div className="flex gap-x-2  text-center items-center">
              <img src={uploadImgPre} alt="" />
              <p className="text-[#777777] font-Open font-normal text-xs leading-4 text-center items-center">
                Upload Invoice
              </p>{" "}
              <span className="text-red-500">*</span>{" "}
            </div>
            <div className="text-[#004EFF] flex gap-2 font-Open font-semibold text-sm leading-5 text-center items-center">
              <img src={UploadIcon} height={16} width={16} alt="" />
              <div>UPLOAD</div>
              <input
                className="absolute cursor-pointer left-0 opacity-0 top-0 border h-[48px]"
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                //   multiple
                //   ref={imageInputRef}
                //   onChange={handleFileChange}
              />
            </div>
          </div>
        </>
      );
    } else if (selectedtype === "company") {
      return (
        <>
          {/* parent div  */}
          <div className="flex flex-col gap-y-5 p-2">
            {/* name  */}
            <div className="pt-3">
              <CustomInputBox label="Company Name" />
            </div>
            {/* section section cert incorp  */}
            <div>
              <div className="flex gap-x-2 items-center text-center">
                <p className="font-Open font-semibold text-lg leading-5 text-[#323232]">
                  Certificate of Incorporation
                </p>
                <img
                  src={InfoIcon}
                  alt="tooltip-icon"
                  className={`${"cursor-pointer"}`}
                  data-tooltip-id="my-tooltip-incoporation"
                  data-tooltip-content={`${"content of Certificate of Incorporation tooltip"}`}
                />
                <Tooltip
                  id="my-tooltip-incoporation"
                  style={{
                    zIndex: 10,
                    // backgroundColor: "#60D669",
                    borderRadius: "6px",
                    position: "absolute",
                    color: "#FFFFFF",
                    width: "270px",
                    fontSize: "12px",
                    lineHeight: "14px",
                    fontFamily: "Open Sans",
                    fontWeight: "500",
                    letterSpacing: "1px",
                    textTransform: "capitalize",
                  }}
                />
              </div>
              <div className="flex pt-[15px] gap-x-5">
                <div className="flex-1">
                  <CustomInputBox label="CIN Number" />
                </div>
                <div className="flex-1">
                  {/* <CustomInputBox label="File Upload" inputType="file" /> */}
                  <CustomUploadSinglePage />
                </div>
              </div>
            </div>
            {/* third section cert reg */}
            <div>
              <div className="flex gap-x-2 items-center text-center">
                <p className="font-Open font-semibold text-lg leading-5 text-[#323232]">
                  Certificate of Registration
                </p>
                <img
                  src={InfoIcon}
                  alt="tooltip-icon"
                  className={`${"cursor-pointer"}`}
                  data-tooltip-id="my-tooltip-incoporation"
                  data-tooltip-content={`${"content of Certificate of Incorporation tooltip"}`}
                />
                <Tooltip
                  id="my-tooltip-incoporation"
                  style={{
                    zIndex: 10,
                    // backgroundColor: "#60D669",
                    borderRadius: "6px",
                    position: "absolute",
                    color: "#FFFFFF",
                    width: "270px",
                    fontSize: "12px",
                    lineHeight: "14px",
                    fontFamily: "Open Sans",
                    fontWeight: "500",
                    letterSpacing: "1px",
                    textTransform: "capitalize",
                  }}
                />
              </div>
              <div className="pt-[15px]">
                <CustomInputBox label="Upload Invoice" />
              </div>
            </div>
            {/* fourth section AD */}
            <div>
              <div className="flex gap-x-2 items-center text-center">
                <p className="font-Open font-semibold text-lg leading-5 text-[#323232]">
                  AD Details
                  <span className="font-Open text-xs font-normal leading-4 text-[#777777] ml-1">
                    (AD Code is mandatory for CSB5 shipment)
                  </span>
                </p>
                <img
                  src={InfoIcon}
                  alt="tooltip-icon"
                  className={`${"cursor-pointer"}`}
                  data-tooltip-id="my-tooltip-incoporation"
                  data-tooltip-content={`${"content of Certificate of Incorporation tooltip"}`}
                />
                <Tooltip
                  id="my-tooltip-incoporation"
                  style={{
                    zIndex: 10,
                    // backgroundColor: "#60D669",
                    borderRadius: "6px",
                    position: "absolute",
                    color: "#FFFFFF",
                    width: "270px",
                    fontSize: "12px",
                    lineHeight: "14px",
                    fontFamily: "Open Sans",
                    fontWeight: "500",
                    letterSpacing: "1px",
                    textTransform: "capitalize",
                  }}
                />
              </div>
              <div className="flex pt-[15px] gap-x-5">
                <div className="flex-1">
                  <CustomInputBox label="AD Number" />
                </div>
                <div className="flex-1">
                  <CustomInputBox label="File Upload" inputType="file" />
                </div>
              </div>
            </div>
            {/* fifth section IEC */}
            <div>
              <div className="flex gap-x-2 items-center text-center">
                <p className="font-Open font-semibold text-lg leading-5 text-[#323232]">
                  IEC Code
                </p>
                <img
                  src={InfoIcon}
                  alt="tooltip-icon"
                  className={`${"cursor-pointer"}`}
                  data-tooltip-id="my-tooltip-incoporation"
                  data-tooltip-content={`${"content of Certificate of Incorporation tooltip"}`}
                />
                <Tooltip
                  id="my-tooltip-incoporation"
                  style={{
                    zIndex: 10,
                    // backgroundColor: "#60D669",
                    borderRadius: "6px",
                    position: "absolute",
                    color: "#FFFFFF",
                    width: "270px",
                    fontSize: "12px",
                    lineHeight: "14px",
                    fontFamily: "Open Sans",
                    fontWeight: "500",
                    letterSpacing: "1px",
                    textTransform: "capitalize",
                  }}
                />
              </div>
              <div className="flex pt-[15px] gap-x-5">
                <div className="flex-1">
                  <CustomInputBox label="IEC Number" />
                </div>
                <div className="flex-1">
                  <CustomInputBox label="File Upload" inputType="file" />
                </div>
              </div>
            </div>
            {/* sixth section sign with stamp */}
            <div>
              <div className="flex gap-x-2 items-center text-center">
                <p className="font-Open font-semibold text-lg leading-5 text-[#323232]">
                  Sign with Stamp
                </p>
                <img
                  src={InfoIcon}
                  alt="tooltip-icon"
                  className={`${"cursor-pointer"}`}
                  data-tooltip-id="my-tooltip-incoporation"
                  data-tooltip-content={`${"content of Certificate of Incorporation tooltip"}`}
                />
                <Tooltip
                  id="my-tooltip-incoporation"
                  style={{
                    zIndex: 10,
                    // backgroundColor: "#60D669",
                    borderRadius: "6px",
                    position: "absolute",
                    color: "#FFFFFF",
                    width: "270px",
                    fontSize: "12px",
                    lineHeight: "14px",
                    fontFamily: "Open Sans",
                    fontWeight: "500",
                    letterSpacing: "1px",
                    textTransform: "capitalize",
                  }}
                />
              </div>
              <div className="pt-[15px]">
                <CustomInputBox label="Upload Invoice" />
              </div>
            </div>
            {/* seventh section Board Resolution of Authority  */}
            <div>
              <div className="flex gap-x-2 items-center text-center">
                <p className="font-Open font-semibold text-lg leading-5 text-[#323232]">
                  Board Resolution of Authority
                </p>
                <img
                  src={InfoIcon}
                  alt="tooltip-icon"
                  className={`${"cursor-pointer"}`}
                  data-tooltip-id="my-tooltip-incoporation"
                  data-tooltip-content={`${"content of Certificate of Incorporation tooltip"}`}
                />
                <Tooltip
                  id="my-tooltip-incoporation"
                  style={{
                    zIndex: 10,
                    // backgroundColor: "#60D669",
                    borderRadius: "6px",
                    position: "absolute",
                    color: "#FFFFFF",
                    width: "270px",
                    fontSize: "12px",
                    lineHeight: "14px",
                    fontFamily: "Open Sans",
                    fontWeight: "500",
                    letterSpacing: "1px",
                    textTransform: "capitalize",
                  }}
                />
              </div>
              <div className="pt-[15px] flex flex-col gap-y-[15px]">
                <CustomDropDown
                  value={""}
                  onChange={() => {}}
                  options={[
                    {
                      value:
                        "Board Resolution granted to its directors, authorized representatives",
                      label:
                        "Board Resolution granted to its directors, authorized representatives",
                    },
                    {
                      value:
                        "Signatory, managers, officers or employees to act on behalf of the Company",
                      label:
                        "Signatory, managers, officers or employees to act on behalf of the Company",
                    },
                  ]}
                  heading=" select type"
                />
                <CustomInputBox label="Upload Invoice" />
              </div>
            </div>
            {/* eight section address proof */}
            <div>
              <div className="flex gap-x-2 items-center text-center">
                <p className="font-Open font-semibold text-lg leading-5 text-[#323232]">
                  Registered Office Address Proof
                </p>
                <img
                  src={InfoIcon}
                  alt="tooltip-icon"
                  className={`${"cursor-pointer"}`}
                  data-tooltip-id="my-tooltip-incoporation"
                  data-tooltip-content={`${"content of Certificate of Incorporation tooltip"}`}
                />
                <Tooltip
                  id="my-tooltip-incoporation"
                  style={{
                    zIndex: 10,
                    // backgroundColor: "#60D669",
                    borderRadius: "6px",
                    position: "absolute",
                    color: "#FFFFFF",
                    width: "270px",
                    fontSize: "12px",
                    lineHeight: "14px",
                    fontFamily: "Open Sans",
                    fontWeight: "500",
                    letterSpacing: "1px",
                    textTransform: "capitalize",
                  }}
                />
              </div>
              <div className="pt-[15px] flex flex-col gap-y-[15px]">
                <CustomDropDown
                  value={""}
                  onChange={() => {}}
                  options={[
                    {
                      value: "Electricity Bill",
                      label: "Electricity Bill",
                    },
                    {
                      value: " Lease Agreement for the office premises",
                      label: " Lease Agreement for the office premises",
                    },
                  ]}
                  heading=" select type"
                />
                <CustomInputBox label="Upload Invoice" />
              </div>
            </div>
          </div>
        </>
      );
    } else if (selectedtype === "trustOrFoundation") {
      return (
        <>
          {/* parent div  */}
          <div className="flex flex-col gap-y-5 p-2">
            {/* name  */}
            <div className="pt-3">
              <CustomInputBox label="Company Name" />
            </div>
            {/* section section Registration Details  */}
            <div>
              <div className="flex gap-x-2 items-center text-center">
                <p className="font-Open font-semibold text-lg leading-5 text-[#323232]">
                  Registration Details
                </p>
                <img
                  src={InfoIcon}
                  alt="tooltip-icon"
                  className={`${"cursor-pointer"}`}
                  data-tooltip-id="my-tooltip-incoporation"
                  data-tooltip-content={`${"content of Certificate of Incorporation tooltip"}`}
                />
                <Tooltip
                  id="my-tooltip-incoporation"
                  style={{
                    zIndex: 10,
                    // backgroundColor: "#60D669",
                    borderRadius: "6px",
                    position: "absolute",
                    color: "#FFFFFF",
                    width: "270px",
                    fontSize: "12px",
                    lineHeight: "14px",
                    fontFamily: "Open Sans",
                    fontWeight: "500",
                    letterSpacing: "1px",
                    textTransform: "capitalize",
                  }}
                />
              </div>
              <div className="pt-[15px] flex flex-col gap-y-[15px]">
                <CustomDropDown
                  value={""}
                  onChange={() => {}}
                  options={[
                    {
                      value: "Electricity Bill",
                      label: "Electricity Bill",
                    },
                    {
                      value: " Lease Agreement for the office premises",
                      label: " Lease Agreement for the office premises",
                    },
                  ]}
                  heading=" select type"
                />
                <CustomInputBox label="Upload Invoice" />
              </div>
            </div>
            {/* third section Trustee Authorization Letter */}
            <div>
              <div className="flex gap-x-2 items-center text-center">
                <p className="font-Open font-semibold text-lg leading-5 text-[#323232]">
                  Trustee Authorization Letter
                </p>
                <img
                  src={InfoIcon}
                  alt="tooltip-icon"
                  className={`${"cursor-pointer"}`}
                  data-tooltip-id="my-tooltip-incoporation"
                  data-tooltip-content={`${"content of Certificate of Incorporation tooltip"}`}
                />
                <Tooltip
                  id="my-tooltip-incoporation"
                  style={{
                    zIndex: 10,
                    // backgroundColor: "#60D669",
                    borderRadius: "6px",
                    position: "absolute",
                    color: "#FFFFFF",
                    width: "270px",
                    fontSize: "12px",
                    lineHeight: "14px",
                    fontFamily: "Open Sans",
                    fontWeight: "500",
                    letterSpacing: "1px",
                    textTransform: "capitalize",
                  }}
                />
              </div>
              <div className="pt-[15px] flex flex-col gap-y-[15px]">
                <CustomDropDown
                  value={""}
                  onChange={() => {}}
                  options={[
                    {
                      value: "Electricity Bill",
                      label: "Electricity Bill",
                    },
                    {
                      value: " Lease Agreement for the office premises",
                      label: " Lease Agreement for the office premises",
                    },
                  ]}
                  heading=" select type"
                />
                <CustomInputBox label="Upload Invoice" />
              </div>
            </div>
            {/* fourth section Certificate of Trust */}
            <div>
              <div className="flex gap-x-2 items-center text-center">
                <p className="font-Open font-semibold text-lg leading-5 text-[#323232]">
                  Certificate of Trust
                </p>
                <img
                  src={InfoIcon}
                  alt="tooltip-icon"
                  className={`${"cursor-pointer"}`}
                  data-tooltip-id="my-tooltip-incoporation"
                  data-tooltip-content={`${"content of Certificate of Incorporation tooltip"}`}
                />
                <Tooltip
                  id="my-tooltip-incoporation"
                  style={{
                    zIndex: 10,
                    // backgroundColor: "#60D669",
                    borderRadius: "6px",
                    position: "absolute",
                    color: "#FFFFFF",
                    width: "270px",
                    fontSize: "12px",
                    lineHeight: "14px",
                    fontFamily: "Open Sans",
                    fontWeight: "500",
                    letterSpacing: "1px",
                    textTransform: "capitalize",
                  }}
                />
              </div>
              <div className="pt-[15px]">
                <CustomInputBox label="Upload Invoice" />
              </div>
            </div>
            {/* fifth section AD Details */}
            <div>
              <div className="flex gap-x-2 items-center text-center">
                <p className="font-Open font-semibold text-lg leading-5 text-[#323232]">
                  AD Details
                  <span className="font-Open text-xs font-normal leading-4 text-[#777777] ml-1">
                    (AD Code is mandatory for CSB5 shipment)
                  </span>
                </p>
                <img
                  src={InfoIcon}
                  alt="tooltip-icon"
                  className={`${"cursor-pointer"}`}
                  data-tooltip-id="my-tooltip-incoporation"
                  data-tooltip-content={`${"content of Certificate of Incorporation tooltip"}`}
                />
                <Tooltip
                  id="my-tooltip-incoporation"
                  style={{
                    zIndex: 10,
                    // backgroundColor: "#60D669",
                    borderRadius: "6px",
                    position: "absolute",
                    color: "#FFFFFF",
                    width: "270px",
                    fontSize: "12px",
                    lineHeight: "14px",
                    fontFamily: "Open Sans",
                    fontWeight: "500",
                    letterSpacing: "1px",
                    textTransform: "capitalize",
                  }}
                />
              </div>
              <div className="flex pt-[15px] gap-x-5">
                <div className="flex-1">
                  <CustomInputBox label="AD Number" />
                </div>
                <div className="flex-1">
                  <CustomInputBox label="File Upload" inputType="file" />
                </div>
              </div>
            </div>
            {/* sixth section IEC */}
            <div>
              <div className="flex gap-x-2 items-center text-center">
                <p className="font-Open font-semibold text-lg leading-5 text-[#323232]">
                  IEC Code
                </p>
                <img
                  src={InfoIcon}
                  alt="tooltip-icon"
                  className={`${"cursor-pointer"}`}
                  data-tooltip-id="my-tooltip-incoporation"
                  data-tooltip-content={`${"content of Certificate of Incorporation tooltip"}`}
                />
                <Tooltip
                  id="my-tooltip-incoporation"
                  style={{
                    zIndex: 10,
                    // backgroundColor: "#60D669",
                    borderRadius: "6px",
                    position: "absolute",
                    color: "#FFFFFF",
                    width: "270px",
                    fontSize: "12px",
                    lineHeight: "14px",
                    fontFamily: "Open Sans",
                    fontWeight: "500",
                    letterSpacing: "1px",
                    textTransform: "capitalize",
                  }}
                />
              </div>
              <div className="flex pt-[15px] gap-x-5">
                <div className="flex-1">
                  <CustomInputBox label="IEC Number" />
                </div>
                <div className="flex-1">
                  <CustomInputBox label="File Upload" inputType="file" />
                </div>
              </div>
            </div>
            {/* seventh section sign with stamp */}
            <div>
              <div className="flex gap-x-2 items-center text-center">
                <p className="font-Open font-semibold text-lg leading-5 text-[#323232]">
                  Sign with Stamp
                </p>
                <img
                  src={InfoIcon}
                  alt="tooltip-icon"
                  className={`${"cursor-pointer"}`}
                  data-tooltip-id="my-tooltip-incoporation"
                  data-tooltip-content={`${"content of Certificate of Incorporation tooltip"}`}
                />
                <Tooltip
                  id="my-tooltip-incoporation"
                  style={{
                    zIndex: 10,
                    // backgroundColor: "#60D669",
                    borderRadius: "6px",
                    position: "absolute",
                    color: "#FFFFFF",
                    width: "270px",
                    fontSize: "12px",
                    lineHeight: "14px",
                    fontFamily: "Open Sans",
                    fontWeight: "500",
                    letterSpacing: "1px",
                    textTransform: "capitalize",
                  }}
                />
              </div>
              <div className="pt-[15px]">
                <CustomInputBox label="Upload Invoice" />
              </div>
            </div>
            {/* eight section address proof */}
            <div>
              <div className="flex gap-x-2 items-center text-center">
                <p className="font-Open font-semibold text-lg leading-5 text-[#323232]">
                  Registered Office Address Proof
                </p>
                <img
                  src={InfoIcon}
                  alt="tooltip-icon"
                  className={`${"cursor-pointer"}`}
                  data-tooltip-id="my-tooltip-incoporation"
                  data-tooltip-content={`${"content of Certificate of Incorporation tooltip"}`}
                />
                <Tooltip
                  id="my-tooltip-incoporation"
                  style={{
                    zIndex: 10,
                    // backgroundColor: "#60D669",
                    borderRadius: "6px",
                    position: "absolute",
                    color: "#FFFFFF",
                    width: "270px",
                    fontSize: "12px",
                    lineHeight: "14px",
                    fontFamily: "Open Sans",
                    fontWeight: "500",
                    letterSpacing: "1px",
                    textTransform: "capitalize",
                  }}
                />
              </div>
              <div className="pt-[15px] flex flex-col gap-y-[15px]">
                <CustomDropDown
                  value={""}
                  onChange={() => {}}
                  options={[
                    {
                      value: "Electricity Bill",
                      label: "Electricity Bill",
                    },
                    {
                      value: " Lease Agreement for the office premises",
                      label: " Lease Agreement for the office premises",
                    },
                  ]}
                  heading=" select type"
                />
                <CustomInputBox label="Upload Invoice" />
              </div>
            </div>
          </div>
        </>
      );
    } else if (selectedtype === "partnership") {
      return (
        <>
          {/* parent div  */}
          <div className="flex flex-col gap-y-5 p-2">
            {/* name  */}
            <div className="pt-3">
              <CustomInputBox label="Company Name" />
            </div>
            {/* section section Registration Details  */}
            <div>
              <div className="flex gap-x-2 items-center text-center">
                <p className="font-Open font-semibold text-lg leading-5 text-[#323232]">
                  Registration Details
                </p>
                <img
                  src={InfoIcon}
                  alt="tooltip-icon"
                  className={`${"cursor-pointer"}`}
                  data-tooltip-id="my-tooltip-incoporation"
                  data-tooltip-content={`${"content of Certificate of Incorporation tooltip"}`}
                />
                <Tooltip
                  id="my-tooltip-incoporation"
                  style={{
                    zIndex: 10,
                    // backgroundColor: "#60D669",
                    borderRadius: "6px",
                    position: "absolute",
                    color: "#FFFFFF",
                    width: "270px",
                    fontSize: "12px",
                    lineHeight: "14px",
                    fontFamily: "Open Sans",
                    fontWeight: "500",
                    letterSpacing: "1px",
                    textTransform: "capitalize",
                  }}
                />
              </div>
              <div className="pt-[15px]">
                <CustomInputBox label="Upload Invoice" />
              </div>
            </div>
            {/* third section Partnership Authorization Letter */}
            <div>
              <div className="flex gap-x-2 items-center text-center">
                <p className="font-Open font-semibold text-lg leading-5 text-[#323232]">
                  Partnership Authorization Letter
                </p>
                <img
                  src={InfoIcon}
                  alt="tooltip-icon"
                  className={`${"cursor-pointer"}`}
                  data-tooltip-id="my-tooltip-incoporation"
                  data-tooltip-content={`${"content of Certificate of Incorporation tooltip"}`}
                />
                <Tooltip
                  id="my-tooltip-incoporation"
                  style={{
                    zIndex: 10,
                    // backgroundColor: "#60D669",
                    borderRadius: "6px",
                    position: "absolute",
                    color: "#FFFFFF",
                    width: "270px",
                    fontSize: "12px",
                    lineHeight: "14px",
                    fontFamily: "Open Sans",
                    fontWeight: "500",
                    letterSpacing: "1px",
                    textTransform: "capitalize",
                  }}
                />
              </div>
              <div className="pt-[15px] flex flex-col gap-y-[15px]">
                <CustomDropDown
                  value={""}
                  onChange={() => {}}
                  options={[
                    {
                      value: "Electricity Bill",
                      label: "Electricity Bill",
                    },
                    {
                      value: " Lease Agreement for the office premises",
                      label: " Lease Agreement for the office premises",
                    },
                  ]}
                  heading=" select type"
                />
                <CustomInputBox label="Upload Invoice" />
              </div>
            </div>

            {/* fourth section AD Details */}
            <div>
              <div className="flex gap-x-2 items-center text-center">
                <p className="font-Open font-semibold text-lg leading-5 text-[#323232]">
                  AD Details
                  <span className="font-Open text-xs font-normal leading-4 text-[#777777] ml-1">
                    (AD Code is mandatory for CSB5 shipment)
                  </span>
                </p>
                <img
                  src={InfoIcon}
                  alt="tooltip-icon"
                  className={`${"cursor-pointer"}`}
                  data-tooltip-id="my-tooltip-incoporation"
                  data-tooltip-content={`${"content of Certificate of Incorporation tooltip"}`}
                />
                <Tooltip
                  id="my-tooltip-incoporation"
                  style={{
                    zIndex: 10,
                    // backgroundColor: "#60D669",
                    borderRadius: "6px",
                    position: "absolute",
                    color: "#FFFFFF",
                    width: "270px",
                    fontSize: "12px",
                    lineHeight: "14px",
                    fontFamily: "Open Sans",
                    fontWeight: "500",
                    letterSpacing: "1px",
                    textTransform: "capitalize",
                  }}
                />
              </div>
              <div className="flex pt-[15px] gap-x-5">
                <div className="flex-1">
                  <CustomInputBox label="AD Number" />
                </div>
                <div className="flex-1">
                  <CustomInputBox label="File Upload" inputType="file" />
                </div>
              </div>
            </div>
            {/* fifth section IEC */}
            <div>
              <div className="flex gap-x-2 items-center text-center">
                <p className="font-Open font-semibold text-lg leading-5 text-[#323232]">
                  IEC Code
                </p>
                <img
                  src={InfoIcon}
                  alt="tooltip-icon"
                  className={`${"cursor-pointer"}`}
                  data-tooltip-id="my-tooltip-incoporation"
                  data-tooltip-content={`${"content of Certificate of Incorporation tooltip"}`}
                />
                <Tooltip
                  id="my-tooltip-incoporation"
                  style={{
                    zIndex: 10,
                    // backgroundColor: "#60D669",
                    borderRadius: "6px",
                    position: "absolute",
                    color: "#FFFFFF",
                    width: "270px",
                    fontSize: "12px",
                    lineHeight: "14px",
                    fontFamily: "Open Sans",
                    fontWeight: "500",
                    letterSpacing: "1px",
                    textTransform: "capitalize",
                  }}
                />
              </div>
              <div className="flex pt-[15px] gap-x-5">
                <div className="flex-1">
                  <CustomInputBox label="IEC Number" />
                </div>
                <div className="flex-1">
                  <CustomInputBox label="File Upload" inputType="file" />
                </div>
              </div>
            </div>
            {/* sixth section Certified Deed */}
            <div>
              <div className="flex gap-x-2 items-center text-center">
                <p className="font-Open font-semibold text-lg leading-5 text-[#323232]">
                  Certified Deed
                </p>
                <img
                  src={InfoIcon}
                  alt="tooltip-icon"
                  className={`${"cursor-pointer"}`}
                  data-tooltip-id="my-tooltip-incoporation"
                  data-tooltip-content={`${"content of Certificate of Incorporation tooltip"}`}
                />
                <Tooltip
                  id="my-tooltip-incoporation"
                  style={{
                    zIndex: 10,
                    // backgroundColor: "#60D669",
                    borderRadius: "6px",
                    position: "absolute",
                    color: "#FFFFFF",
                    width: "270px",
                    fontSize: "12px",
                    lineHeight: "14px",
                    fontFamily: "Open Sans",
                    fontWeight: "500",
                    letterSpacing: "1px",
                    textTransform: "capitalize",
                  }}
                />
              </div>
              <div className="pt-[15px]">
                <CustomInputBox label="Upload Invoice" />
              </div>
            </div>
            {/* seventh section sign with stamp */}
            <div>
              <div className="flex gap-x-2 items-center text-center">
                <p className="font-Open font-semibold text-lg leading-5 text-[#323232]">
                  Sign with Stamp
                </p>
                <img
                  src={InfoIcon}
                  alt="tooltip-icon"
                  className={`${"cursor-pointer"}`}
                  data-tooltip-id="my-tooltip-incoporation"
                  data-tooltip-content={`${"content of Certificate of Incorporation tooltip"}`}
                />
                <Tooltip
                  id="my-tooltip-incoporation"
                  style={{
                    zIndex: 10,
                    // backgroundColor: "#60D669",
                    borderRadius: "6px",
                    position: "absolute",
                    color: "#FFFFFF",
                    width: "270px",
                    fontSize: "12px",
                    lineHeight: "14px",
                    fontFamily: "Open Sans",
                    fontWeight: "500",
                    letterSpacing: "1px",
                    textTransform: "capitalize",
                  }}
                />
              </div>
              <div className="pt-[15px]">
                <CustomInputBox label="Upload Invoice" />
              </div>
            </div>
            {/* eight section address proof */}
            <div>
              <div className="flex gap-x-2 items-center text-center">
                <p className="font-Open font-semibold text-lg leading-5 text-[#323232]">
                  Registered Office Address Proof
                </p>
                <img
                  src={InfoIcon}
                  alt="tooltip-icon"
                  className={`${"cursor-pointer"}`}
                  data-tooltip-id="my-tooltip-incoporation"
                  data-tooltip-content={`${"content of Certificate of Incorporation tooltip"}`}
                />
                <Tooltip
                  id="my-tooltip-incoporation"
                  style={{
                    zIndex: 10,
                    // backgroundColor: "#60D669",
                    borderRadius: "6px",
                    position: "absolute",
                    color: "#FFFFFF",
                    width: "270px",
                    fontSize: "12px",
                    lineHeight: "14px",
                    fontFamily: "Open Sans",
                    fontWeight: "500",
                    letterSpacing: "1px",
                    textTransform: "capitalize",
                  }}
                />
              </div>
              <div className="pt-[15px] flex flex-col gap-y-[15px]">
                <CustomDropDown
                  value={""}
                  onChange={() => {}}
                  options={[
                    {
                      value: "Electricity Bill",
                      label: "Electricity Bill",
                    },
                    {
                      value: " Lease Agreement for the office premises",
                      label: " Lease Agreement for the office premises",
                    },
                  ]}
                  heading=" select type"
                />
                <CustomInputBox label="Upload Invoice" />
              </div>
            </div>
          </div>
        </>
      );
    } else if (selectedtype === "soleProprieter") {
      return (
        <>
          {/* parent div  */}
          <div className="flex flex-col gap-y-5 p-2">
            {/* name  */}
            <div className="pt-3">
              <CustomInputBox label="Company Name" />
            </div>
            {/* second section Shop and Establishment Certificate  */}
            <div>
              <div className="flex gap-x-2 items-center text-center">
                <p className="font-Open font-semibold text-lg leading-5 text-[#323232]">
                  Shop and Establishment Certificate
                </p>
                <img
                  src={InfoIcon}
                  alt="tooltip-icon"
                  className={`${"cursor-pointer"}`}
                  data-tooltip-id="my-tooltip-incoporation"
                  data-tooltip-content={`${"content of Certificate of Incorporation tooltip"}`}
                />
                <Tooltip
                  id="my-tooltip-incoporation"
                  style={{
                    zIndex: 10,
                    // backgroundColor: "#60D669",
                    borderRadius: "6px",
                    position: "absolute",
                    color: "#FFFFFF",
                    width: "270px",
                    fontSize: "12px",
                    lineHeight: "14px",
                    fontFamily: "Open Sans",
                    fontWeight: "500",
                    letterSpacing: "1px",
                    textTransform: "capitalize",
                  }}
                />
              </div>
              <div className="pt-[15px]">
                <CustomInputBox label="Upload Invoice" />
              </div>
            </div>
            {/* third section Business Registration Certificate*/}
            <div>
              <div className="flex gap-x-2 items-center text-center">
                <p className="font-Open font-semibold text-lg leading-5 text-[#323232]">
                  Business Registration Certificate
                </p>
                <img
                  src={InfoIcon}
                  alt="tooltip-icon"
                  className={`${"cursor-pointer"}`}
                  data-tooltip-id="my-tooltip-incoporation"
                  data-tooltip-content={`${"content of Certificate of Incorporation tooltip"}`}
                />
                <Tooltip
                  id="my-tooltip-incoporation"
                  style={{
                    zIndex: 10,
                    // backgroundColor: "#60D669",
                    borderRadius: "6px",
                    position: "absolute",
                    color: "#FFFFFF",
                    width: "270px",
                    fontSize: "12px",
                    lineHeight: "14px",
                    fontFamily: "Open Sans",
                    fontWeight: "500",
                    letterSpacing: "1px",
                    textTransform: "capitalize",
                  }}
                />
              </div>
              <div className="pt-[15px]">
                <CustomInputBox label="Upload Invoice" />
              </div>
            </div>

            {/* fourth section AD Details */}
            <div>
              <div className="flex gap-x-2 items-center text-center">
                <p className="font-Open font-semibold text-lg leading-5 text-[#323232]">
                  AD Details
                  <span className="font-Open text-xs font-normal leading-4 text-[#777777] ml-1">
                    (AD Code is mandatory for CSB5 shipment)
                  </span>
                </p>
                <img
                  src={InfoIcon}
                  alt="tooltip-icon"
                  className={`${"cursor-pointer"}`}
                  data-tooltip-id="my-tooltip-incoporation"
                  data-tooltip-content={`${"content of Certificate of Incorporation tooltip"}`}
                />
                <Tooltip
                  id="my-tooltip-incoporation"
                  style={{
                    zIndex: 10,
                    // backgroundColor: "#60D669",
                    borderRadius: "6px",
                    position: "absolute",
                    color: "#FFFFFF",
                    width: "270px",
                    fontSize: "12px",
                    lineHeight: "14px",
                    fontFamily: "Open Sans",
                    fontWeight: "500",
                    letterSpacing: "1px",
                    textTransform: "capitalize",
                  }}
                />
              </div>
              <div className="flex pt-[15px] gap-x-5">
                <div className="flex-1">
                  <CustomInputBox label="AD Number" />
                </div>
                <div className="flex-1">
                  <CustomInputBox label="File Upload" inputType="file" />
                </div>
              </div>
            </div>
            {/* fifth section IEC */}
            <div>
              <div className="flex gap-x-2 items-center text-center">
                <p className="font-Open font-semibold text-lg leading-5 text-[#323232]">
                  IEC Code
                </p>
                <img
                  src={InfoIcon}
                  alt="tooltip-icon"
                  className={`${"cursor-pointer"}`}
                  data-tooltip-id="my-tooltip-incoporation"
                  data-tooltip-content={`${"content of Certificate of Incorporation tooltip"}`}
                />
                <Tooltip
                  id="my-tooltip-incoporation"
                  style={{
                    zIndex: 10,
                    // backgroundColor: "#60D669",
                    borderRadius: "6px",
                    position: "absolute",
                    color: "#FFFFFF",
                    width: "270px",
                    fontSize: "12px",
                    lineHeight: "14px",
                    fontFamily: "Open Sans",
                    fontWeight: "500",
                    letterSpacing: "1px",
                    textTransform: "capitalize",
                  }}
                />
              </div>
              <div className="flex pt-[15px] gap-x-5">
                <div className="flex-1">
                  <CustomInputBox label="IEC Number" />
                </div>
                <div className="flex-1">
                  <CustomInputBox label="File Upload" inputType="file" />
                </div>
              </div>
            </div>
            {/* sixth section sign with stamp */}
            <div>
              <div className="flex gap-x-2 items-center text-center">
                <p className="font-Open font-semibold text-lg leading-5 text-[#323232]">
                  Sign with Stamp
                </p>
                <img
                  src={InfoIcon}
                  alt="tooltip-icon"
                  className={`${"cursor-pointer"}`}
                  data-tooltip-id="my-tooltip-incoporation"
                  data-tooltip-content={`${"content of Certificate of Incorporation tooltip"}`}
                />
                <Tooltip
                  id="my-tooltip-incoporation"
                  style={{
                    zIndex: 10,
                    // backgroundColor: "#60D669",
                    borderRadius: "6px",
                    position: "absolute",
                    color: "#FFFFFF",
                    width: "270px",
                    fontSize: "12px",
                    lineHeight: "14px",
                    fontFamily: "Open Sans",
                    fontWeight: "500",
                    letterSpacing: "1px",
                    textTransform: "capitalize",
                  }}
                />
              </div>
              <div className="pt-[15px]">
                <CustomInputBox label="Upload Invoice" />
              </div>
            </div>
            {/* seventh section address proof */}
            <div>
              <div className="flex gap-x-2 items-center text-center">
                <p className="font-Open font-semibold text-lg leading-5 text-[#323232]">
                  Registered Office Address Proof
                </p>
                <img
                  src={InfoIcon}
                  alt="tooltip-icon"
                  className={`${"cursor-pointer"}`}
                  data-tooltip-id="my-tooltip-incoporation"
                  data-tooltip-content={`${"content of Certificate of Incorporation tooltip"}`}
                />
                <Tooltip
                  id="my-tooltip-incoporation"
                  style={{
                    zIndex: 10,
                    // backgroundColor: "#60D669",
                    borderRadius: "6px",
                    position: "absolute",
                    color: "#FFFFFF",
                    width: "270px",
                    fontSize: "12px",
                    lineHeight: "14px",
                    fontFamily: "Open Sans",
                    fontWeight: "500",
                    letterSpacing: "1px",
                    textTransform: "capitalize",
                  }}
                />
              </div>
              <div className="pt-[15px] flex flex-col gap-y-[15px]">
                <CustomDropDown
                  value={""}
                  onChange={() => {}}
                  options={[
                    {
                      value: "Electricity Bill",
                      label: "Electricity Bill",
                    },
                    {
                      value: " Lease Agreement for the office premises",
                      label: " Lease Agreement for the office premises",
                    },
                  ]}
                  heading=" select type"
                />
                <CustomInputBox label="Upload Invoice" />
              </div>
            </div>
          </div>
        </>
      );
    }
  };
  return (
    <>
      <div className="mx-5">
        <div className="flex justify-between py-5 items-center text-center">
          <div className="flex gap-x-[8px] ">
            <img src={ServiceVerification} alt="locationIcon" />
            <p className="font-Lato font-normal text-2xl text-[#323232] leading-8 capitalize">
              Do KYC
            </p>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setIsKycModalOpen(false)}
          >
            <img src={CrossIcon} alt="close button" />
          </div>
        </div>
        <div className="flex justify-between items-center text-center p-2">
          <div className="flex gap-x-2 items-center text-center">
            <p className="font-Open font-semibold text-base leading-5 text-[#323232] whitespace-nowrap">
              Customer Type
            </p>
            <img
              src={InfoIcon}
              alt="tooltip-icon"
              className={`${"cursor-pointer"}`}
              data-tooltip-id="my-tooltip-customer-type"
              data-tooltip-content={`${"content IGST Payment Status tooltip"}`}
            />
            <Tooltip
              id="my-tooltip-customer-type"
              style={{
                zIndex: 10,
                //   backgroundColor: "#60D669",
                //   borderRadius: "6px",
                position: "absolute",
                //   color: "#FFFFFF",
                width: "270px",
                fontSize: "12px",
                lineHeight: "14px",
                fontFamily: "Open Sans",
                fontWeight: "500",
                letterSpacing: "1px",
                textTransform: "capitalize",
              }}
            />
          </div>

          <div>
            <CustomDropDown
              value={selectedtype}
              selectClassName="!max-w-[200px] !h-[36px]"
              onChange={(e: any) => {
                setSelectedType(e.target.value);
              }}
              options={[
                {
                  value: "individual",
                  label: "Individual",
                },
                {
                  value: "company",
                  label: "Company",
                },
                {
                  value: "trustOrFoundation",
                  label: "Trust or Foundation",
                },
                {
                  value: "partnership",
                  label: "Partnership",
                },
                {
                  value: "soleProprieter",
                  label: "Sole Proprietor",
                },
              ]}
              heading=" select type"
            />
          </div>
        </div>
        <div className="h-[calc(100vh-90px)] overflow-y-auto pb-[107px]">
          {kycFlow()}
        </div>
      </div>
      <div
        className="flex justify-end gap-x-5 shadow-lg border-[1px] h-[68px] bg-[#FFFFFF] px-6 py-4 rounded-tr-[32px] rounded-tl-[32px] fixed bottom-0"
        style={{ width: "-webkit-fill-available" }}
      >
        <ServiceButton
          text={"SAVE"}
          // onClick={handleSave}
          onClick={() => {}}
          className={`bg-[#1C1C1C] text-[#FFFFFF] h-[36px] lg:!py-2 lg:!px-4 disabled:bg-[#E8E8E8] disabled:text-[#BBB] disabled:border-none`}
        />
      </div>
    </>
  );
};

export default KycContent;
