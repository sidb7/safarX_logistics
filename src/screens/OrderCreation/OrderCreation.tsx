import React, { useState } from "react";
import { Breadcrum } from "../../components/Layout/breadcrum";
import ExactStepper from "./ExactStepper";
import Collapsible from "../../components/OneComponents/Collapsible"; // Update this path based on your project structure
import OrderDetails from "./OrderDetails";

function OrderCreation() {
  const [activeStep, setActiveStep] = useState(1);

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
            <OrderDetails/>
           
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
