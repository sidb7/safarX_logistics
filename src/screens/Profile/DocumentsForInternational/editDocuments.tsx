import React from "react";
import { Breadcrum } from "../../../components/Layout/breadcrum";
import CustomInputBox from "../../../components/Input";
import InfoIcon from "../../../assets/info.svg";
import { Tooltip } from "react-tooltip";
import CustomUploadSinglePage from "../../../components/CustomUploadSinglePage";
import CustomDropDown from "../../../components/DropDown";
import { useLocation } from "react-router-dom";
import ServiceButton from "../../../components/Button/ServiceButton";
import OneButton from "../../../components/Button/OneButton";

interface IEditDocumentsProps {}

const EditDocuments: React.FunctionComponent<IEditDocumentsProps> = (props) => {
  const location = useLocation();
  // console.log("🚀 ~ location:", location?.state?.data?.businessType);
  const businessType = location?.state?.data?.businessType || "";

  const renderIndividualDocument = () => {
    return (
      <>
        <div className="px-5 pt-8 flex flex-col gap-y-9">
          <div className="flex flex-wrap gap-x-8">
            <div className="flex-1">
              <div className="flex gap-x-2 items-center text-center">
                <p className="font-Open font-semibold text-lg leading-5 text-[#323232]">
                  Sign with Stamp
                </p>
                <img
                  src={InfoIcon}
                  alt="tooltip-icon"
                  className={`${"cursor-pointer"}`}
                  data-tooltip-id="my-tooltip-sign-wth-stamp-individual"
                  data-tooltip-content={`${"We Need it for Export invoice for custom to release shipments"}`}
                />
                <Tooltip
                  id="my-tooltip-sign-wth-stamp-individual"
                  style={{
                    zIndex: 10,
                    backgroundColor: "#004EFF",
                    borderRadius: "2px",
                    position: "absolute",
                    color: "#FFFFFF",
                    width: "270px",
                    fontSize: "12px",
                    lineHeight: "16px",
                    fontFamily: "Open Sans",
                    fontWeight: "600",
                    letterSpacing: "1px",
                    textTransform: "capitalize",
                  }}
                />
              </div>
              <div className="flex gap-x-5 pt-[15px]">
                <div className="flex-1">
                  {/* <CustomInputBox label="File Upload" inputType="file" /> */}
                  <CustomUploadSinglePage
                    placeholder="File Upload"
                    showUploadText={true}
                  />
                </div>
                <div className="flex-1">
                  {/* <CustomInputBox label="CIN Number" /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderCompanyDocument = () => {
    return (
      <>
        <div className="px-5 pt-8 flex flex-col gap-y-9">
          {/* first section */}
          <div className="flex flex-wrap gap-x-8">
            <div className="flex-1">
              <div className="flex gap-x-2 items-center text-center">
                <p className="font-Open font-semibold text-lg leading-5 text-[#323232]">
                  Certificate of Incorporation
                </p>
                {/* <img
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
                /> */}
              </div>
              <div className="flex gap-x-5 pt-[15px]">
                <div className="flex-1">
                  <CustomInputBox label="CIN Number" />
                </div>
                <div className="flex-1">
                  {/* <CustomInputBox label="File Upload" inputType="file" /> */}
                  <CustomUploadSinglePage placeholder="File Upload" />
                </div>
              </div>
            </div>
            <div className="flex-1">
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
                  data-tooltip-id="my-tooltip-AD-Details"
                  data-tooltip-content={`${"Authorised Dealer"}`}
                />
                <Tooltip
                  id="my-tooltip-AD-Details"
                  style={{
                    zIndex: 10,
                    backgroundColor: "#004EFF",
                    borderRadius: "2px",
                    position: "absolute",
                    color: "#FFFFFF",
                    width: "auto",
                    fontSize: "12px",
                    lineHeight: "16px",
                    fontFamily: "Open Sans",
                    fontWeight: "600",
                    letterSpacing: "1px",
                    textTransform: "capitalize",
                  }}
                />
              </div>
              <div className="flex gap-x-5 pt-[15px]">
                <div className="flex-1">
                  <CustomInputBox label="AD Code" />
                </div>
                <div className="flex-1">
                  {/* <CustomInputBox label="File Upload" inputType="file" /> */}
                  <CustomUploadSinglePage placeholder="File Upload" />
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex gap-x-2 items-center text-center">
                <p className="font-Open font-semibold text-lg leading-5 text-[#323232]">
                  IEC Code
                </p>
                <img
                  src={InfoIcon}
                  alt="tooltip-icon"
                  className={`${"cursor-pointer"}`}
                  data-tooltip-id="my-tooltip-IEC-Details"
                  data-tooltip-content={`${"Importer Exporter"}`}
                />
                <Tooltip
                  id="my-tooltip-IEC-Details"
                  style={{
                    zIndex: 10,
                    backgroundColor: "#004EFF",
                    borderRadius: "2px",
                    position: "absolute",
                    color: "#FFFFFF",
                    width: "auto",
                    fontSize: "12px",
                    lineHeight: "16px",
                    fontFamily: "Open Sans",
                    fontWeight: "600",
                    letterSpacing: "1px",
                    textTransform: "capitalize",
                  }}
                />
              </div>
              <div className="flex gap-x-5 pt-[15px]">
                <div className="flex-1">
                  <CustomInputBox label="IEC Code" />
                </div>
                <div className="flex-1">
                  {/* <CustomInputBox label="File Upload" inputType="file" /> */}
                  <CustomUploadSinglePage placeholder="File Upload" />
                </div>
              </div>
            </div>
          </div>
          {/* second section  */}
          <div className="flex flex-wrap gap-x-8">
            <div className="flex-1">
              <div className="flex gap-x-2 items-center text-center">
                <p className="font-Open font-semibold text-lg leading-5 text-[#323232]">
                  Sign with Stamp
                </p>
                <img
                  src={InfoIcon}
                  alt="tooltip-icon"
                  className={`${"cursor-pointer"}`}
                  data-tooltip-id="my-tooltip-Sign-With-Stamp-Company"
                  data-tooltip-content={`${"We Need it for Export invoice for custom to release shipments"}`}
                />
                <Tooltip
                  id="my-tooltip-Sign-With-Stamp-Company"
                  style={{
                    zIndex: 10,
                    backgroundColor: "#004EFF",
                    borderRadius: "2px",
                    position: "absolute",
                    color: "#FFFFFF",
                    width: "270px",
                    fontSize: "12px",
                    lineHeight: "16px",
                    fontFamily: "Open Sans",
                    fontWeight: "600",
                    letterSpacing: "1px",
                    textTransform: "capitalize",
                  }}
                />
              </div>
              <div className="flex gap-x-5 pt-[15px]">
                <div className="flex-1">
                  {/* <CustomInputBox label="File Upload" inputType="file" /> */}
                  <CustomUploadSinglePage
                    placeholder="File Upload"
                    showUploadText={true}
                  />
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex gap-x-2 items-center text-center">
                <p className="font-Open font-semibold text-lg leading-5 text-[#323232]">
                  Certificate of Registration
                </p>
                {/* <img
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
                /> */}
              </div>
              <div className="flex gap-x-5 pt-[15px]">
                <div className="flex-1">
                  {/* <CustomInputBox label="File Upload" inputType="file" /> */}
                  <CustomUploadSinglePage
                    placeholder="File Upload"
                    showUploadText={true}
                  />
                </div>
              </div>
            </div>
            <div className="flex-1"></div>
          </div>
          {/* third section  */}
          <div className="flex flex-wrap gap-x-8">
            <div className="flex-1">
              <div className="flex gap-x-2 items-center text-center">
                <p className="font-Open font-semibold text-lg leading-5 text-[#323232]">
                  Board Resolution of Authority
                </p>
                {/* <img
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
                /> */}
              </div>
              <div className="flex gap-x-5 pt-[15px]">
                <div className="flex-1">
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
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex gap-x-5 pt-[36px]">
                <div className="flex-1">
                  {/* <CustomInputBox label="File Upload" inputType="file" /> */}
                  <CustomUploadSinglePage
                    placeholder="File Upload"
                    showUploadText={true}
                  />
                </div>
              </div>
            </div>
            <div className="flex-1"></div>
          </div>
          {/* fourth section  */}
          <div className="flex flex-wrap gap-x-8">
            <div className="flex-1">
              <div className="flex gap-x-2 items-center text-center">
                <p className="font-Open font-semibold text-lg leading-5 text-[#323232]">
                  Registered Office Address Proof
                </p>
                {/* <img
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
                /> */}
              </div>
              <div className="flex gap-x-5 pt-[15px]">
                <div className="flex-1">
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
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex gap-x-5 pt-[36px]">
                <div className="flex-1">
                  {/* <CustomInputBox label="File Upload" inputType="file" /> */}
                  <CustomUploadSinglePage
                    placeholder="File Upload "
                    showUploadText={true}
                  />
                </div>
              </div>
            </div>
            <div className="flex-1"></div>
          </div>
        </div>
      </>
    );
  };
  const renderDocument = () => {
    if (businessType === "INDIVIDUAL") {
      return renderIndividualDocument();
    } else if (businessType === "COMPANY") {
      return renderCompanyDocument();
    } else {
      return <div>No document to fill!</div>;
    }
  };
  return (
    <>
      <div className="px-5">
        <div className="">
          <Breadcrum label="Document" />
        </div>
        {renderDocument()}
      </div>
      <div
        className="flex justify-end gap-x-5 shadow-lg border-[1px] h-[68px] bg-[#FFFFFF] px-6 py-4 rounded-tr-[32px] rounded-tl-[32px] fixed bottom-0 lg:-ml-2"
        style={{ width: "-webkit-fill-available" }}
      >
        <OneButton
          text={"CANCEL"}
          // onClick={handleSave}
          onClick={() => {}}
          variant="secondary"
          className={` h-[36px] lg:!py-2 lg:!px-4 `}
        />
        <OneButton
          text={"SAVE"}
          // onClick={handleSave}
          onClick={() => {}}
          variant="primary"
          className={` h-[36px] lg:!py-2 lg:!px-4 `}
        />
      </div>
    </>
  );
};

export default EditDocuments;
