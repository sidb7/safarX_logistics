import SampleProduct from "../../assets/SampleProduct.svg";
import CloseIcon from "../../assets/CloseIcon.svg";
import InputBox from "../../components/Input";
import ItemIcon from "../../assets/Product/Item.svg";
import DownArrowIcon from "../../assets/Filter/downArrow.svg";
import BoxIcon from "../../assets/layer.svg";
import VanIcon from "../../assets/vanWithoutBG.svg";
import InfoCircle from "../../assets/info-circle.svg";
import DeleteGif from "../../assets/common/DeleteGif.gif";

import AutoGenerateIcon from "../../assets/Product/autogenerate.svg";
import {
  capitalizeFirstLetter,
  orderErrorsEnum,
  generateUniqueCode,
  orderErrorCategoryENUMs,
} from "../../utils/utility";
import { useEffect, useRef, useState } from "react";
import CustomDropDown from "../../components/DropDown";
import { Spinner } from "../../components/Spinner";
import MagicLocationIcon from "../../assets/PickUp/magicLocation.svg";
import CustomInputWithDropDown from "../../components/LandmarkDropdown/LandmarkDropdown";
import AiIcon from "../../assets/Buttons.svg";
import LocationIcon from "../../assets/Location.svg";
import CustomeBottomModal from "../../components/CustomModal/customBottomModal";
import {
  GET_SERVICE_LIST_ORDER,
  ORDERID_AND_EWAYBILLINFO,
  POST_PLACE_ALL_ORDERS,
  SET_SERVICE_INFO,
  UPDATE_OTHER_ORDER_DETAILS,
  UPDATE_PRODUCT_AND_BOX_DETAILS,
  UPDATE_TEMP_ORDER_ADDRESS,
  VERIFY_ADDRESS,
} from "../../utils/ApiUrls";
import { POST } from "../../utils/webService";
import { toast } from "react-toastify";
import { dummyStateDropdownData } from "../../utils/dummyData";
import DeleteModal from "../../components/CustomModal/DeleteModal";

interface ErrorModalProps {
  errorModalData: any;
  setIsErrorModalOpen: any;
}

