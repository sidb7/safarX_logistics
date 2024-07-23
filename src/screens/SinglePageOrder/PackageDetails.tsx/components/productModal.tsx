import React, { useEffect, useState } from "react";
import packegeIcon from "../../../../assets/Delivery Icon.svg";
import CustomDropDown from "../../../../components/DropDown";
import InputBox from "../../../../components/Input";
import SampleProduct from "../../../../assets/SampleProduct.svg";
import CloseIcon from "../../../../assets/CloseIcon.svg";
import ItemIcon from "../../../../assets/Product/Item.svg";
import DownArrowIcon from "../../../../assets/Filter/downArrow.svg";
import BoxIcon from "../../../../assets/layer.svg";
import VanIcon from "../../../../assets/vanWithoutBG.svg";
import InfoCircle from "../../../../assets/info-circle.svg";
import DeleteGif from "../../../../assets/common/DeleteGif.gif";
import { capitalizeFirstLetter } from "../../../../utils/utility";
import CustomInputWithDropDown from "../../../../components/CategoriesDropDown/CategoriesDropDown";
import CustomSearchDropDown from "../../components/CustomSearchDropDown";
import { GET_PRODUCT_URL, GET_SELLER_BOX } from "../../../../utils/ApiUrls";
import ServiceButton from "../../../../components/Button/ServiceButton";
import { includes } from "lodash";
import SearchDropDown from "../../components/searchDropDown";

