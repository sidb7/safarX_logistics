import React, { useState } from 'react';

const ShippingServiceSelector = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedService, setSelectedService] = useState(null);
  
  // Service options data
  const services = [
    {
      id: 1,
      name: 'Bluedart Express',
      type: 'Air',
      rating: 4.5,
      badge: 'Recommended',
      badgeColor: 'bg-green-100 text-green-600',
      deliveryTime: 'Delivery in 1-2 Days',
      price: 3564,
    },
    {
      id: 2,
      name: 'Bluedart',
      type: 'Surface',
      rating: 4.5,
      badge: 'Best Value',
      badgeColor: 'bg-blue-100 text-blue-600',
      deliveryTime: 'Delivery in 1-2 Days',
      price: 3564,
    }
  ];
  
  // Filter services based on selected filter
  const filteredServices = selectedFilter === 'All' 
    ? services 
    : services.filter(service => service.type === selectedFilter);
  
  return (
    <div className="w-full mx-auto p-4">
      {/* Filter Section */}
      <div className="mb-4">
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
      
      {/* Service Options */}
      <div className="space-y-3">
        {filteredServices.map((service:any) => (
          <div 
            key={service.id}
            className={`border rounded-lg p-4 flex items-center justify-between transition-colors ${
              selectedService === service.id 
                ? 'border-blue-500 border-2' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <input
                type="radio"
                id={`service-${service.id}`}
                name="shipping-service"
                className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                checked={selectedService === service.id}
                onChange={() => setSelectedService(service.id)}
              />
              
              <div className="ml-4">
                <div className="flex items-center">
                  <span className="font-Open font-semibold text-base leading-snug tracking-normal">{service.name}</span>
                  <div className="flex items-center ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-[#CEC700] font-Open font-semibold text-sm leading-5 tracking-normal text-center align-middle capitalize">{service.rating}</span>
                  </div>
                  <span className={`ml-2 text-xs px-2 py-1 rounded-full ${service.badgeColor}`}>
                    {service.badge}
                  </span>
                </div>
                <div className="text-gray-500 mt-1">{service.deliveryTime}</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-xl font-semibold">₹ {service.price}</div>
              <div className="text-gray-500 text-sm">inc GST</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShippingServiceSelector;