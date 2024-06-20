import React, { useEffect, useState } from "react";
import PaginationComponent from "../../../../components/Pagination";
import ProductBox from "../../Product/ProductBox";
import ProductCategoryBox from "../../ReturningUser/SearchFilterProduct/ProductCategoryBox";
import DeliceryIcon from "../../../../assets/Delivery Icon.svg";
import DeliveryIcon from "../../../../assets/Product/Delivery (1).svg";
import ProductIcon from "../../../../assets/Product/Product (3).svg";
import ItemIcon from "../../../../assets/Product/Item.svg";
import CategoryLogo from "../../../../assets/Product/Item.svg";
import Categorylogo2 from "../../../../assets/Product/watch.svg";
import SportsLogo from "../../../../assets/Product/sports.svg";
import FitnessCategoryLogo from "../../../../assets/Product/fitness.svg";
import GiftLogo from "../../../../assets/Product/gift.svg";
import StackLogo from "../../../../assets/Catalogue/StackIcon.svg";
import { POST } from "../../../../utils/webService";
import CenterModal from "../../../../components/CustomModal/customCenterModal";
import {
  GET_ALL_STORES,
  GET_CHANNEL_INVENTORY,
  GET_COMBO_PRODUCT,
  GET_PRODUCTS,
  DELETE_PRODUCT,
  DELETE_COMBO_PRODUCT,
} from "../../../../utils/ApiUrls";
import ComboProductBox from "../../../../components/ComboProductBox";
import { toast } from "react-hot-toast";
import EditProduct from "./editProduct";
import axios from "axios";
import { Spinner } from "../../../../components/Spinner";
import WebCrossIcon from "../../../../assets/PickUp/ModalCrossWeb.svg";
import ServiceButton from "../../../../components/Button/ServiceButton";
import DeleteGifIcon from "../../../../assets/deleteGif.svg";
import ShopifyRibbon from "../../../../assets/Catalogue/shopifyRibbon.png";
import WooCommerceRibbon from "../../../../assets/Catalogue/woocommerceRibbon.png";
import ShipyaariRibbon from "../../../../assets/Catalogue/shipyaariRibbon.png";
import OneButton from "../../../../components/Button/OneButton";
import UniCommerceRibbon from "../../../../assets/Catalogue/uniCommerceRibbon.png";

interface IProductCatalogue {
  setProductCatalogueTab: React.Dispatch<React.SetStateAction<string>>;
  isModalOpen?: any;
}

