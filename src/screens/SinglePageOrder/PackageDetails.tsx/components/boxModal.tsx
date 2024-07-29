import React, { useState } from "react";
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
import { GET_SELLER_BOX } from "../../../../utils/ApiUrls";
import ServiceButton from "../../../../components/Button/ServiceButton";
import SearchDropDown from "../../components/searchDropDown";
import CopyTooltip from "../../../../components/CopyToClipboard";

function BoxModal({ onClose, setOrder, order }: any) {
  const [services, setServices] = useState([]);
  const [serviceIndex, setServiceIndex]: any = useState(0);
  const [globalIndex, setGlobalIndex]: any = useState(null);
  const [transporterNoModalOpen, setTransporterNoModalOpen] = useState(false);
  const [boxInputData, setBoxInputData]: any = useState({
    name: "White Box",
    weightUnit: "Kg",
    deadWeight: 0.5,
    length: 0.5,
    breadth: 0.5,
    height: 0.5,
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
    ewaybillNumber: "",
    transporterNo: "",
  });

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
                <div className="flex flex-col gap-y-6 w-[100%] px-[1rem]">
                  <div>
                    <SearchDropDown
                      className={`border`}
                      apiUrl={GET_SELLER_BOX}
                      label="Search Package"
                      setFunc={setBoxInputData}
                      identifier="BOX"
                      emptyMsg={`No Box Found`}
                    />
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
                      //   inputError={inputError}
                    />
                  </div>
                </div>
                <div className="flex justify-between w-[100%] gap-x-6 px-[1rem]">
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

                {/* <div className="flex !w-[100%] px-4">
                  <CustomInputBox
                    isRightIcon={true}
                    containerStyle=""
                    rightIcon={AutoGenerateIcon}
                    className="w-full !text-base !font-semibold"
                    imageClassName="!h-[12px] !w-[113px] !top-[40%] "
                    value={boxInputData?.orderId}
                    maxLength={12}
                    label="Order ID"
                    onChange={(e) => {
                      setBoxInputData((prevState: any) => {
                        return { ...prevState, orderId: e.target.value };
                      });
                    }}
                    onClick={() => {
                      const orderId = generateUniqueCode(8, 12);
                      setBoxInputData((prevState: any) => {
                        return { ...prevState, orderId: orderId };
                      });
                    }}
                    visibility={true}
                    setVisibility={() => {}}
                    name="orderId"
                    data-cy="auto-generate-order-id"
                  />
                </div>

                <div className="flex w-[100%] px-4 gap-x-4 justify-start items-center">
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

                <div className="flex w-[100%] px-4 gap-x-4 justify-between items-center">
                  <div className="flex-1">
                    <InputBox
                      label="Collectable Amount"
                      value={boxInputData?.codInfo?.collectableAmount}
                      name="deadWeight"
                      inputType="text"
                      inputMode="numeric"
                      isDisabled={!boxInputData?.codInfo?.isCod}
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
                    />
                  </div>
                </div>

                {boxInputData.codInfo.invoiceValue > 50000 && (
                  <div>
                    <div className="flex gap-x-2">
                      <div className="w-full">
                        <InputBox
                          label="Transporter No"
                          value={boxInputData?.transporterNo}
                          name="transporterNo"
                          inputType="text"
                          onChange={(e: any) => {
                            setBoxInputData((prevState: any) => {
                              return {
                                ...prevState,
                                transporterNo: e.target.value,
                              };
                            });
                          }}
                        />
                      </div>
                      <button
                        className="flex justify-center items-center"
                        onClick={() => {
                          setTransporterNoModalOpen(true);
                        }}
                      >
                        <img
                          src={infoIcon}
                          alt="infoIcon for Transporter"
                          className="w-[20px] cursor-pointer"
                        />
                      </button>
                    </div>
                    <div className="mt-5">
                      <div className="md:!w-[372px]">
                        <CustomInputBox
                          inputType="text"
                          label="Enter Eway Bill No."
                          value={boxInputData?.eWayBillNo}
                          onChange={(e) => {
                            if (e.target.value.length <= 12)
                              setBoxInputData((prevState: any) => {
                                return {
                                  ...prevState,
                                  eWayBillNo: e.target.value,
                                };
                              });
                          }}
                          name="ewaybillNumber"
                        />
                      </div>
                    </div>
                  </div>
                )} */}
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
