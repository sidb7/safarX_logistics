import React from "react";
import EditIcon from "../../../assets/Product/Edit.svg";
import DeleteIcon from "../../../assets/DeleteIconRedColor.svg";

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
  setIsDeleteModalOpen,
  productId = "",
  setDeleteProductsData,
  deleteProductsData = false,
  productNameClass,
  filterId,
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
      data-cy="product-box"
    >
      <span
        className={`${
          label !== "" ? "" : "hidden"
        } bg-[#6695FF] text-white absolute -top-4 ml-2 rounded-md w-[91px] flex justify-center `}
      >
        {label}
      </span>
      <div className="w-20 p-3.5 flex justify-center items-center">
        <img src={image} className="" alt="" />
      </div>
      {/* <div className="mr-3 lg:mr-0 lg:px-4 w-auto h-[100%] overflow-hidden">
        <img className="w-[100%]  h-[100%] object-contain" src={image} alt="" />
      </div> */}
      <div className="flex flex-col w-full">
        <div className="flex justify-between ">
          <span className={`line-clamp-1 !${productNameClass} w-[100px]`}>
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
        <span className="flex text-[12px] lg:text-[14px] ">
          {`${weight} | ${length} x ${breadth} x ${height} cm`}
        </span>
      </div>
    </div>
  );
};

export default ProductDetails;
