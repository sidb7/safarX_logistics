import { io, Socket } from "socket.io-client";
import { tokenKey } from "../utils/utility";

let socket: Socket | null = null;

const connectSocket = (roomName: string) => {
  if (!socket) {
    socket = io("http://localhost:8010", {
      reconnectionDelayMax: 10000,
      auth: {
        token: localStorage.getItem(tokenKey),
      },
      query: {
        "my-key": "my-value",
      },
    });

    socket.on("welcomeMessage", (message) => {
      console.log(`Received welcome message: ${message}`);
    });

    socket.emit("joinRoom", roomName);

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