const ProductCatalogue: React.FunctionComponent<IProductCatalogue> = ({
  setProductCatalogueTab,
  isModalOpen,
}) => {
  const [productData, setProductData] = useState([]);
  const [channelProducts, setChannelProducts]: any = useState([]);
  const [editProductData, setEditProductData] = useState();
  const [filterId, setFilterId] = useState(0);
  const [totalItemCount, setTotalItemCount] = useState(0);

  const [viewed, setViewed] = useState(-1);
  const [showComboProductList, setShowComboProductList] = useState(false);
  const [editAddressModal, setEditAddressModal] = useState<any>(false);
  const [channels, setChannels] = useState([]);
  const [isActiveChannel, setIsActiveChannel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteProductsData, setDeleteProductsData] = useState({
    singleProduct: "",
    comboProduct: "",
  });

  const [filterData, setFilterData] = useState([
    { label: "Single Product", isActive: false },
    { label: "Combo Product", isActive: false },
  ]);

  //on page change index
  const onPageIndexChange = async (pageIndex: any) => {
    const { data } = await POST(
      filterId === 0 ? GET_PRODUCTS : GET_COMBO_PRODUCT,
      {
        skip: (pageIndex?.currentPage - 1) * pageIndex?.itemsPerPage,
        limit: pageIndex?.itemsPerPage,
        pageNo: pageIndex?.currentPage,
      }
    );
    if (data?.success) {
      setProductData(data?.data);
      setTotalItemCount(data?.totalProduct);
    } else {
      setProductData([]);
      toast.error(data?.message);
    }
  };

  // on per page item change
  const onPerPageItemChange = async (pageperItem: any) => {
    const { data } = await POST(
      filterId === 0 ? GET_PRODUCTS : GET_COMBO_PRODUCT,
      {
        skip: (pageperItem?.currentPage - 1) * pageperItem?.itemsPerPage,
        limit: pageperItem?.itemsPerPage,
        pageNo: pageperItem?.currentPage,
      }
    );
    if (data?.success) {
      setProductData(data?.data);
      setTotalItemCount(data?.totalProduct);
    } else {
      setProductData([]);
      toast.error(data?.message);
    }
  };

  const getProducts = async () => {
    setLoading(true);
    const { data } = await POST(
      filterId === 0 ? GET_PRODUCTS : GET_COMBO_PRODUCT,
      {
        skip: 0,
        limit: 10,
        pageNo: 1,
      }
    );

    if (data?.success) {
      setLoading(false);
      setProductData(data.data);
      setTotalItemCount(data?.totalProduct);
    } else {
      setLoading(false);
      setProductData([]);
      toast.error(data?.message);
    }
    if (filterId === 1) return;
    // let incomingChannelProducts = [];
    // const { data: storeDetails } = await POST(GET_ALL_STORES, {});

    // let channelName: any = [];
    // storeDetails?.data?.map((elem: any) => {
    //   channelName.push(elem.channel);
    // });

    // const { data: channelInventory } = await POST(GET_CHANNEL_INVENTORY, {
    //   channels: channelName,
    // });
    // setChannels(channelName);

    // for (let elem of channelInventory?.data) {
    //   incomingChannelProducts.push({
    //     image: elem?.images?.[0]?.src || "",
    //     productName: elem?.title,
    //     weight: +(elem?.variants?.[0]?.grams / 1000).toFixed(2) || "",
    //     height: +(elem?.variants?.[0]?.grams / 3000).toFixed(2) || "",
    //     breadth: +(elem?.variants?.[0]?.grams / 3000).toFixed(2) || "",
    //     length: +(elem?.variants?.[0]?.grams / 3000).toFixed(2) || "",
    //   });
    // }

    // setChannelProducts(incomingChannelProducts);

    setLoading(false);
  };

  // useEffect(() => {
  //   if (!isModalOpen) {
  //     (async () => {
  //       await getProducts();
  //     })();
  //   }
  // }, [isModalOpen]);

  useEffect(() => {
    (async () => {
      await getProducts();
    })();
  }, [filterId, editAddressModal, isModalOpen]);

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

  const deleteAddress = async () => {
    try {
      let payload, deleteUrl;

      if (filterId === 0) {
        deleteUrl = DELETE_PRODUCT;
        payload = { productId: deleteProductsData.singleProduct };
      } else {
        deleteUrl = DELETE_COMBO_PRODUCT;

        payload = { id: deleteProductsData.comboProduct };
      }

      const { data: response }: any = await POST(deleteUrl, payload);

      if (response?.success) {
        await getProducts();
      }
    } catch (error) {
      console.error(" ERROR", error);
      return error;
    }
  };

  const deleteModalContent = () => {
    return (
      <div className="flex flex-col  h-full w-full   p-5">
        <div className="flex justify-end">
          <img
            src={WebCrossIcon}
            alt=""
            className="cursor-pointer"
            onClick={() => setIsDeleteModalOpen(false)}
          />
        </div>
        <div className="flex flex-col justify-center  items-center h-full w-full  ">
          <img src={DeleteGifIcon} alt="" />
          <p className="font-Open text-sm md:text-base font-semibold text-center">
            Are you sure you want to delete this product?
          </p>
          <div className="flex  items-center gap-x-4 mt-10">
            {/* <ServiceButton
              text="Yes"
              className="bg-[#ffffff] px-4 py-2 text-[#1c1c1c] font-semibold text-sm"
              onClick={() => {
                deleteAddress();
                setIsDeleteModalOpen(false);
              }}
            /> */}
            <OneButton
              text="Yes"
              className="px-4 py-2"
              onClick={() => {
                deleteAddress();
                setIsDeleteModalOpen(false);
              }}
              variant="secondary"
            />
            {/* <ServiceButton
              text="No"
              className="bg-[#1C1C1C] px-4 py-2 text-white font-semibold text-sm"
              onClick={() => setIsDeleteModalOpen(false)}
            /> */}
            <OneButton
              text={"No"}
              onClick={() => setIsDeleteModalOpen(false)}
              variant="primary"
              className="px-4 py-2"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div>
        {filterComponent()}

        {/* Display Address */}
        <div className="mt-4 customScroll">
          {/* commented as not required for now */}
          {/* <div className="flex flex-col mt-1">
            <h1 className="text-[#323232] leading-8 font-Lato text-[24px] font-normal flex mb-4">
              <img src={DeliceryIcon} alt="" className="mr-2" /> By Category
            </h1>

            <div className="flex gap-x-3 overflow-auto">
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
            </div>
            <div className="flex mt-2 gap-x-3 overflow-auto">
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
          </div> */}
          <div className="mt-[26px]">
            <h1 className="text-[#323232] text-[24px] font-normal leading-8 font-Lato flex mb-4">
              <img src={DeliveryIcon} alt="" className="mr-2" />
              Most Viewed
            </h1>

            {loading ? (
              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Spinner />
              </div>
            ) : (
              <div>
                <div className="flex flex-col lg:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  justify-center mt-1 gap-y-6 pt-4">
                  {productData?.map((data: any, index: number) => {
                    if (filterId === 0) {
                      return (
                        <div
                          key={index}
                          className="w-[95%] lg:min-h-full flex border-2 rounded-md"
                          // onClick={() => setViewed(index)}
                        >
                          <div className="w-[20%]">
                            <img
                              src={
                                data?.source === "SHOPIFY"
                                  ? ShopifyRibbon
                                  : data?.source === "WOOCOMMERCE"
                                  ? WooCommerceRibbon
                                  : data?.source === "UNICOMMERCE"
                                  ? UniCommerceRibbon
                                  : ShipyaariRibbon
                              }
                            />
                          </div>
                          <div className="w-[80%] ml-[-5%]">
                            <ProductBox
                              image={
                                (data?.images?.length > 0 &&
                                  data?.images?.[0]?.url) ||
                                data?.images?.[0] ||
                                ItemIcon
                              }
                              productName={data?.name}
                              weight={`${data?.appliedWeight} ${data?.weightUnit}`}
                              height={data?.height}
                              breadth={data?.breadth}
                              length={data?.length}
                              editMode={true}
                              productId={data?.productId}
                              className={`cursor-pointer p-[16px] pl-0  ${
                                viewed === index
                                  ? "border-2 border-solid border-[#004EFF]"
                                  : ""
                              } !border-0`}
                              onClickEdit={() => {
                                setEditAddressModal(true);
                                setEditProductData(data);
                              }}
                              setIsDeleteModalOpen={setIsDeleteModalOpen}
                              setDeleteProductsData={setDeleteProductsData}
                              deleteProductsData={deleteProductsData}
                              productNameClass={`w-[80%]`}
                            />
                          </div>
                        </div>
                      );
                    } else if (filterId === 1) {
                      return (
                        <div className="w-[95%]" key={`${data.name}_${index}`}>
                          <ComboProductBox
                            image={StackLogo}
                            source={data?.source}
                            productName={data?.name}
                            weight={`${data?.totalDeadWeight} ${data?.weightUnit}`}
                            Value={data?.totalValue}
                            dimension={`${data?.totalPrice}`}
                            className={`cursor-pointer p-[16px] ${
                              viewed === index
                                ? "border-2 border-solid border-[#004EFF]"
                                : ""
                            }`}
                            label={`Product: ${data?.products?.length || ""}`}
                            data={data}
                            index={index}
                            productId={data?.id}
                            setIsDeleteModalOpen={setIsDeleteModalOpen}
                            setDeleteProductsData={setDeleteProductsData}
                            deleteProductsData={deleteProductsData}
                          />
                        </div>
                      );
                    }
                  })}
                </div>
                {totalItemCount > 0 && (
                  <PaginationComponent
                    totalItems={totalItemCount}
                    itemsPerPageOptions={[10, 20, 30, 50]}
                    onPageChange={onPageIndexChange}
                    onItemsPerPageChange={onPerPageItemChange}
                  />
                )}
              </div>
            )}
          </div>
        </div>
        {/* {channels.length > 0 && filterId === 0 && (
          <div className="flex flex-col mt-8">
            <h1 className="text-[#323232] leading-8 font-Lato text-[24px] font-normal flex mb-4">
              <img src={DeliceryIcon} alt="" className="mr-2" /> By Channel
            </h1>

            <div className="flex gap-x-3 pt-4 mb-4">
              {channels?.map((channel: any, index) => (
                <ProductCategoryBox
                  key={index}
                  className={`!border-2 !p-[25px] border-[#d2d5d7] ${
                    isActiveChannel
                      ? "!border-2 !border-[blue]"
                      : "!border-2 !border-[#d2d5d7]"
                  }`}
                  textClassName="!text-[14px] !font-semibold !leading-[18px] !font-Open"
                  image={
                    channel === "SHOPIFY"
                      ? "https://sy-seller.s3.ap-south-1.amazonaws.com/logos/shopify.png"
                      : "https://sy-seller.s3.ap-south-1.amazonaws.com/logos/woocommerce.png"
                  }
                  productName=""
                  imageClassName="w-[7rem]"
                  onClick={() => setIsActiveChannel(!isActiveChannel)}
                />
              ))}
            </div>
            {isActiveChannel && (
              <div className="grid mb-[4rem] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-center mt-1 gap-y-6 pt-4">
                {channelProducts?.map((data: any, index: any) => (
                  <div
                    key={index}
                    className="w-[100%] lg:w-[272px] h-[76px]"
                    // onClick={() => setViewed(index)}
                  >
                    <ProductBox
                      image={data?.image || ItemIcon}
                      productName={data?.productName}
                      weight={`${data?.weight} Kg`}
                      height={data?.height}
                      breadth={data?.breadth}
                      length={data?.length}
                      onClickEdit={() => {
                        setEditAddressModal(true);
                        setEditProductData(data);
                      }}
                      isActiveChannel={isActiveChannel}
                      className={`cursor-pointer p-[16px] ${
                        viewed === index
                          ? "border-2 border-solid border-[#004EFF]"
                          : ""
                      }`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )} */}
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
      </div>
      {editAddressModal && (
        <EditProduct
          editAddressModal={editAddressModal}
          setEditAddressModal={setEditAddressModal}
          editProductData={editProductData}
        />
      )}

      <CenterModal
        isOpen={isDeleteModalOpen}
        className="!w-[30%] !h-[40%] !absolute !z-20 "
        onRequestClose={() => setIsDeleteModalOpen(false)}
      >
        {deleteModalContent()}
      </CenterModal>

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
    </div>
  );
};

export default ProductCatalogue;
