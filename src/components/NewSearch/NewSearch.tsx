import React from "react";
import SearchBoxIcon from "../../assets/SearchBox/SearchIcon.svg";

interface IPropsSearch {
  page: String;
  params: String[];
  onChange: any;
  value: any;
}

export const NewSearch: React.FunctionComponent<IPropsSearch> = ({
  page,
  params,
  onChange,
  value,
}) => {
  return (
    <div className="relative">
      <img
        src={SearchBoxIcon}
        alt=""
        className={`absolute left-0 h-full p-2 z-0`}
      />
      <input
        type="text"
        className={`focus:border-[#004eff] transition-all duration-300 transactionSearhBox rounded border-[1px] border-[#A4A4A4] py-[12px] pr-[30px] !pl-[30px] h-[36px] font-normal text-[12px] overflow-ellipsis overflow-hidden whitespace-nowrap`}
        value={value}
        onChange={onChange}
        title="Search Box"
      />
    </div>
  );
};
