import { useEffect, useState, useRef } from "react";
import editIcon from "../../../assets/Product/Edit.svg";
import deleteIcon from "../../../assets/Product/Delete.svg";
import ProductDetails from "./productDetails";
import ItemIcon from "../../../assets/Product/Item.svg";
import subtractIcon from "../../../assets/Product/subtract-circle.svg";
import addIcon from "../../../assets/Product/addCircle.svg";
import ProductIcon from "../../../assets/Product/Product.svg";
import EditIcon from "../../../assets/Product/Edit.svg";

import AddButton from "../../../components/Button/addButton";
import ButtonIcon from "../../../assets/Product/Button.svg";
import DeleteIcon from "../../../assets/DeleteIconRedColor.svg";
import Checkbox from "../../../components/CheckBox";
import CustomInputBox from "../../../components/Input";
import { Environment } from "../../../utils/ApiUrls";

function BoxInfo({
  index,
  data,
  setProductModal,
  setOrder,
  removeProduct,
  removeBox,
  setEditBoxModal,
  setEditProductModal,
}: any) {
  const [allProducts, setAllProducts]: any = useState([]);

  const calculateVolumeWeight = (
    length: number,
    breadth: number,
    height: number
  ): number => {
    const volume = length * breadth * height;
    return volume / 5000;
  };

  const getColorByIndex = (index: any) => {
    const colors = ["#F2F6FF", "#FDF6EA", "#f7e8e8", "#dee1ec", "#f0f0f0"];
    return colors[index % colors.length];
  };

  const addUnit = (index: number) => {
    let arr = allProducts;
    const { length, breadth, height } = allProducts[index];
    arr[index].qty++;
    let calacVolu: any = +calculateVolumeWeight(
      length,
      breadth,
      height
    ).toFixed(2);
    arr[index].volumetricWeight = +(calacVolu.toFixed(4) * +arr[index].qty);
    setAllProducts([...arr]);
  };

  const removeUnit = (index: number) => {
    let arr: any = allProducts;
    const { length, breadth, height } = allProducts[index];
    arr[index].qty = +arr[index].qty;
    arr[index].qty === 1 ? (arr[index].qty = 1) : arr[index].qty--;
    let calacVolu: any = +calculateVolumeWeight(
      length,
      breadth,
      height
    ).toFixed(2);
    arr[index].volumetricWeight = +(calacVolu.toFixed(4) * +arr[index].qty);
    setAllProducts([...arr]);
  };

  useEffect(() => {
    setAllProducts(data?.products);
  }, [data?.products]);

  return (
    <div
      className={`px-4 py-2 my-2 rounded`}
      style={{ backgroundColor: getColorByIndex(index) }}
    >
      <div className="gap-y-4">
        <div className="flex justify-between items-center">
          <div className=" flex flex-col">
            <div className="flex items-center justify-start">
              <div className="text-[20px] my-2 font-bold font-Open">
                {data?.name}
              </div>
              <div className="flex items-center justify-center gap-x-4 mx-5 px-3 py-1 rounded-lg bg-[#ffffff] shadow-md">
                <div>
                  Applied Weight :{" "}
                  {`${
                    data?.appliedWeight ? +data?.appliedWeight + "Kg" : "0 Kg"
                  }`}
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-[15px]">
                    {data?.codInfo?.isCod ? "COD" : "PREPAID"}
                  </div>
                  <div
                    className={`rounded-full w-[12px] ml-1 h-[12px] ${
                      data?.codInfo?.isCod ? "bg-[#4BB543]" : "bg-[#F35838]"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              {data?.length} X {data?.breadth} X {data?.height} | V:{" "}
              {data?.volumetricWeight} Kg | D: {data?.deadWeight} Kg
            </div>
            <div className="flex gap-x-4 mt-2 rounded-lg">
              <div>
                CollectableAmount : {data?.codInfo?.collectableAmount || 0}
              </div>
              <div>InvoiceValue : {data?.codInfo?.invoiceValue || 0}</div>
            </div>
          </div>
          <div className="">
            <button
              className=""
              onClick={() =>
                setEditBoxModal({
                  isOpen: true,
                  state: { id: index, data: data },
                })
              }
            >
              <img src={editIcon} alt="" className="w-[25px]" />
            </button>
            <button className="mx-4" onClick={() => removeBox(index)}>
              <img src={deleteIcon} alt="" className="w-[25px]" />
            </button>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="text-[20px] font-Open font-bold">
                items {"("}
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
                {/* <button className="ml-4">
                  <img src={deleteIcon} alt="" className="w-[20px]" />
                </button> */}
              </div>
            </div>
            {allProducts.length > 0 && (
              <div className="inline-flex cursor-pointer ml-5 bg-[#F2F6FF] rounded-[4px] p-2 justify-center items-center ">
                <img src={ButtonIcon} alt="Add Product" width="16px" />

                <button
                  className="ml-2 text-[#004EFF] text-sm font-semibold leading-5 font-Open"
                  onClick={() => setProductModal({ isOpen: true, id: index })}
                >
                  ADD PRODUCT
                </button>
              </div>
            )}
          </div>
          <div
            className={`!transition-all my-2 max-w-[400px] !duration-700 !ease-in-out flex flex-col scroll-smooth overflow-auto rounded-lg border border-x-[#E8E8E8] shadow-none hover:shadow-inner`}
            data-cy="product-list"
          >
            {allProducts.length > 0 ? (
              allProducts?.map((e: any, i: number, arr: any) => {
                return (
                  <div key={i} data-cy={`product-item-${i}`}>
                    <div className="flex justify-between items-center " key={i}>
                      <ProductDetails
                        key={i}
                        image={ItemIcon}
                        appliedWeight={`${e?.appliedWeight} Kg`}
                        deadWeight={e?.deadWeight}
                        productName={e?.name || 0}
                        breadth={e?.breadth || 0}
                        length={e?.length || 0}
                        height={e?.height || 0}
                        dimensionClassName="!font-light"
                        className="!border-none !shadow-none !h-[70px]"
                        data-cy={`product-box-${i}`}
                      />
                      <div className="flex items-center p-1 lg:p-2  gap-2 !mr-2 rounded-lg">
                        <div>
                          <img
                            src={subtractIcon}
                            alt=""
                            className="cursor-pointer"
                            onClick={() => removeUnit(i)}
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
                            onClick={() => addUnit(i)}
                            data-cy={`add-unit-${i}`}
                          />
                        </div>

                        <button
                          className={`${
                            arr.length === 1
                              ? "hue-rotate-60 opacity-40 !cursor-not-allowed"
                              : ""
                          } ml-2 cursor-pointer `}
                          // onClick={() => handleDeleteProduct(i)}
                          data-cy={`delete-product-${i}`}
                          onClick={() => removeProduct(index, i)}
                        >
                          <img
                            src={DeleteIcon}
                            className={`!h-4 !w-4 ${
                              arr.length === 1 ? "fill-gray-600" : ""
                            } `}
                            alt=""
                          />
                        </button>
                      </div>
                    </div>

                    {allProducts.length - 1 !== i && <hr data-cy={`hr-${i}`} />}
                  </div>
                );
              })
            ) : (
              <button
                className="flex justify-center cursor-pointer items-center p-5"
                onClick={() => setProductModal({ isOpen: true, id: index })}
              >
                <img src={ButtonIcon} alt="Add Product" width="16px" />

                <span className="ml-2 text-[#004EFF] text-sm font-semibold leading-5 font-Open">
                  ADD PRODUCT
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoxInfo;
