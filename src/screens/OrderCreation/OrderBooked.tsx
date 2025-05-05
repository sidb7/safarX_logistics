// import React, { useState,useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import OneButton from "../../components/Button/OneButton";

// // Mock data for testing - this would be replaced with actual API data
// const mockOrderData = {
//   orderId: "ORD-123456",
//   orderDate: "April 4, 2025 12:13pm",
//   status: "Confirmed",
//   customerName: "Hardik Mane",
//   customerPhone: "9869494234",
//   customerEmail: "hardik446@gmail.com",
//   customerAddress: "Shop no 4, Bhoom Castle, New Link Rd, Malad, Etla Nagar, Malad West, Mumbai, Maharashtra 400064",
//   shippingCourier: "Bluedart Express",
//   awbNumber: "1430912762815",
//   orderItems: [
//     { name: "Women Blue Kurta", quantity: 20, price: 1599, total: 31980 },
//     { name: "Women Linen Printed Regular Kurta", quantity: 40, price: 998, total: 39920 }
//   ],
//   totalInvoiceValue: 75000,
//   shippingCharges: 4563,
//   shipmentDetails: {
//     shipped_by: {
//       address: "12-A, 3rd Floor, Techniplex - II, Off Veer Savarkar Flyover, Goregaon(W)",
//       pincode: "400 064",
//       city: "Mumbai",
//       contact_no: "9865 321 345",
//       gstin: "27ACKPT429K1ZT"
//     },
//     delivery_address: {
//       address: "XR6C+RCR, Maulana Shaukat Ali Road, Grant Road East, Bharat Nagar, Girgaon",
//       pincode: "400007",
//       contact_no: "9865 321 345"
//     },
//     courier_details: {
//       name: "Smarter",
//       awb: "P7838859497800097",
//       order_date: "30/03/2025",
//       product_dimensions: "2Kg | 20 x 30 x 50",
//       payment_mode: "COD",
//       collectable_amount: "₹1000"
//     },
//     items: [
//       { sr_no: 1, name: "Long Island Green tea", sku: "SKUTTLIGT100G", price: 100, qty: 1, total: 100 },
//       { sr_no: 2, name: "Saffron Kahwa Green tea", sku: "SKUTTLIGT107G", price: 200, qty: 1, total: 200 },
//       { sr_no: 3, name: "Hibiscus Iced Green tea", sku: "SKUTTHGT100G", price: 150, qty: 2, total: 300 }
//     ],
//     grand_total: 1200,
//     rto_address: "12-A, 3rd Floor, Techniplex - II, Off Veer Savarkar Flyover, Goregaon (W) City: Mumbai Pincode: 400 064 Contact No: 9865 321 345 GSTIN: 27ACKPT429K1ZT"
//   }
// };

// function OrderBooked({ orderData = mockOrderData }) {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const passedData = location.state;


//   const orderDetails = passedData || mockOrderData;

//   // Extract specific values from the passed data
//   const source = passedData?.source;
//   const orderId = passedData?.orderId;
//   const awbs = passedData?.awbs || [];
  

//     const [activeTab, setActiveTab] = useState("invoice");
  
//   const handlePrint = () => {
//     window.print();
//   };
  
//   const handleEmail = () => {
//     // This would be connected to email API later
//     alert("Email functionality will be implemented later");
//   };
  
//   const goBackToDashboard = () => {
//     navigate("/dashboard");
//   };

  

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       {/* Success Icon and Message */}
//       <div className="text-center mb-8">
//         <div className="flex justify-center mb-4">
//           <div className="rounded-full bg-green-100 p-2">
//             <svg 
//               className="w-10 h-10 text-green-500" 
//               fill="none" 
//               stroke="currentColor" 
//               viewBox="0 0 24 24" 
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path 
//                 strokeLinecap="round" 
//                 strokeLinejoin="round" 
//                 strokeWidth="2" 
//                 d="M5 13l4 4L19 7"
//               ></path>
//             </svg>
//           </div>
//         </div>
//         <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
//         <p className="text-gray-600">Thank you for your order. Your shipment is being prepared.</p>
//       </div>
      
//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* Order Summary Section */}
//         <div className="bg-white rounded-md shadow-md p-6 lg:w-1/3">
//           <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          
//           <div className="mb-6">
//             <h3 className="font-semibold mb-2">Order Details</h3>
            
