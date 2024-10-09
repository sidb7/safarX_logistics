import React from "react";
import CustomRadioButton from "../../../../components/RadioButton/Index";
import singlePageLabel from "../../../../assets/singlePageLabel.svg";
import singlePageLabelSQ from "../../../../assets/singlePageLabelSQ.svg";
import multiplePageLabel from "../../../../assets/multiplePageLabel.svg";

interface ILabelSectionProps {}

const LabelSection: React.FunctionComponent<ILabelSectionProps> = (props) => {
  return (
    <>
      <div className="flex flex-col gap-y-4 pt-4">
        {/* <div>hey this is label section</div> */}
        <div className="flex">
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
      </div>
    </>
  );
};

export default LabelSection;
