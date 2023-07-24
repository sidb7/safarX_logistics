import React from "react";
import CustomInputBox from "../../../components/Input";
import { CustomUploadInput } from "../../../components/UploadInput/customUploadInput";

export const EditProfileKyc = () => {
  return (
    <div className="mx-4 mt-8 space-y-4 lg:grid lg:grid-cols-3 lg:gap-4">
      <CustomInputBox containerStyle={'self-end'} label="Frist name"  />
      <CustomInputBox label="Last name" />
      <CustomInputBox label="GST Number" />
      <CustomUploadInput label="Upload GST file" id="gstFile" />
      <CustomInputBox label="PAN Number" />
      <CustomUploadInput label="Upload PAN file" id="panFile" />
      <CustomInputBox label="Aadhar Number" />
      <CustomUploadInput label="Upload Aadhar file" id="aadharFile" />
    </div>
  );
};
