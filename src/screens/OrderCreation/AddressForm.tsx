// import { useState, ReactNode } from "react";
// import FloatingLabelInput from "./FloatingLabelInput";
// import OneButton from "../../components/Button/OneButton";
// import userguide from "../../assets/Order/User guide.svg";
// import locationIcon from "../../assets/Order/Location.svg";
// import CenterModal from "../../components/CustomModal/customCenterModal";
// import {GET_PICKUP_ADDRESS_MULTIPLE_SEARCH} from "../../utils/ApiUrls"
// import { POST } from "../../utils/webService";

// const AddressForm: React.FC = () => {
//   const [showPickupDetails, setShowPickupDetails] = useState(true);
//   const [showDeliveryDetails, setShowDeliveryDetails] = useState(true);
//   const [isPickupModalOpen, setIsPickupModalOpen] = useState(false);

//   const openPickupModal = () => setIsPickupModalOpen(true);
//   const closePickupModal = () => setIsPickupModalOpen(false);

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

//   return (
//     <div className="flex flex-row gap-6 w-full max-w-6xl mx-auto p-4">
//       {/* Pickup Details Section */}
//       <div className="w-1/2 bg-gray-50 rounded-lg p-6">
//         <div className="flex justify-between items-center mb-4">
//           <div className="flex items-center gap-2">
//             <MapPinIcon />
//             <h2 className="font-bold text-[18px] leading-[100%] tracking-[0%] font-Open text-gray-700">
//               Pickup Details
//             </h2>
//           </div>
//           <OneButton
//             text={"Pickup Address"}
//             onClick={openPickupModal}
//             variant="primary"
//             showIcon={true}
//             icon={userguide}
//             className="!rounded-full"
//           />
//         </div>

//         <div className="space-y-4">
//           {/* Contact Number */}
//           <FloatingLabelInput
//             placeholder="Contact No"
//             icon={<SearchIcon />}
//             counter="0/10"
//           />

//           {/* Address */}
//           <FloatingLabelInput placeholder="Address" />

//           {/* Magic Fill Button */}
//           <div className="flex justify-start ">
//             <OneButton
//               text={"Magic Fill"}
//               onClick={() => {}}
//               variant="primary"
//               showIcon={true}
//               icon={locationIcon}
//               className="!rounded-full !bg-[#004EFF] hover:!bg-blue-500"
//             />
//           </div>

//           {/* Name and Pin code */}
//           <div className="grid grid-cols-2 gap-4">
//             <FloatingLabelInput placeholder="Name" icon={<SearchIcon />} />
//             <FloatingLabelInput placeholder="Pin code" icon={<SearchIcon />} />
//           </div>

//           {/* Additional Address Information */}
//           <div>
//             <button
//               onClick={() => setShowPickupDetails(!showPickupDetails)}
//               className="flex items-center justify-between w-full text-left"
//             >
//               <span className="text-gray-700">
//                 Hide additional address information
//               </span>
//               <span
//                 className={`transform transition-transform ${
//                   showPickupDetails ? "rotate-180" : ""
//                 }`}
//               >
//                 &#8963;
//               </span>
//             </button>

//             {showPickupDetails && (
//               <div className="space-y-4 mt-4">
//                 {/* City and State */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <FloatingLabelInput placeholder="City" />
//                   <FloatingLabelInput placeholder="State" />
//                 </div>

//                 {/* Address Lines */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <FloatingLabelInput placeholder="Address Line 1" />
//                   <FloatingLabelInput placeholder="Address Line 2" />
//                 </div>

//                 {/* Landmark and GST */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <FloatingLabelInput placeholder="Landmark" />
//                   <FloatingLabelInput placeholder="GST No (If Available)" />
//                 </div>

//                 {/* Email ID */}
//                 <FloatingLabelInput placeholder="Email ID" type="email" />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Delivery Details Section */}
//       <div className="w-1/2 bg-gray-50 rounded-lg p-6">
//         <div className="flex justify-between items-center mb-4">
//           <div className="flex items-center gap-2">
//             <MapPinIcon />
//             <h2 className="font-bold text-[18px] leading-[100%] tracking-[0%] font-Open text-gray-700">
//               Delivery Details
//             </h2>
//           </div>
//           <OneButton
//             text={"Delivery Address"}
//             onClick={() => {}}
//             variant="primary"
//             showIcon={true}
//             icon={userguide}
//             className="!rounded-full"
//           />
//         </div>

