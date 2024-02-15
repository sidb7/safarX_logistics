import { useEffect, useState } from "react";
import CustomRightModal from "../../../../components/CustomModal/customRightModal";
import CrossIcon from "../../../../assets/CloseIcon.svg";
import CustomInputBox from "../../../../components/Input";
import ClearImage from "../../../../assets/Product/clear.svg";
import ProductIcon from "../../../../assets/Product/Product.svg";
import SearchProductFilterItems from "./searchProductFilterItems";
import ProductBox from "./productBox";
import { searchProductData } from "../../../../utils/dummyData";
import SampleProduct from "../../../../assets/SampleProduct.svg";
import ServiceButton from "../../../../components/Button/ServiceButton";
import { filterItems } from "../../../../utils/dummyData";
import { useNavigate } from "react-router-dom";
import plusIcon from "../../../../assets/plusIcon.svg";
import {
  CREATE_COMBO_PRODUCT,
  GET_COMBO_PRODUCT,
  GET_PRODUCTS,
} from "../../../../utils/ApiUrls";
import { POST } from "../../../../utils/webService";
import InputWithFileUpload from "../../../../components/InputBox/InputWithFileUpload";
import { toast } from "react-hot-toast";
import BottomModal from "../../../../components/CustomModal/customBottomModal";
import { useMediaQuery } from "react-responsive";
import { Navigate } from "react-router-dom";
import PaginationComponent from "../../../../components/Pagination";

interface ISearchProductProps {
  isSearchProductRightModalOpen?: boolean;
  setIsSearchProductRightModalOpen?: any;
  productsData?: any;
  selectedProducts?: any;
  handlePackageDetails?: any;
  totalProduct?: any;
}

