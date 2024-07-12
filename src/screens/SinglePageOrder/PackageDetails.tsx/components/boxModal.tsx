import React, { useState } from "react";
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

function BoxModal({ onClose, setOrder }: any) {
  const [services, setServices] = useState([]);
  const [serviceIndex, setServiceIndex]: any = useState(0);
  const [globalIndex, setGlobalIndex]: any = useState(null);
  const [boxInputData, setBoxInputData]: any = useState({
    name: "box_1",
    weightUnit: "Kg",
    deadWeight: 0,
    length: 0,
    breadth: 0,
    height: 0,
    measureUnit: "cm",
    products: [],
    codInfo: {
      isCod: false,
      collectableAmount: 0,
      invoiceValue: 0,
    },
    podInfo: {
      isPod: false,
    },
    insurance: false,
  });

  const onChangeHandler = (e: any) => {
    const { name, value } = e.target;
    setBoxInputData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSave = () => {
    setOrder((prevOrder: any) => ({
      ...prevOrder,
      boxInfo: [...prevOrder.boxInfo, boxInputData],
    }));
  };

  const handleService = (index: any) => {
    setServiceIndex(index);
  };

  return (
    <>
      <div className="h-[100vh]">
        <div className="border-b flex justify-between p-3 items-center">
          <div className="flex justify-center items-center">
            <div>
              <img src={packegeIcon} alt="" />
            </div>
            <span className="text-[18px] ml-2 font-bold font-Open">
              Add Packages
            </span>
          </div>
          <button onClick={() => onClose(false)}>
            <img src={packegeIcon} alt="" />
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
                  <div>
                    <CustomSearchDropDown
                      value={boxInputData.name}
                      initValue={boxInputData.name}
                      className=""
                      apiUrl={GET_SELLER_BOX}
                      label={"Search Box"}
                      // onChange={(e: any) =>
                      //   handleProductInputChange(
                      //     { name: "category", value: e },
                      //     index
                      //   )
                      // }
                    />
                    {/* GET_SELLER_BOX */}
                  </div>

                  <div>
                    <InputBox
                      label="Box Name"
                      value={boxInputData?.name}
                      name="name"
                      inputType="text"
                      onChange={(e: any) => onChangeHandler(e)}
                      //   inputError={inputError}
                    />
                  </div>

                  <div>
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
                      //   inputError={inputError}
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

export default BoxModal;
