import React from "react";
import { Breadcrum } from "../../../components/Layout/breadcrum";
import LabelSizes from "./labelSetting/labelSizes";
interface ILabelProps {}

const Label: React.FunctionComponent<ILabelProps> = (props) => {
  return (
    <>
      <div>
        <Breadcrum label="Label Settings" />
      </div>
      <h1 className="font-Lato text-[22px] font-semibold leading-7 capitalize text-[#1C1C1C] mx-4 mt-[10px]">
        Step 1: Choose the paper size
      </h1>

      <div>
        <LabelSizes />
      </div>
    </>
  );
};

export default Label;
