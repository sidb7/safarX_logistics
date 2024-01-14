import NavBar from "../../../../layout/Old_NavBar";
import { useState } from "react";
import { productCatalogueData } from "../../../../utils/dummyData";
import { useNavigate } from "react-router-dom";
import DynamicBtnWithScroll from "../../../../components/DynamicButtonScrollForDay/index";
import ProductBox from "../../Product/ProductBox";
import ProductIcon from "../../../../assets/Catalogue/Product.svg";
import ItemIcon from "../../../../assets/Product/Item.svg";
import { useSelector, useDispatch } from "react-redux";
import { productBtnName } from "../../../../redux/reducers/catalogue";
import watchIcon from "../../../../assets/Catalogue/watch.svg";
import SportIcon from "../../../../assets/Catalogue/sport.svg";
import fitnessIcon from "../../../../assets/Catalogue/fitnessDumble.svg";
import giftIcon from "../../../../assets/Catalogue/gift.svg";
import FoodIcon from "../../../../assets/Catalogue/food.svg";
import { log } from "console";

const ProductCatalogue = () => {
  //

  const catalogueState = useSelector((state: any) => state?.catalogue);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [statusId, setStatusId] = useState(-1);

  const [statusData, setStatusData] = useState("single_product");
  const [extraProducts, setExtraProducts] = useState(true);

  return (
    <div>
      <div className="flex ml-5 customScroll whitespace-nowrap cursor-pointer   mt-5 h-[48px]">
        <div
          className={`flex items-center border-solid border-2 border-[#E8E8E8] rounded-l px-4 ${
            catalogueState?.productBtnName === "Single Product"
              ? " !bg-[#F6F6F6] !border-[#D2D2D2]"
              : ""
          }`}
          onClick={() => dispatch(productBtnName("Single Product"))}
        >
          <span
            className={`text-[#777] text-[14px] ${
              catalogueState?.productBtnName === "Single Product"
                ? "!text-[#1C1C1C]"
                : ""
            }`}
            onClick={() => setExtraProducts(true)}
          >
            Single Product
          </span>
        </div>
        <div
          className={`flex items-center border-solid border-2 cursor-pointer border-[#E8E8E8] rounded-r px-4 ${
            catalogueState?.productBtnName === "Combo Product"
              ? " !bg-[#F6F6F6] !border-[#D2D2D2]"
              : ""
          }`}
          onClick={() => dispatch(productBtnName("Combo Product"))}
        >
          <span
            className={`text-[#777] text-[14px] ${
              catalogueState?.productBtnName === "Combo Product"
                ? "!text-[#1C1C1C]"
                : ""
            }`}
            onClick={() => setExtraProducts(false)}
          >
            Combo Product
          </span>
        </div>
      </div>

      <div className="flex mt-1 px-1 pr-5 customScroll whitespace-nowrap w-[360px] lg:w-screen ">
        {extraProducts && (
          <DynamicBtnWithScroll
            items={[
              { label: "Fashion", icons: ProductIcon },
              { label: "Electronics", icons: ItemIcon },
              { label: "Lifestyle", icons: watchIcon },
              { label: "Sports", icons: SportIcon },
              { label: "Fitness", icons: fitnessIcon },
              { label: "Fashion", icons: ProductIcon },
              { label: "Gift", icons: giftIcon },
              { label: "Food", icons: FoodIcon },
            ]}
            onClick={() => {}}
          />
        )}
      </div>

      {catalogueState?.productBtnName === "Single Product" && (
        <div className="flex flex-col lg:grid grid-cols-4  px-5 justify-center mt-1 gap-x-[25px] gap-y-[34px]">
          {productCatalogueData?.map((item: any, index: number) => (
            <div className="w-[320px] lg:w-[272px] h-[76px]" key={index}>
              <ProductBox
                image={ItemIcon}
                productName="Mac book air"
                weight="5"
                dimension="12 x 12 x 12"
                className="p-[16px]"
              />
            </div>
          ))}
        </div>
      )}

      {catalogueState?.productBtnName === "Combo Product" && (
        <div className="grid grid-cols-4 px-5 justify-center mt-1 gap-x-[25px] gap-y-[34px]">
          {productCatalogueData?.map((item: any, index: number) => (
            <div className="w-[320px] lg:w-[272px] h-[76px]" key={index}>
              <ProductBox
                image={ItemIcon}
                productName="Mac book air"
                weight="5"
                dimension="12 x 12 x 12"
                label={`Product ${index + 1}`}
                className="p-[16px]"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default ProductCatalogue;
