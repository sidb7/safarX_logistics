import React from "react";
import ProductIcon from "../../../assets/Product/Product.svg";
import DeleteIcon from "../../../assets/Product/Delete.svg";
import BookmarkIcon from "../../../assets/Product/Bookmark.svg";
import EditIcon from "../../../assets/Product/Edit.svg";
import ItemIcon from "../../../assets/Product/Item.svg";
import ButtonIcon from "../../../assets/Product/Button.svg";
import InputBox from "../../../components/InputBox/index";
import CustomDropDown from "../../../components/DropDown";
import CustomButton from "../../../components/Button";
import Upload from "../../../components/Upload";
import PackageType from "../Product/PackageType/index";
import ProductBox from "../Product/productBox";
import "../../../styles/productStyle.css";
import ProductDetails from "./productDetails";
const Index = () => {
  return (
    <div className="mx-4">
      <div className="flex">
        <img src={ProductIcon} alt="Product Icon" className="mr-2" />
        <h1 className="font-semibold">Product</h1>
      </div>
      <div className="flex justify-between lg:justify-start lg:gap-x-2 mt-3">
        <div className="">
          <h2 className="font-semibold">Product 1</h2>
        </div>
        <div className="flex">
          <img src={EditIcon} alt="Edit Product" className="mr-2" />
          <img src={BookmarkIcon} alt="Bookmark Product" className="mr-2" />
          <img src={DeleteIcon} alt="Delete Product" className="mr-2" />
        </div>
      </div>
      <div className="lg:w-[272px]">
        <ProductBox
          image={ItemIcon}
          productName="Mac book air"
          weight="5"
          dimension="12 x 12 x 12"
        />
      </div>
      

      <div className="flex justify-between mt-3 lg:justify-start lg:gap-x-2">
        <div className="">
          <h2 className="font-semibold">Product 2</h2>
        </div>
        <div className="flex">
          <img src={BookmarkIcon} alt="Bookmark Product" className="mr-2"/>
          <img src={DeleteIcon} alt="Delete Product" className="mr-2" />
        </div>
      </div>

      <div className="">
        <div className="flex flex-col justify-between gap-y-4 mt-4 lg:gap-x-6 lg:grid grid-cols-3">
          <InputBox label="Product name" className="lg:col-span-1"/>
          <InputBox label="Product category" className="lg:col-span-1"/>
          <InputBox label="Product price" className="lg:col-span-1"/>
          <InputBox label="Product tax" className="lg:col-span-1"/>
          <div className="grid grid-cols-2 gap-x-2 mt-4 lg:mt-0 lg:col-span-2 lg:gap-x-6">
            <div className="grid grid-cols-2 gap-x-2 lg:gap-x-6">
              <div>
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
              
              </div>
              <InputBox className="" label="Length" />
            </div>
            <div className="grid grid-cols-2 gap-x-2 lg:gap-x-6">
              <InputBox className="" label="Breadth" />
              <InputBox label="Height" />
            </div>
          </div>
          <p className="text-gray-400	text-xs	mt-3 lg:hidden">Volumetric weight includes dimensions of the product</p>
          <div className="mt-4">
          <Upload />
          </div> 
        </div>
        
        {/* <div className="grid grid-cols-2 gap-x-2 mt-4 ">
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
        </div> */}
        {/* <div >
          <p className="text-gray-400	text-xs	mt-3">Volumetric weight includes dimensions of the product</p>
        </div> */}
        {/* <div className="mt-4">
          <Upload />
        </div> */}
      </div>

      <div className="flex mt-6 ">
        <img src={ButtonIcon} alt="Add Product" width="16px" />
        <span className="ml-2 text-blue-600 text-base">Add Product</span>
      </div>
      <div className="flex mt-6">
        <CustomButton text="Continue" onClick={() => {}} />
      </div>
      <PackageType />
    </div>
  );
};

export default Index;
