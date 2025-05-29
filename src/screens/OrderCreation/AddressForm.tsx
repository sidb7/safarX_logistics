// import { useState, ReactNode, useEffect, useRef } from "react";
// import FloatingLabelInput from "./FloatingLabelInput"; 
// import OneButton from "../../components/Button/OneButton";
// import userguide from "../../assets/Order/User guide.svg";
// import locationIcon from "../../assets/Order/Location.svg";
// import CenterModal from "../../components/CustomModal/customCenterModal";
// import {
//   GET_PICKUP_ADDRESS_MULTIPLE_SEARCH,
//   PIN_PICKUP_ADDRESS,
//   GET_DELIVERY_ADDRESS_MULTIPLE_SEARCH,
//   PIN_DELIVERY_ADDRESS,
//   DEFAULT_PICKUP_ADDRESS,
//   DEFAULT_DELIVERY_ADDRESS,
//   PICKUP_ADDRESS_SEARCHBY,
//   DELIVERY_ADDRESS_SEARCHBY,
//   ADD_PICKUP_ADDRESS_CATALOGUE,
//   ADD_DELIVERY_ADDRESS,
//   VERIFY_ADDRESS,
//   GET_PINCODE_DATA
// } from "../../utils/ApiUrls";
// import { POST } from "../../utils/webService";
// import { toast } from "react-hot-toast"; // Assuming this is available since it's used in OrderForm
// import sessionManager from "../../utils/sessionManager";


// // Import the Save and Bookmark icons like in OrderForm
// const Save = ({ className = "w-5 h-5" }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className={className}
//   >
//     <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
//     <polyline points="17 21 17 13 7 13 7 21"></polyline>
//     <polyline points="7 3 7 8 15 8"></polyline>
//   </svg>
// );

// const Bookmark = ({ className = "w-5 h-5", isFilled = false }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill={isFilled ? "currentColor" : "none"}
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className={className}
//   >
//     <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
//   </svg>
// );

// const STORAGE_KEYS = {
//   ORDER_DATA: "order-creation-data",
//   ACTIVE_STEP: "order-creation-active-step",
//   PICKUP_ADDRESS: "order-creation-pickup-address",
//   DELIVERY_ADDRESS: "order-creation-delivery-address",
//   BOX_DATA: "order-creation-box-data",
//   B2B_BOX_DATA: "order-creation-b2b-box-data",
//   PAYMENT_INFO: "order-creation-payment-info",
//   SELECTED_SERVICE: "order-creation-selected-service",
//   TEMP_ORDER_ID: "order-creation-temp-order-id",
//   ORDER_SOURCE: "order-creation-order-source",
//   ORDER_TYPE: "order-creation-order-type",
//   REVERSE_STATE: "order-creation-reverse-state",
// };


// interface VerifiedAddress {
//   person_name: string;
//   mobile_number: string;
//   house_number: string;
//   floor: string;
//   building_name: string;
//   locality_name: string;
//   landmark: string;
//   subcity_name: string;
//   city_name: string;
//   state_name: string;
//   country_name: string;
//   pincode: string;
//   full_address: string;
//   product_name: string;
//   product_quantity: string;
//   product_count: string;
// }

// interface Address {
//   name?: string;
//   address?: string;
//   city?: string;
//   state?: string;
//   pincode?: string;
//   pincodeStr?: string;
//   contactNo?: string;
//   email?: string;
//   landmark?: string;
//   gstNo?: string;
//   addressLine1?: string;
//   addressLine2?: string;
//   flatNo?: string;
//   locality?: string;
//   sector?: string;
//   fullAddress?: string;
//   isPin?: boolean;
//   pickupAddressId?: string;
//   deliveryAddressId?: string;
//   contact?: {
//     name?: string;
//     mobileNo?: number;
//     mobileNoStr?: string;
//     emailId?: string;
//     alternateMobileNo?: number;
//   };
//   workingDays?: any;
//   workingHours?: string;
//   // Add any other properties that might be in the API response
//   [key: string]: any; // This allows for any additional properties
// }

// // Interface for form values to better track input field values
// interface FormValues {
//   contactNo: string;
//   address: string;
//   name: string;
//   pincode: string;
//   city: string;
//   state: string;
//   addressLine1: string; // Will map to flatNo
//   addressLine2: string; // Will map to locality
//   landmark: string;
//   gstNo: string;
//   email: string;
// }

// interface AddressFormProps {
//   showPickupDetails: boolean;
//   setShowPickupDetails: React.Dispatch<React.SetStateAction<boolean>>;
//   showDeliveryDetails: boolean;
//   setShowDeliveryDetails: React.Dispatch<React.SetStateAction<boolean>>;
//   isPickupModalOpen: boolean;
//   setIsPickupModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   isDeliveryModalOpen: boolean;
//   setIsDeliveryModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   pickupFormValues: FormValues;
//   setPickupFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
//   deliveryFormValues: FormValues;
//   setDeliveryFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
//   pickupAddress: Address | null;
//   setPickupAddress: React.Dispatch<React.SetStateAction<Address | any>>;
//   deliveryAddress: Address | any;
//   setDeliveryAddress: React.Dispatch<React.SetStateAction<Address | any>>;
//   isLoading: { pickup: boolean; delivery: boolean };
//   setIsLoading: React.Dispatch<
//     React.SetStateAction<{ pickup: boolean; delivery: boolean }>
//   >;
//   pickupSearchResults: Address[];
//   setPickupSearchResults: any;
//   deliverySearchResults: Address[];
//   setDeliverySearchResults: any;
//   showPickupSearchResults: boolean;
//   setShowPickupSearchResults: React.Dispatch<React.SetStateAction<boolean>>;
//   showDeliverySearchResults: boolean;
//   setShowDeliverySearchResults: React.Dispatch<React.SetStateAction<boolean>>;
//   formErrors: {
//     pickup: {
//       contactNo: boolean;
//       address: boolean;
//       name: boolean;
//       pincode: boolean;
//       city: boolean;
//       state: boolean;
//       addressLine1: boolean;
//       addressLine2: boolean;
//       landmark: boolean;
//       gstNo: boolean;
//       // email: boolean;
//     };
//     delivery: {
//       contactNo: boolean; 
//       address: boolean;
//       name: boolean;
//       pincode: boolean;
//       city: boolean;
//       state: boolean;
//       addressLine1: boolean;
//       addressLine2: boolean;
//       landmark: boolean;
//       gstNo: boolean;
//       // email: boolean;
//     };
//   };
//   orderType: string; // B2C or B2B
//   clearFieldError: (formType: "pickup" | "delivery", field: string) => void; // New prop
// }

// const AddressForm: React.FC<AddressFormProps> = ({
//   showPickupDetails,
//   setShowPickupDetails,
//   showDeliveryDetails,
//   setShowDeliveryDetails,
//   isPickupModalOpen,
//   setIsPickupModalOpen,
//   isDeliveryModalOpen,
//   setIsDeliveryModalOpen,
//   pickupFormValues,
//   setPickupFormValues,
//   deliveryFormValues,
//   setDeliveryFormValues,
//   pickupAddress,
//   setPickupAddress,
//   deliveryAddress,
//   setDeliveryAddress,
//   isLoading,
//   setIsLoading,
//   pickupSearchResults,
//   setPickupSearchResults,
//   deliverySearchResults,
//   setDeliverySearchResults,
//   showPickupSearchResults,
//   setShowPickupSearchResults,
//   showDeliverySearchResults,
//   setShowDeliverySearchResults,
//   formErrors,
//   orderType,
//   clearFieldError,
// }) => {
//   // Modal states
//   const [searchQuery, setSearchQuery] = useState("");
//   const [addresses, setAddresses] = useState<Address[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [currentModalType, setCurrentModalType] = useState<
//     "pickup" | "delivery" | null
//   >(null);
//   const [selectedAddressIndex, setSelectedAddressIndex] = useState<
//     number | null
//   >(null);
//   const [activeSearchField, setActiveSearchField] = useState<{
//     type: "pickup" | "delivery";
//     field: keyof FormValues;
//   } | null>(null);

//   // Add to existing state declarations
//   const [searchInputLoading, setSearchInputLoading] = useState({
//     pickup: { contactNo: false, name: false, pincode: false },
//     delivery: { contactNo: false, name: false, pincode: false },
//   });

//   // New states for address saving functionality
//   const [isSavingAddress, setIsSavingAddress] = useState({
//     pickup: false,
//     delivery: false,
//   });
//   const [savedAddresses, setSavedAddresses] = useState({
//     pickup: false,
//     delivery: false,
//   });
//   const [isMagicFilling, setIsMagicFilling] = useState({
//     pickup: false,
//     delivery: false,
//   });

//   // Add new validation errors state
//   const [phoneValidationErrors, setPhoneValidationErrors] = useState({
//     pickup: false,
//     delivery: false
//   });

//   // Add new state for pincode loading
//   const [isPincodeLoading, setIsPincodeLoading] = useState({
//     pickup: false,
//     delivery: false
//   });
//   const [gstValidationErrors, setGstValidationErrors] = useState({
//   pickup: false,
//   delivery: false
// });
// const [gstInitialized, setGstInitialized] = useState(false);
// const [gstSetFromAddress, setGstSetFromAddress] = useState(false);
// const gstFromSessionAttempted = useRef(false);







//   // Function to validate phone number - 10 digits starting with 6, 7, 8, or 9
//   const isValidPhoneNumber = (phone: string): boolean => {
//     // Remove any non-digit characters (like spaces, dashes, etc.)
//     const cleanPhone = phone.replace(/\D/g, '');
//     const phoneRegex = /^[6-9]\d{9}$/;
//     return phoneRegex.test(cleanPhone);
//   };
   
//   const sessionData = sessionManager({});
//   const { sellerInfo } = sessionManager({});
//   console.log("Session Data:", sessionData);
//   console.log("Seller Info:", sellerInfo);

//   // useEffect(() => {
//   //   // Check for GST number in the correct path: sellerInfo.kycDetails.gstNumber
//   //   if (sellerInfo?.kycDetails?.gstNumber) {
//   //     console.log("Found GST in session:", sellerInfo.kycDetails.gstNumber);
      
//   //     // Update the pickup form state with the GST number
//   //     setPickupFormValues(prev => ({
//   //       ...prev,
//   //       gstNo: sellerInfo.kycDetails.gstNumber
//   //     }));
      
//   //     // Clear any validation error for GST
//   //     clearFieldError("pickup", "gstNo");
//   //   }
//   // }, [sellerInfo, setPickupFormValues, clearFieldError]);
//   // useEffect(() => {
//   //   // Only set the GST once when component mounts, and only if not already set
//   //   if (sellerInfo?.kycDetails?.gstNumber && !gstInitialized && !pickupFormValues.gstNo) {
//   //     console.log("Setting GST from session:", sellerInfo.kycDetails.gstNumber);
      
//   //     // Update the pickup form state with the GST number
//   //     setPickupFormValues(prev => ({
//   //       ...prev,
//   //       gstNo: sellerInfo.kycDetails.gstNumber
//   //     }));
      
//   //     // Mark as initialized so we don't override user edits
//   //     setGstInitialized(true);
      
//   //     // Clear any validation error for GST
//   //     clearFieldError("pickup", "gstNo");
//   //   }
//   // }, [sellerInfo, pickupFormValues.gstNo, gstInitialized, setPickupFormValues, clearFieldError]);
//    // Only run once on mount to potentially set GST from session
//    useEffect(() => {
//     // Only try to set from session once, and only if not already set
//     if (sellerInfo?.kycDetails?.gstNumber && 
//         !gstFromSessionAttempted.current && 
//         !pickupFormValues.gstNo) {
      
//       console.log("Setting GST from session:", sellerInfo.kycDetails.gstNumber);
//       setPickupFormValues(prev => ({
//         ...prev,
//         gstNo: sellerInfo.kycDetails.gstNumber
//       }));
      
//       clearFieldError("pickup", "gstNo");
//     }
    
//     // Mark that we've attempted to set GST from session, regardless of result
//     gstFromSessionAttempted.current = true;
    
//     // Only run this effect once on mount
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);


//   // Fetch default pickup address on component mount
//   useEffect(() => {
//     fetchDefaultPickupAddress();
//     fetchDefaultDeliveryAddress();
//   }, []);

//   // Magic Fill function for pickup address
// const handlePickupMagicFill = async () => {
//   if (isMagicFilling.pickup) return;
  
//   setIsMagicFilling(prev => ({ ...prev, pickup: true }));
  
//   try {
//     // Get current address to verify
//     const addressToVerify = pickupFormValues.address || '';
    
//     if (!addressToVerify.trim()) {
//       toast.error("Please enter an address to use Magic Fill");
//       return;
//     }
    
//     const payload = {
//       data: addressToVerify
//     };
    
//     const response = await POST(VERIFY_ADDRESS, payload);
    
//     if (response?.data?.success) {
//       const verifiedData = response.data.data.message as VerifiedAddress;
      
//       // Fill in the form fields with verified data
//       const addressLine1Parts:any = [];
//       if (verifiedData.floor) addressLine1Parts.push(verifiedData.floor);
//       if (verifiedData.building_name) addressLine1Parts.push(verifiedData.building_name);
//       if (verifiedData.house_number) addressLine1Parts.push(verifiedData.house_number);
      
//       setPickupFormValues(prev => ({
//         ...prev,
//         addressLine1: addressLine1Parts.join(', '),
//         addressLine2: verifiedData.locality_name || '',
//         city: verifiedData.city_name || '',
//         state: verifiedData.state_name || '',
//         landmark: verifiedData.landmark || '',
//         pincode: verifiedData.pincode || '',
//       }));

//       // Now call fetchPincodeData to ensure consistent behavior with manual pincode entry
//       if (verifiedData.pincode && verifiedData.pincode.length === 6) {
//         fetchPincodeData(verifiedData.pincode, "pickup");
//       }
      
//       // Clear any errors in the updated fields
//       clearFieldError("pickup", "addressLine1");
//       clearFieldError("pickup", "addressLine2");
//       clearFieldError("pickup", "city");
//       clearFieldError("pickup", "state");
//       clearFieldError("pickup", "landmark");
//       clearFieldError("pickup", "pincode");
      
//       // Ensure pickup details are shown after using Magic Fill
//       if (!showPickupDetails) {
//         setShowPickupDetails(true);
//       }
      
//       toast.success("Address verified and filled successfully!");
//     } else {
//       toast.error(response?.data?.message || "Failed to verify address");
//     }
//   } catch (error) {
//     console.error("Error using Magic Fill for pickup address:", error);
//     toast.error("An error occurred while verifying the address");
//   } finally {
//     setIsMagicFilling(prev => ({ ...prev, pickup: false }));
//   }
// };

// // Magic Fill function for delivery address
// const handleDeliveryMagicFill = async () => {
//   if (isMagicFilling.delivery) return;
  
//   setIsMagicFilling(prev => ({ ...prev, delivery: true }));
  
//   try {
//     // Get current address to verify
//     const addressToVerify = deliveryFormValues.address || '';
    
//     if (!addressToVerify.trim()) {
//       toast.error("Please enter an address to use Magic Fill");
//       return;
//     }
    
//     const payload = {
//       data: addressToVerify
//     };
    
//     const response = await POST(VERIFY_ADDRESS, payload);
    
//     if (response?.data?.success) {
//       const verifiedData = response.data.data.message as VerifiedAddress;
      
//       // Fill in the form fields with verified data
//       const addressLine1Parts:any = [];
//       if (verifiedData.floor) addressLine1Parts.push(verifiedData.floor);
//       if (verifiedData.building_name) addressLine1Parts.push(verifiedData.building_name);
//       if (verifiedData.house_number) addressLine1Parts.push(verifiedData.house_number);
      
//       setDeliveryFormValues(prev => ({
//         ...prev,
//         addressLine1: addressLine1Parts.join(', '),
//         addressLine2: verifiedData.locality_name || '',
//         city: verifiedData.city_name || '',
//         state: verifiedData.state_name || '',
//         landmark: verifiedData.landmark || '',
//         pincode: verifiedData.pincode || '',
//       }));

//       // Now call fetchPincodeData to ensure consistent behavior with manual pincode entry
//       if (verifiedData.pincode && verifiedData.pincode.length === 6) {
//         fetchPincodeData(verifiedData.pincode, "delivery");
//       }
      
//       // Clear any errors in the updated fields
//       clearFieldError("delivery", "addressLine1");
//       clearFieldError("delivery", "addressLine2");
//       clearFieldError("delivery", "city");
//       clearFieldError("delivery", "state");
//       clearFieldError("delivery", "landmark");
//       clearFieldError("delivery", "pincode");
      
//       // Ensure delivery details are shown after using Magic Fill
//       if (!showDeliveryDetails) {
//         setShowDeliveryDetails(true);
//       }
      
//       toast.success("Address verified and filled successfully!");
//     } else {
//       toast.error(response?.data?.message || "Failed to verify address");
//     }
//   } catch (error) {
//     console.error("Error using Magic Fill for delivery address:", error);
//     toast.error("An error occurred while verifying the address");
//   } finally {
//     setIsMagicFilling(prev => ({ ...prev, delivery: false }));
//   }
// };

