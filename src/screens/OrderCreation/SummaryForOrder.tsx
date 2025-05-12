
import React, { useState, useEffect } from 'react';
import { POST } from '../../utils/webService';
import { GET_LATEST_ORDER } from '../../utils/ApiUrls';

// --- Component Prop Interfaces ---
interface PickupDetailsProps {
  name: string;
  phone: string;
  address?: string;
}
// ... (other props interfaces: DeliveryDetailsProps, PackageDetailsProps, ShippingDetailsProps, SummaryForOrderProps)
interface DeliveryDetailsProps {
  name: string;
  phone: string;
  address?: string;
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

// --- API Interfaces ---
interface ApiAddressContact {
  name?: string;
  mobileNo?: string;
}
// ... (other API interfaces: ApiWorkingDays, ApiAddress, ApiServiceDetails, ApiBoxInfo, ApiCodInfo, ApiInsuranceInfo, ApiOrderData, ApiPostResponse)
interface ApiWorkingDays {
  [key: string]: boolean; 
}

interface ApiAddress {
  contact?: ApiAddressContact;
  flatNo?: string;
  locality?: string;
  sector?: string;
  landmark?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  gstNumber?: string;
  workingDays?: ApiWorkingDays;
  workingHours?: string;
}

interface ApiServiceDetails {
  appliedWeight?: number;
  partnerName?: string;
  serviceMode?: string;
  base?: number;
  total?: number;
  variables?: number;
  cod?: number;
  tax?: number;
  partnerServiceId?: string;
}

interface ApiBoxInfo {
  [key: string]: any; 
}

interface ApiCodInfo {
  invoiceValue?: number;
  isCod?: boolean;
}

interface ApiInsuranceInfo {
  isInsured?: boolean;
}

interface ApiOrderData {
  pickupAddress?: ApiAddress;
  deliveryAddress?: ApiAddress;
  boxInfo?: ApiBoxInfo[];
  service?: ApiServiceDetails;
  codInfo?: ApiCodInfo;
  insurance?: ApiInsuranceInfo;
  zone?: string;
  yaariCash?: number;
}

interface ApiPostResponse {
  success: boolean;
  data: ApiOrderData[];
  message?: string;
}


// --- Transformed Data Interface ---
interface TransformedOrderData {
  pickupDetails: PickupDetailsProps;
  deliveryDetails: DeliveryDetailsProps;
  packageDetails: PackageDetailsProps;
  shippingDetails: ShippingDetailsProps;
}

// NEW: Function to format address specifically for tooltip (excluding GST, working days/hours)
const formatAddressForTooltip = (addressObj?: ApiAddress): string => {
  if (!addressObj) return "Address not available";

  const parts: string[] = [
    addressObj.flatNo,
    addressObj.locality,
    addressObj.sector,
    addressObj.landmark,
    (addressObj.city || addressObj.state || addressObj.country) ? `${addressObj.city || ''}, ${addressObj.state || ''}, ${addressObj.country || ''}`.replace(/ , /g, ', ').replace(/^, |, $/g, '') : undefined,
    addressObj.pincode ? `Pincode: ${addressObj.pincode}` : undefined
  ].filter((part?: string): part is string => part !== undefined && part.trim() !== "" && part !== ", ,");
  
  return parts.length > 0 ? parts.join("\n") : "Address details incomplete";
};


const SummaryForOrder: React.FC<SummaryForOrderProps> = (props) => {
  const { tempOrderId, orderSource, selectedServiceId } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [orderData, setOrderData] = useState<TransformedOrderData | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);
  const [lastSelectedServiceId, setLastSelectedServiceId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (tempOrderId && orderSource && selectedServiceId &&
        (selectedServiceId !== lastSelectedServiceId || orderData === null)) {
      setOrderData(null);
      setIsLoading(true);
      setLastSelectedServiceId(selectedServiceId);
      setRetryCount(0);
      const timer = setTimeout(() => {
        fetchLatestOrder();
      }, 1000);
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [tempOrderId, orderSource, selectedServiceId, lastSelectedServiceId, orderData]);

  useEffect(() => {
    if (orderData && !isValidOrderData(orderData) && retryCount < 3) {
      const timer = setTimeout(() => {
        console.log(`Retrying fetch, attempt ${retryCount + 1}`);
        setRetryCount(prev => prev + 1);
        fetchLatestOrder();
      }, 1500 + retryCount * 500); 
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderData, retryCount]); 

  const isValidOrderData = (data: TransformedOrderData): boolean => {
    return data.shippingDetails.courier !== "N/A" &&
           data.shippingDetails.grandTotal !== "N/A" &&
           data.packageDetails.totalWeight !== "N/A";
  };

  const fetchLatestOrder = async (): Promise<void> => {
    if (!tempOrderId || !orderSource) return;
    setError(null);
    try {
      console.log(`Workspaceing order data for service ID: ${selectedServiceId}, attempt: ${retryCount + 1}`);
      const response: { data?: ApiPostResponse } = await POST(GET_LATEST_ORDER, {
        tempOrderId: tempOrderId,
        source: orderSource
      });

      if (response?.data?.success) {
        const fetchedOrder: ApiOrderData | undefined = response.data.data[0];
        if (!fetchedOrder) {
            setError("No order data found in the response.");
            setIsLoading(false);
            return;
        }
        // MODIFIED: Use new formatter for tooltip addresses
        const pickupAddressForTooltip = formatAddressForTooltip(fetchedOrder.pickupAddress);
        const deliveryAddressForTooltip = formatAddressForTooltip(fetchedOrder.deliveryAddress);

        const transformedData: TransformedOrderData = {
          pickupDetails: {
            name: fetchedOrder.pickupAddress?.contact?.name || "N/A",
            phone: fetchedOrder.pickupAddress?.contact?.mobileNo ?
              `+91 ${fetchedOrder.pickupAddress.contact.mobileNo}` : "N/A",
            address: pickupAddressForTooltip // Assign simplified address
          },
          deliveryDetails: {
            name: fetchedOrder.deliveryAddress?.contact?.name || "N/A",
            phone: fetchedOrder.deliveryAddress?.contact?.mobileNo ?
              `+91 ${fetchedOrder.deliveryAddress.contact.mobileNo}` : "N/A",
            address: deliveryAddressForTooltip // Assign simplified address
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
            gstPercentage: (fetchedOrder.service?.tax !== undefined && fetchedOrder.service?.total !== undefined && (fetchedOrder.service.total - fetchedOrder.service.tax !== 0)) ?
              Number(((fetchedOrder.service.tax / (fetchedOrder.service.total - fetchedOrder.service.tax)) * 100).toFixed(0)) : 0
          }
        };
        const hasSelectedService = fetchedOrder.service?.partnerServiceId === selectedServiceId;
        if (hasSelectedService) {
          setOrderData(transformedData);
          setRetryCount(0); 
        } else if (retryCount < 3) {
          setTimeout(() => { setRetryCount(prev => prev + 1); }, 1500);
        } else {
          setOrderData(transformedData); 
        }
      } else {
        setError(response?.data?.message || "Failed to fetch order data");
      }
    } catch (err: any) { 
      const message = err?.message || "An error occurred while fetching order data";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };
  
  // This original formatAddress can be kept if used elsewhere, or removed if not.
  // For this specific request, it's effectively replaced by formatAddressForTooltip for the tooltip's direct data source.
  const formatAddress = (addressObj?: ApiAddress): string => {
    if (!addressObj) return "Address not available";
    const parts: string[] = [
      addressObj.flatNo,
      addressObj.locality,
      addressObj.sector,
      addressObj.landmark,
      (addressObj.city || addressObj.state || addressObj.country) ? `${addressObj.city || ''}, ${addressObj.state || ''}, ${addressObj.country || ''}`.replace(/ , /g, ', ').replace(/^, |, $/g, '') : undefined,
      addressObj.pincode ? `Pincode: ${addressObj.pincode}` : undefined
    ].filter((part?: string): part is string => part !== undefined && part.trim() !== "" && part !== ", ,");
    if (addressObj.gstNumber && addressObj.gstNumber.trim() !== "") {
      parts.push(`GST: ${addressObj.gstNumber}`);
    }
    if (addressObj.workingDays) {
      const days = Object.entries(addressObj.workingDays)
        .filter(([_, isActive]: [string, boolean]) => isActive)
        .map(([day]: [string, boolean]) => day.charAt(0).toUpperCase() + day.slice(1))
        .join(", ");
      if (days && addressObj.workingHours) {
        parts.push(`Working: ${days} from ${addressObj.workingHours}`);
      }
    }
    return parts.length > 0 ? parts.join("\n") : "Address details incomplete";
  };
  
  const handleRetry = (): void => {
    setRetryCount(0);
    setIsLoading(true);
    setError(null); 
    fetchLatestOrder();
  };

  // MODIFIED: Default fallbacks use formatAddressForTooltip
  const pickupDetailsToRender: PickupDetailsProps = props.pickupDetails || orderData?.pickupDetails || { name: "N/A", phone: "N/A", address: formatAddressForTooltip(undefined) };
  const deliveryDetailsToRender: DeliveryDetailsProps = props.deliveryDetails || orderData?.deliveryDetails || { name: "N/A", phone: "N/A", address: formatAddressForTooltip(undefined) };
  const packageDetailsToRender: PackageDetailsProps = props.packageDetails || orderData?.packageDetails || { boxes: 0, totalWeight: "N/A", invoice: "N/A", insurance: "N/A" };
  const shippingDetailsToRender: ShippingDetailsProps = props.shippingDetails || orderData?.shippingDetails || {
    courier: "N/A", courierType: "N/A", zone: "N/A", paymentMode: "N/A",
    basePrice: "N/A", grandTotal: "N/A", variableCharges: "N/A",
    codHandlingFees: "N/A", yaariCash: "N/A", shippingCost: "N/A", gstPercentage: 0
  };

  if (isLoading && !orderData) { 
    return (
      <div className="w-full mx-auto bg-gray-50 rounded-lg shadow-md p-6">
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

  if (error && !orderData) { 
    return (
      <div className="w-full mx-auto bg-gray-50 rounded-lg shadow-md p-6">
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
    <div className="w-full mx-auto bg-gray-50 rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <h1 className="font-semibold text-xl leading-7 mr-4">Your Order Summary</h1>
        <div className="bg-blue-100 text-blue-800 rounded-full px-4 py-1 font-semibold text-xs leading-5 text-center capitalize">
          B2C Shipment
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
              <h2 className="font-semibold text-base leading-5 capitalize">Pickup Details</h2>
              <div className="flex items-center mt-2">
                <p className="font-semibold text-sm leading-5 capitalize text-gray-700">{pickupDetailsToRender.name}</p>
                {/* MODIFIED Inlined Tooltip for Pickup Address */}
                {(!pickupDetailsToRender.address || pickupDetailsToRender.address === "Address not available" || pickupDetailsToRender.address === "Address details incomplete") ? (
                  <span 
                    className="ml-1 text-gray-400 cursor-not-allowed"
                    aria-label="Pickup Address (details not available)"
                    role="img"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                ) : (
                  <div className="relative group inline-flex items-center">
                    <button 
                      type="button"
                      className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                      aria-label="View Pickup Address"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                    <div 
                      className="absolute left-full top-1/2 transform -translate-y-1/2 ml-3 
                                 w-max max-w-[280px] sm:max-w-xs md:max-w-sm 
                                 bg-slate-800/95 text-white  /* MODIFIED: transparency and positioning */
                                 text-sm rounded-lg shadow-xl p-3 
                                 opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                                 invisible group-hover:visible z-50 pointer-events-none"
                      role="tooltip"
                    >
                      <h4 className="font-bold text-base mb-1.5 leading-tight">Pickup Address</h4>
                      <p className="whitespace-pre-line text-xs sm:text-sm leading-snug">{pickupDetailsToRender.address}</p>
                      {/* MODIFIED: Arrow pointing left */}
                      <div className="absolute top-1/2 right-full 
                                      transform -translate-y-1/2 
                                      w-0 h-0
                                      border-t-4 border-t-transparent
                                      border-b-4 border-b-transparent
                                      border-r-4 border-r-slate-800/95"> {/* Match bg with opacity */}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-gray-600 mt-1 font-normal text-sm leading-5">{pickupDetailsToRender.phone}</p>
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
              <h2 className="font-semibold text-base leading-5 capitalize">Delivery Details</h2>
              <div className="flex items-center mt-2">
                <p className="font-semibold text-sm leading-5 capitalize text-gray-700">{deliveryDetailsToRender.name}</p>
                {/* MODIFIED Inlined Tooltip for Delivery Address */}
                {(!deliveryDetailsToRender.address || deliveryDetailsToRender.address === "Address not available" || deliveryDetailsToRender.address === "Address details incomplete") ? (
                  <span 
                    className="ml-1 text-gray-400 cursor-not-allowed"
                    aria-label="Delivery Address (details not available)"
                    role="img"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                ) : (
                  <div className="relative group inline-flex items-center">
                    <button 
                      type="button"
                      className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                      aria-label="View Delivery Address"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                    <div 
                      className="absolute left-full top-1/2 transform -translate-y-1/2 ml-3
                                 w-max max-w-[280px] sm:max-w-xs md:max-w-sm 
                                 bg-slate-800/95 text-white /* MODIFIED: transparency and positioning */
                                 text-sm rounded-lg shadow-xl p-3 
                                 opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                                 invisible group-hover:visible z-50 pointer-events-none"
                      role="tooltip"
                    >
                      <h4 className="font-bold text-base mb-1.5 leading-tight">Delivery Address</h4>
                      <p className="whitespace-pre-line text-xs sm:text-sm leading-snug">{deliveryDetailsToRender.address}</p>
                      {/* MODIFIED: Arrow pointing left */}
                      <div className="absolute top-1/2 right-full
                                      transform -translate-y-1/2 
                                      w-0 h-0
                                      border-t-4 border-t-transparent
                                      border-b-4 border-b-transparent
                                      border-r-4 border-r-slate-800/95"> {/* Match bg with opacity */}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-gray-600 mt-1 font-normal text-sm leading-5">{deliveryDetailsToRender.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ... (Package Details and Shipping Details sections remain unchanged) ... */}
       <div className="border-t border-gray-200 pt-6 mb-6">
        <div className="flex items-start mb-4">
          <div className="mr-2 mt-1">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div className="w-full">
            <h2 className="font-semibold text-base leading-5 capitalize">Package Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div>
                <p className="text-gray-500 font-normal text-sm leading-5">Boxes</p>
                <p className="text-gray-800 font-semibold text-base leading-6">
                  {packageDetailsToRender.boxes || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-500 font-normal text-sm leading-5">Total Weight</p>
                <p className="text-gray-800 font-semibold text-base leading-6">
                  {packageDetailsToRender.totalWeight}
                </p>
              </div>
              <div>
                <p className="text-gray-500 font-normal text-sm leading-5">Invoice</p>
                <p className="text-gray-800 font-semibold text-base leading-6">
                  {packageDetailsToRender.invoice}
                </p>
              </div>
              <div>
                <p className="text-gray-500 font-normal text-sm leading-5">Insurance</p>
                <p className="text-gray-800 font-semibold text-base leading-6">
                  {packageDetailsToRender.insurance}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-start mb-4">
          <div className="mr-2 mt-1">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
            </svg>
          </div>
          <div className="w-full">
            <h2 className="font-semibold text-base leading-5 capitalize mb-4">Shipping Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <p className="text-gray-500 font-normal text-sm leading-5">Courier</p>
                <div>
                  <p className="text-gray-800 font-semibold text-base leading-6">
                    {shippingDetailsToRender.courier}
                  </p>
                  <p className="text-sm text-gray-600">
                    {shippingDetailsToRender.courierType !== "N/A" ? shippingDetailsToRender.courierType : ""}
                  </p>
                  <p className="text-sm text-gray-600">
                    {shippingDetailsToRender.zone !== "N/A" ? shippingDetailsToRender.zone : ""}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-gray-500 font-normal text-sm leading-5">Payment Mode</p>
                <p className="text-gray-800 font-semibold text-base leading-6">
                  {shippingDetailsToRender.paymentMode}
                </p>
              </div>
              <div>
                <p className="text-gray-500 font-normal text-sm leading-5">Base Price</p>
                <p className="text-gray-800 font-semibold text-base leading-6">
                  {shippingDetailsToRender.basePrice}
                </p>
              </div>
              <div>
                <p className="text-gray-500 font-normal text-sm leading-5">Grand Total</p>
                <p className="text-gray-800 font-semibold text-base leading-6">
                  {shippingDetailsToRender.grandTotal}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-gray-500 font-normal text-sm leading-5">Variable Charges</p>
                <div className="flex items-center">
                  <p className="text-gray-800 font-semibold text-base leading-6">
                    {shippingDetailsToRender.variableCharges}
                  </p>
                  {shippingDetailsToRender.variableCharges !== "N/A" && (
                     <svg className="w-4 h-4 text-gray-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                  )}
                </div>
              </div>
              <div>
                <p className="text-gray-500 font-normal text-sm leading-5">COD Handling Fees</p>
                <p className="text-gray-800 font-semibold text-base leading-6">
                  {shippingDetailsToRender.codHandlingFees}
                </p>
              </div>
              <div>
                <p className="text-gray-500 font-normal text-sm leading-5">YaariCash</p>
                <p className={`font-semibold text-base leading-6 ${shippingDetailsToRender.yaariCash !== "N/A" && parseFloat(shippingDetailsToRender.yaariCash.replace("₹ ", "").replace(/,/g, '')) > 0 ? "text-green-500" : "text-gray-800"}`}>
                  {shippingDetailsToRender.yaariCash}
                </p>
              </div>
              <div>
                <p className="text-gray-500 font-normal text-sm leading-5">Shipping Cost</p>
                <div>
                  <p className="text-gray-800 font-semibold text-base leading-6">
                    {shippingDetailsToRender.shippingCost}
                  </p>
                  {shippingDetailsToRender.gstPercentage > 0 && (
                    <p className="text-xs text-gray-500">(inc {shippingDetailsToRender.gstPercentage}% GST)</p>
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