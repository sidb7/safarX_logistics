import React, { useState } from "react";
import { Breadcrum } from "../../components/Layout/breadcrum";
import AddressCardDetails from "./AddressDetails";
import Ship from "./PackageDetais/index";

import BoxInfo from "./components/boxInfo";
import PackageDetails from "./PackageDetails.tsx";

interface IIndexProps {}

const Index: React.FunctionComponent<IIndexProps> = (props) => {
  const [order, setOrder] = useState({
    pickupDetails: {
      fullAddress: "201  Goregaon West, Mumbai, Maharashtra 400062",
      pincode: 400062,
      contact: {
        name: "atul",
        mobileNo: 1234567890,
      },
    },
    deliveryDetails: {
      fullAddress: "201  Goregaon West, Mumbai, Maharashtra 400062",
      pincode: 400018,
      contact: {
        name: "atul",
        mobileNo: 1234567890,
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

  return (
    <>
      <div>
        <Breadcrum label="Add New Order" />
        <div className="flex gap-5 mx-5">
          <div className="flex-1 ">
            <div className="flex flex-col gap-y-4 border-1 border-gray-300 !h-[calc(100vh-180px)] customScroll">
              <div className=" border-2 border-gray-300 h-[50%]">
                <AddressCardDetails />
              </div>

              {/* Amit */}

              <div className=" border rounded">
                <PackageDetails
                  packageDetails={order?.boxInfo}
                  setOrder={setOrder}
                />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-col">
              <Ship />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