//   // Function to fetch pincode data from API
//   const fetchPincodeData = async (pincode: string, addressType: "pickup" | "delivery") => {
//     if (!pincode || pincode.length < 6) return;
    
//     // Set loading state for the pincode
//     if (addressType === "pickup") {
//       setIsPincodeLoading({ ...isPincodeLoading, pickup: true });
//     } else {
//       setIsPincodeLoading({ ...isPincodeLoading, delivery: true });
//     }
    
//     try {
//       const payload = {
//         pincode: pincode
//       };
      
//       const response = await POST(GET_PINCODE_DATA, payload);
      
//       if (response?.data?.success && response.data.data.length > 0) {
//         const pincodeData = response.data.data[0];
        
//         // Update form values based on response
//         if (addressType === "pickup") {
//           setPickupFormValues(prev => ({
//             ...prev,
//             city: pincodeData.city || prev.city,
//             state: pincodeData.state || prev.state,
//           }));
          
//           // Clear any errors in the updated fields
//           clearFieldError("pickup", "city");
//           clearFieldError("pickup", "state");
          
//           // Ensure pickup details are shown after auto-filling
//           if (!showPickupDetails) {
//             setShowPickupDetails(true);
//           }
//         } else {
//           setDeliveryFormValues(prev => ({
//             ...prev,
//             city: pincodeData.city || prev.city,
//             state: pincodeData.state || prev.state,
//           }));
          
//           // Clear any errors in the updated fields
//           clearFieldError("delivery", "city");
//           clearFieldError("delivery", "state");
          
//           // Ensure delivery details are shown after auto-filling
//           if (!showDeliveryDetails) {
//             setShowDeliveryDetails(true);
//           }
//         }
//       }
//     } catch (error) {
//       console.error(`Error fetching pincode data for ${addressType}:`, error);
//     } finally {
//       // Clear loading state
//       if (addressType === "pickup") {
//         setIsPincodeLoading({ ...isPincodeLoading, pickup: false });
//       } else {
//         setIsPincodeLoading({ ...isPincodeLoading, delivery: false });
//       }
//     }
//   };

//   // Fetch default pickup address
//   // const fetchDefaultPickupAddress = async () => {
//   //   setIsLoading((prev) => ({ ...prev, pickup: true }));
//   //   try {
//   //     const response = await POST(DEFAULT_PICKUP_ADDRESS, {});

//   //     if (response?.data?.success && response.data.data) {
//   //       const address = response.data.data;
//   //       // Set pickup address object
//   //       setPickupAddress(address);

//   //       // Extract and set form values
//   //       const formValues = extractFormValues(address);
//   //       setPickupFormValues(formValues);

//   //       // If address is already saved in system, mark it as saved
//   //       if (address.pickupAddressId) {
//   //         setSavedAddresses(prev => ({ ...prev, pickup: true }));
//   //       }
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching default pickup address:", error);
//   //   } finally {
//   //     setIsLoading((prev) => ({ ...prev, pickup: false }));
//   //   }
//   // };
//   // Update the fetchDefaultPickupAddress function in AddressForm.js
// // const fetchDefaultPickupAddress = async () => {
// //   setIsLoading((prev) => ({ ...prev, pickup: true }));
// //   try {
// //     // Store the current GST value from localStorage before making the API call
// //     const existingGstNo = pickupFormValues.gstNo;
    
// //     const response = await POST(DEFAULT_PICKUP_ADDRESS, {});

// //     if (response?.data?.success && response.data.data) {
// //       const address = response.data.data;
// //       // Set pickup address object
// //       setPickupAddress(address);

// //       // Extract and set form values
// //       const formValues = extractFormValues(address);
      
// //       // Prioritized GST number handling:
// //       // 1. Use API response GST if available
// //       // 2. If not, use localStorage GST if available
// //       // 3. If neither is available, fall back to sellerInfo GST
// //       if (!formValues.gstNo && existingGstNo) {
// //         // API didn't return a GST, but we have one in localStorage
// //         formValues.gstNo = existingGstNo;
// //       } else if (!formValues.gstNo && sellerInfo?.kycDetails?.gstNumber) {
// //         // No GST from API or localStorage, try sellerInfo
// //         formValues.gstNo = sellerInfo.kycDetails.gstNumber;
// //       }
      
// //       setPickupFormValues(formValues);

// //       // If address is already saved in system, mark it as saved
// //       if (address.pickupAddressId) {
// //         setSavedAddresses(prev => ({ ...prev, pickup: true }));
// //       }
// //     }
// //   } catch (error) {
// //     console.error("Error fetching default pickup address:", error);
// //   } finally {
// //     setIsLoading((prev) => ({ ...prev, pickup: false }));
// //   }
// // };
// const fetchDefaultPickupAddress = async () => {
//   setIsLoading((prev) => ({ ...prev, pickup: true }));
//   try {

//     // Check if there's a temporary order ID in localStorage
//     const tempOrderId = localStorage.getItem(STORAGE_KEYS.TEMP_ORDER_ID);
//     // Store current form values before API call
//     const currentFormValues = { ...pickupFormValues };
    
//     const response = await POST(DEFAULT_PICKUP_ADDRESS, {});

//     if (response?.data?.success && response.data.data) {
//       const address = response.data.data;
//       // Set pickup address object
//       setPickupAddress(address);

//       // Extract values from API response
//       const apiFormValues = extractFormValues(address);
      
//       // Create a merged object that prioritizes current values
//       // that have been modified by the user
//       // const mergedValues = {
//       //   ...apiFormValues,
//       //   // Keep current values for fields that have been modified
//       //   pincode: currentFormValues.pincode || apiFormValues.pincode,
//       //   city: currentFormValues.city || apiFormValues.city,
//       //   state: currentFormValues.state || apiFormValues.state,
//       //   addressLine1: currentFormValues.addressLine1 || apiFormValues.addressLine1,
//       //   addressLine2: currentFormValues.addressLine2 || apiFormValues.addressLine2,
//       //   landmark: currentFormValues.landmark || apiFormValues.landmark,
//       //   gstNo: currentFormValues.gstNo || apiFormValues.gstNo || 
//       //          (sellerInfo?.kycDetails?.gstNumber || ""),
//       // };
//         // If tempOrderId exists, prioritize localStorage values (current form values)
//         let mergedValues;

//         if (tempOrderId) {
//           mergedValues = {
            
//             ...currentFormValues,
//             // Prioritize current values for in-progress orders
//             pincode: currentFormValues.pincode || apiFormValues.pincode,
//             city: currentFormValues.city || apiFormValues.city,
//             state: currentFormValues.state || apiFormValues.state,
//             addressLine1: currentFormValues.addressLine1 || apiFormValues.addressLine1,
//             addressLine2: currentFormValues.addressLine2 || apiFormValues.addressLine2,
//             landmark: currentFormValues.landmark || apiFormValues.landmark,
//             gstNo:  (sellerInfo?.kycDetails?.gstNumber || "") || currentFormValues.gstNo || apiFormValues.gstNo   ,
//           };
//         } else {
//           // For new orders, prioritize API values for these specific fields
//           mergedValues = {
//             ...apiFormValues,
//             pincode: apiFormValues.pincode || currentFormValues.pincode,
//             addressLine1: apiFormValues.addressLine1 || currentFormValues.addressLine1,
//             addressLine2: apiFormValues.addressLine2 || currentFormValues.addressLine2,
//             landmark: apiFormValues.landmark || currentFormValues.landmark,
//             city: apiFormValues.city || currentFormValues.city,
//             state: apiFormValues.state || currentFormValues.state,
//             // Still maintain GST priority from different sources
//             gstNo: (sellerInfo?.kycDetails?.gstNumber || "") || apiFormValues.gstNo || currentFormValues.gstNo ,
//           };
//         }
      
//       // Update form values with merged data
//       setPickupFormValues(mergedValues);

//       // If address is already saved in system, mark it as saved
//       if (address.pickupAddressId) {
//         setSavedAddresses(prev => ({ ...prev, pickup: true }));
//       }
//     }
//   } catch (error) {
//     console.error("Error fetching default pickup address:", error);
//   } finally {
//     setIsLoading((prev) => ({ ...prev, pickup: false }));
//   }
// };

//   // Fetch default delivery address
//   const fetchDefaultDeliveryAddress = async () => {
//     setIsLoading((prev) => ({ ...prev, delivery: true }));
//     try {
//       const response = await POST(DEFAULT_DELIVERY_ADDRESS, {});

//       if (response?.data?.success && response.data.data) {
//         const address = response.data.data;
//         // Set delivery address object
//         setDeliveryAddress(address);

//         // Extract and set form values
//         const formValues = extractFormValues(address);
//         setDeliveryFormValues(formValues);

//         // If address is already saved in system, mark it as saved
//         if (address.deliveryAddressId) {
//           setSavedAddresses(prev => ({ ...prev, delivery: true }));
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching default delivery address:", error);
//     } finally {
//       setIsLoading((prev) => ({ ...prev, delivery: false }));
//     }
//   };

//   // Search pickup addresses API function - exclusively for pickup addresses
//   const searchPickupAddresses = async (query: string) => {
//     setLoading(true);
//     try {
//       const payload = {
//         skip: 0,
//         limit: 1000,
//         pageNo: 1,
//         sort: { _id: -1 },
//         searchValue: query,
//       };

//       // Always use pickup API here
//       const response = await POST(GET_PICKUP_ADDRESS_MULTIPLE_SEARCH, payload);

//       if (response?.data?.success) {
//         // Sort addresses to show pinned addresses first
//         const sortedAddresses = [...response.data.data].sort((a, b) => {
//           // Sort by isPin (true comes first)
//           if (a.isPin && !b.isPin) return -1;
//           if (!a.isPin && b.isPin) return 1;
//           return 0;
//         });

//         setAddresses(sortedAddresses);
//       } else {
//         setAddresses([]);
//       }
//     } catch (error) {
//       console.error("Error searching pickup addresses:", error);
//       setAddresses([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Search delivery addresses API function - exclusively for delivery addresses
//   const searchDeliveryAddresses = async (query: string) => {
//     setLoading(true);
//     try {
//       const payload = {
//         skip: 0,
//         limit: 1000,
//         pageNo: 1,
//         sort: { _id: -1 },
//         searchValue: query,
//       };

//       // Always use delivery API here
//       const response = await POST(
//         GET_DELIVERY_ADDRESS_MULTIPLE_SEARCH,
//         payload
//       );

//       if (response?.data?.success) {
//         // Sort addresses to show pinned addresses first
//         const sortedAddresses = [...response.data.data].sort((a, b) => {
//           // Sort by isPin (true comes first)
//           if (a.isPin && !b.isPin) return -1;
//           if (!a.isPin && b.isPin) return 1;
//           return 0;
//         });

//         setAddresses(sortedAddresses);
//       } else {
//         setAddresses([]);
//       }
//     } catch (error) {
//       console.error("Error searching delivery addresses:", error);
//       setAddresses([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openPickupModal = () => {
//     setIsPickupModalOpen(true);
//     setCurrentModalType("pickup");
//     // Reset search when opening
//     setSearchQuery("");
//     setAddresses([]);
//     setSelectedAddressIndex(null);
//     // Fetch all pickup addresses with empty search value
//     searchPickupAddresses("");
//   };

//   const closePickupModal = () => {
//     setIsPickupModalOpen(false);
//     setCurrentModalType(null);
//     setSelectedAddressIndex(null);
//   };

//   const openDeliveryModal = () => {
//     setIsDeliveryModalOpen(true);
//     setCurrentModalType("delivery");
//     // Reset search when opening
//     setSearchQuery("");
//     setAddresses([]);
//     setSelectedAddressIndex(null);
//     // Fetch all delivery addresses with empty search value
//     searchDeliveryAddresses("");
//   };

//   const closeDeliveryModal = () => {
//     setIsDeliveryModalOpen(false);
//     setCurrentModalType(null);
//     setSelectedAddressIndex(null);
//   };

//   // Helper function to extract address values from an address object
//   const extractFormValues = (address: Address): FormValues => {
//     return {
//       contactNo: getContactNo(address),
//       address: formatAddress(address),
//       name: getName(address),
//       pincode: String(address.pincode || address.pincodeStr || ""),
//       city: address.city || "",
//       state: address.state || "",
//       addressLine1: address.flatNo || "", // Map flatNo to addressLine1
//       addressLine2: address.locality || "", // Map locality to addressLine2
//       landmark: address.landmark || "",
//       gstNo: address.gstNo || "", // Keep GST blank as per requirement
//       email: getEmail(address),
//     };
//   };

//   const handleSelectAddress = (address: Address, index: number) => {
//     // Extract form values from the selected address
//     const formValues = extractFormValues(address);

//     if (currentModalType === "pickup") {
//         // If address doesn't have GST but session does, and user hasn't entered one
//         if (!address.gstNo && !formValues.gstNo && sellerInfo?.kycDetails?.gstNumber) {
//           formValues.gstNo = sellerInfo.kycDetails.gstNumber;
//         }
        
//       // Update pickup form values
//       setPickupFormValues(formValues);
//       // Also store the original address object if needed
//       setPickupAddress(address);
//       // Check if address is already saved
//       setSavedAddresses(prev => ({
//         ...prev,
//         pickup: !!address.pickupAddressId
//       }));
//       // Validate phone number if available
//       if (formValues.contactNo) {
//         setPhoneValidationErrors(prev => ({
//           ...prev,
//           pickup: !isValidPhoneNumber(formValues.contactNo)
//         }));
//       }
//       // Clear all validation errors for pickup fields
//     clearFieldError("pickup", "contactNo");
//     clearFieldError("pickup", "address");
//     clearFieldError("pickup", "name");
//     clearFieldError("pickup", "pincode");
//     clearFieldError("pickup", "city");
//     clearFieldError("pickup", "state");
//     clearFieldError("pickup", "addressLine1");
//     clearFieldError("pickup", "addressLine2");
//     clearFieldError("pickup", "landmark");
//     clearFieldError("pickup", "gstNo");
//     // clearFieldError("pickup", "email");
//       closePickupModal();
//     } else if (currentModalType === "delivery") {
//       // Update delivery form values
//       setDeliveryFormValues(formValues);
//       // Also store the original address object if needed
//       setDeliveryAddress(address);
//       // Check if address is already saved
//       setSavedAddresses(prev => ({
//         ...prev,
//         delivery: !!address.deliveryAddressId
//       }));
//       // Validate phone number if available
//       if (formValues.contactNo) {
//         setPhoneValidationErrors(prev => ({
//           ...prev,
//           delivery: !isValidPhoneNumber(formValues.contactNo)
//         }));
//       }

//       // Clear all validation errors for delivery fields
//     clearFieldError("delivery", "contactNo");
//     clearFieldError("delivery", "address");
//     clearFieldError("delivery", "name");
//     clearFieldError("delivery", "pincode");
//     clearFieldError("delivery", "city");
//     clearFieldError("delivery", "state");
//     clearFieldError("delivery", "addressLine1");
//     clearFieldError("delivery", "addressLine2");
//     clearFieldError("delivery", "landmark");
//     clearFieldError("delivery", "gstNo");
//     // clearFieldError("delivery", "email");

//       closeDeliveryModal();
//     }
//   };

//   const handlePickupInputChange = (field: keyof FormValues, value: string) => {

//     let newValue = value;
  
//     // Special handling for GST number
//     if (field === "gstNo") {
//       // Remove non-alphanumeric characters
//       newValue = value.replace(/[^a-zA-Z0-9]/g, '');
//       // Convert to uppercase
//       newValue = newValue.toUpperCase();
//       // Limit to 15 characters
//       newValue = newValue.slice(0, 15);
      
//       // Add validation error if GST is entered but not exactly 15 chars for B2B
//       if (orderType === "B2B" && newValue.length > 0 && newValue.length !== 15) {
//         setGstValidationErrors(prev => ({
//           ...prev,
//           pickup: true
//         }));
//       } else {
//         setGstValidationErrors(prev => ({
//           ...prev,
//           pickup: false
//         }));
//       }
//     }
//     setPickupFormValues((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//     clearFieldError("pickup", field);

//     // Special handling for contact number validation
//     if (field === "contactNo") {
//       // Validate phone number
//       const isValid = value.length === 0 || isValidPhoneNumber(value);
//       setPhoneValidationErrors(prev => ({
//         ...prev,
//         pickup: !isValid
//       }));
//     }

    

//     // Special handling for pincode - fetch city and state data
//     if (field === "pincode" && value.length === 6) {
//       fetchPincodeData(value, "pickup");
//     }

//     // If we're changing any field, address may not be saved anymore
//     if (savedAddresses.pickup) {
//       setSavedAddresses(prev => ({ ...prev, pickup: false }));
//     }

//     // If the field is contactNo or name and has 3 or more characters, trigger search
//     if (["contactNo", "name"].includes(field) && value.length >= 3) {
//       searchAddressByField(
//         "pickup",
//         field as "contactNo" | "name" | "pincode",
//         value
//       );
//     } else if (["contactNo", "name"].includes(field)) {
//       // Clear search results if less than 3 characters
//       setPickupSearchResults([]);
//       setShowPickupSearchResults(false);
//     }
//   };

//   const handleDeliveryInputChange = (
//     field: keyof FormValues,
//     value: string
//   ) => {

