import TaskSquare from "../../../../assets/task-square.svg";
import CloseIcon from "../../../../assets/CloseIcon.svg";
import CustomInputBox from "../../../../components/Input";
import ServiceButton from "../../../../components/Button/ServiceButton";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { POST } from "../../../../utils/webService";
import {
  GET_SINGLE_STORE,
  POST_CREATE_STORE,
  UPDATE_SINGLE_STORE,
} from "../../../../utils/ApiUrls";
import ShopifyIcon from "../../../../assets/Catalogue/shopify.svg";
import ShopifyLg from "../../../../assets/Catalogue/shopifyLg.svg";

function ChannelIntegrationModalContent(props: any) {
  const { setModalData, channelData, setChannelData, indexNum } = props;
  let isUpdateModal = channelData.channels[indexNum]?.integrated;
  const [storeData, setStoreData]: any = useState({
    storeName: "",
    storeUrl: "",
    storeToken: "",
    storeLogo: "",
  });

  const storeId = channelData.channels[indexNum]?.storeId;

  const addStore = async () => {
    try {
      if (!isUpdateModal) {
        const { data } = await POST(POST_CREATE_STORE, storeData);
        if (data?.status) toast.success(data?.message);
        else toast.error(data?.message);
        let newStore = [
          {
            name: storeData.storeName,
            icon: ShopifyIcon,
            iconLg: ShopifyLg,
            integrated: true,
            storeId,
          },
        ];
        newStore = [...newStore, ...channelData.channels];
        setChannelData({ channels: newStore });
      } else {
        let payload = { ...storeData, storeId };
        const { data } = await POST(UPDATE_SINGLE_STORE, payload);
        if (data?.status) toast.success(data?.message);
        else toast.error(data?.message);
        let newStore = [
          {
            name: storeData.storeName,
            icon: ShopifyIcon,
            iconLg: ShopifyLg,
            integrated: true,
            storeId,
          },
        ];
        let tempArr = [...channelData.channels];
        tempArr.splice(indexNum, 1);
        newStore = [...newStore, ...tempArr];
        setChannelData({ channels: newStore });
      }
      setModalData({ isOpen: false });
    } catch (error) {}
  };

  useEffect(() => {
    (async () => {
      if (isUpdateModal) {
        try {
          const { data } = await POST(GET_SINGLE_STORE, { storeId });
          const { storeName, storeToken, storeUrl, storeLogo } = data?.data[0];
          setStoreData({ storeName, storeToken, storeUrl, storeLogo });
        } catch (error) {}
      }
    })();
  }, []);

  return (
    <>
      <div className="text-[24px] justify-between flex m-5 items-center">
        <p className="flex gap-x-5 items-center">
          <img src={TaskSquare} width="30px" />
          <span>{!isUpdateModal ? "Create Store" : "Update Store"}</span>
        </p>
        <img
          className="cursor-pointer"
          src={CloseIcon}
          width="30px"
          onClick={() => setModalData({ isOpen: false })}
        />
      </div>
      <div className="grid gap-y-3 m-5 mt-10">
        <CustomInputBox
          label="Store Name"
          value={storeData.storeName}
          onChange={(e) =>
            setStoreData({ ...storeData, storeName: e.target.value })
          }
        />
        <CustomInputBox
          label="Store Url"
          value={storeData.storeUrl}
          onChange={(e) =>
            setStoreData({ ...storeData, storeUrl: e.target.value })
          }
        />
        <CustomInputBox
          label="Store Token"
          value={storeData.storeToken}
          onChange={(e) =>
            setStoreData({ ...storeData, storeToken: e.target.value })
          }
        />
        <CustomInputBox
          label="Store Logo"
          value={storeData.storeLogo}
          onChange={(e) =>
            setStoreData({ ...storeData, storeLogo: e.target.value })
          }
        />
      </div>
      <div
        className="flex justify-end gap-x-5  shadow-lg border-[1px] h-[68px]  bg-[#FFFFFF] px-6 py-4 rounded-tr-[32px] rounded-tl-[32px]    fixed bottom-0 "
        style={{ width: "-webkit-fill-available" }}
      >
        <ServiceButton
          onClick={addStore}
          text={!isUpdateModal ? "Add New Channel" : "Update Channel"}
          className="bg-[#1C1C1C] cursor-pointer text-[#FFFFFF] h-[36px] lg:!py-2 lg:!px-4 disabled:bg-[#E8E8E8] disabled:text-[#BBB] disabled:border-none"
        />
      </div>
    </>
  );
}

export default ChannelIntegrationModalContent;
