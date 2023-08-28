import * as React from "react";
import CompanyImage from "../../../assets/Shipyaari_full_color rgb.svg";

interface IOverviewProps {}

const Overview: React.FunctionComponent<IOverviewProps> = (props) => {
  return (
    <div>
      <div className="flex justify-center">
        <img className="h-[400px]" src={CompanyImage} alt="logo" />
      </div>
    </div>
  );
};

export default Overview;
