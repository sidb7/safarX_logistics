import { useEffect, useState } from "react";
import CustomRightModal from "../../../components/CustomModal/customRightModal";
import CrossIcon from "../../../assets/CloseIcon.svg";
import CustomInputBox from "../../../components/Input";
import ClearImage from "../../../assets/Product/clear.svg";
import ProductIcon from "../../../assets/Product/Product.svg";
import SearchProductFilterItems from "./SearchProductFilterItems";
import ProductBox from "./ProductBox";
import { searchProductData } from "../../../utils/dummyData";
import SampleProduct from "../../../assets/SampleProduct.svg";
import ServiceButton from "../../../components/Button/ServiceButton";
import { searchResults } from "../../../utils/utility";
import ComboProductBox from "../../../components/ComboProductBox";
import { POST } from "../../../utils/webService";
import { GET_COMBO_PRODUCT } from "../../../utils/ApiUrls";
import { toast } from "react-toastify";
import StackLogo from "../../../assets/Catalogue/StackIcon.svg";

interface ISearchProductProps {
  isSearchProductRightModalOpen: boolean;
  setIsSearchProductRightModalOpen: any;
  productsFromLatestOrder?: any;
  selectedProducts?: any;
  handlePackageDetails?: any;
}

const AddPackageDetails: React.FunctionComponent<ISearchProductProps> = (
  props
) => {
  const {
    isSearchProductRightModalOpen,
    setIsSearchProductRightModalOpen,
    productsFromLatestOrder,
    selectedProducts,
    handlePackageDetails,
  } = props;

  const [isAddProductMode, setIsAddProductMode] = useState<any>(false);
  const [searchedProduct, setSearchedProduct] = useState("");
  const [clearIconVisible, setClearIconVisible] = useState(false);
  const [searchResult, setSearchResult] = useState<any>([]);
  const [products, setProducts] = useState<any>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>([]);
  const [comboProducts, setComboProducts] = useState<any>([]);

  useEffect(() => {
    if (productsFromLatestOrder) {
      setProducts([]);
      // getComboProducts();

      //coping arr
      let tempArrProducts = JSON.parse(JSON.stringify(productsFromLatestOrder)); //productsFromLatestOrder => will be replaced by seller's products api
      let tempArrCombos = JSON.parse(JSON.stringify(comboProducts));
      let tempSelectedArr = JSON.parse(JSON.stringify(selectedProducts));

      //add product mode when adding new or editing product inisde package
      setIsAddProductMode(tempSelectedArr.length > 0 ? true : false);

      tempArrProducts?.forEach((product: any) => {
        product.selected = false;
      });

      //preselect products which are allready selected, when adding a product inside a package(BOX)
      if (tempSelectedArr.length > 0) {
        tempSelectedArr?.forEach((selectedProduct: any) => {
          tempArrProducts?.forEach((products: any) => {
            if (selectedProduct.productId === products.productId) {
              products.selected = true;
              products.qty = selectedProduct.qty;
            }
          });
        });
      }

      setProducts([...sortOnSelected(tempArrProducts)]);
      setComboProducts([...sortOnSelected(tempArrCombos)]);
    }
  }, [isSearchProductRightModalOpen, selectedProducts]);

  //get combo products
  const getComboProducts = async () => {
    const { data } = await POST(GET_COMBO_PRODUCT);
    if (data?.success) {
      let tempArr = data?.data;
      tempArr?.forEach((combo: any) => {
        combo.selected = false;
      });
      console.log("tempArr", tempArr);
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
    handlePackageDetails([...tempArrProducts, ...selectedCombo]);
  };

  //desselect an arr (selected:false)
  const DeSelectArr = (arr: any = []) =>
    arr.map((arr: any) => {
      return { ...arr, selected: false };
    }) || [];

  //Select Product for package
  const selectProduct = (product: any, index: number) => {
    //deselect or enable multile select when addproductmode is enable
    console.log("isAddProductMode product", isAddProductMode);
    if (comboProducts.length > 0 && !isAddProductMode) {
      setComboProducts(DeSelectArr(comboProducts));
    }

    const allreadySelected = isProductSelected(index, products);
    let tempArr: any = products;
    if (allreadySelected) {
      tempArr[index].selected = false;
      setProducts([...sortOnSelected(tempArr)]);
    } else {
      tempArr[index].selected = true;
      setProducts([...sortOnSelected(tempArr)]);
    }
  };

  //Select Combo for package
  const selectComboProduct = (combo: any, index: number) => {
    console.log("isAddProductMode product", isAddProductMode);
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

  //returns true if element is selected in that particuler arr
  const isProductSelected = (index: any, arr: any) => {
    return arr[index]?.selected === true ? true : false;
  };

  const ProductDetails = () => {
    return (
      <div>
        <div className="p-5 ">
          <div className="flex items-center justify-between mb-[27px]">
            <p className="font-Lato font-normal text-2xl leading-8 text-[#323232]">
              Search Product
            </p>
            <img
              src={CrossIcon}
              alt="Cross Icon"
              className="cursor-pointer self-center"
              onClick={() => setIsSearchProductRightModalOpen(false)}
            />
          </div>
          {/* Search Box */}
          <div className="mb-[33px] w-1/2">
            <CustomInputBox
              isRightIcon={clearIconVisible}
              rightIcon={ClearImage}
              value={searchedProduct}
              label="Search any product"
              onChange={(e) => {
                setSearchedProduct(e.target.value);
                setClearIconVisible(true);
                const result = searchResults(e.target.value, searchProductData);
                setSearchResult(result);
              }}
              onClick={() => {
                setSearchResult([]);
                setSearchedProduct("");
                setClearIconVisible(false);
              }}
              visibility={true}
              setVisibility={() => {}}
              imageClassName="!w-8 !h-8 !top-[20%]"
            />
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

          <div className="flex  items-center gap-x-2 py-2">
            <img src={ProductIcon} alt="Product" />
            <div className="font-Lato font-normal text-2xl leading-8">
              Top Added
            </div>
          </div>
          <div className="flex flex-wrap gap-5 mb-6 py-6 px-2 overflow-scroll ">
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
                  className="!w-72 cursor-pointer "
                  onClick={() => selectProduct(eachProduct, index)}
                  isSelected={isProductSelected(index, products)}
                />
              );
            })}
          </div>
          <div className="flex  items-center gap-x-2 py-2">
            <img src={ProductIcon} alt="Product" />
            <div className="font-Lato font-normal text-2xl leading-8">
              Combo Products
            </div>
          </div>
          <div className="flex flex-wrap gap-5 mb-6 py-6 px-2 overflow-scroll ">
            {comboProducts.map((combo: any, index: number) => {
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
        className=" w-full lg:w-[52%] rounded-l-xl"
      >
        <ProductDetails />
      </CustomRightModal>
    </>
  );
};

export default AddPackageDetails;
