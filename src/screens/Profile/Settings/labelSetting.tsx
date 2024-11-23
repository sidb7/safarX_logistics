import React, { useEffect, useState } from "react";
import { Breadcrum } from "../../../components/Layout/breadcrum";
import LabelSizes from "./labelSetting/labelSizes";
import LabelCard from "./labelSetting/labelCard";
import BottomLayout from "../../../components/Layout/bottomLayout";
import { v4 as uuidv4 } from "uuid";
import {
  GET_ADD_LABEL_DATA,
  POST_ADD_LABEL_DATA,
  PREVIEW_LABEL_DATA,
} from "../../../utils/ApiUrls";
import { GET, POST } from "../../../utils/webService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import OneButton from "../../../components/Button/OneButton";
import { Spinner } from "../../../components/Spinner";

interface ILabelProps {}

const Label: React.FunctionComponent = (props: ILabelProps) => {
  const navigate = useNavigate();
  const [getDefaultSettings, setDefaultSetting] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [previewLoading, setpreviewLoading] = useState(false);
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
        productValue: false,
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

  const createLabel = async () => {
    if (labelData.pageSize !== "") {
      try {
        setLoading(true);
        const payload = { labelSetting: labelData };
        console.log("🚀 ~ createLabel ~ payload:", payload);
        const { data: createLabelResponse }: any = await POST(
          POST_ADD_LABEL_DATA,
          payload
        );
        if (createLabelResponse?.success) {
          toast.success(createLabelResponse?.message);
          setLoading(false);
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

  const previewLabel = async () => {
    if (labelData.pageSize !== "") {
      try {
        setpreviewLoading(true);
        const payload = { labelSetting: labelData };
        const { data: createLabelResponse }: any = await POST(
          PREVIEW_LABEL_DATA,
          payload,
          {
            responseType: "blob", // Important for handling binary data
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setpreviewLoading(false);

        const blob = new Blob([createLabelResponse], {
          type: "application/pdf",
        });

        const url = URL.createObjectURL(blob);

        // Open the PDF in a new tab
        window.open(url, "_blank");

        // Cleanup
        URL.revokeObjectURL(url);
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

        {/* <BottomLayout callApi={(e: any) => createLabel(e)} /> */}
        <footer className="w-full fixed lg:-ml-2 bottom-0">
          <div className="grid grid-cols-2 shadow-lg border-[1px] bg-[#FFFFFF] gap-[32px] p-[24px] rounded-tr-[24px] rounded-tl-[24px] fixed w-full bottom-0 lg:flex lg:justify-end lg:!w-[calc(100%-64px)]">
            <OneButton
              text={
                previewLoading ? (
                  <div className="flex">
                    <Spinner />
                  </div>
                ) : (
                  "Preview Label"
                )
              }
              className="flex justify-center items-center rounded-md w-full lg:w-[100px] h-9 p-2"
              variant="secondary"
              onClick={() => previewLabel()}
              size="medium"
            />
            <OneButton
              text={
                loading ? (
                  <div className="flex">
                    <Spinner />
                  </div>
                ) : (
                  "Save"
                )
              }
              className={`${
                loading ? "bg-white text-black" : "bg-[#1C1C1C] text-[#FFFFFF]"
              }  lg:w-[100px]  !border-0" : ""}`}
              variant={loading ? "secondary" : "primary"}
              onClick={async () => {
                if (!loading) {
                  setLoading(true);
                  createLabel();
                }
              }}
              size="medium"
            />
          </div>
        </footer>
      </div>
    </>
  );
};

export default Label;
