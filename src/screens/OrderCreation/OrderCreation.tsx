import React, { useState } from "react";
import { Breadcrum } from "../../components/Layout/breadcrum";
import ExactStepper from "./ExactStepper";
import Collapsible from "../../components/OneComponents/Collapsible"; // Update this path based on your project structure
// import OrderDetails from "./OrderDetails";
import OrderInformation from "./OrderInformation";
import AddressForm from "./AddressForm";
import OrderForm from "./OrderForm";

function OrderCreation() {
  const [activeStep, setActiveStep] = useState(1);

  //////////////////states for order information/////////////////
  const [order, setOrder] = useState({ orderId: "", orderType: "B2C" });
  const [sortServiciblity, setSortServiciblity] = useState("");
  const [highLightField, setHighLightField] = useState({
    addressDetails: false,
    packageDetails: false,
    orderDetails: false,
    shippingDetails: false,
    pickupTimeDetails: false,
  });
  const [showDownloadLebal, setShowDownloadLebal] = useState(false);
  const [visibility, setVisibility] = useState(false);
  ///////////////////////////////////////////////////////////////////

  /////////////////// Address Form states///////////////////////////
  const [showPickupDetails, setShowPickupDetails] = useState(true);
  const [showDeliveryDetails, setShowDeliveryDetails] = useState(true);
  const [isPickupModalOpen, setIsPickupModalOpen] = useState(false);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [pickupFormValues, setPickupFormValues] = useState({
    contactNo: "",
    address: "",
    name: "",
    pincode: "",
    city: "",
    state: "",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    gstNo: "",
    email: "",
  });
  const [deliveryFormValues, setDeliveryFormValues] = useState({
    contactNo: "",
    address: "",
    name: "",
    pincode: "",
    city: "",
    state: "",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    gstNo: "",
    email: "",
  });
  const [pickupAddress, setPickupAddress] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [isLoading, setIsLoading] = useState({
    pickup: false,
    delivery: false,
  });
  const [pickupSearchResults, setPickupSearchResults] = useState([]);
  const [deliverySearchResults, setDeliverySearchResults] = useState([]);
  const [showPickupSearchResults, setShowPickupSearchResults] = useState(false);
  const [showDeliverySearchResults, setShowDeliverySearchResults] =
    useState(false);

  ////////////////////////////////////////////////////////////////////////////////////

  const steps = [
    {
      id: 1,
      title: "Order Details",
      description: "Fill your order details here",
    },
    {
      id: 2,
      title: "Shipping Options",
      description: "Select service for your order",
    },
  ];

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="mb-2">
        <Breadcrum label="Order Creation" />
      </div>

      {/* Stepper Tabs */}

      <ExactStepper
        steps={steps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />

      {/* Step Content */}
      <div className="">
        {activeStep === 1 ? (
          <div>
            {/* <OrderDetails/> */}
            <Collapsible title="Order Information" className="mb-10">
              <OrderInformation
                order={order}
                setOrder={setOrder}
                showDownloadLebal={showDownloadLebal}
                visibility={visibility}
                setVisibility={setVisibility}
                setSortServiciblity={setSortServiciblity}
                setHighLightField={setHighLightField}
              />
            </Collapsible>
          
              <>
                <Collapsible
                  title="Where should we pick up and deliver your order?"
                  className="mb-10"
                >
                  <AddressForm
                    showPickupDetails={showPickupDetails}
                    setShowPickupDetails={setShowPickupDetails}
                    showDeliveryDetails={showDeliveryDetails}
                    setShowDeliveryDetails={setShowDeliveryDetails}
                    isPickupModalOpen={isPickupModalOpen}
                    setIsPickupModalOpen={setIsPickupModalOpen}
                    isDeliveryModalOpen={isDeliveryModalOpen}
                    setIsDeliveryModalOpen={setIsDeliveryModalOpen}
                    pickupFormValues={pickupFormValues}
                    setPickupFormValues={setPickupFormValues}
                    deliveryFormValues={deliveryFormValues}
                    setDeliveryFormValues={setDeliveryFormValues}
                    pickupAddress={pickupAddress}
                    setPickupAddress={setPickupAddress}
                    deliveryAddress={deliveryAddress}
                    setDeliveryAddress={setDeliveryAddress}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    pickupSearchResults={pickupSearchResults}
                    setPickupSearchResults={setPickupSearchResults}
                    deliverySearchResults={deliverySearchResults}
                    setDeliverySearchResults={setDeliverySearchResults}
                    showPickupSearchResults={showPickupSearchResults}
                    setShowPickupSearchResults={setShowPickupSearchResults}
                    showDeliverySearchResults={showDeliverySearchResults}
                    setShowDeliverySearchResults={setShowDeliverySearchResults}
                  />
                </Collapsible>
              </>
              <Collapsible  
                title="Let us know your package information"
                className="mb-10"
              >
               <OrderForm/>
                  </Collapsible>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-medium mb-4">Select Shipping Method</h3>
            {/* Add shipping options here */}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderCreation;
