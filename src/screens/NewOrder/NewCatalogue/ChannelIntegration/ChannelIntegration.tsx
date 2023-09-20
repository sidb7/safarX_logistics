import { useState, useEffect } from "react";
import { Spinner } from "../../../../components/Spinner";
import ShopifyLg from "../../../../assets/Catalogue/shopifyLg.svg";
import ShopifyIcon from "../../../../assets/Catalogue/shopify.svg";
import Card from "./Card";
import {
  ChannelIntegrationCarts,
  ChannelIntegrationInventory,
  ChannelIntegrationMarketPlace,
  ChannelIntegrationWarehouse,
} from "../../../../utils/dummyData";
import Header from "./Header";
import RightSideModal from "../../../../components/CustomModal/customRightModal";
import ChannelIntegrationModalContent from "./ChannelIntegrationModalContent";
import { GET_ALL_STORES } from "../../../../utils/ApiUrls";
import { POST } from "../../../../utils/webService";

const ChannelIntegration = () => {
  const [modalData, setModalData] = useState({ isOpen: false, modalData: [] });
  const [indexNum, setIndexNum] = useState(0);
  const [loading, setLoading] = useState(true);
  const [channelData, setChannelData]: any = useState(
    ChannelIntegrationInventory
  );

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
          tempArr = [...tempArr, ...ChannelIntegrationInventory.channels];
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
          <div className="flex gap-x-4 overflow-x-auto ">
            {channelData.channels?.map((eachChannel: any, index: any) => {
              return (
                <Card
                  setModalData={setModalData}
                  channel={eachChannel}
                  key={index}
                  setIndexNum={setIndexNum}
                  index={index}
                />
              );
            })}
          </div>
        </div>
        <div className="mt-6">
          <Header title={ChannelIntegrationCarts.title} />
          <div className="flex gap-x-4 overflow-x-auto ">
            {ChannelIntegrationCarts.channels?.map((eachChannel, index) => {
              return <Card channel={eachChannel} key={index} />;
            })}
          </div>
        </div>
        <div className="mt-4">
          <Header title={ChannelIntegrationMarketPlace.title} />
          <div className="flex gap-x-4 overflow-x-auto ">
            {ChannelIntegrationMarketPlace.channels?.map(
              (eachChannel, index) => {
                return <Card channel={eachChannel} key={index} />;
              }
            )}
          </div>
        </div>
        <div className="mt-4">
          <Header title={ChannelIntegrationWarehouse.title} />
          <div className="flex gap-x-4 overflow-x-auto ">
            {ChannelIntegrationWarehouse.channels?.map((eachChannel, index) => {
              return <Card channel={eachChannel} key={index} />;
            })}
          </div>
        </div>
        <div className="mt-4">
          <Header title={ChannelIntegrationInventory.title} />
          <div className="flex gap-x-4 overflow-x-auto ">
            {ChannelIntegrationInventory.channels?.map((eachChannel, index) => {
              return <Card channel={eachChannel} key={index} />;
            })}
          </div>
        </div>
      </div>
      <RightSideModal
        isOpen={modalData.isOpen}
        onClose={() => setModalData({ ...modalData, isOpen: false })}
      >
        <ChannelIntegrationModalContent
          setModalData={setModalData}
          channelData={channelData}
          setChannelData={setChannelData}
          indexNum={indexNum}
        />
      </RightSideModal>
    </>
  );
};

export default ChannelIntegration;
