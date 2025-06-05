import React from "react";

// Define BoxData interfaces (matching OrderForm)
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

interface OrderSummaryProps {
  // Order Information props
  order: {
    orderId: string;
    orderType: string;
  };
  
  // Address Form props - including both objects and form values
  pickupAddress: any;
  deliveryAddress: any;
  pickupFormValues?: {
    contactNo: string;
    address: string;
    name: string;
    pincode: string;
    city: string;
    state: string;
    addressLine1: string;
    addressLine2: string;
    landmark: string;
    gstNo: string;
    email: string;
  };
  deliveryFormValues?: {
    contactNo: string;
    address: string;
    name: string;
    pincode: string;
    city: string;
    state: string;
    addressLine1: string;
    addressLine2: string;
    landmark: string;
    gstNo: string;
    email: string;
  };
  
  // Order Form props
  packageDetails: {
    packageType?: string;
    weight?: string;
    dimensions?: {
      length?: string;
      width?: string;
      height?: string;
    };
    itemDescription?: string;
    itemValue?: string;
    totalItems?: string;
  };
  
  // Full boxes data from OrderForm
  boxesData?: BoxData[];
  
  // Payment Information props
  paymentMethod: string;
  collectibleAmount: string;
  insuranceOption: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  order,
  pickupAddress,
  deliveryAddress,
  pickupFormValues,
  deliveryFormValues,
  packageDetails,
  paymentMethod,
  collectibleAmount,
  insuranceOption,
  boxesData = [],
}) => {
  // Helper function to render form field with label
  const renderField = (label: string, value: any, additionalClasses: string = "") => (
    <div className={`space-y-1 ${additionalClasses}`}>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium text-sm">{value || "Not provided"}</p>
    </div>
  );

  // Helper function to render address details section with all fields
  const renderAddressDetails = (
    addressType: string, 
    addressData: any, 
    formValues?: any
  ) => {
    // Prioritize form values if available, fall back to address object
    const data = formValues || addressData || {};
    
    if (!data || (Object.keys(data).length === 0)) {
      return (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">{addressType} Address</h4>
          <p className="text-gray-500">No {addressType.toLowerCase()} address provided</p>
        </div>
      );
    }

    return (
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-3">{addressType} Address</h4>
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          {renderField("Name", data.name)}
          {renderField("Contact Number", data.contactNo)}
          {renderField("Email", data.email)}
          {renderField("Complete Address", data.address, "col-span-2")}
          {renderField("Address Line 1", data.addressLine1)}
          {renderField("Address Line 2", data.addressLine2)}
          {renderField("Landmark", data.landmark)}
          {renderField("City", data.city)}
          {renderField("State", data.state)}
          {renderField("Pincode", data.pincode)}
          {renderField("GST Number", data.gstNo)}
        </div>
      </div>
    );
  };

  // Helper function to render a product item for the boxes section
  const renderProductItem = (product: Product) => (
    <div key={product.id} className="border-b border-gray-100 py-2 last:border-b-0">
      <div className="flex justify-between mb-1">
        <span className="font-medium">{product.name || "Unnamed Product"}</span>
        <span className="text-gray-700">₹{product.totalPrice || 0}</span>
      </div>
      <div className="grid grid-cols-2 text-sm text-gray-600">
        <div>Qty: {product.quantity || 0}</div>
        <div className="text-right">Unit: ₹{product.unitPrice || 0}</div>
        <div>Weight: {product.totalWeight || 0} kg</div>
        <div className="text-right">Unit: {product.unitWeight || 0} kg</div>
      </div>
      {/* Show additional product info */}
      <div className="mt-1 grid grid-cols-3 gap-1 text-xs text-gray-500">
        <div>Dimensions: {product.boxInfo.l || 0} × {product.boxInfo.b || 0} × {product.boxInfo.h || 0} cm</div>
        <div>Tax: {product.boxInfo.tax || 0}%</div>
        <div>Discount: {product.boxInfo.discount || 0}%</div>
        {product.boxInfo.hsn && <div>HSN: {product.boxInfo.hsn}</div>}
        {product.boxInfo.sku && <div>SKU: {product.boxInfo.sku}</div>}
      </div>
    </div>
  );

  // Helper function to render a box with its products
  const renderBox = (box: BoxData, index: number) => (
    <div key={box.id} className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
        <h5 className="font-medium">Box {box.id} {box.dimensions.name ? `- ${box.dimensions.name}` : ''}</h5>
        <div className="text-sm text-gray-600 flex flex-wrap gap-x-6 mt-1">
          <span>Dimensions: {box.dimensions.l || 0} × {box.dimensions.b || 0} × {box.dimensions.h || 0} cm</span>
          <span>Weight: {box.dimensions.weight || 0} kg</span>
          <span>Products: {box.products.length}</span>
        </div>
      </div>
      <div className="p-4 divide-y divide-gray-100">
        {box.products.length > 0 ? (
          box.products.map(product => renderProductItem(product))
        ) : (
          <p className="text-gray-500 italic">No products added to this box</p>
        )}
      </div>
    </div>
  );

  // Calculate total values from boxes
  const calculateTotals = () => {
    let totalItems = 0;
    let totalWeight = 0;
    let totalValue = 0;

    boxesData.forEach(box => {
      box.products.forEach(product => {
        totalItems += Number(product.quantity) || 0;
        totalWeight += Number(product.totalWeight) || 0;
        totalValue += Number(product.totalPrice) || 0;
      });
    });

    return { totalItems, totalWeight, totalValue };
  };

  const { totalItems, totalWeight, totalValue } = calculateTotals();

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 rounded-t-lg">
        <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
        <p className="text-sm text-gray-500">
          Review the details of your order before proceeding
        </p>
      </div>

      {/* Summary Content */}
      <div className="p-6 space-y-8">
        {/* Order Information Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200">
            Order Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-medium">{order.orderId || "Not provided"}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Order Type</p>
              <p className="font-medium">{order.orderType}</p>
            </div>
          </div>
        </div>

        {/* Address Information Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200">
            Address Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pickup Address with all form fields */}
            {renderAddressDetails("Pickup", pickupAddress, pickupFormValues)}

            {/* Delivery Address with all form fields */}
            {renderAddressDetails("Delivery", deliveryAddress, deliveryFormValues)}
          </div>
        </div>

        {/* Boxes and Products Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200">
            Boxes and Products
          </h3>
          
          {/* Boxes summary statistics */}
          <div className="mb-4 flex flex-wrap gap-4 bg-blue-50 p-4 rounded-lg">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Total Boxes</span>
              <span className="font-medium">{boxesData.length}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Total Items</span>
              <span className="font-medium">{totalItems}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Total Weight</span>
              <span className="font-medium">{totalWeight.toFixed(2)} kg</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Total Value</span>
              <span className="font-medium">₹{totalValue.toFixed(2)}</span>
            </div>
          </div>
          
          {/* List of boxes with their products */}
          <div className="space-y-4">
            {boxesData.length > 0 ? (
              boxesData.map((box, index) => renderBox(box, index))
            ) : (
              <div className="text-center py-4 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No boxes created yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Legacy Package Information Section (can be removed if not needed) */}
        <div className="border-t border-gray-100 pt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200">
            Package Details (Legacy)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Package Type</p>
              <p className="font-medium">{packageDetails?.packageType || "Not specified"}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Weight</p>
              <p className="font-medium">{packageDetails?.weight ? `${packageDetails.weight} kg` : "Not specified"}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Dimensions</p>
              <p className="font-medium">
                {packageDetails?.dimensions?.length && packageDetails?.dimensions?.width && packageDetails?.dimensions?.height
                  ? `${packageDetails.dimensions.length} × ${packageDetails.dimensions.width} × ${packageDetails.dimensions.height} cm`
                  : "Not specified"}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Item Description</p>
              <p className="font-medium">{packageDetails?.itemDescription || "Not provided"}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Declared Value</p>
              <p className="font-medium">{packageDetails?.itemValue ? `₹${packageDetails.itemValue}` : "Not specified"}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Total Items</p>
              <p className="font-medium">{packageDetails?.totalItems || "Not specified"}</p>
            </div>
          </div>
        </div>

        {/* Payment Information Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200">
            Payment Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="font-medium">{paymentMethod}</p>
            </div>
            {paymentMethod === "Cash on Delivery" && (
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Collectible Amount</p>
                <p className="font-medium">
                  {collectibleAmount ? `₹${collectibleAmount}` : "Not specified"}
                </p>
              </div>
            )}
            <div className="col-span-1 md:col-span-2 space-y-2">
              <p className="text-sm text-gray-500">Insurance</p>
              <p className="font-medium">
                {insuranceOption === "withInsurance"
                  ? "Protected with Insurance (Additional Charges Apply)"
                  : "No Insurance (Risk accepted by customer)"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;