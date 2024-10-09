// import React from "react";
// import crossIcon from "../../../assets/cross.svg";
// import { formatDate } from "../../../utils/dateUtils";


// interface FollowUpData {
//   message: string;
//   time: number;
// }

// interface NdrFollowUpProps {
//   followUpData: FollowUpData[];
//   onClose: () => void;
// }

// const NdrFollowUp: React.FC<NdrFollowUpProps> = ({ followUpData, onClose }) => {
//   // const formatDate = (timestamp: number) => {
//   //   const date = new Date(timestamp);
//   //   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//   //   return `${months[date.getMonth()]} ${date.getDate().toString().padStart(2, '0')}, ${date.getFullYear()}`;
//   // };

//   return (
//     <div className="w-full max-w-3xl mx-auto bg-white  rounded-lg overflow-hidden">
//       <div className="flex justify-between items-center p-4 border-b">
//         <h2 className="font-sans text-2xl leading-6 text-black font-semibold">NDR Follow-up</h2>
//         <img
//           src={crossIcon}
//           alt="Close"
//           className="w-6 h-6 cursor-pointer"
//           onClick={onClose}
//         />
//       </div>
//       <div className="p-4">
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-semibold mb-4 bg-gray-100 p-3 rounded">
//           <div className="text-center sm:text-left">Remark</div>
//           <div className="text-center sm:text-right">Remark Date</div>
//         </div>
//         <div className="space-y-4 max-h-full overflow-y-auto">
//           {followUpData.map((item, index) => (
//             <div key={index} className="border rounded-lg shadow p-4">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="text-center sm:text-left break-words">{item.message}</div>
//                 <div className="text-center sm:text-right">{formatDate(item.time)}</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NdrFollowUp;

import React from "react";
import { formatDate } from "../../../utils/dateUtils";

interface FollowUpData {
  message: string;
  time: number;
}

interface NdrFollowUpProps {
  followUpData: FollowUpData[];
  onClose: () => void;
}

const NdrFollowUp: React.FC<NdrFollowUpProps> = ({ followUpData, onClose }) => {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg overflow-hidden flex flex-col h-screen">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="font-sans text-2xl leading-6 text-black font-semibold">NDR Follow-up</h2>
        <button
          className="w-6 h-6 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
      <div className="flex-grow overflow-hidden">
        <div className="p-4 h-full flex flex-col">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-semibold mb-4 bg-gray-100 p-3 rounded">
            <div className="text-center sm:text-left">Remark</div>
            <div className="text-center sm:text-right">Remark Date</div>
          </div>
          <div className="space-y-4 overflow-y-auto flex-grow">
            {followUpData.map((item, index) => (
              <div key={index} className="border rounded-lg shadow p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="text-center sm:text-left break-words">{item.message}</div>
                  <div className="text-center sm:text-right">{formatDate(item.time)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NdrFollowUp;