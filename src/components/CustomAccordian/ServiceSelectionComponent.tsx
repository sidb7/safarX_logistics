


// import React, { useState, useEffect } from "react";
// import { POST } from "../../utils/webService";
// import {
//   GET_COURIER_PARTNER_SERVICE,
//   SET_SERVICE_INFO,
//   POST_PLACE_ALL_ORDERS,
//   GET_SERVICE_NEW,
// } from "../../utils/ApiUrls";
// import { toast } from "react-hot-toast";
// import { capitalizeFirstLetter } from "../../utils/utility";
// import { Spinner } from "../../components/Spinner";
// import OneButton from "../Button/OneButton";
// import iIcon from "../../assets/I icon.svg";

// interface ServiceSelectionProps {
//   orderData: any;
//   isMasked?: boolean;
//   onBack: () => void;
//   onOrderPlaced: () => void;
// }

// const ServiceSelectionComponent: React.FC<ServiceSelectionProps> = ({
//   orderData,
//   isMasked = false,
//   onBack,
//   onOrderPlaced,
// }) => {
//   // Service-related state
//   const [serviceList, setServiceList] = useState<any[]>([]);
//   const [selectedServiceIndex, setSelectedServiceIndex] = useState<number | null>(null);
//   const [serviceLoading, setServiceLoading] = useState(false);
//   const [updatingServiceIndex, setUpdatingServiceIndex] = useState<number | null>(null);
//   const [isServiceUpdated, setIsServiceUpdated] = useState(false);
//   const [isPlacingOrder, setIsPlacingOrder] = useState(false);
//   const [orderCooldown, setOrderCooldown] = useState(0);
//   const [cooldownTimer, setCooldownTimer] = useState<NodeJS.Timeout | null>(null);

//   // Fetch services on component mount
//   useEffect(() => {
//     if (orderData) {
//       fetchServiceList();
//     }
//   }, [orderData]);

//   // Auto-select cheapest service when service list changes
//   useEffect(() => {
//     if (serviceList.length > 0) {
//       autoSelectCheapestService();
//     } else {
//       setIsServiceUpdated(false);
//       setSelectedServiceIndex(null);
//     }
//   }, [serviceList]);

//   // Cleanup timer on unmount
//   useEffect(() => {
//     return () => {
//       if (cooldownTimer) {
//         clearTimeout(cooldownTimer);
//       }
//     };
//   }, [cooldownTimer]);

//   // Function to find and auto-select the cheapest service
//   const autoSelectCheapestService = () => {
//     if (serviceList.length === 0) return;

//     // Find the minimum price
//     const minPrice = Math.min(...serviceList.map(service => service.total));
    
//     // Get all services with the minimum price
//     const cheapestServices = serviceList.filter(service => service.total === minPrice);
    
//     // If multiple services have the same price, select the one with lowest EDT
//     let selectedService = cheapestServices[0];
//     let selectedIndex = serviceList.findIndex(service => service === selectedService);
    
//     if (cheapestServices.length > 1) {
//       // Sort by EDT (treat empty strings and null as high values)
//       cheapestServices.sort((a, b) => {
//         const edtA = a.EDT === "" || a.EDT === null ? 999 : Number(a.EDT) || 999;
//         const edtB = b.EDT === "" || b.EDT === null ? 999 : Number(b.EDT) || 999;
//         return edtA - edtB;
//       });
      
//       selectedService = cheapestServices[0];
//       selectedIndex = serviceList.findIndex(service => service === selectedService);
//     }
    
//     // Auto-select the cheapest service (without showing toast)
//     updateService(selectedIndex, false);
//   };

//   const fetchServiceList = async () => {
//     try {
//       setServiceLoading(true);
//       const payload = {
//         tempOrderId: orderData?.tempOrderId,
//         source: orderData?.source,
//       };

//       const { data } = await POST(GET_COURIER_PARTNER_SERVICE, payload);
//       if (data?.success) {
//         const services = isMasked ? data?.data?.slice(0, 2) : data?.data;
//         setServiceList(services);
//       }
//     } catch (error) {
//       console.error("Error fetching services:", error);
//       toast.error("Failed to load services");
//     } finally {
//       setServiceLoading(false);
//     }
//   };

//   const updateService = async (serviceIndex: number, showToast: boolean = true) => {
//     if (serviceList.length === 0) return;

//     try {
//       setUpdatingServiceIndex(serviceIndex);
//       const selectedService = serviceList[serviceIndex];
//       const payload = {
//         partnerServiceId: selectedService.partnerServiceId,
//         partnerServiceName: selectedService.partnerServiceName,
//         companyServiceId: selectedService.companyServiceId,
//         companyServiceName: selectedService.companyServiceName,
//         tempOrderId: orderData?.tempOrderId,
//         source: orderData?.source,
//         category: "Service",
//       };

