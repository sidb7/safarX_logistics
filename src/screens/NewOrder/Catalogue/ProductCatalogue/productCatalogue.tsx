import NavBar from "../../../../layout/NavBar";
import { useState } from "react";
import { productCatalogueData } from "../../../../utils/dummyData";
import { useNavigate } from "react-router-dom";
import DynamicBtnWithScroll from "../../../../components/DynamicButtonScroll/index";
import ProductBox from "../../Product/productBox";
import ProductIcon from "../../../../assets/Catalogue/Product.svg";
import ItemIcon from "../../../../assets/Product/Item.svg";
import { useSelector, useDispatch } from "react-redux";
import { productBtnName } from "../../../../redux/reducers/catalogue";

const ProductCatalogue = () => {
  // console.log('useSelector :',useSelector(state:any));

  const catalogueState = useSelector(
    (state: any) => state?.rootReducer?.catalogue
  );
  console.log("reduxstate :", catalogueState);

  const dispatch = useDispatch();
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

      {catalogueState?.productBtnName === "Single Product" && (
        <div className="grid grid-cols-4 px-4 justify-center mt-1 gap-x-[25px] gap-y-[34px]">
          {productCatalogueData.map((item: any, index: number) => (
            <div className="w-[272px] h-[76px]">
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
        <div className="grid grid-cols-4 px-4 justify-center mt-1 gap-x-[25px] gap-y-[34px]">
          {productCatalogueData.map((item: any, index: number) => (
            <div className="w-[272px] h-[76px]">
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
