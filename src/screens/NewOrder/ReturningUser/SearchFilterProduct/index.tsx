import * as React from "react";
import BackArrow from "../../../../assets/backArrow.svg"
import CloseIcon from "../../../../assets/Product/close.svg";
import DeliveryIcon from "../../../../assets/Product/Delivery (1).svg";        
import ProductIcon from "../../../../assets/Product/Product (3).svg";
import ItemIcon from "../../../../assets/Product/Item.svg";
import CategoryLogo from "../../../../assets/Product/Item.svg";
import Categorylogo2 from "../../../../assets/Product/watch.svg";
import SportsLogo from "../../../../assets/Product/sports.svg";
import FitnessCategoryLogo from "../../../../assets/Product/fitness.svg";
import GiftLogo from "../../../../assets/Product/gift.svg";
import InputBox from "../../../../components/InputBox/index";
import ProductCategoryBox from "./ProductCategoryBox";
import ProductBox from "../../Product/productBox";
import "../../../../styles/searchFilter.css";
import ProductCardQuantity from "../Product/productCardQuantity";
import {productCardQuantity} from "../../../../utils/dummyData"

interface IIndexProps {}
const Index: React.FunctionComponent<IIndexProps> = (props) => {
  return (
    <div className="ml-5">
      <div className="flex justify-between mr-5 mt-[24px]">
        <div className="flex gap-x-2">
          <img src={BackArrow} alt="" />
          <h1 className="text-[18px] font-bold leading-6">Search Product</h1>
        </div>
        <div>
          <img src={CloseIcon} alt="Close icon" />
        </div>
      </div>
      <div className="mr-5 mt-5">
        <InputBox label="Search any product" />
      </div>
      <div className="my-5 flex gap-x-2">
        <img src={DeliveryIcon} alt="Delivery icon" />
        <p className="text-lg font-medium leading-6">By Category</p>
      </div>
      <div className="mt-[18px] hide-scrollbar overflow-x-scroll">
        <div className="gap-x-3 flex">
          <ProductCategoryBox image={ProductIcon} productName="Fashion" />
          <ProductCategoryBox image={CategoryLogo} productName="Electronics" />
          <ProductCategoryBox image={Categorylogo2} productName="LifeStyle" />
          <ProductCategoryBox image={SportsLogo} productName="Sports" />
          <ProductCategoryBox
            image={FitnessCategoryLogo}
            productName="Fitness"
          />
        </div>
        <div className="gap-x-3 mt-3 flex">
         
          <ProductCategoryBox image={Categorylogo2} productName="LifeStyle" />
          <ProductCategoryBox image={SportsLogo} productName="Sports" />
          <ProductCategoryBox image={GiftLogo} productName="Gift" />
          <ProductCategoryBox image={CategoryLogo} productName="Electronics" />
        </div>
      </div>
      <div className="mt-10 flex gap-x-2">
        <img src={DeliveryIcon} alt="Delivery icon" />
        <p className="text-lg font-medium leading-6">Most Used</p>
      </div>
      <div className="grid-span-3 overflow-x-scroll hide-scrollbar mt-4 ">
        <div className="grid grid-flow-col auto-cols-max gap-y-6 gap-x-3">
          <ProductBox
            image={ItemIcon}
            productName="Mac book air"
            weight="5"
            dimension="12 x 12 x 12"
          />
          <ProductBox
            image={ItemIcon}
            productName="Mac book air"
            weight="5"
            dimension="12 x 12 x 12"
          />
          <ProductBox
            image={ItemIcon}
            productName="Mac book air"
            weight="5"
            dimension="12 x 12 x 12"
          />
          <ProductBox
            image={ItemIcon}
            productName="Mac book air"
            weight="5"
            dimension="12 x 12 x 12"
          />
        </div>
        <div className="grid grid-flow-col auto-cols-max gap-y-4 gap-x-3 mt-3">
          <ProductBox
            image={ItemIcon}
            productName="Mac book air"
            weight="5"
            dimension="12 x 12 x 12"
          />
          <ProductBox
            image={ItemIcon}
            productName="Mac book air"
            weight="5"
            dimension="12 x 12 x 12"
          />
          <ProductBox
            image={ItemIcon}
            productName="Mac book air"
            weight="5"
            dimension="12 x 12 x 12"
          />
        </div>
      </div>
      <div className="mt-10 flex gap-x-2">
        <img src={DeliveryIcon} alt="Delivery icon" />
        <p className="text-lg font-medium leading-6">Top Added</p>
      </div>
      <div className="grid-span-3 overflow-x-scroll hide-scrollbar mt-4 ">
        <div className="grid grid-flow-col auto-cols-max gap-y-4 gap-x-3">
          <ProductBox
            image={ItemIcon}
            productName="Mac book air"
            weight="5"
            dimension="12 x 12 x 12"
          />
          <ProductBox
            image={ItemIcon}
            productName="Mac book air"
            weight="5"
            dimension="12 x 12 x 12"
          />
          <ProductBox
            image={ItemIcon}
            productName="Mac book air"
            weight="5"
            dimension="12 x 12 x 12"
          />
        </div>
        <div className="grid grid-flow-col auto-cols-max gap-y-4 gap-x-3 mt-3">
       
           <ProductCardQuantity props={productCardQuantity} className="w-[229.78px]" />
           <ProductCardQuantity props={productCardQuantity} className="w-[229.78px]"/>
           <ProductCardQuantity props={productCardQuantity} className="w-[229.78px]"/>
        </div>
      </div>
    </div>
  );
};
export default Index;