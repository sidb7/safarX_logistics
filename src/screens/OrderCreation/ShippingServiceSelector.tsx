// import React, { useState, useEffect } from "react";
// import { toast } from "react-hot-toast";
// import { POST } from "../../utils/webService"; // Adjust path as needed
// import { GET_COURIER_PARTNER_SERVICE } from "../../utils/ApiUrls"; // Adjust path as needed

// // Interface for service item from API
// interface ShippingService {
//   partnerServiceId: string;
//   partnerServiceName: string;
//   companyServiceId: string;
//   companyServiceName: string;
//   partnerName: string;
//   serviceMode: string;
//   appliedWeight: number;
//   total: number;
//   EDT: number | string;
//   tax: number;
//   zoneName: string;
//   sortType: string;
// }

// // Props for the component
// interface ShippingServiceSelectorProps {
//   tempOrderId?: string;
//   orderSource?: string;
//   onServiceSelect?: (service: {
//     partnerServiceId: string;
//     partnerServiceName: string;
//     companyServiceId: string;
//     companyServiceName: string;
//   }) => void;
// }

// const ShippingServiceSelector: React.FC<ShippingServiceSelectorProps> = ({
//   tempOrderId,
//   orderSource,
//   onServiceSelect,
// }) => {
//   const [selectedFilter, setSelectedFilter] = useState("All");
//   const [sortType, setSortType] = useState("Fastest"); // Default to Fastest
//   const [selectedService, setSelectedService] = useState<string | null>(null);
//   const [services, setServices] = useState<ShippingService[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch shipping service options from API
//   useEffect(() => {
//     if (tempOrderId && orderSource) {
//       fetchServices();
//     } else {
//       // If no tempOrderId or orderSource, use dummy data for development
//       setServices([
//         {
//           partnerServiceId: "1",
//           partnerServiceName: "Bluedart Express",
//           companyServiceId: "f9943462",
//           companyServiceName: "STANDARD",
//           partnerName: "BLUEDART",
//           serviceMode: "AIR",
//           appliedWeight: 8,
//           total: 3564,
//           EDT: 1,
//           tax: 45,
//           zoneName: "ZONE 3",
//           sortType: "priority",
//         },
//         {
//           partnerServiceId: "2",
//           partnerServiceName: "Bluedart",
//           companyServiceId: "a07d01f5",
//           companyServiceName: "ECONOMY",
//           partnerName: "BLUEDART",
//           serviceMode: "SURFACE",
//           appliedWeight: 8,
//           total: 3564,
//           EDT: 3,
//           tax: 45,
//           zoneName: "ZONE 3",
//           sortType: "priority",
//         },
//         {
//           partnerServiceId: "3",
//           partnerServiceName: "DTDC Express",
//           companyServiceId: "b39d8472",
//           companyServiceName: "PREMIUM",
//           partnerName: "DTDC",
//           serviceMode: "AIR",
//           appliedWeight: 8,
//           total: 3890,
//           EDT: 2,
//           tax: 52,
//           zoneName: "ZONE 2",
//           sortType: "priority",
//         },
//         {
//           partnerServiceId: "4",
//           partnerServiceName: "DTDC Surface",
//           companyServiceId: "c4e37b91",
//           companyServiceName: "STANDARD",
//           partnerName: "DTDC",
//           serviceMode: "SURFACE",
//           appliedWeight: 8,
//           total: 3250,
//           EDT: 4,
//           tax: 40,
//           zoneName: "ZONE 3",
//           sortType: "standard",
//         },
//         {
//           partnerServiceId: "5",
//           partnerServiceName: "FedEx Priority",
//           companyServiceId: "d72a5f83",
//           companyServiceName: "PRIORITY",
//           partnerName: "FEDEX",
//           serviceMode: "AIR",
//           appliedWeight: 8,
//           total: 4100,
//           EDT: 1,
//           tax: 60,
//           zoneName: "ZONE 1",
//           sortType: "priority",
//         },
//       ]);
//     }
//   }, [tempOrderId, orderSource]);

//   // Function to fetch services from API
//   const fetchServices = async () => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const payload = {
//         tempOrderId,
//         source: orderSource,
//       };

//       // Use your existing API utility function
//       const { data: response } = await POST(
//         GET_COURIER_PARTNER_SERVICE,
//         payload
//       );

