

// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import OneButton from "../../components/Button/OneButton";
// import { POST } from "../../utils/webService";
// import { 
//   GET_LATEST_ORDER, 
//   FETCH_LABELS_REPORT_DOWNLOAD, 
//   FETCH_MANIFEST_DATA, 
//   FETCH_MULTI_TAX_REPORT_DOWNLOAD 
// } from "../../utils/ApiUrls";
// import sessionManager from "../../utils/sessionManager";

// // TypeScript interfaces
// interface Contact {
//   name: string;
//   mobileNo: number;
//   emailId: string;
// }

// interface Address {
//   flatNo?: string;
//   locality?: string;
//   landmark?: string;
//   pincode: number;
//   city: string;
//   state: string;
//   country: string;
//   contact?: Contact;
// }

// interface Product {
//   name: string;
//   qty: number;
//   unitPrice: number;
//   sku: string;
// }

// interface Service {
//   partnerName?: string;
//   total: number;
// }

// interface BoxInfo {
//   products: Product[];
//   service?: Service;
//   boxId?: string;
//   name?: string;
//   tracking?: {
//     awb?: string;
//     label?: string;
//     taxInvoice?: string;
//     manifest?: string;
//     status?: any[];
//     otherDetails?: {
//       partners?: any[];
//     };
//   };
// }

// interface OrderData {
//   tempOrderId: string;
//   orderId?: string;
//   createdAt?: number;
//   service?: Service;
//   boxInfo?: BoxInfo[];
//   deliveryAddress?: Address;
//   status?: Array<{
//     currentStatus: string;
//     timeStamp: number;
//     awb?: string;
//   }>;
//   sellerEmail?: string;
//   transit?: string;
//   source?: string;
//   orderPlacedFrom?: string;
//   orderType?: string;
//   zone?: string;
//   awbs?: Array<{
//     tracking: {
//       awb: string;
//       label?: string;
//       taxInvoice?: string;
//       manifest?: string;
//       status?: Array<{
//         logId: string;
//         timeStamp: number;
//         currentStatus: string;
//         awb: string;
//         description: string;
//         notes: string;
//       }>;
//       otherDetails?: {
//         partners: any[];
//       };
//     };
//     charges?: {
//       partnerServiceId: string;
//       partnerServiceName: string;
//       companyServiceId: string;
//       companyServiceName: string;
//       partnerName: string;
//       serviceMode: string;
//       appliedWeight: number;
//       invoiceValue: number;
//       collectableAmount: number;
//       insurance: number;
//       base: number;
//       add: number;
//       variables: number;
//       minchargeableamount: number;
//       variableServices: number;
//       cod: number;
//       tax: number;
//       total: number;
//       zoneName: string;
//       EDT: number;
//     };
//     codInfo?: {
//       isCod: boolean;
//       collectableAmount: number;
//       invoiceValue: number;
//     };
//     pickupDate?: string;
//   }>;
// }

// interface LocationState {
//   source?: string;
//   orderId?: string;
//   awbNumbers?: string[]; // Array of AWB numbers
// }

// type TabType = 'invoice' | 'shipping' | 'manifest';

// function OrderBooked() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const passedData = location.state as LocationState | null;

//   const [orderDetails, setOrderDetails] = useState<OrderData | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [showAllProducts, setShowAllProducts] = useState<boolean>(false);
//   const [activeTab, setActiveTab] = useState<TabType>('shipping');
//   const [pdfData, setPdfData] = useState<{ [key in 'invoice' | 'shipping' | 'manifest']: string }>({
//     invoice: '',
//     shipping: '',
//     manifest: ''
//   });
//   const [loadingPdf, setLoadingPdf] = useState<{ [key in 'invoice' | 'shipping' | 'manifest']: boolean }>({
//     invoice: false,
//     shipping: false,
//     manifest: false
//   });
//   const [downloadLoading, setDownloadLoading] = useState<{ 
//     isLoading: boolean;
//     identifier?: string; 
//   }>({ isLoading: false });
//   const [showEmailModal, setShowEmailModal] = useState<boolean>(false);
//   const [emailInput, setEmailInput] = useState<string>('');

