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
import ProductBox from "../Product/productBox";
import "../../../styles/productStyle.css";
import AddButton from "../../../components/Button/addButton";
import { useMediaQuery } from "react-responsive";
import DeleteIconForLg from "../../../assets/DeleteIconRedColor.svg";
import SampleProduct from "../../../assets/SampleProduct.svg";
import Stepper from "../../../components/Stepper";
import TickLogo from "../../../assets/common/Tick.svg";
import BottomLayout from "../../../components/Layout/bottomLayout";
import CustomBreadcrumb from "../../../components/BreadCrumbs";
import backArrow from "../../../assets/backArrow.svg";

interface IProductFilledProps {}

const AddProduct: React.FunctionComponent<IProductFilledProps> = (props) => {
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

  const steps = [
    {
      label: "Pickup",
      isCompleted: true,
      isActive: false,
      imgSrc: TickLogo,
    },
    {
      label: "Delivery",
      isCompleted: true,
      isActive: false,
      imgSrc: TickLogo,
    },
    {
      label: "Product",
      isCompleted: true,
      isActive: false,
      imgSrc: TickLogo,
    },
    {
      label: "Service",
      isCompleted: false,
      isActive: true,
      imgSrc: TickLogo,
    },
    {
      label: "Payment",
      isCompleted: false,
      isActive: true,
      imgSrc: TickLogo,
    },
  ];

  const isLgScreen = useMediaQuery({
    query: "(min-width: 1024px)",
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
    <div>
      <div className="mx-4">
        <div className="mx-5 ">
          <CustomBreadcrumb />
        </div>
        <div className="flex gap-x-2 items-center">
          <img src={backArrow} alt="" className="w-6 h-6" />
          <p className="text-2xl font-Lato font-semibold">Add New Order</p>
        </div>
        <div className="mb-8 mt-4">
          <Stepper steps={steps} />
        </div>

        <div className="flex gap-2 mb-8">
          <img src={ProductIcon} alt="Product Icon" className="" />
          <h1 className="font-bold leading-6 text-lg font-Lato">Product</h1>
        </div>

        {addedProductData.map((product: any, i: number) => {
          return (
            <div key={i}>
              <div className="flex justify-between mt-3 lg:justify-start lg:gap-x-2">
                <div className="">
                  <h2 className="text-[#004EFF] text-sm font-bold leading-18px font-Lato">
                    Product {i + 1}
                  </h2>
                </div>
                <div className="flex ">
                  {/* <img
                  src={EditIcon}
                  alt="Edit Product"
                  className="mr-2"
                  onClick={() => {
                    console.log(i);
                  }}
                /> */}
                  <img
                    src={BookmarkIcon}
                    alt="Bookmark Product"
                    className="mr-2"
                  />
                  <img
                    src={`${isLgScreen ? DeleteIconForLg : DeleteIcon}`}
                    alt="Delete Product"
                    className="w-5 h-5"
                  />
                </div>
              </div>
              <ProductBox
                image={SampleProduct}
                productName={product.productName}
                weight="5"
                dimension="12 x 12 x 12"
                className="p-3 lg:max-w-[272px]"
              />
            </div>
          );
        })}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // console.log(productState);
            setAddedProductData((prevState: any) => [
              ...prevState,
              productState,
            ]);
            setAddedProductTotal(addedProductTotal + 1);
          }}
        >
          <div className="flex justify-between mt-3 lg:justify-start lg:gap-x-2">
            <div className="">
              <h2 className="text-[#004EFF] text-sm font-bold leading-18px font-Lato">
                Product {addedProductTotal + 1}
              </h2>
            </div>
            <div className="flex">
              <img src={BookmarkIcon} alt="Bookmark Product" className="mr-2" />

              <img
                src={`${isLgScreen ? DeleteIconForLg : DeleteIcon}`}
                alt="Delete Product"
                className="w-5 h-5"
              />
            </div>
          </div>

          <div className="flex flex-col justify-between gap-y-4 mt-4 lg:gap-x-6 lg:grid grid-cols-3">
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
            <div className="grid grid-cols-2 gap-x-2 mt-4 lg:mt-0 lg:col-span-2 lg:gap-x-6">
              <div className="grid grid-cols-2 gap-x-2 lg:gap-x-6">
                <CustomDropDown
                  value={productState.productUnits}
                  onChange={() => {}}
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
              <div className="grid grid-cols-2 gap-x-2 lg:gap-x-6">
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
            <div className="mt-4">
              <Upload />
            </div>
          </div>
          <div className="text-gray-400	text-xs	mt-3">
            <p>Volumetric weight includes dimensions of the product</p>
          </div>

          <div className="inline-flex cursor-pointer mt-6 bg-[#F2F6FF] rounded-[4px] shadow-sm p-2 justify-center items-center ">
            <img src={ButtonIcon} alt="Add Product" width="16px" />

            <button
              className="ml-2 text-[#004EFF] text-sm font-semibold leading-5 font-Open"
              type="submit"
            >
              ADD PRODUCT
            </button>
          </div>
        </form>
      </div>
      <div>
        <BottomLayout backButtonText="BACK" nextButtonText="NEXT" />
      </div>
    </div>
  );
};

export default AddProduct;
