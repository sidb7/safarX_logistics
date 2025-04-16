import DeleteGif from "../../assets/common/DeleteGif.gif";
import CloseIcon from "../../assets/CloseIcon.svg";
import CustomeBottomModal from "./customBottomModal";
import { POST } from "../../utils/webService";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Spinner } from "../Spinner";
import sessionManager from "../../utils/sessionManager";

interface IDeleteProps {
  isOpen: boolean;
  setModalClose: any;
  deleteTextMessage?: any;
  deleteURL?: any;
  payloadBody?: any;
  DeletepincodeHandler?: any;
  setIsDeleted?: any;
  reloadData?: any;
  orderSources?: string[]; // New prop for order sources
}

const DeleteModal = (props: IDeleteProps) => {
  const {
    isOpen,
    setModalClose,
    deleteTextMessage,
    deleteURL,
    payloadBody,
    setIsDeleted,
    reloadData,
    orderSources = [], // Default to empty array
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [cancelOnChannel, setCancelOnChannel] = useState(true);
  const [showCancelOnChannel, setShowCancelOnChannel] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Get channel integration status from session
    const { sellerInfo } = sessionManager({});
    const isChannelIntegrated = sellerInfo?.nextStep?.isChannelIntegrated || false;
    
    // Check if any order is from an integrated channel
    const hasChannelSource = orderSources.some(source => 
      ["SHOPIFY", "WOOCOMMERCE", "ZOHO"].includes(source)
    );
    
    // Only show checkbox if both conditions are met
    setShowCancelOnChannel(isChannelIntegrated && hasChannelSource);
  }, [orderSources]);

  const deleteApi = async () => {
    setIsLoading(true);
    const { data } = await POST(deleteURL, { 
      awbs: payloadBody,
      cancelOrderOnChannel: showCancelOnChannel ? cancelOnChannel : false
    });
    if (data?.success) {
      setIsDeleted(true);
      toast.success(data?.message);
      reloadData(8);
      setIsLoading(false);
      navigate(`/orders/view-orders?activeTab=cancelled`);
    } else {
      setIsLoading(false);
      toast.error(data?.message);
    }
    setModalClose();
  };

  return (
    <div>
      <CustomeBottomModal
        isOpen={isOpen}
        onRequestClose={() => setModalClose()}
        overlayClassName="flex p-5 items-center outline-none z-[99]"
        className="!w-[600px] !px-4 !py-6"
      >
        <div className="flex justify-end cursor-pointer">
          <img src={CloseIcon} alt="" onClick={() => setModalClose()} />
        </div>
        <div className="flex justify-center">
          <img src={DeleteGif} alt="" />
        </div>
        <div className="px-16">
          <p className="text-base lg:text-lg font-semibold text-center mb-4">
            {deleteTextMessage}
          </p>
          
          {showCancelOnChannel && (
            <div className="flex items-center justify-center mt-4 mb-4 py-3">
              <input
                type="checkbox"
                id="cancelOnChannel"
                checked={cancelOnChannel}
                onChange={() => setCancelOnChannel(!cancelOnChannel)}
                className="w-4 h-4 mr-3 cursor-pointer"
              />
              <span className="text-[#1C1C1C] font-medium text-base">
                Cancel order on channel
              </span>
            </div>
          )}
          
          <div className="flex justify-center gap-x-6 my-6">
            <button
              onClick={() => setModalClose()}
              type="submit"
              className="bg-white border-2 border-[#A4A4A4] text-[#1C1C1C] px-4 py-2 text-sm font-semibold rounded shadow-md"
            >
              No
            </button>
            {isLoading ? (
              <div className="flex justify-center items-center border px-5 py-[10px] text-sm font-semibold rounded shadow-md hover:shadow-lg">
                <Spinner />
              </div>
            ) : (
              <button
                type="submit"
                className="bg-[#1C1C1C] text-white px-5 py-[10px] text-sm font-semibold rounded shadow-md hover:shadow-lg"
                onClick={() => deleteApi()}
              >
                Yes
              </button>
            )}
          </div>
        </div>
      </CustomeBottomModal>
    </div>
  );
};

