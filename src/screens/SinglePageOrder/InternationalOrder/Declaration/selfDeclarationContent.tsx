import React from "react";
import ServiceButton from "../../../../components/Button/ServiceButton";
import selfDeclarationIcon from "../../../../assets/selfDeclaration.svg";
import CrossIcon from "../../../../assets/CloseIcon.svg";
import InfoIcon from "../../../../assets/info.svg";
import { Tooltip } from "react-tooltip";
import CustomDropDown from "../../../../components/DropDown";
interface ISelfDeclarationContentProps {
  setIsSelfDeclarationModalOpen?: any;
}

const SelfDeclarationContent: React.FunctionComponent<
  ISelfDeclarationContentProps
> = ({ setIsSelfDeclarationModalOpen }) => {
  return (
    <>
      <div className="mx-5">
        <div className="flex justify-between py-5 items-center ">
          <div className="flex gap-x-[8px] ">
            <img src={selfDeclarationIcon} alt="locationIcon" />
            <p className="font-Lato font-normal text-2xl text-[#323232] leading-8 capitalize">
              Self Declaration
            </p>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setIsSelfDeclarationModalOpen(false)}
          >
            <img src={CrossIcon} alt="close button" />
          </div>
        </div>
        <div className="flex flex-col gap-y-9 pt-6">
          <div className="flex">
            <div className="flex flex-1 gap-x-1 items-center ">
              <p className="font-Open font-semibold text-sm leading-4 text-[#323232] ">
                Is Commodity under 3C applicable?
              </p>
              {/* <img
                src={InfoIcon}
                alt="tooltip-icon"
                className={`${"cursor-pointer"}`}
                data-tooltip-id="my-tooltip-commodity"
                data-tooltip-content={`${"content 3C tooltip"}`}
              />
              <Tooltip
                id="my-tooltip-commodity"
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
              /> */}
            </div>
            <div className="flex flex-2 gap-x-4">
              <div className=" flex justify-start items-center h-fit">
                <input
                  type="radio"
                  name="type"
                  value={""}
                  className=" mr-2 w-[15px] cursor-pointer h-[15px]"
                  checked={true}
                  // onChange={(e) => {
                  //   setOrder({
                  //     ...initialState,
                  //     orderType: "B2C",
                  //     transit: "FORWARD",
                  //   });
                  //   setResetOtherAddressDetails(true);
                  //   setPaymentMode("PREPAID");
                  // }}
                  onChange={() => {}}
                />
                <div className="text-[15px]">YES</div>
              </div>
              <div className=" flex justify-start items-center h-fit">
                <input
                  type="radio"
                  name="type"
                  value={""}
                  className=" mr-2 w-[15px] cursor-pointer h-[15px]"
                  checked={false}
                  onChange={() => {}}
                />
                <div className="text-[15px]">NO</div>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-1 gap-x-1 items-center ">
              <p className="font-Open font-semibold text-sm leading-4 text-[#323232] ">
                Is MEIS (Merchandise Exports from India Scheme) applicable?
              </p>
              {/* <img
                src={InfoIcon}
                alt="tooltip-icon"
                className={`${"cursor-pointer"}`}
                data-tooltip-id="my-tooltip-MEIS"
                data-tooltip-content={`${"content MEIS tooltip"}`}
              />
              <Tooltip
                id="my-tooltip-MEIS"
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
              /> */}
            </div>
            <div className="flex flex-2 gap-x-4">
              <div className=" flex justify-start items-center h-fit">
                <input
                  type="radio"
                  name="type"
                  value={""}
                  className=" mr-2 w-[15px] cursor-pointer h-[15px]"
                  checked={true}
                  // onChange={(e) => {
                  //   setOrder({
                  //     ...initialState,
                  //     orderType: "B2C",
                  //     transit: "FORWARD",
                  //   });
                  //   setResetOtherAddressDetails(true);
                  //   setPaymentMode("PREPAID");
                  // }}
                  onChange={() => {}}
                />
                <div className="text-[15px]">YES</div>
              </div>
              <div className=" flex justify-start items-center h-fit">
                <input
                  type="radio"
                  name="type"
                  value={""}
                  className=" mr-2 w-[15px] cursor-pointer h-[15px]"
                  checked={false}
                  onChange={() => {}}
                />
                <div className="text-[15px]">NO</div>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-1 gap-x-1 items-center ">
              <p className="font-Open font-semibold text-sm leading-4 text-[#323232] ">
                Govt Or Non Govt
              </p>
              {/* <img
                src={InfoIcon}
                alt="tooltip-icon"
                className={`${"cursor-pointer"}`}
                data-tooltip-id="my-tooltip-govt"
                data-tooltip-content={`${"content Govt or non-Govt tooltip"}`}
              />
              <Tooltip
                id="my-tooltip-govt"
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
              /> */}
            </div>
            <div className="flex flex-2 gap-x-4">
              <div className=" flex justify-start items-center h-fit">
                <input
                  type="radio"
                  name="type"
                  value={""}
                  className=" mr-2 w-[15px] cursor-pointer h-[15px]"
                  checked={true}
                  // onChange={(e) => {
                  //   setOrder({
                  //     ...initialState,
                  //     orderType: "B2C",
                  //     transit: "FORWARD",
                  //   });
                  //   setResetOtherAddressDetails(true);
                  //   setPaymentMode("PREPAID");
                  // }}
                  onChange={() => {}}
                />
                <div className="text-[15px]">YES</div>
              </div>
              <div className=" flex justify-start items-center h-fit">
                <input
                  type="radio"
                  name="type"
                  value={""}
                  className=" mr-2 w-[15px] cursor-pointer h-[15px]"
                  checked={false}
                  onChange={() => {}}
                />
                <div className="text-[15px]">NO</div>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-1 gap-x-1 items-center ">
              <p className="font-Open font-semibold text-sm leading-4 text-[#323232] ">
                IGST Payment Status
              </p>
              {/* <img
                src={InfoIcon}
                alt="tooltip-icon"
                className={`${"cursor-pointer"}`}
                data-tooltip-id="my-tooltip-payment-status"
                data-tooltip-content={`${"content IGST Payment Status tooltip"}`}
              />
              <Tooltip
                id="my-tooltip-payment-status"
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
              /> */}
            </div>
            <div>
              <CustomDropDown
                value={""}
                onChange={() => {}}
                selectClassName="!w-[200px] !h-[40px]"
                options={[
                  {
                    value: "notApplicable",
                    label: "Not Applicable",
                  },
                  {
                    value: "lutOrExportUnderBond",
                    label: "LUT or Export under Bond",
                  },
                  {
                    value: "exportAgainstPaymentOfIGST",
                    label: "Export against payment of IGST",
                  },
                ]}
                heading=" select the status"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-x-1 items-center ">
              <p className="font-Open font-semibold text-sm leading-4 text-[#323232] ">
                International Commercial Terms
              </p>
              {/* <img
                src={InfoIcon}
                alt="tooltip-icon"
                className={`${"cursor-pointer"}`}
                data-tooltip-id="my-tooltip-commercial-terms"
                data-tooltip-content={`${"content of International Commercial Terms tooltip"}`}
              />
              <Tooltip
                id="my-tooltip-commercial-terms"
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
              /> */}
            </div>
            <div>
              <CustomDropDown
                value={""}
                onChange={() => {}}
                selectClassName="!w-[200px] !h-[40px]"
                options={[
                  {
                    value: "CIF",
                    label: "CIF",
                  },
                  {
                    value: "FOB",
                    label: "FOB",
                  },
                ]}
                heading="Select the terms"
              />
            </div>
          </div>
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

export default SelfDeclarationContent;
