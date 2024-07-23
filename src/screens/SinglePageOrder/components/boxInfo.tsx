import { useEffect, useState, useRef } from "react";
import editIcon from "../../../assets/Product/Edit.svg";
import deleteIcon from "../../../assets/Product/Delete.svg";
import ProductDetails from "./productDetails";
import ItemIcon from "../../../assets/Product/Item.svg";
import subtractIcon from "../../../assets/gray-subtract-circle.svg";
import AutoGenerateIcon from "../../../assets/Product/autogenerate.svg";
import addIcon from "../../../assets/Product/addCircle.svg";
import CustomDropDown from "../../../components/DropDown";
import { generateUniqueCode } from "../../../utils/utility";

import ProductIcon from "../../../assets/Product/Product.svg";
import EditIcon from "../../../assets/Product/Edit.svg";

import AddButton from "../../../components/Button/addButton";
import ButtonIcon from "../../../assets/Product/Button.svg";
import orderIdGenarateIcon from "../../../assets/generateIcon.svg";
import DeleteIcon from "../../../assets/DeleteIconRedColor.svg";
import InputBox from "../../../components/Input";
import Checkbox from "../../../components/CheckBox";
import CustomInputBox from "../../../components/Input";
import { Environment } from "../../../utils/ApiUrls";
import OneButton from "../../../components/Button/OneButton";

function BoxInfo({
  index,
  data,
  setProductModal,
  order,
  setOrder,
  removeProduct,
  removeBox,
  setEditBoxModal,
  setEditProductModal,
  setIsOpen,
}: any) {
  const [allProducts, setAllProducts]: any = useState([]);
  const [codInfo, setCodInfo]: any = useState({
    orderId: "",
    codInfo: {
      isCod: false,
      collectableAmount: "",
      invoiceValue: "",
    },
  });

  const calculateVolumeWeight = (
    length: number,
    breadth: number,
    height: number
  ): number => {
    const volume = length * breadth * height;
    return volume / 5000;
  };

  const getColorByIndex = (index: any) => {
    const colors = ["#E5EDFF", "#FDF6EA", "#f7e8e8", "#dee1ec", "#f0f0f0"];
    return colors[index % colors.length];
  };

  const setInvoiceValueWithProductPrice = () => {
    setOrder((prevState: any) => {
      const newState = { ...prevState };
      newState.boxInfo[index].codInfo.invoiceValue = newState.boxInfo[
        index
      ]?.products.reduce(
        (acc: any, product: any) => acc + product.unitPrice,
        0
      );
      return newState;
    });
  };

  const addUnit = (productIndex: number) => {
    let obj: any = order;
    const { length, breadth, height } =
      order.boxInfo[index].products[productIndex];

    let initQty = +obj.boxInfo[index].products[productIndex].qty;

    obj.boxInfo[index].products[productIndex].qty++;

    let calacVolu: any = +calculateVolumeWeight(
      length,
      breadth,
      height
    ).toFixed(2);
    obj.boxInfo[index].products[productIndex].volumetricWeight = +(
      calacVolu.toFixed(4) * +obj.boxInfo[index].products[productIndex].qty
    );

    let originalUnitPrice: any = 0;

    if (+obj.boxInfo[index].products[productIndex].qty > 2) {
      originalUnitPrice =
        +obj.boxInfo[index].products[productIndex].unitPrice / initQty;
    } else {
      originalUnitPrice = +obj.boxInfo[index].products[productIndex].unitPrice;
    }

    obj.boxInfo[index].products[productIndex].unitPrice = +(
      originalUnitPrice * +obj.boxInfo[index].products[productIndex].qty
    ).toFixed(2);

    obj.boxInfo[index].products[productIndex].appliedWeight = Math.max(
      obj.boxInfo[index].products[productIndex].volumetricWeight,
      obj.boxInfo[index].products[productIndex].deadWeight
    );

    const boxAppliedWeight = Math.max(
      obj.boxInfo[index]?.volumetricWeight,
      obj.boxInfo[index]?.deadWeight
    );

    const TotalAppliedWeightOfAllProduct = obj.boxInfo[index].products.reduce(
      (acc: any, product: any) => acc + +product.appliedWeight,
      0
    );
    const updateBoxAppliedWeight = Math.max(
      TotalAppliedWeightOfAllProduct,
      boxAppliedWeight
    );

    obj.boxInfo[index].appliedWeight = updateBoxAppliedWeight;

    setOrder({ ...obj });
  };

  const removeUnit = (productIndex: number) => {
    let obj: any = order;
    const { length, breadth, height } =
      order.boxInfo[index].products[productIndex];

    let initQty = obj.boxInfo[index].products[productIndex].qty;

    initQty === 1
      ? (obj.boxInfo[index].products[productIndex].qty = 1)
      : obj.boxInfo[index].products[productIndex].qty--;

    let calacVolu: any = +calculateVolumeWeight(
      length,
      breadth,
      height
    ).toFixed(2);
    obj.boxInfo[index].products[productIndex].volumetricWeight = +(
      calacVolu.toFixed(4) * +obj.boxInfo[index].products[productIndex].qty
    );
    let originalUnitPrice: any = 0;
    if (initQty >= 2) {
      originalUnitPrice =
        +obj.boxInfo[index].products[productIndex].unitPrice / initQty;
    } else {
      originalUnitPrice = +obj.boxInfo[index].products[productIndex].unitPrice;
    }
    obj.boxInfo[index].products[productIndex].unitPrice = +(
      originalUnitPrice * +obj.boxInfo[index].products[productIndex].qty
    ).toFixed(2);

    obj.boxInfo[index].products[productIndex].appliedWeight = Math.max(
      obj.boxInfo[index].products[productIndex].volumetricWeight,
      obj.boxInfo[index].products[productIndex].deadWeight
    );

    const boxAppliedWeight = Math.max(
      obj.boxInfo[index]?.volumetricWeight,
      obj.boxInfo[index]?.deadWeight
    );

    const TotalAppliedWeightOfAllProduct = obj.boxInfo[index].products.reduce(
      (acc: any, product: any) => acc + +product.appliedWeight,
      0
    );
    const updateBoxAppliedWeight = Math.max(
      TotalAppliedWeightOfAllProduct,
      boxAppliedWeight
    );

    obj.boxInfo[index].appliedWeight = updateBoxAppliedWeight;
    setOrder({ ...obj });
  };

  const OnChangeHandler = (e: any) => {
    const { name, value } = e.target;
    if (name === "isCod") {
      setCodInfo((prevState: any) => {
        return {
          ...prevState,
          codInfo: {
            ...prevState.codInfo,
            [name]: value === "COD" ? true : false,
            collectableAmount:
              value === "COD" ? "" : prevState.codInfo.collectableAmount,
          },
        };
      });
    } else {
      setCodInfo((prevState: any) => {
        return {
          ...prevState,
          codInfo: {
            ...prevState.codInfo,
            [name]: value,
          },
        };
      });
    }
  };

  useEffect(() => {
    if (
      codInfo?.codInfo?.isCod ||
      codInfo?.codInfo?.collectableAmount.trim() !== "" ||
      codInfo?.codInfo?.invoiceValue.trim() !== ""
    ) {
      setOrder((prevState: any) => {
        const updatedBoxInfo = [...prevState.boxInfo];
        const updatedCodInfo = {
          ...updatedBoxInfo[index],
          codInfo: {
            invoiceValue: +codInfo?.codInfo?.invoiceValue,
            collectableAmount: codInfo?.codInfo?.isCod
              ? +codInfo?.codInfo?.collectableAmount
              : 0,
            isCod: codInfo?.codInfo?.isCod,
          },
          ewaybillNumber:
            +codInfo?.codInfo?.invoiceValue >= 50000
              ? updatedBoxInfo?.[index]?.ewaybillNumber
              : "",
          transporterNo:
            +codInfo?.codInfo?.invoiceValue >= 50000
              ? updatedBoxInfo?.[index]?.transporterNo
              : "",
          orderId: codInfo?.orderId,
        };
        updatedBoxInfo[index] = { ...updatedCodInfo };
        return { ...prevState, boxInfo: updatedBoxInfo };
      });
    }
  }, [
    codInfo?.codInfo?.isCod,
    codInfo?.codInfo?.collectableAmount,
    codInfo?.codInfo?.invoiceValue,
    codInfo?.orderId,
  ]);

  useEffect(() => {
    setCodInfo((prevState: any) => {
      return {
        ...prevState,
        codInfo: {
          ...prevState.codInfo,
          invoiceValue: `${order?.boxInfo?.[index]?.codInfo?.invoiceValue}`,
        },
      };
    });
  }, [order]);

  useEffect(() => {
    setAllProducts(data.products);
  }, [data.products]);
  return (
    <>
      <div
        className={`px-4 pt-2 pb-4 my-2  rounded`}
        style={{ backgroundColor: getColorByIndex(index) }}
      >
        <div className="gap-y-4">
          <div className="flex justify-start  items-center">
            <div className=" flex w-[100%] flex-col">
              <div className="flex items-center justify-between">
                <div className=" flex justify-start items-center">
                  <div className="text-[22px] my-2 font-bold font-Open">
                    {data?.name}
                  </div>
                  <div className="flex items-center justify-center gap-x-4 mx-5 rounded-lg">
                    <CustomInputBox
                      isRightIcon={true}
                      containerStyle=""
                      rightIcon={orderIdGenarateIcon}
                      labelClassName={`!text-black !bg-[${getColorByIndex(
                        index
                      )}]`}
                      className={`!bg-transparent !w-[180px] !h-[36px] !text-base !text-[12px] !font-semibold`}
                      imageClassName="!h-[20px] !w-[20px] !top-[25%] !right-2"
                      value={codInfo?.orderId}
                      maxLength={12}
                      label="Order ID"
                      onChange={(e: any) => OnChangeHandler(e)}
                      onClick={() => {
                        const orderId = generateUniqueCode(8, 12);
                        setCodInfo((prevState: any) => {
                          return {
                            ...prevState,
                            orderId: orderId,
                          };
                        });
                      }}
                      visibility={true}
                      setVisibility={() => {}}
                      name="orderId"
                      data-cy="auto-generate-order-id"
                    />
                  </div>
                  <div className="flex justify-center">
                    <CustomDropDown
                      heading="Payment Mode"
                      name="isCod"
                      selectClassName={`!cursor-pointer !h-[36px] border `}
                      onChange={OnChangeHandler}
                      value={codInfo?.codInfo?.isCod ? "COD" : "PREPAID"}
                      options={[
                        {
                          label: "COD",
                          value: "COD",
                        },
                        {
                          label: "Prepaid",
                          value: "PREPAID",
                        },
                      ]}
                    />
                  </div>
                </div>
                <div className="flex gap-x-4">
                  <button
                    className=""
                    onClick={() =>
                      setEditBoxModal({
                        isOpen: true,
                        state: { id: index, data: data },
                      })
                    }
                  >
                    <img src={editIcon} alt="" className="w-[22px]" />
                  </button>
                  <button onClick={() => removeBox(index)}>
                    <img src={deleteIcon} alt="" className="w-[22px]" />
                  </button>
                </div>
              </div>
              <div className="flex items-center my-2">
                {data?.length} X {data?.breadth} X {data?.height} cm | V:{" "}
                {+data?.volumetricWeight.toFixed(2)} Kg | D:{" "}
                {+data?.deadWeight.toFixed(2)} Kg | Final Weight :{" "}
                {`${
                  data?.appliedWeight ? +data?.appliedWeight + "Kg" : "0 Kg"
                }`}
              </div>

              <div className="flex gap-x-4 mt-3 ">
                <div className="">
                  <InputBox
                    label="Invoice value"
                    value={codInfo?.codInfo?.invoiceValue}
                    name="invoiceValue"
                    inputType="text"
                    inputMode="numeric"
                    labelClassName={`!text-black  !bg-[${getColorByIndex(
                      index
                    )}]`}
                    className={`!bg-transparent !w-[110px] !h-[36px]`}
                    onChange={(e: any) => {
                      if (!isNaN(e.target.value)) {
                        OnChangeHandler(e);
                      }
                    }}
                  />
                </div>

                {codInfo?.codInfo?.isCod && (
                  <div className="">
                    <InputBox
                      label="Collectable Amount"
                      value={codInfo?.codInfo?.collectableAmount}
                      name="collectableAmount"
                      inputType="text"
                      inputMode="numeric"
                      labelClassName={`!text-black  !bg-[${getColorByIndex(
                        index
                      )}]`}
                      className={`!bg-transparent !w-[150px] !h-[36px]`}
                      isDisabled={codInfo?.isCod}
                      onChange={(e: any) => {
                        if (!isNaN(e.target.value)) {
                          OnChangeHandler(e);
                        }
                      }}
                    />
                  </div>
                )}

                {codInfo?.codInfo?.invoiceValue >= 50000 && (
                  <button
                    className="text-[#004EFF] font-bold font-Open"
                    onClick={() =>
                      setIsOpen({
                        state: { id: index, data: data },
                        isOpen: true,
                      })
                    }
                  >
                    EWAY BILL
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="mt-5 ml-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="text-[18px] font-Open font-bold">
                  Items {"("}
                  {allProducts.length}
                  {")"}
                </div>
                <div className="flex justify-center items-center ml-6">
                  <button
                    className=""
                    onClick={() =>
                      setEditProductModal({
                        isOpen: true,
                        state: { id: index, data: data?.products },
                      })
                    }
                  >
                    <img src={editIcon} alt="" className="w-[20px]" />
                  </button>
                </div>
              </div>
            </div>
            <div
              className={`!transition-all gap-y-2 mx-4 my-1 min-w-[500px] max-w-fit !duration-700 !ease-in-out flex flex-col scroll-smooth overflow-auto rounded-lg ${
                allProducts.length > 0 && " border-x-[#E8E8E8]"
              } shadow-none`}
              data-cy="product-list"
            >
              {allProducts.length > 0 &&
                allProducts?.map((e: any, i: number, arr: any) => {
                  return (
                    <div key={i} data-cy={`product-item-${i}`}>
                      <div
                        className="flex justify-between  gap-x-4 items-center"
                        key={i}
                      >
                        <ProductDetails
                          key={i}
                          image={ItemIcon}
                          appliedWeight={`${e?.appliedWeight.toFixed(2)} Kg`}
                          volumetricWeight={`${e?.volumetricWeight.toFixed(
                            2
                          )} Kg`}
                          unitPrice={`${e?.unitPrice}`}
                          deadWeight={e?.deadWeight.toFixed(2)}
                          productName={e?.name || 0}
                          breadth={e?.breadth || 0}
                          length={e?.length || 0}
                          height={e?.height || 0}
                          dimensionClassName="!font-light"
                          className="!border-none !shadow-none !min-h-[70px]"
                          data-cy={`product-box-${i}`}
                        />
                        <div className="flex items-center p-1 lg:p-2 w-[100px]  gap-2 !mr-2 rounded-lg">
                          <div className="bg-transparent">
                            <img
                              src={subtractIcon}
                              alt=""
                              className="cursor-pointer w-[15px]"
                              onClick={() => {
                                removeUnit(i);
                                setInvoiceValueWithProductPrice();
                              }}
                              data-cy={`remove-unit-${i}`}
                            />
                          </div>
                          <div>
                            <p>{e.qty}</p>
                          </div>
                          <div>
                            <img
                              src={addIcon}
                              className="cursor-pointer"
                              alt=""
                              onClick={() => {
                                addUnit(i);
                                setInvoiceValueWithProductPrice();
                              }}
                              data-cy={`add-unit-${i}`}
                            />
                          </div>

                          <button
                            className={` ml-2 cursor-pointer `}
                            data-cy={`delete-product-${i}`}
                            onClick={() => removeProduct(index, i)}
                          >
                            <img
                              src={DeleteIcon}
                              className={`!h-4 !w-4 `}
                              alt=""
                            />
                          </button>
                        </div>
                      </div>

                      {/* {arr.length === 1
                        ? "hue-rotate-60 opacity-40 !cursor-not-allowed"
                        : ""} */}
                      {/* ${arr.length === 1 ? "fill-gray-600" : ""} */}
                      {/* {allProducts.length - 1 !== i && (
                        <hr data-cy={`hr-${i}`} />
                      )} */}
                    </div>
                  );
                })}
            </div>
            <button className="inline-flex mx-4 mt-2 w-fit cursor-pointer bg-transparant rounded-[4px] p-2 justify-center items-center ">
              <img src={ButtonIcon} alt="Add Product" width="px" />

              <button
                className="ml-2 text-[#004EFF] text-sm !text-[16px] font-semibold leading-5 font-Open"
                onClick={() => setProductModal({ isOpen: true, id: index })}
              >
                ADD PRODUCT
              </button>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default BoxInfo;
