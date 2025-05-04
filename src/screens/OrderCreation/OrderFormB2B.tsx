// import { useState, useEffect, useRef } from "react";
// import FloatingLabelInput from "./FloatingLabelInput";
// import { ChevronUp, ChevronDown, Trash, Bookmark, Package } from "./Icons";
// import { POST } from "../../utils/webService";
// import { GET_PRODUCTS, CREATE_BULK_PRODUCT } from "../../utils/ApiUrls";
// import CenterModal from "../../components/CustomModal/customCenterModal";
// import OneButton from "../../components/Button/OneButton";
// import toast from "react-hot-toast";
// import { v4 as uuidv4 } from "uuid";
// import searchIcon from "../../assets/Search.svg";

// // Define types
// interface BoxPackage {
//   id: number;
//   name: string;
//   quantity: string | number;
//   unitPrice: string | number;
//   unitWeight: string | number;
//   totalWeight: string | number;
//   totalPrice: string | number;
//   tax: string | number;
//   discount: string | number;
//   hsn: string;
//   sku: string;
//   length: string | number;
//   breadth: string | number;
//   height: string | number;
//   isExpanded: boolean;
//   isSaved: boolean;
// }

// interface Box {
//   id: number;
//   packages: BoxPackage[];
//   searchQuery: string;
// }

// interface ProductCatalogItem {
//   _id: string;
//   name: string;
//   title?: string;
//   unitPrice: number;
//   deadWeight: number;
//   qty: number;
//   length: number;
//   breadth: number;
//   height: number;
//   unitTax?: number;
//   hsnCode?: string;
//   sku?: string;
// }

// // Add props interface to receive and send data to parent component
// interface OrderFormB2BProps {
//   onBoxDataUpdate?: (boxes: Box[]) => void;
//   validationErrors?: {
//     [boxId: number]: {
//       [fieldId: string]: boolean;
//     };
//   };
// }

// const OrderFormB2B: React.FC<OrderFormB2BProps> = ({ onBoxDataUpdate, validationErrors = {}  }) => {
//   const [boxCount, setBoxCount] = useState<number>(1);
//   const [boxes, setBoxes] = useState<Box[]>([
//     {
//       id: 1,
//       packages: [
//         {
//           id: 1,
//           name: "",
//           quantity: "",
//           unitPrice: "",
//           unitWeight: "",
//           totalWeight: "",
//           totalPrice: "",
//           tax: "0",
//           discount: "0",
//           hsn: "",
//           sku: "",
//           length: "",
//           breadth: "",
//           height: "",
//           isExpanded: true,
//           isSaved: false,
//         },
//       ],
//       searchQuery: "",
//     },
//   ]);

//   // State for package catalog modal
//   const [isPackageCatalogModalOpen, setIsPackageCatalogModalOpen] =
//     useState<boolean>(false);
//   const [currentBoxId, setCurrentBoxId] = useState<number | null>(null);
//   const [currentPackageId, setCurrentPackageId] = useState<number | null>(null);
//   const [catalogProducts, setCatalogProducts] = useState<ProductCatalogItem[]>(
//     []
//   );
//   const [filteredCatalogProducts, setFilteredCatalogProducts] = useState<
//     ProductCatalogItem[]
//   >([]);
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [selectedCatalogProducts, setSelectedCatalogProducts] = useState<{
//     [key: string]: boolean;
//   }>({});
//   const [loading, setLoading] = useState<boolean>(false);

//   // State for package name inline search
//   const [packageNameSearch, setPackageNameSearch] = useState<{
//     [packageId: string]: string;
//   }>({});
//   const [showPackageSearchResults, setShowPackageSearchResults] = useState<{
//     [packageId: string]: boolean;
//   }>({});
//   const [filteredPackageResults, setFilteredPackageResults] = useState<{
//     [packageId: string]: ProductCatalogItem[];
//   }>({});

//   // Ref for handling click outside search results
//   const packageSearchRefs = useRef<{
//     [packageId: string]: HTMLDivElement | null;
//   }>({});

//   // Notify parent component when box data changes
// //   useEffect(() => {
// //     if (onBoxDataUpdate) {
// //       // Only pass the required box data without the searchQuery field
// //       const boxesForParent = boxes.map((box) => ({
// //         id: box.id,
// //         packages: box.packages,
// //       }));
// //       onBoxDataUpdate(boxesForParent as Box[]);
// //     }
// //   }, [boxes, onBoxDataUpdate]);
// // Notify parent component when box data changes
// useEffect(() => {
//     if (onBoxDataUpdate) {
//       // Pass the complete boxes data to the parent component
//       onBoxDataUpdate(boxes);
//     }
//   }, [boxes, onBoxDataUpdate]);

//   // Handle click outside search results
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       // Close all package search results when clicking outside
//       Object.keys(showPackageSearchResults).forEach((packageId) => {
//         if (
//           packageSearchRefs.current[packageId] &&
//           !packageSearchRefs.current[packageId]?.contains(event.target as Node)
//         ) {
//           setShowPackageSearchResults((prev) => ({
//             ...prev,
//             [packageId]: false,
//           }));
//         }
//       });
//     }

    

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showPackageSearchResults]);

//   // Handle box count changes
//   const decreaseBoxCount = (): void => {
//     if (boxCount > 1) {
//       const newCount = boxCount - 1;
//       setBoxCount(newCount);
//       setBoxes((prev) => prev.filter((box) => box.id <= newCount));
//     }
//   };

//   const increaseBoxCount = (): void => {
//     const newCount = boxCount + 1;
//     setBoxCount(newCount);

//     // Add a new box with default package
//     setBoxes((prev) => [
//       ...prev,
//       {
//         id: newCount,
//         packages: [
//           {
//             id: 1,
//             name: "",
//             quantity: "",
//             unitPrice: "",
//             unitWeight: "",
//             totalWeight: "",
//             totalPrice: "",
//             tax: "0",
//             discount: "0",
//             hsn: "",
//             sku: "",
//             length: "",
//             breadth: "",
//             height: "",
//             isExpanded: true,
//             isSaved: false,
//           },
//         ],
//         searchQuery: "",
//       },
//     ]);
//   };

//   // Toggle package expanded state
//   const togglePackageExpansion = (boxId: number, packageId: number): void => {
//     setBoxes((prevBoxes) =>
//       prevBoxes.map((box) => {
//         if (box.id === boxId) {
//           return {
//             ...box,
//             packages: box.packages.map((pkg) => {
//               if (pkg.id === packageId) {
//                 return {
//                   ...pkg,
//                   isExpanded: !pkg.isExpanded,
//                 };
//               }
//               return pkg;
//             }),
//           };
//         }
//         return box;
//       })
//     );
//   };

//   // Add new package to a box
//   const addNewPackage = (boxId: number): void => {
//     setBoxes((prevBoxes) =>
//       prevBoxes.map((box) => {
//         if (box.id === boxId) {
//           const newPackageId = Math.max(...box.packages.map((p) => p.id)) + 1;
//           return {
//             ...box,
//             packages: [
//               ...box.packages,
//               {
//                 id: newPackageId,
//                 name: "",
//                 quantity: "",
//                 unitPrice: "",
//                 unitWeight: "",
//                 totalWeight: "",
//                 totalPrice: "",
//                 tax: "0",
//                 discount: "0",
//                 hsn: "",
//                 sku: "",
//                 length: "",
//                 breadth: "",
//                 height: "",
//                 isExpanded: true,
//                 isSaved: false,
//               },
//             ],
//           };
//         }
//         return box;
//       })
//     );
//   };

//   // Remove a package from a box - modified to prevent deletion of first package
//   const removePackage = (boxId: number, packageId: number): void => {
//     // Don't allow deletion of the first package (ID 1)
//     if (packageId === 1) {
//       toast.error("First package cannot be deleted");
//       return;
//     }