//       if (response?.success) {
//         setServices(response.data);
//         console.log("Fetched shipping services:", response.data);
//       } else {
//         setError(response?.message || "Failed to fetch shipping services");
//         toast.error(response?.message || "Failed to fetch shipping services");
//       }
//     } catch (err) {
//       setError("An error occurred while fetching shipping services");
//       toast.error("An error occurred while fetching shipping services");
//       console.error("Error fetching shipping services:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Get filtered services based on selected filter
//   const getFilteredServices = () => {
//     return selectedFilter === "All"
//       ? services
//       : services.filter(
//           (service) => service.serviceMode === selectedFilter.toUpperCase()
//         );
//   };

//   // Get fastest service within the filtered services
//   const getFastestServiceInFilter = () => {
//     const filtered = getFilteredServices();
//     if (!filtered.length) return null;

//     return [...filtered].sort((a, b) => {
//       const aEDT =
//         typeof a.EDT === "string" ? parseInt(a.EDT) || 999 : a.EDT || 999;
//       const bEDT =
//         typeof b.EDT === "string" ? parseInt(b.EDT) || 999 : b.EDT || 999;

//       // If EDT is the same, compare by total
//       if (aEDT === bEDT) {
//         return a.total - b.total;
//       }

//       return aEDT - bEDT;
//     })[0];
//   };

//   // Get best value (cheapest) service within the filtered services
//   const getBestValueServiceInFilter = () => {
//     const filtered = getFilteredServices();
//     if (!filtered.length) return null;

//     return [...filtered].sort((a, b) => a.total - b.total)[0];
//   };

//   // Filter and sort services based on selected filter and sort type
//   const getFilteredAndSortedServices = () => {
//     let filtered = getFilteredServices();

//     if (sortType === "Fastest") {
//       return filtered.sort((a, b) => {
//         const aEDT =
//           typeof a.EDT === "string" ? parseInt(a.EDT) || 999 : a.EDT || 999;
//         const bEDT =
//           typeof b.EDT === "string" ? parseInt(b.EDT) || 999 : b.EDT || 999;

//         // If EDT is the same, compare by total
//         if (aEDT === bEDT) {
//           return a.total - b.total;
//         }

//         return aEDT - bEDT;
//       });
//     } else {
//       // Cheapest
//       return filtered.sort((a, b) => a.total - b.total);
//     }
//   };

//   const filteredAndSortedServices = getFilteredAndSortedServices();

//   // Get fastest and best value service IDs within the current filter context
//   const fastestServiceId = getFastestServiceInFilter()?.partnerServiceId;
//   const bestValueServiceId = getBestValueServiceInFilter()?.partnerServiceId;

//   // Handle service selection
//   const handleServiceSelect = (serviceId: string) => {
//     setSelectedService(serviceId);

//     const selected = services.find(
//       (service) => service.partnerServiceId === serviceId
//     );

//     if (selected && onServiceSelect) {
//       onServiceSelect({
//         partnerServiceId: selected.partnerServiceId,
//         partnerServiceName: selected.partnerServiceName,
//         companyServiceId: selected.companyServiceId,
//         companyServiceName: selected.companyServiceName,
//       });
//     }
//   };

//   // Helper function to get the badges for a service
//   const getServiceBadges = (serviceId: string) => {
//     const badges = [];

//     if (serviceId === fastestServiceId) {
//       badges.push({ text: "Fastest", color: "bg-green-100 text-green-600" });
//     }

//     if (serviceId === bestValueServiceId) {
//       badges.push({ text: "Best Value", color: "bg-blue-100 text-blue-600" });
//     }

//     return badges;
//   };

//   // Helper function to get the service mode badge
//   const getServiceModeBadge = (mode: string) => {
//     if (mode === "AIR") {
//       return {
//         text: "Air",
//         color:
//           "bg-[#F7F7F8] text-black font-semibold text-sm leading-5 text-center align-middle capitalize font-open px-4",
//       };
//     } else if (mode === "SURFACE") {
//       return {
//         text: "Surface",
//         color:
//           "bg-[#F7F7F8] text-black font-semibold text-sm leading-5 text-center align-middle capitalize font-open",
//       };
//     }
//     return null;
//   };

//   // Helper function to format delivery time
//   const formatDeliveryTime = (edt: number | string) => {
//     if (!edt) return "Delivery date not available";

//     const days = typeof edt === "string" ? parseInt(edt) || 1 : edt;
//     return `Delivery in ${days}-${days + 1} Days`;
//   };

