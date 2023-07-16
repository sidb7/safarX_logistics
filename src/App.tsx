import Routes from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = (props: any) => {
  return (
    <div>
      <Routes />
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
