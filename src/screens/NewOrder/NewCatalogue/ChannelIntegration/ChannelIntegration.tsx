import { useState, useEffect } from "react";
import { Spinner } from "../../../../components/Spinner";
import ShopifyLg from "../../../../assets/Catalogue/shopifyLg.svg";
import ShopifyIcon from "../../../../assets/Catalogue/shopify.svg";
import WooIcon from "../../../../assets/Catalogue/woo.svg";
import WooLg from "../../../../assets/Catalogue/WooCommerceLg.svg";
import ZohoIcon from "../../../../assets/Catalogue/ZOHO.svg.png";
import Card from "./Card";
import Header from "./Header";
import { CREATE_AMAZON_STORE, GET_ALL_STORES } from "../../../../utils/ApiUrls";
import { POST } from "../../../../utils/webService";
import { ChannelIntegrationCarts } from "../../../../utils/dummyData";
import AmazonPngIcon from "../../../../assets/AmazonIcon.png";

interface IChannelIntegrationProps {
  setChannelData: any;
  channelData: any;
  setModalData: any;
  setIndexNum: any;
  setIntegrate: any;
}

const ChannelIntegration = (props: IChannelIntegrationProps) => {
  const {
    setChannelData,
    channelData,
    setModalData,
    setIndexNum,
    setIntegrate,
  } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const searchParams: any = new URLSearchParams(window.location.search);

        const state: any = searchParams.get("state");

        const spapi_oauth_code: any = searchParams.get("spapi_oauth_code");

        const selling_partner_id: any = searchParams.get("selling_partner_id");

        const storeName = sessionStorage.getItem("amazon_store");

        if (state && selling_partner_id) {
          console.log("AMAZON API");
          const payload = {
            amazonState: state,
            sellingPartnerId: selling_partner_id,
            oauthCode: spapi_oauth_code,
            storeName,
          };
          const createAmazonStore = await POST(CREATE_AMAZON_STORE, payload);
          sessionStorage.removeItem("amazon_store");
        }

        const { data: response } = await POST(GET_ALL_STORES, {});
        setLoading(false);
        if (response && response.data.length > 0) {
          let tempArr: any = [];
          response?.data?.forEach((item: any) => {
            tempArr.push({
              name: item.storeName,
              icon:
                item.channel === "SHOPIFY"
                  ? ShopifyIcon
                  : item.channel === "WOOCOMMERCE"
                  ? WooIcon
                  : item.channel === "ZOHO"
                  ? ZohoIcon
                  : AmazonPngIcon,
              iconLg:
                item.channel === "SHOPIFY"
                  ? ShopifyLg
                  : item.channel === "WOOCOMMERCE"
                  ? WooLg
                  : item.channel === "ZOHO"
                  ? ZohoIcon
                  : AmazonPngIcon,
              integrated: true,
              storeId: item.storeId,
            });
          });
          setChannelData({ channels: tempArr });
        }
      } catch (error) {}
    })();
  }, []);

  return loading ? (
    <div className="absolute right-[50%] top-[50%] transform -translate-y-1/2 cursor-pointer">
      <Spinner />
    </div>
  ) : (
    <>
      <div className="my-6">
        <Header title="Available Channels" />
        <div className="flex gap-x-4 customScroll flex-nowrap lg:flex-wrap ">
          {ChannelIntegrationCarts?.channels?.map(
            (eachChannel: any, index: any) => (
              <Card
                setModalData={setModalData}
                channel={eachChannel}
                key={index}
                setIndexNum={setIndexNum}
                index={index}
                setIntegrate={setIntegrate}
              />
            )
          )}
        </div>
        <div className="mt-6">
          {channelData?.channels && <Header title="Integrated Channels" />}
          <div className="flex gap-x-4 customScroll flex-wrap ">
            {channelData.channels?.map((eachChannel: any, index: any) => {
              return (
                <Card
                  setModalData={setModalData}
                  channel={eachChannel}
                  key={index}
                  setIndexNum={setIndexNum}
                  index={index}
                  setIntegrate={setIntegrate}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChannelIntegration;