//   return (
//     <div className="w-full mx-auto p-4">
//       {/* Filter and Sort Section */}
//       <div className="flex justify-between items-center mb-4">
//         <div>
//           <h2 className="text-lg font-medium mb-2 text-gray-800">
//             Filter by Service Type
//           </h2>
//           <div className="flex border border-gray-200 rounded-md inline-flex overflow-hidden">
//             {["All", "Air", "Surface"].map((filter) => (
//               <button
//                 key={filter}
//                 className={`px-6 py-2 text-sm ${
//                   selectedFilter === filter
//                     ? "bg-white text-gray-800 font-medium"
//                     : "bg-gray-50 text-gray-500"
//                 }`}
//                 onClick={() => setSelectedFilter(filter)}
//               >
//                 {filter}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="mt-2">
//           <div className="border border-gray-200 rounded-md inline-flex overflow-hidden shadow-sm">
//             {["Fastest", "Cheapest"].map((sort) => (
//               <button
//                 key={sort}
//                 className={`px-6 py-3 text-sm font-medium ${
//                   sortType === sort
//                     ? "bg-white text-gray-800"
//                     : "bg-gray-50 text-gray-500"
//                 }`}
//                 onClick={() => setSortType(sort)}
//               >
//                 {sort}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Loading State */}
//       {isLoading && (
//         <div className="text-center py-8">
//           <p className="text-gray-500">Loading shipping services...</p>
//         </div>
//       )}

//       {/* Error State */}
//       {error && (
//         <div className="text-center py-8">
//           <p className="text-red-500">{error}</p>
//         </div>
//       )}

//       {/* Service Options - Now in a fixed height scrollable container */}
//       {!isLoading && !error && (
//         <div
//           className="space-y-3 overflow-y-auto pr-1"
//           style={{
//             height: "400px" /* Fixed height to show 3-4 cards */,
//             scrollbarWidth: "none" /* For Firefox */,
//             msOverflowStyle: "none" /* For Internet Explorer and Edge */,
//           }}
//         >
//           <style>
//             {`
//             /* Hide scrollbar for Chrome, Safari and Opera */
//             .overflow-y-auto::-webkit-scrollbar {
//               display: none;
//             }
//             `}
//           </style>
//           {filteredAndSortedServices.map((service) => {
//             const badges = getServiceBadges(service.partnerServiceId);

//             return (
//               <div
//                 key={service.partnerServiceId}
//                 className={`border rounded-lg p-4 flex items-center justify-between transition-colors mb-3 ${
//                   selectedService === service.partnerServiceId
//                     ? "border-blue-500 border-2"
//                     : "border-gray-200 hover:border-gray-300"
//                 }`}
//               >
//                 <div className="flex items-center">
//                   <input
//                     type="radio"
//                     id={`service-${service.partnerServiceId}`}
//                     name="shipping-service"
//                     className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
//                     checked={selectedService === service.partnerServiceId}
//                     onChange={() =>
//                       handleServiceSelect(service.partnerServiceId)
//                     }
//                   />

//                   <div className="ml-4">
//                     <div className="flex items-center flex-wrap">
//                       <span className="font-semibold text-base leading-snug tracking-normal mr-1">
//                         {service.partnerName} {service.partnerServiceName}
//                       </span>
//                       <div className="flex items-center ml-1 mr-1">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-5 w-5 text-yellow-400"
//                           viewBox="0 0 20 20"
//                           fill="currentColor"
//                         >
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                         </svg>
//                         <span className="text-yellow-600 font-semibold text-sm leading-5 tracking-normal text-center align-middle capitalize">
//                           4.5
//                         </span>
//                       </div>

//                       {/* Service Mode Badge */}
//                       {service.serviceMode && (
//                         <span
//                           className={`ml-1 mr-1 text-xs px-2 py-1 rounded-full ${
//                             getServiceModeBadge(service.serviceMode)?.color
//                           }`}
//                         >
//                           {getServiceModeBadge(service.serviceMode)?.text}
//                         </span>
//                       )}

//                       {/* Fastest/Best Value Badges */}
//                       {badges.map((badge, index) => (
//                         <span
//                           key={index}
//                           className={`ml-1 text-xs px-2 py-1 rounded-full ${badge.color}`}
//                         >
//                           {badge.text}
//                         </span>
//                       ))}
//                     </div>
//                     <div className="text-gray-500 mt-1">
//                       {formatDeliveryTime(service.EDT)}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="text-right">
//                   <div className="text-xl font-semibold">₹ {service.total}</div>
//                   <div className="text-gray-500 text-sm">inc GST</div>
//                 </div>
//               </div>
//             );
//           })}