//         <div className="space-y-4">
//           {/* Contact Number */}
//           <FloatingLabelInput
//             placeholder="Contact No"
//             icon={<SearchIcon />}
//             counter="0/10"
//           />

//           {/* Address */}
//           <FloatingLabelInput placeholder="Address" />

//           {/* Magic Fill Button */}
//           <div className="flex justify-start ">
//             <OneButton
//               text={"Magic Fill"}
//               onClick={() => {}}
//               variant="primary"
//               showIcon={true}
//               icon={locationIcon}
//               className="!rounded-full !bg-[#004EFF] hover:!bg-blue-500"
//             />
//           </div>

//           {/* Name and Pin code */}
//           <div className="grid grid-cols-2 gap-4">
//             <FloatingLabelInput placeholder="Name" icon={<SearchIcon />} />
//             <FloatingLabelInput placeholder="Pin code" icon={<SearchIcon />} />
//           </div>

//           {/* Additional Address Information */}
//           <div>
//             <button
//               onClick={() => setShowDeliveryDetails(!showDeliveryDetails)}
//               className="flex items-center justify-between w-full text-left"
//             >
//               <span className="text-gray-700">
//                 Hide additional address information
//               </span>
//               <span
//                 className={`transform transition-transform ${
//                   showDeliveryDetails ? "rotate-180" : ""
//                 }`}
//               >
//                 &#8963;
//               </span>
//             </button>

//             {showDeliveryDetails && (
//               <div className="space-y-4 mt-4">
//                 {/* City and State */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <FloatingLabelInput placeholder="City" />
//                   <FloatingLabelInput placeholder="State" />
//                 </div>

//                 {/* Address Lines */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <FloatingLabelInput placeholder="Address Line 1" />
//                   <FloatingLabelInput placeholder="Address Line 2" />
//                 </div>

//                 {/* Landmark and GST */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <FloatingLabelInput placeholder="Landmark (Optional)" />
//                   <FloatingLabelInput placeholder="GST No (If Available)" />
//                 </div>

//                 {/* Email ID */}
//                 <FloatingLabelInput placeholder="Email ID" type="email" />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <CenterModal
//         isOpen={isPickupModalOpen}
//         onRequestClose={closePickupModal}
//         contentLabel="Pickup Address Modal"
//         shouldCloseOnOverlayClick={true}
//       >
//         {/* Modal content here */} hello world
//       </CenterModal>
//     </div>
//   );
// };

// export default AddressForm;

import { useState, ReactNode, useEffect } from "react";
import FloatingLabelInput from "./FloatingLabelInput";
import OneButton from "../../components/Button/OneButton";
import userguide from "../../assets/Order/User guide.svg";
import locationIcon from "../../assets/Order/Location.svg";
import CenterModal from "../../components/CustomModal/customCenterModal";
import { GET_PICKUP_ADDRESS_MULTIPLE_SEARCH, PIN_PICKUP_ADDRESS } from "../../utils/ApiUrls";
import { POST } from "../../utils/webService";

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

