// import React, { useEffect, useState } from "react";
// import { useMediaQuery } from "react-responsive";
// import LabelContainer from "../../../components/LabelContainer";
// import EditIcon from "../../../assets/Profile/EditIcon.svg";

// interface ITypeProps {
//   BrandingDetails?: any;
//   brandingModal?: boolean;
//   setBrandingModal?: () => void;
// }

// const ProfileBrandingDetails = (props: ITypeProps) => {
//   const { BrandingDetails, setBrandingModal } = props;
//   const [data, setData] = useState<any>(BrandingDetails);
  
//   const isItLgScreen = useMediaQuery({
//     query: "(min-width: 1024px)",
//   });
  
//   useEffect(() => {
//     setData(BrandingDetails);
//   }, [BrandingDetails]);

//   return (
//     <div
//       className={`border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 mt-4`}
//     >
//       <div
//         className={`flex justify-between items-center h-[44px] bg-[#F6F6F6]`}
//       >
//         <div>
//           <span className="text-base font-semibold text-[#1C1C1C] ml-4">
//             Branding Details
//           </span>
//         </div>

//         <div>
//           <img
//             src={EditIcon}
//             alt=""
//             className="mr-4 cursor-pointer"
//             onClick={setBrandingModal}
//           />
//         </div>
//       </div>

//       {!isItLgScreen ? (
//         // Mobile Layout
//         <div>
//           <div className="grid grid-cols-2 ml-4 mt-4 mb-4">
//             <div className="flex flex-col">
//               <div>
//                 <span className="text-[12px] font-Lato text-[#777777]">Brand Logo</span>
//                 <div className="mt-2">
//                   <div
//                     style={{
//                       width: "60px",
//                       height: "60px",
//                       overflow: "hidden",
//                       borderRadius: "50%",
//                     }}
//                   >
//                     <img
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                       }}
//                       src={`${data?.logoUrl}`}
//                       alt="Brand Logo"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
//               <LabelContainer
//                 label="Brand Name"
//                 info={data?.brandName}
//                 className="ml-3"
//                 classNameInfo="ml-3"
//               />
//             </div>
//           </div>

//           {data?.facebookUrl && (
//             <div className="grid grid-cols-2 ml-4 mt-4 mb-4">
//               <div className="flex flex-col">
//                 <LabelContainer
//                   label="Facebook URL"
//                   info={data?.facebookUrl}
//                 />
//               </div>

//               {data?.instagramUrl && (
//                 <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
//                   <LabelContainer
//                     label="Instagram URL"
//                     info={data?.instagramUrl}
//                     className="ml-3"
//                     classNameInfo="ml-3"
//                   />
//                 </div>
//               )}
//             </div>
//           )}

//           {data?.whatsappUrl && (
//             <div className="grid grid-cols-2 ml-4 mt-4 mb-4">
//               <div className="flex flex-col">
//                 <LabelContainer
//                   label="WhatsApp URL"
//                   info={data?.whatsappUrl}
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       ) : (
//         // Desktop Layout
//         <div className="grid grid-cols-5">
//           <div className="flex flex-col py-5 px-5 mt-2 mb-2">
//             <div>
//               <span className="text-[12px] font-Lato text-[#777777]">Brand Logo</span>
//               <div className="mt-2">
//                 <div
//                   style={{
//                     width: "60px",
//                     height: "60px",
//                     overflow: "hidden",
//                     borderRadius: "50%",
//                   }}
//                 >
//                   <img
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                     }}
//                     src={`${data?.logoUrl}`}
//                     alt="Brand Logo"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-col border-[#E8E8E8] border-l-[1px] py-5 px-5 mt-2 mb-2">
//             <LabelContainer
//               label="Brand Name"
//               info={data?.brandName}
//               className="text-[12px]"
//               classNameInfo="!text-[14px]"
//             />
//           </div>

//           {data?.facebookUrl && (
//             <div className="flex flex-col py-5 px-5 border-l-[1px] mt-2 mb-2">
//               <LabelContainer
//                 label="Facebook URL"
//                 info={data?.facebookUrl}
//                 className="text-[12px]"
//                 classNameInfo="!text-[14px]"
//               />
//             </div>
//           )}

//           {data?.instagramUrl && (
//             <div className="flex flex-col border-[#E8E8E8] border-l-[1px] py-5 px-5 mt-2 mb-2">
//               <LabelContainer
//                 label="Instagram URL"
//                 info={data?.instagramUrl}
//                 className="text-[12px]"
//                 classNameInfo="!text-[14px]"
//               />
//             </div>
//           )}