//           {filteredAndSortedServices.length === 0 && (
//             <div className="text-center py-8">
//               <p className="text-gray-500">
//                 No shipping services available for the selected filter.
//               </p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShippingServiceSelector;

import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { POST } from '../../utils/webService'; // Adjust path as needed
import { GET_COURIER_PARTNER_SERVICE, SET_PARTNER_SERVICE_INFO } from '../../utils/ApiUrls'; // Added SET_PARTNER_SERVICE_INFO

// Interface for service item from API
interface ShippingService {
  partnerServiceId: string;
  partnerServiceName: string;
  companyServiceId: string;
  companyServiceName: string;
  partnerName: string;
  serviceMode: string;
  appliedWeight: number;
  total: number;
  EDT: number | string;
  tax: number;
  zoneName: string;
  sortType: string;
}

// Props for the component
interface ShippingServiceSelectorProps {
  tempOrderId?: string;
  orderSource?: string;
  onServiceSelect?: (service: {
    partnerServiceId: string;
    partnerServiceName: string;
    companyServiceId: string;
    companyServiceName: string;
  }) => void;
}

const ShippingServiceSelector: React.FC<ShippingServiceSelectorProps> = ({ 
  tempOrderId, 
  orderSource,
  onServiceSelect
}) => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [sortType, setSortType] = useState('Fastest'); // Default to Fastest
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [services, setServices] = useState<ShippingService[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmittingService, setIsSubmittingService] = useState(false); // New state for service submission
  const [error, setError] = useState<string | null>(null);
  
  // Fetch shipping service options from API
  useEffect(() => {
    if (tempOrderId && orderSource) {
      fetchServices();
    } else {
      // If no tempOrderId or orderSource, use dummy data for development
      setServices([
        {
          partnerServiceId: '1',
          partnerServiceName: 'Bluedart Express',
          companyServiceId: 'f9943462',
          companyServiceName: 'STANDARD',
          partnerName: 'BLUEDART',
          serviceMode: 'AIR',
          appliedWeight: 8,
          total: 3564,
          EDT: 1,
          tax: 45,
          zoneName: 'ZONE 3',
          sortType: 'priority'
        },
        {
          partnerServiceId: '2',
          partnerServiceName: 'Bluedart',
          companyServiceId: 'a07d01f5',
          companyServiceName: 'ECONOMY',
          partnerName: 'BLUEDART',
          serviceMode: 'SURFACE',
          appliedWeight: 8,
          total: 3564,
          EDT: 3,
          tax: 45,
          zoneName: 'ZONE 3',
          sortType: 'priority'
        },
        {
          partnerServiceId: '3',
          partnerServiceName: 'DTDC Express',
          companyServiceId: 'b39d8472',
          companyServiceName: 'PREMIUM',
          partnerName: 'DTDC',
          serviceMode: 'AIR',
          appliedWeight: 8,
          total: 3890,
          EDT: 2,
          tax: 52,
          zoneName: 'ZONE 2',
          sortType: 'priority'
        },
        {
          partnerServiceId: '4',
          partnerServiceName: 'DTDC Surface',
          companyServiceId: 'c4e37b91',
          companyServiceName: 'STANDARD',
          partnerName: 'DTDC',
          serviceMode: 'SURFACE',
          appliedWeight: 8,
          total: 3250,
          EDT: 4,
          tax: 40,
          zoneName: 'ZONE 3',
          sortType: 'standard'
        },
        {
          partnerServiceId: '5',
          partnerServiceName: 'FedEx Priority',
          companyServiceId: 'd72a5f83',
          companyServiceName: 'PRIORITY',
          partnerName: 'FEDEX',
          serviceMode: 'AIR',
          appliedWeight: 8,
          total: 4100,
          EDT: 1,
          tax: 60,
          zoneName: 'ZONE 1',
          sortType: 'priority'
        }
      ]);
    }
  }, [tempOrderId, orderSource]);

  // Function to fetch services from API
  const fetchServices = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const payload = {
        tempOrderId,
        source: orderSource,
      };
      
      // Use your existing API utility function
      const { data: response } = await POST(GET_COURIER_PARTNER_SERVICE, payload);
      
      if (response?.success) {
        setServices(response.data);
        console.log('Fetched shipping services:', response.data);
      } else {
        setError(response?.message || 'Failed to fetch shipping services');
        toast.error(response?.message || 'Failed to fetch shipping services');
      }
    } catch (err) {
      setError('An error occurred while fetching shipping services');
      toast.error('An error occurred while fetching shipping services');
      console.error('Error fetching shipping services:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Get filtered services based on selected filter
  const getFilteredServices = () => {
    return selectedFilter === 'All' 
      ? services 
      : services.filter(service => service.serviceMode === selectedFilter.toUpperCase());
  };
  
  // Get fastest service within the filtered services
  const getFastestServiceInFilter = () => {
    const filtered = getFilteredServices();
    if (!filtered.length) return null;
    
    return [...filtered].sort((a, b) => {
      const aEDT = typeof a.EDT === 'string' ? parseInt(a.EDT) || 999 : a.EDT || 999;
      const bEDT = typeof b.EDT === 'string' ? parseInt(b.EDT) || 999 : b.EDT || 999;
      
      // If EDT is the same, compare by total
      if (aEDT === bEDT) {
        return a.total - b.total;
      }
      
      return aEDT - bEDT;
    })[0];
  };
  
  // Get best value (cheapest) service within the filtered services
  const getBestValueServiceInFilter = () => {
    const filtered = getFilteredServices();
    if (!filtered.length) return null;
    
    return [...filtered].sort((a, b) => a.total - b.total)[0];
  };
  
  // Filter and sort services based on selected filter and sort type
  const getFilteredAndSortedServices = () => {
    let filtered = getFilteredServices();
    
    if (sortType === 'Fastest') {
      return filtered.sort((a, b) => {
        const aEDT = typeof a.EDT === 'string' ? parseInt(a.EDT) || 999 : a.EDT || 999;
        const bEDT = typeof b.EDT === 'string' ? parseInt(b.EDT) || 999 : b.EDT || 999;
        
        // If EDT is the same, compare by total
        if (aEDT === bEDT) {
          return a.total - b.total;
        }
        
        return aEDT - bEDT;
      });
    } else { // Cheapest
      return filtered.sort((a, b) => a.total - b.total);
    }
  };
  
  const filteredAndSortedServices = getFilteredAndSortedServices();
  
  // Get fastest and best value service IDs within the current filter context
  const fastestServiceId = getFastestServiceInFilter()?.partnerServiceId;
  const bestValueServiceId = getBestValueServiceInFilter()?.partnerServiceId;
  
  // Handle service selection and call SET_PARTNER_SERVICE_INFO API
  const handleServiceSelect = async (serviceId: string) => {
    setSelectedService(serviceId);
    
    const selected = services.find(service => service.partnerServiceId === serviceId);
    
    if (selected && tempOrderId && orderSource) {
      // First call the onServiceSelect callback to update parent component state
      if (onServiceSelect) {
        onServiceSelect({
          partnerServiceId: selected.partnerServiceId,
          partnerServiceName: selected.partnerServiceName,
          companyServiceId: selected.companyServiceId,
          companyServiceName: selected.companyServiceName
        });
      }
      
      // Then call the SET_PARTNER_SERVICE_INFO API
      setIsSubmittingService(true);
      try {
        const servicePayload = {
          partnerServiceId: selected.partnerServiceId,
          partnerServiceName: selected.partnerServiceName,
          companyServiceId: selected.companyServiceId,
          companyServiceName: selected.companyServiceName,
          tempOrderId: tempOrderId,
          source: orderSource,
        };

        // Call the API to set partner service info
        const response = await POST(SET_PARTNER_SERVICE_INFO, servicePayload);

        if (response?.data?.success) {
          toast.success("Shipping service selected successfully!");
        } else {
          toast.error(response?.data?.message || "Failed to select shipping service");
          // Reset selection if API call fails
          setSelectedService(null);
        }
      } catch (error) {
        console.error("Error selecting shipping service:", error);
        toast.error("An error occurred while selecting shipping service");
        // Reset selection if API call fails
        setSelectedService(null);
      } finally {
        setIsSubmittingService(false);
      }
    }
  };
  
  // Helper function to get the badges for a service
  const getServiceBadges = (serviceId: string) => {
    const badges = [];
    
    if (serviceId === fastestServiceId) {
      badges.push({ text: 'Fastest', color: 'bg-green-100 text-green-600' });
    }
    
    if (serviceId === bestValueServiceId) {
      badges.push({ text: 'Best Value', color: 'bg-blue-100 text-blue-600' });
    }
    
    return badges;
  };
  
  // Helper function to get the service mode badge
  const getServiceModeBadge = (mode: string) => {
    if (mode === 'AIR') {
      return { text: 'Air', color: 'bg-[#F7F7F8] text-black font-semibold text-sm leading-5 text-center align-middle capitalize font-open px-4' };
    } else if (mode === 'SURFACE') {
      return { text: 'Surface', color: 'bg-[#F7F7F8] text-black font-semibold text-sm leading-5 text-center align-middle capitalize font-open' };
    }
    return null;
  };
  
  // Helper function to format delivery time
  const formatDeliveryTime = (edt: number | string) => {
    if (!edt) return 'Delivery date not available';
    
    const days = typeof edt === 'string' ? parseInt(edt) || 1 : edt;
    return `Delivery in ${days}-${days + 1} Days`;
  };
  
  return (
    <div className="w-full mx-auto p-4">
      {/* Filter and Sort Section */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-medium mb-2 text-gray-800">Filter by Service Type</h2>
          <div className="flex border border-gray-200 rounded-md inline-flex overflow-hidden">
            {['All', 'Air', 'Surface'].map((filter) => (
              <button
                key={filter}
                className={`px-6 py-2 text-sm ${
                  selectedFilter === filter
                    ? 'bg-white text-gray-800 font-medium'
                    : 'bg-gray-50 text-gray-500'
                }`}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mt-2">
          <div className="border border-gray-200 rounded-md inline-flex overflow-hidden shadow-sm">
            {['Fastest', 'Cheapest'].map((sort) => (
              <button
                key={sort}
                className={`px-6 py-3 text-sm font-medium ${
                  sortType === sort
                    ? 'bg-white text-gray-800'
                    : 'bg-gray-50 text-gray-500'
                }`}
                onClick={() => setSortType(sort)}
              >
                {sort}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading shipping services...</p>
        </div>
      )}
      
      {/* Error State */}
      {error && (
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
        </div>
      )}
      
      {/* Service Options - Now in a fixed height scrollable container */}
      {!isLoading && !error && (
        <div 
          className="space-y-3 overflow-y-auto pr-1" 
          style={{ 
            height: '400px', /* Fixed height to show 3-4 cards */
            scrollbarWidth: 'none', /* For Firefox */
            msOverflowStyle: 'none' /* For Internet Explorer and Edge */
          }}
        >
          <style>
            {`
            /* Hide scrollbar for Chrome, Safari and Opera */
            .overflow-y-auto::-webkit-scrollbar {
              display: none;
            }
            `}
          </style>
          {filteredAndSortedServices.map((service) => {
            const badges = getServiceBadges(service.partnerServiceId);
            
            return (
              <div 
                key={service.partnerServiceId}
                className={`border rounded-lg p-4 flex items-center justify-between transition-colors mb-3 ${
                  selectedService === service.partnerServiceId
                    ? 'border-blue-500 border-2' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    id={`service-${service.partnerServiceId}`}
                    name="shipping-service"
                    className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                    checked={selectedService === service.partnerServiceId}
                    onChange={() => handleServiceSelect(service.partnerServiceId)}
                    disabled={isSubmittingService}
                  />
                  
                  <div className="ml-4">
                    <div className="flex items-center flex-wrap">
                      <span className="font-semibold text-base leading-snug tracking-normal mr-1">{service.partnerName} {service.partnerServiceName}</span>
                      <div className="flex items-center ml-1 mr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-yellow-600 font-semibold text-sm leading-5 tracking-normal text-center align-middle capitalize">4.5</span>
                      </div>
                      
                      {/* Service Mode Badge */}
                      {service.serviceMode && (
                        <span className={`ml-1 mr-1 text-xs px-2 py-1 rounded-full ${getServiceModeBadge(service.serviceMode)?.color}`}>
                          {getServiceModeBadge(service.serviceMode)?.text}
                        </span>
                      )}
                      
                      {/* Fastest/Best Value Badges */}
                      {badges.map((badge, index) => (
                        <span key={index} className={`ml-1 text-xs px-2 py-1 rounded-full ${badge.color}`}>
                          {badge.text}
                        </span>
                      ))}
                    </div>
                    <div className="text-gray-500 mt-1">{formatDeliveryTime(service.EDT)}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-xl font-semibold">₹ {service.total}</div>
                  <div className="text-gray-500 text-sm">inc GST</div>
                </div>
              </div>
            );
          })}
          
          {isSubmittingService && (
            <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
              <p className="text-gray-500">Selecting service...</p>
            </div>
          )}
          
          {filteredAndSortedServices.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No shipping services available for the selected filter.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShippingServiceSelector;
