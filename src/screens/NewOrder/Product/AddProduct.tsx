import React, { useState, useRef, useEffect } from "react";
import ProductIcon from "../../../assets/Product/Product.svg";
import DeleteIcon from "../../../assets/Product/Delete.svg";
import BookmarkIcon from "../../../assets/Product/Bookmark.svg";
import ButtonIcon from "../../../assets/Product/Button.svg";
import InputBox from "../../../components/InputBox/index";
import ProductBox from "./ProductBox";
import { v4 as uuidv4 } from "uuid";
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
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Breadcrum } from "../../../components/Layout/breadcrum";
import CustomInputBox from "../../../components/Input";
import CustomInputWithDropDown from "../../../components/CategoriesDropDown/CategoriesDropDown";
import { getQueryJson } from "../../../utils/utility";

interface IProductFilledProps {}
const steps = [
  {
    label: "Pickup",
    isCompleted: true,
    isActive: true,
    imgSrc: TickLogo,
  },
  {
    label: "Delivery",
    isCompleted: true,
    isActive: true,
    imgSrc: TickLogo,
  },
  {
    label: "Product",
    isCompleted: false,
    isActive: true,
    imgSrc: TickLogo,
  },
  {
    label: "Service",
    isCompleted: false,
    isActive: false,
    imgSrc: TickLogo,
  },
  {
    label: "Summary",
    isCompleted: false,
    isActive: false,
    imgSrc: TickLogo,
  },
  {
    label: "Payment",
    isCompleted: false,
    isActive: false,
    imgSrc: TickLogo,
  },
];

