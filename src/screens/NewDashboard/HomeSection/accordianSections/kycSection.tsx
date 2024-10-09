import React from "react";
import Checkbox from "../../../../components/CheckBox";
import CustomInputBox from "../../../../components/Input";
import TimerCounter from "../../../../components/TimerCountdown";

interface IKycSectionProps {}

const KycSection: React.FunctionComponent<IKycSectionProps> = (props) => {
  return (
    <>
      <div className="flex flex-col gap-y-4">
        {/* radio button section to select the type */}
        <div className="flex justify-start items-center gap-x-2 pt-4">
          <input
            type="radio"
            name="type"
            value={""}
            // disabled={showDownloadLebal}
            className=" mr-2 w-[15px] cursor-pointer h-[15px]"
            // checked={order?.orderType === "B2C" && order?.transit === "FORWARD"}
            // onChange={(e) => {
            //   setOrder({
            //     ...initialState,
            //     orderType: "B2C",
            //     transit: "FORWARD",
            //   });
            //   setResetOtherAddressDetails(true);
            //   setPaymentMode("PREPAID");
            // }}
          />
          <span className="font-Open text-[15px] lg:text-base font-normal leading-8 lg:!leading-[26px] mr-2">
            Individual
          </span>
          <input
            type="radio"
            name="type"
            value={""}
            // disabled={showDownloadLebal}
            className=" mr-2 w-[15px] cursor-pointer h-[15px]"
            // checked={order?.orderType === "B2C" && order?.transit === "FORWARD"}
            // onChange={(e) => {
            //   setOrder({
            //     ...initialState,
            //     orderType: "B2C",
            //     transit: "FORWARD",
            //   });
            //   setResetOtherAddressDetails(true);
            //   setPaymentMode("PREPAID");
            // }}
          />
          <span className="font-Open text-[15px] lg:text-base font-normal leading-8 lg:!leading-[26px] mr-2">
            Company
          </span>
        </div>
        <div>
          <p className="font-Open text-[15px] lg:text-base font-normal leading-6 text-[#004EFF] cursor-pointer">
            [Declaration of GST Non-Enrolment]{" "}
            <span className="text-[#697586] px-[2px]"> &</span>{" "}
            <span className="font-Open text-[15px] lg:text-base font-normal leading-6 text-[#004EFF] cursor-pointer">
              [Service Agreement]
            </span>
          </p>
        </div>
        {/* new checkbox functionality implemented */}
        <div className="font-Open text-[15px] lg:text-base font-normal leading-6 text-[#494949] self-start">
          <Checkbox
            checked={false}
            // onChange={(e: any) => setCheckbox(e.value)}
            name={"I Agree with the terms & conditions"}
            label={"I Agree with the terms & conditions"}
            style={{ accentColor: "black", width: "15px", height: "15px" }}
            checkboxClassName="gap-2"
          />
        </div>
        <div className="flex gap-5">
          <div className="min-w-[240px]">
            <CustomInputBox
              containerStyle={`lg:!w-auto`}
              label="Aadhar Number"
              id={"aadharNumber"}
              inputType="text"
              inputMode="numeric"
              value={"1234567891234"}
              maxLength={12}
              labelClassName="!font-Open"
              // className={` ${
              //   aadharNumberError !== "" &&
              //   aadharNumberError !== undefined &&
              //   "!border-[#F35838]"
              // }
              //     md:!w-[320px]   !font-Open`}
              // onChange={(e: any) => {
              //   if (aadharRegex.test(e.target.value)) {
              //     setAadharNumberError("");
              //   } else {
              //     setAadharNumberError("Enter Valid Aadhar Number");
              //   }
              //   setAadharNumber(e.target.value);
              // }}
            />

            {/* To display error */}

            {/* {aadharNumberError !== "" && aadharNumberError !== undefined && (
              <div className="flex items-center gap-x-1 mt-1 ">
                <img src={ErrorIcon} alt="" width={10} height={10} />

                <span className="font-normal font-Open  text-[#F35838] text-[10px]">
                  {aadharNumberError}
                </span>
              </div>
            )} */}
          </div>

          <div className="min-w-[240px]">
            <CustomInputBox
              containerStyle="lg:!w-auto"
              label="PAN Number"
              id="panNumber"
              value={"panN12345u"}
              maxLength={10}
              // isDisabled={
              //   businessType === "individual" ? false : panNumber !== undefined
              // }
              // className={`${
              //   panNumberError !== "" &&
              //   panNumberError !== undefined &&
              //   "border-[#F35838]"
              // }   md:!w-[320px] !font-Open`}
              // labelClassName="!font-Open"
              // onChange={(e) => {
              //   if (panRegex.test(e.target.value.toUpperCase())) {
              //     setPanNumberError("");
              //   } else {
              //     setPanNumberError("Enter Valid PAN Number");
              //   }
              //   setPanNumber(e.target.value.toUpperCase());
              // }}
            />
            {/* To display error */}
            {/* {panNumberError !== "" && panNumberError !== undefined && (
              <div className="flex items-center gap-x-1 mt-1 ">
                <img src={ErrorIcon} alt="" width={10} height={10} />
                <span className="font-normal font-Open text-[#F35838] text-[10px]">
                  {panNumberError}
                </span>
              </div>
            )} */}
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          {/* <div className={`${!isMdScreen ? "w-full" : ""}`}> */}
          <div className="">
            <CustomInputBox
              label="Enter Aadhar OTP"
              inputType="text"
              id={"aadharOtp"}
              inputMode="numeric"
              containerStyle="md:!w-auto"
              className=" md:!w-[240px] !font-Open "
              labelClassName="!font-Open"
              maxLength={6}
              // value={otpNumber || ""}
              // onChange={(e: any) => {
              //   if (isNaN(e.target.value)) {
              //   } else {
              //     setOTPNumber(e.target.value);
              //   }
              // }}
            />
          </div>
          <div>
            <TimerCounter sec={60} setOTPNumber={"setOTPNumber"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default KycSection;
