import { useState, useEffect } from "react";
import FloatingLabelInput from "./FloatingLabelInput";
import {
  ChevronUp,
  ChevronDown,
  Trash,
  Bookmark,
  Package,
  Save,
} from "./Icons";

import boxIcon from "../../assets/Order/box.svg";
import { POST } from "../../utils/webService";

import { GET_PRODUCT_SUGGETION, GET_BOX_SUGGETION } from "../../utils/ApiUrls";
import HorizontalScroller from "./HorizontalScroller";
import CenterModal from "../../components/CustomModal/customCenterModal";
import OneButton from "../../components/Button/OneButton";

// Define types
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
  selectedSuggestion: ProductSuggestion | null;
}

interface BoxDimensions {
  l: string | number;
  b: string | number;
  h: string | number;
  weight: string | number;
}

interface BoxData {
  id: number;
  dimensions: BoxDimensions;
  products: Product[];
  selectedBoxSuggestion: BoxSuggestion | null;
}

interface ProductSuggestion {
  productId: string;
  name: string;
  companyId: string;
  privateCompanyId: number;
  sellerId: number;
  category: string;
  length: number;
  breadth: number;
  height: number;
  appliedWeight: number;
  deadWeight: number;
  volumetricWeight: number;
  unitPrice: number;
  unitTax: number;
  qty: number;
  sku: string;
  hsnCode: string;
  selected: boolean;
  weightUnit: string;
  measureUnit: string;
  currency: string;
  divisor: number;
  variantId: string;
  images: any[];
}

interface BoxSuggestion {
  boxId: string;
  name: string;
  appliedWeight: number;
  deadWeight: number;
  volumetricWeight: number;
  length: number;
  breadth: number;
  height: number;
  weightUnit: string;
  measureUnit: string;
  price: number;
  currency: string;
  divisor: number;
  color?: string;
  isFragile?: boolean;
}

