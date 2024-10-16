// import React, { useState } from "react";
// import CustomInputBox from "../../../components/Input";
// import { textRegex } from "../../../utils/regexCheck";
// import InfoCircle from "../../../assets/info-circle.svg";
// import OneButton from "../../../components/Button/OneButton";
// import { Spinner } from "../../../components/Spinner";
// import { POST } from "../../../utils/webService";
// import {
//   UPDATE_SELLER_NAME,
//   UPDATE_SINGLE_SELLER,
// } from "../../../utils/ApiUrls";
// import toast from "react-hot-toast";

// function EditProfile({ onClose, getProfileData }: any) {
//   const [sellerData, setsellerData] = useState({
//     firstName: "",
//     lastName: "",
//   });

//   const [isLoading, setIsLoading] = useState(false);

//   const [signUpError, setSignUpError] = useState<any>({
//     firstName: "",
//     lastName: "",
//   });

//   const UpdateProfile = async () => {
//     const payload = {
//       firstName: sellerData.firstName,
//       lastName: sellerData.lastName,
//     };
//     setIsLoading(true);
//     try {
//       const { data } = await POST(UPDATE_SELLER_NAME, payload);
//       if (data?.success) {
//         onClose(false);
//         getProfileData();
//       } else {
//         toast.error(data?.message);
//       }
//       setIsLoading(false);
//     } catch (err) {
//       setIsLoading(false);
//     }
//   };
//   //UPDATE_SINGLE_SELLER
//   return (
//     <div className="py-4">
//       <div className="mt-2 mb-4 mx-4 text-[24px]">UPDATE PROFILE</div>
//       <div className="flex flex-col mx-4 gap-y-6">
//         <div>
//           <CustomInputBox
//             containerStyle=""
//             // placeholder=""
//             id="fName"
//             //commented as by default placeholder text is getting top of the input box
//             // tempLabel={true}
//             label="First Name"
//             maxLength={16}
//             onChange={(e) => {
//               setSignUpError({
//                 ...signUpError,
//                 firstName: "",
//               });
//               setsellerData({
//                 ...sellerData,
//                 firstName: e.target.value,
//               });
//             }}
//             onBlur={(e) => {
//               if (!sellerData?.firstName) {
//                 setSignUpError({
//                   ...signUpError,
//                   firstName: "Please Enter Your First Name",
//                 });
//               } else if (!textRegex.test(e.target.value)) {
//                 setSignUpError({
//                   ...signUpError,
//                   firstName:
//                     "Enter Valid name(numbers, special characters not allowed) ",
//                 });
//               } else {
//                 setSignUpError({
//                   ...signUpError,
//                   firstName: "",
//                 });
//               }
//             }}
//           />

//           {signUpError.firstName !== "" && (
//             <div className="flex items-center gap-x-1 mt-1">
//               <img src={InfoCircle} alt="" width={10} height={10} />
//               <span className="font-normal text-[#F35838] text-xs leading-3">
//                 {signUpError.firstName}
//               </span>
//             </div>
//           )}
//         </div>
//         <div>
//           <CustomInputBox
//             containerStyle=""
//             //commented as by default placeholder text is getting top of the input box
//             // tempLabel={true}
//             label="Last Name"
//             id="lName"
//             maxLength={16}
//             // placeholder=""
//             onChange={(e) => {
//               setSignUpError({
//                 ...signUpError,
//                 lastName: "",
//               });
//               setsellerData({
//                 ...sellerData,
//                 lastName: e.target.value,
//               });
//             }}
//             onBlur={(e) => {
//               if (!sellerData?.lastName) {
//                 setSignUpError({
//                   ...signUpError,
//                   lastName: "Please Enter Your Last Name",
//                 });
//               } else if (!textRegex.test(e.target.value)) {
//                 setSignUpError({
//                   ...signUpError,
//                   lastName:
//                     "Enter Valid name(numbers, special characters not allowed) ",
//                 });
//               } else {
//                 setSignUpError({
//                   ...signUpError,
//                   lastName: "",
//                 });
//               }
//             }}
//           />
//           {signUpError.lastName !== "" && (
//             <div className="flex items-center gap-x-1 mt-1">
//               <img src={InfoCircle} alt="" width={10} height={10} />
//               <span className="font-normal text-[#F35838] text-xs leading-3">
//                 {signUpError.lastName}
//               </span>
//             </div>
//           )}
//         </div>
//       </div>
//       <div
//         className="lg:flex justify-end  shadow-lg border-[1px]  bg-[#FFFFFF] px-6 py-4  rounded-tr-[32px] rounded-tl-[32px]  gap-x-5  fixed bottom-0 "
//         style={{ width: "-webkit-fill-available" }}
//       >
//         {isLoading ? (
//           <div className="flex justify-center items-center lg:!py-2 lg:!px-4">
//             <Spinner />
//           </div>
//         ) : (
//           <>
//             <OneButton
//               text="Update"
//               onClick={UpdateProfile}
//               className=" px-5  "
//               variant="primary"
//             />
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default EditProfile;


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



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({ ...prevData, [name]: value }));
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  const validateField = (name: string, value: string) => {
    if (!value) return `Please enter your ${name.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
    if (name.includes('MailID') && !/\S+@\S+\.\S+/.test(value)) return 'Please enter a valid email address';
    if (name.includes('ContactNo') && !/^[6-9]\d{9}$/.test(value)) return 'Please enter a valid 10 digit contact number';
    return '';
  };

  const handleInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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
    if (file) {
      const img = new Image();
      img.onload = () => {
        if (img.height > 200 || img.width > 700) {
          toast.error(
            "Image size must be no larger than 200 pixels in height and 700 pixels in width. Please resize your image and try again."
          );
          setShowUploadModal(false);
          return;
        }
        
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfileData(prevData => ({ ...prevData, profileImageUrl: reader.result as string }));
        };
        reader.readAsDataURL(file);
        setShowUploadModal(false);
      };
      img.src = URL.createObjectURL(file);
    }
  };

  const handleSave = async () => {
    const newErrors: { [key: string]: string } = {};
    ['accountsMailID', 'accountsContactNo', 'operationsMailID', 'operationsContactNo'].forEach((key) => {
      const error = validateField(key, profileData[key as keyof typeof profileData]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
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
              <img src={profileData.profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
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
            onBlur={handleInputBlur}
            containerStyle="mb-4"
            inputClassName="w-full"
            isRequired={true}
            inputError={!!errors.firstName}
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
            onBlur={handleInputBlur}
            containerStyle="mb-4"
            inputClassName="w-full"
            isRequired={true}
            inputError={!!errors.accountsMailID}
            errorMessage={errors.accountsMailID}
            inputType="email"
          />

          <CustomInputBox
            label="Accounts Contact No"
            name="accountsContactNo"
            value={profileData.accountsContactNo}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            containerStyle="mb-4"
            inputClassName="w-full"
            isRequired={true}
            inputError={!!errors.accountsContactNo}
            errorMessage={errors.accountsContactNo}
            inputType="tel"
          />

          <CustomInputBox
            label="Operations Mail ID"
            name="operationsMailID"
            value={profileData.operationsMailID}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            containerStyle="mb-4"
            inputClassName="w-full"
            isRequired={true}
            inputError={!!errors.operationsMailID}
            errorMessage={errors.operationsMailID}
            inputType="email"
          />

          <CustomInputBox
            label="Operations Contact No"
            name="operationsContactNo"
            value={profileData.operationsContactNo}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            containerStyle="mb-4"
            inputClassName="w-full"
            isRequired={true}
            inputError={!!errors.operationsContactNo}
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