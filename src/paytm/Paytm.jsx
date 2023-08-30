import { useState, useEffect } from "react";
import { CheckoutProvider, Checkout } from "paytm-blink-checkout-react";
import { POST } from "../utils/webService";

function Paytm({ text }) {
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
      redirect: true,
    },
    handler: {
      transactionStatus: function transactionStatus(paymentStatus) {
        console.log("Transaction Status", paymentStatus);
      },
      notifyMerchant: function notifyMerchant(eventName, data) {
        console.log("Event : ", eventName, data);
      },
    },
  };
  const [mConfig, setMConfig] = useState(CONFIG);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutJsInstance, setCheckoutJsInstance] = useState(null);

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
  useEffect(() => {
    (async () => {
      const { data } = await POST(
        "http://localhost:8003/api/v1/paytm/firstStep",
        {
          paymentObject: {
            amount: 1,
            callbackUrl: "http://localhost:3000/TEST",
          },
        }
      );
      if (data?.success) {
        setMConfig({
          ...mConfig,
          data: {
            ...mConfig.data,
            token: data?.data?.data?.body?.txnToken,
            orderId: data?.data?.orderId,
            amount: data?.data?.amount,
          },
        });
      }
    })();
  }, []);

  return (
    <button
      type="button"
      className={`flex p-2 justify-center items-center text-white bg-black rounded-md h-9 w-full`}
      onClick={() => loadCheckoutScript}
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
