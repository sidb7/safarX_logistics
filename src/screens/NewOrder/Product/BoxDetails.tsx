import plusIcon from "../../../assets/Product/plusIcon.svg";
import upwardArrow from "../../../assets/Product/arrow-up.png";
import ProductBox from "./ProductBox";
import ItemIcon from "../../../assets/Product/Item.svg";
import subtractIcon from "../../../assets/Product/subtract-circle.svg";
import addIcon from "../../../assets/Product/addCircle.svg";
import ProductIcon from "../../../assets/Product/Product.svg";
import EditIcon from "../../../assets/Product/Edit.svg";
import { useEffect, useState } from "react";
// import { POST } from "../../../utils/webService";
// import { GET_LATEST_ORDER } from "../../../utils/ApiUrls";

interface IBoxdetails {
  products?: any;
  selectedBox?: any;
  setProductFinalPayload: any;
}

const BoxDetails = (props: IBoxdetails) => {
  const { products, selectedBox = {}, setProductFinalPayload } = props;
  const [allProducts, setAllProducts]: any = useState([]);

  useEffect(() => {
    setAllProducts(products);
  }, [products]);

  useEffect(() => {
    setProductFinalPayload(allProducts);
  }, [allProducts]);

  const calcValumWeight = (l: any, b: any, h: any) => {
    let result = l * b * h;
    return result / 5000;
  };

  const calcAllTotalProductWeight: any = () => {
    let totalWeight = 0;
    allProducts.forEach((e: any) => {
      const { weight } = e;
      totalWeight += +weight.deadWeight * +e.stock || 0;
    });
    return totalWeight;
  };
  const percentage = (partialValue: any, totalValue: any) => {
    let percentage = (100 * +partialValue) / +totalValue;
    return percentage > 100 ? 100 : percentage;
  };

  const addUnit = (index: number) => {
    let arr = allProducts;
    arr[index].stock++;
    setAllProducts([...arr]);
  };

  const removeUnit = (index: number) => {
    let arr = allProducts;
    arr[index].stock = +arr[index].stock;
    arr[index].stock === 1 ? (arr[index].stock = 1) : arr[index].stock--;
    setAllProducts([...arr]);
  };

  const calcBillableWeight = () => {
    let billableWeight = calcAllTotalProductWeight();


    return (
      billableWeight > +selectedBox.weight.split("kg")[0]
        ? calcAllTotalProductWeight()
        : +selectedBox.weight.split("kg")[0]
    ).toFixed(2);
  };

  return (
    <div className="lg:border-0 w-full bg-[#FEFEFE] border-2 border-solid border-[#E8E8E8] rounded-lg my-4">
      <div className="hidden lg:flex justify-between mb-4">
        <div className="flex py-5 gap-x-2">
          <img src={ProductIcon} alt="Package Icon" className="" />
          <h1 className="font-semibold font-Lato text-center text-gray-900 lg:font-normal text-[1.5rem] lg:text-[#1C1C1C] ">
            Box Details
          </h1>
        </div>
        <div className="flex gap-x-2"></div>
      </div>

      <div className="lg:grid grid-cols-2 lg:gap-x-6 ">
        <div
          className="h-56 overflow-scroll  lg:p-5 lg:rounded-lg"
          style={{
            boxShadow:
              "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05), 0px 23px 23px 0px rgba(133, 133, 133, 0.04)",
            border: "1px solid #E8E8E8",
          }}
        >
          <div className="flex justify-between p-2 lg:hidden">
            <p className="font-Open text-[14px] font-semibold">Box Details</p>
            <div className="flex gap-x-2">
              <img src={plusIcon} alt="" />
              <img src={EditIcon} alt="" />
            </div>
          </div>
          {allProducts.map((e: any, index: number) => {
            return (
              <div className="flex justify-between" key={index}>
                <ProductBox
                  image={ItemIcon}
                  weight={`${e?.weight.deadWeight} Kg`}
                  productName={e?.productName || 0}
                  breadth={e?.dimensions?.breadth || 0}
                  length={e?.dimensions?.length || 0}
                  height={e?.dimensions?.height || 0}
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
                    <p>{e.stock}</p>
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
        <div
          className="flex flex-col lg:gap-y-2 lg:rounded-lg lg:p-5 lg:mt-0 mt-4"
          style={{
            boxShadow:
              "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05), 0px 23px 23px 0px rgba(133, 133, 133, 0.04)",
            border: "1px solid #E8E8E8",
          }}
        >
          {Object.keys(selectedBox).length > 0 ? (
            <>
              <div className="flex justify-between">
                <span className="font-semibold mt-4 pl-4">
                  {selectedBox.name}
                </span>
                {/* <img src={plusIcon} alt="Add product" /> */}
              </div>
              <span className="text-base text-slate-600 mt-2 pl-4">
                Products dead weight is {calcAllTotalProductWeight().toFixed(2)}{" "}
                Kg
              </span>
              <div className="relative">
                <div className="h-[6px] bg-[#CBEAC0] mt-2 ml-4 mr-12">
                  <div
                    className={`h-[6px] ${
                      calcAllTotalProductWeight() >
                      +selectedBox.weight.split("kg")[0]
                        ? "bg-[red]"
                        : "bg-[#7CCA62]"
                    } p-0 m-0 transition-all duration-700 ease-in-out`}
                    style={{
                      width: `${percentage(
                        calcAllTotalProductWeight() || 0,
                        +selectedBox.weight.split("kg")[0] || 0
                      )}%`,
                    }}
                  ></div>
                  <div className="absolute top-1 right-0">
                    <p className="text-base font-semibold leading-4 text-[#494949]">
                      {/* {weight is length x width x height (cm) / 5000.} */}
                      {selectedBox.weight.split("kg")} Kg
                    </p>
                  </div>
                </div>
                {}
              </div>
              {/* <span className="text-xs text-slate-600 font-semibold mt-4 pl-4"> */}
              {calcAllTotalProductWeight() >
              +selectedBox.weight.split("kg")[0] ? (
                <span className="text-base text-slate-600  mt-4 pl-4">
                  {` Your billable weight is  ${calcBillableWeight()} KG. ( You are ${(
                    calcAllTotalProductWeight() -
                    +selectedBox.weight.split("kg")[0]
                  ).toFixed(2)} KG over your box capacity/volumetric weight )`}
                </span>
              ) : (
                <span className="text-base text-slate-600  mt-4 pl-4">
                  {`Your billable weight is ${calcBillableWeight()} KG. You can add more products up to ${(
                    +selectedBox.weight.split("kg")[0] -
                    calcAllTotalProductWeight()
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
    </div>
  );
};
export default BoxDetails;
