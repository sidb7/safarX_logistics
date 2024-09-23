

// import React from "react";
// import crossIcon from "../../../assets/cross.svg";

// interface FollowUpData {
//   currentStatus: string | null;
//   description: string;
//   location: string;
//   message: string;
//   notes: string;
//   partnerStatus: {
//     Scan: string;
//     ScanCode: number;
//     ScanType: string;
//     ScanGroupType: string;
//     ScanDate: string;
//   };
//   requestType: string;
//   sellerComments: string;
//   sellerRemartDate: number;
//   status: string;
//   time: number;
// }

// interface SelleractionModalProps {
//   followUpData: FollowUpData[];
//   onClose: () => void;
// }

// const SelleractionModal: React.FC<SelleractionModalProps> = ({ followUpData, onClose }) => {
//   const formatDate = (timestamp: number) => {
//     const date = new Date(timestamp);
//     const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//     return `${months[date.getMonth()]} ${date.getDate().toString().padStart(2, '0')}, ${date.getFullYear()}`;
//   };

//   const getLatestShipyaariAction = () => {
//     const latestAction = followUpData.reduce((latest, current) => 
//       current.time > (latest?.time || 0) ? current : latest
//     , null as FollowUpData | null);

//     return {
//       date: latestAction ? formatDate(latestAction.time) : 'N/A',
//       remarks: latestAction ? latestAction.message : '-'
//     };
//   };

//   const getLatestSellerAction = () => {
//     const latestAction = followUpData.reduce((latest, current) => 
//       current.sellerRemartDate > (latest?.sellerRemartDate || 0) ? current : latest
//     , null as FollowUpData | null);

//     return {
//       date: latestAction ? formatDate(latestAction.sellerRemartDate) : 'N/A',
//       remarks: latestAction && latestAction.sellerComments ? latestAction.sellerComments : '-'
//     };
//   };

//   const latestShipyaari = getLatestShipyaariAction();
//   const latestSeller = getLatestSellerAction();

//   return (
//     <div className="w-full max-w-3xl mx-auto bg-white rounded-lg overflow-hidden">
//       <div className="flex justify-between items-center p-4 border-b">
//         <h2 className="font-sans text-xl sm:text-2xl leading-6 text-black font-semibold">Seller Action</h2>
//         <img
//           src={crossIcon}
//           alt="Close"
//           className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer"
//           onClick={onClose}
//         />
//       </div>
//       <div className="p-4">
//         <div className="border rounded-lg shadow p-4 space-y-4">
//           <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
//             <div className="font-semibold w-full sm:w-1/2">Latest Shipyaari Action Date</div>
//             <div className="w-full sm:w-1/2">N/A</div>
//           </div>
//           <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
//             <div className="font-semibold w-full sm:w-1/2">Latest Shipyaari Remarks</div>
//             <div className="w-full sm:w-1/2">N/A</div>
//           </div>
//           <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
//             <div className="font-semibold w-full sm:w-1/2">Seller Action Date</div>
//             <div className="w-full sm:w-1/2">{latestSeller.date}</div>
//           </div>
//           <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
//             <div className="font-semibold w-full sm:w-1/2">Seller Action Remark</div>
//             <div className="w-full sm:w-1/2">{latestSeller.remarks}</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SelleractionModal;

import React from "react";
import crossIcon from "../../../assets/cross.svg";
import { formatDate } from "../../../utils/dateUtils";

interface FollowUpData {
  currentStatus: string | null;
  description: string;
  location: string;
  message: string;
  notes: string;
  partnerStatus: {
    Scan: string;
    ScanCode: number;
    ScanType: string;
    ScanGroupType: string;
    ScanDate: string;
  };
  requestType: string;
  sellerComments: string;
  sellerRemartDate: number;
  status: string;
  time: number;
}

interface SelleractionModalProps {
  followUpData: FollowUpData[];
  onClose: () => void;
}

const SelleractionModal: React.FC<SelleractionModalProps> = ({ followUpData, onClose }) => {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="font-sans text-xl sm:text-2xl leading-6 text-black font-semibold">Seller Action</h2>
        <img
          src={crossIcon}
          alt="Close"
          className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer"
          onClick={onClose}
        />
      </div>
      <div className="p-4 max-h-[90vh] overflow-y-auto">
        {followUpData.length > 0 ? (
          followUpData.map((data, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4 mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="font-semibold w-full sm:w-1/2">Seller Action Date</div>
                <div className="w-full sm:w-1/2">{formatDate(data.sellerRemartDate)}</div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="font-semibold w-full sm:w-1/2">Seller Action Remark</div>
                <div className="w-full sm:w-1/2">{data.sellerComments || '-'}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No seller actions found.
          </div>
        )}
      </div>
    </div>
  );
};

export default SelleractionModal;