const CreateCombo: React.FunctionComponent<ISearchProductProps> = (props) => {
  const {
    isSearchProductRightModalOpen,
    setIsSearchProductRightModalOpen,
    productsData,
    selectedProducts,
    handlePackageDetails,
    totalProduct,
  } = props;

  const navigate = useNavigate();
  const isMobileView = useMediaQuery({ maxWidth: 768 });
  const [products, setProducts] = useState<any>([]);
  const [selectedTempProducts, setSelectedTempProducts] = useState<any>([]);
  const [productsFromAPI, setProductsFromAPI] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [renderingComponents, setRenderingComponents] = useState(0);
  const [clearIconVisible, setClearIconVisible] = useState<any>(false);
  const [selectedProduct, setSelectedProduct] = useState<any>([]);
  const [comboNameDisabled, setComboNameDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [totalItemCount, setTotalItemCount] = useState(totalProduct);
  const [comboData, setComboData] = useState<any>({
    name: "",
    category: "mahaveer",
    totalVolumetricWeight: "",
    image: "",
    deadWeight: "",
    appliedWeight: "",
  });

  const handleVolumCalc = () => {
    // Create a copy seleted data array
    const updatedProductInputState = selectedTempProducts.filter(
      (isSelectedFilterData: any) => isSelectedFilterData?.selected
    );
    let volumetricWeightLocal: number = 0;
    let deadWeightLocal: number = 0;
    let appliedWeightLocal: number = 0;

    if (updatedProductInputState.length > 0) {
      updatedProductInputState.forEach((product: any, i: any) => {
        const { volumetricWeight, deadWeight } = product;
        volumetricWeightLocal += volumetricWeight;
        deadWeightLocal += deadWeight;
        appliedWeightLocal = Math.max(volumetricWeightLocal, deadWeightLocal);
      });
    }
    setComboData({
      ...comboData,
      totalVolumetricWeight: volumetricWeightLocal.toFixed(2),
      deadWeight: deadWeightLocal.toFixed(2),
      appliedWeight: appliedWeightLocal.toFixed(2),
    });
  };

  useEffect(() => {
    if (productsData) {
      setProducts([]);
      let tempArr = [...productsData];
      tempArr?.forEach((product: any) => {
        product.selected = false;
      });
      setProducts([...sortOnSelected(tempArr)]);
    }
  }, [isSearchProductRightModalOpen, selectedProducts]);

  useEffect(() => {
    handleVolumCalc();
  }, [products]);

  const sortOnSelected = (products: any) => {
    return products.sort((a: any, b: any) => {
      if (a.selected && !b.selected) {
        return -1;
      }
      if (!a.selected && b.selected) {
        return 1;
      }

      return 0;
    });
  };

  const createComboProduct = async () => {
    const { name, images, category } = comboData;

    if (selectedTempProducts?.length < 2) {
      toast.error("Atleast Two Product's is Required For Combo");
      return;
    } else {
      const payLoad = {
        name,
        images,
        category,
        products: [...selectedTempProducts],
      };
      const { data: response } = await POST(CREATE_COMBO_PRODUCT, payLoad);
      if (response?.success) {
        toast.success(response?.message);
        setIsSearchProductRightModalOpen(false);
      } else {
        toast.error(response?.message);
      }
    }
  };

  const selectProduct = (
    product: any,
    index: number,
    deselectProduct: boolean = false
  ) => {
    let tempArr: any = products;
    let tempSelectedProductsArr: any = selectedTempProducts;
    const tempOrderFromAPI: any = productsFromAPI;

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

    tempArr[index].selected = true;

    tempSelectedProductsArr.push(tempArr[index]);
    setSelectedProduct([...tempSelectedProductsArr]);

    tempArr.splice(index, 1);
    setProducts([...tempArr]);
  };

  const onChangedHandler = (e: any) => {
    if (e.target.value.length < 1) {
      setComboNameDisabled(true);
    } else {
      setComboNameDisabled(false);
    }
    setComboData({ ...comboData, [e.target.name]: e.target.value });
  };

  const uploadedInputFile = async (e: any) => {
    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    setComboData({ ...comboData, image: formData });
  };

  useEffect(() => {
    if (productsFromAPI) {
      setProducts([]);

      let tempArrProducts = JSON.parse(JSON.stringify(productsFromAPI));

      let tempSelectedArr = JSON.parse(JSON.stringify(selectedTempProducts));

      tempArrProducts?.forEach((product: any) => {
        product.selected = false;
      });

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
    }
  }, [productsFromAPI]);

  const getProducts = async (searchValue: any = "") => {
    try {
      setIsLoading(true);
      const { data } = await POST(GET_PRODUCTS, {
        skip: 0,
        limit: 10,
        pageNo: 1,
        searchValue,
      });

      setProductsFromAPI(data?.data);
      setTotalItemCount(data?.totalProduct);
      setIsLoading(false);
    } catch (error) {
      setProductsFromAPI([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isSearchProductRightModalOpen) {
      getProducts(searchProduct);
    }
  }, [isSearchProductRightModalOpen, searchProduct]);

  const searchProductContent = () => {
    const onPageIndexChange = async (pageIndex: any) => {
      const { data } = await POST(GET_PRODUCTS, {
        skip: (pageIndex?.currentPage - 1) * pageIndex?.itemsPerPage,
        limit: pageIndex?.itemsPerPage,
        pageNo: pageIndex?.currentPage,
      });
      if (data?.success) {
        setProductsFromAPI(data?.data);
        setTotalItemCount(data?.totalProduct);
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
        setTotalItemCount(data?.totalProduct);
      } else {
        setProductsFromAPI([]);
        toast.error(data?.message);
      }
    };

    const arrayData = [{ label: "Select Products" }, { label: "Save Combo" }];

    return (
      <div className="overflow-auto h-full">
        <div className="h-full max-h-[92%] ">
          <div className="lg:mb-[20px] mb-2">
            <div className="flex items-center justify-end p-5 rounded-2xl mb-[12px] border-b shadow-md">
              <img
                src={CrossIcon}
                alt="Cross Icon"
                className="cursor-pointer"
                onClick={() => setIsSearchProductRightModalOpen(false)}
              />
            </div>
            <div className="m-5">
              {selectedTempProducts.length > 0 && (
                <div className="pb-6 ">
                  <p className="text-[22px] mb-4 font-Lato font-semibold lg:text-2xl leading-8 text-[#323232]">
                    Selected Product ({selectedTempProducts.length})
                  </p>
                  <div className="h-auto flex flex-wrap  duration-300  w-full overflow-scroll transition-all ease-in-out  gap-y-4 gap-x-2">
                    <>
                      {selectedTempProducts?.map(
                        (eachProduct: any, index: number) => {
                          return (
                            <ProductBox
                              key={index}
                              image={SampleProduct}
                              weight={`${eachProduct?.appliedWeight} Kg`}
                              productName={eachProduct?.name || 0}
                              breadth={eachProduct?.breadth || 0}
                              length={eachProduct?.length || 0}
                              height={eachProduct?.height || 0}
                              className="lg:!w-72 w-[100%] cursor-pointer lg:h-[80px] h-[60px]"
                              onClick={() =>
                                selectProduct(eachProduct, index, true)
                              }
                              isSelected={eachProduct?.selected}
                            />
                          );
                        }
                      )}
                    </>
                  </div>
                </div>
              )}

              {/* Filter */}
              {/* <div className="lg:mb-8 mb-4">
            <div className="flex  items-center gap-x-2 mb-3">
              <img src={ProductIcon} alt="Product" />
              <div className="font-Lato font-normal text-[22px] lg:text-2xl leading-8">
                By Category
              </div>
            </div>

            <SearchProductFilterItems filterItems={filterItems} />
          </div> */}

              <div className=" flex justify-between items-center gap-x-2 ">
                <div className="flex items-center">
                  <img src={ProductIcon} alt="Product" />
                  <div className="font-Lato mx-2 font-normal lg:text-2xl text-[22px]  leading-8">
                    {renderingComponents === 0
                      ? "Select Products"
                      : "Combo Details"}
                  </div>
                </div>
                {renderingComponents === 0 && (
                  <div className="lg:w-1/2 w-[100%] ">
                    <CustomInputBox
                      isRightIcon={clearIconVisible}
                      rightIcon={ClearImage}
                      value={searchProduct}
                      label="Search any product"
                      onChange={(e: any) => {
                        setSearchProduct(e.target.value);
                      }}
                      onClick={() => {
                        setSearchProduct("");
                        setClearIconVisible(false);
                        setProducts(productsData);
                      }}
                      visibility={true}
                      setVisibility={() => {}}
                      imageClassName="!w-8 !h-8 !top-[20%]"
                    />
                  </div>
                )}
              </div>

              <div className="mt-4">
                {renderingComponents === 0 ? (
                  <div className="flex flex-col lg:max-h-[780px] max-h-[280px] gap-3 mb-0 lg:mb-6  overflow-scroll ">
                    <div className="w-[100%] flex flex-wrap gap-4">
                      <>
                        {!(products.length > 0) && (
                          <div
                            className="flex items-center justify-center h-[60px] p-5 rounded-lg bg-[#F2F6FF]"
                            onClick={() =>
                              navigate(`/catalogues/catalogue/add-product`)
                            }
                          >
                            <img src={plusIcon} alt="" />
                            <div className="mx-2"> Please Add Product</div>
                          </div>
                        )}
                        {products?.map((eachProduct: any, index: number) => {
                          return (
                            <ProductBox
                              key={index}
                              image={SampleProduct}
                              weight={`${eachProduct?.deadWeight} Kg`}
                              productName={eachProduct?.name || 0}
                              breadth={eachProduct?.breadth || 0}
                              length={eachProduct?.length || 0}
                              height={eachProduct?.height || 0}
                              className="lg:!w-72 w-[100%] cursor-pointer lg:h-[80px] h-[60px]"
                              onClick={() => selectProduct(eachProduct, index)}
                              // isSelected={isProductSelected(index)}
                            />
                          );
                        })}
                      </>
                    </div>
                    <div>
                      {totalItemCount > 0 && (
                        <PaginationComponent
                          totalItems={totalItemCount}
                          itemsPerPageOptions={[10, 20, 30, 50]}
                          onPageChange={onPageIndexChange}
                          onItemsPerPageChange={onPerPageItemChange}
                        />
                      )}
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
                        className={`${
                          isMobileView ? "w-[100%]" : ""
                        } bg-white text-[#1C1C1C] h-[36px] lg:!py-2 lg:!px-4`}
                      />
                      <ServiceButton
                        text={"NEXT"}
                        onClick={() => {
                          setRenderingComponents(1);
                        }}
                        className={`${
                          isMobileView ? "w-[100%]" : ""
                        } bg-[#1C1C1C] text-[#FFFFFF] h-[36px] lg:!py-2 lg:!px-4 disabled:bg-[#E8E8E8] disabled:text-[#BBB] disabled:border-none`}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 w-[100%] bg-white  gap-5">
                      <div className="flex-1">
                        <CustomInputBox
                          label="Combo Name"
                          name="name"
                          value={comboData?.name}
                          onChange={onChangedHandler}
                        />
                      </div>

                      {/* <div className="flex-1">
                        <InputWithFileUpload
                          type="file"
                          onChange={(e: any) => uploadedInputFile(e)}
                        />
                      </div> */}
                      <div className="flex-1">
                        <CustomInputBox
                          label="Combo Volumetric Weight (Kg)"
                          value={comboData?.totalVolumetricWeight}
                          isDisabled={true}
                        />
                      </div>
                      <div className="flex-1">
                        <CustomInputBox
                          label="Combo Dead Weight"
                          value={comboData?.deadWeight}
                          isDisabled={true}
                        />
                      </div>
                      <div className="flex-1">
                        <CustomInputBox
                          label="Combo Applied Weight"
                          value={comboData?.appliedWeight}
                          isDisabled={true}
                        />
                      </div>
                    </div>
                    <div
                      className="flex justify-end gap-x-5  shadow-lg border-[1px] h-[68px]  bg-[#FFFFFF] px-6 py-4 rounded-tr-[32px] rounded-tl-[32px]    fixed bottom-0 "
                      style={{ width: "-webkit-fill-available" }}
                    >
                      <ServiceButton
                        text={"BACK"}
                        onClick={() => {
                          setRenderingComponents(0);
                        }}
                        className={`${
                          isMobileView ? "w-[100%]" : ""
                        } bg-white text-[#1C1C1C] h-[36px] lg:!py-2 lg:!px-4`}
                      />
                      <ServiceButton
                        text={"CANCEL"}
                        onClick={() => {
                          setIsSearchProductRightModalOpen(false);
                        }}
                        className={`${
                          isMobileView ? "w-[100%]" : ""
                        } bg-white text-[#1C1C1C] h-[36px] lg:!py-2 lg:!px-4`}
                      />
                      <ServiceButton
                        text={"SAVE"}
                        disabled={comboNameDisabled}
                        onClick={() => createComboProduct()}
                        className={`${
                          isMobileView ? "w-[100%]" : ""
                        } bg-[#1C1C1C] text-[#FFFFFF] h-[36px] lg:!py-2 lg:!px-4 disabled:bg-[#E8E8E8] disabled:text-[#BBB] disabled:border-none`}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <hr /> */}
      </div>
    );
  };

  return (
    <>
      {!isMobileView ? (
        <CustomRightModal
          isOpen={isSearchProductRightModalOpen || true}
          onClose={() => setIsSearchProductRightModalOpen(false)}
          className="lg:w-[52%] "
        >
          {searchProductContent()}
        </CustomRightModal>
      ) : (
        <BottomModal
          isOpen={isSearchProductRightModalOpen || true}
          onRequestClose={() => setIsSearchProductRightModalOpen(false)}
          className="outline-none !p-0"
        >
          {searchProductContent()}
        </BottomModal>
      )}
    </>
  );
};

export default CreateCombo;