function ProductModal({ onClose, setOrder, index }: any) {
  const [boxInputData, setBoxInputData]: any = useState({
    name: "",
    category: "",
    sku: "",
    qty: 1,
    unitPrice: "",
    unitTax: "",
    weightUnit: "kg",
    deadWeight: "",
    length: "",
    breadth: "",
    height: "",
    measureUnit: "cm",
  });

  const productValidation = () => {
    if (
      boxInputData.name.trim() === "" ||
      boxInputData.unitPrice === 0 ||
      typeof boxInputData.unitPrice !== "number" ||
      boxInputData.deadWeight === 0 ||
      typeof boxInputData.deadWeight !== "number" ||
      boxInputData.length === 0 ||
      typeof boxInputData.length !== "number" ||
      boxInputData.breadth === 0 ||
      typeof boxInputData.breadth !== "number" ||
      boxInputData.height === 0 ||
      typeof boxInputData.height !== "number"
    ) {
      return true;
    }
    return false;
  };

  const onChangeHandler = (e: any) => {
    setBoxInputData((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const calculateVolumeWeight = (
    length: number,
    breadth: number,
    height: number
  ): number => {
    const volume = length * breadth * height;
    return volume / 5000;
  };

  const addProductToBox: any = (boxIndex: any, newProduct: any) => {
    const { length, breadth, height, deadWeight, unitPrice } = boxInputData;
    const parsedLength = +length;
    const parsedBreadth = +breadth;
    const parsedHeight = +height;
    const parsedDeadWeight = +deadWeight;
    const parsedUnitPrice = +unitPrice;
    const volumetricWeight = +calculateVolumeWeight(
      parsedLength,
      parsedBreadth,
      parsedHeight
    ).toFixed(2);
    const appliedWeight = Math.max(parsedDeadWeight, volumetricWeight);

    setOrder((prevOrder: any) => {
      const updatedBoxInfo = [...prevOrder.boxInfo];
      const box = updatedBoxInfo[boxIndex];

      const updatedProducts = [
        ...box.products,
        {
          ...newProduct,
          length: parsedLength,
          breadth: parsedBreadth,
          height: parsedHeight,
          deadWeight: parsedDeadWeight,
          unitPrice: parsedUnitPrice,
          volumetricWeight,
          appliedWeight,
        },
      ];

      const TotalAppliedWeightOfAllProduct = updatedProducts.reduce(
        (acc: any, product: any) => acc + +product.appliedWeight,
        0
      );

      const boxAppliedWeight = Math.max(
        TotalAppliedWeightOfAllProduct,
        box?.appliedWeight
      );

      const updatedInvoiceValue = updatedProducts.reduce(
        (acc: any, product: any) => acc + +product.unitPrice,
        0
      );

      const updatedAppliedWeight = boxAppliedWeight;

      updatedBoxInfo[boxIndex] = {
        ...box,
        products: updatedProducts,
        codInfo: {
          ...box.codInfo,
          invoiceValue: updatedInvoiceValue,
        },
        appliedWeight: updatedAppliedWeight,
      };

      return {
        ...prevOrder,
        boxInfo: updatedBoxInfo,
      };
    });

    onClose(false);
  };

  return (
    <>
      <div className="h-[100vh]">
        <div className="border-b flex justify-between p-3 items-center">
          <div className="flex justify-center items-center">
            <div>
              <img src={packegeIcon} alt="" />
            </div>
            <span className="text-[18px] ml-2 font-bold font-Open">
              Add Product
            </span>
          </div>
          <button onClick={() => onClose(false)}>
            <img src={CloseIcon} alt="" />
          </button>
        </div>
        <div>
          <div>
            <div className="flex min-w-[90%] rounded-br rounded-bl">
              <div
                className="items-center flex flex-col gap-y-[1rem] justify-between my-5 w-[100%]"
                style={{
                  boxShadow:
                    "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
                }}
              >
                <div className="flex flex-col gap-y-4 w-[100%] px-[1rem]">
                  <div>
                    <SearchDropDown
                      className={`border`}
                      apiUrl={GET_PRODUCT_URL}
                      label="Search Product"
                      setFunc={setBoxInputData}
                      identifier="PRODUCT"
                    />
                  </div>

                  <div>
                    <InputBox
                      label="Product Name"
                      value={boxInputData?.name}
                      name="name"
                      inputType="text"
                      onChange={(e: any) => onChangeHandler(e)}
                      //   inputError={inputError}
                    />
                  </div>

                  <div>
                    <CustomInputWithDropDown
                      value={boxInputData?.category}
                      initValue={boxInputData?.name}
                      onChange={(e: any) => {
                        setBoxInputData((prevState: any) => ({
                          ...prevState,
                          category: e,
                        }));
                      }}
                    />
                  </div>

                  <div>
                    <InputBox
                      label="Price"
                      value={boxInputData?.unitPrice}
                      name="unitPrice"
                      inputType="text"
                      onChange={(e: any) => {
                        if (!isNaN(e.target.value)) {
                          onChangeHandler(e);
                        }
                      }}
                      //   inputError={inputError}
                    />
                  </div>

                  <div>
                    <InputBox
                      label="Dead Weight (Kg)"
                      value={boxInputData?.deadWeight}
                      name="deadWeight"
                      inputType="text"
                      inputMode="numeric"
                      onChange={(e: any) => {
                        if (!isNaN(e.target.value)) {
                          onChangeHandler(e);
                        }
                      }}
                      //   inputError={inputError}
                    />
                  </div>
                </div>
                <div className="flex justify-between w-[100%] gap-x-[2rem] px-[1rem]">
                  <div className="w-[50%]">
                    <CustomDropDown
                      onChange={() => {}}
                      options={[
                        {
                          label: boxInputData?.measureUnit,
                          value: boxInputData?.measureUnit,
                        },
                      ]}
                    />
                  </div>
                  <div className="flex w-[50%] gap-x-4">
                    <InputBox
                      label="L"
                      inputType="text"
                      inputMode="numeric"
                      name="length"
                      value={boxInputData?.length}
                      onChange={(e: any) => {
                        if (!isNaN(e.target.value)) {
                          onChangeHandler(e);
                        }
                      }}
                      // inputError={inputError}
                    />
                    <InputBox
                      label="B"
                      value={boxInputData?.breadth}
                      name="breadth"
                      inputType="text"
                      inputMode="numeric"
                      onChange={(e: any) => {
                        if (!isNaN(e.target.value)) {
                          onChangeHandler(e);
                        }
                      }}
                      // inputError={inputError}
                    />
                    <InputBox
                      label="H"
                      value={boxInputData?.height}
                      name="height"
                      inputType="text"
                      inputMode="numeric"
                      onChange={(e: any) => {
                        if (!isNaN(e.target.value)) {
                          onChangeHandler(e);
                        }
                      }}
                      // inputError={inputError}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex justify-end gap-x-5  shadow-lg border-[1px] h-[68px]  bg-[#FFFFFF] px-6 py-4 rounded-tr-[32px] rounded-tl-[32px]    fixed bottom-0 "
        style={{ width: "-webkit-fill-available" }}
      >
        <ServiceButton
          text={"SAVE"}
          onClick={() => addProductToBox(index, boxInputData)}
          disabled={productValidation()}
          className={` bg-[#1C1C1C] text-[#FFFFFF] h-[36px] lg:!py-2 lg:!px-4 disabled:bg-[#E8E8E8] disabled:text-[#BBB] disabled:border-none`}
        />
      </div>
    </>
  );
}

export default ProductModal;
