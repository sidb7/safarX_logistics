import React, { useState, useEffect, useRef } from "react";
import { Breadcrum } from "../../../components/Layout/breadcrum";
import toast from "react-hot-toast";
import OneButton from "../../../components/Button/OneButton";
import { GET, POST } from "../../../utils/webService";
import {
  GET_ALLPARTNER_OFSELLER,
  UPDATE_ALLPARTNER_OF_SELLER,
  GET_ALLPARTNERS_OF_RULEENGINE,
} from "../../../utils/ApiUrls";
import BottomLayout from "../../../components/Layout/bottomLayout";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface Partner {
  id: string;
  name: string;
}

const ItemType = "PARTNER";

const DraggablePartner: React.FC<{
  partner: Partner;
  index: number;
  movePartner: (dragIndex: number, hoverIndex: number) => void;
  handleRemovePartner: (index: number) => void;
}> = ({ partner, index, movePartner, handleRemovePartner }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: ItemType,
    hover(item: { index: number }, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      movePartner(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`flex justify-between items-center bg-[#FFFFFF] text-[#004EFF] border border-[#A4A4A4] text-[14px] font-Open font-semibold leading-5 whitespace-nowrap p-2 rounded-md max-w-fit ${
        isDragging ? "opacity-50" : ""
      } cursor-grab hover:cursor-grabbing`}
    >
      <span>
        {index + 1}. {partner.name}
      </span>
      <span
        onClick={() => handleRemovePartner(index)}
        className="text-[#BBBBBB] cursor-pointer hover:text-red-700 transition-colors pl-2"
      >
        &#10005;
      </span>
    </div>
  );
};