//     setBoxes((prevBoxes) =>
//       prevBoxes.map((box) => {
//         if (box.id === boxId) {
//           // Only remove if there's more than one package
//           if (box.packages.length > 1) {
//             return {
//               ...box,
//               packages: box.packages.filter((pkg) => pkg.id !== packageId),
//             };
//           }
//         }
//         return box;
//       })
//     );
//   };

//   // Update package field
//   const updatePackageField = (
//     boxId: number,
//     packageId: number,
//     field: keyof BoxPackage,
//     value: string
//   ): void => {
//     setBoxes((prevBoxes) =>
//       prevBoxes.map((box) => {
//         if (box.id === boxId) {
//           return {
//             ...box,
//             packages: box.packages.map((pkg) => {
//               if (pkg.id === packageId) {
//                 const updatedPackage = {
//                   ...pkg,
//                   [field]: value,
//                 };

//                 // Calculate total price and weight if quantity, unitPrice, or unitWeight changes
//                 if (
//                   field === "quantity" ||
//                   field === "unitPrice" ||
//                   field === "unitWeight"
//                 ) {
//                   const qty =
//                     Number(field === "quantity" ? value : pkg.quantity) || 0;
//                   const unitPrice =
//                     Number(field === "unitPrice" ? value : pkg.unitPrice) || 0;
//                   const unitWeight =
//                     Number(field === "unitWeight" ? value : pkg.unitWeight) ||
//                     0;

//                   updatedPackage.totalPrice = qty * unitPrice;
//                   updatedPackage.totalWeight = qty * unitWeight;
//                 }

//                 // If we're manually editing the package, remove saved status
//                 if (field === "name") {
//                   updatedPackage.isSaved = false;
//                 }

//                 return updatedPackage;
//               }
//               return pkg;
//             }),
//           };
//         }
//         return box;
//       })
//     );
//   };

//   // Update search query for a box
//   const updateBoxSearchQuery = (boxId: number, query: string): void => {
//     setBoxes((prevBoxes) =>
//       prevBoxes.map((box) => {
//         if (box.id === boxId) {
//           return {
//             ...box,
//             searchQuery: query,
//           };
//         }
//         return box;
//       })
//     );
//   };

//   // Filter packages based on search query for a box
//   const getFilteredPackages = (box: Box): BoxPackage[] => {
//     if (!box.searchQuery.trim()) {
//       return box.packages;
//     }

//     const query = box.searchQuery.toLowerCase();
//     return box.packages.filter((pkg) =>
//       pkg.name.toString().toLowerCase().includes(query)
//     );
//   };

//   // Handle package name search input
//   const handlePackageNameSearch = (
//     boxId: number,
//     packageId: number,
//     value: string
//   ) => {
//     // Update the package name in the state directly
//     updatePackageField(boxId, packageId, "name", value);

//     // Also update our search tracking state
//     const uniqueId = `${boxId}-${packageId}`;
//     setPackageNameSearch((prev) => ({
//       ...prev,
//       [uniqueId]: value,
//     }));

//     // Show search results dropdown
//     setShowPackageSearchResults((prev) => ({
//       ...prev,
//       [uniqueId]: true,
//     }));

//     // Filter products based on search input
//     if (value.trim() === "") {
//       setFilteredPackageResults((prev) => ({
//         ...prev,
//         [uniqueId]: [],
//       }));
//     } else {
//       // Get filtered products from the catalog
//       const filtered = catalogProducts.filter(
//         (product) =>
//           product.name?.toLowerCase().includes(value.toLowerCase()) ||
//           product.title?.toLowerCase().includes(value.toLowerCase())
//       );

//       setFilteredPackageResults((prev) => ({
//         ...prev,
//         [uniqueId]: filtered.slice(0, 5), // Limit to top 5 matches
//       }));

//       // If we don't have catalog products locally, fetch them
//       if (catalogProducts.length === 0) {
//         fetchCatalogProducts();
//       }
//     }
//   };

//   // Select a package from search results
//   const selectPackageFromSearch = (
//     boxId: number,
//     packageId: number,
//     product: ProductCatalogItem
//   ) => {
//     // Update the package with the selected product
//     setBoxes((prevBoxes) =>
//       prevBoxes.map((box) => {
//         if (box.id === boxId) {
//           return {
//             ...box,
//             packages: box.packages.map((pkg) => {
//               if (pkg.id === packageId) {
//                 return {
//                   ...pkg,
//                   name: product.name || product.title || "",
//                   quantity: product.qty || 1,
//                   unitPrice: product.unitPrice || 0,
//                   unitWeight: product.deadWeight || 0,
//                   totalPrice: (product.qty || 1) * (product.unitPrice || 0),
//                   totalWeight: (product.qty || 1) * (product.deadWeight || 0),
//                   tax: product.unitTax?.toString() || "0",
//                   hsn: product.hsnCode || "",
//                   sku: product.sku || "",
//                   length: product.length || "",
//                   breadth: product.breadth || "",
//                   height: product.height || "",
//                   isSaved: true,
//                 };
//               }
//               return pkg;
//             }),
//           };
//         }
//         return box;
//       })
//     );

//     // Close the search results dropdown
//     const uniqueId = `${boxId}-${packageId}`;
//     setShowPackageSearchResults((prev) => ({
//       ...prev,
//       [uniqueId]: false,
//     }));
//   };

//   // Fetch catalog products if not already loaded
//   const fetchCatalogProducts = async () => {
//     setLoading(true);
//     try {
//       const payload = {
//         skip: 0,
//         limit: 1000,
//         pageNo: 1,
//         sort: { _id: -1 },
//         searchValue: "",
//       };

//       const response = await POST(GET_PRODUCTS, payload);

//       if (response?.data?.success) {
//         setCatalogProducts(response.data.data);
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Open package catalog modal
//   const openPackageCatalogModal = async (boxId: number, packageId: number) => {
//     setCurrentBoxId(boxId);
//     setCurrentPackageId(packageId);
//     setIsPackageCatalogModalOpen(true);
//     setSearchQuery("");
//     setSelectedCatalogProducts({});

//     // Fetch products from API
//     setLoading(true);
//     try {
//       const payload = {
//         skip: 0,
//         limit: 1000,
//         pageNo: 1,
//         sort: { _id: -1 },
//         searchValue: "",
//       };

//       const response = await POST(GET_PRODUCTS, payload);

//       if (response?.data?.success) {
//         setCatalogProducts(response.data.data);
//         setFilteredCatalogProducts(response.data.data);
//       } else {
//         setCatalogProducts([]);
//         setFilteredCatalogProducts([]);
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       setCatalogProducts([]);
//       setFilteredCatalogProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Close package catalog modal
//   const closePackageCatalogModal = () => {
//     setIsPackageCatalogModalOpen(false);
//   };

//   // Handle search in catalog
//   const handleSearchChange = (value: string) => {
//     setSearchQuery(value);
//     if (value.trim() === "") {
//       setFilteredCatalogProducts(catalogProducts);
//     } else {
//       const filtered = catalogProducts.filter(
//         (product) =>
//           product.name?.toLowerCase().includes(value.toLowerCase()) ||
//           product.title?.toLowerCase().includes(value.toLowerCase())
//       );
//       setFilteredCatalogProducts(filtered);
//     }
//   };

//   // Toggle product selection in catalog
//   const toggleProductSelection = (productId: string) => {
//     setSelectedCatalogProducts((prev) => ({
//       ...prev,
//       [productId]: !prev[productId],
//     }));
//   };

//   // Handle "Proceed" click in catalog modal
//   const handleProceedClick = () => {
//     // Get all selected products
//     const selectedProducts = catalogProducts.filter(
//       (product) => selectedCatalogProducts[product._id]
//     );

//     if (selectedProducts.length > 0 && currentBoxId && currentPackageId) {
//       setBoxes((prevBoxes) => {
//         return prevBoxes.map((box) => {
//           if (box.id === currentBoxId) {
//             // Instead of adding multiple products, replace the current package with the first selected product
//             const selectedProduct = selectedProducts[0];