//             <p>Order ID: {orderData.orderId}</p>
//             <p>Date & Time: {orderData.orderDate}</p>
//             <p>Status: <span className="text-green-500">{orderData.status}</span></p>
//           </div>
          
//           <div className="mb-6">
//             <h3 className="font-semibold mb-2">Customer Details</h3>
//             <p>{orderData.customerName}</p>
//             <p>{orderData.customerPhone} | {orderData.customerEmail}</p>
//             <p className="text-sm text-gray-600">{orderData.customerAddress}</p>
//           </div>
          
//           <div className="mb-6">
//             <h3 className="font-semibold mb-2">Shipping Details</h3>
//             <p>{orderData.shippingCourier}</p>
//             <p>AWB No: {orderData.awbNumber}</p>
//           </div>
          
//           <div className="mb-6">
//             <h3 className="font-semibold mb-2">Order Items</h3>
//             {orderData.orderItems.map((item, index) => (
//               <div key={index} className="mb-2">
//                 <div className="flex justify-between">
//                   <span>{item.name}</span>
//                   <span>{item.quantity} × ₹ {item.price}</span>
//                 </div>
//               </div>
//             ))}
//             <div className="mt-2 text-sm text-blue-500 cursor-pointer">
//               <span>View More</span>
//             </div>
//           </div>
          
//           <div className="border-t pt-4">
//             <div className="flex justify-between mb-2">
//               <span className="font-semibold">Total Invoice Value</span>
//               <span>₹ {orderData.totalInvoiceValue}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="font-semibold">Shipping Charges</span>
//               <span>₹ {orderData.shippingCharges}</span>
//             </div>
//           </div>
//         </div>
        
//         {/* Invoice, Label, Manifest Tabs */}
//         <div className="bg-white rounded-md shadow-md p-6 lg:w-2/3">
//           {/* Tabs */}
//           <div className="flex border-b mb-6">
//             <button 
//               className={`pb-2 px-4 ${activeTab === 'invoice' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
//               onClick={() => setActiveTab('invoice')}
//             >
//               Invoice
//             </button>
//             <button 
//               className={`pb-2 px-4 ${activeTab === 'shipping' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
//               onClick={() => setActiveTab('shipping')}
//             >
//               Shipping Label
//             </button>
//             <button 
//               className={`pb-2 px-4 ${activeTab === 'manifest' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
//               onClick={() => setActiveTab('manifest')}
//             >
//               Manifest
//             </button>
//           </div>
          
