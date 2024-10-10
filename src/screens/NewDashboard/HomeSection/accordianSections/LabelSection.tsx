import React from "react";
import CustomRadioButton from "../../../../components/RadioButton/Index";
import singlePageLabel from "../../../../assets/singlePageLabel.svg";
import singlePageLabelSQ from "../../../../assets/singlePageLabelSQ.svg";
import multiplePageLabel from "../../../../assets/multiplePageLabel.svg";
import CustomInputBox from "../../../../components/Input";
import OneButton from "../../../../components/Button/OneButton";

interface ILabelSectionProps {}

const LabelSection: React.FunctionComponent<ILabelSectionProps> = (props) => {
  return (
    <>
      <div className="flex flex-col gap-y-5 pt-5">
        {/* <div>hey this is label section</div> */}
        <div className="flex flex-col md:flex md:flex-row">
          <div
            className="flex-1 transition-all ease-in-out duration-200 hover:scale-[103%] flex flex-col justify-start items-start cursor-pointer"
            // onClick={() => handleOptionChange("singlePage")}
          >
            <img src={singlePageLabel} alt="singlePageLabel" />
            <div className="md:w-[80%] text-center flex-col flex justify-center items-center">
              <p className="font-Lato text-sm font-semibold leading-5 capitalize pt-[30px] text-[#777777]">
                Single Page(most commonly used label)
              </p>
              <CustomRadioButton
                name="singlePage"
                value="singlePage"
                // checked={checked === "singlePage"}
                // defaultChecked=""
                onChange={() => {}}
                inputClassName="h-full m-2"
                style={{ accentColor: "black" }}
              />
            </div>
          </div>
          <div
            className="flex-1 transition-all ease-in-out duration-200 hover:scale-[103%] flex flex-col justify-start items-start cursor-pointer"
            // onClick={() => handleOptionChange("multiplePage")}
          >
            <img src={multiplePageLabel} alt="multiplePageLabel" />
            <div className="md:w-[80%] text-center flex-col flex justify-center items-center">
              <p className="font-Lato text-sm font-semibold leading-5 capitalize pt-[30px] text-[#777777]">
                Multiple Page (To show detailed SKU info)
              </p>
              <CustomRadioButton
                name="singlePage"
                value="multiplePage"
                // checked={checked === "multiplePage"}
                // defaultChecked=""
                onChange={() => {}}
                inputClassName="h-full m-2"
                style={{ accentColor: "black" }}
              />
            </div>
          </div>
          <div
            className="flex-1 transition-all ease-in-out duration-200 hover:scale-[103%] flex flex-col justify-start items-start cursor-pointer"
            // onClick={() => handleOptionChange("singlePageSquared")}
          >
            <img src={singlePageLabelSQ} alt="singlePageLabelSQ" />
            <div className="md:w-[80%] text-center flex-col flex justify-center items-center">
              <p className="font-Lato text-sm font-semibold leading-5 capitalize pt-[30px] text-[#777777]">
                Single Page(square shaped shipping label)
              </p>
              <CustomRadioButton
                name="singlePage"
                value="singlePageSquared"
                // checked={checked === "singlePageSquared"}
                // defaultChecked=""
                onChange={() => {}}
                inputClassName="h-full m-2"
                style={{ accentColor: "black" }}
              />
            </div>
          </div>
        </div>
        <p className="font-semibold font-Open leading-5 text-sm tracking-wide">
          Fill the details of your Brand.
        </p>
        <div className="flex flex-col md:flex md:flex-row gap-5">
          <div className="min-w-[240px] xl:min-w-[450px]">
            <CustomInputBox
              containerStyle={`lg:!w-full`}
              //   value={accountName || ""}
              inputMode="numeric"
              label="Brand Name"
              className="!w-full "
              maxLength={50}
              //   onChange={(e) => setAccountName(e.target.value)}
              id="accountNumber"
            />
          </div>
          <div className="min-w-[240px] xl:min-w-[450px]">
            <CustomInputBox
              label="Brand Logo"
              containerStyle={`lg:!w-full`}
              maxLength={11}
              //   value={ifscCode}
              inputType="text"
              id="ifscCode"
              className="!w-full"
              //   onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
            />
          </div>
        </div>
        <div className="flex justify-between pt-5">
          <OneButton
            text={"Save"}
            onClick={() => {}}
            variant="tertiary"
            className="!bg-transparent"
          />

          <OneButton
            text={"Click Here To Know More"}
            onClick={() => {}}
            variant="tertiary"
            className="!bg-transparent"
          />
        </div>
      </div>
    </>
  );
};

export default LabelSection;
