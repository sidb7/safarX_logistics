// import React, { useState, useEffect } from "react";
// import OneButton from "../../components/Button/OneButton";
// import CenterModal from "../../components/CustomModal/customCenterModal";
// import { GET_TRANSPORTER_ID } from "../../utils/ApiUrls";
// import { POST, GET } from "../../utils/webService";
// import FloatingLabelInput from "./FloatingLabelInput";
// import truckIcon from "../../assets/Order/RTO.svg";
// // Import a check icon for the success state (you might need to create this asset)
// import checkIcon from "../../assets/Order/check.svg";

// interface EWayBillCardProps {
//   totalInvoiceValue?: number;
// }

// interface Transporter {
//   _id: string;
//   partnerId: string;
//   partnerName: string;
//   transportId: string;
//   accountType: string;
// }

// interface EWayBillDetails {
//   transporterName: string;
//   transporterId: string;
//   eWayBillNumber: string;
// }

// const EWayBillCard: React.FC<EWayBillCardProps> = ({
//   totalInvoiceValue = 0,
// }) => {
//   // States
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [transporters, setTransporters] = useState<Transporter[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [selectedTransporter, setSelectedTransporter] =
//     useState<Transporter | null>(null);
//   const [showEWayForm, setShowEWayForm] = useState(false);
//   const [eWayBillNumber, setEWayBillNumber] = useState("");
//   const [error, setError] = useState("");
//   // New state to track if E-Way Bill is added
//   const [eWayBillAdded, setEWayBillAdded] = useState(false);
//   const [eWayBillDetails, setEWayBillDetails] =
//     useState<EWayBillDetails | null>(null);

//   // Default threshold for E-Way Bill requirement in India (₹50,000)
//   const EWAY_BILL_THRESHOLD = 50000;
//   const isEWayBillRequired = totalInvoiceValue > EWAY_BILL_THRESHOLD;

//   // Fetch transporters when modal opens
//   useEffect(() => {
//     if (isModalOpen && !showEWayForm) {
//       fetchTransporters();
//     }
//   }, [isModalOpen, showEWayForm]);

//   const fetchTransporters = async () => {
//     setLoading(true);
//     try {
//       const payload = {
//         skip: 0,
//         limit: 1000,
//         pageNo: 1,
//         sort: { _id: -1 },
//       };

//       const response = await GET(GET_TRANSPORTER_ID, payload);

//       if (response?.data?.success) {
//         setTransporters(response.data.data || []);
//       } else {
//         console.error("API returned unsuccessful response");
//         setTransporters([]);
//       }
//     } catch (error) {
//       console.error("Error fetching transporters:", error);
//       setTransporters([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEnterEWayBillDetails = () => {
//     // Open the E-Way Bill modal
//     setIsModalOpen(true);
//     setShowEWayForm(false);
//     setSelectedTransporter(null);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setShowEWayForm(false);
//     setSelectedTransporter(null);
//     setEWayBillNumber("");
//     setError("");
//   };

//   const handleSelectCourier = (transporter: Transporter) => {
//     setSelectedTransporter(transporter);
//     setShowEWayForm(true);
//   };

//   const handleBackToTransporters = () => {
//     setShowEWayForm(false);
//     setSelectedTransporter(null);
//     setEWayBillNumber("");
//     setError("");
//   };

//   const handleSubmitEWayBill = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Basic validation
//     if (!eWayBillNumber.trim()) {
//       setError("E-Way Bill number is required");
//       return;
//     }

//     // Check if it matches the expected format (typically 12 digits)
//     if (!/^\d{12}$/.test(eWayBillNumber.trim())) {
//       setError("E-Way Bill number must be 12 digits");
//       return;
//     }

//     // Submit the data
//     const formData = {
//       transporterId: selectedTransporter?.transportId || "",
//       eWayBillNumber: eWayBillNumber.trim(),
//     };

//     console.log("Submitting E-Way Bill data:", formData);
//     // Here you would typically make an API call to save the data

//     // After successful submission, set the E-Way Bill as added
//     setEWayBillAdded(true);
//     setEWayBillDetails({
//       transporterName: selectedTransporter?.partnerName || "",
//       transporterId: selectedTransporter?.transportId || "",
//       eWayBillNumber: eWayBillNumber.trim(),
//     });

//     // Close the modal
//     handleCloseModal();
//   };

//   // Handle editing the E-Way Bill details
//   const handleEditEWayBill = () => {
//     setIsModalOpen(true);
//     // Pre-fill the form with existing details if any
//     if (eWayBillDetails) {
//       const existingTransporter = transporters.find(
//         (t) => t.transportId === eWayBillDetails.transporterId
//       );
//       if (existingTransporter) {
//         setSelectedTransporter(existingTransporter);
//         setShowEWayForm(true);
//         setEWayBillNumber(eWayBillDetails.eWayBillNumber);
//       }
//     }
//   };

//   // Format the amount with commas and decimal points
//   const formatAmount = (amount: number) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     })
//       .format(amount)
//       .replace("₹", "₹");
//   };

//   // Only show this component if E-Way Bill is required
//   if (!isEWayBillRequired) {
//     return null;
//   }

//   // Modal content based on current state
//   const renderModalContent = () => {
//     if (showEWayForm && selectedTransporter) {
//       return (
//         <div className="flex flex-col h-full">
//           <div className="p-4 flex-1">
//             <OneButton
//               text="Back"
//               onClick={handleBackToTransporters}
//               variant="tertiary"
//               className="flex items-center text-gray-600 mb-4 !w-auto"
//               showIcon={true}
//               icon={
//                 <svg
//                   width="20"
//                   height="20"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="mr-1"
//                 >
//                   <path
//                     d="M19 12H5M12 19L5 12L12 5"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//               }
//             />

//             <p className="text-sm mb-6">
//               Select a courier and enter the E-Way Bill number for shipment with
//               value over ₹50,000
//             </p>

//             <div className="mb-6">
//               <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-2 mb-4">
//                 <img
//                   src={truckIcon}
//                   alt="Truck Icon"
//                   className="w-6 h-6 mr-2"
//                 />
//                 <span className="font-medium">
//                   {selectedTransporter.partnerName}
//                 </span>
//               </div>
//               <p className="text-sm text-gray-600 ml-2">
//                 Transport ID: {selectedTransporter.transportId}
//               </p>
//             </div>

//             <form id="ewayBillForm" onSubmit={handleSubmitEWayBill}>
//               <div className="mb-6">
//                 <FloatingLabelInput
//                   placeholder="E-Way Bill Number"
//                   value={eWayBillNumber}
//                   onChangeCallback={(value: any) => {
//                     setEWayBillNumber(value);
//                     setError("");
//                   }}
//                   type="text"
//                 />
//                 {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
//               </div>
//             </form>
//           </div>

//           {/* Footer with buttons */}
//           <div className="mt-auto border-t p-4 flex justify-between">
//             <OneButton
//               text="Back"
//               onClick={handleBackToTransporters}
//               variant="secondary"
//               className="px-6 py-3 !rounded-full !w-auto"
//             />
//             <OneButton
//               text="Confirm E-Way Bill"
//               onClick={handleSubmitEWayBill}
//               variant="primary"
//               className="px-6 py-3 !rounded-full !w-auto"
//               type="submit"
//             />
//           </div>
//         </div>
//       );
//     } else {
//       return (
//         <>
//           <div className="flex justify-between items-center p-4 border-b">
//             <h2 className="text-xl font-semibold">E-Way Bill Information</h2>
//             <OneButton
//               text=""
//               onClick={handleCloseModal}
//               variant="tertiary"
//               className="text-gray-500 hover:text-gray-700 !w-auto"
//               showIcon={true}
//               onlyIcon={true}
//               icon={
//                 <svg
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M18 6L6 18M6 6L18 18"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//               }
//             />
//           </div>

//           <div className="p-4">
//             <p className="text-sm mb-6">
//               Select a courier and enter the E-Way Bill number for shipment with
//               value over ₹50,000
//             </p>

//             <h3 className="text-lg font-semibold mb-3">Select a Courier</h3>

//             {loading ? (
//               <div className="flex justify-center items-center py-8">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//               </div>
//             ) : transporters.length > 0 ? (
//               <div className="divide-y border rounded-lg">
//                 {transporters.map((transporter) => (
//                   <div
//                     key={transporter._id}
//                     className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
//                     onClick={() => handleSelectCourier(transporter)}
//                   >
//                     <div>
//                       <h4 className="font-semibold">
//                         {transporter.partnerName}
//                       </h4>
//                       <p className="text-sm text-gray-700">
//                         Transport ID: {transporter.transportId}
//                       </p>
//                       <p className="text-sm text-gray-500">
//                         For {transporter.partnerName} shipment with value over ₹
//                         50,000
//                       </p>
//                     </div>
//                     <div className="text-gray-400">
//                       <svg
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M9 18L15 12L9 6"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-8">
//                 <p className="text-gray-500">
//                   No transporters available. Please try again later.
//                 </p>
//               </div>
//             )}
//           </div>
//         </>
//       );
//     }
//   };

//   // Render different cards based on whether E-Way Bill is added or not
//   if (eWayBillAdded && eWayBillDetails) {
//     // Success state - E-Way Bill has been added
//     return (
//       <>
//         <div className="bg-[#F2FAEF] rounded-lg shadow-md p-4 mb-6">
//           <div className="flex flex-col">
//             {/* Title */}
//             <h3 className="font-semibold text-sm leading-5 tracking-normal font-Open mb-1">
//               E-Way Bill Added
//             </h3>

//             {/* First row - with courier info and edit icon */}
//             <div className="flex items-center justify-between mt-1">
//               <div className="flex items-center">
//                 {/* Success Icon */}
//                 <svg
//                   width="22"
//                   height="22"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="mr-2"
//                 >
//                   <path
//                     d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
//                     stroke="#7CCA62"
//                     strokeWidth="2"
//                     fill="#F2FAEF"
//                   />
//                   <path
//                     d="M8 12L11 15L16 9"
//                     stroke="#7CCA62"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>

//                 {/* Pill-shaped transporter name */}
//                 <div className="inline-flex items-center bg-white rounded-full px-3 py-0.5 border border-[#7CCA62] text-sm text-[#7CCA62]">
//                   {eWayBillDetails.transporterName}
//                 </div>

//                 {/* Transport ID */}
//                 <span className="ml-2 text-xs text-gray-600">
//                   Transport ID: {eWayBillDetails.transporterId}
//                 </span>
//               </div>

//               {/* Edit Icon */}
//               <div className="cursor-pointer" onClick={handleEditEWayBill}>
//                 <svg
//                   width="18"
//                   height="18"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
//                     stroke="#7CCA62"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                   <path
//                     d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
//                     stroke="#7CCA62"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//               </div>
//             </div>

//             {/* E-Way Bill Number */}
//             <p className="font-normal text-xs leading-5 tracking-normal font-Open mt-1">
//               E-Way Bill Number: {eWayBillDetails.eWayBillNumber}
//             </p>
//           </div>
//         </div>

//         {/* E-Way Bill Modal - Include in success state too */}
//         <CenterModal
//           isOpen={isModalOpen}
//           onRequestClose={handleCloseModal}
//           contentLabel="E-Way Bill Information"
//           className="max-w-md w-full h-auto max-h-[60vh]"
//           shouldCloseOnOverlayClick={true}
//         >
//           <div className="flex flex-col w-full h-full">
//             {renderModalContent()}
//           </div>
//         </CenterModal>
//       </>
//     );
//   } else {
//     // Warning state - E-Way Bill is required but not added yet
//     return (
//       <>
//         <div className="bg-[#FFFBEB] rounded-lg shadow-md p-6 mb-6">
//           <div className="flex items-start">
//             {/* Warning Icon */}
//             <div className="mr-4">
//               <svg
//                 width="32"
//                 height="32"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
//                   stroke="#F59E0B"
//                   strokeWidth="2"
//                   fill="#FEF3C7"
//                 />
//                 <path
//                   d="M12 8V12"
//                   stroke="#F59E0B"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                 />
//                 <circle cx="12" cy="16" r="1" fill="#F59E0B" />
//               </svg>
//             </div>

//             {/* Content */}
//             <div className="flex-1">
//               <h3 className="font-semibold text-sm leading-5 tracking-normal font-Open">
//                 E-Way Bill Required
//               </h3>
//               <p className="font-normal text-xs leading-4 tracking-normal font-Open">
//                 The total value of your order is{" "}
//                 {formatAmount(totalInvoiceValue)}, which exceeds{" "}
//                 {formatAmount(EWAY_BILL_THRESHOLD)}. An E-Way Bill is required
//                 for this shipment
//               </p>
//             </div>

//             {/* Button */}
//             <div className="ml-4">
//               <OneButton
//                 text="Enter E-Way Bill Details"
//                 onClick={handleEnterEWayBillDetails}
//                 variant="primary"
//                 className="!rounded-full"
//                 showIcon={true}
//                 icon={
//                   <svg
//                     width="20"
//                     height="20"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="mr-2"
//                   >
//                     <path
//                       d="M12 5V19M5 12H19"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 }
//               />
//             </div>
//           </div>
//         </div>

//         {/* E-Way Bill Modal */}
//         <CenterModal
//           isOpen={isModalOpen}
//           onRequestClose={handleCloseModal}
//           contentLabel="E-Way Bill Information"
//           className="max-w-md w-full h-auto max-h-[60vh]"
//           shouldCloseOnOverlayClick={true}
//         >
//           <div className="flex flex-col w-full h-full">
//             {renderModalContent()}
//           </div>
//         </CenterModal>
//       </>
//     );
//   }
// };

// export default EWayBillCard;

import React, { useState, useEffect } from "react";
import OneButton from "../../components/Button/OneButton";
import CenterModal from "../../components/CustomModal/customCenterModal";
import { GET_TRANSPORTER_ID, POST_SET_ORDER_ID } from "../../utils/ApiUrls"; // Added POST_SET_ORDER_ID import
import { POST, GET } from "../../utils/webService";
import FloatingLabelInput from "./FloatingLabelInput";
import truckIcon from "../../assets/Order/RTO.svg";
// Import a check icon for the success state (you might need to create this asset)
import checkIcon from "../../assets/Order/check.svg";

interface EWayBillCardProps {
  totalInvoiceValue?: number;
  tempOrderId?: string; // Added prop for tempOrderId
  source?: string; // Added prop for source
  orderId?: string; // Added prop for orderId
  orderType?: string; // Added prop for orderType
  onEWayBillUpdate?: (billNumber: string) => void; // New callback prop
}

interface Transporter {
  _id: string;
  partnerId: string;
  partnerName: string;
  transportId: string;
  accountType: string;
}

interface EWayBillDetails {
  transporterName: string;
  transporterId: string;
  eWayBillNumber: string;
}

const EWayBillCard: React.FC<EWayBillCardProps> = ({
  totalInvoiceValue = 0,
  tempOrderId = "",
  source = "",
  orderId = "",
  orderType = "",
  onEWayBillUpdate = () => {}, // Default no-op function

}) => {
  // States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transporters, setTransporters] = useState<Transporter[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTransporter, setSelectedTransporter] =
    useState<Transporter | null>(null);
  const [showEWayForm, setShowEWayForm] = useState(false);
  const [eWayBillNumber, setEWayBillNumber] = useState("");
  const [error, setError] = useState("");
  // New state to track if E-Way Bill is added
  const [eWayBillAdded, setEWayBillAdded] = useState(false);
  const [eWayBillDetails, setEWayBillDetails] =
    useState<EWayBillDetails | null>(null);
  // Add state for tracking button disable state during API call
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Default threshold for E-Way Bill requirement in India (₹50,000)
  const EWAY_BILL_THRESHOLD = 50000;
  const isEWayBillRequired = totalInvoiceValue >= EWAY_BILL_THRESHOLD;

  // Fetch transporters when modal opens
  useEffect(() => {
    if (isModalOpen && !showEWayForm) {
      fetchTransporters();
    }
  }, [isModalOpen, showEWayForm]);

  const fetchTransporters = async () => {
    setLoading(true);
    try {
      const payload = {
        skip: 0,
        limit: 1000,
        pageNo: 1,
        sort: { _id: -1 },
        orderType: orderType, // Add orderType to the payload
      };

      const response = await POST(GET_TRANSPORTER_ID, payload);

      if (response?.data?.success) {
        setTransporters(response.data.data || []);
      } else {
        console.error("API returned unsuccessful response");
        setTransporters([]);
      }
    } catch (error) {
      console.error("Error fetching transporters:", error);
      setTransporters([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEnterEWayBillDetails = () => {
    // Open the E-Way Bill modal
    setIsModalOpen(true);
    setShowEWayForm(false);
    setSelectedTransporter(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowEWayForm(false);
    setSelectedTransporter(null);
    setEWayBillNumber("");
    setError("");
  };

  const handleSelectCourier = (transporter: Transporter) => {
    setSelectedTransporter(transporter);
    setShowEWayForm(true);
  };

  const handleBackToTransporters = () => {
    setShowEWayForm(false);
    setSelectedTransporter(null);
    setEWayBillNumber("");
    setError("");
  };

  const handleSubmitEWayBill = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation - only check if field is empty
    if (!eWayBillNumber.trim()) {
      setError("E-Way Bill number is required");
      return;
    }

    // Set submitting state to disable button
    setIsSubmitting(true);
    
    try {
      // Submit the data
      const formData = {
        transporterId: selectedTransporter?.transportId || "",
        eWayBillNumber: eWayBillNumber.trim(),
      };

      console.log("Submitting E-Way Bill data:", formData);
      // Here you would typically make an API call to save the data

      // Call POST_SET_ORDER_ID API with eWayBillNo
      if (tempOrderId && source) {
        const orderIdPayload = {
          orderId: orderId,
          eWayBillNo: eWayBillNumber.trim(),
          tempOrderId: tempOrderId,
          source: source,
        };
        
        try {
          const response = await POST(POST_SET_ORDER_ID, orderIdPayload);
          console.log("E-Way Bill API response:", response);
          
          if (!response?.data?.success) {
            console.error("Failed to update E-Way Bill number:", response?.data?.message);
          }
        } catch (error) {
          console.error("Error updating E-Way Bill number:", error);
        }
      } else {
        console.warn("tempOrderId or source missing, cannot update E-Way Bill number");
      }
       
      // Notify parent component about the E-Way Bill number
      onEWayBillUpdate(eWayBillNumber.trim());
      // After successful submission, set the E-Way Bill as added
      setEWayBillAdded(true);
      setEWayBillDetails({
        transporterName: selectedTransporter?.partnerName || "",
        transporterId: selectedTransporter?.transportId || "",
        eWayBillNumber: eWayBillNumber.trim(),
      });

      // Close the modal
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting E-Way Bill:", error);
      setError("Failed to submit E-Way Bill. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle editing the E-Way Bill details
  const handleEditEWayBill = () => {
    setIsModalOpen(true);
    // Pre-fill the form with existing details if any
    if (eWayBillDetails) {
      const existingTransporter = transporters.find(
        (t) => t.transportId === eWayBillDetails.transporterId
      );
      if (existingTransporter) {
        setSelectedTransporter(existingTransporter);
        setShowEWayForm(true);
        setEWayBillNumber(eWayBillDetails.eWayBillNumber);

        onEWayBillUpdate(eWayBillDetails.eWayBillNumber);
      }
    }
  };

  // Format the amount with commas and decimal points
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
      .format(amount)
      .replace("₹", "₹");
  };

  // Only show this component if E-Way Bill is required
  if (!isEWayBillRequired) {
    return null;
  }

  // Modal content based on current state
  const renderModalContent = () => {
    if (showEWayForm && selectedTransporter) {
      return (
        <div className="flex flex-col h-full">
          <div className="p-4 flex-1">
         

            <p className="text-sm mb-6">
              Select a courier and enter the E-Way Bill number for shipment with
              value over ₹50,000
            </p>

            <div className="mb-6">
              <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-2 mb-4">
                <img
                  src={truckIcon}
                  alt="Truck Icon"
                  className="w-6 h-6 mr-2"
                />
                <span className="font-medium">
                  {selectedTransporter.partnerName}
                </span>
              </div>
              <p className="text-sm text-gray-600 ml-2">
                Transport ID: {selectedTransporter.transportId}
              </p>
            </div>

            <form id="ewayBillForm" onSubmit={handleSubmitEWayBill}>
              <div className="mb-6">
                <FloatingLabelInput
                  placeholder="E-Way Bill Number"
                  value={eWayBillNumber}
                  onChangeCallback={(value: any) => {
                    setEWayBillNumber(value);
                    setError("");
                  }}
                  type="text"
                />
                {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
              </div>
            </form>
          </div>

          {/* Footer with buttons */}
          <div className="mt-auto border-t p-4 flex justify-between">
            <OneButton
              text="Back"
              onClick={handleBackToTransporters}
              variant="secondary"
              className="px-6 py-3 !rounded-full !w-auto"
            />
            <OneButton
              text={isSubmitting ? "Processing..." : "Confirm E-Way Bill"}
              onClick={handleSubmitEWayBill}
              variant="primary"
              className="px-6 py-3 !rounded-full !w-auto"
              type="submit"
              disabled={!eWayBillNumber.trim() || isSubmitting} // Disable button if eWayBillNumber is empty or submitting
            />
          </div>
        </div>
      );
    } else {
      return (
        <>
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">E-Way Bill Information</h2>
            <OneButton
              text=""
              onClick={handleCloseModal}
              variant="tertiary"
              className="text-gray-500 hover:text-gray-700 !w-auto"
              showIcon={true}
              onlyIcon={true}
              icon={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
          </div>

          <div className="p-4">
            <p className="text-sm mb-6">
              Select a courier and enter the E-Way Bill number for shipment with
              value over ₹50,000
            </p>

            <h3 className="text-lg font-semibold mb-3">Select a Courier</h3>

            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : transporters.length > 0 ? (
              <div className="divide-y border rounded-lg">
                {transporters.map((transporter) => (
                  <div
                    key={transporter._id}
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSelectCourier(transporter)}
                  >
                    <div>
                      <h4 className="font-semibold">
                        {transporter.partnerName}
                      </h4>
                      <p className="text-sm text-gray-700">
                        Transport ID: {transporter.transportId}
                      </p>
                      <p className="text-sm text-gray-500">
                        For {transporter.partnerName} shipment with value over ₹
                        50,000
                      </p>
                    </div>
                    <div className="text-gray-400">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 18L15 12L9 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No transporters available. Please try again later.
                </p>
              </div>
            )}
          </div>
        </>
      );
    }
  };

  // Render different cards based on whether E-Way Bill is added or not
  if (eWayBillAdded && eWayBillDetails) {
    // Success state - E-Way Bill has been added
    return (
      <>
        <div className="bg-[#F2FAEF] rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col">
            {/* Title */}
            <h3 className="font-semibold text-sm leading-5 tracking-normal font-Open mb-1">
              E-Way Bill Added
            </h3>

            {/* First row - with courier info and edit icon */}
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center">
                {/* Success Icon */}
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="#7CCA62"
                    strokeWidth="2"
                    fill="#F2FAEF"
                  />
                  <path
                    d="M8 12L11 15L16 9"
                    stroke="#7CCA62"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Pill-shaped transporter name */}
                <div className="inline-flex items-center bg-white rounded-full px-3 py-0.5 border border-[#7CCA62] text-sm text-[#7CCA62]">
                  {eWayBillDetails.transporterName}
                </div>

                {/* Transport ID */}
                <span className="ml-2 text-xs text-gray-600">
                  Transport ID: {eWayBillDetails.transporterId}
                </span>
              </div>

              {/* Edit Icon */}
              <div className="cursor-pointer" onClick={handleEditEWayBill}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                    stroke="#7CCA62"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
                    stroke="#7CCA62"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* E-Way Bill Number */}
            <p className="font-normal text-xs leading-5 tracking-normal font-Open mt-1">
              E-Way Bill Number: {eWayBillDetails.eWayBillNumber}
            </p>
          </div>
        </div>

        {/* E-Way Bill Modal - Include in success state too */}
        <CenterModal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          contentLabel="E-Way Bill Information"
          className="max-w-md w-full h-auto max-h-[60vh]"
          shouldCloseOnOverlayClick={true}
        >
          <div className="flex flex-col w-full h-full">
            {renderModalContent()}
          </div>
        </CenterModal>
      </>
    );
  } else {
    // Warning state - E-Way Bill is required but not added yet
    return (
      <>
        <div className="bg-[#FFFBEB] rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start">
            {/* Warning Icon */}
            <div className="mr-4">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  fill="#FEF3C7"
                />
                <path
                  d="M12 8V12"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="16" r="1" fill="#F59E0B" />
              </svg>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="font-semibold text-sm leading-5 tracking-normal font-Open">
                E-Way Bill Required
              </h3>
              <p className="font-normal text-xs leading-4 tracking-normal font-Open">
                The total value of your order is{" "}
                {formatAmount(totalInvoiceValue)}, which exceeds{" "}
                {formatAmount(EWAY_BILL_THRESHOLD)}. An E-Way Bill is required
                for this shipment
              </p>
            </div>

            {/* Button */}
            <div className="ml-4">
              <OneButton
                text="Enter E-Way Bill Details"
                onClick={handleEnterEWayBillDetails}
                variant="primary"
                className="!rounded-full"
                showIcon={true}
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2"
                  >
                    <path
                      d="M12 5V19M5 12H19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              />
            </div>
          </div>
        </div>

        {/* E-Way Bill Modal */}
        <CenterModal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          contentLabel="E-Way Bill Information"
          className="max-w-md w-full h-auto max-h-[60vh]"
          shouldCloseOnOverlayClick={true}
        >
          <div className="flex flex-col w-full h-full">
            {renderModalContent()}
          </div>
        </CenterModal>
      </>
    );
  }
};

export default EWayBillCard;
