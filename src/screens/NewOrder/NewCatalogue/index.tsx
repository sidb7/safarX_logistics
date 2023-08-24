import { Breadcum } from "../../../components/Layout/breadcum";
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
  const [tabName, setTabName] = useState([
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
  ]);
  const [productCatalogueTab, setProductCatalogueTab] =
    useState("singleProduct");

  const renderComponent = () => {
    const activeTabName = tabName.find((singleTab) => {
      return singleTab.active === true;
    });
    if (activeTabName?.statusName === "Channel Integration") {
      return <ChannelIntegration />;
    } else if (activeTabName?.statusName === "Address Book") {
      return <AddressBook />;
    } else if (activeTabName?.statusName === "Product Catalogue") {
      return (
        <ProductCatalogue setProductCatalogueTab={setProductCatalogueTab} />
      );
    } else if (activeTabName?.statusName === "Box Catalogue") {
      return <BoxCatalogue />;
    }
  };

  const renderHeaderComponent = () => {
    const activeTabName = tabName.find((singleTab) => {
      return singleTab.active === true;
    });
    if (activeTabName?.statusName === "Address Book") {
      return (
        <CustomButton
          icon={addIcon}
          showIcon={true}
          text={"ADD ADDRESS"}
          className="!p-3"
          onClick={() => navigate("/catalogue/add-address")}
        />
      );
    } else if (activeTabName?.statusName === "Product Catalogue") {
      if (productCatalogueTab === "singleProduct") {
        return (
          <CustomButton
            icon={addIcon}
            showIcon={true}
            text={"ADD PRODUCT"}
            className="!p-3"
            onClick={() => {}}
          />
        );
      } else if (productCatalogueTab === "comboProduct") {
        return (
          <CustomButton
            icon={addIcon}
            showIcon={true}
            text={"ADD COMBO"}
            className="!p-3"
            onClick={() => {}}
          />
        );
      }
    } else if (activeTabName?.statusName === "Box Catalogue") {
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
    <div className="overflow-y-auto h-[calc(100%-75px)]">
      <Breadcum label="Catalogue" component={renderHeaderComponent()} />
      <div className="mt-4 mx-6">
        <div className="flex flex-row overflow-x-scroll whitespace-nowrap mt-2 lg:h-[34px]">
          {tabName.map(({ statusName, active }, index) => {
            return (
              <div
                className={`flex lg:justify-center items-center border-b-2 cursor-pointer border-[#777777] px-4 
                  ${active && "!border-[#004EFF]"}
                  `}
                onClick={() => {
                  const updatedTab = tabName.map((singleTab, updateIndex) => {
                    const singleObject = {
                      statusName: singleTab.statusName,
                      active: false,
                    };
                    if (index === updateIndex) {
                      singleObject.active = true;
                    }
                    return singleObject;
                  });
                  setTabName(updatedTab);
                }}
                key={index}
              >
                <span
                  className={`text-[#777777] text-[14px] lg:text-[18px]
                    ${active && "!text-[#004EFF] lg:text-[18px]"}
                    `}
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
  );
};

export default Catalogue;
