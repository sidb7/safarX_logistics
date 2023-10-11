import CustomRadioButton from "../../../../components/RadioButton/Index";
import { useState } from "react";

interface ITypesProps {
  name: string;
  value: string;
  title: string;
  subTitle: string;
  checked: any;
  setChecked: any;
  onClick: (e?: any) => void;
  cardClassName?: string;
}

const Card = (props: ITypesProps) => {
  const {
    name,
    value,
    title,
    subTitle,
    cardClassName,
    checked,
    setChecked,
    onClick = () => {},
  } = props;

  return (
    <>
      <div
        className={` ${cardClassName} cursor-pointer border-[1px] rounded-lg p-4 shadow ${
          !checked ? "border-[#E8E8E8]" : "border-[black]"
        } w-full lg:!w-[320px] relative`}
        onClick={(e: any) => {
          onClick({ [value]: true });
          sessionStorage.setItem("businessType", value);
        }}
      >
        <div className="flex flex-col">
          <div className="flex items-center h-6 gap-x-2 ">
            <CustomRadioButton
              name={name}
              value={value}
              style={{ accentColor: "black" }}
              inputClassName="cursor-pointer"
              onChange={(e) => {
                sessionStorage.setItem("businessType", e.target.value);
              }}
              checked={checked}
            />
            <p className="capitalize font-semibold font-Open text-base text-[#1C1C1C] leading-[22px]">
              {title}
            </p>
          </div>
          <div className=" px-6">
            <p className="capitalize font-normal font-Open text-[10px] text-[#777777] leading-4 ">
              {subTitle}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