//       const { data } = await POST(SET_SERVICE_INFO, payload);
//       if (data?.success) {
//         if (showToast) {
//           toast.success("Service selected successfully");
//         }
//         setSelectedServiceIndex(serviceIndex);
//         setIsServiceUpdated(true);
//       } else {
//         toast.error(data?.message || "Failed to select service");
//         setIsServiceUpdated(false);
//       }
//     } catch (error) {
//       console.error("Error updating service:", error);
//       toast.error("Failed to select service");
//       setIsServiceUpdated(false);
//     } finally {
//       setUpdatingServiceIndex(null);
//     }
//   };

//   const handleServiceClick = (index: number) => {
//     // If this service is already selected, don't do anything
//     if (selectedServiceIndex === index) return;
    
//     // Update the service immediately when clicked
//     updateService(index);
//   };

//   const placeOrder = async () => {
//     if (!isServiceUpdated) {
//       toast.error("Please select a service first");
//       return;
//     }

//     if (orderCooldown > 0) {
//       toast.error(`Please wait ${orderCooldown} seconds before placing another order`);
//       return;
//     }

//     try {
//       setIsPlacingOrder(true);
      
//       const placeOrderPayload = {
//         orders: [
//           {
//             orderId: orderData?.orderId,
//             tempOrderId: orderData?.tempOrderId,
//             source: orderData?.source,
//           },
//         ],
//       };

//       const { data } = await POST(POST_PLACE_ALL_ORDERS, placeOrderPayload);
//       if (data?.success) {
//         // Start 5-second cooldown
//         setOrderCooldown(5);
//         const countdown = setInterval(() => {
//           setOrderCooldown((prev) => {
//             if (prev <= 1) {
//               clearInterval(countdown);
//               return 0;
//             }
//             return prev - 1;
//           });
//         }, 1000);
        
//         setCooldownTimer(countdown);
//         onOrderPlaced(); // Parent will handle success message
//       } else {
//         toast.error(data?.message || "Failed to place order");
//       }
//     } catch (error) {
//       console.error("Error placing order:", error);
//       toast.error("Something went wrong while placing order");
//     } finally {
//       setIsPlacingOrder(false);
//     }
//   };

//   // Helper function to format variable service names
//   const formatVariableServiceName = (key: string) => {
//     return key
//       .replace(/([A-Z])/g, ' $1')
//       .replace(/^./, str => str.toUpperCase())
//       .replace(/\b\w/g, l => l.toUpperCase());
//   };

//   // Component for variable services tooltip
//   const VariableServicesInfo = ({ variableServices }: { variableServices: any }) => {
//     const validServices = Object.entries(variableServices)
//       .filter(([key, value]) => typeof value === 'number' && value > 0);

//     if (validServices.length === 0) {
//       return null;
//     }

//     return (
//       <div className="group relative inline-block">
//         <img 
//           src={iIcon} 
//           alt="Info" 
//           className="w-4 h-4 ml-1 cursor-help hover:opacity-70 transition-opacity"
//         />
//         <div className="invisible group-hover:visible absolute z-50 left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-72 bg-gray-900 text-white text-xs rounded-lg shadow-xl">
//           <style>
//             {`
//               .custom-scrollbar::-webkit-scrollbar {
//                 width: 4px;
//               }
//               .custom-scrollbar::-webkit-scrollbar-track {
//                 background: rgba(255, 255, 255, 0.1);
//                 border-radius: 2px;
//               }
//               .custom-scrollbar::-webkit-scrollbar-thumb {
//                 background: rgba(255, 255, 255, 0.3);
//                 border-radius: 2px;
//               }
//               .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//                 background: rgba(255, 255, 255, 0.5);
//               }
//               .custom-scrollbar {
//                 scrollbar-width: thin;
//                 scrollbar-color: rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1);
//               }
//             `}
//           </style>
//           <div className="p-3">
//             <div className="font-semibold mb-2 text-gray-100">Variable Services Breakdown</div>
//             <div className="space-y-1.5 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
//               {validServices.map(([key, value]) => (
//                 <div key={key} className="flex justify-between items-center py-0.5">
//                   <span className="text-gray-300 text-left flex-1 mr-3">{formatVariableServiceName(key)}</span>
//                   <span className="font-medium text-white whitespace-nowrap">₹{Number(value).toFixed(2)}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//           {/* Arrow pointing down */}
//           <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
//         </div>
//       </div>
//     );
//   };