//           {/* Tab Content - Invoice */}
//           {activeTab === 'invoice' && (
//             <div className="border rounded-md">
//               <div className="grid grid-cols-3 border-b">
//                 <div className="p-4 flex items-center justify-center">
//                   <div className="text-center">
//                     <img src="/shipyaari-logo.png" alt="Shipyaari" className="w-24 mx-auto" />
//                   </div>
//                 </div>
//                 <div className="p-4 border-l border-r">
//                   <div className="text-sm">
//                     <p className="font-semibold">Shipped by:</p>
//                     <p>{orderData.shipmentDetails.shipped_by.address}</p>
//                     <p>Pincode: {orderData.shipmentDetails.shipped_by.pincode}</p>
//                     <p>City: {orderData.shipmentDetails.shipped_by.city}</p>
//                     <p>Contact No: {orderData.shipmentDetails.shipped_by.contact_no}</p>
//                     <p>GSTIN: {orderData.shipmentDetails.shipped_by.gstin}</p>
//                   </div>
//                 </div>
//                 <div className="p-4">
//                   <div className="text-sm">
//                     <p className="font-semibold">Delivery Address:</p>
//                     <p>{orderData.shipmentDetails.delivery_address.address}</p>
//                     <p>Mumbai {orderData.shipmentDetails.delivery_address.pincode}</p>
//                     <p>Contact No: {orderData.shipmentDetails.delivery_address.contact_no}</p>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-3 border-b">
//                 <div className="col-span-2 p-4">
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full">
//                       <thead>
//                         <tr className="border-b">
//                           <th className="text-left py-2">Sr. No.</th>
//                           <th className="text-left py-2">Product Name</th>
//                           <th className="text-left py-2">SKU</th>
//                           <th className="text-right py-2">Price</th>
//                           <th className="text-center py-2">Qty</th>
//                           <th className="text-right py-2">Total</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {orderData.shipmentDetails.items.map((item) => (
//                           <tr key={item.sr_no} className="border-b">
//                             <td className="py-2">{item.sr_no}.</td>
//                             <td className="py-2">{item.name}</td>
//                             <td className="py-2">{item.sku}</td>
//                             <td className="text-right py-2">{item.price}</td>
//                             <td className="text-center py-2">{item.qty}</td>
//                             <td className="text-right py-2">{item.total}</td>
//                           </tr>
//                         ))}
//                         <tr>
//                           <td colSpan={5} className="text-right py-2 font-semibold">Grand Total</td>
//                           <td className="text-right py-2 font-semibold">{orderData.shipmentDetails.grand_total}</td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//                 <div className="p-4 border-l">
//                   <div className="text-sm">
//                     <p className="font-semibold">Courier Name:</p>
//                     <p>{orderData.shipmentDetails.courier_details.name}</p>
//                     <p>AWB: {orderData.shipmentDetails.courier_details.awb}</p>
//                     <p>Order Date: {orderData.shipmentDetails.courier_details.order_date}</p>
//                     <p>Product Weight & Dimension:</p>
//                     <p>{orderData.shipmentDetails.courier_details.product_dimensions}</p>
//                     <p>Payment Mode: {orderData.shipmentDetails.courier_details.payment_mode}</p>
//                     <p>Collectable Amount: {orderData.shipmentDetails.courier_details.collectable_amount}</p>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-3 border-b">
//                 <div className="col-span-2 p-4">
//                   <div className="text-center">
//                     <div className="mb-4">
//                       <img src="/barcode.png" alt="Barcode" className="h-12 mx-auto" />
//                     </div>
//                     <div className="text-sm">
//                       <p className="font-semibold">RTO Address: (if undelivered, return to) :</p>
//                       <p>{orderData.shipmentDetails.rto_address}</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="p-4 border-l">
//                   <div className="text-center">
//                     <img src="/shipyaari-logo.png" alt="Shipyaari" className="w-24 mx-auto" />
//                     <p className="text-xs mt-2">
//                       All disputes are subject to Maharashtra's jurisdiction only. Goods once sold will only be taken back/exchanged as per the details listed in exchange policy*
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
          
//           {/* Tab Content - Shipping Label */}
//           {activeTab === 'shipping' && (
//             <div className="text-center p-6">
//               <p>Shipping label will be available here.</p>
//               <p className="text-gray-500 text-sm mt-2">You'll be able to download and print your shipping label.</p>
//             </div>
//           )}
          
//           {/* Tab Content - Manifest */}
//           {activeTab === 'manifest' && (
//             <div className="text-center p-6">
//               <p>Manifest information will be available here.</p>
//               <p className="text-gray-500 text-sm mt-2">This will contain a summary of all shipments for the courier.</p>
//             </div>
//           )}
//         </div>
//       </div>
      
//       {/* Action Buttons */}
//       <div className="flex justify-between mt-8">
//         <OneButton
//           text="Back to Dashboard"
//           onClick={goBackToDashboard}
//           variant="secondary"
//           className="flex items-center"
//           icon={
//             <svg 
//               className="w-5 h-5 mr-2" 
//               fill="none" 
//               stroke="currentColor" 
//               viewBox="0 0 24 24" 
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path 
//                 strokeLinecap="round" 
//                 strokeLinejoin="round" 
//                 strokeWidth="2" 
//                 d="M10 19l-7-7m0 0l7-7m-7 7h18"
//               ></path>
//             </svg>
//           }
//         />
        
//         <div className="flex gap-4">
//           <OneButton
//             text="Print"
//             onClick={handlePrint}
//             variant="primary"
//             className="flex items-center"
//             icon={
//               <svg 
//                 className="w-5 h-5 mr-2" 
//                 fill="none" 
//                 stroke="currentColor" 
//                 viewBox="0 0 24 24" 
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path 
//                   strokeLinecap="round" 
//                   strokeLinejoin="round" 
//                   strokeWidth="2" 
//                   d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
//                 ></path>
//               </svg>
//             }
//           />
          
