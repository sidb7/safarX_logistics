import ProductBox from "./ProductBox";
import ItemIcon from "../../../assets/Product/Item.svg";
import subtractIcon from "../../../assets/Product/subtract-circle.svg";
import addIcon from "../../../assets/Product/addCircle.svg";
import ProductIcon from "../../../assets/Product/Product.svg";
import EditIcon from "../../../assets/Product/Edit.svg";
import { useEffect, useState, useRef } from "react";
import AddButton from "../../../components/Button/addButton";
import ButtonIcon from "../../../assets/Product/Button.svg";
import DeleteIcon from "../../../assets/DeleteIconRedColor.svg";
import Checkbox from "../../../components/CheckBox";
import CustomInputBox from "../../../components/Input";
interface IBoxdetails {
  products?: any;
  selectedBox?: any;
  setProductFinalPayload?: any;
  productFinalPayload?: any;
  boxIndex?: any;
  openPackageDetailModal?: any;
  setBoxIndex?: any;
  handleEditBoxType?: any;
  removePackage?: any;
  setCheckBoxValuePerBox: any;
  orderType?: any;
  isOrderCOD?: any;
  setIsOrderCOD?: any;
}

const BoxDetails = (props: IBoxdetails) => {
  const {
    products,
    selectedBox = {},
    setProductFinalPayload,
    productFinalPayload,
    openPackageDetailModal,
    handleEditBoxType,
    boxIndex,
    removePackage,
    setCheckBoxValuePerBox,
    orderType,
    isOrderCOD,
    setIsOrderCOD,
  } = props;

  const [allProducts, setAllProducts]: any = useState([]);
  useEffect(() => {
    setAllProducts([...products]);
  }, [products]);

  useEffect(() => {
    if (selectedBox?.codInfo?.isCod) {
      selectedBox.codInfo.collectableAmount =
        selectedBox?.codInfo?.invoiceValue;
    }
  }, [selectedBox?.codInfo?.isCod]);

  const calculateVolumeWeight = (
    length: number,
    breadth: number,
    height: number
  ): number => {
    const volume = length * breadth * height;
    return volume / 5000;
  };

  const handleCheckBox = (event: any) => {
    const { value, name } = event;
    setCheckBoxValuePerBox(value, name, boxIndex);
  };

  const handleCollectableAmmount = (event: any) => {
    const { name, value } = event.target;
    if (value > selectedBox?.codInfo?.invoiceValue) {
      setCheckBoxValuePerBox(
        selectedBox?.codInfo?.invoiceValue,
        "codAmount",
        boxIndex
      );
      return;
    }

    if (!isNaN(value)) {
      setCheckBoxValuePerBox(
        value.replace(/[^0-9]+\\.?[0-9]*/g, ""),
        "codAmount",
        boxIndex
      );
    }
  };

  const calcAllTotalProductAppliedWeight: any = () => {
    let totalVolumetricWeight = 0;
    allProducts?.forEach((e: any) => {
      const { qty = 1, appliedWeight } = e;
      totalVolumetricWeight += appliedWeight * +qty;
    });
    return totalVolumetricWeight;
  };

  const percentage = (partialValue: any, totalValue: any) => {
    let percentage = (100 * +partialValue) / +totalValue;
    return percentage > 100 ? 100 : percentage;
  };

  const handleDeleteProduct = (index: any) => {
    if (allProducts.length === 1) {
      return;
    }
    let tempArr = allProducts;
    tempArr.splice(index, 1);
    setAllProducts([...tempArr]);
    setProductFinalPayload([...tempArr], boxIndex);
  };

  const addUnit = (index: number) => {
    let arr = allProducts;
    const { length, breadth, height } = allProducts[index];
    arr[index].qty++;
    let calacVolu: any = +calculateVolumeWeight(length, breadth, height);
    arr[index].volumetricWeight = +(calacVolu.toFixed(4) * +arr[index].qty);
    setAllProducts([...arr]);
    setProductFinalPayload([...arr], boxIndex);
  };

  const removeUnit = (index: number) => {
    let arr = allProducts;
    const { length, breadth, height } = allProducts[index];
    arr[index].qty = +arr[index].qty;
    arr[index].qty === 1 ? (arr[index].qty = 1) : arr[index].qty--;
    let calacVolu: any = +calculateVolumeWeight(length, breadth, height);
    arr[index].volumetricWeight = +(calacVolu.toFixed(4) * +arr[index].qty);
    setAllProducts([...arr]);
    setProductFinalPayload([...arr], boxIndex);
  };

  const calcBillableWeight = () => {
    let billableWeight = Math.max(
      calcAllTotalProductAppliedWeight(),
      +selectedBox.volumetricWeight
    );
    return billableWeight.toFixed(2);
  };

  const calcTotalProducts = (arr: any) => {
    return (
      arr.reduce((accumulator: any, product: any) => {
        const totalProducts = +(+product.qty);
        return accumulator + totalProducts;
      }, 0) || 0
    );
  };

  return (
    <div className="w-[500px]">
      <div className="flex p-3 lg:p-5 gap-x-2">
        <img src={ProductIcon} alt="Package Icon" />
        <h1 className="flex items-baseline gap-x-2 font-Lato text-center text-gray-900 font-normal text-[1.2rem] lg:text-[1.5rem] lg:text-[#1C1C1C] ">
          Box {boxIndex + 1}
          <div className="font-Lato text-lg text-gray-900 font-normal text-[1.2rem] lg:text-[1.5rem] lg:text-[#1C1C1C]">{`(${calcTotalProducts(
            allProducts
          )} Products) `}</div>
        </h1>
      </div>
      <div
        className={`flex flex-col  lg:gap-y-2 rounded-md lg:rounded-lg p-3 lg:p-5`}
        style={{
          boxShadow:
            "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05), 0px 23px 23px 0px rgba(133, 133, 133, 0.04)",
          border: "1px solid #E8E8E8",
        }}
      >
        <div className="p-2 flex items-center ">
          <div className="font-semibold text-base lg:text-lg">
            {selectedBox.name}
          </div>
          <div className="flex px-4 gap-x-2">
            <div
              onClick={() => handleEditBoxType(selectedBox, boxIndex, true)}
              className="cursor-pointer"
            >
              <img src={EditIcon} alt="" />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => removePackage(boxIndex)}
            >
              <img src={DeleteIcon} className="!h-4 !w-4" alt="" />
            </div>
          </div>
        </div>

        <div
          className={`!transition-all !duration-700 !ease-in-out flex flex-col scroll-smooth overflow-auto rounded-lg border border-x-[#E8E8E8] shadow-none hover:shadow-inner`}
        >
          {!(allProducts.length > 0) && (
            <div className="h-full w-full flex justify-center items-center">
              No Products Added
            </div>
          )}
          {allProducts?.map((e: any, index: number, arr: any) => {
            return (
              <div key={index}>
                <div className="flex justify-between items-center " key={index}>
                  <ProductBox
                    key={index}
                    image={ItemIcon}
                    weight={`${e?.appliedWeight} Kg`}
                    productName={e?.name || 0}
                    breadth={e?.breadth || 0}
                    length={e?.length || 0}
                    height={e?.height || 0}
                    dimensionClassName="!font-light"
                    className="!border-none !shadow-none !h-[70px]"
                  />
                  <div className="flex items-center p-1 lg:p-2  gap-2 !mr-2 rounded-lg">
                    <div>
                      <img
                        src={subtractIcon}
                        alt=""
                        className="cursor-pointer"
                        onClick={() => removeUnit(index)}
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
                        onClick={() => addUnit(index)}
                      />
                    </div>

                    <div
                      className={`${
                        arr.length === 1
                          ? "hue-rotate-60 opacity-40 !cursor-not-allowed"
                          : ""
                      } ml-2 cursor-pointer `}
                      onClick={() => handleDeleteProduct(index)}
                    >
                      <img
                        src={DeleteIcon}
                        className={`!h-4 !w-4 ${
                          arr.length === 1 ? "fill-gray-600" : ""
                        } `}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                {allProducts.length - 1 !== index && <hr />}
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center py-1 lg:py-0">
          <AddButton
            text="ADD PRODUCT"
            onClick={() => {
              openPackageDetailModal(boxIndex);
            }}
            showIcon={true}
            icon={ButtonIcon}
            className="rounded bg-white  !shadow-none !m-0 !p-0 "
            textClassName="text-sm  lg:text-base"
            alt="Add Product"
          />
        </div>
        <hr />
        {Object.keys(selectedBox).length > 0 && (
          <>
            <span className="!text-sm lg:!text-base text-slate-600 py-2 lg:py-0">
              {`Products Applied weight is ${calcAllTotalProductAppliedWeight().toFixed(
                2
              )} Kg`}
            </span>
            <div className="relative">
              <div className="h-[6px] bg-[#CBEAC0] mr-16">
                <div
                  className={`h-[6px] ${
                    calcAllTotalProductAppliedWeight() >
                    +selectedBox.appliedWeight
                      ? "bg-[red]"
                      : "bg-[#7CCA62]"
                  } p-0 m-0 transition-all duration-700 ease-in-out`}
                  style={{
                    width: `${percentage(
                      calcAllTotalProductAppliedWeight() || 0,
                      +selectedBox.appliedWeight || 0
                    )}%`,
                  }}
                ></div>
                <div className="absolute -top-[6px] right-0">
                  <p className="text-base font-semibold leading-4 text-[#494949]">
                    {/* {weight is length x width x height (cm) / 5000.} */}
                    {selectedBox.appliedWeight} Kg
                  </p>
                </div>
              </div>
            </div>
            {calcAllTotalProductAppliedWeight() >
            +selectedBox.volumetricWeight ? (
              <>
                <span className="!text-sm lg:!text-base text-slate-600 py-2 lg:py-0  lg:mt-2">
                  {` Your billable weight is `}
                  <span className="font-semibold">{`${calcBillableWeight()} KG.`}</span>
                  <br />
                  <span className="text-[15px] text-slate-600">
                    {`You are ${(
                      calcAllTotalProductAppliedWeight() -
                      +selectedBox.volumetricWeight
                    ).toFixed(2)} KG over your box capacity/volumetric weight `}
                  </span>
                </span>
              </>
            ) : (
              <span className="!text-sm lg:!text-base  text-slate-600 py-2 lg:py-0 lg:mt-2">
                {`Your billable weight is ${calcBillableWeight()} KG.`}
                <br />
                {` You can add more products up to ${(
                  +selectedBox.volumetricWeight -
                  calcAllTotalProductAppliedWeight()
                ).toFixed(2)} KG`}
              </span>
            )}
            <div className="py-2 ">
              <div className="flex flex-wrap lg:flex  gap-2 ">
                <Checkbox
                  label="COD"
                  disabled={orderType !== "B2C"}
                  name="cod"
                  checkboxClassName="hover:transition-all border gap-2 shadow-none border-[1px] border-x-zinc-300 hover:shadow-md"
                  checked={isOrderCOD}
                  onChange={handleCheckBox}
                />
                <Checkbox
                  label="POD"
                  name="pod"
                  checked={selectedBox?.podInfo?.isPod}
                  checkboxClassName="hover:transition-all border gap-2 shadow-none border-[1px] border-x-zinc-300 hover:shadow-md"
                  onChange={handleCheckBox}
                />
                <Checkbox
                  name="insurance"
                  label="Insurance"
                  checkboxClassName="hover:transition-all border gap-2 shadow-none border-[1px] border-x-zinc-300 hover:shadow-md"
                  onChange={handleCheckBox}
                  checked={selectedBox?.insurance?.isInsured}
                />
                <Checkbox
                  name="fragile"
                  checkboxClassName="hover:transition-all border gap-2 shadow-none border-[1px] border-x-zinc-300 hover:shadow-md"
                  label="Fragile?"
                  checked={selectedBox?.isFragile}
                  onChange={handleCheckBox}
                />
              </div>
              {/* <div
                className={`transition-all ease-in-out flex gap-4 ${
                  selectedBox?.codInfo?.isCod
                    ? "h-14 pt-5 opacity-100 "
                    : "h-0 pt-0 opacity-0 "
                } `}
              > */}
              <div className="flex flex-col lg:flex-row transition-all pt-5 gap-4 !w-full">
                <div className="!w-full">
                  <CustomInputBox
                    label="Invoice Value"
                    isDisabled={true}
                    value={selectedBox?.codInfo?.invoiceValue}
                  />
                </div>
                <div
                  className={`transition-all ease-in-out ${
                    selectedBox?.codInfo?.isCod
                      ? "w-full flex opacity-100 h-12  lg:m-0"
                      : "w-0 opacity-0 h-0 mt-0"
                  }`}
                >
                  <CustomInputBox
                    label={"COD Amount"}
                    isDisabled={!selectedBox?.codInfo?.isCod}
                    value={selectedBox?.codInfo?.collectableAmount}
                    onChange={handleCollectableAmmount}
                  />
                </div>
              </div>
              {/* </div> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default BoxDetails;