//     let newValue = value;
  
//   // Special handling for GST number
//   if (field === "gstNo") {
//     // Remove non-alphanumeric characters
//     newValue = value.replace(/[^a-zA-Z0-9]/g, '');
//     // Convert to uppercase
//     newValue = newValue.toUpperCase();
//     // Limit to 15 characters
//     newValue = newValue.slice(0, 15);
    
//     // Add validation error if GST is entered but not exactly 15 chars for B2B
//     if (orderType === "B2B" && newValue.length > 0 && newValue.length !== 15) {
//       setGstValidationErrors(prev => ({
//         ...prev,
//         delivery: true
//       }));
//     } else {
//       setGstValidationErrors(prev => ({
//         ...prev,
//         delivery: false
//       }));
//     }
//   }
  



//     setDeliveryFormValues((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//     clearFieldError("delivery", field);

//     // Special handling for contact number validation
//     if (field === "contactNo") {
//       // Validate phone number
//       const isValid = value.length === 0 || isValidPhoneNumber(value);
//       setPhoneValidationErrors(prev => ({
//         ...prev,
//         delivery: !isValid
//       }));
//     }

//     // Special handling for pincode - fetch city and state data
//     if (field === "pincode" && value.length === 6) {
//       fetchPincodeData(value, "delivery");
//     }

//     // If we're changing any field, address may not be saved anymore
//     if (savedAddresses.delivery) {
//       setSavedAddresses(prev => ({ ...prev, delivery: false }));
//     }

//     // If the field is contactNo or name and has 3 or more characters, trigger search
//     if (["contactNo", "name"].includes(field) && value.length >= 3) {
//       searchAddressByField(
//         "delivery",
//         field as "contactNo" | "name" | "pincode",
//         value
//       );
//     } else if (["contactNo", "name"].includes(field)) {
//       // Clear search results if less than 3 characters
//       setDeliverySearchResults([]);
//       setShowDeliverySearchResults(false);
//     }
//   };

//   const handleSearchChange = (value: string) => {
//     setSearchQuery(value);

//     // If search is cleared (empty), call API with empty search
//     if (value === "") {
//       if (currentModalType === "pickup") {
//         searchPickupAddresses("");
//       } else if (currentModalType === "delivery") {
//         searchDeliveryAddresses("");
//       }
//     }

//     // Clear results if search has only 1-2 characters
//     if (value.length > 0 && value.length < 3) {
//       setAddresses([]);
//     }
//   };

//   // Pin/Unpin address function
//   const handlePinAddress = async (
//     address: Address,
//     event: React.MouseEvent
//   ) => {
//     // Stop propagation to prevent the card click from selecting the address
//     event.stopPropagation();

//     try {
//       // Toggle pin status
//       const newPinStatus = !address.isPin;

//       // Create the appropriate payload based on current modal type
//       const payload =
//         currentModalType === "pickup"
//           ? {
//               pickupAddressId: address.pickupAddressId,
//               isPin: newPinStatus,
//             }
//           : {
//               deliveryAddressId: address.deliveryAddressId,
//               isPin: newPinStatus,
//             };

//       // Choose the right API based on modal type
//       const apiUrl =
//         currentModalType === "pickup"
//           ? PIN_PICKUP_ADDRESS
//           : PIN_DELIVERY_ADDRESS;

//       const response = await POST(apiUrl, payload);

//       if (response?.data?.success) {
//         // Update the addresses list with the new pin status
//         setAddresses((prevAddresses) =>
//           prevAddresses.map((addr) => {
//             // Match by the appropriate ID based on modal type
//             const isMatch =
//               currentModalType === "pickup"
//                 ? addr.pickupAddressId === address.pickupAddressId
//                 : addr.deliveryAddressId === address.deliveryAddressId;

//             return isMatch ? { ...addr, isPin: newPinStatus } : addr;
//           })
//         );
//       } else {
//         console.error("Failed to update pin status:", response?.data?.message);
//       }
//     } catch (error) {
//       console.error("Error pinning/unpinning address:", error);
//     }
//   };

//   // Debounced search effect - Only trigger for user typing
//   useEffect(() => {
//     // Skip empty search (we handle this directly in handleSearchChange)
//     if (searchQuery === "") return;

//     // Skip searches with only 1-2 characters and clear any existing results
//     if (searchQuery.length < 3) {
//       setAddresses([]);
//       return;
//     }

//     const timer = setTimeout(() => {
//       // Call the appropriate search function based on modal type
//       if (currentModalType === "pickup") {
//         searchPickupAddresses(searchQuery);
//       } else if (currentModalType === "delivery") {
//         searchDeliveryAddresses(searchQuery);
//       }
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [searchQuery, currentModalType]);

//   // Custom SVG icons
//   const SearchIcon = (): JSX.Element => (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="18"
//       height="18"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className="text-gray-500"
//     >
//       <circle cx="11" cy="11" r="8"></circle>
//       <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
//     </svg>
//   );

//   const MapPinIcon = (): JSX.Element => (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="20"
//       height="20"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className="text-gray-700"
//     >
//       <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
//       <circle cx="12" cy="10" r="3"></circle>
//     </svg>
//   );

//   const WandIcon = (): JSX.Element => (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="18"
//       height="18"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M15 4V2"></path>
//       <path d="M15 16v-2"></path>
//       <path d="M8 9h2"></path>
//       <path d="M20 9h2"></path>
//       <path d="M17.8 11.8L19 13"></path>
//       <path d="M15 9h0"></path>
//       <path d="M17.8 6.2L19 5"></path>
//       <path d="M3 21l9-9"></path>
//       <path d="M12.2 6.2L11 5"></path>
//     </svg>
//   );

//   // Pin icon that looks like an actual pin
//   const PinIcon = ({ filled = false }: { filled?: boolean }): JSX.Element => (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="16"
//       height="16"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className={filled ? "text-blue-500" : "text-gray-500"}
//     >
//       <path
//         d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Z"
//         fill={filled ? "currentColor" : "none"}
//       />
//       <circle
//         cx="12"
//         cy="9"
//         r="2.5"
//         fill={filled ? "white" : "none"}
//         stroke={filled ? "white" : "currentColor"}
//       />
//     </svg>
//   );

//   // Format address details for display
//   const formatAddress = (address: any) => {
//     // For sample data provided in the mock API response
//     if (address.fullAddress) {
//       return address.fullAddress;
//     }

//     // For the Address interface structure
//     const addressParts = [];
//     if (address.flatNo) addressParts.push(address.flatNo);
//     if (address.locality) addressParts.push(address.locality);
//     if (address.sector) addressParts.push(address.sector);
//     if (address.landmark) addressParts.push(address.landmark);
//     if (address.city) addressParts.push(address.city);
//     if (address.state) addressParts.push(address.state);
//     if (address.pincode || address.pincodeStr)
//       addressParts.push(address.pincode || address.pincodeStr);

//     // Fallback to standard Address interface
//     if (addressParts.length === 0) {
//       if (address.addressLine1) addressParts.push(address.addressLine1);
//       if (address.addressLine2) addressParts.push(address.addressLine2);
//       if (address.address) addressParts.push(address.address);
//       if (address.landmark) addressParts.push(address.landmark);
//       if (address.city) addressParts.push(address.city);
//       if (address.state) addressParts.push(address.state);
//       if (address.pincode) addressParts.push(address.pincode);
//     }

//     return addressParts.join(", ");
//   };

//   // Get name from address object based on data structure
//   const getName = (address: any) => {
//     if (address.contact && address.contact.name) {
//       return address.contact.name;
//     }
//     return address.name || "Unnamed";
//   };

//   // Get contact number from address object based on data structure
//   const getContactNo = (address: any) => {
//     if (address.contact && address.contact.mobileNo) {
//       return address.contact.mobileNoStr || address.contact.mobileNo.toString();
//     }
//     return address.contactNo || "";
//   };

//   // Get email from address object based on data structure
//   const getEmail = (address: any) => {
//     if (address.contact && address.contact.emailId) {
//       return address.contact.emailId;
//     }
//     return address.email || "";
//   };

//   /// functions for searching using input/////////////////////////////////////////////////////
//   // Define search field types
//   type SearchField = "contact.mobileNoStr" | "contact.name" | "pincodeStr";

//   // Add this function to perform field-specific searches
//   const searchAddressByField = async (
//     type: "pickup" | "delivery",
//     field: "contactNo" | "name" | "pincode",
//     value: string
//   ) => {
//     if (value.length < 3) {
//       // Clear results if search has fewer than 3 characters
//       if (type === "pickup") {
//         setPickupSearchResults([]);
//         setShowPickupSearchResults(false);
//       } else {
//         setDeliverySearchResults([]);
//         setShowDeliverySearchResults(false);
//       }
//       return;
//     }

//     // Set loading state for the specific field
//     setSearchInputLoading((prev) => ({
//       ...prev,
//       [type]: {
//         ...prev[type],
//         [field]: true,
//       },
//     }));

//     try {
//       // Map form field name to API's searchBy field name
//       let searchBy: SearchField;
//       if (field === "contactNo") searchBy = "contact.mobileNoStr";
//       else if (field === "name") searchBy = "contact.name";
//       else searchBy = "pincodeStr"; // For pincode

//       const payload = {
//         skip: 0,
//         limit: 10,
//         pageNo: 1,
//         sort: "",
//         searchValue: value,
//         searchBy: searchBy,
//       };

//       // Choose the right API based on type
//       const apiUrl =
//         type === "pickup" ? PICKUP_ADDRESS_SEARCHBY : DELIVERY_ADDRESS_SEARCHBY;

//       const response = await POST(apiUrl, payload);

//       if (response?.data?.success) {
//         const results = response.data.data || [];

//         // Update the appropriate state based on type
//         if (type === "pickup") {
//           setPickupSearchResults(results);
//           setShowPickupSearchResults(results.length > 0);
//         } else {
//           setDeliverySearchResults(results);
//           setShowDeliverySearchResults(results.length > 0);
//         }
//       } else {
//         // Clear results on error
//         if (type === "pickup") {
//           setPickupSearchResults([]);
//           setShowPickupSearchResults(false);
//         } else {
//           setDeliverySearchResults([]);
//           setShowDeliverySearchResults(false);
//         }
//       }
//     } catch (error) {
//       console.error(`Error searching ${type} addresses by ${field}:`, error);
//       // Clear results on error
//       if (type === "pickup") {
//         setPickupSearchResults([]);
//         setShowPickupSearchResults(false);
//       } else {
//         setDeliverySearchResults([]);
//         setShowDeliverySearchResults(false);
//       }
//     } finally {
//       // Clear loading state
//       setSearchInputLoading((prev) => ({
//         ...prev,
//         [type]: {
//           ...prev[type],
//           [field]: false,
//         },
//       }));
//     }
//   };

//   // Add these functions
//   const handleInputFocus = (
//     type: "pickup" | "delivery",
//     field: keyof FormValues
//   ) => {
//     setActiveSearchField({ type, field });

//     // Only show search results if the active field has some content and is one we search on
//     if (["contactNo", "name"].includes(field)) {
//       const value =
//         type === "pickup" ? pickupFormValues[field] : deliveryFormValues[field];

//       if (value.length >= 3) {
//         if (type === "pickup") {
//           setShowPickupSearchResults(pickupSearchResults.length > 0);
//         } else {
//           setShowDeliverySearchResults(deliverySearchResults.length > 0);
//         }
//       }
//     }
//   };

//   const handleInputBlur = () => {
//     setTimeout(() => {
//       setActiveSearchField(null);
//       setShowPickupSearchResults(false);
//       setShowDeliverySearchResults(false);
//     }, 200);
//   };

//   // Function to handle selecting an address from search results
//   const handleSelectSearchResult = (
//     type: "pickup" | "delivery",
//     address: Address
//   ) => {
//     // Extract form values from the selected address
//     const formValues = extractFormValues(address);

//     if (type === "pickup") {
//             // If search result doesn't have GST but session does, and user hasn't entered one
//             if (!address.gstNo && !formValues.gstNo && sellerInfo?.kycDetails?.gstNumber) {
//               formValues.gstNo = sellerInfo.kycDetails.gstNumber;
//             }
      
//       // Update pickup form values
//       setPickupFormValues(formValues);
//       // Also store the original address object if needed
//       setPickupAddress(address);
//       // Hide search results
//       setShowPickupSearchResults(false);
//       // If this is a saved address from search, mark it as saved
//       setSavedAddresses(prev => ({
//         ...prev,
//         pickup: !!address.pickupAddressId
//       }));
//       // Validate phone number
//       if (formValues.contactNo) {
//         setPhoneValidationErrors(prev => ({
//           ...prev,
//           pickup: !isValidPhoneNumber(formValues.contactNo)
//         }));
//       }
//     } else {
//       // Update delivery form values
//       setDeliveryFormValues(formValues);
//       // Also store the original address object if needed
//       setDeliveryAddress(address);
//       // Hide search results
//       setShowDeliverySearchResults(false);
//       // If this is a saved address from search, mark it as saved
//       setSavedAddresses(prev => ({
//         ...prev,
//         delivery: !!address.deliveryAddressId
//       }));
//       // Validate phone number
//       if (formValues.contactNo) {
//         setPhoneValidationErrors(prev => ({
//           ...prev,
//           delivery: !isValidPhoneNumber(formValues.contactNo)
//         }));
//       }
//     }
//   };

//   const LoadingIcon = (): JSX.Element => (
//     <svg
//       className="animate-spin h-5 w-5 text-blue-500"
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//     >
//       <circle
//         className="opacity-25"
//         cx="12"
//         cy="12"
//         r="10"
//         stroke="currentColor"
//         strokeWidth="4"
//       ></circle>
//       <path
//         className="opacity-75"
//         fill="currentColor"
//         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//       ></path>
//     </svg>
//   );

//   // Function to render floating search results specifically for each field type
//   const renderFloatingSearchResults = (
//     type: "pickup" | "delivery",
//     field: keyof FormValues,
//     results: Address[]
//   ) => {
//     if (
//       (type === "pickup" && !showPickupSearchResults) ||
//       (type === "delivery" && !showDeliverySearchResults) ||
//       activeSearchField?.type !== type ||
//       activeSearchField?.field !== field ||
//       results.length === 0
//     ) {
//       return null;
//     }

//     const isLoading =
//       searchInputLoading[type][field as "contactNo" | "name" | "pincode"];

//     return (
//       <div className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
//         {isLoading ? (
//           <div className="p-3 flex justify-center items-center">
//             <LoadingIcon /> <span className="ml-2">Searching...</span>
//           </div>
//         ) : (
//           <ul>
//             {results.map((address, index) => (
//               <li
//                 key={index}
//                 className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
//                 onClick={() => handleSelectSearchResult(type, address)}
//               >
//                 {/* Show different content based on which field is being searched */}
//                 {field === "contactNo" && (
//                   <div className="flex flex-col">
//                     <span className="font-medium">{getContactNo(address)}</span>
//                     <span className="text-sm text-gray-600">
//                       {getName(address)}
//                     </span>
//                     <span className="text-sm text-gray-600 truncate">
//                       {formatAddress(address)}
//                     </span>
//                   </div>
//                 )}

//                 {field === "name" && (
//                   <div className="flex flex-col">
//                     <span className="font-medium">{getName(address)}</span>
//                     <span className="text-sm text-gray-600">
//                       {getContactNo(address)}
//                     </span>
//                     <span className="text-sm text-gray-600 truncate">
//                       {formatAddress(address)}
//                     </span>
//                   </div>
//                 )}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     );
//   };

//   // New function to save pickup address
//   const savePickupAddress = async () => {
//     // If address is already saved, don't allow saving again
//     if (savedAddresses.pickup) return;

//     // Check required fields
//     if (
//       !pickupFormValues.name.trim() ||
//       !pickupFormValues.contactNo.trim() ||
//       !pickupFormValues.pincode.trim() ||
//       !pickupFormValues.city.trim() ||
//       !pickupFormValues.state.trim() ||
//       !pickupFormValues.addressLine1.trim()
//     ) {
//       toast.error("Please fill in all required fields");
//       return;
//     }

//     // Validate phone number
//     if (!isValidPhoneNumber(pickupFormValues.contactNo)) {
//       toast.error("Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9");
//       return;
//     }

//     setIsSavingAddress({ ...isSavingAddress, pickup: true });

//     try {
//       // Prepare payload according to required format
//       const payload = {
//         flatNo: pickupFormValues.addressLine1,
//         locality: pickupFormValues.addressLine2,
//         sector: pickupFormValues.addressLine2, // Using addressLine2 for sector as well
//         landmark: pickupFormValues.landmark,
//         pincode: pickupFormValues.pincode,
//         city: pickupFormValues.city,
//         state: pickupFormValues.state,
//         country: "India",
//         addressType: "home", // Default value
//         fullAddress: [
//           pickupFormValues.addressLine1,
//           pickupFormValues.addressLine2,
//           pickupFormValues.landmark,
//           pickupFormValues.city,
//           pickupFormValues.state,
//           "India",
//           pickupFormValues.pincode
//         ].filter(Boolean).join(", "),
//         workingDays: {
//           monday: true,
//           tuesday: true,
//           wednesday: true,
//           thursday: true,
//           friday: true,
//           saturday: true,
//           sunday: true,
//         },
//         workingHours: "09:00",
//         contact: {
//           name: pickupFormValues.name,
//           mobileNo: parseInt(pickupFormValues.contactNo.replace(/\D/g, '')),
//           type: "warehouse associate",
//         }
//       };

