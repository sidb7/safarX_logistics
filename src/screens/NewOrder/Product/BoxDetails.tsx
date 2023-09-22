import plusIcon from "../../../assets/Product/plusIcon.svg";
import upwardArrow from "../../../assets/Product/arrow-up.png";
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
  } = props;

  const [allProducts, setAllProducts]: any = useState([]);

  const boxDetails: any = useRef(null);

  useEffect(() => {
    setAllProducts([...products]);
  }, [products]);

  const calculateVolumeWeight = (
    length: number,
    breadth: number,
    height: number
  ): number => {
    const volume = length * breadth * height;
    return volume / 5000;
  };

  const calcAllTotalProductWeight: any = () => {
    let totalWeight = 0;
    allProducts?.forEach((e: any) => {
      const { deadWeight } = e;
      totalWeight += +deadWeight * +e.qty || 0;
    });
    return totalWeight;
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
    let billableWeight = calcAllTotalProductWeight();
    return (
      billableWeight > +selectedBox.volumetricWeight
        ? calcAllTotalProductWeight()
        : +selectedBox.volumetricWeight
    ).toFixed(2);
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
      <div className="flex p-5 gap-x-2">
        <img src={ProductIcon} alt="Package Icon" />
        <h1 className="flex items-baseline gap-x-2 font-semibold font-Lato text-center text-gray-900 lg:font-normal text-[1.5rem] lg:text-[#1C1C1C] ">
          Box {boxIndex + 1}
          <div className="font-semibold font-Lato text-lg text-gray-900 lg:font-normal text-[1.5rem] lg:text-[#1C1C1C]">{`(${calcTotalProducts(
            allProducts
          )} Products) `}</div>
        </h1>
      </div>
      <div
        className={`flex flex-col h-[${
          allProducts.length * 80 + 270
        }px] lg:gap-y-2 lg:rounded-lg p-5`}
        style={{
          boxShadow:
            "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05), 0px 23px 23px 0px rgba(133, 133, 133, 0.04)",
          border: "1px solid #E8E8E8",
        }}
      >
        <div className="p-2 flex items-center ">
          <div className="font-semibold text-lg">{selectedBox.name}</div>
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

        <div className="h-full overflow-auto rounded-lg">
          {!(allProducts.length > 0) && (
            <div className="h-full w-full flex justify-center items-center">
              No Products Added
            </div>
          )}
          {allProducts?.map((e: any, index: number) => {
            return (
              <div key={index}>
                <div className="flex justify-between items-center " key={index}>
                  <ProductBox
                    key={index}
                    image={ItemIcon}
                    weight={`${e?.deadWeight} Kg`}
                    productName={e?.name || 0}
                    breadth={e?.breadth || 0}
                    length={e?.length || 0}
                    height={e?.height || 0}
                    dimensionClassName="!font-light"
                    className="!border-none !shadow-none !h-[70px]"
                  />
                  <div className="flex items-center p-2  gap-2  rounded-lg">
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
                        alt=""
                        className="cursor-pointer"
                        onClick={() => addUnit(index)}
                      />
                    </div>
                    <div
                      className="ml-2 cursor-pointer"
                      onClick={() => handleDeleteProduct(index)}
                    >
                      <img src={DeleteIcon} className="!h-4 !w-4" alt="" />
                    </div>
                  </div>
                </div>
                {allProducts.length - 1 !== index && <hr />}
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center mb-2">
          <AddButton
            text="ADD PRODUCT"
            onClick={() => {
              openPackageDetailModal(boxIndex);
            }}
            showIcon={true}
            icon={ButtonIcon}
            className="rounded bg-white !shadow-none !m-0 !p-0"
            alt="Add Product"
          />
        </div>
        <hr />
        {Object.keys(selectedBox).length > 0 ? (
          <>
            <span className="text-base text-slate-600 mt-2 pl-4">
              Products dead weight is {calcAllTotalProductWeight().toFixed(2)}{" "}
              Kg
            </span>
            <div className="relative">
              <div className="h-[6px] bg-[#CBEAC0] mt-2 ml- mr-16">
                <div
                  className={`h-[6px] ${
                    calcAllTotalProductWeight() > +selectedBox.volumetricWeight
                      ? "bg-[red]"
                      : "bg-[#7CCA62]"
                  } p-0 m-0 transition-all duration-700 ease-in-out`}
                  style={{
                    width: `${percentage(
                      calcAllTotalProductWeight() || 0,
                      +selectedBox.volumetricWeight || 0
                    )}%`,
                  }}
                ></div>
                <div className="absolute top-1 right-0">
                  <p className="text-base font-semibold leading-4 text-[#494949]">
                    {/* {weight is length x width x height (cm) / 5000.} */}
                    {selectedBox.volumetricWeight} Kg
                  </p>
                </div>
              </div>
            </div>
            {/* <span className="text-xs text-slate-600 font-semibold mt-4 pl-4"> */}
            {calcAllTotalProductWeight() > +selectedBox.volumetricWeight ? (
              <span className="text-base text-slate-600  mt-4 pl-4">
                {` Your billable weight is  ${calcBillableWeight()} KG. ( You are ${(
                  calcAllTotalProductWeight() - +selectedBox.volumetricWeight
                ).toFixed(2)} KG over your box capacity/volumetric weight )`}
              </span>
            ) : (
              <span className="text-base text-slate-600  mt-4 pl-4">
                {`Your billable weight is ${calcBillableWeight()} KG. You can add more products up to ${(
                  +selectedBox.volumetricWeight - calcAllTotalProductWeight()
                ).toFixed(2)} KG`}
              </span>
            )}
          </>
        ) : (
          <div className="flex justify-center items-center h-full">
            Please Select Box Type
          </div>
        )}
      </div>
    </div>
  );
};
export default BoxDetails;
