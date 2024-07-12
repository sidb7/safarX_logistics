import React, { useState } from "react";
import { Breadcrum } from "../../components/Layout/breadcrum";
import AddressCardDetails from "./AddressDetails";
import ShippingDetails from "./ShippingDetails/index";
import BoxInfo from "./components/boxInfo";
import PackageDetails from "./PackageDetails.tsx";
import SummaryIcon from "../../assets/singleOrderSummary.svg";
import { CustomTable } from "../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { capitalizeFirstLetter } from "../../utils/utility";
import OneButton from "../../components/Button/OneButton";
import tickIcon from "../../assets/tick.svg";
import DownloadIcon from "../../assets/download.svg";

interface IIndexProps {}

const Index: React.FunctionComponent<IIndexProps> = (props) => {
  const columnsHelper = createColumnHelper<any>();
  const [order, setOrder] = useState({
    pickupDetails: {
      fullAddress: "",
      pincode: 0,
      contact: {
        name: "",
        mobileNo: 0,
      },
    },
    deliveryDetails: {
      fullAddress: "",
      pincode: 0,
      contact: {
        name: "",
        mobileNo: 0,
      },
      gstNumber: "",
    },
    boxInfo: [
      {
        name: "box_1",
        weightUnit: "Kg",
        deadWeight: 1,
        length: 1,
        breadth: 1,
        height: 1,
        measureUnit: "cm",
        products: [
          {
            name: "Apple Iphone",
            category: "Electronic",
            sku: "abc",
            qty: 2,
            unitPrice: 100,
            unitTax: 180,
            weightUnit: "kg",
            deadWeight: 1,
            length: 32,
            breadth: 32,
            height: 42,
            measureUnit: "cm",
          },
        ],
        codInfo: {
          isCod: false,
          collectableAmount: 0,
          invoiceValue: 2000,
        },
        podInfo: {
          isPod: false,
        },
        insurance: false,
      },
    ],
    orderType: "B2C",
    transit: "FORWARD",
    courierPartner: "Bluedart",
    source: "API",
    pickupDate: "1711606459000",
    gstNumber: "",
    orderId: "",
    eWayBillNo: 0,
    awb: "rr",
    brandName: "Google",
    brandLogo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/250px-Google_2015_logo.svg.png",
  });

  console.log("order", order);

  let data = [
    {
      id: 1,
      orderId: "12345",
      package: "WhiteBox",
      appliedWeight: 18,
      charge: 100,
    },
    {
      id: 2,
      orderId: "1234567",
      package: "BrownBox",
      appliedWeight: 22,
      charge: 999,
    },
  ];

  const SummaryColumns = [
    columnsHelper.accessor("serialNo", {
      header: () => {
        return (
          <p className="font-Open text-[10px] font-semibold leading-[16px] text-[#000000] text-center">
            Sr.No.
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="font-Open text-xs font-normal leading-[16px] text-[#000000] text-center p-[6px] ">
            {info.row.original.id || "-"}
          </div>
        );
      },
    }),
    columnsHelper.accessor("orderId", {
      header: () => {
        return (
          <p className="font-Open text-[10px] font-semibold leading-[16px] text-[#000000] text-center">
            Order ID
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="font-Open text-xs font-normal leading-[16px] text-[#000000] text-center p-[6px]">
            {info.row.original.orderId || "-"}
          </div>
        );
      },
    }),
    columnsHelper.accessor("package", {
      header: () => {
        return (
          <p className="font-Open text-[10px] font-semibold leading-[16px] text-[#000000] text-center">
            Package
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="font-Open text-xs font-normal leading-[16px] text-[#000000] text-center p-[6px]">
            {capitalizeFirstLetter(info.row.original.package) || "-"}
          </div>
        );
      },
    }),
    columnsHelper.accessor("appliedWeight", {
      header: () => {
        return (
          <p className="font-Open text-[10px] font-semibold leading-[16px] text-[#000000] text-center">
            Applied Weight
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="font-Open text-xs font-normal leading-[16px] text-[#000000] text-center p-[6px]">
            {info.row.original.appliedWeight || "-"}
          </div>
        );
      },
    }),

    columnsHelper.accessor("charge", {
      header: () => {
        return (
          <p className="font-Open text-[10px] font-semibold leading-[16px] text-[#000000] text-center">
            Charge
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="font-Open text-xs font-normal leading-[16px] text-[#000000] text-center p-[6px]">
            {info.row.original.charge || "-"}
          </div>
        );
      },
    }),
  ];

  const handlePickupDetailsChange = (newPickupDetails: any) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      pickupDetails: newPickupDetails,
    }));
  };

  const handleDeliveryDetailsChange = (newDeliveryDetails: any) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      deliveryDetails: newDeliveryDetails,
    }));
  };

  const summaryDetails = () => {
    return (
      <>
        <div className="border-[1px] rounded-md border-[#E8E8E8]">
          {/* header section  */}
          <div className="flex justify-start gap-x-2 p-5 items-center">
            <img src={SummaryIcon} alt="Summary-icon" />
            <p className="font-Open font-semibold leading-5 text-base capitalize">
              Summary
            </p>
          </div>
          {/* table section  */}
          <div className="px-5">
            <CustomTable
              data={data || []}
              columns={SummaryColumns}
              thclassName={"!w-auto "}
              tdclassName={"!w-auto"}
            />
          </div>
          <div className="flex justify-center items-center pt-5 pb-12">
            <OneButton
              onClick={() => {}}
              text={`Pay ₹ ${8000} `}
              variant="primary"
              className="!w-[228px]"
            />
          </div>

          {/* success part when payment done and order placed  */}
          <div>
            {/* success card  */}

            {/* <div className=" px-2 py-7">
              <div className="flex gap-x-[6px] px-4 py-1 bg-[#A3DA91] border rounded-lg items-center">
                <img src={tickIcon} alt="tick-icon" />
                <p className="text-xs font-Open font-semibold leading-[22px] text-[#1C1C1C]">
                  Congratulations! Your shipment has been booked successfully.
                  Please download and paste the shipping label on your package
                </p>
              </div>
            </div> */}

            {/* downloads */}

            {/* <div className="flex justify-center items-center gap-3 mb-5">
              <OneButton
                text={"Label"}
                onClick={() => {}}
                variant="quad"
                showIcon={true}
                icon={DownloadIcon}
                textTransform="capitalize"
              />
              <OneButton
                text={"Invoice"}
                onClick={() => {}}
                variant="quad"
                showIcon={true}
                icon={DownloadIcon}
                textTransform="capitalize"
              />
              <OneButton
                text={"Manifest"}
                onClick={() => {}}
                variant="quad"
                showIcon={true}
                icon={DownloadIcon}
                textTransform="capitalize"
              />
            </div> */}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <div>
        <Breadcrum label="Add New Order" />
        <div className="flex gap-5 mx-5">
          <div className="flex-1 ">
            <div className="flex flex-col gap-y-4  !h-[calc(100vh-180px)] customScroll">
              <div className=" h-[50%]">
                <AddressCardDetails
                  pickupDetails={order?.pickupDetails}
                  deliveryDetails={order?.deliveryDetails}
                  onPickupDetailsChange={handlePickupDetailsChange}
                  onDeliveryDetailsChange={handleDeliveryDetailsChange}
                />
              </div>
              <div className=" border rounded">
                <PackageDetails
                  packageDetails={order?.boxInfo}
                  setOrder={setOrder}
                />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-y-5">
              <div>
                <ShippingDetails />
              </div>
              <div>{summaryDetails()}</div>
              <div className="border-[1px] rounded-md border-[#E8E8E8]">
                <div className="flex justify-between items-center px-4 py-3">
                  <span className="font-Open font-semibold leading-[22px] text-base text-[#1C1C1C]">
                    Ready to place a new order? Click here!
                  </span>
                  <OneButton
                    onClick={() => {}}
                    text={`CREATE NEW ORDER `}
                    variant="primary"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