const AddProduct: React.FunctionComponent<IProductFilledProps> = (props) => {
  const navigate = useNavigate();
  const params = getQueryJson();
  const shipyaari_id = params?.shipyaari_id || "";
  let orderSource = params?.source || "";
  let orderId = params?.orderId || "";

  const initialUserData = {
    productId: "",
    name: "",
    category: "",
    qty: 1,
    currency: "INR",
    unitPrice: "",
    unitTax: "",
    measureUnit: "cm",
    length: "",
    breadth: "",
    height: "",
    deadWeight: "",
    weightUnit: "kg",
    volumetricWeight: "",
    appliedWeight: "",
    divisor: "",
    images: [],
  };

  const [productPayload, setProductPayload]: any = useState([]);
  const [productInputState, setProductInputState]: any = useState([]);
  const [volumetricWeight, setVolumetricWeight] = useState<any>(0);
  const [divisor, setDivisor] = useState<any>(5000);

  const addProductInfo = async () => {
    const payload = {
      tempOrderId: +shipyaari_id,
      source: orderSource,
      products: productPayload,
    };
    const { data: response } = await POST(POST_PRODUCT_URL, payload);
    if (response?.success) {
      toast.success(response?.message);
      navigate(
        `/orders/add-order/product-package?shipyaari_id=${shipyaari_id}&source=${orderSource}&orderId=${orderId}`
      );
    } else {
      toast.error("Failed To Upload!");
    }
  };

  const AddProductInfoData = () => {
    setProductInputState([...productInputState, initialUserData]);
  };

  const deleteProduct = (index: number) => {
    let tempArr = productInputState;
    tempArr.splice(index, 1);
    setProductInputState([...tempArr]);

    let tempPayloadObj = productPayload;
    tempPayloadObj.splice(index, 1);
    setProductPayload([...tempPayloadObj]);
  };

  useEffect(() => {
    (async () => {
      await getOrderProductDetails();
    })();
  }, []);

  const getOrderProductDetails = async () => {
    try {
      const payload = { tempOrderId: +shipyaari_id, source: orderSource };
      const { data } = await POST(GET_LATEST_ORDER, payload);
      if (data?.success) {
        setProductPayload(data?.data[0]?.products);
        if (data?.data[0]?.products.length < 1) {
          setProductInputState([...data?.data[0]?.products, initialUserData]);
        } else {
          setProductInputState([...data?.data[0]?.products]);
        }
      } else {
        toast.error(data?.message);
        navigate(
          `/orders/add-order/delivery?shipyaari_id=${shipyaari_id}&source=${orderSource}`
        );
        throw new Error(data?.message);
      }
    } catch (error) {
      console.error("getOrderProductDetails", error);
    }
  };

  const isLgScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const handleProductInputChange = (e: any, index: number) => {
    const { name, value } = e;
    let arr = productInputState;
    let name2: any = [];
    name2 = name?.split(".");
    if (name2.length > 1) {
      arr[index][name2[0]][name2[1]] = value;
    } else {
      arr[index][name] = value;
    }
    arr[index]["productId"] = uuidv4();
    setProductInputState([...arr]);
    setProductPayload([...arr]);
  };

  const calculateVolumeWeight = (
    length: number,
    breadth: number,
    height: number
  ): number => {
    const volume = length * breadth * height;
    return volume / divisor;
  };

  const handleVolumCalc = (index: any) => {
    const {
      length,
      height,
      breadth,
      deadWeight: weight,
    } = productInputState[index];
    if (!length) return;
    if (!height) return;
    if (!breadth) return;

    const volumetricWeight = +calculateVolumeWeight(
      length,
      breadth,
      height
    ).toFixed(6);
    let arr = productInputState;
    arr[index]["volumetricWeight"] = volumetricWeight;
    arr[index]["appliedWeight"] = Math.max(volumetricWeight, weight);
    setProductInputState([...arr]);
    setProductPayload([...arr]);
  };

  const uploadedInputFile = async (e: any, index: number) => {
    let uuid = uuidv4();
    let tempArr = productInputState[index]?.images;
    let obj = {
      url: `${uuid}`,
      alt: "",
    };
    tempArr.push(obj);
    let productInputStateTempArr = productInputState;
    productInputStateTempArr[index].images = tempArr;
    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("fileName", obj.url);
    const { data: response } = await POST(FILE_UPLOAD, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response?.success) {
      toast.success(response?.message);
      setProductInputState([...productInputStateTempArr]);
      setProductPayload([...productInputStateTempArr]);
    } else {
      toast.error("Failed To Upload!");
    }
  };

  return (
    <>
      <Breadcrum label="Add New Order" />
      <div className="lg:mb-8">
        <Stepper steps={steps} />
      </div>
      <div className="px-5 mb-20">
        <div>
          {productInputState?.map((e: any, index: number) => {
            return (
              <div className="py-4" key={index}>
                <div className="flex justify-between mt-3 lg:justify-start lg:gap-x-2">
                  <div>
                    <h2 className="text-[#004EFF] text-base items-center font-bold leading-18px font-Lato">
                      Product {index + 1}
                    </h2>
                  </div>
                  <div className="flex">
                    <img
                      src={`${isLgScreen ? DeleteIconForLg : DeleteIcon}`}
                      alt="Delete Product"
                      onClick={(e: any) => deleteProduct(index)}
                      className="w-5 h-5"
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-y-4 mt-4 lg:gap-x-6 lg:grid grid-cols-4">
                  <CustomInputBox
                    label="Product name"
                    name="name"
                    value={productInputState[index].name}
                    onChange={(e: any) =>
                      handleProductInputChange(
                        { name: e.target.name, value: e.target.value },
                        index
                      )
                    }
                  />
                  <CustomInputWithDropDown
                    value={productInputState[index].category}
                    initValue={productInputState[index].name}
                    onChange={(e: any) =>
                      handleProductInputChange(
                        { name: "category", value: e },
                        index
                      )
                    }
                  />
                  {/* <CustomInputBox
                    label="Product category"
                    name="category"
                    value={productInputState[index].category}
                    onChange={(e: any) =>
                      handleProductInputChange(
                        { name: e.target.name, value: e.target.value },
                        index
                      )
                    }
                  /> */}
                  <CustomInputBox
                    label="Product Price"
                    name="unitPrice"
                    inputMode="numeric"
                    value={productInputState[index].unitPrice || ""}
                    onChange={(e: any) =>
                      handleProductInputChange(
                        { name: e.target.name, value: +e.target.value },
                        index
                      )
                    }
                  />
                  <CustomInputBox
                    label="Product tax"
                    name="unitTax"
                    inputMode="numeric"
                    value={
                      isNaN(productInputState[index].unitTax) === true
                        ? ""
                        : productInputState[index].unitTax
                    }
                    onChange={(e: any) =>
                      handleProductInputChange(
                        { name: e.target.name, value: +e.target.value },
                        index
                      )
                    }
                  />
                  <div className="flex gap-x-3 w-full">
                    <CustomInputBox
                      label="Length (cm)"
                      inputType="number"
                      name="length"
                      value={
                        productInputState[index]?.length < 0
                          ? ""
                          : productInputState[index]?.length
                      }
                      onChange={(e: any) => {
                        handleProductInputChange(
                          { name: e.target.name, value: +e.target.value },
                          index
                        );
                        handleVolumCalc(index);
                      }}
                    />

                    <CustomInputBox
                      label="Breadth (cm)"
                      name="breadth"
                      inputType="number"
                      value={
                        productInputState[index].breadth < 0
                          ? ""
                          : productInputState[index].breadth
                      }
                      onChange={(e: any) => {
                        handleProductInputChange(
                          { name: e.target.name, value: +e.target.value },
                          index
                        );
                        handleVolumCalc(index);
                      }}
                    />
                    <CustomInputBox
                      label="Height (cm)"
                      inputType="number"
                      name="height"
                      value={
                        productInputState[index].height < 0
                          ? ""
                          : productInputState[index].height
                      }
                      onChange={(e: any) => {
                        handleProductInputChange(
                          { name: e.target.name, value: +e.target.value },
                          index
                        );
                        handleVolumCalc(index);
                      }}
                    />
                  </div>
                  <div className="flex gap-x-5">
                    <CustomInputBox
                      placeholder="Volumetric Weight (Kg)"
                      label="Volumetric Weight (kg)"
                      isDisabled={true}
                      value={
                        productInputState[index]?.volumetricWeight ||
                        volumetricWeight
                      }
                    />
                    <CustomInputBox
                      placeholder="Divisor"
                      label="Divisor"
                      inputMode="numeric"
                      isDisabled={true}
                      value={divisor}
                    />
                  </div>
                  <CustomInputBox
                    label="Weight (kg)"
                    inputType="number"
                    name="deadWeight"
                    value={
                      productInputState[index]?.deadWeight < 0
                        ? ""
                        : productInputState[index]?.deadWeight
                    }
                    onChange={(e: any) =>
                      handleProductInputChange(
                        { name: e.target.name, value: +e.target.value },
                        index
                      )
                    }
                  />

                  <div>
                    <InputWithFileUpload
                      type="file"
                      onChange={(e) => uploadedInputFile(e, index)}
                    />
                  </div>
                </div>
                <>
                  {productInputState.length - 1 === index && (
                    <>
                      <div className="text-gray-400	text-xs	mt-3 lg:hidden">
                        <p>
                          Volumetric weight includes dimensions of the product
                        </p>
                      </div>

                      <div className="inline-flex cursor-pointer mt-6 bg-[#F2F6FF] rounded-[4px] shadow-sm p-2 justify-center items-center ">
                        <img src={ButtonIcon} alt="Add Product" width="16px" />

                        <button
                          className="ml-2 text-[#004EFF] text-sm font-semibold leading-5 font-Open"
                          onClick={AddProductInfoData}
                        >
                          ADD PRODUCT
                        </button>
                      </div>
                    </>
                  )}
                </>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        {/* <BottomLayout backButtonText="BACK" nextButtonText="NEXT" /> */}
        <BottomLayout finalButtonText="NEXT" callApi={() => addProductInfo()} />
      </div>
    </>
  );
};

export default AddProduct;
