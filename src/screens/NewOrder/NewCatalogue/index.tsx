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
import { GET_PRODUCTS, GET_COMBO_PRODUCT } from "../../../utils/ApiUrls";

const Catalogue = () => {
  const navigate = useNavigate();
  const [filterId, setFilterId] = useState(0);
  const [tabName, setTabName] = useState(
    sessionStorage.getItem("catalogueTab") || "Channel Integration"
  );
  const BoxCataloague: any = useRef();

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
      return <ChannelIntegration />;
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

      if (response?.success) {
        setProductList(response.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (
      tabName === "channel-integration" ||
      tabName === "Channel Integration"
    ) {
      (async () => {
        await getProductDetails();
      })();
    }

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

    if (data[1] === "address-book") {
      setTabName("Address Book");
    } else if (data[1] === "channel-integration") {
      setTabName("Channel Integration");
    } else if (data[1] === "product-catalogue") {
      setTabName("Product Catalogue");
    } else if (data[1] === "box-catalogue") {
      setTabName("Box Catalogue");
    }
  }, [renderComponent]);

  const changeUrl = (statusName: any) => {
    let replaceUrl = statusName.toLowerCase().replace(/ /g, "-");
    window.history.pushState("", "", `/catalogues/${replaceUrl}`);
  };

  const renderHeaderComponent = (setShowCombo?: any) => {
    if (tabName === "Address Book") {
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

  return (
    <>
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
                  className={`flex lg:justify-center items-center border-b-2 cursor-pointer border-[#777777] px-4 
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
                    className={`text-[#777777] text-[14px] lg:text-[18px]
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
        </div>
      </div>
    </>
  );
};

export default Catalogue;
