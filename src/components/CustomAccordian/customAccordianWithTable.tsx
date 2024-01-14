import React, { useState } from "react";
import downArrowIcon from "../../assets/Filter/downArrow.svg";
import upArrowIcon from "../../assets/Filter/upArrow.svg";
import { CustomTable } from "../Table";
import "../../styles/plan.css";
import { ResponsiveState } from "../../utils/responsiveState";

interface ICustomAccordianWithProps {
  dummyDatas: any;
  cardClassName?: string;
  isIcon?: boolean;
  icon?: any;
  title: string;
  titleForMobile?: string;
  data?: any;
  columns?: any;
}

const CustomAccordianWithTable: React.FunctionComponent<
  ICustomAccordianWithProps
> = (props) => {
  const {
    dummyDatas,
    cardClassName,
    isIcon,
    icon,
    title,
    data,
    columns,
    titleForMobile,
  } = props;
  const { isLgScreen } = ResponsiveState();

  const [isCollapse, setIsCollapse] = useState(false);

  return (
    <div className={`flex flex-col   mb-3   cursor-pointer ${cardClassName}`}>
      <div
        className={`flex items-center justify-between p-3 h-[52px] border-[1px] border-[#E8E8E8] ${
          isCollapse
            ? "bg-[#E8E8E8] rounded-tr-lg rounded-tl-lg rounded-b-none "
            : "bg-[#FFFFFF] rounded-lg "
        }`}
        onClick={() => {
          setIsCollapse(!isCollapse);
        }}
      >
        <div className="flex items-center gap-x-2">
          {isIcon && <img src={icon} alt="" />}
          <span className="lg:font-Lato  lg:text-[22px] lg:leading-7 font-Open font-semibold text-base leading-[22px] text-[#1C1C1C] ">
            {isLgScreen ? title : titleForMobile}
          </span>
        </div>
        <img
          src={isCollapse ? upArrowIcon : downArrowIcon}
          alt="downArrowIcon"
        />
      </div>
      {isCollapse && (
        <div
          className={`flex flex-col border-[1px] rounded-bl-lg rounded-br-lg  py-0 px-2 `}
        >
          <CustomTable
            data={data}
            columns={columns}
            tdclassName={"def"}
            thclassName={"bg-white"}
          />
        </div>
      )}
    </div>
  );
};

export default CustomAccordianWithTable;
