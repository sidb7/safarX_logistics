import React from "react";
import CustomRadioButton from "../../../../components/RadioButton";

interface ITypesProps {
  name: string;
  value: string;
  title: string;
  subTitle: string;
}

const card = (props: ITypesProps) => {
  const { name, value, title, subTitle } = props;

  return (
    <>
      <div className="flex flex-col justify-start border-[1px] rounded p-4 mb-4 lg:w-[320px]  border-[#E8E8E8] w-[100%]">
        <div className="flex items-center gap-x-2  ">
          <CustomRadioButton name={name} value={value} />
          <p className="font-semibold text-[16px] text-[#1C1C1C]">{title}</p>
        </div>
        <div className=" px-6  w-full   ">
          <p className="font-normal text-[10px] w-[100%] text-[#777777]  ">
            {subTitle}
          </p>
        </div>
      </div>
    </>
  );
};

export default card;