//   const source = passedData?.source || "";
//   const orderId = passedData?.orderId || "";

//   const fetchOrderDetails = async () => {
//     try {
//       const payload = {
//         tempOrderId: orderId,
//         source: source,
//       };

//       console.log("Fetching order details with payload:", payload);
//       const response = await POST(GET_LATEST_ORDER, payload);

//       if (response?.data?.success && response?.data?.data?.length > 0) {
//         // Access the first order in the data array
//         setOrderDetails(response.data.data[0]);
//         console.log("Order details found:", response.data.data[0]);
//       } else {
//         console.error("API Error or no data:", response?.data);
//       }
//     } catch (error) {
//       console.error("Fetch Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (orderId) {
//       fetchOrderDetails();
//     } else {
//       setLoading(false);
//     }
//   }, [orderId]);

//   const fetchPdfData = async (type: 'invoice' | 'shipping' | 'manifest') => {
//     const awbNumbers = getAllAwbNumbers();
    
//     if (awbNumbers.length === 0) {
//       console.error(`No AWB numbers available to fetch ${type}`);
//       return;
//     }

//     setLoadingPdf(prev => ({ ...prev, [type]: true }));
    
//     try {
//       let endpoint;
//       switch (type) {
//         case 'invoice':
//           endpoint = FETCH_MULTI_TAX_REPORT_DOWNLOAD;
//           break;
//         case 'shipping':
//           endpoint = FETCH_LABELS_REPORT_DOWNLOAD;
//           break;
//         case 'manifest':
//           endpoint = FETCH_MANIFEST_DATA;
//           break;
//       }

//       const { sellerInfo } = sessionManager({});
//       const payload = { awbs: awbNumbers };
      
//       let headers = {
//         Accept: "/",
//         Authorization: `Bearer ${sellerInfo?.token}`,
//         "Content-Type": "application/json",
//       };
      
//       const response = await fetch(endpoint, {
//         method: "POST",
//         headers: headers,
//         body: JSON.stringify(payload),
//       });
      
//       if (!response.ok) {
//         console.error(`Error fetching ${type} PDF:`, response);
//         return;
//       }
      
//       const data = await response.blob();
//       const reader = new FileReader();
      
//       reader.onloadend = function() {
//         const base64data = reader.result?.toString().split(',')[1] || '';
//         setPdfData(prev => ({ ...prev, [type]: base64data }));
//       };
      
//       reader.readAsDataURL(data);
//     } catch (error) {
//       console.error(`Error fetching ${type} PDF:`, error);
//     } finally {
//       setLoadingPdf(prev => ({ ...prev, [type]: false }));
//     }
//   };

//   useEffect(() => {
//     // Fetch PDF data when tab changes and we don't have the data yet
//     if (!pdfData[activeTab]) {
//       fetchPdfData(activeTab);
//     }
//   }, [activeTab]);
  
//   // Initialize by loading the first tab's data once order details are loaded
//   useEffect(() => {
//     if (orderDetails && getAllAwbNumbers().length > 0 && !pdfData[activeTab]) {
//       fetchPdfData(activeTab);
//     }
//   }, [orderDetails]);

//   // Format date from timestamp
//   const formatDate = (timestamp?: number): string => {
//     if (!timestamp) return "N/A";
//     try {
//       return new Date(timestamp).toLocaleString("en-US", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//     } catch (error) {
//       console.error("Error formatting date:", error);
//       return "Invalid Date";
//     }
//   };

//   // Get latest status
//   const getLatestStatus = (): string => {
//     if (!orderDetails?.status || orderDetails.status.length === 0) return "Pending";
//     return orderDetails.status[orderDetails.status.length - 1]?.currentStatus || "Pending";
//   };

