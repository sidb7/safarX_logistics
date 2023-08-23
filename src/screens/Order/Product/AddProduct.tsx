import React, { useState, useRef } from "react";
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
import { POST } from "../../../utils/webService";
import { FILE_UPLOAD, POST_PRODUCT_URL } from "../../../utils/ApiUrls";
// import UploadButton from "./CustomUploadButton";
import InputWithFileUpload from "../../../components/InputBox/InputWithFileUpload";
import { toast } from "react-toastify";
import { convertToObject } from "typescript";

interface IProductFilledProps {}

const AddProduct: React.FunctionComponent<IProductFilledProps> = (props) => {
  const [addedProductTotal, setAddedProductTotal] = useState<number>(0);
  const [addedProductData, setAddedProductData] = useState<any>([]);
  const refImage = useRef();
  console.log("checkthestate", addedProductTotal);

  const [uploadedFile, setUploadFile]: any = useState(null);
  const [addButton, setAddButton]: any = useState(false);
  const [disabled, setDisabled]: any = useState(true);
  const [successProduct, setSuccessProduct] = useState(false);
  console.log("successornot", successProduct);

  const initialUserData = {
    productName: "",
    productCategory: "",
    productPrice: "",
    productTax: "",
    productUnits: "",
    productLength: "",
    productBreadth: "",
    productHeight: "",
    productImage: "",
  };

  const [productState, setProductState]: any = useState<any>(initialUserData);
  console.log("initialUserData", initialUserData);
  console.log("productState=>", productState);
  const AddProduct = async (e: any) => {
    e.preventDefault();
    console.log("productstate=>", productState);
    const payload = {
      productName: productState.productName,
      description: "This is an example product for demonstration purposes.",
      category: [productState.productCategory],
      tags: ["electronics", "smartphone", "android"],
      price: productState.productPrice,
      currency: "INR",
      discountAmount: 0,
      sale_price: 0,
      gst: productState.productTax,
      stock: 0,
      dimensions: {
        length: productState.productLength,
        width: productState.productBreadth,
        height: productState.productHeight,
        unit: productState.productUnits,
      },
      weight: {
        deadWeight: 12,
        deadWeightUnit: "kg",
        volumetricWeight: 0,
        volumetricWeightUnit: "kg",
        catalogueWeight: {
          from: 1,
          to: 2,
          unit: "kg",
        },
      },
      available: true,
      attributes: {
        color: "Black",
        size: "Medium",
        brand: "ABC Electronics",
      },
      features: [
        "6.5-inch AMOLED display",
        "Quad-camera system",
        "128GB storage",
      ],
      images: [
        {
          url: productState.productImage,
          alt: "Front View",
        },
        {
          url: "https://example.com/images/product123_back.jpg",
          alt: "Back View",
        },
      ],
      ratings: {
        average: 0,
        count: 0,
      },
      reviews: [],
    };
    const { data: response } = await POST(POST_PRODUCT_URL, payload);
    let a = window.document.getElementById("pranay") as HTMLInputElement;
    a.value = "";
    if (response?.success) {
      toast.success(response?.message);
      setSuccessProduct(true);
      setAddedProductData((prevState: any) => [...prevState, productState]);
      const clearUserData = () => {
        setProductState(initialUserData);
      };
      clearUserData();

      console.log("initialUserDataafterAPICall", initialUserData);

      //Navigate Url's go here
    } else {
      toast.error("Failed To Upload!");
    }
  };
  const resetProductState = () => {
    setProductState(initialUserData);
  };

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

  const handleProductInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProductState((prevState: any) => ({ ...prevState, [name]: value }));
  };

  console.log("productImage", productState.productImage);
  const uploadedInputFile = async (e: any) => {
    console.log("uploadedInputFile", e.target.files[0]);

    const payload = {
      file: e.target.files[0].name,
      fileName: productState.productImage,
    };
    // setProductState.productImage(e.target.files[0].name);
    setProductState((prevState: any) => ({
      ...prevState,
      productImage: e.target?.files[0].name,
    }));

    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("fileName", productState.productImage);
    const { data: response } = await POST(FILE_UPLOAD, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response?.success) {
      toast.success(response?.message);

      //Navigate Url's go here
    } else {
      toast.error("Failed To Upload!");
    }
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
        <div className="flex gap-x-6">
          {addedProductData.map((product: any, i: number) => {
            return (
              <>
                {successProduct && (
                  <div key={i}>
                    <div className="flex justify-between mt-3 lg:justify-start lg:gap-x-2">
                      <div className="">
                        <h2 className="text-[#004EFF] text-sm font-bold leading-18px font-Lato">
                          Product {i + 1}
                        </h2>
                      </div>
                      <div className="flex ">
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
                      weight={product.productLength}
                      dimension={product.productBreadth}
                      height={product.productLength}
                      className="p-3 lg:max-w-[272px]"
                    />
                  </div>
                )}
              </>
            );
          })}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(productState);
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
                Product {addedProductData.length + 1}
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
                  // value={productState.productUnits}
                  value={productState.productUnits}
                  options={[
                    {
                      label: "",
                      value: "",
                    },
                    {
                      label: "CM",
                      value: "CM",
                    },
                    {
                      label: "MM",
                      value: "KM",
                    },
                  ]}
                  selectClassName="rounded-md bg-[#FEFEFE]"
                  name="productUnits"
                  onChange={handleProductInputChange}
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
                  value={productState.productHeight}
                  onChange={handleProductInputChange}
                />
              </div>
            </div>

            <InputWithFileUpload
              type="file"
              onChange={(e) => uploadedInputFile(e)}
              // value="suresh"
              // uploadText={productState?.productImage}

              // value={
              //   productState?.productImage ? productState?.productImage : ""
              // }
            />
          </div>
          <div className="text-gray-400	text-xs	mt-3">
            <p>Volumetric weight includes dimensions of the product</p>
          </div>

          <div className="inline-flex cursor-pointer mt-6 bg-[#F2F6FF] rounded-[4px] shadow-sm p-2 justify-center items-center ">
            <img src={ButtonIcon} alt="Add Product" width="16px" />

            <button
              className="ml-2 text-[#004EFF] text-sm font-semibold leading-5 font-Open"
              type="submit"
              onClick={(e) => AddProduct(e)}
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
