import React, { useState } from "react";
// import BackArrow from "../../../../assets/Catalogue/backBTN.svg";
import AddOrder from "../../../../assets/Catalogue/add_order.svg";
// import ButtonIcon from "../../../../assets/Product/Button.svg";
import DeliceryIcon from "../../../../assets/Delivery Icon.svg";
import CustomButton from "../../../../components/Button";
import ProductCategoryBox from "../../ReturningUser/SearchFilterProduct/ProductCategoryBox";
import DeliveryIcon from "../../../../assets/Product/Delivery (1).svg";
import ProductIcon from "../../../../assets/Product/Product (3).svg";
import ItemIcon from "../../../../assets/Product/Item.svg";
import CategoryLogo from "../../../../assets/Product/Item.svg";
import Categorylogo2 from "../../../../assets/Product/watch.svg";
import SportsLogo from "../../../../assets/Product/sports.svg";
import FitnessCategoryLogo from "../../../../assets/Product/fitness.svg";
import GiftLogo from "../../../../assets/Product/gift.svg";
import ProductBox from "../../Product/productBox";
import { productCatalogueData } from "../../../../utils/dummyData";
import { Breadcum } from "../../../../components/Layout/breadcum";
import BottomLayout from "../../../../components/Layout/bottomLayout";
import PaginationComponent from "../../../../components/Pagination";

interface IAddcomboProps {}

const Addcombo: React.FunctionComponent<IAddcomboProps> = (props) => {
  const [totalItemCount, setTotalItemCount] = useState(10);
  const [viewed, setViewed] = useState(-1);
  //on page change index
  const onPageIndexChange = () => {};

  // on per page item change
  const onPerPageItemChange = () => {};
  return (
    <div className="h-full">
      <Breadcum
        label="Add Combo"
        component={
          <div className="flex">
            <div className="mr-4">
              <CustomButton
                icon={AddOrder}
                showIcon={true}
                text={"UPLOAD"}
                className="!p-4"
                onClick={() => {}}
              />
            </div>
            <div className="">
              <CustomButton
                icon={AddOrder}
                showIcon={true}
                text={"FROM CHANNEL"}
                className="!p-4"
                onClick={() => {}}
              />
            </div>
          </div>
        }
      />
      <div className="mx-5 overflow-y-auto h-[575px]">
        <div className="relative">
          <div className="">
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
                {productCatalogueData.map((item: any, index: number) => (
                  <div
                    className="w-[272px] h-[76px]"
                    onClick={() => setViewed(index)}
                  >
                    <ProductBox
                      image={ItemIcon}
                      productName="Mac book air"
                      weight="5"
                      dimension="12 x 12 x 12"
                      className={`cursor-pointer p-[16px] ${
                        viewed === index
                          ? "border-2 border-solid border-[#004EFF]"
                          : ""
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
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
      <BottomLayout callApi={() => {}} />
    </div>
  );
};

export default Addcombo;
