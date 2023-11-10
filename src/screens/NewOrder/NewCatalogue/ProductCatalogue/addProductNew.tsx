import React, { useState, useRef, useEffect } from "react";
import CustomRightModal from "../../../../components/CustomModal/customRightModal";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import ButtonIcon from "../../../../assets/Product/Button.svg";
import DeleteIcon from "../../../../assets/Product/Delete.svg";
import BottomLayout from "../../../../components/Layout/bottomLayout";
import DeleteIconForLg from "../../../../assets/DeleteIconRedColor.svg";
import CustomInputWithDropDown from "../../../../components/CategoriesDropDown/CategoriesDropDown";

import {
  checkNonNegative,
  isGreaterThenValidation,
  isRequired,
} from "../../../../utils/validationRules";
import { CREATE_BULK_PRODUCT } from "../../../../utils/ApiUrls";
import { POST } from "../../../../utils/webService";
import { toast } from "react-toastify";
import { useMediaQuery } from "react-responsive";
import CustomInputBox from "../../../../components/Input";
import ServiceButton from "../../../../components/Button/ServiceButton";

interface IProductFilledProps {
  setProductModal?: any;
  isProductModal?: any;
}
const AddProductPanel: React.FunctionComponent<IProductFilledProps> = (
  props
) => {
  const { isProductModal, setProductModal } = props;

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
    deadWeight: 0,
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
    deadWeight: [checkNonNegative],
  };

  const [productPayload, setProductPayload]: any = useState([]);
  const [productInputState, setProductInputState]: any = useState([
    { ...initialUserData },
  ]);

  useEffect(() => {
    setValidationErrors(null);
  }, [isProductModal]);

  const [volumetricWeight, setVolumetricWeight] = useState<any>(0);
  const [showCombo, setShowCombo] = useState<any>(false);
  const [divisor, setDivisor] = useState<any>(5000);
  //adding all products info
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    const valid = validateOnSubmit();
    if (!valid) return;

    const { data: response } = await POST(CREATE_BULK_PRODUCT, {
      products: productPayload,
    });
    if (response?.success) {
      toast.success(response?.message);
      setIsLoading(false);
      setProductModal(false);
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

  return (
    <>
      <CustomRightModal
        wrapperClassName="rounded overflow-scroll"
        isOpen={isProductModal}
        onClose={() => setProductModal(false)}
        className=" w-full lg:w-[52%] h-screen rounded-l-xl"
      >
        <>
          <div className="font-Lato font-normal text-2xl leading-8 p-6">
            Add Products
          </div>
          <div className="px-5 mb-20 overflow-scroll">
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

                    <div className="grid grid-cols-2 py-4 gap-5">
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
                        label="Product Price"
                        name="unitPrice"
                        inputMode="numeric"
                        errorMessage={validationErrors?.unitPrice}
                        value={productInputState[index].unitPrice || ""}
                        onChange={(e: any) =>
                          handleProductInputChange(
                            {
                              name: e.target.name,
                              value: e.target.value,
                            },
                            index,
                            [isRequired, checkNonNegative]
                          )
                        }
                      />
                      <CustomInputBox
                        label="Product tax"
                        name="unitTax"
                        inputMode="numeric"
                        errorMessage={validationErrors?.unitTax}
                        value={productInputState[index].unitTax || ""}
                        onChange={(e: any) =>
                          handleProductInputChange(
                            {
                              name: e.target.name,
                              value: e.target.value,
                            },
                            index,
                            [isRequired, checkNonNegative]
                          )
                        }
                      />
                      <div className="flex gap-x-3 w-full">
                        <CustomInputBox
                          label="Length (CM)"
                          inputType="number"
                          name="length"
                          errorMessage={validationErrors?.length}
                          value={productInputState[index]?.length}
                          onChange={(e: any) => {
                            console.log("products", e.target.value);
                            handleProductInputChange(
                              {
                                name: e.target.name,
                                value: e?.target?.value,
                              },
                              index,
                              [isRequired, checkNonNegative]
                            );
                            handleVolumCalc(index);
                          }}
                        />

                        <CustomInputBox
                          label="Breadth (CM)"
                          name="breadth"
                          inputType="number"
                          value={productInputState[index].breadth || ""}
                          errorMessage={validationErrors?.breadth}
                          onChange={(e: any) => {
                            handleProductInputChange(
                              {
                                name: e.target.name,
                                value: e.target.value,
                              },
                              index,
                              [isRequired, checkNonNegative]
                            );
                            handleVolumCalc(index);
                          }}
                        />
                        <CustomInputBox
                          label="Height (CM)"
                          inputType="number"
                          name="height"
                          value={productInputState[index].height || ""}
                          errorMessage={validationErrors?.height}
                          onChange={(e: any) => {
                            handleProductInputChange(
                              {
                                name: e.target.name,
                                value: e.target.value,
                              },
                              index,
                              [isRequired, checkNonNegative]
                            );
                            handleVolumCalc(index);
                          }}
                        />
                      </div>
                      <div className="flex gap-x-5">
                        <CustomInputBox
                          placeholder="Volumetric Weight (Kg)"
                          label="Volumetric Weight (Kg)"
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
                        label="Weight (Kg)"
                        inputType="number"
                        name="deadWeight"
                        value={productInputState[index]?.deadWeight || 0}
                        errorMessage={validationErrors?.deadWeight}
                        onChange={(e: any) =>
                          handleProductInputChange(
                            {
                              name: e.target.name,
                              value: e.target.value,
                            },
                            index,
                            [checkNonNegative]
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

                      {/* <div className="grid col-span-2">
                        <InputWithFileUpload
                          type="file"
                          onChange={(e: any) => uploadedInputFile(e, 0)}
                        />
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
          <div
            className="flex justify-end gap-x-5  shadow-lg border-[1px] h-[68px]  bg-[#FFFFFF] px-6 py-4 rounded-tr-[32px] rounded-tl-[32px]    fixed bottom-0 "
            style={{ width: "-webkit-fill-available" }}
          >
            <ServiceButton
              text={"CANCEL"}
              onClick={() => {
                setProductModal(false);
              }}
              className="bg-white text-[#1C1C1C] h-[36px] !py-2 !px-4 "
            />
            <ServiceButton
              text={"SAVE"}
              disabled={!isLoading}
              onClick={() => {
                addProductInfo();
              }}
              className="bg-[#1C1C1C] text-[#FFFFFF] h-[36px] !py-2 !px-4 "
            />
          </div>
        </>
      </CustomRightModal>
    </>
  );
};

export default AddProductPanel;
