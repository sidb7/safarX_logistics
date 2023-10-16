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
  GET_ALL_STORES,
  GET_COMBO_PRODUCT,
  GET_PRODUCTS,
} from "../../../../utils/ApiUrls";
import ComboProductBox from "../../../../components/ComboProductBox";
import { toast } from "react-toastify";
import EditProduct from "./editProduct";
import axios from "axios";
import { Spinner } from "../../../../components/Spinner";

interface IProductCatalogue {
  setProductCatalogueTab: React.Dispatch<React.SetStateAction<string>>;
}

const ProductCatalogue: React.FunctionComponent<IProductCatalogue> = ({
  setProductCatalogueTab,
}) => {
  const [productData, setProductData] = useState([]);
  const [channelProducts, setChannelProducts] = useState([]);
  const [editProductData, setEditProductData] = useState();
  const [filterId, setFilterId] = useState(0);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [viewed, setViewed] = useState(-1);
  const [showComboProductList, setShowComboProductList] = useState(false);
  const [editAddressModal, setEditAddressModal] = useState<any>(false);
  const [channels, setChannels] = useState([]);
  const [isActiveChannel, setIsActiveChannel] = useState(false);
  const [loading, setLoading] = useState(true);

  const [filterData, setFilterData] = useState([
    { label: "Single Product", isActive: false },
    { label: "Combo Product", isActive: false },
  ]);

  //on page change index
  const onPageIndexChange = () => {};

  // on per page item change
  const onPerPageItemChange = () => {};

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
      const { data: storeDetails } = await POST(GET_ALL_STORES, {});
      let channelName: any = [];
      // storeDetails?.data?.map((item:any)=> {
      //   if(!channelName.includes(item.channel)) channelName.push()
      // })
      let incomingChannelProducts: any = [];
      let channelProductArr: any = [];
      try {
        for (const elem of storeDetails?.data) {
          if (elem.channel !== "WOOCOMMERCE") continue;
          let auth = {
            username: elem.consumerKey,
            password: elem.consumerSecret,
          };
          const { data: products } = await axios.get(
            `${elem.storeUrl}/wp-json/wc/v3/products`,
            { auth }
          );
          incomingChannelProducts = [...incomingChannelProducts, ...products];
          if (!channelName.includes(elem.channel))
            channelName.push(elem.channel);
        }
        setChannels(channelName);
        console.log("productData: ", productData);
        incomingChannelProducts.map((item: any) => {
          channelProductArr.push({
            name: item?.name,
            category: "",
            qty: "",
            currency: "USD",
            unitPrice: item?.price,
            unitTax: "",
            measureUnit: "cm",
            length: item?.dimensions?.length,
            breadth: item?.dimensions?.width,
            height: item?.dimensions?.height,
            deadWeight: item?.weight,
            weightUnit: "kg",
            volumetricWeight:
              (item?.dimensions?.length *
                item?.dimensions?.width *
                item?.dimensions?.height) /
              5000,
            appliedWeight: Math.max(
              item?.weight,
              (item?.dimensions?.length *
                item?.dimensions?.width *
                item?.dimensions?.height) /
                5000
            ),
            divisor: 5000,
            images: item?.images?.[0]?.src,
          });
        });
        setChannelProducts(channelProductArr);
        console.log("channelProducts: ", channelProducts);
        console.log("channels: ", channels);
      } catch (error) {}
      setLoading(false);
    })();
  }, [filterId, editAddressModal]);

  const filterComponent = (className?: string) => {
    return (
      <div
        className={`flex mt-6 text-[14px] text-[#777777] font-medium h-[44px]`}
      >
        {filterData?.map((singleData, index) => {
          return (
            <span
              key={index}
              className={`flex items-center py-[8px] px-[16px] border-[1px] border-[#A4A4A4] cursor-pointer ${
                filterId === index
                  ? `${
                      index === filterData.length - 1
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

  return loading ? (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <Spinner />
    </div>
  ) : (
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
                          (data?.images?.length > 0 && data?.images[0].url) ||
                          ""
                        }
                        productName={data?.name}
                        weight={`${data?.appliedWeight} ${data?.weightUnit}`}
                        height={data?.height}
                        breadth={data?.breadth}
                        length={data?.length}
                        className={`cursor-pointer p-[16px] ${
                          viewed === index
                            ? "border-2 border-solid border-[#004EFF]"
                            : ""
                        }`}
                        onClickEdit={() => {
                          setEditAddressModal(true);
                          setEditProductData(data);
                        }}
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
                        className={`cursor-pointer p-[16px] ${
                          viewed === index
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
        </div>

        {channels.length > 0 && filterId === 0 && (
          <div className="flex flex-col mt-1">
            <h1 className="text-[#323232] leading-8 font-Lato text-[24px] font-normal flex mb-4">
              <img src={DeliceryIcon} alt="" className="mr-2" /> By Channel
            </h1>

            <div className="flex gap-x-3">
              {channels.map((channel: any, index) => (
                <ProductCategoryBox
                  key={index}
                  className={`!border-2 !border-[#1C1C1C] ${
                    isActiveChannel
                      ? "border !border-[blue]"
                      : "border !border-black"
                  }`}
                  textClassName="!text-[14px] !font-semibold !leading-[18px] !font-Open"
                  image={
                    channel === "SHOPIFY"
                      ? "https://sy-seller.s3.ap-south-1.amazonaws.com/logos/shopify.png"
                      : "https://sy-seller.s3.ap-south-1.amazonaws.com/logos/woocommerce.png"
                  }
                  productName=""
                  imageClassName="w-[5rem]"
                  onClick={() => setIsActiveChannel(!isActiveChannel)}
                />
              ))}
            </div>
            {isActiveChannel && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-center mt-1 gap-y-6 pt-4">
                {channelProducts.map((data: any, index: any) => (
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
                      onClickEdit={() => {
                        setEditAddressModal(true);
                        setEditProductData(data);
                      }}
                      isActiveChannel={isActiveChannel}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

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
      {editAddressModal && (
        <EditProduct
          editAddressModal={editAddressModal}
          setEditAddressModal={setEditAddressModal}
          editProductData={editProductData}
        />
      )}
      {/* <div className="mt-[26px]">
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
      </div> */}
      {/* <div className="absolute bottom-24">
        {totalItemCount > 0 && (
          <PaginationComponent
            totalItems={totalItemCount}
            itemsPerPageOptions={[10, 20, 30, 50]}
            onPageChange={onPageIndexChange}
            onItemsPerPageChange={onPerPageItemChange}
          />
        )}
      </div> */}
    </>
  );
};

export default ProductCatalogue;