//             return {
//               ...box,
//               packages: box.packages.map((pkg) => {
//                 if (pkg.id === currentPackageId) {
//                   return {
//                     ...pkg,
//                     name: selectedProduct.name || selectedProduct.title || "",
//                     quantity: selectedProduct.qty || 1,
//                     unitPrice: selectedProduct.unitPrice || 0,
//                     unitWeight: selectedProduct.deadWeight || 0,
//                     totalPrice:
//                       (selectedProduct.qty || 1) *
//                       (selectedProduct.unitPrice || 0),
//                     totalWeight:
//                       (selectedProduct.qty || 1) *
//                       (selectedProduct.deadWeight || 0),
//                     tax: selectedProduct.unitTax?.toString() || "0",
//                     hsn: selectedProduct.hsnCode || "",
//                     sku: selectedProduct.sku || "",
//                     length: selectedProduct.length || "",
//                     breadth: selectedProduct.breadth || "",
//                     height: selectedProduct.height || "",
//                     isSaved: true,
//                   };
//                 }
//                 return pkg;
//               }),
//             };
//           }
//           return box;
//         });
//       });
//     }

//     // Close the modal
//     closePackageCatalogModal();
//   };

//   // Save package
//   const savePackage = async (boxId: number, packageId: number) => {
//     // Find the package to save
//     const box = boxes.find((b) => b.id === boxId);
//     const packageToSave = box?.packages.find((p) => p.id === packageId);

//     if (!packageToSave) {
//       toast.error("Package not found");
//       return;
//     }

//     // If already saved, don't save again
//     if (packageToSave.isSaved) {
//       return;
//     }

//     try {
//       setLoading(true);

//       // Prepare the payload
//       const payload = {
//         products: [
//           {
//             productId: uuidv4(),
//             name: packageToSave.name,
//             category: "Health & Beauty", // Using default category
//             qty: Number(packageToSave.quantity) || 1,
//             unitPrice: Number(packageToSave.unitPrice) || 0,
//             unitTax: Number(packageToSave.tax) || 0,
//             deadWeight: Number(packageToSave.unitWeight) || 0,
//             length: packageToSave.length.toString(),
//             breadth: packageToSave.breadth.toString(),
//             height: packageToSave.height.toString(),
//             sku: packageToSave.sku || "",
//             measureUnit: "cm",
//             weightUnit: "kg",
//             currency: "INR",
//             divisor: "5000",
//             images: [],
//             // Include other required fields
//             appliedWeight: 0,
//             volumetricWeight: 0,
//           },
//         ],
//       };

//       // Call the API
//       const response = await POST(CREATE_BULK_PRODUCT, payload);

//       if (response?.data?.success) {
//         toast.success("Package saved successfully!");

//         // Update the saved state for this package
//         setBoxes((prevBoxes) =>
//           prevBoxes.map((box) => {
//             if (box.id === boxId) {
//               return {
//                 ...box,
//                 packages: box.packages.map((pkg) => {
//                   if (pkg.id === packageId) {
//                     return {
//                       ...pkg,
//                       isSaved: true,
//                     };
//                   }
//                   return pkg;
//                 }),
//               };
//             }
//             return box;
//           })
//         );
//       } else {
//         toast.error(response?.data?.message || "Failed to save package");
//       }
//     } catch (error) {
//       console.error("Error saving package:", error);
//       toast.error("An error occurred while saving the package");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add this function to delete a specific box
//   const deleteBox = (boxId: any) => {
//     // Don't allow deletion if there's only one box
//     if (boxCount <= 1) {
//       toast.error("At least one box is required");
//       return;
//     }

//     // Remove the box from the boxes array
//     setBoxes((prevBoxes) => prevBoxes.filter((box) => box.id !== boxId));

//     // Decrease the box count
//     setBoxCount((prevCount) => prevCount - 1);
//   };

//   return (
//     <div className="max-w-full w-full mx-auto p-4 bg-gray-50">
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
//       </div>

//       {/* Boxes */}
//       <div className="space-y-6">
//         {boxes.map((box) => (
//           <div key={box.id}>
//             <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
//               {/* Packages - filtered by search query */}
//               {/* Packages - filtered by search query */}
//               {getFilteredPackages(box).map((pkg) => (
//                 <div
//                   key={pkg.id}
//                   className="p-4 border-b border-gray-200 last:border-b-0"
//                 >
//                   {/* Box name with expand/collapse button */}
//                   <div className="flex justify-between items-center">
//                     <h4 className="font-medium text-gray-800">Box {box.id}</h4>
//                     <button
//                       onClick={() => togglePackageExpansion(box.id, pkg.id)}
//                       className="text-gray-500"
//                     >
//                       {pkg.isExpanded ? (
//                         <ChevronUp className="w-5 h-5" />
//                       ) : (
//                         <ChevronDown className="w-5 h-5" />
//                       )}
//                     </button>
//                   </div>

//                   {/* All content inside expanded section */}
//                   {pkg.isExpanded && (
//                     <div className="mt-4">
//                       {/* First row has package name, qty, unit price, unit weight on left and action buttons on right */}
//                       <div className="flex items-center mb-4">
//                         {/* Left side inputs */}
//                         <div className="flex-grow flex items-center space-x-3">
//                           {/* Package Name with search dropdown */}
//                           <div
//                             className="w-[25%] relative"
//                             ref={(el) =>
//                               (packageSearchRefs.current[
//                                 `${box.id}-${pkg.id}`
//                               ] = el)
//                             }
//                           >
//                             <FloatingLabelInput
//                               placeholder="Package Name"
//                               value={pkg.name.toString()}
//                               onChangeCallback={(value) =>
//                                 handlePackageNameSearch(box.id, pkg.id, value)
//                               }
//                               icon={<img src={searchIcon} alt="Search" />}
//                             />

//                             {/* Package Name Search Results Dropdown */}
//                             {showPackageSearchResults[`${box.id}-${pkg.id}`] &&
//                               filteredPackageResults[`${box.id}-${pkg.id}`]
//                                 ?.length > 0 && (
//                                 <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
//                                   {filteredPackageResults[
//                                     `${box.id}-${pkg.id}`
//                                   ].map((product) => (
//                                     <div
//                                       key={product._id}
//                                       className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 flex justify-between items-center"
//                                       onClick={() =>
//                                         selectPackageFromSearch(
//                                           box.id,
//                                           pkg.id,
//                                           product
//                                         )
//                                       }
//                                     >
//                                       <div>
//                                         <div className="font-medium">
//                                           {product.name || product.title}
//                                         </div>
//                                         <div className="text-sm text-gray-600">
//                                           ₹ {product.unitPrice} |{" "}
//                                           {product.deadWeight} kg
//                                         </div>
//                                       </div>
//                                       <div className="text-xs bg-gray-200 px-2 py-1 rounded">
//                                         {product.length} x {product.breadth} x{" "}
//                                         {product.height}
//                                       </div>
//                                     </div>
//                                   ))}
//                                 </div>
//                               )}
//                           </div>

//                           {/* Qty input */}
//                           <div className="w-[10%]">
//                             <FloatingLabelInput
//                               placeholder="Qty"
//                               value={pkg.quantity.toString()}
//                               type="number"
//                               onChangeCallback={(value) =>
//                                 updatePackageField(
//                                   box.id,
//                                   pkg.id,
//                                   "quantity",
//                                   value
//                                 )
//                               }
//                             />
//                           </div>

//                           {/* Unit Price input */}
//                           <div className="w-[10%]">
//                             <FloatingLabelInput
//                               placeholder="Unit Price"
//                               value={pkg.unitPrice.toString()}
//                               type="number"
//                               onChangeCallback={(value) =>
//                                 updatePackageField(
//                                   box.id,
//                                   pkg.id,
//                                   "unitPrice",
//                                   value
//                                 )
//                               }
//                             />
//                           </div>

