import React from "react";
import "../../styles/paymentLoader.css";

const PaymentLoader = () => {
  function Animation() {
    return (
      <div className="animation">
        <div className="container">
          <div className="balls">
            <div className="ball ball-one" />
            <div className="ball ball-two" />
            <div className="ball ball-three" />
            <div className="ball ball-four" />
            <div className="shadow shadow-one" />
            <div className="shadow shadow-two" />
            <div className="shadow shadow-three" />
            <div className="shadow shadow-four" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="jusPayProcessing">
      <Animation />
      <div className="text">
        <h1 className="font-normal text-xl">Processing JusPay Payment</h1>
      </div>
    </div>
  );
};

export default PaymentLoader;