//   const getAllAwbNumbers = (): string[] => {
//     // First, check if AWB numbers were passed from OrderCreation
//     if (passedData?.awbNumbers && passedData.awbNumbers.length > 0) {
//       return passedData.awbNumbers;
//     }
    
//     // Otherwise, try to extract them from the orderDetails
//     const awbs: string[] = [];
    
//     // Check if AWBs exist in orderDetails
//     if (orderDetails?.awbs && orderDetails.awbs.length > 0) {
//       orderDetails.awbs.forEach(awbItem => {
//         if (awbItem.tracking?.awb) {
//           awbs.push(awbItem.tracking.awb);
//         }
//       });
//     }
    
//     // Fallback: check status or boxInfo for AWBs
//     if (awbs.length === 0) {
//       orderDetails?.status?.forEach(status => {
//         if (status.awb && !awbs.includes(status.awb)) {
//           awbs.push(status.awb);
//         }
//       });
      
//       orderDetails?.boxInfo?.forEach(box => {
//         if (box.tracking?.awb && !awbs.includes(box.tracking.awb)) {
//           awbs.push(box.tracking.awb);
//         }
//       });
//     }
    
//     return awbs;
//   };

//   // Calculate total value
//   const calculateTotal = (): number => {
//     if (!orderDetails?.boxInfo) return 0;
    
//     let total = 0;
//     orderDetails.boxInfo.forEach(box => {
//       box.products?.forEach(product => {
//         total += (product.unitPrice * product.qty);
//       });
//     });
//     return total;
//   };

//   // Get shipping charges
//   const getShippingCharges = (): number => {
//     return orderDetails?.service?.total || 0;
//   };

//   // Handle back button click
//   const handleBackClick = () => {
//     navigate("/dashboard");
//   };

//   // Get customer name
//   const getCustomerName = (): string => {
//     return orderDetails?.deliveryAddress?.contact?.name || "N/A";
//   };

//   // Get customer contact
//   const getCustomerContact = (): string => {
//     const contact = orderDetails?.deliveryAddress?.contact;
//     if (!contact) return "N/A";
    
//     const phone = contact.mobileNo ? contact.mobileNo.toString() : "N/A";
//     const email = contact.emailId || "N/A";
    
//     return `${phone} | ${email}`;
//   };

//   // Get customer address
//   const getCustomerAddress = (): string => {
//     const address = orderDetails?.deliveryAddress;
//     if (!address) return "N/A";
    
//     return `${address.flatNo || ""} ${address.locality || ""}, ${address.landmark || ""}, 
//     ${address.city}, ${address.state} ${address.pincode}`;
//   };

//   // Get courier name
//   const getCourierName = (): string => {
//     return orderDetails?.service?.partnerName || "N/A";
//   };

//   // Handle print
//   const handlePrint = () => {
//     const printWindow = window.open('', '', 'height=600,width=800');
//     if (printWindow && pdfData[activeTab]) {
//       printWindow.document.write(`
//         <html>
//           <head>
//             <title>Print ${activeTab}</title>
//           </head>
//           <body>
//             <iframe src="data:application/pdf;base64,${pdfData[activeTab]}" width="100%" height="100%" style="border: none;"></iframe>
//           </body>
//         </html>
//       `);
//       printWindow.document.close();
//       printWindow.onload = function() {
//         printWindow.print();
//       };
//     }
//   };

//   // Handle email
//   const handleEmail = () => {
//     const customerEmail = orderDetails?.deliveryAddress?.contact?.emailId || '';
//     if (customerEmail) {
//       // You can customize this based on your backend email service
//       // This is just a placeholder for the email functionality
//       console.log('Email functionality to be implemented for:', customerEmail);
//       // window.open(`mailto:${customerEmail}?subject=Order Documents&body=Please find attached your ${activeTab} document.`);
//     } else {
//       setShowEmailModal(true);
//     }
//   };

