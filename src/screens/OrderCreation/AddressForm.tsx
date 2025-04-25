

import { useState, ReactNode, useEffect } from "react";
import FloatingLabelInput from "./FloatingLabelInput"; // Make sure this path matches your actual file structure
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
} from "../../utils/ApiUrls";
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
  setIsLoading: React.Dispatch<React.SetStateAction<{ pickup: boolean; delivery: boolean }>>;
  pickupSearchResults: Address[];
  // setPickupSearchResults: React.Dispatch<React.SetStateAction<Address[]>>;
  setPickupSearchResults: any;

  deliverySearchResults: Address[];
  // setDeliverySearchResults: React.Dispatch<React.SetStateAction<Address[]>>;
  setDeliverySearchResults: any;
  showPickupSearchResults: boolean;
  setShowPickupSearchResults: React.Dispatch<React.SetStateAction<boolean>>;
  showDeliverySearchResults: boolean;
  setShowDeliverySearchResults: React.Dispatch<React.SetStateAction<boolean>>;
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

  // Fetch default pickup address on component mount
  useEffect(() => {
    fetchDefaultPickupAddress();
    fetchDefaultDeliveryAddress();
  }, []);

  // Fetch default pickup address
  const fetchDefaultPickupAddress = async () => {
    setIsLoading((prev) => ({ ...prev, pickup: true }));
    try {
      const response = await POST(DEFAULT_PICKUP_ADDRESS, {});

      if (response?.data?.success && response.data.data) {
        const address = response.data.data;
        // Set pickup address object
        setPickupAddress(address);

        // Extract and set form values
        const formValues = extractFormValues(address);
        setPickupFormValues(formValues);
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
        setDeliveryFormValues(formValues);
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
      address: formatAddress(address),
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
      // Update pickup form values
      setPickupFormValues(formValues);
      // Also store the original address object if needed
      setPickupAddress(address);
      closePickupModal();
    } else if (currentModalType === "delivery") {
      // Update delivery form values
      setDeliveryFormValues(formValues);
      // Also store the original address object if needed
      setDeliveryAddress(address);
      closeDeliveryModal();
    }
  };

  // Handle form input changes
  // const handlePickupInputChange = (field: keyof FormValues, value: string) => {
  //   setPickupFormValues((prev) => ({
  //     ...prev,
  //     [field]: value,
  //   }));
  // };

  const handlePickupInputChange = (field: keyof FormValues, value: string) => {
    setPickupFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    // If the field is one of our searchable fields and has 3 or more characters, trigger search
    if (["contactNo", "name", "pincode"].includes(field) && value.length >= 3) {
      searchAddressByField(
        "pickup",
        field as "contactNo" | "name" | "pincode",
        value
      );
    } else if (["contactNo", "name", "pincode"].includes(field)) {
      // Clear search results if less than 3 characters
      setPickupSearchResults([]);
      setShowPickupSearchResults(false);
    }
  };

  // const handleDeliveryInputChange = (
  //   field: keyof FormValues,
  //   value: string
  // ) => {
  //   setDeliveryFormValues((prev) => ({
  //     ...prev,
  //     [field]: value,
  //   }));
  // };

  const handleDeliveryInputChange = (
    field: keyof FormValues,
    value: string
  ) => {
    setDeliveryFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    // If the field is one of our searchable fields and has 3 or more characters, trigger search
    if (["contactNo", "name", "pincode"].includes(field) && value.length >= 3) {
      searchAddressByField(
        "delivery",
        field as "contactNo" | "name" | "pincode",
        value
      );
    } else if (["contactNo", "name", "pincode"].includes(field)) {
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
    if (["contactNo", "name", "pincode"].includes(field)) {
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
      // Update pickup form values
      setPickupFormValues(formValues);
      // Also store the original address object if needed
      setPickupAddress(address);
      // Hide search results
      setShowPickupSearchResults(false);
    } else {
      // Update delivery form values
      setDeliveryFormValues(formValues);
      // Also store the original address object if needed
      setDeliveryAddress(address);
      // Hide search results
      setShowDeliverySearchResults(false);
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

  // Function to render floating search results
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

                {field === "pincode" && (
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {address.pincode || address.pincodeStr}
                    </span>
                    <span className="text-sm text-gray-600">
                      {address.city}
                      {address.state ? `, ${address.state}` : ""}
                    </span>
                    <span className="text-sm text-gray-600">
                      {getName(address)} | {getContactNo(address)}
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

  return (
    <div className="flex flex-row gap-6 w-full max-w-full mx-auto p-4">
      {/* Pickup Details Section */}
      <div className="w-1/2 bg-[#F5FBFF] rounded-lg p-6">
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

        {isLoading.pickup ? (
          <div className="flex justify-center items-center h-40">
            <p>Loading pickup address...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Contact Number */}
            <div className="relative">
              <FloatingLabelInput
                placeholder="Contact No"
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
              />
              {renderFloatingSearchResults(
                "pickup",
                "contactNo",
                pickupSearchResults
              )}
            </div>

            {/* Address */}
            <FloatingLabelInput
              placeholder="Address"
              value={pickupFormValues.address}
              onChangeCallback={(value) =>
                handlePickupInputChange("address", value)
              }
            />

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
            {/* <div className="grid grid-cols-2 gap-4">
              <FloatingLabelInput
                placeholder="Name"
                icon={<SearchIcon />}
                value={pickupFormValues.name}
                onChangeCallback={(value) =>
                  handlePickupInputChange("name", value)
                }
              />
              <FloatingLabelInput
                placeholder="Pin code"
                icon={<SearchIcon />}
                value={pickupFormValues.pincode}
                onChangeCallback={(value) =>
                  handlePickupInputChange("pincode", value)
                }
              />
            </div> */}
            <div className="grid grid-cols-2 gap-4">
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
                />
                {renderFloatingSearchResults(
                  "pickup",
                  "name",
                  pickupSearchResults
                )}
              </div>
              <div className="relative">
                <FloatingLabelInput
                  placeholder="Pin code"
                  icon={
                    searchInputLoading.pickup.pincode ? (
                      <LoadingIcon />
                    ) : (
                      <SearchIcon />
                    )
                  }
                  value={pickupFormValues.pincode}
                  onChangeCallback={(value) =>
                    handlePickupInputChange("pincode", value)
                  }
                  onFocus={() => handleInputFocus("pickup", "pincode")}
                  onBlur={handleInputBlur}
                />
                {renderFloatingSearchResults(
                  "pickup",
                  "pincode",
                  pickupSearchResults
                )}
              </div>
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
                    <FloatingLabelInput
                      placeholder="City"
                      value={pickupFormValues.city}
                      onChangeCallback={(value) =>
                        handlePickupInputChange("city", value)
                      }
                    />
                    <FloatingLabelInput
                      placeholder="State"
                      value={pickupFormValues.state}
                      onChangeCallback={(value) =>
                        handlePickupInputChange("state", value)
                      }
                    />
                  </div>

                  {/* Address Lines - Map flatNo to addressLine1 and locality to addressLine2 */}
                  <div className="grid grid-cols-2 gap-4">
                    <FloatingLabelInput
                      placeholder="Address Line 1"
                      value={pickupFormValues.addressLine1}
                      onChangeCallback={(value) =>
                        handlePickupInputChange("addressLine1", value)
                      }
                    />
                    <FloatingLabelInput
                      placeholder="Address Line 2"
                      value={pickupFormValues.addressLine2}
                      onChangeCallback={(value) =>
                        handlePickupInputChange("addressLine2", value)
                      }
                    />
                  </div>

                  {/* Landmark and GST - GST is user input only */}
                  <div className="grid grid-cols-2 gap-4">
                    <FloatingLabelInput
                      placeholder="Landmark"
                      value={pickupFormValues.landmark}
                      onChangeCallback={(value) =>
                        handlePickupInputChange("landmark", value)
                      }
                    />
                    <FloatingLabelInput
                      placeholder="GST No (If Available)"
                      value={pickupFormValues.gstNo}
                      onChangeCallback={(value) =>
                        handlePickupInputChange("gstNo", value)
                      }
                    />
                  </div>

                  {/* Email ID */}
                  <FloatingLabelInput
                    placeholder="Email ID"
                    type="email"
                    value={pickupFormValues.email}
                    onChangeCallback={(value) =>
                      handlePickupInputChange("email", value)
                    }
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Delivery Details Section */}
      <div className="w-1/2 bg-[#F5FBFF] rounded-lg p-6">
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

        {isLoading.delivery ? (
          <div className="flex justify-center items-center h-40">
            <p>Loading delivery address...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Contact Number */}
            {/* <FloatingLabelInput
              placeholder="Contact No"
              icon={<SearchIcon />}
              counter="0/10"
              value={deliveryFormValues.contactNo}
              onChangeCallback={(value) =>
                handleDeliveryInputChange("contactNo", value)
              }
            /> */}
            <div className="relative">
              <FloatingLabelInput
                placeholder="Contact No"
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
              />
              {renderFloatingSearchResults(
                "delivery",
                "contactNo",
                deliverySearchResults
              )}
            </div>

            {/* Address */}
            <FloatingLabelInput
              placeholder="Address"
              value={deliveryFormValues.address}
              onChangeCallback={(value) =>
                handleDeliveryInputChange("address", value)
              }
            />

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
            {/* <div className="grid grid-cols-2 gap-4">
              <FloatingLabelInput
                placeholder="Name"
                icon={<SearchIcon />}
                value={deliveryFormValues.name}
                onChangeCallback={(value) =>
                  handleDeliveryInputChange("name", value)
                }
              />
              <FloatingLabelInput
                placeholder="Pin code"
                icon={<SearchIcon />}
                value={deliveryFormValues.pincode}
                onChangeCallback={(value) =>
                  handleDeliveryInputChange("pincode", value)
                }
              />
            </div> */}
            <div className="grid grid-cols-2 gap-4">
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
                />
                {renderFloatingSearchResults(
                  "delivery",
                  "name",
                  deliverySearchResults
                )}
              </div>
              <div className="relative">
                <FloatingLabelInput
                  placeholder="Pin code"
                  icon={
                    searchInputLoading.delivery.pincode ? (
                      <LoadingIcon />
                    ) : (
                      <SearchIcon />
                    )
                  }
                  value={deliveryFormValues.pincode}
                  onChangeCallback={(value) =>
                    handleDeliveryInputChange("pincode", value)
                  }
                  onFocus={() => handleInputFocus("delivery", "pincode")}
                  onBlur={handleInputBlur}
                />
                {renderFloatingSearchResults(
                  "delivery",
                  "pincode",
                  deliverySearchResults
                )}
              </div>
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
                    <FloatingLabelInput
                      placeholder="City"
                      value={deliveryFormValues.city}
                      onChangeCallback={(value) =>
                        handleDeliveryInputChange("city", value)
                      }
                    />
                    <FloatingLabelInput
                      placeholder="State"
                      value={deliveryFormValues.state}
                      onChangeCallback={(value) =>
                        handleDeliveryInputChange("state", value)
                      }
                    />
                  </div>

                  {/* Address Lines - Map flatNo to addressLine1 and locality to addressLine2 */}
                  <div className="grid grid-cols-2 gap-4">
                    <FloatingLabelInput
                      placeholder="Address Line 1"
                      value={deliveryFormValues.addressLine1}
                      onChangeCallback={(value) =>
                        handleDeliveryInputChange("addressLine1", value)
                      }
                    />
                    <FloatingLabelInput
                      placeholder="Address Line 2"
                      value={deliveryFormValues.addressLine2}
                      onChangeCallback={(value) =>
                        handleDeliveryInputChange("addressLine2", value)
                      }
                    />
                  </div>

                  {/* Landmark and GST - GST is user input only */}
                  <div className="grid grid-cols-2 gap-4">
                    <FloatingLabelInput
                      placeholder="Landmark (Optional)"
                      value={deliveryFormValues.landmark}
                      onChangeCallback={(value) =>
                        handleDeliveryInputChange("landmark", value)
                      }
                    />
                    <FloatingLabelInput
                      placeholder="GST No (If Available)"
                      value={deliveryFormValues.gstNo}
                      onChangeCallback={(value) =>
                        handleDeliveryInputChange("gstNo", value)
                      }
                    />
                  </div>

                  {/* Email ID */}
                  <FloatingLabelInput
                    placeholder="Email ID"
                    type="email"
                    value={deliveryFormValues.email}
                    onChangeCallback={(value) =>
                      handleDeliveryInputChange("email", value)
                    }
                  />
                </div>
              )}
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






// import { useState, ReactNode, useEffect } from "react";
// import FloatingLabelInput from "./FloatingLabelInput"; // Make sure this path matches your actual file structure
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
// } from "../../utils/ApiUrls";
// import { POST } from "../../utils/webService";

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

// const AddressForm: React.FC = () => {
//   const [showPickupDetails, setShowPickupDetails] = useState(true);
//   const [showDeliveryDetails, setShowDeliveryDetails] = useState(true);
//   const [isPickupModalOpen, setIsPickupModalOpen] = useState(false);
//   const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);

//   // Form states with initial empty values
//   const [pickupFormValues, setPickupFormValues] = useState<FormValues>({
//     contactNo: "",
//     address: "",
//     name: "",
//     pincode: "",
//     city: "",
//     state: "",
//     addressLine1: "", // flatNo
//     addressLine2: "", // locality
//     landmark: "",
//     gstNo: "",
//     email: "",
//   });

//   const [deliveryFormValues, setDeliveryFormValues] = useState<FormValues>({
//     contactNo: "",
//     address: "",
//     name: "",
//     pincode: "",
//     city: "",
//     state: "",
//     addressLine1: "", // flatNo
//     addressLine2: "", // locality
//     landmark: "",
//     gstNo: "",
//     email: "",
//   });

//   // Address object references for later use if needed
//   const [pickupAddress, setPickupAddress] = useState<Address | null>(null);
//   const [deliveryAddress, setDeliveryAddress] = useState<Address | null>(null);
//   const [isLoading, setIsLoading] = useState({
//     pickup: false,
//     delivery: false,
//   });

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

//   // Add to existing state declarations
//   const [pickupSearchResults, setPickupSearchResults] = useState<Address[]>([]);
//   const [deliverySearchResults, setDeliverySearchResults] = useState<Address[]>(
//     []
//   );
//   const [showPickupSearchResults, setShowPickupSearchResults] = useState(false);
//   const [showDeliverySearchResults, setShowDeliverySearchResults] =
//     useState(false);
//   const [activeSearchField, setActiveSearchField] = useState<{
//     type: "pickup" | "delivery";
//     field: keyof FormValues;
//   } | null>(null);
//   const [searchInputLoading, setSearchInputLoading] = useState({
//     pickup: { contactNo: false, name: false, pincode: false },
//     delivery: { contactNo: false, name: false, pincode: false },
//   });

//   // Fetch default pickup address on component mount
//   useEffect(() => {
//     fetchDefaultPickupAddress();
//     fetchDefaultDeliveryAddress();
//   }, []);

//   // Fetch default pickup address
//   const fetchDefaultPickupAddress = async () => {
//     setIsLoading((prev) => ({ ...prev, pickup: true }));
//     try {
//       const response = await POST(DEFAULT_PICKUP_ADDRESS, {});

//       if (response?.data?.success && response.data.data) {
//         const address = response.data.data;
//         // Set pickup address object
//         setPickupAddress(address);

//         // Extract and set form values
//         const formValues = extractFormValues(address);
//         setPickupFormValues(formValues);
//       }
//     } catch (error) {
//       console.error("Error fetching default pickup address:", error);
//     } finally {
//       setIsLoading((prev) => ({ ...prev, pickup: false }));
//     }
//   };

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
//       // Update pickup form values
//       setPickupFormValues(formValues);
//       // Also store the original address object if needed
//       setPickupAddress(address);
//       closePickupModal();
//     } else if (currentModalType === "delivery") {
//       // Update delivery form values
//       setDeliveryFormValues(formValues);
//       // Also store the original address object if needed
//       setDeliveryAddress(address);
//       closeDeliveryModal();
//     }
//   };

//   // Handle form input changes
//   // const handlePickupInputChange = (field: keyof FormValues, value: string) => {
//   //   setPickupFormValues((prev) => ({
//   //     ...prev,
//   //     [field]: value,
//   //   }));
//   // };

//   const handlePickupInputChange = (field: keyof FormValues, value: string) => {
//     setPickupFormValues((prev) => ({
//       ...prev,
//       [field]: value,
//     }));

//     // If the field is one of our searchable fields and has 3 or more characters, trigger search
//     if (["contactNo", "name", "pincode"].includes(field) && value.length >= 3) {
//       searchAddressByField(
//         "pickup",
//         field as "contactNo" | "name" | "pincode",
//         value
//       );
//     } else if (["contactNo", "name", "pincode"].includes(field)) {
//       // Clear search results if less than 3 characters
//       setPickupSearchResults([]);
//       setShowPickupSearchResults(false);
//     }
//   };

//   // const handleDeliveryInputChange = (
//   //   field: keyof FormValues,
//   //   value: string
//   // ) => {
//   //   setDeliveryFormValues((prev) => ({
//   //     ...prev,
//   //     [field]: value,
//   //   }));
//   // };

//   const handleDeliveryInputChange = (
//     field: keyof FormValues,
//     value: string
//   ) => {
//     setDeliveryFormValues((prev) => ({
//       ...prev,
//       [field]: value,
//     }));

//     // If the field is one of our searchable fields and has 3 or more characters, trigger search
//     if (["contactNo", "name", "pincode"].includes(field) && value.length >= 3) {
//       searchAddressByField(
//         "delivery",
//         field as "contactNo" | "name" | "pincode",
//         value
//       );
//     } else if (["contactNo", "name", "pincode"].includes(field)) {
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
//     if (["contactNo", "name", "pincode"].includes(field)) {
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
//       // Update pickup form values
//       setPickupFormValues(formValues);
//       // Also store the original address object if needed
//       setPickupAddress(address);
//       // Hide search results
//       setShowPickupSearchResults(false);
//     } else {
//       // Update delivery form values
//       setDeliveryFormValues(formValues);
//       // Also store the original address object if needed
//       setDeliveryAddress(address);
//       // Hide search results
//       setShowDeliverySearchResults(false);
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

//   // Function to render floating search results
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

//                 {field === "pincode" && (
//                   <div className="flex flex-col">
//                     <span className="font-medium">
//                       {address.pincode || address.pincodeStr}
//                     </span>
//                     <span className="text-sm text-gray-600">
//                       {address.city}
//                       {address.state ? `, ${address.state}` : ""}
//                     </span>
//                     <span className="text-sm text-gray-600">
//                       {getName(address)} | {getContactNo(address)}
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

//   return (
//     <div className="flex flex-row gap-6 w-full max-w-6xl mx-auto p-4">
//       {/* Pickup Details Section */}
//       <div className="w-1/2 bg-[#F5FBFF] rounded-lg p-6">
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
//             />

//             {/* Magic Fill Button */}
//             <div className="flex justify-start ">
//               <OneButton
//                 text={"Magic Fill"}
//                 onClick={() => {}}
//                 variant="primary"
//                 showIcon={true}
//                 icon={locationIcon}
//                 className="!rounded-full !bg-[#004EFF] hover:!bg-blue-500"
//               />
//             </div>

//             {/* Name and Pin code */}
//             {/* <div className="grid grid-cols-2 gap-4">
//               <FloatingLabelInput
//                 placeholder="Name"
//                 icon={<SearchIcon />}
//                 value={pickupFormValues.name}
//                 onChangeCallback={(value) =>
//                   handlePickupInputChange("name", value)
//                 }
//               />
//               <FloatingLabelInput
//                 placeholder="Pin code"
//                 icon={<SearchIcon />}
//                 value={pickupFormValues.pincode}
//                 onChangeCallback={(value) =>
//                   handlePickupInputChange("pincode", value)
//                 }
//               />
//             </div> */}
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
//                     searchInputLoading.pickup.pincode ? (
//                       <LoadingIcon />
//                     ) : (
//                       <SearchIcon />
//                     )
//                   }
//                   value={pickupFormValues.pincode}
//                   onChangeCallback={(value) =>
//                     handlePickupInputChange("pincode", value)
//                   }
//                   onFocus={() => handleInputFocus("pickup", "pincode")}
//                   onBlur={handleInputBlur}
//                 />
//                 {renderFloatingSearchResults(
//                   "pickup",
//                   "pincode",
//                   pickupSearchResults
//                 )}
//               </div>
//             </div>

//             {/* Additional Address Information */}
//             <div>
//               <button
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
//               </button>

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
//                     />
//                     <FloatingLabelInput
//                       placeholder="State"
//                       value={pickupFormValues.state}
//                       onChangeCallback={(value) =>
//                         handlePickupInputChange("state", value)
//                       }
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
//                     />
//                     <FloatingLabelInput
//                       placeholder="Address Line 2"
//                       value={pickupFormValues.addressLine2}
//                       onChangeCallback={(value) =>
//                         handlePickupInputChange("addressLine2", value)
//                       }
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
//                     />
//                     <FloatingLabelInput
//                       placeholder="GST No (If Available)"
//                       value={pickupFormValues.gstNo}
//                       onChangeCallback={(value) =>
//                         handlePickupInputChange("gstNo", value)
//                       }
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
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Delivery Details Section */}
//       <div className="w-1/2 bg-[#F5FBFF] rounded-lg p-6">
//         <div className="flex justify-between items-center mb-4">
//           <div className="flex items-center gap-2">
//             <MapPinIcon />
//             <h2 className="font-bold text-[18px] leading-[100%] tracking-[0%] font-Open text-gray-700">
//               Delivery Details
//             </h2>
//           </div>
//           <OneButton
//             text={"Delivery Address"}
//             onClick={openDeliveryModal}
//             variant="primary"
//             showIcon={true}
//             icon={userguide}
//             className="!rounded-full"
//           />
//         </div>

//         {isLoading.delivery ? (
//           <div className="flex justify-center items-center h-40">
//             <p>Loading delivery address...</p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {/* Contact Number */}
//             {/* <FloatingLabelInput
//               placeholder="Contact No"
//               icon={<SearchIcon />}
//               counter="0/10"
//               value={deliveryFormValues.contactNo}
//               onChangeCallback={(value) =>
//                 handleDeliveryInputChange("contactNo", value)
//               }
//             /> */}
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
//             />

//             {/* Magic Fill Button */}
//             <div className="flex justify-start ">
//               <OneButton
//                 text={"Magic Fill"}
//                 onClick={() => {}}
//                 variant="primary"
//                 showIcon={true}
//                 icon={locationIcon}
//                 className="!rounded-full !bg-[#004EFF] hover:!bg-blue-500"
//               />
//             </div>

//             {/* Name and Pin code */}
//             {/* <div className="grid grid-cols-2 gap-4">
//               <FloatingLabelInput
//                 placeholder="Name"
//                 icon={<SearchIcon />}
//                 value={deliveryFormValues.name}
//                 onChangeCallback={(value) =>
//                   handleDeliveryInputChange("name", value)
//                 }
//               />
//               <FloatingLabelInput
//                 placeholder="Pin code"
//                 icon={<SearchIcon />}
//                 value={deliveryFormValues.pincode}
//                 onChangeCallback={(value) =>
//                   handleDeliveryInputChange("pincode", value)
//                 }
//               />
//             </div> */}
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
//                     searchInputLoading.delivery.pincode ? (
//                       <LoadingIcon />
//                     ) : (
//                       <SearchIcon />
//                     )
//                   }
//                   value={deliveryFormValues.pincode}
//                   onChangeCallback={(value) =>
//                     handleDeliveryInputChange("pincode", value)
//                   }
//                   onFocus={() => handleInputFocus("delivery", "pincode")}
//                   onBlur={handleInputBlur}
//                 />
//                 {renderFloatingSearchResults(
//                   "delivery",
//                   "pincode",
//                   deliverySearchResults
//                 )}
//               </div>
//             </div>

//             {/* Additional Address Information */}
//             <div>
//               <button
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
//               </button>

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
//                     />
//                     <FloatingLabelInput
//                       placeholder="State"
//                       value={deliveryFormValues.state}
//                       onChangeCallback={(value) =>
//                         handleDeliveryInputChange("state", value)
//                       }
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
//                     />
//                     <FloatingLabelInput
//                       placeholder="Address Line 2"
//                       value={deliveryFormValues.addressLine2}
//                       onChangeCallback={(value) =>
//                         handleDeliveryInputChange("addressLine2", value)
//                       }
//                     />
//                   </div>

//                   {/* Landmark and GST - GST is user input only */}
//                   <div className="grid grid-cols-2 gap-4">
//                     <FloatingLabelInput
//                       placeholder="Landmark (Optional)"
//                       value={deliveryFormValues.landmark}
//                       onChangeCallback={(value) =>
//                         handleDeliveryInputChange("landmark", value)
//                       }
//                     />
//                     <FloatingLabelInput
//                       placeholder="GST No (If Available)"
//                       value={deliveryFormValues.gstNo}
//                       onChangeCallback={(value) =>
//                         handleDeliveryInputChange("gstNo", value)
//                       }
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
