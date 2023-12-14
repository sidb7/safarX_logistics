import TaskSquare from "../../../../assets/task-square.svg";
import CloseIcon from "../../../../assets/CloseIcon.svg";
import CustomInputBox from "../../../../components/Input";
import ServiceButton from "../../../../components/Button/ServiceButton";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { GET, POST } from "../../../../utils/webService";
import {
  GET_SINGLE_STORE,
  POST_CREATE_STORE,
  CREATE_WOOCOMMERCE_STORE,
  UPDATE_SINGLE_STORE,
  CREATE_ZOHO_STORE,
  SELLER_WEB_URL,
} from "../../../../utils/ApiUrls";
import ShopifyIcon from "../../../../assets/Catalogue/shopify.svg";
import ShopifyLg from "../../../../assets/Catalogue/shopifyLg.svg";
import CustomDropDown from "../../../../components/DropDown";
import {
  capitalizeFirstLetter,
  setLocalStorage,
} from "../../../../utils/utility";
import axios from "axios";

interface IChannelProps {
  setIsLoading: any;
  setModalData: any;
  channelData: any;
  setChannelData: any;
  indexNum: number;
  integrate: boolean;
  modalData: any;
}

function ChannelIntegrationModalContent(props: IChannelProps) {
  const {
    setModalData,
    channelData,
    setChannelData,
    indexNum,
    integrate,
    modalData,
    setIsLoading,
  } = props;
  // let isUpdateModal = !integrate;
  let isUpdateModal = false;
  const [storeData, setStoreData]: any = useState({
    storeName: "",
    storeUrl: "",
    storeToken: "",
    storeLogo: "",
    channelName: "",
    clientId: "",
    clientSecret: "",
    code: "",
    organizationId: "",
    domain: "",
  });
  const [channel, setChannel] = useState(modalData?.modalData?.channel || "");

  const [isDisabled, setIsDisabled] = useState(true);

  const storeId = channelData?.channels?.[indexNum]?.storeId;

  const addStore = async () => {
    try {
      setIsDisabled(true);
      if (!isUpdateModal) {
        if (channel === "SHOPIFY") {
          setIsLoading(true);
          const { data } = await POST(POST_CREATE_STORE, storeData);
          if (data?.status) {
            // let newStore = [
            //   {
            //     name: storeData.storeName,
            //     icon: ShopifyIcon,
            //     iconLg: ShopifyLg,
            //     integrated: true,
            //     storeId: data?.data?.storeId || "",
            //     channel: "SHOPIFY",
            //   },
            // ];
            // if (channelData.channels.length > 0) {
            //   newStore = [...newStore, ...channelData.channels];
            // }
            // setChannelData({ channels: newStore });
            setModalData({ isOpen: false });
            toast.success(data?.message);
            window.location.reload();
          } else {
            setIsLoading(false);
            toast.error(data?.message);
            setModalData({ isOpen: false });
          }
          return;
        } else if (channel === "WOOCOMMERCE") {
          let userId = Date.now();
          let wooCommerceContents = {
            storeUrl: storeData.storeUrl,
            userId,
            storeName: storeData.storeName,
          };
          setLocalStorage(
            "wooCommerceContents",
            JSON.stringify(wooCommerceContents)
          );
          let returnUrl = `${SELLER_WEB_URL}/catalogues/channel-integration`;

          const sellerId = sessionStorage.getItem("sellerId");

          const reqUrl = `${storeData.storeUrl}/wc-auth/v1/authorize?app_name=SHIPYAARI&scope=read_write&user_id=${userId}&return_url=${returnUrl}&callback_url=${CREATE_WOOCOMMERCE_STORE}?sellerId=${sellerId}`;

          try {
            const { data } = await axios.get(reqUrl);
            console.log("data: ", data);
          } catch (error: any) {
            console.log("error?.config?.url: ", error?.config?.url);
            // window.alert(JSON.stringify(error));
            window.location.href = error?.config?.url;
          }
          return;
        } else if (channel === "ZOHO") {
          setIsLoading(true);
          const { data } = await POST(CREATE_ZOHO_STORE, storeData);
          if (data?.success) {
            toast.success(data?.message);
            window.location.reload();
          } else {
            toast.error(data?.message);
          }
        }
        setModalData({ isOpen: false });
        return;
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
            channel: "",
          },
        ];
        let tempArr = [...channelData.channels];
        tempArr.splice(indexNum, 1);
        newStore = [...newStore, ...tempArr];
        setChannelData({ channels: newStore });
        setModalData({ isOpen: false });
      }
    } catch (error) {
      setModalData({ isOpen: false });
    }
    setIsLoading(false);
    setIsDisabled(false);
  };

  const channelArr = [
    {
      label: "Zoho.com",
      value: ".com",
    },
    {
      label: "Zoho.in",
      value: ".in",
    },
  ];

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

  useEffect(() => {
    if (
      channel === "SHOPIFY" &&
      storeData.storeName !== "" &&
      storeData.storeUrl !== "" &&
      storeData.storeToken !== ""
    ) {
      setIsDisabled(false);
    } else if (
      channel === "WOOCOMMERCE" &&
      storeData.storeName !== "" &&
      storeData.storeUrl !== ""
    ) {
      setIsDisabled(false);
    } else if (channel === "ZOHO") {
      setIsDisabled(false);
    } else setIsDisabled(true);
  }, [storeData]);

  return (
    <>
      <div className="text-[20px] lg:text-[24px] justify-between flex m-5 items-center">
        <p className="flex gap-x-5 items-center">
          <img src={TaskSquare} width="25px" />
          <span>
            {!isUpdateModal
              ? `Create ${capitalizeFirstLetter(channel)} Store`
              : "Update Store"}
          </span>
        </p>
        <img
          className="cursor-pointer"
          src={CloseIcon}
          width="25px"
          onClick={() => setModalData({ ...modalData, isOpen: false })}
        />
      </div>
      <div className="grid gap-y-3 m-5 mt-10">
        {/* <CustomDropDown
          onChange={(e) => {
            handleChannel(e.target.value);
          }}
          options={channelArr}
          heading="Select Channel"
        /> */}
        {channel === "SHOPIFY" ? (
          <div className="grid gap-y-3">
            <CustomInputBox
              className="removePaddingPlaceHolder"
              isRequired={true}
              placeholder="Store Name"
              value={storeData.storeName}
              onChange={(e) =>
                setStoreData({ ...storeData, storeName: e.target.value })
              }
            />
            <CustomInputBox
              className="removePaddingPlaceHolder"
              placeholder="Store Url - Storename"
              isRequired={true}
              value={storeData.storeUrl}
              onChange={(e) =>
                setStoreData({ ...storeData, storeUrl: e.target.value })
              }
            />
            <p className="text-[15px]">
              Example : https://<strong>storename</strong>.myshopify.com/{" "}
            </p>
            <CustomInputBox
              className="removePaddingPlaceHolder"
              placeholder="Store Token"
              isRequired={true}
              value={storeData.storeToken}
              onChange={(e) =>
                setStoreData({ ...storeData, storeToken: e.target.value })
              }
            />
            <CustomInputBox
              className="removePaddingPlaceHolder"
              placeholder="Store Logo"
              value={storeData.storeLogo}
              onChange={(e) =>
                setStoreData({ ...storeData, storeLogo: e.target.value })
              }
            />
          </div>
        ) : channel === "WOOCOMMERCE" ? (
          <div className="grid gap-y-3">
            <CustomInputBox
              className="removePaddingPlaceHolder"
              placeholder="Store Url - https://example.com"
              isRequired={true}
              value={storeData.storeUrl}
              onChange={(e) =>
                setStoreData({ ...storeData, storeUrl: e.target.value })
              }
            />
            <CustomInputBox
              className="removePaddingPlaceHolder"
              placeholder="Store Name"
              isRequired={true}
              value={storeData.storeName}
              onChange={(e) =>
                setStoreData({ ...storeData, storeName: e.target.value })
              }
            />
          </div>
        ) : channel === "ZOHO" ? (
          <div className="grid gap-y-3">
            <CustomInputBox
              className="removePaddingPlaceHolder"
              placeholder="Client ID"
              isRequired={true}
              value={storeData.clientId}
              onChange={(e) =>
                setStoreData({ ...storeData, clientId: e.target.value })
              }
            />
            <CustomInputBox
              className="removePaddingPlaceHolder"
              placeholder="Client Secret"
              isRequired={true}
              value={storeData.clientSecret}
              onChange={(e) =>
                setStoreData({ ...storeData, clientSecret: e.target.value })
              }
            />
            <CustomInputBox
              className="removePaddingPlaceHolder"
              placeholder="Code"
              isRequired={true}
              value={storeData.code}
              onChange={(e) =>
                setStoreData({ ...storeData, code: e.target.value })
              }
            />
            <CustomInputBox
              className="removePaddingPlaceHolder"
              placeholder="Organization Id"
              isRequired={true}
              value={storeData.organizationId}
              onChange={(e) =>
                setStoreData({ ...storeData, organizationId: e.target.value })
              }
            />
            <CustomDropDown
              onChange={(e) => {
                console.log("e.target.value : ", e.target.value);
                setStoreData({ ...storeData, domain: e.target.value });
              }}
              options={channelArr}
              heading="Zoho Domain"
            />
          </div>
        ) : null}
      </div>
      <div
        className="flex justify-end gap-x-5  shadow-lg border-[1px] h-[68px]  bg-[#FFFFFF] px-6 py-4 rounded-tr-[32px] rounded-tl-[32px]    fixed bottom-0 "
        style={{ width: "-webkit-fill-available" }}
      >
        <ServiceButton
          disabled={isDisabled}
          onClick={addStore}
          text={!isUpdateModal ? "Add New Channel" : "Update Channel"}
          className={`bg-[#1C1C1C] cursor-pointer text-[#FFFFFF] h-[36px] lg:!py-2 lg:!px-4 w-[10rem] disabled:bg-[#E8E8E8] disabled:text-[#BBB] disabled:border-none`}
        />
      </div>
    </>
  );
}

export default ChannelIntegrationModalContent;
