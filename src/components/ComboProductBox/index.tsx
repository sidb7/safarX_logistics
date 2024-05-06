import React, { useEffect, useState } from "react";
import CenterModal from "../CustomModal/customCenterModal";
import CrossIcon from "../../assets/CloseIcon.svg";
import ProductBox from "../../screens/NewOrder/Product/ProductBox";
import CustomButton from "../../components/Button";
import { useNavigate } from "react-router-dom";
import addIcon from "../../assets/Catalogue/add.svg";
import CustomInputBox from "../Input";
import InputWithFileUpload from "../InputBox/InputWithFileUpload";
import ViewIcon from "../../assets/Login/eye.svg";
import BottomModal from "../../components/CustomModal/customBottomModal";
import { useMediaQuery } from "react-responsive";
import DeleteIcon from "../../assets/DeleteIconRedColor.svg";
import ItemIcon from "../../assets/Product/Item.svg";
import ShopifyLg from "../../assets/Catalogue/shopifyLg.svg";
import WooLg from "../../assets/Catalogue/WooCommerceLg.svg";
import ZohoIcon from "../../assets/Catalogue/ZOHO.svg.png";
import AmazonPngIcon from "../../assets/AmazonIcon.png";
import UniCommerceIcon from "../../assets/Catalogue/unicommerce fn.svg";

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
  selectMode?: boolean;
  productId?: any;
  setIsDeleteModalOpen?: any;
  setDeleteProductsData?: any;
  deleteProductsData?: any;
  source?: string;
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
  onClick = () => {},
  data,
  index,
  isSelected = false,
  selectMode = false,
  productId = "",
  setIsDeleteModalOpen,
  setDeleteProductsData,
  deleteProductsData = "",
  source,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<any>(false);
  const navigate = useNavigate();
  const isMobileView = useMediaQuery({ maxWidth: 768 });

  return (
    <>
      <div
        className={` ${className} p-2 product-box flex justify-between border-2 rounded-md h-20 relative z-0 ${
          isSelected && "border-[#004EFF]"
        }`}
        onClick={() => (!selectMode ? setIsModalOpen(true) : onClick())}
        style={{
          boxShadow:
            "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
        }}
      >
        <span
          onClick={() => (selectMode ? setIsModalOpen(true) : "")}
          className={`${
            label !== "" ? "" : "hidden"
          } bg-[#6695FF] text-white absolute -top-4 ml-2  rounded-md w-[91px] flex justify-center `}
        >
          {label}
        </span>

        <div className="flex items-center">
          <div className="px-2">
            <img src={image} alt="" />
          </div>
          <div className="flex flex-col px-4 ">
            <div>
              <span className="line-clamp-1">{productName}</span>
            </div>
            <span className="flex ">{`${weight} | ₹${
              Value && Value?.toFixed(2)
            }`}</span>
          </div>
        </div>
        {deleteProductsData && (
          <img
            src={DeleteIcon}
            alt=""
            width={18}
            className=" self-start z-10"
            onClick={(e: any) => {
              e.stopPropagation();

              setIsDeleteModalOpen(true);

              setDeleteProductsData({
                ...deleteProductsData,
                comboProduct: productId,
              });
            }}
          />
        )}
      </div>

      {!isMobileView ? (
        <CenterModal
          className="h-[750px] w-[700px] !absolute !z-2"
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
        >
          <div className="h-[100%] w-[100%] p-6 border">
            <div className="flex justify-between items-center right-4 top-4 w-[100%]">
              <img
                width={100}
                src={
                  source === "SHOPIFY"
                    ? ShopifyLg
                    : source === "WOOCOMMERCE"
                    ? WooLg
                    : source === "ZOHO"
                    ? ZohoIcon
                    : source === "AMAZON"
                    ? AmazonPngIcon
                    : source === "UNICOMMERCE"
                    ? UniCommerceIcon
                    : ""
                }
                alt="Cross Icon"
                className={`cursor-pointer ${!source ? "hidden" : ""}`}
              />

              <div className="text-[25px] font-bold">{data.name}</div>
              <div className="w-[100px] flex flex-row-reverse">
                <img
                  src={CrossIcon}
                  alt="Cross Icon"
                  className="cursor-pointer"
                  onClick={() => setIsModalOpen(false)}
                />
              </div>
            </div>
            <div className="mt-6">
              <div className="my-4 max-h-[480px] overflow-auto">
                {data.products?.map((singleProduct: any, index: any) => {
                  return (
                    <div className="flex items-center my-3">
                      <div className="font-normal text-[25px] mr-8">
                        {index + 1}
                      </div>
                      <ProductBox
                        image={
                          (singleProduct?.images?.length > 0 &&
                            singleProduct?.images[0].url) ||
                          ItemIcon
                        }
                        productName={singleProduct?.name}
                        weight={`${singleProduct?.appliedWeight} ${singleProduct?.weightUnit}`}
                        height={singleProduct?.height}
                        breadth={singleProduct?.breadth}
                        length={singleProduct?.length}
                        className="w-[100%]"
                      />
                    </div>
                  );
                })}
              </div>
              <hr />
              <div className="grid grid-cols-2 gap-5 my-4">
                <div className="flex-1">
                  <CustomInputBox
                    label="Total Volumetric Weight (Kg)"
                    value={data.totalVolumetricWeight}
                    isDisabled={true}
                  />
                </div>
                <div className="flex-1">
                  <CustomInputBox
                    label="Total Dead Weight"
                    value={data?.totalDeadWeight}
                    isDisabled={true}
                  />
                </div>
                <div className="flex-1">
                  <CustomInputBox
                    label="Total Applied Weight"
                    value={data?.totalAppliedWeight}
                    isDisabled={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </CenterModal>
      ) : (
        <BottomModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
        >
          <div className="h-[100%] w-[100%] p-2 ">
            <div className="flex justify-between right-4 top-4">
              <div className="text-[22px] lg:text-[25px] font-bold">
                {data.name}
              </div>
              <img
                src={CrossIcon}
                alt="Cross Icon"
                className="cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              />
            </div>
            <div className="mt-6">
              <div className="my-4 max-h-[480px] overflow-auto">
                {data.products?.map((singleProduct: any, index: any) => {
                  return (
                    <div className="flex items-center my-3">
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
                        className="w-[100%]"
                      />
                    </div>
                  );
                })}
              </div>
              <hr />
              <div className="grid lg:grid-cols-2 gap-5 my-4">
                <div className="flex-1">
                  <CustomInputBox
                    label="Total Volumetric Weight (Kg)"
                    value={data.totalVolumetricWeight}
                    isDisabled={true}
                  />
                </div>
                <div className="flex-1">
                  <CustomInputBox
                    label="Total Dead Weight"
                    value={data?.totalDeadWeight}
                    isDisabled={true}
                  />
                </div>
                <div className="flex-1">
                  <CustomInputBox
                    label="Total Applied Weight"
                    value={data?.totalAppliedWeight}
                    isDisabled={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </BottomModal>
      )}
    </>
  );
};

export default ComboProductBox;
