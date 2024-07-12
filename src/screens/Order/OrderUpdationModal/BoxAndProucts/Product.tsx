import React, { useState, useEffect } from "react";
import UpwardArrow from "../../../../assets/AccordionUp.svg";
import DownwardArrow from "../../../../assets/downwardArrow.svg";
import CustomInputBox from "../../../../components/Input";
import CustomDropDown from "../../../../components/DropDown";
import ItemIcon from "../../../../assets/Product/Item.svg";

const Product = ({
  completeData,
  index,
  onChildClick,
  setUpdatedData,
  updatedData,
  setPlaceOrderButton,
  enabled,
}: any) => {
  const packageIndex = index;
  const boxInfoUpdate = updatedData?.boxInfo;
  const productsInfo = boxInfoUpdate?.[index]?.products;

  const [productsData, setProductsData] = useState<any>([]);
  const [openProductIndex, setOpenProductIndex] = useState<number | null>(null);
  const [productErrors, setProductErrors] = useState<{
    [key: number]: { [field: string]: string };
  }>({});

  const measureUnits = [
    {
      label: "Cm",
      value: "Cm",
    },
  ];

  const toggleProductAccordian = (index: number) => {
    setOpenProductIndex(openProductIndex === index ? null : index);
  };

  const handleInputChange = (index: number, field: string, value: any) => {
    setPlaceOrderButton(false);
    const updatedProducts = [...productsInfo];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]: value,
    };
    // setProductsData(updatedProducts);

    setUpdatedData((prevState: any) => ({
      ...prevState,
      boxInfo: prevState.boxInfo.map((item: any, index: number) =>
        index === packageIndex ? { ...item, products: updatedProducts } : item
      ),
    }));
    // Validate the current product
    const deadWeight = updatedProducts[index]?.deadWeight;
    const name = updatedProducts[index]?.name;

    const errors: { [field: string]: string } = {};
    if (deadWeight == 0 || !deadWeight) {
      errors.deadWeight = "Field is required";
    }
    if (!name) {
      errors.name = "Field is required";
    }

    setProductErrors((prevErrors) => ({
      ...prevErrors,
      [index]: errors,
    }));

    // Determine if there are any errors
    const hasErrors = Object.values(errors).some((error) => error);
    onChildClick(packageIndex, hasErrors);
  };

  useEffect(() => {
    const initialErrors: { [key: number]: { [field: string]: string } } = {};

    productsInfo?.forEach((product: any, index: number) => {
      const errors: { [field: string]: string } = {};
      if (product?.name === "" || !product?.name) {
        errors.name = "Field is required";
      }
      if (product?.deadWeight == 0 || !product?.deadWeight) {
        errors.deadWeight = "Field is required";
      }
      if (Object.keys(errors).length > 0) {
        initialErrors[index] = errors;
      }
    });

    setProductErrors(initialErrors);
  }, [productsInfo]);

  return (
    <div>
      {productsInfo?.map((item: any, index: number) => (
        <div className="my-2" key={index}>
          <div className="w-full border rounded-lg border-[#E8E8E8]">
            <div className="bg-gray-50">
              <div
                className={`border-[1.5px] ${
                  productErrors[index] &&
                  Object.keys(productErrors[index]).length
                    ? "border-[red]"
                    : "border-[#E8E8E8]"
                } flex justify-between items-center px-4 py-2 rounded-md`}
                onClick={() => toggleProductAccordian(index)}
              >
                <div className="flex items-center gap-x-4">
                  <img src={ItemIcon} alt="" className="w-10 h-10" />
                  <p className="">{item?.name}</p>
                </div>
                <div>
                  <img
                    src={
                      openProductIndex === index ? UpwardArrow : DownwardArrow
                    }
                    alt=""
                  />
                </div>
              </div>
            </div>
            {openProductIndex === index && (
              <div className="flex flex-col py-4 gap-y-4 border-r border-l border-b border-[#E8E8E8] rounded-lg">
                <div className="grid grid-cols-1 px-4">
                  <div>
                    <CustomInputBox
                      label="Product Name"
                      value={item.name}
                      isDisabled={!enabled ? true : false}
                      onChange={(e) =>
                        handleInputChange(index, "name", e.target.value)
                      }
                    />
                    {productErrors[index]?.name && (
                      <p className="text-red-500 text-sm">
                        {productErrors[index].name}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-3 px-4">
                  <div>
                    <CustomInputBox
                      label="Dead weight"
                      value={item.deadWeight}
                      isDisabled={!enabled ? true : false}
                      inputType="number"
                      onChange={(e) =>
                        handleInputChange(index, "deadWeight", e.target.value)
                      }
                    />
                    {productErrors[index]?.deadWeight && (
                      <p className="text-red-500 text-sm">
                        {productErrors[index].deadWeight}
                      </p>
                    )}
                  </div>
                  <div>
                    <CustomInputBox
                      label="Volumetric weight"
                      // value={item.volumetricWeight}
                      value={(
                        (item?.length * item?.breadth * item?.height) /
                        5000
                      ).toFixed(2)}
                      isDisabled={!enabled ? true : false}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "volumetricWeight",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-3 px-4">
                  <div>
                    <CustomDropDown
                      value={item.unit}
                      options={measureUnits}
                      onChange={(e) =>
                        handleInputChange(index, "unit", e.target.value)
                      }
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-x-2">
                    <div>
                      <CustomInputBox
                        label="l"
                        inputType="number"
                        value={item.length}
                        isDisabled={!enabled ? true : false}
                        onChange={(e) =>
                          handleInputChange(index, "length", e.target.value)
                        }
                      />
                      {productErrors[index]?.length && (
                        <p className="text-red-500">
                          {productErrors[index].length}
                        </p>
                      )}
                    </div>
                    <div>
                      <CustomInputBox
                        label="b"
                        inputType="number"
                        value={item.breadth}
                        isDisabled={!enabled ? true : false}
                        onChange={(e) =>
                          handleInputChange(index, "breadth", e.target.value)
                        }
                      />
                      {productErrors[index]?.breadth && (
                        <p className="text-red-500">
                          {productErrors[index].breadth}
                        </p>
                      )}
                    </div>
                    <div>
                      <CustomInputBox
                        label="h"
                        inputType="number"
                        value={item.height}
                        isDisabled={!enabled ? true : false}
                        onChange={(e) =>
                          handleInputChange(index, "height", e.target.value)
                        }
                      />
                      {productErrors[index]?.height && (
                        <p className="text-red-500">
                          {productErrors[index].height}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
