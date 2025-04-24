// import React, { useState } from "react";
// import { Breadcrum } from "../../components/Layout/breadcrum";
// import ExactStepper from "./ExactStepper";
// import Collapsible from "../../components/OneComponents/Collapsible"; // Update this path based on your project structure
// // import OrderDetails from "./OrderDetails";
// import OrderInformation from "./OrderInformation";
// import AddressForm from "./AddressForm";
// import OrderForm from "./OrderForm";
// import PaymentInformation from "./PaymentInformation";

// function OrderCreation() {
//   const [activeStep, setActiveStep] = useState(1);

//   //////////////////states for order information/////////////////
//   const [order, setOrder] = useState({ orderId: "", orderType: "B2C" });
//   const [sortServiciblity, setSortServiciblity] = useState("");
//   const [highLightField, setHighLightField] = useState({
//     addressDetails: false,
//     packageDetails: false,
//     orderDetails: false,
//     shippingDetails: false,
//     pickupTimeDetails: false,
//   });
//   const [showDownloadLebal, setShowDownloadLebal] = useState(false);
//   const [visibility, setVisibility] = useState(false);
//   ///////////////////////////////////////////////////////////////////

//   /////////////////// Address Form states///////////////////////////
//   const [showPickupDetails, setShowPickupDetails] = useState(true);
//   const [showDeliveryDetails, setShowDeliveryDetails] = useState(true);
//   const [isPickupModalOpen, setIsPickupModalOpen] = useState(false);
//   const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
//   const [pickupFormValues, setPickupFormValues] = useState({
//     contactNo: "",
//     address: "",
//     name: "",
//     pincode: "",
//     city: "",
//     state: "",
//     addressLine1: "",
//     addressLine2: "",
//     landmark: "",
//     gstNo: "",
//     email: "",
//   });
//   const [deliveryFormValues, setDeliveryFormValues] = useState({
//     contactNo: "",
//     address: "",
//     name: "",
//     pincode: "",
//     city: "",
//     state: "",
//     addressLine1: "",
//     addressLine2: "",
//     landmark: "",
//     gstNo: "",
//     email: "",
//   });
//   const [pickupAddress, setPickupAddress] = useState(null);
//   const [deliveryAddress, setDeliveryAddress] = useState(null);
//   const [isLoading, setIsLoading] = useState({
//     pickup: false,
//     delivery: false,
//   });
//   const [pickupSearchResults, setPickupSearchResults] = useState([]);
//   const [deliverySearchResults, setDeliverySearchResults] = useState([]);
//   const [showPickupSearchResults, setShowPickupSearchResults] = useState(false);
//   const [showDeliverySearchResults, setShowDeliverySearchResults] =
//     useState(false);

//   ////////////////////////////////////////////////////////////////////////////////////

//   ////////////////// Payment Information states /////////////////////
//   const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
//   const [collectibleAmount, setCollectibleAmount] = useState("");
//   const [insuranceOption, setInsuranceOption] = useState("noInsurance");
//   ////////////////////////////////////////////////////////////////////////////////////

//   const steps = [
//     {
//       id: 1,
//       title: "Order Details",
//       description: "Fill your order details here",
//     },
//     {
//       id: 2,
//       title: "Shipping Options",
//       description: "Select service for your order",
//     },
//   ];

//   return (
//     <div className="p-6">
//       {/* Breadcrumb */}
//       <div className="mb-2">
//         <Breadcrum label="Order Creation" />
//       </div>

//       {/* Stepper Tabs */}

//       <ExactStepper
//         steps={steps}
//         activeStep={activeStep}
//         setActiveStep={setActiveStep}
//       />

//       {/* Step Content */}
//       <div className="">
//         {activeStep === 1 ? (
//           <div>
//             {/* <OrderDetails/> */}
//             <Collapsible title="Order Information" className="mb-10">
//               <OrderInformation
//                 order={order}
//                 setOrder={setOrder}
//                 showDownloadLebal={showDownloadLebal}
//                 visibility={visibility}
//                 setVisibility={setVisibility}
//                 setSortServiciblity={setSortServiciblity}
//                 setHighLightField={setHighLightField}
//               />
//             </Collapsible>

