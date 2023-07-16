import React from "react";
import ProductIcon from "../../../assets/Product/Product.svg";
import DeleteIcon from "../../../assets/Product/Delete.svg";
import BookmarkIcon from "../../../assets/Product/Bookmark.svg";
import EditIcon from "../../../assets/Product/Edit.svg";
import ItemIcon from "../../../assets/Product/Item.svg";
import ButtonIcon from "../../../assets/Product/Button.svg";
import PackageType from "../Product/PackageType/index";
import ProductBox from "../Product/productBox";
import "../../../styles/productStyle.css";

import AddButton from "../../../components/Button/addButton";

interface IPackageProps {}

const Package: React.FunctionComponent<IPackageProps> = (props) => {
  return (
    <div className="mx-4">
      <div className="flex gap-2">
        <img src={ProductIcon} alt="Product Icon" className="" />
        <h1 className="font-bold leading-6 text-lg ">Product</h1>
      </div>
      <div className="flex justify-between mt-3">
        <div className="">
          <h2 className="text-[#004EFF] text-sm font-bold leading-18px">
            Package 1
          </h2>
        </div>
        <div className="flex">
          <img src={EditIcon} alt="Edit Product" className="mr-2" />
          <img src={BookmarkIcon} alt="Bookmark Product" className="mr-2" />
          <img src={DeleteIcon} alt="Delete Product" className="mr-2" />
        </div>
      </div>

      <ProductBox
        image={ItemIcon}
        productName="Mac book air"
        weight="5"
        dimension="12 x 12 x 12"
        className="p-3"
      />

      {/* <div className="inline-flex mt-6 bg-[#F2F6FF] rounded-[4px] shadow-sm p-2 justify-center items-center ">
        <img src={ButtonIcon} alt="Add Product" width="16px" />
        <span className="ml-2 text-[#004EFF] text-sm font-semibold leading-5">
          ADD PRODUCT
        </span>
      </div> */}
      <div className="mt-6">
        <AddButton
          text="ADD PRODUCT"
          onClick={() => {}}
          showIcon={true}
          icon={ButtonIcon}
          alt="Add Product"
        />
      </div>
      <div className="mt-7">
        <PackageType />
      </div>
    </div>
  );
};

export default Package;
