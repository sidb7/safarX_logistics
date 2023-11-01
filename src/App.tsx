import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyRoutes from "./routes/MyRoutes";
import { socketCallbacks } from "./Socket";
import { useSelector } from "react-redux";
import CheckIsOnline from "./components/CheckIsOnline";
import { GlobalToast } from "./components/GlobalToast/GlobalToast";

const App = () => {
  /* Socket code */

  let roomName = sessionStorage.getItem("sellerId");
  //useSelector((state: any) => state?.roles?.roles[0]);

  useEffect(() => {
    roomName = `${sessionStorage.getItem("sellerId")}`;
    if (roomName) {
      console.log("userType", roomName);

      socketCallbacks.connectSocket(roomName);
    }

    return () => {
      socketCallbacks.disconnectSocket();
    };
  }, [roomName]);

  // useEffect(() => {
  //   GlobalToast("Welcome to the application!");
  // }, []);

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
