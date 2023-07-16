import React from "react";
import Card from "./card";
import ServiceButton from "../../../../components/Button/ServiceButton";

import WelcomeHeader from "../welcomeHeader";
import { useNavigate } from "react-router-dom";

type Props = {};

const BusinessType = (props: Props) => {
  const navigate = useNavigate();

  return (
    <div className="px-5 relative ">
      <WelcomeHeader
        title="Welcome to Shipyaari"
        content="Kindly complete your KYC"
      />

      <div className="flex flex-col items-center  mb-10">
        <p className="font-semibold text-[18px] text-[#1C1C1C] mb-7">
          Please confirm your business type
        </p>
        <Card
          name="business"
          value="Individual"
          title="Individual"
          subTitle="Shipper not having GST"
        />

        <Card
          name="business"
          value="Sole Proprietor"
          title="Sole Proprietor"
          subTitle="Entity having GST(Proprietorship,Partnership,HUF,AOP,or Charitable Trust etc)"
        />

        <Card
          name="business"
          value="Company"
          title="Company"
          subTitle="Entity Registered as Private Ltd, LLP, One Person Company or Public ltd under Companies Act "
        />
      </div>
      <div className="flex flex-col fixed bottom-0 right-5 left-5  pb-12">
        <ServiceButton
          text="PROCEED FOR KYC"
          className="bg-[#1C1C1C]  text-white !py-2 !px-4 mb-4"
          onClick={() => {
            navigate("/account/kyc-photo");
          }}
        />

        <ServiceButton
          text="SKIP FOR NOW"
          className="!text-[#004EFF] !font-semibold !text-[14px]  underline !border-none"
        />
      </div>
    </div>
  );
};

export default BusinessType;
