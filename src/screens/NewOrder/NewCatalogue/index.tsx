import { useEffect, useRef } from "react";
import { Breadcrum } from "../../../components/Layout/breadcrum";
import { useState } from "react";
import ChannelIntegration from "./ChannelIntegration/ChannelIntegration";
import AddressBook from "./AddressBook";
import ProductCatalogue from "./ProductCatalogue/index";
import BoxCatalogue from "./BoxCatalogue";
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

const Catalogue = () => {
  const navigate = useNavigate();
  const roles = useSelector((state: any) => state?.roles);
  // const [isActive, setIsActive] = useState(
  //   roles.roles?.[0]?.menu?.[5]?.menu?.[0]?.pages?.[0]?.isActive
  // );

  const [isActive, setIsActive] = useState<any>(false);
  let wooCommerceContents = getLocalStorage("wooCommerceContents");
  const [filterId, setFilterId] = useState(0);
  const [tabName, setTabName] = useState(
    sessionStorage.getItem("catalogueTab") || "Channel Integration"
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
  const listTab = [
    {
      statusName: "Channel Integration",
      active: true,
    },
    {
      statusName: "Address Book",
      active: false,
    },
    {
      statusName: "Product Catalogue",
      active: false,
    },
    {
      statusName: "Box Catalogue",
      active: false,
    },
  ];
  const [addressTab, setAddressTab] = useState("pickup");
  const [productCatalogueTab, setProductCatalogueTab] =
    useState("singleProduct");
  const [showCombo, setShowCombo] = useState<any>(false);
  const [productList, setProductList] = useState<any>(false);

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
        <ProductCatalogue setProductCatalogueTab={setProductCatalogueTab} />
      );
    } else if (tabName === "Box Catalogue") {
      return (
        <BoxCatalogue
          ref={BoxCataloague}
          filterId={filterId}
          setFilterId={setFilterId}
        />
      );
    }
  };

  const getProductDetails = async () => {
    try {
      const { data: response } = await POST(GET_PRODUCTS);
      if (response?.success && !productList) {
        setProductList(response.data);
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
    if (
      tabName === "channel-integration" ||
      tabName === "Channel Integration"
    ) {
      (async () => {
        await getProductDetails();
      })();
    }

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
    }
  }, [tabName, isActive, data]);

  const changeUrl = (statusName: any) => {
    let replaceUrl = statusName.toLowerCase().replace(/ /g, "-");
    window.history.pushState("", "", `/catalogues/${replaceUrl}`);
  };

  const renderHeaderComponent = (setShowCombo?: any) => {
    if (tabName === "Channel Integration") {
      return (
        <CustomButton
          icon={addIcon}
          showIcon={true}
          text={"INTEGRATE"}
          className="!p-3"
          onClick={() => {
            setModalData({ isOpen: true });
            setIntegrate(true);
          }}
        />
      );
    } else if (tabName === "Address Book") {
      return (
        <CustomButton
          icon={addIcon}
          showIcon={true}
          text={"ADD ADDRESS"}
          className="!p-3"
          onClick={() =>
            navigate("/catalogues/catalogue/add-address", {
              state: { activeTab: addressTab },
            })
          }
        />
      );
    } else if (tabName === "Product Catalogue") {
      if (productCatalogueTab === "singleProduct") {
        return (
          <div className="flex">
            <CustomButton
              icon={addIcon}
              showIcon={true}
              text={"CREATE COMBO"}
              className="!p-3"
              onClick={() => setShowCombo(true)}
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
              onClick={() => navigate("/catalogues/catalogue/add-bulk-product")}
            />
          </div>
        );
      } else if (productCatalogueTab === "comboProduct") {
        return (
          <CustomButton
            icon={addIcon}
            showIcon={true}
            text={"ADD COMBO"}
            className="!p-3"
            onClick={() => setShowCombo(true)}
          />
        );
      }
    } else if (tabName === "Box Catalogue") {
      return (
        <>
          {filterId === 0 && (
            <CustomButton
              icon={AddPlus}
              showIcon={true}
              text={"CREATE BOX"}
              className="!p-4"
              onClick={() => {
                BoxCataloague.current.openModal();
              }}
            />
          )}
        </>
      );
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
      }
    })();
  }, [wooCommerceContents]);

  return (
    <>
      {isActive ? (
        <div>
          <Breadcrum
            label="Catalogue"
            component={renderHeaderComponent(setShowCombo)}
          />
          <div className="lg:mb-24">
            <div className="mt-4 px-5 ">
              <div className="flex flex-row  whitespace-nowrap mt-2 lg:h-[34px]">
                {listTab?.map(({ statusName }, index) => {
                  return (
                    <div
                      style={{ borderBottomWidth: "3px" }}
                      className={`flex lg:justify-center items-center cursor-pointer border-[#777777] px-6
                  ${tabName === statusName && "!border-[#004EFF]"}
                  `}
                      onClick={() => {
                        sessionStorage.setItem("catalogueTab", statusName);
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
                />
              </RightSideModal>

              <RightSideModal
                isOpen={modalData.isOpen}
                onClose={() => setModalData({ ...modalData, isOpen: false })}
              >
                <ChannelIntegrationModalContent
                  setModalData={setModalData}
                  channelData={channelData}
                  setChannelData={setChannelData}
                  indexNum={indexNum}
                  integrate={integrate}
                />
              </RightSideModal>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <AccessDenied />
        </div>
      )}
    </>
  );
};

export default Catalogue;
