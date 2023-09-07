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
import { filterItems } from "../../../utils/dummyData";

interface ISearchProductProps {
  isSearchProductRightModalOpen: boolean;
  setIsSearchProductRightModalOpen: any;
  productsFromLatestOrder?: any;
  handlePackageDetails?: any;
}

const AddPackageDetails: React.FunctionComponent<ISearchProductProps> = (
  props
) => {
  const {
    isSearchProductRightModalOpen,
    setIsSearchProductRightModalOpen,
    productsFromLatestOrder,
    handlePackageDetails,
  } = props;

  const [products, setProducts] = useState<any>([]);
  const [searchedProduct, setSearchedProduct] = useState<any>("");
  const [clearIconVisible, setClearIconVisible] = useState<any>(false);
  const [selectedProduct, setSelectedProduct] = useState<any>([]);

  useEffect(() => {
    if (productsFromLatestOrder) {
      productsFromLatestOrder.forEach((product: any) => {
        product.selected = false;
      });
      setProducts(productsFromLatestOrder);
    }
  }, [productsFromLatestOrder]);

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

  const productsDetailsTobeSend = () => {
    let tempArr = products.filter((product: any) => product.selected);
    handlePackageDetails(tempArr);
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

  const searchProductContent = () => {
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
              className="cursor-pointer"
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
          {/* Filter */}
          <div className="mb-8">
            <div className="flex  items-center gap-x-2 mb-4">
              <img src={ProductIcon} alt="Product" />
              <div className="font-Lato font-normal text-2xl leading-8">
                By Category
              </div>
            </div>

            <SearchProductFilterItems filterItems={filterItems} />
          </div>
          {/* Most Used */}

          {/* <div className="flex  items-center gap-x-2 mb-4">
            <img src={ProductIcon} alt="Product" />
            <div className="font-Lato font-normal text-2xl leading-8">
              Most Used
            </div>
          </div>
          <div className="flex flex-wrap gap-5 mb-6 ">
            {productsFromLatestOrder.map((eachProduct: any, index: number) => {
              return (
                <ProductBox
                  key={index}
                  image={SampleProduct}
                  weight={`${eachProduct?.deadWeight} Kg`}
                  productName={eachProduct?.name || 0}
                  breadth={eachProduct?.breadth || 0}
                  length={eachProduct?.length || 0}
                  height={eachProduct?.height || 0}
                  className="!w-72"
                />
              );
            })}
          </div> */}

          {/* Top Added */}

          <div className="flex  items-center gap-x-2 mb-4">
            <img src={ProductIcon} alt="Product" />
            <div className="font-Lato font-normal text-2xl leading-8">
              Top Added
            </div>
          </div>
          <div className="flex flex-wrap gap-5 mb-6  overflow-scroll ">
            {products.map((eachProduct: any, index: number) => {
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
                  isSelected={isProductSelected(index)}
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
            className="bg-white text-[#1C1C1C] h-[36px] lg:!py-2 lg:!px-4 "
          />
          <ServiceButton
            text={"SAVE"}
            onClick={() => productsDetailsTobeSend()}
            className="bg-[#1C1C1C] text-[#FFFFFF] h-[36px] lg:!py-2 lg:!px-4 "
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <CustomRightModal
        isOpen={isSearchProductRightModalOpen}
        onClose={() => setIsSearchProductRightModalOpen(false)}
        className="lg:w-[52%]"
      >
        {searchProductContent()}
      </CustomRightModal>
    </>
  );
};

export default AddPackageDetails;
