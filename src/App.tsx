import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import MyRoutes from "./routes/MyRoutes";
import { useSelector } from "react-redux";
import CheckIsOnline from "./components/CheckIsOnline";
import { GlobalToast } from "./components/GlobalToast/GlobalToast";
import { useStore } from "react-redux";
import { useDispatch } from "react-redux";
import { setWalletBalance } from "./redux/reducers/userReducer";
import { socketCallbacks } from "./Socket";
import TagManager from "react-gtm-module";
import ReactGA from "react-ga4";
import {
  ADMIN_URL,
  Environment,
  REACT_APP_GA4_ID,
  REACT_APP_GTM_ID,
} from "./utils/ApiUrls";
import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
import { signInUser } from "./redux/reducers/signInReducer";
import {
  constructNavigationObject,
  decrypt,
  setLocalStorage,
  tokenKey,
} from "./utils/utility";
import { Integrations } from "@sentry/tracing";
import * as Sentry from "@sentry/react";
import "./styles/index.css";

Sentry.setUser({
  email: JSON.parse(sessionStorage.getItem("userInfo") as any)?.email,
  username: JSON.parse(sessionStorage.getItem("userInfo") as any)?.name,
});

Sentry.init({
  dsn: "https://23c8372ecd2f2f7fdd613c6b664ae402@o4505170950488064.ingest.us.sentry.io/4506071970349056",
  integrations: [
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:

      colorScheme: "light",
      isNameRequired: true,
      isEmailRequired: true,
    }),
    new Integrations.BrowserTracing(),
  ],
  tracesSampleRate: 1.0,
  release: "blaze-react-seller@1.1",
});

declare global {
  interface Window {
    dataLayer?: any;
    gtag: (...args: any[]) => void;
  }
}

const App = () => {
  const tagManagerArgs: any = {
    gtmId: REACT_APP_GTM_ID,
  };

  const navigate = useNavigate();
  const location: any = useLocation();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
  }, [location]);

  ReactGA.initialize(REACT_APP_GA4_ID);

  const [roomName, setRoomName] = useState<any>(
    `${sessionStorage.getItem("sellerId")}`
  );

  const dispatch = useDispatch();
  const [isSocketInitialized, setIsSocketInitialized] = useState(false);
  console.log("isSocketconnectedApp.tsx", isSocketInitialized);

  useEffect(() => {
    //Init G Tag Manager
    TagManager.initialize(tagManagerArgs);

    //Socket Connectionu
    const connectSocket1 = async () => {
      if (roomName) {
        await socketCallbacks.connectSocket(dispatch);
        setIsSocketInitialized(true);
      }
    };
    connectSocket1();
    // return () => {
    //   socketCallbacks.disconnectSocket();
    // };
  }, []);

  console.log("packageversion", process.env.npm_package_version);

  //sentry code
  const userInfoString = sessionStorage.getItem("userInfo");
  useEffect(() => {
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
    setUserInfo(userInfo);

    const sellerId = userInfo?.sellerId;
    const emailId = userInfo?.email;

    let script: any = "";
    let scriptElement: any = "";

    if (
      Environment === "production" &&
      userInfo !== undefined &&
      userInfo !== null
    ) {
      script = document.createElement("script");
      script.src =
        "https://js.sentry-cdn.com/23c8372ecd2f2f7fdd613c6b664ae402.min.js";
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);

      scriptElement = document.createElement("script");
      // console.log("🚀 ~ useEffect ~ userInfo -------------:", userInfo);
      scriptElement.innerHTML = `
          window.sentryOnLoad = function () {
            Sentry.init({
              integrations: [
                new Sentry.Replay({
                  maskAllText: false,
                  blockAllMedia: false,
                }),
              ],
          release: "react-blaze@5.4.24",

            });
            Sentry.configureScope(function(scope) {
              // Set user.id and user.email if available
              if ('${sellerId}' && '${emailId}') {
                scope.setUser({ id: '${sellerId}', email: '${emailId}' });
              }
            });

          };
        `;
      document.body.appendChild(scriptElement);
    }

    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
      if (scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
    };
  }, [userInfoString]);

  useEffect(() => {
    const receiveMessage = (event: any) => {
      console.log("🚀 ~ receiveMessage ~ ADMIN_URL:", ADMIN_URL);
      const expectedOrigin = ADMIN_URL;
      if (event.origin.includes(expectedOrigin)) {
        const sellerData = event.data.sellerData;
        console.log("🚀 ~ receiveMessage ~ sellerData:", sellerData);
        if (sellerData) {
          loginFromSeller(JSON.parse(sellerData));
        }
      } else {
        console.error("Unexpected origin:", event.origin);
      }
    };

    window.addEventListener("message", receiveMessage, false);

    return () => {
      window.removeEventListener("message", receiveMessage);
    };
  }, []);

  const loginFromSeller = (sellerData: any) => {
    sessionStorage.setItem("setKycValue", sellerData?.nextStep?.kyc);

    let signInUserReducerDetails = {
      email: sellerData.email,
      name: sellerData.name,
    };

    dispatch(signInUser(signInUserReducerDetails));

    sessionStorage.setItem("sellerId", sellerData.sellerId);
    sessionStorage.setItem("userName", sellerData.name);
    sessionStorage.setItem("userInfo", JSON.stringify(sellerData));
    setLocalStorage(`${sellerData.sellerId}_${tokenKey}`, sellerData.token);

    window?.dataLayer?.push({
      event: "Login",
      seller_email: sellerData?.email,
      sellerId: sellerData?.sellerId,
      seller_name: sellerData?.name,
      seller_kyc: sellerData?.nextStep?.kyc,
      seller_bank_verification_done: sellerData?.nextStep?.bank,
      isReturningUser: sellerData?.isReturningUser,
    });

    const token = sessionStorage.getItem("sellerId")
      ? `${sessionStorage.getItem(
          "sellerId"
        )}_891f5e6d-b3b3-4c16-929d-b06c3895e38d`
      : "";

    if (token !== "") {
      console.log("socketConnectedAfterlogin");
      socketCallbacks.connectSocket(dispatch);
    }

    navigate(0);
  };

  return (
    <>
      <MyRoutes />
      <CheckIsOnline />
      <Toaster
        position="top-center"
        reverseOrder={true}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
      />
    </>
  );
};

export default App;
