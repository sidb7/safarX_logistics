// import React, { useState } from "react";

// interface IScrollNavProps {
//   arrayData: { label: string; number?: string }[];
//   showNumber: boolean;
//   setScrollIndex?: any;
//   defaultIndexValue?: any;
// }
// export const ScrollNav: React.FunctionComponent<IScrollNavProps> = ({
//   arrayData,
//   showNumber = true,
//   setScrollIndex,
//   defaultIndexValue,
// }) => {
//   const [selectedId, setSelectedId] = useState(+defaultIndexValue || 0);
//   const setValue = (id: number) => {
//     setSelectedId(id);
//     setScrollIndex(id);
//   };
//   return (
//     <div>
//       <div
//         className={`flex  customScroll whitespace-nowrap mt-2 h-[34px] cursor-pointer`}
//       >
//         {arrayData?.map((singleData, index) => (
//           <div
//             key={index}
//             className={`flex justify-center items-center  border-[#777777] px-6 ${
//               selectedId === index ? "!border-[#004EFF]" : ""
//             }`}
//             style={{ borderBottom: "3px solid #777777" }}
//             onClick={() => setValue(index)}
//           >
//             <span
//               className={`text-[#777777] font-Open text-sm leading-[18px] font-semibold lg:text-[18px] lg:font-Lato lg:leading-6 ${
//                 selectedId === index ? "!text-[#004EFF] " : ""
//               }`}
//             >
//               {singleData.label}
//             </span>
//             {showNumber && (
//               <span
//                 className={`flex justify-center items-center rounded-full ml-2 text-[8px] text-white bg-[#777777] h-[16px] w-[16px] ${
//                   selectedId === index ? "!bg-[#004EFF]" : ""
//                 }`}
//               >
//                 {singleData.number}
//               </span>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

import React, { useState } from "react";

interface IScrollNavProps {
  arrayData: { label: string; number?: string }[];
  showNumber: boolean;
  setScrollIndex?: any;
  defaultIndexValue?: any;
}

export const ScrollNav: React.FunctionComponent<IScrollNavProps> = ({
  arrayData,
  showNumber = true,
  setScrollIndex,
  defaultIndexValue,
}) => {
  const [selectedId, setSelectedId] = useState(+defaultIndexValue || 0);
  const setValue = (id: number) => {
    setSelectedId(id);
    setScrollIndex(id);
  };
  return (
    <div>
      <div className="flex customScroll whitespace-nowrap mt-2 h-[34px] cursor-pointer">
        {arrayData?.map((singleData, index) => (
          <div
            key={index}
            className={`flex justify-center items-center border-[#777777] px-6 ${
              selectedId === index ? "!border-[#004EFF]" : ""
            }`}
            style={{ borderBottom: "3px solid #777777" }}
            onClick={() => setValue(index)}
          >
            <span
              className={`text-[#777777] font-Open text-sm leading-[18px] font-semibold lg:text-[18px] lg:font-Lato lg:leading-6 ${
                selectedId === index ? "!text-[#004EFF] " : ""
              }`}
            >
              {singleData.label}
            </span>
            {showNumber && (
              <span
                className={`flex justify-center items-center ml-2 text-[12px] text-white bg-[#777777] h-[20px] w-[20px] ${
                  selectedId === index ? "!bg-[#004EFF]" : ""
                }`}
              >
                {singleData?.number !== undefined  ? singleData.number : "0"}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
