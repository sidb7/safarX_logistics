import React, { useEffect, useState } from "react";
import singlePageLabel from "../../../../assets/singlePageLabel.svg";
import singlePageLabelSQ from "../../../../assets/singlePageLabelSQ.svg";
import multiplePageLabel from "../../../../assets/multiplePageLabel.svg";
import A4PageLabel from "../../../../assets/A4.png";
import A5PageLabel from "../../../../assets/A5.png";
import A6PageLabel from "../../../../assets/A6.png";
import CustomRadioButton from "../../../../components/RadioButton/Index";
import CustomDropDown from "../../../../components/DropDown";

interface ILabelSizesProps {
  pageSize?: any;
  labelData?: any;
  perPageLabel?: any;
}

const LabelSizes: React.FunctionComponent<ILabelSizesProps> = ({
  pageSize,
  labelData,
  perPageLabel,
}) => {
  const [checked, setChecked] = useState();
  const [labelPerPage, setLabelPerPage] = useState();
  const [a4LabelOption, setA4LabelOption] = useState(false);
  const [a4LabelOptionValue, setA4LabelOptionValue] = useState("1");

  useEffect(() => {
    let tempChecked =
      labelData && labelData?.pageSize !== undefined && labelData?.pageSize;
    setChecked(tempChecked);
    let a4LabelStoreOptionsValue =
      labelData &&
      labelData?.labelsOnPage !== undefined &&
      labelData?.labelsOnPage;
    if (a4LabelStoreOptionsValue && labelData?.pageSize === "A4") {
      setA4LabelOption(true);
      setA4LabelOptionValue(a4LabelStoreOptionsValue);
    }
  }, [labelData]);

  const handleOptionChange = (e: any) => {
    if (e === "A4") {
      setA4LabelOption(true);
    } else {
      setA4LabelOption(false);
    }
    pageSize(e);
    setChecked(e);
  };

  const perPageLabelHandler = (e: any) => {
    setA4LabelOptionValue(e);
    perPageLabel(e);
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2">
          <div className="flex-1 px-5">
            <h3 className="font-Lato text-[22px] font-semibold leading-7 capitalize text-[#1C1C1C] mt-10">
              Recommended
            </h3>
            <p className="text-[#777777] font-Open text-xs font-normal leading-[22px]">
              Most Commonly used paper sizes for printing label
            </p>
          </div>
          <div className="flex p-4">
            <div
              className="flex-1 transition-all ease-in-out duration-200 hover:scale-[103%] flex flex-col justify-center items-center cursor-pointer"
              onClick={() => handleOptionChange("singlePage")}
            >
              <img src={singlePageLabel} alt="singlePageLabel" />
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
              <img src={multiplePageLabel} alt="multiplePageLabel" />
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
              <img src={singlePageLabelSQ} alt="singlePageLabelSQ" />
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
        </div>
        <div className="w-full md:w-1/2 border-l-2">
          <div className="flex-1 px-5">
            <h3 className="font-Lato text-[22px] font-semibold leading-7 capitalize text-[#1C1C1C] mt-10">
              other
            </h3>
            <p className="text-[#777777] font-Open text-xs font-normal leading-[22px]">
              Suitable for small home printer
            </p>
          </div>
          <div className="p-4 mt-[55px]">
            <div className="flex">
              <div
                className="flex-1 transition-all ease-in-out justify-end duration-200 hover:scale-[103%] flex flex-col items-center  cursor-pointer"
                onClick={() => {
                  handleOptionChange("A4");
                }}
              >
                <img src={A4PageLabel} alt="A4PageLabel" />
                <div className="md:w-[50%] text-center flex-col flex justify-center items-center">
                  <p className="font-Lato text-sm font-semibold leading-5 capitalize pt-[30px] text-[#777777]">
                    A4 Size 8.3 x 11.7 Inches
                  </p>
                  <CustomRadioButton
                    name="singlePage"
                    value="A4"
                    checked={checked === "A4"}
                    onChange={() => {}}
                    inputClassName="h-full m-2"
                    style={{ accentColor: "black" }}
                  />
                </div>
              </div>
              <div
                className="flex-1 transition-all justify-end ease-in-out duration-200 hover:scale-[103%] flex flex-col items-center cursor-pointer"
                onClick={() => handleOptionChange("A5")}
              >
                <img src={A5PageLabel} alt="A5PageLabel" />
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
                className="flex-1 transition-all ease-in-out duration-200 hover:scale-[103%] flex flex-col justify-end items-center cursor-pointer"
                onClick={() => handleOptionChange("A6")}
              >
                <img src={A6PageLabel} alt="A6PageLabel" />
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
            {/* {a4LabelOption && (
              <div className="w-1/3 flex justify-center">
                <CustomDropDown
                  options={[
                    // {
                    //   label: "1 Label Per Page",
                    //   value: "1",
                    // },
                    {
                      label: "2 Label Per Page",
                      value: "2",
                    },
                    {
                      label: "4 Label Per Page",
                      value: "4",
                    },
                  ]}
                  value={a4LabelOptionValue}
                  heading="Select Label on per page"
                  onChange={(e: any) => perPageLabelHandler(e.target.value)}
                  wrapperClass="w-[187px] h-[40px]"
                />
              </div>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default LabelSizes;
