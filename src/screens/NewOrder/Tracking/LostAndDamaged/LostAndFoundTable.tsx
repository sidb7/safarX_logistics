import React, { useState } from "react";
import { CustomTable } from "../../../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import Checkbox from "../../../../components/CheckBox";
import {
  TrackingStatusLabel,
  StatusType,
} from "../../../../components/TrackingStatusLabel/TrackingStatusLabel";
import OneButton from "../../../../components/Button/OneButton";
import CenterModal from "../../../../components/CustomModal/customCenterModal";
import { POST } from "../../../../utils/webService";
import { UPDATE_LD_CLAIM } from "../../../../utils/ApiUrls";
import toast from "react-hot-toast";

interface LostAndFoundTableProps {
  orders: any[];
}

const LostAndFoundTable: React.FC<LostAndFoundTableProps> = ({ orders }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const safeOrders = orders || [];
  
  // Add these state variables for image/video modals
  const [isImagesModalOpen, setIsImagesModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Add state for claim success modal
  const [isClaimSuccessModalOpen, setIsClaimSuccessModalOpen] = useState(false);
  const [claimedShipmentInfo, setClaimedShipmentInfo] = useState<any>(null);
  const [isClaimingShipment, setIsClaimingShipment] = useState(false);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(safeOrders.map((item) => item._id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedRows((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  
  // Add these handler functions for images and video
  const handleViewImages = (data: any) => {
    const images = data?.images_url?.[0] || {};
    const imageUrls = Object.entries(images)
      .filter(([key]) => key.includes('image'))
      .map(([key, value]) => value as string);
    
    setSelectedImages(imageUrls);
    setCurrentImageIndex(0); // Reset to first image
    setIsImagesModalOpen(true);
  };

  // Function to navigate to the next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === selectedImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to navigate to the previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? selectedImages.length - 1 : prevIndex - 1
    );
  };

  const handleViewVideo = (data: any) => {
    const videoUrl = data?.images_url?.[0]?.video || null;
    setSelectedVideo(videoUrl);
    setIsVideoModalOpen(true);
  };

  const handleCloseImagesModal = () => {
    setIsImagesModalOpen(false);
    setSelectedImages([]);
    setCurrentImageIndex(0);
  };

  const handleCloseVideoModal = () => {
    setIsVideoModalOpen(false);
    setSelectedVideo(null);
  };
  
  // New handler for claim functionality
  const handleClaim = async (shipmentData: any) => {
    if (isClaimingShipment) return;
    
    setIsClaimingShipment(true);
    try {
      
      const payload = {
        awb: shipmentData?.awb,
        isClaimed: true,
      };
       
      
      const response = await POST(UPDATE_LD_CLAIM, payload);
      
      if (response?.data?.success) {
        setClaimedShipmentInfo(shipmentData);
        setIsClaimSuccessModalOpen(true);
        toast.success("Shipment claimed successfully!");
      } else {
        toast.error(response?.data?.message || "Failed to claim shipment");
      }
    } catch (error) {
      console.error("Error claiming shipment:", error);
      toast.error("An error occurred while claiming the shipment");
    } finally {
      setIsClaimingShipment(false);
    }
  };

  const columnsHelper = createColumnHelper<any>();

  const columns = [
    columnsHelper.accessor("clientInfo", {
      header: () => (
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={selectedRows?.length === safeOrders?.length}
            onChange={handleSelectAll}
            className="h-5 w-5"
          />
          <span>Request Id</span>
        </div>
      ),
      cell: (info) => {
        const clientData = info?.row?.original;
        return (
          <div className="flex flex-col">
            <div className="flex items-center space-x-3 mt-3 mb-2">
              <Checkbox
                checked={selectedRows?.includes(clientData._id)}
                onChange={() => handleSelectRow(clientData._id)}
                className="h-5 w-5"
              />
              <span className="font-Open text-sm font-semibold leading-5">
                {clientData?.sellerId}
              </span>
            </div>
            <div className="ml-8 mb-3">
              <span className="font-Open text-xs font-normal leading-4 block">
                Name
              </span>
              <span className="font-Open text-sm font-semibold leading-5 block">
                {clientData?.sellerInfo?.firstName}{" "}
                {clientData?.sellerInfo?.lastName}
              </span>
            </div>
          </div>
        );
      },
    }),
    columnsHelper.accessor("trackingDetails", {
      header: "Tracking Details",
      cell: (info) => {
        const data = info?.row?.original;
        const eddDate = data?.shipmentStatus?.EDD;
        const formattedDate = eddDate
          ? new Date(eddDate).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
          : "N/A";
        return (
          <div>
            <div className="mb-4">
              <p className="font-Open text-xs font-normal leading-4 block mt-3">
                AWB No:
              </p>
              <h2 className="font-Open text-sm font-semibold leading-5 block">
                {data?.awb}
              </h2>
            </div>
            <div className="mb-4">
              <p className="font-Open text-xs font-normal leading-4 block">
                Order ID:
              </p>
              <h2 className="font-Open text-sm font-semibold leading-5 block">
                {data?.orderId}
              </h2>
            </div>
            <div>
              <p className="font-Open text-xs font-normal leading-4 block">
                EDD:
              </p>
              <p className="font-Open text-sm font-semibold leading-5 block mb-3">
                {formattedDate}
              </p>
            </div>
          </div>
        );
      },
    }),
    columnsHelper.accessor("packageDetails", {
      header: "Package Details & Partner",
      cell: (info) => {
        const data = info?.row?.original;
        const partnerInfo = data?.orderInfo?.boxInfo?.[0]?.products?.[0];
        return (
          <div>
            <div className="mb-4">
              <p className="font-Open text-xs font-normal leading-4 block mt-3">
                Product
              </p>
              <h2 className="font-Open text-sm font-semibold leading-5 block">
                {partnerInfo?.name || "N/A"}
              </h2>
            </div>
            <div className="mb-4">
              <p className="font-Open text-xs font-normal leading-4 block">
                Dimension
              </p>
              <p className="font-Open text-sm font-semibold leading-5 block">
                {partnerInfo
                  ? `${partnerInfo?.length} x ${partnerInfo?.breadth} x ${partnerInfo?.height}`
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="font-Open text-xs font-normal leading-4 block">
                Partner
              </p>
              <p className="font-Open text-sm font-semibold leading-5 block mb-3">
                {data?.courierPartnerName || "N/A"}
              </p>
            </div>
          </div>
        );
      },
    }),
    columnsHelper.accessor("invValue", {
      header: "Inv Value, Wt & Insurance",
      cell: (info) => {
        const data = info?.row?.original;
        const codInfo = data?.codInfo;
        const service = data?.service;
        const value = codInfo?.isCod
          ? codInfo?.collectableAmount
          : codInfo?.invoiceValue;
        const weight = service?.appliedWeight;
        const hasInsurance = service?.insurance > 0;

        return (
          <div>
            <div className="mb-4">
              <p className="font-Open text-xs font-normal leading-4 block mt-3">
                Value
              </p>
              <h2 className="font-Open text-sm font-semibold leading-5 block">
                ₹{value || "N/A"}
              </h2>
            </div>
            <div className="mb-4">
              <p className="font-Open text-xs font-normal leading-4 block">
                Weight
              </p>
              <p className="font-Open text-sm font-semibold leading-5 block">
                {weight || "N/A"} kg
              </p>
            </div>
            <div>
              <p className="font-Open text-xs font-normal leading-4 block">
                Insurance
              </p>
              <p className="font-Open text-sm font-semibold leading-5 block mb-3">
                {hasInsurance ? "Yes" : "No"}
              </p>
            </div>
          </div>
        );
      },
    }),
    columnsHelper.accessor("bookingDate", {
      header: "Booked Date & Last Status",
      cell: (info) => {
        const data = info?.row?.original;
        const createdAt = data?.createdAt;
        const status = data?.currentStatus as StatusType;

        const formattedDate = createdAt
          ? new Date(createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "N/A";

        return (
          <div className="mt-3">
            <span className="font-Open text-sm font-semibold leading-5">
              {formattedDate}
            </span>
            <div className="mt-2">
              <TrackingStatusLabel status={status || "NULL"} />
            </div>
          </div>
        );
      },
    }),
    columnsHelper.accessor("proof", {
      header: "Proof",
      cell: (info) => {
        const data = info.row.original;
        const images = data?.images_url?.[0] || {};
        const imagesCount = Object.keys(images).filter(key => key.includes('image')).length;
        const hasVideo = images.video ? true : false;
        
        return (
          <div className="mt-3">
            <span className="text-sm font-semibold">
              {data?.ldStatusHistory?.[0]?.reason}
            </span>
            <div className="mt-2 flex flex-col gap-1">
              {imagesCount > 0 && (
                <button 
                  onClick={() => handleViewImages(data)}
                  className="px-2 py-1 rounded-md hover:bg-blue-200 text-[#004EFF] flex items-center w-fit font-Open font-semibold text-sm leading-5 tracking-normal text-center"
                >
                  <span className="mr-1">View Images</span>
                  <span className="border border-blue-200 px-1.5 py-0.5 rounded-full font-Open font-semibold text-sm leading-5 tracking-normal text-center">{imagesCount}</span>
                </button>
              )}
              {hasVideo && (
                <button 
                  onClick={() => handleViewVideo(data)}
                  className="px-2 py-1 rounded-md hover:bg-blue-200 text-[#004EFF] flex items-center w-fit font-Open font-semibold text-sm leading-5 tracking-normal text-center"
                >
                  <span className="mr-1">View Video</span>
                </button>
              )}
            </div>
          </div>
        );
      },
    }),
    columnsHelper.accessor("currentTag", {
      header: "Current Tag & Remark",
      cell: (info) => {
        const data = info?.row?.original;
        return (
          <div>
            <div className="mt-3">
              <span className="font-Open text-xs font-normal leading-4">
                System:{" "}
                <span className="font-Open text-sm font-semibold leading-5 text-[#F35838]">
                  {data?.ldStatus}
                </span>
              </span>
            </div>
            <div className="mt-2 mb-4">
              <span className="font-Open text-xs font-normal leading-4">
                Remark:{" "}
                <div className="font-Open text-sm font-semibold leading-5">
                  {data?.sellerRemark || "N/A"}
                </div>
              </span>
            </div>
          </div>
        );
      },
    }),
    columnsHelper.accessor("action", {
      header: "Action",
      cell: (info) => {
        const data = info?.row?.original;
        const isAlreadyClaimed = data?.isClaimed === true;
        
        return (
          <div>
            {isAlreadyClaimed ? (
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                Claimed
              </span>
            ) : (
              <OneButton
                text={isClaimingShipment ? "Processing..." : "Claim"}
                variant="primary"
                onClick={() => handleClaim(data)}
                disabled={isClaimingShipment}
              />
            )}
          </div>
        );
      },
    }),
  ];

  return (
    <div className="overflow-x-auto">
      <CustomTable columnsData={columns} rowData={safeOrders} />
      
      {/* Images Modal */}
      <CenterModal isOpen={isImagesModalOpen} onRequestClose={handleCloseImagesModal} className="!h-[700px]">
        <div className="w-full h-full flex flex-col overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-medium">Proof Images</h2>
            <button
              onClick={handleCloseImagesModal}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          
          {selectedImages.length > 0 && (
            <div className="flex-1 relative" style={{ minHeight: "300px" }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src={selectedImages[currentImageIndex]} 
                  alt={`Proof ${currentImageIndex + 1}`} 
                  className="max-h-full max-w-full object-contain p-2"
                  style={{ maxHeight: "calc(100% - 20px)" }}
                />
              </div>
              
              {/* Navigation controls */}
              <div className="absolute inset-y-0 left-0 flex items-center">
                <button 
                  onClick={prevImage}
                  className="bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-r p-1 ml-2"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>
              
              <div className="absolute inset-y-0 right-0 flex items-center">
                <button 
                  onClick={nextImage}
                  className="bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-l p-1 mr-2"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Image counter */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <div className="bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {selectedImages.length}
                </div>
              </div>
            </div>
          )}
        </div>
      </CenterModal>

      {/* Video Modal */}
      <CenterModal isOpen={isVideoModalOpen} onRequestClose={handleCloseVideoModal} className="h-[700px]">
        <div className="w-full h-full flex flex-col overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-medium">Proof Video</h2>
            <button
              onClick={handleCloseVideoModal}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          
          {selectedVideo && (
            <div className="flex-1 flex items-center justify-center" style={{ minHeight: "300px" }}>
              <div className="w-full h-full flex items-center justify-center p-4">
                <video 
                  controls 
                  className="max-h-full max-w-full object-contain"
                  style={{ maxHeight: "calc(100% - 20px)" }}
                  src={selectedVideo}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          )}
        </div>
      </CenterModal>
      
      {/* Claim Success Modal */}
      {/* <CenterModal isOpen={isClaimSuccessModalOpen} onRequestClose={() => setIsClaimSuccessModalOpen(false)} className="!h-[600px] !w-[500px]">
        <div className="w-full flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-medium">Claim Successful</h2>
            <button
              onClick={() => setIsClaimSuccessModalOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          
          <div className="p-6">
            <div className="mb-6 flex items-center justify-center">
              <div className="bg-green-100 p-4 rounded-full">
                <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-center mb-4">Shipment Claimed Successfully</h3>
            
            {claimedShipmentInfo && (
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">AWB Number</p>
                    <p className="font-medium">{claimedShipmentInfo.awb}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Order ID</p>
                    <p className="font-medium">{claimedShipmentInfo.orderId}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-1">Package</p>
                  <p className="font-medium">{claimedShipmentInfo?.orderInfo?.boxInfo?.[0]?.products?.[0]?.name || "N/A"}</p>
                </div>
              </div>
            )}
            
            <p className="text-gray-600 text-center mb-6">
              Your claim has been registered successfully. You will receive updates on the status of your claim.
            </p>
            
            <button
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 text-sm font-medium"
              onClick={() => setIsClaimSuccessModalOpen(false)}
            >
              CLOSE
            </button>
          </div>
        </div>
      </CenterModal> */}
        <CenterModal isOpen={isClaimSuccessModalOpen} onRequestClose={() => setIsClaimSuccessModalOpen(false)} className="!h-[500px] !w-[600px]">
        <div className="w-full h-full flex flex-col">
          <div className="flex justify-between items-center p-3 border-b">
            <h2 className="text-lg font-medium">Claim Successful</h2>
            <button
              onClick={() => setIsClaimSuccessModalOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          
          <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <div className="mb-4 flex items-center justify-center">
                <div className="bg-green-100 p-3 rounded-full">
                  <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-center mb-3">Shipment Claimed Successfully</h3>
              
              {claimedShipmentInfo && (
                <div className="bg-gray-50 p-3 rounded-lg mb-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">AWB Number</p>
                      <p className="font-medium text-sm">{claimedShipmentInfo.awb}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Order ID</p>
                      <p className="font-medium text-sm">{claimedShipmentInfo.orderId}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-1">Package</p>
                    <p className="font-medium text-sm">{claimedShipmentInfo?.orderInfo?.boxInfo?.[0]?.products?.[0]?.name || "N/A"}</p>
                  </div>
                </div>
              )}
              
              <p className="text-gray-600 text-center text-sm mb-4">
                Your claim has been registered successfully. You will receive updates on the status of your claim.
              </p>
            </div>
            
            <div className="mt-auto">
              <button
                className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 text-sm font-medium"
                onClick={() => setIsClaimSuccessModalOpen(false)}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      </CenterModal>
    </div>
  );
};

export default LostAndFoundTable;



// import React, { useState } from "react";
// import { CustomTable } from "../../../../components/Table";
// import { createColumnHelper } from "@tanstack/react-table";
// import Checkbox from "../../../../components/CheckBox";
// import {
//   TrackingStatusLabel,
//   StatusType,
// } from "../../../../components/TrackingStatusLabel/TrackingStatusLabel";
// import OneButton from "../../../../components/Button/OneButton";
// import CenterModal from "../../../../components/CustomModal/customCenterModal";

// interface LostAndFoundTableProps {
//   orders: any[];
// }

// const LostAndFoundTable: React.FC<LostAndFoundTableProps> = ({ orders }) => {
//   const [selectedRows, setSelectedRows] = useState<string[]>([]);
//   const safeOrders = orders || [];
  
//   // Add these state variables for image/video modals
//   const [isImagesModalOpen, setIsImagesModalOpen] = useState(false);
//   const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
//   const [selectedImages, setSelectedImages] = useState<string[]>([]);
//   const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.checked) {
//       setSelectedRows(safeOrders.map((item) => item._id));
//     } else {
//       setSelectedRows([]);
//     }
//   };

//   const handleSelectRow = (id: string) => {
//     setSelectedRows((prev) => {
//       if (prev.includes(id)) {
//         return prev.filter((item) => item !== id);
//       } else {
//         return [...prev, id];
//       }
//     });
//   };
  
//   // Add these handler functions for images and video
//   const handleViewImages = (data: any) => {
//     const images = data?.images_url?.[0] || {};
//     const imageUrls = Object.entries(images)
//       .filter(([key]) => key.includes('image'))
//       .map(([key, value]) => value as string);
    
//     setSelectedImages(imageUrls);
//     setCurrentImageIndex(0); // Reset to first image
//     setIsImagesModalOpen(true);
//   };

//   // Function to navigate to the next image
//   const nextImage = () => {
//     setCurrentImageIndex((prevIndex) => 
//       prevIndex === selectedImages.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   // Function to navigate to the previous image
//   const prevImage = () => {
//     setCurrentImageIndex((prevIndex) => 
//       prevIndex === 0 ? selectedImages.length - 1 : prevIndex - 1
//     );
//   };

//   const handleViewVideo = (data: any) => {
//     const videoUrl = data?.images_url?.[0]?.video || null;
//     setSelectedVideo(videoUrl);
//     setIsVideoModalOpen(true);
//   };

//   const handleCloseImagesModal = () => {
//     setIsImagesModalOpen(false);
//     setSelectedImages([]);
//     setCurrentImageIndex(0);
//   };

//   const handleCloseVideoModal = () => {
//     setIsVideoModalOpen(false);
//     setSelectedVideo(null);
//   };

//   const columnsHelper = createColumnHelper<any>();

//   const columns = [
//     columnsHelper.accessor("clientInfo", {
//       header: () => (
//         <div className="flex items-center space-x-2">
//           <Checkbox
//             checked={selectedRows?.length === safeOrders?.length}
//             onChange={handleSelectAll}
//             className="h-5 w-5"
//           />
//           <span>Request Id</span>
//         </div>
//       ),
//       cell: (info) => {
//         const clientData = info?.row?.original;
//         return (
//           <div className="flex flex-col">
//             <div className="flex items-center space-x-3 mt-3 mb-2">
//               <Checkbox
//                 checked={selectedRows?.includes(clientData._id)}
//                 onChange={() => handleSelectRow(clientData._id)}
//                 className="h-5 w-5"
//               />
//               <span className="font-Open text-sm font-semibold leading-5">
//                 {clientData?.sellerId}
//               </span>
//             </div>
//             <div className="ml-8 mb-3">
//               <span className="font-Open text-xs font-normal leading-4 block">
//                 Name
//               </span>
//               <span className="font-Open text-sm font-semibold leading-5 block">
//                 {clientData?.sellerInfo?.firstName}{" "}
//                 {clientData?.sellerInfo?.lastName}
//               </span>
//             </div>
//           </div>
//         );
//       },
//     }),
//     columnsHelper.accessor("trackingDetails", {
//       header: "Tracking Details",
//       cell: (info) => {
//         const data = info?.row?.original;
//         const eddDate = data?.shipmentStatus?.EDD;
//         const formattedDate = eddDate
//           ? new Date(eddDate).toLocaleDateString("en-IN", {
//             day: "2-digit",
//             month: "short",
//             year: "numeric",
//           })
//           : "N/A";
//         return (
//           <div>
//             <div className="mb-4">
//               <p className="font-Open text-xs font-normal leading-4 block mt-3">
//                 AWB No:
//               </p>
//               <h2 className="font-Open text-sm font-semibold leading-5 block">
//                 {data?.awb}
//               </h2>
//             </div>
//             <div className="mb-4">
//               <p className="font-Open text-xs font-normal leading-4 block">
//                 Order ID:
//               </p>
//               <h2 className="font-Open text-sm font-semibold leading-5 block">
//                 {data?.orderId}
//               </h2>
//             </div>
//             <div>
//               <p className="font-Open text-xs font-normal leading-4 block">
//                 EDD:
//               </p>
//               <p className="font-Open text-sm font-semibold leading-5 block mb-3">
//                 {formattedDate}
//               </p>
//             </div>
//           </div>
//         );
//       },
//     }),
//     columnsHelper.accessor("packageDetails", {
//       header: "Package Details & Partner",
//       cell: (info) => {
//         const data = info?.row?.original;
//         const partnerInfo = data?.orderInfo?.boxInfo?.[0]?.products?.[0];
//         return (
//           <div>
//             <div className="mb-4">
//               <p className="font-Open text-xs font-normal leading-4 block mt-3">
//                 Product
//               </p>
//               <h2 className="font-Open text-sm font-semibold leading-5 block">
//                 {partnerInfo?.name || "N/A"}
//               </h2>
//             </div>
//             <div className="mb-4">
//               <p className="font-Open text-xs font-normal leading-4 block">
//                 Dimension
//               </p>
//               <p className="font-Open text-sm font-semibold leading-5 block">
//                 {partnerInfo
//                   ? `${partnerInfo?.length} x ${partnerInfo?.breadth} x ${partnerInfo?.height}`
//                   : "N/A"}
//               </p>
//             </div>
//             <div>
//               <p className="font-Open text-xs font-normal leading-4 block">
//                 Partner
//               </p>
//               <p className="font-Open text-sm font-semibold leading-5 block mb-3">
//                 {data?.courierPartnerName || "N/A"}
//               </p>
//             </div>
//           </div>
//         );
//       },
//     }),
//     columnsHelper.accessor("invValue", {
//       header: "Inv Value, Wt & Insurance",
//       cell: (info) => {
//         const data = info?.row?.original;
//         const codInfo = data?.codInfo;
//         const service = data?.service;
//         const value = codInfo?.isCod
//           ? codInfo?.collectableAmount
//           : codInfo?.invoiceValue;
//         const weight = service?.appliedWeight;
//         const hasInsurance = service?.insurance > 0;

//         return (
//           <div>
//             <div className="mb-4">
//               <p className="font-Open text-xs font-normal leading-4 block mt-3">
//                 Value
//               </p>
//               <h2 className="font-Open text-sm font-semibold leading-5 block">
//                 ₹{value || "N/A"}
//               </h2>
//             </div>
//             <div className="mb-4">
//               <p className="font-Open text-xs font-normal leading-4 block">
//                 Weight
//               </p>
//               <p className="font-Open text-sm font-semibold leading-5 block">
//                 {weight || "N/A"} kg
//               </p>
//             </div>
//             <div>
//               <p className="font-Open text-xs font-normal leading-4 block">
//                 Insurance
//               </p>
//               <p className="font-Open text-sm font-semibold leading-5 block mb-3">
//                 {hasInsurance ? "Yes" : "No"}
//               </p>
//             </div>
//           </div>
//         );
//       },
//     }),
//     columnsHelper.accessor("bookingDate", {
//       header: "Booked Date & Last Status",
//       cell: (info) => {
//         const data = info?.row?.original;
//         const createdAt = data?.createdAt;
//         const status = data?.currentStatus as StatusType;

//         const formattedDate = createdAt
//           ? new Date(createdAt).toLocaleDateString("en-IN", {
//               day: "2-digit",
//               month: "short",
//               year: "numeric",
//             })
//           : "N/A";

//         return (
//           <div className="mt-3">
//             <span className="font-Open text-sm font-semibold leading-5">
//               {formattedDate}
//             </span>
//             <div className="mt-2">
//               <TrackingStatusLabel status={status || "NULL"} />
//             </div>
//           </div>
//         );
//       },
//     }),
//     columnsHelper.accessor("proof", {
//       header: "Proof",
//       cell: (info) => {
//         const data = info.row.original;
//         const images = data?.images_url?.[0] || {};
//         const imagesCount = Object.keys(images).filter(key => key.includes('image')).length;
//         const hasVideo = images.video ? true : false;
        
//         return (
//           <div className="mt-3">
//             <span className="text-sm font-semibold">
//               {data?.ldStatusHistory?.[0]?.reason}
//             </span>
//             <div className="mt-2 flex flex-col gap-1">
//               {imagesCount > 0 && (
//                 <button 
//                   onClick={() => handleViewImages(data)}
//                   className="px-2 py-1 rounded-md hover:bg-blue-200 text-[#004EFF] flex items-center w-fit font-Open font-semibold text-sm leading-5 tracking-normal text-center"
//                 >
//                   <span className="mr-1">View Images</span>
//                   <span className="border border-blue-200 px-1.5 py-0.5 rounded-full font-Open font-semibold text-sm leading-5 tracking-normal text-center">{imagesCount}</span>
//                 </button>
//               )}
//               {hasVideo && (
//                 <button 
//                   onClick={() => handleViewVideo(data)}
//                   className="px-2 py-1 rounded-md hover:bg-blue-200 text-[#004EFF] flex items-center w-fit font-Open font-semibold text-sm leading-5 tracking-normal text-center"
//                 >
//                   <span className="mr-1">View Video</span>
//                 </button>
//               )}
//             </div>
//           </div>
//         );
//       },
//     }),
//     columnsHelper.accessor("currentTag", {
//       header: "Current Tag & Remark",
//       cell: (info) => {
//         const data = info?.row?.original;
//         return (
//           <div>
//             <div className="mt-3">
//               <span className="font-Open text-xs font-normal leading-4">
//                 System:{" "}
//                 <span className="font-Open text-sm font-semibold leading-5 text-[#F35838]">
//                   {data?.ldStatus}
//                 </span>
//               </span>
//             </div>
//             <div className="mt-2 mb-4">
//               <span className="font-Open text-xs font-normal leading-4">
//                 Remark:{" "}
//                 <div className="font-Open text-sm font-semibold leading-5">
//                   {data?.sellerRemark || "N/A"}
//                 </div>
//               </span>
//             </div>
//           </div>
//         );
//       },
//     }),
//     columnsHelper.accessor("action", {
//       header: "Action",
//       cell: (info) => {
//         const data = info?.row?.original;
//         return (
//           <div>
//             <OneButton
//               text="Claim"
//               variant="primary"
//               onClick={() => {
//                 /* Add claim handling */
//               }}
//             />
//           </div>
//         );
//       },
//     }),
//   ];

//   return (
//     <div className="overflow-x-auto">
//       <CustomTable columnsData={columns} rowData={safeOrders} />
      
//       {/* Images Modal */}
//       <CenterModal isOpen={isImagesModalOpen} onRequestClose={handleCloseImagesModal} className="!h-[700px]">
//         <div className="w-full h-full flex flex-col overflow-hidden">
//           <div className="flex justify-between items-center p-4 border-b">
//             <h2 className="text-xl font-medium">Proof Images</h2>
//             <button
//               onClick={handleCloseImagesModal}
//               className="text-gray-500 hover:text-gray-700"
//             >
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>
          
//           {selectedImages.length > 0 && (
//             <div className="flex-1 relative" style={{ minHeight: "300px" }}>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <img 
//                   src={selectedImages[currentImageIndex]} 
//                   alt={`Proof ${currentImageIndex + 1}`} 
//                   className="max-h-full max-w-full object-contain p-2"
//                   style={{ maxHeight: "calc(100% - 20px)" }}
//                 />
//               </div>
              
//               {/* Navigation controls */}
//               <div className="absolute inset-y-0 left-0 flex items-center">
//                 <button 
//                   onClick={prevImage}
//                   className="bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-r p-1 ml-2"
//                 >
//                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
//                   </svg>
//                 </button>
//               </div>
              
//               <div className="absolute inset-y-0 right-0 flex items-center">
//                 <button 
//                   onClick={nextImage}
//                   className="bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-l p-1 mr-2"
//                 >
//                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//                   </svg>
//                 </button>
//               </div>
              
//               {/* Image counter */}
//               <div className="absolute bottom-4 left-0 right-0 flex justify-center">
//                 <div className="bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
//                   {currentImageIndex + 1} / {selectedImages.length}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </CenterModal>

//       {/* Video Modal */}
//       <CenterModal isOpen={isVideoModalOpen} onRequestClose={handleCloseVideoModal} className="h-[700px]">
//         <div className="w-full h-full flex flex-col overflow-hidden">
//           <div className="flex justify-between items-center p-4 border-b">
//             <h2 className="text-xl font-medium">Proof Video</h2>
//             <button
//               onClick={handleCloseVideoModal}
//               className="text-gray-500 hover:text-gray-700"
//             >
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>
          
//           {selectedVideo && (
//             <div className="flex-1 flex items-center justify-center" style={{ minHeight: "300px" }}>
//               <div className="w-full h-full flex items-center justify-center p-4">
//                 <video 
//                   controls 
//                   className="max-h-full max-w-full object-contain"
//                   style={{ maxHeight: "calc(100% - 20px)" }}
//                   src={selectedVideo}
//                 >
//                   Your browser does not support the video tag.
//                 </video>
//               </div>
//             </div>
//           )}
//         </div>
//       </CenterModal>
//     </div>
//   );
// };

// export default LostAndFoundTable;

