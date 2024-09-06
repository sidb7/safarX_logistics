import React, { useEffect, useState } from "react";
import packegeIcon from "../../../../assets/Delivery Icon.svg";
import CustomDropDown from "../../../../components/DropDown";
import InputBox from "../../../../components/Input";
import SampleProduct from "../../../../assets/SampleProduct.svg";
import CloseIcon from "../../../../assets/CloseIcon.svg";
import CustomInputBox from "../../../../components/Input";
import AutoGenerateIcon from "../../../../assets/Product/autogenerate.svg";
import crossIcon from "../../../../assets/cross.svg";
import infoIcon from "../../../../assets/info.svg";
import ItemIcon from "../../../../assets/Product/Item.svg";
import DownArrowIcon from "../../../../assets/Filter/downArrow.svg";
import BoxIcon from "../../../../assets/layer.svg";
import VanIcon from "../../../../assets/vanWithoutBG.svg";
import InfoCircle from "../../../../assets/info-circle.svg";
import DeleteGif from "../../../../assets/common/DeleteGif.gif";
import CenterModal from "../../../../components/CustomModal/customCenterModal";
import {
  capitalizeFirstLetter,
  generateUniqueCode,
} from "../../../../utils/utility";
import CustomInputWithDropDown from "../../../../components/CategoriesDropDown/CategoriesDropDown";
import CustomSearchDropDown from "../../components/CustomSearchDropDown";
import {
  CREATE_BULK_PRODUCT,
  CREATE_SELLER_BOX,
  GET_SELLER_BOX,
} from "../../../../utils/ApiUrls";
import ServiceButton from "../../../../components/Button/ServiceButton";
import SearchDropDown from "../../components/searchDropDown";
import CopyTooltip from "../../../../components/CopyToClipboard";
import { POST } from "../../../../utils/webService";
import toast from "react-hot-toast";

const initialState: any = {
  name: "",
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
  eWayBillNo: "",
  transporterNo: "",
};

const boxDataForCatalogue = {
  name: "",
  length: "",
  breadth: "",
  height: "",
  color: "Brown",
  price: "323",
  deadWeight: "",
};

function BoxModal({ onClose, setOrder, order }: any) {
  const [isnewData, setIsNewData]: any = useState(false);
  const [isAutoPopulateData, setIsAutoPopulateData]: any = useState(false);

  const [boxInputData, setBoxInputData]: any = useState(initialState);
  const [addToCatalogueLoader, setAddToCatalogueLoader] = useState(false);

  const calculateVolumeWeight = (
    length: number,
    breadth: number,
    height: number
  ): number => {
    const volume = length * breadth * height;
    return volume / 5000;
  };

  const handleVolumCalc = () => {
    const { length, height, breadth, deadWeight: weight } = boxInputData;
    if (!length) return;
    if (!height) return;
    if (!breadth) return;

    const volumetricWeight = +calculateVolumeWeight(
      length,
      breadth,
      height
    ).toFixed(2);
    let tempBox = boxInputData;
    tempBox["volumetricWeight"] = volumetricWeight;
    tempBox["appliedWeight"] = Math.max(volumetricWeight, weight);

    setBoxInputData({ ...tempBox });
  };

  const boxValidation = () => {
    let errors = [];

    if (!boxInputData.name) {
      errors.push("Name should not be empty.");
    }

    const fields = [
      { value: boxInputData.deadWeight, name: "Dead weight" },
      { value: boxInputData.length, name: "Length" },
      { value: boxInputData.breadth, name: "Breadth" },
      { value: boxInputData.height, name: "Height" },
    ];

    const isZeroString = (value: any) => /^0+$/.test(value);

    fields.forEach((field) => {
      if (
        !field.value ||
        parseFloat(field.value) === 0 ||
        isZeroString(field.value)
      ) {
        errors.push(`${field.name} should not be empty or zero.`);
      }
    });

    return errors.length > 0 ? true : false;
  };

  const onChangeHandler = (e: any) => {
    const { name, value } = e.target;
    setBoxInputData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addBoxToCatalogue = async () => {
    const { name, length, breadth, height, deadWeight } = boxInputData;
    const parsedLength = +length;
    const parsedBreadth = +breadth;
    const parsedHeight = +height;
    const parsedDeadWeight = +deadWeight;
    const volumetricWeight = +calculateVolumeWeight(
      parsedLength,
      parsedBreadth,
      parsedHeight
    ).toFixed(2);
    const appliedWeight = Math.max(parsedDeadWeight, volumetricWeight);

    const payload = {
      ...boxDataForCatalogue,
      name: name,
      length: parsedLength,
      breadth: parsedBreadth,
      height: parsedHeight,
      deadWeight: parsedDeadWeight,
      volumetricWeight,
      appliedWeight,
    };

    const { data: response } = await POST(CREATE_SELLER_BOX, payload);
    if (response?.success) {
      toast.success(response?.message);
    } else {
      toast.error(response?.message);
    }
  };

  const onSave = () => {
    handleVolumCalc();

    setOrder((prevOrder: any) => ({
      ...prevOrder,
      boxInfo: [
        ...prevOrder.boxInfo,
        {
          ...boxInputData,
          length: +boxInputData.length,
          breadth: +boxInputData.breadth,
          height: +boxInputData.height,
          deadWeight: +boxInputData.deadWeight,
          volumetricWeight: boxInputData.volumetricWeight,
          appliedWeight: boxInputData.appliedWeight,
          codInfo: {
            ...boxInputData.codInfo,
            isCod:
              prevOrder?.boxInfo.length > 0
                ? prevOrder?.boxInfo[0]?.codInfo?.isCod
                : false,
          },
        },
      ],
    }));

    if (isnewData) {
      addBoxToCatalogue();
    }
    onClose(false);
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
                <div className="w-[100%] px-[1rem]">
                  <SearchDropDown
                    className={`border`}
                    apiUrl={GET_SELLER_BOX}
                    label="Search Package"
                    setFunc={setBoxInputData}
                    identifier="BOX"
                    emptyMsg={`No Box Found`}
                    setIsNewData={setIsNewData}
                    setIsAutoPopulateData={setIsAutoPopulateData}
                    newDataMessage="Create New Box"
                    setInputData={setBoxInputData}
                    initialState={initialState}
                  />
                </div>
                {(isnewData || isAutoPopulateData) && (
                  <div className="flex flex-col gap-y-[1rem] w-[100%] ">
                    <div className="flex flex-col gap-y-4 mt-1 w-[100%] px-[1rem]">
                      <div>
                        <InputBox
                          label="Box Name"
                          value={boxInputData?.name}
                          name="name"
                          inputType="text"
                          onChange={(e: any) => onChangeHandler(e)}
                        />
                      </div>

                      <div className="mt-2">
                        <InputBox
                          label="Dead Weight (Kg)"
                          value={boxInputData?.deadWeight}
                          inputType="text"
                          inputMode="numeric"
                          name="deadWeight"
                          onChange={(e: any) => {
                            if (!isNaN(e.target.value)) {
                              onChangeHandler(e);
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between w-[100%] mt-2 gap-x-6 px-[1rem]">
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
                      <div className="flex w-[50%]  gap-x-4">
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
                        />
                      </div>
                    </div>
                  </div>
                )}
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
          disabled={boxValidation()}
          className={` bg-[#1C1C1C] text-[#FFFFFF] h-[36px] lg:!py-2 lg:!px-4 disabled:bg-[#E8E8E8] disabled:text-[#BBB] disabled:border-none`}
        />
      </div>
    </>
  );
}

export default BoxModal;
