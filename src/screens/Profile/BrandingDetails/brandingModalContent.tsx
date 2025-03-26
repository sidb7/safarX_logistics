import React, { useState } from "react";
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

  // State to track URL validation errors
  const [urlErrors, setUrlErrors] = useState({
    facebookUrl: "",
    instagramUrl: "",
    whatsappUrl: ""
  });

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

  // URL validation functions
  const validateFacebookUrl = (url: string) => {
    if (!url) return true; // Empty URL is valid (optional field)
    
    // Normalize the URL by adding https:// if missing
    let normalizedUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      normalizedUrl = 'https://' + url;
    }
    
    const regex = /^https?:\/\/(www\.)?facebook\.com\/[\w\-.]+\/?$/;
    
    // Update the state with normalized URL if valid
    if (regex.test(normalizedUrl)) {
      // Only normalize if the validation passes
      if (normalizedUrl !== url) {
        setTimeout(() => {
          setBrandingModalDetails({
            ...brandingModalDetails,
            facebookUrl: normalizedUrl
          });
        }, 0);
      }
      return true;
    }
    return false;
  };

  const validateInstagramUrl = (url: string) => {
    if (!url) return true; // Empty URL is valid (optional field)
    
    // Normalize the URL by adding https:// if missing
    let normalizedUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      normalizedUrl = 'https://' + url;
    }
    
    const regex = /^https?:\/\/(www\.)?instagram\.com\/[\w\-.]+\/?$/;
    
    // Update the state with normalized URL if valid
    if (regex.test(normalizedUrl)) {
      // Only normalize if the validation passes
      if (normalizedUrl !== url) {
        setTimeout(() => {
          setBrandingModalDetails({
            ...brandingModalDetails,
            instagramUrl: normalizedUrl
          });
        }, 0);
      }
      return true;
    }
    return false;
  };

  const validateWhatsappUrl = (url: string) => {
    if (!url) return true; // Empty URL is valid (optional field)
    
    // Normalize the URL by adding https:// if missing
    let normalizedUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      normalizedUrl = 'https://' + url;
    }
    
    // Extract the number from the URL for additional validation
    let phoneNumber = "";
    
    // Try to extract from wa.me format
    const waMatch = normalizedUrl.match(/^https?:\/\/(www\.)?wa\.me\/(\d+)\/?$/);
    if (waMatch && waMatch[2]) {
      phoneNumber = waMatch[2];
    }
    
    // Try to extract from whatsapp.com format
    const whatsappMatch = normalizedUrl.match(/^https?:\/\/(www\.|api\.)?whatsapp\.com\/send\?phone=(\d+)$/);
    if (whatsappMatch && whatsappMatch[2]) {
      phoneNumber = whatsappMatch[2];
    }
    
    // Check if number is 10 digits and doesn't start with 0-6
    if (phoneNumber) {
      const isValidLength = phoneNumber.length === 10;
      const startsWithValidDigit = !(/^[0-6]/).test(phoneNumber.charAt(0));
      
      if (isValidLength && startsWithValidDigit) {
        // Only normalize if the validation passes
        if (normalizedUrl !== url) {
          setTimeout(() => {
            setBrandingModalDetails({
              ...brandingModalDetails,
              whatsappUrl: normalizedUrl
            });
          }, 0);
        }
        return true;
      }
      return false;
    }
    
    return false;
  };

  // Handle change events for URL inputs with real-time validation
  const handleFacebookChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setBrandingModalDetails({
      ...brandingModalDetails,
      facebookUrl: value
    });
    
    // Clear error if the field is empty or valid
    if (!value || validateFacebookUrl(value)) {
      setUrlErrors({
        ...urlErrors,
        facebookUrl: ""
      });
    } else {
      setUrlErrors({
        ...urlErrors,
        facebookUrl: "Invalid Facebook URL format. Expected: www.facebook.com/username"
      });
    }
  };

  const handleInstagramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setBrandingModalDetails({
      ...brandingModalDetails,
      instagramUrl: value
    });
    
    // Clear error if the field is empty or valid
    if (!value || validateInstagramUrl(value)) {
      setUrlErrors({
        ...urlErrors,
        instagramUrl: ""
      });
    } else {
      setUrlErrors({
        ...urlErrors,
        instagramUrl: "Invalid Instagram URL format. Expected: www.instagram.com/username"
      });
    }
  };

  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setBrandingModalDetails({
      ...brandingModalDetails,
      whatsappUrl: value
    });
    
    // Clear error if the field is empty or valid
    if (!value || validateWhatsappUrl(value)) {
      setUrlErrors({
        ...urlErrors,
        whatsappUrl: ""
      });
    } else {
      setUrlErrors({
        ...urlErrors,
        whatsappUrl: "Expected: wa.me/number or api.whatsapp.com/send?phone=number (10-digit number starting with 7-9)"
      });
    }
  };

  // Handle blur events for URL validation (keep these for initial blur validation)
  const handleFacebookBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value.trim();
    
    // Clear the error if field is empty
    if (!url) {
      setUrlErrors({
        ...urlErrors,
        facebookUrl: ""
      });
      return;
    }
    
    if (!validateFacebookUrl(url)) {
      setUrlErrors({
        ...urlErrors,
        facebookUrl: "Invalid Facebook URL format. Expected: www.facebook.com/username"
      });
    } else {
      setUrlErrors({
        ...urlErrors,
        facebookUrl: ""
      });
    }
  };

  const handleInstagramBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value.trim();
    
    // Clear the error if field is empty
    if (!url) {
      setUrlErrors({
        ...urlErrors,
        instagramUrl: ""
      });
      return;
    }
    
    if (!validateInstagramUrl(url)) {
      setUrlErrors({
        ...urlErrors,
        instagramUrl: "Invalid Instagram URL format. Expected: www.instagram.com/username"
      });
    } else {
      setUrlErrors({
        ...urlErrors,
        instagramUrl: ""
      });
    }
  };

  const handleWhatsappBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value.trim();
    
    // Clear the error if field is empty
    if (!url) {
      setUrlErrors({
        ...urlErrors,
        whatsappUrl: ""
      });
      return;
    }
    
    if (!validateWhatsappUrl(url)) {
      setUrlErrors({
        ...urlErrors,
        whatsappUrl: "Expected: wa.me/number or api.whatsapp.com/send?phone=number (10-digit number starting with 7-9)"
      });
    } else {
      setUrlErrors({
        ...urlErrors,
        whatsappUrl: ""
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
            className="font-Open"
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

        {/* Social Media URL Fields with real-time validation */}
        <div>
          <CustomInputBox
            label="Facebook URL"
            onChange={handleFacebookChange}
            onBlur={handleFacebookBlur}
            value={brandingModalDetails.facebookUrl || ""}
            // placeholder="www.facebook.com/username"
            errorMessage={urlErrors.facebookUrl || false}
          />
        </div>

        <div>
          <CustomInputBox
            label="Instagram URL"
            onChange={handleInstagramChange}
            onBlur={handleInstagramBlur}
            value={brandingModalDetails.instagramUrl || ""}
            // placeholder="www.instagram.com/username"
            errorMessage={urlErrors.instagramUrl || false}
          />
        </div>

        <div>
          <CustomInputBox
            label="WhatsApp URL"
            onChange={handleWhatsappChange}
            onBlur={handleWhatsappBlur}
            value={brandingModalDetails.whatsappUrl || ""}
            // placeholder="wa.me/number"
            errorMessage={urlErrors.whatsappUrl || false}
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
            className="!w-[100px] !rounded bg-[#4D83FF] text-white"
            disabled={urlErrors.facebookUrl || urlErrors.instagramUrl || urlErrors.whatsappUrl ? true : false}
          />
        </div>
      </div>
    </div>
  );
};

export default BrandingModalContent;