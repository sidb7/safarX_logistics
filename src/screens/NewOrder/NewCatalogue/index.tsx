import { useEffect, useRef } from "react";
import { Breadcrum } from "../../../components/Layout/breadcrum";
import { useState } from "react";
import ChannelIntegration from "./ChannelIntegration/ChannelIntegration";
import AddressBook from "./AddressBook";
import ProductCatalogue from "./ProductCatalogue/index";
import BoxCatalogue from "./BoxCatalogue";
import ChannelInventory from "./ChannelInventory";
import CustomButton from "../../../components/Button";
import RightSideModal from "../../../components/CustomModal/customRightModal";
import CreateCombo from "./ProductCatalogue/createCombo";
import addIcon from "../../../assets/Catalogue/add.svg";
import AddPlus from "../../../assets/Catalogue/add.svg";
import { POST } from "../../../utils/webService";
import { useNavigate } from "react-router-dom";
import { GET_PRODUCTS, UPDATE_WOOCOMMERCE_STORE } from "../../../utils/ApiUrls";
import { useSelector } from "react-redux";
import ChannelIntegrationModalContent from "./ChannelIntegration/ChannelIntegrationModalContent";
import AccessDenied from "../../../components/AccessDenied";
import { getLocalStorage, removeLocalStorage } from "../../../utils/utility";
import { checkPageAuthorized } from "../../../redux/reducers/role";
import { useMediaQuery } from "react-responsive";
import RightArrowIcon from "../../../assets/Profile/RightArrowIcon.svg";
import TaskSquareIcon from "../../../assets/task-square.svg";
import LocationIcon from "../../../assets/Location.svg";
import LayersIcon from "../../../assets/layer.svg";
import ServiceButton from "../../../components/Button/ServiceButton";
import BottomModal from "../../../components/CustomModal/customBottomModal";
import { Spinner } from "../../../components/Spinner";
import { toast } from "react-hot-toast";

