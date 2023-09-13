import React, { useEffect, useState } from "react";
import PaginationComponent from "../../../../components/Pagination";
import ProductBox from "../../Product/ProductBox";
import ProductCategoryBox from "../../ReturningUser/SearchFilterProduct/ProductCategoryBox";
import DeliceryIcon from "../../../../assets/Delivery Icon.svg";
import DeliveryIcon from "../../../../assets/Product/Delivery (1).svg";
import ProductIcon from "../../../../assets/Product/Product (3).svg";
import CategoryLogo from "../../../../assets/Product/Item.svg";
import Categorylogo2 from "../../../../assets/Product/watch.svg";
import SportsLogo from "../../../../assets/Product/sports.svg";
import FitnessCategoryLogo from "../../../../assets/Product/fitness.svg";
import GiftLogo from "../../../../assets/Product/gift.svg";
import StackLogo from "../../../../assets/Catalogue/StackIcon.svg";
import { POST } from "../../../../utils/webService";
import {
  GET_COMBO_PRODUCT,
  GET_PRODUCTS,
} from "../../../../utils/ApiUrls";
import ComboProductBox from "../../../../components/ComboProductBox";
import { toast } from "react-toastify";
import { Spinner } from "../../../../components/Spinner";

interface IProductCatalogue {
  setProductCatalogueTab: React.Dispatch<React.SetStateAction<string>>;
}