//       // Call API to save pickup address
//       const response = await POST(ADD_PICKUP_ADDRESS_CATALOGUE, payload);

//       if (response?.data?.success) {
//         toast.success("Pickup address saved successfully!");
//         setSavedAddresses({ ...savedAddresses, pickup: true });
        
//         // Update pickupAddress with the saved address if response contains the data
//         if (response.data.data) {
//           setPickupAddress(response.data.data);
//         }
//       } else {
//         toast.error(response?.data?.message || "Failed to save pickup address");
//       }
//     } catch (error) {
//       console.error("Error saving pickup address:", error);
//       toast.error("An error occurred while saving pickup address");
//     } finally {
//       setIsSavingAddress({ ...isSavingAddress, pickup: false });
//     }
//   };

//   // New function to save delivery address
//   const saveDeliveryAddress = async () => {
//     // If address is already saved, don't allow saving again
//     if (savedAddresses.delivery) return;

//     // Check required fields
//     if (
//       !deliveryFormValues.name.trim() ||
//       !deliveryFormValues.contactNo.trim() ||
//       !deliveryFormValues.pincode.trim() ||
//       !deliveryFormValues.city.trim() ||
//       !deliveryFormValues.state.trim() ||
//       !deliveryFormValues.addressLine1.trim()
//     ) {
//       toast.error("Please fill in all required fields");
//       return;
//     }

//     // Validate phone number
//     if (!isValidPhoneNumber(deliveryFormValues.contactNo)) {
//       toast.error("Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9");
//       return;
//     }

//     setIsSavingAddress({ ...isSavingAddress, delivery: true });

//     try {
//       // Prepare payload according to required format
//       const payload = {
//         flatNo: deliveryFormValues.addressLine1,
//         locality: deliveryFormValues.addressLine2,
//         sector: deliveryFormValues.addressLine2, // Using addressLine2 for sector as well
//         landmark: deliveryFormValues.landmark,
//         pincode: deliveryFormValues.pincode,
//         city: deliveryFormValues.city,
//         state: deliveryFormValues.state,
//         country: "India",
//         addressType: "home", // Default value
//         fullAddress: [
//           deliveryFormValues.addressLine1,
//           deliveryFormValues.addressLine2,
//           deliveryFormValues.landmark,
//           deliveryFormValues.city,
//           deliveryFormValues.state,
//           "India",
//           deliveryFormValues.pincode
//         ].filter(Boolean).join(", "),
//         workingDays: {
//           monday: true,
//           tuesday: true,
//           wednesday: true,
//           thursday: true,
//           friday: true,
//           saturday: true,
//           sunday: true,
//         },
//         workingHours: "09:00",
//         contact: {
//           name: deliveryFormValues.name,
//           mobileNo: parseInt(deliveryFormValues.contactNo.replace(/\D/g, '')),
//           type: "warehouse associate",
//         }
//       };

//       // Call API to save delivery address
//       const response = await POST(ADD_DELIVERY_ADDRESS, payload);

//       if (response?.data?.success) {
//         toast.success("Delivery address saved successfully!");
//         setSavedAddresses({ ...savedAddresses, delivery: true });
        
//         // Update deliveryAddress with the saved address if response contains the data
//         if (response.data.data) {
//           setDeliveryAddress(response.data.data);
//         }
//       } else {
//         toast.error(response?.data?.message || "Failed to save delivery address");
//       }
//     } catch (error) {
//       console.error("Error saving delivery address:", error);
//       toast.error("An error occurred while saving delivery address");
//     } finally {
//       setIsSavingAddress({ ...isSavingAddress, delivery: false });
//     }
//   };

//   return (
//     <div className="flex flex-row gap-6 w-full max-w-full mx-auto p-4">
//       {/* Pickup Details Section */}
//       <div className="w-1/2 bg-[#F5FBFF] rounded-2xl p-6 shadow-md">
//         <div className="flex justify-between items-center mb-4">
//           <div className="flex items-center gap-2">
//             <MapPinIcon />
//             <h2 className="font-bold text-[18px] leading-[100%] tracking-[0%] font-Open text-gray-700">
//               Pickup Details
//             </h2>
//           </div>
//           <div className="flex items-center gap-2">
//             {/* Save Button - Modified from OrderForm pattern */}
//             <button
//               className={`p-2 ${
//                 savedAddresses.pickup
//                   ? "text-blue-500 cursor-not-allowed"
//                   : "text-gray-500 cursor-pointer"
//               }`}
//               onClick={savePickupAddress}
//               title={savedAddresses.pickup ? "Address saved" : "Save address"}
//               disabled={savedAddresses.pickup || isSavingAddress.pickup}
//             >
//               {isSavingAddress.pickup ? (
//                 <LoadingIcon />
//               ) : (
//                 <Bookmark 
//                   className="w-5 h-5" 
//                   isFilled={savedAddresses.pickup}
//                 />
//               )}
//             </button>
//             <OneButton
//               text={"Pickup Address"}
//               onClick={openPickupModal}
//               variant="primary"
//               showIcon={true}
//               icon={userguide}
//               className="!rounded-full"
//             />
//           </div>
//         </div>

//         {isLoading.pickup ? (
//           <div className="flex justify-center items-center h-40">
//             <p>Loading pickup address...</p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {/* Contact Number */}
//             <div className="relative">
//               <FloatingLabelInput
//                 placeholder="Contact No"
//                 icon={
//                   searchInputLoading.pickup.contactNo ? (
//                     <LoadingIcon />
//                   ) : (
//                     <SearchIcon />
//                   )
//                 }
//                 counter="0/10"
//                 value={pickupFormValues.contactNo}
//                 onChangeCallback={(value) =>
//                   handlePickupInputChange("contactNo", value)
//                 }
//                 onFocus={() => handleInputFocus("pickup", "contactNo")}
//                 onBlur={handleInputBlur}
//                 isPhoneField={true} // Add this prop

//                 error={formErrors.pickup.contactNo || phoneValidationErrors.pickup}
//                 errorMessage={phoneValidationErrors.pickup ? "Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9" : "Contact number is required"}
//               />
//               {renderFloatingSearchResults(
//                 "pickup",
//                 "contactNo",
//                 pickupSearchResults
//               )}
//             </div>

//             {/* Address */}
//             <FloatingLabelInput
//               placeholder="Address"
//               value={pickupFormValues.address}
//               onChangeCallback={(value) =>
//                 handlePickupInputChange("address", value)
//               }
//               error={formErrors.pickup.address}
//               errorMessage="Address is required"
//             />

//             {/* Magic Fill Button */}
//             {/* <div className="flex justify-start ">
//               <OneButton
//                 text={"Magic Fill"}
//                 onClick={handlePickupMagicFill}
//                 variant="primary"
//                 showIcon={true}
//                 icon={locationIcon}
//                 className="!rounded-full !bg-[#004EFF] hover:!bg-blue-500"
//               />
//             </div> */}

//             {/* Name and Pin code */}
//             <div className="grid grid-cols-2 gap-4">
//               <div className="relative">
//                 <FloatingLabelInput
//                   placeholder="Name"
//                   icon={
//                     searchInputLoading.pickup.name ? (
//                       <LoadingIcon />
//                     ) : (
//                       <SearchIcon />
//                     )
//                   }
//                   value={pickupFormValues.name}
//                   onChangeCallback={(value) =>
//                     handlePickupInputChange("name", value)
//                   }
//                   onFocus={() => handleInputFocus("pickup", "name")}
//                   onBlur={handleInputBlur}
//                    error={formErrors.pickup.name}
//                    errorMessage="Name is required"
//                 />
//                 {renderFloatingSearchResults(
//                   "pickup",
//                   "name",
//                   pickupSearchResults
//                 )}
//               </div>
//               <div className="relative">
//                 <FloatingLabelInput
//                   placeholder="Pin code"
//                   icon={
//                     isPincodeLoading.pickup ? (
//                       <LoadingIcon />
//                     ) : null
//                   }
//                   value={pickupFormValues.pincode}
//                   onChangeCallback={(value) =>
//                     handlePickupInputChange("pincode", value)
//                   }
//                   error={formErrors.pickup.pincode}
//                   errorMessage="Pin code is required"
//                   isPincodeField={true} // Add this prop

//                 />
//               </div>
//             </div>

//             {/* Additional Address Information */}
//             <div>
//               {/* <button
//                 onClick={() => setShowPickupDetails(!showPickupDetails)}
//                 className="flex items-center justify-between w-full text-left"
//               >
//                 <span className="text-gray-700">
//                   {showPickupDetails ? "Hide" : "Show"} additional address
//                   information
//                 </span>
//                 <span
//                   className={`transform transition-transform ${
//                     showPickupDetails ? "rotate-180" : ""
//                   }`}
//                 >
//                   &#8963;
//                 </span>
//               </button> */}

//               {showPickupDetails && (
//                 <div className="space-y-4 mt-4">
//                   {/* City and State */}
//                   <div className="grid grid-cols-2 gap-4">
//                     <FloatingLabelInput
//                       placeholder="City"
//                       value={pickupFormValues.city}
//                       onChangeCallback={(value) =>
//                         handlePickupInputChange("city", value)
//                       }
//                       error={formErrors.pickup.city}
//                       errorMessage="City is required"
//                       readOnly={true} // Add this

//                     />
//                     <FloatingLabelInput
//                       placeholder="State"
//                       value={pickupFormValues.state}
//                       onChangeCallback={(value) =>
//                         handlePickupInputChange("state", value)
//                       }
//                       error={formErrors.pickup.state}
//                       errorMessage="State is required"
//                       readOnly={true} // Add this

//                     />
//                   </div>

//                   {/* Address Lines - Map flatNo to addressLine1 and locality to addressLine2 */}
//                   <div className="grid grid-cols-2 gap-4">
//                     <FloatingLabelInput
//                       placeholder="Address Line 1"
//                       value={pickupFormValues.addressLine1}
//                       onChangeCallback={(value) =>
//                         handlePickupInputChange("addressLine1", value)
//                       }
//                       error={formErrors.pickup.addressLine1}
//                       errorMessage="Address Line 1 is required"
//                     />
//                     <FloatingLabelInput
//                       placeholder="Address Line 2"
//                       value={pickupFormValues.addressLine2}
//                       onChangeCallback={(value) =>
//                         handlePickupInputChange("addressLine2", value)
//                       }
//                        error={formErrors.pickup.addressLine2}
//                        errorMessage="Address Line 2 is required"
//                     />
//                   </div>

//                   {/* Landmark and GST - GST is user input only */}
//                   <div className="grid grid-cols-2 gap-4">
//                     <FloatingLabelInput
//                       placeholder="Landmark"
//                       value={pickupFormValues.landmark}
//                       onChangeCallback={(value) =>
//                         handlePickupInputChange("landmark", value)
//                       }
//                        error={formErrors.pickup.landmark}
//                        errorMessage="Landmark is required"
//                     />
//                     <FloatingLabelInput
//                       placeholder={orderType === "B2B" ? "GST No (Required)" : "GST No (If Available)"}
//                       value={pickupFormValues.gstNo}
//                       onChangeCallback={(value) =>
//                         handlePickupInputChange("gstNo", value)
//                       }
//                       // error={formErrors.pickup.gstNo}
//                       error={formErrors.pickup.gstNo || gstValidationErrors.pickup}

//                       // errorMessage="GST No is required for B2B orders"
//                       errorMessage={gstValidationErrors.pickup 
//                         ? "GST number must be exactly 15 characters" 
//                         : "GST No is required for B2B orders"}

//                         maxLength={15}
//                     />
//                   </div>

//                   {/* Email ID */}
//                   <FloatingLabelInput
//                     placeholder="Email ID"
//                     type="email"
//                     value={pickupFormValues.email}
//                     onChangeCallback={(value) =>
//                       handlePickupInputChange("email", value)
//                     }
//                     // error={formErrors.pickup.email}
//                     // errorMessage="Email is required"
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Delivery Details Section */}
//       <div className="w-1/2 bg-[#f5fbff] rounded-2xl shadow-md p-6">
//         <div className="flex justify-between items-center mb-4">
//           <div className="flex items-center gap-2">
//             <MapPinIcon />
//             <h2 className="font-bold text-[18px] leading-[100%] tracking-[0%] font-Open text-gray-700">
//               Delivery Details
//             </h2>
//           </div>
//           <div className="flex items-center gap-2">
//             {/* Save Button - Modified from OrderForm pattern */}
//             <button
//               className={`p-2 ${
//                 savedAddresses.delivery
//                   ? "text-blue-500 cursor-not-allowed"
//                   : "text-gray-500 cursor-pointer"
//               }`}
//               onClick={saveDeliveryAddress}
//               title={savedAddresses.delivery ? "Address saved" : "Save address"}
//               disabled={savedAddresses.delivery || isSavingAddress.delivery}
//             >
//               {isSavingAddress.delivery ? (
//                 <LoadingIcon />
//               ) : (
//                 <Bookmark 
//                   className="w-5 h-5" 
//                   isFilled={savedAddresses.delivery}
//                 />
//               )}
//             </button>
//             <OneButton
//               text={"Delivery Address"}
//               onClick={openDeliveryModal}
//               variant="primary"
//               showIcon={true}
//               icon={userguide}
//               className="!rounded-full"
//             />
//           </div>
//         </div>

//         {isLoading.delivery ? (
//           <div className="flex justify-center items-center h-40">
//             <p>Loading delivery address...</p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {/* Contact Number */}
//             <div className="relative">
//               <FloatingLabelInput
//                 placeholder="Contact No"
//                 icon={
//                   searchInputLoading.delivery.contactNo ? (
//                     <LoadingIcon />
//                   ) : (
//                     <SearchIcon />
//                   )
//                 }
//                 counter="0/10"
//                 value={deliveryFormValues.contactNo}
//                 onChangeCallback={(value) =>
//                   handleDeliveryInputChange("contactNo", value)
//                 }
//                 onFocus={() => handleInputFocus("delivery", "contactNo")}
//                 onBlur={handleInputBlur}
//                 error={formErrors.delivery.contactNo || phoneValidationErrors.delivery}
//                 errorMessage={phoneValidationErrors.delivery ? "Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9" : "Contact number is required"}
//                 isPhoneField={true} // Add this prop
//               />
//               {renderFloatingSearchResults(
//                 "delivery",
//                 "contactNo",
//                 deliverySearchResults
//               )}
//             </div>

//             {/* Address */}
//             <FloatingLabelInput
//               placeholder="Address"
//               value={deliveryFormValues.address}
//               onChangeCallback={(value) =>
//                 handleDeliveryInputChange("address", value)
//               }
//                error={formErrors.delivery.address}
//                errorMessage="Address is required"
//             />

//             {/* Magic Fill Button */}
//             {/* <div className="flex justify-start ">
//               <OneButton
//                 text={"Magic Fill"}
//                 onClick={handleDeliveryMagicFill}
//                 variant="primary"
//                 showIcon={true}
//                 icon={locationIcon}
//                 className="!rounded-full !bg-[#004EFF] hover:!bg-blue-500"
//               />
//             </div> */}

//             {/* Name and Pin code */}
//             <div className="grid grid-cols-2 gap-4">
//               <div className="relative">
//                 <FloatingLabelInput
//                   placeholder="Name"
//                   icon={
//                     searchInputLoading.delivery.name ? (
//                       <LoadingIcon />
//                     ) : (
//                       <SearchIcon />
//                     )
//                   }
//                   value={deliveryFormValues.name}
//                   onChangeCallback={(value) =>
//                     handleDeliveryInputChange("name", value)
//                   }
//                   onFocus={() => handleInputFocus("delivery", "name")}
//                   onBlur={handleInputBlur}
//                   error={formErrors.delivery.name}
//                   errorMessage="Name is required"
//                 />
//                 {renderFloatingSearchResults(
//                   "delivery",
//                   "name",
//                   deliverySearchResults
//                 )}
//               </div>
//               <div className="relative">
//                 <FloatingLabelInput
//                   placeholder="Pin code"
//                   icon={
//                     isPincodeLoading.delivery ? (
//                       <LoadingIcon />
//                     ) : null
//                   }
//                   value={deliveryFormValues.pincode}
//                   onChangeCallback={(value) =>
//                     handleDeliveryInputChange("pincode", value)
//                   }
//                   error={formErrors.delivery.pincode}
//                   errorMessage="Pin code is required"
//                   isPincodeField={true} // Add this prop

//                 />
//               </div>
//             </div>

//             {/* Additional Address Information */}
//             <div>
//               {/* <button
//                 onClick={() => setShowDeliveryDetails(!showDeliveryDetails)}
//                 className="flex items-center justify-between w-full text-left"
//               >
//                 <span className="text-gray-700">
//                   {showDeliveryDetails ? "Hide" : "Show"} additional address
//                   information
//                 </span>
//                 <span
//                   className={`transform transition-transform ${
//                     showDeliveryDetails ? "rotate-180" : ""
//                   }`}
//                 >
//                   &#8963;
//                 </span>
//               </button> */}

