import React, { useEffect, useState } from "react";
import CustomRightModal from "../../../components/CustomModal/customRightModal";
import ButtonIcon from "../../../assets/Product/Button.svg";
import CrossIcon from "../../../assets/CloseIcon.svg";
import ProductIcon from "../../../assets/Product/Product.svg";
import ProductBox from "./ProductBox";
import SampleProduct from "../../../assets/SampleProduct.svg";
import ServiceButton from "../../../components/Button/ServiceButton";
import ComboProductBox from "../../../components/ComboProductBox";
import { POST } from "../../../utils/webService";
import { GET_COMBO_PRODUCT, GET_PRODUCTS } from "../../../utils/ApiUrls";
import { toast } from "react-toastify";

import StackLogo from "../../../assets/Catalogue/StackIcon.svg";
import "../../../styles/skeleton.css";
import PaginationComponent from "../../../components/Pagination";

import { Spinner } from "../../../components/Spinner";
import { SearchBox } from "../../../components/SearchBox";
import AddButton from "../../../components/Button/addButton";
interface ISearchProductProps {
  isSearchProductRightModalOpen: boolean;
  setIsSearchProductRightModalOpen: any;
  selectedProducts?: any;
  handlePackageDetails?: any;
  handleAddProductPanel?: any;
}

