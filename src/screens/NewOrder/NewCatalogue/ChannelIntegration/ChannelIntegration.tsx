import { useState, useEffect } from "react";
import { Spinner } from "../../../../components/Spinner";
import ShopifyLg from "../../../../assets/Catalogue/shopifyLg.svg";
import ShopifyIcon from "../../../../assets/Catalogue/shopify.svg";
import Card from "./Card";
import Header from "./Header";
import { GET_ALL_STORES } from "../../../../utils/ApiUrls";
import { POST } from "../../../../utils/webService";

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
        const { data: response } = await POST(GET_ALL_STORES, {});
        setLoading(false);
        if (response && response.data.length > 0) {
          let tempArr: any = [];
          response.data.forEach((item: any) => {
            tempArr.push({
              name: item.storeName,
              icon: ShopifyIcon,
              iconLg: ShopifyLg,
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
      <div>
        <div className="mt-6">
          <Header title="Channels" />
          <div className="flex gap-x-4 overflow-x-auto flex-wrap ">
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
