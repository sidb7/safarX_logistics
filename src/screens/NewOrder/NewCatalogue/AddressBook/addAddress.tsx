import React, { useState } from "react";
import { Breadcum } from "../../../../components/Layout/breadcum";
import BottomLayout from "../../../../components/Layout/bottomLayout";
import CustomInputBox from "../../../../components/Input";
import { POST } from "../../../../utils/webService";
import { ADD_ADDRESS } from "../../../../utils/ApiUrls";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface IAddAddressProps {}

const AddAddress: React.FunctionComponent<IAddAddressProps> = () => {
  const navigate = useNavigate();
  const [addAddress, setAddAddress] = useState<any>({
    flatNo: "",
    address: "",
    sector: "",
    landmark: "",
    pincode: 0,
    city: "",
    state: "",
    country: "",
    addressType: "",
    contactName: "",
    mobileNo: 0,
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
  // console.log("🚀 ~ file: addAddress.tsx:33 ~ addAddress:", addAddress);

  const createAddress = async (e: any) => {
    const { data: createAddressBook }: any = await POST(
      ADD_ADDRESS,
      addAddress
    );
    if (createAddressBook?.success) {
      navigate(-1);
      setAddAddress({});
    } else {
      toast.error(createAddressBook?.message);
    }
  };

  return (
    <div className="h-full">
      <Breadcum label="Add Address" />
      <div className="mx-5 mt-4 overflow-y-auto h-[575px]">
        <div className="mt-2 grid lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <CustomInputBox
            label="Address Name"
            name="address"
            value={addAddress.address}
            onChange={(e: any) =>
              setAddAddress({ ...addAddress, address: e.target.value })
            }
          />
          <CustomInputBox
            label="Plot no, Building Name"
            name="flatNo"
            onChange={(e: any) =>
              setAddAddress({ ...addAddress, flatNo: e.target.value })
            }
          />
          <CustomInputBox
            label="Locality"
            name="sector"
            onChange={(e: any) =>
              setAddAddress({ ...addAddress, sector: e.target.value })
            }
          />
          <CustomInputBox
            label="Landmark"
            name="landmark"
            onChange={(e: any) =>
              setAddAddress({ ...addAddress, landmark: e.target.value })
            }
          />
          <CustomInputBox
            label="Pincode"
            inputType="text"
            inputMode="numeric"
            name="pincode"
            onChange={(e: any) =>
              setAddAddress({ ...addAddress, pincode: e.target.value })
            }
          />
          <CustomInputBox
            label="City"
            name="city"
            onChange={(e: any) =>
              setAddAddress({ ...addAddress, city: e.target.value })
            }
          />
          <CustomInputBox
            label="State"
            name="state"
            onChange={(e: any) =>
              setAddAddress({ ...addAddress, state: e.target.value })
            }
          />
          <CustomInputBox
            label="Country"
            name="country"
            onChange={(e: any) =>
              setAddAddress({ ...addAddress, country: e.target.value })
            }
          />
          <CustomInputBox
            label="Contact Name"
            name="contactName"
            onChange={(e: any) =>
              setAddAddress({
                ...addAddress,
                customBranding: {
                  ...addAddress.customBranding,
                  contactName: e.target.value,
                },
              })
            }
          />
          <CustomInputBox
            label="Contact Number"
            name="contactNumber"
            inputType="text"
            inputMode="numeric"
            onChange={(e: any) =>
              setAddAddress({
                ...addAddress,
                customBranding: {
                  ...addAddress.customBranding,
                  contactNumber: e.target.value,
                },
              })
            }
          />
        </div>
      </div>
      <BottomLayout callApi={createAddress} />
    </div>
  );
};

export default AddAddress;
