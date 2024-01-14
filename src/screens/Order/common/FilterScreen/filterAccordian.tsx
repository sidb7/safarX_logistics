import React, { useState, useEffect } from "react";
import downArrowIcon from "../../../../assets/Filter/downArrow.svg";
import upArrowIcon from "../../../../assets/Filter/upArrow.svg";

import Checkbox from "../../../../components/CheckBox/index2";
import { keyNameMapping } from "../../../../utils/dummyData";

interface IPropTypes {
  cardClassName?: string;
}

const Index = (props: any) => {
  const { filterListDatas, cardClassName, setFilterState } = props;

  const [filterData, setFilterData] = useState(filterListDatas);

  useEffect(() => {
    setFilterState(filterData);
  }, [filterData]);

  return (
    <>
      {filterListDatas?.map((dummyItem: any, index: number) => {
        let childLength = dummyItem?.menu?.length;

        return (
          <div
            className={`flex flex-col px-5  mb-3 shadow-md rounded-lg   cursor-pointer ${cardClassName}`}
            key={index}
          >
            <div
              className={`flex  items-center justify-between px-3 py-6 h-[38px]  border-[1px]  ${
                filterData[index]?.isCollapse
                  ? "bg-[#f6f6f6] rounded-tr-lg rounded-tl-lg rounded-b-none "
                  : "bg-[#FFFFFF] rounded-lg"
              }`}
              onClick={() => {
                let temp = [...filterData];

                if (filterData[index]?.isCollapse === true) {
                  temp[index].isCollapse = false;

                  setFilterData(temp);
                } else {
                  temp[index].isCollapse = true;
                  setFilterData(temp);
                }
              }}
            >
              <p className="font-semibold text-[16px] text-[#1C1C1C]">
                {dummyItem?.name}
              </p>
              <img
                src={
                  filterData[index]?.isCollapse ? upArrowIcon : downArrowIcon
                }
                alt="downArrowIcon"
                className={`transform transition-transform duration-400 ${
                  filterData[index]?.isCollapse ? "rotate-180" : ""
                }`}
              />
            </div>
            {/* //flex flex-col */}
            {filterData[index]?.isCollapse && (
              <div
                className={`border-b border-r border-l grid grid-cols-2  max-h-[300px] overflow-auto rounded-bl-md rounded-br-md  py-0 transition-all duration-400 ease-in-out `}
              >
                {dummyItem?.menu?.map((subMenu: any, index1: number) => {
                  return (
                    <div className="px-2" key={index1}>
                      <button
                        className={`flex items-center  w-full border  py-5  gap-3 h-[28px]  ${
                          index1 !== childLength - 1
                            ? "border-b-[#E8E8E8]"
                            : "border-b-0"
                        }  border-t-0 border-r-0 border-l-0`}
                      >
                        {/* <Checkbox
                          checked={menuData?.isActive}
                          onChange={() =>
                            handle_Level_2_Pages(
                              roleData?.id,
                              menuData?.id,
                              !menuData?.isActive
                            )
                          }
                          checkboxClassName="gap-2"
                        /> */}
                        <Checkbox
                          onChange={(e) => {
                            let temp = [...filterData];
                            temp[index].menu[index1].isActive =
                              !temp[index].menu[index1].isActive;
                            setFilterData(temp);
                          }}
                          checkboxClassName="gap-1"
                          name={dummyItem.name}
                          checked={subMenu.isActive}
                        />
                        <p className="font-bold text-[14px] text-[#323232]">
                          {subMenu?.name}
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
