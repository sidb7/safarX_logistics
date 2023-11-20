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
const App = () => {
  // const [roomName, setRoomName] = useState<any>(
  //   `${sessionStorage.getItem("sellerId")}`
  // );
  // const dispatch = useDispatch();
  // const [isSocketInitialized, setIsSocketInitialized] = useState(false);
  // console.log("isSocketconnectedApp.tsx", isSocketInitialized);
  // useEffect(() => {
  //   const connectSocket = async () => {
  //     if (roomName) {
  //       await socketCallbacks.connectSocket(dispatch);
  //       setIsSocketInitialized(true);
  //     }
  //   };

  //   connectSocket();

  //   return () => {
  //     socketCallbacks.disconnectSocket();
  //   };
  // }, [dispatch]);

  return (
    <div>
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
    </div>
  );
};

export default App;
