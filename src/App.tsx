import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyRoutes from "./routes/MyRoutes";
import { socketCallbacks } from "./Socket";
import { useSelector } from "react-redux";

const App = () => {
  const roomName = useSelector(
    (state: any) => state?.roles?.roles[0]?.roleName
  );
  console.log("userType", roomName);

  useEffect(() => {
    if (roomName) {
      socketCallbacks.connectSocket(roomName);
    }

    return () => {
      socketCallbacks.disconnectSocket();
    };
  }, [roomName]);

  return (
    <div>
      <MyRoutes />
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
