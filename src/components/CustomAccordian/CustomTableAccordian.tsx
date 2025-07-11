import React, { useState, useRef, useEffect } from "react";
import { POST } from "../../utils/webService";
import {
  GET_SELLER_ORDER_COMPLETE_DATA,
  UPDATE_TEMP_ORDER_INFO,
  GET_SELLER_BOX,
  GET_COURIER_PARTNER_SERVICE,
  SET_SERVICE_INFO,
  GET_PINCODE_DATA,
  POST_PLACE_ALL_ORDERS,
  GET_PICKUP_ADDRESS_MULTIPLE_SEARCH,
  GET_DELIVERY_ADDRESS_MULTIPLE_SEARCH,
  GET_PRODUCTS, // Added for product search
  COMPANY_NAME,
  CHECK_ORDER_ID,
  GET_ORDER_CONFIRMATION_LOG,
} from "../../utils/ApiUrls";
import { toast } from "react-hot-toast";
import {
  capitalizeFirstLetter,
  convertEpochToDateTime,
  convertEpochToDateTimeV2,
} from "../../utils/utility";
import { date_DD_MMM_YYYY_HH_MM_SS } from "../../utils/dateFormater";
import { Spinner } from "../../components/Spinner";
import Collapsible from "../OneComponents/Collapsible";
import FloatingLabelInput from "../../screens/OrderCreation/FloatingLabelInput";
import CustomDate from "./CustomDateWithTime";
import OneButton from "../Button/OneButton";
import { v4 as uuidv4 } from "uuid";
import ServiceSelectionComponent from "./ServiceSelectionComponent"; // Add this import
import copyIcon from "../../assets/copy.svg";

// Types
interface OrderData {
  orderId: string;
  tempOrderId: string;
  source: string;
  orderType: string;
  pickupAddress: any;
  deliveryAddress: any;
  boxInfo: any[];
  codInfo: any;
  service: any;
  status: any[];
  companyId?: string;
  sellerId?: number;
  privateCompanyId?: number;
  transit?: any;
  otherDetails?: any;
  zone?: any;
}

interface ValidationErrors {
  [key: string]: string;
}

interface CustomTableAccordianProps {
  getAllSellerData?: any;
  isMasked?: boolean;
}

// Address interface for search results
interface Address {
  pickupAddressId?: string;
  deliveryAddressId?: string;
  contact: {
    name: string;
    mobileNo: number;
    mobileNoStr: string;
    emailId?: string;
    type: string;
  };
  flatNo: string;
  locality: string;
  landmark: string;
  city: string;
  state: string;
  country: string;
  pincode: number | string;
  pincodeStr: string;
  fullAddress: string;
  gstNumber?: string;
  isPin?: boolean;
}

// Product search interface
interface ProductSearchResult {
  _id: string;
  productId?: string;
  name: string;
  title?: string;
  unitPrice: number;
  deadWeight: number;
  length: number;
  breadth: number;
  height: number;
  unitTax: number;
  sku: string;
  hsnCode: string;
  qty: number;
  category: string;
  companyId: string;
  privateCompanyId: number;
  sellerId: number;
  appliedWeight: number;
  volumetricWeight: number;
  weightUnit: string;
  measureUnit: string;
  currency: string;
  divisor: number;
  variantId: string;
  images: any[];
}

