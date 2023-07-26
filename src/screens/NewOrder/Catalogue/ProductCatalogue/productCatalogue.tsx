import NavBar from "../../../../layout/NavBar";
import { useState } from "react";
import { productCatalogueData } from "../../../../utils/dummyData";
import { useNavigate } from "react-router-dom";
import DynamicBtnWithScroll from "../../../../components/DynamicButtonScroll/index";
import ProductBox from "../../Product/productBox";
import ProductIcon from "../../../../assets/Catalogue/Product.svg";
import ItemIcon from "../../../../assets/Product/Item.svg";

const ProductCatalogue = () => {
  const navigate = useNavigate();

  const [statusId, setStatusId] = useState(-1);

  const [statusData, setStatusData] = useState("single_product");
  console.log("statusId", statusId);

  return (
    <div>
      <header className="fixed top-0 z-10 w-full">
        <NavBar />
      </header>
      <div className="flex ml-5 overflow-x-scroll cursor-pointer  whitespace-nowrap mt-5 h-[48px]">
        <div
          className={`flex items-center border-solid border-2 border-[#E8E8E8] rounded-l px-4 ${
            statusData === "single_product"
              ? " !bg-[#F6F6F6] !border-[#D2D2D2]"
              : ""
          }`}
          onClick={() => setStatusData("single_product")}
        >
          <span
            className={`text-[#777] text-[14px] ${
              statusData === "single_product" ? "!text-[#1C1C1C]" : ""
            }`}
          >
            Single Product
          </span>
        </div>
        <div
          className={`flex items-center border-solid border-2 cursor-pointer border-[#E8E8E8] rounded-r px-4 ${
            statusData === "combo_product"
              ? " !bg-[#F6F6F6] !border-[#D2D2D2]"
              : ""
          }`}
          onClick={() => setStatusData("combo_product")}
        >
          <span
            className={`text-[#777] text-[14px] ${
              statusData === "combo_product" ? "!text-[#1C1C1C]" : ""
            }`}
          >
            Combo Product
          </span>
        </div>
      </div>

      <div className="flex mt-1">
        <DynamicBtnWithScroll
          items={[
            { label: "Fashion", icons: ProductIcon },
            { label: "Electronics", icons: ProductIcon },
            { label: "Lifestyle", icons: ProductIcon },
            { label: "Sports", icons: ProductIcon },
            { label: "Fitness", icons: ProductIcon },
            { label: "Fashion", icons: ProductIcon },
            { label: "Fashion", icons: ProductIcon },
            { label: "Fitness", icons: ProductIcon },
          ]}
          onClick={() => {}}
        />
      </div>

      <div className="grid grid-cols-4 px-4 justify-center mt-1">
        {productCatalogueData.map((item: any, index: number) => (
          <div className="w-[272px]">
            <ProductBox
              image={ItemIcon}
              productName="Mac book air"
              weight="5"
              dimension="12 x 12 x 12"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductCatalogue;