//           <OneButton
//             text="Email"
//             onClick={handleEmail}
//             variant="primary"
//             className="flex items-center"
//             icon={
//               <svg 
//                 className="w-5 h-5 mr-2" 
//                 fill="none" 
//                 stroke="currentColor" 
//                 viewBox="0 0 24 24" 
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path 
//                   strokeLinecap="round" 
//                   strokeLinejoin="round" 
//                   strokeWidth="2" 
//                   d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                 ></path>
//               </svg>
//             }
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default OrderBooked;


import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import OneButton from "../../components/Button/OneButton";
import { POST } from "../../utils/webService";
import { GET_LATEST_ORDER } from "../../utils/ApiUrls";

// TypeScript interfaces
interface Contact {
  name: string;
  mobileNo: number;
  emailId: string;
}

interface Address {
  flatNo?: string;
  locality?: string;
  landmark?: string;
  pincode: number;
  city: string;
  state: string;
  country: string;
  contact?: Contact;
}

interface Product {
  name: string;
  qty: number;
  unitPrice: number;
  sku: string;
}

interface Service {
  partnerName?: string;
  total: number;
}

interface BoxInfo {
  products: Product[];
  service?: Service;
  boxId?: string;
  name?: string;
  tracking?: {
    awb?: string;
    label?: string;
    taxInvoice?: string;
    manifest?: string;
    status?: any[];
    otherDetails?: {
      partners?: any[];
    };
  };
}

interface OrderData {
  tempOrderId: string;
  orderId?: string;
  createdAt?: number;
  service?: Service;
  boxInfo?: BoxInfo[];
  deliveryAddress?: Address;
  status?: Array<{
    currentStatus: string;
    timeStamp: number;
    awb?: string;
  }>;
  // Add the following fields from the response
  sellerEmail?: string;
  transit?: string;
  source?: string;
  orderPlacedFrom?: string;
  orderType?: string;
  zone?: string;
  // Add the awbs property to match the structure in the API response
  awbs?: Array<{
    tracking: {
      awb: string;
      label?: string;
      taxInvoice?: string;
      manifest?: string;
      status?: Array<{
        logId: string;
        timeStamp: number;
        currentStatus: string;
        awb: string;
        description: string;
        notes: string;
      }>;
      otherDetails?: {
        partners: any[];
      };
    };
    charges?: {
      partnerServiceId: string;
      partnerServiceName: string;
      companyServiceId: string;
      companyServiceName: string;
      partnerName: string;
      serviceMode: string;
      appliedWeight: number;
      invoiceValue: number;
      collectableAmount: number;
      insurance: number;
      base: number;
      add: number;
      variables: number;
      minchargeableamount: number;
      variableServices: number;
      cod: number;
      tax: number;
      total: number;
      zoneName: string;
      EDT: number;
    };
    codInfo?: {
      isCod: boolean;
      collectableAmount: number;
      invoiceValue: number;
    };
    pickupDate?: string;
  }>;

}

interface LocationState {
  source?: string;
  orderId?: string;
  awbNumbers?: string[]; // Array of AWB numbers

}

