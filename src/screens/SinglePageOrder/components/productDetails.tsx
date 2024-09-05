import React from "react";
import EditIcon from "../../../assets/Product/Edit.svg";
import DeleteIcon from "../../../assets/DeleteIconRedColor.svg";
import { useMediaQuery } from "react-responsive";

interface IPackageBoxProps {
  image?: any;
  productName: string;
  appliedWeight?: string;
  volumetricWeight?: string;
  unitPrice?: any;
  deadWeight?: any;
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
  setIsDeleteModalOpen?: any;
  productId?: any;
  setDeleteProductsData?: any;
  deleteProductsData?: any;
  productNameClass?: any;
  filterId?: any;
}

const ProductDetails: React.FunctionComponent<IPackageBoxProps> = ({
  image = "",
  productName = "",
  appliedWeight = "",
  volumetricWeight = "",
  unitPrice = "",
  deadWeight = "",
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
  setIsDeleteModalOpen,
  productId = "",
  setDeleteProductsData,
  deleteProductsData = false,
  productNameClass,
  filterId,
}) => {
  const isLgScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  return (
    <div
      className={` ${className} items-center product-box  flex w-fit itisActiveChannelems-center border-2 rounded-md min-w-[200px] relative ${
        isSelected && "border-[#004EFF]"
      }`}
      onClick={onClick}
      style={{
        boxShadow:
          "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
      }}
      data-cy="product-box"
    >
      <span
        className={`${
          label !== "" ? "" : "hidden"
        } bg-[#6695FF] text-white absolute top-4 ml-2 rounded-md w-[91px] flex justify-center `}
      >
        {label}
      </span>

      <div className="flex flex-col w-full ">
        <div className="flex justify-between ">
          <span
            className={`!${productNameClass} max-w-[660px] rounded-md text-[16px] text-[#000000] flex-wrap font-bold font-Open`}
          >
            {productName}
          </span>

          <div className="flex items-center">
            {editMode && !isActiveChannel && (
              <img
                src={EditIcon}
                alt=""
                onClick={onClickEdit}
                className="w-4 mx-2"
                data-cy="edit-icon"
              />
            )}

            {deleteProductsData && (
              <img
                src={DeleteIcon}
                alt=""
                width={18}
                className="cursor-pointer"
                onClick={() => {
                  setIsDeleteModalOpen(true);

                  setDeleteProductsData({
                    ...deleteProductsData,
                    singleProduct: productId,
                  });
                }}
                data-cy="delete-icon"
              />
            )}
          </div>
        </div>
        <span
          className={`flex text-[12px] font-normal lg:text-[14px] ${dimensionClassName}`}
        >
          {` ${length} x ${breadth} x ${height} cm`} | V: {volumetricWeight}| D:{" "}
          {deadWeight} Kg | Final Weight : {`${appliedWeight}`} | ₹ :{" "}
          {`${unitPrice}`}
        </span>
      </div>
    </div>
  );
};

export default ProductDetails;
