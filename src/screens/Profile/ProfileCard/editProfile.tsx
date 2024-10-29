import React, { useState ,useRef} from 'react';
import CustomInputBox from "../../../components/Input";
import cameraIcon from "../../../assets/camera.svg";
import { POST } from "../../../utils/webService";
import { UPDATE_SINGLE_SELLER } from "../../../utils/ApiUrls";
import toast from "react-hot-toast";
import { Spinner } from "../../../components/Spinner";
import OneButton from "../../../components/Button/OneButton";
import { textRegex,emailRegex,mobileRegex } from "../../../utils/regexCheck";

interface EditProfileProps {
  onClose: (value: boolean) => void;
  getProfileData: () => void;
  ProfileDetails: {
    sellerId: string;
    profileImageUrl:string;
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: string;
    privateCompany: {
      accountDetails: {
        contactNumber: string;
        email: string;
      };
      operationDetails: {
        contactNumber: string;
        email: string;
      };
    };
  };
}

const EditProfile: React.FC<EditProfileProps> = ({ onClose, getProfileData, ProfileDetails }) => {
  const [profileData, setProfileData] = useState({
    sellerID: ProfileDetails?.sellerId,
    profileImageUrl : ProfileDetails?.profileImageUrl,
    firstName: ProfileDetails?.firstName,
    lastName: ProfileDetails?.lastName,
    verifiedEmailID: ProfileDetails?.email,
    verifiedContactNumber: ProfileDetails?.contactNumber,
    accountsMailID: ProfileDetails?.privateCompany?.accountDetails?.email || '',
    accountsContactNo: ProfileDetails?.privateCompany?.accountDetails?.contactNumber || '',
    operationsMailID: ProfileDetails?.privateCompany?.operationDetails?.email || '',
    operationsContactNo: ProfileDetails?.privateCompany?.operationDetails?.contactNumber || '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);



  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   console.log('namesdsd',name, value);
    
  //   setProfileData(prevData => ({ ...prevData, [name]: value }));
  //   if (name.includes('MailID') && !/\S+@\S+\.\S+/.test(value)) {
  //     setErrors(prevErrors => ({ ...prevErrors, [name]: 'Please enter a valid email address 1' }));
  //   }
  //   if (name.includes('ContactNo') && !/\S+@\S+\.\S+/.test(value)) {
  //     setErrors(prevErrors => ({ ...prevErrors, [name]: 'Please enter a valid 10 digit contact number' }));
  //   }
      
  // };

  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // For contact number fields, only allow numbers
    if (name.includes('ContactNo')) {
      // Remove any non-digit characters and limit to 10 digits
      const numbersOnly = value.replace(/\D/g, '').slice(0, 10);
      
      setProfileData(prevData => ({ ...prevData, [name]: numbersOnly }));
      
      // Validate the number
      if (numbersOnly.length > 0) {
        const validStartDigits = /^[6-9]\d{9}$/;
        if (!validStartDigits.test(numbersOnly)) {
          setErrors(prevErrors => ({ 
            ...prevErrors, 
            [name]: 'Please enter a valid 10 digit number' 
          }));
        } else {
          setErrors(prevErrors => {
            const newErrors = { ...prevErrors };
            delete newErrors[name];
            return newErrors;
          });
        }
      } else {
        setErrors(prevErrors => {
          const newErrors = { ...prevErrors };
          delete newErrors[name];
          return newErrors;
        });
      }
      return;
    }

    // For non-contact number fields, handle normally
    setProfileData(prevData => ({ ...prevData, [name]: value }));
  
    // Clear error when field is empty
    if (value.trim() === '') {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
      return;
    }
  
    // Validate email fields
    if (name.includes('MailID')) {
      if (!emailRegex.test(value)) {
        setErrors(prevErrors => ({ 
          ...prevErrors, 
          [name]: 'Please enter a valid email address' 
        }));
      } else {
        setErrors(prevErrors => {
          const newErrors = { ...prevErrors };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  };


  const validateField = (name: string, value: string) => {
    // if (!value) return `Please enter your ${name.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
    if (value.trim() === '') return ''; // Don't show error for empty fields

    if(name === "accountsMailID" && value===""){
      return '';
    }else if (name.includes('MailID') && !/\S+@\S+\.\S+/.test(value)) return 'Please enter a valid email address';

    if (name.includes('ContactNo') && !/^[6-9]\d{9}$/.test(value)) return 'Please enter a valid 10 digit contact number';
    return '';
  };

  const handleInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // console.log('name',name, value)
    const error = validateField(name, value);
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setProfileData(prevData => ({ ...prevData, profileImageUrl: reader.result as string }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  //   setShowUploadModal(false);
  // };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload only image files');
      return;
    }
  
    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('Image size must be less than 5MB');
      return;
    }
  
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      
      img.onload = () => {
        // Check image dimensions
        if (img.height > 200 || img.width > 700) {
          toast.error(
            "Image size must be no larger than 200 pixels in height and 700 pixels in width. Please resize your image and try again."
          );
          setShowUploadModal(false);
          return;
        }
  
        // Create canvas for maintaining aspect ratio
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          toast.error('Unable to process image');
          return;
        }
  
        // Determine the target dimensions while maintaining aspect ratio
        let targetWidth = img.width;
        let targetHeight = img.height;
  
        // Determine size of the square canvas for circular display
        const size = Math.max(targetWidth, targetHeight);
        canvas.width = size;
        canvas.height = size;
  
        // Fill with transparency
        ctx.fillStyle = 'rgba(0,0,0,0)';
        ctx.fillRect(0, 0, size, size);
  
        // Calculate positioning to center the image
        const offsetX = (size - targetWidth) / 2;
        const offsetY = (size - targetHeight) / 2;
  
        // Draw image centered on canvas
        ctx.drawImage(img, offsetX, offsetY, targetWidth, targetHeight);
  
        // Convert to base64
        const resizedImage = canvas.toDataURL('image/png', 1.0);
        
        setProfileData(prevData => ({ ...prevData, profileImageUrl: resizedImage }));
        setShowUploadModal(false);
      };
  
      img.onerror = () => {
        toast.error('Error loading image');
        setShowUploadModal(false);
      };
  
      img.src = event.target?.result as string;
    };
  
    reader.onerror = () => {
      toast.error('Error reading file');
      setShowUploadModal(false);
    };
  
    reader.readAsDataURL(file);
  };


  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const img = new Image();
  //     img.onload = () => {
  //       if (img.height > 200 || img.width > 700) {
  //         toast.error(
  //           "Image size must be no larger than 200 pixels in height and 700 pixels in width. Please resize your image and try again."
  //         );
  //         setShowUploadModal(false);
  //         return;
  //       }
        
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         setProfileData(prevData => ({ ...prevData, profileImageUrl: reader.result as string }));
  //       };
  //       reader.readAsDataURL(file);
  //       setShowUploadModal(false);
  //     };
  //     img.src = URL.createObjectURL(file);
  //   }
  // };

  const handleSave = async () => {
    const newErrors: { [key: string]: string } = {};
    ['accountsMailID', 'accountsContactNo', 'operationsMailID', 'operationsContactNo'].forEach((key) => {
      const error = validateField(key, profileData[key as keyof typeof profileData]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please fix the validation errors before saving');
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await POST(UPDATE_SINGLE_SELLER, {
        data: {
          "privateCompany.accountDetails.contactNumber": profileData.accountsContactNo,
          "privateCompany.accountDetails.email": profileData.accountsMailID,
          "privateCompany.operationDetails.contactNumber": profileData.operationsContactNo,
          "privateCompany.operationDetails.email": profileData.operationsMailID,
          "profileImageUrl":profileData.profileImageUrl,
        }
      });
      if (data?.success) {
        onClose(false);
        getProfileData();
        toast.success('Profile updated successfully');
      } else {
        toast.error(data?.message || 'Failed to update profile');
      }
    } catch (err) {
      toast.error('An error occurred while updating the profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg w-full h-full flex flex-col">
      <div className='p-4 flex-grow overflow-auto'>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <button onClick={() => onClose(false)}>X</button>
        </div>

        {/* <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
            <img src={cameraIcon} alt="Profile" />
          </div>
          <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer">
            <img src={cameraIcon} alt="Change" />
          </div>
        </div> */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {profileData.profileImageUrl ? (
              // <img src={profileData.profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
              <img 
              src={profileData.profileImageUrl} 
              alt="Profile" 
              className="absolute w-full h-full object-cover"
              style={{
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
            ) : (
              <img src={cameraIcon} alt="Profile" />
            )}
          </div>
          <div 
            className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer"
            onClick={() => setShowUploadModal(true)}
          >
            <img src={cameraIcon} alt="Change" />
          </div>
        </div>

        <form className="space-y-4">
          <CustomInputBox
            label="Seller ID"
            name="sellerID"
            value={profileData.sellerID}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            containerStyle="mb-4"
            inputClassName="w-full"
            isRequired={true}
            inputError={!!errors.sellerID}
            errorMessage={errors.sellerID}
            isDisabled
          />

          <CustomInputBox
            label="First Name"
            name="firstName"
            value={profileData.firstName}
            onChange={handleInputChange}
            onBlur={()=>{}}
            containerStyle="mb-4"
            inputClassName="w-full"
            isRequired={true}
            // inputError={!!errors.firstName}
            errorMessage={errors.firstName}
            isDisabled
          />accountsgmail

          <CustomInputBox
            label="Last Name"
            name="lastName"
            value={profileData.lastName}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            containerStyle="mb-4"
            inputClassName="w-full"
            isRequired={true}
            inputError={!!errors.lastName}
            errorMessage={errors.lastName}
            isDisabled
          />

          <CustomInputBox
            label="Verified Email ID"
            name="verifiedEmailID"
            value={profileData.verifiedEmailID}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            containerStyle="mb-4"
            inputClassName="w-full"
            isRequired={true}
            inputError={!!errors.verifiedEmailID}
            errorMessage={errors.verifiedEmailID}
            inputType="email"
            isDisabled
          />

          <CustomInputBox
            label="Verified Contact Number"
            name="verifiedContactNumber"
            value={profileData.verifiedContactNumber}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            containerStyle="mb-4"
            inputClassName="w-full"
            isRequired={true}
            inputError={!!errors.verifiedContactNumber}
            errorMessage={errors.verifiedContactNumber}
            inputType="tel"
            isDisabled
          />

          <CustomInputBox
            label="Accounts Mail ID"
            name="accountsMailID"
            value={profileData.accountsMailID}
            onChange={handleInputChange}
            onBlur={()=>{}}
            containerStyle="mb-4"
            inputClassName="w-full"
            isRequired={true}
            // inputError={!!errors.accountsMailID}
            errorMessage={errors.accountsMailID}
            inputType="email"
          />

          <CustomInputBox
            label="Accounts Contact No"
            name="accountsContactNo"
            value={profileData.accountsContactNo}
            onChange={handleInputChange}
            onBlur={()=>{}}
            containerStyle="mb-4"
            inputClassName="w-full"
            isRequired={true}
            // inputError={!!errors.accountsContactNo}
            errorMessage={errors.accountsContactNo}
            inputType="tel"
          />

          <CustomInputBox
            label="Operations Mail ID"
            name="operationsMailID"
            value={profileData.operationsMailID}
            onChange={handleInputChange}
            onBlur={()=>{}}
            containerStyle="mb-4"
            inputClassName="w-full"
            isRequired={true}
            // inputError={!!errors.operationsMailID}
            errorMessage={errors.operationsMailID}
            inputType="email"
          />

          <CustomInputBox
            label="Operations Contact No"
            name="operationsContactNo"
            value={profileData.operationsContactNo}
            onChange={handleInputChange}
            onBlur={()=>{}}
            containerStyle="mb-4"
            inputClassName="w-full"
            isRequired={true}
            // inputError={!!errors.operationsContactNo}
            errorMessage={errors.operationsContactNo}
            inputType="tel"
          />
        </form>
      </div>

      <div className="mt-auto p-4 border-t-2 border-gray-200 flex justify-end items-center w-full">
        <OneButton
          text="Back"
          onClick={() => onClose(false)}
          className="px-4 py-2 mr-4"
          variant="secondary"
        />
        {isLoading ? (
          <div className="flex justify-center items-center px-4 py-2">
            <Spinner />
          </div>
        ) : (
          <OneButton
            text="Save"
            onClick={handleSave}
            className="px-4 py-2"
            variant="primary"
          />
        )}
      </div>

      {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Upload Profile Picture</h3>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
                className="mb-4"
              />
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-gray-200 rounded-lg mr-2"
                  onClick={() => setShowUploadModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default EditProfile;