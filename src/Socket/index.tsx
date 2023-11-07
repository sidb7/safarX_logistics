// socket.ts
import { io, Socket } from "socket.io-client";
import { SELLER_URL } from "../utils/ApiUrls";
import { GlobalToast } from "../components/GlobalToast/GlobalToast";
import { setWalletBalance } from "../redux/reducers/userReducer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

let socket: Socket | null = null;

export const initSocket = (): Socket => {
  const sellerId = sessionStorage.getItem("sellerId");
  const token = sellerId
    ? `${sellerId}_891f5e6d-b3b3-4c16-929d-b06c3895e38d`
    : "";

  const sessionID = localStorage.getItem("sessionID");

  return io(`${SELLER_URL}`, {
    secure: true,
    transports: ["websocket"],
    path: "/socket.io",
    reconnectionDelayMax: 10000,
    auth: {
      token: localStorage.getItem(token),
      sessionID: sessionID,
    },
    query: {
      "my-key": "my-value",
    },
  });
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
