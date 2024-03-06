import { useState, useEffect } from "react";
import { Spinner } from "../../../../components/Spinner";
import ShopifyLg from "../../../../assets/Catalogue/shopifyLg.svg";
import ShopifyIcon from "../../../../assets/Catalogue/shopify.svg";
import WooIcon from "../../../../assets/Catalogue/woo.svg";
import WooLg from "../../../../assets/Catalogue/WooCommerceLg.svg";
import ZohoIcon from "../../../../assets/Catalogue/ZOHO.svg.png";
import Card from "./Card";
import Header from "./Header";
import {
  CREATE_AMAZON_STORE,
  GET_ALL_STORES,
  UPDATE_WOOCOMMERCE_STORE,
} from "../../../../utils/ApiUrls";
import { POST } from "../../../../utils/webService";
import { ChannelIntegrationCarts } from "../../../../utils/dummyData";
import AmazonPngIcon from "../../../../assets/AmazonIcon.png";
import CenterModal from "../../../../components/CustomModal/customCenterModal";
import WebCrossIcon from "../../../../assets/PickUp/ModalCrossWeb.svg";
import DeleteGifIcon from "../../../../assets/deleteGif.svg";
import ServiceButton from "../../../../components/Button/ServiceButton";
import { DELETE_INTEGRATED_STORE } from "../../../../utils/ApiUrls";
import { toast } from "react-hot-toast";
import { getLocalStorage, removeLocalStorage } from "../../../../utils/utility";

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
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteChannel, setDeleteChannel] = useState<any>("");
  let wooCommerceContents = getLocalStorage("wooCommerceContents");

  const deleteIntegratedChannel = async () => {
    try {
      let payload = { storeId: deleteChannel?.storeId };

      const { data: response }: any = await POST(
        DELETE_INTEGRATED_STORE,
        payload
      );

      if (response?.status) {
        let channelSessionObj: any = sessionStorage.getItem("userInfo");
        channelSessionObj = JSON.parse(channelSessionObj);
        if (channelSessionObj.nextStep?.isChannelIntegrated) {
          channelSessionObj.nextStep.isChannelIntegrated = false;
          sessionStorage.setItem("userInfo", JSON.stringify(channelSessionObj));
        }
        toast.success("Channel Deactivated Successfully!!");
        const filteredChannels = channelData.channels.filter(
          (eachChannel: any, index: number) =>
            eachChannel.storeId !== deleteChannel.storeId
        );

        setChannelData({ channels: filteredChannels });
      } else {
        toast.error(response?.message);
      }
    } catch (error: any) {
      toast.error(error?.message);
      console.log("Error", error);
      return error;
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

        let channelSessionObj: any = sessionStorage.getItem("userInfo");
        channelSessionObj = JSON.parse(channelSessionObj);
        if (!channelSessionObj?.nextStep?.isChannelIntegrated) {
          channelSessionObj.nextStep.isChannelIntegrated = true;
          sessionStorage.setItem("userInfo", JSON.stringify(channelSessionObj));
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
  }, [wooCommerceContents, setChannelData, channelData]);

  const deleteModalContent = () => {
    return (
      <div className="flex flex-col  h-full w-full   p-5">
        <div className="flex justify-end">
          <img
            src={WebCrossIcon}
            alt=""
            className="cursor-pointer"
            onClick={() => setDeleteModal(false)}
          />
        </div>
        <div className="flex flex-col justify-center  items-center h-full w-full  ">
          <img src={DeleteGifIcon} alt="" />
          <p className="font-Open text-sm md:text-base font-semibold text-center">
            {`Are you sure you want to remove ${deleteChannel?.channelName} (${deleteChannel?.name}) channel?`}
          </p>
          <div className="flex  items-center gap-x-4 mt-10">
            <ServiceButton
              text="Go Back"
              className="bg-[#ffffff] px-4 py-2 text-[#1c1c1c] font-semibold text-sm"
              onClick={() => {
                // createPlan(onSelectPlan);

                setDeleteModal(false);
              }}
            />
            <ServiceButton
              text="DEACTIVATE"
              className="bg-[#1C1C1C] px-4 py-2 text-white font-semibold text-sm"
              onClick={() => {
                setDeleteModal(false);

                deleteIntegratedChannel();
              }}
            />
          </div>
        </div>
      </div>
    );
  };

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
          let channelSessionObj: any = sessionStorage.getItem("userInfo");
          channelSessionObj = JSON.parse(channelSessionObj);
          if (!channelSessionObj?.nextStep?.isChannelIntegrated) {
            channelSessionObj.nextStep.isChannelIntegrated = true;
            sessionStorage.setItem(
              "userInfo",
              JSON.stringify(channelSessionObj)
            );
          }
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
              channelName: item.channel,
              createdAt: item.createdAt,
            });
          });
          setChannelData({ channels: tempArr });
        } else {
          let channelSessionObj: any = sessionStorage.getItem("userInfo");
          channelSessionObj = JSON.parse(channelSessionObj);
          if (channelSessionObj?.nextStep?.isChannelIntegrated) {
            channelSessionObj.nextStep.isChannelIntegrated = false;
            sessionStorage.setItem(
              "userInfo",
              JSON.stringify(channelSessionObj)
            );
          }
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
                  setDeleteModal={setDeleteModal}
                  deleteChannel={deleteChannel}
                  setDeleteChannel={setDeleteChannel}
                />
              );
            })}
          </div>
        </div>

        <CenterModal
          isOpen={deleteModal}
          className="!w-[30%] !h-[40%] "
          onRequestClose={() => setDeleteModal(false)}
        >
          {deleteModalContent()}
        </CenterModal>
      </div>
    </>
  );
};

export default ChannelIntegration;
