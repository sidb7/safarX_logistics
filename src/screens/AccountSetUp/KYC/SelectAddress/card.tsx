import React from "react";
import CustomRadioButton from "../../../../components/RadioButton";

interface ITypesProps {
  name: string;
  value: string;
  title: string;
  subTitle?: string;
  titleClassName?: string;
}

const card = (props: ITypesProps) => {
  const { name, value, title, subTitle, titleClassName} = props;

  return (
    <>
      <div className="flex flex-col justify-start border-[1px] rounded p-4 mb-4   border-[#E8E8E8] w-full">
        <div className="flex items-center gap-x-2 ">
          <CustomRadioButton name={name} value={value} />
          <p className={`${titleClassName} font-semibold text-[16px] text-[#1C1C1C]`}>{title}</p>
        </div>
        <div className="flex px-6 ">
          <p className="font-normal text-[10px] text-[#777777] ">{subTitle}</p>
        </div>
      </div>
    </>
  );
};

export default card;
