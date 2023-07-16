export {}
// import ServiceButton from "../../../components/Button/ServiceButton";
// import SummaryIcon from "../../../assets/Service/summary.svg";
// import LocationIcon from "../../../assets/Service/location.svg";
// import EditIcon from "../../../assets/Service/edit.svg";
// import ContactIcon from "../../../assets/Service/contact.svg";
// import PhoneIcon from "../../../assets/Service/phone.svg";
// import DeliveryIcon from "../../../assets/Service/delivery.svg";
// import ServiceIcon from "../../../assets/Service/service.svg";

// type Props = {};

// const Summary = (props: Props) => {
//   return (
//     <div>
//       <div className="grid grid-cols-1 gap-y-5 p-5   ">
//         <div className="flex flex-row gap-2">
//           <img src={SummaryIcon} alt="Summary Icon" />
//           <p className="text-[18px] text-[#202427] font-semibold ">Summary</p>
//         </div>
//         <div className="flex flex-row justify-between items-center h-[48px] rounded  p-[10px] border-[1px] border-[#A4A4A4] ">
//           <p className="text-[12px] text-[#1C1C1C]">Generate order ID</p>
//           <p className="text-[#004EFF] text-[14px] font-bold">AUTO GENERATE</p>
//         </div>
//         {/* PickUp */}
//         <div className="p-[12px] gap-[8px] shadow-lg rounded-lg border-[1px] border-[#E8E8E8] bg-[#FFFFFF]">
//           <div className="flex flex-col gap-y-3 ">
//             <div className="flex flex-row justify-between items-center">
//               <div className="flex flex-row items-center gap-2">
//                 <img src={LocationIcon} alt="Location Icon" />
//                 <p className="text-[14px] font-semibold">Pickup Details</p>
//               </div>
//               <div>
//                 <img src={EditIcon} alt="Edit Icon" />
//               </div>
//             </div>
//             <div className="flex flex-col gap-y-1">
//               <div className="flex flex-row items-center gap-2">
//                 <img src={LocationIcon} alt="Location Icon" />
//                 <p className="text-[12px] font-semibold">
//                   Door 12, sector 8, Shankar Nagar
//                 </p>
//               </div>
//               <p className="text-[12px] font-semibold">
//                 Andheri East, Mumbai 422011
//               </p>
//               <div className="flex flex-row items-center gap-2">
//                 <img src={ContactIcon} alt="Location Icon" />
//                 <p className="text-[12px] font-semibold">+91 12345 12345</p>
//               </div>
//               <div className="flex flex-row items-center gap-2">
//                 <img src={PhoneIcon} alt="Location Icon" />
//                 <p className="text-[12px] font-semibold">Amit Sharma</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Delivery */}

//         <div className="p-[12px] gap-[8px] rounded-lg border-[1px] shadow-lg border-[#E8E8E8] bg-[#FFFFFF]">
//           <div className="flex flex-col gap-y-3 ">
//             <div className="flex flex-row justify-between items-center">
//               <div className="flex flex-row items-center gap-2">
//                 <img src={LocationIcon} alt="Location Icon" />
//                 <p className="text-[14px] font-semibold">Delivery Details</p>
//               </div>
//               <div>
//                 <img src={EditIcon} alt="Edit Icon" />
//               </div>
//             </div>
//             <div className="flex flex-col gap-y-1">
//               <div className="flex flex-row items-center gap-2">
//                 <img src={LocationIcon} alt="Location Icon" />
//                 <p className="text-[12px] font-semibold">
//                   Door 12, sector 8, Shankar Nagar
//                 </p>
//               </div>
//               <p className="text-[12px] font-semibold">
//                 Andheri East, Mumbai 422011
//               </p>
//               <div className="flex flex-row items-center gap-2">
//                 <img src={ContactIcon} alt="Location Icon" />
//                 <p className="text-[12px] font-semibold">+91 12345 12345</p>
//               </div>
//               <div className="flex flex-row items-center gap-2">
//                 <img src={PhoneIcon} alt="Location Icon" />
//                 <p className="text-[12px] font-semibold">Amit Sharma</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Product */}
//         <div className="p-[12px] gap-[8px] rounded-lg border-[1px] shadow-lg border-[#E8E8E8] bg-[#FFFFFF]">
//           <div className="flex flex-col gap-y-3 ">
//             <div className="flex flex-row justify-between items-center">
//               <div className="flex flex-row items-center gap-2">
//                 <img src={DeliveryIcon} alt="Location Icon" />
//                 <p className="text-[14px] font-semibold">Product Details</p>
//               </div>
//               <div>
//                 <img src={EditIcon} alt="Edit Icon" />
//               </div>
//             </div>
//             <div className="flex flex-col gap-y-1">
//               <div className="flex flex-row items-center gap-2">
//                 <img src={DeliveryIcon} alt="Location Icon" />
//                 <p className="text-[12px] font-semibold">Package 1</p>
//               </div>
//               <p className="text-[12px] font-semibold">
//                 Mac book | Air dopes | iwatch 8
//               </p>
//             </div>
//           </div>
//         </div>

//         {/*Service */}

//         <div className="p-[12px] gap-[8px] rounded-lg border-[1px] shadow-lg border-[#E8E8E8] bg-[#FFFFFF]">
//           <div className="flex flex-col gap-y-3 ">
//             <div className="flex flex-row justify-between items-center">
//               <div className="flex flex-row items-center gap-2">
//                 <img src={ServiceIcon} alt="Location Icon" />
//                 <p className="text-[14px] font-semibold">Service Details</p>
//               </div>
//               <div>
//                 <img src={EditIcon} alt="Edit Icon" />
//               </div>
//             </div>
//             <div className="flex flex-col gap-y-1">
//               <p className="text-[12px] font-semibold">Delhivery</p>
//               <p className="text-[12px] font-semibold">Economy 1 kg</p>
//               <p className="text-[12px] font-semibold">₹4,000</p>
//             </div>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default Summary;
