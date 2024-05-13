// socket.ts
import { io, Socket } from "socket.io-client";
import { SELLER_URL } from "../utils/ApiUrls";
import {
  GlobalToast,
  GlobalToastSuccess,
} from "../components/GlobalToast/GlobalToast";
import { setWalletBalance } from "../redux/reducers/userReducer";
import { channelState } from "../redux/reducers/syncChannel";

let socket: Socket | null = null;

export const initSocket = (): Socket => {
  const sellerId = localStorage.getItem("sellerId");
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
  const sellerId = localStorage.getItem("sellerId");
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
      const url = window.location.href;
      const parsedUrl = new URL(url);
      const path = parsedUrl.pathname;
      if (path === "/orders/view-orders") {
        GlobalToast(data);
      }
    });

    socket.on("webhook_order", (data: any) => {
      const url = window.location.href;
      const parsedUrl = new URL(url);
      const path = parsedUrl.pathname;
      let message = data || "New Orders Placed";

      if (path === "/orders/view-orders") {
        GlobalToastSuccess(`${message}, Please refresh the page`);
      } else {
        const modalContent: any = document.createElement("div");
        modalContent.className =
          "inset-0 flex items-center justify-center z-50";
        modalContent.innerHTML = `
    <div class="bg-white p-4 max-w-sm w-full gap-4 mx-auto absolute top-[10px] rounded-md shadow-lg">
      <div class="float-right cursor-pointer">
        <a
          class="hover:underline hover:cursor-pointer text-sm mr-3 text-blue-400"
          href="/orders/view-orders?activeTab=draft"
        >
          View Orders
        </a>
        <span class="close-button">X</span>
      </div>
      <div>
        <span>${message}</span>     
      </div>
    </div>
  `;

        const closeButton = modalContent.querySelector(".close-button");
        if (closeButton) {
          closeButton.addEventListener("click", () => {
            if (document.body.contains(modalContent)) {
              document.body.removeChild(modalContent);
            }
          });
        }

        document.body.appendChild(modalContent);

        // Automatically close modal after 5 seconds
        setTimeout(() => {
          if (document.body.contains(modalContent)) {
            document.body.removeChild(modalContent);
          }
        }, 5000);
      }
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