const Catalogue = () => {
  const navigate = useNavigate();
  const roles = useSelector((state: any) => state?.roles);
  const isMobileView = useMediaQuery({ maxWidth: 768 });
  const [isMobileChannelPage, setIsMobileChannelPage] = useState(false);
  const [globalIndex, setGlobalIndex] = useState(-1);
  // const [isActive, setIsActive] = useState(
  //   roles.roles?.[0]?.menu?.[5]?.menu?.[0]?.pages?.[0]?.isActive
  // );

  const [isActive, setIsActive] = useState<any>(false);
  let wooCommerceContents = getLocalStorage("wooCommerceContents");
  const [filterId, setFilterId] = useState(0);
  const [tabName, setTabName] = useState(
    localStorage.getItem("catalogueTab") || "Channel Integration"
  );
  const [modalData, setModalData]: any = useState({
    isOpen: false,
    modalData: [],
  });
  const [channelData, setChannelData]: any = useState([]);
  const [indexNum, setIndexNum] = useState(0);
  const BoxCataloague: any = useRef();
  const [integrate, setIntegrate] = useState(false);

  const [tabNameFromUrl, setTabNameFromUrl] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const listTab = [
    {
      statusName: "Channel Integration",
      active: true,
      icon: TaskSquareIcon,
    },
    {
      statusName: "Address Book",
      active: false,
      icon: LocationIcon,
    },
    {
      statusName: "Product Catalogue",
      active: false,
      icon: LayersIcon,
    },
    {
      statusName: "Box Catalogue",
      active: false,
      icon: LayersIcon,
    },
    {
      statusName: "Channel Inventory",
      active: false,
      icon: LayersIcon,
    },
  ];
  const [addressTab, setAddressTab] = useState("pickup");
  const [productCatalogueTab, setProductCatalogueTab] =
    useState("singleProduct");
  const [showCombo, setShowCombo] = useState<any>(false);

  const [productList, setProductList] = useState<any>(false);
  const [totalProduct, setTotalProduct] = useState<number>(0);

  const renderComponent = () => {
    if (tabName === "Channel Integration") {
      return (
        <ChannelIntegration
          setChannelData={setChannelData}
          channelData={channelData}
          setModalData={setModalData}
          setIndexNum={setIndexNum}
          setIntegrate={setIntegrate}
        />
      );
    } else if (tabName === "Address Book") {
      return <AddressBook setAddressTab={setAddressTab} />;
    } else if (tabName === "Product Catalogue") {
      return (
        <ProductCatalogue
          setProductCatalogueTab={setProductCatalogueTab}
          isModalOpen={showCombo}
        />
      );
    } else if (tabName === "Box Catalogue") {
      return (
        <BoxCatalogue
          ref={BoxCataloague}
          filterId={filterId}
          setFilterId={setFilterId}
        />
      );
    } else if (tabName === "Channel Inventory") {
      return <ChannelInventory />;
    }
  };

  const getProductDetails = async () => {
    try {
      const { data: response } = await POST(GET_PRODUCTS);

      if (response?.success && !productList) {
        setProductList(response.data);
        setTotalProduct(response?.totalProduct);
      }
    } catch (error) {}
  };

  const GetCurrentPath = () => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const location = url;
    const path = location.pathname;
    const pathArray = path.split("/");
    const removedFirstPath = pathArray.slice(1);
    return removedFirstPath;
  };

  const data = GetCurrentPath() as any;

  useEffect(() => {
    // if (
    //   tabName === "channel-integration" ||
    //   tabName === "Channel Integration"
    // ) {
    //   (async () => {
    //     await getProductDetails();
    //   })();
    // }

    if (data[1] === "address-book") {
      setTabName("Address Book");
      // setIsActive(roles.roles?.[0]?.menu?.[5]?.menu?.[1]?.pages?.[0]?.isActive);
      setIsActive(checkPageAuthorized("Address Book"));
    } else if (data[1] === "channel-integration") {
      setTabName("Channel Integration");
      // setIsActive(roles.roles?.[0]?.menu?.[5]?.menu?.[0]?.pages?.[0]?.isActive);
      setIsActive(checkPageAuthorized("Channel Integration"));
    } else if (data[1] === "product-catalogue") {
      setTabName("Product Catalogue");
      // setIsActive(roles.roles?.[0]?.menu?.[5]?.menu?.[2]?.pages?.[0]?.isActive);
      setIsActive(checkPageAuthorized("Product Catalogue"));
    } else if (data[1] === "box-catalogue") {
      setTabName("Box Catalogue");
      // setIsActive(roles.roles?.[0]?.menu?.[5]?.menu?.[3]?.pages?.[0]?.isActive);
      setIsActive(checkPageAuthorized("Box Catalogue"));
    } else if (data[1] === "channel-inventory") {
      setTabName("Channel Inventory");
      // setIsActive(roles.roles?.[0]?.menu?.[5]?.menu?.[3]?.pages?.[0]?.isActive);
      setIsActive(checkPageAuthorized("Channel Inventory"));
    }
  }, [tabName, isActive, data]);

  // useEffect(() => {
  //   (async () => {
  //     await getProductDetails();
  //   })();
  // }, []);

  const changeUrl = (statusName: any) => {
    let replaceUrl = statusName.toLowerCase().replace(/ /g, "-");
    window.history.pushState("", "", `/catalogues/${replaceUrl}`);
  };

  const renderHeaderComponent = (setShowCombo?: any) => {
    // Code commented as per discussion with akshay and vivek
    // if (tabName === "Channel Integration") {
    //   return (
    //     <CustomButton
    //       icon={addIcon}
    //       showIcon={true}
    //       text={"INTEGRATE"}
    //       className="!p-3"
    //       onClick={() => {
    //         setModalData({ isOpen: true });
    //         setIntegrate(true);
    //       }}
    //     />
    //   );
    // } else
    if (!isMobileView || (isMobileView && isMobileChannelPage)) {
      if (tabName === "Address Book") {
        return (
          <CustomButton
            icon={addIcon}
            showIcon={true}
            text={"ADD ADDRESS"}
            className="!p-3 "
            onClick={() =>
              navigate("/catalogues/catalogue/add-address", {
                state: { activeTab: addressTab },
              })
            }
          />
        );
      } else if (tabName === "Product Catalogue") {
        if (productCatalogueTab === "singleProduct" && !isMobileView) {
          return (
            <div className="flex">
              <CustomButton
                icon={addIcon}
                showIcon={true}
                text={"CREATE COMBO"}
                className="!p-3"
                onClick={async () => {
                  setShowCombo(true);

                  await getProductDetails();
                }}
              />

              <CustomButton
                icon={addIcon}
                showIcon={true}
                text={"ADD PRODUCT"}
                className="!p-3 ml-4"
                onClick={() => navigate("/catalogues/catalogue/add-product")}
              />
              <CustomButton
                icon={addIcon}
                showIcon={true}
                text={"ADD BULK PRODUCTS"}
                className="!p-3 ml-4 !px-4"
                onClick={() =>
                  navigate("/catalogues/catalogue/add-bulk-product")
                }
              />
            </div>
          );
        } else if (productCatalogueTab === "singleProduct" && isMobileView) {
          return (
            <CustomButton
              icon={addIcon}
              showIcon={true}
              text={"ADD PRODUCT"}
              className="!p-3 ml-4"
              onClick={() => navigate("/catalogues/catalogue/add-product")}
            />
          );
        } else if (productCatalogueTab === "comboProduct") {
          return (
            <div className="flex">
              <CustomButton
                icon={addIcon}
                showIcon={true}
                text={"ADD COMBO"}
                className="!p-3"
                onClick={() => setShowCombo(true)}
              />
              <CustomButton
                icon={addIcon}
                showIcon={true}
                text={"ADD BULK COMBO"}
                className="!p-3 ml-4 !px-4"
                onClick={() => navigate("/catalogues/catalogue/add-bulk-combo")}
              />
            </div>
          );
        }
      } else if (tabName === "Box Catalogue") {
        return (
          <>
            {filterId === 0 && (
              <div className="flex ">
                <CustomButton
                  icon={AddPlus}
                  showIcon={true}
                  text={"CREATE BOX"}
                  className="!p-4"
                  onClick={() => {
                    if (isMobileView) navigate("/catalogues/catalogue/add-box");
                    else BoxCataloague.current.openModal();
                  }}
                />
                <CustomButton
                  icon={addIcon}
                  showIcon={true}
                  text={"ADD BULK BOXES"}
                  className="!p-3 ml-4 !px-4"
                  onClick={() => navigate("/catalogues/catalogue/add-bulk-box")}
                />
              </div>
            )}
          </>
        );
      }
    }
  };

  const handleMobileTab = (statusName: any, index: any) => {
    setIsMobileChannelPage(true);
    if (index > -1) {
      changeUrl(statusName);
    }
    setGlobalIndex(+index);
  };

  const renderMobileComponent = (showCombo: any) => {
    switch (globalIndex) {
      case 0: {
        return (
          <ChannelIntegration
            setChannelData={setChannelData}
            channelData={channelData}
            setModalData={setModalData}
            setIndexNum={setIndexNum}
            setIntegrate={setIntegrate}
          />
        );
      }
      case 1: {
        return <AddressBook setAddressTab={setAddressTab} />;
      }
      case 2: {
        return (
          <ProductCatalogue
            setProductCatalogueTab={setProductCatalogueTab}
            isModalOpen={showCombo}
          />
        );
      }
      case 3: {
        return (
          <BoxCatalogue
            ref={BoxCataloague}
            filterId={filterId}
            setFilterId={setFilterId}
          />
        );
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (wooCommerceContents) {
        const { storeUrl, userId, storeName } = JSON.parse(wooCommerceContents);

        const { data } = await POST(UPDATE_WOOCOMMERCE_STORE, {
          storeUrl,
          userId,
          storeName,
        });

        let channelSessionObj: any = localStorage.getItem("userInfo");
        channelSessionObj = JSON.parse(channelSessionObj);
        if (!channelSessionObj?.nextStep?.isChannelIntegrated) {
          channelSessionObj.nextStep.isChannelIntegrated = true;
          localStorage.setItem("userInfo", JSON.stringify(channelSessionObj));
        }

        let newAddedChannel = [
          {
            icon: "",
            iconLg: "",
            integrated: true,
            name: data?.data?.storeName,
            storeId: data?.data?.storeId,
          },
        ];

        removeLocalStorage("channelData");
        removeLocalStorage("wooCommerceContents");

        window.location.reload();

        if (data?.success) {
          toast.success(data?.message);
        } else {
          toast.error(data?.message);
        }
      }
    })();
  }, [wooCommerceContents]);

  return (
    <>
      {isActive ? (
        isLoading ? (
          <div className="absolute right-[50%] top-[50%] transform -translate-y-1/2 cursor-pointer">
            <Spinner />
          </div>
        ) : (
          <div>
            <Breadcrum
              label={`${
                isMobileChannelPage
                  ? listTab[globalIndex].statusName
                  : "Catalogue"
              } `}
              component={renderHeaderComponent(setShowCombo)}
              componentClass="!px-0 lg:px-5"
              setState={() => setIsMobileChannelPage(false)}
              state={isMobileChannelPage}
            />
            {!isMobileView ? (
              <div className="lg:mb-24">
                <div className="mt-4 px-5 ">
                  <div className="flex flex-row  customScroll whitespace-nowrap mt-2 lg:h-[34px]">
                    {listTab?.map(({ statusName }, index) => {
                      return (
                        <div
                          style={{ borderBottomWidth: "3px" }}
                          className={`flex lg:justify-center items-center cursor-pointer border-[#777777] px-6
                  ${tabName === statusName && "!border-[#004EFF]"}
                  `}
                          onClick={() => {
                            localStorage.setItem("catalogueTab", statusName);
                            changeUrl(statusName);
                            setTabName(statusName);
                          }}
                          key={index}
                        >
                          <span
                            className={`text-[#777777] font-medium text-[15px] lg:text-[18px]
                    ${
                      tabName === statusName && "!text-[#004EFF] lg:text-[18px]"
                    }`}
                          >
                            {statusName}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {renderComponent()}

                  <RightSideModal
                    isOpen={showCombo}
                    onClose={() => setShowCombo(false)}
                  >
                    <CreateCombo
                      isSearchProductRightModalOpen={showCombo}
                      setIsSearchProductRightModalOpen={setShowCombo}
                      productsData={productList}
                      totalProduct={totalProduct}
                    />
                  </RightSideModal>

                  <RightSideModal
                    isOpen={modalData.isOpen}
                    onClose={() =>
                      setModalData({ ...modalData, isOpen: false })
                    }
                  >
                    <ChannelIntegrationModalContent
                      setIsLoading={setIsLoading}
                      modalData={modalData}
                      setModalData={setModalData}
                      channelData={channelData}
                      setChannelData={setChannelData}
                      indexNum={indexNum}
                      integrate={integrate}
                    />
                  </RightSideModal>
                </div>
              </div>
            ) : !isMobileChannelPage ? (
              listTab.map((item: any, index: any) => (
                <div
                  className={`border-[1px] mx-[1rem] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 mt-4 cursor-pointer hover:bg-gray-100`}
                  // onClick={() => navigate(`/settings/user-management`)}
                  style={{
                    boxShadow:
                      "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
                  }}
                  onClick={() => handleMobileTab(item.statusName, index)}
                >
                  <div className={`flex justify-between items-center h-[44px]`}>
                    <div className="flex  items-center ml-2">
                      <span>
                        <img width={"20px"} src={item.icon} alt="" />
                      </span>
                      <span className="font-Open text-base font-semibold leading-[22px] text-[#1C1C1C] ml-2">
                        {item.statusName}
                      </span>
                    </div>
                    <div className="mr-4">
                      <img src={RightArrowIcon} alt="" className="ml-4" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <div className="m-[1rem]">
                  {renderMobileComponent(showCombo)}
                </div>
                <div
                  className="flex justify-center gap-x-5  shadow-lg border-[1px] h-[68px]  bg-[#FFFFFF] px-6 py-4 rounded-tr-[32px] rounded-tl-[32px]    fixed bottom-0 "
                  style={{ width: "-webkit-fill-available" }}
                >
                  <ServiceButton
                    onClick={() => {
                      setIsMobileChannelPage(false);
                      navigate(-1);
                    }}
                    text={"Back"}
                    className={`text-[#1C1C1C] w-[100%] cursor-pointer bg-[#FFFFFF] h-[36px] py-2 px-4 disabled:bg-[#E8E8E8] disabled:text-[#BBB] disabled:border-none`}
                  />
                  <ServiceButton
                    onClick={() => {
                      setIsMobileChannelPage(false);
                      navigate(-1);
                    }}
                    text={"Save"}
                    className={`bg-[#1C1C1C] w-[100%] cursor-pointer text-[#FFFFFF] h-[36px] py-2 px-4 disabled:bg-[#E8E8E8] disabled:text-[#BBB] disabled:border-none`}
                  />
                </div>
                <BottomModal
                  isOpen={modalData.isOpen}
                  onRequestClose={() =>
                    setModalData({ ...modalData, isOpen: false })
                  }
                  className="outline-none !p-0 customScroll h-[30rem]"
                >
                  <ChannelIntegrationModalContent
                    setIsLoading={setIsLoading}
                    modalData={modalData}
                    setModalData={setModalData}
                    channelData={channelData}
                    setChannelData={setChannelData}
                    indexNum={indexNum}
                    integrate={integrate}
                  />
                </BottomModal>

                <BottomModal
                  isOpen={showCombo}
                  onRequestClose={() => setShowCombo(false)}
                >
                  <CreateCombo
                    isSearchProductRightModalOpen={showCombo}
                    setIsSearchProductRightModalOpen={setShowCombo}
                    productsData={productList}
                  />
                </BottomModal>
              </div>
            )}
          </div>
        )
      ) : (
        <div>
          <AccessDenied />
        </div>
      )}
    </>
  );
};

export default Catalogue;
