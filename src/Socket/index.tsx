// socket.ts
import { io, Socket } from "socket.io-client";
import { SELLER_URL } from "../utils/ApiUrls";
import { GlobalToast } from "../components/GlobalToast/GlobalToast";
import { setWalletBalance } from "../redux/reducers/userReducer";
import { useEffect } from "react";
import { channelState } from "../redux/reducers/syncChannel";

let socket: Socket | null = null;

export const initSocket = (): Socket => {
  const sellerId = sessionStorage.getItem("sellerId");
  const token = sellerId
    ? `${sellerId}_891f5e6d-b3b3-4c16-929d-b06c3895e38d`
    : "";

  const sessionID = localStorage.getItem("sessionID");
  // if (sessionID && token && sellerId) {
  return io(`${SELLER_URL}`, {
    secure: true,
    transports: ["websocket"],
    withCredentials: true,
    path: "/socket.io",
    reconnectionDelayMax: 1000,
    auth: {
      token: localStorage.getItem(token),
      sessionID: sessionID,
    },
    autoConnect: true,
    query: {
      "my-key": "my-value",
    },
    // autoUnref: true,
    // addTrailingSlash: false,
  });
  // } else {
  //   return io();
  // }
};

const connectSocket = (dispatch?: any) => {
  const sellerId = sessionStorage.getItem("sellerId");
  const token = sellerId
    ? `${sellerId}_891f5e6d-b3b3-4c16-929d-b06c3895e38d`
    : "";

  if (token !== "") {
    socket = initSocket();

    socket.emit("joinRoom", `${sellerId}`);

    socket.on("wallet_balance_update", (newBalance: string) => {
      console.log("newWalletBalance", newBalance);
      dispatch(setWalletBalance({ amt: Number(newBalance) }));
    });

    socket.on("bulkOrderFailed", (data: any) => {
      console.log(`Received bulk order failed event: ${JSON.stringify(data)}`);
      GlobalToast(data);
    });

    socket.on("order_error", (data: any) => {
      GlobalToast(data);
    });

    socket.on("trigger_refresh", (data: any) => {
      console.log("WEBSOCKET TRIGGER REFRESH!!!!!!!!---");
      setTimeout(() => {
        window.location.href = "/orders/view-orders?activeTab=draft";
        window.onload = () => {
          window.location.reload();
        };
      }, 3000);
    });

    socket.on("sync_orders", (data: any) => {
      const parsedData = JSON.parse(data);
      console.log("parsedData ------------------- : ", parsedData);
      dispatch(channelState(parsedData));
      // GlobalToast(data);
    });

    socket.on("switch_draft_page", (data: any) => {
      console.log("--------------SWITCHDRAFTPAGE-------------");
      console.log("parsedData ------------------- : ", data);
      setTimeout(() => {
        window.location.href = `/orders/view-orders?activeTab=${data}`;
        window.onload = () => {
          window.location.reload();
        };
      }, 3500);
    });
  }
};

const disconnectSocket = () => {
  if (socket) {
    console.log("Disconnecting socket...");
    socket.disconnect();
    socket = null;
  }
};

export const socketCallbacks = {
  connectSocket,
  disconnectSocket,
};
