import React from "react";
import ProductIcon from "../../../assets/Product/Product.svg";
import DeleteIcon from "../../../assets/Product/Delete.svg";
import BookmarkIcon from "../../../assets/Product/Bookmark.svg";
import EditIcon from "../../../assets/Product/Edit.svg";
import ItemIcon from "../../../assets/Product/Item.svg";
import ButtonIcon from "../../../assets/Product/Button.svg";
import PackageType from "../Product/PackageType/index";
import ProductBox from "../Product/productBox";
import SampleProduct from "../../../assets/SampleProduct.svg";
import toggle from "../../../assets//toggle-off-circle.svg";
import DeleteIconForLg from "../../../assets/DeleteIconRedColor.svg";
import { useMediaQuery } from "react-responsive";
import "../../../styles/productStyle.css";

import AddButton from "../../../components/Button/addButton";

interface IPackageProps {}

const Package: React.FunctionComponent<IPackageProps> = (props) => {
  const isLgScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  return (
    <div className="mx-4">
      <div className="flex justify-between ">
        <div className="flex items-center gap-2">
          <img src={ProductIcon} alt="Product Icon" className="" />
          <h1 className="font-bold leading-6 text-lg ">Product</h1>
        </div>
        <div className="hidden  lg:flex whitespace-nowrap gap-x-32 bg-[#FFFFFF] shadow-sm p-2  ">
          <p>Handle with care</p>
          <div className="border-2 border-[#F35838] bg-[#F35838] flex  items-center rounded-md gap-x-3 px-2">
            <img src={toggle} alt="toggle" />
            <p className="text-[14px] text-white">DEACTIVATE</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-3 lg:justify-start lg:gap-x-4">
        <div className="">
          <h2 className="text-[#004EFF] text-sm font-bold leading-18px">
            Package 1
          </h2>
        </div>
        <div className="flex items-center">
          <img src={EditIcon} alt="Edit Product" className="mr-2" />
          <img src={BookmarkIcon} alt="Bookmark Product" className="mr-2" />
          <img
            src={isLgScreen ? DeleteIconForLg : DeleteIcon}
            alt="Delete Product"
            className="mr-2 w-4 h-4"
          />
        </div>
      </div>

      <ProductBox
        image={SampleProduct}
        productName="Mac book air"
        weight="5"
        dimension="12 x 12 x 12"
        className="p-3 lg:max-w-[272px]"
      />

      <div className="mt-6">
        <AddButton
          text="ADD PRODUCT"
          onClick={() => {}}
          showIcon={true}
          icon={ButtonIcon}
          alt="Add Product"
        />
      </div>
      <div className="flex justify-between mt-5 whitespace-nowrap  bg-[#FFFFFF] shadow-sm p-2  lg:hidden ">
        <div>
          <p>Handle with care</p>
        </div>

        <div className="bg-[white] flex  items-center rounded-md gap-x-3 px-2">
          <img src={toggle} alt="toggle" />

          <p className="text-[14px] text-[#F35838]">DEACTIVATE</p>
        </div>
      </div>
      <div className="mt-7">
        <PackageType />
      </div>
    </div>
  );
};

export default Package;
