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

function BoxInfo({ index, data, setProductModal }: any) {
  const [allProducts, setAllProducts] = useState(data?.products);

  return (
    <div className="p-4 my-2 bg-[#F2F6FF] rounded">
      <div className="gap-y-4">
        <div className="flex justify-between items-center">
          <div className=" flex flex-col">
            <div className="flex items-center justify-center">
              <div className="text-[20px] my-2 font-bold font-Open">
                {data?.name}
              </div>
              <div className=" mx-5 px-2 rounded bg-[#ffffff]">
                Applied Weight : 16.8 Kg
              </div>
            </div>
            <div className="flex items-center">
              {data?.length} X {data?.breadth} X {data?.height} | V: 16.8 Kg |
              D: {data?.deadWeight} Kg
            </div>
          </div>
          <div className="">
            <button className="">
              <img src={editIcon} alt="" className="w-[25px]" />
            </button>
            <button className="mx-4">
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
                <button className="">
                  <img src={editIcon} alt="" className="w-[20px]" />
                </button>
                <button className="ml-4">
                  <img src={deleteIcon} alt="" className="w-[20px]" />
                </button>
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
              allProducts?.map((e: any, index: number, arr: any) => {
                return (
                  <div key={index} data-cy={`product-item-${index}`}>
                    <div
                      className="flex justify-between items-center "
                      key={index}
                    >
                      <ProductDetails
                        key={index}
                        image={ItemIcon}
                        weight={`${e?.appliedWeight} Kg`}
                        productName={e?.name || 0}
                        breadth={e?.breadth || 0}
                        length={e?.length || 0}
                        height={e?.height || 0}
                        dimensionClassName="!font-light"
                        className="!border-none !shadow-none !h-[70px]"
                        data-cy={`product-box-${index}`}
                      />
                      <div className="flex items-center p-1 lg:p-2  gap-2 !mr-2 rounded-lg">
                        <div>
                          <img
                            src={subtractIcon}
                            alt=""
                            className="cursor-pointer"
                            //   onClick={() => removeUnit(index)}
                            data-cy={`remove-unit-${index}`}
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
                            //   onClick={() => addUnit(index)}
                            data-cy={`add-unit-${index}`}
                          />
                        </div>

                        <div
                          className={`${
                            arr.length === 1
                              ? "hue-rotate-60 opacity-40 !cursor-not-allowed"
                              : ""
                          } ml-2 cursor-pointer `}
                          // onClick={() => handleDeleteProduct(index)}
                          data-cy={`delete-product-${index}`}
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

                    {allProducts.length - 1 !== index && (
                      <hr data-cy={`hr-${index}`} />
                    )}
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
