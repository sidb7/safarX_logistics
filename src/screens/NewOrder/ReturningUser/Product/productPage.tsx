import React, { useState } from "react";
import DeleteIcon from "../../../assets/Product/Delete.svg";
import BookmarkIcon from "../../../assets/Product/Bookmark.svg";
import ButtonIcon from "../../../assets/Product/Button.svg";
import InputBox from "../../../../components/InputBox/index";
import CustomDropDown from "../../../../components/DropDown";
import Upload from "../../../../components/Upload";
import "../../../styles/productStyle.css";
import AddButton from "../../../../components/Button/addButton";

interface IProductPageProps {}

const ProductPage: React.FunctionComponent<IProductPageProps> = (props) => {
  return (
    <div className="mx-4">
      <div className="flex justify-between mt-3">
        <div className="">
          <h2 className="font-semibold">Product 2</h2>
        </div>
        <div className="flex">
          <img src={BookmarkIcon} alt="Bookmark Product" className="mr-2" />
          <img src={DeleteIcon} alt="Delete Product" className="mr-2" />
        </div>
      </div>
      <div className="flex flex-col justify-between gap-y-4 mt-4">
        <InputBox label="Product name" />
        <InputBox label="Product category" />
        <InputBox label="Product price" />
        <InputBox label="Product tax" />
      </div>
      <div className="grid grid-cols-2 gap-x-2 mt-4">
        <div className="grid grid-cols-2 gap-x-2">
          <CustomDropDown
            value=""
            onChange={() => {}}
            options={[
              {
                label: "CM",
                value: "CM",
              },
            ]}
            selectClassName="rounded-md bg-[#FEFEFE]"
          />

          <InputBox className="" label="Length" />
        </div>
        <div className="grid grid-cols-2 gap-x-2">
          <InputBox className="" label="Breadth" />
          <InputBox label="Height" />
        </div>
      </div>
      <div className="text-gray-400	text-xs	mt-3">
        <p>Volumetric weight includes dimensions of the product</p>
      </div>
      <div className="mt-4">
        <Upload />
      </div>

      <div className="mt-6">
        <AddButton
          text="ADD PRODUCT"
          onClick={() => {}}
          showIcon={true}
          icon={ButtonIcon}
          alt="Add Product"
        />
      </div>
    </div>
  );
};

export default ProductPage;
