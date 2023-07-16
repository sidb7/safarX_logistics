import React, { useState } from "react";
import downArrowIcon from "../../assets/Filter/downArrow.svg";
import upArrowIcon from "../../assets/Filter/upArrow.svg";

import RadioButton from "../RadioButton";

interface IPropTypes {
  cardClassName?: string;
}

const Index = (props: any) => {
  const { dummyDatas, cardClassName } = props;

  const [filterData, setFilterData] = useState(dummyDatas);

  return (
    <>
      {dummyDatas.map((dummyItem: any, index: number) => {
        let childLength = dummyItem.menu.length;

        return (
          <div
            className={`flex flex-col px-5  mb-3   cursor-pointer ${cardClassName}`}
            key={index}
          >
            <div
              className={`flex items-center justify-between p-3 h-[38px] border-[1px]  ${
                filterData[index].isCollapse
                  ? "bg-[#E8E8E8] rounded-tr-md rounded-tl-md rounded-b-none "
                  : "bg-[#FFFFFF] rounded-md "
              }`}
              onClick={() => {
                let temp = [...filterData];

                if (filterData[index].isCollapse === true) {
                  temp[index].isCollapse = false;

                  setFilterData(temp);
                } else {
                  temp[index].isCollapse = true;
                  setFilterData(temp);
                }
              }}
            >
              <p className="font-semibold text-[16px] text-[#1C1C1C]">
                {dummyItem.name}
              </p>
              <img
                src={filterData[index].isCollapse ? upArrowIcon : downArrowIcon}
                alt="downArrowIcon"
                className={`transform transition-transform duration-400 ${
                  filterData[index].isCollapse ? "rotate-180" : ""
                }`}
              />
            </div>
            {filterData[index].isCollapse && (
              <div
                className={`flex flex-col border-[1px] rounded-bl-md rounded-br-md  py-0 transition-all duration-400 ease-in-out `}
              >
                {dummyItem.menu.map((subMenu: any, index1: number) => {
                  return (
                    <div className=" px-2     " key={index1}>
                      <button
                        className={`flex items-center  w-full  py-4  gap-2 h-[28px] border-[1px] ${
                          index1 !== childLength - 1
                            ? "border-b-[#E8E8E8]"
                            : "border-b-0"
                        }  border-t-0 border-r-0 border-l-0`}
                      >
                        <RadioButton
                          onChange={(e) => {
                            let temp = [...filterData];
                            temp[index].menu[index1].isActive = true;
                            setFilterData(temp);
                          }}
                          name={dummyItem.name}
                          value={subMenu.name}
                        />
                        <p className="font-bold text-[14px] text-[#323232]">
                          {subMenu.name}
                        </p>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default Index;
