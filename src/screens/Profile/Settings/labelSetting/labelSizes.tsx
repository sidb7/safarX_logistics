import React from "react";
import singlePageLabel from "../../../../assets/singlePageLabel.svg";
import singlePageLabelSQ from "../../../../assets/singlePageLabelSQ.svg";
import multiplePageLabel from "../../../../assets/multiplePageLabel.svg";
import A4PageLabel from "../../../../assets/A4.svg";
import A5PageLabel from "../../../../assets/A5.svg";
import A6PageLabel from "../../../../assets/A6.svg";
import CustomRadioButton from "../../../../components/RadioButton/Index";

interface ILabelSizesProps {}

const LabelSizes: React.FunctionComponent<ILabelSizesProps> = (props) => {
  return (
    <>
      <div className="flex justify-between ">
        <div className="flex-1 px-5">
          <h3 className="font-Lato text-[22px] font-semibold leading-7 capitalize text-[#1C1C1C] mt-10">
            Recommended
          </h3>
          <p className="text-[#777777] font-Open text-xs font-normal leading-[22px]">
            Most Commonly used paper sizes for printing label
          </p>
        </div>
        <div className="flex-1">
          <h3 className="font-Lato text-[22px] font-semibold leading-7 capitalize text-[#1C1C1C] mt-10">
            other
          </h3>
          <p className="text-[#777777] font-Open text-xs font-normal leading-[22px]">
            Suitable for small home printer
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2  divide-x-2 h-[350px] my-6">
        <div className=" flex p-4">
          <div className="flex-1 flex flex-col justify-center items-center">
            <img
              src={singlePageLabel}
              alt="singlePageLabel"
              className="lg:h-[80%]"
            />
            <div className="lg:w-[80%] text-center flex-col flex justify-center items-center">
              <p className="font-Lato text-sm font-semibold leading-5 capitalize pt-[30px] text-[#777777]">
                Single Page(most commonly used label)
              </p>
              <CustomRadioButton
                // value=""
                inputClassName="h-full m-2"
                style={{ accentColor: "black" }}
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center items-center">
            <img
              src={multiplePageLabel}
              alt="multiplePageLabel"
              className="lg:h-[80%]"
            />
            <div className="lg:w-[80%] text-center flex-col flex justify-center items-center">
              <p className="font-Lato text-sm font-semibold leading-5 capitalize pt-[30px] text-[#777777]">
                Multiple Page (To show detailed SKU info)
              </p>
              <CustomRadioButton
                inputClassName="h-full m-2"
                style={{ accentColor: "black" }}
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center mr-2">
            <img
              src={singlePageLabelSQ}
              alt="singlePageLabelSQ"
              className="lg:h-[80%]"
            />
            <div className="lg:w-[80%] text-center flex-col flex justify-center items-center">
              <p className="font-Lato text-sm font-semibold leading-5 capitalize pt-[30px] text-[#777777]">
                Single Page(square shaped shipping label)
              </p>
              <CustomRadioButton
                inputClassName="h-full m-2"
                style={{ accentColor: "black" }}
              />
            </div>
          </div>
        </div>
        <div className="flex p-4">
          <div className="flex-1 flex flex-col justify-center items-center">
            <img src={A4PageLabel} alt="A4PageLabel" className="lg:h-[80%]" />
            <div className="lg:w-[50%] text-center flex-col flex justify-center items-center">
              <p className="font-Lato text-sm font-semibold leading-5 capitalize pt-[30px] text-[#777777]">
                A4 Size 8.3 x 11.7 Inches
              </p>
              <CustomRadioButton
                inputClassName="h-full m-2"
                style={{ accentColor: "black" }}
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center">
            <img src={A5PageLabel} alt="A5PageLabel" className="lg:h-[80%]" />
            <div className="lg:w-[40%] text-center flex-col flex justify-center items-center">
              <p className="font-Lato text-sm font-semibold leading-5 capitalize pt-[30px] text-[#777777]">
                A5 Size 5.8 x 8.3 Inches
              </p>
              <CustomRadioButton
                inputClassName="h-full m-2"
                style={{ accentColor: "black" }}
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center">
            <img src={A6PageLabel} alt="A6PageLabel" className="lg:h-[80%]" />
            <div className="lg:w-[40%] text-center flex-col flex justify-center items-center">
              <p className="font-Lato text-sm font-semibold leading-5 capitalize pt-[30px] text-[#777777]">
                A6 Size 4.1 x 5.8 inches
              </p>
              <CustomRadioButton
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

export default LabelSizes;