export default DeleteModal;

































// import DeleteGif from "../../assets/common/DeleteGif.gif";
// import CloseIcon from "../../assets/CloseIcon.svg";
// import CustomeBottomModal from "./customBottomModal";
// import { POST } from "../../utils/webService";
// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { Spinner } from "../Spinner";

// interface IDeleteProps {
//   isOpen: boolean;
//   setModalClose: any;
//   deleteTextMessage?: any;
//   deleteURL?: any;
//   payloadBody?: any;
//   DeletepincodeHandler?: any;
//   setIsDeleted?: any;
//   reloadData?: any;
// }

// const DeleteModal = (props: IDeleteProps) => {
//   const {
//     isOpen,
//     setModalClose,
//     deleteTextMessage,
//     deleteURL,
//     payloadBody,
//     setIsDeleted,
//     reloadData,
//   } = props;

//   const [isLoading, setIsLoading] = useState(false);
//   const [cancelOnChannel, setCancelOnChannel] = useState(true);

//   const navigate = useNavigate();

//   const deleteApi = async () => {
//     setIsLoading(true);
//     const { data } = await POST(deleteURL, { 
//       awbs: payloadBody,
//       cancelOrderOnChannel: cancelOnChannel
//     });
//     if (data?.success) {
//       setIsDeleted(true);
//       toast.success(data?.message);
//       reloadData(8);
//       setIsLoading(false);
//       navigate(`/orders/view-orders?activeTab=cancelled`);
//     } else {
//       setIsLoading(false);
//       toast.error(data?.message);
//     }
//     setModalClose();
//   };

//   return (
//     <div>
//       <CustomeBottomModal
//         isOpen={isOpen}
//         onRequestClose={() => setModalClose()}
//         overlayClassName="flex p-5 items-center outline-none z-[99]"
//         className="!w-[600px] !px-4 !py-6"
//       >
//         <div className="flex justify-end cursor-pointer">
//           <img src={CloseIcon} alt="" onClick={() => setModalClose()} />
//         </div>
//         <div className="flex justify-center">
//           <img src={DeleteGif} alt="" />
//         </div>
//         <div className="px-16">
//           <p className="text-base lg:text-lg font-semibold text-center mb-4">
//             {deleteTextMessage}
//           </p>
          
//           <div className="flex items-center justify-center mt-4 mb-4 py-3">
//             <input
//               type="checkbox"
//               id="cancelOnChannel"
//               checked={cancelOnChannel}
//               onChange={() => setCancelOnChannel(!cancelOnChannel)}
//               className="w-4 h-4 mr-3 cursor-pointer"
//             />
//             <span className="text-[#1C1C1C] font-medium text-base">
//               Cancel order on channel
//             </span>
//           </div>
          
//           <div className="flex justify-center gap-x-6 my-6">
//             <button
//               onClick={() => setModalClose()}
//               type="submit"
//               className="bg-white border-2 border-[#A4A4A4] text-[#1C1C1C] px-4 py-2 text-sm font-semibold rounded shadow-md"
//             >
//               No
//             </button>
//             {isLoading ? (
//               <div className="flex justify-center items-center border px-5 py-[10px] text-sm font-semibold rounded shadow-md hover:shadow-lg">
//                 <Spinner />
//               </div>
//             ) : (
//               <button
//                 type="submit"
//                 className="bg-[#1C1C1C] text-white px-5 py-[10px] text-sm font-semibold rounded shadow-md hover:shadow-lg"
//                 onClick={() => deleteApi()}
//               >
//                 Yes
//               </button>
//             )}
//           </div>
//         </div>
//       </CustomeBottomModal>
//     </div>
//   );
// };
// export default DeleteModal;
