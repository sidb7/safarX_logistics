// import React from "react";
// import { useEffect, useState } from "react";

// interface IWidgetProps {
//   title?: any;
//   content?: any;
//   bgColor?: any;
//   onClick?: any;
// }

// const MyWidget = ({ title, content, bgColor, onChange }: any) => {
//   const [openModal, setOpenModal] = useState<any>(false);

//   console.log("openModal", openModal);

//   return (
//     <div
//       onClick={() => setOpenModal(!openModal)}
//       className={`cursor-pointer flex justify-center items-center p-4 rounded-lg shadow-lg w-[100px] ${bgColor}`}
//     >
//       <h2 className="text-lg font-bold text-gray-800">{title}</h2>
//       {openModal && <>hello</>}
//     </div>
//   );
// };

// export default MyWidget;

import React, { useState } from "react";

interface IWidgetProps {
  title?: string;
  content?: string;
  bgColor?: string;
  onClick?: () => void;
}

const MyWidget: React.FC<IWidgetProps> = ({ title, content, bgColor }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <div
        onClick={() => setOpenModal(!openModal)}
        className={`cursor-pointer flex justify-center items-center p-4 rounded-lg shadow-lg w-[100px] ${bgColor}`}
      >
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
      </div>

      {openModal && (
        <div className="fixed inset-0 flex items-end justify-end z-50">
          {/* Modal Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setOpenModal(false)}
          ></div>

          {/* Modal Content (Bottom-Right) */}
          <div className="bg-white rounded-lg shadow-lg p-6 z-10 m-4">
            <h2 className="text-xl font-bold mb-4">Modal Title</h2>
            <p className="text-gray-700">
              This is the content inside the modal.
            </p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setOpenModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MyWidget;
