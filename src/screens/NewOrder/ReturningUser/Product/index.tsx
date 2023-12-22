import React from "react";
import ProductIcon from "../../../../assets/Product/Product.svg";
import DeleteIcon from "../../../../assets/Product/Delete.svg";
import BookmarkIcon from "../../../../assets/Product/Bookmark.svg";
import EditIcon from "../../../../assets/Product/Edit.svg";
import ItemIcon from "../../../../assets/Product/Item.svg";
import ButtonIcon from "../../../../assets/Product/Button.svg";
import InputBox from "../../../../components/InputBox/index";
import CustomDropDown from "../../../../components/DropDown";
import CustomButton from "../../../../components/Button";
import Upload from "../../../../components/Upload";
import PackageType from "../Product/PackageType/index";
import ProductBox from "../Product/productBox";
import SearchIcon from "../../../../assets/ReturningUser/Essential.svg";
import "../../../../styles/productStyle.css";
import ProductDetails from "./productDetails";
import ProductCard from "./productCard";
import ProductCardQuantity from "./productCardQuantity";
import { productData } from "../../../../utils/dummyData";
import { productCardQuantity } from "../../../../utils/dummyData";
import AddButton from "../../../../components/Button/addButton";

const ReturningProduct = () => {
  return (
    <div className="mx-4">
      <div className="flex justify-between">
        <div className="flex gap-x-2">
          <img src={ProductIcon} alt="" />
          <p className="text-[18px] font-medium">Select a Product</p>
        </div>
        <div>
          <img src={SearchIcon} alt="" />
        </div>
      </div>
      <div className="flex gap-x-2 customScroll">
        <ProductCard props={productData} />
        <ProductCard props={productData} />
      </div>
      <div className="flex gap-x-2 customScroll">
        <ProductCardQuantity props={productCardQuantity} />
        <ProductCardQuantity props={productCardQuantity} />
      </div>
      <div className="mt-2 mb-4">
        <AddButton
          text="ADD PRODUCT"
          onClick={() => {}}
          showIcon={true}
          icon={ButtonIcon}
          alt="Add Product"
        />
      </div>

      <PackageType />
    </div>
  );
};

export default ReturningProduct;
