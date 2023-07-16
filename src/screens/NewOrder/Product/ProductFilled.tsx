import React, { useState } from "react";
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
import AddButton from "../../../components/Button/addButton";

interface IProductFilledProps {}

const ProductFilled: React.FunctionComponent<IProductFilledProps> = (props) => {
  const [productState, setProductState] = useState<any>({
    productName: "",
    productCategory: "",
    productPrice: "",
    productTax: "",
    productUnits: "",
    productLength: "",
    productBreadth: "",
    productHeight: "",
  });

  const [addedProductTotal, setAddedProductTotal] = useState<number>(0);
  const [addedProductData, setAddedProductData] = useState<any>([]);
  console.log(addedProductData);

  const handleProductInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProductState((prevState: any) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="mx-4">
      <div className="flex gap-2">
        <img src={ProductIcon} alt="Product Icon" className="" />
        <h1 className="font-bold leading-6 text-lg ">Product</h1>
      </div>

      {/* {[...Array(addedProductTotal)].map((_, i) => {
        return (
          <div key={i}>
            <div className="flex justify-between mt-3">
              <div className="">
                <h2 className="text-[#004EFF] text-sm font-bold leading-18px">
                  Product {i + 1}
                </h2>
              </div>
              <div className="flex">
                <img
                  src={EditIcon}
                  alt="Edit Product"
                  className="mr-2"
                  onClick={() => {
                    console.log(i);
                  }}
                />
                <img
                  src={BookmarkIcon}
                  alt="Bookmark Product"
                  className="mr-2"
                />
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
          </div>
        );
      })} */}
      {addedProductData.map((product: any, i: number) => {
        return (
          <div key={i}>
            <div className="flex justify-between mt-3">
              <div className="">
                <h2 className="text-[#004EFF] text-sm font-bold leading-18px">
                  Product {i + 1}
                </h2>
              </div>
              <div className="flex">
                <img
                  src={EditIcon}
                  alt="Edit Product"
                  className="mr-2"
                  onClick={() => {
                    console.log(i);
                  }}
                />
                <img
                  src={BookmarkIcon}
                  alt="Bookmark Product"
                  className="mr-2"
                />
                <img src={DeleteIcon} alt="Delete Product" className="mr-2" />
              </div>
            </div>
            <ProductBox
              image={ItemIcon}
              productName={product.productName}
              weight="5"
              dimension="12 x 12 x 12"
              className="p-3"
            />
          </div>
        );
      })}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // console.log(productState);
          setAddedProductData((prevState: any) => [...prevState, productState]);
          setAddedProductTotal(addedProductTotal + 1);
        }}
      >
        <div className="flex justify-between mt-3">
          <div className="">
            <h2 className="text-[#004EFF] text-sm font-bold leading-18px ">
              Product {addedProductTotal + 1}
            </h2>
          </div>
          <div className="flex">
            <img src={BookmarkIcon} alt="Bookmark Product" className="mr-2" />
            <img src={DeleteIcon} alt="Delete Product" className="mr-2" />
          </div>
        </div>
        <div className="flex flex-col justify-between gap-y-4 mt-4">
          <InputBox
            label="Product name"
            name="productName"
            value={productState.productName}
            onChange={handleProductInputChange}
          />
          <InputBox
            label="Product category"
            name="productCategory"
            value={productState.productCategory}
            onChange={handleProductInputChange}
          />
          <InputBox
            label="Product price"
            name="productPrice"
            value={productState.productPrice}
            onChange={handleProductInputChange}
          />

          <InputBox
            label="Product tax"
            name="productTax"
            value={productState.productTax}
            onChange={handleProductInputChange}
          />
        </div>
        <div className="grid grid-cols-2 gap-x-2 mt-4">
          <div className="grid grid-cols-2 gap-x-2">
            <CustomDropDown
              value={productState.productUnits}
              onChange={() => {
                console.log("hello");
              }}
              options={[
                {
                  label: "CM",
                  value: "CM",
                },
              ]}
              selectClassName="rounded-md bg-[#FEFEFE]"
              name="productUnits"
            />

            <InputBox
              className=""
              label="Length"
              name="productLength"
              value={productState.productLength}
              onChange={handleProductInputChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <InputBox
              className=""
              label="Breadth"
              name="productBreadth"
              value={productState.productBreadth}
              onChange={handleProductInputChange}
            />
            <InputBox
              label="Height"
              name="productHeight"
              onChange={handleProductInputChange}
            />
          </div>
        </div>
        <div className="text-gray-400	text-xs	mt-3">
          <p>Volumetric weight includes dimensions of the product</p>
        </div>
        <div className="mt-4">
          <Upload />
        </div>
        <div className="inline-flex cursor-pointer mt-6 bg-[#F2F6FF] rounded-[4px] shadow-sm p-2 justify-center items-center ">
          <img src={ButtonIcon} alt="Add Product" width="16px" />

          <button
            className="ml-2 text-[#004EFF] text-sm font-semibold leading-5"
            type="submit"
          >
            ADD PRODUCT
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductFilled;
