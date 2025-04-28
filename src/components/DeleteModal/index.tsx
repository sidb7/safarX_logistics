// import axios from "axios";
// import CustomBottomModal from "../../components/CustomModal/customBottomModal";
// import CustomButton from "../Button";
// import DeleteGif from "../../assets/common/DeleteGif.gif";
// import { useState } from "react";
// import { POST } from "../../utils/webService";
// import { toast } from "react-hot-toast";
// import { Spinner } from "../Spinner";
// interface IDeleteModal {
//   url: string;
//   postData: any;
//   isOpen: boolean;
//   closeModal: any;
//   title: any;
//   reloadData?: any;
// }

// export const DeleteModal: React.FunctionComponent<IDeleteModal> = ({
//   url,
//   postData,
//   isOpen,
//   closeModal,
//   title,
//   reloadData,
// }) => {
//   const [loading, setLoading] = useState(false);
//   const [syncOrdersAgain, setSyncOrdersAgain] = useState(true);
  
//   const deleteApi = async () => {
//     setLoading(true);
//     try {
//       // Add cancelOrderOnChannel to the payload (false if checkbox is checked, true if unchecked)
//       const updatedPostData = {
//         ...postData,
//         cancelOrderOnChannel: !syncOrdersAgain
//       };
      
//       const { data: deleteData } = await POST(url, updatedPostData);
//       if (deleteData?.success) {
//         toast.success(deleteData?.message);
//         window.location.reload();
//         reloadData(0);
//       } else {
//         toast.error(deleteData?.message);
//       }
//     } catch (error) {}
//     setLoading(false);
//     closeModal();
//   };

//   return (
//     <div>
//       <CustomBottomModal
//         overlayClassName="flex p-5 items-center outline-none z-[99]"
//         className="!w-[600px] !px-4 !py-6"
//         isOpen={isOpen}
//         onRequestClose={closeModal}
//         children={
//           <div className="flex flex-col space-y-4">
//             <div className="flex justify-center">
//               <img src={DeleteGif} alt="DeleteGif" className="w-[124px]" />
//             </div>
//             <div className="flex justify-center text-center">{title}</div>
            
//             {/* New checkbox for syncing orders again */}
//             <div className="flex items-center justify-center mt-4 mb-4 py-3">
//               <input
//                 type="checkbox"
//                 id="syncOrdersAgain"
//                 checked={syncOrdersAgain}
//                 onChange={() => setSyncOrdersAgain(!syncOrdersAgain)}
//                 className="w-4 h-4 mr-3 cursor-pointer"
//               />
//               <span className="text-[#1C1C1C] font-medium text-base">
//                 Sync order again in future
//               </span>
//             </div>
            
//             <div className="flex justify-center space-x-6">
//               <CustomButton
//                 className="bg-white px-2 !w-min !text-black !border-[1px] !border-[#A4A4A4]"
//                 text="Cancel"
//                 onClick={() => closeModal()}
//               />
//               {loading ? (
//                 <div className=" px-4 !w-min !border-[1px] !border-[#A4A4A4] rounded shadow-md hover:shadow-lg">
//                   <Spinner />
//                 </div>
//               ) : (
//                 <CustomButton
//                   className="bg-[#000000] px-4 !w-min !text-[#FFFFFF] !border-[1px] !border-[#A4A4A4]"
//                   text="Yes"
//                   onClick={() => deleteApi()}
//                   loading={loading}
//                 />
//               )}
//             </div>
//           </div>
//         }
//       />
//     </div>
//   );
// };


import axios from "axios";
import CustomBottomModal from "../../components/CustomModal/customBottomModal";
import CustomButton from "../Button";
import DeleteGif from "../../assets/common/DeleteGif.gif";
import { useState, useEffect } from "react";
import { POST } from "../../utils/webService";
import { toast } from "react-hot-toast";
import { Spinner } from "../Spinner";
import sessionManager from "../../utils/sessionManager";

interface IDeleteModal {
  url: string;
  postData: any;
  isOpen: boolean;
  closeModal: any;
  title: any;
  reloadData?: any;
  orderSources?: string[]; // New prop for order sources
}

export const DeleteModal: React.FunctionComponent<IDeleteModal> = ({
  url,
  postData,
  isOpen,
  closeModal,
  title,
  reloadData,
  orderSources = [], // Default to empty array
}) => {
  const [loading, setLoading] = useState(false);
  const [syncOrdersAgain, setSyncOrdersAgain] = useState(true);
  const [showSyncOrdersOption, setShowSyncOrdersOption] = useState(false);
  
  useEffect(() => {
    // Get channel integration status from session
    const { sellerInfo } = sessionManager({});
    const isChannelIntegrated = sellerInfo?.nextStep?.isChannelIntegrated || false;
    
    // Check if any order is from an integrated channel
    const hasChannelSource = orderSources.some(source => 
      ["SHOPIFY", "WOOCOMMERCE", "ZOHO"].includes(source)
    );
    
    // Only show checkbox if both conditions are met
    setShowSyncOrdersOption(isChannelIntegrated && hasChannelSource);
  }, [orderSources]);
  
  const deleteApi = async () => {
    setLoading(true);
    try {
      // Only add cancelOrderOnChannel if we're showing the checkbox
      const updatedPostData = {
        ...postData,
        // Include the flag only if the option is being shown
        ...(showSyncOrdersOption && { cancelOrderOnChannel: !syncOrdersAgain })
      };
      
      const { data: deleteData } = await POST(url, updatedPostData);
      if (deleteData?.success) {
        toast.success(deleteData?.message);
        window.location.reload();
        reloadData && reloadData(0);
      } else {
        toast.error(deleteData?.message);
      }
    } catch (error) {
      toast.error("An error occurred");
    }
    setLoading(false);
    closeModal();
  };

  return (
    <div>
      <CustomBottomModal
        overlayClassName="flex p-5 items-center outline-none z-[99]"
        className="!w-[600px] !px-4 !py-6"
        isOpen={isOpen}
        onRequestClose={closeModal}
        children={
          <div className="flex flex-col space-y-4">
            <div className="flex justify-center">
              <img src={DeleteGif} alt="DeleteGif" className="w-[124px]" />
            </div>
            <div className="flex justify-center text-center">{title}</div>
            
            {/* Only show checkbox when appropriate */}
            {showSyncOrdersOption && (
              <div className="flex items-center justify-center mt-4 mb-4 py-3">
                <input
                  type="checkbox"
                  id="syncOrdersAgain"
                  checked={syncOrdersAgain}
                  onChange={() => setSyncOrdersAgain(!syncOrdersAgain)}
                  className="w-4 h-4 mr-3 cursor-pointer"
                />
                <span className="text-[#1C1C1C] font-medium text-base">
                  Sync order again in future
                </span>
              </div>
            )}
            
            <div className="flex justify-center space-x-6">
              <CustomButton
                className="bg-white px-2 !w-min !text-black !border-[1px] !border-[#A4A4A4]"
                text="Cancel"
                onClick={() => closeModal()}
              />
              {loading ? (
                <div className=" px-4 !w-min !border-[1px] !border-[#A4A4A4] rounded shadow-md hover:shadow-lg">
                  <Spinner />
                </div>
              ) : (
                <CustomButton
                  className="bg-[#000000] px-4 !w-min !text-[#FFFFFF] !border-[1px] !border-[#A4A4A4]"
                  text="Yes"
                  onClick={() => deleteApi()}
                  loading={loading}
                />
              )}
            </div>
          </div>
        }
      />
    </div>
  );
};