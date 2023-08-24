import React from "react";
import { Breadcum } from "../../../../components/Layout/breadcum";
import BottomLayout from "../../../../components/Layout/bottomLayout";
import CustomInputBox from "../../../../components/Input";

interface IAddAddressProps {}

const AddAddress: React.FunctionComponent<IAddAddressProps> = () => {
  return (
    <div className="h-full">
      <Breadcum label="Add Address" />
      <div className="mx-5 mt-4 overflow-y-auto h-[575px]">
        <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <CustomInputBox label="Address Name" onChange={() => {}} />
          <CustomInputBox label="Plot no, Building Name" onChange={() => {}} />
          <CustomInputBox label="Locality" onChange={() => {}} />
          <CustomInputBox label="Landmark" onChange={() => {}} />
          <CustomInputBox label="Pincode" onChange={() => {}} />
          <CustomInputBox label="City" onChange={() => {}} />
          <CustomInputBox label="State" onChange={() => {}} />
          <CustomInputBox label="Country" onChange={() => {}} />
          <CustomInputBox label="Contact Name" onChange={() => {}} />
          <CustomInputBox label="Contact Number" onChange={() => {}} />
        </div>
      </div>

      <BottomLayout callApi={() => {}} />
    </div>
  );
};

export default AddAddress;
