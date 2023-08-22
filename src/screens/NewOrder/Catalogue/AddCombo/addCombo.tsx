import NavBar from "../../../../layout/NavBar";
import BackArrow from "../../../../assets/Catalogue/backBTN.svg";
import AddOrder from "../../../../assets/Catalogue/add_order.svg";
import ButtonIcon from "../../../../assets/Product/Button.svg";
import { useState } from "react";
import { productCatalogueData } from "../../../../utils/dummyData";
import { useNavigate } from "react-router-dom";
import DynamicBtnWithScroll from "../../../../components/DynamicButtonScrollForDay/index";
import ProductBox from "../../Product/productBox";
import ProductIcon from "../../../../assets/Catalogue/Product.svg";
import ItemIcon from "../../../../assets/Product/Item.svg";
import { useSelector, useDispatch } from "react-redux";
import { productBtnName } from "../../../../redux/reducers/catalogue";
import CustomButton from "../../../../components/Button";
import ServiceButton from "../../../../components/Button/ServiceButton";
import BottomLayout from "../../../../components/Layout/bottomLayout";
import DeliceryIcon from "../../../../assets/Delivery Icon.svg";

const ProductCatalogue = () => {
  // console.log('useSelector :',useSelector(state:any));

  const catalogueState = useSelector((state: any) => state?.catalogue);
  const [viewed, setViewed] = useState(-1);
  const [disabled, setDisabled] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="relative">
      <div className="px-5">
        <div className="hidden ml-[60px] mt-5 lg:block ">
          <p className="font-normal text-[14px] text-[#777777] ">
            Home /
            <span className="font-semibold text-[14px] text-[#1C1C1C]">
              Catalogue
            </span>
          </p>
        </div>
        <div className="hidden lg:flex lg:justify-between flex-row gap-x-1 mb-5 items-center ml-5">
          <div className="flex">
            <img
              src={BackArrow}
              alt=""
              className="cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <p className="font-bold text-[28px] text-[#1C1C1C]">Add Combo</p>
          </div>
          <div className="flex">
            <div className="mr-5">
              <CustomButton
                icon={AddOrder}
                showIcon={true}
                text={"UPLOAD"}
                className="!p-3"
                onClick={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </div>
            <div className="mr-5">
              <CustomButton
                icon={AddOrder}
                showIcon={true}
                text={"FROM CHANNEL"}
                className="!p-3"
                onClick={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-1">
          <h1 className="px-4 text-[#323232] text-[24px] font-normal flex mb-4">
            <img src={DeliceryIcon} alt="" className="mr-2" /> By Category
          </h1>
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

        <div className="mt-[26px]">
          <h1 className="px-4 text-[#323232] text-[24px] font-normal flex mb-4">
            <img src={DeliceryIcon} alt="" className="mr-2" />
            {viewed === -1 ? "Most Used" : "Most Viewed"}
          </h1>
          <div className="grid grid-cols-4 px-4 justify-center mt-1 gap-x-[25px] gap-y-[34px]">
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
        <div className="flex mt-[33px] ml-5 cursor-pointer  p-[8px] bg-[#F2F6FF] w-[174px]">
          <img
            src={ButtonIcon}
            className="ml-[25px]"
            alt="Add Product"
            width="16px"
          />
          <span
            className="ml-2 text-[#004EFF] text-[14px]"
            onClick={function (): void {
              navigate("/neworder/channel-integration/addcomboproduct");
            }}
          >
            Add Product
          </span>
        </div>
      </div>
      <div>
        <BottomLayout backButtonText="BACK" nextButtonText="SAVE" />
      </div>
    </div>
  );
};
export default ProductCatalogue;
