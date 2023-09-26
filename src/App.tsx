import Routes from "./routes";
import { io } from "socket.io-client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyRoutes from "./routes/MyRoutes";
import CheckIsOnline from "./components/CheckIsOnline";

// const socket = io(
//   "http://localhost:8010"
//   // {
//   //   reconnectionDelayMax: 10000,
//   //   auth: {
//   //     token: "123",
//   //   },
//   //   query: {
//   //     "my-key": "my-value",
//   //   },
//   // }
// );
// socket.on("connect", () => {
//   socket.emit("getUser", "HELLO AKSHAY");
// });

const App = (props: any) => {
  return (
    <div>
      {/* <Routes /> */}
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
