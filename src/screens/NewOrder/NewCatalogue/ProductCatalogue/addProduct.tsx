import React, { useState, useRef, useEffect } from "react";
import ProductIcon from "../../../../assets/Product/Product.svg";
import DeleteIcon from "../../../../assets/Product/Delete.svg";
import BookmarkIcon from "../../../../assets/Product/Bookmark.svg";
import ButtonIcon from "../../../../assets/Product/Button.svg";
import InputBox from "../../../../components/InputBox/index";
import RightSideModal from "../../../../components/CustomModal/customRightModal";
// import ProductBox from ".ProductBox";
import { v4 as uuidv4 } from "uuid";
import "../../../../styles/productStyle.css";
import { useMediaQuery } from "react-responsive";
import DeleteIconForLg from "../../../../assets/DeleteIconRedColor.svg";
import SampleProduct from "../../../../assets/SampleProduct.svg";
import TickLogo from "../../../../assets/common/Tick.svg";
import BottomLayout from "../../../../components/Layout/bottomLayout";
// import CustomBreadcrumb from "../../../../components/BreadCrumbs";
// import backArrow from "../../../assets/backArrow.svg";
import { POST } from "../../../../utils/webService";
import {
  FILE_UPLOAD,
  GET_LATEST_ORDER,
  CREATE_BULK_PRODUCT,
  POST_PRODUCT_URL,
} from "../../../../utils/ApiUrls";
import InputWithFileUpload from "../../../../components/InputBox/InputWithFileUpload";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Breadcrum } from "../../../../components/Layout/breadcrum";
import CustomInputBox from "../../../../components/Input";
import CustomInputWithDropDown from "../../../../components/CategoriesDropDown/CategoriesDropDown";
import {
  checkNonNegative,
  isGreaterThenValidation,
  isRequired,
} from "../../../../utils/validationRules";

interface IProductFilledProps {}

