import React, { useState } from "react";
import InfoCircle from "../../../../assets/info-circle.svg";
import { Breadcrum } from "../../../../components/Layout/breadcrum";
import BottomLayout from "../../../../components/Layout/bottomLayout";
import CustomInputBox from "../../../../components/Input";
import { POST } from "../../../../utils/webService";
import {
  ADD_PICKUP_ADDRESS_CATALOGUE,
  ADD_DELIVERY_ADDRESS,
  GET_PINCODE_DATA,
} from "../../../../utils/ApiUrls";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { capitalizeFirstLetter } from "../../../../utils/utility";
import CustomDropDown from "../../../../components/DropDown";

interface IAddAddressProps {}

const AddAddress: React.FunctionComponent<IAddAddressProps> = () => {
  const navigate = useNavigate();
  const { activeTab } = useLocation().state;
  const [isDisabled, setIsDisabled] = useState(false);
  const [addressType, setAddressType] = useState();
  const [addAddress, setAddAddress] = useState<any>({
    flatNo: "",
    locality: "",
    sector: "",
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

  const createAddress = async (e: any) => {
    if (!addressType) {
      toast.error("Please Select Address Type");
      return;
    }
    const fullAddress = `${addAddress.flatNo}, ${addAddress.locality}, ${addAddress.sector}, ${addAddress.landmark}, ${addAddress.city}, ${addAddress.state}, ${addAddress.country}, ${addAddress.pincode}`;

    setAddAddress((prevAddAddress: any) => ({
      ...prevAddAddress,
      fullAddress: fullAddress.trim(),
    }));

    if (addAddress.addressType === "") {
      return setErrorAddAddressMessage({
        ...errorAddAddressMessage,
        addressType: "Please Enter Address Name",
      });
    } else if (addAddress.flatNo === "") {
      return setErrorAddAddressMessage({
        ...errorAddAddressMessage,
        flatNo: "Please Enter Your Address",
      });
    } else if (addAddress.sector === "") {
      return setErrorAddAddressMessage({
        ...errorAddAddressMessage,
        sector: "Please Enter Your Locality",
      });
    } else if (addAddress.landmark === "") {
      return setErrorAddAddressMessage({
        ...errorAddAddressMessage,
        landmark: "Please Enter A Landmark",
      });
    } else if (!addAddress.pincode) {
      return setErrorAddAddressMessage({
        ...errorAddAddressMessage,
        pincode: "Please Enter Your Pincode",
      });
    } else if (String(addAddress.pincode).length !== 6) {
      return setErrorAddAddressMessage({
        ...errorAddAddressMessage,
        pincode: "Pincode Should Contain 6 Digits",
      });
    } else if (addAddress.city === "") {
      return setErrorAddAddressMessage({
        ...errorAddAddressMessage,
        city: "Please Enter Your City",
      });
    } else if (addAddress.state === "") {
      return setErrorAddAddressMessage({
        ...errorAddAddressMessage,
        state: "Please Enter Your State",
      });
    } else if (addAddress.country === "") {
      return setErrorAddAddressMessage({
        ...errorAddAddressMessage,
        country: "Please Enter Your Country",
      });
    } else if (addAddress.contactName === "") {
      return setErrorAddAddressMessage({
        ...errorAddAddressMessage,
        contactName: "Please Enter Your Contact Name",
      });
    } else if (!addAddress.contact.mobileNo) {
      return setErrorAddAddressMessage({
        ...errorAddAddressMessage,
        mobileNo: "Please Enter Your Mobile Number",
      });
    } else if (String(addAddress.contact.mobileNo).length !== 10) {
      return setErrorAddAddressMessage({
        ...errorAddAddressMessage,
        mobileNo: "Contact Number Should Be 10 Digits",
      });
    }

    // let url = "";
    // if (activeTab === "pickup") {
    //   url = ADD_PICKUP_ADDRESS_CATALOGUE;
    // } else if (activeTab === "delivery") {
    //   url = ADD_DELIVERY_ADDRESS;
    // }
    if (addressType === "Pickup Address") {
      const { data: createAddressBook }: any = await POST(
        ADD_PICKUP_ADDRESS_CATALOGUE,
        {
          ...addAddress,
          fullAddress: fullAddress.trim(),
        }
      );
      if (createAddressBook?.success) {
        navigate(-1);
        toast.success(createAddressBook?.message);

        setAddAddress({});
      } else {
        toast.error(createAddressBook?.message);
      }
    } else {
      const { data: createDeliveryAddressBook }: any = await POST(
        ADD_DELIVERY_ADDRESS,
        {
          ...addAddress,
          fullAddress: fullAddress.trim(),
        }
      );
      if (createDeliveryAddressBook?.success) {
        navigate(-1);
        toast.success(createDeliveryAddressBook?.message);

        setAddAddress({});
      } else {
        toast.error(createDeliveryAddressBook?.message);
      }
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

  return (
    <div className="h-full">
      <Breadcrum label="Add Address" />
      <div className="mx-5 mt-4 customScroll h-[575px]">
        <div className="mt-2 grid lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-[4rem]">
          <div>
            <CustomDropDown
              onChange={(e: any) => {
                setAddressType(e.target.value);
              }}
              value={addressType}
              options={[
                {
                  label: "Pickup Address",
                  value: "Pickup Address",
                },
                {
                  label: "Delivery Address",
                  value: "Delivery Address",
                },
              ]}
              heading="Address Type"
            />
          </div>
          <div>
            <CustomInputBox
              label="Address Name"
              name="addressType"
              value={addAddress.addressType}
              className={` ${
                errorAddAddressMessage.addressType && "!border-[#F35838]"
              } `}
              onChange={(e: any) => {
                setAddAddress({ ...addAddress, addressType: e.target.value });
                if (e.target.value !== "") {
                  setErrorAddAddressMessage({
                    ...errorAddAddressMessage,
                    addressType: "",
                  });
                }
              }}
            />
            {errorAddAddressMessage.addressType !== "" && (
              <div className="flex items-center gap-x-1 mt-1">
                <img src={InfoCircle} alt="" width={16} height={16} />
                <span className="font-normal text-[#F35838] text-xs leading-3 transition-all ease-out delay-100">
                  {errorAddAddressMessage.addressType}
                </span>
              </div>
            )}
          </div>

          <div>
            <CustomInputBox
              label="Plot no, Building Name"
              name="flatNo"
              value={addAddress.flatNo}
              className={` ${
                errorAddAddressMessage.flatNo && "!border-[#F35838]"
              } `}
              onChange={(e: any) => {
                setAddAddress({ ...addAddress, flatNo: e.target.value });
                if (e.target.value !== "") {
                  setErrorAddAddressMessage({
                    ...errorAddAddressMessage,
                    flatNo: "",
                  });
                }
              }}
            />
            {errorAddAddressMessage.flatNo !== "" && (
              <div className="flex items-center gap-x-1 mt-1">
                <img src={InfoCircle} alt="" width={16} height={16} />
                <span className="font-normal text-[#F35838] text-xs leading-3 transition-all ease-out delay-100">
                  {errorAddAddressMessage.flatNo}
                </span>
              </div>
            )}
          </div>
          <div>
            <CustomInputBox
              label="Locality"
              name="sector"
              value={addAddress.sector}
              className={` ${
                errorAddAddressMessage.sector && "!border-[#F35838]"
              } `}
              onChange={(e: any) => {
                const value = e.target.value;
                setAddAddress({
                  ...addAddress,
                  sector: value,
                  locality: value,
                });
                if (value !== "") {
                  setErrorAddAddressMessage({
                    ...errorAddAddressMessage,
                    sector: "",
                  });
                }
              }}
            />
            {errorAddAddressMessage.sector !== "" && (
              <div className="flex items-center gap-x-1 mt-1">
                <img src={InfoCircle} alt="" width={16} height={16} />
                <span className="font-normal text-[#F35838] text-xs leading-3 transition-all ease-out delay-100">
                  {errorAddAddressMessage.sector}
                </span>
              </div>
            )}
          </div>
          <div>
            <CustomInputBox
              label="Landmark"
              name="landmark"
              value={addAddress.landmark}
              className={` ${
                errorAddAddressMessage.landmark && "!border-[#F35838]"
              } `}
              onChange={(e: any) => {
                setAddAddress({ ...addAddress, landmark: e.target.value });
                if (e.target.value !== "") {
                  setErrorAddAddressMessage({
                    ...errorAddAddressMessage,
                    landmark: "",
                  });
                }
              }}
            />
            {errorAddAddressMessage.landmark !== "" && (
              <div className="flex items-center gap-x-1 mt-1">
                <img src={InfoCircle} alt="" width={16} height={16} />
                <span className="font-normal text-[#F35838] text-xs leading-3 transition-all ease-out delay-100">
                  {errorAddAddressMessage.landmark}
                </span>
              </div>
            )}
          </div>
          <div>
            <CustomInputBox
              label="Pincode"
              inputMode="numeric"
              value={addAddress?.pincode || ""}
              name="pincode"
              maxLength={6}
              className={` ${
                errorAddAddressMessage.pincode && "!border-[#F35838]"
              } `}
              onChange={(e: any) => {
                handlePincode(e.target.value);
                setAddAddress({ ...addAddress, pincode: +e.target.value });
                if (e.target.value !== "") {
                  setErrorAddAddressMessage({
                    ...errorAddAddressMessage,
                    pincode: "",
                  });
                }
              }}
            />
            {errorAddAddressMessage.pincode !== "" && (
              <div className="flex items-center gap-x-1 mt-1">
                <img src={InfoCircle} alt="" width={16} height={16} />
                <span className="font-normal text-[#F35838] text-xs leading-3 transition-all ease-out delay-100">
                  {errorAddAddressMessage.pincode}
                </span>
              </div>
            )}
          </div>
          <div>
            <CustomInputBox
              label="City"
              isDisabled={isDisabled}
              name="city"
              value={addAddress.city}
              className={` ${
                errorAddAddressMessage.city && "!border-[#F35838]"
              } `}
              onChange={(e: any) => {
                setAddAddress({ ...addAddress, city: e.target.value });
                if (e.target.value !== "") {
                  setErrorAddAddressMessage({
                    ...errorAddAddressMessage,
                    city: "",
                  });
                }
              }}
            />
            {errorAddAddressMessage.city !== "" && (
              <div className="flex items-center gap-x-1 mt-1">
                <img src={InfoCircle} alt="" width={16} height={16} />
                <span className="font-normal text-[#F35838] text-xs leading-3 transition-all ease-out delay-100">
                  {errorAddAddressMessage.city}
                </span>
              </div>
            )}
          </div>
          <div>
            <CustomInputBox
              label="State"
              isDisabled={isDisabled}
              name="state"
              value={addAddress.state}
              className={` ${
                errorAddAddressMessage.state && "!border-[#F35838]"
              } `}
              onChange={(e: any) => {
                setAddAddress({ ...addAddress, state: e.target.value });
                if (e.target.value !== "") {
                  setErrorAddAddressMessage({
                    ...errorAddAddressMessage,
                    state: "",
                  });
                }
              }}
            />
            {errorAddAddressMessage.state !== "" && (
              <div className="flex items-center gap-x-1 mt-1">
                <img src={InfoCircle} alt="" width={16} height={16} />
                <span className="font-normal text-[#F35838] text-xs leading-3 transition-all ease-out delay-100">
                  {errorAddAddressMessage.state}
                </span>
              </div>
            )}
          </div>
          <div>
            <CustomInputBox
              label="Country"
              isDisabled={isDisabled}
              name="country"
              value={addAddress.country}
              className={` ${
                errorAddAddressMessage.country !== "" && "!border-[#F35838]"
              } `}
              onChange={(e: any) => {
                setAddAddress({ ...addAddress, country: e.target.value });
                if (e.target.value !== "") {
                  setErrorAddAddressMessage({
                    ...errorAddAddressMessage,
                    country: "",
                  });
                }
              }}
            />
            {errorAddAddressMessage.country !== "" && (
              <div className="flex items-center gap-x-1 mt-1">
                <img src={InfoCircle} alt="" width={16} height={16} />
                <span className="font-normal text-[#F35838] text-xs leading-3 transition-all ease-out delay-100">
                  {errorAddAddressMessage.country}
                </span>
              </div>
            )}
          </div>
          <div>
            <CustomInputBox
              label="Contact Name"
              name="contactName"
              value={addAddress?.contact?.name}
              className={` ${
                errorAddAddressMessage.contactName !== "" && "!border-[#F35838]"
              } `}
              onChange={(e: any) => {
                setAddAddress({
                  ...addAddress,
                  contact: {
                    ...addAddress.contact,
                    name: e.target.value,
                  },
                });
                if (e.target.value !== "") {
                  setErrorAddAddressMessage({
                    ...errorAddAddressMessage,
                    contactName: "",
                  });
                }
              }}
            />
            {errorAddAddressMessage.contactName !== "" && (
              <div className="flex items-center gap-x-1 mt-1">
                <img src={InfoCircle} alt="" width={16} height={16} />
                <span className="font-normal text-[#F35838] text-xs leading-3 transition-all ease-out delay-100">
                  {errorAddAddressMessage.contactName}
                </span>
              </div>
            )}
          </div>
          <div>
            <CustomInputBox
              label="Contact Number"
              name="contactNumber"
              inputType="text"
              inputMode="numeric"
              maxLength={10}
              value={addAddress?.contact?.mobileNo || ""}
              className={` ${
                errorAddAddressMessage.mobileNo !== "" && "!border-[#F35838]"
              } `}
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
            {errorAddAddressMessage.mobileNo !== "" && (
              <div className="flex items-center gap-x-1 mt-1">
                <img src={InfoCircle} alt="" width={16} height={16} />
                <span className="font-normal text-[#F35838] text-xs leading-3 transition-all ease-out delay-100">
                  {errorAddAddressMessage.mobileNo}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <BottomLayout callApi={createAddress} />
    </div>
  );
};

export default AddAddress;
