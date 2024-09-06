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
// import { Integrations } from "@sentry/tracing";
import * as Sentry from "@sentry/react";
import "./styles/index.css";
import MyWidget from "./Widget";

import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";
import { timer } from "./redux/reducers/syncChannel";
const timestamp = Date.now(); // Get the current timestamp in milliseconds
const date = new Date(timestamp); // Create a Date object from the timestamp

// Format the date as a string in "dd-mm-yyyy" format
const formattedDate = `${padZero(date.getDate())}-${padZero(
  date.getMonth() + 1
)}-${date.getFullYear()}`;

function padZero(num: any) {
  return num.toString().padStart(2, "0"); // Pad the number with leading zero if less than 10
}

const userInfo = localStorage.getItem("userInfo");
if (userInfo) {
  try {
    const parsedUserInfo = JSON.parse(userInfo);
    // console.log("🚀 ~ useEffect ~ parsedUserInfo:", parsedUserInfo);
    const {
      sellerId,
      email,
      contactNumber,
      isWalletRechage,
      isReturningUser,
      name,
      nextStep,
    } = parsedUserInfo;

    window?.dataLayer?.push({
      event: "page_view",
      seller_email: email,
      sellerId: sellerId,
      seller_name: name,
      seller_kyc: nextStep?.kyc,
      seller_mobileNumber: contactNumber,
      seller_bank_verification_done: nextStep?.bank,
      isWalletRechage,
      isReturningUser: isReturningUser,
    });
  } catch (error) {
    console.error("Failed to parse user info:", error);
  }
} else {
  console.log("No user info available in localStorage");
}

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
    `${localStorage.getItem("sellerId")}`
  );

  const dispatch = useDispatch();
  const [isSocketInitialized, setIsSocketInitialized] = useState(false);
  // console.log("isSocketconnectedApp.tsx", isSocketInitialized);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      try {
        const parsedUserInfo = JSON.parse(userInfo);
        // console.log("🚀 ~ useEffect ~ parsedUserInfo:", parsedUserInfo);
        const {
          sellerId,
          email,
          contactNumber,
          isReturningUser,
          name,
          nextStep,
          isWalletRechage,
        } = parsedUserInfo;

        window?.dataLayer?.push({
          event: "page_view",
          seller_email: email,
          sellerId: sellerId,
          seller_name: name,
          seller_kyc: nextStep?.kyc,
          isWalletRechage: isWalletRechage,
          seller_mobileNumber: contactNumber,
          seller_bank_verification_done: nextStep?.bank,
          isReturningUser: isReturningUser,
        });
      } catch (error) {
        console.error("Failed to parse user info:", error);
      }
    } else {
      console.log("No user info available in localStorage");
    }

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

  // console.log("packageversion", process.env.npm_package_version);

  //sentry code
  const userInfoString = localStorage.getItem("userInfo");
  useEffect(() => {
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
    const sellerId = userInfo?.sellerId;
    const emailId = userInfo?.email;

    let script: any = "";
    let scriptElement: any = "";

    if (
      Environment === "production" &&
      userInfo !== undefined &&
      userInfo !== null
    ) {
      setUserInfo(userInfo);

      Sentry.setUser({
        id: `Seller ID: ${userInfo?.sellerId}`,
        email: userInfo?.email,
        username: `${userInfo?.name} (${userInfo?.sellerId})`,
      });

      let privateCompanyInfo: any = {
        blaze_privateCompanyId: userInfo?.privateCompanyId || "N/A",
        blaze_privateCompanyName: userInfo?.privateCompanyName || "N/A",
      };

      Sentry.setTags(privateCompanyInfo);

      Sentry.init({
        dsn: "https://23c8372ecd2f2f7fdd613c6b664ae402@o4505170950488064.ingest.us.sentry.io/4506071970349056",
        debug: true,
        integrations: [
          Sentry.feedbackIntegration({
            // Additional SDK configuration goes in here, for example:

            colorScheme: "light",
            isNameRequired: true,
            isEmailRequired: true,
          }),
          // Sentry.captureConsoleIntegration(),
          // Sentry.contextLinesIntegration(),
          // Sentry.linkedErrorsIntegration({
          //   limit: 7,
          // }),
          // Sentry.debugIntegration(),
          //   Sentry.replayIntegration({
          //     maskAllText: false,
          //     maskAllInputs: false,
          //     blockAllMedia: false,
          //     unblock: [".sentry-unblock, [data-sentry-unblock]"],
          //     unmask: [".sentry-unmask, [data-sentry-unmask]"],
          //     //    networkDetailAllowUrls: [window.location.origin],
          //     networkDetailAllowUrls: [
          //       "api-seller.shipyaari.com",
          //       "api-admin.shipyaari.com",
          //     ],
          //     networkRequestHeaders: ["Cache-Control"],
          //     networkResponseHeaders: ["Referrer-Policy"],
          //   }),
          //   new Integrations.BrowserTracing(),
        ],
        // tracePropagationTargets: ["*"],

        tracesSampleRate: 1.0,
        release: `blaze-react-seller@${formattedDate}`,
      });
    }

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
               dsn: "https://23c8372ecd2f2f7fdd613c6b664ae402@o4505170950488064.ingest.us.sentry.io/4506071970349056",
              integrations: [
                new Sentry.Replay({
                  maskAllText: false,
                  maskAllInputs:false,
                  blockAllMedia: false,
                  unblock: ['.sentry-unblock, [data-sentry-unblock]'],
                  unmask: ['.sentry-unmask, [data-sentry-unmask]'],
                   networkDetailAllowUrls: [
              "api-seller.shipyaari.com",
              "api-admin.shipyaari.com",
            ],
                  networkRequestHeaders: ["Cache-Control"],
                 networkResponseHeaders: ["Referrer-Policy"],
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

  let syncTime: any = localStorage.getItem("syncTime");

  let isSyncCompleted: any = localStorage.getItem("isSyncCompleted");

  let syncTimerObject: any = useSelector(
    (state: any) => state?.channel?.timerObject
  );

  useEffect(() => {
    if (
      syncTimerObject?.startTimer ||
      (isSyncCompleted && isSyncCompleted === "false")
    ) {
      let time =
        parseInt(syncTime) && parseInt(syncTime) > 0 ? parseInt(syncTime) : 180;
      // setLocalStorage("syncBoolean", false);
      if (time > 0) {
        let timerEvent = setInterval(() => {
          --time;
          setLocalStorage("syncTime", time);
          // dispatch(timerObject({ time: 240, startTimer: true }));
          dispatch(timer({ time }));
          if (time <= 0) {
            setLocalStorage("isSyncCompleted", true);
            clearInterval(timerEvent);
          }
        }, 1000);
      }
    }
  }, [syncTime, syncTimerObject]);

  useEffect(() => {
    const receiveMessage = (event: any) => {
      // console.log("🚀 ~ receiveMessage ~ ADMIN_URL:", ADMIN_URL);
      const expectedOrigin = ADMIN_URL;
      if (event.origin.includes(expectedOrigin)) {
        const sellerData = event.data.sellerData;
        // console.log("🚀 ~ receiveMessage ~ sellerData:", sellerData);
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
    localStorage.setItem("setKycValue", sellerData?.nextStep?.kyc);

    let signInUserReducerDetails = {
      email: sellerData.email,
      name: sellerData.name,
    };

    dispatch(signInUser(signInUserReducerDetails));

    localStorage.setItem("sellerId", sellerData.sellerId);
    localStorage.setItem("userName", sellerData.name);
    localStorage.setItem("userInfo", JSON.stringify(sellerData));
    setLocalStorage(`${sellerData.sellerId}_${tokenKey}`, sellerData.token);

    window?.dataLayer?.push({
      event: "Login",
      seller_email: sellerData?.email,
      sellerId: sellerData?.sellerId,
      seller_name: sellerData?.name,
      seller_mobileNumber: sellerData?.nextStep?.contactNumber,
      seller_kyc: sellerData?.nextStep?.kyc,
      seller_bank_verification_done: sellerData?.nextStep?.bank,
      isReturningUser: sellerData?.isReturningUser,
    });

    const token = localStorage.getItem("sellerId")
      ? `${localStorage.getItem(
          "sellerId"
        )}_891f5e6d-b3b3-4c16-929d-b06c3895e38d`
      : "";

    if (token !== "") {
      // console.log("socketConnectedAfterlogin");
      socketCallbacks.connectSocket(dispatch);
    }

    navigate(0);
  };
  function FallbackComponent() {
    return <div>An error has occured</div>;
  }

  return (
    <>
      <div className="relative  min-h-screen">
        <Sentry.ErrorBoundary fallback={FallbackComponent} showDialog>
          <MyRoutes />

          <CheckIsOnline />
          {/* <div className="absolute bottom-6 right-6">
            <MyWidget title="Help" content="" bgColor="bg-white" />
          </div> */}

          <Toaster
            position="top-center"
            reverseOrder={true}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
          />
        </Sentry.ErrorBoundary>
      </div>
    </>
  );
};
export default Sentry.withProfiler(App);
//export default App;
