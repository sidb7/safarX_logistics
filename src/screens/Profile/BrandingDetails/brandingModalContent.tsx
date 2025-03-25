// import React from "react";
// import WebCloseIcon from "../../../assets/CloseIcon.svg";
// import CustomInputBox from "../../../components/Input";
// import CustomInputWithFileUpload from "../../../components/InputBox/InputWithFileUpload";
// import CustomButton from "../../../components/Button";

// interface ITypeProps {
//   setBrandingModal?: any;
//   brandingModalDetails?: any;
//   setBrandingModalDetails: any;
//   updateBrandingDetails: any;
//   BrandingDetails?: any;
// }

// const BrandingModalContent = (props: ITypeProps) => {
//   const {
//     setBrandingModal,
//     brandingModalDetails,
//     setBrandingModalDetails,
//     updateBrandingDetails,
//   } = props;

//   const handleImageChange = (event: any) => {
//     const file = event.target.files[0];

//     if (file) {
//       const url: any = URL.createObjectURL(file) || null;
//       setBrandingModalDetails({
//         ...brandingModalDetails,
//         image: event.target.files[0].name,
//         imageUrl: url,
//         file: file,
//       });
//     }
//   };

//   return (
//     <div className="flex flex-col ">
//       <div className="flex flex-col p-5 gap-y-5">
//         <div className="flex items-center justify-between">
//           <p className="text-xl font-Lato font-semibold text-[#1C1C1C]">
//             Edit Branding Details
//           </p>

//           <img
//             src={WebCloseIcon}
//             alt=""
//             className="cursor-pointer"
//             onClick={setBrandingModal}
//           />
//         </div>

//         <div>
//           {brandingModalDetails?.imageUrl && (
//             <div className="w-full h-[200px] overflow-hidden flex justify-center items-center mb-5">
//               <img
//                 src={brandingModalDetails?.imageUrl}
//                 alt=""
//                 className="w-[700px] h-[200px] object-contain"
//                 style={{
//                   border: "1px solid #cccccc",
//                   borderRadius: "4px",
//                 }}
//               />
//             </div>
//           )}

//           <CustomInputWithFileUpload
//             label="Upload logo"
//             className="font-Open  "
//             inputClassName="!w-full"
//             type="file"
//             onChange={handleImageChange}
//             isRequired={false}
//           />
//         </div>

//         <div>
//           <CustomInputBox
//             label="Brand Name"
//             onChange={(e: any) =>
//               setBrandingModalDetails({
//                 ...brandingModalDetails,
//                 brandName: e.target.value,
//               })
//             }
//             value={brandingModalDetails.brandName}
//           />
//         </div>

//         {/* Social Media URL Fields - these are the new additions */}
//         <div>
//           <CustomInputBox
//             label="Facebook URL"
//             onChange={(e: any) =>
//               setBrandingModalDetails({
//                 ...brandingModalDetails,
//                 facebookUrl: e.target.value,
//               })
//             }
//             value={brandingModalDetails.facebookUrl || ""}
//             placeholder=""
//           />
//         </div>

//         <div>
//           <CustomInputBox
//             label="Instagram URL"
//             onChange={(e: any) =>
//               setBrandingModalDetails({
//                 ...brandingModalDetails,
//                 instagramUrl: e.target.value,
//               })
//             }
//             value={brandingModalDetails.instagramUrl || ""}
//             placeholder=""
//           />
//         </div>

//         <div>
//           <CustomInputBox
//             label="WhatsApp URL"
//             onChange={(e: any) =>
//               setBrandingModalDetails({
//                 ...brandingModalDetails,
//                 whatsappUrl: e.target.value,
//               })
//             }
//             value={brandingModalDetails.whatsappUrl || ""}
//             placeholder=""
//           />
//         </div>
//       </div>

//       <div
//         className="hidden lg:flex justify-end shadow-lg border-[1px]  bg-[#FFFFFF] p-5 rounded-tr-[32px] rounded-tl-[32px] fixed bottom-0 "
//         style={{ width: "-webkit-fill-available" }}
//       >
//         <div className="flex h-full w-full justify-end gap-x-6">
//           <CustomButton
//             text="Cancel"
//             onClick={setBrandingModal}
//             className="!w-[100px] !rounded"
//           />
//           <CustomButton
//             text="Save"
//             onClick={updateBrandingDetails}
//             className="!w-[100px] !rounded"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BrandingModalContent;


import React from "react";
import WebCloseIcon from "../../../assets/CloseIcon.svg";
import CustomInputBox from "../../../components/Input";
import CustomInputWithFileUpload from "../../../components/InputBox/InputWithFileUpload";
import CustomButton from "../../../components/Button";

