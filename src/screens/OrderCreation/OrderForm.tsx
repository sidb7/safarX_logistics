

import { useState, useEffect, useRef } from "react";
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
import searchIcon from "../../assets/Search.svg";

import { POST } from "../../utils/webService";

import {
  GET_PRODUCT_SUGGETION,
  GET_BOX_SUGGETION,
  GET_PRODUCTS,
  GET_SELLER_BOX,
  CREATE_BULK_PRODUCT,
  CREATE_SELLER_BOX,
} from "../../utils/ApiUrls";
import HorizontalScroller from "./HorizontalScroller";
import CenterModal from "../../components/CustomModal/customCenterModal";
import OneButton from "../../components/Button/OneButton";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";






const STORAGE_KEYS = {
  BOX_DATA: 'order-form-box-data',
  BOX_COUNT: 'order-form-box-count',
  SELECTED_BOX: 'order-form-selected-box',
  ALL_BOXES_IDENTICAL: 'order-form-all-boxes-identical',
  PRODUCT_SUGGESTIONS: 'order-form-product-suggestions',
  BOX_SUGGESTIONS: 'order-form-box-suggestions',
  SAVED_PRODUCTS: 'order-form-saved-products',
  SAVED_BOX: 'order-form-saved-box',
};

// 2. Add initial state loading function
const loadInitialState = () => {
  const savedBoxData = localStorage.getItem(STORAGE_KEYS.BOX_DATA);
  const savedBoxCount = localStorage.getItem(STORAGE_KEYS.BOX_COUNT);
  const savedSelectedBox = localStorage.getItem(STORAGE_KEYS.SELECTED_BOX);
  const savedAllBoxesIdentical = localStorage.getItem(STORAGE_KEYS.ALL_BOXES_IDENTICAL);
  const savedProductSuggestions = localStorage.getItem(STORAGE_KEYS.PRODUCT_SUGGESTIONS);
  const savedBoxSuggestions = localStorage.getItem(STORAGE_KEYS.BOX_SUGGESTIONS);
  const savedProducts = localStorage.getItem(STORAGE_KEYS.SAVED_PRODUCTS);
  const savedBox = localStorage.getItem(STORAGE_KEYS.SAVED_BOX);

  return {
    boxData: savedBoxData ? JSON.parse(savedBoxData) : null,
    boxCount: savedBoxCount ? parseInt(savedBoxCount) : 1,
    selectedBox: savedSelectedBox ? parseInt(savedSelectedBox) : 1,
    allBoxesIdentical: savedAllBoxesIdentical ? JSON.parse(savedAllBoxesIdentical) : false,
    productSuggestions: savedProductSuggestions ? JSON.parse(savedProductSuggestions) : null,
    boxSuggestions: savedBoxSuggestions ? JSON.parse(savedBoxSuggestions) : null,
    savedProductsState: savedProducts ? JSON.parse(savedProducts) : null,
    savedBoxState: savedBox ? JSON.parse(savedBox) : false,
  };
};

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
  isManuallyEdited: boolean; // New flag to track if product was manually edited
}

interface BoxDimensions {
  l: string | number;
  b: string | number;
  h: string | number;
  weight: string | number;
  name: string;
  isManuallyEdited: boolean; // New flag to track if box was manually edited
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

// Add props interface to receive and send data to parent OrderCreation component
interface OrderFormProps {
  onBoxDataUpdate?: (boxes: BoxData[], metadata: { allBoxesIdentical: boolean, boxCount: number }) => void;
  validationErrors?: {
    [boxId: number]: {
      [fieldId: string]: boolean;
    };
  };
  clearFieldError?: (boxId: number, fieldId: string) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({
  onBoxDataUpdate,
  validationErrors = {},
  clearFieldError = () => {},
}) => {
  const initialState = loadInitialState();

  // const [boxCount, setBoxCount] = useState<number>(1);
  const [boxCount, setBoxCount] = useState<number>(initialState.boxCount);

  // const [selectedBox, setSelectedBox] = useState<number>(1);
  const [selectedBox, setSelectedBox] = useState<number>(initialState.selectedBox);

  // const [allBoxesIdentical, setAllBoxesIdentical] = useState<boolean>(false);
  const [allBoxesIdentical, setAllBoxesIdentical] = useState<boolean>(initialState.allBoxesIdentical);

  // const [productSuggestions, setProductSuggestions] = useState<
  //   ProductSuggestion[]
  // >([]);
  const [productSuggestions, setProductSuggestions] = useState<ProductSuggestion[]>(
    initialState.productSuggestions || []
  );
  // const [boxSuggestions, setBoxSuggestions] = useState<BoxSuggestion[]>([]);
  const [boxSuggestions, setBoxSuggestions] = useState<BoxSuggestion[]>(
    initialState.boxSuggestions || []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [isProductCatalogModalOpen, setIsProductCatalogModalOpen] =
    useState<boolean>(false);
  const [isBoxCatalogModalOpen, setIsBoxCatalogModalOpen] =
    useState<boolean>(false);
  const [currentProductId, setCurrentProductId] = useState<number | null>(null);

  // New state for confirmation modal
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [pendingIdenticalCheckbox, setPendingIdenticalCheckbox] =
    useState<boolean>(false);

  const [catalogProducts, setCatalogProducts] = useState<ProductSuggestion[]>(
    []
  );
  const [filteredCatalogProducts, setFilteredCatalogProducts] = useState<
    ProductSuggestion[]
  >([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCatalogProducts, setSelectedCatalogProducts] = useState<{
    [key: string]: boolean;
  }>({});

  // New state for box catalog
  const [boxSearchQuery, setBoxSearchQuery] = useState<string>("");
  const [catalogBoxes, setCatalogBoxes] = useState<BoxSuggestion[]>([]);
  const [filteredCatalogBoxes, setFilteredCatalogBoxes] = useState<
    BoxSuggestion[]
  >([]);
  const [boxCatalogLoading, setBoxCatalogLoading] = useState<boolean>(false);

  // const [savedProducts, setSavedProducts] = useState<{
  //   [productId: number]: boolean;
  // }>({});
  const [savedProducts, setSavedProducts] = useState<{
    [productId: number]: boolean;
  }>(initialState.savedProductsState || {});
  // const [savedBox, setSavedBox] = useState<boolean>(false);
  const [savedBox, setSavedBox] = useState<boolean>(initialState.savedBoxState);


  // Store visible product suggestions for each product
  const [visibleProductSuggestions, setVisibleProductSuggestions] = useState<{
    [productId: number]: ProductSuggestion[];
  }>({});

  // Store visible box suggestions
  const [visibleBoxSuggestions, setVisibleBoxSuggestions] = useState<
    BoxSuggestion[]
  >([]);

  // Store boxes and their products in a single state
  // const [boxes, setBoxes] = useState<BoxData[]>([
  //   {
  //     id: 1,
  //     dimensions: {
  //       l: "",
  //       b: "",
  //       h: "",
  //       weight: "",
  //       name: "",
  //       isManuallyEdited: false, // Initialize flag
  //     },
  //     products: [
  //       {
  //         id: 1,
  //         name: "",
  //         quantity: "",
  //         unitPrice: "",
  //         unitWeight: "",
  //         totalPrice: "",
  //         totalWeight: "",
  //         isExpanded: true, // Default to expanded
  //         boxInfo: {
  //           l: "",
  //           b: "",
  //           h: "",
  //           discount: "",
  //           tax: "",
  //           hsn: "",
  //           sku: "",
  //         },
  //         selectedSuggestion: null,
  //         isManuallyEdited: false, // Initialize flag
  //       },
  //     ],
  //     selectedBoxSuggestion: null,
  //   },
  // ]);
  const [boxes, setBoxes] = useState<BoxData[]>(
    initialState.boxData || [
      {
        id: 1,
        dimensions: {
          l: "",
          b: "",
          h: "",
          weight: "",
          name: "",
          isManuallyEdited: false,
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
            selectedSuggestion: null,
            isManuallyEdited: false,
          },
        ],
        selectedBoxSuggestion: null,
      },
    ]
  );

  // New state for inline search functionality
  const [productNameSearch, setProductNameSearch] = useState<{
    [productId: number]: string;
  }>({});
  const [boxNameSearch, setBoxNameSearch] = useState<string>("");
  const [showProductSearchResults, setShowProductSearchResults] = useState<{
    [productId: number]: boolean;
  }>({});
  const [showBoxSearchResults, setShowBoxSearchResults] =
    useState<boolean>(false);
  const [filteredProductResults, setFilteredProductResults] = useState<{
    [productId: number]: ProductSuggestion[];
  }>({});
  const [filteredBoxResults, setFilteredBoxResults] = useState<BoxSuggestion[]>(
    []
  );

  // Refs for handling click outside search results
  const productSearchRefs = useRef<{
    [productId: number]: HTMLDivElement | null;
  }>({});
  const boxSearchRef = useRef<HTMLDivElement | null>(null);

  // Handle click outside search results
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Close product search results
      Object.keys(showProductSearchResults).forEach((productId) => {
        if (
          productSearchRefs.current[Number(productId)] &&
          !productSearchRefs.current[Number(productId)]?.contains(
            event.target as Node
          )
        ) {
          setShowProductSearchResults((prev) => ({
            ...prev,
            [Number(productId)]: false,
          }));
        }
      });

      // Close box search results
      if (
        boxSearchRef.current &&
        !boxSearchRef.current.contains(event.target as Node)
      ) {
        setShowBoxSearchResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProductSearchResults]);

  // Notify parent component when box data changes
  useEffect(() => {
    if (onBoxDataUpdate) {
      onBoxDataUpdate(boxes,{ allBoxesIdentical, boxCount });
    }
  }, [boxes, onBoxDataUpdate, allBoxesIdentical, boxCount]);

  // Get current box data - always use the first box when identical
  const currentBox = allBoxesIdentical
    ? boxes[0]
    : boxes.find((box) => box.id === selectedBox) || boxes[0];

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

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOX_DATA, JSON.stringify(boxes));
  }, [boxes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOX_COUNT, boxCount.toString());
  }, [boxCount]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SELECTED_BOX, selectedBox.toString());
  }, [selectedBox]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ALL_BOXES_IDENTICAL, JSON.stringify(allBoxesIdentical));
  }, [allBoxesIdentical]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCT_SUGGESTIONS, JSON.stringify(productSuggestions));
  }, [productSuggestions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOX_SUGGESTIONS, JSON.stringify(boxSuggestions));
  }, [boxSuggestions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SAVED_PRODUCTS, JSON.stringify(savedProducts));
  }, [savedProducts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SAVED_BOX, JSON.stringify(savedBox));
  }, [savedBox]);


  // Helper function to calculate total price of products in a box
