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

function EditBoxModal({ onClose, data, setOrder }: any) {
  const [boxInputData, setBoxInputData]: any = useState();

  const onChangeHandler = (e: any) => {
    const { name, value } = e.target;
    setBoxInputData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const calculateVolumeWeight = (
    length: number,
    breadth: number,
    height: number
  ): number => {
    const volume = length * breadth * height;
    return volume / 5000;
  };

  const onSave = () => {
    setOrder((prevOrder: any) => {
      const updatedBoxInfo = [...prevOrder.boxInfo];
      updatedBoxInfo[data?.id] = {
        ...boxInputData,
        length: +boxInputData.length,
        breadth: +boxInputData.breadth,
        height: +boxInputData.height,
        deadWeight: +boxInputData.deadWeight,
        volumetricWeight: calculateVolumeWeight(
          boxInputData.length,
          boxInputData.breadth,
          boxInputData.height
        ),
        appliedWeight: Math.max(
          boxInputData.deadWeight,
          calculateVolumeWeight(
            boxInputData.length,
            boxInputData.breadth,
            boxInputData.height
          )
        ),
      };
      return { ...prevOrder, boxInfo: updatedBoxInfo };
    });
    onClose(false);
  };

  useEffect(() => {
    setBoxInputData(data?.data);
  }, [data?.products]);

  return (
    <>
      <div className="h-[100vh]">
        <div className="border-b flex justify-between p-3 items-center">
          <div className="flex justify-center items-center">
            <div>
              <img src={packegeIcon} alt="" />
            </div>
            <span className="text-[18px] ml-2 font-bold font-Open">
              Edit Packages
            </span>
          </div>
          <button onClick={() => onClose(false)}>
            <img src={CloseIcon} alt="" />
          </button>
        </div>
        <div>
          <div>
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
                  <div className="flex gap-x-4 mb-2">
                    <div className=" flex justify-start items-center h-fit">
                      <input
                        type="radio"
                        name="type"
                        value={boxInputData?.codInfo?.isCod}
                        className=" mr-2 w-[15px] h-[15px]"
                        checked={!boxInputData?.codInfo?.isCod}
                        onChange={(e) => {
                          setBoxInputData(() => {
                            return {
                              ...boxInputData,
                              codInfo: {
                                ...boxInputData.codInfo,
                                isCod: false,
                              },
                            };
                          });
                        }}
                      />
                      <div className="text-[15px]">PREPAID</div>
                    </div>
                    <div className=" flex justify-start items-center h-fit">
                      <input
                        type="radio"
                        name="type"
                        value={boxInputData?.codInfo?.isCod}
                        className=" mr-2 w-[15px] h-[15px] "
                        checked={boxInputData?.codInfo?.isCod}
                        onChange={(e) => {
                          setBoxInputData(() => {
                            return {
                              ...boxInputData,
                              codInfo: {
                                ...boxInputData.codInfo,
                                isCod: true,
                              },
                            };
                          });
                        }}
                      />
                      <div className="text-[15px]">COD</div>
                    </div>
                  </div>

                  <div>
                    <InputBox
                      label="Box Name"
                      value={boxInputData?.name}
                      name="name"
                      inputType="text"
                      onChange={(e: any) => onChangeHandler(e)}
                      inputError={true}
                    />
                  </div>

                  <div className="mt-2">
                    <InputBox
                      label="Dead Weight (Kg)"
                      value={boxInputData?.deadWeight}
                      name="deadWeight"
                      inputType="text"
                      inputMode="numeric"
                      onChange={(e: any) => {
                        if (!isNaN(e.target.value)) {
                          onChangeHandler(e);
                        }
                      }}
                      inputError={true}
                    />
                  </div>
                </div>
                <div className="flex justify-between w-[100%] gap-x-[2rem] px-[1rem]">
                  <div className="w-[50%]">
                    <CustomDropDown
                      onChange={() => {}}
                      options={[
                        {
                          label: boxInputData?.measureUnit,
                          value: boxInputData?.measureUnit,
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
                      value={boxInputData?.length}
                      onChange={(e: any) => {
                        if (!isNaN(e.target.value)) {
                          onChangeHandler(e);
                        }
                      }}
                      // inputError={inputError}
                    />
                    <InputBox
                      label="B"
                      value={boxInputData?.breadth}
                      name="breadth"
                      inputType="text"
                      inputMode="numeric"
                      onChange={(e: any) => {
                        if (!isNaN(e.target.value)) {
                          onChangeHandler(e);
                        }
                      }}
                      // inputError={inputError}
                    />
                    <InputBox
                      label="H"
                      value={boxInputData?.height}
                      name="height"
                      inputType="text"
                      inputMode="numeric"
                      onChange={(e: any) => {
                        if (!isNaN(e.target.value)) {
                          onChangeHandler(e);
                        }
                      }}
                      // inputError={inputError}
                    />
                  </div>
                </div>

                <div className="flex w-[100%] px-4 gap-x-4 justify-between items-center">
                  <div className="flex-1">
                    <InputBox
                      label="Collectable Amount"
                      value={boxInputData?.codInfo?.collectableAmount}
                      name="deadWeight"
                      inputType="text"
                      inputMode="numeric"
                      onChange={(e: any) => {
                        if (!isNaN(e.target.value)) {
                          setBoxInputData(() => {
                            return {
                              ...boxInputData,
                              codInfo: {
                                ...boxInputData.codInfo,
                                collectableAmount: +e.target.value,
                              },
                            };
                          });
                        }
                      }}
                      // inputError={true}
                    />
                  </div>
                  <div className="flex-1">
                    <InputBox
                      label="Invoice value"
                      value={boxInputData?.codInfo?.invoiceValue}
                      name="deadWeight"
                      inputType="text"
                      inputMode="numeric"
                      onChange={(e: any) => {
                        if (!isNaN(e.target.value)) {
                          setBoxInputData(() => {
                            return {
                              ...boxInputData,
                              codInfo: {
                                ...boxInputData.codInfo,
                                invoiceValue: +e.target.value,
                              },
                            };
                          });
                        }
                      }}
                      // inputError={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex justify-end gap-x-5  shadow-lg border-[1px] h-[68px]  bg-[#FFFFFF] px-6 py-4 rounded-tr-[32px] rounded-tl-[32px]    fixed bottom-0 "
        style={{ width: "-webkit-fill-available" }}
      >
        <ServiceButton
          text={"SAVE"}
          onClick={onSave}
          className={` bg-[#1C1C1C] text-[#FFFFFF] h-[36px] lg:!py-2 lg:!px-4 disabled:bg-[#E8E8E8] disabled:text-[#BBB] disabled:border-none`}
        />
      </div>
    </>
  );
}

export default EditBoxModal;
