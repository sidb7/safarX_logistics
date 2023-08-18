import React from "react";
import CustomRadioButton from "../../../../components/RadioButton";
import { useDispatch } from "react-redux";
import { setBusinessType } from "../../../../redux/reducers/onboarding";

interface ITypesProps {
  name: string;
  value: string;
  title: string;
  subTitle: string;
}

const Card = (props: ITypesProps) => {
  const { name, value, title, subTitle } = props;
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex flex-col justify-start border-[1px] rounded p-4 mb-4   border-[#E8E8E8] w-full lg:w-[320px]">
        <div className="flex items-center gap-x-2  ">
          <CustomRadioButton
            name={name}
            value={value}
            inputClassName="cursor-pointer"
            onChange={(e) => {
              dispatch(setBusinessType(e.target.value));
            }}
          />
          <p className="font-semibold  font-Open  text-base text-[#1C1C1C] leading-[22px]">
            {title}
          </p>
        </div>
        <div className=" px-6  w-full   ">
          <p className="font-normal font-Open text-[10px] w-full text-[#777777] leading-4 ">
            {subTitle}
          </p>
        </div>
      </div>
    </>
  );
};

export default Card;