//             <>
//               <Collapsible
//                 title="Where should we pick up and deliver your order?"
//                 className="mb-10"
//               >
//                 <AddressForm
//                   showPickupDetails={showPickupDetails}
//                   setShowPickupDetails={setShowPickupDetails}
//                   showDeliveryDetails={showDeliveryDetails}
//                   setShowDeliveryDetails={setShowDeliveryDetails}
//                   isPickupModalOpen={isPickupModalOpen}
//                   setIsPickupModalOpen={setIsPickupModalOpen}
//                   isDeliveryModalOpen={isDeliveryModalOpen}
//                   setIsDeliveryModalOpen={setIsDeliveryModalOpen}
//                   pickupFormValues={pickupFormValues}
//                   setPickupFormValues={setPickupFormValues}
//                   deliveryFormValues={deliveryFormValues}
//                   setDeliveryFormValues={setDeliveryFormValues}
//                   pickupAddress={pickupAddress}
//                   setPickupAddress={setPickupAddress}
//                   deliveryAddress={deliveryAddress}
//                   setDeliveryAddress={setDeliveryAddress}
//                   isLoading={isLoading}
//                   setIsLoading={setIsLoading}
//                   pickupSearchResults={pickupSearchResults}
//                   setPickupSearchResults={setPickupSearchResults}
//                   deliverySearchResults={deliverySearchResults}
//                   setDeliverySearchResults={setDeliverySearchResults}
//                   showPickupSearchResults={showPickupSearchResults}
//                   setShowPickupSearchResults={setShowPickupSearchResults}
//                   showDeliverySearchResults={showDeliverySearchResults}
//                   setShowDeliverySearchResults={setShowDeliverySearchResults}
//                 />
//               </Collapsible>
//             </>
//             <Collapsible
//               title="Let us know your package information"
//               className="mb-10"
//             >
//               <OrderForm />
//             </Collapsible>
//             <Collapsible title="Payment Information" className="mb-10">
//               <PaymentInformation
//                 paymentMethod={paymentMethod}
//                 setPaymentMethod={setPaymentMethod}
//                 collectibleAmount={collectibleAmount}
//                 setCollectibleAmount={setCollectibleAmount}
//                 insuranceOption={insuranceOption}
//                 setInsuranceOption={setInsuranceOption}
//               />
//             </Collapsible>
//           </div>
//         ) : (
//           <div>
//             <h3 className="text-lg font-medium mb-4">Select Shipping Method</h3>
//             {/* Add shipping options here */}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default OrderCreation;



import React, { useState } from "react";
import { Breadcrum } from "../../components/Layout/breadcrum";
import ExactStepper from "./ExactStepper";
import Collapsible from "../../components/OneComponents/Collapsible"; 
import OrderInformation from "./OrderInformation";
import AddressForm from "./AddressForm";
import OrderForm from "./OrderForm";
import OrderFormB2B from "./OrderFormB2B"; // Import the new B2B component
import PaymentInformation from "./PaymentInformation"; 

// Define BoxData interface to match what comes from OrderForm
interface BoxInfo {
  l: string | number;
  b: string | number;
  h: string | number;
  discount: string | number;
  tax: string | number;
  hsn: string;
  sku: string;
}

interface Product {
  id: number;
  name: string;
  quantity: string | number;
  unitPrice: string | number;
  unitWeight: string | number;
  totalPrice: string | number;
  totalWeight: string | number;
  boxInfo: BoxInfo;
  isExpanded: boolean;
  selectedSuggestion: any | null;
  isManuallyEdited: boolean;
}

interface BoxDimensions {
  l: string | number;
  b: string | number;
  h: string | number;
  weight: string | number;
  name: string; 
  isManuallyEdited: boolean;
}

