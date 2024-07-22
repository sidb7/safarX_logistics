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
import { GET_SELLER_BOX } from "../../../../utils/ApiUrls";
import ServiceButton from "../../../../components/Button/ServiceButton";

function EditProductModal({ onClose, data, setOrder }: any) {
  const [editProduct, setEditProduct]: any = useState([]);

  const calculateVolumeWeight = (
    length: number,
    breadth: number,
    height: number
  ): number => {
    const volume = length * breadth * height;
    return volume / 5000;
  };

  const handleChange = (e: any, i: number) => {
    const newProducts: any = [...editProduct];

    if (e.target.name === "name") {
      newProducts[i][e.target.name] = e.target.value;
    } else {
      newProducts[i][e.target.name] = +e.target.value;
    }

    if (["length", "breadth", "height"].includes(e.target.name)) {
      newProducts[i].volumetricWeight = +calculateVolumeWeight(
        newProducts[i]?.length,
        newProducts[i]?.breadth,
        newProducts[i]?.height
      );
      newProducts[i].appliedWeight = Math.max(
        newProducts[i].deadWeight,
        calculateVolumeWeight(
          newProducts[i].length,
          newProducts[i].breadth,
          newProducts[i].height
        )
      );
    }

    setEditProduct(newProducts);
  };

  const onSaveHandler = () => {
    setOrder((prevState: any) => {
      const updatedBoxInfo = [...prevState.boxInfo];
      updatedBoxInfo[data?.id] = {
        ...updatedBoxInfo[data?.id],
        products: editProduct,
      };
      return {
        ...prevState,
        boxInfo: updatedBoxInfo,
      };
    });
    onClose(false);
  };

  useEffect(() => {
    setEditProduct(data?.data);
  }, [data?.products]);

  console.log("editProduct", editProduct);

  return (
    <>
      <div className="h-[100vh]">
        <div className="border-b flex justify-between p-3 items-center">
          <div className="flex justify-center items-center">
            <div>
              <img src={packegeIcon} alt="" />
            </div>
            <span className="text-[18px] ml-2 font-bold font-Open">
              Edit Products
            </span>
          </div>
          <button onClick={() => onClose({ isOpen: false, state: {} })}>
            <img src={CloseIcon} alt="" />
          </button>
        </div>
        <div>
          <div className=" mt-4 max-h-[830px] customScroll ">
            {editProduct.length > 0 ? (
              <>
                {editProduct.map((productList: any, i: number) => {
                  return (
                    <div className="flex min-w-[90%] rounded-br rounded-bl">
                      <div
                        className="items-center flex flex-col gap-y-[1rem] justify-between my-5 w-[100%]"
                        style={{
                          boxShadow:
                            "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
                        }}
                        // onClick={() => handleProductsDetails(index)}
                      >
                        <div className="flex flex-col gap-y-[10px] w-[100%] px-[1rem]">
                          <div>
                            <InputBox
                              label="Product Name"
                              value={productList?.name}
                              name="name"
                              inputType="text"
                              onChange={(e: any) => handleChange(e, i)}
                              inputError={true}
                            />
                          </div>

                          <div>
                            <CustomInputWithDropDown
                              value={productList?.category}
                              initValue={productList?.name}
                              onChange={(e: any) => {
                                const newProducts: any = [...editProduct];
                                newProducts[i].category = e;
                                setEditProduct(newProducts);
                              }}
                            />
                          </div>

                          <div className="mt-2">
                            <InputBox
                              label="Price"
                              value={productList?.unitPrice}
                              name="unitPrice"
                              inputType="text"
                              onChange={(e: any) => {
                                if (!isNaN(e.target.value)) {
                                  handleChange(e, i);
                                }
                              }}
                              inputError={true}
                            />
                          </div>

                          <div className="mt-2">
                            <InputBox
                              label="Dead Weight (Kg)"
                              value={productList?.deadWeight}
                              name="deadWeight"
                              inputType="text"
                              inputMode="numeric"
                              onChange={(e: any) => {
                                if (!isNaN(e.target.value)) {
                                  handleChange(e, i);
                                }
                              }}
                              inputError={true}
                            />
                          </div>
                        </div>
                        <div className="flex justify-between w-[100%] gap-x-4 px-[1rem]">
                          <div className="w-[50%]">
                            <CustomDropDown
                              onChange={() => {}}
                              options={[
                                {
                                  label: productList?.measureUnit,
                                  value: productList?.measureUnit,
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
                              value={productList?.length}
                              onChange={(e: any) => {
                                if (!isNaN(e.target.value)) {
                                  handleChange(e, i);
                                }
                              }}
                              inputError={true}
                            />
                            <InputBox
                              label="B"
                              value={productList?.breadth}
                              name="breadth"
                              inputType="text"
                              inputMode="numeric"
                              onChange={(e: any) => {
                                if (!isNaN(e.target.value)) {
                                  handleChange(e, i);
                                }
                              }}
                              inputError={true}
                            />
                            <InputBox
                              label="H"
                              value={productList?.height}
                              name="height"
                              inputType="text"
                              inputMode="numeric"
                              onChange={(e: any) => {
                                if (!isNaN(e.target.value)) {
                                  handleChange(e, i);
                                }
                              }}
                              inputError={true}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div
        className="flex justify-end gap-x-5  shadow-lg border-[1px] h-[68px]  bg-[#FFFFFF] px-6 py-4 rounded-tr-[32px] rounded-tl-[32px]    fixed bottom-0 "
        style={{ width: "-webkit-fill-available" }}
      >
        <ServiceButton
          text={"SAVE"}
          onClick={onSaveHandler}
          className={` bg-[#1C1C1C] text-[#FFFFFF] h-[36px] lg:!py-2 lg:!px-4 disabled:bg-[#E8E8E8] disabled:text-[#BBB] disabled:border-none`}
        />
      </div>
    </>
  );
}

export default EditProductModal;
