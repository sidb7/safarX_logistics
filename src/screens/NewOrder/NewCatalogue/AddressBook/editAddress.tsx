import React, { useState } from "react";
import { Breadcrum } from "../../../../components/Layout/breadcrum";
import BottomLayout from "../../../../components/Layout/bottomLayout";
import CustomInputBox from "../../../../components/Input";
import { useLocation } from "react-router-dom";
import { POST } from "../../../../utils/webService";
import {
  UPDATE_PICKUP_ADDRESS,
  UPDATE_DELIVERY_ADDRESS,
} from "../../../../utils/ApiUrls";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface IEditAddressProps {}

const EditAddress: React.FunctionComponent<IEditAddressProps> = () => {
  const navigate = useNavigate();
  const {
    activeTab,
    addressData: {
      addressId,
      addressType,
      flatNo,
      sector,
      landmark,
      pincode,
      city,
      state,
      country,
      contactName,
      mobileNo,
    },
  } = useLocation().state;

  const [updateAddress, setUpdateAddress] = useState<any>({
    flatNo: flatNo,
    address: "",
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
    emailId: "",
    contactType: "",
    pickupDate: 0,
    customBranding: {
      name: "",
      logo: "",
      address: "",
      contactName: "",
      contactNumber: 0,
    },
  });
  const payload = {
    addressId: addressId,
    updateObject: {
      updateAddress,
    },
  };

  const addressUpdation = async (e: any) => {
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
            onChange={(e: any) =>
              setUpdateAddress({
                ...updateAddress,
                pincode: +e.target.value,
              })
            }
          />
          <CustomInputBox
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