//                           {/* Unit Weight input */}
//                           <div className="w-[12%]">
//                             <FloatingLabelInput
//                               placeholder="Unit Wt (kg)"
//                               value={pkg.unitWeight.toString()}
//                               type="number"
//                               onChangeCallback={(value) =>
//                                 updatePackageField(
//                                   box.id,
//                                   pkg.id,
//                                   "unitWeight",
//                                   value
//                                 )
//                               }
//                             />
//                           </div>
//                         </div>

//                         {/* Right side buttons */}
//                         <div className="flex items-center space-x-2 ml-3">
//                           <button
//                             className={`p-2 ${
//                               pkg.isSaved
//                                 ? "text-blue-500 cursor-not-allowed"
//                                 : "text-gray-500 cursor-pointer"
//                             }`}
//                             onClick={() => savePackage(box.id, pkg.id)}
//                             title={
//                               pkg.isSaved ? "Package saved" : "Save package"
//                             }
//                             disabled={pkg.isSaved}
//                           >
//                             <Bookmark
//                               isFilled={pkg.isSaved}
//                               className="w-5 h-5"
//                             />
//                           </button>
//                           {/* <button
//               onClick={() => removePackage(box.id, pkg.id)}
//               className={`p-2 ${pkg.id === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-500 cursor-pointer"}`}
//               title={pkg.id === 1 ? "First package cannot be deleted" : "Delete package"}
//               disabled={pkg.id === 1}
//             >
//               <Trash className="w-5 h-5" />
//             </button> */}
//                           <button
//                             onClick={() => deleteBox(box.id)}
//                             className={`p-2 ${
//                               boxCount <= 1
//                                 ? "text-gray-300 cursor-not-allowed"
//                                 : "text-gray-500 cursor-pointer"
//                             }`}
//                             title={
//                               boxCount <= 1
//                                 ? "Cannot delete the only box"
//                                 : "Delete box"
//                             }
//                             disabled={boxCount <= 1}
//                           >
//                             <Trash className="w-5 h-5" />
//                           </button>
//                           <OneButton
//                             text="Package Catalog"
//                             onClick={() =>
//                               openPackageCatalogModal(box.id, pkg.id)
//                             }
//                             variant="secondary"
//                             className="!rounded-full"
//                             showIcon={true}
//                             icon={<Package className="w-4 h-4" />}
//                           />
//                         </div>
//                       </div>

//                       {/* Second row with remaining inputs */}
//                       {/* <div className="grid grid-cols-12 gap-4 mb-4">
//           <div className="col-span-2">
//             <FloatingLabelInput
//               placeholder="Tax"
//               value={pkg.tax.toString()}
//               type="number"
//               onChangeCallback={(value) => updatePackageField(box.id, pkg.id, "tax", value)}
//             />
//           </div>
//           <div className="col-span-2">
//             <FloatingLabelInput
//               placeholder="Disc % (₹)"
//               value={pkg.discount.toString()}
//               type="number"
//               onChangeCallback={(value) => updatePackageField(box.id, pkg.id, "discount", value)}
//             />
//           </div>
//           <div className="col-span-2">
//             <FloatingLabelInput
//               placeholder="HSN"
//               value={pkg.hsn}
//               onChangeCallback={(value) => updatePackageField(box.id, pkg.id, "hsn", value)}
//             />
//           </div>
//           <div className="col-span-2">
//             <FloatingLabelInput
//               placeholder="SKU"
//               value={pkg.sku}
//               onChangeCallback={(value) => updatePackageField(box.id, pkg.id, "sku", value)}
//             />
//           </div>
//           <div className="col-span-2">
//             <FloatingLabelInput
//               placeholder="Total Wt (kg)"
//               value={pkg.totalWeight.toString()}
//               type="number"
//               counter="kg"
//             />
//           </div>
//           <div className="col-span-2">
//             <FloatingLabelInput
//               placeholder="Total Price"
//               value={pkg.totalPrice.toString()}
//               type="number"
//               counter="₹"
//             />
//           </div>
//         </div>

        
//         <div className="grid grid-cols-12 gap-4">
//           <div className="col-span-1">
//             <FloatingLabelInput
//               placeholder="L"
//               value={pkg.length.toString()}
//               type="number"
//               onChangeCallback={(value) => updatePackageField(box.id, pkg.id, "length", value)}
//             />
//           </div>
//           <div className="col-span-1">
//             <FloatingLabelInput
//               placeholder="B"
//               value={pkg.breadth.toString()}
//               type="number"
//               onChangeCallback={(value) => updatePackageField(box.id, pkg.id, "breadth", value)}
//             />
//           </div>
//           <div className="col-span-1">
//             <FloatingLabelInput
//               placeholder="H"
//               value={pkg.height.toString()}
//               type="number"
//               onChangeCallback={(value) => updatePackageField(box.id, pkg.id, "height", value)}
//             />
//           </div>
          
//         </div> */}

//                       {/* All inputs in a single flex row */}
//                       <div className="flex flex-wrap gap-4 mb-4 pl-72">
//                         <div className="!w-[5%]">
//                           <FloatingLabelInput
//                             placeholder="Tax"
//                             value={pkg.tax.toString()}
//                             type="number"
//                             onChangeCallback={(value) =>
//                               updatePackageField(box.id, pkg.id, "tax", value)
//                             }
//                           />
//                         </div>
//                         <div className="w-[8%]">
//                           <FloatingLabelInput
//                             placeholder="Disc % (₹)"
//                             value={pkg.discount.toString()}
//                             type="number"
//                             onChangeCallback={(value) =>
//                               updatePackageField(
//                                 box.id,
//                                 pkg.id,
//                                 "discount",
//                                 value
//                               )
//                             }
//                           />
//                         </div>
//                         <div className="w-[8%]">
//                           <FloatingLabelInput
//                             placeholder="HSN"
//                             value={pkg.hsn}
//                             onChangeCallback={(value) =>
//                               updatePackageField(box.id, pkg.id, "hsn", value)
//                             }
//                           />
//                         </div>
//                         <div className="w-[8%]">
//                           <FloatingLabelInput
//                             placeholder="SKU"
//                             value={pkg.sku}
//                             onChangeCallback={(value) =>
//                               updatePackageField(box.id, pkg.id, "sku", value)
//                             }
//                           />
//                         </div>
//                         <div className="w-[13%]">
//                           <FloatingLabelInput
//                             placeholder="Total Wt (kg)"
//                             value={pkg.totalWeight.toString()}
//                             type="number"
//                             counter="kg"
//                           />
//                         </div>
//                         <div className="w-[12%]">
//                           <FloatingLabelInput
//                             placeholder="Total Price"
//                             value={pkg.totalPrice.toString()}
//                             type="number"
//                             counter="₹"
//                           />
//                         </div>
//                         <div className="w-[5%]">
//                           <FloatingLabelInput
//                             placeholder="L"
//                             value={pkg.length.toString()}
//                             type="number"
//                             onChangeCallback={(value) =>
//                               updatePackageField(
//                                 box.id,
//                                 pkg.id,
//                                 "length",
//                                 value
//                               )
//                             }
//                           />
//                         </div>
//                         <div className="w-[5%]">
//                           <FloatingLabelInput
//                             placeholder="B"
//                             value={pkg.breadth.toString()}
//                             type="number"
//                             onChangeCallback={(value) =>
//                               updatePackageField(
//                                 box.id,
//                                 pkg.id,
//                                 "breadth",
//                                 value
//                               )
//                             }
//                           />
//                         </div>
//                         <div className="w-[5%]">
//                           <FloatingLabelInput
//                             placeholder="H"
//                             value={pkg.height.toString()}
//                             type="number"
//                             onChangeCallback={(value) =>
//                               updatePackageField(
//                                 box.id,
//                                 pkg.id,
//                                 "height",
//                                 value
//                               )
//                             }
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Package Catalog Modal */}
//       <CenterModal
//         isOpen={isPackageCatalogModalOpen}
//         onRequestClose={closePackageCatalogModal}
//         contentLabel="Package Catalog"
//         shouldCloseOnOverlayClick={true}
//       >
//         <div className="w-full h-full flex flex-col">
//           <div className="flex justify-between items-center p-4 border-b border-gray-200">
//             <h2 className="text-xl font-medium">Package Catalog</h2>
//             <button
//               onClick={closePackageCatalogModal}
//               className="text-gray-500 hover:text-gray-700 text-xl"
//             >
//               ×
//             </button>
//           </div>
//           <div className="p-4 border-b border-gray-200">
//             <FloatingLabelInput
//               placeholder="Search using Package Name"
//               value={searchQuery}
//               onChangeCallback={handleSearchChange}
//               icon={<img src={searchIcon} alt="Search" />}
//             />
//           </div>
//           <div className="flex-grow p-0 overflow-auto">
//             {loading ? (
//               <div className="flex justify-center items-center h-full">
//                 <p>Loading packages...</p>
//               </div>
//             ) : filteredCatalogProducts.length === 0 ? (
//               <div className="flex justify-center items-center h-full">
//                 <p>No packages found</p>
//               </div>
//             ) : (
//               <div className="divide-y divide-gray-200">
//                 {filteredCatalogProducts.map((product: any) => (
//                   <div
//                     key={product._id}
//                     className="p-4 flex justify-between items-center"
//                   >
//                     <div className="flex-1">
//                       <h3 className="font-medium">
//                         {product.name || product.title}
//                       </h3>
//                       <p className="text-sm text-gray-600">
//                         ₹ {product.unitPrice} | {product.deadWeight} kg |{" "}
//                         {product.length} x {product.breadth} x {product.height}
//                       </p>
//                     </div>
//                     <button
//                       onClick={() => toggleProductSelection(product._id)}
//                       className={`px-4 py-2 rounded-full ${
//                         selectedCatalogProducts[product._id]
//                           ? "bg-red-500 text-white"
//                           : "bg-black text-white"
//                       }`}
//                     >
//                       {selectedCatalogProducts[product._id] ? (
//                         <span className="flex items-center">
//                           <Trash className="w-4 h-4 mr-1" /> Delete
//                         </span>
//                       ) : (
//                         <span className="flex items-center">
//                           <span className="mr-1">+</span> Add
//                         </span>
//                       )}
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//           <div className="p-4 border-t border-gray-200 flex justify-end">
//             <button
//               onClick={handleProceedClick}
//               className="px-6 py-3 bg-black text-white rounded-full"
//             >
//               Proceed
//             </button>
//           </div>
//         </div>
//       </CenterModal>
//     </div>
//   );
// };