const RuleEngine: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [selectedPartners, setSelectedPartners] = useState<Partner[]>([]);
  const [activeTab, setActiveTab] = useState("partnerPriority");

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await GET(GET_ALLPARTNER_OFSELLER);
        if (response?.data?.success) {
          const fetchedPartners = response.data.data.map(
            (partner: string, index: number) => ({
              id: `partner-${index}`,
              name: partner,
            })
          );
          const sortedPartners = fetchedPartners.sort(
            (a: Partner, b: Partner) => a.name.localeCompare(b.name)
          );
          setPartners(sortedPartners);
        } else {
          toast.error("Failed to fetch partners");
        }
      } catch (error) {
        toast.error("An error occurred while fetching partners");
      }
    };

    const fetchAssignedPartners = async () => {
      try {
        const response = await GET(GET_ALLPARTNERS_OF_RULEENGINE);
        if (response?.data?.success) {
          const assignedPartners = response.data.data.map(
            (partner: string, index: number) => ({
              id: `partner-${index}`,
              name: partner,
            })
          );
          setSelectedPartners(assignedPartners);
        } else {
          toast.error("Failed to fetch assigned partners");
        }
      } catch (error) {
        toast.error("An error occurred while fetching assigned partners");
      }
    };

    const initializeData = async () => {
      await fetchPartners();
      await fetchAssignedPartners();
    };

    initializeData();
  }, []);

  const handleUpdateClientList = async () => {
    try {
      const partnerNames = selectedPartners.map((partner) => partner.name);
      const response = await POST(UPDATE_ALLPARTNER_OF_SELLER, {
        partners: partnerNames,
      });

      if (response?.data?.success) {
        toast.success("Partners updated successfully");
      } else {
        toast.error("Failed to update partners");
      }
    } catch (error) {
      toast.error("An error occurred while updating partners");
    }
  };

  const handlePartnerCardClick = (partner: Partner) => {
    if (selectedPartners.some((selected) => selected.name === partner.name)) {
      toast.error("Partner already in Assigned Partners Order list");
    } else {
      const updatedPartners = [...selectedPartners, partner];
      setSelectedPartners(updatedPartners);
    }
  };

  const handleRemovePartner = (partnerIndex: number) => {
    const updatedPartners = [...selectedPartners];
    updatedPartners.splice(partnerIndex, 1);
    setSelectedPartners(updatedPartners);
  };

  const movePartner = (dragIndex: number, hoverIndex: number) => {
    const updatedPartners = [...selectedPartners];
    const [removed] = updatedPartners.splice(dragIndex, 1);
    updatedPartners.splice(hoverIndex, 0, removed);
    setSelectedPartners(updatedPartners);
  };

  const tabs = [
    { statusName: "Partner Priority", value: "partnerPriority" },
    { statusName: "Advance Rule Engine", value: "advanceRuleEngine" },
  ];

  return (
    <>
      <Breadcrum label="Rule Engine" />
      <div className="p-8">
        <div className="flex flex-row customScroll whitespace-nowrap mt-2 lg:h-[34px]">
          {tabs.map(({ statusName, value }, index) => (
            <div
              key={index}
              style={{ borderBottomWidth: "3px" }}
              className={`flex lg:justify-center items-center cursor-pointer border-[#777777] px-6
                ${activeTab === value && "!border-[#004EFF]"}`}
              onClick={() => setActiveTab(value)}
            >
              <span
                className={`text-[#777777] font-medium text-[15px] lg:text-[18px]
                  ${activeTab === value && "!text-[#004EFF] lg:text-[18px]"}`}
              >
                {statusName}
              </span>
            </div>
          ))}
        </div>
        {activeTab === "partnerPriority" && (
          <>
            <div className="flex justify-center gap-8 mt-4">
              <div className="bg-white rounded-md shadow-md w-full">
                <div className="flex justify-between items-center p-2 pl-3 pr-4 border-b border-gray-200 bg-gray-100 rounded-t-md shadow-sm">
                  <h2 className=" text-base !font-semibold">Partners</h2>
                </div>
                <div className="p-4">
                  <div className="flex flex-col justify-start items-start space-y-2 overflow-y-auto h-96">
                    {partners
                      .filter(
                        (partner) =>
                          !selectedPartners.some(
                            (selected) => selected.name === partner.name
                          )
                      )
                      .map((partner) => (
                        <OneButton
                          key={partner.id}
                          text={partner.name}
                          onClick={() => handlePartnerCardClick(partner)}
                          variant="secondary"
                          className="max-w-fit"
                        />
                      ))}
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-md shadow-md w-full">
                <div className="flex justify-between items-center p-2 pl-3 pr-4 border-b border-gray-200 bg-gray-100 rounded-t-md shadow-sm">
                  <h2 className="text-base !font-semibold">
                    Assigned Partners Order
                  </h2>
                </div>
                <div className="p-4">
                  <DndProvider backend={HTML5Backend}>
                    <div className="space-y-2 overflow-y-auto h-96 ">
                      {selectedPartners.map((partner, index) => (
                        <DraggablePartner
                          key={partner.id}
                          partner={partner}
                          index={index}
                          movePartner={movePartner}
                          handleRemovePartner={handleRemovePartner}
                        />
                      ))}
                    </div>
                  </DndProvider>
                </div>
              </div>
            </div>
            <div className="p-4 mt-4">
              <p className="text-gray-500 font-Open font-semibold leading-5 text-sm">
                If the prioritized partners do not meet service requirements,
                the cheapest alternative partner will handle orders.
              </p>
            </div>
            <div>
              <BottomLayout
                customButtonText="Update"
                callApi={() => {
                  handleUpdateClientList();
                }}
                className="lg:w-[150px] mr-8"
                Button2Name={true}
                disabled={selectedPartners.length === 0}
              />
            </div>
          </>
        )}

        {activeTab === "advanceRuleEngine" && (
          <div className="flex justify-center items-center h-64 mt-4">
            <h2 className="text-lg font-bold text-gray-500">Coming Soon</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default RuleEngine;

// import React, { useState, useEffect } from "react";
// import { Breadcrum } from "../../../components/Layout/breadcrum";
// import toast from "react-hot-toast";
// import OneButton from "../../../components/Button/OneButton";
// import { GET, POST } from "../../../utils/webService";
// import {
//   GET_ALLPARTNER_OFSELLER,
//   UPDATE_ALLPARTNER_OF_SELLER,
//   GET_ALLPARTNERS_OF_RULEENGINE,
// } from "../../../utils/ApiUrls";
// import BottomLayout from "../../../components/Layout/bottomLayout";

// interface Partner {
//   id: string;
//   name: string;
// }

// const RuleEngine: React.FC = () => {
//   const [partners, setPartners] = useState<Partner[]>([]);
//   const [selectedPartners, setSelectedPartners] = useState<Partner[]>([]);
//   const [activeTab, setActiveTab] = useState("partnerPriority");

//   useEffect(() => {
//     const fetchPartners = async () => {
//       try {
//         const response = await GET(GET_ALLPARTNER_OFSELLER);
//         // console.log("response==>", response);
//         if (response?.data?.success) {
//           const fetchedPartners = response.data.data.map(
//             (partner: string, index: number) => ({
//               id: `partner-${index}`,
//               name: partner,
//             })
//           );
//           // Sort the partners array by name in alphabetical order
//           const sortedPartners = fetchedPartners.sort(
//             (a: Partner, b: Partner) => a.name.localeCompare(b.name)
//           );
//           setPartners(sortedPartners);
//         } else {
//           toast.error("Failed to fetch partners");
//         }
//       } catch (error) {
//         toast.error("An error occurred while fetching partners");
//       }
//     };

//     const fetchAssignedPartners = async () => {
//       try {
//         const response = await GET(GET_ALLPARTNERS_OF_RULEENGINE);
//         // console.log("response==>", response.data);
//         if (response?.data?.success) {
//           const assignedPartners = response.data.data.map(
//             (partner: string, index: number) => ({
//               id: `partner-${index}`,
//               name: partner,
//             })
//           );
//           setSelectedPartners(assignedPartners);
//         } else {
//           toast.error("Failed to fetch assigned partners");
//         }
//       } catch (error) {
//         toast.error("An error occurred while fetching assigned partners");
//       }
//     };

//     // Fetch both partners and assigned partners
//     const initializeData = async () => {
//       await fetchPartners();
//       await fetchAssignedPartners();
//     };

//     initializeData();
//   }, []);

//   const handleUpdateClientList = async () => {
//     try {
//       const partnerNames = selectedPartners.map((partner) => partner.name);
//       const response = await POST(UPDATE_ALLPARTNER_OF_SELLER, {
//         partners: partnerNames,
//       });

//       if (response?.data?.success) {
//         toast.success("Partners updated successfully");
//       } else {
//         toast.error("Failed to update partners");
//       }
//     } catch (error) {
//       toast.error("An error occurred while updating partners");
//     }
//   };

//   const handlePartnerCardClick = (partner: Partner) => {
//     if (selectedPartners.some((selected) => selected.name === partner.name)) {
//       toast.error("Partner already in Assigned Partners Order list");
//     } else {
//       const updatedPartners = [...selectedPartners, partner];
//       setSelectedPartners(updatedPartners);
//     }
//   };

//   const handleRemovePartner = (partnerIndex: number) => {
//     const updatedPartners = [...selectedPartners];
//     updatedPartners.splice(partnerIndex, 1);
//     setSelectedPartners(updatedPartners);
//   };

//   const tabs = [
//     { statusName: "Partner Priority", value: "partnerPriority" },
//     { statusName: "Advance Rule Engine", value: "advanceRuleEngine" },
//   ];
//   // console.log("selectedPartners==", selectedPartners);
//   // console.log("partners==", partners);

//   return (
//     <>
//       <Breadcrum label="Rule Engine" />
//       <div className="p-8">
//         <div className="flex flex-row customScroll whitespace-nowrap mt-2 lg:h-[34px]">
//           {tabs.map(({ statusName, value }, index) => (
//             <div
//               key={index}
//               style={{ borderBottomWidth: "3px" }}
//               className={`flex lg:justify-center items-center cursor-pointer border-[#777777] px-6
//                 ${activeTab === value && "!border-[#004EFF]"}`}
//               onClick={() => setActiveTab(value)}
//             >
//               <span
//                 className={`text-[#777777] font-medium text-[15px] lg:text-[18px]
//                   ${activeTab === value && "!text-[#004EFF] lg:text-[18px]"}`}
//               >
//                 {statusName}
//               </span>
//             </div>
//           ))}
//         </div>
//         {activeTab === "partnerPriority" && (
//           <>
//             <div className="flex justify-center gap-8 mt-4">
//               <div className="bg-white rounded-md shadow-md w-full">
//                 <div className="flex justify-between items-center p-2 pl-3 pr-4 border-b border-gray-200 bg-gray-100 rounded-t-md shadow-sm">
//                   <h2 className=" text-base !font-semibold">Partners</h2>
//                 </div>
//                 <div className="p-4">
//                   <div className="flex flex-col justify-start items-start space-y-2 overflow-y-auto h-96">
//                     {partners
//                       .filter(
//                         (partner) =>
//                           !selectedPartners.some(
//                             (selected) => selected.name === partner.name
//                           )
//                       )
//                       .map((partner) => (
//                         <OneButton
//                           key={partner.id}
//                           text={partner.name}
//                           onClick={() => handlePartnerCardClick(partner)}
//                           variant="secondary"
//                           className="max-w-fit"
//                         />
//                       ))}
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-white rounded-md shadow-md w-full">
//                 <div className="flex justify-between items-center p-2 pl-3 pr-4 border-b border-gray-200 bg-gray-100 rounded-t-md shadow-sm">
//                   <h2 className="text-base !font-semibold">
//                     Assigned Partners Order
//                   </h2>
//                 </div>
//                 <div className="p-4">
//                   <div className="space-y-2 overflow-y-auto h-96">
//                     {selectedPartners.map((partner, index) => (
//                       <div
//                         key={partner.id}
//                         className="flex justify-between items-center bg-[#FFFFFF] text-[#004EFF] border border-[#A4A4A4] text-[14px] font-Open font-semibold leading-5 whitespace-nowrap p-2 rounded-md max-w-fit"
//                       >
//                         <span>
//                           {index + 1}. {partner.name}
//                         </span>
//                         <span
//                           onClick={() => handleRemovePartner(index)}
//                           className="text-[#BBBBBB] cursor-pointer hover:text-red-700 transition-colors pl-2"
//                         >
//                           &#10005;
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="p-4 mt-4">
//               <p className="text-gray-500 font-Open font-semibold leading-5 text-sm">
//                 If the prioritized partners do not meet service requirements,
//                 the cheapest alternative partner will handle orders.
//               </p>
//             </div>
//             <div>
//               <BottomLayout
//                 customButtonText="Update"
//                 callApi={() => {
//                   handleUpdateClientList();
//                 }}
//                 className="lg:w-[150px] mr-8"
//                 Button2Name={true}
//                 disabled={selectedPartners.length === 0}
//               />
//             </div>
//           </>
//         )}

//         {activeTab === "advanceRuleEngine" && (
//           <div className="flex justify-center items-center h-64 mt-4">
//             <h2 className="text-lg font-bold text-gray-500">Coming Soon</h2>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default RuleEngine;
