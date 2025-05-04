import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OneButton from "../../components/Button/OneButton";

// Mock data for testing - this would be replaced with actual API data
const mockOrderData = {
  orderId: "ORD-123456",
  orderDate: "April 4, 2025 12:13pm",
  status: "Confirmed",
  customerName: "Hardik Mane",
  customerPhone: "9869494234",
  customerEmail: "hardik446@gmail.com",
  customerAddress: "Shop no 4, Bhoom Castle, New Link Rd, Malad, Etla Nagar, Malad West, Mumbai, Maharashtra 400064",
  shippingCourier: "Bluedart Express",
  awbNumber: "1430912762815",
  orderItems: [
    { name: "Women Blue Kurta", quantity: 20, price: 1599, total: 31980 },
    { name: "Women Linen Printed Regular Kurta", quantity: 40, price: 998, total: 39920 }
  ],
  totalInvoiceValue: 75000,
  shippingCharges: 4563,
  shipmentDetails: {
    shipped_by: {
      address: "12-A, 3rd Floor, Techniplex - II, Off Veer Savarkar Flyover, Goregaon(W)",
      pincode: "400 064",
      city: "Mumbai",
      contact_no: "9865 321 345",
      gstin: "27ACKPT429K1ZT"
    },
    delivery_address: {
      address: "XR6C+RCR, Maulana Shaukat Ali Road, Grant Road East, Bharat Nagar, Girgaon",
      pincode: "400007",
      contact_no: "9865 321 345"
    },
    courier_details: {
      name: "Smarter",
      awb: "P7838859497800097",
      order_date: "30/03/2025",
      product_dimensions: "2Kg | 20 x 30 x 50",
      payment_mode: "COD",
      collectable_amount: "₹1000"
    },
    items: [
      { sr_no: 1, name: "Long Island Green tea", sku: "SKUTTLIGT100G", price: 100, qty: 1, total: 100 },
      { sr_no: 2, name: "Saffron Kahwa Green tea", sku: "SKUTTLIGT107G", price: 200, qty: 1, total: 200 },
      { sr_no: 3, name: "Hibiscus Iced Green tea", sku: "SKUTTHGT100G", price: 150, qty: 2, total: 300 }
    ],
    grand_total: 1200,
    rto_address: "12-A, 3rd Floor, Techniplex - II, Off Veer Savarkar Flyover, Goregaon (W) City: Mumbai Pincode: 400 064 Contact No: 9865 321 345 GSTIN: 27ACKPT429K1ZT"
  }
};