//   // Handle email submission
//   const handleEmailSubmit = () => {
//     if (emailInput && emailInput.includes('@')) {
//       // You can customize this based on your backend email service
//       console.log('Email functionality to be implemented for custom email:', emailInput);
//       // window.open(`mailto:${emailInput}?subject=Order Documents&body=Please find attached your ${activeTab} document.`);
//       setShowEmailModal(false);
//       setEmailInput('');
//     } else {
//       alert('Please enter a valid email address');
//     }
//   };

//   return (
//     <div className="p-6 w-full mx-auto relative">
//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <p>Loading order details...</p>
//         </div>
//       ) : !orderDetails ? (
//         <div className="text-center p-8 bg-red-50 rounded-lg">
//           <p className="text-red-500">No order details available.</p>
//           <p className="text-sm mt-2">Please check your API response format and ensure the order exists.</p>
//         </div>
//       ) : (
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Order Summary Card - Left Side */}
//           <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md overflow-hidden">
//             <div className="p-6 border-b">
//               <h1 className="text-2xl font-bold mb-2">Order Summary</h1>
              
//               <div className="mb-6">
//                 <h2 className="text-lg font-semibold mb-2">Order Details</h2>
//                 <p><span className="font-medium">Order ID:</span> ORD-{orderDetails?.tempOrderId || "N/A"}</p>
//                 <p><span className="font-medium">Date & Time:</span> {formatDate(orderDetails?.createdAt)}</p>
//                 <p><span className="font-medium">Status:</span> <span className="text-green-500">{getLatestStatus()}</span></p>
//                 <p><span className="font-medium">Order Type:</span> {orderDetails?.orderType || "N/A"}</p>
//               </div>
              
//               <div className="mb-6">
//                 <h2 className="text-lg font-semibold mb-2">Customer Details</h2>
//                 <p className="font-medium">{getCustomerName()}</p>
//                 <p>{getCustomerContact()}</p>
//                 <p className="text-sm text-gray-600">{getCustomerAddress()}</p>
//               </div>
              
//               <div className="mb-6">
//                 <h2 className="text-lg font-semibold mb-2">Shipping Details</h2>
//                 <p>{getCourierName()}</p>
//                 <div>
//                   <span className="font-medium">AWB Numbers:</span>
//                   {getAllAwbNumbers().length > 0 ? (
//                     <ul className="mt-1">
//                       {getAllAwbNumbers().map((awb, index) => (
//                         <li key={index}>{awb}</li>
//                       ))}
//                     </ul>
//                   ) : (
//                     <p>N/A</p>
//                   )}
//                 </div>
//               </div>
              
//               <div className="mb-6">
//                 <h2 className="text-lg font-semibold mb-2">Order Items</h2>
//                 {orderDetails?.boxInfo && orderDetails.boxInfo.map((box, boxIndex) => {
//                   // Count total products across all boxes
//                   const totalProducts = box.products?.length || 0;
                  
//                   // Determine which products to show based on showAllProducts state
//                   const productsToShow = showAllProducts 
//                     ? box.products 
//                     : (box.products || []).slice(0, 2);
                  
//                   return (
//                     <div key={boxIndex}>
//                       {productsToShow.map((product, productIndex) => (
//                         <div key={productIndex} className="py-2 border-b border-gray-100 flex justify-between items-center">
//                           <div>
//                             <p className="font-medium">{product.name}</p>
//                           </div>
//                           <div className="text-right">
//                             <p>{product.qty} × ₹ {product.unitPrice}</p>
//                           </div>
//                         </div>
//                       ))}
                      
//                       {/* Only show View More button if there are more than 2 products */}
//                       {totalProducts > 2 && (
//                         <div className="mt-2 text-right">
//                           <button 
//                             className="text-blue-500 text-sm" 
//                             onClick={() => setShowAllProducts(!showAllProducts)}
//                           >
//                             {showAllProducts ? "View Less" : "View More"}
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
              
