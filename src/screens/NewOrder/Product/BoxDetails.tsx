import plusIcon from "../../../assets/Product/plusIcon.svg";
import upwardArrow from "../../../assets/Product/arrow-up.png";
import ProductBox from "./ProductBox";
import ItemIcon from "../../../assets/Product/Item.svg";
import subtractIcon from "../../../assets/Product/subtract-circle.svg";
import addIcon from "../../../assets/Product/addCircle.svg";
import ProductIcon from "../../../assets/Product/Product.svg";
import EditIcon from "../../../assets/Product/Edit.svg";
import { useEffect, useState } from "react";
import AddButton from "../../../components/Button/addButton";
import ButtonIcon from "../../../assets/Product/Button.svg";
interface IBoxdetails {
  products?: any;
  selectedBox?: any;
  setProductFinalPayload?: any;
  productFinalPayload?: any;
  boxIndex?: any;
  openPackageDetailModal?: any;
}

const BoxDetails = (props: IBoxdetails) => {
  const {
    products,
    selectedBox = {},
    setProductFinalPayload,
    productFinalPayload,
    openPackageDetailModal,
    boxIndex,
  } = props;

  const [allProducts, setAllProducts]: any = useState([]);

  useEffect(() => {
    setAllProducts(products);
  }, [products]);

  // useEffect(() => {
  //   setPackages(boxInfo);
  // }, [boxInfo]);

  // useEffect(() => {
  //   setProductFinalPayload(allProducts);
  // }, [allProducts]);

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
    allProducts.forEach((e: any) => {
      const { deadWeight } = e;
      totalWeight += +deadWeight * +e.qty || 0;
    });
    return totalWeight;
  };
  const percentage = (partialValue: any, totalValue: any) => {
    let percentage = (100 * +partialValue) / +totalValue;
    return percentage > 100 ? 100 : percentage;
  };

  const addUnit = (index: number) => {
    let arr = allProducts;
    const { length, breadth, height } = allProducts[index];
    arr[index].qty++;
    let calacVolu: any = +calculateVolumeWeight(length, breadth, height);
    arr[index].volumetricWeight = +(calacVolu.toFixed(4) * +arr[index].qty);
    setAllProducts([...arr]);
  };

  const removeUnit = (index: number) => {
    let arr = allProducts;
    const { length, breadth, height } = allProducts[index];
    arr[index].qty = +arr[index].qty;
    arr[index].qty === 1 ? (arr[index].qty = 1) : arr[index].qty--;
    let calacVolu: any = +calculateVolumeWeight(length, breadth, height);
    arr[index].volumetricWeight = +(calacVolu.toFixed(4) * +arr[index].qty);
    setAllProducts([...arr]);
  };

  const calcBillableWeight = () => {
    let billableWeight = calcAllTotalProductWeight();
    return (
      billableWeight > +selectedBox.volumetricWeight
        ? calcAllTotalProductWeight()
        : +selectedBox.volumetricWeight
    ).toFixed(2);
  };

  const handleAddPackage = (packageData: any, index: any) => {
    console.log("handleAddPackage", packageData, index);
    console.log("productFinalPayload", productFinalPayload);
    // setProductFinalPayload({ boxInfo: [...productFinalPayload?.boxInfo, packageData] });
  };

  return (
    <div
      className="lg:border-0 w-full bg-[#FEFEFE] border-2 border-solid border-[#E8E8E8] rounded-lg  "
      style={{ width: "560px" }}
    >
      <div className="hidden lg:flex justify-between ">
        <div className="flex py-5 gap-x-2">
          <img src={ProductIcon} alt="Package Icon" className="" />
          <h1 className="font-semibold font-Lato text-center text-gray-900 lg:font-normal text-[1.5rem] lg:text-[#1C1C1C] ">
            Box {boxIndex + 1}
          </h1>
        </div>
      </div>
      <>
        <div className="lg:flex flex-col lg:gap-x-6 ">
          <div
            className="flex flex-col lg:gap-y-2 lg:rounded-lg lg:p-5 lg:mt-0 mt-4"
            style={{
              boxShadow:
                "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05), 0px 23px 23px 0px rgba(133, 133, 133, 0.04)",
              border: "1px solid #E8E8E8",
            }}
          >
            <div className="flex justify-between">
              <p className="font-semibold mt-4 pl-4">{selectedBox.name}</p>
              {/* <img src={plusIcon} alt="Add product" /> */}
            </div>
            <div className="h-[260px] px-2 overflow-auto">
              {allProducts.map((e: any, index: number) => {
                return (
                  <div className="flex justify-between" key={index}>
                    <ProductBox
                      image={ItemIcon}
                      weight={`${e?.deadWeight} Kg`}
                      productName={e?.name || 0}
                      breadth={e?.breadth || 0}
                      length={e?.length || 0}
                      height={e?.height || 0}
                      dimensionClassName="!font-light"
                      className="!border-none !shadow-none"
                    />
                    <div className="flex items-center p-2 mt-7 h-[40px] gap-2  border-2 border-solid border-[#E8E8E8] rounded-lg">
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
                    </div>
                  </div>
                );
              })}
            </div>
            {Object.keys(selectedBox).length > 0 ? (
              <>
                <span className="text-base text-slate-600 mt-2 pl-4">
                  Products dead weight is{" "}
                  {calcAllTotalProductWeight().toFixed(2)} Kg
                </span>
                <div className="relative">
                  <div className="h-[6px] bg-[#CBEAC0] mt-2 ml- mr-16">
                    <div
                      className={`h-[6px] ${
                        calcAllTotalProductWeight() >
                        +selectedBox.volumetricWeight
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
                      calcAllTotalProductWeight() -
                      +selectedBox.volumetricWeight
                    ).toFixed(
                      2
                    )} KG over your box capacity/volumetric weight )`}
                  </span>
                ) : (
                  <span className="text-base text-slate-600  mt-4 pl-4">
                    {`Your billable weight is ${calcBillableWeight()} KG. You can add more products up to ${(
                      +selectedBox.volumetricWeight -
                      calcAllTotalProductWeight()
                    ).toFixed(2)} KG`}
                  </span>
                )}
                <div className="flex items-center justify-center">
                  <AddButton
                    text="ADD PRODUCT"
                    onClick={() => {
                      openPackageDetailModal(boxIndex);
                    }}
                    showIcon={true}
                    icon={ButtonIcon}
                    className="rounded bg-white shadow-none"
                    alt="Add Product"
                  />
                </div>
              </>
            ) : (
              <div className="flex justify-center items-center h-full">
                Please Select Box Type
              </div>
            )}
          </div>
        </div>
      </>
    </div>
  );
};
export default BoxDetails;