//           {data?.whatsappUrl && (
//             <div className="flex flex-col border-l-[1px] py-5 px-5 mt-2 mb-2">
//               <LabelContainer
//                 label="WhatsApp URL"
//                 info={data?.whatsappUrl}
//                 className="text-[12px]"
//                 classNameInfo="!text-[14px]"
//               />
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileBrandingDetails;


import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import LabelContainer from "../../../components/LabelContainer";
import EditIcon from "../../../assets/Profile/EditIcon.svg";

interface BrandingDetailsType {
  logoUrl?: string;
  brandName?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  whatsappUrl?: string;
}

interface ProfileBrandingDetailsProps {
  BrandingDetails?: BrandingDetailsType;
  brandingModal?: boolean;
  setBrandingModal?: () => void;
}

const ProfileBrandingDetails: React.FC<ProfileBrandingDetailsProps> = ({
  BrandingDetails,
  setBrandingModal,
}) => {
  const [data, setData] = useState<BrandingDetailsType | undefined>(BrandingDetails);
  
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 768px)" });
  
  useEffect(() => {
    setData(BrandingDetails);
  }, [BrandingDetails]);

  const BrandLogo: React.FC = () => (
    <div className="flex flex-col">
      <span className="text-xs text-gray-500 font-medium mb-2">Brand Logo</span>
      <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
        {data?.logoUrl ? (
          <img
            className="w-full h-full object-cover"
            src={data?.logoUrl}
            alt={`${data?.brandName || 'Brand'} logo`}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null; // Prevent infinite loop
              target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="%23CCCCCC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="12" cy="10" r="3"></circle><path d="M17 17.5c-1.4-1-3.1-1.5-5-1.5s-3.6.5-5 1.5"></path></svg>';
            }}
          />
        ) : (
          <svg 
            className="w-10 h-10 text-gray-300"
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="12" cy="10" r="3"></circle>
            <path d="M17 17.5c-1.4-1-3.1-1.5-5-1.5s-3.6.5-5 1.5"></path>
          </svg>
        )}
      </div>
    </div>
  );

  interface SocialLinkProps {
    label: string;
    url?: string;
    className?: string;
  }

  const SocialLink: React.FC<SocialLinkProps> = ({ label, url, className = "" }) => (
    url ? (
      <div className={`flex flex-col ${className}`}>
        <LabelContainer
          label={label}
          info={url}
          className="text-xs text-gray-500"
          classNameInfo="text-sm text-gray-800 truncate hover:text-clip"
        />
      </div>
    ) : null
  );

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mt-4 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center h-11 bg-gray-100 px-4">
        <h3 className="text-base font-semibold text-gray-800">
          Branding Details
        </h3>
        <button
          onClick={setBrandingModal}
          className="p-2 rounded-md hover:bg-gray-200 transition-colors"
          aria-label="Edit branding details"
        >
          <img src={EditIcon} alt="Edit" className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      {isDesktop ? (
        // Desktop Layout
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          <div className="p-4">
            <BrandLogo />
          </div>

          <div className="p-4">
            <LabelContainer
              label="Brand Name"
              info={data?.brandName}
              className="text-xs text-gray-500"
              classNameInfo="text-sm text-gray-800"
            />
          </div>

          <SocialLink 
            label="Facebook URL" 
            url={data?.facebookUrl}
            className="p-4 border-t md:border-t-0 md:border-l border-gray-200"
          />

          <SocialLink 
            label="Instagram URL" 
            url={data?.instagramUrl}
            className="p-4 border-t md:border-t-0 md:border-l border-gray-200"
          />

          <SocialLink 
            label="WhatsApp URL" 
            url={data?.whatsappUrl}
            className="p-4 border-t md:border-t-0 md:border-l border-gray-200"
          />
        </div>
      ) : (
        // Mobile/Tablet Layout
        <div className="divide-y divide-gray-200">
          <div className="grid grid-cols-2 p-4">
            <div>
              <BrandLogo />
            </div>
            <div className="pl-3 border-l border-gray-200">
              <LabelContainer
                label="Brand Name"
                info={data?.brandName}
                className="text-xs text-gray-500"
                classNameInfo="text-sm text-gray-800"
              />
            </div>
          </div>

          {(data?.facebookUrl || data?.instagramUrl) && (
            <div className="grid grid-cols-2 p-4">
              <SocialLink 
                label="Facebook URL" 
                url={data?.facebookUrl} 
              />
              <SocialLink 
                label="Instagram URL" 
                url={data?.instagramUrl}
                className="pl-3 border-l border-gray-200" 
              />
            </div>
          )}

          {data?.whatsappUrl && (
            <div className="p-4">
              <SocialLink 
                label="WhatsApp URL" 
                url={data?.whatsappUrl} 
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileBrandingDetails;
