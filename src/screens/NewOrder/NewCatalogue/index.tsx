import { Breadcum } from "../../../components/Layout/breadcrum";
import BottomLayout from "../../../components/Layout/bottomLayout";
import { useState } from "react";
import ChannelIntegration from "./ChannelIntegration/ChannelIntegration";
import AddressBook from "./AddressBook";
import ProductCatalogue from "./ProductCatalogue/index";
import BoxCatalogue from "./BoxCatalogue";
import CustomButton from "../../../components/Button";
import addIcon from "../../../assets/Catalogue/add.svg";
import AddOrder from "../../../assets/Catalogue/add_order.svg";
import { useNavigate } from "react-router-dom";

const Catalogue = () => {
  const navigate = useNavigate();
  const [tabName, setTabName] = useState(
    sessionStorage.getItem("catalogueTab") || "Channel Integration"
  );
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
      return <BoxCatalogue />;
    }
  };

  const renderHeaderComponent = () => {
    if (tabName === "Address Book") {
      return (
        <CustomButton
          icon={addIcon}
          showIcon={true}
          text={"ADD ADDRESS"}
          className="!p-3"
          onClick={() =>
            navigate("/catalogue/add-address", {
              state: { activeTab: addressTab },
            })
          }
        />
      );
    } else if (tabName === "Product Catalogue") {
      if (productCatalogueTab === "singleProduct") {
        return (
          <CustomButton
            icon={addIcon}
            showIcon={true}
            text={"ADD PRODUCT"}
            className="!p-3"
            onClick={() => navigate("/catalogue/add-product")}
          />
        );
      } else if (productCatalogueTab === "comboProduct") {
        return (
          <CustomButton
            icon={addIcon}
            showIcon={true}
            text={"ADD COMBO"}
            className="!p-3"
            onClick={() => navigate("/catalogue/add-combo")}
          />
        );
      }
    } else if (tabName === "Box Catalogue") {
      return (
        <CustomButton
          icon={AddOrder}
          showIcon={true}
          text={"UPLOAD"}
          className="!p-4"
          onClick={() => {}}
        />
      );
    }
  };

  return (
    <>
      <Breadcum label="Catalogue" component={renderHeaderComponent()} />
      <div className="lg:mb-24">
        <div className="mt-4 px-5 ">
          <div className="flex flex-row  whitespace-nowrap mt-2 lg:h-[34px]">
            {listTab.map(({ statusName }, index) => {
              return (
                <div
                  className={`flex lg:justify-center items-center border-b-2 cursor-pointer border-[#777777] px-4 
                  ${tabName === statusName && "!border-[#004EFF]"}
                  `}
                  onClick={() => {
                    sessionStorage.setItem("catalogueTab", statusName);
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
        </div>
        <BottomLayout callApi={() => {}} />
      </div>
    </>
  );
};

export default Catalogue;