const AddPackageDetails: React.FunctionComponent<ISearchProductProps> = (
  props
) => {
  const {
    isSearchProductRightModalOpen,
    setIsSearchProductRightModalOpen,
    selectedProducts = [],
    handlePackageDetails,
    handleAddProductPanel,
  } = props;

  const [isAddProductMode, setIsAddProductMode] = useState<any>(false);
  const [searchedProduct, setSearchedProduct] = useState("");
  const [clearIconVisible, setClearIconVisible] = useState(false);
  const [searchResult, setSearchResult] = useState<any>([]);
  const [products, setProducts] = useState<any>([]);
  console.log("🚀 ~ file: AddPackageDetails.tsx:42 ~ products:", products);
  // const [totalItemCount, setTotalItemCount] = useState(totalProduct);
  const [totalProduct, setTotalProduct] = useState<number>(0);

  const [selectedProductTemp, setSelectedProduct] =
    useState<any>(selectedProducts);
  console.log(
    "🚀 ~ file: AddPackageDetails.tsx:49 ~ selectedProduct:",
    selectedProductTemp
  );
  const [comboProducts, setComboProducts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [productsFromAPI, setProductsFromAPI] = useState<any>([]);
  console.log(
    "🚀 ~ file: AddPackageDetails.tsx:57 ~ productsFromAPI:",
    productsFromAPI
  );

  useEffect(() => {
    console.log(
      "🚀 ~ file: AddPackageDetails.tsx:60 ~ useEffect ~ isSearchProductRightModalOpen:",
      isSearchProductRightModalOpen
    );
    if (isSearchProductRightModalOpen) {
      getProducts(searchedProduct);
    }
  }, [isSearchProductRightModalOpen, searchedProduct]);

  const getProducts = async (searchValue: any = "") => {
    try {
      setIsLoading(true);
      const { data } = await POST(GET_PRODUCTS, {
        skip: 0,
        limit: 10,
        pageNo: 1,
        searchValue,
      });
      // setProducts([...filterSelectedProducts(data?.data)]);
      setProductsFromAPI(data?.data);
      setTotalProduct(data?.totalProduct);
      setIsLoading(false);
    } catch (error) {
      setProductsFromAPI([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(
      "🚀 ~ file: AddPackageDetails.tsx:85 ~ useEffect ~ tempSelectedArr:",
      selectedProducts
    );
    setSelectedProduct([]);
    let tempSelectedArr = JSON.parse(JSON.stringify(selectedProducts));

    setSelectedProduct((s_product: any) => [...s_product, ...tempSelectedArr]);
  }, [selectedProducts]);

  useEffect(() => {
    if (productsFromAPI) {
      setProducts([]);
      // getComboProducts();

      //coping arr
      let tempArrProducts = JSON.parse(JSON.stringify(productsFromAPI)); //productsFromAPI => will be replaced by seller's products api
      let tempArrCombos = JSON.parse(JSON.stringify(comboProducts));
      let tempSelectedArr = JSON.parse(JSON.stringify(selectedProductTemp));

      //add product mode when adding new or editing product inisde package
      setIsAddProductMode(tempSelectedArr.length > 0 ? true : false);

      tempArrProducts?.forEach((product: any) => {
        product.selected = false;
      });

      //preselect products which are allready selected, when adding a product inside a package(BOX)
      if (tempSelectedArr.length > 0) {
        tempSelectedArr?.forEach((selectedProduct: any) => {
          tempArrProducts?.forEach((products: any, index: number) => {
            if (selectedProduct.productId === products.productId) {
              tempArrProducts.splice(index, 1);
              // products.selected = true;
              // products.qty = selectedProduct.qty;
            }
          });
        });
      }

      setProducts([...tempArrProducts]);
      setComboProducts([...sortOnSelected(tempArrCombos)]);
    }
  }, [isSearchProductRightModalOpen, productsFromAPI]);

  //get combo products
  const getComboProducts = async () => {
    const { data } = await POST(GET_COMBO_PRODUCT);
    if (data?.success) {
      let tempArr = data?.data;
      tempArr?.forEach((combo: any) => {
        combo.selected = false;
      });
      setComboProducts([...tempArr]);
    } else {
      console.error(data?.message);
    }
  };

  useEffect(() => {
    getComboProducts();
  }, []);

  //sort an arr acceending which are selected
  const sortOnSelected = (products: any) => {
    return products.sort((a: any, b: any) => {
      // Sorting in descending order (selected: true comes first)
      if (a.selected && !b.selected) {
        return -1;
      }
      if (!a.selected && b.selected) {
        return 1;
      }
      // If selected values are the same, maintain the original order
      return 0;
    });
  };

  //send selected products data to parent component for package details
  const productsAndComboDetailsTobeSend = () => {
    let tempArrProducts = products.filter((product: any) => product.selected);
    let tempArrCombo = comboProducts.filter((combo: any) => combo.selected);
    const selectedCombo = tempArrCombo.flatMap((combo: any) => combo.products);

    //handlePackageDetails => props function from parents
    handlePackageDetails([...selectedProductTemp, ...selectedCombo]);
  };

  //desselect an arr (selected:false)
  const DeSelectArr = (arr: any = []) =>
    arr?.map((arr: any) => {
      return { ...arr, selected: false };
    }) || [];

  //Select Product for package
  const toggleSelectionProduct = (
    product: any,
    index: number,
    deselectProduct: boolean = false
  ) => {
    //deselect or enable multile select when addproductmode is enable
    if (comboProducts.length > 0 && !isAddProductMode) {
      setComboProducts(DeSelectArr(comboProducts));
    }
    let tempArr: any = products;
    let tempSelectedProductsArr: any = selectedProductTemp;
    const tempOrderFromAPI: any = productsFromAPI;

    // deselect product here
    if (deselectProduct) {
      const isExist = tempOrderFromAPI.some(
        (productAPI: any) =>
          productAPI.productId === tempSelectedProductsArr[index].productId
      );

      if (isExist) {
        tempArr.push(tempSelectedProductsArr[index]);
        setProducts([...tempArr]);
      }

      tempSelectedProductsArr.splice(index, 1);
      setSelectedProduct([...tempSelectedProductsArr]);

      return;
    }

    // add to selected products
    tempArr[index].selected = true;

    tempSelectedProductsArr.push(tempArr[index]);
    setSelectedProduct([...tempSelectedProductsArr]);

    tempArr.splice(index, 1);
    setProducts([...tempArr]);
  };

  //Select Combo for package
  const selectComboProduct = (combo: any, index: number) => {
    if (products.length > 0 && !isAddProductMode) {
      setProducts(DeSelectArr(products));
    }
    const allreadySelected = isProductSelected(index, comboProducts);
    const tempArr = comboProducts;
    // const tempArr = DeSelectArr(comboProducts);
    allreadySelected
      ? (tempArr[index].selected = false)
      : (tempArr[index].selected = true);
    setComboProducts([...sortOnSelected(tempArr)]);
  };

  //returns true if element is selected in that arr
  const isProductSelected = (index: any, arr: any) => {
    // return arr[index]?.productI
    return arr[index]?.selected === true ? true : false;
  };

  const onPageIndexChange = async (pageIndex: any) => {
    const { data } = await POST(GET_PRODUCTS, {
      skip: (pageIndex?.currentPage - 1) * pageIndex?.itemsPerPage,
      limit: pageIndex?.itemsPerPage,
      pageNo: pageIndex?.currentPage,
    });
    if (data?.success) {
      setProductsFromAPI(data?.data);
      setTotalProduct(data?.totalProduct);
    } else {
      setProductsFromAPI([]);
      toast.error(data?.message);
    }
  };

  const onPerPageItemChange = async (pageperItem: any) => {
    const { data } = await POST(GET_PRODUCTS, {
      skip: (pageperItem?.currentPage - 1) * pageperItem?.itemsPerPage,
      limit: pageperItem?.itemsPerPage,
      pageNo: pageperItem?.currentPage,
    });
    if (data?.success) {
      setProductsFromAPI(data?.data);
      setTotalProduct(data?.totalProduct);
    } else {
      setProductsFromAPI([]);
      toast.error(data?.message);
    }
  };

  const ProductDetails = () => {
    return (
      <div className="h-full">
        <div className="p-5 overflow-scroll relative h-full">
          <img
            src={CrossIcon}
            alt="Cross Icon"
            className="cursor-pointer self-center absolute right-0 z-10 top-6 pr-8"
            onClick={() => setIsSearchProductRightModalOpen(false)}
          />

          <div
            className={`${
              selectedProductTemp.length > 0 ? "opacity-100 " : "opacity-0 "
            }  flex duration-100 ease-in-out transition-all items-center `}
          >
            <div className="flex gap-x-2">
              <img src={ProductIcon} alt="Product" />
              <p className="font-Lato font-normal text-2xl leading-8 ">
                Selected Products
              </p>
            </div>
            <p className="pl-4">{`(${selectedProductTemp.length} selected)`}</p>
            {/* //selected products */}
          </div>
          <div
            className={`${
              selectedProductTemp.length > 0
                ? " !max-h-[300px] opacity-100 py-4 "
                : "opacity-0 "
            } flex-wrap  max-h-[0] duration-300 ease-in-out transition-all mt-2 overflow-auto`}
            // style={{ border: "2px solid red" }}
          >
            <div
              className={`h-auto flex flex-wrap  duration-300  w-full overflow-scroll transition-all ease-in-out  gap-y-4 gap-x-2 `}
            >
              {selectedProductTemp?.map((eachProduct: any, index: number) => {
                return (
                  <ProductBox
                    key={index}
                    image={SampleProduct}
                    weight={`${eachProduct?.appliedWeight} Kg`}
                    productName={eachProduct?.name || 0}
                    breadth={eachProduct?.breadth || 0}
                    length={eachProduct?.length || 0}
                    height={eachProduct?.height || 0}
                    className="!w-56 cursor-pointer hover:!shadow-lg transition-all !shadow-none"
                    onClick={() =>
                      toggleSelectionProduct(eachProduct, index, true)
                    }
                    isSelected={eachProduct?.selected}
                  />
                );
              })}
            </div>
          </div>
          {/* Filter */}
          {/* <div className="mb-8">
            <div className="flex  items-center gap-x-2 mb-4">
              <img src={ProductIcon} alt="Product" />
              <div className="font-Lato font-normal text-2xl leading-8">
                By Category
              </div>
            </div>

            <SearchProductFilterItems filterItems={filterItems} />
          </div> */}
          <div className="flex justify-between  items-center gap-x-2 py-2">
            <div className="flex items-center gap-x-2">
              <img src={ProductIcon} alt="Product" />
              <div className="font-Lato font-normal text-2xl leading-8">
                Products
              </div>
            </div>
            <div className="w-[13rem] !h-fullflex items-center">
              <SearchBox
                label="Search any product"
                customPlaceholder="Search any product"
                onChange={(e: any) => {
                  setSearchedProduct(e.target.value.toString().trim());
                  setClearIconVisible(true);
                }}
                getFullContent={() => setSearchedProduct("")}
                className="!h-full"
                value={searchedProduct}
              />
              {/* <img src={SearchBoxIcon} alt="" className="w-6 h-6 mx-2" />
              <CustomInputBox
                isRightIcon={clearIconVisible}
                rightIcon={ClearImage}
                value={searchedProduct}
                className="!h-full"
                label="Search any product"
                onChange={(e) => {
                  setSearchedProduct(e.target.value.toString().trim());
                  setClearIconVisible(true);
                }}
                onClick={() => {
                  setSearchResult([]);
                  setSearchedProduct("");
                  setClearIconVisible(false);
                }}
                // visibility={true}
                setVisibility={() => {}}
                imageClassName="!w-8 !h-8 !top-[20%]"
              /> */}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 lg:gap-3 transition-all max-h-96 mt-2 overflow-scroll">
            {isLoading ? (
              <div className="w-full h-full justify-center items-center flex ">
                <div className="flex">
                  <Spinner />
                </div>
              </div>
            ) : (
              <>
                {!(products.length > 0) && (
                  <>
                    <AddButton
                      text="ADD PRODUCTS"
                      onClick={() => {
                        handleAddProductPanel(true);
                        // navigate(
                        //   `/catalogues/catalogue/add-product?shipyaari_id=${shipyaari_id}&source=${orderSource}`
                        // );
                      }}
                      showIcon={true}
                      icon={ButtonIcon}
                      className="rounded-xl p-6"
                      alt="Add Product"
                    />
                  </>
                )}

                {products?.map((eachProduct: any, index: number) => {
                  return (
                    <ProductBox
                      key={index}
                      image={SampleProduct}
                      weight={`${eachProduct?.appliedWeight} Kg`}
                      productName={eachProduct?.name || 0}
                      breadth={eachProduct?.breadth || 0}
                      length={eachProduct?.length || 0}
                      height={eachProduct?.height || 0}
                      className="!w-56 cursor-pointer "
                      onClick={() => toggleSelectionProduct(eachProduct, index)}
                      // isSelected={isProductSelected(index, products)}
                    />
                  );
                })}
              </>
            )}
          </div>
          <div className="w-full">
            {totalProduct > 0 && (
              <PaginationComponent
                totalItems={totalProduct}
                className="`space-x-0 !m-4"
                itemsPerPageOptions={[10, 20, 30, 50]}
                onPageChange={onPageIndexChange}
                onItemsPerPageChange={onPerPageItemChange}
              />
            )}
          </div>
          <div className="flex  items-center gap-x-2 py-2">
            <img src={ProductIcon} alt="Product" />
            <div className="font-Lato font-normal text-2xl leading-8">
              Combo Products
            </div>
          </div>
          <div className="flex flex-wrap gap-5 mb-6 py-6 px-2 overflow-scroll ">
            {comboProducts?.map((combo: any, index: number) => {
              return (
                <ComboProductBox
                  image={StackLogo}
                  productName={combo?.name}
                  weight={`${combo?.totalDeadWeight} ${combo?.weightUnit}`}
                  Value={combo?.totalValue}
                  dimension={`${combo?.totalPrice}`}
                  className={`cursor-pointer`}
                  label={`Product: ${combo?.products?.length}`}
                  selectMode={true}
                  data={combo}
                  onClick={() => selectComboProduct(combo, index)}
                  isSelected={isProductSelected(index, comboProducts)}
                  index={index}
                />
              );
            })}
          </div>
        </div>
        <div
          className="flex justify-end gap-x-5  shadow-lg border-[1px] h-[68px]  bg-[#FFFFFF] px-6 py-4 rounded-tr-[32px] rounded-tl-[32px]    fixed bottom-0 "
          style={{ width: "-webkit-fill-available" }}
        >
          <ServiceButton
            text={"CANCEL"}
            onClick={() => {
              setIsSearchProductRightModalOpen(false);
            }}
            className="bg-white  text-[#1C1C1C] h-[36px] !py-2 !px-4 "
          />
          <ServiceButton
            text={"SAVE"}
            onClick={() => productsAndComboDetailsTobeSend()}
            className="bg-[#1C1C1C] text-[#FFFFFF] h-[36px] !py-2 !px-4 "
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <CustomRightModal
        wrapperClassName="rounded"
        isOpen={isSearchProductRightModalOpen}
        onClose={() => setIsSearchProductRightModalOpen(false)}
        className=" w-full lg:w-[52%] h-screen rounded-l-xl"
      >
        {ProductDetails()}
      </CustomRightModal>
    </>
  );
};

export default AddPackageDetails;