//               <div className="bg-gray-50 p-4 rounded-md">
//                 <div className="flex justify-between py-2">
//                   <p className="font-medium">Total Invoice Value</p>
//                   <p className="font-medium">₹ {calculateTotal().toLocaleString()}</p>
//                 </div>
//                 <div className="flex justify-between py-2">
//                   <p className="font-medium">Shipping Charges</p>
//                   <p>₹ {getShippingCharges().toLocaleString()}</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="p-4 bg-gray-50">
//               <button 
//                 onClick={handleBackClick}
//                 className="w-full flex items-center justify-center py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//                 </svg>
//                 Back to Dashboard
//               </button>
//             </div>
//           </div>
          
//           {/* Document Tabs - Right Side */}
//           <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
//             {/* Tab Navigation */}
//             <div className="flex border-b">
//               <button
//                 className={`flex-1 py-3 text-center ${activeTab === 'shipping' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
//                 onClick={() => setActiveTab('shipping')}
//               >
//                 Shipping Label
//               </button>
//               <button
//                 className={`flex-1 py-3 text-center ${activeTab === 'manifest' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
//                 onClick={() => setActiveTab('manifest')}
//               >
//                 Manifest
//               </button>
//               <button
//                 className={`flex-1 py-3 text-center ${activeTab === 'invoice' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
//                 onClick={() => setActiveTab('invoice')}
//               >
//                 Invoice
//               </button>
//             </div>
            
//             {/* PDF Viewer */}
//             <div className="flex-grow p-4 flex flex-col">
//               {loadingPdf[activeTab] ? (
//                 <div className="flex justify-center items-center h-full">
//                   <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
//                   <span className="ml-3">Loading {activeTab}...</span>
//                 </div>
//               ) : !pdfData[activeTab] ? (
//                 <div className="flex justify-center items-center h-full flex-col">
//                   <p className="mb-4">No {activeTab} data available</p>
//                   <button 
//                     onClick={() => fetchPdfData(activeTab)}
//                     className="px-4 py-2 bg-blue-500 text-white rounded-md"
//                   >
//                     Load {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
//                   </button>
//                 </div>
//               ) : (
//                 <>
//                   <div className="h-[calc(100vh-300px)] w-full mb-4">
//                     <iframe
//                       src={`data:application/pdf;base64,${pdfData[activeTab]}`}
//                       className="w-full h-full border-0"
//                       title={`${activeTab} PDF`}
//                     />
//                   </div>
//                   <div className="mt-auto flex gap-4">
//                     <button 
//                       onClick={handleEmail}
//                       className="flex-1 px-4 py-2 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                       </svg>
//                       Email
//                     </button>
//                     <button 
//                       onClick={handlePrint}
//                       className="flex-1 px-4 py-2 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2z" />
//                       </svg>
//                       Print
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Email Modal */}
//       {showEmailModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-96 max-w-md">
//             <h3 className="text-lg font-semibold mb-4">Enter Email Address</h3>
//             <p className="text-sm text-gray-600 mb-4">
//               Customer email not available. Please enter an email address to send the {activeTab}.
//             </p>
//             <input
//               type="email"
//               value={emailInput}
//               onChange={(e) => setEmailInput(e.target.value)}
//               placeholder="Enter email address"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <div className="flex gap-4">
//               <button
//                 onClick={() => {
//                   setShowEmailModal(false);
//                   setEmailInput('');
//                 }}
//                 className="flex-1 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleEmailSubmit}
//                 className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
//               >
//                 Send Email
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default OrderBooked;


import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import OneButton from "../../components/Button/OneButton";
import { POST } from "../../utils/webService";
import { 
  GET_SELLER_ORDER_SUMMARY, 
  FETCH_LABELS_REPORT_DOWNLOAD, 
  FETCH_MANIFEST_DATA, 
  FETCH_MULTI_TAX_REPORT_DOWNLOAD 
} from "../../utils/ApiUrls";
import sessionManager from "../../utils/sessionManager";

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
  sellerEmail?: string;
  transit?: string;
  source?: string;
  orderPlacedFrom?: string;
  orderType?: string;
  zone?: string;
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
  tempOrderId?: string; // Add this for backward compatibility

}

