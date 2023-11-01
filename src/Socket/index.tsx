import { io, Socket } from "socket.io-client";
import { tokenKey } from "../utils/utility";
import { SELLER_URL } from "../utils/ApiUrls";
import { GlobalToast } from "../components/GlobalToast/GlobalToast";
let socket: Socket | null = null;

const connectSocket = (roomName: string) => {
  const sellerId = sessionStorage.getItem("sellerId");
  const token = sellerId
    ? `${sellerId}_891f5e6d-b3b3-4c16-929d-b06c3895e38d`
    : "";

  const sessionID = localStorage.getItem("sessionID");
  // "http://localhost:8010";

  if (!socket) {
    console.log("url", SELLER_URL);
    socket = io(SELLER_URL, {
      reconnectionDelayMax: 10000,
      auth: {
        token: localStorage.getItem(token),
        sessionID: sessionID,
      },
      query: {
        "my-key": "my-value",
      },
    });
    socket.emit("joinRoom", roomName);

    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    console.log("socket", socket);

    console.log(`Connecting socket...`);

    socket.on("authenticated", ({ sessionID }) => {
      localStorage.setItem("sessionID", sessionID);
      console.log("Authenticated with session ID:", sessionID);
    });
    socket.emit("joinRoom", roomName);
    socket.on("welcomeMessage", (message) => {
      console.log(`Received welcome message: ${message}`);
    });
    socket.on("bulkOrderFailed", (data) => {
      console.log(`Received bulk order failed event: ${JSON.stringify(data)}`);
      //GlobalToast(data.message);
    });

    socket.on("bulkOrderFailed", (data) => {
      console.log(`Received bulk order failed event: ${JSON.stringify(data)}`);
      GlobalToast(data.message);
    });

    socket.on("roomWelcomeMessage", (message) => {
      console.log(`Received room welcome message: ${message}`);
    });
  }
};

const disconnectSocket = () => {
  if (socket) {
    console.log("Disconnecting socket...");
    socket.disconnect();
  }
};

export const initSocket = (): Socket => {
  return socket || io();
};

export const getSocket = (): Socket => {
  if (!socket) {
    throw new Error(
      "Socket has not been initialized. Call initSocket() first."
    );
  }
  return socket;
};

export const socketCallbacks = {
  connectSocket,
  disconnectSocket,
};
