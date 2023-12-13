import React from "react";
import { Breadcrum } from "../../../components/Layout/breadcrum";
import LabelSizes from "./labelSetting/labelSizes";
import LabelCard from "./labelSetting/labelCard";
import BottomLayout from "../../../components/Layout/bottomLayout";
interface ILabelProps {}

const Label: React.FunctionComponent = (props: ILabelProps) => {
  // const payload: any = {
  //   labelSetting: [
  //     {
  //       buyerDetails: {
  //         name: true,
  //         mobile: true,
  //         address: true,
  //         pincode: true,
  //         state: true,
  //         city: true,
  //         country: true,
  //         gstNumber: true,
  //       },
  //     },
  //     {
  //       sellerDetails: {
  //         name: true,
  //         mobile: true,
  //         address: true,
  //         pincode: true,
  //         state: true,
  //         city: true,
  //         country: true,
  //         gstNumber: true,
  //         companyName: true,
  //         sellerLogo: true,
  //         shippedBy: true,
  //       },
  //     },
  //     {
  //       courierDetails: {
  //         courierName: true,
  //         awbBarcode: true,
  //         awb: true,
  //         routeCode: true,
  //         dimension: true,
  //         weight: true,
  //         clusterCode: true,
  //         serviceName: true,
  //       },
  //     },
  //     {
  //       otherDetails: {
  //         orderIdBarcode: true,
  //         orderId: true,
  //         creationDate: true,
  //         invoiceValue: true,
  //         paymentMode: true,
  //         collectableAmount: true,
  //         productDetails: true,
  //         productDimension: true,
  //         productWeight: true,
  //       },
  //     },
  //   ],
  // };
  return (
    <>
      <div>
        <Breadcrum label="Label Settings" />
      </div>
      <h1 className="font-Lato text-[22px] font-semibold leading-7 capitalize text-[#1C1C1C] mx-4 mt-[10px]">
        Step 1: Choose the paper size
      </h1>

      <LabelSizes />

      <h1 className="font-Lato text-[22px] font-semibold leading-7 capitalize text-[#1C1C1C] mx-4 mt-[10px]">
        Step 2: Customize your label
      </h1>

      <LabelCard />

      <BottomLayout />
    </>
  );
};

export default Label;