const CustomTableAccordian: React.FC<CustomTableAccordianProps> = ({
  getAllSellerData,
  isMasked = false,
}) => {
  // State Management
  const [isLoading, setIsLoading] = useState(false);
  const [isServiceUpdated, setIsServiceUpdated] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [boxDetailsData, setBoxDetailsData] = useState<any[]>([]);
  const [serviceList, setServiceList] = useState<any[]>([]);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);
  const [isEnabled, setIsEnabled] = useState(true);
  // Add this state with other state declarations
  const [originalOrderId, setOriginalOrderId] = useState<string>("");
  const [orderIdExistsError, setOrderIdExistsError] = useState(false);
  // Step Management State - ADD THIS
  const [currentStep, setCurrentStep] = useState<
    "orderDetails" | "serviceSelection"
  >("orderDetails");

  // const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
  //   {}
  // );
  // Add this state with other state declarations
  const [buyerConfirmationLogs, setBuyerConfirmationLogs] = useState([]);

  const [isNextLoading, setIsNextLoading] = useState(false);

  const [validationErrors, setValidationErrors] = useState({
    pickup: {
      contactName: false,
      mobileNo: false,
      pincode: false,
      flatNo: false,
      locality: false,
      landmark: false,
      gstNumber: false,
      gstLength: false, // Add this
    },
    delivery: {
      contactName: false,
      mobileNo: false,
      pincode: false,
      flatNo: false,
      locality: false,
      landmark: false,
      gstNumber: false,
      gstLength: false, // Add this
    },
    boxes: {} as {
      [boxIndex: number]: {
        name: boolean;
        length: boolean;
        breadth: boolean;
        height: boolean;
      };
    },
    products: {} as {
      [key: string]: {
        name: boolean;
        qty: boolean;
        unitPrice: boolean;
        deadWeight: boolean;
      };
    }, // key format: "boxIndex-productIndex"

    orderDetails: {
      orderId: false,
      eWayBillNo: false,
    },
  });
  const EDITABLE_SOURCES = [
    "API",
    "WEBSITE_SINGLE_PAGE",
    "BULK_B2C",
    "WEBSITE",
    "WEBSITE_ALPHA",
    "MANUAL_BULK_B2B",
    "BULK_B2B",
    "MANUAL_BULK_B2C",
  ];
  const PANEL_SOURCES = [
    "WEBSITE_SINGLE_PAGE",
    "WEBSITE",
    "WEBSITE_ALPHA",
    "BULK_B2C",
    "MANUAL_BULK_B2C",
    "BULK_B2B",
    "MANUAL_BULK_B2B",
  ];
  const [isProductEditingAllowed, setIsProductEditingAllowed] = useState(true);
  const [serviceLoading, setServiceLoading] = useState(false);
  const [openPickupDatePicker, setOpenPickupDatePicker] = useState(false);

  // Search functionality state
  const [pickupSearchQuery, setPickupSearchQuery] = useState("");
  const [deliverySearchQuery, setDeliverySearchQuery] = useState("");
  const [pickupSearchResults, setPickupSearchResults] = useState<Address[]>([]);
  const [deliverySearchResults, setDeliverySearchResults] = useState<Address[]>(
    []
  );
  const [showPickupSearchResults, setShowPickupSearchResults] = useState(false);
  const [showDeliverySearchResults, setShowDeliverySearchResults] =
    useState(false);
  const [searchLoading, setSearchLoading] = useState({
    pickup: false,
    delivery: false,
  });

  // Product search state
  const [productSearchQueries, setProductSearchQueries] = useState<{
    [key: string]: string; // key format: "boxIndex-productIndex"
  }>({});

  const [productSearchResults, setProductSearchResults] = useState<{
    [key: string]: ProductSearchResult[];
  }>({});

  const [showProductSearchResults, setShowProductSearchResults] = useState<{
    [key: string]: boolean;
  }>({});

  const [productSearchLoading, setProductSearchLoading] = useState<{
    [key: string]: boolean;
  }>({});

  // Box search state
  const [boxSearchQueries, setBoxSearchQueries] = useState<{
    [key: string]: string; // key format: "boxIndex"
  }>({});

  const [boxSearchResults, setBoxSearchResults] = useState<{
    [key: string]: any[]; // API response structure from GET_SELLER_BOX
  }>({});

  const [showBoxSearchResults, setShowBoxSearchResults] = useState<{
    [key: string]: boolean;
  }>({});

  const [boxSearchLoading, setBoxSearchLoading] = useState<{
    [key: string]: boolean;
  }>({});

  const [phoneValidationErrors, setPhoneValidationErrors] = useState({
    pickup: false,
    delivery: false,
  });

  // Form Data State
  const [pickupAddress, setPickupAddress] = useState<any>({
    contact: { contactName: "", mobileNo: "", emailId: "", contactType: "" },
    flatNo: "",
    locality: "",
    landmark: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    addressType: "",
    pickupDate: "",
    gstNumber: "",
  });

  const [deliveryAddress, setDeliveryAddress] = useState<any>({
    contact: { contactName: "", mobileNo: "", emailId: "", contactType: "" },
    flatNo: "",
    locality: "",
    landmark: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    addressType: "",
    gstNumber: "",
  });

  const [selectedBoxIndex, setSelectedBoxIndex] = useState(0);
  const [customBox, setCustomBox] = useState({
    name: "",
    deadWeight: 0,
    length: 0,
    breadth: 0,
    height: 0,
  });

  const getSellerSession = () => {
    try {
      const sellerSessionData = localStorage.getItem("sellerSession");
      return sellerSessionData ? JSON.parse(sellerSessionData) : null;
    } catch (error) {
      console.error("Error parsing sellerSession:", error);
      return null;
    }
  };

  const isB2BDisabled = () => {
    const sellerSession = getSellerSession();
    return sellerSession?.businessType === "INDIVIDUAL";
  };

  // Helper function to check if source is from panel
  const isPanelSource = (source: string): boolean => {
    return PANEL_SOURCES.includes(source);
  };

  const isApiSource = (source: string): boolean => {
    return source === "API";
  };
  const isNotApiSource = !isApiSource(orderData?.source || "");

  // Helper function to get source type description
  const getSourceTypeDescription = (source: string): string => {
    return isPanelSource(source) ? "Panel Order" : "API/Channel Integration";
  };

  // Refs// Helper function to check if pickup address has errors
  const hasPickupAddressErrors = (): boolean => {
    return (
      Object.values(validationErrors.pickup).some((error) => error === true) ||
      phoneValidationErrors.pickup
    );
  };

  // Helper function to check if delivery address has errors
  const hasDeliveryAddressErrors = (): boolean => {
    return (
      Object.values(validationErrors.delivery).some(
        (error) => error === true
      ) || phoneValidationErrors.delivery
    );
  };

  // Helper function to check if boxes and products have errors
  const hasBoxesAndProductsErrors = (): boolean => {
    // Check box errors
    const boxErrors = Object.values(validationErrors.boxes).some((boxError) =>
      Object.values(boxError).some((error) => error === true)
    );

    // Check product errors
    const productErrors = Object.values(validationErrors.products).some(
      (productError) =>
        Object.values(productError).some((error) => error === true)
    );

    return boxErrors || productErrors;
  };

  // Add this function after the existing validation functions
  // const validateOrderId = async (orderId: string): Promise<boolean> => {
  //   if (!orderId?.trim()) {
  //     return false;
  //   }

  //   try {
  //     const payload = {
  //       orderId: orderId.trim(),
  //     };

  //     const response = await POST(CHECK_ORDER_ID, payload);

  //     if (response?.data?.success === false) {
  //       // Order ID already exists
  //       setValidationErrors((prev) => ({
  //         ...prev,
  //         orderDetails: {
  //           ...prev.orderDetails,
  //           orderId: true,
  //         },
  //       }));

  //       // Set custom error message for existing order ID
  //       setOrderIdExistsError(true);
  //       return false;
  //     }

  //     // Order ID is available
  //     setOrderIdExistsError(false);
  //     return true;
  //   } catch (error) {
  //     console.error("Error validating Order ID:", error);
  //     toast.error("Failed to validate Order ID");
  //     return false;
  //   }
  // };

  // Update the validateOrderId function
  const validateOrderId = async (orderId: string): Promise<boolean> => {
    const trimmedOrderId = orderId?.trim();

    // Don't call API if Order ID is empty or same as original
    if (!trimmedOrderId || trimmedOrderId === originalOrderId) {
      setOrderIdExistsError(false);
      return !!trimmedOrderId; // Return false for empty, true for same as original
    }

    try {
      const payload = {
        orderId: trimmedOrderId,
      };

      const response = await POST(CHECK_ORDER_ID, payload);

      if (response?.data?.success === false) {
        // Order ID already exists
        setValidationErrors((prev) => ({
          ...prev,
          orderDetails: {
            ...prev.orderDetails,
            orderId: true,
          },
        }));

        // Set custom error message for existing order ID
        setOrderIdExistsError(true);
        return false;
      }

      // Order ID is available
      setOrderIdExistsError(false);
      return true;
    } catch (error) {
      console.error("Error validating Order ID:", error);
      toast.error("Failed to validate Order ID");
      return false;
    }
  };

  // Helper function to check if order details have errors
  const hasOrderDetailsErrors = (): boolean => {
    return Object.values(validationErrors.orderDetails).some(
      (error) => error === true
    );
  };
  const isFirstRender = useRef(true);
  const productSearchRefs = useRef<{
    [key: string]: HTMLDivElement | null;
  }>({});

  // Box search refs
  const boxSearchRefs = useRef<{
    [key: string]: HTMLDivElement | null;
  }>({});

  // Search Icons
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

  // Function to calculate total value of all products across all boxes
  const calculateTotalProductValue = (): number => {
    if (!orderData?.boxInfo) return 0;

    return orderData.boxInfo.reduce((totalValue: number, box: any) => {
      if (!box.products || box.products.length === 0) return totalValue;

      const boxTotal = box.products.reduce((boxValue: number, product: any) => {
        const qty = product.qty || 0;
        const unitPrice = product.unitPrice || 0;
        return boxValue + qty * unitPrice;
      }, 0);

      return totalValue + boxTotal;
    }, 0);
  };

  // Add these helper functions after the existing helper functions
  // const calculateTotalInvoiceValue = (): number => {
  //   if (!orderData?.boxInfo) return 0;

  //   return orderData.boxInfo.reduce((totalInvoice: number, box: any) => {
  //     if (!box.products || box.products.length === 0) return totalInvoice;

  //     const boxInvoiceValue = box.products.reduce(
  //       (boxTotal: number, product: any) => {
  //         const qty = product.qty || 0;
  //         const unitPrice = product.unitPrice || 0;
  //         return boxTotal + qty * unitPrice;
  //       },
  //       0
  //     );

  //     return totalInvoice + boxInvoiceValue;
  //   }, 0);
  // };

  // const calculateTotalInvoiceValue = (): number => {
  //   if (!orderData?.boxInfo) return 0;

  //   if (isPanelSource(orderData?.source || "")) {
  //     // For panel sources: calculate sum of (product price × quantity)
  //     return orderData.boxInfo.reduce((totalInvoice: number, box: any) => {
  //       return totalInvoice + calculateBoxTotalPrice(box);
  //     }, 0);
  //   } else {
  //      // For API/channel integration sources: use invoice value from main codInfo (outside boxInfo)
  //   return orderData?.codInfo?.invoiceValue || 0;
  //   }
  // };

  const calculateTotalInvoiceValue = (): number => {
    if (!orderData?.boxInfo) return 0;

    if (isPanelSource(orderData?.source || "")) {
      // For panel sources: calculate sum of (product price × quantity)
      return orderData.boxInfo.reduce((totalInvoice: number, box: any) => {
        const baseBoxPrice = getBoxInvoiceValue(box, orderData?.source || "");

        // For B2B orders, multiply by box quantity
        if (orderData?.orderType === "B2B") {
          const boxQty = box.qty || 1;
          return totalInvoice + baseBoxPrice * boxQty;
        }

        // For B2C orders, just add the base price
        return totalInvoice + baseBoxPrice;
      }, 0);
    } else {
      // For API/channel integration sources: use invoice value from main codInfo
      const baseInvoiceValue = orderData?.codInfo?.invoiceValue || 0;

      // For B2B orders with API sources, multiply by total quantity of all boxes
      if (orderData?.orderType === "B2B") {
        const totalBoxQty = orderData.boxInfo.reduce(
          (total: number, box: any) => {
            return total + (box.qty || 1);
          },
          0
        );
        return baseInvoiceValue * totalBoxQty;
      }

      return baseInvoiceValue;
    }
  };

  const calculateTotalCollectableAmount = (): number => {
    if (!orderData?.boxInfo || !orderData?.codInfo?.isCod) return 0;

    return orderData.boxInfo.reduce((totalCollectable: number, box: any) => {
      const collectableAmount = box.codInfo?.collectableAmount || 0;
      return totalCollectable + collectableAmount;
    }, 0);
  };

  // Enhanced function to validate order details
  const validateOrderDetails = (): boolean => {
    let hasErrors = false;
    const newErrors = { ...validationErrors };

    // Validate Order ID
    if (!orderData?.orderId?.trim()) {
      newErrors.orderDetails.orderId = true;
      hasErrors = true;
    } else {
      newErrors.orderDetails.orderId = false;
    }

    // Validate E-way Bill Number if total value >= 50,000
    const totalValue = calculateTotalProductValue();
    const requiresEWayBill = totalValue >= 50000;

    if (requiresEWayBill) {
      const eWayBillNo = orderData?.boxInfo?.[0]?.eWayBillNo;
      if (!eWayBillNo || eWayBillNo.trim() === "" || eWayBillNo === "0") {
        newErrors.orderDetails.eWayBillNo = true;
        hasErrors = true;
      } else {
        newErrors.orderDetails.eWayBillNo = false;
      }
    } else {
      // Clear e-way bill error if not required
      newErrors.orderDetails.eWayBillNo = false;
    }

    setValidationErrors(newErrors);
    return !hasErrors;
  };

  // Utility Functions
  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateMobile = (mobile: string): boolean => {
    return /^[6-9]\d{9}$/.test(mobile);
  };

  const isValidPhoneNumber = (phone: string): boolean => {
    // Remove any non-digit characters (like spaces, dashes, etc.)
    const cleanPhone = phone.replace(/\D/g, "");
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(cleanPhone);
  };

  const validatePincode = (pincode: string): boolean => {
    return /^\d{6}$/.test(pincode);
  };

  // Helper functions for address extraction
  const getName = (address: Address) => {
    return address.contact?.name || "";
  };

  const getContactNo = (address: Address) => {
    return (
      address.contact?.mobileNoStr ||
      address.contact?.mobileNo?.toString() ||
      ""
    );
  };

  const getEmail = (address: Address) => {
    return address.contact?.emailId || "";
  };

  const formatAddress = (address: Address) => {
    return address.fullAddress || "";
  };

  // Helper function to check if current source allows editing
  const isSourceEditable = (source: string): boolean => {
    return EDITABLE_SOURCES.includes(source);
  };

  // Add these validation functions
  const validateAddresses = (): boolean => {
    let hasErrors = false;
    const newErrors = { ...validationErrors };

    // Validate pickup address
    if (!pickupAddress.contact.contactName?.trim()) {
      newErrors.pickup.contactName = true;
      hasErrors = true;
    }
    if (!pickupAddress.contact.mobileNo || phoneValidationErrors.pickup) {
      newErrors.pickup.mobileNo = true;
      hasErrors = true;
    }
    if (!pickupAddress.pincode?.toString().trim()) {
      newErrors.pickup.pincode = true;
      hasErrors = true;
    }
    if (!pickupAddress.flatNo?.trim()) {
      newErrors.pickup.flatNo = true;
      hasErrors = true;
    }
    if (!pickupAddress.locality?.trim()) {
      newErrors.pickup.locality = true;
      hasErrors = true;
    }
    if (!pickupAddress.landmark?.trim()) {
      newErrors.pickup.landmark = true;
      hasErrors = true;
    }
    // GST validation only for B2B orders
    // if (orderData?.orderType === "B2B" && !pickupAddress.gstNumber?.trim()) {
    //   newErrors.pickup.gstNumber = true;
    //   hasErrors = true;
    // }else if (pickupAddress.gstNumber.trim().length !== 15) {
    //   newErrors.pickup.gstLength = true;
    //   hasErrors = true;
    // }
    if (orderData?.orderType === "B2B") {
      // For B2B orders, GST is optional but if provided, must be valid format
      if (pickupAddress.gstNumber?.trim()) {
        const gstValue = pickupAddress.gstNumber.trim();
        // Check if it's exactly 15 characters and contains only alphanumeric characters
        if (gstValue.length !== 15 || !/^[0-9A-Z]{15}$/i.test(gstValue)) {
          newErrors.pickup.gstLength = true;
          hasErrors = true;
        }
      }
    }

    // Validate delivery address
    if (!deliveryAddress.contact.contactName?.trim()) {
      newErrors.delivery.contactName = true;
      hasErrors = true;
    }
    if (!deliveryAddress.contact.mobileNo || phoneValidationErrors.delivery) {
      newErrors.delivery.mobileNo = true;
      hasErrors = true;
    }
    if (!deliveryAddress.pincode?.toString().trim()) {
      newErrors.delivery.pincode = true;
      hasErrors = true;
    }
    if (!deliveryAddress.flatNo?.trim()) {
      newErrors.delivery.flatNo = true;
      hasErrors = true;
    }
    if (!deliveryAddress.locality?.trim()) {
      newErrors.delivery.locality = true;
      hasErrors = true;
    }
    if (!deliveryAddress.landmark?.trim()) {
      newErrors.delivery.landmark = true;
      hasErrors = true;
    }
    // GST validation only for B2B orders
    // if (orderData?.orderType === "B2B" && !deliveryAddress.gstNumber?.trim()) {
    //   newErrors.delivery.gstNumber = true;
    //   hasErrors = true;
    // }else if (deliveryAddress.gstNumber.trim().length !== 15) {
    //   newErrors.delivery.gstLength = true;
    //   hasErrors = true;
    // }
    if (orderData?.orderType === "B2B") {
      // For B2B orders, GST is optional but if provided, must be valid format
      if (deliveryAddress.gstNumber?.trim()) {
        const gstValue = deliveryAddress.gstNumber.trim();
        // Check if it's exactly 15 characters and contains only alphanumeric characters
        if (gstValue.length !== 15 || !/^[0-9A-Z]{15}$/i.test(gstValue)) {
          newErrors.delivery.gstLength = true;
          hasErrors = true;
        }
      }
    }

    setValidationErrors(newErrors);
    return !hasErrors;
  };

  const validateBoxesAndProducts = (): boolean => {
    let hasErrors = false;
    const newErrors = { ...validationErrors };

    // Validate boxes
    orderData?.boxInfo?.forEach((box: any, boxIndex: number) => {
      if (!newErrors.boxes[boxIndex]) {
        newErrors.boxes[boxIndex] = {
          name: false,
          length: false,
          breadth: false,
          height: false,
        };
      }

      if (!box.name?.trim()) {
        newErrors.boxes[boxIndex].name = true;
        hasErrors = true;
      }
      if (!box.length || box.length <= 0) {
        newErrors.boxes[boxIndex].length = true;
        hasErrors = true;
      }
      if (!box.breadth || box.breadth <= 0) {
        newErrors.boxes[boxIndex].breadth = true;
        hasErrors = true;
      }
      if (!box.height || box.height <= 0) {
        newErrors.boxes[boxIndex].height = true;
        hasErrors = true;
      }

      // Validate products in this box
      box.products?.forEach((product: any, productIndex: number) => {
        const productKey = `${boxIndex}-${productIndex}`;
        if (!newErrors.products[productKey]) {
          newErrors.products[productKey] = {
            name: false,
            qty: false,
            unitPrice: false,
            deadWeight: false,
          };
        }

        if (!product.name?.trim()) {
          newErrors.products[productKey].name = true;
          hasErrors = true;
        }
        if (!product.qty || product.qty <= 0) {
          newErrors.products[productKey].qty = true;
          hasErrors = true;
        }
        // if (!product.unitPrice || product.unitPrice <= 0) {
        //   newErrors.products[productKey].unitPrice = true;
        //   hasErrors = true;
        // }

        // Validate unit price only for COD orders
        if (
          orderData?.codInfo?.isCod &&
          (!product.unitPrice || product.unitPrice <= 0)
        ) {
          newErrors.products[productKey].unitPrice = true;
          hasErrors = true;
        }
        if (!product.deadWeight || product.deadWeight <= 0) {
          newErrors.products[productKey].deadWeight = true;
          hasErrors = true;
        }
      });
    });

    setValidationErrors(newErrors);
    return !hasErrors;
  };

  // Add this function to clear all validation errors
  const clearAllValidationErrors = () => {
    setValidationErrors({
      pickup: {
        contactName: false,
        mobileNo: false,
        pincode: false,
        flatNo: false,
        locality: false,
        landmark: false,
        gstNumber: false,
        gstLength: false, // Add this
      },
      delivery: {
        contactName: false,
        mobileNo: false,
        pincode: false,
        flatNo: false,
        locality: false,
        landmark: false,
        gstNumber: false,
        gstLength: false, // Add this
      },
      boxes: {},
      products: {},
      orderDetails: {
        orderId: false,
        eWayBillNo: false,
      },
    });

    // Also clear phone validation errors
    setPhoneValidationErrors({
      pickup: false,
      delivery: false,
    });
  };

  // Helper function to clear specific order detail validation errors
  const clearOrderDetailValidationError = (field: "orderId" | "eWayBillNo") => {
    setValidationErrors((prev) => ({
      ...prev,
      orderDetails: {
        ...prev.orderDetails,
        [field]: false,
      },
    }));
  };

  // Add this function to specifically clear box and product validation errors based on current data
  const clearBoxAndProductValidationErrors = (boxInfo: any[]) => {
    if (!boxInfo || boxInfo.length === 0) return;

    setValidationErrors((prev) => {
      const newErrors = { ...prev };

      // Clear all existing box errors
      newErrors.boxes = {};

      // Clear all existing product errors
      newErrors.products = {};

      // Initialize clean validation state for each box
      boxInfo.forEach((box, boxIndex) => {
        newErrors.boxes[boxIndex] = {
          name: false,
          length: false,
          breadth: false,
          height: false,
        };

        // Initialize clean validation state for each product in the box
        if (box.products && box.products.length > 0) {
          box.products.forEach((product: any, productIndex: number) => {
            const productKey = `${boxIndex}-${productIndex}`;
            newErrors.products[productKey] = {
              name: false,
              qty: false,
              unitPrice: false,
              deadWeight: false,
            };
          });
        }
      });

      return newErrors;
    });
  };

  // Helper function to clear specific validation errors
  const clearValidationError = (
    section: string,
    field: string,
    index?: number,
    subIndex?: number
  ) => {
    setValidationErrors((prev) => {
      const newErrors = { ...prev };

      if (section === "pickup" || section === "delivery") {
        newErrors[section as "pickup" | "delivery"][
          field as keyof typeof newErrors.pickup
        ] = false;
        if (field === "gstNumber") {
          newErrors[section as "pickup" | "delivery"]["gstLength"] = false;
        }
      } else if (section === "boxes" && index !== undefined) {
        if (!newErrors.boxes[index]) {
          newErrors.boxes[index] = {
            name: false,
            length: false,
            breadth: false,
            height: false,
          };
        }
        newErrors.boxes[index][field as keyof (typeof newErrors.boxes)[0]] =
          false;
      } else if (
        section === "products" &&
        index !== undefined &&
        subIndex !== undefined
      ) {
        const productKey = `${index}-${subIndex}`;
        if (!newErrors.products[productKey]) {
          newErrors.products[productKey] = {
            name: false,
            qty: false,
            unitPrice: false,
            deadWeight: false,
          };
        }
        newErrors.products[productKey][
          field as keyof (typeof newErrors.products)[string]
        ] = false;
      }

      return newErrors;
    });
  };

  // Box operations functions

  const updateBox = (boxIndex: number, field: string, value: any) => {
    if (isEnabled) return;

    setOrderData((prevData: any) => {
      if (!prevData) return prevData;

      const updatedData = { ...prevData };
      const updatedBoxInfo = [...updatedData.boxInfo];
      const updatedBox = { ...updatedBoxInfo[boxIndex] };

      updatedBox[field] = value;

      // If updating collectableAmount, also update codInfo
      if (field === "collectableAmount") {
        updatedBox.codInfo = {
          ...updatedBox.codInfo,
          collectableAmount: value,
          isCollectibleManuallyEdited: true,
        };
      }

      updatedBoxInfo[boxIndex] = updatedBox;
      updatedData.boxInfo = updatedBoxInfo;

      return updatedData;
    });
  };

  // Add a new function to sync collectible amount with total price when products change
  const syncCollectibleAmountWithTotalPrice = (
    boxIndex: number,
    totalPrice: number
  ) => {
    setOrderData((prevData: any) => {
      if (!prevData) return prevData;

      const updatedData = { ...prevData };
      const updatedBoxInfo = [...updatedData.boxInfo];
      const updatedBox = { ...updatedBoxInfo[boxIndex] };

      // Only update if not manually edited and COD is enabled
      if (
        !updatedBox.codInfo?.isCollectibleManuallyEdited &&
        updatedData.codInfo?.isCod
      ) {
        updatedBox.codInfo = {
          ...updatedBox.codInfo,
          collectableAmount: totalPrice,
          isCollectibleManuallyEdited: false,
        };
      }

      updatedBoxInfo[boxIndex] = updatedBox;
      updatedData.boxInfo = updatedBoxInfo;

      return updatedData;
    });
  };

  const addBox = () => {
    if (isEnabled || !isProductEditingAllowed) return;

    const newBox = {
      companyId: orderData?.companyId || "",
      sellerId: orderData?.sellerId || 0,
      privateCompanyId: orderData?.privateCompanyId || 0,
      // boxId: Math.random().toString(36).substr(2, 8),
      boxId: uuidv4(), // Use uuidv4 instead of Math.random()
      type: "",
      name: `Custom Box ${(orderData?.boxInfo?.length || 0) + 1}`,
      weightUnit: "kg",
      volumetricWeight: 0,
      deadWeight: 0,
      appliedWeight: 0,
      discount: 0,
      divisor: 5000,
      measureUnit: "cm",
      length: 0,
      qty: 1,
      breadth: 0,
      height: 0,
      color: "black",
      price: 0,
      currency: "INR",
      isFragile: false,
      eWayBillNo: "0",
      tracking: {
        awb: "",
        label: "",
        taxInvoice: "",
        manifest: "",
        status: [],
        otherDetails: {
          partners: [],
        },
      },
      codInfo: {
        isCod: false,
        collectableAmount: 0,
        invoiceValue: 0,
      },
      podInfo: {
        isPod: false,
      },
      service: {},
      images: [],
      products: [],
      payloads: [],
      allServices: [],
      walletInfo: [],
      categoryPriceInfo: {
        category: "",
        price: 0,
      },
    };

    setOrderData((prevData: any) => {
      if (!prevData) return prevData;

      const updatedData = { ...prevData };
      const updatedBoxInfo = [...updatedData.boxInfo, newBox];
      updatedData.boxInfo = updatedBoxInfo;

      return updatedData;
    });

    toast.success("Box added successfully");
  };

  const deleteBox = (boxIndex: number) => {
    if (isEnabled) return;

    if (orderData?.boxInfo?.length === 1) {
      toast.error("Cannot delete the last box");
      return;
    }

    setOrderData((prevData: any) => {
      if (!prevData) return prevData;

      const updatedData = { ...prevData };
      const updatedBoxInfo = [...updatedData.boxInfo];

      updatedBoxInfo.splice(boxIndex, 1);

      updatedData.boxInfo = updatedBoxInfo;

      return updatedData;
    });

    toast.success("Box deleted successfully");
  };

  // Calculate total price from products in a box
  // const calculateBoxTotalPrice = (box: any) => {
  //   if (!box.products || box.products.length === 0) return 0;

  //   return box.products.reduce((total: number, product: any) => {
  //     const qty = product.qty || 0;
  //     const unitPrice = product.unitPrice || 0;
  //     return total + qty * unitPrice;
  //   }, 0);
  // };

  // Update the calculateBoxTotalPrice function to handle API vs Panel sources
  // const calculateBoxTotalPrice = (box: any) => {
  //   if (!box) return 0;

  //   // Check if the order source is from panel
  //   if (isPanelSource(orderData?.source || "")) {
  //     // For panel sources: calculate from products (sum of product price × quantity)
  //     if (!box.products || box.products.length === 0) return 0;

  //     return box.products.reduce((total: number, product: any) => {
  //       const qty = product.qty || 0;
  //       const unitPrice = product.unitPrice || 0;
  //       return total + qty * unitPrice;
  //     }, 0);
  //   } else {
  //     // For API/channel integration sources: use invoice value from box's codInfo
  //     return box.codInfo?.invoiceValue || 0;
  //   }
  // };

  // Create a centralized function to get the correct invoice value
  const getBoxInvoiceValue = (box: any, source: string) => {
    if (isPanelSource(source)) {
      // For panel sources: always calculate from products
      if (!box.products || box.products.length === 0) return 0;
      return box.products.reduce((total: number, product: any) => {
        const qty = product.qty || 0;
        const unitPrice = product.unitPrice || 0;
        return total + qty * unitPrice;
      }, 0);
    } else {
      // For API sources: use the existing invoice value from box's codInfo
      return box.codInfo?.invoiceValue || 0;
    }
  };

  // Update the calculateBoxTotalPrice function to use this
  // const calculateBoxTotalPrice = (box: any) => {
  //   return getBoxInvoiceValue(box, orderData?.source || "");
  // };
  const calculateBoxTotalPrice = (box: any) => {
    const basePrice = getBoxInvoiceValue(box, orderData?.source || "");

    // For B2B orders, multiply by box quantity
    if (orderData?.orderType === "B2B") {
      const boxQty = box.qty || 1;
      return basePrice * boxQty;
    }

    return basePrice;
  };

  // Product operations functions
  // const updateProduct = (
  //   boxIndex: number,
  //   productIndex: number,
  //   field: string,
  //   value: any
  // ) => {
  //   if (isEnabled) return;

  //   setOrderData((prevData: any) => {
  //     if (!prevData) return prevData;

  //     const updatedData = { ...prevData };
  //     const updatedBoxInfo = [...updatedData.boxInfo];
  //     const updatedBox = { ...updatedBoxInfo[boxIndex] };
  //     const updatedProducts = [...updatedBox.products];

  //     updatedProducts[productIndex] = {
  //       ...updatedProducts[productIndex],
  //       [field]: value,
  //     };

  //     // Recalculate totals when qty, unitPrice, or deadWeight changes
  //     if (field === "qty" || field === "unitPrice" || field === "deadWeight") {
  //       const product = updatedProducts[productIndex];
  //       const qty = product.qty || 0;
  //       const unitPrice = product.unitPrice || 0;
  //       const deadWeight = product.deadWeight || 0;

  //       updatedProducts[productIndex] = {
  //         ...updatedProducts[productIndex],
  //         totalPrice: qty * unitPrice,
  //         appliedWeight: qty * deadWeight,
  //         volumetricWeight: calculateVolumetricWeight(
  //           product.length,
  //           product.breadth,
  //           product.height,
  //           qty
  //         ),
  //       };
  //     }

  //     updatedBox.products = updatedProducts;

  //     // Calculate new total price for the box
  //     const newTotalPrice = updatedProducts.reduce(
  //       (total: number, product: any) => {
  //         const qty = product.qty || 0;
  //         const unitPrice = product.unitPrice || 0;
  //         return total + qty * unitPrice;
  //       },
  //       0
  //     );

  //     // Sync collectible amount if not manually edited and COD is enabled
  //     if (
  //       !updatedBox.codInfo?.isCollectibleManuallyEdited &&
  //       updatedData.codInfo?.isCod
  //     ) {
  //       updatedBox.codInfo = {
  //         ...updatedBox.codInfo,
  //         collectableAmount: newTotalPrice,
  //         isCollectibleManuallyEdited: false,
  //       };
  //     }
  //     updatedBoxInfo[boxIndex] = updatedBox;
  //     updatedData.boxInfo = updatedBoxInfo;

  //     return updatedData;
  //   });
  // };

  //   const updateProduct = (
  //   boxIndex: number,
  //   productIndex: number,
  //   field: string,
  //   value: any
  // ) => {
  //   if (isEnabled) return;

  //   setOrderData((prevData: any) => {
  //     if (!prevData) return prevData;

  //     const updatedData = { ...prevData };
  //     const updatedBoxInfo = [...updatedData.boxInfo];
  //     const updatedBox = { ...updatedBoxInfo[boxIndex] };
  //     const updatedProducts = [...updatedBox.products];

  //     updatedProducts[productIndex] = {
  //       ...updatedProducts[productIndex],
  //       [field]: value,
  //     };

  //     // Recalculate totals when qty, unitPrice, or deadWeight changes
  //     if (field === "qty" || field === "unitPrice" || field === "deadWeight") {
  //       const product = updatedProducts[productIndex];
  //       const qty = product.qty || 0;
  //       const unitPrice = product.unitPrice || 0;
  //       const deadWeight = product.deadWeight || 0;

  //       updatedProducts[productIndex] = {
  //         ...updatedProducts[productIndex],
  //         totalPrice: qty * unitPrice,
  //         appliedWeight: qty * deadWeight,
  //         volumetricWeight: calculateVolumetricWeight(
  //           product.length,
  //           product.breadth,
  //           product.height,
  //           qty
  //         ),
  //       };
  //     }

  //     updatedBox.products = updatedProducts;

  //     // Calculate new total price and invoice value for the box
  //     const newTotalPrice = getBoxInvoiceValue(updatedBox, updatedData.source);

  //     // Update box's codInfo invoice value for panel sources
  //     if (isPanelSource(updatedData.source)) {
  //       updatedBox.codInfo = {
  //         ...updatedBox.codInfo,
  //         invoiceValue: newTotalPrice,
  //       };
  //     }

  //     // Sync collectible amount if not manually edited and COD is enabled
  //     if (
  //       !updatedBox.codInfo?.isCollectibleManuallyEdited &&
  //       updatedData.codInfo?.isCod
  //     ) {
  //       updatedBox.codInfo = {
  //         ...updatedBox.codInfo,
  //         collectableAmount: newTotalPrice,
  //         isCollectibleManuallyEdited: false,
  //       };
  //     }

  //     updatedBoxInfo[boxIndex] = updatedBox;
  //     updatedData.boxInfo = updatedBoxInfo;

  //     return updatedData;
  //   });
  // };

  const updateProduct = (
    boxIndex: number,
    productIndex: number,
    field: string,
    value: any
  ) => {
    if (isEnabled) return;

    setOrderData((prevData: any) => {
      if (!prevData) return prevData;

      const updatedData = { ...prevData };
      const updatedBoxInfo = [...updatedData.boxInfo];
      const updatedBox = { ...updatedBoxInfo[boxIndex] };
      const updatedProducts = [...updatedBox.products];

      updatedProducts[productIndex] = {
        ...updatedProducts[productIndex],
        [field]: value,
      };

      // Recalculate totals when qty, unitPrice, or deadWeight changes
      if (field === "qty" || field === "unitPrice" || field === "deadWeight") {
        const product = updatedProducts[productIndex];
        const qty = product.qty || 0;
        const unitPrice = product.unitPrice || 0;
        const deadWeight = product.deadWeight || 0;

        updatedProducts[productIndex] = {
          ...updatedProducts[productIndex],
          totalPrice: qty * unitPrice,
          appliedWeight: qty * deadWeight,
          volumetricWeight: calculateVolumetricWeight(
            product.length,
            product.breadth,
            product.height,
            qty
          ),
        };
      }

      updatedBox.products = updatedProducts;

      // Calculate new box total (considering B2B quantity multiplication)
      const baseBoxPrice = getBoxInvoiceValue(updatedBox, updatedData.source);
      const finalBoxPrice =
        updatedData.orderType === "B2B"
          ? baseBoxPrice * (updatedBox.qty || 1)
          : baseBoxPrice;

      // Update box's codInfo invoice value for panel sources
      if (isPanelSource(updatedData.source)) {
        updatedBox.codInfo = {
          ...updatedBox.codInfo,
          invoiceValue: baseBoxPrice, // Store base price, multiplication happens in total calculation
        };
      }

      // Sync collectible amount if not manually edited and COD is enabled
      if (
        !updatedBox.codInfo?.isCollectibleManuallyEdited &&
        updatedData.codInfo?.isCod
      ) {
        updatedBox.codInfo = {
          ...updatedBox.codInfo,
          collectableAmount: finalBoxPrice, // Use final price including B2B multiplication
          isCollectibleManuallyEdited: false,
        };
      }

      updatedBoxInfo[boxIndex] = updatedBox;
      updatedData.boxInfo = updatedBoxInfo;

      return updatedData;
    });
  };

  const addProduct = (boxIndex: number) => {
    if (isEnabled || !isProductEditingAllowed) return;

    const newProduct = {
      companyId: "",
      privateCompanyId: orderData?.privateCompanyId || 0,
      sellerId: orderData?.sellerId || 0,
      productId: uuidv4(),
      variantId: uuidv4(),
      name: "",
      category: "Any",
      qty: 1,
      sku: "",
      hsnCode: "",
      currency: "INR",
      unitPrice: 0,
      unitTax: 0,
      measureUnit: "cm",
      discount: 0,
      sellingPrice: 0,
      totalDiscount: 0,
      totalPrice: 0,
      length: 0,
      breadth: 0,
      height: 0,
      deadWeight: 0,
      weightUnit: "kg",
      volumetricWeight: 0,
      appliedWeight: 0,
      divisor: 5000,
      images: [],
      selected: false,
    };

    setOrderData((prevData: any) => {
      if (!prevData) return prevData;

      const updatedData = { ...prevData };
      const updatedBoxInfo = [...updatedData.boxInfo];
      const updatedBox = { ...updatedBoxInfo[boxIndex] };

      updatedBox.products = [...updatedBox.products, newProduct];
      updatedBoxInfo[boxIndex] = updatedBox;
      updatedData.boxInfo = updatedBoxInfo;

      return updatedData;
    });

    toast.success("Product added successfully");
  };

  const deleteProduct = (boxIndex: number, productIndex: number) => {
    if (isEnabled) return;

    setOrderData((prevData: any) => {
      if (!prevData) return prevData;

      const updatedData = { ...prevData };
      const updatedBoxInfo = [...updatedData.boxInfo];
      const updatedBox = { ...updatedBoxInfo[boxIndex] };
      const updatedProducts = [...updatedBox.products];

      updatedProducts.splice(productIndex, 1);

      updatedBox.products = updatedProducts;
      updatedBoxInfo[boxIndex] = updatedBox;
      updatedData.boxInfo = updatedBoxInfo;

      return updatedData;
    });

    toast.success("Product deleted successfully");
  };

  const calculateVolumetricWeight = (
    length: number,
    breadth: number,
    height: number,
    qty: number
  ) => {
    const volume = (length || 0) * (breadth || 0) * (height || 0) * (qty || 0);
    return volume / 5000; // Standard divisor for volumetric weight calculation
  };

  // Box search functions
  const searchBoxes = async (boxIndex: number, query: string) => {
    const searchKey = `${boxIndex}`;

    setBoxSearchLoading((prev) => ({
      ...prev,
      [searchKey]: true,
    }));

    try {
      const payload = {
        skip: 0,
        limit: 10,
        pageNo: 1,
        sort: { _id: -1 },
        searchValue: query,
      };

      const response = await POST(GET_SELLER_BOX, payload);

      if (response?.data?.success) {
        setBoxSearchResults((prev) => ({
          ...prev,
          [searchKey]: response.data.data,
        }));
      } else {
        setBoxSearchResults((prev) => ({
          ...prev,
          [searchKey]: [],
        }));
      }
    } catch (error) {
      console.error("Error searching boxes:", error);
      setBoxSearchResults((prev) => ({
        ...prev,
        [searchKey]: [],
      }));
    } finally {
      setBoxSearchLoading((prev) => ({
        ...prev,
        [searchKey]: false,
      }));
    }
  };

  const handleBoxNameSearch = async (boxIndex: number, value: string) => {
    const searchKey = `${boxIndex}`;

    // Update the search query
    setBoxSearchQueries((prev) => ({
      ...prev,
      [searchKey]: value,
    }));

    // Update the box name in the main data
    updateBox(boxIndex, "name", value);

    // Show search results dropdown
    setShowBoxSearchResults((prev) => ({
      ...prev,
      [searchKey]: true,
    }));

    // Call the search API - always call even with empty string to show all results
    await searchBoxes(boxIndex, value);
  };

  const selectBoxFromSearch = (boxIndex: number, box: any) => {
    // Update box with all the selected box data
    updateBox(boxIndex, "boxId", box.boxId || box._id || uuidv4());
    updateBox(boxIndex, "name", box.name || "");
    updateBox(boxIndex, "deadWeight", box.deadWeight || 0);
    updateBox(boxIndex, "length", box.length || 0);
    updateBox(boxIndex, "breadth", box.breadth || 0);
    updateBox(boxIndex, "height", box.height || 0);

    // Clear all validation errors for this box
    setValidationErrors((prev) => ({
      ...prev,
      boxes: {
        ...prev.boxes,
        [boxIndex]: {
          name: false,
          length: false,
          breadth: false,
          height: false,
        },
      },
    }));

    // Close the search results
    const searchKey = `${boxIndex}`;
    setShowBoxSearchResults((prev) => ({
      ...prev,
      [searchKey]: false,
    }));

    // Clear the search query
    setBoxSearchQueries((prev) => ({
      ...prev,
      [searchKey]: box.name || "",
    }));

    toast.success("Box details updated successfully");
  };

  const handleBoxSearchFocus = async (boxIndex: number) => {
    const searchKey = `${boxIndex}`;
    const currentQuery = boxSearchQueries[searchKey] || "";

    // If there are no existing results and query is empty, search with empty string
    if (!boxSearchResults[searchKey] && currentQuery === "") {
      await searchBoxes(boxIndex, "");
    }

    // Show existing results
    if (boxSearchResults[searchKey] && boxSearchResults[searchKey].length > 0) {
      setShowBoxSearchResults((prev) => ({
        ...prev,
        [searchKey]: true,
      }));
    }
  };

  const handleBoxSearchBlur = (boxIndex: number) => {
    const searchKey = `${boxIndex}`;
    setTimeout(() => {
      setShowBoxSearchResults((prev) => ({
        ...prev,
        [searchKey]: false,
      }));
    }, 200);
  };

  const buildCompletePayload = () => {
    const totalInvoiceValue = calculateTotalInvoiceValue();
    const totalCollectableAmount = calculateTotalCollectableAmount();

    // Update boxInfo with correct invoice values
    const updatedBoxInfo = orderData?.boxInfo?.map((box: any) => {
      const updatedBox = { ...box };

      // Always ensure invoice value is correct based on source
      const correctInvoiceValue = getBoxInvoiceValue(
        box,
        orderData?.source || ""
      );
      updatedBox.codInfo = {
        ...updatedBox.codInfo,
        invoiceValue: correctInvoiceValue,
      };

      return updatedBox;
    });

    return {
      orderId: orderData?.orderId,
      tempOrderId: orderData?.tempOrderId,
      source: orderData?.source,
      orderType: orderData?.orderType,
      transit: orderData?.transit,
      eWayBillNo: orderData?.boxInfo?.[0]?.eWayBillNo || "", // Added eWayBillNo field
      pickupAddress: {
        contact: {
          name: pickupAddress.contact.contactName,
          mobileNo: pickupAddress.contact.mobileNo,
          emailId: pickupAddress.contact.emailId,
          type: pickupAddress.contact.contactType,
        },
        flatNo: pickupAddress.flatNo,
        locality: pickupAddress.locality,
        landmark: pickupAddress.landmark,
        city: pickupAddress.city,
        state: pickupAddress.state,
        country: pickupAddress.country,
        pincode: pickupAddress.pincode,
        fullAddress: `${pickupAddress.flatNo} ${pickupAddress.locality} ${pickupAddress.landmark} ${pickupAddress.city} ${pickupAddress.state} ${pickupAddress.country} ${pickupAddress.pincode}`,
        addressType: pickupAddress.addressType,
        pickupDate: pickupAddress.pickupDate,
        gstNumber: pickupAddress.gstNumber,
      },
      deliveryAddress: {
        contact: {
          name: deliveryAddress.contact.contactName,
          mobileNo: deliveryAddress.contact.mobileNo,
          emailId: deliveryAddress.contact.emailId,
          type: deliveryAddress.contact.contactType,
        },
        flatNo: deliveryAddress.flatNo,
        locality: deliveryAddress.locality,
        landmark: deliveryAddress.landmark,
        city: deliveryAddress.city,
        state: deliveryAddress.state,
        country: deliveryAddress.country,
        pincode: deliveryAddress.pincode,
        fullAddress: `${deliveryAddress.flatNo} ${deliveryAddress.locality} ${deliveryAddress.landmark} ${deliveryAddress.city} ${deliveryAddress.state} ${deliveryAddress.country} ${deliveryAddress.pincode}`,
        addressType: deliveryAddress.addressType,
        gstNumber: deliveryAddress.gstNumber,
      },
      boxInfo: updatedBoxInfo,

      // boxInfo: orderData?.boxInfo,
      // codInfo: orderData?.codInfo,
      codInfo: {
        isCod: orderData?.codInfo?.isCod || false,
        collectableAmount: totalCollectableAmount,
        invoiceValue: totalInvoiceValue,
      },
    };
  };

  const renderBoxSearchResults = (boxIndex: number) => {
    const searchKey = `${boxIndex}`;
    const isVisible = showBoxSearchResults[searchKey];
    const results = boxSearchResults[searchKey] || [];
    const isLoading = boxSearchLoading[searchKey];

    if (!isVisible) {
      return null;
    }

    return (
      <div
        className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
        onMouseDown={(e: React.MouseEvent) => e.preventDefault()} // Correct typing
      >
        {isLoading ? (
          <div className="p-3 flex justify-center items-center">
            <LoadingIcon /> <span className="ml-2">Searching...</span>
          </div>
        ) : results.length > 0 ? (
          <ul>
            {results.map((box, index) => (
              <li
                key={box._id || index}
                className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                onMouseDown={() => selectBoxFromSearch(boxIndex, box)}
              >
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{box.name}</span>
                    <span className="text-sm text-gray-600">
                      {box.deadWeight}kg
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {box.length}×{box.breadth}×{box.height}cm
                  </span>
                  {box.color && (
                    <span className="text-xs text-gray-500">
                      Color: {box.color}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-4 text-center text-gray-500">No boxes found</div>
        )}
      </div>
    );
  };

  // Product search functions
  const searchProducts = async (
    boxIndex: number,
    productIndex: number,
    query: string
  ) => {
    const searchKey = `${boxIndex}-${productIndex}`;

    setProductSearchLoading((prev) => ({
      ...prev,
      [searchKey]: true,
    }));

    try {
      const payload = {
        skip: 0,
        limit: 1000,
        pageNo: 1,
        sort: { _id: -1 },
        searchValue: query, // Pass empty string if query is empty
      };

      const response = await POST(GET_PRODUCTS, payload);

      if (response?.data?.success) {
        const apiResults: ProductSearchResult[] = response.data.data.map(
          (item: any) => ({
            _id: item._id || item.productId || "",
            productId: item.productId || item._id || "",
            name: item.name || item.title || "",
            title: item.title || item.name || "",
            unitPrice: item.unitPrice || 0,
            deadWeight: item.deadWeight || 0,
            length: item.length || 0,
            breadth: item.breadth || 0,
            height: item.height || 0,
            unitTax: item.unitTax || 0,
            sku: item.sku || "",
            hsnCode: item.hsnCode || "",
            qty: item.qty || 1,
            category: item.category || "",
            companyId: item.companyId || "",
            privateCompanyId: item.privateCompanyId || 0,
            sellerId: item.sellerId || 0,
            appliedWeight: item.appliedWeight || 0,
            volumetricWeight: item.volumetricWeight || 0,
            weightUnit: item.weightUnit || "kg",
            measureUnit: item.measureUnit || "cm",
            currency: item.currency || "INR",
            divisor: item.divisor || 5000,
            variantId: item.variantId || "",
            images: item.images || [],
          })
        );

        setProductSearchResults((prev) => ({
          ...prev,
          [searchKey]: apiResults,
        }));
      } else {
        setProductSearchResults((prev) => ({
          ...prev,
          [searchKey]: [],
        }));
      }
    } catch (error) {
      console.error("Error searching products:", error);
      setProductSearchResults((prev) => ({
        ...prev,
        [searchKey]: [],
      }));
    } finally {
      setProductSearchLoading((prev) => ({
        ...prev,
        [searchKey]: false,
      }));
    }
  };

  const handleProductNameSearch = async (
    boxIndex: number,
    productIndex: number,
    value: string
  ) => {
    const searchKey = `${boxIndex}-${productIndex}`;

    // Update the search query
    setProductSearchQueries((prev) => ({
      ...prev,
      [searchKey]: value,
    }));

    // Update the product name in the main data
    updateProduct(boxIndex, productIndex, "name", value);

    // Show search results dropdown
    setShowProductSearchResults((prev) => ({
      ...prev,
      [searchKey]: true,
    }));

    // Call the search API - always call even with empty string
    await searchProducts(boxIndex, productIndex, value);
  };

  // const selectProductFromSearch = (
  //   boxIndex: number,
  //   productIndex: number,
  //   product: ProductSearchResult
  // ) => {
  //   // Update all product fields with the selected product data
  //   updateProduct(
  //     boxIndex,
  //     productIndex,
  //     "name",
  //     product.name || product.title || ""
  //   );
  //   updateProduct(boxIndex, productIndex, "qty", product.qty || 1);
  //   updateProduct(boxIndex, productIndex, "unitPrice", product.unitPrice || 0);
  //   updateProduct(
  //     boxIndex,
  //     productIndex,
  //     "deadWeight",
  //     product.deadWeight || 0
  //   );
  //   updateProduct(boxIndex, productIndex, "length", product.length || 0);
  //   updateProduct(boxIndex, productIndex, "breadth", product.breadth || 0);
  //   updateProduct(boxIndex, productIndex, "height", product.height || 0);
  //   updateProduct(boxIndex, productIndex, "sku", product.sku || "");
  //   updateProduct(boxIndex, productIndex, "hsnCode", product.hsnCode || "");

  //   // Calculate totals
  //   const qty = product.qty || 1;
  //   const unitPrice = product.unitPrice || 0;
  //   const deadWeight = product.deadWeight || 0;

  //   updateProduct(boxIndex, productIndex, "totalPrice", qty * unitPrice);
  //   updateProduct(boxIndex, productIndex, "appliedWeight", qty * deadWeight);
  //   updateProduct(
  //     boxIndex,
  //     productIndex,
  //     "volumetricWeight",
  //     calculateVolumetricWeight(
  //       product.length || 0,
  //       product.breadth || 0,
  //       product.height || 0,
  //       qty
  //     )
  //   );

  //   // Close the search results
  //   const searchKey = `${boxIndex}-${productIndex}`;
  //   setShowProductSearchResults((prev) => ({
  //     ...prev,
  //     [searchKey]: false,
  //   }));

  //   // Clear the search query
  //   setProductSearchQueries((prev) => ({
  //     ...prev,
  //     [searchKey]: product.name || product.title || "",
  //   }));

  //   toast.success("Product details updated successfully");
  // };

  const selectProductFromSearch = (
    boxIndex: number,
    productIndex: number,
    product: ProductSearchResult
  ) => {
    // Update productId and variantId first
    updateProduct(
      boxIndex,
      productIndex,
      "productId",
      product.productId || product._id || uuidv4()
    );
    updateProduct(
      boxIndex,
      productIndex,
      "variantId",
      product.variantId || uuidv4()
    );

    // Update all product fields with the selected product data
    updateProduct(
      boxIndex,
      productIndex,
      "name",
      product.name || product.title || ""
    );
    updateProduct(boxIndex, productIndex, "qty", product.qty || 1);
    updateProduct(boxIndex, productIndex, "unitPrice", product.unitPrice || 0);
    updateProduct(
      boxIndex,
      productIndex,
      "deadWeight",
      product.deadWeight || 0
    );
    updateProduct(boxIndex, productIndex, "length", product.length || 0);
    updateProduct(boxIndex, productIndex, "breadth", product.breadth || 0);
    updateProduct(boxIndex, productIndex, "height", product.height || 0);
    updateProduct(boxIndex, productIndex, "sku", product.sku || "");
    updateProduct(boxIndex, productIndex, "hsnCode", product.hsnCode || "");

    // Calculate totals
    const qty = product.qty || 1;
    const unitPrice = product.unitPrice || 0;
    const deadWeight = product.deadWeight || 0;

    updateProduct(boxIndex, productIndex, "totalPrice", qty * unitPrice);
    updateProduct(boxIndex, productIndex, "appliedWeight", qty * deadWeight);
    updateProduct(
      boxIndex,
      productIndex,
      "volumetricWeight",
      calculateVolumetricWeight(
        product.length || 0,
        product.breadth || 0,
        product.height || 0,
        qty
      )
    );

    // Clear all validation errors for this product
    const productKey = `${boxIndex}-${productIndex}`;
    setValidationErrors((prev) => ({
      ...prev,
      products: {
        ...prev.products,
        [productKey]: {
          name: false,
          qty: false,
          unitPrice: false,
          deadWeight: false,
        },
      },
    }));

    // Close the search results
    const searchKey = `${boxIndex}-${productIndex}`;
    setShowProductSearchResults((prev) => ({
      ...prev,
      [searchKey]: false,
    }));

    // Clear the search query
    setProductSearchQueries((prev) => ({
      ...prev,
      [searchKey]: product.name || product.title || "",
    }));

    toast.success("Product details updated successfully");
  };

  const handleProductSearchFocus = async (
    boxIndex: number,
    productIndex: number
  ) => {
    const searchKey = `${boxIndex}-${productIndex}`;
    const currentQuery = productSearchQueries[searchKey] || "";

    // If there are no existing results and query is empty, search with empty string
    if (!productSearchResults[searchKey] && currentQuery === "") {
      await searchProducts(boxIndex, productIndex, "");
    }

    // Show existing results
    if (
      productSearchResults[searchKey] &&
      productSearchResults[searchKey].length > 0
    ) {
      setShowProductSearchResults((prev) => ({
        ...prev,
        [searchKey]: true,
      }));
    }
  };

  const handleProductSearchBlur = (boxIndex: number, productIndex: number) => {
    const searchKey = `${boxIndex}-${productIndex}`;
    setTimeout(() => {
      setShowProductSearchResults((prev) => ({
        ...prev,
        [searchKey]: false,
      }));
    }, 200);
  };

  const renderProductSearchResults = (
    boxIndex: number,
    productIndex: number
  ) => {
    const searchKey = `${boxIndex}-${productIndex}`;
    const isVisible = showProductSearchResults[searchKey];
    const results = productSearchResults[searchKey] || [];
    const isLoading = productSearchLoading[searchKey];

    if (!isVisible) {
      return null;
    }

    return (
      <div
        className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
        onMouseDown={(e: React.MouseEvent) => e.preventDefault()} // Correct typing
      >
        {isLoading ? (
          <div className="p-3 flex justify-center items-center">
            <LoadingIcon /> <span className="ml-2">Searching...</span>
          </div>
        ) : results.length > 0 ? (
          <ul>
            {results.map((product, index) => (
              <li
                key={product._id || index}
                className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                onMouseDown={() =>
                  selectProductFromSearch(boxIndex, productIndex, product)
                }
              >
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      {product.name || product.title}
                    </span>
                    <span className="text-sm text-gray-600">
                      ₹{product.unitPrice}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.deadWeight}kg | {product.length}×{product.breadth}×
                    {product.height}cm
                  </span>
                  {product.sku && (
                    <span className="text-xs text-gray-500">
                      SKU: {product.sku}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-4 text-center text-gray-500">No products found</div>
        )}
      </div>
    );
  };

  // Address Search API Functions
  const searchPickupAddresses = async (query: string) => {
    // Always search, even with empty query to show all results
    setSearchLoading((prev) => ({ ...prev, pickup: true }));
    try {
      const payload = {
        skip: 0,
        limit: 50, // Increased limit to show more results
        pageNo: 1,
        sort: { _id: -1 },
        searchValue: query, // Can be empty to show all results
      };

      const response = await POST(GET_PICKUP_ADDRESS_MULTIPLE_SEARCH, payload);

      if (response?.data?.success) {
        const sortedAddresses = [...response.data.data].sort((a, b) => {
          if (a.isPin && !b.isPin) return -1;
          if (!a.isPin && b.isPin) return 1;
          return 0;
        });

        setPickupSearchResults(sortedAddresses);
        setShowPickupSearchResults(true);
      } else {
        setPickupSearchResults([]);
        setShowPickupSearchResults(false);
      }
    } catch (error) {
      console.error("Error searching pickup addresses:", error);
      setPickupSearchResults([]);
      setShowPickupSearchResults(false);
    } finally {
      setSearchLoading((prev) => ({ ...prev, pickup: false }));
    }
  };

  const searchDeliveryAddresses = async (query: string) => {
    // Always search, even with empty query to show all results
    setSearchLoading((prev) => ({ ...prev, delivery: true }));
    try {
      const payload = {
        skip: 0,
        limit: 50, // Increased limit to show more results
        pageNo: 1,
        sort: { _id: -1 },
        searchValue: query, // Can be empty to show all results
      };

      const response = await POST(
        GET_DELIVERY_ADDRESS_MULTIPLE_SEARCH,
        payload
      );

      if (response?.data?.success) {
        const sortedAddresses = [...response.data.data].sort((a, b) => {
          if (a.isPin && !b.isPin) return -1;
          if (!a.isPin && b.isPin) return 1;
          return 0;
        });

        setDeliverySearchResults(sortedAddresses);
        setShowDeliverySearchResults(true);
      } else {
        setDeliverySearchResults([]);
        setShowDeliverySearchResults(false);
      }
    } catch (error) {
      console.error("Error searching delivery addresses:", error);
      setDeliverySearchResults([]);
      setShowDeliverySearchResults(false);
    } finally {
      setSearchLoading((prev) => ({ ...prev, delivery: false }));
    }
  };

  // Search handlers
  const handlePickupSearchChange = (value: string) => {
    setPickupSearchQuery(value);

    // Debounced search - search immediately if empty (to show all results)
    const timer = setTimeout(
      () => {
        searchPickupAddresses(value);
      },
      value === "" ? 0 : 300
    );

    return () => clearTimeout(timer);
  };

  const handleDeliverySearchChange = (value: string) => {
    setDeliverySearchQuery(value);

    // Debounced search - search immediately if empty (to show all results)
    const timer = setTimeout(
      () => {
        searchDeliveryAddresses(value);
      },
      value === "" ? 0 : 300
    );

    return () => clearTimeout(timer);
  };

  // Focus handlers to show all results when input is focused
  const handlePickupSearchFocus = () => {
    if (pickupSearchQuery === "" && pickupSearchResults.length === 0) {
      searchPickupAddresses("");
    } else if (pickupSearchResults.length > 0) {
      setShowPickupSearchResults(true);
    }
  };

  const handleDeliverySearchFocus = () => {
    if (deliverySearchQuery === "" && deliverySearchResults.length === 0) {
      searchDeliveryAddresses("");
    } else if (deliverySearchResults.length > 0) {
      setShowDeliverySearchResults(true);
    }
  };

  // Blur handlers to hide results after a delay
  const handlePickupSearchBlur = () => {
    setTimeout(() => {
      setShowPickupSearchResults(false);
    }, 200);
  };

  const handleDeliverySearchBlur = () => {
    setTimeout(() => {
      setShowDeliverySearchResults(false);
    }, 200);
  };

  // Address selection handlers
  const handleSelectPickupAddress = (address: Address) => {
    setPickupAddress({
      contact: {
        contactName: getName(address),
        mobileNo: getContactNo(address),
        emailId: getEmail(address),
        contactType: address.contact?.type || "",
      },
      flatNo: address.flatNo || "",
      locality: address.locality || "",
      landmark: address.landmark || "",
      city: address.city || "",
      state: address.state || "",
      country: address.country || "",
      pincode: address.pincodeStr || "",
      addressType: "",
      pickupDate: pickupAddress.pickupDate || "",
      gstNumber: address.gstNumber || "",
    });

    const contactNo = getContactNo(address);
    if (contactNo) {
      setPhoneValidationErrors((prev) => ({
        ...prev,
        pickup: !isValidPhoneNumber(contactNo),
      }));
    }

    setValidationErrors((prev) => ({
      ...prev,
      pickup: {
        contactName: false,
        mobileNo: false,
        pincode: false,
        flatNo: false,
        locality: false,
        landmark: false,
        gstNumber: false,
        gstLength: false,
      },
    }));

    setPickupSearchQuery("");
    setShowPickupSearchResults(false);
    setPickupSearchResults([]);
  };

  const handleSelectDeliveryAddress = (address: Address) => {
    setDeliveryAddress({
      contact: {
        contactName: getName(address),
        mobileNo: getContactNo(address),
        emailId: getEmail(address),
        contactType: address.contact?.type || "",
      },
      flatNo: address.flatNo || "",
      locality: address.locality || "",
      landmark: address.landmark || "",
      city: address.city || "",
      state: address.state || "",
      country: address.country || "",
      pincode: address.pincodeStr || "",
      addressType: "",
      gstNumber: address.gstNumber || "",
    });

    const contactNo = getContactNo(address);
    if (contactNo) {
      setPhoneValidationErrors((prev) => ({
        ...prev,
        delivery: !isValidPhoneNumber(contactNo),
      }));
    }

    // Clear delivery validation errors when address is selected
    setValidationErrors((prev) => ({
      ...prev,
      delivery: {
        contactName: false,
        mobileNo: false,
        pincode: false,
        flatNo: false,
        locality: false,
        landmark: false,
        gstNumber: false,
        gstLength: false,
      },
    }));

    setDeliverySearchQuery("");
    setShowDeliverySearchResults(false);
    setDeliverySearchResults([]);
  };

  // Search results render function
  const renderSearchResults = (
    results: Address[],
    type: "pickup" | "delivery",
    isVisible: boolean,
    isLoading: boolean
  ) => {
    if (!isVisible) {
      return null;
    }

    return (
      <div
        className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
        onMouseDown={(e: React.MouseEvent) => e.preventDefault()} // Correct typing
      >
        {isLoading ? (
          <div className="p-3 flex justify-center items-center">
            <LoadingIcon /> <span className="ml-2">Searching...</span>
          </div>
        ) : results.length > 0 ? (
          <ul>
            {results.map((address, index) => (
              <li
                key={`${type}-${index}`}
                className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                onMouseDown={() => {
                  if (type === "pickup") {
                    handleSelectPickupAddress(address);
                  } else {
                    handleSelectDeliveryAddress(address);
                  }
                }}
              >
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{getName(address)}</span>
                    {address.isPin && (
                      <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">
                        Pinned
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-600">
                    {getContactNo(address)}
                  </span>
                  <span className="text-sm text-gray-600 truncate">
                    {address.flatNo} {address.locality} {address.landmark}
                  </span>
                  <span className="text-sm text-gray-600 truncate">
                    {address.city}, {address.state} {address.pincodeStr}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-4 text-center text-gray-500">
            No addresses found
          </div>
        )}
      </div>
    );
  };

  // API Functions (existing functions remain the same)
  const fetchOrderData = async (orderInfo: any) => {
    try {
      setIsLoading(true);
      const { data } = await POST(GET_SELLER_ORDER_COMPLETE_DATA, {
        tempOrderId: orderInfo?.orderId?.split("T")[1],
        awb: orderInfo?.awb || "0",
      });

      if (data?.status) {
        const sellerData = data.data[0].data[0];

        // Add this section for buyer confirmation logs
        const buyerConfirmationPayload = {
          orderId:
            sellerData?.status?.length == 0 ||
            sellerData?.status[0]?.currentStatus == "DRAFT" ||
            sellerData?.status[0]?.currentStatus == "FAILED"
              ? sellerData?.tempOrderId
              : sellerData?.orderId,
        };

        const buyerConfirmationOrder = await POST(
          GET_ORDER_CONFIRMATION_LOG,
          buyerConfirmationPayload
        );

        if (buyerConfirmationOrder?.data?.success) {
          setBuyerConfirmationLogs(buyerConfirmationOrder?.data?.data[0]?.data);
        }

        // Process box data to set collectible amount flags
        if (sellerData.boxInfo) {
          sellerData.boxInfo = sellerData.boxInfo.map((box: any) => {
            const apiCollectibleAmount = box.codInfo?.collectableAmount;

            return {
              ...box,
              codInfo: {
                ...box.codInfo,
                // Mark as manually edited if API provided a value
                isCollectibleManuallyEdited:
                  apiCollectibleAmount !== undefined &&
                  apiCollectibleAmount !== null &&
                  apiCollectibleAmount !== "",
                collectableAmount: apiCollectibleAmount,
                initializeFormData,
              },
            };
          });
        }

        setOrderData(sellerData);
        const hasAwb =
          orderInfo?.awb && orderInfo.awb !== "" && orderInfo.awb !== "0";
        setIsEnabled(hasAwb);

        initializeFormData(sellerData);
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
      toast.error("Failed to load order data");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBoxData = async () => {
    try {
      const { data } = await POST(GET_SELLER_BOX);
      if (data?.success) {
        setBoxDetailsData(data.data);
      }
    } catch (error) {
      console.error("Error fetching box data:", error);
    }
  };

  const fetchServiceList = async () => {
    try {
      setServiceLoading(true);
      const payload = {
        tempOrderId: orderData?.tempOrderId,
        source: orderData?.source,
      };

      const { data } = await POST(GET_COURIER_PARTNER_SERVICE, payload);
      if (data?.success) {
        const services = isMasked ? data?.data?.slice(0, 2) : data?.data;
        setServiceList(services);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Failed to load services");
    } finally {
      setServiceLoading(false);
    }
  };

  const fetchPincodeData = async (
    pincode: string,
    addressType: "pickup" | "delivery"
  ) => {
    if (pincode.length !== 6) return;

    try {
      const { data } = await POST(GET_PINCODE_DATA, { pincode });
      if (data?.success && data.data?.[0]) {
        const pincodeInfo = data.data[0];

        if (addressType === "pickup") {
          setPickupAddress((prev: any) => ({
            ...prev,
            city: pincodeInfo.city,
            state: pincodeInfo.state,
            country: pincodeInfo.country,
            pincode: pincodeInfo.pincode,
          }));
        } else {
          setDeliveryAddress((prev: any) => ({
            ...prev,
            city: pincodeInfo.city,
            state: pincodeInfo.state,
            country: pincodeInfo.country,
            pincode: pincodeInfo.pincode,
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching pincode data:", error);
    }
  };

  // Form Update Functions (existing functions remain the same)
  const updatePickupAddress = async () => {
    if (isEnabled) return;

    try {
      const payload = {
        pickupAddress: {
          contact: {
            name: pickupAddress.contact.contactName,
            mobileNo: pickupAddress.contact.mobileNo,
            emailId: pickupAddress.contact.emailId,
            type: pickupAddress.contact.contactType,
          },
          flatNo: pickupAddress.flatNo,
          locality: pickupAddress.locality,
          landmark: pickupAddress.landmark,
          city: pickupAddress.city,
          state: pickupAddress.state,
          country: pickupAddress.country,
          pincode: pickupAddress.pincode,
          fullAddress: `${pickupAddress.flatNo} ${pickupAddress.locality} ${pickupAddress.landmark} ${pickupAddress.city} ${pickupAddress.state} ${pickupAddress.country} ${pickupAddress.pincode}`,
          addressType: pickupAddress.addressType,
          pickupDate: pickupAddress.pickupDate,
          gstNumber: pickupAddress.gstNumber,
        },
        orderId: orderData?.orderId,
        tempOrderId: orderData?.tempOrderId,
        source: orderData?.source,
      };

      const { data } = await POST(UPDATE_TEMP_ORDER_INFO, payload);
      if (data?.status) {
        toast.success("Pickup address updated successfully");
        await fetchOrderData(getAllSellerData?.data);
      } else {
        toast.error(data?.message || "Failed to update pickup address");
      }
    } catch (error) {
      console.error("Error updating pickup address:", error);
      toast.error("Failed to update pickup address");
    }
  };

  const updateDeliveryAddress = async () => {
    if (isEnabled) return;

    try {
      const payload = {
        deliveryAddress: {
          contact: {
            name: deliveryAddress.contact.contactName,
            mobileNo: deliveryAddress.contact.mobileNo,
            emailId: deliveryAddress.contact.emailId,
            type: deliveryAddress.contact.contactType,
          },
          flatNo: deliveryAddress.flatNo,
          locality: deliveryAddress.locality,
          landmark: deliveryAddress.landmark,
          city: deliveryAddress.city,
          state: deliveryAddress.state,
          country: deliveryAddress.country,
          pincode: deliveryAddress.pincode,
          fullAddress: `${deliveryAddress.flatNo} ${deliveryAddress.locality} ${deliveryAddress.landmark} ${deliveryAddress.city} ${deliveryAddress.state} ${deliveryAddress.country} ${deliveryAddress.pincode}`,
          addressType: deliveryAddress.addressType,
          gstNumber: deliveryAddress.gstNumber,
        },
        orderId: orderData?.orderId,
        tempOrderId: orderData?.tempOrderId,
        source: orderData?.source,
      };

      const { data } = await POST(UPDATE_TEMP_ORDER_INFO, payload);
      if (data?.status) {
        toast.success("Delivery address updated successfully");
        await fetchOrderData(getAllSellerData?.data);
      } else {
        toast.error(data?.message || "Failed to update delivery address");
      }
    } catch (error) {
      console.error("Error updating delivery address:", error);
      toast.error("Failed to update delivery address");
    }
  };

  const updateService = async () => {
    if (isEnabled || serviceList.length === 0) return;

    try {
      const selectedService = serviceList[selectedServiceIndex];
      const payload = {
        partnerServiceId: selectedService.partnerServiceId,
        partnerServiceName: selectedService.partnerServiceName,
        companyServiceId: selectedService.companyServiceId,
        companyServiceName: selectedService.companyServiceName,
        tempOrderId: orderData?.tempOrderId,
        source: orderData?.source,
        category: "Service",
      };

      const { data } = await POST(SET_SERVICE_INFO, payload);
      if (data?.success) {
        toast.success("Service updated successfully");
        setIsServiceUpdated(true); // Add this line
      } else {
        toast.error(data?.message || "Failed to update service");
        setIsServiceUpdated(false); // Add this line
      }
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("Failed to update service");
      setIsServiceUpdated(false); // Add this line
    }
  };

  // const placeOrder = async () => {
  //   try {
  //     await updateService();

  //     const placeOrderPayload = {
  //       orders: [
  //         {
  //           orderId: orderData?.orderId,
  //           tempOrderId: orderData?.tempOrderId,
  //           source: orderData?.source,
  //         },
  //       ],
  //     };

  //     const { data } = await POST(POST_PLACE_ALL_ORDERS, placeOrderPayload);
  //     if (data?.success) {
  //       toast.success("Order placed successfully!");
  //     } else {
  //       toast.error(data?.message || "Failed to place order");
  //     }
  //   } catch (error) {
  //     console.error("Error placing order:", error);
  //     toast.error("Something went wrong while placing order");
  //   }
  // };

  //   const placeOrder = async () => {
  //   try {

  // Validate all required fields first
  // const addressesValid = validateAddresses();
  // const boxesProductsValid = validateBoxesAndProducts();

  // if (!addressesValid || !boxesProductsValid) {
  //   toast.error("Please fill in all required fields");
  //   return;
  // }
  //     // First update the order with all current data
  //     const updatePayload = buildCompletePayload();

  //     const { data: updateResponse } = await POST(UPDATE_TEMP_ORDER_INFO, updatePayload);

  //     if (!updateResponse?.status) {
  //       toast.error(updateResponse?.message || "Failed to update order");
  //       return;
  //     }

  //     // Then place the order (service is already updated via updateService)
  //     const placeOrderPayload = {
  //       orders: [
  //         {
  //           orderId: orderData?.orderId,
  //           tempOrderId: orderData?.tempOrderId,
  //           source: orderData?.source,
  //         },
  //       ],
  //     };

  //     const { data } = await POST(POST_PLACE_ALL_ORDERS, placeOrderPayload);
  //     if (data?.success) {
  //       toast.success("Order updated and placed successfully!");
  //     } else {
  //       toast.error(data?.message || "Failed to place order");
  //     }
  //   } catch (error) {
  //     console.error("Error updating and placing order:", error);
  //     toast.error("Something went wrong while updating and placing order");
  //   }
  // };
  const placeOrder = async () => {
    try {
      // Validate all required fields first
      const addressesValid = validateAddresses();
      const boxesProductsValid = validateBoxesAndProducts();
      const orderDetailsValid = validateOrderDetails();

      if (!addressesValid || !boxesProductsValid || !orderDetailsValid) {
        toast.error("Please fill in all required fields");
        return;
      }
      // Only update the order with all current data for testing
      const updatePayload = buildCompletePayload();

      const { data: updateResponse } = await POST(
        UPDATE_TEMP_ORDER_INFO,
        updatePayload
      );

      if (updateResponse?.status) {
        toast.success("Order updated successfully!");
      } else {
        toast.error(updateResponse?.message || "Failed to update order");
      }
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Something went wrong while updating order");
    }
  };

  const nextStep = async () => {
    // Prevent multiple simultaneous calls
    if (isNextLoading) {
      return;
    }
    try {
      setIsNextLoading(true); // Set loading state

      // Validate Order ID first via API
      const currentOrderId = orderData?.orderId?.trim() || "";
      let orderIdValid = true;

      if (currentOrderId && currentOrderId !== originalOrderId) {
        orderIdValid = await validateOrderId(currentOrderId);

        if (!orderIdValid) {
          toast.error("Please provide a valid and unique Order ID");
          return;
        }
      }
      // Validate all required fields first
      const addressesValid = validateAddresses();
      const boxesProductsValid = validateBoxesAndProducts();
      const orderDetailsValid = validateOrderDetails();

      if (!addressesValid || !boxesProductsValid || !orderDetailsValid) {
        toast.error("Please fill in all required fields");
        return;
      }

      // Update the order with all current data
      const updatePayload = buildCompletePayload();

      const { data: updateResponse } = await POST(
        UPDATE_TEMP_ORDER_INFO,
        updatePayload
      );

      if (updateResponse?.status) {
        toast.success("Order details saved successfully!");
        setOriginalOrderId(currentOrderId);

        setCurrentStep("serviceSelection");
      } else {
        toast.error(updateResponse?.message || "Failed to save order details");
      }
    } catch (error) {
      console.error("Error saving order details:", error);
      toast.error("Something went wrong while saving order details");
    } finally {
      setIsNextLoading(false); // Always reset loading state
    }
  };

  const backToOrderDetails = () => {
    setCurrentStep("orderDetails");
  };

  const onOrderPlaced = () => {
    toast.success("Order placed successfully!");
    if (getAllSellerData?.onClose) {
      getAllSellerData.onClose();
    }
  };

  // Initialization Functions
  const initializeFormData = (data: any) => {
    clearAllValidationErrors();
    // Store the original Order ID
    setOriginalOrderId(data.orderId || "");

    setPickupAddress({
      contact: {
        contactName: data.pickupAddress?.contact?.name || "",
        mobileNo: data.pickupAddress?.contact?.mobileNo || "",
        emailId: data.pickupAddress?.contact?.emailId || "",
        contactType: data.pickupAddress?.contact?.type || "",
      },
      flatNo: data.pickupAddress?.flatNo || "",
      locality: data.pickupAddress?.locality || "",
      landmark: data.pickupAddress?.landmark || "",
      city: data.pickupAddress?.city || "",
      state: data.pickupAddress?.state || "",
      country: data.pickupAddress?.country || "",
      pincode: data.pickupAddress?.pincode || "",
      addressType: data.pickupAddress?.addressType || "",
      pickupDate: data.pickupAddress?.pickupDate || "",
      gstNumber: data.pickupAddress?.gstNumber || "",
    });

    setDeliveryAddress({
      contact: {
        contactName: data.deliveryAddress?.contact?.name || "",
        mobileNo: data.deliveryAddress?.contact?.mobileNo || "",
        emailId: data.deliveryAddress?.contact?.emailId || "",
        contactType: data.deliveryAddress?.contact?.type || "",
      },
      flatNo: data.deliveryAddress?.flatNo || "",
      locality: data.deliveryAddress?.locality || "",
      landmark: data.deliveryAddress?.landmark || "",
      city: data.deliveryAddress?.city || "",
      state: data.deliveryAddress?.state || "",
      country: data.deliveryAddress?.country || "",
      pincode: data.deliveryAddress?.pincode || "",
      addressType: data.deliveryAddress?.addressType || "",
      gstNumber: data.deliveryAddress?.gstNumber || "",
    });

    // Ensure boxInfo has proper IDs
    if (data.boxInfo) {
      const updatedBoxInfo = data.boxInfo.map((box: any) => ({
        ...box,
        boxId: box.boxId || uuidv4(),
        products:
          box.products?.map((product: any) => ({
            ...product,
            productId: product.productId || uuidv4(),
            variantId: product.variantId || uuidv4(),
          })) || [],
      }));

      setOrderData((prev: any) => ({
        ...prev,
        boxInfo: updatedBoxInfo,
      }));
    }
  };

  // Validation Functions (existing functions remain the same)
  const validatePickupAddress = (): boolean => {
    const errors: ValidationErrors = {};

    if (!pickupAddress.contact.contactName.trim()) {
      errors.pickupContactName = "Contact name is required";
    }

    if (!validateMobile(pickupAddress.contact.mobileNo)) {
      errors.pickupMobileNo = "Invalid mobile number";
    }

    if (
      pickupAddress.contact.emailId &&
      !validateEmail(pickupAddress.contact.emailId)
    ) {
      errors.pickupEmailId = "Invalid email address";
    }

    if (!pickupAddress.flatNo.trim()) {
      errors.pickupFlatNo = "Flat/House number is required";
    }

    if (!validatePincode(pickupAddress.pincode)) {
      errors.pickupPincode = "Invalid pincode";
    }

    setValidationErrors((prev) => ({ ...prev, ...errors }));
    return Object.keys(errors).length === 0;
  };

  const validateDeliveryAddress = (): boolean => {
    const errors: ValidationErrors = {};

    if (!deliveryAddress.contact.contactName.trim()) {
      errors.deliveryContactName = "Contact name is required";
    }

    if (!validateMobile(deliveryAddress.contact.mobileNo)) {
      errors.deliveryMobileNo = "Invalid mobile number";
    }

    if (
      deliveryAddress.contact.emailId &&
      !validateEmail(deliveryAddress.contact.emailId)
    ) {
      errors.deliveryEmailId = "Invalid email address";
    }

    if (!deliveryAddress.flatNo.trim()) {
      errors.deliveryFlatNo = "Flat/House number is required";
    }

    if (!validatePincode(deliveryAddress.pincode)) {
      errors.deliveryPincode = "Invalid pincode";
    }

    setValidationErrors((prev) => ({ ...prev, ...errors }));
    return Object.keys(errors).length === 0;
  };

  // Event Handlers
  const handlePickupDateChange = (selectedDate: Date) => {
    if (selectedDate.getHours() === 0 && selectedDate.getMinutes() === 0) {
      setOpenPickupDatePicker(true);
      return;
    }

    setPickupAddress((prev: any) => ({
      ...prev,
      pickupDate: selectedDate.getTime(),
    }));
    setOpenPickupDatePicker(false);
  };

  const handlePincodeChange = (value: string, type: "pickup" | "delivery") => {
    const numericValue = value.replace(/\D/g, "");

    if (type === "pickup") {
      setPickupAddress((prev: any) => ({ ...prev, pincode: numericValue }));
    } else {
      setDeliveryAddress((prev: any) => ({ ...prev, pincode: numericValue }));
    }

    if (numericValue.length === 6) {
      fetchPincodeData(numericValue, type);
    }
  };

  // Effects

  // Additionally, add this useEffect to automatically set orderType to B2C if businessType is INDIVIDUAL
  useEffect(() => {
    const sellerSession = getSellerSession();
    if (
      sellerSession?.businessType === "INDIVIDUAL" &&
      orderData?.orderType === "B2B"
    ) {
      setOrderData((prev: any) => ({
        ...prev,
        orderType: "B2C",
      }));
      toast.success(
        "Order type changed to B2C as individual  can only create B2C orders"
      );
    }
  }, [orderData?.orderType]);

  // Add this useEffect after the existing useEffects
  // useEffect(() => {
  //   if (orderData?.boxInfo) {
  //     const totalInvoiceValue = calculateTotalInvoiceValue();
  //     const totalCollectableAmount = calculateTotalCollectableAmount();

  //     setOrderData((prevData: any) => ({
  //       ...prevData,
  //       codInfo: {
  //         ...prevData.codInfo,
  //         invoiceValue: totalInvoiceValue,
  //         collectableAmount: totalCollectableAmount,
  //       },
  //     }));
  //   }
  // }, [orderData?.boxInfo, orderData?.codInfo?.isCod]);
  useEffect(() => {
    if (orderData?.boxInfo) {
      setOrderData((prevData: any) => {
        const updatedData = { ...prevData };
        const updatedBoxInfo = [...updatedData.boxInfo];
        let hasChanges = false;

        updatedBoxInfo.forEach((box: any, index: number) => {
          const correctInvoiceValue = getBoxInvoiceValue(
            box,
            updatedData.source
          );

          // Only update if the value is different
          if (box.codInfo?.invoiceValue !== correctInvoiceValue) {
            updatedBoxInfo[index] = {
              ...box,
              codInfo: {
                ...box.codInfo,
                invoiceValue: correctInvoiceValue,
              },
            };
            hasChanges = true;
          }
        });

        if (hasChanges) {
          const totalInvoiceValue = calculateTotalInvoiceValue();
          const totalCollectableAmount = calculateTotalCollectableAmount();

          return {
            ...updatedData,
            boxInfo: updatedBoxInfo,
            codInfo: {
              ...updatedData.codInfo,
              invoiceValue: totalInvoiceValue,
              collectableAmount: totalCollectableAmount,
            },
          };
        }

        return prevData;
      });
    }
  }, [orderData?.boxInfo, orderData?.source]);

  useEffect(() => {
    if (orderData?.codInfo?.isCod && orderData?.boxInfo) {
      setOrderData((prevData: any) => {
        const updatedData = { ...prevData };
        const updatedBoxInfo = [...updatedData.boxInfo];

        updatedBoxInfo.forEach((box: any, boxIndex: number) => {
          // Only initialize if not manually edited
          if (!box.codInfo?.isCollectibleManuallyEdited) {
            const totalPrice = calculateBoxTotalPrice(box);
            box.codInfo = {
              ...box.codInfo,
              collectableAmount: totalPrice,
              isCollectibleManuallyEdited: false,
            };
          }
        });

        updatedData.boxInfo = updatedBoxInfo;
        return updatedData;
      });
    }
  }, [orderData?.codInfo?.isCod]);

  // Add effect to reset collectible amounts when switching from COD to Prepaid
  useEffect(() => {
    if (!orderData?.codInfo?.isCod && orderData?.boxInfo) {
      setOrderData((prevData: any) => {
        const updatedData = { ...prevData };
        const updatedBoxInfo = [...updatedData.boxInfo];

        updatedBoxInfo.forEach((box: any) => {
          box.codInfo = {
            ...box.codInfo,
            collectableAmount: 0,
            isCollectibleManuallyEdited: false,
          };
        });

        updatedData.boxInfo = updatedBoxInfo;
        return updatedData;
      });
    }
  }, [orderData?.codInfo?.isCod]);

  useEffect(() => {
    const totalValue = calculateTotalProductValue();
    if (totalValue < 50000) {
      // Clear e-way bill validation error if total is below threshold
      clearOrderDetailValidationError("eWayBillNo");
    }
  }, [orderData?.boxInfo]);
  useEffect(() => {
    if (orderData?.boxInfo) {
      clearBoxAndProductValidationErrors(orderData.boxInfo);
    }
  }, [orderData?.boxInfo]);

  useEffect(() => {
    setIsProductEditingAllowed(isSourceEditable(orderData?.source || ""));
  }, [orderData?.source]);

  useEffect(() => {
    setIsServiceUpdated(false);
  }, [serviceList]);
  useEffect(() => {
    if (getAllSellerData?.isOpen && getAllSellerData?.data) {
      fetchOrderData(getAllSellerData.data);
      fetchBoxData();
    }
  }, [getAllSellerData]);

  // useEffect(() => {
  //   fetchServiceList();
  //   isFirstRender.current = false;
  // }, [orderData]);

  // Effect to handle click outside search results
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Handle product search results
      Object.keys(showProductSearchResults).forEach((key) => {
        if (
          productSearchRefs.current[key] &&
          !productSearchRefs.current[key]?.contains(event.target as Node)
        ) {
          setShowProductSearchResults((prev) => ({
            ...prev,
            [key]: false,
          }));
        }
      });

      // Handle box search results
      Object.keys(showBoxSearchResults).forEach((key) => {
        if (
          boxSearchRefs.current[key] &&
          !boxSearchRefs.current[key]?.contains(event.target as Node)
        ) {
          setShowBoxSearchResults((prev) => ({
            ...prev,
            [key]: false,
          }));
        }
      });
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProductSearchResults, showBoxSearchResults]);

  useEffect(() => {
    // If transit is REVERSE and COD is selected, automatically switch to prepaid
    if (orderData?.transit === "REVERSE" && orderData?.codInfo?.isCod) {
      setOrderData((prev: any) => ({
        ...prev,
        codInfo: {
          ...prev.codInfo,
          isCod: false,
          collectableAmount: 0, // Reset collectible amount for prepaid
        },
      }));

      // Also update all boxes to set collectible amount to 0
      if (orderData?.boxInfo) {
        setOrderData((prev: any) => ({
          ...prev,
          boxInfo: prev.boxInfo.map((box: any) => ({
            ...box,
            codInfo: {
              ...box.codInfo,
              isCod: false,
              collectableAmount: 0,
            },
          })),
        }));
      }
    }
  }, [orderData?.transit, orderData?.codInfo?.isCod]);

  // Updated renderPickupAddressForm function with search
  const renderPickupAddressForm = () => (
    <div className="space-y-4 p-4">
      {/* Search Input */}
      {!isEnabled && (
        <div className="relative">
          <FloatingLabelInput
            placeholder="Search pickup addresses..."
            icon={searchLoading.pickup ? <LoadingIcon /> : <SearchIcon />}
            value={pickupSearchQuery}
            onChangeCallback={handlePickupSearchChange}
            onFocus={handlePickupSearchFocus}
            onBlur={handlePickupSearchBlur}
            readOnly={isEnabled}
          />
          {renderSearchResults(
            pickupSearchResults,
            "pickup",
            showPickupSearchResults,
            searchLoading.pickup
          )}
        </div>
      )}

      {/* Row 1: Contact (Mobile), Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FloatingLabelInput
          placeholder="Contact"
          type="tel"
          value={String(pickupAddress?.contact?.mobileNo || "")}
          // onChangeCallback={(value) => {
          //   const numericValue = value.replace(/\D/g, "");
          //   setPickupAddress((prev: any) => ({
          //     ...prev,
          //     contact: { ...prev.contact, mobileNo: numericValue },
          //   }));
          // }}
          onChangeCallback={(value) => {
            const numericValue = value.replace(/\D/g, "");
            setPickupAddress((prev: any) => ({
              ...prev,
              contact: { ...prev.contact, mobileNo: numericValue },
            }));

            // Add phone validation
            const isValid = value.length === 0 || isValidPhoneNumber(value);
            setPhoneValidationErrors((prev) => ({
              ...prev,
              pickup: !isValid,
            }));
            clearValidationError("pickup", "mobileNo");
          }}
          maxLength={10}
          readOnly={isEnabled}
          required
          error={
            phoneValidationErrors.pickup || validationErrors.pickup.mobileNo
          }
          errorMessage={
            phoneValidationErrors.pickup
              ? "Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9"
              : "Contact number is required"
          }
        />

        <FloatingLabelInput
          placeholder="Name"
          value={pickupAddress.contact.contactName}
          onChangeCallback={(value) => {
            setPickupAddress((prev: any) => ({
              ...prev,
              contact: { ...prev.contact, contactName: value },
            }));
            clearValidationError("pickup", "contactName");
          }}
          readOnly={isEnabled}
          required
          error={validationErrors.pickup.contactName}
          errorMessage="Name is required"
        />
      </div>

      {/* Row 2: Pin code, Address Line 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FloatingLabelInput
          placeholder="Pin code"
          value={String(pickupAddress?.pincode || "")}
          // onChangeCallback={(value) => handlePincodeChange(value, "pickup")}
          onChangeCallback={(value) => {
            handlePincodeChange(value, "pickup");
            clearValidationError("pickup", "pincode");
          }}
          maxLength={6}
          isPincodeField
          readOnly={isEnabled}
          required
          error={validationErrors.pickup.pincode}
          errorMessage="Pin code is required"
        />

        <FloatingLabelInput
          placeholder="Address Line 1"
          value={pickupAddress.flatNo}
          onChangeCallback={(value) => {
            setPickupAddress((prev: any) => ({ ...prev, flatNo: value }));
            clearValidationError("pickup", "flatNo");
          }}
          readOnly={isEnabled}
          required
          error={validationErrors.pickup.flatNo}
          errorMessage="Address Line 1 is required"
        />
      </div>

      {/* Row 3: Address Line 2, Landmark */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FloatingLabelInput
          placeholder="Address Line 2"
          value={pickupAddress.locality}
          onChangeCallback={(value) => {
            setPickupAddress((prev: any) => ({ ...prev, locality: value }));
            clearValidationError("pickup", "locality");
          }}
          readOnly={isEnabled}
          required
          error={validationErrors.pickup.locality}
          errorMessage="Address Line 2 is required"
        />

        <FloatingLabelInput
          placeholder="Landmark"
          value={pickupAddress.landmark}
          onChangeCallback={(value) => {
            setPickupAddress((prev: any) => ({ ...prev, landmark: value }));
            clearValidationError("pickup", "landmark");
          }}
          readOnly={isEnabled}
          required
          error={validationErrors.pickup.landmark}
          errorMessage="Landmark is required"
        />
      </div>

      {/* Row 4: City, State */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FloatingLabelInput
          placeholder="City"
          value={pickupAddress.city}
          readOnly
        />

        <FloatingLabelInput
          placeholder="State"
          value={pickupAddress.state}
          readOnly
        />
      </div>

      {/* Row 5: GST No, Email ID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FloatingLabelInput
          // placeholder={
          //   orderData?.orderType === "B2B"
          //     ? "GST No (required)"
          //     : "GST No (If Available)"
          // }
          placeholder="GST No (Optional)"
          value={pickupAddress?.gstNumber || ""}
          // onChangeCallback={(value) => {
          //   setPickupAddress((prev: any) => ({ ...prev, gstNumber: value }));
          //   clearValidationError("pickup", "gstNumber");
          // }}
          onChangeCallback={(value) => {
            setPickupAddress((prev: any) => ({ ...prev, gstNumber: value }));
            // Clear GST validation errors when user starts typing
            setValidationErrors((prev) => ({
              ...prev,
              pickup: {
                ...prev.pickup,
                gstLength: false,
              },
            }));
          }}
          readOnly={isEnabled}
          required={orderData?.orderType === "B2B"}
          error={validationErrors.pickup.gstLength}
          // errorMessage="GST No is required for B2B orders"
          errorMessage="Please enter a valid 15-character GST number"
        />

        <FloatingLabelInput
          placeholder="Email ID (Optional)"
          type="email"
          value={pickupAddress.contact.emailId}
          onChangeCallback={(value) => {
            setPickupAddress((prev: any) => ({
              ...prev,
              contact: { ...prev.contact, emailId: value },
            }));
          }}
          readOnly={isEnabled}
        />
      </div>

      {/* {!isEnabled && (
        <div className="flex justify-end mt-4">
          <OneButton
            text="Update Pickup Address"
            onClick={() => {
              if (validatePickupAddress()) {
                updatePickupAddress();
              }
            }}
            variant="primary"
          />
        </div>
      )} */}
    </div>
  );

  // Updated renderDeliveryAddressForm function with search
  const renderDeliveryAddressForm = () => (
    <div className="space-y-4 p-4">
      {/* Search Input */}
      {!isEnabled && (
        <div className="relative">
          <FloatingLabelInput
            placeholder="Search delivery addresses..."
            icon={searchLoading.delivery ? <LoadingIcon /> : <SearchIcon />}
            value={deliverySearchQuery}
            onChangeCallback={handleDeliverySearchChange}
            onFocus={handleDeliverySearchFocus}
            onBlur={handleDeliverySearchBlur}
            readOnly={isEnabled}
          />
          {renderSearchResults(
            deliverySearchResults,
            "delivery",
            showDeliverySearchResults,
            searchLoading.delivery
          )}
        </div>
      )}

      {/* Row 1: Contact (Mobile), Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FloatingLabelInput
          placeholder="Contact"
          type="number"
          value={String(deliveryAddress?.contact?.mobileNo || "")}
          // onChangeCallback={(value) => {
          //   const numericValue = value.replace(/\D/g, "");
          //   setDeliveryAddress((prev: any) => ({
          //     ...prev,
          //     contact: { ...prev.contact, mobileNo: numericValue },
          //   }));
          // }}
          onChangeCallback={(value) => {
            const numericValue = value.replace(/\D/g, "");
            setDeliveryAddress((prev: any) => ({
              ...prev,
              contact: { ...prev.contact, mobileNo: numericValue },
            }));

            // Add phone validation
            const isValid = value.length === 0 || isValidPhoneNumber(value);
            setPhoneValidationErrors((prev) => ({
              ...prev,
              delivery: !isValid,
            }));
            clearValidationError("delivery", "mobileNo");
          }}
          maxLength={10}
          readOnly={isEnabled}
          required
          error={
            validationErrors.delivery.mobileNo || phoneValidationErrors.delivery
          }
          errorMessage={
            phoneValidationErrors.delivery
              ? "Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9"
              : "Contact number is required"
          }
        />

        <FloatingLabelInput
          placeholder="Name"
          value={deliveryAddress.contact.contactName}
          onChangeCallback={(value) => {
            setDeliveryAddress((prev: any) => ({
              ...prev,
              contact: { ...prev.contact, contactName: value },
            }));
            clearValidationError("delivery", "contactName");
          }}
          readOnly={isEnabled}
          required
          error={validationErrors.delivery.contactName}
          errorMessage="Name is required"
        />
      </div>

      {/* Row 2: Pin code, Address Line 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FloatingLabelInput
          placeholder="Pin code"
          value={String(deliveryAddress.pincode || "")}
          // onChangeCallback={(value) => handlePincodeChange(value, "delivery")}
          onChangeCallback={(value) => {
            handlePincodeChange(value, "delivery");
            clearValidationError("delivery", "pincode");
          }}
          maxLength={6}
          isPincodeField
          readOnly={isEnabled}
          required
          error={validationErrors.delivery.pincode}
          errorMessage="Pin code is required"
        />

        <FloatingLabelInput
          placeholder="Address Line 1"
          value={deliveryAddress.flatNo}
          onChangeCallback={(value) => {
            setDeliveryAddress((prev: any) => ({ ...prev, flatNo: value }));
            clearValidationError("delivery", "flatNo");
          }}
          readOnly={isEnabled}
          required
          error={validationErrors.delivery.flatNo}
          errorMessage="Address Line 1 is required"
        />
      </div>

      {/* Row 3: Address Line 2, Landmark */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FloatingLabelInput
          placeholder="Address Line 2"
          value={deliveryAddress.locality}
          onChangeCallback={(value) => {
            setDeliveryAddress((prev: any) => ({ ...prev, locality: value }));
            clearValidationError("delivery", "locality");
          }}
          readOnly={isEnabled}
          required
          error={validationErrors.delivery.locality}
          errorMessage="Address Line 2 is required"
        />

        <FloatingLabelInput
          placeholder="Landmark"
          value={deliveryAddress.landmark}
          onChangeCallback={(value) => {
            setDeliveryAddress((prev: any) => ({ ...prev, landmark: value }));
            clearValidationError("delivery", "landmark");
          }}
          readOnly={isEnabled}
          required
          error={validationErrors.delivery.landmark}
          errorMessage="Landmark is required"
        />
      </div>

      {/* Row 4: City, State */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FloatingLabelInput
          placeholder="City"
          value={deliveryAddress.city}
          readOnly
        />

        <FloatingLabelInput
          placeholder="State"
          value={deliveryAddress.state}
          readOnly
        />
      </div>

      {/* Row 5: GST No, Email ID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FloatingLabelInput
          // placeholder={
          //   orderData?.orderType === "B2B"
          //     ? "GST No (required)"
          //     : "GST No (If Available)"
          // }
          placeholder="GST No (Optional)"
          value={deliveryAddress.gstNumber}
          // onChangeCallback={(value) => {
          //   setDeliveryAddress((prev: any) => ({ ...prev, gstNumber: value }));
          //   clearValidationError("delivery", "gstNumber");
          // }}
          onChangeCallback={(value) => {
            setDeliveryAddress((prev: any) => ({ ...prev, gstNumber: value }));
            // Clear GST validation errors when user starts typing
            setValidationErrors((prev) => ({
              ...prev,
              delivery: {
                ...prev.delivery,
                gstLength: false,
              },
            }));
          }}
          readOnly={isEnabled}
          required={orderData?.orderType === "B2B"}
          error={validationErrors.delivery.gstLength}
          // errorMessage="GST No is required for B2B orders"
          errorMessage="Please enter a valid 15-character GST number"
        />

        <FloatingLabelInput
          placeholder="Email ID (Optional)"
          type="email"
          value={deliveryAddress.contact.emailId}
          onChangeCallback={(value) => {
            setDeliveryAddress((prev: any) => ({
              ...prev,
              contact: { ...prev.contact, emailId: value },
            }));
          }}
          readOnly={isEnabled}
        />
      </div>

      {/* {!isEnabled && (
        <div className="flex justify-end mt-4">
          <OneButton
            text="Update Delivery Address"
            onClick={() => {
              if (validateDeliveryAddress()) {
                updateDeliveryAddress();
              }
            }}
            variant="primary"
          />
        </div>
      )} */}
    </div>
  );

  // Updated renderBoxAndProducts function with enhanced box management
  //   const renderBoxAndProducts = () => (
  //     <div className="space-y-4 p-4">
  //       {orderData?.boxInfo?.map((box: any, boxIndex: number) => {
  //         const totalPrice = calculateBoxTotalPrice(box);

  //         // Determine the collectible amount to display
  //         // const getCollectibleAmount = () => {
  //         //   if (box.codInfo?.isCollectibleManuallyEdited) {
  //         //     // Use the stored value (could be 0, empty string, or any other value)
  //         //     return box.codInfo?.collectableAmount?.toString() || "";
  //         //   } else {
  //         //     // Use calculated total price as default
  //         //     return totalPrice.toString();
  //         //   }
  //         // };

  //         // Update the getCollectibleAmount function to handle initialization better
  //         const getCollectibleAmount = (box: any, totalPrice: number) => {
  //           // If COD is not enabled, return empty string
  //           if (!orderData?.codInfo?.isCod) {
  //             return "";
  //           }

  //           // If manually edited, use the stored value
  //           if (box.codInfo?.isCollectibleManuallyEdited) {
  //             // Handle the case where collectableAmount might be 0 or empty string
  //             const storedAmount = box.codInfo?.collectableAmount;
  //             return storedAmount !== undefined && storedAmount !== null
  //               ? storedAmount.toString()
  //               : "";
  //           } else {
  //             // Use calculated total price as default
  //             return totalPrice.toString();
  //           }
  //         };

  //         const collectableAmount = getCollectibleAmount(box, totalPrice);

  //         return (
  //           <Collapsible
  //             key={boxIndex}
  //             title={`Box ${boxIndex + 1}: ${box.name}`}
  //             defaultOpen={boxIndex === 0}
  //             className="border-2 border-gray-200"
  //             titleClassName="bg-gray-50 hover:bg-gray-100 transition-colors"
  //             contentClassName="bg-white"
  //           >
  //             <div className="space-y-4 mt-4">
  //               {/* Box Details */}
  //               <div className="flex flex-col md:flex-row items-start gap-4">
  //                 <div
  //                   className="!w-full relative"
  //                   ref={(el) => {
  //                     const searchKey = `${boxIndex}`;
  //                     boxSearchRefs.current[searchKey] = el;
  //                   }}
  //                 >
  //                   <FloatingLabelInput
  //                     placeholder="Box Name"
  //                     value={(() => {
  //                       const searchKey = `${boxIndex}`;
  //                       return boxSearchQueries[searchKey] !== undefined
  //                         ? boxSearchQueries[searchKey]
  //                         : box.name || "";
  //                     })()}
  //                     // onChangeCallback={(value) =>
  //                     //   handleBoxNameSearch(boxIndex, value)
  //                     // }
  //                     onChangeCallback={(value) => {
  //                       handleBoxNameSearch(boxIndex, value);
  //                       clearValidationError("boxes", "name", boxIndex);
  //                     }}
  //                     onFocus={() => handleBoxSearchFocus(boxIndex)}
  //                     onBlur={() => handleBoxSearchBlur(boxIndex)}
  //                     readOnly={isEnabled}
  //                     icon={
  //                       boxSearchLoading[`${boxIndex}`] ? (
  //                         <LoadingIcon />
  //                       ) : (
  //                         <SearchIcon />
  //                       )
  //                     }
  //                     required
  //                     error={validationErrors.boxes[boxIndex]?.name}
  //                     errorMessage="Box name is required"
  //                   />
  //                   {renderBoxSearchResults(boxIndex)}
  //                 </div>
  //                 {!isEnabled && orderData?.boxInfo?.length > 1 && (
  //                   <div className="flex justify-end mb-4">
  //                     <button
  //                       onClick={() => deleteBox(boxIndex)}
  //                       className="text-red-500 hover:text-red-700 p-2 rounded-md hover:bg-red-50 flex items-center gap-2 border border-red-200 mt-1"
  //                       title="Delete Box"
  //                     >
  //                       <svg
  //                         width="24"
  //                         height="24"
  //                         viewBox="0 0 24 24"
  //                         fill="none"
  //                         stroke="currentColor"
  //                         strokeWidth="2"
  //                       >
  //                         <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c0 1 1 2 2 2v2" />
  //                       </svg>
  //                     </button>
  //                   </div>
  //                 )}
  //               </div>

  //               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-1 rounded-lg">
  //                 <FloatingLabelInput
  //                   placeholder="Weight (kg)"
  //                   type="number"
  //                   value={box.deadWeight?.toString() || ""}
  //                   onChangeCallback={(value) =>
  //                     updateBox(boxIndex, "deadWeight", parseFloat(value) || 0)
  //                   }
  //                   readOnly={isEnabled}
  //                 />

  //                 <FloatingLabelInput
  //                   placeholder="L (cm)"
  //                   type="number"
  //                   value={box.length?.toString() || ""}
  //                   onChangeCallback={(value) => {
  //                     updateBox(boxIndex, "length", parseFloat(value) || 0);
  //                     clearValidationError("boxes", "length", boxIndex);
  //                   }}
  //                   required
  //                   readOnly={isEnabled}
  //                   error={validationErrors.boxes[boxIndex]?.length}
  //                   errorMessage="Length is required"
  //                 />

  //                 <FloatingLabelInput
  //                   placeholder="B (cm)"
  //                   type="number"
  //                   value={box.breadth?.toString() || ""}
  //                   onChangeCallback={(value) => {
  //                     updateBox(boxIndex, "breadth", parseFloat(value) || 0);
  //                     clearValidationError("boxes", "breadth", boxIndex);
  //                   }}
  //                   readOnly={isEnabled}
  //                   required
  //                   error={validationErrors.boxes[boxIndex]?.breadth}
  //                   errorMessage="Breadth is required"
  //                 />

  //                 <FloatingLabelInput
  //                   placeholder="H (cm)"
  //                   type="number"
  //                   value={box.height?.toString() || ""}
  //                   onChangeCallback={(value) => {
  //                     updateBox(boxIndex, "height", parseFloat(value) || 0);
  //                     clearValidationError("boxes", "height", boxIndex);
  //                   }}
  //                   readOnly={isEnabled}
  //                   required
  //                   error={validationErrors.boxes[boxIndex]?.height}
  //                   errorMessage="Height is required"
  //                 />
  //               </div>

  //               {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-1  rounded-lg">
  //   <div className="relative">
  //     <FloatingLabelInput
  //       placeholder="Total Price (₹)"
  //       type="number"
  //       value={totalPrice.toFixed(2)}
  //       readOnly={true}
  //     />
  //   </div>

  //   {orderData?.codInfo?.isCod && (
  //     <FloatingLabelInput
  //       placeholder="Collectible Amount (₹)"
  //       type="number"
  //       value={getCollectibleAmount(box, totalPrice)}
  //       onChangeCallback={(value) => {
  //         // Allow empty string or convert to number
  //         const numericValue =
  //           value === "" ? "" : parseFloat(value) || 0;
  //         updateBox(boxIndex, "collectableAmount", numericValue);
  //       }}
  //       readOnly={isEnabled}
  //     />
  //   )}
  // </div> */}

  //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-1 rounded-lg">
  //                 {/* Quantity Input */}
  //                 <FloatingLabelInput
  //                   placeholder="Quantity"
  //                   type="number"
  //                   value={box.qty?.toString() || ""}
  //                   onChangeCallback={(value) => {
  //                     updateBox(boxIndex, "qty", parseFloat(value) || 0);
  //                   }}
  //                   readOnly={
  //                     isEnabled || !isProductEditingAllowed || !isNotApiSource
  //                   }
  //                   required
  //                 />

  //                 {/* Collectible Amount (Editable) */}
  //                 {orderData?.codInfo?.isCod && (
  //                   <FloatingLabelInput
  //                     placeholder="Collectible Amount (₹)"
  //                     type="number"
  //                     value={getCollectibleAmount(box, totalPrice)}
  //                     onChangeCallback={(value) => {
  //                       // Allow empty string or convert to number
  //                       const numericValue =
  //                         value === "" ? "" : parseFloat(value) || 0;
  //                       updateBox(boxIndex, "collectableAmount", numericValue);
  //                     }}
  //                     readOnly={isEnabled}
  //                   />
  //                 )}
  //               </div>

  //               {/* Total Price row - moved below */}
  //               <div className="grid grid-cols-1 gap-4 p-1 rounded-lg">
  //                 <div className="relative">
  //                   <FloatingLabelInput
  //                     placeholder="Total Price (₹)"
  //                     type="number"
  //                     value={totalPrice.toFixed(2)}
  //                     readOnly={true}
  //                   />
  //                 </div>
  //               </div>

  //               {/* Products Section */}
  //               {box.products && box.products.length > 0 && (
  //                 <div className="space-y-3">
  //                   <div className="space-y-2 mb-2">
  //                     {box.products.map((product: any, productIndex: number) => (
  //                       <Collapsible
  //                         key={`${boxIndex}-${productIndex}`}
  //                         title={`Product ${productIndex + 1}: ${
  //                           product.name || "Unnamed Product"
  //                         }`}
  //                         defaultOpen={false}
  //                         className="border border-gray-300 !shadow-none"
  //                         titleClassName="bg-blue-50 hover:bg-blue-100 transition-colors text-sm !shadow-none"
  //                         contentClassName="bg-gray-50 !shadow-none"
  //                       >
  //                         <div className="p-4 space-y-4">
  //                           {/* Product Name with Search */}
  //                           <div className="flex items-start gap-x-4">
  //                             <div
  //                               className="flex-1 relative"
  //                               ref={(el) => {
  //                                 const searchKey = `${boxIndex}-${productIndex}`;
  //                                 productSearchRefs.current[searchKey] = el;
  //                               }}
  //                             >
  //                               {/* <FloatingLabelInput
  //                                 placeholder="Product Name"
  //                                 value={(() => {
  //                                   const searchKey = `${boxIndex}-${productIndex}`;
  //                                   return productSearchQueries[searchKey] !==
  //                                     undefined
  //                                     ? productSearchQueries[searchKey]
  //                                     : product.name || "";
  //                                 })()}
  //                                 onChangeCallback={(value) => {
  //                                   handleProductNameSearch(
  //                                     boxIndex,
  //                                     productIndex,
  //                                     value
  //                                   );
  //                                   clearValidationError(
  //                                     "products",
  //                                     "name",
  //                                     boxIndex,
  //                                     productIndex
  //                                   );
  //                                 }}
  //                                 onFocus={() =>
  //                                   handleProductSearchFocus(
  //                                     boxIndex,
  //                                     productIndex
  //                                   )
  //                                 }
  //                                 onBlur={() =>
  //                                   handleProductSearchBlur(
  //                                     boxIndex,
  //                                     productIndex
  //                                   )
  //                                 }
  //                                 readOnly={isEnabled || !isProductEditingAllowed}
  //                                 icon={
  //                                   productSearchLoading[
  //                                     `${boxIndex}-${productIndex}`
  //                                   ] ? (
  //                                     <LoadingIcon />
  //                                   ) : (
  //                                     <SearchIcon />
  //                                   )
  //                                 }
  //                                 required
  //                                 error={
  //                                   validationErrors.products[
  //                                     `${boxIndex}-${productIndex}`
  //                                   ]?.name
  //                                 }
  //                                 errorMessage="Product name is required"
  //                               /> */}
  //                               <FloatingLabelInput
  //                                 placeholder="Product Name"
  //                                 value={(() => {
  //                                   // For restricted sources, show only the product name without search query
  //                                   if (!isProductEditingAllowed) {
  //                                     return product.name || "";
  //                                   }
  //                                   const searchKey = `${boxIndex}-${productIndex}`;
  //                                   return productSearchQueries[searchKey] !==
  //                                     undefined
  //                                     ? productSearchQueries[searchKey]
  //                                     : product.name || "";
  //                                 })()}
  //                                 onChangeCallback={(value) => {
  //                                   if (isProductEditingAllowed) {
  //                                     handleProductNameSearch(
  //                                       boxIndex,
  //                                       productIndex,
  //                                       value
  //                                     );
  //                                     clearValidationError(
  //                                       "products",
  //                                       "name",
  //                                       boxIndex,
  //                                       productIndex
  //                                     );
  //                                   }
  //                                 }}
  //                                 onFocus={() =>
  //                                   isProductEditingAllowed
  //                                     ? handleProductSearchFocus(
  //                                         boxIndex,
  //                                         productIndex
  //                                       )
  //                                     : null
  //                                 }
  //                                 onBlur={() =>
  //                                   isProductEditingAllowed
  //                                     ? handleProductSearchBlur(
  //                                         boxIndex,
  //                                         productIndex
  //                                       )
  //                                     : null
  //                                 }
  //                                 readOnly={isEnabled || !isProductEditingAllowed} // Update readonly condition
  //                                 icon={
  //                                   // Hide search icon for restricted sources
  //                                   !isProductEditingAllowed ? null : productSearchLoading[
  //                                       `${boxIndex}-${productIndex}`
  //                                     ] ? (
  //                                     <LoadingIcon />
  //                                   ) : (
  //                                     <SearchIcon />
  //                                   )
  //                                 }
  //                                 required
  //                                 error={
  //                                   validationErrors.products[
  //                                     `${boxIndex}-${productIndex}`
  //                                   ]?.name
  //                                 }
  //                                 errorMessage="Product name is required"
  //                               />
  //                               {renderProductSearchResults &&
  //                                 renderProductSearchResults(
  //                                   boxIndex,
  //                                   productIndex
  //                                 )}
  //                             </div>

  //                             {!isEnabled &&
  //                               box.products.length > 1 &&
  //                               isProductEditingAllowed && (
  //                                 <button
  //                                   onClick={() =>
  //                                     deleteProduct(boxIndex, productIndex)
  //                                   }
  //                                   className="text-red-500 hover:text-red-700 p-2 rounded-md hover:bg-red-50 flex items-center gap-1 mt-1"
  //                                   title="Delete Product"
  //                                 >
  //                                   <svg
  //                                     width="16"
  //                                     height="16"
  //                                     viewBox="0 0 24 24"
  //                                     fill="none"
  //                                     stroke="currentColor"
  //                                     strokeWidth="2"
  //                                   >
  //                                     <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c0 1 1 2 2 2v2" />
  //                                   </svg>
  //                                 </button>
  //                               )}
  //                           </div>

  //                           {/* Row 2: Qty and Unit Weight */}
  //                           <div className="grid grid-cols-2 gap-4">
  //                             <FloatingLabelInput
  //                               placeholder="Qty"
  //                               type="number"
  //                               value={product.qty?.toString() || ""}
  //                               onChangeCallback={(value) => {
  //                                 updateProduct(
  //                                   boxIndex,
  //                                   productIndex,
  //                                   "qty",
  //                                   parseFloat(value) || 0
  //                                 );
  //                                 clearValidationError(
  //                                   "products",
  //                                   "qty",
  //                                   boxIndex,
  //                                   productIndex
  //                                 );
  //                               }}
  //                               readOnly={
  //                                 isEnabled ||
  //                                 !isProductEditingAllowed ||
  //                                 !isNotApiSource
  //                               }
  //                               required
  //                               error={
  //                                 validationErrors.products[
  //                                   `${boxIndex}-${productIndex}`
  //                                 ]?.qty
  //                               }
  //                               errorMessage="Quantity is required"
  //                             />
  //                             <FloatingLabelInput
  //                               placeholder="Unit Weight"
  //                               type="number"
  //                               value={product.deadWeight?.toString() || ""}
  //                               onChangeCallback={(value) => {
  //                                 updateProduct(
  //                                   boxIndex,
  //                                   productIndex,
  //                                   "deadWeight",
  //                                   parseFloat(value) || 0
  //                                 );
  //                                 clearValidationError(
  //                                   "products",
  //                                   "deadWeight",
  //                                   boxIndex,
  //                                   productIndex
  //                                 );
  //                               }}
  //                               readOnly={isEnabled}
  //                               required
  //                               error={
  //                                 validationErrors.products[
  //                                   `${boxIndex}-${productIndex}`
  //                                 ]?.deadWeight
  //                               }
  //                               errorMessage="Unit weight is required"
  //                             />
  //                           </div>

  //                           {/* Row 3: Unit Price and Dimensions */}
  //                           <div className="grid grid-cols-4 gap-4">
  //                             <FloatingLabelInput
  //                               placeholder="Unit Price"
  //                               type="number"
  //                               value={product.unitPrice?.toString() || ""}
  //                               // onChangeCallback={(value) => {
  //                               //   updateProduct(
  //                               //     boxIndex,
  //                               //     productIndex,
  //                               //     "unitPrice",
  //                               //     parseFloat(value) || 0
  //                               //   );
  //                               //   clearValidationError(
  //                               //     "products",
  //                               //     "unitPrice",
  //                               //     boxIndex,
  //                               //     productIndex
  //                               //   );
  //                               // }}
  //                                onChangeCallback={(value) => {
  //     updateProduct(
  //       boxIndex,
  //       productIndex,
  //       "unitPrice",
  //       parseFloat(value) || 0
  //     );
  //     clearValidationError(
  //       "products",
  //       "unitPrice",
  //       boxIndex,
  //       productIndex
  //     );
  //   }}
  //                               readOnly={
  //                                 isEnabled ||
  //                                 !isProductEditingAllowed ||
  //                                 !isNotApiSource
  //                               }
  //                               // required
  //                               // error={
  //                               //   validationErrors.products[
  //                               //     `${boxIndex}-${productIndex}`
  //                               //   ]?.unitPrice
  //                               // }
  //                               // errorMessage="Unit price is required"

  //                                required={orderData?.codInfo?.isCod}
  //   error={
  //     validationErrors.products[
  //       `${boxIndex}-${productIndex}`
  //     ]?.unitPrice
  //   }
  //   errorMessage="Unit price is required for COD orders"
  //                             />
  //                             <FloatingLabelInput
  //                               placeholder="L(cm)"
  //                               type="number"
  //                               value={product.length?.toString() || ""}
  //                               onChangeCallback={(value) =>
  //                                 updateProduct(
  //                                   boxIndex,
  //                                   productIndex,
  //                                   "length",
  //                                   parseFloat(value) || 0
  //                                 )
  //                               }
  //                               readOnly={isEnabled}
  //                             />
  //                             <FloatingLabelInput
  //                               placeholder="B(cm)"
  //                               type="number"
  //                               value={product.breadth?.toString() || ""}
  //                               onChangeCallback={(value) =>
  //                                 updateProduct(
  //                                   boxIndex,
  //                                   productIndex,
  //                                   "breadth",
  //                                   parseFloat(value) || 0
  //                                 )
  //                               }
  //                               readOnly={isEnabled}
  //                             />
  //                             <FloatingLabelInput
  //                               placeholder="H(cm)"
  //                               type="number"
  //                               value={product.height?.toString() || ""}
  //                               onChangeCallback={(value) =>
  //                                 updateProduct(
  //                                   boxIndex,
  //                                   productIndex,
  //                                   "height",
  //                                   parseFloat(value) || 0
  //                                 )
  //                               }
  //                               readOnly={isEnabled}
  //                             />
  //                           </div>

  //                           {/* Row 4: Total Weight and Total Price (Calculated, Non-editable) */}
  //                           <div className="grid grid-cols-2 gap-4">
  //                             <div className="relative">
  //                               <FloatingLabelInput
  //                                 placeholder="Total Weight (kg)"
  //                                 type="number"
  //                                 value={(
  //                                   (product.qty || 0) * (product.deadWeight || 0)
  //                                 ).toFixed(2)}
  //                                 readOnly
  //                               />
  //                             </div>
  //                             <div className="relative">
  //                               <FloatingLabelInput
  //                                 placeholder="Total Price"
  //                                 type="number"
  //                                 value={(
  //                                   (product.qty || 0) * (product.unitPrice || 0)
  //                                 ).toFixed(2)}
  //                                 readOnly
  //                               />
  //                             </div>
  //                           </div>

  //                           {/* Row 5: SKU and HSN */}
  //                           <div className="grid grid-cols-2 gap-4">
  //                             <FloatingLabelInput
  //                               placeholder="SKU"
  //                               value={product.sku || ""}
  //                               onChangeCallback={(value) =>
  //                                 updateProduct(
  //                                   boxIndex,
  //                                   productIndex,
  //                                   "sku",
  //                                   value
  //                                 )
  //                               }
  //                               readOnly={isEnabled || !isProductEditingAllowed}
  //                             />
  //                             <FloatingLabelInput
  //                               placeholder="HSN"
  //                               value={product.hsnCode || ""}
  //                               onChangeCallback={(value) =>
  //                                 updateProduct(
  //                                   boxIndex,
  //                                   productIndex,
  //                                   "hsnCode",
  //                                   value
  //                                 )
  //                               }
  //                               readOnly={isEnabled || !isProductEditingAllowed}
  //                             />
  //                           </div>
  //                         </div>
  //                       </Collapsible>
  //                     ))}
  //                     <div>
  //                       {!isEnabled &&
  //                         isProductEditingAllowed &&
  //                         isNotApiSource && (
  //                           <OneButton
  //                             text="Add Product"
  //                             onClick={() => addProduct(boxIndex)}
  //                             variant="secondary"
  //                             className="!rounded-full"
  //                           />
  //                         )}
  //                     </div>
  //                   </div>
  //                 </div>
  //               )}

  //               {/* If no products, show add product button */}
  //               {(!box.products || box.products.length === 0) && !isEnabled && (
  //                 <div className="flex justify-center">
  //                   <OneButton
  //                     text="Add Product"
  //                     onClick={() => addProduct(boxIndex)}
  //                     variant="secondary"
  //                     className="!rounded-full"
  //                   />
  //                 </div>
  //               )}
  //             </div>
  //           </Collapsible>
  //         );
  //       })}

  //       {/* Add Box Button */}
  //       {!isEnabled && isProductEditingAllowed && isNotApiSource && (
  //         <div className="flex justify-center mb-2 !w-full">
  //           <OneButton
  //             text="Add Box"
  //             onClick={addBox}
  //             variant="secondary"
  //             className="!rounded-full !w-full"
  //           />
  //         </div>
  //       )}
  //     </div>
  //   );

  const renderBoxAndProducts = () => (
    <div className="space-y-4 p-4">
      {orderData?.boxInfo?.map((box: any, boxIndex: number) => {
        const baseBoxPrice = getBoxInvoiceValue(box, orderData?.source || "");
        const totalPrice = calculateBoxTotalPrice(box);

        // Update the getCollectibleAmount function to handle initialization better
        const getCollectibleAmount = (box: any, totalPrice: number) => {
          // If COD is not enabled, return empty string
          if (!orderData?.codInfo?.isCod) {
            return "";
          }

          // If manually edited, use the stored value
          if (box.codInfo?.isCollectibleManuallyEdited) {
            // Handle the case where collectableAmount might be 0 or empty string
            const storedAmount = box.codInfo?.collectableAmount;
            return storedAmount !== undefined && storedAmount !== null
              ? storedAmount.toString()
              : "";
          } else {
            // Use calculated total price as default
            return totalPrice.toString();
          }
        };

        const collectableAmount = getCollectibleAmount(box, totalPrice);

        return (
          <Collapsible
            key={boxIndex}
            title={`Box ${boxIndex + 1}: ${box.name}`}
            defaultOpen={boxIndex === 0}
            className="border-2 border-gray-200"
            titleClassName="bg-gray-50 hover:bg-gray-100 transition-colors"
            contentClassName="bg-white"
          >
            <div className="space-y-4 mt-4">
              {/* Box Details */}
              <div className="flex flex-col md:flex-row items-start gap-4">
                <div
                  className="!w-full relative"
                  ref={(el) => {
                    const searchKey = `${boxIndex}`;
                    boxSearchRefs.current[searchKey] = el;
                  }}
                >
                  <FloatingLabelInput
                    placeholder="Box Name"
                    value={(() => {
                      const searchKey = `${boxIndex}`;
                      return boxSearchQueries[searchKey] !== undefined
                        ? boxSearchQueries[searchKey]
                        : box.name || "";
                    })()}
                    onChangeCallback={(value) => {
                      handleBoxNameSearch(boxIndex, value);
                      clearValidationError("boxes", "name", boxIndex);
                    }}
                    onFocus={() => handleBoxSearchFocus(boxIndex)}
                    onBlur={() => handleBoxSearchBlur(boxIndex)}
                    readOnly={isEnabled}
                    icon={
                      boxSearchLoading[`${boxIndex}`] ? (
                        <LoadingIcon />
                      ) : (
                        <SearchIcon />
                      )
                    }
                    required
                    error={validationErrors.boxes[boxIndex]?.name}
                    errorMessage="Box name is required"
                  />
                  {renderBoxSearchResults(boxIndex)}
                </div>
                {!isEnabled && orderData?.boxInfo?.length > 1 && (
                  <div className="flex justify-end mb-4">
                    <button
                      onClick={() => deleteBox(boxIndex)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-md hover:bg-red-50 flex items-center gap-2 border border-red-200 mt-1"
                      title="Delete Box"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c0 1 1 2 2 2v2" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              {/* Box Dimensions */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-1 rounded-lg">
                <FloatingLabelInput
                  placeholder="Weight (kg)"
                  type="number"
                  value={box.deadWeight?.toString() || ""}
                  onChangeCallback={(value) =>
                    updateBox(boxIndex, "deadWeight", parseFloat(value) || 0)
                  }
                  readOnly={isEnabled}
                />

                <FloatingLabelInput
                  placeholder="L (cm)"
                  type="number"
                  value={box.length?.toString() || ""}
                  onChangeCallback={(value) => {
                    updateBox(boxIndex, "length", parseFloat(value) || 0);
                    clearValidationError("boxes", "length", boxIndex);
                  }}
                  required
                  readOnly={isEnabled}
                  error={validationErrors.boxes[boxIndex]?.length}
                  errorMessage="Length is required"
                />

                <FloatingLabelInput
                  placeholder="B (cm)"
                  type="number"
                  value={box.breadth?.toString() || ""}
                  onChangeCallback={(value) => {
                    updateBox(boxIndex, "breadth", parseFloat(value) || 0);
                    clearValidationError("boxes", "breadth", boxIndex);
                  }}
                  readOnly={isEnabled}
                  required
                  error={validationErrors.boxes[boxIndex]?.breadth}
                  errorMessage="Breadth is required"
                />

                <FloatingLabelInput
                  placeholder="H (cm)"
                  type="number"
                  value={box.height?.toString() || ""}
                  onChangeCallback={(value) => {
                    updateBox(boxIndex, "height", parseFloat(value) || 0);
                    clearValidationError("boxes", "height", boxIndex);
                  }}
                  readOnly={isEnabled}
                  required
                  error={validationErrors.boxes[boxIndex]?.height}
                  errorMessage="Height is required"
                />
              </div>

              {/* Box Quantity and Collectible Amount */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-1 rounded-lg">
                {/* Box Quantity Input - Enhanced for B2B */}
                <div className="relative">
                  <FloatingLabelInput
                    placeholder={
                      orderData?.orderType === "B2B"
                        ? `Box Quantity (affects invoice total)`
                        : "Box Quantity"
                    }
                    type="number"
                    value={box.qty?.toString() || "1"}
                    onChangeCallback={(value) => {
                      const qty = parseFloat(value) || 1;
                      updateBox(boxIndex, "qty", qty);

                      // For B2B orders, recalculate collectible amount based on new quantity
                      if (
                        orderData?.orderType === "B2B" &&
                        !box.codInfo?.isCollectibleManuallyEdited &&
                        orderData?.codInfo?.isCod
                      ) {
                        const newTotalPrice = baseBoxPrice * qty;
                        updateBox(boxIndex, "collectableAmount", newTotalPrice);
                      }
                    }}
                    integerOnly={true}
                    readOnly={
                      isEnabled || !isProductEditingAllowed || !isNotApiSource
                    }
                    required
                  />
                  {/* Show multiplication indicator for B2B */}
                  {/* {orderData?.orderType === "B2B" && (
                  <div className="text-xs text-blue-600 mt-1">
                    Base Price123: ₹{baseBoxPrice.toFixed(2)} × {box.qty || 1} = ₹{totalPrice.toFixed(2)}
                  </div>
                )} */}
                </div>

                {/* Collectible Amount (Editable) */}
                {orderData?.codInfo?.isCod && (
                  <FloatingLabelInput
                    placeholder="Collectible Amount (₹)"
                    type="number"
                    value={collectableAmount}
                    onChangeCallback={(value) => {
                      // Allow empty string or convert to number
                      const numericValue =
                        value === "" ? "" : parseFloat(value) || 0;
                      updateBox(boxIndex, "collectableAmount", numericValue);
                    }}
                    readOnly={isEnabled}
                  />
                )}
              </div>

              {/* Total Price row - Enhanced to show B2B calculation */}
              <div className="grid grid-cols-1 gap-4 p-1 rounded-lg">
                <div className="relative">
                  <FloatingLabelInput
                    placeholder={
                      orderData?.orderType === "B2B"
                        ? `Box Total (Base: ₹${baseBoxPrice.toFixed(2)} × ${
                            box.qty || 1
                          })`
                        : "Box Total Price (₹)"
                    }
                    type="number"
                    value={totalPrice.toFixed(2)}
                    readOnly={true}
                  />
                  {/* Additional breakdown for B2B */}
                  {orderData?.orderType === "B2B" &&
                    baseBoxPrice !== totalPrice && (
                      <div className="text-xs text-gray-600 mt-1">
                        Product total: ₹{baseBoxPrice.toFixed(2)} | Box
                        quantity: {box.qty || 1} | Final total: ₹
                        {totalPrice.toFixed(2)}
                      </div>
                    )}
                </div>
              </div>

              {/* Products Section */}
              {box.products && box.products.length > 0 && (
                <div className="space-y-3">
                  <div className="space-y-2 mb-2">
                    {box.products.map((product: any, productIndex: number) => (
                      <Collapsible
                        key={`${boxIndex}-${productIndex}`}
                        title={`Product ${productIndex + 1}: ${
                          product.name || "Unnamed Product"
                        }`}
                        defaultOpen={false}
                        className="border border-gray-300 !shadow-none"
                        titleClassName="bg-blue-50 hover:bg-blue-100 transition-colors text-sm !shadow-none"
                        contentClassName="bg-gray-50 !shadow-none"
                      >
                        <div className="p-4 space-y-4">
                          {/* Product Name with Search */}
                          <div className="flex items-start gap-x-4">
                            <div
                              className="flex-1 relative"
                              ref={(el) => {
                                const searchKey = `${boxIndex}-${productIndex}`;
                                productSearchRefs.current[searchKey] = el;
                              }}
                            >
                              <FloatingLabelInput
                                placeholder="Product Name"
                                value={(() => {
                                  // For restricted sources, show only the product name without search query
                                  if (!isProductEditingAllowed) {
                                    return product.name || "";
                                  }
                                  const searchKey = `${boxIndex}-${productIndex}`;
                                  return productSearchQueries[searchKey] !==
                                    undefined
                                    ? productSearchQueries[searchKey]
                                    : product.name || "";
                                })()}
                                onChangeCallback={(value) => {
                                  if (isProductEditingAllowed) {
                                    handleProductNameSearch(
                                      boxIndex,
                                      productIndex,
                                      value
                                    );
                                    clearValidationError(
                                      "products",
                                      "name",
                                      boxIndex,
                                      productIndex
                                    );
                                  }
                                }}
                                onFocus={() =>
                                  isProductEditingAllowed
                                    ? handleProductSearchFocus(
                                        boxIndex,
                                        productIndex
                                      )
                                    : null
                                }
                                onBlur={() =>
                                  isProductEditingAllowed
                                    ? handleProductSearchBlur(
                                        boxIndex,
                                        productIndex
                                      )
                                    : null
                                }
                                readOnly={isEnabled || !isProductEditingAllowed}
                                icon={
                                  // Hide search icon for restricted sources
                                  !isProductEditingAllowed ? null : productSearchLoading[
                                      `${boxIndex}-${productIndex}`
                                    ] ? (
                                    <LoadingIcon />
                                  ) : (
                                    <SearchIcon />
                                  )
                                }
                                required
                                error={
                                  validationErrors.products[
                                    `${boxIndex}-${productIndex}`
                                  ]?.name
                                }
                                errorMessage="Product name is required"
                              />
                              {renderProductSearchResults &&
                                renderProductSearchResults(
                                  boxIndex,
                                  productIndex
                                )}
                            </div>

                            {!isEnabled &&
                              box.products.length > 1 &&
                              isProductEditingAllowed && (
                                <button
                                  onClick={() =>
                                    deleteProduct(boxIndex, productIndex)
                                  }
                                  className="text-red-500 hover:text-red-700 p-2 rounded-md hover:bg-red-50 flex items-center gap-1 mt-1"
                                  title="Delete Product"
                                >
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c0 1 1 2 2 2v2" />
                                  </svg>
                                </button>
                              )}
                          </div>

                          {/* Row 2: Qty and Unit Weight */}
                          <div className="grid grid-cols-2 gap-4">
                            <FloatingLabelInput
                              placeholder="Product Qty"
                              type="number"
                              value={product.qty?.toString() || ""}
                              onChangeCallback={(value) => {
                                updateProduct(
                                  boxIndex,
                                  productIndex,
                                  "qty",
                                  parseFloat(value) || 0
                                );
                                clearValidationError(
                                  "products",
                                  "qty",
                                  boxIndex,
                                  productIndex
                                );
                              }}
                              integerOnly={true}
                              readOnly={
                                isEnabled ||
                                !isProductEditingAllowed ||
                                !isNotApiSource
                              }
                              required
                              error={
                                validationErrors.products[
                                  `${boxIndex}-${productIndex}`
                                ]?.qty
                              }
                              errorMessage="Quantity is required"
                            />
                            <FloatingLabelInput
                              placeholder="Unit Weight"
                              type="number"
                              value={product.deadWeight?.toString() || ""}
                              onChangeCallback={(value) => {
                                updateProduct(
                                  boxIndex,
                                  productIndex,
                                  "deadWeight",
                                  parseFloat(value) || 0
                                );
                                clearValidationError(
                                  "products",
                                  "deadWeight",
                                  boxIndex,
                                  productIndex
                                );
                              }}
                              readOnly={isEnabled}
                              required
                              error={
                                validationErrors.products[
                                  `${boxIndex}-${productIndex}`
                                ]?.deadWeight
                              }
                              errorMessage="Unit weight is required"
                            />
                          </div>

                          {/* Row 3: Unit Price and Dimensions */}
                          <div className="grid grid-cols-4 gap-4">
                            <FloatingLabelInput
                              placeholder="Unit Price"
                              type="number"
                              value={product.unitPrice?.toString() || ""}
                              onChangeCallback={(value) => {
                                updateProduct(
                                  boxIndex,
                                  productIndex,
                                  "unitPrice",
                                  parseFloat(value) || 0
                                );
                                clearValidationError(
                                  "products",
                                  "unitPrice",
                                  boxIndex,
                                  productIndex
                                );
                              }}
                              readOnly={
                                isEnabled ||
                                !isProductEditingAllowed ||
                                !isNotApiSource
                              }
                              required={orderData?.codInfo?.isCod}
                              error={
                                validationErrors.products[
                                  `${boxIndex}-${productIndex}`
                                ]?.unitPrice
                              }
                              errorMessage="Unit price is required for COD orders"
                            />
                            <FloatingLabelInput
                              placeholder="L(cm)"
                              type="number"
                              value={product.length?.toString() || ""}
                              onChangeCallback={(value) =>
                                updateProduct(
                                  boxIndex,
                                  productIndex,
                                  "length",
                                  parseFloat(value) || 0
                                )
                              }
                              readOnly={isEnabled}
                            />
                            <FloatingLabelInput
                              placeholder="B(cm)"
                              type="number"
                              value={product.breadth?.toString() || ""}
                              onChangeCallback={(value) =>
                                updateProduct(
                                  boxIndex,
                                  productIndex,
                                  "breadth",
                                  parseFloat(value) || 0
                                )
                              }
                              readOnly={isEnabled}
                            />
                            <FloatingLabelInput
                              placeholder="H(cm)"
                              type="number"
                              value={product.height?.toString() || ""}
                              onChangeCallback={(value) =>
                                updateProduct(
                                  boxIndex,
                                  productIndex,
                                  "height",
                                  parseFloat(value) || 0
                                )
                              }
                              readOnly={isEnabled}
                            />
                          </div>

                          {/* Row 4: Total Weight and Total Price (Calculated, Non-editable) */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                              <FloatingLabelInput
                                placeholder="Total Weight (kg)"
                                type="number"
                                value={(
                                  (product.qty || 0) * (product.deadWeight || 0)
                                ).toFixed(2)}
                                readOnly
                              />
                            </div>
                            <div className="relative">
                              <FloatingLabelInput
                                placeholder="Product Total Price"
                                type="number"
                                value={(
                                  (product.qty || 0) * (product.unitPrice || 0)
                                ).toFixed(2)}
                                readOnly
                              />
                            </div>
                          </div>

                          {/* Row 5: SKU and HSN */}
                          <div className="grid grid-cols-2 gap-4">
                            <FloatingLabelInput
                              placeholder="SKU"
                              value={product.sku || ""}
                              onChangeCallback={(value) =>
                                updateProduct(
                                  boxIndex,
                                  productIndex,
                                  "sku",
                                  value
                                )
                              }
                              readOnly={isEnabled || !isProductEditingAllowed}
                            />
                            <FloatingLabelInput
                              placeholder="HSN"
                              value={product.hsnCode || ""}
                              onChangeCallback={(value) =>
                                updateProduct(
                                  boxIndex,
                                  productIndex,
                                  "hsnCode",
                                  value
                                )
                              }
                              readOnly={isEnabled || !isProductEditingAllowed}
                            />
                          </div>
                        </div>
                      </Collapsible>
                    ))}
                    <div>
                      {!isEnabled &&
                        isProductEditingAllowed &&
                        isNotApiSource && (
                          <OneButton
                            text="Add Product"
                            onClick={() => addProduct(boxIndex)}
                            variant="secondary"
                            className="!rounded-full"
                          />
                        )}
                    </div>
                  </div>
                </div>
              )}

              {/* If no products, show add product button */}
              {(!box.products || box.products.length === 0) && !isEnabled && (
                <div className="flex justify-center">
                  <OneButton
                    text="Add Product"
                    onClick={() => addProduct(boxIndex)}
                    variant="secondary"
                    className="!rounded-full"
                  />
                </div>
              )}
            </div>
          </Collapsible>
        );
      })}

      {/* Add Box Button */}
      {!isEnabled && isProductEditingAllowed && isNotApiSource && (
        <div className="flex justify-center mb-2 !w-full">
          <OneButton
            text="Add Box"
            onClick={addBox}
            variant="secondary"
            className="!rounded-full !w-full"
          />
        </div>
      )}
    </div>
  );

  const renderServices = () => (
    <div className="space-y-4 p-4">
      {isEnabled ? (
        orderData?.service ? (
          <div className="border border-gray-400 rounded-lg p-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Partner Name:</span>
                <span>
                  {isMasked ? "Shipyaari" : orderData.service.partnerName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Service Mode:</span>
                <span>
                  {capitalizeFirstLetter(orderData.service.serviceMode)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Applied Weight:</span>
                <span>{orderData.service.appliedWeight} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Freight Charges:</span>
                <span>
                  ₹
                  {Math.round(
                    orderData.service.base + orderData.service.add
                  )?.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Other Charges:</span>
                <span>
                  ₹
                  {Math.round(orderData.service.variables)?.toLocaleString(
                    "en-IN"
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">COD Charges:</span>
                <span>
                  ₹{Math.round(orderData.service.cod)?.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Insurance:</span>
                <span>
                  ₹
                  {Math.round(orderData.service.insurance)?.toLocaleString(
                    "en-IN"
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Tax:</span>
                <span>
                  ₹{Math.round(orderData.service.tax)?.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Total:</span>
                <span>
                  ₹
                  {Math.round(orderData.service.total)?.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No service information available
          </div>
        )
      ) : (
        <>
          {serviceLoading ? (
            <div className="flex justify-center py-8">
              <Spinner />
            </div>
          ) : serviceList.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No services available
            </div>
          ) : (
            <div className="space-y-3">
              {serviceList.map((service: any, index: number) => (
                <div
                  key={service.partnerServiceId}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedServiceIndex === index
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedServiceIndex(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        checked={selectedServiceIndex === index}
                        onChange={() => setSelectedServiceIndex(index)}
                        className="text-blue-600"
                      />
                      <div>
                        <p className="font-medium">
                          {capitalizeFirstLetter(service.partnerName)} -{" "}
                          {capitalizeFirstLetter(service.serviceMode)}
                        </p>
                        <p className="text-sm text-gray-600">
                          Applied Weight: {service.appliedWeight} kg
                        </p>
                        <p className="text-sm text-gray-600">
                          Service: {service.companyServiceName}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">
                        ₹{service.total?.toLocaleString("en-IN")}
                      </p>
                      <p className="text-sm text-gray-600">
                        Zone: {service.zoneName}
                      </p>
                    </div>
                  </div>

                  {selectedServiceIndex === index && (
                    <div className="mt-3 pt-3 border-t grid grid-cols-2 gap-2 text-sm">
                      <div>Base: ₹{service.base}</div>
                      <div>Additional: ₹{service.add}</div>
                      <div>Variables: ₹{service.variables?.toFixed(2)}</div>
                      <div>Tax: ₹{service.tax?.toFixed(2)}</div>
                      <div>COD: ₹{service.cod}</div>
                      <div>Insurance: ₹{service.insurance}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {serviceList.length > 0 && (
            <div className="flex justify-end mt-4">
              <OneButton
                text="Update Service"
                onClick={updateService}
                variant="primary"
              />
            </div>
          )}
        </>
      )}
    </div>
  );

  // const renderPaymentDetails = () => (
  //   <div className="space-y-4 p-4">
  //     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //       <FloatingLabelInput
  //         placeholder="Payment Type"
  //         value={orderData?.codInfo?.isCod ? "COD" : "Prepaid"}
  //         readOnly
  //       />
  //       <FloatingLabelInput
  //         placeholder="Collectable Amount"
  //         type="number"
  //         // value={orderData?.codInfo?.collectableAmount?.toString() || "0"}
  //         readOnly
  //       />
  //     </div>

  //     <FloatingLabelInput
  //       placeholder="Invoice Value"
  //       type="number"
  //       value={orderData?.codInfo?.invoiceValue?.toString() || "0"}
  //       readOnly
  //       onChangeCallback={(value) => {
  //         // Handle invoice value update if needed
  //       }}
  //     />
  //   </div>
  // );

  const renderPaymentDetails = () => {
    const totalInvoiceValue = calculateTotalInvoiceValue();
    const totalCollectableAmount = calculateTotalCollectableAmount();

    return (
      <div className="space-y-4 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FloatingLabelInput
            placeholder="Payment Type"
            value={orderData?.codInfo?.isCod ? "COD" : "Prepaid"}
            readOnly
          />
          <FloatingLabelInput
            placeholder="Collectible Amount"
            type="number"
            value={
              orderData?.codInfo?.isCod
                ? totalCollectableAmount.toString()
                : "0"
            }
            readOnly
          />
        </div>

        <FloatingLabelInput
          placeholder="Invoice Value"
          type="number"
          value={totalInvoiceValue.toString()}
          readOnly
        />
      </div>
    );
  };

  // const renderEventLogs = () => (
  //   <div className="space-y-3 p-4 max-h-96 overflow-y-auto">
  //     {orderData?.status?.map((log: any, index: number) => (
  //       <div key={index} className="border rounded-lg p-4">
  //         <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
  //           <div>
  //             <span className="font-medium">Status:</span> {log.currentStatus}
  //           </div>
  //           <div>
  //             <span className="font-medium">AWB:</span> {log.awb || "N/A"}
  //           </div>
  //           <div className="md:col-span-2">
  //             <span className="font-medium">Description:</span>{" "}
  //             {log.description}
  //           </div>
  //           <div className="md:col-span-2">
  //             <span className="font-medium">Time:</span>{" "}
  //             {convertEpochToDateTime(log.timeStamp)}
  //           </div>
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // );

  // Replace the renderEventLogs function with this enhanced version:

  // Replace the renderEventLogs function with this enhanced version:
  const renderEventLogs = () => {
    const copyToClipboard = (text: string) => {
      navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    };

    return (
      <div className="space-y-3 p-4 max-h-96 overflow-y-auto">
        {orderData?.status?.map((log: any, index: number) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-medium">Status:</span> {log.currentStatus}
              </div>
              {isEnabled && (
                <div>
                  <span className="font-medium">AWB:</span> {log.awb || "N/A"}
                </div>
              )}
              {/* Add Log ID */}
              <div className="md:col-span-2">
                <span className="font-medium">Log ID:</span>{" "}
                {log.logId || "N/A"}
              </div>
              {/* Add Notes */}
              {log.notes && (
                <div className="md:col-span-2">
                  <span className="font-medium">Notes:</span>{" "}
                  {typeof log.notes === "object"
                    ? JSON.stringify(log.notes)
                    : log.notes}
                </div>
              )}

              {/* Description with scrollable single line and copy icon */}
              <div className="md:col-span-2">
                <span className="font-medium">Description:</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 overflow-x-auto whitespace-nowrap border rounded px-2 py-1 bg-gray-50 text-xs">
                    {typeof log.description === "object"
                      ? JSON.stringify(log.description)
                      : log.description}
                  </div>
                  <img
                    src={copyIcon}
                    alt="Copy"
                    className="w-4 h-4 cursor-pointer hover:opacity-70"
                    onClick={() =>
                      copyToClipboard(
                        typeof log.description === "object"
                          ? JSON.stringify(log.description)
                          : log.description
                      )
                    }
                  />
                </div>
              </div>

              {/* Shipyaari Payload */}
              {(orderData?.otherDetails?.[0]?.rawReqBody ||
                orderData?.otherDetails?.[0]?.rawResBody) && (
                <div className="md:col-span-2">
                  <span className="font-medium">Shipyaari Payload:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 overflow-x-auto whitespace-nowrap border rounded px-2 py-1 bg-gray-50 text-xs">
                      {JSON.stringify({
                        rawReqBody: orderData?.otherDetails?.[0]?.rawReqBody,
                        rawResBody: orderData?.otherDetails?.[0]?.rawResBody,
                      })}
                    </div>
                    <img
                      src={copyIcon}
                      alt="Copy"
                      className="w-4 h-4 cursor-pointer hover:opacity-70"
                      onClick={() =>
                        copyToClipboard(
                          JSON.stringify({
                            rawReqBody:
                              orderData?.otherDetails?.[0]?.rawReqBody,
                            rawResBody:
                              orderData?.otherDetails?.[0]?.rawResBody,
                          })
                        )
                      }
                    />
                  </div>
                </div>
              )}

              {/* Partner Payload */}
              {orderData?.boxInfo?.some(
                (box: any) => box.payloads && box.payloads.length > 0
              ) && (
                <div className="md:col-span-2">
                  <span className="font-medium">Partner Payload:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 overflow-x-auto whitespace-nowrap border rounded px-2 py-1 bg-gray-50 text-xs">
                      {JSON.stringify(
                        orderData.boxInfo.flatMap(
                          (box: any) => box.payloads || []
                        )
                      )}
                    </div>
                    <img
                      src={copyIcon}
                      alt="Copy"
                      className="w-4 h-4 cursor-pointer hover:opacity-70"
                      onClick={() =>
                        copyToClipboard(
                          JSON.stringify(
                            orderData.boxInfo.flatMap(
                              (box: any) => box.payloads || []
                            )
                          )
                        )
                      }
                    />
                  </div>
                </div>
              )}

              <div className="md:col-span-2">
                <span className="font-medium">Time:</span>{" "}
                {convertEpochToDateTime(log.timeStamp)}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // const renderEventLogs = () => (
  //   <div className="space-y-3 p-4 max-h-96 overflow-y-auto">
  //     {orderData?.status?.map((log: any, index: number) => (
  //       <div key={index} className="border rounded-lg p-4">
  //         <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
  //           <div>
  //             <span className="font-medium">Status:</span> {log.currentStatus}
  //           </div>
  //           {isEnabled && (<div>
  //             <span className="font-medium">AWB:</span> {log.awb || "N/A"}
  //           </div>)}
  //           {/* Add Log ID */}
  //           <div className="md:col-span-2">
  //             <span className="font-medium">Log ID:</span> {log.logId || "N/A"}
  //           </div>
  //           {/* Add Notes */}
  //           {log.notes && (
  //             <div className="md:col-span-2">
  //                   <span className="font-medium">Notes:</span>{" "}
  //   {typeof log.notes === 'object' ? JSON.stringify(log.notes) : log.notes}
  //             </div>
  //           )}
  //           <div className="md:col-span-2 break-words">
  //             <span className="font-medium">Description:</span>{" "}
  //             <span className="break-words whitespace-pre-wrap">
  //               {typeof log.description === 'object' ? JSON.stringify(log.description) : log.description}
  //             </span>
  //           </div>
  //           <div className="md:col-span-2">
  //             <span className="font-medium">Time:</span>{" "}
  //             {convertEpochToDateTime(log.timeStamp)}
  //           </div>
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // );

  const renderOrderHistory = () => (
    <div className="space-y-6 pb-1">
      {/* Order Configuration Section */}
      <div className="bg-gray-50 rounded-lg p-2 space-y-4">
        {/* Row 1: Order Type and Payment Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Order Type */}
          <div className="space-y-2">
            <span className="block text-sm font-medium text-gray-700">
              Order Type
            </span>
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="orderType"
                  value="B2C"
                  checked={orderData?.orderType === "B2C"}
                  onChange={(e) => {
                    if (!isEnabled || !isProductEditingAllowed) {
                      setOrderData((prev: any) => ({
                        ...prev,
                        orderType: e.target.value,
                      }));
                    }
                  }}
                  disabled={isEnabled}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="text-sm text-gray-700 font-medium">B2C</span>
              </span>
              <span className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="orderType"
                  value="B2B"
                  checked={orderData?.orderType === "B2B"}
                  onChange={(e) => {
                    if (!isEnabled && !isB2BDisabled()) {
                      setOrderData((prev: any) => ({
                        ...prev,
                        orderType: e.target.value,
                      }));
                    }
                  }}
                  disabled={
                    isEnabled || !isProductEditingAllowed || isB2BDisabled()
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="text-sm text-gray-700 font-medium">B2B</span>
              </span>
            </div>
          </div>

          {/* Payment Type */}
          <div className="space-y-2">
            <span className="block text-sm font-medium text-gray-700">
              Payment Type
            </span>
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="paymentType"
                  value="Prepaid"
                  checked={!orderData?.codInfo?.isCod}
                  onChange={(e) => {
                    if (!isEnabled) {
                      setOrderData((prev: any) => ({
                        ...prev,
                        codInfo: {
                          ...prev.codInfo,
                          isCod: false,
                        },
                      }));
                    }
                  }}
                  disabled={isEnabled || !isProductEditingAllowed}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="text-sm text-gray-700 font-medium">
                  Prepaid
                </span>
              </span>
              <span className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="paymentType"
                  value="COD"
                  checked={orderData?.codInfo?.isCod}
                  onChange={(e) => {
                    if (!isEnabled) {
                      setOrderData((prev: any) => ({
                        ...prev,
                        codInfo: {
                          ...prev.codInfo,
                          isCod: true,
                        },
                      }));
                    }
                  }}
                  disabled={
                    isEnabled ||
                    orderData?.transit === "REVERSE" ||
                    !isProductEditingAllowed
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span
                  className={`text-sm text-gray-700 font-medium ${
                    orderData?.transit === "REVERSE" ? "opacity-50" : ""
                  }`}
                >
                  COD{" "}
                  {orderData?.transit === "REVERSE" ? "(Not for reverse)" : ""}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Details Section */}
      <div className="space-y-4">
        {/* Row 2: Order ID and Eway Bill No */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FloatingLabelInput
            placeholder="Order ID"
            value={orderData?.orderId || ""}
            onChangeCallback={(value) => {
              if (!isEnabled) {
                setOrderData((prev: any) => ({
                  ...prev,
                  orderId: value,
                }));
                clearOrderDetailValidationError("orderId");
                setOrderIdExistsError(false); // Clear the exists error when typing
              }
            }}
            readOnly={isEnabled || !isProductEditingAllowed}
            required
            error={validationErrors.orderDetails.orderId || orderIdExistsError}
            // errorMessage="Order ID is required"
            errorMessage={
              orderIdExistsError
                ? "Order ID already exists"
                : "Order ID is required"
            }
          />

          <FloatingLabelInput
            placeholder={(() => {
              const totalValue = calculateTotalProductValue();
              if (totalValue >= 50000) {
                return `E-way Bill No (Required - Total: ₹${totalValue.toLocaleString(
                  "en-IN"
                )})`;
              }
              return `E-way Bill No`;
            })()}
            // placeholder="Eway Bill No"
            value={orderData?.boxInfo?.[0]?.eWayBillNo || ""}
            onChangeCallback={(value) => {
              if (!isEnabled) {
                setOrderData((prev: any) => {
                  const updatedData = { ...prev };
                  if (updatedData.boxInfo && updatedData.boxInfo.length > 0) {
                    updatedData.boxInfo = updatedData.boxInfo.map(
                      (box: any) => ({
                        ...box,
                        eWayBillNo: value,
                      })
                    );
                  }
                  return updatedData;
                });
              }
              clearOrderDetailValidationError("eWayBillNo");
            }}
            readOnly={isEnabled}
            required={calculateTotalProductValue() >= 50000}
            error={validationErrors.orderDetails.eWayBillNo}
            errorMessage={`E-way Bill Number is required for orders with total value ≥ ₹50,000`}
          />
        </div>
        {/* Row 3: Zone - ADD THIS NEW ROW */}
        {isEnabled && (
          <div className="">
            <FloatingLabelInput
              placeholder="Zone"
              value={orderData?.zone || ""}
              readOnly={true}
            />
            {/* Empty div to maintain grid layout */}
            <div></div>
          </div>
        )}
      </div>
    </div>
  );

  // Add this new render function
  const renderOrderConfirmationLogs = () => (
    <div className="space-y-3 p-4 max-h-96 overflow-y-auto">
      {buyerConfirmationLogs?.map((item: any, index: number) => (
        <div key={index} className="border rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div>
              <span className="font-medium">New Status:</span>{" "}
              {item?.eventRecord?.newStatus || "--"}
            </div>
            <div>
              <span className="font-medium">Previous Status:</span>{" "}
              {item?.eventRecord?.previousStatus || "--"}
            </div>
            <div className="md:col-span-2">
              <span className="font-medium">Time Stamp:</span>{" "}
              {item?.createdAt ? convertEpochToDateTime(item.createdAt) : "--"}
            </div>
          </div>
        </div>
      ))}
      {buyerConfirmationLogs?.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No confirmation logs available
        </div>
      )}
    </div>
  );

  if (currentStep === "serviceSelection") {
    return (
      <ServiceSelectionComponent
        orderData={orderData}
        isMasked={isMasked}
        onBack={backToOrderDetails}
        onOrderPlaced={onOrderPlaced}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner />
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="text-center py-8 text-gray-500">
        No order data available
      </div>
    );
  }

  return (
    // <div className="space-y-4 max-h-[calc(100vh-100px)] pb-20 px-3 pt-3">
    <div className="flex flex-col min-h-[calc(100vh-100px)] px-3 pt-3">
         <div className="flex-1 space-y-4">

      {/* ADD THE STEP INDICATOR HERE */}
      {!isEnabled && (
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-blue-800">
                Step 1: Order Details
              </h2>
              <p className="text-blue-600">
                Fill in all order details before proceeding to service
                selection.
              </p>
            </div>
            <div className="flex space-x-2">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                1
              </div>
              <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
            </div>
          </div>
        </div>
      )}

      <Collapsible title="Order Details" hasError={hasOrderDetailsErrors()}>
        {renderOrderHistory()}{" "}
      </Collapsible>

      <Collapsible title="Pickup Address" hasError={hasPickupAddressErrors()}>
        {renderPickupAddressForm()}
      </Collapsible>

      <Collapsible
        title="Delivery Address"
        hasError={hasDeliveryAddressErrors()}
      >
        {renderDeliveryAddressForm()}
      </Collapsible>

      <Collapsible
        title="Box & Products"
        hasError={hasBoxesAndProductsErrors()}
      >
        {renderBoxAndProducts()}
      </Collapsible>

      {isEnabled && (
        <Collapsible
          title="Services"
          onToggle={(isOpen) => {
            if (isOpen) {
              fetchServiceList();
            }
          }}
        >
          {renderServices()}
        </Collapsible>
      )}

      <Collapsible title="Payment Details">
        {renderPaymentDetails()}
      </Collapsible>

      <Collapsible title="Event Logs">{renderEventLogs()}</Collapsible>

      <Collapsible title="Order Confirmation Logs">
        {renderOrderConfirmationLogs()}
      </Collapsible>

      </div>

      {!isEnabled && (
        <div
className="flex justify-end gap-x-10 shadow-lg border-[1px] h-[60px] bg-[#FFFFFF] px-6 py-3 rounded-tr-[24px] rounded-tl-[24px] fixed bottom-0 "          style={{ width: "-webkit-fill-available" }}
        >
          {/* <OneButton
            text="Place Order"
            onClick={placeOrder}
            variant="primary"
            className="px-8"
          /> */}

          <OneButton
            text="Next"
            onClick={nextStep}
            variant="primary"
            className="px-8 mb-2"
            disabled={isNextLoading} // Disable button when loading
          />
        </div>
      )}
    </div>
  );
};

export default CustomTableAccordian;
