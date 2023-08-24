import React, { useState, useRef, useEffect } from "react";
import ProductIcon from "../../../assets/Product/Product.svg";
import DeleteIcon from "../../../assets/Product/Delete.svg";
import BookmarkIcon from "../../../assets/Product/Bookmark.svg";
import ButtonIcon from "../../../assets/Product/Button.svg";
import InputBox from "../../../components/InputBox/index";
import ProductBox from "../Product/productBox";
import "../../../styles/productStyle.css";
import { useMediaQuery } from "react-responsive";
import DeleteIconForLg from "../../../assets/DeleteIconRedColor.svg";
import SampleProduct from "../../../assets/SampleProduct.svg";
import Stepper from "../../../components/Stepper";
import TickLogo from "../../../assets/common/Tick.svg";
import BottomLayout from "../../../components/Layout/bottomLayout";
import CustomBreadcrumb from "../../../components/BreadCrumbs";
import backArrow from "../../../assets/backArrow.svg";
import { POST } from "../../../utils/webService";
import {
  FILE_UPLOAD,
  GET_LATEST_ORDER,
  POST_PRODUCT_URL,
} from "../../../utils/ApiUrls";
import InputWithFileUpload from "../../../components/InputBox/InputWithFileUpload";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface IProductFilledProps {}

const AddProduct: React.FunctionComponent<IProductFilledProps> = (props) => {
  const navigate = useNavigate();
  const initialUserData = {
    name: "",
    category: "",
    price: "",
    tax: "",
    length: "",
    breadth: "",
    height: "",
    image: "",
  };

  const [productPayload, setProductPayload]: any = useState([]);
  const [addedProductTotal, setAddedProductTotal] = useState<number>(0);
  const [addedProductData, setAddedProductData] = useState<any>([]);
  const [productState, setProductState]: any = useState<any>(initialUserData);
  const [successProduct, setSuccessProduct] = useState(false);

  const addProductInfo = async () => {
    const { data: response } = await POST(POST_PRODUCT_URL, {
      product: productPayload,
    });
    let fileName = window.document.getElementById(
      "fileName"
    ) as HTMLInputElement;
    fileName.value = "";
    if (response?.success) {
      toast.success(response?.message);
      setSuccessProduct(true);
      setAddedProductData((prevState: any) => [...prevState, productState]);

      const clearUserData = () => {
        setProductState(initialUserData);
      };
      clearUserData();
      console.log("initialUserDataafterAPICall", initialUserData);
    } else {
      toast.error("Failed To Upload!");
    }
  };

  useEffect(() => {}, []);

  const AddProductInfoData = () => {
    console.log("productstate=>", productState);
    const payload = {
      currency: "INR",
      weight: productState.width,
      available: true,
      images: [
        {
          url: productState.image,
          alt: "",
        },
      ],
    };
    setProductPayload([...productPayload, { ...payload, ...productState }]);
  };

  const resetProductState = () => {
    setProductState(initialUserData);
  };
  useEffect(() => {
    (async () => {
      const res: any = await getOrderProductDetails();
      if (res) {
        console.log("ok", res);
      }
    })();
  }, []);
  const getOrderProductDetails = async () => {
    try {
      const { data } = await POST(GET_LATEST_ORDER);
      console.log("data", data?.data?.products);
      if (data?.success) {
        setProductPayload(data?.data?.products);
      } else {
        throw new Error(data?.message);
      }
    } catch (error) {
      console.log("getOrderProductDetails", error);
    }
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
        <div className="my-8 ">
          <Stepper steps={steps} />
        </div>

        <div className="flex gap-2 my-5">
          <img src={ProductIcon} alt="Product Icon" className="" />
          <h1 className="font-bold leading-6 text-lg font-Lato">Product</h1>
        </div>
        <div className="flex gap-x-6 my-5">
          {productPayload.length > 0 &&
            productPayload.map((product: any, i: number) => {
              return (
                <>
                  {
                    <div key={i}>
                      <div className="flex justify-between mt-3 lg:justify-start lg:gap-x-2">
                        <div className="">
                          <h2 className="text-[#004EFF] text-base items-center font-bold leading-18px font-Lato">
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
                        productName={product.name}
                        weight={product.weight}
                        length={product.length}
                        height={product.height}
                        className="p-3 lg:max-w-[272px]"
                      />
                    </div>
                  }
                </>
              );
            })}
        </div>

        <div className="flex justify-between mt-3 lg:justify-start lg:gap-x-2">
          <div className="">
            <h2 className="text-[#004EFF] text-base items-center font-bold leading-18px font-Lato">
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
            name="name"
            value={productState.name}
            onChange={handleProductInputChange}
          />
          <InputBox
            label="Product category"
            name="category"
            value={productState.category}
            onChange={handleProductInputChange}
          />
          <InputBox
            label="Product price"
            name="price"
            value={productState.price}
            onChange={handleProductInputChange}
          />
          <InputBox
            label="Product tax"
            name="tax"
            value={productState.tax}
            onChange={handleProductInputChange}
          />
          <div className="grid grid-cols-2 gap-x-2 mt-4 lg:mt-0 lg:col-span-2 lg:gap-x-6">
            <div className="grid grid-cols-2 gap-x-2 lg:gap-x-6">
              <InputBox
                className=""
                label="Length"
                name="length"
                value={productState.length}
                onChange={handleProductInputChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-x-2 lg:gap-x-6">
              <InputBox
                className=""
                label="Breadth"
                name="breadth"
                value={productState.breadth}
                onChange={handleProductInputChange}
              />
              <InputBox
                label="Height"
                name="height"
                value={productState.height}
                onChange={handleProductInputChange}
              />
            </div>
          </div>

          <InputWithFileUpload
            type="file"
            onChange={(e) => uploadedInputFile(e)}
          />
        </div>
        <div className="text-gray-400	text-xs	mt-3 lg:hidden">
          <p>Volumetric weight includes dimensions of the product</p>
        </div>

        <div className="inline-flex cursor-pointer mt-6 bg-[#F2F6FF] rounded-[4px] shadow-sm p-2 justify-center items-center ">
          <img src={ButtonIcon} alt="Add Product" width="16px" />

          <button
            className="ml-2 text-[#004EFF] text-sm font-semibold leading-5 font-Open"
            onClick={() => AddProductInfoData()}
          >
            ADD PRODUCT
          </button>
          <button
            className="pl-8 text-[#004EFF]  text-sm font-semibold leading-5 font-Open"
            onClick={() => addProductInfo()}
          >
            API CALL
          </button>
        </div>
      </div>
      <div>
        <BottomLayout backButtonText="BACK" nextButtonText="NEXT" />
      </div>
    </div>
  );
};

export default AddProduct;
