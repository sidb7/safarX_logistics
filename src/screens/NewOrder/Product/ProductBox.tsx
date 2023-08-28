import React from "react";
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
}) => {
  return (
    <div
      className={` ${className} product-box flex items-center border-2 rounded-md h-[70px] mt-3 relative`}
    >
      <span className="bg-[#6695FF] text-white absolute -top-4 ml-2 rounded-md w-[91px] flex justify-center ">
        {label}
      </span>
      <div className="ml-2">
        <img src={image} alt="" className="mr-2" />
      </div>
      <div className="flex flex-col ml-4">
        <span>{productName}</span>
        <span>
          {`${weight} `}
          <span className={`${dimensionClassName}`}>
            | {`${length} x ${breadth} x ${height} cm`}
          </span>
        </span>
      </div>
    </div>
  );
};

export default productBox;