function OrderBooked() {
  const navigate = useNavigate();
  const location = useLocation();
  const passedData = location.state as LocationState | null;

  const [orderDetails, setOrderDetails] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAllProducts, setShowAllProducts] = useState<boolean>(false);

  const source = passedData?.source || "";
  const orderId = passedData?.orderId || "";

  const fetchOrderDetails = async () => {
    try {
      const payload = {
        tempOrderId: orderId,
        source: source,
      };

      console.log("Fetching order details with payload:", payload);
      const response = await POST(GET_LATEST_ORDER, payload);

      if (response?.data?.success && response?.data?.data?.length > 0) {
        // Access the first order in the data array
        setOrderDetails(response.data.data[0]);
        console.log("Order details found:", response.data.data[0]);
      } else {
        console.error("API Error or no data:", response?.data);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    } else {
      // For development/testing, you can use a mock API response
      // Uncomment this block to test with the mock data
      /*
      const mockResponse = {
        success: true,
        data: [
          // Paste your example data here
        ],
        message: "New Order Found"
      };
      if (mockResponse.success && mockResponse.data?.length > 0) {
        setOrderDetails(mockResponse.data[0]);
      }
      */
      setLoading(false);
    }
  }, [orderId]);

  // Format date from timestamp
  const formatDate = (timestamp?: number): string => {
    if (!timestamp) return "N/A";
    try {
      return new Date(timestamp).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  };

  // Get latest status
  const getLatestStatus = (): string => {
    if (!orderDetails?.status || orderDetails.status.length === 0) return "Pending";
    return orderDetails.status[orderDetails.status.length - 1]?.currentStatus || "Pending";
  };

// Get AWB number
  // const getAwbNumber = (): string => {
  //   if (!orderDetails?.status || orderDetails.status.length === 0) {
  //     // Check if there's an AWB in box tracking
  //     const boxAwb = orderDetails?.boxInfo?.[0]?.tracking?.awb;
  //     return boxAwb && boxAwb.trim() !== "" ? boxAwb : "N/A";
  //   }
    
  //   // Check if there's a status with a non-empty AWB
  //   const awbStatus = orderDetails.status.find(s => s.awb && s.awb.trim() !== "");
  //   if (awbStatus?.awb && awbStatus.awb.trim() !== "") {
  //     return awbStatus.awb;
  //   }
    
  //   // Fallback to box tracking AWB
  //   const boxAwb = orderDetails?.boxInfo?.[0]?.tracking?.awb;
  //   return boxAwb && boxAwb.trim() !== "" ? boxAwb : "N/A";
  // };
  // In OrderBooked.tsx
const getAllAwbNumbers = (): string[] => {
  // First, check if AWB numbers were passed from OrderCreation
  if (passedData?.awbNumbers && passedData.awbNumbers.length > 0) {
    return passedData.awbNumbers;
  }
  
  // Otherwise, try to extract them from the orderDetails
  const awbs: string[] = [];
  
  // Check if AWBs exist in orderDetails
  if (orderDetails?.awbs && orderDetails.awbs.length > 0) {
    orderDetails.awbs.forEach(awbItem => {
      if (awbItem.tracking?.awb) {
        awbs.push(awbItem.tracking.awb);
      }
    });
  }
  
  // Fallback: check status or boxInfo for AWBs
  if (awbs.length === 0) {
    orderDetails?.status?.forEach(status => {
      if (status.awb && !awbs.includes(status.awb)) {
        awbs.push(status.awb);
      }
    });
    
    orderDetails?.boxInfo?.forEach(box => {
      if (box.tracking?.awb && !awbs.includes(box.tracking.awb)) {
        awbs.push(box.tracking.awb);
      }
    });
  }
  
  return awbs;
};

  // Calculate total value
  const calculateTotal = (): number => {
    if (!orderDetails?.boxInfo) return 0;
    
    let total = 0;
    orderDetails.boxInfo.forEach(box => {
      box.products?.forEach(product => {
        total += (product.unitPrice * product.qty);
      });
    });
    return total;
  };

  // Get shipping charges
  const getShippingCharges = (): number => {
    return orderDetails?.service?.total || 0;
  };

  // Handle back button click
  const handleBackClick = () => {
    navigate("/dashboard");
  };

  // Get customer name
  const getCustomerName = (): string => {
    return orderDetails?.deliveryAddress?.contact?.name || "N/A";
  };

  // Get customer contact
  const getCustomerContact = (): string => {
    const contact = orderDetails?.deliveryAddress?.contact;
    if (!contact) return "N/A";
    
    const phone = contact.mobileNo ? contact.mobileNo.toString() : "N/A";
    const email = contact.emailId || "N/A";
    
    return `${phone} | ${email}`;
  };

  // Get customer address
  const getCustomerAddress = (): string => {
    const address = orderDetails?.deliveryAddress;
    if (!address) return "N/A";
    
    return `${address.flatNo || ""} ${address.locality || ""}, ${address.landmark || ""}, 
    ${address.city}, ${address.state} ${address.pincode}`;
  };

  // Get courier name
  const getCourierName = (): string => {
    return orderDetails?.service?.partnerName || "N/A";
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading order details...</p>
        </div>
      ) : !orderDetails ? (
        <div className="text-center p-8 bg-red-50 rounded-lg">
          <p className="text-red-500">No order details available.</p>
          <p className="text-sm mt-2">Please check your API response format and ensure the order exists.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold mb-2">Order Summary</h1>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Order Details</h2>
              <p><span className="font-medium">Order ID:</span> ORD-{orderDetails.tempOrderId || "N/A"}</p>
              <p><span className="font-medium">Date & Time:</span> {formatDate(orderDetails.createdAt)}</p>
              <p><span className="font-medium">Status:</span> <span className="text-green-500">{getLatestStatus()}</span></p>
              <p><span className="font-medium">Order Type:</span> {orderDetails.orderType || "N/A"}</p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Customer Details</h2>
              <p className="font-medium">{getCustomerName()}</p>
              <p>{getCustomerContact()}</p>
              <p className="text-sm text-gray-600">{getCustomerAddress()}</p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Shipping Details</h2>
              <p>{getCourierName()}</p>
              <div>
    <span className="font-medium">AWB Numbers:</span>
    {getAllAwbNumbers().length > 0 ? (
      <ul className="mt-1">
        {getAllAwbNumbers().map((awb, index) => (
          <li key={index}>{awb}</li>
        ))}
      </ul>
    ) : (
      <p>N/A</p>
    )}
  </div>

            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Order Items</h2>
              {orderDetails.boxInfo && orderDetails.boxInfo.map((box, boxIndex) => {
                // Count total products across all boxes
                const totalProducts = box.products?.length || 0;
                
                // Determine which products to show based on showAllProducts state
                const productsToShow = showAllProducts 
                  ? box.products 
                  : (box.products || []).slice(0, 2);
                
                return (
                  <div key={boxIndex}>
                    {productsToShow.map((product, productIndex) => (
                      <div key={productIndex} className="py-2 border-b border-gray-100 flex justify-between items-center">
                        <div>
                          <p className="font-medium">{product.name}</p>
                        </div>
                        <div className="text-right">
                          <p>{product.qty} × ₹ {product.unitPrice}</p>
                        </div>
                      </div>
                    ))}
                    
                    {/* Only show View More button if there are more than 2 products */}
                    {totalProducts > 2 && (
                      <div className="mt-2 text-right">
                        <button 
                          className="text-blue-500 text-sm" 
                          onClick={() => setShowAllProducts(!showAllProducts)}
                        >
                          {showAllProducts ? "View Less" : "View More"}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between py-2">
                <p className="font-medium">Total Invoice Value</p>
                <p className="font-medium">₹ {calculateTotal().toLocaleString()}</p>
              </div>
              <div className="flex justify-between py-2">
                <p className="font-medium">Shipping Charges</p>
                <p>₹ {getShippingCharges().toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50">
            <button 
              onClick={handleBackClick}
              className="w-full flex items-center justify-center py-2 border border-gray-300 rounded-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderBooked;

// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import OneButton from "../../components/Button/OneButton";
// import { POST } from "../../utils/webService";
// import { GET_LATEST_ORDER } from "../../utils/ApiUrls";

// function OrderBooked() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const passedData = location.state;

//   const [orderDetails, setOrderDetails] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const source = passedData?.source;
//   const orderId = passedData?.orderId;

//   const fetchOrderDetails = async () => {
//     try {
//       const payload = {
//         tempOrderId: orderId,
//         source: source,
//       };

//       console.log("Fetching order details with payload:", payload);
//       const response = await POST(GET_LATEST_ORDER, payload);

//       if (response?.data?.success) {
//         setOrderDetails(response.data?.data); // Save entire response data
//       } else {
//         console.error("API Error:", response?.data);
//       }
//     } catch (error) {
//       console.error("Fetch Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrderDetails();
//   }, []);

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h1 className="text-2xl font-semibold mb-4">Order Details (Raw JSON)</h1>

//       {loading ? (
//         <p>Loading...</p>
//       ) : orderDetails ? (
//         <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">remove the responsce taht is being displayed and make it like the card  as shown in the pic make it ypescript compliant and put ? 
//           {JSON.stringify(orderDetails, null, 2)}
//         </pre>
//       ) : (
//         <p>No order details available.</p>
//       )}
//     </div>
//   );
// }

// export default OrderBooked;
