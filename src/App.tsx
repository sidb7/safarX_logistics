import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import { ADMIN_URL, REACT_APP_GA4_ID, REACT_APP_GTM_ID } from "./utils/ApiUrls";
import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
import { signInUser } from "./redux/reducers/signInReducer";
import {
  constructNavigationObject,
  decrypt,
  setLocalStorage,
  tokenKey,
} from "./utils/utility";

declare global {
  interface Window {
    dataLayer?: any;
  }
}

const App = () => {
  const tagManagerArgs: any = {
    gtmId: REACT_APP_GTM_ID,
  };

  const navigate = useNavigate();
  const location: any = useLocation();

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

  useEffect(() => {
    const receiveMessage = (event: any) => {
      const currentOrigin = window.location.origin;

      const expectedOrigin = ADMIN_URL;
      if (event.origin.includes(expectedOrigin)) {
        const sellerData = event.data.sellerData;
        console.log("🚀 ~ receiveMessage ~ sellerData:", sellerData);
        if (sellerData) {
          loginFromSeller(JSON.parse(decrypt("#*%ll12", sellerData)));
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
      seller_email: sellerData.email,
      sellerId: sellerData.sellerId,
      seller_name: sellerData.name,
      seller_kyc: sellerData.nextStep.kyc,
      seller_bank_verification_done: sellerData.nextStep.bank,
      isReturningUser: sellerData.isReturningUser,
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
};

export default App;
