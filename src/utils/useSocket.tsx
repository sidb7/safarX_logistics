// useSocket.tsx
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { GlobalToast } from "../components/GlobalToast/GlobalToast";
import { SELLER_URL } from "./ApiUrls";

export const useSocket = (roomName: any) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const sellerId = localStorage.getItem("sellerId");
  const token = sellerId
    ? `${sellerId}_891f5e6d-b3b3-4c16-929d-b06c3895e38d`
    : "";

  const sessionID = localStorage.getItem("sessionID");
  useEffect(() => {
    const newSocket = io(`${SELLER_URL}`, {
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

    setSocket(newSocket);

    newSocket.emit("joinRoom", roomName);

    newSocket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    newSocket.on("authenticated", ({ sessionID }) => {
      localStorage.setItem("sessionID", sessionID);
      console.log("Authenticated with session ID:", sessionID);
    });

    newSocket.on("welcomeMessage", (message) => {
      console.log(`Received welcome message: ${message}`);
    });

    newSocket.on("bulkOrderFailed", (data) => {
      console.log(`Received bulk order failed event: ${JSON.stringify(data)}`);
      GlobalToast(data.message);
    });

    newSocket.on("roomWelcomeMessage", (message) => {
      console.log(`Received room welcome message: ${message}`);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomName]);

  return socket;
};
