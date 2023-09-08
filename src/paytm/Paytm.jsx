import { useState, useEffect } from "react";
import { CheckoutProvider, Checkout } from "paytm-blink-checkout-react";
import { POST } from "../utils/webService";
import { INITIAL_RECHARGE, RECHARGE_STATUS } from "../utils/ApiUrls";
import { toast } from "react-toastify";

function Paytm({ text, amt }) {
  const rechargeStatus = async (paytmStatus) => {
    const { data } = await POST(RECHARGE_STATUS, {
      orderId: paytmStatus?.ORDERID,
      paymentGateway: "PAYTM",
    });
    if (data?.success) {
      // setShowCheckout(false);
      toast.success("Successfully Done");
    }
  };
  const CONFIG = {
    root: "",
    style: {
      bodyBackgroundColor: "#fafafb",
      bodyColor: "",
      themeBackgroundColor: "#0FB8C9",
      themeColor: "#ffffff",
      headerBackgroundColor: "#284055",
      headerColor: "#ffffff",
      errorColor: "",
      successColor: "",
      card: {
        padding: "",
        backgroundColor: "",
      },
    },
    data: {
      orderId: "",
      token: "",
      tokenType: "TXN_TOKEN",
      amount: "",
    },
    payMode: {
      labels: {},
      filter: {
        exclude: [],
      },
      order: [
        "CC",
        "DC",
        "NB",
        "UPI",
        "PPBL",
        "PPI",
        "BALANCE",
        "CARD",
        "LOGIN",
      ],
    },
    website: "DEFAULT",
    flow: "DEFAULT",
    merchant: {
      mid: "Shipya54880889423475",
      name: "AVN BUSINESS SOLUTIONS",
      redirect: false,
    },
    handler: {
      transactionStatus: function transactionStatus(paymentStatus) {
        if (paymentStatus?.STATUS === "TXN_SUCCESS") {
          rechargeStatus(paymentStatus);
          setMConfig(null);
          // setShowCheckout(false);
          document.getElementById("paytm-checkoutjs").style.display = "none";
        }
      },
      notifyMerchant: function notifyMerchant(eventName, data) {
        console.info("Event", eventName, data);
      },
    },
  };
  const [mConfig, setMConfig] = useState(CONFIG);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutJsInstance, setCheckoutJsInstance] = useState(null);

  const initialPaytm = async () => {
    const { data } = await POST(INITIAL_RECHARGE, {
      paymentObject: {
        amount: String(amt),
        callbackUrl: "/orders/add-order/payment",
      },
      paymentGateway: "PAYTM",
    });
    if (data?.success) {
      setMConfig({
        ...mConfig,
        data: {
          ...mConfig.data,
          token: data?.data?.txnToken,
          orderId: data?.data?.orderId,
          amount: data?.data?.amount,
        },
      });
    }
  };

  const loadCheckoutScript = () => {
    const url = "https://securegw.paytm.in/merchantpgpui/checkoutjs/merchants/";
    const scriptElement = document.createElement("script");
    scriptElement.async = true;
    scriptElement.src = url.concat(mConfig.merchant.mid);
    scriptElement.type = "application/javascript";

    scriptElement.onload = () => {
      const checkoutJsInstance = getCheckoutJsObj();

      if (checkoutJsInstance && checkoutJsInstance.onLoad) {
        checkoutJsInstance.onLoad(() => {
          setCheckoutJsInstance(checkoutJsInstance);
          setShowCheckout(true);
          initialPaytm();
        });
      } else {
        console.error("onload not available!");
      }
    };
    scriptElement.onerror = (error) => {
      console.error("script load fail!");
    };
    document.body.appendChild(scriptElement);
  };

  const getCheckoutJsObj = () => {
    if (window && window.Paytm && window.Paytm.CheckoutJS) {
      return window.Paytm.CheckoutJS;
    } else {
      console.error("Checkout instance not found!");
    }

    return null;
  };
  // useEffect(() => {
  //   (async () => {
  //     const { data } = await POST(
  //       INITIAL_RECHARGE,
  //       {
  //         paymentObject: {
  //           amount: String(amt),
  //           callbackUrl: "/orders/add-order/payment",
  //         },
  //         paymentGateway: 'PAYTM'
  //       }
  //     );
  //     if (data?.success) {
  //       setMConfig({
  //         ...mConfig,
  //         data: {
  //           ...mConfig.data,
  //           token: data?.data?.txnToken,
  //           orderId: data?.data?.orderId,
  //           amount: data?.data?.amount,
  //         },
  //       });
  //     }
  //   })();
  // }, []);

  return (
    <button
      type="button"
      className={`flex p-2 justify-center items-center text-white bg-black rounded-md h-9 w-full`}
      onClick={loadCheckoutScript}
    >
      <p className="buttonClassName lg:text-[14px] whitespace-nowrap">{text}</p>
      <CheckoutProvider
        config={mConfig}
        checkoutJsInstance={checkoutJsInstance}
        openInPopup={true}
        env="PROD"
      >
        {showCheckout && <Checkout />}
      </CheckoutProvider>
    </button>
  );
}

export default Paytm;