interface BoxData {
  id: number;
  dimensions: BoxDimensions;
  products: Product[];
  selectedBoxSuggestion: any | null;
}

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
  const [showDeliverySearchResults, setShowDeliverySearchResults] = useState(false);
  ////////////////////////////////////////////////////////////////////////////////////

  ////////////////// Package Information states /////////////////////
  // Update packageDetails to include the full BoxData structure from OrderForm
  const [packageDetails, setPackageDetails] = useState({
    packageType: "",
    weight: "",
    dimensions: {
      length: "",
      width: "",
      height: ""
    },
    itemDescription: "",
    itemValue: "",
    totalItems: "1"
  });
  
  // New state to store the full box data from OrderForm
  const [boxesData, setBoxesData] = useState<BoxData[]>([]);
  ////////////////////////////////////////////////////////////////////////////////////

  ////////////////// Payment Information states /////////////////////
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [collectibleAmount, setCollectibleAmount] = useState("");
  const [insuranceOption, setInsuranceOption] = useState("noInsurance");
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

  // Handle box data updates from OrderForm
  const handleBoxDataUpdate = (boxes: BoxData[]) => {
    setBoxesData(boxes);
    
    // Also update packageDetails if at least one box exists
    if (boxes.length > 0) {
      const firstBox = boxes[0];
      setPackageDetails({
        packageType: firstBox.dimensions.name?.toString() || "",
        weight: firstBox.dimensions.weight?.toString() || "",
        dimensions: {
          length: firstBox.dimensions.l?.toString() || "",
          width: firstBox.dimensions.b?.toString() || "",
          height: firstBox.dimensions.h?.toString() || ""
        },
        itemDescription: firstBox.products.length > 0 ? firstBox.products[0].name?.toString() || "" : "",
        itemValue: firstBox.products.reduce((total, product) => 
          total + (Number(product.totalPrice) || 0), 0).toString(),
        totalItems: firstBox.products.length.toString()
      });
    }
  };

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
              {/* Conditionally render OrderForm or OrderFormB2B based on orderType */}
              {order.orderType === "B2C" ? (
                <OrderForm onBoxDataUpdate={handleBoxDataUpdate} />
              ) : (
                <OrderFormB2B  />
              )}
            </Collapsible>

            <Collapsible
              title="Payment Information"
              className="mb-10"
            >
              <PaymentInformation
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                collectibleAmount={collectibleAmount}
                setCollectibleAmount={setCollectibleAmount}
                insuranceOption={insuranceOption}
                setInsuranceOption={setInsuranceOption}
              />
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





// import React, { useState } from "react";
// import { Breadcrum } from "../../components/Layout/breadcrum";
// import ExactStepper from "./ExactStepper";
// import Collapsible from "../../components/OneComponents/Collapsible"; 
// // import OrderDetails from "./OrderDetails";
// import OrderInformation from "./OrderInformation";
// import AddressForm from "./AddressForm";
// import OrderForm from "./OrderForm";
// import PaymentInformation from "./PaymentInformation"; 
// import OrderSummary from "./OrderSummary"; 

// // Define BoxData interface to match what comes from OrderForm
// interface BoxInfo {
//   l: string | number;
//   b: string | number;
//   h: string | number;
//   discount: string | number;
//   tax: string | number;
//   hsn: string;
//   sku: string;
// }

// interface Product {
//   id: number;
//   name: string;
//   quantity: string | number;
//   unitPrice: string | number;
//   unitWeight: string | number;
//   totalPrice: string | number;
//   totalWeight: string | number;
//   boxInfo: BoxInfo;
//   isExpanded: boolean;
//   selectedSuggestion: any | null;
//   isManuallyEdited: boolean;
// }

// interface BoxDimensions {
//   l: string | number;
//   b: string | number;
//   h: string | number;
//   weight: string | number;
//   name: string; 
//   isManuallyEdited: boolean;
// }

// interface BoxData {
//   id: number;
//   dimensions: BoxDimensions;
//   products: Product[];
//   selectedBoxSuggestion: any | null;
// }

// function OrderCreation() {
//   const [activeStep, setActiveStep] = useState(1);

