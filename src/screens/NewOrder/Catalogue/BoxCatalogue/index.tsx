import React from "react";
import NavBar from "../../../../layout/Old_NavBar";
import ProductBox from "./productBox";
import ItemIcon from "../../../../assets/CargoRating .svg";
import BackArrowIcon from "../../../../assets/backArrow.svg";
import BoxIcon from "../../../../assets/Catalogue/box.svg";

interface Props {}

const index = (props: Props) => {
  return (
    <div>
      <NavBar />
      <div className="flex flex-col p-5">
        <div className="flex items-center gap-x-1 mb-5">
          <img src={BackArrowIcon} alt="" />
          <span className="font-bold text-[18px] text-[#1C1C1C]">
            Box Catalogue
          </span>
        </div>
        <div className="flex items-center gap-x-2 mb-5">
          <img src={BoxIcon} alt="" />
          <span className="font-bold text-[18px] text-[#323232] ">
            Brown Box
          </span>
        </div>
      </div>
      <ProductBox
        image={ItemIcon}
        productName="Mac book air"
        weight="5"
        dimension="12 x 12 x 12"
        dimensionClassName="!font-light"
        className="!border-none !shadow-none"
      />
    </div>
  );
};

export default index;