//               {showDeliveryDetails && (
//                 <div className="space-y-4 mt-4">
//                   {/* City and State */}
//                   <div className="grid grid-cols-2 gap-4">
//                     <FloatingLabelInput
//                       placeholder="City"
//                       value={deliveryFormValues.city}
//                       onChangeCallback={(value) =>
//                         handleDeliveryInputChange("city", value)
//                       }
//                       error={formErrors.delivery.city}
//                       errorMessage="City is required"
//                       readOnly={true} // Add this

//                     />
//                     <FloatingLabelInput
//                       placeholder="State"
//                       value={deliveryFormValues.state}
//                       onChangeCallback={(value) =>
//                         handleDeliveryInputChange("state", value)
//                       }
//                        error={formErrors.delivery.state}
//                        errorMessage="State is required"
//                        readOnly={true} // Add this

//                     />
//                   </div>

//                   {/* Address Lines - Map flatNo to addressLine1 and locality to addressLine2 */}
//                   <div className="grid grid-cols-2 gap-4">
//                     <FloatingLabelInput
//                       placeholder="Address Line 1"
//                       value={deliveryFormValues.addressLine1}
//                       onChangeCallback={(value) =>
//                         handleDeliveryInputChange("addressLine1", value)
//                       }
//                       error={formErrors.delivery.addressLine1}
//                       errorMessage="Address Line 1 is required"
//                     />
//                     <FloatingLabelInput
//                       placeholder="Address Line 2"
//                       value={deliveryFormValues.addressLine2}
//                       onChangeCallback={(value) =>
//                         handleDeliveryInputChange("addressLine2", value)
//                       }
//                       error={formErrors.delivery.addressLine2}
//                       errorMessage="Address Line 2 is required"
//                     />
//                   </div>

//                   {/* Landmark and GST - GST is user input only */}
//                   <div className="grid grid-cols-2 gap-4">
//                     <FloatingLabelInput
//                       placeholder="Landmark "
//                       value={deliveryFormValues.landmark}
//                       onChangeCallback={(value) =>
//                         handleDeliveryInputChange("landmark", value)
//                       }
//                       error={formErrors.delivery.landmark}
//                       errorMessage="Landmark is required"
//                     />
//                     <FloatingLabelInput
//                       placeholder={orderType === "B2B" ? "GST No (Required)" : "GST No (If Available)"}
//                       value={deliveryFormValues.gstNo}
//                       onChangeCallback={(value) =>
//                         handleDeliveryInputChange("gstNo", value)
//                       }
//                       // error={formErrors.delivery.gstNo}
//                       error={formErrors.delivery.gstNo || gstValidationErrors.delivery}

//                       // errorMessage="GST No is required for B2B orders"
//                       errorMessage={gstValidationErrors.delivery 
//                         ? "GST number must be exactly 15 characters" 
//                         : "GST No is required for B2B orders"}

//                         maxLength={15}
//                     />
//                   </div>

//                   {/* Email ID */}
//                   <FloatingLabelInput
//                     placeholder="Email ID"
//                     type="email"
//                     value={deliveryFormValues.email}
//                     onChangeCallback={(value) =>
//                       handleDeliveryInputChange("email", value)
//                     }
//                     // error={formErrors.delivery.email}
//                     // errorMessage="Email is required"
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Address Modal - Updated to remove footer and make selecting a card automatically proceed */}
//       <CenterModal
//         isOpen={isPickupModalOpen || isDeliveryModalOpen}
//         onRequestClose={
//           currentModalType === "pickup" ? closePickupModal : closeDeliveryModal
//         }
//         contentLabel="Address Modal"
//         shouldCloseOnOverlayClick={true}
//       >
//         <div className="w-full h-full flex flex-col">
//           <div className="flex-grow p-6 overflow-auto">
//             <div className="w-full">
//               {/* Header */}
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-bold">
//                   {currentModalType === "pickup" ? "Pickup" : "Delivery"}{" "}
//                   Address Book
//                 </h2>
//                 <button
//                   onClick={
//                     currentModalType === "pickup"
//                       ? closePickupModal
//                       : closeDeliveryModal
//                   }
//                   className="text-gray-500 hover:text-gray-700 text-xl"
//                 >
//                   ×
//                 </button>
//               </div>

//               {/* Search using FloatingLabelInput */}
//               <div className="mb-6">
//                 <FloatingLabelInput
//                   placeholder="Search using name, mobile number, pincode"
//                   icon={<SearchIcon />}
//                   onChangeCallback={handleSearchChange}
//                   value={searchQuery}
//                 />
//               </div>

//               {/* Address list - Updated card style with pin functionality */}
//               <div>
//                 {loading ? (
//                   <div className="p-4 text-center">Loading...</div>
//                 ) : addresses.length > 0 ? (
//                   <div className="space-y-3">
//                     {addresses.map((address, index) => (
//                       <div
//                         key={index}
//                         className={`border rounded-md p-4 hover:bg-gray-50 cursor-pointer relative ${
//                           address.isPin ? "border-blue-500 bg-blue-50" : ""
//                         }`}
//                         onClick={() => handleSelectAddress(address, index)}
//                       >
//                         {/* Pin Icon - Top Right */}
//                         <div
//                           className="absolute top-4 right-4 cursor-pointer hover:scale-110 transition-transform"
//                           onClick={(e) => handlePinAddress(address, e)}
//                         >
//                           <PinIcon filled={!!address.isPin} />
//                         </div>

//                         {/* Card content with name, address, and contact info */}
//                         <div className="flex justify-between items-start">
//                           <div className="space-y-1 pr-6">
//                             <div className="flex items-center">
//                               <h3 className="font-medium text-base">
//                                 {getName(address)}
//                               </h3>
//                               {address.isPin && (
//                                 <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">
//                                   Pinned
//                                 </span>
//                               )}
//                             </div>
//                             <p className="text-gray-600">
//                               {address.flatNo ? address.flatNo : ""}
//                               {address.locality ? ` ${address.locality}` : ""}
//                               {address.landmark ? ` ${address.landmark}` : ""}
//                             </p>
//                             <p className="text-gray-600">
//                               {address.city ? `${address.city},` : ""}
//                               {address.state ? ` ${address.state}` : ""}
//                               {address.pincode || address.pincodeStr
//                                 ? ` ${address.pincode || address.pincodeStr}`
//                                 : ""}
//                             </p>
//                             <p className="text-gray-600">
//                               {getContactNo(address)}
//                               {getEmail(address)
//                                 ? ` | ${getEmail(address)}`
//                                 : ""}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="p-4 text-center text-gray-500">
//                     {searchQuery.length > 0 && searchQuery.length < 3
//                       ? "Please type at least 3 characters to search"
//                       : searchQuery.length >= 3
//                       ? "No addresses found"
//                       : "No addresses available"}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </CenterModal>
//     </div>
//   );
// };

// export default AddressForm;


import { useState, ReactNode, useEffect, useRef } from "react";
import FloatingLabelInput from "./FloatingLabelInput"; 
import OneButton from "../../components/Button/OneButton";
import userguide from "../../assets/Order/User guide.svg";
import locationIcon from "../../assets/Order/Location.svg";
import CenterModal from "../../components/CustomModal/customCenterModal";
import {
  GET_PICKUP_ADDRESS_MULTIPLE_SEARCH,
  PIN_PICKUP_ADDRESS,
  GET_DELIVERY_ADDRESS_MULTIPLE_SEARCH,
  PIN_DELIVERY_ADDRESS,
  DEFAULT_PICKUP_ADDRESS,
  DEFAULT_DELIVERY_ADDRESS,
  PICKUP_ADDRESS_SEARCHBY,
  DELIVERY_ADDRESS_SEARCHBY,
  ADD_PICKUP_ADDRESS_CATALOGUE,
  ADD_DELIVERY_ADDRESS,
  VERIFY_ADDRESS,
  GET_PINCODE_DATA
} from "../../utils/ApiUrls";
import { POST } from "../../utils/webService";
import { toast } from "react-hot-toast"; // Assuming this is available since it's used in OrderForm
import sessionManager from "../../utils/sessionManager";


// Import the Save and Bookmark icons like in OrderForm
const Save = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
    <polyline points="17 21 17 13 7 13 7 21"></polyline>
    <polyline points="7 3 7 8 15 8"></polyline>
  </svg>
);

const Bookmark = ({ className = "w-5 h-5", isFilled = false }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={isFilled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
  </svg>
);

const STORAGE_KEYS = {
  ORDER_DATA: "order-creation-data",
  ACTIVE_STEP: "order-creation-active-step",
  PICKUP_ADDRESS: "order-creation-pickup-address",
  DELIVERY_ADDRESS: "order-creation-delivery-address",
  BOX_DATA: "order-creation-box-data",
  B2B_BOX_DATA: "order-creation-b2b-box-data",
  PAYMENT_INFO: "order-creation-payment-info",
  SELECTED_SERVICE: "order-creation-selected-service",
  TEMP_ORDER_ID: "order-creation-temp-order-id",
  ORDER_SOURCE: "order-creation-order-source",
  ORDER_TYPE: "order-creation-order-type",
  REVERSE_STATE: "order-creation-reverse-state",
};


interface VerifiedAddress {
  person_name: string;
  mobile_number: string;
  house_number: string;
  floor: string;
  building_name: string;
  locality_name: string;
  landmark: string;
  subcity_name: string;
  city_name: string;
  state_name: string;
  country_name: string;
  pincode: string;
  full_address: string;
  product_name: string;
  product_quantity: string;
  product_count: string;
}

interface Address {
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  pincodeStr?: string;
  contactNo?: string;
  email?: string;
  landmark?: string;
  gstNo?: string;
  addressLine1?: string;
  addressLine2?: string;
  flatNo?: string;
  locality?: string;
  sector?: string;
  fullAddress?: string;
  isPin?: boolean;
  pickupAddressId?: string;
  deliveryAddressId?: string;
  contact?: {
    name?: string;
    mobileNo?: number;
    mobileNoStr?: string;
    emailId?: string;
    alternateMobileNo?: number;
  };
  workingDays?: any;
  workingHours?: string;
  // Add any other properties that might be in the API response
  [key: string]: any; // This allows for any additional properties
}

// Interface for form values to better track input field values
interface FormValues {
  contactNo: string;
  address: string;
  name: string;
  pincode: string;
  city: string;
  state: string;
  addressLine1: string; // Will map to flatNo
  addressLine2: string; // Will map to locality
  landmark: string;
  gstNo: string;
  email: string;
}

interface AddressFormProps {
  showPickupDetails: boolean;
  setShowPickupDetails: React.Dispatch<React.SetStateAction<boolean>>;
  showDeliveryDetails: boolean;
  setShowDeliveryDetails: React.Dispatch<React.SetStateAction<boolean>>;
  isPickupModalOpen: boolean;
  setIsPickupModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDeliveryModalOpen: boolean;
  setIsDeliveryModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pickupFormValues: FormValues;
  setPickupFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
  deliveryFormValues: FormValues;
  setDeliveryFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
  pickupAddress: Address | null;
  setPickupAddress: React.Dispatch<React.SetStateAction<Address | any>>;
  deliveryAddress: Address | any;
  setDeliveryAddress: React.Dispatch<React.SetStateAction<Address | any>>;
  isLoading: { pickup: boolean; delivery: boolean };
  setIsLoading: React.Dispatch<
    React.SetStateAction<{ pickup: boolean; delivery: boolean }>
  >;
  pickupSearchResults: Address[];
  setPickupSearchResults: any;
  deliverySearchResults: Address[];
  setDeliverySearchResults: any;
  showPickupSearchResults: boolean;
  setShowPickupSearchResults: React.Dispatch<React.SetStateAction<boolean>>;
  showDeliverySearchResults: boolean;
  setShowDeliverySearchResults: React.Dispatch<React.SetStateAction<boolean>>;
  formErrors: {
    pickup: {
      contactNo: boolean;
      name: boolean;
      pincode: boolean;
      city: boolean;
      state: boolean;
      addressLine1: boolean;
      addressLine2: boolean;
      landmark: boolean;
      gstNo: boolean;
      // email: boolean;
    };
    delivery: {
      contactNo: boolean; 
      name: boolean;
      pincode: boolean;
      city: boolean;
      state: boolean;
      addressLine1: boolean;
      addressLine2: boolean;
      landmark: boolean;
      gstNo: boolean;
      // email: boolean;
    };
  };
  orderType: string; // B2C or B2B
  clearFieldError: (formType: "pickup" | "delivery", field: string) => void; // New prop
}

const AddressForm: React.FC<AddressFormProps> = ({
  showPickupDetails,
  setShowPickupDetails,
  showDeliveryDetails,
  setShowDeliveryDetails,
  isPickupModalOpen,
  setIsPickupModalOpen,
  isDeliveryModalOpen,
  setIsDeliveryModalOpen,
  pickupFormValues,
  setPickupFormValues,
  deliveryFormValues,
  setDeliveryFormValues,
  pickupAddress,
  setPickupAddress,
  deliveryAddress,
  setDeliveryAddress,
  isLoading,
  setIsLoading,
  pickupSearchResults,
  setPickupSearchResults,
  deliverySearchResults,
  setDeliverySearchResults,
  showPickupSearchResults,
  setShowPickupSearchResults,
  showDeliverySearchResults,
  setShowDeliverySearchResults,
  formErrors,
  orderType,
  clearFieldError,
}) => {
  // Modal states
  const [searchQuery, setSearchQuery] = useState("");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentModalType, setCurrentModalType] = useState<
    "pickup" | "delivery" | null
  >(null);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<
    number | null
  >(null);
  const [activeSearchField, setActiveSearchField] = useState<{
    type: "pickup" | "delivery";
    field: keyof FormValues;
  } | null>(null);

  // Add to existing state declarations
  const [searchInputLoading, setSearchInputLoading] = useState({
    pickup: { contactNo: false, name: false, pincode: false },
    delivery: { contactNo: false, name: false, pincode: false },
  });

  // New states for address saving functionality
  const [isSavingAddress, setIsSavingAddress] = useState({
    pickup: false,
    delivery: false,
  });
  const [savedAddresses, setSavedAddresses] = useState({
    pickup: false,
    delivery: false,
  });
  const [isMagicFilling, setIsMagicFilling] = useState({
    pickup: false,
    delivery: false,
  });

  // Add new validation errors state
  const [phoneValidationErrors, setPhoneValidationErrors] = useState({
    pickup: false,
    delivery: false
  });

  // Add new state for pincode loading
  const [isPincodeLoading, setIsPincodeLoading] = useState({
    pickup: false,
    delivery: false
  });
  const [gstValidationErrors, setGstValidationErrors] = useState({
  pickup: false,
  delivery: false
});
const [gstInitialized, setGstInitialized] = useState(false);
const [gstSetFromAddress, setGstSetFromAddress] = useState(false);
const gstFromSessionAttempted = useRef(false);

  // Function to validate phone number - 10 digits starting with 6, 7, 8, or 9
  const isValidPhoneNumber = (phone: string): boolean => {
    // Remove any non-digit characters (like spaces, dashes, etc.)
    const cleanPhone = phone.replace(/\D/g, '');
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(cleanPhone);
  };
   
  const sessionData = sessionManager({});
  const { sellerInfo } = sessionManager({});
  console.log("Session Data:", sessionData);
  console.log("Seller Info:", sellerInfo);

   // Only run once on mount to potentially set GST from session
   useEffect(() => {
    // Only try to set from session once, and only if not already set
    if (sellerInfo?.kycDetails?.gstNumber && 
        !gstFromSessionAttempted.current && 
        !pickupFormValues.gstNo) {
      
      console.log("Setting GST from session:", sellerInfo.kycDetails.gstNumber);
      setPickupFormValues(prev => ({
        ...prev,
        gstNo: sellerInfo.kycDetails.gstNumber
      }));
      
      clearFieldError("pickup", "gstNo");
    }
    
    // Mark that we've attempted to set GST from session, regardless of result
    gstFromSessionAttempted.current = true;
    
    // Only run this effect once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // Fetch default pickup address on component mount
  useEffect(() => {
    fetchDefaultPickupAddress();
    fetchDefaultDeliveryAddress();
  }, []);

  // Helper function to generate full address from components
  const generateFullAddress = (formValues: FormValues): string => {
    const addressParts = [
      formValues.addressLine1,
      formValues.addressLine2,
      formValues.landmark,
      formValues.city,
      formValues.state,
      "India",
      formValues.pincode
    ].filter(part => part && part.trim() !== "");
    
    return addressParts.join(", ");
  };

  // Magic Fill function for pickup address
const handlePickupMagicFill = async () => {
  if (isMagicFilling.pickup) return;
  
  setIsMagicFilling(prev => ({ ...prev, pickup: true }));
  
  try {
    // Get current address to verify
    const addressToVerify = pickupFormValues.address || '';
    
    if (!addressToVerify.trim()) {
      toast.error("Please enter an address to use Magic Fill");
      return;
    }
    
    const payload = {
      data: addressToVerify
    };
    
    const response = await POST(VERIFY_ADDRESS, payload);
    
    if (response?.data?.success) {
      const verifiedData = response.data.data.message as VerifiedAddress;
      
      // Fill in the form fields with verified data
      const addressLine1Parts:any = [];
      if (verifiedData.floor) addressLine1Parts.push(verifiedData.floor);
      if (verifiedData.building_name) addressLine1Parts.push(verifiedData.building_name);
      if (verifiedData.house_number) addressLine1Parts.push(verifiedData.house_number);
      
      const updatedFormValues = {
        ...pickupFormValues,
        addressLine1: addressLine1Parts.join(', '),
        addressLine2: verifiedData.locality_name || '',
        city: verifiedData.city_name || '',
        state: verifiedData.state_name || '',
        landmark: verifiedData.landmark || '',
        pincode: verifiedData.pincode || '',
      };
      
      // Auto-generate address field
      updatedFormValues.address = generateFullAddress(updatedFormValues);
      
      setPickupFormValues(updatedFormValues);

      // Now call fetchPincodeData to ensure consistent behavior with manual pincode entry
      if (verifiedData.pincode && verifiedData.pincode.length === 6) {
        fetchPincodeData(verifiedData.pincode, "pickup");
      }
      
      // Clear any errors in the updated fields
      clearFieldError("pickup", "addressLine1");
      clearFieldError("pickup", "addressLine2");
      clearFieldError("pickup", "city");
      clearFieldError("pickup", "state");
      clearFieldError("pickup", "landmark");
      clearFieldError("pickup", "pincode");
      
      // Ensure pickup details are shown after using Magic Fill
      if (!showPickupDetails) {
        setShowPickupDetails(true);
      }
      
      toast.success("Address verified and filled successfully!");
    } else {
      toast.error(response?.data?.message || "Failed to verify address");
    }
  } catch (error) {
    console.error("Error using Magic Fill for pickup address:", error);
    toast.error("An error occurred while verifying the address");
  } finally {
    setIsMagicFilling(prev => ({ ...prev, pickup: false }));
  }
};

// Magic Fill function for delivery address
const handleDeliveryMagicFill = async () => {
  if (isMagicFilling.delivery) return;
  
  setIsMagicFilling(prev => ({ ...prev, delivery: true }));
  
  try {
    // Get current address to verify
    const addressToVerify = deliveryFormValues.address || '';
    
    if (!addressToVerify.trim()) {
      toast.error("Please enter an address to use Magic Fill");
      return;
    }
    
    const payload = {
      data: addressToVerify
    };
    
    const response = await POST(VERIFY_ADDRESS, payload);
    
    if (response?.data?.success) {
      const verifiedData = response.data.data.message as VerifiedAddress;
      
      // Fill in the form fields with verified data
      const addressLine1Parts:any = [];
      if (verifiedData.floor) addressLine1Parts.push(verifiedData.floor);
      if (verifiedData.building_name) addressLine1Parts.push(verifiedData.building_name);
      if (verifiedData.house_number) addressLine1Parts.push(verifiedData.house_number);
      
      const updatedFormValues = {
        ...deliveryFormValues,
        addressLine1: addressLine1Parts.join(', '),
        addressLine2: verifiedData.locality_name || '',
        city: verifiedData.city_name || '',
        state: verifiedData.state_name || '',
        landmark: verifiedData.landmark || '',
        pincode: verifiedData.pincode || '',
      };
      
      // Auto-generate address field
      updatedFormValues.address = generateFullAddress(updatedFormValues);
      
      setDeliveryFormValues(updatedFormValues);

      // Now call fetchPincodeData to ensure consistent behavior with manual pincode entry
      if (verifiedData.pincode && verifiedData.pincode.length === 6) {
        fetchPincodeData(verifiedData.pincode, "delivery");
      }
      
      // Clear any errors in the updated fields
      clearFieldError("delivery", "addressLine1");
      clearFieldError("delivery", "addressLine2");
      clearFieldError("delivery", "city");
      clearFieldError("delivery", "state");
      clearFieldError("delivery", "landmark");
      clearFieldError("delivery", "pincode");
      
      // Ensure delivery details are shown after using Magic Fill
      if (!showDeliveryDetails) {
        setShowDeliveryDetails(true);
      }
      
      toast.success("Address verified and filled successfully!");
    } else {
      toast.error(response?.data?.message || "Failed to verify address");
    }
  } catch (error) {
    console.error("Error using Magic Fill for delivery address:", error);
    toast.error("An error occurred while verifying the address");
  } finally {
    setIsMagicFilling(prev => ({ ...prev, delivery: false }));
  }
};

  // Function to fetch pincode data from API
  const fetchPincodeData = async (pincode: string, addressType: "pickup" | "delivery") => {
    if (!pincode || pincode.length < 6) return;
    
    // Set loading state for the pincode
    if (addressType === "pickup") {
      setIsPincodeLoading({ ...isPincodeLoading, pickup: true });
    } else {
      setIsPincodeLoading({ ...isPincodeLoading, delivery: true });
    }
    
    try {
      const payload = {
        pincode: pincode
      };
      
      const response = await POST(GET_PINCODE_DATA, payload);
      
      if (response?.data?.success && response.data.data.length > 0) {
        const pincodeData = response.data.data[0];
        
        // Update form values based on response
        if (addressType === "pickup") {
          const updatedFormValues = {
            ...pickupFormValues,
            city: pincodeData.city || pickupFormValues.city,
            state: pincodeData.state || pickupFormValues.state,
          };
          
          // Auto-generate address field
          updatedFormValues.address = generateFullAddress(updatedFormValues);
          
          setPickupFormValues(updatedFormValues);
          
          // Clear any errors in the updated fields
          clearFieldError("pickup", "city");
          clearFieldError("pickup", "state");
          
          // Ensure pickup details are shown after auto-filling
          if (!showPickupDetails) {
            setShowPickupDetails(true);
          }
        } else {
          const updatedFormValues = {
            ...deliveryFormValues,
            city: pincodeData.city || deliveryFormValues.city,
            state: pincodeData.state || deliveryFormValues.state,
          };
          
          // Auto-generate address field
          updatedFormValues.address = generateFullAddress(updatedFormValues);
          
          setDeliveryFormValues(updatedFormValues);
          
          // Clear any errors in the updated fields
          clearFieldError("delivery", "city");
          clearFieldError("delivery", "state");
          
          // Ensure delivery details are shown after auto-filling
          if (!showDeliveryDetails) {
            setShowDeliveryDetails(true);
          }
        }
      }
    } catch (error) {
      console.error(`Error fetching pincode data for ${addressType}:`, error);
    } finally {
      // Clear loading state
      if (addressType === "pickup") {
        setIsPincodeLoading({ ...isPincodeLoading, pickup: false });
      } else {
        setIsPincodeLoading({ ...isPincodeLoading, delivery: false });
      }
    }
  };

const fetchDefaultPickupAddress = async () => {
  setIsLoading((prev) => ({ ...prev, pickup: true }));
  try {

    // Check if there's a temporary order ID in localStorage
    const tempOrderId = localStorage.getItem(STORAGE_KEYS.TEMP_ORDER_ID);
    // Store current form values before API call
    const currentFormValues = { ...pickupFormValues };
    
    const response = await POST(DEFAULT_PICKUP_ADDRESS, {});

    if (response?.data?.success && response.data.data) {
      const address = response.data.data;
      // Set pickup address object
      setPickupAddress(address);

      // Extract values from API response
      const apiFormValues = extractFormValues(address);
      
      // Create a merged object that prioritizes current values
      // that have been modified by the user
        // If tempOrderId exists, prioritize localStorage values (current form values)
        let mergedValues;

        if (tempOrderId) {
          mergedValues = {
            
            ...currentFormValues,
            // Prioritize current values for in-progress orders
            pincode: currentFormValues.pincode || apiFormValues.pincode,
            city: currentFormValues.city || apiFormValues.city,
            state: currentFormValues.state || apiFormValues.state,
            addressLine1: currentFormValues.addressLine1 || apiFormValues.addressLine1,
            addressLine2: currentFormValues.addressLine2 || apiFormValues.addressLine2,
            landmark: currentFormValues.landmark || apiFormValues.landmark,
            gstNo:  (sellerInfo?.kycDetails?.gstNumber || "") || currentFormValues.gstNo || apiFormValues.gstNo   ,
          };
        } else {
          // For new orders, prioritize API values for these specific fields
          mergedValues = {
            ...apiFormValues,
            pincode: apiFormValues.pincode || currentFormValues.pincode,
            addressLine1: apiFormValues.addressLine1 || currentFormValues.addressLine1,
            addressLine2: apiFormValues.addressLine2 || currentFormValues.addressLine2,
            landmark: apiFormValues.landmark || currentFormValues.landmark,
            city: apiFormValues.city || currentFormValues.city,
            state: apiFormValues.state || currentFormValues.state,
            // Still maintain GST priority from different sources
            gstNo: (sellerInfo?.kycDetails?.gstNumber || "") || apiFormValues.gstNo || currentFormValues.gstNo ,
          };
        }
      
      // Auto-generate address field from components
      mergedValues.address = generateFullAddress(mergedValues);
      
      // Update form values with merged data
      setPickupFormValues(mergedValues);

      // If address is already saved in system, mark it as saved
      if (address.pickupAddressId) {
        setSavedAddresses(prev => ({ ...prev, pickup: true }));
      }
    }
  } catch (error) {
    console.error("Error fetching default pickup address:", error);
  } finally {
    setIsLoading((prev) => ({ ...prev, pickup: false }));
  }
};

  // Fetch default delivery address
  const fetchDefaultDeliveryAddress = async () => {
    setIsLoading((prev) => ({ ...prev, delivery: true }));
    try {
      const response = await POST(DEFAULT_DELIVERY_ADDRESS, {});

      if (response?.data?.success && response.data.data) {
        const address = response.data.data;
        // Set delivery address object
        setDeliveryAddress(address);

        // Extract and set form values
        const formValues = extractFormValues(address);
        
        // Auto-generate address field from components
        formValues.address = generateFullAddress(formValues);
        
        setDeliveryFormValues(formValues);

        // If address is already saved in system, mark it as saved
        if (address.deliveryAddressId) {
          setSavedAddresses(prev => ({ ...prev, delivery: true }));
        }
      }
    } catch (error) {
      console.error("Error fetching default delivery address:", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, delivery: false }));
    }
  };

  // Search pickup addresses API function - exclusively for pickup addresses
  const searchPickupAddresses = async (query: string) => {
    setLoading(true);
    try {
      const payload = {
        skip: 0,
        limit: 1000,
        pageNo: 1,
        sort: { _id: -1 },
        searchValue: query,
      };

      // Always use pickup API here
      const response = await POST(GET_PICKUP_ADDRESS_MULTIPLE_SEARCH, payload);

      if (response?.data?.success) {
        // Sort addresses to show pinned addresses first
        const sortedAddresses = [...response.data.data].sort((a, b) => {
          // Sort by isPin (true comes first)
          if (a.isPin && !b.isPin) return -1;
          if (!a.isPin && b.isPin) return 1;
          return 0;
        });

        setAddresses(sortedAddresses);
      } else {
        setAddresses([]);
      }
    } catch (error) {
      console.error("Error searching pickup addresses:", error);
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  };

  // Search delivery addresses API function - exclusively for delivery addresses
  const searchDeliveryAddresses = async (query: string) => {
    setLoading(true);
    try {
      const payload = {
        skip: 0,
        limit: 1000,
        pageNo: 1,
        sort: { _id: -1 },
        searchValue: query,
      };

      // Always use delivery API here
      const response = await POST(
        GET_DELIVERY_ADDRESS_MULTIPLE_SEARCH,
        payload
      );

      if (response?.data?.success) {
        // Sort addresses to show pinned addresses first
        const sortedAddresses = [...response.data.data].sort((a, b) => {
          // Sort by isPin (true comes first)
          if (a.isPin && !b.isPin) return -1;
          if (!a.isPin && b.isPin) return 1;
          return 0;
        });

        setAddresses(sortedAddresses);
      } else {
        setAddresses([]);
      }
    } catch (error) {
      console.error("Error searching delivery addresses:", error);
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  };

  const openPickupModal = () => {
    setIsPickupModalOpen(true);
    setCurrentModalType("pickup");
    // Reset search when opening
    setSearchQuery("");
    setAddresses([]);
    setSelectedAddressIndex(null);
    // Fetch all pickup addresses with empty search value
    searchPickupAddresses("");
  };

  const closePickupModal = () => {
    setIsPickupModalOpen(false);
    setCurrentModalType(null);
    setSelectedAddressIndex(null);
  };

  const openDeliveryModal = () => {
    setIsDeliveryModalOpen(true);
    setCurrentModalType("delivery");
    // Reset search when opening
    setSearchQuery("");
    setAddresses([]);
    setSelectedAddressIndex(null);
    // Fetch all delivery addresses with empty search value
    searchDeliveryAddresses("");
  };

  const closeDeliveryModal = () => {
    setIsDeliveryModalOpen(false);
    setCurrentModalType(null);
    setSelectedAddressIndex(null);
  };

  // Helper function to extract address values from an address object
  const extractFormValues = (address: Address): FormValues => {
    return {
      contactNo: getContactNo(address),
      address: formatAddress(address), // This will be auto-generated from address components
      name: getName(address),
      pincode: String(address.pincode || address.pincodeStr || ""),
      city: address.city || "",
      state: address.state || "",
      addressLine1: address.flatNo || "", // Map flatNo to addressLine1
      addressLine2: address.locality || "", // Map locality to addressLine2
      landmark: address.landmark || "",
      gstNo: address.gstNo || "", // Keep GST blank as per requirement
      email: getEmail(address),
    };
  };

  const handleSelectAddress = (address: Address, index: number) => {
    // Extract form values from the selected address
    const formValues = extractFormValues(address);

    if (currentModalType === "pickup") {
        // If address doesn't have GST but session does, and user hasn't entered one
        if (!address.gstNo && !formValues.gstNo && sellerInfo?.kycDetails?.gstNumber) {
          formValues.gstNo = sellerInfo.kycDetails.gstNumber;
        }
        
        // Auto-generate address field from components
        formValues.address = generateFullAddress(formValues);
        
      // Update pickup form values
      setPickupFormValues(formValues);
      // Also store the original address object if needed
      setPickupAddress(address);
      // Check if address is already saved
      setSavedAddresses(prev => ({
        ...prev,
        pickup: !!address.pickupAddressId
      }));
      // Validate phone number if available
      if (formValues.contactNo) {
        setPhoneValidationErrors(prev => ({
          ...prev,
          pickup: !isValidPhoneNumber(formValues.contactNo)
        }));
      }
      // Clear all validation errors for pickup fields
    clearFieldError("pickup", "contactNo");
    clearFieldError("pickup", "name");
    clearFieldError("pickup", "pincode");
    clearFieldError("pickup", "city");
    clearFieldError("pickup", "state");
    clearFieldError("pickup", "addressLine1");
    clearFieldError("pickup", "addressLine2");
    clearFieldError("pickup", "landmark");
    clearFieldError("pickup", "gstNo");
      closePickupModal();
    } else if (currentModalType === "delivery") {
      // Auto-generate address field from components
      formValues.address = generateFullAddress(formValues);
      
      // Update delivery form values
      setDeliveryFormValues(formValues);
      // Also store the original address object if needed
      setDeliveryAddress(address);
      // Check if address is already saved
      setSavedAddresses(prev => ({
        ...prev,
        delivery: !!address.deliveryAddressId
      }));
      // Validate phone number if available
      if (formValues.contactNo) {
        setPhoneValidationErrors(prev => ({
          ...prev,
          delivery: !isValidPhoneNumber(formValues.contactNo)
        }));
      }

      // Clear all validation errors for delivery fields
    clearFieldError("delivery", "contactNo");
    clearFieldError("delivery", "name");
    clearFieldError("delivery", "pincode");
    clearFieldError("delivery", "city");
    clearFieldError("delivery", "state");
    clearFieldError("delivery", "addressLine1");
    clearFieldError("delivery", "addressLine2");
    clearFieldError("delivery", "landmark");
    clearFieldError("delivery", "gstNo");

      closeDeliveryModal();
    }
  };

  const handlePickupInputChange = (field: keyof FormValues, value: string) => {

    let newValue = value;
  
    // Special handling for GST number
    if (field === "gstNo") {
      // Remove non-alphanumeric characters
      newValue = value.replace(/[^a-zA-Z0-9]/g, '');
      // Convert to uppercase
      newValue = newValue.toUpperCase();
      // Limit to 15 characters
      newValue = newValue.slice(0, 15);
      
      // Add validation error if GST is entered but not exactly 15 chars for B2B
      if (orderType === "B2B" && newValue.length > 0 && newValue.length !== 15) {
        setGstValidationErrors(prev => ({
          ...prev,
          pickup: true
        }));
      } else {
        setGstValidationErrors(prev => ({
          ...prev,
          pickup: false
        }));
      }
    }

    // Update the form values
    const updatedFormValues = {
      ...pickupFormValues,
      [field]: newValue,
    };

    // Auto-generate address field from components
    if (['addressLine1', 'addressLine2', 'landmark', 'city', 'state', 'pincode'].includes(field)) {
      updatedFormValues.address = generateFullAddress(updatedFormValues);
    }

    setPickupFormValues(updatedFormValues);
    clearFieldError("pickup", field);

    // Special handling for contact number validation
    if (field === "contactNo") {
      // Validate phone number
      const isValid = value.length === 0 || isValidPhoneNumber(value);
      setPhoneValidationErrors(prev => ({
        ...prev,
        pickup: !isValid
      }));
    }

    // Special handling for pincode - fetch city and state data
    if (field === "pincode" && value.length === 6) {
      fetchPincodeData(value, "pickup");
    }

    // If we're changing any field, address may not be saved anymore
    if (savedAddresses.pickup) {
      setSavedAddresses(prev => ({ ...prev, pickup: false }));
    }

    // If the field is contactNo or name and has 3 or more characters, trigger search
    if (["contactNo", "name"].includes(field) && value.length >= 3) {
      searchAddressByField(
        "pickup",
        field as "contactNo" | "name" | "pincode",
        value
      );
    } else if (["contactNo", "name"].includes(field)) {
      // Clear search results if less than 3 characters
      setPickupSearchResults([]);
      setShowPickupSearchResults(false);
    }
  };

  const handleDeliveryInputChange = (
    field: keyof FormValues,
    value: string
  ) => {

    let newValue = value;
  
  // Special handling for GST number
  if (field === "gstNo") {
    // Remove non-alphanumeric characters
    newValue = value.replace(/[^a-zA-Z0-9]/g, '');
    // Convert to uppercase
    newValue = newValue.toUpperCase();
    // Limit to 15 characters
    newValue = newValue.slice(0, 15);
    
    // Add validation error if GST is entered but not exactly 15 chars for B2B
    if (orderType === "B2B" && newValue.length > 0 && newValue.length !== 15) {
      setGstValidationErrors(prev => ({
        ...prev,
        delivery: true
      }));
    } else {
      setGstValidationErrors(prev => ({
        ...prev,
        delivery: false
      }));
    }
  }
  
    // Update the form values
    const updatedFormValues = {
      ...deliveryFormValues,
      [field]: newValue,
    };

    // Auto-generate address field from components
    if (['addressLine1', 'addressLine2', 'landmark', 'city', 'state', 'pincode'].includes(field)) {
      updatedFormValues.address = generateFullAddress(updatedFormValues);
    }

    setDeliveryFormValues(updatedFormValues);
    clearFieldError("delivery", field);

    // Special handling for contact number validation
    if (field === "contactNo") {
      // Validate phone number
      const isValid = value.length === 0 || isValidPhoneNumber(value);
      setPhoneValidationErrors(prev => ({
        ...prev,
        delivery: !isValid
      }));
    }

    // Special handling for pincode - fetch city and state data
    if (field === "pincode" && value.length === 6) {
      fetchPincodeData(value, "delivery");
    }

    // If we're changing any field, address may not be saved anymore
    if (savedAddresses.delivery) {
      setSavedAddresses(prev => ({ ...prev, delivery: false }));
    }

    // If the field is contactNo or name and has 3 or more characters, trigger search
    if (["contactNo", "name"].includes(field) && value.length >= 3) {
      searchAddressByField(
        "delivery",
        field as "contactNo" | "name" | "pincode",
        value
      );
    } else if (["contactNo", "name"].includes(field)) {
      // Clear search results if less than 3 characters
      setDeliverySearchResults([]);
      setShowDeliverySearchResults(false);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);

    // If search is cleared (empty), call API with empty search
    if (value === "") {
      if (currentModalType === "pickup") {
        searchPickupAddresses("");
      } else if (currentModalType === "delivery") {
        searchDeliveryAddresses("");
      }
    }

    // Clear results if search has only 1-2 characters
    if (value.length > 0 && value.length < 3) {
      setAddresses([]);
    }
  };

  // Pin/Unpin address function
  const handlePinAddress = async (
    address: Address,
    event: React.MouseEvent
  ) => {
    // Stop propagation to prevent the card click from selecting the address
    event.stopPropagation();

    try {
      // Toggle pin status
      const newPinStatus = !address.isPin;

      // Create the appropriate payload based on current modal type
      const payload =
        currentModalType === "pickup"
          ? {
              pickupAddressId: address.pickupAddressId,
              isPin: newPinStatus,
            }
          : {
              deliveryAddressId: address.deliveryAddressId,
              isPin: newPinStatus,
            };

      // Choose the right API based on modal type
      const apiUrl =
        currentModalType === "pickup"
          ? PIN_PICKUP_ADDRESS
          : PIN_DELIVERY_ADDRESS;

      const response = await POST(apiUrl, payload);

      if (response?.data?.success) {
        // Update the addresses list with the new pin status
        setAddresses((prevAddresses) =>
          prevAddresses.map((addr) => {
            // Match by the appropriate ID based on modal type
            const isMatch =
              currentModalType === "pickup"
                ? addr.pickupAddressId === address.pickupAddressId
                : addr.deliveryAddressId === address.deliveryAddressId;

            return isMatch ? { ...addr, isPin: newPinStatus } : addr;
          })
        );
      } else {
        console.error("Failed to update pin status:", response?.data?.message);
      }
    } catch (error) {
      console.error("Error pinning/unpinning address:", error);
    }
  };

  // Debounced search effect - Only trigger for user typing
  useEffect(() => {
    // Skip empty search (we handle this directly in handleSearchChange)
    if (searchQuery === "") return;

    // Skip searches with only 1-2 characters and clear any existing results
    if (searchQuery.length < 3) {
      setAddresses([]);
      return;
    }

    const timer = setTimeout(() => {
      // Call the appropriate search function based on modal type
      if (currentModalType === "pickup") {
        searchPickupAddresses(searchQuery);
      } else if (currentModalType === "delivery") {
        searchDeliveryAddresses(searchQuery);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, currentModalType]);

  // Custom SVG icons
  const SearchIcon = (): JSX.Element => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-gray-500"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );

  const MapPinIcon = (): JSX.Element => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-gray-700"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  );

  const WandIcon = (): JSX.Element => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 4V2"></path>
      <path d="M15 16v-2"></path>
      <path d="M8 9h2"></path>
      <path d="M20 9h2"></path>
      <path d="M17.8 11.8L19 13"></path>
      <path d="M15 9h0"></path>
      <path d="M17.8 6.2L19 5"></path>
      <path d="M3 21l9-9"></path>
      <path d="M12.2 6.2L11 5"></path>
    </svg>
  );

  // Pin icon that looks like an actual pin
  const PinIcon = ({ filled = false }: { filled?: boolean }): JSX.Element => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={filled ? "text-blue-500" : "text-gray-500"}
    >
      <path
        d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Z"
        fill={filled ? "currentColor" : "none"}
      />
      <circle
        cx="12"
        cy="9"
        r="2.5"
        fill={filled ? "white" : "none"}
        stroke={filled ? "white" : "currentColor"}
      />
    </svg>
  );

  // Format address details for display
  const formatAddress = (address: any) => {
    // For sample data provided in the mock API response
    if (address.fullAddress) {
      return address.fullAddress;
    }

    // For the Address interface structure
    const addressParts = [];
    if (address.flatNo) addressParts.push(address.flatNo);
    if (address.locality) addressParts.push(address.locality);
    if (address.sector) addressParts.push(address.sector);
    if (address.landmark) addressParts.push(address.landmark);
    if (address.city) addressParts.push(address.city);
    if (address.state) addressParts.push(address.state);
    if (address.pincode || address.pincodeStr)
      addressParts.push(address.pincode || address.pincodeStr);

    // Fallback to standard Address interface
    if (addressParts.length === 0) {
      if (address.addressLine1) addressParts.push(address.addressLine1);
      if (address.addressLine2) addressParts.push(address.addressLine2);
      if (address.address) addressParts.push(address.address);
      if (address.landmark) addressParts.push(address.landmark);
      if (address.city) addressParts.push(address.city);
      if (address.state) addressParts.push(address.state);
      if (address.pincode) addressParts.push(address.pincode);
    }

    return addressParts.join(", ");
  };

  // Get name from address object based on data structure
  const getName = (address: any) => {
    if (address.contact && address.contact.name) {
      return address.contact.name;
    }
    return address.name || "Unnamed";
  };

  // Get contact number from address object based on data structure
  const getContactNo = (address: any) => {
    if (address.contact && address.contact.mobileNo) {
      return address.contact.mobileNoStr || address.contact.mobileNo.toString();
    }
    return address.contactNo || "";
  };

  // Get email from address object based on data structure
  const getEmail = (address: any) => {
    if (address.contact && address.contact.emailId) {
      return address.contact.emailId;
    }
    return address.email || "";
  };

  /// functions for searching using input/////////////////////////////////////////////////////
  // Define search field types
  type SearchField = "contact.mobileNoStr" | "contact.name" | "pincodeStr";

  // Add this function to perform field-specific searches
  const searchAddressByField = async (
    type: "pickup" | "delivery",
    field: "contactNo" | "name" | "pincode",
    value: string
  ) => {
    if (value.length < 3) {
      // Clear results if search has fewer than 3 characters
      if (type === "pickup") {
        setPickupSearchResults([]);
        setShowPickupSearchResults(false);
      } else {
        setDeliverySearchResults([]);
        setShowDeliverySearchResults(false);
      }
      return;
    }

    // Set loading state for the specific field
    setSearchInputLoading((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: true,
      },
    }));

    try {
      // Map form field name to API's searchBy field name
      let searchBy: SearchField;
      if (field === "contactNo") searchBy = "contact.mobileNoStr";
      else if (field === "name") searchBy = "contact.name";
      else searchBy = "pincodeStr"; // For pincode

      const payload = {
        skip: 0,
        limit: 10,
        pageNo: 1,
        sort: "",
        searchValue: value,
        searchBy: searchBy,
      };

      // Choose the right API based on type
      const apiUrl =
        type === "pickup" ? PICKUP_ADDRESS_SEARCHBY : DELIVERY_ADDRESS_SEARCHBY;

      const response = await POST(apiUrl, payload);

      if (response?.data?.success) {
        const results = response.data.data || [];

        // Update the appropriate state based on type
        if (type === "pickup") {
          setPickupSearchResults(results);
          setShowPickupSearchResults(results.length > 0);
        } else {
          setDeliverySearchResults(results);
          setShowDeliverySearchResults(results.length > 0);
        }
      } else {
        // Clear results on error
        if (type === "pickup") {
          setPickupSearchResults([]);
          setShowPickupSearchResults(false);
        } else {
          setDeliverySearchResults([]);
          setShowDeliverySearchResults(false);
        }
      }
    } catch (error) {
      console.error(`Error searching ${type} addresses by ${field}:`, error);
      // Clear results on error
      if (type === "pickup") {
        setPickupSearchResults([]);
        setShowPickupSearchResults(false);
      } else {
        setDeliverySearchResults([]);
        setShowDeliverySearchResults(false);
      }
    } finally {
      // Clear loading state
      setSearchInputLoading((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          [field]: false,
        },
      }));
    }
  };

  // Add these functions
  const handleInputFocus = (
    type: "pickup" | "delivery",
    field: keyof FormValues
  ) => {
    setActiveSearchField({ type, field });

    // Only show search results if the active field has some content and is one we search on
    if (["contactNo", "name"].includes(field)) {
      const value =
        type === "pickup" ? pickupFormValues[field] : deliveryFormValues[field];

      if (value.length >= 3) {
        if (type === "pickup") {
          setShowPickupSearchResults(pickupSearchResults.length > 0);
        } else {
          setShowDeliverySearchResults(deliverySearchResults.length > 0);
        }
      }
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setActiveSearchField(null);
      setShowPickupSearchResults(false);
      setShowDeliverySearchResults(false);
    }, 200);
  };

  // Function to handle selecting an address from search results
  const handleSelectSearchResult = (
    type: "pickup" | "delivery",
    address: Address
  ) => {
    // Extract form values from the selected address
    const formValues = extractFormValues(address);

    if (type === "pickup") {
            // If search result doesn't have GST but session does, and user hasn't entered one
            if (!address.gstNo && !formValues.gstNo && sellerInfo?.kycDetails?.gstNumber) {
              formValues.gstNo = sellerInfo.kycDetails.gstNumber;
            }
      
            // Auto-generate address field from components
            formValues.address = generateFullAddress(formValues);
      
      // Update pickup form values
      setPickupFormValues(formValues);
      // Also store the original address object if needed
      setPickupAddress(address);
      // Hide search results
      setShowPickupSearchResults(false);
      // If this is a saved address from search, mark it as saved
      setSavedAddresses(prev => ({
        ...prev,
        pickup: !!address.pickupAddressId
      }));
      // Validate phone number
      if (formValues.contactNo) {
        setPhoneValidationErrors(prev => ({
          ...prev,
          pickup: !isValidPhoneNumber(formValues.contactNo)
        }));
      }
    } else {
      // Auto-generate address field from components
      formValues.address = generateFullAddress(formValues);
      
      // Update delivery form values
      setDeliveryFormValues(formValues);
      // Also store the original address object if needed
      setDeliveryAddress(address);
      // Hide search results
      setShowDeliverySearchResults(false);
      // If this is a saved address from search, mark it as saved
      setSavedAddresses(prev => ({
        ...prev,
        delivery: !!address.deliveryAddressId
      }));
      // Validate phone number
      if (formValues.contactNo) {
        setPhoneValidationErrors(prev => ({
          ...prev,
          delivery: !isValidPhoneNumber(formValues.contactNo)
        }));
      }
    }
  };

  const LoadingIcon = (): JSX.Element => (
    <svg
      className="animate-spin h-5 w-5 text-blue-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  // Function to render floating search results specifically for each field type
  const renderFloatingSearchResults = (
    type: "pickup" | "delivery",
    field: keyof FormValues,
    results: Address[]
  ) => {
    if (
      (type === "pickup" && !showPickupSearchResults) ||
      (type === "delivery" && !showDeliverySearchResults) ||
      activeSearchField?.type !== type ||
      activeSearchField?.field !== field ||
      results.length === 0
    ) {
      return null;
    }

    const isLoading =
      searchInputLoading[type][field as "contactNo" | "name" | "pincode"];

    return (
      <div className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
        {isLoading ? (
          <div className="p-3 flex justify-center items-center">
            <LoadingIcon /> <span className="ml-2">Searching...</span>
          </div>
        ) : (
          <ul>
            {results.map((address, index) => (
              <li
                key={index}
                className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                onClick={() => handleSelectSearchResult(type, address)}
              >
                {/* Show different content based on which field is being searched */}
                {field === "contactNo" && (
                  <div className="flex flex-col">
                    <span className="font-medium">{getContactNo(address)}</span>
                    <span className="text-sm text-gray-600">
                      {getName(address)}
                    </span>
                    <span className="text-sm text-gray-600 truncate">
                      {formatAddress(address)}
                    </span>
                  </div>
                )}

                {field === "name" && (
                  <div className="flex flex-col">
                    <span className="font-medium">{getName(address)}</span>
                    <span className="text-sm text-gray-600">
                      {getContactNo(address)}
                    </span>
                    <span className="text-sm text-gray-600 truncate">
                      {formatAddress(address)}
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  // New function to save pickup address
  const savePickupAddress = async () => {
    // If address is already saved, don't allow saving again
    if (savedAddresses.pickup) return;

    // Check required fields
    if (
      !pickupFormValues.name.trim() ||
      !pickupFormValues.contactNo.trim() ||
      !pickupFormValues.pincode.trim() ||
      !pickupFormValues.city.trim() ||
      !pickupFormValues.state.trim() ||
      !pickupFormValues.addressLine1.trim()
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Validate phone number
    if (!isValidPhoneNumber(pickupFormValues.contactNo)) {
      toast.error("Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9");
      return;
    }

    setIsSavingAddress({ ...isSavingAddress, pickup: true });

    try {
      // Prepare payload according to required format
      const payload = {
        flatNo: pickupFormValues.addressLine1,
        locality: pickupFormValues.addressLine2,
        sector: pickupFormValues.addressLine2, // Using addressLine2 for sector as well
        landmark: pickupFormValues.landmark,
        pincode: pickupFormValues.pincode,
        city: pickupFormValues.city,
        state: pickupFormValues.state,
        country: "India",
        addressType: "home", // Default value
        fullAddress: [
          pickupFormValues.addressLine1,
          pickupFormValues.addressLine2,
          pickupFormValues.landmark,
          pickupFormValues.city,
          pickupFormValues.state,
          "India",
          pickupFormValues.pincode
        ].filter(Boolean).join(", "),
        workingDays: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: true,
          sunday: true,
        },
        workingHours: "09:00",
        contact: {
          name: pickupFormValues.name,
          mobileNo: parseInt(pickupFormValues.contactNo.replace(/\D/g, '')),
          type: "warehouse associate",
        }
      };

      // Call API to save pickup address
      const response = await POST(ADD_PICKUP_ADDRESS_CATALOGUE, payload);

      if (response?.data?.success) {
        toast.success("Pickup address saved successfully!");
        setSavedAddresses({ ...savedAddresses, pickup: true });
        
        // Update pickupAddress with the saved address if response contains the data
        if (response.data.data) {
          setPickupAddress(response.data.data);
        }
      } else {
        toast.error(response?.data?.message || "Failed to save pickup address");
      }
    } catch (error) {
      console.error("Error saving pickup address:", error);
      toast.error("An error occurred while saving pickup address");
    } finally {
      setIsSavingAddress({ ...isSavingAddress, pickup: false });
    }
  };

  // New function to save delivery address
  const saveDeliveryAddress = async () => {
    // If address is already saved, don't allow saving again
    if (savedAddresses.delivery) return;

    // Check required fields
    if (
      !deliveryFormValues.name.trim() ||
      !deliveryFormValues.contactNo.trim() ||
      !deliveryFormValues.pincode.trim() ||
      !deliveryFormValues.city.trim() ||
      !deliveryFormValues.state.trim() ||
      !deliveryFormValues.addressLine1.trim()
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Validate phone number
    if (!isValidPhoneNumber(deliveryFormValues.contactNo)) {
      toast.error("Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9");
      return;
    }

    setIsSavingAddress({ ...isSavingAddress, delivery: true });

    try {
      // Prepare payload according to required format
      const payload = {
        flatNo: deliveryFormValues.addressLine1,
        locality: deliveryFormValues.addressLine2,
        sector: deliveryFormValues.addressLine2, // Using addressLine2 for sector as well
        landmark: deliveryFormValues.landmark,
        pincode: deliveryFormValues.pincode,
        city: deliveryFormValues.city,
        state: deliveryFormValues.state,
        country: "India",
        addressType: "home", // Default value
        fullAddress: [
          deliveryFormValues.addressLine1,
          deliveryFormValues.addressLine2,
          deliveryFormValues.landmark,
          deliveryFormValues.city,
          deliveryFormValues.state,
          "India",
          deliveryFormValues.pincode
        ].filter(Boolean).join(", "),
        workingDays: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: true,
          sunday: true,
        },
        workingHours: "09:00",
        contact: {
          name: deliveryFormValues.name,
          mobileNo: parseInt(deliveryFormValues.contactNo.replace(/\D/g, '')),
          type: "warehouse associate",
        }
      };

      // Call API to save delivery address
      const response = await POST(ADD_DELIVERY_ADDRESS, payload);

      if (response?.data?.success) {
        toast.success("Delivery address saved successfully!");
        setSavedAddresses({ ...savedAddresses, delivery: true });
        
        // Update deliveryAddress with the saved address if response contains the data
        if (response.data.data) {
          setDeliveryAddress(response.data.data);
        }
      } else {
        toast.error(response?.data?.message || "Failed to save delivery address");
      }
    } catch (error) {
      console.error("Error saving delivery address:", error);
      toast.error("An error occurred while saving delivery address");
    } finally {
      setIsSavingAddress({ ...isSavingAddress, delivery: false });
    }
  };

  return (
    <div className="flex flex-row gap-6 w-full max-w-full mx-auto p-4">
      {/* Pickup Details Section */}
      <div className="w-1/2 bg-[#F5FBFF] rounded-2xl p-6 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <MapPinIcon />
            <h2 className="font-bold text-[18px] leading-[100%] tracking-[0%] font-Open text-gray-700">
              Pickup Details
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {/* Save Button - Modified from OrderForm pattern */}
            <button
              className={`p-2 ${
                savedAddresses.pickup
                  ? "text-blue-500 cursor-not-allowed"
                  : "text-gray-500 cursor-pointer"
              }`}
              onClick={savePickupAddress}
              title={savedAddresses.pickup ? "Address saved" : "Save address"}
              disabled={savedAddresses.pickup || isSavingAddress.pickup}
            >
              {isSavingAddress.pickup ? (
                <LoadingIcon />
              ) : (
                <Bookmark 
                  className="w-5 h-5" 
                  isFilled={savedAddresses.pickup}
                />
              )}
            </button>
            <OneButton
              text={"Pickup Address"}
              onClick={openPickupModal}
              variant="primary"
              showIcon={true}
              icon={userguide}
              className="!rounded-full"
            />
          </div>
        </div>

        {isLoading.pickup ? (
          <div className="flex justify-center items-center h-40">
            <p>Loading pickup address...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Contact and Name */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <FloatingLabelInput
                  placeholder="Contact"
                  icon={
                    searchInputLoading.pickup.contactNo ? (
                      <LoadingIcon />
                    ) : (
                      <SearchIcon />
                    )
                  }
                  counter="0/10"
                  value={pickupFormValues.contactNo}
                  onChangeCallback={(value) =>
                    handlePickupInputChange("contactNo", value)
                  }
                  onFocus={() => handleInputFocus("pickup", "contactNo")}
                  onBlur={handleInputBlur}
                  isPhoneField={true}
                  error={formErrors.pickup.contactNo || phoneValidationErrors.pickup}
                  errorMessage={phoneValidationErrors.pickup ? "Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9" : "Contact number is required"}
                />
                {renderFloatingSearchResults(
                  "pickup",
                  "contactNo",
                  pickupSearchResults
                )}
              </div>
              <div className="relative">
                <FloatingLabelInput
                  placeholder="Name"
                  icon={
                    searchInputLoading.pickup.name ? (
                      <LoadingIcon />
                    ) : (
                      <SearchIcon />
                    )
                  }
                  value={pickupFormValues.name}
                  onChangeCallback={(value) =>
                    handlePickupInputChange("name", value)
                  }
                  onFocus={() => handleInputFocus("pickup", "name")}
                  onBlur={handleInputBlur}
                  error={formErrors.pickup.name}
                  errorMessage="Name is required"
                />
                {renderFloatingSearchResults(
                  "pickup",
                  "name",
                  pickupSearchResults
                )}
              </div>
            </div>

            {/* Pin code and Address Line 1 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <FloatingLabelInput
                  placeholder="Pin code"
                  icon={
                    isPincodeLoading.pickup ? (
                      <LoadingIcon />
                    ) : null
                  }
                  value={pickupFormValues.pincode}
                  onChangeCallback={(value) =>
                    handlePickupInputChange("pincode", value)
                  }
                  error={formErrors.pickup.pincode}
                  errorMessage="Pin code is required"
                  isPincodeField={true}
                />
              </div>
              <FloatingLabelInput
                placeholder="Address Line 1"
                value={pickupFormValues.addressLine1}
                onChangeCallback={(value) =>
                  handlePickupInputChange("addressLine1", value)
                }
                error={formErrors.pickup.addressLine1}
                errorMessage="Address Line 1 is required"
              />
            </div>

            {/* Address Line 2 and Landmark */}
            <div className="grid grid-cols-2 gap-4">
              <FloatingLabelInput
                placeholder="Address Line 2"
                value={pickupFormValues.addressLine2}
                onChangeCallback={(value) =>
                  handlePickupInputChange("addressLine2", value)
                }
                error={formErrors.pickup.addressLine2}
                errorMessage="Address Line 2 is required"
              />
              <FloatingLabelInput
                placeholder="Landmark"
                value={pickupFormValues.landmark}
                onChangeCallback={(value) =>
                  handlePickupInputChange("landmark", value)
                }
                error={formErrors.pickup.landmark}
                errorMessage="Landmark is required"
              />
            </div>

            {/* City and State */}
            <div className="grid grid-cols-2 gap-4">
              <FloatingLabelInput
                placeholder="City"
                value={pickupFormValues.city}
                onChangeCallback={(value) =>
                  handlePickupInputChange("city", value)
                }
                error={formErrors.pickup.city}
                errorMessage="City is required"
                readOnly={true}
              />
              <FloatingLabelInput
                placeholder="State"
                value={pickupFormValues.state}
                onChangeCallback={(value) =>
                  handlePickupInputChange("state", value)
                }
                error={formErrors.pickup.state}
                errorMessage="State is required"
                readOnly={true}
              />
            </div>

            {/* GST No and Email ID */}
            <div className="grid grid-cols-2 gap-4">
              <FloatingLabelInput
                placeholder={orderType === "B2B" ? "GST No (Required)" : "GST No (If Available)"}
                value={pickupFormValues.gstNo}
                onChangeCallback={(value) =>
                  handlePickupInputChange("gstNo", value)
                }
                error={formErrors.pickup.gstNo || gstValidationErrors.pickup}
                errorMessage={gstValidationErrors.pickup 
                  ? "GST number must be exactly 15 characters" 
                  : "GST No is required for B2B orders"}
                maxLength={15}
              />
              <FloatingLabelInput
                placeholder="Email ID (Optional)"
                type="email"
                value={pickupFormValues.email}
                onChangeCallback={(value) =>
                  handlePickupInputChange("email", value)
                }
              />
            </div>
          </div>
        )}
      </div>

      {/* Delivery Details Section */}
      <div className="w-1/2 bg-[#f5fbff] rounded-2xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <MapPinIcon />
            <h2 className="font-bold text-[18px] leading-[100%] tracking-[0%] font-Open text-gray-700">
              Delivery Details
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {/* Save Button - Modified from OrderForm pattern */}
            <button
              className={`p-2 ${
                savedAddresses.delivery
                  ? "text-blue-500 cursor-not-allowed"
                  : "text-gray-500 cursor-pointer"
              }`}
              onClick={saveDeliveryAddress}
              title={savedAddresses.delivery ? "Address saved" : "Save address"}
              disabled={savedAddresses.delivery || isSavingAddress.delivery}
            >
              {isSavingAddress.delivery ? (
                <LoadingIcon />
              ) : (
                <Bookmark 
                  className="w-5 h-5" 
                  isFilled={savedAddresses.delivery}
                />
              )}
            </button>
            <OneButton
              text={"Delivery Address"}
              onClick={openDeliveryModal}
              variant="primary"
              showIcon={true}
              icon={userguide}
              className="!rounded-full"
            />
          </div>
        </div>

        {isLoading.delivery ? (
          <div className="flex justify-center items-center h-40">
            <p>Loading delivery address...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Contact and Name */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <FloatingLabelInput
                  placeholder="Contact"
                  icon={
                    searchInputLoading.delivery.contactNo ? (
                      <LoadingIcon />
                    ) : (
                      <SearchIcon />
                    )
                  }
                  counter="0/10"
                  value={deliveryFormValues.contactNo}
                  onChangeCallback={(value) =>
                    handleDeliveryInputChange("contactNo", value)
                  }
                  onFocus={() => handleInputFocus("delivery", "contactNo")}
                  onBlur={handleInputBlur}
                  error={formErrors.delivery.contactNo || phoneValidationErrors.delivery}
                  errorMessage={phoneValidationErrors.delivery ? "Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9" : "Contact number is required"}
                  isPhoneField={true}
                />
                {renderFloatingSearchResults(
                  "delivery",
                  "contactNo",
                  deliverySearchResults
                )}
              </div>
              <div className="relative">
                <FloatingLabelInput
                  placeholder="Name"
                  icon={
                    searchInputLoading.delivery.name ? (
                      <LoadingIcon />
                    ) : (
                      <SearchIcon />
                    )
                  }
                  value={deliveryFormValues.name}
                  onChangeCallback={(value) =>
                    handleDeliveryInputChange("name", value)
                  }
                  onFocus={() => handleInputFocus("delivery", "name")}
                  onBlur={handleInputBlur}
                  error={formErrors.delivery.name}
                  errorMessage="Name is required"
                />
                {renderFloatingSearchResults(
                  "delivery",
                  "name",
                  deliverySearchResults
                )}
              </div>
            </div>

            {/* Pin code and Address Line 1 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <FloatingLabelInput
                  placeholder="Pin code"
                  icon={
                    isPincodeLoading.delivery ? (
                      <LoadingIcon />
                    ) : null
                  }
                  value={deliveryFormValues.pincode}
                  onChangeCallback={(value) =>
                    handleDeliveryInputChange("pincode", value)
                  }
                  error={formErrors.delivery.pincode}
                  errorMessage="Pin code is required"
                  isPincodeField={true}
                />
              </div>
              <FloatingLabelInput
                placeholder="Address Line 1"
                value={deliveryFormValues.addressLine1}
                onChangeCallback={(value) =>
                  handleDeliveryInputChange("addressLine1", value)
                }
                error={formErrors.delivery.addressLine1}
                errorMessage="Address Line 1 is required"
              />
            </div>

            {/* Address Line 2 and Landmark */}
            <div className="grid grid-cols-2 gap-4">
              <FloatingLabelInput
                placeholder="Address Line 2"
                value={deliveryFormValues.addressLine2}
                onChangeCallback={(value) =>
                  handleDeliveryInputChange("addressLine2", value)
                }
                error={formErrors.delivery.addressLine2}
                errorMessage="Address Line 2 is required"
              />
              <FloatingLabelInput
                placeholder="Landmark"
                value={deliveryFormValues.landmark}
                onChangeCallback={(value) =>
                  handleDeliveryInputChange("landmark", value)
                }
                error={formErrors.delivery.landmark}
                errorMessage="Landmark is required"
              />
            </div>

            {/* City and State */}
            <div className="grid grid-cols-2 gap-4">
              <FloatingLabelInput
                placeholder="City"
                value={deliveryFormValues.city}
                onChangeCallback={(value) =>
                  handleDeliveryInputChange("city", value)
                }
                error={formErrors.delivery.city}
                errorMessage="City is required"
                readOnly={true}
              />
              <FloatingLabelInput
                placeholder="State"
                value={deliveryFormValues.state}
                onChangeCallback={(value) =>
                  handleDeliveryInputChange("state", value)
                }
                error={formErrors.delivery.state}
                errorMessage="State is required"
                readOnly={true}
              />
            </div>

            {/* GST No and Email ID */}
            <div className="grid grid-cols-2 gap-4">
              <FloatingLabelInput
                placeholder={orderType === "B2B" ? "GST No (Required)" : "GST No (If Available)"}
                value={deliveryFormValues.gstNo}
                onChangeCallback={(value) =>
                  handleDeliveryInputChange("gstNo", value)
                }
                error={formErrors.delivery.gstNo || gstValidationErrors.delivery}
                errorMessage={gstValidationErrors.delivery 
                  ? "GST number must be exactly 15 characters" 
                  : "GST No is required for B2B orders"}
                maxLength={15}
              />
              <FloatingLabelInput
                placeholder="Email ID (Optional)"
                type="email"
                value={deliveryFormValues.email}
                onChangeCallback={(value) =>
                  handleDeliveryInputChange("email", value)
                }
              />
            </div>
          </div>
        )}
      </div>

      {/* Address Modal - Updated to remove footer and make selecting a card automatically proceed */}
      <CenterModal
        isOpen={isPickupModalOpen || isDeliveryModalOpen}
        onRequestClose={
          currentModalType === "pickup" ? closePickupModal : closeDeliveryModal
        }
        contentLabel="Address Modal"
        shouldCloseOnOverlayClick={true}
      >
        <div className="w-full h-full flex flex-col">
          <div className="flex-grow p-6 overflow-auto">
            <div className="w-full">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">
                  {currentModalType === "pickup" ? "Pickup" : "Delivery"}{" "}
                  Address Book
                </h2>
                <button
                  onClick={
                    currentModalType === "pickup"
                      ? closePickupModal
                      : closeDeliveryModal
                  }
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ×
                </button>
              </div>

              {/* Search using FloatingLabelInput */}
              <div className="mb-6">
                <FloatingLabelInput
                  placeholder="Search using name, mobile number, pincode"
                  icon={<SearchIcon />}
                  onChangeCallback={handleSearchChange}
                  value={searchQuery}
                />
              </div>

              {/* Address list - Updated card style with pin functionality */}
              <div>
                {loading ? (
                  <div className="p-4 text-center">Loading...</div>
                ) : addresses.length > 0 ? (
                  <div className="space-y-3">
                    {addresses.map((address, index) => (
                      <div
                        key={index}
                        className={`border rounded-md p-4 hover:bg-gray-50 cursor-pointer relative ${
                          address.isPin ? "border-blue-500 bg-blue-50" : ""
                        }`}
                        onClick={() => handleSelectAddress(address, index)}
                      >
                        {/* Pin Icon - Top Right */}
                        <div
                          className="absolute top-4 right-4 cursor-pointer hover:scale-110 transition-transform"
                          onClick={(e) => handlePinAddress(address, e)}
                        >
                          <PinIcon filled={!!address.isPin} />
                        </div>

                        {/* Card content with name, address, and contact info */}
                        <div className="flex justify-between items-start">
                          <div className="space-y-1 pr-6">
                            <div className="flex items-center">
                              <h3 className="font-medium text-base">
                                {getName(address)}
                              </h3>
                              {address.isPin && (
                                <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">
                                  Pinned
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600">
                              {address.flatNo ? address.flatNo : ""}
                              {address.locality ? ` ${address.locality}` : ""}
                              {address.landmark ? ` ${address.landmark}` : ""}
                            </p>
                            <p className="text-gray-600">
                              {address.city ? `${address.city},` : ""}
                              {address.state ? ` ${address.state}` : ""}
                              {address.pincode || address.pincodeStr
                                ? ` ${address.pincode || address.pincodeStr}`
                                : ""}
                            </p>
                            <p className="text-gray-600">
                              {getContactNo(address)}
                              {getEmail(address)
                                ? ` | ${getEmail(address)}`
                                : ""}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    {searchQuery.length > 0 && searchQuery.length < 3
                      ? "Please type at least 3 characters to search"
                      : searchQuery.length >= 3
                      ? "No addresses found"
                      : "No addresses available"}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CenterModal>
    </div>
  );
};

export default AddressForm;
