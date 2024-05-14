import React from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ToastCustom(props: any) {
  return (
    <div>
      {toast(`🦄 ${props?.message}`)}
      <ToastContainer
        stacked
        autoClose={5000}
        position="bottom-right"
        draggableDirection="x"
        theme="colored"
        transition={Bounce}
      />
    </div>
  );
}

export default ToastCustom;
