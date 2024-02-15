import React, { useEffect, useRef, useState } from "react";
import InputBox from "../../components/Input";
import LocationIcon from "../../assets/Location.svg";
import MagicLocationIcon from "../../assets/PickUp/magicLocation.svg";
import CustomDropDown from "../../components/DropDown";
import { capitalizeFirstLetter } from "../../utils/utility";
import { Spinner } from "../../components/Spinner";
import AiIcon from "../../assets/Buttons.svg";
import { POST } from "../../utils/webService";
import InfoCircle from "../../assets/info-circle.svg";
import {
  ADD_DELIVERY_ADDRESS,
  ADD_PICKUP_ADDRESS_CATALOGUE,
  GET_PINCODE_DATA,
  VERIFY_ADDRESS,
} from "../../utils/ApiUrls";
import { dummyStateDropdownData } from "../../utils/dummyData";
import { toast } from "react-hot-toast";

function AddAddress({ addressType, setAddAddressModal, returnAddress }: any) {
  const [magicAddress, setMagicAddress]: any = useState("");
  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [inputError, setInputError] = useState(false);

  const [addAddress, setAddAddress] = useState<any>({
    flatNo: "",
    locality: "",
    landmark: "",
    pincode: 0,
    city: "",
    state: "",
    country: "",
    fullAddress: "",
    addressType: "",
    workingDays: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true,
    },
    workingHours: "09:00",
    contact: {
      name: "",
      mobileNo: "",
      emailId: "",
      type: "warehouse associate",
    },
  });
  const [errorAddAddressMessage, setErrorAddAddressMessage] = useState<any>({
    addressType: "",
    flatNo: "",
    sector: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
    contactName: "",
    mobileNo: "",
  });

  let targetAddress = "";
  if (addressType === "Delivery Address") {
    targetAddress = "deliveryAddress";
  } else if (addressType === "Pickup Address") {
    targetAddress = "pickupAddress";
  }

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

  const handleInputChange = (e: any, nested?: any) => {
    if (nested) {
      setAddAddress({
        ...addAddress,
        [nested]: { ...addAddress[nested], [e.target.name]: e.target.value },
      });
    } else {
      setAddAddress({ ...addAddress, [e.target.name]: e.target.value });
    }

    if (e.target.value !== "") {
      setErrorAddAddressMessage({
        ...errorAddAddressMessage,
        [e.target.name]: "",
      });
    }
  };

  const handlePincode = async (pincode: any) => {
    if (pincode.length === 6) {
      const { data: response } = await POST(GET_PINCODE_DATA, { pincode });
      setAddAddress({
        ...addAddress,
        pincode,
        state: capitalizeFirstLetter(response?.data?.[0]?.state),
        city: capitalizeFirstLetter(response?.data?.[0]?.city),
        country: "India",
      });
      setIsDisabled(true);
    } else setIsDisabled(false);
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
        tempData = { ...addAddress };

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
        setAddAddress(tempData);
      }

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

    if (!isAddressLoading && trimmedData !== "") {
      getVerifyAddress(verifyAddressPayload, targetAddress);
    }
  };

  const createAddress = async () => {
    console.log("its working");
    if (!addressType) {
      toast.error("Please Select Address Type");
      return;
    }
    const fullAddress = `${addAddress.flatNo}, ${addAddress.locality}, ${addAddress.sector}, ${addAddress.landmark}, ${addAddress.city}, ${addAddress.state}, ${addAddress.country}, ${addAddress.pincode}`;

    setAddAddress((prevAddAddress: any) => ({
      ...prevAddAddress,
      fullAddress: fullAddress.trim(),
    }));

    if (
      addAddress?.flatNo === "" ||
      addAddress?.landmark === "" ||
      addAddress?.city === "" ||
      addAddress?.state === "" ||
      addAddress?.country === "" ||
      addAddress?.contactcontact?.contactName === "" ||
      addAddress?.mobileNo === "" ||
      addAddress?.pincode === ""
    ) {
      setInputError(true);
      return;
    }

    if (addressType === "Pickup Address") {
      setIsloading(true);
      const { data: createAddressBook }: any = await POST(
        ADD_PICKUP_ADDRESS_CATALOGUE,
        {
          ...addAddress,
          addressType: addressType,
          fullAddress: fullAddress.trim(),
        }
      );
      if (createAddressBook?.success) {
        toast.success(createAddressBook?.message);
        setIsloading(false);
        returnAddress();
        setAddAddressModal(false);
        setAddAddress({});
      } else {
        toast.error(createAddressBook?.message);
        setIsloading(false);
      }
    } else {
      setIsloading(true);
      const { data: createDeliveryAddressBook }: any = await POST(
        ADD_DELIVERY_ADDRESS,
        {
          ...addAddress,
          addressType: addressType,
          fullAddress: fullAddress.trim(),
        }
      );
      if (createDeliveryAddressBook?.success) {
        toast.success(createDeliveryAddressBook?.message);
        setIsloading(false);
        returnAddress();
        setAddAddressModal(false);
        setAddAddress({});
      } else {
        toast.error(createDeliveryAddressBook?.message);
        setIsloading(false);
      }
    }
  };

  return (
    <div className=" my-6">
      <div className="mx-4 font-medium text-[22px] p-2 border-b">
        ADD ADDRESS
      </div>

      <div className="mx-2">
        <div className="m-[0.5rem] my-[1rem] bg-white">
          <div className="flex min-w-[90%] ">
            <div
              className="items-center flex border-2 rounded-md w-[100%] justify-between p-2 cursor-pointer"
              style={{
                boxShadow:
                  "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
              }}
            >
              <div className="flex items-center gap-x-2 ">
                <img src={LocationIcon} width="40px" />
                <p>
                  <b>{capitalizeFirstLetter(addressType)}</b>
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
                  <img src={MagicLocationIcon} alt="Magic Location Icon" />
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
                  value={capitalizeFirstLetter(addAddress?.flatNo)}
                  name="flatNo"
                  onChange={handleInputChange}
                  inputError={inputError}
                />
                {errorAddAddressMessage.flatNo !== "" && (
                  <div className="flex items-center gap-x-1 mt-1">
                    <img src={InfoCircle} alt="" width={10} height={10} />
                    <span className="font-normal text-[#F35838] text-xs leading-3">
                      {errorAddAddressMessage.flatNo}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <div className="flex mt-[1rem] gap-[1rem]">
                  <div className="w-[100%]">
                    <InputBox
                      label="Country"
                      isDisabled={isDisabled}
                      value={capitalizeFirstLetter(addAddress?.country)}
                      name="country"
                      onChange={handleInputChange}
                      inputError={inputError}
                    />
                    {errorAddAddressMessage.country !== "" && (
                      <div className="flex items-center gap-x-1 mt-1">
                        <img src={InfoCircle} alt="" width={10} height={10} />
                        <span className="font-normal text-[#F35838] text-xs leading-3">
                          {errorAddAddressMessage.country}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="w-[100%]">
                    <CustomDropDown
                      value={capitalizeFirstLetter(addAddress?.state)}
                      name="state"
                      disabled={isDisabled}
                      onChange={handleInputChange}
                      options={dummyStateDropdownData}
                      placeHolder="Select State"
                      wrapperClass="w-[100%]"
                      inputError={inputError}
                    />
                  </div>
                </div>
                <div className="flex mt-[1rem] gap-[1rem]">
                  <div className="w-[100%]">
                    <InputBox
                      label="City"
                      value={capitalizeFirstLetter(addAddress?.city)}
                      name="city"
                      isDisabled={isDisabled}
                      inputError={inputError}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="w-[100%]">
                    <InputBox
                      label="Locality"
                      value={capitalizeFirstLetter(addAddress?.locality)}
                      name="locality"
                      inputError={inputError}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="flex mt-[1rem] gap-[1rem]">
                  <div className="w-[100%]">
                    <InputBox
                      inputType="email"
                      label="Email ID (optional)"
                      name="emailId"
                      inputError={inputError}
                      value={addAddress?.contact?.emailId || ""}
                      onChange={(e: any) => handleInputChange(e, "contact")}
                    />
                  </div>

                  <div className="w-[100%]">
                    <InputBox
                      label="Contact Number"
                      name="mobileNo"
                      inputType="text"
                      inputMode="numeric"
                      maxLength={10}
                      inputError={inputError}
                      inputClassName={` ${
                        errorAddAddressMessage.mobileNo !== "" &&
                        "!border-[#F35838]"
                      } `}
                      value={addAddress?.contact?.mobileNo || ""}
                      onChange={(e: any) => {
                        setAddAddress({
                          ...addAddress,
                          contact: {
                            ...addAddress.contact,
                            mobileNo: +e.target.value,
                          },
                        });
                        if (e.target.value !== "") {
                          setErrorAddAddressMessage({
                            ...errorAddAddressMessage,
                            mobileNo: "",
                          });
                        }
                      }}
                    />

                    {/* {inputError && validationErrors.mobileNo && (
                      <div className="flex items-center gap-x-1 mt-1">
                        <img src={InfoCircle} alt="" width={10} height={10} />
                        <span className="font-normal text-[#F35838] text-xs leading-3">
                          {validationErrors.mobileNo}
                        </span>
                      </div>
                    )} */}
                  </div>
                </div>

                <div className="flex mt-[1rem] gap-[1rem]">
                  <div className="w-[100%]">
                    <CustomDropDown
                      value={
                        businessTypeDropDown
                          .map((valueObj: any) => valueObj?.value)
                          .includes(
                            capitalizeFirstLetter(addAddress?.contact?.type)
                          )
                          ? capitalizeFirstLetter(addAddress?.contact?.type)
                          : "Others"
                      }
                      name="type"
                      onChange={handleInputChange}
                      options={businessTypeDropDown}
                      inputError={inputError}
                      placeHolder="Select Business Type"
                      wrapperClass="w-[100%]"
                    />
                  </div>

                  <div className="w-[100%]">
                    <InputBox
                      label="Name of the Contact Person"
                      name="name"
                      value={addAddress?.contact?.name || ""}
                      onChange={(e: any) => handleInputChange(e, "contact")}
                      className="w-[100%]"
                      inputError={inputError}
                    />
                  </div>
                </div>

                <div className="flex mt-[1rem] gap-[1rem] ">
                  <div className="w-[100%]">
                    <InputBox
                      label="Pincode"
                      value={addAddress?.pincode || ""}
                      name="pincode"
                      inputType="text"
                      inputMode="numeric"
                      inputError={inputError}
                      onChange={(e: any) => {
                        handlePincode(e.target.value);
                        const numericValue = e.target.value.replace(
                          /[^0-9]/g,
                          ""
                        );
                        if (numericValue.length <= 6) {
                          setAddAddress({
                            ...addAddress,
                            pincode: +numericValue,
                          });
                        }
                      }}
                    />
                  </div>

                  <div className="w-[100%]">
                    <InputBox
                      label="Select Landmark"
                      value={capitalizeFirstLetter(addAddress?.landmark)}
                      name="landmark"
                      inputError={inputError}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* )} */}
          </div>
        </div>
      </div>
      <div
        style={{
          boxShadow:
            "0px -4px 6px -1px rgba(133, 133, 133, 0.1), 0px -2px 4px -1px rgba(133, 133, 133, 0.06), 0px 6px 13px 0px rgba(133, 133, 133, 0.1)",
        }}
        className="absolute bottom-0 w-full flex shadow-lg border-[1px] bg-[#FFFFFF] gap-[32px] p-[24px] rounded-tr-[24px] rounded-tl-[24px] "
      >
        {isLoading ? (
          <div className="flex w-[100%] justify-center  items-center">
            <Spinner />
          </div>
        ) : (
          <div
            className="flex w-[100%] items-center py-2 justify-center border-2 rounded-md bg-black cursor-pointer  text-white"
            onClick={() => !inputError && createAddress()}
          >
            SAVE
          </div>
        )}
      </div>
    </div>
  );
}

export default AddAddress;
