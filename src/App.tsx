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
import { REACT_APP_GA4_ID, REACT_APP_GTM_ID } from "./utils/ApiUrls";
import { BrowserRouter, useLocation } from "react-router-dom";

declare global {
  interface Window {
    dataLayer?: any;
  }
}

const App = () => {
  const tagManagerArgs: any = {
    gtmId: REACT_APP_GTM_ID,
  };

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