//   const renderServices = () => {
//     if (serviceLoading) {
//       return (
//         <div className="flex justify-center py-8">
//           <Spinner />
//         </div>
//       );
//     }

//     if (serviceList.length === 0) {
//       return (
//         <div className="text-center py-8 text-gray-500">
//           No services available
//         </div>
//       );
//     }

//     return (
//       <div className="space-y-3">
//         {serviceList.map((service: any, index: number) => {
//           const isSelected = selectedServiceIndex === index;
//           const isUpdating = updatingServiceIndex === index;
          
//           return (
//             <div
//               key={service.partnerServiceId}
//               className={`border rounded-lg p-4 cursor-pointer transition-colors relative ${
//                 isSelected
//                   ? "border-green-500 bg-green-50"
//                   : "border-gray-200 hover:border-gray-300"
//               } ${isUpdating ? "opacity-75" : ""}`}
//               onClick={() => !isUpdating && handleServiceClick(index)}
//             >
//               {isUpdating && (
//                 <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-lg">
//                   <Spinner />
//                 </div>
//               )}
              
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <input
//                     type="radio"
//                     checked={isSelected}
//                     onChange={() => {}} // Handled by onClick
//                     className="text-green-600"
//                     disabled={isUpdating}
//                   />
//                   <div>
//                     <p className="font-medium">
//                       {capitalizeFirstLetter(service.partnerName)} -{" "}
//                       {capitalizeFirstLetter(service.serviceMode)}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       Applied Weight: {service.appliedWeight} kg
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       Service: {service.companyServiceName}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-semibold text-lg">
//                     ₹{service.total?.toLocaleString("en-IN")}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Zone: {service.zoneName}
//                   </p>
//                   {isSelected && (
//                     <p className="text-xs text-green-600 font-medium mt-1">
//                       ✓ Selected
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {isSelected && (
//                 <div className="mt-3 pt-3 border-t grid grid-cols-2 gap-2 text-sm">
//                   <div>Base: ₹{service.base}</div>
//                   <div>Additional: ₹{service.add}</div>
//                   <div className="flex items-center">
//                     Variables: ₹{service.variables?.toFixed(2)}
//                     <VariableServicesInfo variableServices={service.variableServices} />
//                   </div>
//                   <div>Tax: ₹{service.tax?.toFixed(2)}</div>
//                   <div>COD: ₹{service.cod}</div>
//                   <div>Insurance: ₹{service.insurance}</div>
//                 </div>
//               )}
//             </div>
//           );
//         })}

//         {isServiceUpdated && (
//           <div className="text-center mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
//             <p className="text-green-700 font-medium">
//               ✓ Service selected successfully! You can now place the order.
//             </p>
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="space-y-4 max-h-[calc(100vh-100px)] pb-20 px-3 pt-3">
//       {/* Header */}
//       <div className="bg-blue-50 rounded-lg p-4 mb-6">
//         <h2 className="text-xl font-semibold text-blue-800 mb-2">
//           Select Delivery Service
//         </h2>
//         <p className="text-blue-600">
//           The cheapest service has been automatically selected. Click on a different service to change your selection.
//         </p>
//       </div>

//       {/* Services List */}
//       <div className="bg-white rounded-lg border p-4">
//         {renderServices()}
//       </div>

//       {/* Bottom Navigation */}
//       <div
//         className="flex justify-between gap-x-4 shadow-lg border-[1px] h-[88px] bg-[#FFFFFF] px-6 py-7 rounded-tr-[32px] rounded-tl-[32px] fixed bottom-0"
//         style={{ width: "-webkit-fill-available" }}
//       >
//         <OneButton
//           text="Back"
//           onClick={onBack}
//           variant="secondary"
//           className="px-8"
//         />
        
//         <OneButton
//           text={isPlacingOrder ? "Placing Order..." : "Place Order"}
//           onClick={placeOrder}
//           variant="primary"
//           className="px-8"
//           disabled={!isServiceUpdated || isPlacingOrder || orderCooldown > 0}
//         />
//       </div>
//     </div>
//   );
// };

// export default ServiceSelectionComponent;




import React, { useState, useEffect } from "react";
import { POST } from "../../utils/webService";
import {
  GET_COURIER_PARTNER_SERVICE,
  SET_SERVICE_INFO,
  POST_PLACE_ALL_ORDERS,
  GET_SERVICE_NEW,
} from "../../utils/ApiUrls";
import { toast } from "react-hot-toast";
import { capitalizeFirstLetter } from "../../utils/utility";
import { Spinner } from "../../components/Spinner";
import OneButton from "../Button/OneButton";
import iIcon from "../../assets/I icon.svg";

interface ServiceSelectionProps {
  orderData: any;
  isMasked?: boolean;
  onBack: () => void;
  onOrderPlaced: () => void;
}

const ServiceSelectionComponent: React.FC<ServiceSelectionProps> = ({
  orderData,
  isMasked = false,
  onBack,
  onOrderPlaced,
}) => {
  // Service-related state
  const [serviceList, setServiceList] = useState<any[]>([]);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<number | null>(null);
  const [serviceLoading, setServiceLoading] = useState(false);
  const [updatingServiceIndex, setUpdatingServiceIndex] = useState<number | null>(null);
  const [isServiceUpdated, setIsServiceUpdated] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderCooldown, setOrderCooldown] = useState(0);
  const [cooldownTimer, setCooldownTimer] = useState<NodeJS.Timeout | null>(null);

  // Fetch services on component mount
  useEffect(() => {
    if (orderData) {
      fetchServiceList();
    }
  }, [orderData]);

  // Auto-select cheapest service when service list changes
  useEffect(() => {
    if (serviceList.length > 0) {
      autoSelectCheapestService();
    } else {
      setIsServiceUpdated(false);
      setSelectedServiceIndex(null);
    }
  }, [serviceList]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (cooldownTimer) {
        clearTimeout(cooldownTimer);
      }
    };
  }, [cooldownTimer]);

  // Function to find and auto-select the cheapest service
  const autoSelectCheapestService = () => {
    if (serviceList.length === 0) return;

    // Find the minimum price
    const minPrice = Math.min(...serviceList.map(service => service.total));
    
    // Get all services with the minimum price
    const cheapestServices = serviceList.filter(service => service.total === minPrice);
    
    // If multiple services have the same price, select the one with lowest EDT
    let selectedService = cheapestServices[0];
    let selectedIndex = serviceList.findIndex(service => service === selectedService);
    
    if (cheapestServices.length > 1) {
      // Sort by EDT (treat empty strings and null as high values)
      cheapestServices.sort((a, b) => {
        const edtA = a.EDT === "" || a.EDT === null ? 999 : Number(a.EDT) || 999;
        const edtB = b.EDT === "" || b.EDT === null ? 999 : Number(b.EDT) || 999;
        return edtA - edtB;
      });
      
      selectedService = cheapestServices[0];
      selectedIndex = serviceList.findIndex(service => service === selectedService);
    }
    
    // Auto-select the cheapest service (without showing toast)
    updateService(selectedIndex, false);
  };

  const fetchServiceList = async () => {
    try {
      setServiceLoading(true);
      const payload = {
        tempOrderId: orderData?.tempOrderId,
        source: orderData?.source,
      };

      const { data } = await POST(GET_SERVICE_NEW, payload);
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

  const updateService = async (serviceIndex: number, showToast: boolean = true) => {
    if (serviceList.length === 0) return;

    try {
      setUpdatingServiceIndex(serviceIndex);
      const selectedService = serviceList[serviceIndex];
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
        if (showToast) {
          toast.success("Service selected successfully");
        }
        setSelectedServiceIndex(serviceIndex);
        setIsServiceUpdated(true);
      } else {
        toast.error(data?.message || "Failed to select service");
        setIsServiceUpdated(false);
      }
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("Failed to select service");
      setIsServiceUpdated(false);
    } finally {
      setUpdatingServiceIndex(null);
    }
  };

  const handleServiceClick = (index: number) => {
    // If this service is already selected, don't do anything
    if (selectedServiceIndex === index) return;
    
    // Update the service immediately when clicked
    updateService(index);
  };

  const placeOrder = async () => {
    if (!isServiceUpdated) {
      toast.error("Please select a service first");
      return;
    }

    if (orderCooldown > 0) {
      toast.error(`Please wait ${orderCooldown} seconds before placing another order`);
      return;
    }

    try {
      setIsPlacingOrder(true);
      
      const placeOrderPayload = {
        orders: [
          {
            orderId: orderData?.orderId,
            tempOrderId: orderData?.tempOrderId,
            source: orderData?.source,
          },
        ],
      };

      const { data } = await POST(POST_PLACE_ALL_ORDERS, placeOrderPayload);
      if (data?.success) {
        // Start 5-second cooldown
        setOrderCooldown(5);
        const countdown = setInterval(() => {
          setOrderCooldown((prev) => {
            if (prev <= 1) {
              clearInterval(countdown);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
        setCooldownTimer(countdown);
        onOrderPlaced(); // Parent will handle success message
      } else {
        toast.error(data?.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Something went wrong while placing order");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  // Helper function to format variable service names
  const formatVariableServiceName = (key: string) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .replace(/\b\w/g, l => l.toUpperCase());
  };

  // Component for variable services tooltip
  const VariableServicesInfo = ({ variableServices }: { variableServices: any }) => {
    const validServices = Object.entries(variableServices)
      .filter(([key, value]) => typeof value === 'number' && value > 0);

    if (validServices.length === 0) {
      return null;
    }

    return (
      <div className="group relative inline-block">
        <img 
          src={iIcon} 
          alt="Info" 
          className="w-4 h-4 ml-1 cursor-help hover:opacity-70 transition-opacity"
        />
        <div className="invisible group-hover:visible absolute z-50 left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-72 bg-gray-900 text-white text-xs rounded-lg shadow-xl">
          <style>
            {`
              .custom-scrollbar::-webkit-scrollbar {
                width: 4px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 2px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.3);
                border-radius: 2px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.5);
              }
              .custom-scrollbar {
                scrollbar-width: thin;
                scrollbar-color: rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1);
              }
            `}
          </style>
          <div className="p-3">
            <div className="font-semibold mb-2 text-gray-100">Variable Services Breakdown</div>
            <div className="space-y-1.5 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
              {validServices.map(([key, value]) => (
                <div key={key} className="flex justify-between items-center py-0.5">
                  <span className="text-gray-300 text-left flex-1 mr-3">{formatVariableServiceName(key)}</span>
                  <span className="font-medium text-white whitespace-nowrap">₹{Number(value).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Arrow pointing down */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    );
  };

  const renderServices = () => {
    if (serviceLoading) {
      return (
        <div className="flex justify-center py-8">
          <Spinner />
        </div>
      );
    }

    if (serviceList.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          No services available
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {serviceList.map((service: any, index: number) => {
          const isSelected = selectedServiceIndex === index;
          const isUpdating = updatingServiceIndex === index;
          
          return (
            <div
              key={service.partnerServiceId}
              className={`border rounded-lg p-4 cursor-pointer transition-colors relative ${
                isSelected
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-gray-300"
              } ${isUpdating ? "opacity-75" : ""}`}
              onClick={() => !isUpdating && handleServiceClick(index)}
            >
              {isUpdating && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-lg">
                  <Spinner />
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    checked={isSelected}
                    onChange={() => {}} // Handled by onClick
                    className="text-green-600"
                    disabled={isUpdating}
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
                  {isSelected && (
                    <p className="text-xs text-green-600 font-medium mt-1">
                      ✓ Selected
                    </p>
                  )}
                </div>
              </div>

              {isSelected && (
                <div className="mt-3 pt-3 border-t grid grid-cols-2 gap-2 text-sm">
                  <div>Base: ₹{service.base}</div>
                  <div>Additional: ₹{service.add}</div>
                  <div className="flex items-center">
                    Variables: ₹{service.variables?.toFixed(2)}
                    <VariableServicesInfo variableServices={service.variableServices} />
                  </div>
                  <div>Tax: ₹{service.tax?.toFixed(2)}</div>
                  <div>COD: ₹{service.cod}</div>
                  <div>Insurance: ₹{service.insurance}</div>
                </div>
              )}
            </div>
          );
        })}

        {isServiceUpdated && (
          <div className="text-center mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 font-medium">
              ✓ Service selected successfully! You can now place the order.
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4 max-h-[calc(100vh-100px)] pb-20 px-3 pt-3">
      {/* Header */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">
          Select Delivery Service
        </h2>
        <p className="text-blue-600">
          The cheapest service has been automatically selected. Click on a different service to change your selection.
        </p>
      </div>

      {/* Services List */}
      <div className="bg-white rounded-lg border p-4">
        {renderServices()}
      </div>

      {/* Bottom Navigation */}
      <div
        className="flex justify-between gap-x-4 shadow-lg border-[1px] h-[88px] bg-[#FFFFFF] px-6 py-7 rounded-tr-[32px] rounded-tl-[32px] fixed bottom-0"
        style={{ width: "-webkit-fill-available" }}
      >
        <OneButton
          text="Back"
          onClick={onBack}
          variant="secondary"
          className="px-8"
        />
        
        <OneButton
          text={isPlacingOrder ? "Placing Order..." : "Place Order"}
          onClick={placeOrder}
          variant="primary"
          className="px-8"
          disabled={!isServiceUpdated || isPlacingOrder || orderCooldown > 0}
        />
      </div>
    </div>
  );
};

export default ServiceSelectionComponent;