import React, { useState, useEffect } from "react";
import { POST } from "../../utils/webService";
import {
  GET_COURIER_PARTNER_SERVICE,
  SET_SERVICE_INFO,
  POST_PLACE_ALL_ORDERS,
} from "../../utils/ApiUrls";
import { toast } from "react-hot-toast";
import { capitalizeFirstLetter } from "../../utils/utility";
import { Spinner } from "../../components/Spinner";
import OneButton from "../Button/OneButton";

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
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);
  const [serviceLoading, setServiceLoading] = useState(false);
  const [isServiceUpdated, setIsServiceUpdated] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Fetch services on component mount
  useEffect(() => {
    if (orderData) {
      fetchServiceList();
    }
  }, [orderData]);

  // Reset service updated state when service list changes
  useEffect(() => {
    setIsServiceUpdated(false);
  }, [serviceList]);

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

  const updateService = async () => {
    if (serviceList.length === 0) return;

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
        setIsServiceUpdated(true);
      } else {
        toast.error(data?.message || "Failed to update service");
        setIsServiceUpdated(false);
      }
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("Failed to update service");
      setIsServiceUpdated(false);
    }
  };

  const placeOrder = async () => {
    if (!isServiceUpdated) {
      toast.error("Please select and update a service first");
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
        toast.success("Order placed successfully!");
        onOrderPlaced();
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

        {serviceList.length > 0 && (
          <div className="flex justify-center mt-6">
            <OneButton
              text="Select Service"
              onClick={updateService}
              variant="primary"
              disabled={isServiceUpdated}
              className={isServiceUpdated ? "!bg-green-500 !border-green-500" : ""}
            />
          </div>
        )}

        {isServiceUpdated && (
          <div className="text-center mt-4">
            <p className="text-green-600 font-medium">
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
          Choose your preferred courier service to complete the order.
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
          disabled={!isServiceUpdated || isPlacingOrder}
        />
      </div>
    </div>
  );
};

export default ServiceSelectionComponent;