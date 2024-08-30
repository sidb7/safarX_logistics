import { useEffect, useState, useRef } from "react";
import editIcon from "../../../assets/Product/Edit.svg";
import deleteIcon from "../../../assets/Product/Delete.svg";
import ProductDetails from "./productDetails";
import ItemIcon from "../../../assets/Product/Item.svg";
import subtractIcon from "../../../assets/gray-subtract-circle.svg";
import AutoGenerateIcon from "../../../assets/Product/autogenerate.svg";
import addIcon from "../../../assets/Product/addCircle.svg";
import CustomDropDown from "../../../components/DropDown";
import {
  capitalizeFirstLetter,
  generateUniqueCode,
} from "../../../utils/utility";

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
  setSortServiciblity,
  showDownloadLebal,
  setHighLightField,
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

  const colors = ["#E5EDFF", "#FDF6EA", "#f7e8e8", "#dee1ec", "#f0f0f0"];
  const getColorByIndex = (index: any) => {
    return colors[index];
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

      newState.boxInfo[index].codInfo.collectableAmount = newState.boxInfo[
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

    let originalUnitPrice: any = 0;

    let baseProductAppliedWeight: any = Math.max(
      +obj.boxInfo[index].products[productIndex].volumetricWeight,
      +obj.boxInfo[index].products[productIndex].deadWeight
    );

    if (+obj.boxInfo[index].products[productIndex].qty > 2) {
      originalUnitPrice =
        +obj.boxInfo[index].products[productIndex].unitPrice / initQty;
    } else {
      originalUnitPrice = +obj.boxInfo[index].products[productIndex].unitPrice;
    }

    obj.boxInfo[index].products[productIndex].unitPrice = +(
      originalUnitPrice * +obj.boxInfo[index].products[productIndex].qty
    ).toFixed(2);

    obj.boxInfo[index].products[productIndex].appliedWeight =
      baseProductAppliedWeight * +obj.boxInfo[index].products[productIndex].qty;

    const boxBaseAppliedWeight = Math.max(
      obj.boxInfo[index]?.volumetricWeight,
      obj.boxInfo[index]?.deadWeight
    );

    const TotalAppliedWeightOfAllProduct = obj.boxInfo[index].products.reduce(
      (acc: any, product: any) => acc + +product.appliedWeight,
      0
    );
    const updateBoxAppliedWeight = Math.max(
      TotalAppliedWeightOfAllProduct,
      boxBaseAppliedWeight
    );
    obj.boxInfo[index].appliedWeight = updateBoxAppliedWeight;

    setOrder({ ...obj });
    setSortServiciblity("");
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

    let originalUnitPrice: any = 0;

    let baseProductAppliedWeight: any = Math.max(
      +obj.boxInfo[index].products[productIndex].volumetricWeight,
      +obj.boxInfo[index].products[productIndex].deadWeight
    );

    if (initQty >= 2) {
      originalUnitPrice =
        +obj.boxInfo[index].products[productIndex].unitPrice / initQty;
    } else {
      originalUnitPrice = +obj.boxInfo[index].products[productIndex].unitPrice;
    }

    obj.boxInfo[index].products[productIndex].unitPrice = +(
      originalUnitPrice * +obj.boxInfo[index].products[productIndex].qty
    ).toFixed(2);

    obj.boxInfo[index].products[productIndex].appliedWeight =
      baseProductAppliedWeight * +obj.boxInfo[index].products[productIndex].qty;

    const boxBaseAppliedWeight = Math.max(
      obj.boxInfo[index]?.volumetricWeight,
      obj.boxInfo[index]?.deadWeight
    );

    const TotalAppliedWeightOfAllProduct = obj.boxInfo[index].products.reduce(
      (acc: any, product: any) => acc + +product.appliedWeight,
      0
    );
    const updateBoxAppliedWeight = Math.max(
      TotalAppliedWeightOfAllProduct,
      boxBaseAppliedWeight
    );
    obj.boxInfo[index].appliedWeight = updateBoxAppliedWeight;

    setOrder({ ...obj });
    setSortServiciblity("");
  };

  const OnChangeHandler = (e: any) => {
    const { name, value } = e.target;
    setOrder((prevState: any) => {
      const updatedBoxInfo = [...prevState.boxInfo];
      updatedBoxInfo[index].codInfo[name] = value;
      return {
        ...prevState,
        boxInfo: updatedBoxInfo,
      };
    });
    setSortServiciblity("");
  };

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
        className={`px-4 pt-2 pb-4 my-2 border rounded-lg`}
        style={{ backgroundColor: colors[index % colors.length] }}
      >
        <div className="gap-y-4">
          <div className="flex justify-start  items-center">
            <div className=" flex w-[100%] flex-col">
              <div className="flex items-center justify-between">
                <div className=" flex justify-start items-center">
                  <div className="text-[18px] my-2 font-bold font-Open">
                    {capitalizeFirstLetter(data?.name)}
                  </div>
                </div>
                {!showDownloadLebal && (
                  <div className="flex gap-x-4">
                    <button
                      className=""
                      onClick={() => {
                        setEditBoxModal({
                          isOpen: true,
                          state: { id: index, data: data },
                        });
                        setSortServiciblity("");
                        setHighLightField({
                          addressDetails: false,
                          packageDetails: true,
                          shippingDetails: false,
                          orderDetails: false,
                          pickupTimeDetails: false,
                        });
                      }}
                    >
                      <img src={editIcon} alt="" className="w-[22px]" />
                    </button>
                    <button
                      onClick={() => {
                        removeBox(index);
                        setHighLightField({
                          addressDetails: false,
                          packageDetails: true,
                          shippingDetails: false,
                          orderDetails: false,
                          pickupTimeDetails: false,
                        });
                      }}
                    >
                      <img src={deleteIcon} alt="" className="w-[22px]" />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex text-[16px] items-center ">
                {data?.length} X {data?.breadth} X {data?.height} cm | V:{" "}
                {+data?.volumetricWeight.toFixed(2)} Kg | D:{" "}
                {+data?.deadWeight.toFixed(2)} Kg | Final Weight :{" "}
                {`${
                  data?.appliedWeight
                    ? +data?.appliedWeight.toFixed(2) + "Kg"
                    : "0 Kg"
                }`}
              </div>

              <div className="flex gap-x-4 mt-5">
                <div className="">
                  <InputBox
                    label="Invoice value"
                    value={data?.codInfo?.invoiceValue}
                    name="invoiceValue"
                    inputType="text"
                    inputMode="numeric"
                    isDisabled={true}
                    labelClassName={`!text-black !bg-[${
                      colors[index % colors.length]
                    }]`}
                    className={`!bg-transparent !w-[110px] !h-[36px]`}
                    onChange={(e: any) => {
                      if (!isNaN(e.target.value)) {
                        OnChangeHandler(e);
                      }
                      setHighLightField({
                        addressDetails: false,
                        packageDetails: true,
                        shippingDetails: false,
                        orderDetails: false,
                        pickupTimeDetails: false,
                      });
                    }}
                  />
                </div>

                {data?.codInfo?.isCod && (
                  <div className="">
                    <InputBox
                      label="Collectable Amount"
                      value={data?.codInfo?.collectableAmount}
                      name="collectableAmount"
                      inputType="text"
                      inputMode="numeric"
                      labelClassName={`!text-black  !bg-[${
                        colors[index % colors.length]
                      }]`}
                      className={`!bg-transparent !w-[150px] !h-[36px]`}
                      onChange={(e: any) => {
                        if (!isNaN(e.target.value)) {
                          OnChangeHandler(e);
                        }
                        setHighLightField({
                          addressDetails: false,
                          packageDetails: true,
                          shippingDetails: false,
                          orderDetails: false,
                          pickupTimeDetails: false,
                        });
                      }}
                    />
                  </div>
                )}

                {codInfo?.codInfo?.invoiceValue >= 50000 &&
                  order?.orderType === "B2C" && (
                    <button
                      className="text-[#004EFF] font-bold font-Open"
                      onClick={() => {
                        setIsOpen({
                          state: { id: index, data: data },
                          isOpen: true,
                        });
                        setHighLightField({
                          addressDetails: false,
                          packageDetails: true,
                          shippingDetails: false,
                          orderDetails: false,
                          pickupTimeDetails: false,
                        });
                      }}
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
                {allProducts.length > 0 && !showDownloadLebal && (
                  <div className="flex justify-center items-center ml-6">
                    <button
                      className=""
                      onClick={() => {
                        setEditProductModal({
                          isOpen: true,
                          state: { id: index, data: data?.products },
                        });
                        setSortServiciblity("");
                        setHighLightField({
                          addressDetails: false,
                          packageDetails: true,
                          shippingDetails: false,
                          orderDetails: false,
                          pickupTimeDetails: false,
                        });
                      }}
                    >
                      <img src={editIcon} alt="" className="w-[20px]" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div
              className={`!transition-all gap-y-1 mx-4 my-1 min-w-[500px] max-w-fit !duration-700 !ease-in-out flex flex-col scroll-smooth overflow-auto rounded-lg ${
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
                          <button
                            className="bg-transparent"
                            disabled={showDownloadLebal}
                          >
                            <img
                              src={subtractIcon}
                              alt=""
                              className="cursor-pointer w-[15px]"
                              onClick={() => {
                                removeUnit(i);
                                setInvoiceValueWithProductPrice();
                                setHighLightField({
                                  addressDetails: false,
                                  packageDetails: true,
                                  shippingDetails: false,
                                  orderDetails: false,
                                  pickupTimeDetails: false,
                                });
                              }}
                              data-cy={`remove-unit-${i}`}
                            />
                          </button>

                          <div>
                            <p>{e.qty}</p>
                          </div>

                          <button disabled={showDownloadLebal}>
                            <img
                              src={addIcon}
                              className="cursor-pointer"
                              alt=""
                              onClick={() => {
                                addUnit(i);
                                setInvoiceValueWithProductPrice();
                                setHighLightField({
                                  addressDetails: false,
                                  packageDetails: true,
                                  shippingDetails: false,
                                  orderDetails: false,
                                  pickupTimeDetails: false,
                                });
                              }}
                              data-cy={`add-unit-${i}`}
                            />
                          </button>

                          <button
                            className={` ml-2 ${
                              showDownloadLebal
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            } `}
                            data-cy={`delete-product-${i}`}
                            onClick={() => {
                              removeProduct(index, i);
                              setHighLightField({
                                addressDetails: false,
                                packageDetails: true,
                                shippingDetails: false,
                                orderDetails: false,
                                pickupTimeDetails: false,
                              });
                            }}
                            disabled={showDownloadLebal}
                          >
                            <img
                              src={DeleteIcon}
                              className={`!h-4 !w-4 `}
                              alt=""
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            {!showDownloadLebal && (
              <button className="inline-flex mx-4 mt-2 w-fit cursor-pointer bg-transparant rounded-[4px] p-2 justify-center items-center ">
                <img src={ButtonIcon} alt="Add Product" width="px" />

                <button
                  className="ml-2 text-[#004EFF] text-sm !text-[16px] font-semibold leading-5 font-Open"
                  onClick={() => {
                    setProductModal({ isOpen: true, id: index });
                    setSortServiciblity("");
                    setHighLightField({
                      addressDetails: false,
                      packageDetails: true,
                      shippingDetails: false,
                      orderDetails: false,
                      pickupTimeDetails: false,
                    });
                  }}
                >
                  ADD PRODUCT
                </button>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default BoxInfo;