const ProductCatalogue: React.FunctionComponent<IProductCatalogue> = ({
  setProductCatalogueTab,
}) => {
  const [productData, setProductData] = useState([]);
  const [filterId, setFilterId] = useState(0);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [viewed, setViewed] = useState(-1);
  const [showComboProductList, setShowComboProductList] = useState(false)

  const [filterData, setFilterData] = useState([
    { label: "Single Product", isActive: false },
    { label: "Combo Product", isActive: false },
  ]);

  //on page change index
  const onPageIndexChange = () => { };

  // on per page item change
  const onPerPageItemChange = () => { };

  useEffect(() => {
    (async () => {
      const { data } = await POST(
        filterId === 0 ? GET_PRODUCTS : GET_COMBO_PRODUCT,
        {
          skip: 0,
          limit: 10,
          pageNo: 1,
        }
      );
      if (data?.success) {
        setProductData(data.data);
        // setTotalItemCount()
      } else {
        setProductData([]);
        toast.error(data?.message);
      }
    })();
  }, [filterId]);

  const filterComponent = (className?: string) => {
    return (
      <div
        className={`flex mt-6 text-[14px] text-[#777777] font-medium h-[44px]`}
      >
        {filterData?.map((singleData, index) => {
          return (
            <span
              key={index}
              className={`flex items-center py-[8px] px-[16px] border-[1px] border-[#A4A4A4] cursor-pointer ${filterId === index
                ? `${index === filterData.length - 1
                  ? "rounded-r-md"
                  : "rounded-l-md"
                } bg-[#D2D2D2] font-medium text-[#1C1C1C]`
                : ""
                }`}
              onClick={() => {
                setFilterId(index);
                if (index === 0) {
                  setProductCatalogueTab("singleProduct");
                } else if (index === 1) {
                  setProductCatalogueTab("comboProduct");
                }
              }}
            >
              {singleData.label}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <>

      <div>
        {filterComponent()}

        {/* Display Address */}
        <div className="mt-4 overflow-y-auto h-[425px]">
          <div className="flex flex-col mt-1">
            <h1 className="text-[#323232] leading-8 font-Lato text-[24px] font-normal flex mb-4">
              <img src={DeliceryIcon} alt="" className="mr-2" /> By Category
            </h1>

            <div className="flex gap-x-3">
              <ProductCategoryBox
                className="!border-2 !border-[#1C1C1C]"
                textClassName="!text-[14px] !font-semibold !leading-[18px] !font-Open"
                image={ProductIcon}
                productName="Fashion"
              />
              <ProductCategoryBox
                className="!border-2 !border-[#1C1C1C]"
                textClassName="!text-[14px] !font-semibold !leading-[18px] !font-Open"
                image={CategoryLogo}
                productName="Electronics"
              />
              <ProductCategoryBox
                className="!border-2 !border-[#1C1C1C]"
                textClassName="!text-[14px] !font-semibold !leading-[18px] !font-Open"
                image={Categorylogo2}
                productName="LifeStyle"
              />
              <ProductCategoryBox
                className="!border-2 !border-[#1C1C1C]"
                textClassName="!text-[14px] !font-semibold !leading-[18px] !font-Open"
                image={Categorylogo2}
                productName="LifeStyle"
              />
              <ProductCategoryBox
                className="!border-2 !border-[#1C1C1C]"
                textClassName="!text-[14px] !font-semibold !leading-[18px] !font-Open"
                image={SportsLogo}
                productName="Sports"
              />
              <ProductCategoryBox
                className="!border-2 !border-[#1C1C1C]"
                textClassName="!text-[14px] !font-semibold !leading-[18px] !font-Open"
                image={FitnessCategoryLogo}
                productName="Fitness"
              />
              <ProductCategoryBox
                className="!border-2 !border-[#1C1C1C]"
                textClassName="!text-[14px] !font-semibold !leading-[18px] !font-Open"
                image={GiftLogo}
                productName="Gift"
              />
              <ProductCategoryBox
                className="!border-2 !border-[#1C1C1C]"
                textClassName="!text-[14px] !font-semibold !leading-[18px] !font-Open"
                image={FitnessCategoryLogo}
                productName="Fitness"
              />
            </div>
          </div>

          <div className="mt-[26px]">
            <h1 className="text-[#323232] text-[24px] font-normal leading-8 font-Lato flex mb-4">
              <img src={DeliveryIcon} alt="" className="mr-2" />
              Most Viewed
            </h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-center mt-1 gap-y-6">
              {productData?.map((data: any, index: number) => {
                if (filterId === 0) {
                  return (
                    <div
                      key={index}
                      className="w-[272px] h-[76px]"
                    // onClick={() => setViewed(index)}
                    >
                      <ProductBox
                        image={
                          (data?.images?.length > 0 && data?.images[0].url) ||
                          ""
                        }
                        productName={data?.productName}
                        weight={`${data?.weight?.deadWeight} ${data?.weight?.deadWeightUnit}`}
                        dimension={`${data?.dimensions?.length} x ${data?.dimensions?.width} x ${data?.dimensions?.height} ${data?.dimensions?.unit}`}
                        className={`cursor-pointer p-[16px] ${viewed === index
                          ? "border-2 border-solid border-[#004EFF]"
                          : ""
                          }`}
                      />
                    </div>
                  );
                } else if (filterId === 1) {
                  return (
                    <div
                      className="w-[272px] h-[76px]"
                    // onClick={() => setViewed(index)}
                    >
                      <ProductBox
                        image={StackLogo}
                        productName={data?.comboProductName}
                        weight={`${data?.totalDeadWeight} ${data?.deadWeightUnit}`}
                        dimension={`${data?.totalPrice}`}
                        className={`cursor-pointer p-[16px] ${viewed === index
                          ? "border-2 border-solid border-[#004EFF]"
                          : ""
                          }`}
                        label={`Product: ${data?.productCount || 4}`}
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
        <div className="absolute bottom-24">
          {totalItemCount > 0 && (
            <PaginationComponent
              totalItems={totalItemCount}
              itemsPerPageOptions={[10, 20, 30, 50]}
              onPageChange={onPageIndexChange}
              onItemsPerPageChange={onPerPageItemChange}
            />
          )}
        </div>
      </div>

      <div className="mt-[26px]">
        <h1 className="text-[#323232] text-[24px] font-normal leading-8 font-Lato flex mb-4">
          <img src={DeliveryIcon} alt="" className="mr-2" />
          Most Viewed

        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-center mt-1 gap-y-6 pt-4">
          {productData?.map((data: any, index: number) => {
            if (filterId === 0) {
              return (
                <div
                  key={index}
                  className="w-[272px] h-[76px]"
                // onClick={() => setViewed(index)}
                >
                  <ProductBox
                    image={
                      (data?.images?.length > 0 && data?.images[0].url) || ""
                    }
                    productName={data?.name}
                    weight={`${data?.appliedWeight} ${data?.weightUnit}`}
                    height={data?.height}
                    breadth={data?.breadth}
                    length={data?.length}
                    className={`cursor-pointer p-[16px] ${viewed === index
                      ? "border-2 border-solid border-[#004EFF]"
                      : ""
                      }`}
                  />
                </div>
              );
            } else if (filterId === 1) {
              return (
                <div
                  className="w-[272px] h-[76px] my-2"
                  key={`${data.name}_${index}`}
                >
                  <ComboProductBox
                    image={StackLogo}
                    productName={data?.name}
                    weight={`${data?.totalDeadWeight} ${data?.weightUnit}`}
                    Value={data?.totalValue}
                    dimension={`${data?.totalPrice}`}
                    className={`cursor-pointer p-[16px] ${viewed === index
                      ? "border-2 border-solid border-[#004EFF]"
                      : ""
                      }`}
                    label={`Product: ${data?.products?.length}`}
                    data={data}
                    index={index}
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="absolute bottom-24">
        {totalItemCount > 0 && (
          <PaginationComponent
            totalItems={totalItemCount}
            itemsPerPageOptions={[10, 20, 30, 50]}
            onPageChange={onPageIndexChange}
            onItemsPerPageChange={onPerPageItemChange}
          />
        )}
      </div>
    </>
  );
};

export default ProductCatalogue;
