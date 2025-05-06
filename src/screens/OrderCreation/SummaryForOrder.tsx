
// import React, { useState, useEffect } from 'react';
// import { POST } from '../../utils/webService';
// import { GET_LATEST_ORDER } from '../../utils/ApiUrls';

// interface PickupDetailsProps {
//   name: string;
//   phone: string;
// }

// interface DeliveryDetailsProps {
//   name: string;
//   phone: string;
// }

// interface PackageDetailsProps {
//   boxes: number;
//   totalWeight: string;
//   invoice: string;
//   insurance: string;
// }

// interface ShippingDetailsProps {
//   courier: string;
//   courierType: string;
//   zone: string;
//   paymentMode: string;
//   basePrice: string;
//   grandTotal: string;
//   variableCharges: string;
//   codHandlingFees: string;
//   yaariCash: string;
//   shippingCost: string;
//   gstPercentage: number;
// }

// interface SummaryForOrderProps {
//   pickupDetails?: PickupDetailsProps;
//   deliveryDetails?: DeliveryDetailsProps;
//   packageDetails?: PackageDetailsProps;
//   shippingDetails?: ShippingDetailsProps;
//   tempOrderId?: string;
//   orderSource?: string;
//   // Added prop to track the selected service
//   selectedServiceId?: string;
// }

// const SummaryForOrder: React.FC<SummaryForOrderProps> = (props) => {
//   const { tempOrderId, orderSource, selectedServiceId } = props;
  
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [orderData, setOrderData] = useState<any>(null);

//   // Fetch the latest order data with a short delay to ensure backend processing is complete
//   useEffect(() => {
//     // Only fetch if tempOrderId and orderSource are provided
//     if (tempOrderId && orderSource) {
//       // Clear any previous data when selection changes
//       setOrderData(null);
      
//       // Set loading state immediately
//       setIsLoading(true);
      
//       // Add a short delay to allow backend to process the service selection
//       const timer = setTimeout(() => {
//         fetchLatestOrder();
//       }, 500); // 500ms delay
      
//       return () => clearTimeout(timer);
//     }
//   }, [tempOrderId, orderSource, selectedServiceId]); // Added selectedServiceId as dependency

//   const fetchLatestOrder = async () => {
//     if (!tempOrderId || !orderSource) return;

//     setError(null);

//     try {
//       const response = await POST(GET_LATEST_ORDER, {
//         tempOrderId: tempOrderId,
//         source: orderSource
//       });

//       if (response?.data?.success) {
//         const fetchedOrder = response.data.data[0];
        
//         // Transform the API response into the format expected by this component
//         const transformedData = {
//           pickupDetails: {
//             name: fetchedOrder.pickupAddress?.contact?.name || "N/A",
//             phone: fetchedOrder.pickupAddress?.contact?.mobileNo ? 
//               `+91 ${fetchedOrder.pickupAddress.contact.mobileNo}` : "N/A"
//           },
//           deliveryDetails: {
//             name: fetchedOrder.deliveryAddress?.contact?.name || "N/A",
//             phone: fetchedOrder.deliveryAddress?.contact?.mobileNo ? 
//               `+91 ${fetchedOrder.deliveryAddress.contact.mobileNo}` : "N/A"
//           },
//           packageDetails: {
//             boxes: fetchedOrder.boxInfo?.length || 0,
//             totalWeight: fetchedOrder.service?.appliedWeight ? 
//               `${fetchedOrder.service.appliedWeight} kg` : "N/A",
//             invoice: fetchedOrder.codInfo?.invoiceValue !== undefined ? 
//               `₹ ${fetchedOrder.codInfo.invoiceValue}` : "N/A",
//             insurance: fetchedOrder.insurance?.isInsured !== undefined ? 
//               (fetchedOrder.insurance.isInsured ? "Yes" : "No") : "N/A"
//           },
//           shippingDetails: {
//             courier: fetchedOrder.service?.partnerName || "N/A",
//             courierType: fetchedOrder.service?.serviceMode ? 
//               `(${fetchedOrder.service.serviceMode} Service)` : "N/A",
//             zone: fetchedOrder.zone || "N/A",
//             paymentMode: fetchedOrder.codInfo?.isCod !== undefined ? 
//               (fetchedOrder.codInfo.isCod ? "COD" : "Prepaid") : "N/A",
//             basePrice: fetchedOrder.service?.base !== undefined ? 
//               `₹ ${fetchedOrder.service.base}` : "N/A",
//             grandTotal: fetchedOrder.service?.total !== undefined ? 
//               `₹ ${Math.round(fetchedOrder.service.total)}` : "N/A",
//             variableCharges: fetchedOrder.service?.variables !== undefined ? 
//               `₹ ${fetchedOrder.service.variables}` : "N/A",
//             codHandlingFees: fetchedOrder.service?.cod !== undefined ? 
//               `₹ ${fetchedOrder.service.cod}` : "N/A",
//             yaariCash: fetchedOrder.yaariCash !== undefined ? 
//               `₹ ${fetchedOrder.yaariCash}` : "N/A",
//             shippingCost: fetchedOrder.service?.total !== undefined ? 
//               `₹ ${fetchedOrder.service.total}` : "N/A",
//             gstPercentage: fetchedOrder.service?.tax !== undefined && fetchedOrder.service?.total !== undefined ? 
//               Number((fetchedOrder.service.tax / (fetchedOrder.service.total - fetchedOrder.service.tax) * 100).toFixed(0)) : 0
//           }
//         };
        
