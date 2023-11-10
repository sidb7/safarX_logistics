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
import { CREATE_COMBO_PRODUCT } from "../../../../utils/ApiUrls";
import { POST } from "../../../../utils/webService";
import InputWithFileUpload from "../../../../components/InputBox/InputWithFileUpload";
import { toast } from "react-toastify";
import BottomModal from "../../../../components/CustomModal/customBottomModal";
import { useMediaQuery } from "react-responsive";
import { Navigate } from "react-router-dom";

interface ISearchProductProps {
  isSearchProductRightModalOpen?: boolean;
  setIsSearchProductRightModalOpen?: any;
  productsData?: any;
  selectedProducts?: any;
  handlePackageDetails?: any;
}

const CreateCombo: React.FunctionComponent<ISearchProductProps> = (props) => {
  const {
    isSearchProductRightModalOpen,
    setIsSearchProductRightModalOpen,
    productsData,
    selectedProducts,
    handlePackageDetails,
  } = props;

  const navigate = useNavigate();
  const isMobileView = useMediaQuery({ maxWidth: 768 });
  const [products, setProducts] = useState<any>([]);
  const [searchedProduct, setSearchedProduct] = useState<any>("");
  const [clearIconVisible, setClearIconVisible] = useState<any>(false);
  const [selectedProduct, setSelectedProduct] = useState<any>([]);
  const [comboNameDisabled, setComboNameDisabled] = useState(true);
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
    const updatedProductInputState = products.filter(
      (isSelectedFilterData: any) => isSelectedFilterData?.selected
    );
    let volumetricWeightLocal: number = 0;
    let deadWeightLocal: number = 0;
    let appliedWeightLocal: number = 0;

    // if (updatedProductInputState.length > 2 && ){

    // }

    // Loop through each product in the array
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
      totalVolumetricWeight: volumetricWeightLocal,
      deadWeight: deadWeightLocal,
      appliedWeight: appliedWeightLocal,
    });
  };

  useEffect(() => {
    if (productsData) {
      setProducts([]);
      // let tempArr = JSON.parse(JSON.stringify(productsData));
      let tempArr = [...productsData];

      // let tempSelectedArr = JSON.parse(JSON.stringify(selectedProducts));
      // let tempSelectedArr = [...selectedProducts];

      tempArr?.forEach((product: any) => {
        product.selected = false;
      });

      // if (tempSelectedArr.length > 0) {
      //     tempSelectedArr?.forEach((selectedProduct: any) => {
      //         tempArr?.forEach((products: any) => {
      //             if (selectedProduct?.productId === products?.productId) {
      //                 products.selected = true;
      //                 products.qty = selectedProduct.qty;
      //             }
      //         });
      //     });
      // }

      setProducts([...sortOnSelected(tempArr)]);
    }
  }, [isSearchProductRightModalOpen, selectedProducts]);

  useEffect(() => {
    handleVolumCalc();
  }, [products]);

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

  const createComboProduct = async () => {
    const { name, images, category } = comboData;
    const updatedProductInputState = products.filter(
      (isSelectedFilterData: any) => isSelectedFilterData?.selected
    );
    const payLoad = {
      name,
      images,
      category,
      products: [...updatedProductInputState],
    };
    const { data: response } = await POST(CREATE_COMBO_PRODUCT, payLoad);
    if (response?.success) {
      toast.success(response?.message);
      setIsSearchProductRightModalOpen(false);
    } else {
      toast.error("Failed To Upload!");
    }
  };

  const selectProduct = (product: any, index: number) => {
    const allreadySelected = isProductSelected(index);
    let tempArr: any = products;
    if (allreadySelected) {
      tempArr[index].selected = false;
      setProducts([...sortOnSelected(tempArr)]);
    } else {
      tempArr[index].selected = true;
      setProducts([...sortOnSelected(tempArr)]);
    }
  };

  const isProductSelected = (index: any) => {
    return products[index]?.selected === true ? true : false;
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

  const searchProductContent = () => {
    return (
      <div>
        <div className="p-5 ">
          <div className="lg:mb-[20px] mb-2">
            <div className="flex items-center justify-between mb-[8px] ">
              <p className="text-[22px] font-Lato font-normal lg:text-2xl leading-8 text-[#323232]">
                Search Product
              </p>
              <img
                src={CrossIcon}
                alt="Cross Icon"
                className="cursor-pointer"
                onClick={() => setIsSearchProductRightModalOpen(false)}
              />
            </div>
            {/* Search Box */}
            <div className="lg:w-1/2 w-[100%] ">
              <CustomInputBox
                isRightIcon={clearIconVisible}
                rightIcon={ClearImage}
                value={searchedProduct}
                label="Search any product"
                onChange={(e) => {
                  setSearchedProduct(e.target.value);
                  setClearIconVisible(true);
                }}
                onClick={() => {
                  setSearchedProduct("");
                  setClearIconVisible(false);
                }}
                visibility={true}
                setVisibility={() => {}}
                imageClassName="!w-8 !h-8 !top-[20%]"
              />
            </div>
          </div>

          {/* Filter */}
          <div className="lg:mb-8 mb-4">
            <div className="flex  items-center gap-x-2 mb-3">
              <img src={ProductIcon} alt="Product" />
              <div className="font-Lato font-normal text-[22px] lg:text-2xl leading-8">
                By Category
              </div>
            </div>

            <SearchProductFilterItems filterItems={filterItems} />
          </div>

          <div className="flex  items-center gap-x-2 mb-2">
            <img src={ProductIcon} alt="Product" />
            <div className="font-Lato font-normal lg:text-2xl text-[22px] leading-8">
              Top Added
            </div>
          </div>
          <div className="flex lg:max-h-[350px] max-h-[280px] flex-wrap gap-5 mb-0 lg:mb-6  overflow-scroll ">
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
                  isSelected={isProductSelected(index)}
                />
              );
            })}
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-2 mx-5 mt-6 gap-5">
          <div className="flex-1">
            <CustomInputBox
              label="Combo Name"
              name="name"
              value={comboData?.name}
              onChange={onChangedHandler}
            />
          </div>

          <div className="flex-1">
            <InputWithFileUpload
              type="file"
              onChange={(e: any) => uploadedInputFile(e)}
            />
          </div>
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