const OrderForm: React.FC = () => {
  const [boxCount, setBoxCount] = useState<number>(1);
  const [selectedBox, setSelectedBox] = useState<number>(1);
  const [allBoxesIdentical, setAllBoxesIdentical] = useState<boolean>(false);
  const [productSuggestions, setProductSuggestions] = useState<
    ProductSuggestion[]
  >([]);
  const [boxSuggestions, setBoxSuggestions] = useState<BoxSuggestion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isProductCatalogModalOpen, setIsProductCatalogModalOpen] =
    useState<boolean>(false);
  const [isBoxCatalogModalOpen, setIsBoxCatalogModalOpen] =
    useState<boolean>(false);
  const [currentProductId, setCurrentProductId] = useState<number | null>(null);

  // Store visible product suggestions for each product
  const [visibleProductSuggestions, setVisibleProductSuggestions] = useState<{
    [productId: number]: ProductSuggestion[];
  }>({});

  // Store visible box suggestions
  const [visibleBoxSuggestions, setVisibleBoxSuggestions] = useState<
    BoxSuggestion[]
  >([]);

  // Store boxes and their products in a single state
  const [boxes, setBoxes] = useState<BoxData[]>([
    {
      id: 1,
      dimensions: {
        l: "",
        b: "",
        h: "",
        weight: "",
      },
      products: [
        {
          id: 1,
          name: "",
          quantity: "",
          unitPrice: "",
          unitWeight: "",
          totalPrice: "",
          totalWeight: "",
          isExpanded: true, // Default to expanded
          boxInfo: {
            l: "",
            b: "",
            h: "",
            discount: "",
            tax: "",
            hsn: "",
            sku: "",
          },
          selectedSuggestion: null,
        },
      ],
      selectedBoxSuggestion: null,
    },
  ]);

  // Get current box data
  const currentBox = boxes.find((box) => box.id === selectedBox) || boxes[0];

  // Fetch product suggestions from API
  const fetchProductSuggestions = async () => {
    setLoading(true);
    try {
      const payload = {
        skip: 0,
        limit: 1000,
        pageNo: 1,
        sort: { _id: -1 },
        searchValue: "",
      };

      const response = await POST(GET_PRODUCT_SUGGETION, payload);

      if (response?.data?.success) {
        setProductSuggestions(response.data.data);

        // Initialize visible product suggestions for each product
        const initialVisibleSuggestions: {
          [productId: number]: ProductSuggestion[];
        } = {};
        boxes.forEach((box) => {
          box.products.forEach((product) => {
            // Show top 3 suggestions for each product
            initialVisibleSuggestions[product.id] = response.data.data.slice(
              0,
              3
            );
          });
        });
        setVisibleProductSuggestions(initialVisibleSuggestions);
      } else {
        setProductSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching product suggestions:", error);
      setProductSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch box suggestions from API
  const fetchBoxSuggestions = async () => {
    setLoading(true);
    try {
      const payload = {
        skip: 0,
        limit: 1000,
        pageNo: 1,
        sort: { _id: -1 },
        searchValue: "",
      };

      const response = await POST(GET_BOX_SUGGETION, payload);

      if (response?.data?.success) {
        setBoxSuggestions(response.data.data);

        // Initialize visible box suggestions (top 3)
        setVisibleBoxSuggestions(response.data.data.slice(0, 3));
      } else {
        setBoxSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching box suggestions:", error);
      setBoxSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  // Load suggestions when component mounts
  useEffect(() => {
    fetchProductSuggestions();
    fetchBoxSuggestions();
  }, []);

  const decreaseBoxCount = (): void => {
    if (boxCount > 1) {
      const newCount = boxCount - 1;
      setBoxCount(newCount);

      // Remove the last box
      setBoxes((prev) => prev.filter((box) => box.id <= newCount));

      // If selected box is removed, select the last remaining box
      if (selectedBox > newCount) {
        setSelectedBox(newCount);
      }
    }
  };

  const increaseBoxCount = (): void => {
    const newCount = boxCount + 1;
    setBoxCount(newCount);

    // Add a new box with a default product
    setBoxes((prev: any) => [
      ...prev,
      {
        id: newCount,
        dimensions: {
          l: "",
          b: "",
          h: "",
          weight: "",
        },
        products: [
          {
            id: 1,
            name: "",
            quantity: "",
            unitPrice: "",
            unitWeight: "",
            totalPrice: "",
            totalWeight: "",
            isExpanded: true,
            boxInfo: {
              l: "",
              b: "",
              h: "",
              discount: "",
              tax: "",
              hsn: "",
              sku: "",
            },
            selectedSuggestions: [],
          },
        ],
        selectedBoxSuggestion: null,
      },
    ]);
  };

  const handleBoxSelect = (boxNumber: number): void => {
    setSelectedBox(boxNumber);
  };

  const toggleAdditionalInfo = (productId: number): void => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) => {
        if (box.id === selectedBox) {
          return {
            ...box,
            products: box.products.map((product) => {
              if (product.id === productId) {
                return {
                  ...product,
                  isExpanded: !product.isExpanded,
                };
              }
              return product;
            }),
          };
        }
        return box;
      })
    );
  };

  const toggleProductExpansion = (productId: number): void => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) => {
        if (box.id === selectedBox) {
          return {
            ...box,
            products: box.products.map((product) => {
              if (product.id === productId) {
                return {
                  ...product,
                  isExpanded: !product.isExpanded,
                };
              }
              return product;
            }),
          };
        }
        return box;
      })
    );
  };

  const addNewProduct = (): void => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) => {
        if (box.id === selectedBox) {
          const newProductId =
            box.products.length > 0
              ? Math.max(...box.products.map((p) => p.id)) + 1
              : 1;

          // Initialize visible product suggestions for the new product
          setVisibleProductSuggestions((prev) => ({
            ...prev,
            [newProductId]: productSuggestions.slice(0, 3),
          }));

          return {
            ...box,
            products: [
              ...box.products,
              {
                id: newProductId,
                name: "",
                quantity: "",
                unitPrice: "",
                unitWeight: "",
                totalPrice: "",
                totalWeight: "",
                isExpanded: true,
                boxInfo: {
                  l: "",
                  b: "",
                  h: "",
                  discount: "",
                  tax: "",
                  hsn: "",
                  sku: "",
                },
                selectedSuggestion: null,
              },
            ],
          };
        }
        return box;
      })
    );
  };

  const removeProduct = (productId: number): void => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) => {
        if (box.id === selectedBox) {
          if (box.products.length > 1) {
            return {
              ...box,
              products: box.products.filter(
                (product) => product.id !== productId
              ),
            };
          }
        }
        return box;
      })
    );
  };

  const updateBoxDimensions = (
    field: keyof BoxDimensions,
    value: string
  ): void => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) => {
        if (box.id === selectedBox) {
          return {
            ...box,
            dimensions: {
              ...box.dimensions,
              [field]: value,
            },
          };
        }
        if (allBoxesIdentical) {
          return {
            ...box,
            dimensions: {
              ...box.dimensions,
              [field]: value,
            },
          };
        }
        return box;
      })
    );
  };

  // Select a product suggestion for a product
  const selectProductSuggestion = (
    productId: number,
    suggestion: ProductSuggestion
  ): void => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) => {
        if (box.id === selectedBox) {
          return {
            ...box,
            products: box.products.map((product) => {
              if (product.id === productId) {
                return {
                  ...product,
                  selectedSuggestion: suggestion,
                  name: suggestion.name,
                  quantity: suggestion.qty,
                  unitPrice: suggestion.unitPrice,
                  unitWeight: suggestion.deadWeight,
                  // Calculate total price and weight
                  totalPrice: suggestion.qty * suggestion.unitPrice,
                  totalWeight: suggestion.qty * suggestion.deadWeight,
                  boxInfo: {
                    ...product.boxInfo,
                    l: suggestion.length,
                    b: suggestion.breadth,
                    h: suggestion.height,
                    tax: suggestion.unitTax,
                    hsn: suggestion.hsnCode || "",
                    sku: suggestion.sku || "",
                  },
                };
              }
              return product;
            }),
          };
        }
        return box;
      })
    );
  };

  // Remove product suggestion and show the next available
  const removeProductSuggestion = (productId: number): void => {
    // First, remove the selection from the product
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) => {
        if (box.id === selectedBox) {
          return {
            ...box,
            products: box.products.map((product) => {
              if (product.id === productId) {
                return {
                  ...product,
                  selectedSuggestion: null,
                };
              }
              return product;
            }),
          };
        }
        return box;
      })
    );

    // Update visible suggestions for this product by rotating them
    setVisibleProductSuggestions((prev) => {
      const currentVisible = prev[productId] || [];

      // If we have more suggestions available, show the next batch
      if (
        currentVisible.length > 0 &&
        productSuggestions.length > currentVisible.length
      ) {
        // Find the index of the last currently visible suggestion
        const lastVisibleIndex = productSuggestions.findIndex(
          (suggestion) =>
            suggestion.productId ===
            currentVisible[currentVisible.length - 1].productId
        );

        // Get next 3 suggestions (or fewer if fewer are available)
        const nextIndex = (lastVisibleIndex + 1) % productSuggestions.length;
        const nextSuggestions = [];

        for (let i = 0; i < 3; i++) {
          const index = (nextIndex + i) % productSuggestions.length;
          nextSuggestions.push(productSuggestions[index]);
          // If we've gone through the whole list, stop
          if (index === lastVisibleIndex) break;
        }

        return {
          ...prev,
          [productId]: nextSuggestions,
        };
      }

      return prev;
    });
  };

  // Select a box suggestion
  const selectBoxSuggestion = (suggestion: BoxSuggestion): void => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) => {
        if (box.id === selectedBox) {
          return {
            ...box,
            selectedBoxSuggestion: suggestion,
            dimensions: {
              l: suggestion.length || "",
              b: suggestion.breadth || "",
              h: suggestion.height || "",
              weight: suggestion.deadWeight || "",
            },
          };
        }
        return box;
      })
    );
  };

  // Remove box suggestion and show the next available
  const removeBoxSuggestion = (): void => {
    // First, remove the selection from the box
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) => {
        if (box.id === selectedBox) {
          return {
            ...box,
            selectedBoxSuggestion: null,
          };
        }
        return box;
      })
    );

    // Update visible box suggestions by rotating them
    setVisibleBoxSuggestions((prev) => {
      // If we have more suggestions available, show the next batch
      if (prev.length > 0 && boxSuggestions.length > prev.length) {
        // Find the index of the last currently visible suggestion
        const lastVisibleIndex = boxSuggestions.findIndex(
          (suggestion) => suggestion.boxId === prev[prev.length - 1].boxId
        );

        // Get next 3 suggestions (or fewer if fewer are available)
        const nextIndex = (lastVisibleIndex + 1) % boxSuggestions.length;
        const nextSuggestions = [];

        for (let i = 0; i < 3; i++) {
          const index = (nextIndex + i) % boxSuggestions.length;
          nextSuggestions.push(boxSuggestions[index]);
          // If we've gone through the whole list, stop
          if (index === lastVisibleIndex) break;
        }

        return nextSuggestions;
      }

      return prev;
    });
  };

  const openProductCatalogModal = (productId: number) => {
    setCurrentProductId(productId);
    setIsProductCatalogModalOpen(true);
  };

  const closeProductCatalogModal = () => {
    setIsProductCatalogModalOpen(false);
  };

  const openBoxCatalogModal = () => {
    setIsBoxCatalogModalOpen(true);
  };

  const closeBoxCatalogModal = () => {
    setIsBoxCatalogModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-50">
      {/* Box Count Control */}
      <div className="flex items-center mb-6">
        <div className="text-gray-800 font-medium mr-4">
          How many boxes are there in this order?
        </div>
        <button
          onClick={decreaseBoxCount}
          className="px-3 py-1 border border-gray-300 rounded-l"
        >
          −
        </button>
        <div className="px-4 py-1 border-t border-b border-gray-300 bg-white">
          {boxCount}
        </div>
        <button
          onClick={increaseBoxCount}
          className="px-3 py-1 border border-gray-300 rounded-r"
        >
          +
        </button>
        <div className="ml-auto flex items-center">
          <input
            type="checkbox"
            id="identical-boxes"
            checked={allBoxesIdentical}
            onChange={(e) => setAllBoxesIdentical(e.target.checked)}
            className="mr-2"
          />
          <span>All Boxes Identical</span>
        </div>
      </div>

      {/* Box Selection - Added horizontal scrolling */}
      <div className="overflow-x-auto mb-8">
        <div className="flex space-x-2 min-w-max">
          {Array.from({ length: boxCount }, (_, i) => i + 1).map((boxNum) => (
            <button
              key={boxNum}
              onClick={() => handleBoxSelect(boxNum)}
              className={`px-4 py-2 border ${
                selectedBox === boxNum
                  ? "bg-gray-200 border-gray-400"
                  : "bg-white border-gray-300"
              } rounded`}
            >
              {boxNum === selectedBox ? `Box ${boxNum}` : `Box ${boxNum}`}
            </button>
          ))}
        </div>
      </div>

      {/* Two-column layout for products and box info */}
      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
        {/* Left column - Products List */}
        <div className="w-full lg:w-2/3 space-y-4">
          {currentBox.products.length === 0 ? (
            <div className="bg-blue-50 rounded-md p-8 flex flex-col items-center justify-center">
              <p className="text-gray-500 mb-4">
                No products added to Box {selectedBox} yet
              </p>
              <button
                onClick={addNewProduct}
                className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                <span className="mr-2">+</span>
                <span>Add Product</span>
              </button>
            </div>
          ) : (
            currentBox.products.map((product) => (
              <div key={product.id} className="bg-blue-50 rounded-md p-4">
                {/* Product Header */}
                <div
                  className="flex justify-between items-center mb-4 cursor-pointer"
                  onClick={() => toggleProductExpansion(product.id)}
                >
                  <div className="font-medium text-gray-800">
                    Product {product.id}
                  </div>
                  {product.isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>

                {product.isExpanded && (
                  <>
                    {/* Product Actions */}
                    <div className="flex justify-end mb-4 space-x-2">
                      <button
                        className="p-2 text-gray-500"
                        onClick={() => removeProduct(product.id)}
                        title="Delete product"
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-500">
                        <Bookmark className="w-5 h-5" />
                      </button>
                      {/* <button className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-md">
                        <Package className="w-4 h-4" />
                        <span>Product Catalog</span>
                      </button> */}
                      <OneButton
                        text="Product Catalog"
                        onClick={() => openProductCatalogModal(product.id)}
                        variant="secondary"
                        className="!rounded-full"
                        showIcon={true}
                        icon={<Package className="w-4 h-4" />}
                      />
                    </div>

                    {/* Product Suggestions Display */}
                    {/* Product Suggestions Display */}
                    <div>
                      <HorizontalScroller className="my-6">
                        <div className="flex whitespace-nowrap gap-2 pb-2">
                          {visibleProductSuggestions[product.id]?.map(
                            (suggestion, index) => {
                              // Check if this is the selected suggestion
                              const isSelected =
                                product.selectedSuggestion &&
                                suggestion.productId ===
                                  product.selectedSuggestion.productId;

                              return (
                                <div
                                  key={suggestion.productId}
                                  className={`flex items-center border rounded-md px-3 py-1 cursor-pointer ${
                                    isSelected
                                      ? "bg-blue-100 border-blue-400 text-blue-700"
                                      : "bg-white border-gray-300 hover:bg-gray-50 text-[#004EFF]"
                                  }`}
                                >
                                  <span
                                    className="mr-2"
                                    onClick={() =>
                                      selectProductSuggestion(
                                        product.id,
                                        suggestion
                                      )
                                    }
                                  >
                                    {suggestion.name}
                                  </span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // If this is the selected suggestion, clear the selection
                                      if (isSelected) {
                                        removeProductSuggestion(product.id);
                                      }

                                      // Remove this suggestion from visible suggestions and add a new one
                                      setVisibleProductSuggestions((prev) => {
                                        const currentSuggestions = [
                                          ...prev[product.id],
                                        ];
                                        const indexToRemove =
                                          currentSuggestions.findIndex(
                                            (s) =>
                                              s.productId ===
                                              suggestion.productId
                                          );

                                        if (indexToRemove !== -1) {
                                          // Find suggestions not currently visible
                                          const unusedSuggestions =
                                            productSuggestions.filter(
                                              (s) =>
                                                !currentSuggestions.some(
                                                  (cs) =>
                                                    cs.productId === s.productId
                                                )
                                            );

                                          // Remove the current suggestion
                                          currentSuggestions.splice(
                                            indexToRemove,
                                            1
                                          );

                                          // Add a new suggestion if available
                                          if (unusedSuggestions.length > 0) {
                                            currentSuggestions.push(
                                              unusedSuggestions[0]
                                            );
                                          }

                                          return {
                                            ...prev,
                                            [product.id]: currentSuggestions,
                                          };
                                        }

                                        return prev;
                                      });
                                    }}
                                    className="text-gray-500 hover:text-gray-700"
                                  >
                                    ×
                                  </button>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </HorizontalScroller>
                    </div>

                    {/* Product Details Form - Reorganized layout */}
                    <div className="mb-4">
                      {/* First row: Name, Qty, Unit Price, Unit Wt */}
                      <div className="flex flex-wrap gap-2 mb-2">
                        <div className="flex-grow min-w-[200px]">
                          <FloatingLabelInput
                            placeholder="Product Name"
                            value={product.name.toString()}
                          />
                        </div>
                        <div className="w-20">
                          <FloatingLabelInput
                            placeholder="Qty"
                            value={product.quantity.toString()}
                            type="number"
                          />
                        </div>
                        <div className="w-28">
                          <FloatingLabelInput
                            placeholder="Unit Price"
                            value={product.unitPrice.toString()}
                            type="number"
                          />
                        </div>
                        <div className="w-28">
                          <FloatingLabelInput
                            placeholder="Unit Wt (kg)"
                            value={product.unitWeight.toString()}
                            type="number"
                          />
                        </div>
                      </div>

                      {/* Second row: Total Price and Total Wt aligned right */}
                      <div className="flex justify-end gap-2">
                        <div className="w-32">
                          <FloatingLabelInput
                            placeholder="Total Price"
                            value={product.totalPrice.toString()}
                            type="number"
                            counter="₹"
                          />
                        </div>
                        <div className="w-32">
                          <FloatingLabelInput
                            placeholder="Total Wt (kg)"
                            value={product.totalWeight.toString()}
                            type="number"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Additional Information - Toggle implementation */}
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div
                        className="flex justify-between items-center mb-4 cursor-pointer"
                        onClick={() => toggleAdditionalInfo(product.id)}
                      >
                        <div className="font-medium text-gray-700">
                          {product.isExpanded ? "Hide" : "Show"} Additional
                          Information
                        </div>
                        {product.isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </div>

                      {product.isExpanded && (
                        <div className="flex gap-2">
                          <div className="flex items-center gap-2">
                            <div className="!w-14">
                              <FloatingLabelInput
                                placeholder="L"
                                value={product.boxInfo.l.toString()}
                                type="number"
                              />
                            </div>
                            <div className="!w-14">
                              <FloatingLabelInput
                                placeholder="B"
                                value={product.boxInfo.b.toString()}
                                type="number"
                              />
                            </div>
                            <div className="!w-14">
                              <FloatingLabelInput
                                placeholder="H"
                                value={product.boxInfo.h.toString()}
                                type="number"
                              />
                            </div>
                          </div>
                          <div>
                            <FloatingLabelInput
                              placeholder="Discount %"
                              value={product.boxInfo.discount.toString()}
                              type="number"
                            />
                          </div>
                          <div>
                            <FloatingLabelInput
                              placeholder="Tax"
                              value={product.boxInfo.tax.toString()}
                              type="number"
                            />
                          </div>
                          <div>
                            <FloatingLabelInput
                              placeholder="HSN"
                              value={product.boxInfo.hsn}
                            />
                          </div>
                          <div>
                            <FloatingLabelInput
                              placeholder="SKU"
                              value={product.boxInfo.sku}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))
          )}

          {currentBox.products.length > 0 && (
            <div className="flex justify-center">
              <button
                onClick={addNewProduct}
                className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                <span className="mr-2">+</span>
                <span>Product</span>
              </button>
            </div>
          )}
        </div>

        {/* Right column - Box Info */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white border border-gray-200 rounded-md p-4 lg:sticky lg:top-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div className="font-medium text-gray-800 text-lg mb-2 sm:mb-0">
                Box {selectedBox} Info
              </div>
              <div className="flex space-x-2 w-full sm:w-auto justify-end">
                <button className="p-2 text-gray-500">
                  <Bookmark className="w-5 h-5" />
                </button>
                {/* <button className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-md">
                  <Package className="w-4 h-4" />
                  <span>Box Catalog</span>
                </button> */}
                <OneButton
                  text="Box Catalog"
                  onClick={openBoxCatalogModal}
                  variant="secondary"
                  className="!rounded-full"
                  showIcon={true}
                  icon={<Package className="w-4 h-4" />}
                />
              </div>
            </div>

            {/* Display selected box suggestion if any */}
            {/* {currentBox.selectedBoxSuggestion && (
              <div className="mb-4 flex items-center bg-white border border-gray-300 rounded-md px-3 py-1 w-fit">
                <span className="mr-2">
                  {currentBox.selectedBoxSuggestion.name}
                </span>
                <button
                  onClick={removeBoxSuggestion}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
            )}

            {!currentBox.selectedBoxSuggestion && (
              <div className="mb-4 flex flex-wrap gap-2">
                {visibleBoxSuggestions.map((suggestion) => (
                  <div
                    key={suggestion.boxId}
                    className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-1 cursor-pointer hover:bg-gray-50"
                    onClick={() => selectBoxSuggestion(suggestion)}
                  >
                    <span>{suggestion.name}</span>
                  </div>
                ))}
              </div>
            )} */}

            {/* Box Suggestions Display */}
            {/* Box Suggestions Display */}
            <HorizontalScroller className="my-4">
              <div className="flex gap-2 whitespace-nowrap pb-2">
                {visibleBoxSuggestions.map((suggestion) => {
                  // Check if this is the selected suggestion
                  const isSelected =
                    currentBox.selectedBoxSuggestion &&
                    suggestion.boxId === currentBox.selectedBoxSuggestion.boxId;

                  return (
                    <div
                      key={suggestion.boxId}
                      className={`flex items-center border rounded-md px-3 py-1 cursor-pointer ${
                        isSelected
                          ? "bg-blue-100 border-blue-400 text-[#004EFF]"
                          : "bg-white border-gray-300 hover:bg-gray-50 text-[#004EFF]"
                      }`}
                    >
                      <span
                        className="mr-2"
                        onClick={() => selectBoxSuggestion(suggestion)}
                      >
                        {suggestion.name}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // If this is the selected suggestion, clear the selection
                          if (isSelected) {
                            removeBoxSuggestion();
                          }

                          // Remove this suggestion from visible suggestions and add a new one
                          setVisibleBoxSuggestions((prev) => {
                            const currentSuggestions = [...prev];
                            const indexToRemove = currentSuggestions.findIndex(
                              (s) => s.boxId === suggestion.boxId
                            );

                            if (indexToRemove !== -1) {
                              // Find suggestions not currently visible
                              const unusedSuggestions = boxSuggestions.filter(
                                (s) =>
                                  !currentSuggestions.some(
                                    (cs) => cs.boxId === s.boxId
                                  )
                              );

                              // Remove the current suggestion
                              currentSuggestions.splice(indexToRemove, 1);

                              // Add a new suggestion if available
                              if (unusedSuggestions.length > 0) {
                                currentSuggestions.push(unusedSuggestions[0]);
                              }

                              return currentSuggestions;
                            }

                            return prev;
                          });
                        }}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
            </HorizontalScroller>

            <div className="flex justify-center mb-6">
              <div className="relative w-48 h-48 md:w-56 md:h-56">
                <img
                  src={boxIcon}
                  alt="Box illustration"
                  className="w-full h-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <FloatingLabelInput
                  placeholder="L"
                  value={currentBox.dimensions.l.toString()}
                  type="number"
                  onChangeCallback={(value) => updateBoxDimensions("l", value)}
                />
              </div>
              <div>
                <FloatingLabelInput
                  placeholder="B"
                  value={currentBox.dimensions.b.toString()}
                  type="number"
                  onChangeCallback={(value) => updateBoxDimensions("b", value)}
                />
              </div>
              <div>
                <FloatingLabelInput
                  placeholder="H"
                  value={currentBox.dimensions.h.toString()}
                  type="number"
                  onChangeCallback={(value) => updateBoxDimensions("h", value)}
                />
              </div>
              <div>
                <FloatingLabelInput
                  placeholder="Weight (kg)"
                  value={currentBox.dimensions.weight.toString()}
                  type="number"
                  onChangeCallback={(value) =>
                    updateBoxDimensions("weight", value)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Product Catalog Modal */}
      <CenterModal
        isOpen={isProductCatalogModalOpen}
        onRequestClose={closeProductCatalogModal}
        contentLabel="Product Catalog"
        shouldCloseOnOverlayClick={true}
      >
        <div className="w-full h-full flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-xl font-medium">Product Catalog</h2>
            <button
              onClick={closeProductCatalogModal}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
          </div>
          <div className="flex-grow p-4 overflow-auto">
            {/* Product catalog content here */}
            <p>
              Select a product from the catalog for Product #{currentProductId}
            </p>
            {/* You can display product suggestions or a form to search products */}
          </div>
        </div>
      </CenterModal>

      {/* Box Catalog Modal */}
      <CenterModal
        isOpen={isBoxCatalogModalOpen}
        onRequestClose={closeBoxCatalogModal}
        contentLabel="Box Catalog"
        shouldCloseOnOverlayClick={true}
      >
        <div className="w-full h-full flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-xl font-medium">Box Catalog</h2>
            <button
              onClick={closeBoxCatalogModal}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
          </div>
          <div className="flex-grow p-4 overflow-auto">
            {/* Box catalog content here */}
            <p>Select a box template for Box #{selectedBox}</p>
            {/* You can display box suggestions or a form to search boxes */}
          </div>
        </div>
      </CenterModal>
    </div>
  );
};

export default OrderForm;

// import { useState, useEffect } from "react";
// import FloatingLabelInput from "./FloatingLabelInput";
// import {
//   ChevronUp,
//   ChevronDown,
//   Trash,
//   Bookmark,
//   Package,
//   Save,
// } from "./Icons";

// import boxIcon from "../../assets/Order/box.svg";
// import { POST } from "../../utils/webService";

// import {
//   GET_PRODUCT_SUGGETION,
//   GET_BOX_SUGGETION,
// } from "../../utils/ApiUrls";

// // Define types
// interface BoxInfo {
//   l: string | number;
//   b: string | number;
//   h: string | number;
//   discount: string | number;
//   tax: string | number;
//   hsn: string;
//   sku: string;
// }

// interface Product {
//   id: number;
//   name: string;
//   quantity: string | number;
//   unitPrice: string | number;
//   unitWeight: string | number;
//   totalPrice: string | number;
//   totalWeight: string | number;
//   boxInfo: BoxInfo;
//   isExpanded: boolean;
//   selectedSuggestion: ProductSuggestion | null;
// }

// interface BoxDimensions {
//   l: string | number;
//   b: string | number;
//   h: string | number;
//   weight: string | number;
// }

// interface BoxData {
//   id: number;
//   dimensions: BoxDimensions;
//   products: Product[];
//   selectedBoxSuggestion: BoxSuggestion | null;
// }

// interface ProductSuggestion {
//   productId: string;
//   name: string;
//   companyId: string;
//   privateCompanyId: number;
//   sellerId: number;
//   category: string;
//   length: number;
//   breadth: number;
//   height: number;
//   appliedWeight: number;
//   deadWeight: number;
//   volumetricWeight: number;
//   unitPrice: number;
//   unitTax: number;
//   qty: number;
//   sku: string;
//   hsnCode: string;
//   selected: boolean;
//   weightUnit: string;
//   measureUnit: string;
//   currency: string;
//   divisor: number;
//   variantId: string;
//   images: any[];
// }

// interface BoxSuggestion {
//   boxId: string;
//   name: string;
//   appliedWeight: number;
//   deadWeight: number;
//   volumetricWeight: number;
//   length: number;
//   breadth: number;
//   height: number;
//   weightUnit: string;
//   measureUnit: string;
//   price: number;
//   currency: string;
//   divisor: number;
//   color?: string;
//   isFragile?: boolean;
// }

// const OrderForm: React.FC = () => {
//   const [boxCount, setBoxCount] = useState<number>(1);
//   const [selectedBox, setSelectedBox] = useState<number>(1);
//   const [allBoxesIdentical, setAllBoxesIdentical] = useState<boolean>(false);
//   const [productSuggestions, setProductSuggestions] = useState<ProductSuggestion[]>([]);
//   const [boxSuggestions, setBoxSuggestions] = useState<BoxSuggestion[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);

//   // Store visible product suggestions for each product
//   const [visibleProductSuggestions, setVisibleProductSuggestions] = useState<{[productId: number]: ProductSuggestion[]}>({});

//   // Store visible box suggestions
//   const [visibleBoxSuggestions, setVisibleBoxSuggestions] = useState<BoxSuggestion[]>([]);

//   // Store boxes and their products in a single state
//   const [boxes, setBoxes] = useState<BoxData[]>([
//     {
//       id: 1,
//       dimensions: {
//         l: "",
//         b: "",
//         h: "",
//         weight: "",
//       },
//       products: [
//         {
//           id: 1,
//           name: "",
//           quantity: "",
//           unitPrice: "",
//           unitWeight: "",
//           totalPrice: "",
//           totalWeight: "",
//           isExpanded: true, // Default to expanded
//           boxInfo: {
//             l: "",
//             b: "",
//             h: "",
//             discount: "",
//             tax: "",
//             hsn: "",
//             sku: "",
//           },
//           selectedSuggestion: null,
//         },
//       ],
//       selectedBoxSuggestion: null,
//     },
//   ]);

//   // Get current box data
//   const currentBox = boxes.find((box) => box.id === selectedBox) || boxes[0];

//   // Fetch product suggestions from API
//   const fetchProductSuggestions = async () => {
//     setLoading(true);
//     try {
//       const payload = {
//         skip: 0,
//         limit: 1000,
//         pageNo: 1,
//         sort: { _id: -1 },
//         searchValue: "",
//       };

//       const response = await POST(GET_PRODUCT_SUGGETION, payload);

//       if (response?.data?.success) {
//         setProductSuggestions(response.data.data);

//         // Initialize visible product suggestions for each product
//         const initialVisibleSuggestions: {[productId: number]: ProductSuggestion[]} = {};
//         boxes.forEach(box => {
//           box.products.forEach(product => {
//             // Show top 3 suggestions for each product
//             initialVisibleSuggestions[product.id] = response.data.data.slice(0, 3);
//           });
//         });
//         setVisibleProductSuggestions(initialVisibleSuggestions);
//       } else {
//         setProductSuggestions([]);
//       }
//     } catch (error) {
//       console.error("Error fetching product suggestions:", error);
//       setProductSuggestions([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch box suggestions from API
//   const fetchBoxSuggestions = async () => {
//     setLoading(true);
//     try {
//       const payload = {
//         skip: 0,
//         limit: 1000,
//         pageNo: 1,
//         sort: { _id: -1 },
//         searchValue: "",
//       };

//       const response = await POST(GET_BOX_SUGGETION, payload);

//       if (response?.data?.success) {
//         setBoxSuggestions(response.data.data);

//         // Initialize visible box suggestions (top 3)
//         setVisibleBoxSuggestions(response.data.data.slice(0, 3));
//       } else {
//         setBoxSuggestions([]);
//       }
//     } catch (error) {
//       console.error("Error fetching box suggestions:", error);
//       setBoxSuggestions([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Load suggestions when component mounts
//   useEffect(() => {
//     fetchProductSuggestions();
//     fetchBoxSuggestions();
//   }, []);

//   const decreaseBoxCount = (): void => {
//     if (boxCount > 1) {
//       const newCount = boxCount - 1;
//       setBoxCount(newCount);

//       // Remove the last box
//       setBoxes((prev) => prev.filter((box) => box.id <= newCount));

//       // If selected box is removed, select the last remaining box
//       if (selectedBox > newCount) {
//         setSelectedBox(newCount);
//       }
//     }
//   };

//   const increaseBoxCount = (): void => {
//     const newCount = boxCount + 1;
//     setBoxCount(newCount);

//     // Add a new box with a default product
//     setBoxes((prev:any) => [
//       ...prev,
//       {
//         id: newCount,
//         dimensions: {
//           l: "",
//           b: "",
//           h: "",
//           weight: "",
//         },
//         products: [
//           {
//             id: 1,
//             name: "",
//             quantity: "",
//             unitPrice: "",
//             unitWeight: "",
//             totalPrice: "",
//             totalWeight: "",
//             isExpanded: true,
//             boxInfo: {
//               l: "",
//               b: "",
//               h: "",
//               discount: "",
//               tax: "",
//               hsn: "",
//               sku: "",
//             },
//             selectedSuggestions: [],
//           },
//         ],
//         selectedBoxSuggestion: null,
//       },
//     ]);
//   };

//   const handleBoxSelect = (boxNumber: number): void => {
//     setSelectedBox(boxNumber);
//   };

//   const toggleAdditionalInfo = (productId: number): void => {
//     setBoxes((prevBoxes) =>
//       prevBoxes.map((box) => {
//         if (box.id === selectedBox) {
//           return {
//             ...box,
//             products: box.products.map((product) => {
//               if (product.id === productId) {
//                 return {
//                   ...product,
//                   isExpanded: !product.isExpanded,
//                 };
//               }
//               return product;
//             }),
//           };
//         }
//         return box;
//       })
//     );
//   };

//   const toggleProductExpansion = (productId: number): void => {
//     setBoxes((prevBoxes) =>
//       prevBoxes.map((box) => {
//         if (box.id === selectedBox) {
//           return {
//             ...box,
//             products: box.products.map((product) => {
//               if (product.id === productId) {
//                 return {
//                   ...product,
//                   isExpanded: !product.isExpanded,
//                 };
//               }
//               return product;
//             }),
//           };
//         }
//         return box;
//       })
//     );
//   };

//   const addNewProduct = (): void => {
//     setBoxes((prevBoxes) =>
//       prevBoxes.map((box) => {
//         if (box.id === selectedBox) {
//           const newProductId = box.products.length > 0
//             ? Math.max(...box.products.map((p) => p.id)) + 1
//             : 1;

//           // Initialize visible product suggestions for the new product
//           setVisibleProductSuggestions(prev => ({
//             ...prev,
//             [newProductId]: productSuggestions.slice(0, 3)
//           }));

//           return {
//             ...box,
//             products: [
//               ...box.products,
//               {
//                 id: newProductId,
//                 name: "",
//                 quantity: "",
//                 unitPrice: "",
//                 unitWeight: "",
//                 totalPrice: "",
//                 totalWeight: "",
//                 isExpanded: true,
//                 boxInfo: {
//                   l: "",
//                   b: "",
//                   h: "",
//                   discount: "",
//                   tax: "",
//                   hsn: "",
//                   sku: "",
//                 },
//                 selectedSuggestion: null,
//               },
//             ],
//           };
//         }
//         return box;
//       })
//     );
//   };

//   const removeProduct = (productId: number): void => {
//     setBoxes((prevBoxes) =>
//       prevBoxes.map((box) => {
//         if (box.id === selectedBox) {
//           if (box.products.length > 1) {
//             return {
//               ...box,
//               products: box.products.filter(
//                 (product) => product.id !== productId
//               ),
//             };
//           }
//         }
//         return box;
//       })
//     );
//   };

//   const updateBoxDimensions = (
//     field: keyof BoxDimensions,
//     value: string
//   ): void => {
//     setBoxes((prevBoxes) =>
//       prevBoxes.map((box) => {
//         if (box.id === selectedBox) {
//           return {
//             ...box,
//             dimensions: {
//               ...box.dimensions,
//               [field]: value,
//             },
//           };
//         }
//         if (allBoxesIdentical) {
//           return {
//             ...box,
//             dimensions: {
//               ...box.dimensions,
//               [field]: value,
//             },
//           };
//         }
//         return box;
//       })
//     );
//   };

//   // Select a product suggestion for a product
//   const selectProductSuggestion = (productId: number, suggestion: ProductSuggestion): void => {
//     setBoxes((prevBoxes) =>
//       prevBoxes.map((box) => {
//         if (box.id === selectedBox) {
//           return {
//             ...box,
//             products: box.products.map((product) => {
//               if (product.id === productId) {
//                 return {
//                   ...product,
//                   selectedSuggestion: suggestion,
//                   name: suggestion.name,
//                   quantity: suggestion.qty,
//                   unitPrice: suggestion.unitPrice,
//                   unitWeight: suggestion.deadWeight,
//                   // Calculate total price and weight
//                   totalPrice: suggestion.qty * suggestion.unitPrice,
//                   totalWeight: suggestion.qty * suggestion.deadWeight,
//                   boxInfo: {
//                     ...product.boxInfo,
//                     l: suggestion.length,
//                     b: suggestion.breadth,
//                     h: suggestion.height,
//                     tax: suggestion.unitTax,
//                     hsn: suggestion.hsnCode || "",
//                     sku: suggestion.sku || "",
//                   }
//                 };
//               }
//               return product;
//             }),
//           };
//         }
//         return box;
//       })
//     );
//   };

//   // Remove product suggestion and show the next available
//   const removeProductSuggestion = (productId: number): void => {
//     // First, remove the selection from the product
//     setBoxes((prevBoxes) =>
//       prevBoxes.map((box) => {
//         if (box.id === selectedBox) {
//           return {
//             ...box,
//             products: box.products.map((product) => {
//               if (product.id === productId) {
//                 return {
//                   ...product,
//                   selectedSuggestion: null,
//                 };
//               }
//               return product;
//             }),
//           };
//         }
//         return box;
//       })
//     );

//     // Update visible suggestions for this product by rotating them
//     setVisibleProductSuggestions(prev => {
//       const currentVisible = prev[productId] || [];

//       // If we have more suggestions available, show the next batch
//       if (currentVisible.length > 0 && productSuggestions.length > currentVisible.length) {
//         // Find the index of the last currently visible suggestion
//         const lastVisibleIndex = productSuggestions.findIndex(
//           suggestion => suggestion.productId === currentVisible[currentVisible.length - 1].productId
//         );

//         // Get next 3 suggestions (or fewer if fewer are available)
//         const nextIndex = (lastVisibleIndex + 1) % productSuggestions.length;
//         const nextSuggestions = [];

//         for (let i = 0; i < 3; i++) {
//           const index = (nextIndex + i) % productSuggestions.length;
//           nextSuggestions.push(productSuggestions[index]);
//           // If we've gone through the whole list, stop
//           if (index === lastVisibleIndex) break;
//         }

//         return {
//           ...prev,
//           [productId]: nextSuggestions
//         };
//       }

//       return prev;
//     });
//   };

//   // Select a box suggestion
//   const selectBoxSuggestion = (suggestion: BoxSuggestion): void => {
//     setBoxes((prevBoxes) =>
//       prevBoxes.map((box) => {
//         if (box.id === selectedBox) {
//           return {
//             ...box,
//             selectedBoxSuggestion: suggestion,
//             dimensions: {
//               l: suggestion.length || "",
//               b: suggestion.breadth || "",
//               h: suggestion.height || "",
//               weight: suggestion.deadWeight || "",
//             },
//           };
//         }
//         return box;
//       })
//     );
//   };

//   // Remove box suggestion and show the next available
//   const removeBoxSuggestion = (): void => {
//     // First, remove the selection from the box
//     setBoxes((prevBoxes) =>
//       prevBoxes.map((box) => {
//         if (box.id === selectedBox) {
//           return {
//             ...box,
//             selectedBoxSuggestion: null,
//           };
//         }
//         return box;
//       })
//     );

//     // Update visible box suggestions by rotating them
//     setVisibleBoxSuggestions(prev => {
//       // If we have more suggestions available, show the next batch
//       if (prev.length > 0 && boxSuggestions.length > prev.length) {
//         // Find the index of the last currently visible suggestion
//         const lastVisibleIndex = boxSuggestions.findIndex(
//           suggestion => suggestion.boxId === prev[prev.length - 1].boxId
//         );

//         // Get next 3 suggestions (or fewer if fewer are available)
//         const nextIndex = (lastVisibleIndex + 1) % boxSuggestions.length;
//         const nextSuggestions = [];

//         for (let i = 0; i < 3; i++) {
//           const index = (nextIndex + i) % boxSuggestions.length;
//           nextSuggestions.push(boxSuggestions[index]);
//           // If we've gone through the whole list, stop
//           if (index === lastVisibleIndex) break;
//         }

//         return nextSuggestions;
//       }

//       return prev;
//     });
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-4 bg-gray-50">
//       {/* Box Count Control */}
//       <div className="flex items-center mb-6">
//         <div className="text-gray-800 font-medium mr-4">
//           How many boxes are there in this order?
//         </div>
//         <button
//           onClick={decreaseBoxCount}
//           className="px-3 py-1 border border-gray-300 rounded-l"
//         >
//           −
//         </button>
//         <div className="px-4 py-1 border-t border-b border-gray-300 bg-white">
//           {boxCount}
//         </div>
//         <button
//           onClick={increaseBoxCount}
//           className="px-3 py-1 border border-gray-300 rounded-r"
//         >
//           +
//         </button>
//         <div className="ml-auto flex items-center">
//           <input
//             type="checkbox"
//             id="identical-boxes"
//             checked={allBoxesIdentical}
//             onChange={(e) => setAllBoxesIdentical(e.target.checked)}
//             className="mr-2"
//           />
//           <span>All Boxes Identical</span>
//         </div>
//       </div>

//       {/* Box Selection - Added horizontal scrolling */}
//       <div className="overflow-x-auto mb-8">
//         <div className="flex space-x-2 min-w-max">
//           {Array.from({ length: boxCount }, (_, i) => i + 1).map((boxNum) => (
//             <button
//               key={boxNum}
//               onClick={() => handleBoxSelect(boxNum)}
//               className={`px-4 py-2 border ${
//                 selectedBox === boxNum
//                   ? "bg-gray-200 border-gray-400"
//                   : "bg-white border-gray-300"
//               } rounded`}
//             >
//               {boxNum === selectedBox ? `Box ${boxNum}` : `Box ${boxNum}`}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Two-column layout for products and box info */}
//       <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
//         {/* Left column - Products List */}
//         <div className="w-full lg:w-2/3 space-y-4">
//           {currentBox.products.length === 0 ? (
//             <div className="bg-blue-50 rounded-md p-8 flex flex-col items-center justify-center">
//               <p className="text-gray-500 mb-4">
//                 No products added to Box {selectedBox} yet
//               </p>
//               <button
//                 onClick={addNewProduct}
//                 className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//               >
//                 <span className="mr-2">+</span>
//                 <span>Add Product</span>
//               </button>
//             </div>
//           ) : (
//             currentBox.products.map((product) => (
//               <div key={product.id} className="bg-blue-50 rounded-md p-4">
//                 {/* Product Header */}
//                 <div
//                   className="flex justify-between items-center mb-4 cursor-pointer"
//                   onClick={() => toggleProductExpansion(product.id)}
//                 >
//                   <div className="font-medium text-gray-800">
//                     Product {product.id}
//                   </div>
//                   {product.isExpanded ? (
//                     <ChevronUp className="w-5 h-5 text-gray-500" />
//                   ) : (
//                     <ChevronDown className="w-5 h-5 text-gray-500" />
//                   )}
//                 </div>

//                 {product.isExpanded && (
//                   <>
//                     {/* Product Actions */}
//                     <div className="flex justify-end mb-4 space-x-2">
//                       <button
//                         className="p-2 text-gray-500"
//                         onClick={() => removeProduct(product.id)}
//                         title="Delete product"
//                       >
//                         <Trash className="w-5 h-5" />
//                       </button>
//                       <button className="p-2 text-gray-500">
//                         <Bookmark className="w-5 h-5" />
//                       </button>
//                       <button className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-md">
//                         <Package className="w-4 h-4" />
//                         <span>Product Catalog</span>
//                       </button>
//                     </div>

//                     {/* Product Suggestions Display */}
//                     <div className="flex flex-wrap gap-2 mb-4">
//                       {/* Display selected product suggestion */}
//                       {product.selectedSuggestion && (
//                         <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-1">
//                           <span className="mr-2">{product.selectedSuggestion.name}</span>
//                           <button
//                             onClick={() => removeProductSuggestion(product.id)}
//                             className="text-gray-500 hover:text-gray-700"
//                           >
//                             ×
//                           </button>
//                         </div>
//                       )}

//                       {/* Display available product suggestions if no selection */}
//                       {!product.selectedSuggestion && visibleProductSuggestions[product.id]?.map((suggestion, index) => (
//                         <div
//                           key={suggestion.productId}
//                           className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-1 cursor-pointer hover:bg-gray-50"
//                           onClick={() => selectProductSuggestion(product.id, suggestion)}
//                         >
//                           <span>{suggestion.name}</span>
//                         </div>
//                       ))}
//                     </div>

//                     {/* Product Details Form - Reorganized layout */}
//                     <div className="mb-4">
//                       {/* First row: Name, Qty, Unit Price, Unit Wt */}
//                       <div className="flex flex-wrap gap-2 mb-2">
//                         <div className="flex-grow min-w-[200px]">
//                           <FloatingLabelInput
//                             placeholder="Product Name"
//                             value={product.name.toString()}
//                           />
//                         </div>
//                         <div className="w-20">
//                           <FloatingLabelInput
//                             placeholder="Qty"
//                             value={product.quantity.toString()}
//                             type="number"
//                           />
//                         </div>
//                         <div className="w-28">
//                           <FloatingLabelInput
//                             placeholder="Unit Price"
//                             value={product.unitPrice.toString()}
//                             type="number"
//                           />
//                         </div>
//                         <div className="w-28">
//                           <FloatingLabelInput
//                             placeholder="Unit Wt (kg)"
//                             value={product.unitWeight.toString()}
//                             type="number"
//                           />
//                         </div>
//                       </div>

//                       {/* Second row: Total Price and Total Wt aligned right */}
//                       <div className="flex justify-end gap-2">
//                         <div className="w-32">
//                           <FloatingLabelInput
//                             placeholder="Total Price"
//                             value={product.totalPrice.toString()}
//                             type="number"
//                             counter="₹"
//                           />
//                         </div>
//                         <div className="w-32">
//                           <FloatingLabelInput
//                             placeholder="Total Wt (kg)"
//                             value={product.totalWeight.toString()}
//                             type="number"
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     {/* Additional Information - Toggle implementation */}
//                     <div className="border-t border-gray-200 pt-4 mt-4">
//                       <div
//                         className="flex justify-between items-center mb-4 cursor-pointer"
//                         onClick={() => toggleAdditionalInfo(product.id)}
//                       >
//                         <div className="font-medium text-gray-700">
//                           {product.isExpanded ? "Hide" : "Show"} Additional Information
//                         </div>
//                         {product.isExpanded ? (
//                           <ChevronUp className="w-5 h-5 text-gray-500" />
//                         ) : (
//                           <ChevronDown className="w-5 h-5 text-gray-500" />
//                         )}
//                       </div>

//                       {product.isExpanded && (
//                         <div className="flex gap-2">
//                           <div className="flex items-center gap-2">
//                             <div className="!w-14">
//                               <FloatingLabelInput
//                                 placeholder="L"
//                                 value={product.boxInfo.l.toString()}
//                                 type="number"
//                               />
//                             </div>
//                             <div className="!w-14">
//                               <FloatingLabelInput
//                                 placeholder="B"
//                                 value={product.boxInfo.b.toString()}
//                                 type="number"
//                               />
//                             </div>
//                             <div className="!w-14">
//                               <FloatingLabelInput
//                                 placeholder="H"
//                                 value={product.boxInfo.h.toString()}
//                                 type="number"
//                               />
//                             </div>
//                           </div>
//                           <div>
//                             <FloatingLabelInput
//                               placeholder="Discount %"
//                               value={product.boxInfo.discount.toString()}
//                               type="number"
//                             />
//                           </div>
//                           <div>
//                             <FloatingLabelInput
//                               placeholder="Tax"
//                               value={product.boxInfo.tax.toString()}
//                               type="number"
//                             />
//                           </div>
//                           <div>
//                             <FloatingLabelInput
//                               placeholder="HSN"
//                               value={product.boxInfo.hsn}
//                             />
//                           </div>
//                           <div>
//                             <FloatingLabelInput
//                               placeholder="SKU"
//                               value={product.boxInfo.sku}
//                             />
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </>
//                 )}
//               </div>
//             ))
//           )}

//           {currentBox.products.length > 0 && (
//             <div className="flex justify-center">
//               <button
//                 onClick={addNewProduct}
//                 className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//               >
//                 <span className="mr-2">+</span>
//                 <span>Product</span>
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Right column - Box Info */}
//         <div className="w-full lg:w-1/3">
//           <div className="bg-white border border-gray-200 rounded-md p-4 lg:sticky lg:top-4">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
//               <div className="font-medium text-gray-800 text-lg mb-2 sm:mb-0">
//                 Box {selectedBox} Info
//               </div>
//               <div className="flex space-x-2 w-full sm:w-auto justify-end">
//                 <button className="p-2 text-gray-500">
//                   <Bookmark className="w-5 h-5" />
//                 </button>
//                 <button
//                   className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-md"
//                 >
//                   <Package className="w-4 h-4" />
//                   <span>Box Catalog</span>
//                 </button>
//               </div>
//             </div>

//             {/* Display selected box suggestion if any */}
//             {currentBox.selectedBoxSuggestion && (
//               <div className="mb-4 flex items-center bg-white border border-gray-300 rounded-md px-3 py-1 w-fit">
//                 <span className="mr-2">{currentBox.selectedBoxSuggestion.name}</span>
//                 <button
//                   onClick={removeBoxSuggestion}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   ×
//                 </button>
//               </div>
//             )}

//             {/* Display available box suggestions if no selection */}
//             {!currentBox.selectedBoxSuggestion && (
//               <div className="mb-4 flex flex-wrap gap-2">
//                 {visibleBoxSuggestions.map((suggestion) => (
//                   <div
//                     key={suggestion.boxId}
//                     className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-1 cursor-pointer hover:bg-gray-50"
//                     onClick={() => selectBoxSuggestion(suggestion)}
//                   >
//                     <span>{suggestion.name}</span>
//                   </div>
//                 ))}
//               </div>
//             )}

//             <div className="flex justify-center mb-6">
//               <div className="relative w-48 h-48 md:w-56 md:h-56">
//                 <img
//                   src={boxIcon}
//                   alt="Box illustration"
//                   className="w-full h-full"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-6">
//               <div>
//                 <FloatingLabelInput
//                   placeholder="L"
//                   value={currentBox.dimensions.l.toString()}
//                   type="number"
//                   onChangeCallback={(value) => updateBoxDimensions("l", value)}
//                 />
//               </div>
//               <div>
//                 <FloatingLabelInput
//                   placeholder="B"
//                   value={currentBox.dimensions.b.toString()}
//                   type="number"
//                   onChangeCallback={(value) => updateBoxDimensions("b", value)}
//                 />
//               </div>
//               <div>
//                 <FloatingLabelInput
//                   placeholder="H"
//                   value={currentBox.dimensions.h.toString()}
//                   type="number"
//                   onChangeCallback={(value) => updateBoxDimensions("h", value)}
//                 />
//               </div>
//               <div>
//                 <FloatingLabelInput
//                   placeholder="Weight (kg)"
//                   value={currentBox.dimensions.weight.toString()}
//                   type="number"
//                   onChangeCallback={(value) =>
//                     updateBoxDimensions("weight", value)
//                   }
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderForm;