// export default OrderFormB2B;


import { useState, useEffect, useRef } from "react";
import FloatingLabelInput from "./FloatingLabelInput";
import { ChevronUp, ChevronDown, Trash, Bookmark, Package } from "./Icons";
import { POST } from "../../utils/webService";
import { GET_PRODUCTS, CREATE_BULK_PRODUCT } from "../../utils/ApiUrls";
import CenterModal from "../../components/CustomModal/customCenterModal";
import OneButton from "../../components/Button/OneButton";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import searchIcon from "../../assets/Search.svg";

// Define types
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

interface Box {
  id: number;
  packages: BoxPackage[];
  searchQuery: string;
}

interface ProductCatalogItem {
  _id: string;
  name: string;
  title?: string;
  unitPrice: number;
  deadWeight: number;
  qty: number;
  length: number;
  breadth: number;
  height: number;
  unitTax?: number;
  hsnCode?: string;
  sku?: string;
}

// Add props interface to receive and send data to parent component
interface OrderFormB2BProps {
  onBoxDataUpdate?: (boxes: Box[]) => void;
  validationErrors?: {
    [boxId: number]: {
      [fieldId: string]: boolean;
    };
  };
  clearFieldError?: (boxId: number, fieldId: string) => void;

}

const OrderFormB2B: React.FC<OrderFormB2BProps> = ({ onBoxDataUpdate, validationErrors = {},clearFieldError = () => {}  }) => {
  const [boxCount, setBoxCount] = useState<number>(1);
  const [boxes, setBoxes] = useState<Box[]>([
    {
      id: 1,
      packages: [
        {
          id: 1,
          name: "",
          quantity: "",
          unitPrice: "",
          unitWeight: "",
          totalWeight: "",
          totalPrice: "",
          tax: "0",
          discount: "0",
          hsn: "",
          sku: "",
          length: "",
          breadth: "",
          height: "",
          isExpanded: true,
          isSaved: false,
        },
      ],
      searchQuery: "",
    },
  ]);

  // State for package catalog modal
  const [isPackageCatalogModalOpen, setIsPackageCatalogModalOpen] =
    useState<boolean>(false);
  const [currentBoxId, setCurrentBoxId] = useState<number | null>(null);
  const [currentPackageId, setCurrentPackageId] = useState<number | null>(null);
  const [catalogProducts, setCatalogProducts] = useState<ProductCatalogItem[]>(
    []
  );
  const [filteredCatalogProducts, setFilteredCatalogProducts] = useState<
    ProductCatalogItem[]
  >([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCatalogProducts, setSelectedCatalogProducts] = useState<{
    [key: string]: boolean;
  }>({});
  const [loading, setLoading] = useState<boolean>(false);

  // State for package name inline search
  const [packageNameSearch, setPackageNameSearch] = useState<{
    [packageId: string]: string;
  }>({});
  const [showPackageSearchResults, setShowPackageSearchResults] = useState<{
    [packageId: string]: boolean;
  }>({});
  const [filteredPackageResults, setFilteredPackageResults] = useState<{
    [packageId: string]: ProductCatalogItem[];
  }>({});

  // Ref for handling click outside search results
  const packageSearchRefs = useRef<{
    [packageId: string]: HTMLDivElement | null;
  }>({});

  // Notify parent component when box data changes
//   useEffect(() => {
//     if (onBoxDataUpdate) {
//       // Only pass the required box data without the searchQuery field
//       const boxesForParent = boxes.map((box) => ({
//         id: box.id,
//         packages: box.packages,
//       }));
//       onBoxDataUpdate(boxesForParent as Box[]);
//     }
//   }, [boxes, onBoxDataUpdate]);
// Notify parent component when box data changes
useEffect(() => {
    if (onBoxDataUpdate) {
      // Pass the complete boxes data to the parent component
      onBoxDataUpdate(boxes);
    }
  }, [boxes, onBoxDataUpdate]);

  // Handle click outside search results
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Close all package search results when clicking outside
      Object.keys(showPackageSearchResults).forEach((packageId) => {
        if (
          packageSearchRefs.current[packageId] &&
          !packageSearchRefs.current[packageId]?.contains(event.target as Node)
        ) {
          setShowPackageSearchResults((prev) => ({
            ...prev,
            [packageId]: false,
          }));
        }
      });
    }

    

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPackageSearchResults]);

  // Handle box count changes
  const decreaseBoxCount = (): void => {
    if (boxCount > 1) {
      const newCount = boxCount - 1;
      setBoxCount(newCount);
      setBoxes((prev) => prev.filter((box) => box.id <= newCount));
    }
  };

  const increaseBoxCount = (): void => {
    const newCount = boxCount + 1;
    setBoxCount(newCount);

    // Add a new box with default package
    setBoxes((prev) => [
      ...prev,
      {
        id: newCount,
        packages: [
          {
            id: 1,
            name: "",
            quantity: "",
            unitPrice: "",
            unitWeight: "",
            totalWeight: "",
            totalPrice: "",
            tax: "0",
            discount: "0",
            hsn: "",
            sku: "",
            length: "",
            breadth: "",
            height: "",
            isExpanded: true,
            isSaved: false,
          },
        ],
        searchQuery: "",
      },
    ]);
  };

  // Toggle package expanded state
  const togglePackageExpansion = (boxId: number, packageId: number): void => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) => {
        if (box.id === boxId) {
          return {
            ...box,
            packages: box.packages.map((pkg) => {
              if (pkg.id === packageId) {
                return {
                  ...pkg,
                  isExpanded: !pkg.isExpanded,
                };
              }
              return pkg;
            }),
          };
        }
        return box;
      })
    );
  };

  // Add new package to a box
  const addNewPackage = (boxId: number): void => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) => {
        if (box.id === boxId) {
          const newPackageId = Math.max(...box.packages.map((p) => p.id)) + 1;
          return {
            ...box,
            packages: [
              ...box.packages,
              {
                id: newPackageId,
                name: "",
                quantity: "",
                unitPrice: "",
                unitWeight: "",
                totalWeight: "",
                totalPrice: "",
                tax: "0",
                discount: "0",
                hsn: "",
                sku: "",
                length: "",
                breadth: "",
                height: "",
                isExpanded: true,
                isSaved: false,
              },
            ],
          };
        }
        return box;
      })
    );
  };

  // Remove a package from a box - modified to prevent deletion of first package
  const removePackage = (boxId: number, packageId: number): void => {
    // Don't allow deletion of the first package (ID 1)
    if (packageId === 1) {
      toast.error("First package cannot be deleted");
      return;
    }

    setBoxes((prevBoxes) =>
      prevBoxes.map((box) => {
        if (box.id === boxId) {
          // Only remove if there's more than one package
          if (box.packages.length > 1) {
            return {
              ...box,
              packages: box.packages.filter((pkg) => pkg.id !== packageId),
            };
          }
        }
        return box;
      })
    );
  };

  // Update package field
  const updatePackageField = (
    boxId: number,
    packageId: number,
    field: keyof BoxPackage,
    value: string
  ): void => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) => {
        if (box.id === boxId) {
          return {
            ...box,
            packages: box.packages.map((pkg) => {
              if (pkg.id === packageId) {
                const updatedPackage = {
                  ...pkg,
                  [field]: value,
                };

                // Calculate total price and weight if quantity, unitPrice, or unitWeight changes
                if (
                  field === "quantity" ||
                  field === "unitPrice" ||
                  field === "unitWeight"
                ) {
                  const qty =
                    Number(field === "quantity" ? value : pkg.quantity) || 0;
                  const unitPrice =
                    Number(field === "unitPrice" ? value : pkg.unitPrice) || 0;
                  const unitWeight =
                    Number(field === "unitWeight" ? value : pkg.unitWeight) ||
                    0;

                  updatedPackage.totalPrice = qty * unitPrice;
                  updatedPackage.totalWeight = qty * unitWeight;
                }

                // If we're manually editing the package, remove saved status
                if (field === "name") {
                  updatedPackage.isSaved = false;
                }

                return updatedPackage;
              }
              return pkg;
            }),
          };
        }
        return box;
      })
    );
  };

  // Update search query for a box
  const updateBoxSearchQuery = (boxId: number, query: string): void => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) => {
        if (box.id === boxId) {
          return {
            ...box,
            searchQuery: query,
          };
        }
        return box;
      })
    );
  };

  // Filter packages based on search query for a box
  const getFilteredPackages = (box: Box): BoxPackage[] => {
    if (!box.searchQuery.trim()) {
      return box.packages;
    }

    const query = box.searchQuery.toLowerCase();
    return box.packages.filter((pkg) =>
      pkg.name.toString().toLowerCase().includes(query)
    );
  };

  // Handle package name search input
  const handlePackageNameSearch = (
    boxId: number,
    packageId: number,
    value: string
  ) => {
    // Update the package name in the state directly
    updatePackageField(boxId, packageId, "name", value);

    // Also update our search tracking state
    const uniqueId = `${boxId}-${packageId}`;
    setPackageNameSearch((prev) => ({
      ...prev,
      [uniqueId]: value,
    }));

    // Show search results dropdown
    setShowPackageSearchResults((prev) => ({
      ...prev,
      [uniqueId]: true,
    }));

    // Filter products based on search input
    if (value.trim() === "") {
      setFilteredPackageResults((prev) => ({
        ...prev,
        [uniqueId]: [],
      }));
    } else {
      // Get filtered products from the catalog
      const filtered = catalogProducts.filter(
        (product) =>
          product.name?.toLowerCase().includes(value.toLowerCase()) ||
          product.title?.toLowerCase().includes(value.toLowerCase())
      );

      setFilteredPackageResults((prev) => ({
        ...prev,
        [uniqueId]: filtered.slice(0, 5), // Limit to top 5 matches
      }));

      // If we don't have catalog products locally, fetch them
      if (catalogProducts.length === 0) {
        fetchCatalogProducts();
      }
    }
  };

  // Select a package from search results
  const selectPackageFromSearch = (
    boxId: number,
    packageId: number,
    product: ProductCatalogItem
  ) => {
    // Update the package with the selected product
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) => {
        if (box.id === boxId) {
          return {
            ...box,
            packages: box.packages.map((pkg) => {
              if (pkg.id === packageId) {
                return {
                  ...pkg,
                  name: product.name || product.title || "",
                  quantity: product.qty || 1,
                  unitPrice: product.unitPrice || 0,
                  unitWeight: product.deadWeight || 0,
                  totalPrice: (product.qty || 1) * (product.unitPrice || 0),
                  totalWeight: (product.qty || 1) * (product.deadWeight || 0),
                  tax: product.unitTax?.toString() || "0",
                  hsn: product.hsnCode || "",
                  sku: product.sku || "",
                  length: product.length || "",
                  breadth: product.breadth || "",
                  height: product.height || "",
                  isSaved: true,
                };
              }
              return pkg;
            }),
          };
        }
        return box;
      })
    );

    // Close the search results dropdown
    const uniqueId = `${boxId}-${packageId}`;
    setShowPackageSearchResults((prev) => ({
      ...prev,
      [uniqueId]: false,
    }));
  };

  // Fetch catalog products if not already loaded
  const fetchCatalogProducts = async () => {
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
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Open package catalog modal
  const openPackageCatalogModal = async (boxId: number, packageId: number) => {
    setCurrentBoxId(boxId);
    setCurrentPackageId(packageId);
    setIsPackageCatalogModalOpen(true);
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

  // Close package catalog modal
  const closePackageCatalogModal = () => {
    setIsPackageCatalogModalOpen(false);
  };

  // Handle search in catalog
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.trim() === "") {
      setFilteredCatalogProducts(catalogProducts);
    } else {
      const filtered = catalogProducts.filter(
        (product) =>
          product.name?.toLowerCase().includes(value.toLowerCase()) ||
          product.title?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCatalogProducts(filtered);
    }
  };

  // Toggle product selection in catalog
  const toggleProductSelection = (productId: string) => {
    setSelectedCatalogProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  // Handle "Proceed" click in catalog modal
  const handleProceedClick = () => {
    // Get all selected products
    const selectedProducts = catalogProducts.filter(
      (product) => selectedCatalogProducts[product._id]
    );

    if (selectedProducts.length > 0 && currentBoxId && currentPackageId) {
      setBoxes((prevBoxes) => {
        return prevBoxes.map((box) => {
          if (box.id === currentBoxId) {
            // Instead of adding multiple products, replace the current package with the first selected product
            const selectedProduct = selectedProducts[0];

            return {
              ...box,
              packages: box.packages.map((pkg) => {
                if (pkg.id === currentPackageId) {
                  return {
                    ...pkg,
                    name: selectedProduct.name || selectedProduct.title || "",
                    quantity: selectedProduct.qty || 1,
                    unitPrice: selectedProduct.unitPrice || 0,
                    unitWeight: selectedProduct.deadWeight || 0,
                    totalPrice:
                      (selectedProduct.qty || 1) *
                      (selectedProduct.unitPrice || 0),
                    totalWeight:
                      (selectedProduct.qty || 1) *
                      (selectedProduct.deadWeight || 0),
                    tax: selectedProduct.unitTax?.toString() || "0",
                    hsn: selectedProduct.hsnCode || "",
                    sku: selectedProduct.sku || "",
                    length: selectedProduct.length || "",
                    breadth: selectedProduct.breadth || "",
                    height: selectedProduct.height || "",
                    isSaved: true,
                  };
                }
                return pkg;
              }),
            };
          }
          return box;
        });
      });
    }

    // Close the modal
    closePackageCatalogModal();
  };

  // Save package
  const savePackage = async (boxId: number, packageId: number) => {
    // Find the package to save
    const box = boxes.find((b) => b.id === boxId);
    const packageToSave = box?.packages.find((p) => p.id === packageId);

    if (!packageToSave) {
      toast.error("Package not found");
      return;
    }

    // If already saved, don't save again
    if (packageToSave.isSaved) {
      return;
    }

    try {
      setLoading(true);

      // Prepare the payload
      const payload = {
        products: [
          {
            productId: uuidv4(),
            name: packageToSave.name,
            category: "Health & Beauty", // Using default category
            qty: Number(packageToSave.quantity) || 1,
            unitPrice: Number(packageToSave.unitPrice) || 0,
            unitTax: Number(packageToSave.tax) || 0,
            deadWeight: Number(packageToSave.unitWeight) || 0,
            length: packageToSave.length.toString(),
            breadth: packageToSave.breadth.toString(),
            height: packageToSave.height.toString(),
            sku: packageToSave.sku || "",
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
        toast.success("Package saved successfully!");

        // Update the saved state for this package
        setBoxes((prevBoxes) =>
          prevBoxes.map((box) => {
            if (box.id === boxId) {
              return {
                ...box,
                packages: box.packages.map((pkg) => {
                  if (pkg.id === packageId) {
                    return {
                      ...pkg,
                      isSaved: true,
                    };
                  }
                  return pkg;
                }),
              };
            }
            return box;
          })
        );
      } else {
        toast.error(response?.data?.message || "Failed to save package");
      }
    } catch (error) {
      console.error("Error saving package:", error);
      toast.error("An error occurred while saving the package");
    } finally {
      setLoading(false);
    }
  };

  // Add this function to delete a specific box
  const deleteBox = (boxId: any) => {
    // Don't allow deletion if there's only one box
    if (boxCount <= 1) {
      toast.error("At least one box is required");
      return;
    }

    // Remove the box from the boxes array
    setBoxes((prevBoxes) => prevBoxes.filter((box) => box.id !== boxId));

    // Decrease the box count
    setBoxCount((prevCount) => prevCount - 1);
  };

  return (
    <div className="max-w-full w-full mx-auto p-4 bg-gray-50">
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
      </div>

      {/* Boxes */}
      <div className="space-y-6">
        {boxes.map((box) => (
          <div key={box.id}>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              {/* Packages - filtered by search query */}
              {/* Packages - filtered by search query */}
              {getFilteredPackages(box).map((pkg) => (
                <div
                  key={pkg.id}
                  className="p-4 border-b border-gray-200 last:border-b-0"
                >
                  {/* Box name with expand/collapse button */}
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-800">Box {box.id}</h4>
                    <button
                      onClick={() => togglePackageExpansion(box.id, pkg.id)}
                      className="text-gray-500"
                    >
                      {pkg.isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {/* All content inside expanded section */}
                  {pkg.isExpanded && (
                    <div className="mt-4">
                      {/* First row has package name, qty, unit price, unit weight on left and action buttons on right */}
                      <div className="flex items-center mb-4">
                        {/* Left side inputs */}
                        <div className="flex-grow flex items-center space-x-3">
                          {/* Package Name with search dropdown */}
                          <div
                            className="w-[25%] relative"
                            ref={(el) =>
                              (packageSearchRefs.current[
                                `${box.id}-${pkg.id}`
                              ] = el)
                            }
                          >
                            <FloatingLabelInput
                              placeholder="Package Name"
                              value={pkg.name.toString()}
                              onChangeCallback={(value) =>{
                                if (validationErrors[box.id]?.[`package-${pkg.id}-name`]) {
                                  clearFieldError(box.id, `package-${pkg.id}-name`);
                                }
                                handlePackageNameSearch(box.id, pkg.id, value)
                              }}
                              icon={<img src={searchIcon} alt="Search" />}
                              error={validationErrors[box.id]?.[`package-${pkg.id}-name`] || false}
                              errorMessage="Required"
                            />

                            {/* Package Name Search Results Dropdown */}
                            {showPackageSearchResults[`${box.id}-${pkg.id}`] &&
                              filteredPackageResults[`${box.id}-${pkg.id}`]
                                ?.length > 0 && (
                                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                  {filteredPackageResults[
                                    `${box.id}-${pkg.id}`
                                  ].map((product) => (
                                    <div
                                      key={product._id}
                                      className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 flex justify-between items-center"
                                      onClick={() =>
                                        selectPackageFromSearch(
                                          box.id,
                                          pkg.id,
                                          product
                                        )
                                      }
                                    >
                                      <div>
                                        <div className="font-medium">
                                          {product.name || product.title}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                          ₹ {product.unitPrice} |{" "}
                                          {product.deadWeight} kg
                                        </div>
                                      </div>
                                      <div className="text-xs bg-gray-200 px-2 py-1 rounded">
                                        {product.length} x {product.breadth} x{" "}
                                        {product.height}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                          </div>

                          {/* Qty input */}
                          <div className="w-[10%]">
                            <FloatingLabelInput
                              placeholder="Qty"
                              value={pkg.quantity.toString()}
                              type="number"
                              onChangeCallback={(value) =>{
                                if (validationErrors[box.id]?.[`package-${pkg.id}-quantity`]) {
                                  clearFieldError(box.id, `package-${pkg.id}-quantity`);
                                }
                                updatePackageField(
                                  box.id,
                                  pkg.id,
                                  "quantity",
                                  value
                                )
                              }}
                              error={validationErrors[box.id]?.[`package-${pkg.id}-quantity`] || false}
                              errorMessage="Required"
                            />
                          </div>

                          {/* Unit Price input */}
                          <div className="w-[10%]">
                            <FloatingLabelInput
                              placeholder="Unit Price"
                              value={pkg.unitPrice.toString()}
                              type="number"
                              onChangeCallback={(value) =>{
                                if (validationErrors[box.id]?.[`package-${pkg.id}-unitPrice`]) {
                                  clearFieldError(box.id, `package-${pkg.id}-unitPrice`);
                                }
                                updatePackageField(
                                  box.id,
                                  pkg.id,
                                  "unitPrice",
                                  value
                                )
                              }}
                              error={validationErrors[box.id]?.[`package-${pkg.id}-unitPrice`] || false}
                              errorMessage="Required"
                            />
                          </div>

                          {/* Unit Weight input */}
                          <div className="w-[12%]">
                            <FloatingLabelInput
                              placeholder="Unit Wt (kg)"
                              value={pkg.unitWeight.toString()}
                              type="number"
                              onChangeCallback={(value) =>{
                                if (validationErrors[box.id]?.[`package-${pkg.id}-unitWeight`]) {
                                  clearFieldError(box.id, `package-${pkg.id}-unitWeight`);
                                }
                                updatePackageField(
                                  box.id,
                                  pkg.id,
                                  "unitWeight",
                                  value
                                )
                              }}
                              error={validationErrors[box.id]?.[`package-${pkg.id}-unitWeight`] || false}
                              errorMessage="Required"
                            />
                          </div>
                        </div>

                        {/* Right side buttons */}
                        <div className="flex items-center space-x-2 ml-3">
                          <button
                            className={`p-2 ${
                              pkg.isSaved
                                ? "text-blue-500 cursor-not-allowed"
                                : "text-gray-500 cursor-pointer"
                            }`}
                            onClick={() => savePackage(box.id, pkg.id)}
                            title={
                              pkg.isSaved ? "Package saved" : "Save package"
                            }
                            disabled={pkg.isSaved}
                          >
                            <Bookmark
                              isFilled={pkg.isSaved}
                              className="w-5 h-5"
                            />
                          </button>
                          {/* <button
              onClick={() => removePackage(box.id, pkg.id)}
              className={`p-2 ${pkg.id === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-500 cursor-pointer"}`}
              title={pkg.id === 1 ? "First package cannot be deleted" : "Delete package"}
              disabled={pkg.id === 1}
            >
              <Trash className="w-5 h-5" />
            </button> */}
                          <button
                            onClick={() => deleteBox(box.id)}
                            className={`p-2 ${
                              boxCount <= 1
                                ? "text-gray-300 cursor-not-allowed"
                                : "text-gray-500 cursor-pointer"
                            }`}
                            title={
                              boxCount <= 1
                                ? "Cannot delete the only box"
                                : "Delete box"
                            }
                            disabled={boxCount <= 1}
                          >
                            <Trash className="w-5 h-5" />
                          </button>
                          <OneButton
                            text="Package Catalog"
                            onClick={() =>
                              openPackageCatalogModal(box.id, pkg.id)
                            }
                            variant="secondary"
                            className="!rounded-full"
                            showIcon={true}
                            icon={<Package className="w-4 h-4" />}
                          />
                        </div>
                      </div>

                      {/* Second row with remaining inputs */}
                      {/* <div className="grid grid-cols-12 gap-4 mb-4">
          <div className="col-span-2">
            <FloatingLabelInput
              placeholder="Tax"
              value={pkg.tax.toString()}
              type="number"
              onChangeCallback={(value) => updatePackageField(box.id, pkg.id, "tax", value)}
            />
          </div>
          <div className="col-span-2">
            <FloatingLabelInput
              placeholder="Disc % (₹)"
              value={pkg.discount.toString()}
              type="number"
              onChangeCallback={(value) => updatePackageField(box.id, pkg.id, "discount", value)}
            />
          </div>
          <div className="col-span-2">
            <FloatingLabelInput
              placeholder="HSN"
              value={pkg.hsn}
              onChangeCallback={(value) => updatePackageField(box.id, pkg.id, "hsn", value)}
            />
          </div>
          <div className="col-span-2">
            <FloatingLabelInput
              placeholder="SKU"
              value={pkg.sku}
              onChangeCallback={(value) => updatePackageField(box.id, pkg.id, "sku", value)}
            />
          </div>
          <div className="col-span-2">
            <FloatingLabelInput
              placeholder="Total Wt (kg)"
              value={pkg.totalWeight.toString()}
              type="number"
              counter="kg"
            />
          </div>
          <div className="col-span-2">
            <FloatingLabelInput
              placeholder="Total Price"
              value={pkg.totalPrice.toString()}
              type="number"
              counter="₹"
            />
          </div>
        </div>

        
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-1">
            <FloatingLabelInput
              placeholder="L"
              value={pkg.length.toString()}
              type="number"
              onChangeCallback={(value) => updatePackageField(box.id, pkg.id, "length", value)}
            />
          </div>
          <div className="col-span-1">
            <FloatingLabelInput
              placeholder="B"
              value={pkg.breadth.toString()}
              type="number"
              onChangeCallback={(value) => updatePackageField(box.id, pkg.id, "breadth", value)}
            />
          </div>
          <div className="col-span-1">
            <FloatingLabelInput
              placeholder="H"
              value={pkg.height.toString()}
              type="number"
              onChangeCallback={(value) => updatePackageField(box.id, pkg.id, "height", value)}
            />
          </div>
          
        </div> */}

                      {/* All inputs in a single flex row */}
                      <div className="flex flex-wrap gap-4 mb-4 pl-72">
                        <div className="!w-[5%]">
                          <FloatingLabelInput
                            placeholder="Tax"
                            value={pkg.tax.toString()}
                            type="number"
                            onChangeCallback={(value) =>
                              updatePackageField(box.id, pkg.id, "tax", value)
                            }
                          />
                        </div>
                        <div className="w-[8%]">
                          <FloatingLabelInput
                            placeholder="Disc % (₹)"
                            value={pkg.discount.toString()}
                            type="number"
                            onChangeCallback={(value) =>
                              updatePackageField(
                                box.id,
                                pkg.id,
                                "discount",
                                value
                              )
                            }
                          />
                        </div>
                        <div className="w-[8%]">
                          <FloatingLabelInput
                            placeholder="HSN"
                            value={pkg.hsn}
                            onChangeCallback={(value) =>
                              updatePackageField(box.id, pkg.id, "hsn", value)
                            }
                          />
                        </div>
                        <div className="w-[8%]">
                          <FloatingLabelInput
                            placeholder="SKU"
                            value={pkg.sku}
                            onChangeCallback={(value) =>
                              updatePackageField(box.id, pkg.id, "sku", value)
                            }
                          />
                        </div>
                        <div className="w-[13%]">
                          <FloatingLabelInput
                            placeholder="Total Wt (kg)"
                            value={pkg.totalWeight.toString()}
                            type="number"
                            counter="kg"
                          />
                        </div>
                        <div className="w-[12%]">
                          <FloatingLabelInput
                            placeholder="Total Price"
                            value={pkg.totalPrice.toString()}
                            type="number"
                            counter="₹"
                          />
                        </div>
                        <div className="w-[5%]">
                          <FloatingLabelInput
                            placeholder="L"
                            value={pkg.length.toString()}
                            type="number"
                            onChangeCallback={(value) =>{
                              if (validationErrors[box.id]?.[`package-${pkg.id}-length`]) {
                                clearFieldError(box.id, `package-${pkg.id}-length`);
                              }
                              updatePackageField(
                                box.id,
                                pkg.id,
                                "length",
                                value
                              )
                            }}
                            error={validationErrors[box.id]?.[`package-${pkg.id}-length`] || false}
                            errorMessage="Required"
                          />
                        </div>
                        <div className="w-[5%]">
                          <FloatingLabelInput
                            placeholder="B"
                            value={pkg.breadth.toString()}
                            type="number"
                            onChangeCallback={(value) =>{
                              if (validationErrors[box.id]?.[`package-${pkg.id}-breadth`]) {
                                clearFieldError(box.id, `package-${pkg.id}-breadth`);
                              }
                              updatePackageField(
                                box.id,
                                pkg.id,
                                "breadth",
                                value
                              )
                            }}
                            error={validationErrors[box.id]?.[`package-${pkg.id}-breadth`] || false}
                            errorMessage="Required"
                          />
                        </div>
                        <div className="w-[5%]">
                          <FloatingLabelInput
                            placeholder="H"
                            value={pkg.height.toString()}
                            type="number"
                            onChangeCallback={(value) =>{
                              if (validationErrors[box.id]?.[`package-${pkg.id}-height`]) {
                                clearFieldError(box.id, `package-${pkg.id}-height`);
                              }
                              updatePackageField(
                                box.id,
                                pkg.id,
                                "height",
                                value
                              )
                            }}
                            error={validationErrors[box.id]?.[`package-${pkg.id}-height`] || false}
                            errorMessage="Required"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Package Catalog Modal */}
      <CenterModal
        isOpen={isPackageCatalogModalOpen}
        onRequestClose={closePackageCatalogModal}
        contentLabel="Package Catalog"
        shouldCloseOnOverlayClick={true}
      >
        <div className="w-full h-full flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-xl font-medium">Package Catalog</h2>
            <button
              onClick={closePackageCatalogModal}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
          </div>
          <div className="p-4 border-b border-gray-200">
            <FloatingLabelInput
              placeholder="Search using Package Name"
              value={searchQuery}
              onChangeCallback={handleSearchChange}
              icon={<img src={searchIcon} alt="Search" />}
            />
          </div>
          <div className="flex-grow p-0 overflow-auto">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <p>Loading packages...</p>
              </div>
            ) : filteredCatalogProducts.length === 0 ? (
              <div className="flex justify-center items-center h-full">
                <p>No packages found</p>
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
                    <button
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
    </div>
  );
};

export default OrderFormB2B;
