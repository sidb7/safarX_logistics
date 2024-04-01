import TaskSquare from "../../../../assets/task-square.svg";
import CloseIcon from "../../../../assets/CloseIcon.svg";
import CustomInputBox from "../../../../components/Input";
import ServiceButton from "../../../../components/Button/ServiceButton";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { GET, POST } from "../../../../utils/webService";
import {
  GET_SINGLE_STORE,
  POST_CREATE_STORE,
  CREATE_WOOCOMMERCE_STORE,
  UPDATE_SINGLE_STORE,
  CREATE_ZOHO_STORE,
  SELLER_WEB_URL,
  AMAZON_BASE_URL,
  CREATE_UNICOMMERCE_STORE,
  UPDATE_EXPIRED_TOKEN,
} from "../../../../utils/ApiUrls";
import ShopifyIcon from "../../../../assets/Catalogue/shopify.svg";
import ShopifyLg from "../../../../assets/Catalogue/shopifyLg.svg";
import CustomDropDown from "../../../../components/DropDown";
import {
  capitalizeFirstLetter,
  generateUniqueCode,
  setLocalStorage,
} from "../../../../utils/utility";
import axios from "axios";
import { Spinner } from "../../../../components/Spinner";
import ErrorIcon from "../../../../assets/info-circle.svg";
import { woocommerceUrl } from "../../../../utils/regexCheck";
import UniCommerceIcon from "../../../../assets/Catalogue/unicommerce fn.svg";
import ShipYaariIcon from "../../../../assets/webshipyaarilogo.svg";

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
    userName: "",
    password: "",
  });

  const [urlError, setUrlError] = useState(false);
  const loginRef: any = useRef(null);
  const [channel, setChannel] = useState(modalData?.modalData?.channel || "");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const storeId = channelData?.channels?.[indexNum]?.storeId;
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isExpiredCondition, setIsExpiredCondition] = useState(false);
  const [expiredChannelObj, setExpiredChannelObj] = useState({
    channelName: "",
  });

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
            let channelSessionObj: any = sessionStorage.getItem("userInfo");
            channelSessionObj = JSON.parse(channelSessionObj);
            if (!channelSessionObj?.nextStep?.isChannelIntegrated) {
              channelSessionObj.nextStep.isChannelIntegrated = true;
              sessionStorage.setItem(
                "userInfo",
                JSON.stringify(channelSessionObj)
              );
            }
            window.location.reload();
            return;
          } else {
            setIsLoading(false);
            toast.error(data?.message);
            setModalData({ isOpen: false });
          }
          return;
        } else if (channel === "WOOCOMMERCE") {
          setIsModalLoading(true);
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
          setIsModalLoading(false);
          return;
        } else if (channel === "ZOHO") {
          setIsLoading(true);
          const { data } = await POST(CREATE_ZOHO_STORE, storeData);
          if (data?.success) {
            toast.success(data?.message);
            window.location.reload();
            return;
          } else {
            toast.error(data?.message);
          }
        } else if (channel === "AMAZON") {
          setIsLoading(true);
          const state = generateUniqueCode(8, 8);
          sessionStorage.setItem("amazon_store", storeData.storeName);
          window.location.href = `${AMAZON_BASE_URL}/apps/authorize/consent?version=beta&application_id=${process.env.REACT_APP_AMAZON_APPLICATION_ID}&state=${state}`;
        }
        setIsLoading(false);
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

  console.log("");

  const integrateUniCommerceUser = async () => {
    try {
      setIsLoginLoading(true);
      let payload = {
        userName: storeData?.userName,
        password: storeData?.password,
        storeUrl: storeData?.storeUrl,
      };

      // console.log("channelData: ", channelData);
      const { data } = await POST(CREATE_UNICOMMERCE_STORE, payload);

      if (data?.status) {
        toast.success(data?.message || "Successfully Integrated Store");
        console.log("dara.dara: ", data?.data);
        let tempArr = channelData.channels;
        tempArr = [
          ...tempArr,
          {
            name: capitalizeFirstLetter(storeData?.userName),
            icon: UniCommerceIcon,
            iconLg: UniCommerceIcon,
            integrated: true,
            storeId: data?.data?.storeId || "",
            channelName: "UNICOMMERCE",
            createdAt: Date.now(),
          },
        ];
        setChannelData({ channels: tempArr });
        console.log("ChannelsData: ", channelData);
      } else {
        toast.error(data?.message || "Invalid Credentials");
      }
    } catch (error: any) {
      toast.error(
        error?.message || "Something Went Wrong, Please Contact Administration"
      );
    }
    setModalData({ isOpen: false });
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

  const updateToken = async () => {
    try {
      setIsModalLoading(true);
      if (modalData?.modalData?.channelName === "SHOPIFY") {
        let payload = {
          storeId: modalData?.modalData?.storeId,
          channel: modalData?.modalData?.channelName,
          storeUrl: storeData?.storeUrl,
          storeToken: storeData?.storeToken,
        };

        const { data } = await POST(UPDATE_EXPIRED_TOKEN, payload);
        if (data.success) {
          toast.success(data.message);
          let channels = channelData.channels;
          channels.map((channel: any) => {
            if (channel.storeId === modalData?.modalData?.storeId) {
              channel.expiredToken = false;
            }
          });
          setChannelData({ channels });
        } else toast.error(data.message);
        setModalData({ isOpen: false });
      } else if (modalData?.modalData?.channelName === "WOOCOMMERCE") {
        // setIsModalLoading(true);
        // let userId = Date.now();
        // let updateWooCommerceToken = {
        //   storeUrl: storeData.storeUrl,
        //   userId,
        //   storeName: storeData.storeName,
        // };
        // setLocalStorage(
        //   "updateWooCommerceToken",
        //   JSON.stringify(updateWooCommerceToken)
        // );
        // let returnUrl = `${SELLER_WEB_URL}/catalogues/channel-integration`;
        // const sellerId = sessionStorage.getItem("sellerId");
        // const reqUrl = `${storeData.storeUrl}/wc-auth/v1/authorize?app_name=SHIPYAARI&scope=read_write&user_id=${userId}&return_url=${returnUrl}&callback_url=${CREATE_WOOCOMMERCE_STORE}?sellerId=${sellerId}`;
        // try {
        //   const { data } = await axios.get(reqUrl);
        //   console.log("data: ", data);
        // } catch (error: any) {
        //   console.log("error?.config?.url: ", error?.config?.url);
        //   // window.alert(JSON.stringify(error));
        //   window.location.href = error?.config?.url;
        // }
        // setIsModalLoading(false);
      }
    } catch (error: any) {
      toast.error(error.message);
      setModalData({ isOpen: false });
    }
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
      setIsExpiredCondition(modalData?.modalData?.integrated);
      setExpiredChannelObj({ channelName: modalData?.modalData?.channelName });
      setStoreData({
        ...storeData,
        storeUrl: modalData?.modalData?.storeUrl,
        storeName: modalData?.modalData?.name,
      });
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
      woocommerceUrl.test(storeData.storeUrl) &&
      storeData.storeName !== ""
    ) {
      setIsDisabled(false);
    } else if (
      expiredChannelObj?.channelName === "SHOPIFY" &&
      storeData.storeToken !== ""
    ) {
      setIsDisabled(false);
    } else if (
      channel === "ZOHO" &&
      storeData.clientId !== "" &&
      storeData.clientSecret !== "" &&
      storeData.code !== "" &&
      storeData.organizationId !== "" &&
      storeData.domain !== "" &&
      storeData.storeName !== ""
    ) {
      setIsDisabled(false);
    } else if (channel === "AMAZON" && storeData.storeName !== "") {
      setIsDisabled(false);
    } else if (
      channel === "UNICOMMERCE" &&
      storeData.userName !== "" &&
      storeData.password !== "" &&
      storeData.storeUrl !== ""
    ) {
      if (loginRef.current) {
        loginRef.current.style.opacity = "100%";
        loginRef.current.style.pointerEvents = "auto";
      }
    } else {
      setIsDisabled(true);
      if (loginRef.current) {
        loginRef.current.style.opacity = "40%";
        loginRef.current.style.pointerEvents = "none";
      }
    }
  }, [storeData]);

  return (
    <>
      <div className="text-[20px] lg:text-[24px] justify-between flex m-5 items-center">
        <p className="flex gap-x-5 items-center">
          <img src={TaskSquare} width="25px" />
          {isExpiredCondition ? (
            <span>Update {capitalizeFirstLetter(channel)} Token</span>
          ) : (
            <span>
              {!isUpdateModal
                ? `Create ${capitalizeFirstLetter(channel)} Store`
                : "Update Store"}
            </span>
          )}
        </p>
        <img
          className="cursor-pointer"
          src={CloseIcon}
          width="25px"
          onClick={() => setModalData({ ...modalData, isOpen: false })}
        />
      </div>
      {isExpiredCondition ? (
        <div className="grid gap-y-3 m-5 mt-10">
          {isModalLoading ? (
            <div className="absolute right-[50%] top-[50%] transform -translate-y-1/2 cursor-pointer">
              <Spinner />
            </div>
          ) : expiredChannelObj.channelName === "SHOPIFY" ? (
            <div className="grid gap-y-3">
              <CustomInputBox
                className="removePaddingPlaceHolder"
                isRequired={true}
                placeholder="Store Name"
                value={modalData?.modalData?.name}
                isDisabled={true}
                // onChange={(e) =>
                //   setStoreData({ ...storeData, storeName: e.target.value })
                // }
              />
              <CustomInputBox
                className="removePaddingPlaceHolder"
                placeholder="Store Domain"
                isRequired={true}
                value={modalData?.modalData?.storeUrl}
                isDisabled={true}
                // onChange={(e) =>
                //   setStoreData({ ...storeData, storeUrl: e.target.value })
                // }
              />
              <p className="text-[15px]">
                Example : https://<strong>domainName</strong>.myshopify.com/{" "}
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
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <div className="grid gap-y-3 m-5 mt-10">
          {/* <CustomDropDown
          onChange={(e) => {
            handleChannel(e.target.value);
          }}
          options={channelArr}
          heading="Select Channel"
        /> */}
          {isModalLoading ? (
            <div className="absolute right-[50%] top-[50%] transform -translate-y-1/2 cursor-pointer">
              <Spinner />
            </div>
          ) : channel === "SHOPIFY" ? (
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
                placeholder="Store Domain"
                isRequired={true}
                value={storeData.storeUrl}
                onChange={(e) =>
                  setStoreData({ ...storeData, storeUrl: e.target.value })
                }
              />
              <p className="text-[15px]">
                Example : https://<strong>domainName</strong>.myshopify.com/{" "}
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

              {/* <div className="space-y-2">
              <div>
                <CustomInputBox
                  className="removePaddingPlaceHolder"
                  placeholder="Store Logo"
                  value={storeData.storeLogo}
                  onChange={(e) =>
                    setStoreData({ ...storeData, storeLogo: e.target.value })
                  }
                />
              </div>

              <input
                type="file"
                multiple={false}
                accept="image/*"
                className="flex items-center justify-center !py-0  !px-0 custom-input !font-Lato"
                onChange={(e: any) => {
                  console.log("Images", e.target.files[0]);
                  console.log("Name of Image", e.target.files[0].name);
                  setStoreData({
                    ...storeData,
                    storeLogo: e.target.files[0].name,
                  });
                }}
              />
              <p className="text-[15px]">Upload only Images</p>
            </div> */}
            </div>
          ) : channel === "WOOCOMMERCE" ? (
            <div className="grid gap-y-3">
              <div>
                <CustomInputBox
                  className="removePaddingPlaceHolder"
                  placeholder="Store Domain - https://www.my-woocommerce-store.com"
                  isRequired={true}
                  value={storeData.storeUrl}
                  onChange={(e) => {
                    setStoreData({ ...storeData, storeUrl: e.target.value });

                    if (!woocommerceUrl.test(e.target.value)) {
                      setUrlError(true);
                    } else {
                      setUrlError(false);
                    }
                  }}
                  onBlur={(e) => {
                    if (e.target.value.includes("www."))
                      setStoreData({
                        ...storeData,
                        storeName: capitalizeFirstLetter(
                          e.target.value.split(".")[1]
                        ),
                      });
                    else
                      setStoreData({
                        ...storeData,
                        storeName: capitalizeFirstLetter(
                          e.target.value.split(".")[0].slice(8)
                        ),
                      });
                  }}
                />

                {urlError === true && (
                  <div className="flex items-center gap-x-1 mt-1">
                    <img src={ErrorIcon} alt="" width={10} height={10} />
                    <span className="font-normal text-[#F35838] text-xs leading-3">
                      Url Format is https://example.domainName.com
                    </span>
                  </div>
                )}
              </div>

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
                placeholder="Storename"
                isRequired={true}
                value={storeData.storeUrl}
                onChange={(e) =>
                  setStoreData({ ...storeData, storeUrl: e.target.value })
                }
              />

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
                inputType="number"
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
          ) : channel === "AMAZON" ? (
            <div className="grid gap-y-3">
              <CustomInputBox
                className="removePaddingPlaceHolder"
                isRequired={true}
                placeholder="Store Name"
                value={storeData.storeName}
                onChange={(e: any) =>
                  setStoreData({ ...storeData, storeName: e.target.value })
                }
              />
            </div>
          ) : channel === "UNICOMMERCE" ? (
            <div className="m-[1rem]">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[26px] ">Login to Unicommerce</div>
                  <div className="text-[18px] opacity-50 mb-[2rem]">
                    Enter your details below.
                  </div>
                </div>
                <div className="flex  ">
                  <img src={ShipYaariIcon} className="w-[70px]" />
                  {/* <img src={RefreshIcon} width="60px" /> */}
                  <img
                    src={UniCommerceIcon}
                    className="w-[100px] 2xl:w-[150px]"
                  />
                </div>
              </div>
              <div className="text-[12px] mb-1 font-semibold opacity-60">
                Store URL
              </div>
              <div className="mb-[1.5rem]">
                <CustomInputBox
                  className="removePaddingPlaceHolder"
                  isRequired={true}
                  placeholder="Store Domain"
                  value={storeData.storeUrl}
                  onChange={(e: any) =>
                    setStoreData({ ...storeData, storeUrl: e.target.value })
                  }
                />
              </div>
              <div className="text-[12px] mb-1 font-semibold opacity-60">
                EMAIL OR MOBILE
              </div>
              <div className="mb-[1.5rem]">
                <CustomInputBox
                  className="removePaddingPlaceHolder"
                  isRequired={true}
                  placeholder="Registered Email Or Mobile"
                  value={storeData.userName}
                  onChange={(e: any) =>
                    setStoreData({ ...storeData, userName: e.target.value })
                  }
                />
              </div>
              <div className="text-[12px] mb-1 font-semibold opacity-60">
                PASSWORD
              </div>
              <div>
                {" "}
                <CustomInputBox
                  className="removePaddingPlaceHolder"
                  isRequired={true}
                  inputType="password"
                  placeholder="Enter Your Password"
                  value={storeData.password}
                  onChange={(e: any) =>
                    setStoreData({ ...storeData, password: e.target.value })
                  }
                />
              </div>
              <div className="relative text-center mt-[2rem]">
                {isLoginLoading ? (
                  <div className="absolute right-[47%] top-[50%] transform -translate-y-1/2 cursor-pointer">
                    <Spinner />
                  </div>
                ) : (
                  <button
                    ref={loginRef}
                    style={{ boxShadow: "0 0 20px 0 rgba(156, 197, 56, 0.8)" }}
                    className="w-[100%] bg-[#9CC535] p-[0.7rem] rounded-md text-white opacity-40 pointer-events-none hover:bg-[#abd444]"
                    onClick={integrateUniCommerceUser}
                  >
                    LOGIN
                  </button>
                )}
              </div>
            </div>
          ) : null}
        </div>
      )}
      {channel !== "UNICOMMERCE" &&
        (!isExpiredCondition ? (
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
        ) : (
          <div
            className="flex justify-end gap-x-5  shadow-lg border-[1px] h-[68px]  bg-[#FFFFFF] px-6 py-4 rounded-tr-[32px] rounded-tl-[32px]    fixed bottom-0 "
            style={{ width: "-webkit-fill-available" }}
          >
            <ServiceButton
              disabled={isDisabled}
              onClick={updateToken}
              text={"Update Token"}
              className={`bg-[#1C1C1C] cursor-pointer text-[#FFFFFF] h-[36px] lg:!py-2 lg:!px-4 w-[10rem] disabled:bg-[#E8E8E8] disabled:text-[#BBB] disabled:border-none`}
            />
          </div>
        ))}
    </>
  );
}

export default ChannelIntegrationModalContent;
