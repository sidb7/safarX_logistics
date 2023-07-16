import React from "react";
import WelcomeHeader from "../welcomeHeader";
import ServiceButton from "../../../../components/Button/ServiceButton";
import CustomCheckBox from "../../../../components/CheckBox";
import Card from "./Card";

import { useNavigate } from "react-router-dom";

type Props = {};

const BottomButton = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center   pb-4 gap-y-5   ">
      <div className="flex items-center">
        <CustomCheckBox />
        <p className="font-normal text-[12px] text-[#494949]">
          I Agree with the terms & conditions
        </p>
      </div>

      <ServiceButton
        text="ACCEPT AND CONTINUE"
        className="bg-[#1C1C1C] text-white w-full mb-5"
        onClick={() => {
          navigate("/account/kyc-modal");
        }}
      />
    </div>
  );
};

export const GSTComponent = (props: Props) => {
  return (
    <div className="relative px-5 top-0 ">
      <WelcomeHeader title="Welcome to Shipyaari" content="Terms & Agreement" />
      <div className="mb-8">
        <Card
          title="DECLARATION OF GST NON-ENROLMENT"
          subTitleOne="Sub: Declaration of:"
        />
      </div>
      {BottomButton()}
    </div>
  );
};

export const ServiceComponent = (props: Props) => {
  return (
    <div className="relative px-5">
      <WelcomeHeader title="Welcome to Shipyaari" content="Terms & Agreement" />
      <div className="mb-8">
        <Card
          title="SERVICE AGREEMENT"
          subTitleOne="Forward delivery of the shipments"
        />
      </div>
      {BottomButton()}
    </div>
  );
};