const AddProduct: React.FunctionComponent<IProductFilledProps> = (props) => {
  const navigate = useNavigate();
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
    divisor: "5000",
    sku: "",
    images: [],
  };
  const validation: any = {
    name: [isRequired],
    category: [isRequired],
    unitPrice: [isRequired, checkNonNegative],
    unitTax: [isRequired, checkNonNegative],
    length: [isRequired, checkNonNegative],
    breadth: [isRequired, checkNonNegative],
    height: [isRequired, checkNonNegative],
    deadWeight: [isRequired, checkNonNegative],
  };

  const [productPayload, setProductPayload]: any = useState([]);
  const [productInputState, setProductInputState]: any = useState([
    { ...initialUserData },
  ]);

  const [volumetricWeight, setVolumetricWeight] = useState<any>(0);
  const [showCombo, setShowCombo] = useState<any>(false);
  const [divisor, setDivisor] = useState<any>(5000);
  //adding all products info

  const [validationErrors, setValidationErrors]: any = useState<any>(null);

  const validate = (value: any, validationRule: any) => {
    let errors = [];
    for (let index = 0; index < validationRule.length; index++) {
      const element = validationRule[index];
      const res = element(value);
      if (res !== true) {
        errors.push(res);
      }
    }
    return errors;
  };

  const validateOnSubmit = () => {
    let hasErrors = false;
    for (const inputName in validation) {
      const errors = validate(
        productInputState[0][inputName],
        validation[inputName] || []
      );
      setValidationErrors((prevErrors: any) => ({
        ...prevErrors,
        [inputName]: errors[0] || false,
      }));
      if (errors.length > 0) {
        hasErrors = true;
      }
    }
    return !hasErrors;
  };

  const addProductInfo = async () => {
    const valid = validateOnSubmit();
    if (!valid) return;

    const { data: response } = await POST(CREATE_BULK_PRODUCT, {
      products: productPayload,
    });
    if (response?.success) {
      toast.success(response?.message);
      navigate(-1);
    } else {
      toast.error(response?.message);
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

  const isLgScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const handleProductInputChange = (
    e: any,
    index: number,
    validationRule: any = []
  ) => {
    const { name, value } = e;
    const errors = validate(value, validationRule) || true;
    setValidationErrors((prevErrors: any) => ({
      ...prevErrors,
      [name]: errors.length > 0 ? errors[0] : true,
    }));
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
    ).toFixed(2);
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
      <Breadcrum label="Add New Product" />
      {/* <div className="lg:mb-8">
        <Stepper steps={steps} />
      </div> */}
      <div className="px-5 mb-20">
        {productInputState?.map((e: any, index: number) => {
          return (
            <>
              <div className="py-4" key={index}>
                <div className="flex justify-between mt-3 lg:justify-start lg:gap-x-2">
                  <div>
                    <h1 className="text-[#004EFF] text-  items-center font-bold leading-18px font-Lato">
                      Product {index + 1}
                    </h1>
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

                <div className="pt-4">
                  <div className="w-full lg:w-3/4">
                    <span className="text-base">Product Details</span>
                    <div className="flex flex-col sm:flex-row gap-6 py-4">
                      <CustomInputBox
                        label="Product name"
                        name="name"
                        value={productInputState[index].name}
                        errorMessage={validationErrors?.name}
                        onChange={(e: any) =>
                          handleProductInputChange(
                            { name: e.target.name, value: e.target.value },
                            index,
                            [isRequired]
                          )
                        }
                      />
                      <CustomInputWithDropDown
                        value={productInputState[index].category}
                        initValue={productInputState[index].name}
                        onChange={(e: any) =>
                          handleProductInputChange(
                            { name: "category", value: e },
                            index,
                            [isRequired]
                          )
                        }
                      />
                      <CustomInputBox
                        label="SKU"
                        name="sku"
                        value={productInputState[index].sku}
                        onChange={(e: any) =>
                          handleProductInputChange(
                            { name: e.target.name, value: e.target.value },
                            index
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-3/4">
                    <span className=""> Measurement </span>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 py-4">
                      <div className=" flex col-span-2  w-full gap-6">
                        <CustomInputBox
                          label="Length (CM)"
                          inputType="text"
                          inputMode="numeric"
                          name="length"
                          errorMessage={validationErrors?.length}
                          value={productInputState[index]?.length}
                          onChange={(e: any) => {
                            if (!isNaN(e.target.value)) {
                              handleProductInputChange(
                                {
                                  name: e.target.name,
                                  value: e?.target?.value,
                                },
                                index,
                                [isRequired, checkNonNegative]
                              );
                              handleVolumCalc(index);
                            }
                          }}
                        />

                        <CustomInputBox
                          label="Breadth (CM)"
                          name="breadth"
                          inputType="text"
                          inputMode="numeric"
                          value={productInputState[index].breadth || ""}
                          errorMessage={validationErrors?.breadth}
                          onChange={(e: any) => {
                            if (!isNaN(e.target.value)) {
                              handleProductInputChange(
                                { name: e.target.name, value: e.target.value },
                                index,
                                [isRequired, checkNonNegative]
                              );
                              handleVolumCalc(index);
                            }
                          }}
                        />
                        <CustomInputBox
                          label="Height (CM)"
                          inputType="text"
                          inputMode="numeric"
                          name="height"
                          value={productInputState[index].height || ""}
                          errorMessage={validationErrors?.height}
                          onChange={(e: any) => {
                            if (!isNaN(e.target.value)) {
                              handleProductInputChange(
                                { name: e.target.name, value: e.target.value },
                                index,
                                [isRequired, checkNonNegative]
                              );
                              handleVolumCalc(index);
                            }
                          }}
                        />
                        <CustomInputBox
                          placeholder="Divisor"
                          label="Divisor"
                          inputMode="numeric"
                          isDisabled={true}
                          value={divisor}
                        />
                      </div>
                      <div className="flex col-span-2 lg:col-span-1 w-full gap-6">
                        <CustomInputBox
                          label="Weight (Kg)"
                          inputType="text"
                          inputMode="numeric"
                          name="deadWeight"
                          value={productInputState[index]?.deadWeight || ""}
                          errorMessage={validationErrors?.deadWeight}
                          onChange={(e: any) => {
                            if (!isNaN(e.target.value)) {
                              handleProductInputChange(
                                { name: e.target.name, value: e.target.value },
                                index,
                                [isRequired, checkNonNegative]
                              );
                            }
                          }}
                        />
                        <CustomInputBox
                          placeholder="Volumetric Weight (Kg)"
                          label="Volumetric Weight (Kg)"
                          isDisabled={true}
                          value={
                            productInputState[index]?.volumetricWeight ||
                            volumetricWeight
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-3/4">
                    <span className="text-base">Cost</span>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-4">
                      <div className="w-full flex gap-6">
                        <CustomInputBox
                          label="Product Price"
                          name="unitPrice"
                          inputType="text"
                          inputMode="numeric"
                          errorMessage={validationErrors?.unitPrice}
                          value={productInputState[index].unitPrice || ""}
                          onChange={(e: any) => {
                            if (!isNaN(e.target.value)) {
                              handleProductInputChange(
                                { name: e.target.name, value: e.target.value },
                                index,
                                [isRequired, checkNonNegative]
                              );
                            }
                          }}
                        />
                        <CustomInputBox
                          label="Product tax"
                          name="unitTax"
                          inputType="text"
                          inputMode="numeric"
                          errorMessage={validationErrors?.unitTax}
                          value={productInputState[index].unitTax || ""}
                          onChange={(e: any) => {
                            if (!isNaN(e.target.value)) {
                              handleProductInputChange(
                                { name: e.target.name, value: e.target.value },
                                index,
                                [isRequired, checkNonNegative]
                              );
                            }
                          }}
                        />
                      </div>
                      <div className="w-full"></div>
                    </div>
                  </div>
                  {/* <div className="w-full lg:w-3/4">
                      <span className=""> Product Images </span>
                      <div className="w-[250px] py-4 ">
                        <div className="">
                          <InputWithFileUpload
                            type="file"
                            onChange={(e: any) => uploadedInputFile(e, index)}
                          />
                        </div>
                      </div>
                    </div> */}
                </div>
              </div>
              <></>
            </>
          );
        })}
        {/* {productInputState.length - 1 === index && ( */}
        <>
          <div className="text-gray-400	text-xs	mt-3 lg:hidden">
            <p>Volumetric weight includes dimensions of the product</p>
          </div>

          <div className="inline-flex cursor-pointer mt-2 bg-[#F2F6FF] rounded-[4px] shadow-sm p-2 justify-center items-center ">
            <img src={ButtonIcon} alt="Add Product" width="16px" />

            <button
              className="ml-2 text-[#004EFF] text-sm font-semibold leading-5 font-Open"
              onClick={AddProductInfoData}
            >
              ADD PRODUCT
            </button>
          </div>
        </>
        {/* )} */}
      </div>
      <div>
        {/* <BottomLayout backButtonText="BACK" nextButtonText="NEXT" /> */}
        <BottomLayout callApi={() => addProductInfo()} />
      </div>
    </>
  );
};

export default AddProduct;

// import React, { useState, useRef } from "react";
// // import BackArrow from "../../../../assets/Catalogue/backBTN.svg";
// import AddOrder from "../../../../assets/Catalogue/add_order.svg";
// import ForwardArrowIcon from "../../../../assets/Delivery/forwardArrow.svg";
// import MagicLocationIcon from "../../../../assets/Delivery/magicLocation.svg";
// import ButtonIcon from "../../../../assets/Product/Button.svg";
// import UploadImg from "../../../../assets/Catalogue/upload.svg";
// import CustomButton from "../../../../components/Button";
// import InputBox from "../../../../components/InputBox/index";
// // import CustomButton from "../../../../components/Button";
// import CustomDropDown from "../../../../components/DropDown";
// import FileUploadWithText from "../../../../components/FileUploadWithText/fileUploadWithText";
// import BottomLayout from "../../../../components/Layout/bottomLayout";
// import { Breadcrum } from "../../../../components/Layout/breadcrum";
// // import AddOrder from "../../../../assets/Catalogue/add_order.svg";
// import { POST } from "../../../../utils/webService";
// import { POST_ADD_PRODUCT } from "../../../../utils/ApiUrls";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";

// interface IAddProductProps { }

// const AddProduct: React.FunctionComponent<IAddProductProps> = (props) => {
//   const navigate = useNavigate();

//   const [products, setProducts] = useState<any>({
//     productId: uuidv4(),
//     productName: "",
//     description: "",
//     category: [],
//     tags: [],
//     price: 0,
//     currency: "INR",
//     gst: 0,
//     dimensions: {
//       length: 0,
//       width: 0,
//       height: 0,
//       unit: "",
//     },
//     weight: {
//       deadWeight: 12,
//       deadWeightUnit: "kg",
//       volumetricWeight: 0,
//       volumetricWeightUnit: "kg",
//       catalogueWeight: {
//         from: 0,
//         to: 0,
//         unit: "kg",
//       },
//     },
//     available: true,
//     attributes: {},
//     features: [],
//     images: [],
//     ratings: {
//       average: 0,
//       count: 0,
//     },
//     reviews: [],
//   });
//   const addProduct = async () => {
//     const { data } = await POST(POST_ADD_PRODUCT, products);
//     if (data?.success) {
//       toast.success(data?.message);
//       navigate(-1);
//     } else {
//       toast.error(data?.message);
//     }
//   };
//   return (
//     <div className="h-full">
//       <Breadcrum
//         label="Add Product amit"
//         component={
//           <div className="flex">
//             <div className="mr-4">
//               <CustomButton
//                 icon={AddOrder}
//                 showIcon={true}
//                 text={"UPLOAD"}
//                 className="!p-4"
//                 onClick={() => { }}
//               />
//             </div>
//             <div>
//               <CustomButton
//                 icon={AddOrder}
//                 showIcon={true}
//                 text={"FROM CHANNEL"}
//                 className="!p-4"
//                 onClick={() => { }}
//               />
//             </div>
//           </div>
//         }
//       />

//       <div className="mx-5">
//         <div>
//           <div className="mt-4 pb-[25px]">
//             <h1 className="font-semibold font-Lato leading-7 capitalize text-[#004EFF] text-[22px]">
//               Product
//             </h1>
//           </div>
//           <div className="bg-white rounded-lg overflow-hidden shadow-lg relative w-[768px] h-[98px]">
//             <div className="bg-black text-white p-4 h-1/3 flex items-center gap-x-2">
//               <img src={MagicLocationIcon} alt="Magic Location Icon" />
//               <div className="text-white leading-normal font-Open text-[12px] font-normal">
//                 Magic Address
//               </div>
//             </div>
//             <div className="relative h-[75px] ">
//               <div className="w-full">
//                 <input
//                   type="text"
//                   className="h-[65px] border-black border-[2px] rounded-b-md overflow-hidden"
//                   placeholder="Add description of the product"
//                   onChange={(e) =>
//                     setProducts({ ...products, description: e.target.value })
//                   }
//                 />
//               </div>
//             </div>
//             <div className="absolute right-[2%] top-[72%] transform -translate-y-1/2">
//               <img src={ForwardArrowIcon} alt="Arrow" />
//             </div>
//           </div>

//           <div className="flex flex-col justify-between gap-y-4 mt-6 lg:gap-x-6 lg:grid grid-cols-3">
//             <InputBox
//               label="Product name"
//               value={products.productName}
//               onChange={(e) =>
//                 setProducts({ ...products, productName: e.target.value })
//               }
//             />
//             <InputBox
//               label="Product category"
//               value={products?.category[0] || ""}
//               onChange={(e) => {
//                 setProducts({ ...products, category: [e.target.value] });
//               }}
//             />
//             <InputBox
//               label="Product price"
//               value={products?.price || ""}
//               inputMode="numeric"
//               onChange={(e) =>
//                 setProducts({ ...products, price: +e.target.value })
//               }
//             />
//             <InputBox
//               label="Product tax"
//               value={products?.gst || ""}
//               inputMode="numeric"
//               onChange={(e) =>
//                 setProducts({ ...products, gst: +e.target.value })
//               }
//             />
//             <div className="grid grid-cols-2 gap-x-2 mt-4 lg:mt-0 lg:col-span-2 lg:gap-x-6">
//               <div className="grid grid-cols-2 gap-x-2 lg:gap-x-6">
//                 <CustomDropDown
//                   value={products.dimensions.unit}
//                   onChange={(e) =>
//                     setProducts({
//                       ...products,
//                       dimensions: {
//                         ...products.dimensions,
//                         unit: e.target.value,
//                       },
//                     })
//                   }
//                   options={[
//                     {
//                       label: "",
//                       value: "",
//                     },
//                     {
//                       label: "CM",
//                       value: "CM",
//                     },
//                     {
//                       label: "MM",
//                       value: "MM",
//                     },
//                     {
//                       label: "INCHS",
//                       value: "INCHS",
//                     },
//                   ]}
//                   selectClassName="rounded-md bg-[#FEFEFE]"
//                 />

//                 <InputBox
//                   label="Length"
//                   value={products?.dimensions?.length || ""}
//                   inputMode="numeric"
//                   onChange={(e) =>
//                     setProducts({
//                       ...products,
//                       dimensions: {
//                         ...products.dimensions,
//                         length: +e.target.value,
//                       },
//                     })
//                   }
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-x-2 lg:gap-x-6">
//                 <InputBox
//                   label="Breadth"
//                   value={products?.dimensions?.width || ""}
//                   inputMode="numeric"
//                   onChange={(e) =>
//                     setProducts({
//                       ...products,
//                       dimensions: {
//                         ...products.dimensions,
//                         width: +e.target.value,
//                       },
//                     })
//                   }
//                 />
//                 <InputBox
//                   label="Height"
//                   value={products?.dimensions?.height || ""}
//                   inputMode="numeric"
//                   onChange={(e) =>
//                     setProducts({
//                       ...products,
//                       dimensions: {
//                         ...products.dimensions,
//                         height: +e.target.value,
//                       },
//                     })
//                   }
//                 />
//               </div>
//             </div>
//             <div>
//               <FileUploadWithText
//                 icon={UploadImg}
//                 placeholder="Upload Product Image"
//                 text="UPLOAD"
//               />
//             </div>
//           </div>

//           {/* <div className="flex mt-6 rounded-md p-[8px] bg-[#F2F6FF] w-[174px]">
//             <img
//               src={ButtonIcon}
//               className="ml-[25px]"
//               alt="Add Product"
//               width="16px"
//             />
//             <span
//               className="ml-2 text-[#004EFF] text-[14px] font-semibold leading-5 font-Open"
//               onClick={() => addProduct()}
//             >
//               Add Product
//             </span>
//           </div> */}
//         </div>
//         <div>
//           <BottomLayout backButtonText="BACK" nextButtonText="SAVE" />
//         </div>
//       </div>
//       <BottomLayout callApi={addProduct} />
//     </div>
//   );
// };

// export default AddProduct;