type TabType = 'invoice' | 'shipping' | 'manifest';

function OrderBooked() {
  const navigate = useNavigate();
  const location = useLocation();
  const passedData = location.state as LocationState | null;

  const [orderDetails, setOrderDetails] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAllProducts, setShowAllProducts] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabType>('shipping');
  const [pdfData, setPdfData] = useState<{ [key in 'invoice' | 'shipping' | 'manifest']: string }>({
    invoice: '',
    shipping: '',
    manifest: ''
  });
  const [loadingPdf, setLoadingPdf] = useState<{ [key in 'invoice' | 'shipping' | 'manifest']: boolean }>({
    invoice: false,
    shipping: false,
    manifest: false
  });
  const [downloadLoading, setDownloadLoading] = useState<{ 
    isLoading: boolean;
    identifier?: string; 
  }>({ isLoading: false });
  const [showEmailModal, setShowEmailModal] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>('');

  const source = passedData?.source || "";
  const orderId = passedData?.orderId || "";

  const fetchOrderDetails = async () => {
    try {
      const payload = {
        orderId: orderId,
        source: source,
      };

      console.log("Fetching order details with payload:", payload);
      const response = await POST(GET_SELLER_ORDER_SUMMARY, payload);

      if (response?.data?.status && response?.data?.data?.length > 0) {
        // Access the first order in the data array
        setOrderDetails(response.data.data[0].data[0]);
        console.log("Order details found:", response.data.data[0].data[0]);
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
      setLoading(false);
    }
  }, [orderId]);

  const fetchPdfData = async (type: 'invoice' | 'shipping' | 'manifest') => {
    const awbNumbers = getAllAwbNumbers();
    
    if (awbNumbers.length === 0) {
      console.error(`No AWB numbers available to fetch ${type}`);
      return;
    }

    setLoadingPdf(prev => ({ ...prev, [type]: true }));
    
    try {
      let endpoint;
      switch (type) {
        case 'invoice':
          endpoint = FETCH_MULTI_TAX_REPORT_DOWNLOAD;
          break;
        case 'shipping':
          endpoint = FETCH_LABELS_REPORT_DOWNLOAD;
          break;
        case 'manifest':
          endpoint = FETCH_MANIFEST_DATA;
          break;
      }

      const { sellerInfo } = sessionManager({});
      const payload = { awbs: awbNumbers };
      
      let headers = {
        Accept: "/",
        Authorization: `Bearer ${sellerInfo?.token}`,
        "Content-Type": "application/json",
      };
      
      const response = await fetch(endpoint, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        console.error(`Error fetching ${type} PDF:`, response);
        return;
      }
      
      const data = await response.blob();
      const reader = new FileReader();
      
      reader.onloadend = function() {
        const base64data = reader.result?.toString().split(',')[1] || '';
        setPdfData(prev => ({ ...prev, [type]: base64data }));
      };
      
      reader.readAsDataURL(data);
    } catch (error) {
      console.error(`Error fetching ${type} PDF:`, error);
    } finally {
      setLoadingPdf(prev => ({ ...prev, [type]: false }));
    }
  };

  useEffect(() => {
    // Fetch PDF data when tab changes and we don't have the data yet
    if (!pdfData[activeTab]) {
      fetchPdfData(activeTab);
    }
  }, [activeTab]);
  
  // Initialize by loading the first tab's data once order details are loaded
  useEffect(() => {
    if (orderDetails && getAllAwbNumbers().length > 0 && !pdfData[activeTab]) {
      fetchPdfData(activeTab);
    }
  }, [orderDetails]);

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
    navigate("/dashboard/overview");
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

  // Handle print
  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow && pdfData[activeTab]) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print ${activeTab}</title>
          </head>
          <body>
            <iframe src="data:application/pdf;base64,${pdfData[activeTab]}" width="100%" height="100%" style="border: none;"></iframe>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.onload = function() {
        printWindow.print();
      };
    }
  };

  // Handle email
  const handleEmail = () => {
    const customerEmail = orderDetails?.deliveryAddress?.contact?.emailId || '';
    if (customerEmail) {
      // You can customize this based on your backend email service
      // This is just a placeholder for the email functionality
      console.log('Email functionality to be implemented for:', customerEmail);
      // window.open(`mailto:${customerEmail}?subject=Order Documents&body=Please find attached your ${activeTab} document.`);
    } else {
      setShowEmailModal(true);
    }
  };

  // Handle email submission
  const handleEmailSubmit = () => {
    if (emailInput && emailInput.includes('@')) {
      // You can customize this based on your backend email service
      console.log('Email functionality to be implemented for custom email:', emailInput);
      // window.open(`mailto:${emailInput}?subject=Order Documents&body=Please find attached your ${activeTab} document.`);
      setShowEmailModal(false);
      setEmailInput('');
    } else {
      alert('Please enter a valid email address');
    }
  };

  return (
    <div className="p-6 w-full mx-auto relative">
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
        <div className="flex flex-col md:flex-row gap-6">
          {/* Order Summary Card - Left Side */}
          <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <h1 className="text-2xl font-bold mb-2">Order Summary</h1>
              
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Order Details</h2>
                <p><span className="font-medium">Order ID:</span> {orderDetails?.orderId || "N/A"}</p>
                <p><span className="font-medium">Date & Time:</span> {formatDate(orderDetails?.createdAt)}</p>
                <p><span className="font-medium">Status:</span> <span className="text-green-500">{getLatestStatus()}</span></p>
                <p><span className="font-medium">Order Type:</span> {orderDetails?.orderType || "N/A"}</p>
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
                {orderDetails?.boxInfo && orderDetails.boxInfo.map((box, boxIndex) => {
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
                className="w-full flex items-center justify-center py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Dashboard
              </button>
            </div>
          </div>
          
          {/* Document Tabs - Right Side */}
          <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            {/* Tab Navigation */}
            <div className="flex border-b">
              <button
                className={`flex-1 py-3 text-center ${activeTab === 'shipping' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
                onClick={() => setActiveTab('shipping')}
              >
                Shipping Label
              </button>
              <button
                className={`flex-1 py-3 text-center ${activeTab === 'manifest' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
                onClick={() => setActiveTab('manifest')}
              >
                Manifest
              </button>
              <button
                className={`flex-1 py-3 text-center ${activeTab === 'invoice' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
                onClick={() => setActiveTab('invoice')}
              >
                Invoice
              </button>
            </div>
            
            {/* PDF Viewer */}
            <div className="flex-grow p-4 flex flex-col">
              {loadingPdf[activeTab] ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                  <span className="ml-3">Loading {activeTab}...</span>
                </div>
              ) : !pdfData[activeTab] ? (
                <div className="flex justify-center items-center h-full flex-col">
                  <p className="mb-4">No {activeTab} data available</p>
                  <button 
                    onClick={() => fetchPdfData(activeTab)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Load {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                  </button>
                </div>
              ) : (
                <>
                  <div className="h-[calc(100vh-300px)] w-full mb-4">
                    <iframe
                      src={`data:application/pdf;base64,${pdfData[activeTab]}`}
                      className="w-full h-full border-0"
                      title={`${activeTab} PDF`}
                    />
                  </div>
                  <div className="mt-auto flex gap-4">
                    <button 
                      onClick={handleEmail}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email
                    </button>
                    <button 
                      onClick={handlePrint}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2z" />
                      </svg>
                      Print
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md">
            <h3 className="text-lg font-semibold mb-4">Enter Email Address</h3>
            <p className="text-sm text-gray-600 mb-4">
              Customer email not available. Please enter an email address to send the {activeTab}.
            </p>
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Enter email address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowEmailModal(false);
                  setEmailInput('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEmailSubmit}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              >
                Send Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderBooked;
