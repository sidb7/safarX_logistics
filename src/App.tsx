import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyRoutes from "./routes/MyRoutes";
import { useSelector } from "react-redux";
import CheckIsOnline from "./components/CheckIsOnline";
import { GlobalToast } from "./components/GlobalToast/GlobalToast";
import { useStore } from "react-redux";
import { useDispatch } from "react-redux";
import socket from "./Socket";
import { setWalletBalance } from "./redux/reducers/userReducer";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("socketconnected");

    socket.on("welcomeMessage", (message) => {
      console.log(`Received welcome message: ${message}`);
    });

    // socket.on("authenticated", ({ sessionID }) => {
    //   localStorage.setItem("sessionID", sessionID);
    //   console.log("Authenticated with session ID:", sessionID);
    // });

    socket.emit("joinRoom", `${sessionStorage.getItem("sellerId")}`);

    socket.on("wallet_balance_update", (newBalance: string) => {
      console.log("newWalletBalance", newBalance);
      dispatch(setWalletBalance({ amt: Number(newBalance) }));
    });

    socket.on("bulkOrderFailed", (data) => {
      console.log(`Received bulk order failed event: ${JSON.stringify(data)}`);
      GlobalToast(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
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