//   //////////////////states for order information/////////////////
//   const [order, setOrder] = useState({ orderId: "", orderType: "B2C" });
//   const [sortServiciblity, setSortServiciblity] = useState("");
//   const [highLightField, setHighLightField] = useState({
//     addressDetails: false,
//     packageDetails: false,
//     orderDetails: false,
//     shippingDetails: false,
//     pickupTimeDetails: false,
//   });
//   const [showDownloadLebal, setShowDownloadLebal] = useState(false);
//   const [visibility, setVisibility] = useState(false);
//   ///////////////////////////////////////////////////////////////////

//   /////////////////// Address Form states///////////////////////////
//   const [showPickupDetails, setShowPickupDetails] = useState(true);
//   const [showDeliveryDetails, setShowDeliveryDetails] = useState(true);
//   const [isPickupModalOpen, setIsPickupModalOpen] = useState(false);
//   const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
//   const [pickupFormValues, setPickupFormValues] = useState({
//     contactNo: "",
//     address: "",
//     name: "",
//     pincode: "",
//     city: "",
//     state: "",
//     addressLine1: "",
//     addressLine2: "",
//     landmark: "",
//     gstNo: "",
//     email: "",
//   });
//   const [deliveryFormValues, setDeliveryFormValues] = useState({
//     contactNo: "",
//     address: "",
//     name: "",
//     pincode: "",
//     city: "",
//     state: "",
//     addressLine1: "",
//     addressLine2: "",
//     landmark: "",
//     gstNo: "",
//     email: "",
//   });
//   const [pickupAddress, setPickupAddress] = useState(null);
//   const [deliveryAddress, setDeliveryAddress] = useState(null);
//   const [isLoading, setIsLoading] = useState({
//     pickup: false,
//     delivery: false,
//   });
//   const [pickupSearchResults, setPickupSearchResults] = useState([]);
//   const [deliverySearchResults, setDeliverySearchResults] = useState([]);
//   const [showPickupSearchResults, setShowPickupSearchResults] = useState(false);
//   const [showDeliverySearchResults, setShowDeliverySearchResults] = useState(false);
//   ////////////////////////////////////////////////////////////////////////////////////

//   ////////////////// Package Information states /////////////////////
//   // Update packageDetails to include the full BoxData structure from OrderForm
//   const [packageDetails, setPackageDetails] = useState({
//     packageType: "",
//     weight: "",
//     dimensions: {
//       length: "",
//       width: "",
//       height: ""
//     },
//     itemDescription: "",
//     itemValue: "",
//     totalItems: "1"
//   });
  
//   // New state to store the full box data from OrderForm
//   const [boxesData, setBoxesData] = useState<BoxData[]>([]);
//   ////////////////////////////////////////////////////////////////////////////////////

//   ////////////////// Payment Information states /////////////////////
//   const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
//   const [collectibleAmount, setCollectibleAmount] = useState("");
//   const [insuranceOption, setInsuranceOption] = useState("noInsurance");
//   ////////////////////////////////////////////////////////////////////////////////////

//   const steps = [
//     {
//       id: 1,
//       title: "Order Details",
//       description: "Fill your order details here",
//     },
//     {
//       id: 2,
//       title: "Shipping Options",
//       description: "Select service for your order",
//     },
//   ];

//   // Handle box data updates from OrderForm
//   const handleBoxDataUpdate = (boxes: BoxData[]) => {
//     setBoxesData(boxes);
    
//     // Also update packageDetails if at least one box exists
//     if (boxes.length > 0) {
//       const firstBox = boxes[0];
//       setPackageDetails({
//         packageType: firstBox.dimensions.name?.toString() || "",
//         weight: firstBox.dimensions.weight?.toString() || "",
//         dimensions: {
//           length: firstBox.dimensions.l?.toString() || "",
//           width: firstBox.dimensions.b?.toString() || "",
//           height: firstBox.dimensions.h?.toString() || ""
//         },
//         itemDescription: firstBox.products.length > 0 ? firstBox.products[0].name?.toString() || "" : "",
//         itemValue: firstBox.products.reduce((total, product) => 
//           total + (Number(product.totalPrice) || 0), 0).toString(),
//         totalItems: firstBox.products.length.toString()
//       });
//     }
//   };

//   return (
//     <div className="p-6">
//       {/* Breadcrumb */}
//       <div className="mb-2">
//         <Breadcrum label="Order Creation" />
//       </div>

//       {/* Stepper Tabs */}
//       <ExactStepper
//         steps={steps}
//         activeStep={activeStep}
//         setActiveStep={setActiveStep}
//       />

//       {/* Step Content */}
//       <div className="">
//         {activeStep === 1 ? (
//           <div>
//             {/* <OrderDetails/> */}
//             <Collapsible title="Order Information" className="mb-10">
//               <OrderInformation
//                 order={order}
//                 setOrder={setOrder}
//                 showDownloadLebal={showDownloadLebal}
//                 visibility={visibility}
//                 setVisibility={setVisibility}
//                 setSortServiciblity={setSortServiciblity}
//                 setHighLightField={setHighLightField}
//               />
//             </Collapsible>
          
//               <>
//                 <Collapsible
//                   title="Where should we pick up and deliver your order?"
//                   className="mb-10"
//                 >
//                   <AddressForm
//                     showPickupDetails={showPickupDetails}
//                     setShowPickupDetails={setShowPickupDetails}
//                     showDeliveryDetails={showDeliveryDetails}
//                     setShowDeliveryDetails={setShowDeliveryDetails}
//                     isPickupModalOpen={isPickupModalOpen}
//                     setIsPickupModalOpen={setIsPickupModalOpen}
//                     isDeliveryModalOpen={isDeliveryModalOpen}
//                     setIsDeliveryModalOpen={setIsDeliveryModalOpen}
//                     pickupFormValues={pickupFormValues}
//                     setPickupFormValues={setPickupFormValues}
//                     deliveryFormValues={deliveryFormValues}
//                     setDeliveryFormValues={setDeliveryFormValues}
//                     pickupAddress={pickupAddress}
//                     setPickupAddress={setPickupAddress}
//                     deliveryAddress={deliveryAddress}
//                     setDeliveryAddress={setDeliveryAddress}
//                     isLoading={isLoading}
//                     setIsLoading={setIsLoading}
//                     pickupSearchResults={pickupSearchResults}
//                     setPickupSearchResults={setPickupSearchResults}
//                     deliverySearchResults={deliverySearchResults}
//                     setDeliverySearchResults={setDeliverySearchResults}
//                     showPickupSearchResults={showPickupSearchResults}
//                     setShowPickupSearchResults={setShowPickupSearchResults}
//                     showDeliverySearchResults={showDeliverySearchResults}
//                     setShowDeliverySearchResults={setShowDeliverySearchResults}
//                   />
//                 </Collapsible>
//               </>
              
//               <Collapsible  
//                 title="Let us know your package information"
//                 className="mb-10"
//               >
//                 <OrderForm onBoxDataUpdate={handleBoxDataUpdate} />
//               </Collapsible>

//               <Collapsible
//                 title="Payment Information"
//                 className="mb-10"
//               >
//                 <PaymentInformation
//                   paymentMethod={paymentMethod}
//                   setPaymentMethod={setPaymentMethod}
//                   collectibleAmount={collectibleAmount}
//                   setCollectibleAmount={setCollectibleAmount}
//                   insuranceOption={insuranceOption}
//                   setInsuranceOption={setInsuranceOption}
//                 />
//               </Collapsible>
              
//               {/* Order Summary displayed directly below Payment Information */}
//               {/* <div className="mt-10 mb-10">
//                 <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
//                 <OrderSummary
//                   order={order}
//                   pickupAddress={pickupAddress}
//                   deliveryAddress={deliveryAddress}
//                   pickupFormValues={pickupFormValues}
//                   deliveryFormValues={deliveryFormValues}
//                   packageDetails={packageDetails}
//                   paymentMethod={paymentMethod}
//                   collectibleAmount={collectibleAmount}
//                   insuranceOption={insuranceOption}
//                   boxesData={boxesData} // Pass the complete boxes data to OrderSummary
//                 />
//               </div> */}
//           </div>
//         ) : (
//           <div>
//             <h3 className="text-lg font-medium mb-4">Select Shipping Method</h3>
//             {/* Add shipping options here */}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default OrderCreation;
