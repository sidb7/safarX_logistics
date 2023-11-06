import React, { useState } from "react";
import { Breadcrum } from "../../../../components/Layout/breadcrum";
import BottomLayout from "../../../../components/Layout/bottomLayout";
import CustomInputBox from "../../../../components/Input";
import { useLocation } from "react-router-dom";
import { POST } from "../../../../utils/webService";
import {
  UPDATE_PICKUP_ADDRESS,
  UPDATE_DELIVERY_ADDRESS,
  GET_PINCODE_DATA,
} from "../../../../utils/ApiUrls";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { capitalizeFirstLetter } from "../../../../utils/utility";

interface IEditAddressProps {}

const EditAddress: React.FunctionComponent<IEditAddressProps> = () => {
  const navigate = useNavigate();
  const {
    activeTab,
    addressData: {
      contactName,
      address,
      mobileNo,
      companyId,
      isActive,
      isDeleted,
      pickupAddressId,
      privateCompanyId,
      addressType,
      city,
      contact,
      country,
      flatNo,
      fullAddress,
      landmark,
      locality,
      pincode,
      sector,
      sellerId,
      state,
      workingDays,
      workingHours,
      createdAt,
      createdBy,
      updatedAt,
      updatedBy,
    },
  } = useLocation().state;

  const [updateAddress, setUpdateAddress] = useState<any>({
    flatNo: flatNo,
    // address,
    sector: sector,
    landmark: landmark,
    pincode: pincode,
    city: city,
    state: state,
    country: country,
    addressType: addressType,
    contactName: contactName,
    mobileNo: mobileNo,
    alternateMobileNo: 0,
    // emailId: "",
    // contactType: "",
    pickupDate: 0,
    customBranding: {
      name: "",
      logo: "",
      address: "",
      contactName: "",
      contactNumber: 0,
    },
    companyId,
    isActive,
    isDeleted,
    pickupAddressId,
    privateCompanyId,
    contact,
    fullAddress,
    sellerId,
    locality,
    workingDays,
    workingHours,
    createdAt,
    createdBy,
    updatedAt,
    updatedBy,
  });
  const payload = {
    ...updateAddress,
  };
  const [isDisabled, setIsDisabled] = useState(false);

  const addressUpdation = async (e: any) => {
    for (const key in updateAddress) {
      if (updateAddress.hasOwnProperty(key)) {
        const value = updateAddress[key];
        if (
          value === null ||
          value === undefined ||
          (typeof value === "string" && value.trim() === "") ||
          (Array.isArray(value) && value.length === 0)
        ) {
          return toast.error(`${key} Should Not Be Empty`);
        }
      }
    }
    let url = "";
    if (activeTab === "pickup") {
      url = UPDATE_PICKUP_ADDRESS;
    } else if (activeTab === "delivery") {
      url = UPDATE_DELIVERY_ADDRESS;
    }
    const { data: updateAddressBook }: any = await POST(url, payload);
    if (updateAddressBook?.success) {
      navigate(-1);
    } else {
      toast.error(updateAddressBook?.message);
    }
  };

  const handlePincode = async (pincode: any) => {
    if (pincode.length <= 6) {
      setUpdateAddress({
        ...updateAddress,
        pincode,
      });
      if (pincode.length === 6) {
        const { data: response } = await POST(GET_PINCODE_DATA, {
          pincode,
        });
        setUpdateAddress({
          ...updateAddress,
          state: capitalizeFirstLetter(response?.data?.[0]?.state),
          city: capitalizeFirstLetter(response?.data?.[0]?.city),
          country: "India",
          pincode,
        });
        setIsDisabled(true);
      } else setIsDisabled(false);
    }
  };

  return (
    <div className="h-full">
      <Breadcrum label="Edit Address" />
      <div className="mx-5 mt-4 overflow-y-auto h-[575px]">
        <div className="mt-2 grid lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <CustomInputBox
            label="Address Name"
            value={updateAddress.addressType}
            onChange={(e: any) =>
              setUpdateAddress({
                ...updateAddress,
                addressType: e.target.value,
              })
            }
          />
          <CustomInputBox
            label="Plot no, Building Name"
            value={updateAddress.flatNo}
            onChange={(e: any) =>
              setUpdateAddress({
                ...updateAddress,
                flatNo: e.target.value,
              })
            }
          />
          <CustomInputBox
            label="Locality"
            value={updateAddress.sector}
            onChange={(e: any) =>
              setUpdateAddress({
                ...updateAddress,
                sector: e.target.value,
              })
            }
          />
          <CustomInputBox
            label="Landmark"
            value={updateAddress.landmark}
            onChange={(e: any) =>
              setUpdateAddress({
                ...updateAddress,
                landmark: e.target.value,
              })
            }
          />
          <CustomInputBox
            label="Pincode"
            value={updateAddress.pincode || ""}
            inputType="text"
            inputMode="numeric"
            onChange={(e: any) => handlePincode(e.target.value)}
          />
          <CustomInputBox
            isDisabled={isDisabled}
            label="City"
            value={updateAddress.city}
            onChange={(e: any) =>
              setUpdateAddress({
                ...updateAddress,
                city: e.target.value,
              })
            }
          />
          <CustomInputBox
            isDisabled={isDisabled}
            label="State"
            value={updateAddress.state}
            onChange={(e: any) =>
              setUpdateAddress({
                ...updateAddress,
                state: e.target.value,
              })
            }
          />
          <CustomInputBox
            isDisabled={isDisabled}
            label="Country"
            value={updateAddress.country}
            onChange={(e: any) =>
              setUpdateAddress({
                ...updateAddress,
                country: e.target.value,
              })
            }
          />
          <CustomInputBox
            label="Contact Name"
            value={updateAddress.contactName}
            onChange={(e: any) =>
              setUpdateAddress({
                ...updateAddress,
                contactName: e.target.value,
              })
            }
          />
          <CustomInputBox
            label="Contact Number"
            value={updateAddress.mobileNo || ""}
            inputType="text"
            inputMode="numeric"
            maxLength={10}
            onChange={(e: any) =>
              setUpdateAddress({
                ...updateAddress,
                mobileNo: +e.target.value,
              })
            }
          />
        </div>
      </div>

      <BottomLayout callApi={addressUpdation} />
    </div>
  );
};

export default EditAddress;
