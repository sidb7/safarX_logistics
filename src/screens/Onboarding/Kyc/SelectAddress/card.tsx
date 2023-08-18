import React from "react";
import CustomRadioButton from "../../../../components/RadioButton";

interface ITypesProps {
  name: string;
  value: string;
  title: string;
  subTitle?: string;
  titleClassName?: string;
  subContent?: string;
  isSubContent?: boolean;
  cardClassName?: string;
}

const card = (props: ITypesProps) => {
  const {
    name,
    value,
    title,
    titleClassName,
    subContent,
    isSubContent,
    cardClassName,
  } = props;

  return (
    <>
      <div
        className={` ${cardClassName} border-[1px] rounded p-4   border-[#E8E8E8] w-full `}
      >
        <div className="flex items-center   gap-x-3 ">
          <CustomRadioButton
            name={name}
            value={value}
            // inputClassName="self-start"
          />

          {isSubContent && (
            <div className="border-[1px] rounded px-1 border-[#E8E8E8]  ">
              <p className="font-Open font-normal text-[10px] leading-4  ">
                {subContent}
              </p>
            </div>
          )}

          <p
            className={`${titleClassName} font-Open  font-semibold text-[16px] text-[#1C1C1C] leading-4`}
          >
            {title}
          </p>
        </div>
      </div>
    </>
  );
};

export default card;
