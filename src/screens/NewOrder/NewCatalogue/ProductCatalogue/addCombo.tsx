import React, { useEffect, useState } from "react";
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
import ProductBox from "../../Product/ProductBox";
import ComboProductBox from "../../../../components/ComboProductBox";
import { Breadcum } from "../../../../components/Layout/breadcrum";
import BottomLayout from "../../../../components/Layout/bottomLayout";
import PaginationComponent from "../../../../components/Pagination";
import { POST } from "../../../../utils/webService";
import {
  ADD_COMBO_PRODUCT_URL,
  GET_PRODUCT_URL,
} from "../../../../utils/ApiUrls";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CustomInputBox from "../../../../components/Input";

interface IAddcomboProps { }

const Addcombo: React.FunctionComponent<IAddcomboProps> = (props: any) => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState([]);
  const [selectedProducts, setSelectedProduct] = useState<any>({
    description: "",
    comboProductName: "",
    category: [],
    tags: [],
    productArrray: [],
  });
  const [selectedCatagories, setSelectedCatagories] = useState<any>({
    Fashion: false,
    Electronics: false,
    LifeStyle: false,
    Sports: false,
    Fitness: false,
    Gift: false,
  });
  const [selectedProductId, setSelectedProductId] = useState<any>({});
  const [totalItemCount, setTotalItemCount] = useState(10);
  //on page change index
  const onPageIndexChange = () => { };

  // on per page item change
  const onPerPageItemChange = () => { };

  const addCombo = async () => {
    const selectedcat = [];
    for (let key in selectedCatagories) {
      if (selectedCatagories[key]) {
        selectedcat.push(key);
      }
    }

    const selectedproduct = [];
    for (let key in selectedProductId) {
      if (selectedProductId[key]) {
        selectedproduct.push(key);
      }
    }

    const { data } = await POST(ADD_COMBO_PRODUCT_URL, {
      ...selectedProducts,
      category: selectedcat,
      productArrray: selectedProductId,
    });
    if (data?.success) {
      toast.success(data?.message);
      navigate(-1);
    } else {
      toast.error(data?.message);
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await POST(GET_PRODUCT_URL, {
        skip: 0,
        limit: 10,
        pageNo: 1,
      });
      if (data?.success) {
        setProductData(data.data);
      } else {
        setProductData([]);
        toast.error(data?.message);
      }
    })();
  }, []);

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
                onClick={() => { }}
              />
            </div>
            <div>
              <CustomButton
                icon={AddOrder}
                showIcon={true}
                text={"FROM CHANNEL"}
                className="!p-4"
                onClick={() => { }}
              />
            </div>
          </div>
        }
      />
      <div className="mx-5 overflow-y-auto h-[575px]">
        <div className="relative">
          <div>
            <div className="flex flex-col mt-1">
              <h1 className="text-[#323232] leading-8 font-Lato text-[24px] font-normal flex mb-4">
                <img src={DeliceryIcon} alt="" className="mr-2" /> By Category amit
              </h1>

              <div className="flex gap-x-3">
                <ProductCategoryBox
                  className={`!border-2 !border-[#1C1C1C] ${selectedCatagories.Fashion && "bg-gray-200"}`}
                  textClassName="!text-[14px] !font-semibold !leading-[18px] !font-Open"
                  image={ProductIcon}
                  productName="Fashion"
                  onClick={() => {
                    setSelectedCatagories({
                      ...selectedCatagories,
                      Fashion: !selectedCatagories.Fashion,
                    });
                  }}
                />
                <ProductCategoryBox
                  className={`!border-2 !border-[#1C1C1C] ${selectedCatagories.Electronics && "bg-gray-200"}`}
                  textClassName="!text-[14px] !font-semibold !leading-[18px] !font-Open"
                  image={CategoryLogo}
                  productName="Electronics"
                  onClick={() =>
                    setSelectedCatagories({
                      ...selectedCatagories,
                      Electronics: !selectedCatagories.Electronics,
                    })
                  }
                />
                <ProductCategoryBox
                  className={`!border-2 !border-[#1C1C1C] ${selectedCatagories.LifeStyle && "bg-gray-200"}`}
                  textClassName="!text-[14px] !font-semibold !leading-[18px] !font-Open"
                  image={Categorylogo2}
                  productName="LifeStyle"
                  onClick={() =>
                    setSelectedCatagories({
                      ...selectedCatagories,
                      LifeStyle: !selectedCatagories.LifeStyle,
                    })
                  }
                />

                <ProductCategoryBox
                  className={`!border-2 !border-[#1C1C1C] ${selectedCatagories.Sports && "bg-gray-200"}`}
                  textClassName="!text-[14px] !font-semibold !leading-[18px] !font-Open"
                  image={SportsLogo}
                  productName="Sports"
                  onClick={() =>
                    setSelectedCatagories({
                      ...selectedCatagories,
                      Sports: !selectedCatagories.Sports,
                    })
                  }
                />
                <ProductCategoryBox
                  className={`!border-2 !border-[#1C1C1C] ${selectedCatagories.Fitness && "bg-gray-200"}`}
                  textClassName="!text-[14px] !font-semibold !leading-[18px] !font-Open"
                  image={FitnessCategoryLogo}
                  productName="Fitness"
                  onClick={() =>
                    setSelectedCatagories({
                      ...selectedCatagories,
                      Fitness: !selectedCatagories.Fitness,
                    })
                  }
                />
                <ProductCategoryBox
                  className={`!border-2 !border-[#1C1C1C] ${selectedCatagories.Gift && "bg-gray-200"}`}
                  textClassName="!text-[14px] !font-semibold !leading-[18px] !font-Open"
                  image={GiftLogo}
                  productName="Gift"
                  onClick={() =>
                    setSelectedCatagories({
                      ...selectedCatagories,
                      Gift: !selectedCatagories.Gift,
                    })
                  }
                />
              </div>
              <div className="mt-4 w-[300px]">
                <CustomInputBox
                  label="Combo Name"
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProducts,
                      comboProductName: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="mt-[26px]">
              <h1 className="text-[#323232] text-[24px] font-normal leading-8 font-Lato flex mb-4">
                <img src={DeliveryIcon} alt="" className="mr-2" />
                Most Viewed
              </h1>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-center mt-1 gap-y-6">
                {productData?.map((data: any, index: number) => (
                  <div
                    key={index}
                    className="w-[272px] h-[76px]"
                    onClick={() => {
                      if (selectedProductId[data.productId]) {
                        setSelectedProductId({
                          ...selectedProductId,
                          [data.productId]: false,
                        });
                      } else {
                        setSelectedProductId({
                          ...selectedProductId,
                          [data.productId]: true,
                        });
                      }
                    }}
                  >
                    <ComboProductBox
                      image={
                        (data?.images?.length > 0 && data?.images[0].url) || ""
                      }
                      productName={data?.productName}
                      weight={`${data?.weight?.deadWeight} ${data?.weight?.deadWeightUnit}`}
                      dimension={`${data?.dimensions?.length} x ${data?.dimensions?.width} x ${data?.dimensions?.height} ${data?.dimensions?.unit}`}
                      className={`cursor-pointer p-[16px] ${selectedProductId[data?.productId] && "bg-gray-200"}`}
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
      <BottomLayout callApi={addCombo} />
    </div>
  );
};

export default Addcombo;
