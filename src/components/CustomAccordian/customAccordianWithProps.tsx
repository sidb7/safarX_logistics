import React, { useState } from "react";
import downArrowIcon from "../../assets/Filter/downArrow.svg";
import upArrowIcon from "../../assets/Filter/upArrow.svg";
import { CustomTable } from "../Table";
import "../../styles/plan.css";

interface ICustomAccordianWithProps {
  dummyDatas: any;
  cardClassName?: string;
  isIcon?: boolean;
  icon?: any;
  title: string;

  data?: any;
  columns?: any;
}

const CustomAccordianWithProps: React.FunctionComponent<
  ICustomAccordianWithProps
> = (props) => {
  const { dummyDatas, cardClassName, isIcon, icon, title, data, columns } =
    props;

  const [isCollapse, setIsCollapse] = useState(false);

  const [filterData, setFilterData] = useState(dummyDatas);
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
          <span className="font-Lato font-semibold text-[22px] leading-7 ">
            {title}
          </span>
        </div>
        <img
          src={isCollapse ? upArrowIcon : downArrowIcon}
          alt="downArrowIcon"
          // className={`transform transition-transform duration-400 ${
          //   isCollapse ? "rotate-180" : ""
          // }`}
        />
      </div>
      {isCollapse && (
        <div
          className={`flex flex-col border-[1px] rounded-bl-lg rounded-br-lg  py-0 transition-all duration-400 ease-in-out `}
        >
          <CustomTable data={data} columns={columns} tdclassName={"def"} />
        </div>
      )}
    </div>
  );
};

export default CustomAccordianWithProps;