interface ITypeProps {
  setBrandingModal?: any;
  brandingModalDetails?: any;
  setBrandingModalDetails: any;
  updateBrandingDetails: any;
  BrandingDetails?: any;
}

const BrandingModalContent = (props: ITypeProps) => {
  const {
    setBrandingModal,
    brandingModalDetails,
    setBrandingModalDetails,
    updateBrandingDetails,
  } = props;

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const url: any = URL.createObjectURL(file) || null;
      setBrandingModalDetails({
        ...brandingModalDetails,
        image: event.target.files[0].name,
        imageUrl: url,
        file: file,
      });
    }
  };

  return (
    <div className="flex flex-col ">
      <div className="flex flex-col p-5 gap-y-5">
        <div className="flex items-center justify-between">
          <p className="text-xl font-Lato font-semibold text-[#1C1C1C]">
            Edit Branding Details
          </p>

          <img
            src={WebCloseIcon}
            alt=""
            className="cursor-pointer"
            onClick={setBrandingModal}
          />
        </div>

        <div>
          {/* Logo Preview Section with Improved Handling */}
          <div 
            className="w-full h-[200px] overflow-hidden flex justify-center items-center mb-5"
            style={{
              border: "1px solid #cccccc",
              borderRadius: "4px",
              background: "#f9f9f9"
            }}
          >
            {brandingModalDetails?.imageUrl && brandingModalDetails.imageUrl !== "" ? (
              <img
                src={brandingModalDetails.imageUrl}
                alt="Brand Logo"
                className="w-[700px] h-[200px] object-contain"
                onError={(e) => {
                  // If image fails to load, replace with placeholder
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  const placeholder = parent ? parent.querySelector('.placeholder-content') as HTMLElement : null;
                  if (placeholder) {
                    placeholder.style.display = 'flex';
                  }
                }}
              />
            ) : null}
            
            {/* Placeholder content - shown by default when no image or on error */}
            <div 
              className={`placeholder-content flex flex-col items-center justify-center text-gray-400 ${brandingModalDetails?.imageUrl && brandingModalDetails.imageUrl !== "" ? 'hidden' : 'flex'}`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="64" 
                height="64" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              <p className="mt-2 text-sm">No logo uploaded</p>
              <p className="text-xs">Upload your brand logo below</p>
            </div>
          </div>

          <CustomInputWithFileUpload
            label="Upload logo"
            className="font-Open  "
            inputClassName="!w-full"
            type="file"
            onChange={handleImageChange}
            isRequired={false}
          />
          <p className="text-xs text-gray-500 mt-1">Image size must be no larger than 200 pixels in height and 700 pixels in width</p>
        </div>

        <div>
          <CustomInputBox
            label="Brand Name"
            onChange={(e: any) =>
              setBrandingModalDetails({
                ...brandingModalDetails,
                brandName: e.target.value,
              })
            }
            value={brandingModalDetails.brandName}
          />
        </div>

        {/* Social Media URL Fields - these are the new additions */}
        <div>
          <CustomInputBox
            label="Facebook URL"
            onChange={(e: any) =>
              setBrandingModalDetails({
                ...brandingModalDetails,
                facebookUrl: e.target.value,
              })
            }
            value={brandingModalDetails.facebookUrl || ""}
          />
        </div>

        <div>
          <CustomInputBox
            label="Instagram URL"
            onChange={(e: any) =>
              setBrandingModalDetails({
                ...brandingModalDetails,
                instagramUrl: e.target.value,
              })
            }
            value={brandingModalDetails.instagramUrl || ""}
          />
        </div>

        <div>
          <CustomInputBox
            label="WhatsApp URL"
            onChange={(e: any) =>
              setBrandingModalDetails({
                ...brandingModalDetails,
                whatsappUrl: e.target.value,
              })
            }
            value={brandingModalDetails.whatsappUrl || ""}
          />
        </div>
      </div>

      <div
        className="hidden lg:flex justify-end shadow-lg border-[1px]  bg-[#FFFFFF] p-5 rounded-tr-[32px] rounded-tl-[32px] fixed bottom-0 "
        style={{ width: "-webkit-fill-available" }}
      >
        <div className="flex h-full w-full justify-end gap-x-6">
          <CustomButton
            text="Cancel"
            onClick={setBrandingModal}
            className="!w-[100px] !rounded"
          />
          <CustomButton
            text="Save"
            onClick={updateBrandingDetails}
            className="!w-[100px] !rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default BrandingModalContent;