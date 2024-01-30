import SampleProduct from "../../assets/SampleProduct.svg";
import CloseIcon from "../../assets/CloseIcon.svg";
import InputBox from "../../components/Input";
import ItemIcon from "../../assets/Product/Item.svg";
import DownArrowIcon from "../../assets/Filter/downArrow.svg";
import BoxIcon from "../../assets/layer.svg";
import VanIcon from "../../assets/vanWithoutBG.svg";
import {
  capitalizeFirstLetter,
  orderErrorsEnum,
  orderErrorCategoryENUMs,
} from "../../utils/utility";
import { useEffect, useRef, useState } from "react";
import CustomDropDown from "../../components/DropDown";
import { Spinner } from "../../components/Spinner";
import MagicLocationIcon from "../../assets/PickUp/magicLocation.svg";
import CustomInputWithDropDown from "../../components/LandmarkDropdown/LandmarkDropdown";
import AiIcon from "../../assets/Buttons.svg";
import LocationIcon from "../../assets/Location.svg";
import {
  GET_SERVICE_LIST_ORDER,
  POST_PLACE_ALL_ORDERS,
  SET_SERVICE_INFO,
  UPDATE_PRODUCT_AND_BOX_DETAILS,
  UPDATE_TEMP_ORDER_ADDRESS,
  VERIFY_ADDRESS,
} from "../../utils/ApiUrls";
import { POST } from "../../utils/webService";
import { toast } from "react-toastify";
import { dummyStateDropdownData } from "../../utils/dummyData";

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
  const [prevPastedData, setPrevPastedData] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleProductsDetails = (index?: any) => {
    setGlobalIndex(index === globalIndex ? null : index);
  };
  const [boxDetails, setBoxDetails] = useState({
    deadWeight: 0,
    length: 0,
    breadth: 0,
    height: 0,
    volumetricWeight: 0,
  });

  const [addressData, setAddressData]: any = useState([]);

  const [pickupMagicAddress, setPickupMagicAddress]: any = useState("");
  const [deliveryMagicAddress, setDeliveryMagicAddress]: any = useState("");
  const [customLandmark, setCustomLandmark] = useState("");

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
          +e.target.value;
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
        updatedProductDimensions[e.target.name] = +e.target.value;
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
                value={data?.length}
                name="length"
                inputType="text"
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

  const handleInputChange = (label: any, e: any) => {
    setAddressData((prevAddresses: any) => {
      return prevAddresses.map((address: any) => {
        if (address.label === label) {
          return {
            ...address,
            address: {
              ...address.address,
              [e.target.name]: e.target.value,
            },
          };
        }
        return address;
      });
    });
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
      !isProcessOrder && setUpdateButtonLoader(true);

      let payload: any = {
        ...errorModalData?.entityDetails,
        pickupAddress: addressData?.[0]?.address,
        deliveryAddress: addressData?.[1]?.address,
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
    addressLabel: any
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
        if (addressLabel === "Pickup Address") {
          tempData = { ...addressData[0]?.address };
        } else {
          tempData = { ...addressData[1]?.address };
        }

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
          const newData = [...prevData];

          const addressIndex = newData.findIndex(
            (item) => item.label === addressLabel
          );
          newData[addressIndex].address = tempData;

          return newData;
        });
      }

      if (addressLabel === "Pickup Address") {
        setPickupMagicAddress("");
      } else {
        setDeliveryMagicAddress("");
      }

      setIsAddressLoading(false);
    } catch (error) {
      setIsAddressLoading(false);
      return error;
    }
  };

  const handleButtonClick = (addressLabel: any) => {
    const trimmedData =
      addressLabel === "Pickup Address"
        ? pickupMagicAddress.trim()
        : deliveryMagicAddress.trim();

    let verifyAddressPayload = {
      data: "",
    };

    if (addressLabel === "Pickup Address") {
      verifyAddressPayload.data = pickupMagicAddress;
    } else {
      verifyAddressPayload.data = deliveryMagicAddress;
    }

    if (
      !isAddressLoading &&
      trimmedData !== ""
      //  &&
      // trimmedData !== prevPastedData
    ) {
      getVerifyAddress(verifyAddressPayload, addressLabel);
      setPrevPastedData(trimmedData);
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
      case orderErrorCategoryENUMs["Address"]: {
        return (
          <div className="mx-4">
            {addressData.length > 0 &&
              addressData?.map((address: any, index: any) => {
                return (
                  <div className="border-2 mb-[1rem] bg-slate-50 overflow-auto max-h-[70vh]">
                    <div key={index} className="m-[0.5rem] my-[1rem] bg-white">
                      <div className="flex min-w-[90%] ">
                        <div
                          className="items-center flex border-2 rounded-md w-[100%] justify-between p-2 cursor-pointer"
                          style={{
                            boxShadow:
                              "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
                          }}
                          onClick={() => handleProductsDetails(index)}
                        >
                          <div className="flex items-center gap-x-2 ">
                            <img src={LocationIcon} width="40px" />
                            <p>
                              <b>{address.label}</b>
                            </p>
                          </div>
                          <div className="mr-2">
                            <img
                              src={DownArrowIcon}
                              className={`${
                                globalIndex === index ? "rotate-180" : ""
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className={` ${
                          globalIndex === index && "border-2 border-t-0"
                        }`}
                      >
                        {globalIndex === index && (
                          <div className="p-[1rem] ">
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
                                  value={
                                    address.label === "Pickup Address"
                                      ? pickupMagicAddress
                                      : deliveryMagicAddress
                                  }
                                  // onKeyDown={}
                                  onChange={(e: any) => {
                                    if (address.label === "Pickup Address") {
                                      setPickupMagicAddress(e.target.value);
                                    } else {
                                      setDeliveryMagicAddress(e.target.value);
                                    }
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
                                        onClick={() =>
                                          handleButtonClick(address.label)
                                        }
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
                                  address?.address?.flatNo
                                )}
                                name="flatNo"
                                onChange={(e: any) =>
                                  handleInputChange(address.label, e)
                                }
                              />
                            </div>
                            <div className="flex flex-col">
                              <div className="flex mt-[1rem] gap-[1rem]">
                                <InputBox
                                  label="Country"
                                  value={capitalizeFirstLetter(
                                    address?.address?.country
                                  )}
                                  name="country"
                                  onChange={(e: any) =>
                                    handleInputChange(address.label, e)
                                  }
                                />

                                <CustomDropDown
                                  value={capitalizeFirstLetter(
                                    address?.address?.state
                                  )}
                                  name="state"
                                  onChange={(e: any) =>
                                    handleInputChange(address.label, e)
                                  }
                                  options={dummyStateDropdownData}
                                  placeHolder="Select State"
                                  wrapperClass="w-[100%]"
                                />
                              </div>
                              <div className="flex mt-[1rem] gap-[1rem]">
                                <InputBox
                                  label="City"
                                  value={capitalizeFirstLetter(
                                    address?.address?.city
                                  )}
                                  name="city"
                                  onChange={(e: any) =>
                                    handleInputChange(address.label, e)
                                  }
                                />
                                <InputBox
                                  label="Locality"
                                  value={capitalizeFirstLetter(
                                    address?.address?.locality
                                  )}
                                  name="locality"
                                  onChange={(e: any) =>
                                    handleInputChange(address.label, e)
                                  }
                                />
                              </div>
                              <div className="flex mt-[1rem] gap-[1rem] ">
                                <InputBox
                                  label="Pincode"
                                  value={address?.address?.pincode}
                                  name="pincode"
                                  onChange={(e: any) =>
                                    handleInputChange(address.label, e)
                                  }
                                />
                                {/* <div className="mb-4 lg:mb-6 lg:mr-6 ">
                                  <CustomInputWithDropDown
                                    pastedData={address?.address?.landmark}
                                    value={address?.address?.landmark}
                                    handlePickupAddressChange={(e: any) =>
                                      handleInputChange(address.label, e)
                                    }
                                    handleLandmarkSelected={
                                      handleLandmarkSelected
                                    }
                                    // inputError={inputError}
                                  />
                                </div> */}

                                <InputBox
                                  label="Select Landmark"
                                  value={capitalizeFirstLetter(
                                    address?.address?.landmark
                                  )}
                                  name="landmark"
                                  onChange={(e: any) =>
                                    handleInputChange(address.label, e)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        );
      }
      case orderErrorCategoryENUMs["Service"]: {
        return (
          <>
            <div className="border-2 m-[1rem] bg-slate-50 overflow-auto max-h-[80vh]">
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
                    <div className=" w-[10%]">
                      {serviceDropDownLoader ? (
                        <div className="flex justify-center w-[50%] items-center">
                          <Spinner />
                        </div>
                      ) : (
                        <img
                          src={DownArrowIcon}
                          className={`${
                            globalIndex === -2 ? "rotate-180" : "rotate"
                          }`}
                        />
                      )}
                    </div>
                  </div>
                </div>
                {globalIndex === -2 && (
                  <div>
                    {services.map((service: any, index: any) => {
                      return (
                        <div
                          className={`flex  cursor-pointer min-w-[90%] border-2 rounded-br rounded-bl border-t-0 `}
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
                )}
              </div>
            </div>
          </>
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
    }
  };

  const switchForUpdateActions = (isProcessOrder?: any) => {
    switch (errorModalData?.error) {
      case orderErrorCategoryENUMs["Box And Product"]: {
        return updateProducts(isProcessOrder);
      }
      case orderErrorCategoryENUMs["Service"]: {
        return updateOrderDetails(isProcessOrder);
      }
      case orderErrorCategoryENUMs["Address"]: {
        return updateAddress(isProcessOrder);
      }
    }
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
          })
        );
      } else {
        orderDetails?.orders.push({
          tempOrderId: errorModalData?.entityDetails?.tempOrderId,
          source: errorModalData?.entityDetails?.source,
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
      case orderErrorCategoryENUMs["Address"]: {
        return "Update Address";
      }
    }
  };

  useEffect(() => {
    if (errorModalData.error === orderErrorCategoryENUMs["Box And Product"]) {
      setProductAndBoxDetails(errorModalData?.entityDetails?.[0]);
    }
  }, [errorModalData, globalIndex]);

  useEffect(() => {
    if (errorModalData.error === orderErrorCategoryENUMs["Address"]) {
      const { pickupAddress, deliveryAddress } = errorModalData?.entityDetails;
      setAddressData([
        {
          label: "Pickup Address",
          address: {
            sellerId: pickupAddress?.sellerId,
            companyId: pickupAddress?.companyId,
            privateCompanyId: pickupAddress?.privateCompanyId,
            pickupAddressId: pickupAddress?.pickupAddressId,
            flatNo: pickupAddress?.flatNo,
            locality: pickupAddress?.locality,
            sector: pickupAddress?.sector,
            landmark: pickupAddress?.landmark,
            pincode: pickupAddress?.pincode,
            city: pickupAddress?.city,
            state: pickupAddress?.state,
            country: pickupAddress?.country,
            fullAddress: pickupAddress?.fullAddress,
            addressType: pickupAddress?.addressType,
            workingDays: {
              monday: pickupAddress?.workingDays?.monday,
              tuesday: pickupAddress?.workingDays?.tuesday,
              wednesday: pickupAddress?.workingDays?.wednesday,
              thursday: pickupAddress?.workingDays?.thursday,
              friday: pickupAddress?.workingDays?.friday,
              saturday: pickupAddress?.workingDays?.saturday,
              sunday: pickupAddress?.workingDays?.sunday,
            },
            workingHours: pickupAddress?.workingHours,
            contact: {
              name: pickupAddress?.contact?.name,
              mobileNo: pickupAddress?.contact?.mobileNo,
              alternateMobileNo: pickupAddress?.contact?.alternateMobileNo,
              emailId: pickupAddress?.contact?.emailId,
              type: pickupAddress?.contact?.type,
            },
            pickupDate: pickupAddress?.pickupDate,
            gstNumber: pickupAddress?.gstNumber,
          },
        },
        {
          label: "Delivery Address",
          address: {
            sellerId: deliveryAddress?.sellerId,
            companyId: deliveryAddress?.companyId,
            privateCompanyId: deliveryAddress?.privateCompanyId,
            pickupAddressId: deliveryAddress?.pickupAddressId,
            flatNo: deliveryAddress?.flatNo,
            locality: deliveryAddress?.locality,
            sector: deliveryAddress?.sector,
            landmark: deliveryAddress?.landmark,
            pincode: deliveryAddress?.pincode,
            city: deliveryAddress?.city,
            state: deliveryAddress?.state,
            country: deliveryAddress?.country,
            fullAddress: deliveryAddress?.fullAddress,
            addressType: deliveryAddress?.addressType,
            workingDays: {
              monday: deliveryAddress?.workingDays?.monday,
              tuesday: deliveryAddress?.workingDays?.tuesday,
              wednesday: deliveryAddress?.workingDays?.wednesday,
              thursday: deliveryAddress?.workingDays?.thursday,
              friday: deliveryAddress?.workingDays?.friday,
              saturday: deliveryAddress?.workingDays?.saturday,
              sunday: deliveryAddress?.workingDays?.sunday,
            },
            workingHours: deliveryAddress?.workingHours,
            contact: {
              name: deliveryAddress?.contact?.name,
              mobileNo: deliveryAddress?.contact?.mobileNo,
              alternateMobileNo: deliveryAddress?.contact?.alternateMobileNo,
              emailId: deliveryAddress?.contact?.emailId,
              type: deliveryAddress?.contact?.type,
            },
            pickupDate: deliveryAddress?.pickupDate,
            gstNumber: deliveryAddress?.gstNumber,
          },
        },
      ]);
    }
  }, [errorModalData]);

  useEffect(() => {
    if (errorModalData.error === orderErrorCategoryENUMs["Service"]) {
      getService();
    }
  }, [errorModalData]);

  return (
    <div className="overflow-h-auto max-h-[90vh]">
      <div className="flex mt-[1rem] mb-[1rem] rounded-lg mx-[0.5rem] h-[3rem] items-center px-[1rem] text-[1.2rem]">
        <div className="flex w-[100%] justify-between">
          <div className="flex gap-x-2">
            <img src={SampleProduct} width="38px" />
            <p className="text-[25px]">{errorModalData?.error}</p>
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
            className="cursor-pointer flex w-[50%] items-center justify-center border-2 rounded-md  text-white bg-black py-2"
            onClick={() => switchForUpdateActions(false)}
            //   () => {
            //   errorModalData.error ===
            //   orderErrorCategoryENUMs["Box And Product"]
            //     ? updateProducts(true)
            //     : updateOrderDetails(true);
            // }
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
            className="cursor-pointer flex w-[50%] items-center justify-center border-2 rounded-md  text-white bg-black py-2"
            onClick={processOrder}
          >
            Process Order
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorModal;
