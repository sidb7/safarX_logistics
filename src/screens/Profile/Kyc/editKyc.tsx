import React, { useState } from "react";
import CustomInputBox from "../../../components/Input";
import { CustomUploadInput } from "../../../components/UploadInput/customUploadInput";
import { Breadcum } from "../../../components/Layout/breadcum";
import BottomLayout from "../../../components/Layout/bottomLayout";
import { useLocation } from "react-router-dom";
import { POST } from "../../../utils/webService";
import { UPDATE_SELLER } from "../../../utils/ApiUrls";
import { toast } from "react-toastify";

export const EditProfileKyc = () => {
  const { KycDetailsProps } = useLocation().state;

  const [kycDetails, setKycDetails] = useState(KycDetailsProps);

  const changeHandler = (key: string, event: any) => {
    setKycDetails({ ...kycDetails, [key]: event.target.value });
  };

  const changeAddressHandler = (key: string, event: any) => {
    setKycDetails({
      ...kycDetails,
      address: {
        ...kycDetails.address,
        [key]: event.target.value,
      },
    });
  };

  const updateKycDetails = async () => {
    const { data } = await POST(UPDATE_SELLER, {
      data: { kycDetails },
    });
    if (data.success) {
      setKycDetails(data?.data?.kycDetails);
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="h-full">
      <Breadcum label="KYC Details" />
      <div className="mx-4 mt-4 space-y-4 lg:grid lg:grid-cols-3 lg:gap-4">
        <CustomInputBox
          containerStyle={"self-end"}
          label="Frist name"
          className="!font-normal"
          value={kycDetails?.firstName}
          onChange={(e) => changeHandler("firstName", e)}
        />
        <CustomInputBox
          containerStyle={"self-end"}
          label="Middle name"
          className="!font-normal"
          value={kycDetails?.middleName}
          onChange={(e) => changeHandler("middleName", e)}
        />
        <CustomInputBox
          label="Last name"
          className="!font-normal"
          value={kycDetails?.lastName}
          onChange={(e) => changeHandler("lastName", e)}
        />

        <CustomInputBox
          label="GST Number"
          className="!font-normal"
          value={kycDetails?.gstNumber}
          onChange={(e) => changeHandler("gstNumber", e)}
        />
        <CustomUploadInput label="Upload GST file" id="gstFile" />

        <CustomInputBox
          label="PAN Number"
          className="!font-normal"
          value={kycDetails?.panNumber}
          onChange={(e) => changeHandler("panNumber", e)}
        />
        <CustomUploadInput label="Upload PAN file" id="panFile" />

        <CustomInputBox
          label="Aadhar Number"
          className="!font-normal"
          value={kycDetails?.aadharNumber}
          onChange={(e) => changeHandler("aadharNumber", e)}
        />
        <CustomUploadInput label="Upload Aadhar file" id="aadharFile" />

        <CustomInputBox
          label="Plot no"
          className="!font-normal"
          value={kycDetails?.address?.plotNumber}
          onChange={(e) => changeAddressHandler("plotNumber", e)}
        />
        <CustomInputBox
          label="Locality"
          className="!font-normal"
          value={kycDetails?.address?.locality}
          onChange={(e) => changeAddressHandler("locality", e)}
        />
        <CustomInputBox
          label="City"
          className="!font-normal"
          value={kycDetails?.address?.city}
          onChange={(e) => changeAddressHandler("city", e)}
        />
        <CustomInputBox
          label="District"
          className="!font-normal"
          value={kycDetails?.address?.district}
          onChange={(e) => changeAddressHandler("district", e)}
        />
        <CustomInputBox
          label="Pincode"
          className="!font-normal"
          value={kycDetails?.address?.pincode}
          onChange={(e) => changeAddressHandler("pincode", e)}
        />
        <CustomInputBox
          label="State"
          className="!font-normal"
          value={kycDetails?.address?.state}
          onChange={(e) => changeAddressHandler("state", e)}
        />
        <CustomInputBox
          label="Country"
          className="!font-normal"
          value={kycDetails?.address?.country}
          onChange={(e) => changeAddressHandler("country", e)}
        />
      </div>
      <BottomLayout callApi={updateKycDetails} />
    </div>
  );
};
