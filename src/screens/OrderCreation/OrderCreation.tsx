import React, { useState, useEffect, useCallback } from "react";
import { Breadcrum } from "../../components/Layout/breadcrum";
import ExactStepper from "./ExactStepper";
import Collapsible from "../../components/OneComponents/Collapsible";
import OrderInformation from "./OrderInformation";
import AddressForm from "./AddressForm";
import OrderForm from "./OrderForm";
import OrderFormB2B from "./OrderFormB2B";
import PaymentInformation from "./PaymentInformation";
import OrderSummary from "./OrderSummary";
import OneButton from "../../components/Button/OneButton";
import EWayBillCard from "./EWayBillCard";
import ShippingServiceSelector from "./ShippingServiceSelector";
import SummaryForOrder from "./SummaryForOrder";
import { POST, GET } from "../../utils/webService";
import {
  ADD_PICKUP_LOCATION,
  ADD_DELIVERY_LOCATION,
  ADD_BOX_INFO,
  SET_PARTNER_SERVICE_INFO,
  REVERSE_ORDER,
  GET_LATEST_ORDER,
  POST_SET_ORDER_ID,
} from "../../utils/ApiUrls";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Define interfaces...
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

interface BoxPackage {
  id: number;
  name: string;
  quantity: string | number;
  unitPrice: string | number;
  unitWeight: string | number;
  totalWeight: string | number;
  totalPrice: string | number;
  tax: string | number;
  discount: string | number;
  hsn: string;
  sku: string;
  length: string | number;
  breadth: string | number;
  height: string | number;
  isExpanded: boolean;
  isSaved: boolean;
}

interface B2BBox {
  id: number;
  packages: BoxPackage[];
  searchQuery?: string;
}

// Constants for localStorage keys
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

const generateUniqueCode = (minLength: number, maxLength: number) => {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  let code = "";

  while (code.length < length) {
    const randomIndex = Math.random() * charset.length;
    const randomIndexOnFloor = Math.floor(randomIndex);
    code += charset.charAt(randomIndexOnFloor);
  }

  return code;
};

