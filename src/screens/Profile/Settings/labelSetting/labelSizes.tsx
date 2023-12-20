import React, { useEffect, useState } from "react";
import singlePageLabel from "../../../../assets/singlePageLabel.svg";
import singlePageLabelSQ from "../../../../assets/singlePageLabelSQ.svg";
import multiplePageLabel from "../../../../assets/multiplePageLabel.svg";
import A4PageLabel from "../../../../assets/A4.svg";
import A5PageLabel from "../../../../assets/A5.svg";
import A6PageLabel from "../../../../assets/A6.svg";
import CustomRadioButton from "../../../../components/RadioButton/Index";

interface ILabelSizesProps {
  pageSize?: any;
  labelData?: any;
}

const LabelSizes: React.FunctionComponent<ILabelSizesProps> = ({
  pageSize,
  labelData,
}) => {
  const [checked, setChecked] = useState();

  useEffect(() => {
    let tempChecked =
      labelData && labelData?.pageSize !== undefined && labelData?.pageSize;
    setChecked(tempChecked);
  }, [labelData]);

  const handleOptionChange = (e: any) => {
    pageSize(e);
    setChecked(e);
  };
  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between ">
        <div className="flex-1 px-5">
          <h3 className="font-Lato text-[22px] font-semibold leading-7 capitalize text-[#1C1C1C] mt-10">
            Recommended
          </h3>
          <p className="text-[#777777] font-Open text-xs font-normal leading-[22px]">
            Most Commonly used paper sizes for printing label
          </p>
        </div>
        <div className="flex-1 hidden md:block">
          <h3 className="font-Lato text-[22px] font-semibold leading-7 capitalize text-[#1C1C1C] mt-10">
            other
          </h3>
          <p className="text-[#777777] font-Open text-xs font-normal leading-[22px]">
            Suitable for small home printer
          </p>
        </div>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-2 md:divide-x-2 md:h-[350px] my-6">
        <div className=" flex ">
          <div
            className="flex-1 transition-all ease-in-out duration-200 hover:scale-[103%] flex flex-col justify-center items-center cursor-pointer"
            onClick={() => handleOptionChange("singlePage")}
          >
            <img
              src={singlePageLabel}
              alt="singlePageLabel"
              className="md:h-[80%]"
            />
            <div className="md:w-[80%] text-center flex-col flex justify-center items-center">
              <p className="font-Lato text-sm font-semibold leading-5 capitalize pt-[30px] text-[#777777]">
                Single Page(most commonly used label)
              </p>
              <CustomRadioButton
                name="singlePage"
                value="singlePage"
                checked={checked === "singlePage"}
                // defaultChecked=""
                onChange={() => {}}
                inputClassName="h-full m-2"
                style={{ accentColor: "black" }}
              />
            </div>
          </div>

          <div
            className="flex-1 transition-all ease-in-out duration-200 hover:scale-[103%] flex flex-col justify-center items-center cursor-pointer"
            onClick={() => handleOptionChange("multiplePage")}
          >
            <img
              src={multiplePageLabel}
              alt="multiplePageLabel"
              className="md:h-[80%]"
            />
            <div className="md:w-[80%] text-center flex-col flex justify-center items-center">
              <p className="font-Lato text-sm font-semibold leading-5 capitalize pt-[30px] text-[#777777]">
                Multiple Page (To show detailed SKU info)
              </p>
              <CustomRadioButton
                name="singlePage"
                value="multiplePage"
                checked={checked === "multiplePage"}
                // defaultChecked=""
                onChange={() => {}}
                inputClassName="h-full m-2"
                style={{ accentColor: "black" }}
              />
            </div>
          </div>
          <div
            className="flex-1 transition-all ease-in-out duration-200 hover:scale-[103%] flex flex-col justify-center items-center !mr-4 cursor-pointer"
            onClick={() => handleOptionChange("singlePageSquared")}
          >
            <img
              src={singlePageLabelSQ}
              alt="singlePageLabelSQ"
              className="md:h-[80%]"
            />
            <div className="md:w-[80%] text-center flex-col flex justify-center items-center">
              <p className="font-Lato text-sm font-semibold leading-5 capitalize pt-[30px] text-[#777777]">
                Single Page(square shaped shipping label)
              </p>
              <CustomRadioButton
                name="singlePage"
                value="singlePageSquared"
                checked={checked === "singlePageSquared"}
                // defaultChecked=""
                onChange={() => {}}
                inputClassName="h-full m-2"
                style={{ accentColor: "black" }}
              />
            </div>
          </div>
        </div>
        <hr className="block md:hidden m-5" />
        <div className="block md:hidden">
          <div></div>
          <div className="flex-1 px-5 ">
            <h3 className="font-Lato text-[22px] font-semibold leading-7 capitalize text-[#1C1C1C] mt-10">
              other
            </h3>
            <p className="text-[#777777] font-Open text-xs font-normal leading-[22px]">
              Suitable for small home printer
            </p>
          </div>
        </div>
        <div className="flex p-4">
          <div
            className="flex-1 transition-all ease-in-out duration-200 hover:scale-[103%] flex flex-col justify-center items-center  cursor-pointer"
            onClick={() => handleOptionChange("A4")}
          >
            <img src={A4PageLabel} alt="A4PageLabel" className="md:h-[80%]" />
            <div className="md:w-[50%] text-center flex-col flex justify-center items-center">
              <p className="font-Lato text-sm font-semibold leading-5 capitalize pt-[30px] text-[#777777]">
                A4 Size 8.3 x 11.7 Inches
              </p>
              <CustomRadioButton
                name="singlePage"
                value="A4"
                checked={checked === "A4"}
                // defaultChecked=""
                onChange={() => {}}
                inputClassName="h-full m-2"
                style={{ accentColor: "black" }}
              />
            </div>
          </div>
          <div
            className="flex-1 transition-all ease-in-out duration-200 hover:scale-[103%] flex flex-col justify-center items-center cursor-pointer"
            onClick={() => handleOptionChange("A5")}
          >
            <img src={A5PageLabel} alt="A5PageLabel" className="md:h-[80%]" />
            <div className="md:w-[40%] text-center flex-col flex justify-center items-center">
              <p className="font-Lato text-sm font-semibold leading-5 capitalize pt-[30px] text-[#777777]">
                A5 Size 5.8 x 8.3 Inches
              </p>
              <CustomRadioButton
                name="singlePage"
                value="A5"
                checked={checked === "A5"}
                // defaultChecked=""
                onChange={() => {}}
                inputClassName="h-full m-2"
                style={{ accentColor: "black" }}
              />
            </div>
          </div>
          <div
            className="flex-1 transition-all ease-in-out duration-200 hover:scale-[103%] flex flex-col justify-center items-center cursor-pointer"
            onClick={() => handleOptionChange("A6")}
          >
            <img src={A6PageLabel} alt="A6PageLabel" className="md:h-[80%]" />
            <div className="md:w-[40%] text-center flex-col flex justify-center items-center">
              <p className="font-Lato text-sm font-semibold leading-5 capitalize pt-[30px] text-[#777777]">
                A6 Size 4.1 x 5.8 inches
              </p>
              <CustomRadioButton
                name="singlePage"
                value="A6"
                checked={checked === "A6"}
                onChange={() => {}}
                // defaultChecked=""
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
