import React from "react";

interface IPackageBoxProps {
    image: any;
    productName: string;
    weight: string;
    dimension: string;
    className?: string;
    dimensionClassName?: string;
  }
  const productBox: React.FunctionComponent<IPackageBoxProps> = ({
    image = "",
    productName = "",
    weight = "",
    dimension = "",
    className = "",
    dimensionClassName = "",
  }) => {
    return (
      <div
        className={` ${className} product-box flex items-center border-2 rounded-md h-[70px] mt-3 p-3`}
      >
        <div className="ml-2">
          <img src={image} alt="Product" className="mr-2" />
        </div>
        <div className="flex flex-col ml-4">
          <span>{productName}</span>
          <span>
            {`${weight} Kg `}
            <span className={`${dimensionClassName}`}>| {`${dimension} cm`}</span>
          </span>
        </div>
      </div>
    );
  };
  export default productBox;