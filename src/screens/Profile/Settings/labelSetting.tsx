import React, { useEffect, useState } from "react";
import { Breadcrum } from "../../../components/Layout/breadcrum";
import LabelSizes from "./labelSetting/labelSizes";
import LabelCard from "./labelSetting/labelCard";
import BottomLayout from "../../../components/Layout/bottomLayout";
import { v4 as uuidv4 } from "uuid";
import {
  GET_ADD_LABEL_DATA,
  POST_ADD_LABEL_DATA,
} from "../../../utils/ApiUrls";
import { GET, POST } from "../../../utils/webService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

interface ILabelProps {}

const Label: React.FunctionComponent = (props: ILabelProps) => {
  const navigate = useNavigate();
  const [getDefaultSettings, setDefaultSetting] = useState<any>();
  const [labelData, setLabelData] = useState({
    type: "B2C",
    labelId: uuidv4(),
    pageSize: "singlePage",
    labelsOnPage: 1,
    inputs: {
      buyerDetails: {
        required: true,
        name: false,
        mobile: false,
        address1: false,
        address2: false,
        pincode: false,
        state: false,
        city: false,
        country: false,
        gstNumber: false,
      },

      sellerDetails: {
        required: true,
        name: false,
        mobile: false,
        address1: false,
        address2: false,
        pincode: false,
        state: false,
        city: false,
        country: false,
        gstNumber: false,
        companyName: false,
        sellerLogo: false,
        shippedBy: false,
        multipleShipperName: false,
        serviceContactOnAddress: false,
        multipleShipperIndividualLogos: false,
        multipleShipperIndividualOrderId: false,
        showfooterLogo: false,
      },

      courierDetails: {
        required: true,
        courierName: false,
        awbBarcode: false,
        awb: false,
        routeCode: false,
        dimension: false,
        weight: false,
        clusterCode: false,
        serviceName: false,
      },
      orderDetails: {
        required: true,
        orderIdBarcode: false,
        orderId: false,
        creationDate: false,
        invoiceValue: false,
        paymentMode: false,
        collectableAmount: false,
        productDetails: false,
        productDimension: false,
        productWeight: false,
      },
    },
  });

  const pageSize = (data: any) => {
    setLabelData({ ...labelData, pageSize: data });
  };

  const perPageLabel = (data: any) => {
    setLabelData({ ...labelData, labelsOnPage: data });
  };

  console.log("label", labelData);

  const getLabelSettingApi = async () => {
    const getLabelSetting: any = await POST(GET_ADD_LABEL_DATA);
    setLabelData(getLabelSetting?.data?.data?.[0]);
  };

  useEffect(() => {
    getLabelSettingApi();
  }, []);

  const createLabel = async (e: any) => {
    if (labelData.pageSize !== "") {
      try {
        const payload = { labelSetting: labelData };
        const { data: createLabelResponse }: any = await POST(
          POST_ADD_LABEL_DATA,
          payload
        );
        if (createLabelResponse?.success) {
          toast.success(createLabelResponse?.message);
          navigate("/settings");
        } else {
          toast.error(createLabelResponse?.message);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      toast.error("please select anyone of the above page size");
    }
  };

  return (
    <>
      <div>
        <Breadcrum label="Label Settings" />
      </div>
      <div className="!pb-[50px]">
        <h1 className="font-Lato text-[22px] font-semibold leading-7 capitalize text-[#1C1C1C] mx-4 mt-[10px]">
          Step 1: Choose the paper size
        </h1>

        <LabelSizes
          pageSize={pageSize}
          labelData={labelData}
          perPageLabel={perPageLabel}
          // defaultLabelSetting={getDefaultSettings}
        />

        <h1 className="font-Lato text-[22px] font-semibold leading-7 capitalize text-[#1C1C1C] mx-4 mt-[10px]">
          Step 2: Customize your label
        </h1>

        <LabelCard labelData={labelData} setLabelData={setLabelData} />

        <BottomLayout callApi={(e: any) => createLabel(e)} />
      </div>
    </>
  );
};

export default Label;