//         setOrderData(transformedData);
//       } else {
//         setError(response?.data?.message || "Failed to fetch order data");
//       }
//     } catch (err) {
//       console.error("Error fetching order details:", err);
//       setError("An error occurred while fetching order data");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Use passed props if available, otherwise use fetched data
//   const {
//     pickupDetails = orderData?.pickupDetails || { name: "N/A", phone: "N/A" },
//     deliveryDetails = orderData?.deliveryDetails || { name: "N/A", phone: "N/A" },
//     packageDetails = orderData?.packageDetails || { boxes: 0, totalWeight: "N/A", invoice: "N/A", insurance: "N/A" },
//     shippingDetails = orderData?.shippingDetails || {
//       courier: "N/A", 
//       courierType: "N/A", 
//       zone: "N/A", 
//       paymentMode: "N/A", 
//       basePrice: "N/A", 
//       grandTotal: "N/A", 
//       variableCharges: "N/A", 
//       codHandlingFees: "N/A", 
//       yaariCash: "N/A", 
//       shippingCost: "N/A", 
//       gstPercentage: 0
//     }
//   } = props;

//   // Display loading state 
//   if (isLoading || orderData === null) {
//     return (
//       <div className="w-full mx-auto bg-[#F9F9F9] rounded-lg shadow-md p-6">
//         <div className="flex items-center justify-center py-10">
//           <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//           </svg>
//           <span className="ml-2 text-gray-600">Loading order details...</span>
//         </div>
//       </div>
//     );
//   }

