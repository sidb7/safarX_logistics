import { io } from "socket.io-client";
import { SELLER_URL } from "../utils/ApiUrls";

const sellerId = sessionStorage.getItem("sellerId");
const token = sellerId
  ? `${sellerId}_891f5e6d-b3b3-4c16-929d-b06c3895e38d`
  : "";

const sessionID = localStorage.getItem("sessionID");
const socket = io(`${SELLER_URL}`, {
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

export default socket;
