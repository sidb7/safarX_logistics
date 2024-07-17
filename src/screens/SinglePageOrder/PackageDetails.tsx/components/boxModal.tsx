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

function BoxModal({ onClose, setOrder }: any) {
  const [services, setServices] = useState([]);
  const [serviceIndex, setServiceIndex]: any = useState(0);
  const [globalIndex, setGlobalIndex]: any = useState(null);
  const [transporterNoModalOpen, setTransporterNoModalOpen] = useState(false);
  const [boxInputData, setBoxInputData]: any = useState({
    name: "box_1",
    weightUnit: "Kg",
    deadWeight: 1,
    length: 1,
    breadth: 1,
    height: 1,
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
    eWayBillNo: 0,
  });

  const calculateVolumeWeight = (
    length: number,
    breadth: number,
    height: number
  ): number => {
    const volume = length * breadth * height;
    return volume / 5000;
  };

  const boxValidation = () => {
    if (
      boxInputData.name.trim() === "" ||
      boxInputData.deadWeight === 0 ||
      (typeof boxInputData.deadWeight !== "number" &&
        boxInputData.deadWeight.trim() === "") ||
      boxInputData.length === 0 ||
      (typeof boxInputData.length !== "number" &&
        boxInputData.length.trim() === "") ||
      boxInputData.breadth === 0 ||
      (typeof boxInputData.breadth !== "number" &&
        boxInputData.breadth.trim() === "") ||
      boxInputData.height === 0 ||
      (typeof boxInputData.height !== "number" &&
        boxInputData.height.trim() === "") ||
      (boxInputData.codInfo.isCod &&
        boxInputData.codInfo.collectableAmount === 0) ||
      boxInputData.codInfo.invoiceValue === 0 ||
      (boxInputData.codInfo.invoiceValue > 50000 &&
        boxInputData.transporterNo === "") ||
      (boxInputData.codInfo.invoiceValue > 50000 &&
        boxInputData.eWayBillNo === 0) ||
      (typeof boxInputData.eWayBillNo !== "number" &&
        boxInputData.eWayBillNo.trim() === "")
    ) {
      return true;
    }
    return false;
  };

  let data = [
    {
      id: 1,
      courierPartner: "DTDC",
      transporterNo: "34567898YTZ3",
    },
    {
      id: 2,
      courierPartner: "BlueDart",
      transporterNo: "34567898YTZ3",
    },
    {
      id: 3,
      courierPartner: "Delhivery",
      transporterNo: "34567898YTZ3",
    },
    {
      id: 4,
      courierPartner: "DTDC",
      transporterNo: "34567898YTZ3",
    },
    {
      id: 5,
      courierPartner: "BlueDart",
      transporterNo: "34567898YTZ3",
    },
    {
      id: 6,
      courierPartner: "Delhivery",
      transporterNo: "34567898YTZ3",
    },
    {
      id: 7,
      courierPartner: "DTDC",
      transporterNo: "34567898YTZ3",
    },
  ];

  const onChangeHandler = (e: any) => {
    const dimension = [
      "unitPrice",
      "deadWeight",
      "length",
      "breadth",
      "height",
    ];
    const { name, value } = e.target;
    setBoxInputData((prevState: any) => ({
      ...prevState,
      [name]: dimension.includes(name) ? +value : value,
    }));
  };

  console.log(
    "boxInputData===============================================>",
    boxInputData
  );

  const onSave = () => {
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

                <div className="flex !w-[100%] px-4">
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
                          inputType="number"
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

      <CenterModal
        isOpen={transporterNoModalOpen}
        onRequestClose={() => setTransporterNoModalOpen(false)}
        className="min-w-0 max-w-lg min-h-0 max-h-[30%]"
      >
        <>
          <div className="w-[100%] h-[100%] p-4">
            <div className="flex justify-between pb-2 items-center">
              <div className="font-bold font-Open">E-Way Details</div>
              <button
                className="flex justify-center items-center"
                onClick={() => setTransporterNoModalOpen(false)}
              >
                <img
                  src={crossIcon}
                  alt=""
                  className="w-[20px] cursor-pointer"
                />
              </button>
            </div>

            <div className=" max-h-[220px] border-b customScroll mt-2">
              <table className="min-w-full divide-y divide-gray-200 border-collapse border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 w-[60px] text-[15px]  font-medium  uppercase tracking-wider border border-gray-300">
                      Sr. No
                    </th>
                    <th className="px-3 font-medium  text-[15px] uppercase tracking-wider border border-gray-300">
                      Courier Partner
                    </th>
                    <th className="px-3 font-medium  text-[15px] uppercase tracking-wider border border-gray-300">
                      Transporter No
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y !max-h-[200px] !overflow-hidden customScroll  divide-gray-200">
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td className="px-3 w-[60px] text-[14px] whitespace-nowrap border border-gray-300">
                        {item.id}
                      </td>
                      <td className="px-3  text-[14px] whitespace-nowrap border border-gray-300">
                        {item.courierPartner || "-"}
                      </td>
                      <td className="px-3 text-[14px] whitespace-nowrap border border-gray-300">
                        <span className="mr-1">
                          {item.transporterNo || "-"}
                        </span>
                        <CopyTooltip stringToBeCopied={item.transporterNo} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      </CenterModal>
    </>
  );
}

export default BoxModal;