//   // Display error state
//   if (error) {
//     return (
//       <div className="w-full mx-auto bg-[#F9F9F9] rounded-lg shadow-md p-6">
//         <div className="flex items-center justify-center py-6">
//           <div className="text-red-500 text-center">
//             <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <p>{error}</p>
//             <button 
//               onClick={fetchLatestOrder}
//               className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
//             >
//               Retry
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full mx-auto bg-[#F9F9F9] rounded-lg shadow-md p-6">
//       {/* Header with title and B2C shipment badge side by side */}
//       <div className="flex items-center mb-6">
//         <h1 className="font-Lato font-semibold text-xl leading-[26px] tracking-normal mr-4">Your Order Summary</h1>
//         <div className="bg-blue-100 text-blue-800 rounded-full px-4 py-1 font-Open font-semibold text-xs leading-5 tracking-normal text-center align-middle capitalize">
//           B2C Shipment
//         </div>
//       </div>

//       {/* Pickup and Delivery Details always side by side */}
//       <div className="grid grid-cols-2 gap-6 mb-6">
//         {/* Pickup Details */}
//         <div>
//           <div className="flex items-start mb-3">
//             <div className="mr-2 mt-1">
//               <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//               </svg>
//             </div>
//             <div>
//               <h2 className="font-Open font-semibold text-base leading-5 tracking-normal capitalize">Pickup Details</h2>
//               <div className="flex items-center mt-2">
//                 <p className="font-Open font-semibold text-sm leading-[18px] tracking-normal capitalize text-gray-700">{pickupDetails.name}</p>
//                 <svg className="w-4 h-4 text-gray-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <p className="text-gray-600 mt-1 font-Open font-normal text-sm leading-5 tracking-normal">{pickupDetails.phone}</p>
//             </div>
//           </div>
//         </div>

//         {/* Delivery Details */}
//         <div>
//           <div className="flex items-start mb-3">
//             <div className="mr-2 mt-1">
//               <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//               </svg>
//             </div>
//             <div>
//               <h2 className="font-Open font-semibold text-base leading-5 tracking-normal capitalize">Delivery Details</h2>
//               <div className="flex items-center mt-2">
//                 <p className="font-medium text-gray-700">{deliveryDetails.name}</p>
//                 <svg className="w-4 h-4 text-gray-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <p className="text-gray-600 mt-1">{deliveryDetails.phone}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="border-t border-gray-200 pt-6 mb-6">
//         {/* Package Details */}
//         <div className="flex items-start mb-4">
//           <div className="mr-2 mt-1">
//             <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//             </svg>
//           </div>
//           <div className="w-full">
//             <h2 className="font-Open font-semibold text-base leading-5 tracking-normal capitalize">Package Details</h2>
            
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
//               <div>
//                 <p className="text-gray-500 font-Open font-normal text-sm leading-5 tracking-normal">Boxes</p>
//                 <p className="text-gray-800 font-Open font-semibold text-base leading-[22px] tracking-normal">
//                   {packageDetails.boxes || "N/A"}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-gray-500 font-Open font-normal text-sm leading-5 tracking-normal">Total Weight</p>
//                 <p className="text-gray-800 font-Open font-semibold text-base leading-[22px] tracking-normal">
//                   {packageDetails.totalWeight}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-gray-500 font-Open font-normal text-sm leading-5 tracking-normal">Invoice</p>
//                 <p className="text-gray-800 font-Open font-semibold text-base leading-[22px] tracking-normal">
//                   {packageDetails.invoice}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-gray-500 font-Open font-normal text-sm leading-5 tracking-normal">Insurance</p>
//                 <p className="text-gray-800 font-Open font-semibold text-base leading-[22px] tracking-normal">
//                   {packageDetails.insurance}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="border-t border-gray-200 pt-6">
//         {/* Shipping Details with reorganized layout */}
//         <div className="flex items-start mb-4">
//           <div className="mr-2 mt-1">
//             <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
//             </svg>
//           </div>
//           <div className="w-full">
//             <h2 className="font-Open font-semibold text-base leading-5 tracking-normal capitalize mb-4">Shipping Details</h2>
            
//             {/* First row: Courier, Payment Mode, Base Price, Grand Total */}
//             <div className="grid grid-cols-4 gap-4 mb-6">
//               <div>
//                 <p className="text-gray-500 font-Open font-normal text-sm leading-5 tracking-normal">Courier</p>
//                 <div>
//                   <p className="text-gray-800 font-Open font-semibold text-base leading-[22px] tracking-normal">
//                     {shippingDetails.courier}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     {shippingDetails.courierType !== "N/A" ? shippingDetails.courierType : ""}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     {shippingDetails.zone !== "N/A" ? shippingDetails.zone : ""}
//                   </p>
//                 </div>
//               </div>
//               <div>
//                 <p className="text-gray-500 font-Open font-normal text-sm leading-5 tracking-normal">Payment Mode</p>
//                 <p className="text-gray-800 font-Open font-semibold text-base leading-[22px] tracking-normal">
//                   {shippingDetails.paymentMode}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-gray-500 font-Open font-normal text-sm leading-5 tracking-normal">Base Price</p>
//                 <p className="text-gray-800 font-Open font-semibold text-base leading-[22px] tracking-normal">
//                   {shippingDetails.basePrice}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-gray-500 font-Open font-normal text-sm leading-5 tracking-normal">Grand Total</p>
//                 <p className="text-gray-800 font-Open font-semibold text-base leading-[22px] tracking-normal">
//                   {shippingDetails.grandTotal}
//                 </p>
//               </div>
//             </div>
            
//             {/* Second row: Variable Charges, COD Handling Fees, YaariCash, Shipping Cost */}
//             <div className="grid grid-cols-4 gap-4">
//               <div>
//                 <p className="text-gray-500 font-Open font-normal text-sm leading-5 tracking-normal">Variable Charges</p>
//                 <div className="flex items-center">
//                   <p className="text-gray-800 font-Open font-semibold text-base leading-[22px] tracking-normal">
//                     {shippingDetails.variableCharges}
//                   </p>
//                   <svg className="w-4 h-4 text-gray-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 </div>
//               </div>
//               <div>
//                 <p className="text-gray-500 font-Open font-normal text-sm leading-5 tracking-normal">COD Handling Fees</p>
//                 <p className="text-gray-800 font-Open font-semibold text-base leading-[22px] tracking-normal">
//                   {shippingDetails.codHandlingFees}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-gray-500 font-Open font-normal text-sm leading-5 tracking-normal">YaariCash</p>
//                 <p className={`font-bold ${shippingDetails.yaariCash !== "N/A" ? "text-green-500" : "text-gray-800"}`}>
//                   {shippingDetails.yaariCash}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-gray-500 font-Open font-normal text-sm leading-5 tracking-normal">Shipping Cost</p>
//                 <div>
//                   <p className="text-gray-800 font-Open font-semibold text-base leading-[22px] tracking-normal">
//                     {shippingDetails.shippingCost}
//                   </p>
//                   {shippingDetails.gstPercentage > 0 && (
//                     <p className="text-xs text-gray-500">(inc {shippingDetails.gstPercentage}% GST)</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SummaryForOrder;

import React, { useState, useEffect } from 'react';
import { POST } from '../../utils/webService';
import { GET_LATEST_ORDER } from '../../utils/ApiUrls';

interface PickupDetailsProps {
  name: string;
  phone: string;
}

interface DeliveryDetailsProps {
  name: string;
  phone: string;
}

interface PackageDetailsProps {
  boxes: number;
  totalWeight: string;
  invoice: string;
  insurance: string;
}

interface ShippingDetailsProps {
  courier: string;
  courierType: string;
  zone: string;
  paymentMode: string;
  basePrice: string;
  grandTotal: string;
  variableCharges: string;
  codHandlingFees: string;
  yaariCash: string;
  shippingCost: string;
  gstPercentage: number;
}

interface SummaryForOrderProps {
  pickupDetails?: PickupDetailsProps;
  deliveryDetails?: DeliveryDetailsProps;
  packageDetails?: PackageDetailsProps;
  shippingDetails?: ShippingDetailsProps;
  tempOrderId?: string;
  orderSource?: string;
  selectedServiceId?: string;
}

const SummaryForOrder: React.FC<SummaryForOrderProps> = (props) => {
  const { tempOrderId, orderSource, selectedServiceId } = props;
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [orderData, setOrderData] = useState<any>(null);
  const [retryCount, setRetryCount] = useState<number>(0);
  const [lastSelectedServiceId, setLastSelectedServiceId] = useState<string | undefined>(undefined);

  // Fetch the latest order data with a mechanism to handle server processing delay
  useEffect(() => {
    // Only fetch if tempOrderId and orderSource are provided and if selectedServiceId has changed
    if (tempOrderId && orderSource && selectedServiceId && 
        (selectedServiceId !== lastSelectedServiceId || orderData === null)) {
      // Clear previous data when selection changes
      setOrderData(null);
      
      // Set loading state immediately
      setIsLoading(true);
      
      // Update the last selected service ID
      setLastSelectedServiceId(selectedServiceId);
      
      // Reset retry count when selection changes
      setRetryCount(0);
      
      // Add a longer delay to allow backend to process the service selection
      const timer = setTimeout(() => {
        fetchLatestOrder();
      }, 1000); // 1000ms delay - increased from 500ms
      
      return () => clearTimeout(timer);
    }
  }, [tempOrderId, orderSource, selectedServiceId]); 

  // Implement retries for fetching data if necessary fields are missing
  useEffect(() => {
    if (orderData && !isValidOrderData(orderData) && retryCount < 3) {
      const timer = setTimeout(() => {
        console.log(`Retrying fetch, attempt ${retryCount + 1}`);
        setRetryCount(prev => prev + 1);
        fetchLatestOrder();
      }, 1500); // Increasing delay for each retry
      
      return () => clearTimeout(timer);
    }
  }, [orderData, retryCount]);

  // Helper function to validate if order data has all required fields
  const isValidOrderData = (data: any) => {
    // Check if key shipping details fields are present and not N/A
    return data.shippingDetails.courier !== "N/A" && 
           data.shippingDetails.grandTotal !== "N/A" &&
           data.packageDetails.totalWeight !== "N/A";
  };

  const fetchLatestOrder = async () => {
    if (!tempOrderId || !orderSource) return;

    setError(null);

    try {
      console.log(`Fetching order data for service ID: ${selectedServiceId}, attempt: ${retryCount + 1}`);
      
      const response = await POST(GET_LATEST_ORDER, {
        tempOrderId: tempOrderId,
        source: orderSource
      });

      if (response?.data?.success) {
        const fetchedOrder = response.data.data[0];
        
        // Transform the API response into the format expected by this component
        const transformedData = {
          pickupDetails: {
            name: fetchedOrder.pickupAddress?.contact?.name || "N/A",
            phone: fetchedOrder.pickupAddress?.contact?.mobileNo ? 
              `+91 ${fetchedOrder.pickupAddress.contact.mobileNo}` : "N/A"
          },
          deliveryDetails: {
            name: fetchedOrder.deliveryAddress?.contact?.name || "N/A",
            phone: fetchedOrder.deliveryAddress?.contact?.mobileNo ? 
              `+91 ${fetchedOrder.deliveryAddress.contact.mobileNo}` : "N/A"
          },
          packageDetails: {
            boxes: fetchedOrder.boxInfo?.length || 0,
            totalWeight: fetchedOrder.service?.appliedWeight ? 
              `${fetchedOrder.service.appliedWeight} kg` : "N/A",
            invoice: fetchedOrder.codInfo?.invoiceValue !== undefined ? 
              `₹ ${fetchedOrder.codInfo.invoiceValue}` : "N/A",
            insurance: fetchedOrder.insurance?.isInsured !== undefined ? 
              (fetchedOrder.insurance.isInsured ? "Yes" : "No") : "N/A"
          },
          shippingDetails: {
            courier: fetchedOrder.service?.partnerName || "N/A",
            courierType: fetchedOrder.service?.serviceMode ? 
              `(${fetchedOrder.service.serviceMode} Service)` : "N/A",
            zone: fetchedOrder.zone || "N/A",
            paymentMode: fetchedOrder.codInfo?.isCod !== undefined ? 
              (fetchedOrder.codInfo.isCod ? "COD" : "Prepaid") : "N/A",
            basePrice: fetchedOrder.service?.base !== undefined ? 
              `₹ ${fetchedOrder.service.base}` : "N/A",
            grandTotal: fetchedOrder.service?.total !== undefined ? 
              `₹ ${Math.round(fetchedOrder.service.total)}` : "N/A",
            variableCharges: fetchedOrder.service?.variables !== undefined ? 
              `₹ ${fetchedOrder.service.variables}` : "N/A",
            codHandlingFees: fetchedOrder.service?.cod !== undefined ? 
              `₹ ${fetchedOrder.service.cod}` : "N/A",
            yaariCash: fetchedOrder.yaariCash !== undefined ? 
              `₹ ${fetchedOrder.yaariCash}` : "N/A",
            shippingCost: fetchedOrder.service?.total !== undefined ? 
              `₹ ${fetchedOrder.service.total}` : "N/A",
            gstPercentage: fetchedOrder.service?.tax !== undefined && fetchedOrder.service?.total !== undefined ? 
              Number((fetchedOrder.service.tax / (fetchedOrder.service.total - fetchedOrder.service.tax) * 100).toFixed(0)) : 0
          }
        };
        
        // Check if the returned data includes the selected service
        const hasSelectedService = fetchedOrder.service?.partnerServiceId === selectedServiceId;
        console.log(`Received data for service: ${fetchedOrder.service?.partnerServiceId}, Selected: ${selectedServiceId}, Match: ${hasSelectedService}`);
        
        if (hasSelectedService) {
          // We got the correct data for our selected service
          setOrderData(transformedData);
          setRetryCount(0); // Reset retry count on successful match
        } else if (retryCount < 3) {
          // If data doesn't match our selected service, we'll retry
          console.log("Service data doesn't match selection, will retry");
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
            fetchLatestOrder();
          }, 1500);
        } else {
          // After retries, use whatever data we got
          console.log("Using available data after retries");
          setOrderData(transformedData);
        }
      } else {
        setError(response?.data?.message || "Failed to fetch order data");
      }
    } catch (err) {
      console.error("Error fetching order details:", err);
      setError("An error occurred while fetching order data");
    } finally {
      setIsLoading(false);
    }
  };

  // Manual retry button handler
  const handleRetry = () => {
    setRetryCount(0);
    setIsLoading(true);
    fetchLatestOrder();
  };

  // Use passed props if available, otherwise use fetched data
  const {
    pickupDetails = orderData?.pickupDetails || { name: "N/A", phone: "N/A" },
    deliveryDetails = orderData?.deliveryDetails || { name: "N/A", phone: "N/A" },
    packageDetails = orderData?.packageDetails || { boxes: 0, totalWeight: "N/A", invoice: "N/A", insurance: "N/A" },
    shippingDetails = orderData?.shippingDetails || {
      courier: "N/A", 
      courierType: "N/A", 
      zone: "N/A", 
      paymentMode: "N/A", 
      basePrice: "N/A", 
      grandTotal: "N/A", 
      variableCharges: "N/A", 
      codHandlingFees: "N/A", 
      yaariCash: "N/A", 
      shippingCost: "N/A", 
      gstPercentage: 0
    }
  } = props;

  // Display loading state 
  if (isLoading || orderData === null) {
    return (
      <div className="w-full mx-auto bg-[#F9F9F9] rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center py-10">
          <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="ml-2 text-gray-600">Loading order details for the selected service...</span>
        </div>
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="w-full mx-auto bg-[#F9F9F9] rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center py-6">
          <div className="text-red-500 text-center">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>{error}</p>
            <button 
              onClick={handleRetry}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto bg-[#F9F9F9] rounded-lg shadow-md p-6">
      {/* Header with title and B2C shipment badge side by side */}
      <div className="flex items-center mb-6">
        <h1 className="font-Lato font-semibold text-xl leading-[26px] tracking-normal mr-4">Your Order Summary</h1>
        <div className="bg-blue-100 text-blue-800 rounded-full px-4 py-1 font-Open font-semibold text-xs leading-5 tracking-normal text-center align-middle capitalize">
          B2C Shipment
        </div>
      </div>

      {/* Pickup and Delivery Details always side by side */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Pickup Details */}
        <div>
          <div className="flex items-start mb-3">
            <div className="mr-2 mt-1">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h2 className="font-Open font-semibold text-base leading-5 tracking-normal capitalize">Pickup Details</h2>
              <div className="flex items-center mt-2">
                <p className="font-Open font-semibold text-sm leading-[18px] tracking-normal capitalize text-gray-700">{pickupDetails.name}</p>
                <svg className="w-4 h-4 text-gray-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-600 mt-1 font-Open font-normal text-sm leading-5 tracking-normal">{pickupDetails.phone}</p>
            </div>
          </div>
        </div>

        {/* Delivery Details */}
        <div>
          <div className="flex items-start mb-3">
            <div className="mr-2 mt-1">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h2 className="font-Open font-semibold text-base leading-5 tracking-normal capitalize">Delivery Details</h2>
              <div className="flex items-center mt-2">
                <p className="font-medium text-gray-700">{deliveryDetails.name}</p>
                <svg className="w-4 h-4 text-gray-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-600 mt-1">{deliveryDetails.phone}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6 mb-6">
        {/* Package Details */}
        <div className="flex items-start mb-4">
          <div className="mr-2 mt-1">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div className="w-full">
            <h2 className="font-Open font-semibold text-base leading-5 tracking-normal capitalize">Package Details</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div>
                <p className="text-gray-500 font-Open font-normal text-sm leading-5 tracking-normal">Boxes</p>
                <p className="text-gray-800 font-Open font-semibold text-base leading-[22px] tracking-normal">
                  {packageDetails.boxes || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-500 font-Open font-normal text-sm leading-5 tracking-normal">Total Weight</p>
                <p className="text-gray-800 font-Open font-semibold text-base leading-[22px] tracking-normal">
                  {packageDetails.totalWeight}
                </p>
              </div>
              <div>
                <p className="text-gray-500 font-Open font-normal text-sm leading-5 tracking-normal">Invoice</p>
                <p className="text-gray-800 font-Open font-semibold text-base leading-[22px] tracking-normal">
                  {packageDetails.invoice}
                </p>
              </div>
              <div>
                <p className="text-gray-500 font-Open font-normal text-sm leading-5 tracking-normal">Insurance</p>
                <p className="text-gray-800 font-Open font-semibold text-base leading-[22px] tracking-normal">
                  {packageDetails.insurance}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        {/* Shipping Details with reorganized layout */}
        <div className="flex items-start mb-4">
          <div className="mr-2 mt-1">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
            </svg>
          </div>
          <div className="w-full">
            <h2 className="font-Open font-semibold text-base leading-5 tracking-normal capitalize mb-4">Shipping Details</h2>
            
            {/* First row: Courier, Payment Mode, Base Price, Grand Total */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div>
                <p className="text-gray-500 font-Open font-normal text-sm leading-5 tracking-normal">Courier</p>
                <div>
                  <p className="text-gray-800 font-Open font-semibold text-base leading-[22px] tracking-normal">
                    {shippingDetails.courier}
                  </p>
                  <p className="text-sm text-gray-600">
                    {shippingDetails.courierType !== "N/A" ? shippingDetails.courierType : ""}
                  </p>
                  <p className="text-sm text-gray-600">
                    {shippingDetails.zone !== "N/A" ? shippingDetails.zone : ""}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-gray-500 font-Open font-normal text-sm leading-5 tracking-normal">Payment Mode</p>
                <p className="text-gray-800 font-Open font-semibold text-base leading-[22px] tracking-normal">
                  {shippingDetails.paymentMode}
                </p>
              </div>
              <div>
                <p className="text-gray-500 font-Open font-normal text-sm leading-5 tracking-normal">Base Price</p>
                <p className="text-gray-800 font-Open font-semibold text-base leading-[22px] tracking-normal">
                  {shippingDetails.basePrice}
                </p>
              </div>
              <div>
                <p className="text-gray-500 font-Open font-normal text-sm leading-5 tracking-normal">Grand Total</p>
                <p className="text-gray-800 font-Open font-semibold text-base leading-[22px] tracking-normal">
                  {shippingDetails.grandTotal}
                </p>
              </div>
            </div>
            
            {/* Second row: Variable Charges, COD Handling Fees, YaariCash, Shipping Cost */}
            <div className="grid grid-cols-4 gap-4">
              <div>
                <p className="text-gray-500 font-Open font-normal text-sm leading-5 tracking-normal">Variable Charges</p>
                <div className="flex items-center">
                  <p className="text-gray-800 font-Open font-semibold text-base leading-[22px] tracking-normal">
                    {shippingDetails.variableCharges}
                  </p>
                  <svg className="w-4 h-4 text-gray-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-gray-500 font-Open font-normal text-sm leading-5 tracking-normal">COD Handling Fees</p>
                <p className="text-gray-800 font-Open font-semibold text-base leading-[22px] tracking-normal">
                  {shippingDetails.codHandlingFees}
                </p>
              </div>
              <div>
                <p className="text-gray-500 font-Open font-normal text-sm leading-5 tracking-normal">YaariCash</p>
                <p className={`font-bold ${shippingDetails.yaariCash !== "N/A" ? "text-green-500" : "text-gray-800"}`}>
                  {shippingDetails.yaariCash}
                </p>
              </div>
              <div>
                <p className="text-gray-500 font-Open font-normal text-sm leading-5 tracking-normal">Shipping Cost</p>
                <div>
                  <p className="text-gray-800 font-Open font-semibold text-base leading-[22px] tracking-normal">
                    {shippingDetails.shippingCost}
                  </p>
                  {shippingDetails.gstPercentage > 0 && (
                    <p className="text-xs text-gray-500">(inc {shippingDetails.gstPercentage}% GST)</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryForOrder;