import React from "react";

interface IHeaderProps {
  title: string;
}
const Header: React.FunctionComponent<IHeaderProps> = ({ title }) => {
  return (
    <div className="font-semibold text-[22px] text-[#1C1C1C]">
      <span>{title}</span>
    </div>
  );
};

export default Header;
