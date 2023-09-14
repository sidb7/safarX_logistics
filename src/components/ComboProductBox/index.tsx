import React, { useEffect, useState } from "react";
import CenterModal from "../CustomModal/customCenterModal";
import CrossIcon from "../../assets/CloseIcon.svg";
import ProductBox from "../../screens/NewOrder/Product/ProductBox";

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
  Value?: any;
  onClick?: () => void;
  setIsModalOpen?: any;
  isSelected?: any;
  data?: any;
  index?: number;
}
const ComboProductBox: React.FunctionComponent<IPackageBoxProps> = ({
  image = "",
  productName = "",
  weight = "",
  height = "",
  breadth = "",
  length = "",
  dimension = "",
  Value = "",
  className = "",
  dimensionClassName = "",
  label = "",
  onClick,
  data,
  index,
  isSelected = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<any>(false);

  return (
    <>
      <div
        className={` ${className} product-box flex items-center border-2 rounded-md h-20 relative ${
          isSelected && "border-[#004EFF]"
        }`}
        onClick={() => setIsModalOpen(true)}
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
        <div className="px-4">
          <img src={image} alt="" />
        </div>
        <div className="flex flex-col  pr-4">
          <span className="line-clamp-1">{productName}</span>
          <span className="flex ">{`${weight} | ₹${Value}`}</span>
        </div>
      </div>

      <CenterModal
        className="h-[574px] w-[458px]"
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <div className="border h-[100%] relative w-[100%] p-6">
          <div className="absolute right-4 top-4">
            <img
              src={CrossIcon}
              alt="Cross Icon"
              className="cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            />
          </div>
          <div className="mt-6">
            {data.products?.map((singleProduct: any, index: any) => {
              return (
                <div className="my-3">
                  <ProductBox
                    image={
                      (singleProduct?.images?.length > 0 &&
                        singleProduct?.images[0].url) ||
                      ""
                    }
                    productName={singleProduct?.name}
                    weight={`${singleProduct?.appliedWeight} ${singleProduct?.weightUnit}`}
                    height={singleProduct?.height}
                    breadth={singleProduct?.breadth}
                    length={singleProduct?.length}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </CenterModal>
    </>
  );
};

export default ComboProductBox;
