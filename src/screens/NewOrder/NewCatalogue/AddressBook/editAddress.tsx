import React, { useState } from "react";
import { Breadcum } from "../../../../components/Layout/breadcum";
import BottomLayout from "../../../../components/Layout/bottomLayout";
import CustomInputBox from "../../../../components/Input";
import { useLocation } from "react-router-dom";

interface IEditAddressProps {}

const EditAddress: React.FunctionComponent<IEditAddressProps> = () => {
  // const {
  //   addressName,
  //   plotNo,
  //   locality,
  //   landmark,
  //   pincode,
  //   city,
  //   state,
  //   country,
  //   contactName,
  //   contactNo,
  // } = useLocation().state;
  const addressName = "";
  const plotNo = "";
  const locality = "";  
  const landmark = "";
  const pincode = "";
  const city = "";
  const state = "";
  const country = "";
  const contactName = "";
  const contactNo = "";

  return (
    <div className="h-full">
      <Breadcum label="Edit Address" />
      <div className="mx-5 mt-4 overflow-y-auto h-[575px]">
        <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <CustomInputBox
            label="Address Name"
            value={addressName}
            onChange={() => {}}
          />
          <CustomInputBox
            label="Plot no, Building Name"
            value={plotNo}
            onChange={() => {}}
          />
          <CustomInputBox
            label="Locality"
            value={locality}
            onChange={() => {}}
          />
          <CustomInputBox
            label="Landmark"
            value={landmark}
            onChange={() => {}}
          />
          <CustomInputBox label="Pincode" value={pincode} onChange={() => {}} />
          <CustomInputBox label="City" value={city} onChange={() => {}} />
          <CustomInputBox label="State" value={state} onChange={() => {}} />
          <CustomInputBox label="Country" value={country} onChange={() => {}} />
          <CustomInputBox
            label="Contact Name"
            value={contactName}
            onChange={() => {}}
          />
          <CustomInputBox
            label="Contact Number"
            value={contactNo}
            onChange={() => {}}
          />
        </div>
      </div>

      <BottomLayout callApi={() => {}} />
    </div>
  );
};

export default EditAddress;