const calculateBoxTotalPrice = (box: BoxData): number => {
  return box.products.reduce((total, product) => {
    const productTotal = Number(product.totalPrice) || 0;
    return total + productTotal;
  }, 0);
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

  // Handle product name search input
  const handleProductNameSearch = (productId: number, value: string) => {
    setProductNameSearch((prev) => ({
      ...prev,
      [productId]: value,
    }));

    // Show search results dropdown
    setShowProductSearchResults((prev) => ({
      ...prev,
      [productId]: true,
    }));

    // Filter product suggestions based on search input
    if (value.trim() === "") {
      setFilteredProductResults((prev) => ({
        ...prev,
        [productId]: [],
      }));
    } else {
      const filtered = productSuggestions.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProductResults((prev) => ({
        ...prev,
        [productId]: filtered.slice(0, 5), // Limit to top 5 matches
      }));
    }

    // Update the product name
    handleProductNameChange(productId, value);
  };

  // Handle box name search input
  const handleBoxNameSearch = (value: string) => {
    setBoxNameSearch(value);

    // Show search results dropdown
    setShowBoxSearchResults(true);

    // Filter box suggestions based on search input
    if (value.trim() === "") {
      setFilteredBoxResults([]);
    } else {
      const filtered = boxSuggestions.filter((box) =>
        box.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredBoxResults(filtered.slice(0, 5)); // Limit to top 5 matches
    }

    // Update the box name
    updateBoxDimensions("name", value);
  };

  // Select a product from search results
  const selectProductFromSearch = (
    productId: number,
    suggestion: ProductSuggestion
  ) => {
    // Update the product with the selected suggestion
    selectProductSuggestion(productId, suggestion);

    // Close the search results dropdown
    setShowProductSearchResults((prev) => ({
      ...prev,
      [productId]: false,
    }));
  };

  // Select a box from search results
  const selectBoxFromSearch = (suggestion: BoxSuggestion) => {
    // Update the box with the selected suggestion
    selectBoxSuggestion(suggestion);

    // Close the search results dropdown
    setShowBoxSearchResults(false);
  };

  // Modified - Toggle all boxes identical function with confirmation
  const toggleAllBoxesIdentical = (checked: boolean) => {
    // If checking the box and more than one box exists, show confirmation modal
    if (checked && boxCount > 1) {
      setPendingIdenticalCheckbox(checked);
      setIsConfirmModalOpen(true);
    } else {
      // For unchecking or single box, apply immediately
      applyIdenticalBoxes(checked);
    }
  };

  // New function to apply identical boxes after confirmation
  const applyIdenticalBoxes = (checked: boolean) => {
    setAllBoxesIdentical(checked);

    if (checked) {
      // When checking the box, make all boxes identical to the currently selected box
      const currentBoxData = boxes.find((box) => box.id === selectedBox);
      if (currentBoxData) {
        setBoxes((prevBoxes) =>
          prevBoxes.map((box) => ({
            ...box,
            dimensions: { ...currentBoxData.dimensions },
            products: [...currentBoxData.products.map((p) => ({ ...p }))],
            selectedBoxSuggestion: currentBoxData.selectedBoxSuggestion
              ? { ...currentBoxData.selectedBoxSuggestion }
              : null,
          }))
        );
      }

      // Force select box 1 when identical mode is activated
      setSelectedBox(1);
    }
  };

  // New function to handle confirm action
  const handleConfirmIdentical = () => {
    // Apply the changes
    applyIdenticalBoxes(pendingIdenticalCheckbox);
    // Close the modal
    setIsConfirmModalOpen(false);
  };

  // New function to handle cancel action
  const handleCancelIdentical = () => {
    // Reset the pending state
    setPendingIdenticalCheckbox(false);
    // Close the modal
    setIsConfirmModalOpen(false);
  };

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

    setBoxes((prev: BoxData[]) => {
      if (allBoxesIdentical && prev.length > 0) {
        // In identical mode, copy the first box's data
        const templateBox = prev[0];
        return [
          ...prev,
          {
            id: newCount,
            dimensions: { ...templateBox.dimensions },
            products: templateBox.products.map((product) => ({ ...product })),
            selectedBoxSuggestion: templateBox.selectedBoxSuggestion
              ? { ...templateBox.selectedBoxSuggestion }
              : null,
          },
        ];
      } else {
        // Original behavior for non-identical boxes
        return [
          ...prev,
          {
            id: newCount,
            dimensions: {
              l: "",
              b: "",
              h: "",
              weight: "",
              name: "",
              isManuallyEdited: false, // Initialize flag
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
                selectedSuggestion: null,
                isManuallyEdited: false, // Initialize flag
              },
            ],
            selectedBoxSuggestion: null,
          },
        ];
      }
    });
  };

  const handleBoxSelect = (boxNumber: number): void => {
    setSelectedBox(boxNumber);
  };

  const toggleAdditionalInfo = (productId: number): void => {
    setBoxes((prevBoxes) => {
      if (allBoxesIdentical) {
        // Apply to all boxes in identical mode
        return prevBoxes.map((box) => {
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
        });
      } else {
        // Original behavior for non-identical boxes
        return prevBoxes.map((box) => {
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
        });
      }
    });
  };

  const toggleProductExpansion = (productId: number): void => {
    setBoxes((prevBoxes) => {
      if (allBoxesIdentical) {
        // Apply to all boxes in identical mode
        return prevBoxes.map((box) => {
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
        });
      } else {
        // Original behavior for non-identical boxes
        return prevBoxes.map((box) => {
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
        });
      }
    });
  };

  const addNewProduct = (): void => {
    setBoxes((prevBoxes) => {
      // When identical mode is on, create the same product in all boxes
      if (allBoxesIdentical) {
        return prevBoxes.map((box) => {
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
                isManuallyEdited: false, // Initialize flag
              },
            ],
          };
        });
      } else {
        // Original behavior for non-identical boxes
        return prevBoxes.map((box) => {
          if (box.id === selectedBox) {
            const newProductId =
              box.products.length > 0
                ? Math.max(...box.products.map((p) => p.id)) + 1
                : 1;

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
                  isManuallyEdited: false, // Initialize flag
                },
              ],
            };
          }
          return box;
        });
      }
    });
  };

  // const removeProduct = (productId: number): void => {
  //   setBoxes((prevBoxes) => {
  //     if (allBoxesIdentical) {
  //       // Apply to all boxes in identical mode
  //       return prevBoxes.map((box) => {
  //         if (box.products.length > 1) {
  //           return {
  //             ...box,
  //             products: box.products.filter(
  //               (product) => product.id !== productId
  //             ),
  //           };
  //         }
  //         return box;
  //       });
  //     } else {
  //       // Original behavior for non-identical boxes
  //       return prevBoxes.map((box) => {
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
  //       });
  //     }
  //   });

  //   // Remove from saved products when product is removed
  //   setSavedProducts((prev) => {
  //     const updated = { ...prev };
  //     delete updated[productId];
  //     return updated;
  //   });

  //   // Clear search state for this product
  //   setProductNameSearch((prev) => {
  //     const updated = { ...prev };
  //     delete updated[productId];
  //     return updated;
  //   });

  //   setShowProductSearchResults((prev) => {
  //     const updated = { ...prev };
  //     delete updated[productId];
  //     return updated;
  //   });

  //   setFilteredProductResults((prev) => {
  //     const updated = { ...prev };
  //     delete updated[productId];
  //     return updated;
  //   });
  // };

  const removeProduct = (productId: number): void => {
    // Create a mapping of old product IDs to new sequential IDs
    const idMapping: { [oldId: number]: number } = {};
    
    setBoxes((prevBoxes) => {
      if (allBoxesIdentical) {
        // Apply to all boxes in identical mode
        return prevBoxes.map((box) => {
          if (box.products.length > 1) {
            // If multiple products, remove the selected one and renumber remaining products
            const filteredProducts = box.products.filter(product => product.id !== productId);
            
            // Create renumbered products with sequential IDs
            const renumberedProducts = filteredProducts.map((product, index) => {
              const newId = index + 1;
              
              // Store mapping from old ID to new ID (for the first box only)
              if (box.id === 1) {
                idMapping[product.id] = newId;
              }
              
              return {
                ...product,
                id: newId
              };
            });
            
            return {
              ...box,
              products: renumberedProducts
            };
          } else {
            // If only one product, reset its data instead of removing it
            return {
              ...box,
              products: box.products.map((product) => {
                if (product.id === productId) {
                  // Reset product data to empty values
                  return {
                    ...product,
                    name: "",
                    quantity: "",
                    unitPrice: "",
                    unitWeight: "",
                    totalPrice: "",
                    totalWeight: "",
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
                    isManuallyEdited: false, // Reset manual edit flag
                  };
                }
                return product;
              }),
            };
          }
        });
      } else {
        // For non-identical boxes, only update the selected box
        return prevBoxes.map((box) => {
          if (box.id === selectedBox) {
            if (box.products.length > 1) {
              // If multiple products, remove the selected one and renumber remaining products
              const filteredProducts = box.products.filter(product => product.id !== productId);
              
              // Create renumbered products with sequential IDs
              const renumberedProducts = filteredProducts.map((product, index) => {
                const newId = index + 1;
                
                // Store mapping from old ID to new ID
                idMapping[product.id] = newId;
                
                return {
                  ...product,
                  id: newId
                };
              });
              
              return {
                ...box,
                products: renumberedProducts
              };
            } else {
              // If only one product, reset its data instead of removing it
              return {
                ...box,
                products: box.products.map((product) => {
                  if (product.id === productId) {
                    // Reset product data to empty values
                    return {
                      ...product,
                      name: "",
                      quantity: "",
                      unitPrice: "",
                      unitWeight: "",
                      totalPrice: "",
                      totalWeight: "",
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
                      isManuallyEdited: false, // Reset manual edit flag
                    };
                  }
                  return product;
                }),
              };
            }
          }
          return box;
        });
      }
    });
  
    // Update all state variables that reference product IDs
    setTimeout(() => {
      // We use setTimeout to ensure the boxes state has been updated first
      
      // Check if the product was the only one in a box (was reset but not removed)
      const isOnlyProductReset = (() => {
        let result = false;
        
        // Check if this was the only product in the current box
        const currentBox = allBoxesIdentical ? 
          boxes[0] : 
          boxes.find(box => box.id === selectedBox);
          
        if (currentBox && currentBox.products.length === 1 && currentBox.products[0].id === productId) {
          result = true;
        }
        
        return result;
      })();
      
      // If it was the only product and was reset (not removed), we keep its suggestions
      if (isOnlyProductReset) {
        // Only clear the saved state for this product
        setSavedProducts((prev) => {
          const updated = { ...prev };
          delete updated[productId];
          return updated;
        });
        
        // Clear the product name search
        setProductNameSearch((prev) => {
          const updated = { ...prev };
          updated[productId] = ""; // Set to empty string instead of deleting
          return updated;
        });
        
        // Hide any active search results
        setShowProductSearchResults((prev) => {
          const updated = { ...prev };
          updated[productId] = false; // Hide results instead of deleting
          return updated;
        });
        
        // Keep the filtered results and visible suggestions intact
        // No need to modify filteredProductResults and visibleProductSuggestions
      } 
      // Normal case - product was removed (not just reset)
      else {
        // Remove the deleted product ID from all state variables
        setSavedProducts((prev) => {
          const updated = { ...prev };
          delete updated[productId];
          
          // Remap remaining products using the ID mapping
          const remapped: { [id: number]: boolean } = {};
          Object.entries(updated).forEach(([oldIdStr, value]) => {
            const oldId = parseInt(oldIdStr);
            if (idMapping[oldId]) {
              remapped[idMapping[oldId]] = value;
            }
          });
          
          return remapped;
        });
  
        // Clear search state for the deleted product and remap others
        setProductNameSearch((prev) => {
          const updated = { ...prev };
          delete updated[productId];
          
          const remapped: { [id: number]: string } = {};
          Object.entries(updated).forEach(([oldIdStr, value]) => {
            const oldId = parseInt(oldIdStr);
            if (idMapping[oldId]) {
              remapped[idMapping[oldId]] = value;
            }
          });
          
          return remapped;
        });
  
        setShowProductSearchResults((prev) => {
          const updated = { ...prev };
          delete updated[productId];
          
          const remapped: { [id: number]: boolean } = {};
          Object.entries(updated).forEach(([oldIdStr, value]) => {
            const oldId = parseInt(oldIdStr);
            if (idMapping[oldId]) {
              remapped[idMapping[oldId]] = value;
            }
          });
          
          return remapped;
        });
  
        setFilteredProductResults((prev) => {
          const updated = { ...prev };
          delete updated[productId];
          
          const remapped: { [id: number]: ProductSuggestion[] } = {};
          Object.entries(updated).forEach(([oldIdStr, value]) => {
            const oldId = parseInt(oldIdStr);
            if (idMapping[oldId]) {
              remapped[idMapping[oldId]] = value;
            }
          });
          
          return remapped;
        });
        
        setVisibleProductSuggestions((prev) => {
          const updated = { ...prev };
          delete updated[productId];
          
          const remapped: { [id: number]: ProductSuggestion[] } = {};
          Object.entries(updated).forEach(([oldIdStr, value]) => {
            const oldId = parseInt(oldIdStr);
            if (idMapping[oldId]) {
              remapped[idMapping[oldId]] = value;
            }
          });
          
          return remapped;
        });
      }
    }, 0);
  };

  const updateBoxDimensions = (
    field: keyof BoxDimensions,
    value: string
  ): void => {
    // If the field being updated is "name", mark the box as manually edited
    const isNameField = field === "name";

    setBoxes((prevBoxes) =>
      prevBoxes.map((box) => {
        if (box.id === selectedBox || allBoxesIdentical) {
          return {
            ...box,
            dimensions: {
              ...box.dimensions,
              [field]: value,
              // Mark as manually edited only when name field is changed
              ...(isNameField && { isManuallyEdited: true }),
            },
          };
        }
        return box;
      })
    );

    // If box name is being manually edited, clear the saved state
    if (isNameField) {
      setSavedBox(false);
    }
  };

  // Select a product suggestion for a product
  const selectProductSuggestion = (
    productId: number,
    suggestion: ProductSuggestion
  ): void => {
    // Clear all validation errors for this product
  if (clearFieldError && currentBox) {
    // Clear product name error
     // Only clear errors for fields that have values in the suggestion
     if (suggestion.name) clearFieldError(currentBox.id, `product-${productId}-name`);
     if (suggestion.qty) clearFieldError(currentBox.id, `product-${productId}-quantity`);
     if (suggestion.unitPrice) clearFieldError(currentBox.id, `product-${productId}-unitPrice`);
     if (suggestion.deadWeight) clearFieldError(currentBox.id, `product-${productId}-unitWeight`);
     if (suggestion.length) clearFieldError(currentBox.id, `product-${productId}-length`);
     if (suggestion.breadth) clearFieldError(currentBox.id, `product-${productId}-breadth`);
     if (suggestion.height) clearFieldError(currentBox.id, `product-${productId}-height`);
     if (suggestion.unitTax) clearFieldError(currentBox.id, `product-${productId}-tax`);
     // Discount is usually not in suggestions, so don't clear that error
     if (suggestion.hsnCode) clearFieldError(currentBox.id, `product-${productId}-hsn`);
     if (suggestion.sku) clearFieldError(currentBox.id, `product-${productId}-sku`);
  }
    setBoxes((prevBoxes) => {
      if (allBoxesIdentical) {
        // Apply to all boxes in identical mode
        return prevBoxes.map((box) => {
          return {
            ...box,
            products: box.products.map((product) => {
              if (product.id === productId) {
                return {
                  ...product,
                  selectedSuggestion: suggestion,
                  name: suggestion.name,
                  quantity: 1,
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
                  isManuallyEdited: false, // Reset manual edit flag when suggestion is selected
                };
              }
              return product;
            }),
          };
        });
      } else {
        // Original behavior for non-identical boxes
        return prevBoxes.map((box) => {
          if (box.id === selectedBox) {
            return {
              ...box,
              products: box.products.map((product) => {
                if (product.id === productId) {
                  return {
                    ...product,
                    selectedSuggestion: suggestion,
                    name: suggestion.name,
                    quantity: 1,
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
                    isManuallyEdited: false, // Reset manual edit flag when suggestion is selected
                  };
                }
                return product;
              }),
            };
          }
          return box;
        });
      }
    });

    // Mark product as saved when selected from suggestions
    setSavedProducts((prev) => ({
      ...prev,
      [productId]: true,
    }));

    // Update search state
    setProductNameSearch((prev) => ({
      ...prev,
      [productId]: suggestion.name,
    }));
  };

  // Remove product suggestion and show the next available
  const removeProductSuggestion = (productId: number): void => {
    // First, remove the selection from the product
    setBoxes((prevBoxes) => {
      if (allBoxesIdentical) {
        // Apply to all boxes in identical mode
        return prevBoxes.map((box) => {
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
        });
      } else {
        // Original behavior for non-identical boxes
        return prevBoxes.map((box) => {
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
        });
      }
    });

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

    // Remove from saved products when suggestion is removed
    setSavedProducts((prev) => {
      const updated = { ...prev };
      delete updated[productId];
      return updated;
    });
  };

  // Select a box suggestion
  const selectBoxSuggestion = (suggestion: BoxSuggestion): void => {
     // Clear box dimension validation errors
  if (clearFieldError && currentBox) {
    if (suggestion.name) clearFieldError(currentBox.id, `box-name`);
    if (suggestion.length) clearFieldError(currentBox.id, `box-length`);
    if (suggestion.breadth) clearFieldError(currentBox.id, `box-breadth`);
    if (suggestion.height) clearFieldError(currentBox.id, `box-height`);
    if (suggestion.deadWeight) clearFieldError(currentBox.id, `box-weight`);
  }
    setBoxes((prevBoxes) => {
      if (allBoxesIdentical) {
        // Apply to all boxes in identical mode
        return prevBoxes.map((box) => {
          return {
            ...box,
            selectedBoxSuggestion: suggestion,
            dimensions: {
              l: suggestion.length || "",
              b: suggestion.breadth || "",
              h: suggestion.height || "",
              weight: suggestion.deadWeight || "",
              name: suggestion.name || "",
              isManuallyEdited: false, // Reset manual edit flag when suggestion is selected
            },
          };
        });
      } else {
        // Original behavior for non-identical boxes
        return prevBoxes.map((box) => {
          if (box.id === selectedBox) {
            return {
              ...box,
              selectedBoxSuggestion: suggestion,
              dimensions: {
                l: suggestion.length || "",
                b: suggestion.breadth || "",
                h: suggestion.height || "",
                weight: suggestion.deadWeight || "",
                name: suggestion.name || "",
                isManuallyEdited: false, // Reset manual edit flag when suggestion is selected
              },
            };
          }
          return box;
        });
      }
    });

    // Mark box as saved when selected from suggestions
    setSavedBox(true);

    // Update box name search
    setBoxNameSearch(suggestion.name || "");
  };

  // Remove box suggestion and show the next available
  const removeBoxSuggestion = (): void => {
    // First, remove the selection from the box
    setBoxes((prevBoxes) => {
      if (allBoxesIdentical) {
        // Apply to all boxes in identical mode
        return prevBoxes.map((box) => {
          return {
            ...box,
            selectedBoxSuggestion: null,
          };
        });
      } else {
        // Original behavior for non-identical boxes
        return prevBoxes.map((box) => {
          if (box.id === selectedBox) {
            return {
              ...box,
              selectedBoxSuggestion: null,
            };
          }
          return box;
        });
      }
    });

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

    // Clear saved box state when suggestion is removed
    setSavedBox(false);
  };

  const openProductCatalogModal = async (productId: number) => {
    setCurrentProductId(productId);
    setIsProductCatalogModalOpen(true);
    setSearchQuery("");
    setSelectedCatalogProducts({});

    // Fetch products from API
    setLoading(true);
    try {
      const payload = {
        skip: 0,
        limit: 1000,
        pageNo: 1,
        sort: { _id: -1 },
        searchValue: "",
      };

      const response = await POST(GET_PRODUCTS, payload);

      if (response?.data?.success) {
        setCatalogProducts(response.data.data);
        setFilteredCatalogProducts(response.data.data);
      } else {
        setCatalogProducts([]);
        setFilteredCatalogProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setCatalogProducts([]);
      setFilteredCatalogProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Updated box catalog modal function
  const openBoxCatalogModal = async () => {
    setIsBoxCatalogModalOpen(true);
    setBoxSearchQuery("");

    // Fetch boxes from API
    setBoxCatalogLoading(true);
    try {
      const payload = {
        skip: 0,
        limit: 1000,
        pageNo: 1,
        sort: { _id: -1 },
        searchValue: "",
      };

      const response = await POST(GET_SELLER_BOX, payload);

      if (response?.data?.success) {
        // Transform the API response to match the BoxSuggestion interface
        const transformedBoxes: BoxSuggestion[] = response.data.data.map(
          (box: any) => ({
            boxId: box.boxId || "",
            name: box.name || "",
            appliedWeight: box.appliedWeight || 0,
            deadWeight: box.deadWeight || 0,
            volumetricWeight: box.volumetricWeight || 0,
            length: box.length || 0,
            breadth: box.breadth || 0,
            height: box.height || 0,
            weightUnit: box.weightUnit || "kg",
            measureUnit: box.measureUnit || "cm",
            price: box.price || 0,
            currency: box.currency || "INR",
            divisor: box.divisor || 5000,
            color: box.color || "",
          })
        );

        setCatalogBoxes(transformedBoxes);
        setFilteredCatalogBoxes(transformedBoxes);
      } else {
        setCatalogBoxes([]);
        setFilteredCatalogBoxes([]);
      }
    } catch (error) {
      console.error("Error fetching boxes:", error);
      setCatalogBoxes([]);
      setFilteredCatalogBoxes([]);
    } finally {
      setBoxCatalogLoading(false);
    }
  };

  const handleBoxSearchChange = (value: string) => {
    setBoxSearchQuery(value);
    if (value.trim() === "") {
      setFilteredCatalogBoxes(catalogBoxes);
    } else {
      const filtered = catalogBoxes.filter((box) =>
        box.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCatalogBoxes(filtered);
    }
  };

  const handleBoxSelection = (box: BoxSuggestion) => {
    // Select the box and populate dimensions
    selectBoxSuggestion(box);

    // Close the modal
    closeBoxCatalogModal();
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.trim() === "") {
      setFilteredCatalogProducts(catalogProducts);
    } else {
      const filtered = catalogProducts.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCatalogProducts(filtered);
    }
  };

  const toggleProductSelection = (productId: string) => {
    setSelectedCatalogProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  // const handleProceedClick = () => {
  //   // Get all selected products
  //   const selectedProducts = catalogProducts.filter(
  //     (product: any) => selectedCatalogProducts[product._id]
  //   );

  //   // Add them to the current box
  //   if (selectedProducts.length > 0) {
  //     setBoxes((prevBoxes) => {
  //       if (allBoxesIdentical) {
  //         // Apply to all boxes in identical mode
  //         return prevBoxes.map((box) => {
  //           // Clone the existing products
  //           const updatedProducts = [...box.products];

  //           // Find the maximum product ID to ensure unique IDs for new products
  //           let maxId = Math.max(...updatedProducts.map((p) => p.id));

  //           // Add ALL selected products as new products
  //           selectedProducts.forEach((product: any) => {
  //             maxId++;
  //             updatedProducts.push({
  //               id: maxId,
  //               name: product.name || product.title,
  //               quantity: product.qty,
  //               unitPrice: product.unitPrice,
  //               unitWeight: product.deadWeight,
  //               totalPrice: product.qty * product.unitPrice,
  //               totalWeight: product.qty * product.deadWeight,
  //               isExpanded: true,
  //               selectedSuggestion: product,
  //               boxInfo: {
  //                 l: product.length,
  //                 b: product.breadth,
  //                 h: product.height,
  //                 discount: "",
  //                 tax: product.unitTax,
  //                 hsn: product.hsnCode || "",
  //                 sku: product.sku || "",
  //               },
  //               isManuallyEdited: false, // Not manually edited since from catalog
  //             });

  //             // Mark each new product as saved
  //             setSavedProducts((prev) => ({
  //               ...prev,
  //               [maxId]: true,
  //             }));
  //           });

  //           return {
  //             ...box,
  //             products: updatedProducts,
  //           };
  //         });
  //       } else {
  //         // Original behavior for non-identical boxes
  //         return prevBoxes.map((box) => {
  //           if (box.id === selectedBox) {
  //             // Clone the existing products
  //             const updatedProducts = [...box.products];

  //             // Find the maximum product ID to ensure unique IDs for new products
  //             let maxId = Math.max(...updatedProducts.map((p) => p.id));

  //             // Add ALL selected products as new products
  //             selectedProducts.forEach((product: any) => {
  //               maxId++;
  //               updatedProducts.push({
  //                 id: maxId,
  //                 name: product.name || product.title,
  //                 quantity: product.qty,
  //                 unitPrice: product.unitPrice,
  //                 unitWeight: product.deadWeight,
  //                 totalPrice: product.qty * product.unitPrice,
  //                 totalWeight: product.qty * product.deadWeight,
  //                 isExpanded: true,
  //                 selectedSuggestion: product,
  //                 boxInfo: {
  //                   l: product.length,
  //                   b: product.breadth,
  //                   h: product.height,
  //                   discount: "",
  //                   tax: product.unitTax,
  //                   hsn: product.hsnCode || "",
  //                   sku: product.sku || "",
  //                 },
  //                 isManuallyEdited: false, // Not manually edited since from catalog
  //               });

  //               // Mark each new product as saved
  //               setSavedProducts((prev) => ({
  //                 ...prev,
  //                 [maxId]: true,
  //               }));
  //             });

  //             return {
  //               ...box,
  //               products: updatedProducts,
  //             };
  //           }
  //           return box;
  //         });
  //       }
  //     });
  //   }

  //   // Close the modal
  //   closeProductCatalogModal();
  // };

  // const handleProceedClick = () => {
  //   // Get all selected products
  //   const selectedProducts = catalogProducts.filter(
  //     (product: any) => selectedCatalogProducts[product._id]
  //   );
  
  //   // Add them to the current box
  //   if (selectedProducts.length > 0) {
  //     setBoxes((prevBoxes) => {
  //       if (allBoxesIdentical) {
  //         // Apply to all boxes in identical mode
  //         return prevBoxes.map((box) => {
  //           // Find empty products in this box (products with no name)
  //           const emptyProducts = box.products.filter(
  //             (p) => !p.name || p.name.trim() === ""
  //           );
            
  //           // Clone the existing products
  //           let updatedProducts = [...box.products];
  
  //           // First, replace empty products with selected products
  //           let remainingSelected = [...selectedProducts];
  //           if (emptyProducts.length > 0) {
  //             updatedProducts = updatedProducts.map((product) => {
  //               // If this is an empty product and we have selected products to use
  //               if ((!product.name || product.name.trim() === "") && remainingSelected.length > 0) {
  //                 const selectedProduct = remainingSelected.shift();
                  
  //                 if (selectedProduct) {
  //                   // Mark this product as saved
  //                   setSavedProducts((prev) => ({
  //                     ...prev,
  //                     [product.id]: true,
  //                   }));
                    
  //                   return {
  //                     ...product, // Keep the existing ID
  //                     name: selectedProduct.name || "",
  //                     quantity:  1,
  //                     unitPrice: selectedProduct.unitPrice || 0,
  //                     unitWeight: selectedProduct.deadWeight || 0,
  //                     totalPrice: (selectedProduct.qty || 1) * (selectedProduct.unitPrice || 0),
  //                     totalWeight: (selectedProduct.qty || 1) * (selectedProduct.deadWeight || 0),
  //                     isExpanded: true,
  //                     selectedSuggestion: selectedProduct as ProductSuggestion,
  //                     boxInfo: {
  //                       l: selectedProduct.length || 0,
  //                       b: selectedProduct.breadth || 0,
  //                       h: selectedProduct.height || 0,
  //                       discount: "",
  //                       tax: selectedProduct.unitTax || 0,
  //                       hsn: selectedProduct.hsnCode || "",
  //                       sku: selectedProduct.sku || "",
  //                     },
  //                     isManuallyEdited: false, // Not manually edited since from catalog
  //                   };
  //                 }
  //               }
  //               return product;
  //             });
  //           }
  
  //           // If we still have selected products to add, add them as new products
  //           if (remainingSelected.length > 0) {
  //             // Find the maximum product ID to ensure unique IDs for new products
  //             let maxId = Math.max(...updatedProducts.map((p) => p.id));
  
  //             // Add remaining selected products as new products
  //             remainingSelected.forEach((product: any) => {
  //               if (product) {
  //                 maxId++;
  //                 updatedProducts.push({
  //                   id: maxId,
  //                   name: product.name || "",
  //                   quantity:  1,
  //                   unitPrice: product.unitPrice || 0,
  //                   unitWeight: product.deadWeight || 0,
  //                   totalPrice: (product.qty || 1) * (product.unitPrice || 0),
  //                   totalWeight: (product.qty || 1) * (product.deadWeight || 0),
  //                   isExpanded: true,
  //                   selectedSuggestion: product as ProductSuggestion,
  //                   boxInfo: {
  //                     l: product.length || 0,
  //                     b: product.breadth || 0,
  //                     h: product.height || 0,
  //                     discount: "",
  //                     tax: product.unitTax || 0,
  //                     hsn: product.hsnCode || "",
  //                     sku: product.sku || "",
  //                   },
  //                   isManuallyEdited: false, // Not manually edited since from catalog
  //                 });
  
  //                 // Mark each new product as saved
  //                 setSavedProducts((prev) => ({
  //                   ...prev,
  //                   [maxId]: true,
  //                 }));
  //               }
  //             });
  //           }
  
  //           return {
  //             ...box,
  //             products: updatedProducts,
  //           };
  //         });
  //       } else {
  //         // For non-identical boxes - similar logic but only for selected box
  //         return prevBoxes.map((box) => {
  //           if (box.id === selectedBox) {
  //             // Find empty products in this box
  //             const emptyProducts = box.products.filter(
  //               (p) => !p.name || p.name.trim() === ""
  //             );
              
  //             // Clone the existing products
  //             let updatedProducts = [...box.products];
  
  //             // First, replace empty products with selected products
  //             let remainingSelected = [...selectedProducts];
  //             if (emptyProducts.length > 0) {
  //               updatedProducts = updatedProducts.map((product) => {
  //                 if ((!product.name || product.name.trim() === "") && remainingSelected.length > 0) {
  //                   const selectedProduct = remainingSelected.shift();
                    
  //                   if (selectedProduct) {
  //                     // Mark this product as saved
  //                     setSavedProducts((prev) => ({
  //                       ...prev,
  //                       [product.id]: true,
  //                     }));
                      
  //                     return {
  //                       ...product, // Keep the existing ID
  //                       name: selectedProduct.name || "",
  //                       quantity:  1,
  //                       unitPrice: selectedProduct.unitPrice || 0,
  //                       unitWeight: selectedProduct.deadWeight || 0,
  //                       totalPrice: (selectedProduct.qty || 1) * (selectedProduct.unitPrice || 0),
  //                       totalWeight: (selectedProduct.qty || 1) * (selectedProduct.deadWeight || 0),
  //                       isExpanded: true,
  //                       selectedSuggestion: selectedProduct as ProductSuggestion,
  //                       boxInfo: {
  //                         l: selectedProduct.length || 0,
  //                         b: selectedProduct.breadth || 0,
  //                         h: selectedProduct.height || 0,
  //                         discount: "",
  //                         tax: selectedProduct.unitTax || 0,
  //                         hsn: selectedProduct.hsnCode || "",
  //                         sku: selectedProduct.sku || "",
  //                       },
  //                       isManuallyEdited: false, // Not manually edited since from catalog
  //                     };
  //                   }
  //                 }
  //                 return product;
  //               });
  //             }
  
  //             // Only add new products if we still have remaining selected products
  //             if (remainingSelected.length > 0) {
  //               let maxId = Math.max(...updatedProducts.map((p) => p.id));
  //               remainingSelected.forEach((product: any) => {
  //                 if (product) {
  //                   maxId++;
  //                   updatedProducts.push({
  //                     id: maxId,
  //                     name: product.name || "",
  //                     quantity:  1,
  //                     unitPrice: product.unitPrice || 0,
  //                     unitWeight: product.deadWeight || 0,
  //                     totalPrice: (product.qty || 1) * (product.unitPrice || 0),
  //                     totalWeight: (product.qty || 1) * (product.deadWeight || 0),
  //                     isExpanded: true,
  //                     selectedSuggestion: product as ProductSuggestion,
  //                     boxInfo: {
  //                       l: product.length || 0,
  //                       b: product.breadth || 0,
  //                       h: product.height || 0,
  //                       discount: "",
  //                       tax: product.unitTax || 0,
  //                       hsn: product.hsnCode || "",
  //                       sku: product.sku || "",
  //                     },
  //                     isManuallyEdited: false,
  //                   });
  
  //                   setSavedProducts((prev) => ({
  //                     ...prev,
  //                     [maxId]: true,
  //                   }));
  //                 }
  //               });
  //             }
  
  //             return {
  //               ...box,
  //               products: updatedProducts,
  //             };
  //           }
  //           return box;
  //         });
  //       }
  //     });
  //   }
  
  //   // Close the modal
  //   closeProductCatalogModal();
  // };

  // Replace the handleProceedClick function with this improved version

const handleProceedClick = () => {
  // Get all selected products
  const selectedProducts = catalogProducts.filter(
    (product: any) => selectedCatalogProducts[product._id]
  );

  // Collect product IDs that need to be marked as saved
  const newSavedIds: { [id: number]: boolean } = {};

  // Track new product IDs to set suggestions for
  const newProductIds: number[] = [];
  
  // Add them to the current box
  if (selectedProducts.length > 0) {
    setBoxes((prevBoxes) => {
      if (allBoxesIdentical) {
        // Apply to all boxes in identical mode
        return prevBoxes.map((box) => {
          // Find empty products in this box (products with no name)
          const emptyProducts = box.products.filter(
            (p) => !p.name || p.name.trim() === ""
          );
          
          // Clone the existing products
          let updatedProducts = [...box.products];

          // First, replace empty products with selected products
          let remainingSelected = [...selectedProducts];
          if (emptyProducts.length > 0) {
            updatedProducts = updatedProducts.map((product) => {
              // If this is an empty product and we have selected products to use
              if ((!product.name || product.name.trim() === "") && remainingSelected.length > 0) {
                const selectedProduct = remainingSelected.shift();
                
                if (selectedProduct) {
                  // Add product ID to be marked as saved
                  newSavedIds[product.id] = true;
                  // Add to list of products needing suggestions
newProductIds.push(product.id);
                  
                  return {
                    ...product, // Keep the existing ID
                    name: selectedProduct.name || "",
                    quantity: 1,
                    unitPrice: selectedProduct.unitPrice || 0,
                    unitWeight: selectedProduct.deadWeight || 0,
                    totalPrice: (selectedProduct.qty || 1) * (selectedProduct.unitPrice || 0),
                    totalWeight: (selectedProduct.qty || 1) * (selectedProduct.deadWeight || 0),
                    isExpanded: true,
                    selectedSuggestion: selectedProduct as ProductSuggestion,
                    boxInfo: {
                      l: selectedProduct.length || 0,
                      b: selectedProduct.breadth || 0,
                      h: selectedProduct.height || 0,
                      discount: "",
                      tax: selectedProduct.unitTax || 0,
                      hsn: selectedProduct.hsnCode || "",
                      sku: selectedProduct.sku || "",
                    },
                    isManuallyEdited: false, // Not manually edited since from catalog
                  };
                }
              }
              return product;
            });
          }

          // If we still have selected products to add, add them as new products
          if (remainingSelected.length > 0) {
            // Find the maximum product ID to ensure unique IDs for new products
            let maxId = Math.max(...updatedProducts.map((p) => p.id));

            // Add remaining selected products as new products
            remainingSelected.forEach((product: any) => {
              if (product) {
                maxId++;
                
                // Add product ID to be marked as saved
                newSavedIds[maxId] = true;
                
                updatedProducts.push({
                  id: maxId,
                  name: product.name || "",
                  quantity: 1,
                  unitPrice: product.unitPrice || 0,
                  unitWeight: product.deadWeight || 0,
                  totalPrice: (product.qty || 1) * (product.unitPrice || 0),
                  totalWeight: (product.qty || 1) * (product.deadWeight || 0),
                  isExpanded: true,
                  selectedSuggestion: product as ProductSuggestion,
                  boxInfo: {
                    l: product.length || 0,
                    b: product.breadth || 0,
                    h: product.height || 0,
                    discount: "",
                    tax: product.unitTax || 0,
                    hsn: product.hsnCode || "",
                    sku: product.sku || "",
                  },
                  isManuallyEdited: false, // Not manually edited since from catalog
                });
              }
            });
          }

          return {
            ...box,
            products: updatedProducts,
          };
        });
      } else {
        // For non-identical boxes - similar logic but only for selected box
        return prevBoxes.map((box) => {
          if (box.id === selectedBox) {
            // Find empty products in this box
            const emptyProducts = box.products.filter(
              (p) => !p.name || p.name.trim() === ""
            );
            
            // Clone the existing products
            let updatedProducts = [...box.products];

            // First, replace empty products with selected products
            let remainingSelected = [...selectedProducts];
            if (emptyProducts.length > 0) {
              updatedProducts = updatedProducts.map((product) => {
                if ((!product.name || product.name.trim() === "") && remainingSelected.length > 0) {
                  const selectedProduct = remainingSelected.shift();
                  
                  if (selectedProduct) {
                    // Add product ID to be marked as saved
                    newSavedIds[product.id] = true;
                    
                    return {
                      ...product, // Keep the existing ID
                      name: selectedProduct.name || "",
                      quantity: 1,
                      unitPrice: selectedProduct.unitPrice || 0,
                      unitWeight: selectedProduct.deadWeight || 0,
                      totalPrice: (selectedProduct.qty || 1) * (selectedProduct.unitPrice || 0),
                      totalWeight: (selectedProduct.qty || 1) * (selectedProduct.deadWeight || 0),
                      isExpanded: true,
                      selectedSuggestion: selectedProduct as ProductSuggestion,
                      boxInfo: {
                        l: selectedProduct.length || 0,
                        b: selectedProduct.breadth || 0,
                        h: selectedProduct.height || 0,
                        discount: "",
                        tax: selectedProduct.unitTax || 0,
                        hsn: selectedProduct.hsnCode || "",
                        sku: selectedProduct.sku || "",
                      },
                      isManuallyEdited: false, // Not manually edited since from catalog
                    };
                  }
                }
                return product;
              });
            }

            // Only add new products if we still have remaining selected products
            if (remainingSelected.length > 0) {
              let maxId = Math.max(...updatedProducts.map((p) => p.id));
              remainingSelected.forEach((product: any) => {
                if (product) {
                  maxId++;
                  
                  // Add product ID to be marked as saved
                  newSavedIds[maxId] = true;
                  
                  updatedProducts.push({
                    id: maxId,
                    name: product.name || "",
                    quantity: 1,
                    unitPrice: product.unitPrice || 0,
                    unitWeight: product.deadWeight || 0,
                    totalPrice: (product.qty || 1) * (product.unitPrice || 0),
                    totalWeight: (product.qty || 1) * (product.deadWeight || 0),
                    isExpanded: true,
                    selectedSuggestion: product as ProductSuggestion,
                    boxInfo: {
                      l: product.length || 0,
                      b: product.breadth || 0,
                      h: product.height || 0,
                      discount: "",
                      tax: product.unitTax || 0,
                      hsn: product.hsnCode || "",
                      sku: product.sku || "",
                    },
                    isManuallyEdited: false,
                  });
                }
              });
            }

            return {
              ...box,
              products: updatedProducts,
            };
          }
          return box;
        });
      }
    });
    
    // After state update, update all saved products at once
    setTimeout(() => {
      if (Object.keys(newSavedIds).length > 0) {
        setSavedProducts((prev) => ({
          ...prev,
          ...newSavedIds
        }));
      }
      // Initialize product suggestions for new products
if (newProductIds.length > 0) {
  setVisibleProductSuggestions((prev) => {
    const updates:any = {};
    newProductIds.forEach(productId => {
      updates[productId] = productSuggestions.slice(0, 3);
    });
    return {
      ...prev,
      ...updates
    };
  });
}
    }, 0);

    
  }

  // Close the modal
  closeProductCatalogModal();
};
  const closeProductCatalogModal = () => {
    setIsProductCatalogModalOpen(false);
  };

  const closeBoxCatalogModal = () => {
    setIsBoxCatalogModalOpen(false);
  };

  // Updated saveProduct function
  const saveProduct = async (productId: number) => {
    // If product is already saved, don't allow saving again
    if (savedProducts[productId]) return;

    try {
      setLoading(true);

      // Find the product in the current box
      const currentBoxData = allBoxesIdentical
        ? boxes[0]
        : boxes.find((box) => box.id === selectedBox);

      if (!currentBoxData) {
        toast.error("Box not found");
        return;
      }

      const product = currentBoxData.products.find((p) => p.id === productId);

      if (!product) {
        toast.error("Product not found");
        return;
      }

      // Prepare the payload
      const payload = {
        products: [
          {
            productId: uuidv4(),
            name: product.name,
            category: "Health & Beauty", // Using default category
            qty: Number(product.quantity) || 1,
            unitPrice: Number(product.unitPrice) || 0,
            unitTax: Number(product.boxInfo.tax) || 0,
            deadWeight: Number(product.unitWeight) || 0,
            length: product.boxInfo.l.toString(),
            breadth: product.boxInfo.b.toString(),
            height: product.boxInfo.h.toString(),
            sku: product.boxInfo.sku || "",
            measureUnit: "cm",
            weightUnit: "kg",
            currency: "INR",
            divisor: "5000",
            images: [],
            // Include other required fields
            appliedWeight: 0,
            volumetricWeight: 0,
          },
        ],
      };

      // Call the API
      const response = await POST(CREATE_BULK_PRODUCT, payload);

      if (response?.data?.success) {
        toast.success("Product saved successfully!");
        // Update the saved state for this product
        setSavedProducts((prev) => ({
          ...prev,
          [productId]: true,
        }));
      } else {
        toast.error(response?.data?.message || "Failed to save product");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("An error occurred while saving the product");
    } finally {
      setLoading(false);
    }
  };

  // Updated saveBox function
  const saveBox = async () => {
    // If box is already saved, don't allow saving again
    if (savedBox) return;

    try {
      setLoading(true);

      // Get the current box data
      const currentBoxData = allBoxesIdentical
        ? boxes[0]
        : boxes.find((box) => box.id === selectedBox);

      if (!currentBoxData) {
        toast.error("Box not found");
        return;
      }

      // If name is not provided, generate one
      const boxName =
        currentBoxData.dimensions.name ||
        `${currentBoxData.dimensions.weight}kg - ${currentBoxData.dimensions.l}x${currentBoxData.dimensions.b}x${currentBoxData.dimensions.h}`;

      // Prepare the payload
      const payload = {
        name: boxName,
        length: currentBoxData.dimensions.l.toString(),
        breadth: currentBoxData.dimensions.b.toString(),
        height: currentBoxData.dimensions.h.toString(),
        deadWeight: currentBoxData.dimensions.weight.toString(),
        color: "brown", // Default color
        price: "0", // Default price or use a specific field if available
      };

      // Call the API
      const response = await POST(CREATE_SELLER_BOX, payload);

      if (response?.data?.success) {
        toast.success("Box saved successfully!");
        // Set the box as saved
        setSavedBox(true);
      } else {
        toast.error(response?.data?.message || "Failed to save box");
      }
    } catch (error) {
      console.error("Error saving box:", error);
      toast.error("An error occurred while saving the box");
    } finally {
      setLoading(false);
    }
  };

  // Handle product name change
  const handleProductNameChange = (productId: number, value: string) => {
    setBoxes((prevBoxes) => {
      const updatedBoxes = [...prevBoxes];
      if (allBoxesIdentical) {
        // Update all boxes in identical mode
        updatedBoxes.forEach((box) => {
          const foundProduct = box.products.find((p) => p.id === productId);
          if (foundProduct) {
            foundProduct.name = value;
            foundProduct.isManuallyEdited = true; // Mark as manually edited
          }
        });
      } else {
        // Update only current box
        const currentBox = updatedBoxes.find((box) => box.id === selectedBox);
        if (currentBox) {
          const foundProduct = currentBox.products.find(
            (p) => p.id === productId
          );
          if (foundProduct) {
            foundProduct.name = value;
            foundProduct.isManuallyEdited = true; // Mark as manually edited
          }
        }
      }
      return updatedBoxes;
    });

    // Clear saved state for this product when manually edited
    setSavedProducts((prev) => ({
      ...prev,
      [productId]: false,
    }));
  };

  return (
    <div className="w-full mx-auto p-4 bg-gray-50">
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
            onChange={(e) => toggleAllBoxesIdentical(e.target.checked)}
            className="mr-2"
          />
          <span>All Boxes Identical</span>
        </div>
      </div>

      {/* Box Selection - Modified to handle identical boxes */}
      <div className="overflow-x-auto mb-8">
        {allBoxesIdentical ? (
          <div className="flex items-center">
            <button className="px-4 py-2 border bg-gray-200 border-gray-400 rounded">
              Box 1
            </button>
            <span className="ml-3 text-gray-600 flex items-center bg-blue-50 px-3 py-1 rounded-md">
              <Package className="w-4 h-4 mr-2" />
              Editing {boxCount} identical boxes
            </span>
          </div>
        ) : (
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
        )}
      </div>

      {/* Two-column layout for products and box info */}
      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
        {/* Left column - Products List */}
        <div className="w-full lg:w-2/3 space-y-4">
          {currentBox.products.length === 0 ? (
            <div className="bg-blue-50 rounded-md p-8 flex flex-col items-center justify-center">
              <p className="text-gray-500 mb-4">
                No products added to{" "}
                {allBoxesIdentical ? "boxes" : `Box ${selectedBox}`} yet
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
                      <button
                        className={`p-2 ${
                          savedProducts[product.id]
                            ? "text-blue-500 cursor-not-allowed"
                            : "text-gray-500 cursor-pointer"
                        }`}
                        onClick={() => saveProduct(product.id)}
                        title={
                          savedProducts[product.id]
                            ? "Product saved"
                            : "Save product"
                        }
                        disabled={savedProducts[product.id]}
                      >
                        <Bookmark
                          className="w-5 h-5"
                          isFilled={savedProducts[product.id] || false}
                        />
                      </button>
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

                    {/* Product Details Form with Search - Modified Layout */}
                    <div className="mb-4">
                      {/* First row: Name with Search, Qty, Unit Price, Unit Wt */}
                      <div className="flex flex-wrap gap-2 mb-2">
                        <div
                          className="flex-grow min-w-[200px] relative"
                          ref={(el) =>
                            (productSearchRefs.current[product.id] = el)
                          }
                        >
                          <FloatingLabelInput
                            placeholder="Product Name"
                            value={product.name.toString()}
                            onChangeCallback={(value) => {
                              if (
                                validationErrors[currentBox.id]?.[
                                  `product-${product.id}-name`
                                ]
                              ) {
                                clearFieldError(
                                  currentBox.id,
                                  `product-${product.id}-name`
                                );
                              }
                              handleProductNameSearch(product.id, value);
                            }}
                            icon={<img src={searchIcon} alt="Search" />}
                            error={
                              validationErrors[currentBox.id]?.[
                                `product-${product.id}-name`
                              ] || false
                            }
                            errorMessage="Product name is required"
                          />

                          {/* Product Search Results Dropdown */}
                          {showProductSearchResults[product.id] &&
                            filteredProductResults[product.id]?.length > 0 && (
                              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                {filteredProductResults[product.id].map(
                                  (suggestion) => (
                                    <div
                                      key={suggestion.productId}
                                      className="p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 flex justify-between items-center"
                                      onClick={() =>
                                        selectProductFromSearch(
                                          product.id,
                                          suggestion
                                        )
                                      }
                                    >
                                      <div>
                                        <div className="font-medium">
                                          {suggestion.name}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                          ₹ {suggestion.unitPrice} |{" "}
                                          {suggestion.deadWeight} kg
                                        </div>
                                      </div>
                                      <div className="text-xs bg-gray-200 px-2 py-1 rounded">
                                        {suggestion.length} x{" "}
                                        {suggestion.breadth} x{" "}
                                        {suggestion.height}
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            )}
                        </div>
                        <div className="w-20">
                          <FloatingLabelInput
                            placeholder="Qty"
                            value={product.quantity.toString()}
                            type="number"
                            showNumberControls={true} // Add this prop only for quantity fields

                            onChangeCallback={(value) => {
                              if (
                                validationErrors[currentBox.id]?.[
                                  `product-${product.id}-quantity`
                                ]
                              ) {
                                clearFieldError(
                                  currentBox.id,
                                  `product-${product.id}-quantity`
                                );
                              }
                              setBoxes((prevBoxes) => {
                                const updatedBoxes = [...prevBoxes];
                                if (allBoxesIdentical) {
                                  // Update all boxes in identical mode
                                  updatedBoxes.forEach((box) => {
                                    const foundProduct = box.products.find(
                                      (p) => p.id === product.id
                                    );
                                    if (foundProduct) {
                                      foundProduct.quantity = value;
                                      // Update total price and weight
                                      const qty = Number(value) || 0;
                                      const unitPrice =
                                        Number(foundProduct.unitPrice) || 0;
                                      const unitWeight =
                                        Number(foundProduct.unitWeight) || 0;
                                      foundProduct.totalPrice = qty * unitPrice;
                                      foundProduct.totalWeight =
                                        qty * unitWeight;
                                    }
                                  });
                                } else {
                                  // Update only current box
                                  const currentBox = updatedBoxes.find(
                                    (box) => box.id === selectedBox
                                  );
                                  if (currentBox) {
                                    const foundProduct =
                                      currentBox.products.find(
                                        (p) => p.id === product.id
                                      );
                                    if (foundProduct) {
                                      foundProduct.quantity = value;
                                      // Update total price and weight
                                      const qty = Number(value) || 0;
                                      const unitPrice =
                                        Number(foundProduct.unitPrice) || 0;
                                      const unitWeight =
                                        Number(foundProduct.unitWeight) || 0;
                                      foundProduct.totalPrice = qty * unitPrice;
                                      foundProduct.totalWeight =
                                        qty * unitWeight;
                                    }
                                  }
                                }
                                return updatedBoxes;
                              });
                            }}
                            error={
                              validationErrors[currentBox.id]?.[
                                `product-${product.id}-quantity`
                              ] || false
                            }
                            errorMessage="Required"
                          />
                        </div>
                        <div className="w-28">
                          <FloatingLabelInput
                            placeholder="Unit Price"
                            value={product.unitPrice.toString()}
                            type="number"
                            onChangeCallback={(value) => {
                              if (
                                validationErrors[currentBox.id]?.[
                                  `product-${product.id}-unitPrice`
                                ]
                              ) {
                                clearFieldError(
                                  currentBox.id,
                                  `product-${product.id}-unitPrice`
                                );
                              }
                              setBoxes((prevBoxes) => {
                                const updatedBoxes = [...prevBoxes];
                                if (allBoxesIdentical) {
                                  // Update all boxes in identical mode
                                  updatedBoxes.forEach((box) => {
                                    const foundProduct = box.products.find(
                                      (p) => p.id === product.id
                                    );
                                    if (foundProduct) {
                                      foundProduct.unitPrice = value;
                                      // Update total price
                                      const qty =
                                        Number(foundProduct.quantity) || 0;
                                      const unitPrice = Number(value) || 0;
                                      foundProduct.totalPrice = qty * unitPrice;
                                    }
                                  });
                                } else {
                                  // Update only current box
                                  const currentBox = updatedBoxes.find(
                                    (box) => box.id === selectedBox
                                  );
                                  if (currentBox) {
                                    const foundProduct =
                                      currentBox.products.find(
                                        (p) => p.id === product.id
                                      );
                                    if (foundProduct) {
                                      foundProduct.unitPrice = value;
                                      // Update total price
                                      const qty =
                                        Number(foundProduct.quantity) || 0;
                                      const unitPrice = Number(value) || 0;
                                      foundProduct.totalPrice = qty * unitPrice;
                                    }
                                  }
                                }
                                return updatedBoxes;
                              });
                            }}
                            error={
                              validationErrors[currentBox.id]?.[
                                `product-${product.id}-unitPrice`
                              ] || false
                            }
                            errorMessage="Required"
                          />
                        </div>
                        <div className="w-28">
                          <FloatingLabelInput
                            placeholder="Unit Wt (kg)"
                            value={product.unitWeight.toString()}
                            type="number"
                            onChangeCallback={(value) => {
                              if (
                                validationErrors[currentBox.id]?.[
                                  `product-${product.id}-unitWeight`
                                ]
                              ) {
                                clearFieldError(
                                  currentBox.id,
                                  `product-${product.id}-unitWeight`
                                );
                              }
                              setBoxes((prevBoxes) => {
                                const updatedBoxes = [...prevBoxes];
                                if (allBoxesIdentical) {
                                  // Update all boxes in identical mode
                                  updatedBoxes.forEach((box) => {
                                    const foundProduct = box.products.find(
                                      (p) => p.id === product.id
                                    );
                                    if (foundProduct) {
                                      foundProduct.unitWeight = value;
                                      // Update total weight
                                      const qty =
                                        Number(foundProduct.quantity) || 0;
                                      const unitWeight = Number(value) || 0;
                                      foundProduct.totalWeight =
                                        qty * unitWeight;
                                    }
                                  });
                                } else {
                                  // Update only current box
                                  const currentBox = updatedBoxes.find(
                                    (box) => box.id === selectedBox
                                  );
                                  if (currentBox) {
                                    const foundProduct =
                                      currentBox.products.find(
                                        (p) => p.id === product.id
                                      );
                                    if (foundProduct) {
                                      foundProduct.unitWeight = value;
                                      // Update total weight
                                      const qty =
                                        Number(foundProduct.quantity) || 0;
                                      const unitWeight = Number(value) || 0;
                                      foundProduct.totalWeight =
                                        qty * unitWeight;
                                    }
                                  }
                                }
                                return updatedBoxes;
                              });
                            }}
                            error={
                              validationErrors[currentBox.id]?.[
                                `product-${product.id}-unitWeight`
                              ] || false
                            }
                            errorMessage="Required"
                          />
                        </div>
                      </div>

                      {/* Second row: Total Price and Total Wt aligned right */}
                      <div className="flex justify-end gap-2 mt-6">
                        <div className="w-32">
                          <FloatingLabelInput
                            placeholder="Total Price"
                            value={product.totalPrice.toString()}
                            type="number"
                            counter="₹"
                            readOnly={true}
                          />
                        </div>
                        <div className="w-32">
                          <FloatingLabelInput
                            placeholder="Total Wt (kg)"
                            value={product.totalWeight.toString()}
                            type="number"
                            readOnly={true}
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
                                onChangeCallback={(value) => {
                                  if (
                                    validationErrors[currentBox.id]?.[
                                      `product-${product.id}-length`
                                    ]
                                  ) {
                                    clearFieldError(
                                      currentBox.id,
                                      `product-${product.id}-length`
                                    );
                                  }
                                  setBoxes((prevBoxes) => {
                                    const updatedBoxes = [...prevBoxes];
                                    if (allBoxesIdentical) {
                                      // Update all boxes in identical mode
                                      updatedBoxes.forEach((box) => {
                                        const foundProduct = box.products.find(
                                          (p) => p.id === product.id
                                        );
                                        if (foundProduct) {
                                          foundProduct.boxInfo.l = value;
                                        }
                                      });
                                    } else {
                                      // Update only current box
                                      const currentBox = updatedBoxes.find(
                                        (box) => box.id === selectedBox
                                      );
                                      if (currentBox) {
                                        const foundProduct =
                                          currentBox.products.find(
                                            (p) => p.id === product.id
                                          );
                                        if (foundProduct) {
                                          foundProduct.boxInfo.l = value;
                                        }
                                      }
                                    }
                                    return updatedBoxes;
                                  });
                                }}
                                error={
                                  validationErrors[currentBox.id]?.[
                                    `product-${product.id}-length`
                                  ] || false
                                }
                                errorMessage="Required"
                              />
                            </div>
                            <div className="!w-14">
                              <FloatingLabelInput
                                placeholder="B"
                                value={product.boxInfo.b.toString()}
                                type="number"
                                onChangeCallback={(value) => {
                                  if (
                                    validationErrors[currentBox.id]?.[
                                      `product-${product.id}-breadth`
                                    ]
                                  ) {
                                    clearFieldError(
                                      currentBox.id,
                                      `product-${product.id}-breadth`
                                    );
                                  }
                                  setBoxes((prevBoxes) => {
                                    const updatedBoxes = [...prevBoxes];
                                    if (allBoxesIdentical) {
                                      // Update all boxes in identical mode
                                      updatedBoxes.forEach((box) => {
                                        const foundProduct = box.products.find(
                                          (p) => p.id === product.id
                                        );
                                        if (foundProduct) {
                                          foundProduct.boxInfo.b = value;
                                        }
                                      });
                                    } else {
                                      // Update only current box
                                      const currentBox = updatedBoxes.find(
                                        (box) => box.id === selectedBox
                                      );
                                      if (currentBox) {
                                        const foundProduct =
                                          currentBox.products.find(
                                            (p) => p.id === product.id
                                          );
                                        if (foundProduct) {
                                          foundProduct.boxInfo.b = value;
                                        }
                                      }
                                    }
                                    return updatedBoxes;
                                  });
                                }}
                                error={
                                  validationErrors[currentBox.id]?.[
                                    `product-${product.id}-breadth`
                                  ] || false
                                }
                                errorMessage="Required"
                              />
                            </div>
                            <div className="!w-14">
                              <FloatingLabelInput
                                placeholder="H"
                                value={product.boxInfo.h.toString()}
                                type="number"
                                onChangeCallback={(value) => {
                                  if (
                                    validationErrors[currentBox.id]?.[
                                      `product-${product.id}-height`
                                    ]
                                  ) {
                                    clearFieldError(
                                      currentBox.id,
                                      `product-${product.id}-height`
                                    );
                                  }
                                  setBoxes((prevBoxes) => {
                                    const updatedBoxes = [...prevBoxes];
                                    if (allBoxesIdentical) {
                                      // Update all boxes in identical mode
                                      updatedBoxes.forEach((box) => {
                                        const foundProduct = box.products.find(
                                          (p) => p.id === product.id
                                        );
                                        if (foundProduct) {
                                          foundProduct.boxInfo.h = value;
                                        }
                                      });
                                    } else {
                                      // Update only current box
                                      const currentBox = updatedBoxes.find(
                                        (box) => box.id === selectedBox
                                      );
                                      if (currentBox) {
                                        const foundProduct =
                                          currentBox.products.find(
                                            (p) => p.id === product.id
                                          );
                                        if (foundProduct) {
                                          foundProduct.boxInfo.h = value;
                                        }
                                      }
                                    }
                                    return updatedBoxes;
                                  });
                                }}
                                error={
                                  validationErrors[currentBox.id]?.[
                                    `product-${product.id}-height`
                                  ] || false
                                }
                                errorMessage="Required"
                              />
                            </div>
                          </div>
                          <div>
                            <FloatingLabelInput
                              placeholder="Discount %"
                              value={product.boxInfo.discount.toString()}
                              type="number"
                              onChangeCallback={(value) => {
                                if (
                                  validationErrors[currentBox.id]?.[
                                    `product-${product.id}-discount`
                                  ]
                                ) {
                                  clearFieldError(
                                    currentBox.id,
                                    `product-${product.id}-discount`
                                  );
                                }
                                setBoxes((prevBoxes) => {
                                  const updatedBoxes = [...prevBoxes];
                                  if (allBoxesIdentical) {
                                    // Update all boxes in identical mode
                                    updatedBoxes.forEach((box) => {
                                      const foundProduct = box.products.find(
                                        (p) => p.id === product.id
                                      );
                                      if (foundProduct) {
                                        foundProduct.boxInfo.discount = value;
                                      }
                                    });
                                  } else {
                                    // Update only current box
                                    const currentBox = updatedBoxes.find(
                                      (box) => box.id === selectedBox
                                    );
                                    if (currentBox) {
                                      const foundProduct =
                                        currentBox.products.find(
                                          (p) => p.id === product.id
                                        );
                                      if (foundProduct) {
                                        foundProduct.boxInfo.discount = value;
                                      }
                                    }
                                  }
                                  return updatedBoxes;
                                });
                              }}
                              error={
                                validationErrors[currentBox.id]?.[
                                  `product-${product.id}-discount`
                                ] || false
                              }
                              errorMessage="Required"
                            />
                          </div>
                          <div>
                            <FloatingLabelInput
                              placeholder="Tax"
                              value={product.boxInfo.tax.toString()}
                              type="number"
                              onChangeCallback={(value) => {
                                if (
                                  validationErrors[currentBox.id]?.[
                                    `product-${product.id}-tax`
                                  ]
                                ) {
                                  clearFieldError(
                                    currentBox.id,
                                    `product-${product.id}-tax`
                                  );
                                }
                                setBoxes((prevBoxes) => {
                                  const updatedBoxes = [...prevBoxes];
                                  if (allBoxesIdentical) {
                                    // Update all boxes in identical mode
                                    updatedBoxes.forEach((box) => {
                                      const foundProduct = box.products.find(
                                        (p) => p.id === product.id
                                      );
                                      if (foundProduct) {
                                        foundProduct.boxInfo.tax = value;
                                      }
                                    });
                                  } else {
                                    // Update only current box
                                    const currentBox = updatedBoxes.find(
                                      (box) => box.id === selectedBox
                                    );
                                    if (currentBox) {
                                      const foundProduct =
                                        currentBox.products.find(
                                          (p) => p.id === product.id
                                        );
                                      if (foundProduct) {
                                        foundProduct.boxInfo.tax = value;
                                      }
                                    }
                                  }
                                  return updatedBoxes;
                                });
                              }}
                              error={
                                validationErrors[currentBox.id]?.[
                                  `product-${product.id}-tax`
                                ] || false
                              }
                              errorMessage="Required"
                            />
                          </div>
                          <div>
                            <FloatingLabelInput
                              placeholder="HSN"
                              value={product.boxInfo.hsn}
                              onChangeCallback={(value) => {
                                setBoxes((prevBoxes) => {
                                  if (
                                    validationErrors[currentBox.id]?.[
                                      `product-${product.id}-hsn`
                                    ]
                                  ) {
                                    clearFieldError(
                                      currentBox.id,
                                      `product-${product.id}-hsn`
                                    );
                                  }
                                  const updatedBoxes = [...prevBoxes];
                                  if (allBoxesIdentical) {
                                    // Update all boxes in identical mode
                                    updatedBoxes.forEach((box) => {
                                      const foundProduct = box.products.find(
                                        (p) => p.id === product.id
                                      );
                                      if (foundProduct) {
                                        foundProduct.boxInfo.hsn = value;
                                      }
                                    });
                                  } else {
                                    // Update only current box
                                    const currentBox = updatedBoxes.find(
                                      (box) => box.id === selectedBox
                                    );
                                    if (currentBox) {
                                      const foundProduct =
                                        currentBox.products.find(
                                          (p) => p.id === product.id
                                        );
                                      if (foundProduct) {
                                        foundProduct.boxInfo.hsn = value;
                                      }
                                    }
                                  }
                                  return updatedBoxes;
                                });
                              }}
                              error={
                                validationErrors[currentBox.id]?.[
                                  `product-${product.id}-hsn`
                                ] || false
                              }
                              errorMessage="Required"
                            />
                          </div>
                          <div>
                            <FloatingLabelInput
                              placeholder="SKU"
                              value={product.boxInfo.sku}
                              onChangeCallback={(value) => {
                                setBoxes((prevBoxes) => {
                                  if (
                                    validationErrors[currentBox.id]?.[
                                      `product-${product.id}-sku`
                                    ]
                                  ) {
                                    clearFieldError(
                                      currentBox.id,
                                      `product-${product.id}-sku`
                                    );
                                  }
                                  const updatedBoxes = [...prevBoxes];
                                  if (allBoxesIdentical) {
                                    // Update all boxes in identical mode
                                    updatedBoxes.forEach((box) => {
                                      const foundProduct = box.products.find(
                                        (p) => p.id === product.id
                                      );
                                      if (foundProduct) {
                                        foundProduct.boxInfo.sku = value;
                                      }
                                    });
                                  } else {
                                    // Update only current box
                                    const currentBox = updatedBoxes.find(
                                      (box) => box.id === selectedBox
                                    );
                                    if (currentBox) {
                                      const foundProduct =
                                        currentBox.products.find(
                                          (p) => p.id === product.id
                                        );
                                      if (foundProduct) {
                                        foundProduct.boxInfo.sku = value;
                                      }
                                    }
                                  }
                                  return updatedBoxes;
                                });
                              }}
                              error={
                                validationErrors[currentBox.id]?.[
                                  `product-${product.id}-sku`
                                ] || false
                              }
                              errorMessage="Required"
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
                {allBoxesIdentical
                  ? "Box Info (All Identical)"
                  : `Box ${selectedBox} Info`}
              </div>
              <div className="flex space-x-2 w-full sm:w-auto justify-end">
                <button
                  className={`p-2 ${
                    savedBox
                      ? "text-blue-500 cursor-not-allowed"
                      : "text-gray-500 cursor-pointer"
                  }`}
                  onClick={saveBox}
                  title={savedBox ? "Box saved" : "Save box"}
                  disabled={savedBox}
                >
                  <Bookmark className="w-5 h-5" isFilled={savedBox} />
                </button>
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

            {/* Add Name Input Field with Search */}
            <div className="mb-4 relative" ref={boxSearchRef}>
              <FloatingLabelInput
                placeholder="Box Name"
                value={currentBox.dimensions.name?.toString() || ""}
                onChangeCallback={(value) => {
                  if (validationErrors[currentBox.id]?.[`box-name`]) {
                    clearFieldError(currentBox.id, `box-name`);
                  }
                  handleBoxNameSearch(value);
                }}
                icon={<img src={searchIcon} alt="Search" />}
                error={validationErrors[currentBox.id]?.[`box-name`] || false}
                errorMessage="Box name is required"
              />

              {/* Box Search Results Dropdown */}
              {showBoxSearchResults && filteredBoxResults.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {filteredBoxResults.map((suggestion) => (
                    <div
                      key={suggestion.boxId}
                      className="p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 flex justify-between items-center"
                      onClick={() => selectBoxFromSearch(suggestion)}
                    >
                      <div>
                        <div className="font-medium">{suggestion.name}</div>
                        <div className="text-sm text-gray-600">
                          {suggestion.deadWeight} {suggestion.weightUnit}
                        </div>
                      </div>
                      <div className="text-xs bg-gray-200 px-2 py-1 rounded">
                        {suggestion.length} x {suggestion.breadth} x{" "}
                        {suggestion.height} {suggestion.measureUnit}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <FloatingLabelInput
                  placeholder="L"
                  value={currentBox.dimensions.l.toString()}
                  type="number"
                  onChangeCallback={(value) => { if (validationErrors[currentBox.id]?.[`box-length`]) {
                    clearFieldError(currentBox.id, `box-length`);
                  }  updateBoxDimensions("l", value)}}
                  error={
                    validationErrors[currentBox.id]?.[`box-length`] || false
                  }
                  errorMessage="Required"
                />
              </div>
              <div>
                <FloatingLabelInput
                  placeholder="B"
                  value={currentBox.dimensions.b.toString()}
                  type="number"
                  onChangeCallback={(value) =>{if (validationErrors[currentBox.id]?.[`box-breadth`]) {
                    clearFieldError(currentBox.id, `box-breadth`);
                  } updateBoxDimensions("b", value)}}
                  error={
                    validationErrors[currentBox.id]?.[`box-breadth`] || false
                  }
                  errorMessage="Required"
                />
              </div>
              <div>
                <FloatingLabelInput
                  placeholder="H"
                  value={currentBox.dimensions.h.toString()}
                  type="number"
                  onChangeCallback={(value) => { if (validationErrors[currentBox.id]?.[`box-height`]) {
                    clearFieldError(currentBox.id, `box-height`);
                  } updateBoxDimensions("h", value)}}
                  error={
                    validationErrors[currentBox.id]?.[`box-height`] || false
                  }
                  errorMessage="Required"
                />
              </div>
              <div>
                <FloatingLabelInput
                  placeholder="Weight (kg)"
                  value={currentBox.dimensions.weight.toString()}
                  type="number"
                  onChangeCallback={(value) =>{
                    if (validationErrors[currentBox.id]?.[`box-weight`]) {
                      clearFieldError(currentBox.id, `box-weight`);
                    }
                    updateBoxDimensions("weight", value)}
                  }
                  error={
                    validationErrors[currentBox.id]?.[`box-weight`] || false
                  }
                  errorMessage="Required"
                />
              </div>
            </div>
            {/* New inputs for Total Price and Collectible Amount */}
<div className="grid grid-cols-2 gap-6 mt-6">
  <div>
    <FloatingLabelInput
      placeholder="Total Price"
      value={calculateBoxTotalPrice(currentBox).toString()}
      type="number"
      counter="₹"
      readOnly={true}
    />
  </div>
  <div>
    <FloatingLabelInput
      placeholder="Collectible Amount"
      value={calculateBoxTotalPrice(currentBox).toString()}
      type="number"
      counter="₹"
      readOnly={true}
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
          <div className="p-4 border-b border-gray-200">
            <FloatingLabelInput
              placeholder="Search using Product Name"
              value={searchQuery}
              onChangeCallback={handleSearchChange}
              icon={<img src={searchIcon} alt="Search" />}
            />
          </div>
          <div className="flex-grow p-0 overflow-auto">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <p>Loading products...</p>
              </div>
            ) : filteredCatalogProducts.length === 0 ? (
              <div className="flex justify-center items-center h-full">
                <p>No products found</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredCatalogProducts.map((product: any) => (
                  <div
                    key={product._id}
                    className="p-4 flex justify-between items-center"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium">
                        {product.name || product.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        ₹ {product.unitPrice} | {product.deadWeight} kg |{" "}
                        {product.length} x {product.breadth} x {product.height}
                      </p>
                    </div>
                    {/* <button
                      onClick={() => toggleProductSelection(product._id)}
                      className={`px-4 py-2 rounded-full ${
                        selectedCatalogProducts[product._id]
                          ? "bg-red-500 text-white"
                          : "bg-black text-white"
                      }`}
                    >
                      {selectedCatalogProducts[product._id] ? (
                        <span className="flex items-center">
                          <Trash className="w-4 h-4 mr-1" /> Delete
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <span className="mr-1">+</span> Add
                        </span>
                      )}
                    </button> */}
                    <button
  onClick={() => toggleProductSelection(product._id)}
  className={`px-4 py-2 rounded-full w-24 flex items-center justify-center ${
    selectedCatalogProducts[product._id]
      ? "bg-white text-black border border-black" // Added black border
      : "bg-black text-white"
  }`}
>
  {selectedCatalogProducts[product._id] ? (
    <Trash className="w-4 h-4" /> // Just the trash icon centered
  ) : (
    <span className="flex items-center">
      <span className="mr-1">+</span> Add
    </span>
  )}
</button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="p-4 border-t border-gray-200 flex justify-end">
            <button
              onClick={handleProceedClick}
              className="px-6 py-3 bg-black text-white rounded-full"
            >
              Proceed
            </button>
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
          <div className="p-4 border-b border-gray-200">
            <FloatingLabelInput
              placeholder="Search using name, mobile number, pincode"
              value={boxSearchQuery}
              onChangeCallback={handleBoxSearchChange}
              icon={<img src={searchIcon} alt="Search" />}
            />
          </div>
          <div className="flex-grow p-0 overflow-auto">
            {boxCatalogLoading ? (
              <div className="flex justify-center items-center h-full">
                <p>Loading...</p>
              </div>
            ) : filteredCatalogBoxes.length === 0 ? (
              <div className="flex justify-center items-center h-full">
                <p>No boxes found</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredCatalogBoxes.map((box) => (
                  <div
                    key={box.boxId}
                    className="p-4 flex justify-between items-center"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium">{box.name}</h3>
                      <p className="text-sm text-gray-600">
                        {box.deadWeight} {box.weightUnit} | {box.length} x{" "}
                        {box.breadth} x {box.height} {box.measureUnit}
                      </p>
                    </div>
                    <button
                      onClick={() => handleBoxSelection(box)}
                      className="px-4 py-2 rounded-full bg-black text-white"
                    >
                      <span className="flex items-center">
                        <span className="mr-1">+</span> Add
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CenterModal>

      {/* Confirmation Modal for Identical Boxes */}
      <CenterModal
        isOpen={isConfirmModalOpen}
        onRequestClose={handleCancelIdentical}
        contentLabel="Confirm Identical Boxes"
        shouldCloseOnOverlayClick={true}
        className="!h-auto max-h-80"
      >
        <div className="w-full h-full flex flex-col p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium">Make All Boxes Identical?</h2>
            <button
              onClick={handleCancelIdentical}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
          </div>

          <div className="flex-grow">
            <div className="flex items-center mb-4 bg-blue-50 p-4 rounded-md">
              <Package className="w-6 h-6 mr-3 text-blue-600" />
              <div>
                <p className="text-gray-800 mb-2">
                  You are about to make all {boxCount} boxes identical using the
                  data from{" "}
                  <span className="font-medium">Box {selectedBox}</span>.
                </p>
                <p className="text-gray-600">
                  This will copy all products and properties from Box{" "}
                  {selectedBox} to all other boxes. Any existing data in other
                  boxes will be overwritten.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-4">
            <button
              onClick={handleCancelIdentical}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmIdentical}
              className="px-6 py-2 bg-black text-white rounded-full"
            >
              Proceed
            </button>
          </div>
        </div>
      </CenterModal>
    </div>
  );
};

export default OrderForm;