function OrderBooked({ orderData = mockOrderData }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("invoice");
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleEmail = () => {
    // This would be connected to email API later
    alert("Email functionality will be implemented later");
  };
  
  const goBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Success Icon and Message */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-green-100 p-2">
            <svg 
              className="w-10 h-10 text-green-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-gray-600">Thank you for your order. Your shipment is being prepared.</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Order Summary Section */}
        <div className="bg-white rounded-md shadow-md p-6 lg:w-1/3">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Order Details</h3>
            <p>Order ID: {orderData.orderId}</p>
            <p>Date & Time: {orderData.orderDate}</p>
            <p>Status: <span className="text-green-500">{orderData.status}</span></p>
          </div>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Customer Details</h3>
            <p>{orderData.customerName}</p>
            <p>{orderData.customerPhone} | {orderData.customerEmail}</p>
            <p className="text-sm text-gray-600">{orderData.customerAddress}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Shipping Details</h3>
            <p>{orderData.shippingCourier}</p>
            <p>AWB No: {orderData.awbNumber}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Order Items</h3>
            {orderData.orderItems.map((item, index) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between">
                  <span>{item.name}</span>
                  <span>{item.quantity} × ₹ {item.price}</span>
                </div>
              </div>
            ))}
            <div className="mt-2 text-sm text-blue-500 cursor-pointer">
              <span>View More</span>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Total Invoice Value</span>
              <span>₹ {orderData.totalInvoiceValue}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Shipping Charges</span>
              <span>₹ {orderData.shippingCharges}</span>
            </div>
          </div>
        </div>
        
        {/* Invoice, Label, Manifest Tabs */}
        <div className="bg-white rounded-md shadow-md p-6 lg:w-2/3">
          {/* Tabs */}
          <div className="flex border-b mb-6">
            <button 
              className={`pb-2 px-4 ${activeTab === 'invoice' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('invoice')}
            >
              Invoice
            </button>
            <button 
              className={`pb-2 px-4 ${activeTab === 'shipping' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('shipping')}
            >
              Shipping Label
            </button>
            <button 
              className={`pb-2 px-4 ${activeTab === 'manifest' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('manifest')}
            >
              Manifest
            </button>
          </div>
          
          {/* Tab Content - Invoice */}
          {activeTab === 'invoice' && (
            <div className="border rounded-md">
              <div className="grid grid-cols-3 border-b">
                <div className="p-4 flex items-center justify-center">
                  <div className="text-center">
                    <img src="/shipyaari-logo.png" alt="Shipyaari" className="w-24 mx-auto" />
                  </div>
                </div>
                <div className="p-4 border-l border-r">
                  <div className="text-sm">
                    <p className="font-semibold">Shipped by:</p>
                    <p>{orderData.shipmentDetails.shipped_by.address}</p>
                    <p>Pincode: {orderData.shipmentDetails.shipped_by.pincode}</p>
                    <p>City: {orderData.shipmentDetails.shipped_by.city}</p>
                    <p>Contact No: {orderData.shipmentDetails.shipped_by.contact_no}</p>
                    <p>GSTIN: {orderData.shipmentDetails.shipped_by.gstin}</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-sm">
                    <p className="font-semibold">Delivery Address:</p>
                    <p>{orderData.shipmentDetails.delivery_address.address}</p>
                    <p>Mumbai {orderData.shipmentDetails.delivery_address.pincode}</p>
                    <p>Contact No: {orderData.shipmentDetails.delivery_address.contact_no}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 border-b">
                <div className="col-span-2 p-4">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Sr. No.</th>
                          <th className="text-left py-2">Product Name</th>
                          <th className="text-left py-2">SKU</th>
                          <th className="text-right py-2">Price</th>
                          <th className="text-center py-2">Qty</th>
                          <th className="text-right py-2">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderData.shipmentDetails.items.map((item) => (
                          <tr key={item.sr_no} className="border-b">
                            <td className="py-2">{item.sr_no}.</td>
                            <td className="py-2">{item.name}</td>
                            <td className="py-2">{item.sku}</td>
                            <td className="text-right py-2">{item.price}</td>
                            <td className="text-center py-2">{item.qty}</td>
                            <td className="text-right py-2">{item.total}</td>
                          </tr>
                        ))}
                        <tr>
                          <td colSpan={5} className="text-right py-2 font-semibold">Grand Total</td>
                          <td className="text-right py-2 font-semibold">{orderData.shipmentDetails.grand_total}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="p-4 border-l">
                  <div className="text-sm">
                    <p className="font-semibold">Courier Name:</p>
                    <p>{orderData.shipmentDetails.courier_details.name}</p>
                    <p>AWB: {orderData.shipmentDetails.courier_details.awb}</p>
                    <p>Order Date: {orderData.shipmentDetails.courier_details.order_date}</p>
                    <p>Product Weight & Dimension:</p>
                    <p>{orderData.shipmentDetails.courier_details.product_dimensions}</p>
                    <p>Payment Mode: {orderData.shipmentDetails.courier_details.payment_mode}</p>
                    <p>Collectable Amount: {orderData.shipmentDetails.courier_details.collectable_amount}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 border-b">
                <div className="col-span-2 p-4">
                  <div className="text-center">
                    <div className="mb-4">
                      <img src="/barcode.png" alt="Barcode" className="h-12 mx-auto" />
                    </div>
                    <div className="text-sm">
                      <p className="font-semibold">RTO Address: (if undelivered, return to) :</p>
                      <p>{orderData.shipmentDetails.rto_address}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-l">
                  <div className="text-center">
                    <img src="/shipyaari-logo.png" alt="Shipyaari" className="w-24 mx-auto" />
                    <p className="text-xs mt-2">
                      All disputes are subject to Maharashtra's jurisdiction only. Goods once sold will only be taken back/exchanged as per the details listed in exchange policy*
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Tab Content - Shipping Label */}
          {activeTab === 'shipping' && (
            <div className="text-center p-6">
              <p>Shipping label will be available here.</p>
              <p className="text-gray-500 text-sm mt-2">You'll be able to download and print your shipping label.</p>
            </div>
          )}
          
          {/* Tab Content - Manifest */}
          {activeTab === 'manifest' && (
            <div className="text-center p-6">
              <p>Manifest information will be available here.</p>
              <p className="text-gray-500 text-sm mt-2">This will contain a summary of all shipments for the courier.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-between mt-8">
        <OneButton
          text="Back to Dashboard"
          onClick={goBackToDashboard}
          variant="secondary"
          className="flex items-center"
          icon={
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
          }
        />
        
        <div className="flex gap-4">
          <OneButton
            text="Print"
            onClick={handlePrint}
            variant="primary"
            className="flex items-center"
            icon={
              <svg 
                className="w-5 h-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                ></path>
              </svg>
            }
          />
          
          <OneButton
            text="Email"
            onClick={handleEmail}
            variant="primary"
            className="flex items-center"
            icon={
              <svg 
                className="w-5 h-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
}

export default OrderBooked;