const AddressForm: React.FC = () => {
  const [showPickupDetails, setShowPickupDetails] = useState(true);
  const [showDeliveryDetails, setShowDeliveryDetails] = useState(true);
  const [isPickupModalOpen, setIsPickupModalOpen] = useState(false);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);

  // Form states
  const [pickupAddress, setPickupAddress] = useState<Address | null>(null);
  const [deliveryAddress, setDeliveryAddress] = useState<Address | null>(null);

  // Modal states
  const [searchQuery, setSearchQuery] = useState("");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentModalType, setCurrentModalType] = useState<
    "pickup" | "delivery" | null
  >(null);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number | null>(null);

  const openPickupModal = () => {
    setIsPickupModalOpen(true);
    setCurrentModalType("pickup");
    // Reset search when opening
    setSearchQuery("");
    setAddresses([]);
    setSelectedAddressIndex(null);
    // Fetch all addresses with empty search value
    searchAddresses("");
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
    // Fetch all addresses with empty search value
    searchAddresses("");
  };

  const closeDeliveryModal = () => {
    setIsDeliveryModalOpen(false);
    setCurrentModalType(null);
    setSelectedAddressIndex(null);
  };

  const handleSelectAddress = (address: Address, index: number) => {
    // Just mark as selected but don't close the modal
    setSelectedAddressIndex(index);
  };

  const handleProceed = () => {
    if (selectedAddressIndex !== null) {
      const selectedAddress = addresses[selectedAddressIndex];
      if (currentModalType === "pickup") {
        setPickupAddress(selectedAddress);
        closePickupModal();
      } else if (currentModalType === "delivery") {
        setDeliveryAddress(selectedAddress);
        closeDeliveryModal();
      }
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);

    // If search is cleared (empty), call API with empty search
    if (value === "") {
      searchAddresses("");
    }

    // Clear results if search has only 1-2 characters
    if (value.length > 0 && value.length < 3) {
      setAddresses([]);
    }
  };

  // Pin/Unpin address function
  const handlePinAddress = async (address: Address, event: React.MouseEvent) => {
    // Stop propagation to prevent the card click from selecting the address
    event.stopPropagation();
    
    try {
      // Toggle pin status
      const newPinStatus = !address.isPin;
      
      const payload = {
        pickupAddressId: address.pickupAddressId,
        isPin: newPinStatus
      };
      
      const response = await POST(PIN_PICKUP_ADDRESS, payload);
      
      if (response?.data?.success) {
        // Update the addresses list with the new pin status
        setAddresses(prevAddresses => 
          prevAddresses.map(addr => 
            addr.pickupAddressId === address.pickupAddressId 
              ? { ...addr, isPin: newPinStatus } 
              : addr
          )
        );
      } else {
        console.error("Failed to update pin status:", response?.data?.message);
      }
    } catch (error) {
      console.error("Error pinning/unpinning address:", error);
    }
  };

  // Search addresses API function
  const searchAddresses = async (query: string) => {
    // Remove the length check so we can fetch all addresses with empty search
    // if (query.length < 3) return;

    setLoading(true);
    try {
      const payload = {
        skip: 0,
        limit: 1000,
        pageNo: 1,
        sort: { _id: -1 },
        searchValue: query,
      };

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
      console.error("Error searching addresses:", error);
      setAddresses([]);
    } finally {
      setLoading(false);
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
      searchAddresses(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

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

  // New version of BookmarkIcon that takes a "filled" prop
  const BookmarkIcon = ({ filled = false }: { filled?: boolean }): JSX.Element => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={filled ? "text-blue-500" : "text-gray-500"}
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
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

  return (
    <div className="flex flex-row gap-6 w-full max-w-6xl mx-auto p-4">
      {/* Pickup Details Section */}
      <div className="w-1/2 bg-gray-50 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <MapPinIcon />
            <h2 className="font-bold text-[18px] leading-[100%] tracking-[0%] font-Open text-gray-700">
              Pickup Details
            </h2>
          </div>
          <OneButton
            text={"Pickup Address"}
            onClick={openPickupModal}
            variant="primary"
            showIcon={true}
            icon={userguide}
            className="!rounded-full"
          />
        </div>

        <div className="space-y-4">
          {/* Contact Number */}
          <FloatingLabelInput
            placeholder="Contact No"
            icon={<SearchIcon />}
            counter="0/10"
          />

          {/* Address */}
          <FloatingLabelInput placeholder="Address" />

          {/* Magic Fill Button */}
          <div className="flex justify-start ">
            <OneButton
              text={"Magic Fill"}
              onClick={() => {}}
              variant="primary"
              showIcon={true}
              icon={locationIcon}
              className="!rounded-full !bg-[#004EFF] hover:!bg-blue-500"
            />
          </div>

          {/* Name and Pin code */}
          <div className="grid grid-cols-2 gap-4">
            <FloatingLabelInput placeholder="Name" icon={<SearchIcon />} />
            <FloatingLabelInput placeholder="Pin code" icon={<SearchIcon />} />
          </div>

          {/* Additional Address Information */}
          <div>
            <button
              onClick={() => setShowPickupDetails(!showPickupDetails)}
              className="flex items-center justify-between w-full text-left"
            >
              <span className="text-gray-700">
                {showPickupDetails ? "Hide" : "Show"} additional address
                information
              </span>
              <span
                className={`transform transition-transform ${
                  showPickupDetails ? "rotate-180" : ""
                }`}
              >
                &#8963;
              </span>
            </button>

            {showPickupDetails && (
              <div className="space-y-4 mt-4">
                {/* City and State */}
                <div className="grid grid-cols-2 gap-4">
                  <FloatingLabelInput placeholder="City" />
                  <FloatingLabelInput placeholder="State" />
                </div>

                {/* Address Lines */}
                <div className="grid grid-cols-2 gap-4">
                  <FloatingLabelInput placeholder="Address Line 1" />
                  <FloatingLabelInput placeholder="Address Line 2" />
                </div>

                {/* Landmark and GST */}
                <div className="grid grid-cols-2 gap-4">
                  <FloatingLabelInput placeholder="Landmark" />
                  <FloatingLabelInput placeholder="GST No (If Available)" />
                </div>

                {/* Email ID */}
                <FloatingLabelInput placeholder="Email ID" type="email" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delivery Details Section */}
      <div className="w-1/2 bg-gray-50 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <MapPinIcon />
            <h2 className="font-bold text-[18px] leading-[100%] tracking-[0%] font-Open text-gray-700">
              Delivery Details
            </h2>
          </div>
          <OneButton
            text={"Delivery Address"}
            onClick={openDeliveryModal}
            variant="primary"
            showIcon={true}
            icon={userguide}
            className="!rounded-full"
          />
        </div>

        <div className="space-y-4">
          {/* Contact Number */}
          <FloatingLabelInput
            placeholder="Contact No"
            icon={<SearchIcon />}
            counter="0/10"
          />

          {/* Address */}
          <FloatingLabelInput placeholder="Address" />

          {/* Magic Fill Button */}
          <div className="flex justify-start ">
            <OneButton
              text={"Magic Fill"}
              onClick={() => {}}
              variant="primary"
              showIcon={true}
              icon={locationIcon}
              className="!rounded-full !bg-[#004EFF] hover:!bg-blue-500"
            />
          </div>

          {/* Name and Pin code */}
          <div className="grid grid-cols-2 gap-4">
            <FloatingLabelInput placeholder="Name" icon={<SearchIcon />} />
            <FloatingLabelInput placeholder="Pin code" icon={<SearchIcon />} />
          </div>

          {/* Additional Address Information */}
          <div>
            <button
              onClick={() => setShowDeliveryDetails(!showDeliveryDetails)}
              className="flex items-center justify-between w-full text-left"
            >
              <span className="text-gray-700">
                {showDeliveryDetails ? "Hide" : "Show"} additional address
                information
              </span>
              <span
                className={`transform transition-transform ${
                  showDeliveryDetails ? "rotate-180" : ""
                }`}
              >
                &#8963;
              </span>
            </button>

            {showDeliveryDetails && (
              <div className="space-y-4 mt-4">
                {/* City and State */}
                <div className="grid grid-cols-2 gap-4">
                  <FloatingLabelInput placeholder="City" />
                  <FloatingLabelInput placeholder="State" />
                </div>

                {/* Address Lines */}
                <div className="grid grid-cols-2 gap-4">
                  <FloatingLabelInput placeholder="Address Line 1" />
                  <FloatingLabelInput placeholder="Address Line 2" />
                </div>

                {/* Landmark and GST */}
                <div className="grid grid-cols-2 gap-4">
                  <FloatingLabelInput placeholder="Landmark (Optional)" />
                  <FloatingLabelInput placeholder="GST No (If Available)" />
                </div>

                {/* Email ID */}
                <FloatingLabelInput placeholder="Email ID" type="email" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Address Modal - Updated to Match Design with Pin Functionality and Footer buttons */}
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
                  {currentModalType === "pickup" ? "Pickup" : "Delivery"} Address
                  Book
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
                        } ${
                          selectedAddressIndex === index ? "ring-2 ring-blue-500 bg-blue-50" : ""
                        }`}
                        onClick={() => handleSelectAddress(address, index)}
                      >
                        {/* Pin Icon - Top Right */}
                        <div 
                          className="absolute top-4 right-4 cursor-pointer hover:scale-110 transition-transform"
                          onClick={(e) => handlePinAddress(address, e)}
                        >
                          <BookmarkIcon filled={!!address.isPin} />
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
                              {getEmail(address) ? ` | ${getEmail(address)}` : ""}
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
          
          {/* Footer with Back and Proceed buttons */}
          <div className="border-t p-4 flex justify-end gap-4 bg-gray-50">
            <OneButton
              text="Back"
              onClick={
                currentModalType === "pickup"
                  ? closePickupModal
                  : closeDeliveryModal
              }
              variant="secondary"
              className="!rounded-full min-w-24"
            />
            <OneButton
              text="Proceed"
              onClick={handleProceed}
              variant="primary"
              className={`!rounded-full min-w-24 ${
                selectedAddressIndex === null ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={selectedAddressIndex === null}
            />
          </div>
        </div>
      </CenterModal>
    </div>
  );
};

export default AddressForm;