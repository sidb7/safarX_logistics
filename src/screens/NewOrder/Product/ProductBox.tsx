import React from "react";
import EditIcon from "../../../assets/Product/Edit.svg";

interface IPackageBoxProps {
  image?: any;
  productName: string;
  weight?: string;
  dimension?: string;
  className?: string;
  dimensionClassName?: string;
  label?: any;
  length?: any;
  height?: any;
  breadth?: any;
  editMode?: any;
  onClick?: () => void;
  onClickEdit?: () => void;
  isSelected?: any;
  isActiveChannel?: boolean;
}

const productBox: React.FunctionComponent<IPackageBoxProps> = ({
  image = "",
  productName = "",
  weight = "",
  height = "",
  breadth = "",
  length = "",
  dimension = "",
  className = "",
  dimensionClassName = "",
  label = "",
  onClick,
  onClickEdit,
  isSelected = false,
  isActiveChannel,
  editMode = false,
}) => {
  return (
    <div
      className={` ${className} items-center product-box flex itisActiveChannelems-center border-2 rounded-md h-20 min-w-[200px] relative ${
        isSelected && "border-[#004EFF]"
      }`}
      onClick={onClick}
      style={{
        boxShadow:
          "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
      }}
    >
      <span
        className={`${
          label !== "" ? "" : "hidden"
        } bg-[#6695FF] text-white absolute -top-4 ml-2 rounded-md w-[91px] flex justify-center `}
      >
        {label}
      </span>
      <div className="mr-3">
        <img src={image} alt="" />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex justify-between">
          <span className="line-clamp-2">{productName}</span>
          {editMode && !isActiveChannel && (
            <img
              src={EditIcon}
              alt=""
              onClick={onClickEdit}
              className="w-4 mx-2"
            />
          )}
        </div>
        <span className="flex text-[12px] lg:text-[14px] ">
          {`${weight} | ${length} x ${breadth} x ${height} cm`}
        </span>
      </div>
    </div>
  );
};

export default productBox;
