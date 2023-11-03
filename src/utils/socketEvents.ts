import { Socket } from "socket.io-client";
import { GlobalToast } from "../components/GlobalToast/GlobalToast";

const handleSocketEvents = (socket: Socket | null) => {
  if (socket) {
    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    socket.on("authenticated", ({ sessionID }) => {
      localStorage.setItem("sessionID", sessionID);
      console.log("Authenticated with session ID:", sessionID);
    });

    socket.on("welcomeMessage", (message) => {
      console.log(`Received welcome message: ${message}`);
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

export { handleSocketEvents };