const ErrorModal = (props: ErrorModalProps) => {
  let productDimesions: any = {};
  const { errorModalData, setIsErrorModalOpen } = props;
  const [productAndBoxDetails, setProductAndBoxDetails]: any = useState([]);
  const [globalIndex, setGlobalIndex]: any = useState(null);
  const [productDetails, setProductDetails]: any = useState([]);
  const [services, setService]: any = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [serviceIndex, setServiceIndex]: any = useState(0);
  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const [updateButtonLoader, setUpdateButtonLoader] = useState(false);
  const [processOrderLoader, setProcessOrderLoader] = useState(false);
  const [serviceDropDownLoader, setServiceDropDownLoader] = useState(false);
  const [inputError, setInputError] = useState(false);
  // -------------------------------------------------
  const [isProcess, setIsProcess] = useState(false);
  const [showAlertMessage, setAlertMessage] = useState(false);
  const [isProcessOrderCall, setIsProcessOrderCall] = useState();

  // -------------------------------------------------

  const [otherErrorDetails, setOtherErrorDetails]: any = useState({
    tempOrderId: 0,
    orderId: 0,
    newOrderId: 0,
    source: "",
    orderType: "",
    eWayBillNo: "",
    gstNumber: "",
  });

  const [prevPastedData, setPrevPastedData] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleProductsDetails = (index?: any) => {
    setGlobalIndex(index === globalIndex ? null : index);
  };
  // const [boxDetails, setBoxDetails] = useState({
  //   deadWeight: 0,
  //   length: 0,
  //   breadth: 0,
  //   height: 0,
  //   volumetricWeight: 0,
  // });
  const [addressData, setAddressData]: any = useState([]);
  const [magicAddress, setMagicAddress]: any = useState("");
  const [deliveryMagicAddress, setDeliveryMagicAddress]: any = useState("");
  const [customLandmark, setCustomLandmark] = useState("");
  const [validationErrors, setValidationErrors] = useState<any>({
    name: null,
    mobileNo: null,
    emailId: null,
    alternateMobileNo: null,
  });

  const businessTypeDropDown: any = [
    {
      label: "",
      value: "",
    },
    {
      label: "Individual",
      value: "Individual",
    },
    {
      label: "Business",
      value: "Business",
    },
    {
      label: "Company",
      value: "Company",
    },
    {
      label: "Shopkeeper",
      value: "Shopkeeper",
    },
    {
      label: "Others",
      value: "Others",
    },
  ];

  const setValidationError = (fieldName: any, error: string | null) => {
    setValidationErrors((prevErrors: any) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  const validateMobileNo = (mobileNo: string) => {
    const numericValue = mobileNo.replace(/[^0-9]/g, "");
    if (numericValue.length === 10 || numericValue.length === 0) {
      return null;
    } else {
      return "Mobile number must be a 10-digit number";
    }
  };

  const validateEmailId = (emailId: string) => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailId) || emailId === "") {
      return null;
    } else {
      return "Invalid email address";
    }
  };

  const measureUnits = [
    {
      label: "Cm",
      value: "Cm",
    },
  ];

  const addressType = [
    {
      label: "Pickup Address",
    },
    { label: "Delivery Address" },
  ];

  const dimesionBoxJsx = (data: any, identifier?: any, index?: any) => {
    const onChaneDimensionHandler = (e: any) => {
      const updatedProductDimensions = { ...productAndBoxDetails };
      if (identifier === "productDimensions") {
        updatedProductDimensions.products[index][e.target.name] =
          e.target.value;
        if (["length", "breadth", "height"].includes(e.target.name)) {
          updatedProductDimensions.products[index].volumetricWeight = +(
            (updatedProductDimensions.products[index]?.length *
              updatedProductDimensions.products[index]?.breadth *
              updatedProductDimensions.products[index]?.height) /
            5000
          ).toFixed(2);
        }
        updatedProductDimensions.products[index].appliedWeight = +Math.max(
          updatedProductDimensions?.products[index].deadWeight,
          updatedProductDimensions?.products[index].volumetricWeight
        );
      } else if (identifier === "boxDimensions") {
        updatedProductDimensions[e.target.name] = e.target.value;
        if (["length", "breadth", "height"].includes(e.target.name)) {
          updatedProductDimensions.volumetricWeight = +(
            (+updatedProductDimensions.length *
              +updatedProductDimensions.breadth *
              +updatedProductDimensions.height) /
            5000
          ).toFixed(2);
        }
        updatedProductDimensions.appliedWeight = +Math.max(
          updatedProductDimensions.deadWeight,
          updatedProductDimensions.volumetricWeight
        );
      }
      setProductAndBoxDetails(updatedProductDimensions);
    };

    return (
      <div className="flex min-w-[90%] border-2 rounded-br rounded-bl border-t-0 ">
        <div
          className="items-center flex flex-col gap-y-[1rem] justify-between my-5 w-[100%]"
          style={{
            boxShadow:
              "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
          }}
          // onClick={() => handleProductsDetails(index)}
        >
          <div className="flex justify-between w-[100%] gap-x-[2rem] px-[1rem]">
            <InputBox
              label="Dead Weight (Kg)"
              value={data?.deadWeight}
              name="deadWeight"
              inputType="text"
              inputMode="numeric"
              onChange={(e: any) => {
                if (!isNaN(e.target.value)) {
                  onChaneDimensionHandler(e);
                }
              }}
            />
            <InputBox
              label="Volumetric Weight"
              value={data?.volumetricWeight}
              name="volumetricWeight"
              inputType="number"
              isDisabled={true}
            />
          </div>
          <div className="flex justify-between w-[100%] gap-x-[2rem] px-[1rem]">
            <div className="w-[50%]">
              <CustomDropDown onChange={() => {}} options={measureUnits} />
            </div>
            <div className="flex w-[50%] gap-x-4">
              <InputBox
                label="L"
                inputType="text"
                inputMode="numeric"
                name="length"
                value={data?.length}
                onChange={(e: any) => {
                  if (!isNaN(e.target.value)) {
                    onChaneDimensionHandler(e);
                  }
                }}
              />
              <InputBox
                label="B"
                value={data?.breadth}
                name="breadth"
                inputType="text"
                inputMode="numeric"
                onChange={(e: any) => {
                  if (!isNaN(e.target.value)) {
                    onChaneDimensionHandler(e);
                  }
                }}
              />
              <InputBox
                label="H"
                value={data?.height}
                name="height"
                inputType="text"
                inputMode="numeric"
                onChange={(e: any) => {
                  if (!isNaN(e.target.value)) {
                    onChaneDimensionHandler(e);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleBoxAccordion = () => {
    setGlobalIndex(globalIndex === -1 ? null : -1);
  };

  const handleLandmarkSelected = (landmark: string) => {
    setCustomLandmark(landmark);
  };

  const handleInputChange = (
    targetAddress: any,
    e: any,
    nestedObject?: any
  ) => {
    if (nestedObject) {
      setAddressData((prevData: any) => {
        return {
          ...prevData,
          [targetAddress]: {
            ...prevData[targetAddress],
            [nestedObject]: {
              ...prevData[targetAddress][nestedObject],
              [e.target.name]: e.target.value,
            },
          },
        };
      });
    } else {
      setAddressData((prevData: any) => {
        return {
          ...prevData,
          [targetAddress]: {
            ...prevData[targetAddress],
            [e.target.name]: e.target.value,
          },
        };
      });
    }
  };

  // const handleProductDimesions = (productId?: any, data?: any) => {
  //   productDimesions = productDetails;
  //   productDimesions = {
  //     ...productDimesions,
  //     [productId]: {
  //       ...productDimesions?.[productId],
  //       deadWeight: data?.deadWeight
  //         ? data?.deadWeight
  //         : productDimesions?.[productId]?.deadWeight,
  //       length: data?.length
  //         ? data?.length
  //         : productDimesions?.[productId]?.length,
  //       breadth: data?.breadth
  //         ? data?.breadth
  //         : productDimesions?.[productId]?.breadth,
  //       height: data?.height
  //         ? data?.height
  //         : productDimesions?.[productId]?.height,
  //     },
  //   };

  //   setProductDetails(productDimesions);
  // };

  // const updateVolumetricData = (productId: any) => {
  //   if (trigger) {
  //     setProductDetails((prevProductDetails: any) => {
  //       // Use the functional update form to ensure you have the latest state
  //       return {
  //         ...prevProductDetails,
  //         [productId]: {
  //           ...prevProductDetails?.[productId],
  //           // Compute volumetric weight and convert to fixed decimal
  //           volumetricWeight: (
  //             (prevProductDetails?.[productId]?.length *
  //               prevProductDetails?.[productId]?.breadth *
  //               prevProductDetails?.[productId]?.height) /
  //             5000
  //           ).toFixed(2),
  //         },
  //       };
  //     });
  //     setBoxDetails((prevBoxDetails: any) => {
  //       return {
  //         ...prevBoxDetails,
  //         volumetricWeight: (
  //           (prevBoxDetails?.length *
  //             prevBoxDetails?.breadth *
  //             prevBoxDetails.height) /
  //           5000
  //         ).toFixed(2),
  //       };
  //     });
  //     setTrigger(false);
  //   }
  // };

  // const handleBoxDimensions = (data: any) => {
  //   setBoxDetails((prevBoxDetails: any) => {
  //     return {
  //       ...prevBoxDetails,
  //       length: data?.length ? data?.length : boxDetails?.length,
  //       breadth: data?.breadth ? data?.breadth : boxDetails?.breadth,
  //       height: data?.height ? data?.height : boxDetails?.height,
  //       deadWeight: data?.deadWeight
  //         ? data?.deadWeight
  //         : boxDetails?.deadWeight,
  //     };
  //   });
  // };

  const updateProducts = async (isProcessOrder?: any) => {
    // if (isProcess) {
    !isProcessOrder && setUpdateButtonLoader(true);
    let payLoad = {
      boxDetails: [productAndBoxDetails],
      orderDetails: errorModalData?.orderDetails,
      category: errorModalData?.error,
    };

    const { data } = await POST(UPDATE_PRODUCT_AND_BOX_DETAILS, payLoad);
    if (data?.success) {
      toast.success(data?.message);
      if (!isProcessOrder) {
        setIsErrorModalOpen(false);
        setUpdateButtonLoader(false);
      }

      return true;
    } else {
      if (!isProcessOrder) {
        setUpdateButtonLoader(false);
        setIsErrorModalOpen(false);
      }
      return true;
    }
    // }
  };

  const handleService = (index: any) => {
    setServiceIndex(index);
  };

  const updateOrderDetails = async (isProcessOrder?: any) => {
    try {
      !isProcessOrder && setUpdateButtonLoader(true);
      const payload: any = {
        partnerServiceId: services[serviceIndex].partnerServiceId,
        partnerServiceName: services[serviceIndex].partnerServiceName,
        companyServiceId: services[serviceIndex].companyServiceId,
        companyServiceName: services[serviceIndex].companyServiceName,
        tempOrderId: errorModalData?.entityDetails?.tempOrderId,
        source: errorModalData?.entityDetails?.source,
        category: "Service",
      };
      const { data: responseData } = await POST(SET_SERVICE_INFO, payload);
      if (responseData?.success) {
        toast.success(responseData?.message);
        if (!isProcessOrder) {
          setUpdateButtonLoader(false);
          setIsErrorModalOpen(false);
        }
        return true;
      } else {
        toast.error(responseData?.message);
        if (!isProcessOrder) {
          setUpdateButtonLoader(false);
          setIsErrorModalOpen(false);
        }
        return false;
      }
    } catch (error: any) {
      toast.error(error?.message);
      if (!isProcessOrder) {
        setUpdateButtonLoader(false);
      }
      return false;
    }
  };

  const updateAddress = async (isProcessOrder?: any) => {
    try {
      let targetAddress = "";
      if (errorModalData.error === "Delivery Address") {
        targetAddress = "deliveryAddress";
      } else if (errorModalData.error === "Pickup Address") {
        targetAddress = "pickupAddress";
      }

      if (
        addressData[targetAddress]?.flatNo === "" ||
        addressData[targetAddress]?.country === "" ||
        addressData[targetAddress]?.state === "" ||
        addressData[targetAddress]?.city === "" ||
        addressData[targetAddress]?.locality === "" ||
        addressData[targetAddress]?.contact?.emailId === "" ||
        addressData[targetAddress]?.contact?.mobileNo === "" ||
        addressData[targetAddress]?.contact?.type === "" ||
        addressData[targetAddress]?.contact?.name === "" ||
        addressData[targetAddress]?.pincode === "" ||
        addressData[targetAddress]?.pincode === 0 ||
        addressData[targetAddress]?.landmark === ""
      ) {
        setInputError(true);
        return;
      }
      !isProcessOrder && setUpdateButtonLoader(true);

      let payload: any = {
        ...addressData,
        [targetAddress]: {
          ...addressData[targetAddress],
          pincode: +addressData[targetAddress]?.pincode,

          fullAddress: `${addressData[targetAddress]?.contact?.name} ${addressData[targetAddress]?.landmark} ${addressData[targetAddress]?.locality} ${addressData[targetAddress]?.city} ${addressData[targetAddress]?.state} ${addressData[targetAddress]?.country} ${addressData[targetAddress]?.pincode}`,
        },
        tempOrderDetails: [
          {
            orderId: addressData?.orderId,
            tempOrderId: addressData?.tempOrderId,
            source: addressData?.source,
          },
        ],
      };

      const { data: responseData } = await POST(
        UPDATE_TEMP_ORDER_ADDRESS,
        payload
      );
      if (responseData?.success) {
        toast.success(responseData?.message);
        if (!isProcessOrder) {
          setUpdateButtonLoader(false);
          setIsErrorModalOpen(false);
        }
        return true;
      } else {
        toast.error(responseData?.message);
        if (!isProcessOrder) {
          setUpdateButtonLoader(false);
          setIsErrorModalOpen(false);
        }
        return false;
      }
    } catch (error: any) {
      toast.error(error?.message);
      if (!isProcessOrder) {
        setUpdateButtonLoader(false);
        setIsErrorModalOpen(false);
      }
      return false;
    }
  };

  const getVerifyAddress = async (
    verifyAddressPayload: any,
    targetAddress: any
  ) => {
    try {
      setIsAddressLoading(true);

      const { data: verifyAddressResponse } = await POST(
        VERIFY_ADDRESS,
        verifyAddressPayload
      );

      if (verifyAddressResponse?.success) {
        const parsedData = verifyAddressResponse?.data?.message;

        let tempData = {};
        tempData = { ...addressData[targetAddress] };

        tempData = {
          ...tempData,
          flatNo:
            `${parsedData.house_number} ${parsedData.floor} ${parsedData.building_name}` ||
            "",
          fullAddress: parsedData.full_address || "",
          locality: parsedData.locality_name || "",
          sector: parsedData.locality_name || "",
          landmark: parsedData.landmark,
          pincode: parsedData.pincode || "",
          city: parsedData.city_name || "",
          state: capitalizeFirstLetter(parsedData.state_name) || "",
          country: parsedData.country_name || "India",
        };

        setAddressData((prevData: any) => {
          const newData = { ...prevData };

          // const addressIndex = newData.findIndex(
          //   (item) => item.label === addressLabel
          // );
          newData[targetAddress] = tempData;

          return newData;
        });
      }

      // if (addressLabel === "Pickup Address") {
      //   setPickupMagicAddress("");
      // } else {
      //   setDeliveryMagicAddress("");
      // }
      setMagicAddress("");

      setIsAddressLoading(false);
    } catch (error) {
      setIsAddressLoading(false);
      return error;
    }
  };

  const handleButtonClick = (targetAddress: any) => {
    const trimmedData = magicAddress;

    let verifyAddressPayload = {
      data: "",
    };

    verifyAddressPayload.data = magicAddress;

    if (
      !isAddressLoading &&
      trimmedData !== ""
      //  &&
      // trimmedData !== prevPastedData
    ) {
      getVerifyAddress(verifyAddressPayload, targetAddress);
      setPrevPastedData(trimmedData);
    }
  };

  const UpdateOrderIdAndEWayBillInfo = async (isProcessOrder?: any) => {
    try {
      !isProcessOrder && setUpdateButtonLoader(true);

      if (errorModalData.orderDetails === "GST Number Errors") return;

      let payload: any = {
        eWayBillError: {
          eWayBillNo: otherErrorDetails?.eWayBillNo,
          orderId: otherErrorDetails?.orderId,
          tempOrderId: otherErrorDetails?.tempOrderId,
        },
      };

      if (errorModalData.orderDetails === "Duplicate Order Id Errors") {
        payload = {
          orderIdError: {
            newOrderId: otherErrorDetails?.newOrderId,
            orderId: otherErrorDetails?.orderId,
            tempOrderId: otherErrorDetails?.tempOrderId,
          },
        };
      }

      // if (errorModalData.orderDetails === "Duplicate Order Id Errors ") {
      //   payload = {
      //     orderIdError: {
      //       newOrderId: "",
      //       orderId: otherErrorDetails?.orderId,
      //       tempOrderId: otherErrorDetails?.tempOrderId,
      //     },
      //   };
      // }

      const { data: responseData } = await POST(
        UPDATE_OTHER_ORDER_DETAILS,
        payload
      );

      if (responseData?.success) {
        toast.success(responseData?.message);
        if (!isProcessOrder) {
          setUpdateButtonLoader(false);
          setIsErrorModalOpen(false);
        }
        return true;
      } else {
        toast.error(responseData?.message);
        if (!isProcessOrder) {
          setUpdateButtonLoader(false);
          setIsErrorModalOpen(false);
        }
        return false;
      }
    } catch (error: any) {
      toast.error(error?.message);
      if (!isProcessOrder) {
        setUpdateButtonLoader(false);
      }
      return false;
    }
  };

  const switchConditions = () => {
    switch (errorModalData.error) {
      case orderErrorCategoryENUMs["Box And Product"]: {
        return (
          <div>
            <div className="border-2 m-[1rem] rounded-md  overflow-auto max-h-[55vh] shadow-md">
              {productAndBoxDetails &&
                productAndBoxDetails?.products?.map((data: any, index: any) => {
                  return (
                    <div key={index} className="m-[0.5rem] my-[1rem] bg-white">
                      <div className="flex min-w-[90%]">
                        <div
                          className="items-center cursor-pointer flex border-2 rounded-md w-[100%] justify-between"
                          style={{
                            boxShadow:
                              "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
                          }}
                          onClick={() => handleProductsDetails(index)}
                        >
                          <div className="flex items-center w-[90%]">
                            <div className="p-3.5 flex justify-center items-center">
                              <img src={ItemIcon} className="" alt="" />
                            </div>
                            <div className="max-w-[80%] line-clamp-1">
                              {" "}
                              <b>{capitalizeFirstLetter(data?.name)} </b>
                            </div>
                          </div>
                          <div className="mr-[1rem]">
                            <img
                              className={`${
                                index === globalIndex && "rotate-180"
                              }`}
                              src={DownArrowIcon}
                            />
                          </div>
                        </div>
                      </div>
                      {index === globalIndex &&
                        dimesionBoxJsx(data, "productDimensions", index)}
                    </div>
                  );
                })}
            </div>
            <div className="m-[1rem] mt-[1rem]">
              {
                productAndBoxDetails && (
                  // productAndBoxDetails??.map(
                  //   (boxDimensionDetail: any, index: any) => {
                  //     return (
                  <div>
                    <div className="flex min-w-[90%]">
                      <div
                        className="items-center flex border-2 rounded-md w-[100%] cursor-pointer justify-between"
                        style={{
                          boxShadow:
                            "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
                        }}
                        onClick={handleBoxAccordion}
                      >
                        <div className="flex items-center ml-[0.5rem]">
                          <div className="p-3.5 flex justify-center items-center">
                            <img src={BoxIcon} className="w-[40px]" />
                          </div>
                          <div>
                            <b>Box</b>
                          </div>
                        </div>
                        <div className="mr-6">
                          <img src={DownArrowIcon} />
                        </div>
                      </div>
                    </div>
                    {globalIndex === -1 &&
                      dimesionBoxJsx(productAndBoxDetails, "boxDimensions")}
                  </div>
                )
                //     );
                //   }
                // )
              }
            </div>
          </div>
        );
      }
      case orderErrorCategoryENUMs["Delivery Address"]:
      case orderErrorCategoryENUMs["Pickup Address"]: {
        let targetAddress = "";
        if (errorModalData.error === "Delivery Address") {
          targetAddress = "deliveryAddress";
        } else if (errorModalData.error === "Pickup Address") {
          targetAddress = "pickupAddress";
        }

        return (
          <div className="mx-4 my-10">
            {/* {pickupAddress.length > 0 && */}
            {/* addressData?.map((address: any, index: any) => {
                return ( */}
            <div>
              <div className="m-[0.5rem] my-[1rem] bg-white">
                <div className="flex min-w-[90%] ">
                  <div
                    className="items-center flex border-2 rounded-md w-[100%] justify-between p-2 cursor-pointer"
                    style={{
                      boxShadow:
                        "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
                    }}
                    onClick={() => handleProductsDetails()}
                  >
                    <div className="flex items-center gap-x-2 ">
                      <img src={LocationIcon} width="40px" />
                      <p>
                        <b>{errorModalData.error}</b>
                      </p>
                    </div>
                    {/* <div className="mr-2">
                      <img
                        src={DownArrowIcon}
                        className={`${
                          globalIndex === index ? "rotate-180" : ""
                        }`}
                      />
                    </div> */}
                  </div>
                </div>
                <div className="border-2 border-t-0">
                  {/* {globalIndex === index && ( */}
                  <div className="p-[1rem]">
                    <div className="bg-white rounded-lg border border-black overflow-hidden shadow-lg relative">
                      <div className="bg-black text-white p-4 h-1/3 flex items-center gap-x-2">
                        <img
                          src={MagicLocationIcon}
                          alt="Magic Location Icon"
                        />
                        <div className="text-white text-[12px] font-Open">
                          Magic Address
                        </div>
                      </div>

                      <div className="relative h-[75px]  ">
                        <input
                          ref={inputRef}
                          type="text"
                          value={magicAddress}
                          // onKeyDown={}
                          onChange={(e: any) => {
                            setMagicAddress(e.target.value);
                          }}
                          className="magicAddressInput w-full removePaddingPlaceHolder"
                          style={{
                            position: "absolute",
                            border: "none",
                          }}
                          placeholder="Paste Address for the Magic"
                          title=""
                        />
                        <div>
                          <div className="absolute right-[1%] top-[70%] transform -translate-y-1/2 cursor-pointer">
                            {isAddressLoading ? (
                              <div className="flex justify-center items-center mr-3">
                                <Spinner />
                              </div>
                            ) : (
                              <img
                                src={AiIcon}
                                alt="Arrow"
                                onClick={() => handleButtonClick(targetAddress)}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5">
                      <InputBox
                        label="Plot No., Floor, Building Name"
                        value={capitalizeFirstLetter(
                          addressData?.[targetAddress]?.flatNo
                        )}
                        name="flatNo"
                        onChange={(e: any) =>
                          handleInputChange(targetAddress, e)
                        }
                        inputError={inputError}
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex mt-[1rem] gap-[1rem]">
                        <InputBox
                          label="Country"
                          value={capitalizeFirstLetter(
                            addressData?.[targetAddress]?.country
                          )}
                          name="country"
                          onChange={(e: any) =>
                            handleInputChange(targetAddress, e)
                          }
                          inputError={inputError}
                        />

                        <CustomDropDown
                          value={capitalizeFirstLetter(
                            addressData?.[targetAddress]?.state
                          )}
                          name="state"
                          onChange={(e: any) =>
                            handleInputChange(targetAddress, e)
                          }
                          options={dummyStateDropdownData}
                          placeHolder="Select State"
                          wrapperClass="w-[100%]"
                          inputError={inputError}
                        />
                      </div>
                      <div className="flex mt-[1rem] gap-[1rem]">
                        <InputBox
                          label="City"
                          value={capitalizeFirstLetter(
                            addressData?.[targetAddress]?.city
                          )}
                          name="city"
                          onChange={(e: any) =>
                            handleInputChange(targetAddress, e)
                          }
                          inputError={inputError}
                        />
                        <InputBox
                          label="Locality"
                          value={capitalizeFirstLetter(
                            addressData?.[targetAddress]?.locality
                          )}
                          name="locality"
                          onChange={(e: any) =>
                            handleInputChange(targetAddress, e)
                          }
                          inputError={inputError}
                        />
                      </div>

                      <div className="flex mt-[1rem] gap-[1rem]">
                        <div className="w-[100%]">
                          <InputBox
                            inputType="email"
                            label="Email ID (optional)"
                            name="emailId"
                            value={
                              addressData?.[targetAddress]?.contact?.emailId ||
                              ""
                            }
                            onChange={(e: any) => {
                              const emailValue = e.target.value;
                              handleInputChange(targetAddress, e, "contact");
                              setValidationError(
                                "emailId",
                                validateEmailId(emailValue)
                              );
                              setInputError(false);
                            }}
                            inputError={inputError}
                          />
                          {/* {inputError && validationErrors.emailId && (
                            <div className="flex items-center gap-x-1 mt-1">
                              <img
                                src={InfoCircle}
                                alt=""
                                width={10}
                                height={10}
                              />
                              <span className="font-normal text-[#F35838] text-xs leading-3">
                                {validationErrors.emailId}
                              </span>
                            </div>
                          )} */}
                        </div>

                        <div className="w-[100%]">
                          <InputBox
                            label="Contact Number"
                            name="mobileNo"
                            inputType="text"
                            inputMode="numeric"
                            maxLength={10}
                            inputError={inputError}
                            value={
                              addressData?.[targetAddress]?.contact?.mobileNo ||
                              ""
                            }
                            onChange={(e) => {
                              const numericValue = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                              );
                              handleInputChange(targetAddress, e, "contact");
                              setValidationError(
                                "mobileNo",
                                validateMobileNo(numericValue)
                              );
                              if (setInputError) {
                                setInputError(false);
                              }
                            }}
                            className="w-[100%]"
                          />
                        </div>
                      </div>

                      <div className="flex mt-[1rem] gap-[1rem]">
                        <CustomDropDown
                          value={
                            businessTypeDropDown
                              .map((valueObj: any) => valueObj?.value)
                              .includes(
                                capitalizeFirstLetter(
                                  addressData?.[targetAddress]?.contact?.type
                                )
                              )
                              ? capitalizeFirstLetter(
                                  addressData?.[targetAddress]?.contact?.type
                                )
                              : "Others"
                          }
                          name="type"
                          onChange={(e: any) =>
                            handleInputChange(targetAddress, e, "contact")
                          }
                          options={businessTypeDropDown}
                          placeHolder="Select Business Type"
                          wrapperClass="w-[100%]"
                          inputError={inputError}
                        />

                        <div className="w-[100%]">
                          <InputBox
                            label="Name of the Contact Person"
                            name="name"
                            value={
                              addressData?.[targetAddress]?.contact?.name || ""
                            }
                            onChange={(e) => {
                              handleInputChange(targetAddress, e, "contact");
                            }}
                            className="w-[100%]"
                            inputError={inputError}
                          />
                        </div>
                      </div>

                      <div className="flex mt-[1rem] gap-[1rem] ">
                        <InputBox
                          label="Pincode"
                          value={addressData?.[targetAddress]?.pincode}
                          name="pincode"
                          onChange={(e: any) =>
                            handleInputChange(targetAddress, e)
                          }
                          inputError={inputError}
                        />

                        <InputBox
                          label="Select Landmark"
                          value={capitalizeFirstLetter(
                            addressData?.[targetAddress]?.landmark
                          )}
                          name="landmark"
                          onChange={(e: any) =>
                            handleInputChange(targetAddress, e)
                          }
                          inputError={inputError}
                        />
                      </div>
                    </div>
                  </div>
                  {/* )} */}
                </div>
              </div>
            </div>
            {/* );
              }) */}
            {/* } */}
          </div>
        );
      }
      case orderErrorCategoryENUMs["Service"]: {
        return (
          <>
            <div className=" mx-[1rem] mt-6">
              <div className="m-[0.5rem] my-[1rem] bg-white">
                <div className="flex min-w-[90%]">
                  <div
                    className="items-center flex border-2 rounded-md w-[100%] cursor-pointer justify-between"
                    style={{
                      boxShadow:
                        "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
                    }}
                    onClick={() => handleProductsDetails(-2)}
                  >
                    <div className="flex items-center w-[90%]">
                      <div className="p-3.5 flex justify-center items-center">
                        <img src={VanIcon} className="w-[40px]" alt="" />
                      </div>
                      <div className="max-w-[80%] line-clamp-1">
                        <b>Courier Partners</b>
                        {/* <b>{capitalizeFirstLetter(data?.name)} </b> */}
                      </div>
                    </div>
                    <div className={"w-[10%]"}>
                      {serviceDropDownLoader ? (
                        <div className="flex justify-center w-[50%] items-center">
                          <Spinner />
                        </div>
                      ) : (
                        <>
                          {services.length > 0 && (
                            <img
                              src={DownArrowIcon}
                              className={`${
                                globalIndex === -2 ? "rotate-180" : "rotate"
                              }`}
                            />
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {services.length > 0 ? (
                  globalIndex === -2 && (
                    <div className=" overflow-auto max-h-[80vh]">
                      {services.map((service: any, index: any) => {
                        return (
                          <div
                            className={`flex  cursor-pointer min-w-[90%] border-2 rounded-br rounded-bl border-t-0`}
                            onClick={() => handleService(index)}
                          >
                            <div
                              className="flex flex-col items-center gap-y-[1rem] my-5 w-[100%]"
                              style={{
                                boxShadow:
                                  "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
                              }}
                              // onClick={() => handleProductsDetails(index)}
                            >
                              <div
                                className="flex items-center mx-[2rem] max-w-[90%] min-w-[90%]  "
                                style={{
                                  justifyContent: "space-between",
                                  marginRight: "1rem",
                                }}
                              >
                                <div
                                  className={`flex gap-x-4 ${
                                    index === serviceIndex && "font-semibold"
                                  }`}
                                >
                                  {index === serviceIndex && (
                                    <img src={VanIcon} />
                                  )}
                                  {capitalizeFirstLetter(service.partnerName) +
                                    " " +
                                    capitalizeFirstLetter(service.serviceMode)}
                                </div>
                                <div>{service.total}</div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )
                ) : (
                  <>
                    {!serviceDropDownLoader && (
                      <p className="flex justify-center items-center text-[18px] font-semibold h-[30vh] mx-1">
                        NO SERVICE FOUND
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          </>
        );
      }
      case orderErrorCategoryENUMs["Others"]: {
        return (
          <div className="mx-4 my-2 ">
            <div className="my-[2rem]">
              {errorModalData.orderDetails === "Duplicate Order Id Errors" && (
                <div>
                  <InputBox
                    isRightIcon={true}
                    containerStyle=""
                    rightIcon={AutoGenerateIcon}
                    className="w-full !text-base !font-semibold"
                    imageClassName="!h-[12px] !w-[113px] !top-[40%] "
                    value={otherErrorDetails?.newOrderId}
                    maxLength={12}
                    label="Order ID"
                    onChange={(e: any) => {
                      setOtherErrorDetails((prevState: any) => {
                        return {
                          ...prevState,
                          newOrderId: e.target.value,
                        };
                      });
                    }}
                    onClick={() => {
                      const newOrderId = generateUniqueCode(8, 12);
                      setOtherErrorDetails((prevState: any) => {
                        return {
                          ...prevState,
                          newOrderId: newOrderId,
                        };
                      });
                    }}
                    visibility={true}
                    setVisibility={() => {}}
                  />
                </div>
              )}
            </div>
            {errorModalData.orderDetails === "EWayBill Errors" && (
              <div className="my-[2rem]">
                <InputBox
                  label="Enter Eway Bill No"
                  name="eWayBillNo"
                  value={otherErrorDetails?.eWayBillNo}
                  inputType="text"
                  inputMode="numeric"
                  onChange={(e: any) => {
                    if (!isNaN(e.target.value)) {
                      setOtherErrorDetails((prevState: any) => {
                        return {
                          ...prevState,
                          eWayBillNo: e.target.value,
                        };
                      });
                    }
                  }}
                />
              </div>
            )}
            {errorModalData.orderDetails === "GST Number Errors" && (
              <div className="my-[2rem]">
                <InputBox
                  label="GST Number"
                  name="gstNumber"
                  value={otherErrorDetails?.gstNumber}
                  inputType="text"
                  inputMode="numeric"
                  onChange={(e: any) => {
                    if (!isNaN(e.target.value)) {
                      setOtherErrorDetails((prevState: any) => {
                        return {
                          ...prevState,
                          gstNumber: e.target.value,
                        };
                      });
                    }
                  }}
                />
              </div>
            )}
          </div>
        );
      }
    }
  };

  const getService = async () => {
    setServiceDropDownLoader(true);
    const { data } = await POST(GET_SERVICE_LIST_ORDER, {
      tempOrderId: errorModalData?.entityDetails?.tempOrderId,
      source: errorModalData?.entityDetails?.source,
    });
    if (data?.success) {
      setServiceDropDownLoader(false);
      setService(data?.data);
    } else {
      setServiceDropDownLoader(false);
      toast.error(data?.message);
    }
  };

  const switchForValidation = () => {
    switch (errorModalData?.error) {
      case orderErrorCategoryENUMs["Box And Product"]: {
        const dimensions = ["length", "breadth", "height", "deadWeight"];

        for (const dimension of dimensions) {
          if (
            !productAndBoxDetails?.[dimension] ||
            productAndBoxDetails?.[dimension] == 0
          ) {
            for (let i = 0; i < productAndBoxDetails?.products?.length; i++) {
              if (
                productAndBoxDetails?.products[i]?.dimension ||
                productAndBoxDetails?.products[i]?.dimension == 0
              ) {
                return false;
              }
            }
            return false;
          }
        }
        return true;
      }
      case orderErrorCategoryENUMs["Service"]: {
        if (services.length === 0) {
          return false;
        }
        return true;
      }
      case orderErrorCategoryENUMs["Others"]: {
        if (
          !otherErrorDetails?.orderId &&
          errorModalData?.orderDetails === "Duplicate Order Id Errors"
        ) {
          return false;
        }
        if (
          !otherErrorDetails?.eWayBillNo &&
          errorModalData?.orderDetails === "EWayBill Errors"
        ) {
          return false;
        }
        if (
          !otherErrorDetails?.gstNumber &&
          errorModalData?.orderDetails === "GST Number Errors"
        ) {
          return false;
        }
        return true;
      }
      default:
        return true;
    }
  };

  // const UpdateProductHandler = () =>{

  // }

  const switchForUpdateActions = async (isProcessOrder?: any) => {
    let result: any = false;

    setIsProcessOrderCall(isProcessOrder);
    switch (errorModalData?.error) {
      case orderErrorCategoryENUMs["Box And Product"]: {
        if (!isProcess) {
          const totalProductAppliedWeight =
            productAndBoxDetails?.products.reduce(
              (acc: any, obj: any) => acc + obj.appliedWeight,
              0
            );

          if (
            totalProductAppliedWeight >
              productAndBoxDetails?.volumetricWeight &&
            !isProcess
          ) {
            setAlertMessage(true);
            return false;
          }
        }

        // console.log("updateProducts", await updateProducts(isProcessOrder));
        result = await updateProducts(isProcessOrder);

        return result;
        break;
      }
      case orderErrorCategoryENUMs["Service"]: {
        return updateOrderDetails(isProcessOrder);
      }
      case orderErrorCategoryENUMs["Delivery Address"]:
      case orderErrorCategoryENUMs["Pickup Address"]: {
        return updateAddress(isProcessOrder);
      }
      case orderErrorCategoryENUMs["Others"]: {
        return UpdateOrderIdAndEWayBillInfo(isProcessOrder);
      }
    }
    return result;
  };

  const processOrder = async () => {
    try {
      setProcessOrderLoader(true);
      const isReadyForprocess: any = await switchForUpdateActions(true);

      if (!isReadyForprocess) {
        setProcessOrderLoader(false);
      }

      const orderDetails: any = {
        orders: [],
      };

      if (errorModalData?.error === "Box And Product") {
        errorModalData?.orderDetails.map((data: any) =>
          orderDetails?.orders?.push({
            tempOrderId: data?.tempOrderId,
            source: data?.source,
            orderId: data?.orderId,
          })
        );
      } else {
        orderDetails?.orders.push({
          tempOrderId: errorModalData?.entityDetails?.tempOrderId,
          source: errorModalData?.entityDetails?.source,
          orderId: errorModalData?.entityDetails?.orderId,
        });
      }

      if (isReadyForprocess) {
        const { data } = await POST(POST_PLACE_ALL_ORDERS, orderDetails);
        if (data?.success) {
          toast.success(data?.message);
          setProcessOrderLoader(false);
          setIsErrorModalOpen(false);
        } else {
          toast.error(data?.success);
          setProcessOrderLoader(false);
        }
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const switchForUpdateActionsName = () => {
    switch (errorModalData?.error) {
      case orderErrorCategoryENUMs["Box And Product"]: {
        return "Update Details";
      }
      case orderErrorCategoryENUMs["Service"]: {
        return "Update Service";
      }
      case orderErrorCategoryENUMs["Delivery Address"]:
      case orderErrorCategoryENUMs["Pickup Address"]: {
        return "Update Address";
      }
      case orderErrorCategoryENUMs["Others"]: {
        return "Update Others";
      }
    }
  };

  useEffect(() => {
    if (errorModalData.error === orderErrorCategoryENUMs["Box And Product"]) {
      setProductAndBoxDetails(errorModalData?.entityDetails?.[0]);
    }
  }, [errorModalData]);

  useEffect(() => {
    if (
      errorModalData.error === orderErrorCategoryENUMs["Delivery Address"] ||
      errorModalData.error === orderErrorCategoryENUMs["Pickup Address"]
    ) {
      const data: any = errorModalData?.entityDetails;
      setAddressData(data);
    }
  }, [errorModalData]);

  useEffect(() => {
    if (errorModalData.error === orderErrorCategoryENUMs["Service"]) {
      getService();
      handleProductsDetails(-2);
    }
  }, [errorModalData]);

  useEffect(() => {
    if (errorModalData.error === orderErrorCategoryENUMs["Others"]) {
      setOtherErrorDetails({
        orderId: errorModalData?.entityDetails?.orderId,
        tempOrderId: errorModalData?.entityDetails?.tempOrderId,
        source: errorModalData?.entityDetails?.source,
        orderType: errorModalData?.entityDetails?.orderType,
        eWayBillNo: errorModalData?.entityDetails?.eWayBillNo || "",
      });
    }
  }, [errorModalData]);

  useEffect(() => {
    switchForValidation();
  }, [addressData]);

  useEffect(() => {
    if (isProcess) {
      if (isProcessOrderCall) {
        processOrder();
      } else {
        switchForUpdateActions(false);
      }
    }
  }, [isProcess]);

  return (
    <div className="overflow-h-auto max-h-[90vh]">
      <div className="flex mt-[1rem] mb-[1rem] rounded-lg mx-[0.5rem] h-[3rem] items-center px-[1rem] text-[1.2rem]">
        <div className="flex w-[100%] justify-between ">
          <div className="flex gap-x-2 justify-center items-center ">
            <img src={SampleProduct} className="w-[50px] mr-1" />
            <div className="flex flex-col ">
              <p className="text-[25px]">{errorModalData?.error} </p>
              {errorModalData?.error !== "Box And Product" && (
                <div className="flex">
                  <p className="flex justify-center items-center text-[14px] font-medium">
                    Shipyaari Id : {"("}
                    {errorModalData?.entityDetails?.tempOrderId}
                    {")"}
                  </p>
                  <p className="flex justify-center items-center mx-2 text-[14px] font-medium">
                    Order Id : {"("}
                    {errorModalData?.entityDetails?.orderId}
                    {")"}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div
            className="flex justify-self-end cursor-pointer"
            onClick={() => setIsErrorModalOpen(false)}
          >
            <img src={CloseIcon} width="30px" />
          </div>
        </div>
      </div>
      {switchConditions()}
      <div
        style={{
          boxShadow:
            "0px -4px 6px -1px rgba(133, 133, 133, 0.1), 0px -2px 4px -1px rgba(133, 133, 133, 0.06), 0px 6px 13px 0px rgba(133, 133, 133, 0.1)",
        }}
        className="absolute bottom-0 w-full flex shadow-lg border-[1px] bg-[#FFFFFF] gap-[32px] p-[24px] rounded-tr-[24px] rounded-tl-[24px] "
      >
        {updateButtonLoader ? (
          <div className="flex justify-center w-[50%] items-center">
            <Spinner />
          </div>
        ) : (
          <div
            className={`flex w-[50%] items-center justify-center border-2 rounded-md bg-black text-white
          ${switchForValidation() ? "bg-black cursor-pointer" : "bg-[#D2D2D2]"}
            py-2`}
            onClick={() => {
              if (switchForValidation()) switchForUpdateActions(false);
            }}
            //
          >
            {switchForUpdateActionsName()}
          </div>
        )}

        {processOrderLoader ? (
          <div className="flex justify-center w-[50%] items-center">
            <Spinner />
          </div>
        ) : (
          <div
            className={`flex w-[50%] items-center justify-center border-2 rounded-md bg-black  text-white 
            ${
              switchForValidation() ? "bg-black cursor-pointer" : "bg-[#D2D2D2]"
            }
            py-2`}
            onClick={() => {
              if (switchForValidation()) processOrder();
            }}
          >
            Process Order
          </div>
        )}
      </div>
      <CustomeBottomModal
        isOpen={showAlertMessage}
        onRequestClose={() => setAlertMessage(false)}
        overlayClassName="flex p-5 items-center outline-none z-[99]"
        className="!w-[600px] !px-4 !py-6"
      >
        <div className="flex justify-end cursor-pointer">
          <img src={CloseIcon} alt="" onClick={() => setAlertMessage(false)} />
        </div>
        <div className="flex justify-center">
          <img src={DeleteGif} alt="" />
        </div>
        <div className="px-16 ">
          <p className=" text-base   lg:text-lg font-semibold  text-center">
            Weight Of Products Should be always Greater then Box Volumetric
            weight
          </p>
          <p className=" text-base   lg:text-lg font-semibold  text-center">
            Are You Sure You Want To Proceed ?
          </p>
          <div className="flex justify-center gap-x-6 my-6">
            <button
              onClick={() => {
                setIsProcess(false);
                setAlertMessage(false);
              }}
              type="submit"
              className="bg-white border-2 border-[#A4A4A4] text-[#1C1C1C] px-4 py-2 text-sm font-semibold rounded shadow-md"
            >
              No
            </button>
            <button
              type="submit"
              className=" bg-[#1C1C1C] text-white px-5 py-[10px] text-sm font-semibold rounded shadow-md hover:shadow-lg"
              onClick={() => {
                setIsProcess(true);
                setAlertMessage(false);
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </CustomeBottomModal>
    </div>
  );
};

export default ErrorModal;