function OrderCreation() {
  const navigate = useNavigate();

  // Load initial state from localStorage or use defaults
  const loadInitialState = () => {
    const savedActiveStep = localStorage.getItem(STORAGE_KEYS.ACTIVE_STEP);
    const savedOrderType = localStorage.getItem(STORAGE_KEYS.ORDER_TYPE);
    const savedReverseState = localStorage.getItem(STORAGE_KEYS.REVERSE_STATE);
    const savedOrderId = localStorage.getItem(STORAGE_KEYS.ORDER_DATA);

    return {
      activeStep: savedActiveStep ? parseInt(savedActiveStep) : 1,
      orderType: savedOrderType || "B2C",
      reverseState: savedReverseState || "FORWARD",
      orderId: savedOrderId
        ? JSON.parse(savedOrderId).orderId
        : generateUniqueCode(8, 12),
    };
  };

  const initialState = loadInitialState();

  const [activeStep, setActiveStep] = useState(initialState.activeStep);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    pickup: false,
    delivery: false,
  });
  const [tempOrderId, setTempOrderId] = useState(
    localStorage.getItem(STORAGE_KEYS.TEMP_ORDER_ID) || ""
  );
  const [orderSource, setOrderSource] = useState(
    localStorage.getItem(STORAGE_KEYS.ORDER_SOURCE) || ""
  );

  // Order states
  const [order, setOrder] = useState({
    orderId: initialState.orderId,
    orderType: initialState.orderType,
    reverseState: initialState.reverseState,
  });
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

  // Address Form states
  const [showPickupDetails, setShowPickupDetails] = useState(true);
  const [showDeliveryDetails, setShowDeliveryDetails] = useState(true);
  const [isPickupModalOpen, setIsPickupModalOpen] = useState(false);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);

  // Load pickup form values from localStorage
  const loadedPickupFormValues = localStorage.getItem(
    STORAGE_KEYS.PICKUP_ADDRESS
  );
  const initialPickupFormValues = loadedPickupFormValues
    ? JSON.parse(loadedPickupFormValues)
    : {
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
      };

  const [pickupFormValues, setPickupFormValues] = useState(
    initialPickupFormValues
  );

  // Load delivery form values from localStorage
  const loadedDeliveryFormValues = localStorage.getItem(
    STORAGE_KEYS.DELIVERY_ADDRESS
  );
  const initialDeliveryFormValues = loadedDeliveryFormValues
    ? JSON.parse(loadedDeliveryFormValues)
    : {
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
      };

  const [deliveryFormValues, setDeliveryFormValues] = useState(
    initialDeliveryFormValues
  );

  const [pickupAddress, setPickupAddress] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [isLoading, setIsLoading] = useState({
    pickup: false,
    delivery: false,
  });
  const [pickupSearchResults, setPickupSearchResults] = useState([]);
  const [deliverySearchResults, setDeliverySearchResults] = useState([]);
  const [showPickupSearchResults, setShowPickupSearchResults] = useState(false);
  const [showDeliverySearchResults, setShowDeliverySearchResults] =
    useState(false);

  // Package Information states
  const [packageDetails, setPackageDetails] = useState({
    packageType: "",
    weight: "",
    dimensions: {
      length: "",
      width: "",
      height: "",
    },
    itemDescription: "",
    itemValue: "",
    totalItems: "1",
  });

  // Load box data from localStorage
  const loadedBoxData = localStorage.getItem(STORAGE_KEYS.BOX_DATA);
  const [boxesData, setBoxesData] = useState<BoxData[]>(
    loadedBoxData ? JSON.parse(loadedBoxData) : []
  );

  // Load B2B box data from localStorage
  const loadedB2BBoxData = localStorage.getItem(STORAGE_KEYS.B2B_BOX_DATA);
  const [b2bBoxesData, setB2BBoxesData] = useState<B2BBox[]>(
    loadedB2BBoxData ? JSON.parse(loadedB2BBoxData) : []
  );

  // Payment Information states
  const loadedPaymentInfo = localStorage.getItem(STORAGE_KEYS.PAYMENT_INFO);
  const paymentInfo = loadedPaymentInfo
    ? JSON.parse(loadedPaymentInfo)
    : {
        paymentMethod: "Prepaid",
        collectibleAmount: "",
        insuranceOption: "noInsurance",
      };

  const [paymentMethod, setPaymentMethod] = useState(paymentInfo.paymentMethod);
  const [collectibleAmount, setCollectibleAmount] = useState(
    paymentInfo.collectibleAmount
  );
  const [insuranceOption, setInsuranceOption] = useState(
    paymentInfo.insuranceOption
  );

  // Shipping selector
  const loadedSelectedService = localStorage.getItem(
    STORAGE_KEYS.SELECTED_SERVICE
  );
  const [selectedServiceDetails, setSelectedServiceDetails] = useState<any>(
    loadedSelectedService ? JSON.parse(loadedSelectedService) : null
  );

  // Error states
  const [formErrors, setFormErrors] = useState({
    pickup: {
      contactNo: false,
      address: false,
      name: false,
      pincode: false,
      city: false,
      state: false,
      addressLine1: false,
      addressLine2: false,
      landmark: false,
      gstNo: false,
      email: false,
    },
    delivery: {
      contactNo: false,
      address: false,
      name: false,
      pincode: false,
      city: false,
      state: false,
      addressLine1: false,
      addressLine2: false,
      landmark: false,
      gstNo: false,
      email: false,
    },
  });

  const [boxValidationErrors, setBoxValidationErrors] = useState<{
    [boxId: number]: {
      [fieldId: string]: boolean;
    };
  }>({});

  const [allBoxesIdentical, setAllBoxesIdentical] = useState<boolean>(false);
  const [boxCount, setBoxCount] = useState<number>(1);

  const [isLoadingExistingOrder, setIsLoadingExistingOrder] = useState(false);
  const [hasLoadedExistingOrder, setHasLoadedExistingOrder] = useState(false);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_STEP, activeStep.toString());
  }, [activeStep]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDER_DATA, JSON.stringify(order));
    localStorage.setItem(STORAGE_KEYS.ORDER_TYPE, order.orderType);
    localStorage.setItem(STORAGE_KEYS.REVERSE_STATE, order.reverseState);
  }, [order]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.PICKUP_ADDRESS,
      JSON.stringify(pickupFormValues)
    );
  }, [pickupFormValues]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.DELIVERY_ADDRESS,
      JSON.stringify(deliveryFormValues)
    );
  }, [deliveryFormValues]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOX_DATA, JSON.stringify(boxesData));
  }, [boxesData]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.B2B_BOX_DATA,
      JSON.stringify(b2bBoxesData)
    );
  }, [b2bBoxesData]);

  useEffect(() => {
    const paymentData = {
      paymentMethod,
      collectibleAmount,
      insuranceOption,
    };
    localStorage.setItem(
      STORAGE_KEYS.PAYMENT_INFO,
      JSON.stringify(paymentData)
    );
  }, [paymentMethod, collectibleAmount, insuranceOption]);

  useEffect(() => {
    if (selectedServiceDetails) {
      localStorage.setItem(
        STORAGE_KEYS.SELECTED_SERVICE,
        JSON.stringify(selectedServiceDetails)
      );
    }
  }, [selectedServiceDetails]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TEMP_ORDER_ID, tempOrderId);
  }, [tempOrderId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDER_SOURCE, orderSource);
  }, [orderSource]);

  useEffect(() => {
    // Clear selected service when navigating back to step 1
    if (activeStep === 1 && selectedServiceDetails) {
      setSelectedServiceDetails(null);
      localStorage.removeItem(STORAGE_KEYS.SELECTED_SERVICE);
    }
  }, [activeStep, selectedServiceDetails]);

  // Function to clear all saved data (call when order is successfully placed)
  const clearSavedOrderData = () => {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });

    // Add B2B storage keys
    const B2B_STORAGE_KEYS = {
      B2B_BOXES: "order-form-b2b-boxes",
      B2B_BOX_COUNT: "order-form-b2b-box-count",
      B2B_CATALOG_PRODUCTS: "order-form-b2b-catalog-products",
      B2B_PACKAGE_NAME_SEARCH: "order-form-b2b-package-name-search",
      B2B_PACKAGE_SEARCH_RESULTS: "order-form-b2b-package-search-results",
      B2B_FILTERED_PACKAGE_RESULTS: "order-form-b2b-filtered-package-results",
      B2B_SAVED_STATES: "order-form-b2b-saved-states",
    };

    Object.values(B2B_STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });

    // Clear OrderForm B2C storage keys
    const ORDERFORM_STORAGE_KEYS = {
      BOX_DATA: "order-form-box-data",
      BOX_COUNT: "order-form-box-count",
      SELECTED_BOX: "order-form-selected-box",
      ALL_BOXES_IDENTICAL: "order-form-all-boxes-identical",
      PRODUCT_SUGGESTIONS: "order-form-product-suggestions",
      BOX_SUGGESTIONS: "order-form-box-suggestions",
      SAVED_PRODUCTS: "order-form-saved-products",
      SAVED_BOX: "order-form-saved-box",
    };

    Object.values(ORDERFORM_STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  };

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
  const handleBoxDataUpdate = useCallback(
    (
      boxes: BoxData[],
      metadata: { allBoxesIdentical: boolean; boxCount: number }
    ) => {
      setBoxesData(boxes);
      setAllBoxesIdentical(metadata.allBoxesIdentical);
      setBoxCount(metadata.boxCount);

      // Also update packageDetails if at least one box exists
      if (boxes.length > 0) {
        const firstBox = boxes[0];
        setPackageDetails({
          packageType: firstBox.dimensions.name?.toString() || "",
          weight: firstBox.dimensions.weight?.toString() || "",
          dimensions: {
            length: firstBox.dimensions.l?.toString() || "",
            width: firstBox.dimensions.b?.toString() || "",
            height: firstBox.dimensions.h?.toString() || "",
          },
          itemDescription:
            firstBox.products.length > 0
              ? firstBox.products[0].name?.toString() || ""
              : "",
          itemValue: firstBox.products
            .reduce(
              (total, product) => total + (Number(product.totalPrice) || 0),
              0
            )
            .toString(),
          totalItems: firstBox.products.length.toString(),
        });
      }
    },
    []
  );

  // Handle B2B box data updates from OrderFormB2B
  const handleB2BBoxDataUpdate = useCallback((boxes: B2BBox[]) => {
    // Store the original B2B boxes data
    setB2BBoxesData(boxes);

    // Convert B2B box format to BoxData format for OrderSummary
    const convertedBoxes: BoxData[] = boxes.map((box) => {
      // Convert each package to a product
      const products: Product[] = box.packages.map((pkg) => ({
        id: pkg.id,
        name: pkg.name,
        quantity: pkg.quantity,
        unitPrice: pkg.unitPrice,
        unitWeight: pkg.unitWeight,
        totalPrice: pkg.totalPrice,
        totalWeight: pkg.totalWeight,
        isExpanded: pkg.isExpanded,
        selectedSuggestion: null,
        isManuallyEdited: !pkg.isSaved,
        boxInfo: {
          l: pkg.length,
          b: pkg.breadth,
          h: pkg.height,
          discount: pkg.discount,
          tax: pkg.tax,
          hsn: pkg.hsn,
          sku: pkg.sku,
        },
      }));

      // Create the converted BoxData
      return {
        id: box.id,
        dimensions: {
          l: box.packages[0]?.length || 0,
          b: box.packages[0]?.breadth || 0,
          h: box.packages[0]?.height || 0,
          weight: box.packages.reduce(
            (total, pkg) => total + (Number(pkg.totalWeight) || 0),
            0
          ),
          name: `Box ${box.id}`,
          isManuallyEdited: false,
        },
        products: products,
        selectedBoxSuggestion: null,
      };
    });

    // Update the boxesData state with the converted data
    setBoxesData(convertedBoxes);

    // Also update packageDetails if at least one box exists
    if (boxes.length > 0) {
      const firstBox = boxes[0];
      const firstPackage = firstBox.packages[0];

      if (firstPackage) {
        setPackageDetails({
          packageType: `Box ${firstBox.id}`,
          weight: firstPackage.totalWeight?.toString() || "",
          dimensions: {
            length: firstPackage.length?.toString() || "",
            width: firstPackage.breadth?.toString() || "",
            height: firstPackage.height?.toString() || "",
          },
          itemDescription: firstPackage.name?.toString() || "",
          itemValue: firstPackage.totalPrice?.toString() || "",
          totalItems: firstBox.packages.length.toString(),
        });
      }
    }
  }, []);

  // Function to calculate total invoice value from all boxes
  const calculateTotalInvoiceValue = () => {
    if (order.orderType === "B2C") {
      return boxesData.reduce((total, box) => {
        return (
          total +
          box.products.reduce((boxTotal, product) => {
            return boxTotal + (Number(product.totalPrice) || 0);
          }, 0)
        );
      }, 0);
    } else {
      return b2bBoxesData.reduce((total, box) => {
        return (
          total +
          box.packages.reduce((boxTotal, pkg) => {
            return boxTotal + (Number(pkg.totalPrice) || 0);
          }, 0)
        );
      }, 0);
    }
  };

  // Helper function to prepare box data for API
  const prepareBoxInfoPayload = () => {
    const boxes = order.orderType === "B2C" ? boxesData : b2bBoxesData;
    const boxesToProcess =
      order.orderType === "B2C" && allBoxesIdentical ? [boxes[0]] : boxes;

    const transformedBoxes = boxesToProcess.map((box) => {
      if (order.orderType === "B2C") {
        const b2cBox = box as BoxData;
        const invoiceValue = b2cBox.products.reduce(
          (total, product) => total + (Number(product.totalPrice) || 0),
          0
        );

        return {
          boxId: b2cBox.selectedBoxSuggestion?.boxId || uuidv4(),
          name: b2cBox.dimensions.name || `Box ${b2cBox.id}`,
          length: b2cBox.dimensions.l,
          breadth: b2cBox.dimensions.b,
          height: b2cBox.dimensions.h,
          deadWeight: b2cBox.dimensions.weight || 0.1,
          appliedWeight: b2cBox.dimensions.weight || 0.1,
          volumetricWeight: calculateVolumetricWeight(
            Number(b2cBox.dimensions.l || 0),
            Number(b2cBox.dimensions.b || 0),
            Number(b2cBox.dimensions.h || 0)
          ),
          weightUnit: "kg",
          measureUnit: "cm",
          color: "black",
          price: 0,
          currency: "INR",
          divisor: 5000,
          qty: allBoxesIdentical ? boxCount : 1,
          products: b2cBox.products.map((product) => ({
            name: product.name,
            qty: Number(product.quantity) || 1,
            unitPrice: Number(product.unitPrice) || 0,
            unitTax: Number(product.boxInfo.tax) || 0,
            deadWeight: Number(product.unitWeight) || 0,
            appliedWeight: Number(product.unitWeight) || 0,
            volumetricWeight: 0,
            length: product.boxInfo.l || 1,
            breadth: product.boxInfo.b || 1,
            height: product.boxInfo.h || 1,
            sku: product.boxInfo.sku || "",
            hsnCode: product.boxInfo.hsn || "",
            measureUnit: "cm",
            weightUnit: "kg",
            currency: "INR",
          })),
          codInfo: {
            isCod: paymentMethod === "Cash on Delivery",
            collectableAmount:
              paymentMethod === "Cash on Delivery"
                ? (Number(collectibleAmount) || 0) / boxes.length
                : 0,
            invoiceValue: invoiceValue,
          },
          insurance: {
            isInsured: insuranceOption === "withInsurance",
            amount: 0,
          },
          isFragile: false,
          podInfo: {
            isPod: false,
          },
          tracking: {
            awb: "",
            label: "",
            status: [],
          },
        };
      } else {
        const b2bBox = box as B2BBox;
        const invoiceValue = b2bBox.packages.reduce(
          (total, pkg) => total + (Number(pkg.totalPrice) || 0),
          0
        );

        const firstPackage = b2bBox.packages[0] || {};

        return {
          boxId: uuidv4(),
          name: `Box ${b2bBox.id}`,
          length: firstPackage.length || 1,
          breadth: firstPackage.breadth || 1,
          height: firstPackage.height || 1,
          deadWeight:
            b2bBox.packages.reduce(
              (total, pkg) => total + (Number(pkg.totalWeight) || 0),
              0
            ) || 0.1,
          appliedWeight:
            b2bBox.packages.reduce(
              (total, pkg) => total + (Number(pkg.totalWeight) || 0),
              0
            ) || 0.1,
          volumetricWeight: calculateVolumetricWeight(
            Number(firstPackage.length || 0),
            Number(firstPackage.breadth || 0),
            Number(firstPackage.height || 0)
          ),
          weightUnit: "kg",
          measureUnit: "cm",
          color: "black",
          price: 0,
          currency: "INR",
          divisor: 5000,
          products: b2bBox.packages.map((pkg) => ({
            name: pkg.name,
            qty: Number(pkg.quantity) || 1,
            unitPrice: Number(pkg.unitPrice) || 0,
            unitTax: Number(pkg.tax) || 0,
            deadWeight: Number(pkg.unitWeight) || 0.1,
            appliedWeight: Number(pkg.unitWeight) || 0.1,
            volumetricWeight: 0,
            length: pkg.length || 1,
            breadth: pkg.breadth || 1,
            height: pkg.height || 1,
            sku: pkg.sku || "",
            hsnCode: pkg.hsn || "",
            measureUnit: "cm",
            weightUnit: "kg",
            currency: "INR",
          })),
          codInfo: {
            isCod: paymentMethod === "Cash on Delivery",
            collectableAmount:
              paymentMethod === "Cash on Delivery"
                ? (Number(collectibleAmount) || 0) / boxes.length
                : 0,
            invoiceValue: invoiceValue,
          },
          insurance: {
            isInsured: insuranceOption === "withInsurance",
            amount: 0,
          },
          isFragile: false,
          podInfo: {
            isPod: false,
          },
          tracking: {
            awb: "",
            label: "",
            status: [],
          },
        };
      }
    });

    return transformedBoxes;
  };

  // Helper function to calculate volumetric weight
  const calculateVolumetricWeight = (
    length: number,
    breadth: number,
    height: number
  ) => {
    const divisor = 5000;
    const weight = (length * breadth * height) / divisor;
    return parseFloat(weight.toFixed(4));
  };

  // Handle proceeding to next step
  const handleProceedToNextStep = async () => {
    // Reset previous validation errors
    setFormErrors({
      pickup: {
        contactNo: false,
        address: false,
        name: false,
        pincode: false,
        city: false,
        state: false,
        addressLine1: false,
        addressLine2: false,
        landmark: false,
        gstNo: false,
        email: false,
      },
      delivery: {
        contactNo: false,
        address: false,
        name: false,
        pincode: false,
        city: false,
        state: false,
        addressLine1: false,
        addressLine2: false,
        landmark: false,
        gstNo: false,
        email: false,
      },
    });
    setBoxValidationErrors({});

    // Check required fields for pickup form
    const pickupErrors = {
      contactNo: !pickupFormValues.contactNo.trim(),
      address: !pickupFormValues.address.trim(),
      name: !pickupFormValues.name.trim(),
      pincode: !pickupFormValues.pincode.trim(),
      city: !pickupFormValues.city.trim(),
      state: !pickupFormValues.state.trim(),
      addressLine1: !pickupFormValues.addressLine1.trim(),
      addressLine2: !pickupFormValues.addressLine2.trim(),
      landmark: !pickupFormValues.landmark.trim(),
      gstNo: order.orderType === "B2B" && !pickupFormValues.gstNo.trim(),
      email: false,
    };

    // Check required fields for delivery form
    const deliveryErrors = {
      contactNo: !deliveryFormValues.contactNo.trim(),
      address: !deliveryFormValues.address.trim(),
      name: !deliveryFormValues.name.trim(),
      pincode: !deliveryFormValues.pincode.trim(),
      city: !deliveryFormValues.city.trim(),
      state: !deliveryFormValues.state.trim(),
      addressLine1: !deliveryFormValues.addressLine1.trim(),
      addressLine2: !deliveryFormValues.addressLine2.trim(),
      landmark: !deliveryFormValues.landmark.trim(),
      gstNo: order.orderType === "B2B" && !deliveryFormValues.gstNo.trim(),
      email: false,
    };

    // Check if there are any validation errors in address forms
    const hasPickupErrors = Object.values(pickupErrors).some((error) => error);
    const hasDeliveryErrors = Object.values(deliveryErrors).some(
      (error) => error
    );

    // Update validation error states for address forms
    setFormErrors({
      pickup: pickupErrors,
      delivery: deliveryErrors,
    });

    setValidationErrors({
      pickup: hasPickupErrors,
      delivery: hasDeliveryErrors,
    });

    // Validate box data based on order type
    let hasBoxErrors = false;
    const newBoxErrors: { [boxId: number]: { [fieldId: string]: boolean } } =
      {};

    if (order.orderType === "B2C") {
      // Validate B2C boxes
      boxesData.forEach((box) => {
        newBoxErrors[box.id] = {};

        // Check box dimensions
        if (!box.dimensions.name) newBoxErrors[box.id][`box-name`] = true;
        if (!box.dimensions.l) newBoxErrors[box.id][`box-length`] = true;
        if (!box.dimensions.b) newBoxErrors[box.id][`box-breadth`] = true;
        if (!box.dimensions.h) newBoxErrors[box.id][`box-height`] = true;

        // Check each product
        box.products.forEach((product) => {
          if (!product.name)
            newBoxErrors[box.id][`product-${product.id}-name`] = true;
          if (!product.quantity)
            newBoxErrors[box.id][`product-${product.id}-quantity`] = true;
          if (!product.unitPrice)
            newBoxErrors[box.id][`product-${product.id}-unitPrice`] = true;
          if (!product.unitWeight)
            newBoxErrors[box.id][`product-${product.id}-unitWeight`] = true;
        });
      });
    } else {
      // Validate B2B boxes
      b2bBoxesData.forEach((box) => {
        newBoxErrors[box.id] = {};

        // Check each package
        box.packages.forEach((pkg) => {
          if (!pkg.name) newBoxErrors[box.id][`package-${pkg.id}-name`] = true;
          if (!pkg.quantity)
            newBoxErrors[box.id][`package-${pkg.id}-quantity`] = true;
          if (!pkg.unitPrice)
            newBoxErrors[box.id][`package-${pkg.id}-unitPrice`] = true;
          if (!pkg.unitWeight)
            newBoxErrors[box.id][`package-${pkg.id}-unitWeight`] = true;
          if (!pkg.length)
            newBoxErrors[box.id][`package-${pkg.id}-length`] = true;
          if (!pkg.breadth)
            newBoxErrors[box.id][`package-${pkg.id}-breadth`] = true;
          if (!pkg.height)
            newBoxErrors[box.id][`package-${pkg.id}-height`] = true;
        });
      });
    }

    // Check if there are any box errors
    for (const boxId in newBoxErrors) {
      if (Object.keys(newBoxErrors[boxId]).length > 0) {
        hasBoxErrors = true;
        break;
      }
    }

    // Set box validation errors
    setBoxValidationErrors(newBoxErrors);

    // If there are validation errors, show a toast and return
    if (hasPickupErrors || hasDeliveryErrors || hasBoxErrors) {
      toast.error("Please fill in all required fields");

      // Automatically expand details sections if they contain errors
      if (hasPickupErrors && !showPickupDetails) {
        setShowPickupDetails(true);
      }

      if (hasDeliveryErrors && !showDeliveryDetails) {
        setShowDeliveryDetails(true);
      }

      // Scroll to the top of the form to show validation errors
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Check if box data exists for order
    if (
      (order.orderType === "B2C" && boxesData.length === 0) ||
      (order.orderType === "B2B" && b2bBoxesData.length === 0)
    ) {
      toast.error("Please add at least one package to your order");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create pickup address payload
      const pickupAddressPayload = {
        fullAddress: pickupFormValues.address,
        flatNo: pickupFormValues.addressLine1,
        locality: pickupFormValues.addressLine2,
        landmark: pickupFormValues.landmark,
        pincode: pickupFormValues.pincode,
        city: pickupFormValues.city,
        state: pickupFormValues.state,
        country: "India",
        addressType: "warehouse",
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
          mobileNo: pickupFormValues.contactNo,
          emailId: pickupFormValues.email,
          type: "warehouse associate",
        },
        pickupDate: new Date().getTime(),
      };

      // Step 1: Submit pickup information
      const response = await POST(ADD_PICKUP_LOCATION, {
        pickupAddress: pickupAddressPayload,
        returnAddress: pickupAddressPayload,
        branding: {
          id: uuidv4(),
          name: "",
          logo: "",
          address: "",
          contact: { name: "", mobileNo: "" },
          isActive: false,
        },
        transit: order.reverseState,
        orderType: order.orderType,
      });

      if (!response?.data?.success) {
        toast.error(
          response?.data?.message || "Failed to submit pickup information"
        );
        return;
      }

      const tempId = response.data.data[0]?.tempOrderId;
      const source = response.data.data[0]?.source;

      // Save these values for subsequent API calls
      setTempOrderId(tempId);
      setOrderSource(source);

      // Create delivery address payload
      const deliveryAddressPayload = {
        recipientType: "consumer",
        fullAddress: deliveryFormValues.address,
        flatNo: deliveryFormValues.addressLine1,
        locality: deliveryFormValues.addressLine2,
        landmark: deliveryFormValues.landmark,
        pincode: deliveryFormValues.pincode,
        city: deliveryFormValues.city,
        state: deliveryFormValues.state,
        country: "India",
        addressType: "warehouse",
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
          mobileNo: deliveryFormValues.contactNo,
          emailId: deliveryFormValues.email,
          type: "warehouse associate",
        },
      };

      // Step 2: Submit delivery information
      const deliveryResponse = await POST(ADD_DELIVERY_LOCATION, {
        deliveryAddress: deliveryAddressPayload,
        billingAddress: deliveryAddressPayload,
        orderType: order.orderType,
        gstNumber: deliveryFormValues.gstNo || "",
        tempOrderId: tempId,
        source: source,
      });

      if (!deliveryResponse?.data?.success) {
        toast.error(
          deliveryResponse?.data?.message ||
            "Failed to submit delivery information"
        );
        return;
      }

      // Step 3: Submit box information
      const boxesInfoPayload = {
        boxInfo: prepareBoxInfoPayload(),
        codInfo: {
          isCod: paymentMethod === "Cash on Delivery",
          collectableAmount: Number(collectibleAmount) || 0,
          invoiceValue: calculateTotalInvoiceValue(),
        },
        insurance: {
          isInsured: insuranceOption === "withInsurance",
          amount: 0,
        },
        tempOrderId: tempId,
        source: source,
      };

      const boxInfoResponse = await POST(ADD_BOX_INFO, boxesInfoPayload);

      // Call POST_SET_ORDER_ID independently
      const orderIdPayload = {
        orderId: "",
        eWayBillNo: "",
        tempOrderId: tempId,
        source: source,
      };
      await POST(POST_SET_ORDER_ID, orderIdPayload);

      if (boxInfoResponse?.data?.success) {
        // Proceed to next step on success
        setActiveStep(2);
        toast.success("Order information submitted successfully!");
      } else {
        toast.error(
          boxInfoResponse?.data?.message || "Failed to submit box information"
        );
      }
    } catch (error) {
      console.error("Error in order submission:", error);
      toast.error("An error occurred while processing your order");
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearBoxFieldError = (boxId: number, fieldId: string) => {
    setBoxValidationErrors((prev) => {
      const newErrors = { ...prev };
      if (newErrors[boxId]) {
        // Remove this specific field error
        const updatedBoxErrors = { ...newErrors[boxId] };
        delete updatedBoxErrors[fieldId];
        newErrors[boxId] = updatedBoxErrors;
      }
      return newErrors;
    });
  };

  const handleServiceSelect = (service: any) => {
    // Reset the orderData in SummaryForOrder component when a new service is selected
    setSelectedServiceDetails(null);

    // Short delay to ensure UI updates before setting the new service
    setTimeout(() => {
      setSelectedServiceDetails(service);
    }, 100);
  };

  // Update handlePlaceOrder to clear localStorage on success
  const handlePlaceOrder = async () => {
    if (!selectedServiceDetails) {
      toast.error("Please select a shipping service");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare the payload for REVERSE_ORDER API
      const orderPayload = {
        pickupDetails: {
          fullAddress: `${pickupFormValues.addressLine1} ${pickupFormValues.addressLine2}, ${pickupFormValues.city}, ${pickupFormValues.state} ${pickupFormValues.pincode}`,
          pincode: parseInt(pickupFormValues.pincode),
          contact: {
            name: pickupFormValues.name,
            mobileNo: parseInt(pickupFormValues.contactNo),
          },
        },
        deliveryDetails: {
          fullAddress: `${deliveryFormValues.addressLine1} ${deliveryFormValues.addressLine2}, ${deliveryFormValues.city}, ${deliveryFormValues.state} ${deliveryFormValues.pincode}`,
          pincode: parseInt(deliveryFormValues.pincode),
          contact: {
            name: deliveryFormValues.name,
            mobileNo: parseInt(deliveryFormValues.contactNo),
          },
          gstNumber: deliveryFormValues.gstNo || "",
        },
        boxInfo: prepareBoxInfoForReverseOrder(),
        orderType: order.orderType,
        transit: order.reverseState,
        courierPartner: selectedServiceDetails.partnerName || "",
        courierPartnerServices: selectedServiceDetails.partnerServiceName || "",
        source: orderSource || "",
        pickupDate: new Date().getTime().toString(),
        gstNumber: pickupFormValues.gstNo || "",
        orderId: order?.orderId || "",
        eWayBillNo: "",
        brandName: "Your Brand",
        brandLogo: "",
        tempOrderId: tempOrderId || "",
      };

      // Call the REVERSE_ORDER API
      const response = await POST(REVERSE_ORDER, orderPayload);

      if (response?.data?.success) {
        toast.success("Order placed successfully!");

        // Clear all saved order data on successful order placement
        clearSavedOrderData();

        const awbNumbers =
          response.data.data[0]?.awbs
            ?.map((item: any) => item.tracking?.awb)
            .filter(Boolean) || [];

        navigate("/orders/booked", {
          state: {
            source: orderSource,
            orderId: tempOrderId,
            awbNumbers: awbNumbers,
          },
        });
      } else {
        toast.error(response?.data?.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("An error occurred while placing your order");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to prepare box info for REVERSE_ORDER API
  const prepareBoxInfoForReverseOrder = () => {
    // Determine which box data to use based on order type
    const boxes = order.orderType === "B2C" ? boxesData : b2bBoxesData;
    const boxesToProcess =
      order.orderType === "B2C" && allBoxesIdentical ? [boxes[0]] : boxes;

    // Transform boxes to the format expected by REVERSE_ORDER API
    return boxesToProcess.map((box, index) => {
      // For B2C boxes
      if (order.orderType === "B2C") {
        const b2cBox = box as BoxData;
        const invoiceValue = b2cBox.products.reduce(
          (total, product) => total + (Number(product.totalPrice) || 0),
          0
        );

        // Get the first product for example purposes (or combine all)
        const firstProduct = b2cBox.products[0] || {};

        return {
          name: `box_${index + 1}`,
          weightUnit: "Kg",
          deadWeight: b2cBox.dimensions.weight || 1,
          length: b2cBox.dimensions.l || 1,
          breadth: b2cBox.dimensions.b || 1,
          height: b2cBox.dimensions.h || 1,
          measureUnit: "cm",
          qty: allBoxesIdentical ? boxCount : 1,
          products: b2cBox.products.map((product) => ({
            name: product.name || "Product",
            category: "General",
            sku: product.boxInfo.sku || "sku",
            qty: Number(product.quantity) || 1,
            unitPrice: Number(product.unitPrice) || 0,
            unitTax: Number(product.boxInfo.tax) || 0,
            weightUnit: "kg",
            deadWeight: Number(product.unitWeight) || 1,
            length: product.boxInfo.l || 1,
            breadth: product.boxInfo.b || 1,
            height: product.boxInfo.h || 1,
            measureUnit: "cm",
          })),
          codInfo: {
            isCod: paymentMethod === "Cash on Delivery",
            collectableAmount:
              paymentMethod === "Cash on Delivery"
                ? Number(collectibleAmount) || 0
                : 0,
            invoiceValue: invoiceValue || 0,
          },
          podInfo: {
            isPod: false,
          },
          insurance: insuranceOption === "withInsurance",
        };
      }
      // For B2B boxes
      else {
        const b2bBox = box as B2BBox;
        const invoiceValue = b2bBox.packages.reduce(
          (total, pkg) => total + (Number(pkg.totalPrice) || 0),
          0
        );

        // Get the first package for reference
        const firstPackage = b2bBox.packages[0] || {};

        return {
          name: `box_${index + 1}`,
          weightUnit: "Kg",
          deadWeight:
            b2bBox.packages.reduce(
              (total, pkg) => total + (Number(pkg.totalWeight) || 0),
              0
            ) || 1,
          length: firstPackage.length || 1,
          breadth: firstPackage.breadth || 1,
          height: firstPackage.height || 1,
          measureUnit: "cm",
          products: b2bBox.packages.map((pkg) => ({
            name: pkg.name || "Package",
            category: "General",
            sku: pkg.sku || "sku",
            qty: Number(pkg.quantity) || 1,
            unitPrice: Number(pkg.unitPrice) || 0,
            unitTax: Number(pkg.tax) || 0,
            weightUnit: "kg",
            deadWeight: Number(pkg.unitWeight) || 1,
            length: pkg.length || 1,
            breadth: pkg.breadth || 1,
            height: pkg.height || 1,
            measureUnit: "cm",
          })),
          codInfo: {
            isCod: paymentMethod === "Cash on Delivery",
            collectableAmount:
              paymentMethod === "Cash on Delivery"
                ? Number(collectibleAmount) || 0
                : 0,
            invoiceValue: invoiceValue || 0,
          },
          podInfo: {
            isPod: false,
          },
          insurance: insuranceOption === "withInsurance",
        };
      }
    });
  };

  // Clear field error function
  const clearFieldError = (formType: "pickup" | "delivery", field: string) => {
    setFormErrors((prev) => ({
      ...prev,
      [formType]: {
        ...prev[formType],
        [field]: false,
      },
    }));

    // Also reset the overall validation error state if appropriate
    if (formType === "pickup") {
      setValidationErrors((prev) => ({
        ...prev,
        pickup: false,
      }));
    } else if (formType === "delivery") {
      setValidationErrors((prev) => ({
        ...prev,
        delivery: false,
      }));
    }
  };

  useEffect(() => {
    // Only set the collectible amount if payment method is Cash on Delivery
    if (paymentMethod === "Cash on Delivery") {
      // Get the total invoice value
      const invoiceValue = calculateTotalInvoiceValue();
      // Set collectible amount to the invoice value (as a string)
      setCollectibleAmount(invoiceValue.toString());
    }
  }, [paymentMethod, boxesData, b2bBoxesData, order.orderType]);

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
            <>
              <Collapsible
                title="Order Information"
                className="mb-10"
                defaultOpen={true}
              >
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

              <Collapsible
                title="Where should we pick up and deliver your order?"
                className="mb-10"
                defaultOpen={true}
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
                  formErrors={formErrors}
                  orderType={order.orderType}
                  clearFieldError={clearFieldError}
                />
              </Collapsible>

              <Collapsible
                title="Let us know your package information"
                className="mb-10"
                defaultOpen={true}
              >
                {order.orderType === "B2C" ? (
                  <OrderForm
                    key="b2c-form"
                    onBoxDataUpdate={handleBoxDataUpdate}
                    validationErrors={boxValidationErrors}
                    clearFieldError={clearBoxFieldError}
                  />
                ) : (
                  <OrderFormB2B
                    key="b2b-form"
                    onBoxDataUpdate={handleB2BBoxDataUpdate}
                    validationErrors={boxValidationErrors}
                    clearFieldError={clearBoxFieldError}
                  />
                )}
              </Collapsible>

              <Collapsible
                title="Payment Information"
                className="mb-10"
                defaultOpen={true}
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

              {/* Proceed Button */}
              <div className="mt-4 mb-4">
                <div className="rounded-lg shadow-md bg-white p-2 border">
                  <div className="flex justify-end">
                    <OneButton
                      text={
                        isSubmitting
                          ? "Processing..."
                          : "Proceed to Shipping Options"
                      }
                      onClick={handleProceedToNextStep}
                      variant="primary"
                      className="!rounded-full"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>
            </>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Shipping Options</h2>
            <EWayBillCard totalInvoiceValue={calculateTotalInvoiceValue()} />
            <ShippingServiceSelector
              tempOrderId={tempOrderId}
              orderSource={orderSource}
              onServiceSelect={handleServiceSelect}
            />
            {selectedServiceDetails && (
              <SummaryForOrder
                tempOrderId={tempOrderId}
                orderSource={orderSource}
                selectedServiceId={selectedServiceDetails.partnerServiceId}
                key={`${selectedServiceDetails.partnerServiceId}-${Date.now()}`}
              />
            )}

            {/* Add Place Order button at the bottom */}
            <div className="mt-4 mb-4">
              <div className="rounded-lg shadow-md bg-white p-2 border">
                <div className="flex justify-end">
                  <div className="flex items-center gap-4">
                    <OneButton
                      text="Back to Details"
                      onClick={() => setActiveStep(1)}
                      variant="secondary"
                      className="!rounded-full"
                    />
                    <OneButton
                      text={isSubmitting ? "Processing..." : "Place Order"}
                      onClick={handlePlaceOrder}
                      variant="primary"
                      className="!rounded-full"
                      disabled={isSubmitting || !selectedServiceDetails}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderCreation;
