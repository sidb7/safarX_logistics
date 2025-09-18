import React, { useEffect, useState, useRef } from "react";
import CustomInputBox from "../../../components/Input";
import cameraIcon from "../../../assets/camera.svg";
import { POST } from "../../../utils/webService";
import { UPDATE_SINGLE_SELLER } from "../../../utils/ApiUrls";
import toast from "react-hot-toast";
import { Spinner } from "../../../components/Spinner";
import OneButton from "../../../components/Button/OneButton";
import { textRegex, emailRegex, mobileRegex } from "../../../utils/regexCheck";
import DeleteIconRedColor from "../../../assets/DeleteIconRedColor.svg";
import CloseIcon from "../../../assets/CloseIcon.svg";
import { useDispatch } from "react-redux";
import { setProfileInfo } from "../../../redux/reducers/userReducer";

interface EditProfileProps {
  onClose: (value: boolean) => void;
  getProfileData: () => void;
  ProfileDetails: {
    sellerId: string;
    profileImageUrl: string;
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

interface AccountEntry {
  email: string;
  contactNumber: string;
}

interface OperationsEntry {
  email: string;
  contactNumber: string;
}

const EditProfile: React.FC<EditProfileProps> = ({
  onClose,
  getProfileData,
  ProfileDetails,
}) => {
  const [profileData, setProfileData] = useState({
    sellerID: ProfileDetails?.sellerId,
    profileImageUrl: ProfileDetails?.profileImageUrl,
    firstName: ProfileDetails?.firstName,
    lastName: ProfileDetails?.lastName,
    verifiedEmailID: ProfileDetails?.email,
    verifiedContactNumber: ProfileDetails?.contactNumber,
    accountsMailID: ProfileDetails?.privateCompany?.accountDetails?.email || "",
    accountsContactNumber:
      ProfileDetails?.privateCompany?.accountDetails?.contactNumber || "",
    operationsMailID:
      ProfileDetails?.privateCompany?.operationDetails?.email || "",
    operationsContactNumber:
      ProfileDetails?.privateCompany?.operationDetails?.contactNumber || "",
  });

  const [accounts, setAccounts] = useState<AccountEntry[]>([]);
  const [operations, setOperations] = useState<OperationsEntry[]>([]);

  // Track if original data had non-empty entries
  const [originalAccountsHadData, setOriginalAccountsHadData] = useState(false);
  const [originalOperationsHadData, setOriginalOperationsHadData] =
    useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [nameErrMsg, setNameErrMsg] = useState<any>({
    firstName: "",
    lastName: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (ProfileDetails?.privateCompany) {
      const accountDetails = ProfileDetails?.privateCompany?.accountDetails;
      const operationDetails = ProfileDetails?.privateCompany?.operationDetails;

      // Handle accountDetails as array
      if (
        accountDetails &&
        Array.isArray(accountDetails) &&
        accountDetails.length > 0
      ) {
        const accountsData = accountDetails.map((account) => ({
          email: account.email || "",
          contactNumber: account.contactNumber || "",
        }));
        setAccounts(accountsData);

        // Check if original data had non-empty entries
        const hadData = accountsData.some(
          (account) =>
            account.email.trim() !== "" || account.contactNumber.trim() !== ""
        );
        setOriginalAccountsHadData(hadData);
      } else {
        // Fallback: single empty entry if no data
        setAccounts([{ email: "", contactNumber: "" }]);
        setOriginalAccountsHadData(false);
      }

      // Handle operationDetails as array
      if (
        operationDetails &&
        Array.isArray(operationDetails) &&
        operationDetails.length > 0
      ) {
        const operationsData = operationDetails.map((operation) => ({
          email: operation.email || "",
          contactNumber: operation.contactNumber || "",
        }));
        setOperations(operationsData);

        // Check if original data had non-empty entries
        const hadData = operationsData.some(
          (operation) =>
            operation.email.trim() !== "" ||
            operation.contactNumber.trim() !== ""
        );
        setOriginalOperationsHadData(hadData);
      } else {
        // Fallback: single empty entry if no data
        setOperations([{ email: "", contactNumber: "" }]);
        setOriginalOperationsHadData(false);
      }
    }
  }, [ProfileDetails]);

  const handleAccountChange = (
    index: number,
    field: "email" | "contactNumber",
    value: string
  ) => {
    const updatedAccounts = [...accounts];

    if (field === "contactNumber") {
      // For contact number, only allow numbers
      const numbersOnly = value.replace(/\D/g, "").slice(0, 10);
      updatedAccounts[index][field] = numbersOnly;

      // Validate only the current field
      const error = validateField(
        `accounts_${index}_contactNumber`,
        numbersOnly,
        index,
        updatedAccounts[index]["email"],
        "accounts"
      );
      if (error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [`accounts_${index}_contactNumber`]: error,
        }));
      } else {
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors[`accounts_${index}_contactNumber`];
          return newErrors;
        });
      }
    } else {
      updatedAccounts[index][field] = value;

      // Validate only the current field
      const error = validateField(
        `accounts_${index}_email`,
        value,
        index,
        updatedAccounts[index]["contactNumber"],
        "accounts"
      );
      if (error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [`accounts_${index}_email`]: error,
        }));
      } else {
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors[`accounts_${index}_email`];
          return newErrors;
        });
      }
    }

    setAccounts(updatedAccounts);
  };

  const addAccountEntry = () => {
    setAccounts([...accounts, { email: "", contactNumber: "" }]);
  };

  const removeAccountEntry = (index: number) => {
    if (accounts.length > 1) {
      const updatedAccounts = accounts.filter((_, i) => i !== index);
      setAccounts(updatedAccounts);

      // Clear related errors
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[`accounts_${index}_email`];
        delete newErrors[`accounts_${index}_contactNumber`];
        return newErrors;
      });
    }
  };

  const handleOperationsChange = (
    index: number,
    field: "email" | "contactNumber",
    value: string
  ) => {
    const updatedOperations = [...operations];

    if (field === "contactNumber") {
      // For contact number, only allow numbers
      const numbersOnly = value.replace(/\D/g, "").slice(0, 10);
      updatedOperations[index][field] = numbersOnly;

      // Validate only the current field
      const error = validateField(
        `operations_${index}_contactNumber`,
        numbersOnly,
        index,
        updatedOperations[index]["email"],
        "operations"
      );
      if (error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [`operations_${index}_contactNumber`]: error,
        }));
      } else {
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors[`operations_${index}_contactNumber`];
          return newErrors;
        });
      }
    } else {
      updatedOperations[index][field] = value;

      // Validate only the current field
      const error = validateField(
        `operations_${index}_email`,
        value,
        index,
        updatedOperations[index]["contactNumber"],
        "operations"
      );
      if (error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [`operations_${index}_email`]: error,
        }));
      } else {
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors[`operations_${index}_email`];
          return newErrors;
        });
      }
    }

    setOperations(updatedOperations);
  };

  const addOperationsEntry = () => {
    setOperations([...operations, { email: "", contactNumber: "" }]);
  };

  const removeOperationsEntry = (index: number) => {
    if (operations.length > 1) {
      const updatedOperations = operations.filter((_, i) => i !== index);
      setOperations(updatedOperations);

      // Clear related errors
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[`operations_${index}_email`];
        delete newErrors[`operations_${index}_contactNumber`];
        return newErrors;
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "firstName") {
      if (value.trim()?.length === 0) {
        setNameErrMsg({
          ...nameErrMsg,
          firstName: "Please Enter First Name",
        });
      } else {
        setNameErrMsg({
          ...nameErrMsg,
          firstName: "",
        });
      }
    }
    if (name === "lastName") {
      if (value.trim()?.length === 0) {
        setNameErrMsg({
          ...nameErrMsg,
          lastName: "Please Enter Last Name",
        });
      } else {
        setNameErrMsg({
          ...nameErrMsg,
          lastName: "",
        });
      }
    }

    if (name.includes("ContactNumber")) {
      // For contact number fields, only allow numbers
      // Remove any non-digit characters and limit to 10 digits
      const numbersOnly = value.replace(/\D/g, "").slice(0, 10);

      setProfileData((prevData) => ({ ...prevData, [name]: numbersOnly }));

      // Validate the number
      if (numbersOnly.length > 0) {
        const validStartDigits = /^[6-9]\d{9}$/;
        if (!validStartDigits.test(numbersOnly)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "Please enter a valid 10 digit number",
          }));
        } else {
          setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[name];
            return newErrors;
          });
        }
      } else {
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors[name];
          return newErrors;
        });
      }
      return;
    }

    // For non-contact number fields, handle normally
    setProfileData((prevData) => ({ ...prevData, [name]: value }));

    // Clear error when field is empty
    if (value.trim() === "") {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
      return;
    }

    // Validate email fields
    if (name.includes("MailID")) {
      if (!emailRegex.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Please enter a valid email address",
        }));
      } else {
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  };

  const validateField = (
    name: string,
    value: string,
    index?: number,
    siblingValue?: string,
    section?: "accounts" | "operations"
  ) => {
    // For alternative entries (index > 0), at least one field must have data
    const isAlternateEntry = index !== undefined && index > 0;
    const isPrimaryEntry = index !== undefined && index === 0;

    // Check if original data had entries for this section
    const originalHadData =
      section === "accounts"
        ? originalAccountsHadData
        : originalOperationsHadData;

    if (value.trim() === "") {
      // For alternative entries, if both fields are empty, show error
      if (isAlternateEntry && (!siblingValue || siblingValue.trim() === "")) {
        if (name.includes("email") || name.includes("MailID")) {
          return "At least one field (email or contact number) is required for alternative entries";
        }
        if (name.includes("contactNumber") || name.includes("ContactNumber")) {
          return "At least one field (email or contact number) is required for alternative entries";
        }
      }

      // If original data had entries, don't allow completely empty primary entry
      if (
        isPrimaryEntry &&
        originalHadData &&
        (!siblingValue || siblingValue.trim() === "")
      ) {
        if (name.includes("email") || name.includes("MailID")) {
          return "Email is required as original data contained account information";
        }
        if (name.includes("contactNumber") || name.includes("ContactNumber")) {
          return "Contact number is required as original data contained account information";
        }
      }

      return ""; // Primary entries can be empty if both are empty and no original data
    }

    // Validate format only when value is provided
    if (name.includes("MailID") || name.includes("_email")) {
      if (!/\S+@\S+\.\S+/.test(value)) {
        return "Please enter a valid email address";
      }
    }

    if (name.includes("ContactNumber") || name.includes("_contactNumber")) {
      if (!/^[6-9]\d{9}$/.test(value)) {
        return "Please enter a valid 10 digit number";
      }
    }
    return "";
  };

  const handleInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload only image files");
      return;
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("Image size must be less than 5MB");
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
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          toast.error("Unable to process image");
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
        ctx.fillStyle = "rgba(0,0,0,0)";
        ctx.fillRect(0, 0, size, size);

        // Calculate positioning to center the image
        const offsetX = (size - targetWidth) / 2;
        const offsetY = (size - targetHeight) / 2;

        // Draw image centered on canvas
        ctx.drawImage(img, offsetX, offsetY, targetWidth, targetHeight);

        // Convert to base64
        const resizedImage = canvas.toDataURL("image/png", 1.0);

        setProfileData((prevData) => ({
          ...prevData,
          profileImageUrl: resizedImage,
        }));
        setShowUploadModal(false);
      };

      img.onerror = () => {
        toast.error("Error loading image");
        setShowUploadModal(false);
      };

      img.src = event.target?.result as string;
    };

    reader.onerror = () => {
      toast.error("Error reading file");
      setShowUploadModal(false);
    };

    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    const newErrors: { [key: string]: string } = {};

    // Validate firstName and lastName
    if (!profileData?.firstName || profileData.firstName.length === 0) {
      newErrors["firstName"] = "First Name is required";
    }
    if (!profileData?.lastName || profileData.lastName.length === 0) {
      newErrors["lastName"] = "Last Name is required";
    }

    // Check if accounts section should have data (either originally had data or currently has some data)
    const currentAccountsHaveData = accounts.some(
      (account) =>
        account.email.trim() !== "" || account.contactNumber.trim() !== ""
    );

    // Check if operations section should have data (either originally had data or currently has some data)
    const currentOperationsHaveData = operations.some(
      (operation) =>
        operation.email.trim() !== "" || operation.contactNumber.trim() !== ""
    );

    // If original accounts had data but now all are empty, show error
    if (originalAccountsHadData && !currentAccountsHaveData) {
      newErrors["accounts_general"] =
        "Account details cannot be empty as original data contained account information";
    }

    // If original operations had data but now all are empty, show error
    if (originalOperationsHadData && !currentOperationsHaveData) {
      newErrors["operations_general"] =
        "Operations details cannot be empty as original data contained operations information";
    }

    // Validate all accounts
    accounts.forEach((account, index) => {
      const emailError = validateField(
        `accounts_${index}_email`,
        account.email,
        index,
        account.contactNumber,
        "accounts"
      );
      if (emailError) newErrors[`accounts_${index}_email`] = emailError;

      const contactError = validateField(
        `accounts_${index}_contactNumber`,
        account.contactNumber,
        index,
        account.email,
        "accounts"
      );
      if (contactError)
        newErrors[`accounts_${index}_contactNumber`] = contactError;
    });

    // Validate all operations
    operations.forEach((operation, index) => {
      const emailError = validateField(
        `operations_${index}_email`,
        operation.email,
        index,
        operation.contactNumber,
        "operations"
      );
      if (emailError) newErrors[`operations_${index}_email`] = emailError;

      const contactError = validateField(
        `operations_${index}_contactNumber`,
        operation.contactNumber,
        index,
        operation.email,
        "operations"
      );
      if (contactError)
        newErrors[`operations_${index}_contactNumber`] = contactError;
    });

    // If there are ANY validation errors, stop the save process
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      // Show specific error messages for general validation
      if (newErrors["accounts_general"]) {
        toast.error(newErrors["accounts_general"]);
      }
      if (newErrors["operations_general"]) {
        toast.error(newErrors["operations_general"]);
      }

      if (!newErrors["accounts_general"] && !newErrors["operations_general"]) {
        toast.error("Please fix the validation errors before saving");
      }
      return;
    }

    // Only proceed with save if ALL validations pass
    setIsLoading(true);
    try {
      const { data } = await POST(UPDATE_SINGLE_SELLER, {
        data: {
          firstName: profileData?.firstName,
          lastName: profileData?.lastName,
          profileImageUrl: profileData.profileImageUrl,
          "privateCompany.accountDetails": accounts,
          "privateCompany.operationDetails": operations,
        },
      });
      if (data?.success) {
        const profdata = {
          fullName: profileData?.firstName + " " + profileData?.lastName,
          profileImageurl: profileData?.profileImageUrl,
        };

        dispatch(setProfileInfo(profdata));

        onClose(false);
        getProfileData();
        toast.success("Profile updated successfully");
      } else {
        toast.error(data?.message || "Failed to update profile");
      }
    } catch (err) {
      toast.error("An error occurred while updating the profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-lg w-full h-full flex flex-col">
        <div className="flex justify-between items-center mb-6 ">
          <h2 className="text-[24px] px-4 font-Lato leading-8 font-normal">
            Edit Profile
          </h2>
          <button
            style={{ width: "24px", height: "24px" }}
            onClick={() => onClose(false)}
          >
            <img src={CloseIcon} alt="closeIcon" />
          </button>
        </div>

        <div className="p-4 flex-grow overflow-auto">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {profileData.profileImageUrl ? (
                <img
                  src={profileData.profileImageUrl}
                  alt="Profile"
                  className=" w-full h-full object-cover"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
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

          <form className="space-y-[16px] ">
            <CustomInputBox
              label="Seller ID"
              name="sellerID"
              value={profileData.sellerID}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              containerStyle="mb-4"
              inputClassName="w-full"
              className={"!rounded-[14px]"}
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
              onBlur={() => {}}
              containerStyle={`${
                nameErrMsg?.firstName?.length === 0 ? "mb-4" : "mb-0"
              }`}
              inputClassName="w-full"
              isRequired={true}
              className={"!rounded-[14px]"}
            />
            <p className="text-red-600 font-Open text-[10px]">
              {nameErrMsg?.firstName}
            </p>
            <CustomInputBox
              label="Last Name"
              name="lastName"
              value={profileData.lastName}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className={"!rounded-[14px]"}
              containerStyle={`${
                nameErrMsg?.lastName?.length === 0 ? "mb-4" : "mb-0"
              }`}
              inputClassName="w-full"
              isRequired={true}
            />
            <p className="text-red-600 font-Open text-[10px]">
              {nameErrMsg?.lastName}
            </p>

            <CustomInputBox
              label="Verified Email ID"
              name="verifiedEmailID"
              value={profileData.verifiedEmailID}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              containerStyle="mb-4"
              inputClassName="w-full"
              className={"!rounded-[14px]"}
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
              className={"!rounded-[14px]"}
              isRequired={true}
              inputError={!!errors.verifiedContactNumber}
              errorMessage={errors.verifiedContactNumber}
              inputType="tel"
              isDisabled
            />

            {/* Dynamic Accounts Section */}
            <div className="mb-4">
              <h3 className=" text-[14px] leading-4 font-Open  font-medium mb-3">
                Accounts
              </h3>
              {errors["accounts_general"] && (
                <div className="text-red-600 font-Open text-[10px] mb-2 bg-red-50 p-2 rounded">
                  {errors["accounts_general"]}
                </div>
              )}
              {accounts.map((account, index) => (
                <div
                  key={index}
                  className="border p-4 mb-8 rounded-[20px] relative shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs  font-Open leading-4 mb-2">
                      {" "}
                      {index === 0 ? "Primary" : `Alternate`}
                    </span>
                    {accounts.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeAccountEntry(index)}
                        className="absolute top-1 right-1 text-red-500 hover:text-red-700"
                      >
                        <img
                          src={DeleteIconRedColor}
                          alt="Delete"
                          className="w-4 mx-5 my-3 h-4"
                        />
                      </button>
                    )}
                  </div>
                  <div className="flex flex-col gap-[4px] ">
                    <CustomInputBox
                      label={`Accounts Mail ID `}
                      name={`accounts_${index}_email`}
                      value={account.email}
                      onChange={(e) =>
                        handleAccountChange(index, "email", e.target.value)
                      }
                      onBlur={() => {}}
                      containerStyle={
                        errors[`accounts_${index}_email`] ? "mb-2" : "mb-4"
                      }
                      inputClassName="w-full !rounded-[14px]"
                      className={"!rounded-[14px] "}
                      // isRequired={true}
                      // inputError={!!errors[`accounts_${index}_email`]}
                      errorMessage={errors[`accounts_${index}_email`]}
                      inputType="email"
                    />

                    <CustomInputBox
                      label={`Accounts Contact No `}
                      name={`accounts_${index}_contactNumber`}
                      value={account.contactNumber}
                      onChange={(e) =>
                        handleAccountChange(
                          index,
                          "contactNumber",
                          e.target.value
                        )
                      }
                      onBlur={() => {}}
                      containerStyle={
                        errors[`accounts_${index}_contactNumber`]
                          ? "mb-1 mt-2"
                          : "mb-4 mt-2"
                      }
                      inputClassName="w-full"
                      className={"!rounded-[14px]"}
                      // isRequired={true}
                      // inputError={!!errors[`accounts_${index}_contactNumber`]}
                      errorMessage={errors[`accounts_${index}_contactNumber`]}
                      inputType="tel"
                    />
                  </div>
                </div>
              ))}

              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={addAccountEntry}
                  className="py-1 px-4 text-[14px] leading-[20px] font-Open font-semibold underline border-[#160783]  text-[#160783] hover:border-blue-400 hover:text-[#160783] transition-colors"
                >
                  Add More
                </button>
              </div>
            </div>

            {/* Dynamic Operations Section */}
            <div className="mb-4 ">
              <h3 className="text-[14px] leading-4 font-Open  font-medium mb-3">
                Operations
              </h3>
              {errors["operations_general"] && (
                <div className="text-red-600 font-Open text-[10px] mb-2 bg-red-50 p-2 rounded">
                  {errors["operations_general"]}
                </div>
              )}
              {operations.map((operation, index) => (
                <div
                  key={index}
                  className="border rounded-[20px] p-4 mb-8 relative shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                >
                  <div className="flex justify-between items-center mb-2 ">
                    <span className="text-[12px]  font-Open leading-4 mb-2">
                      {index === 0 ? "Primary" : `Alternate`}
                    </span>
                    {operations.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeOperationsEntry(index)}
                        className="absolute top-1 right-1 text-red-500 hover:text-red-700"
                      >
                        <img
                          src={DeleteIconRedColor}
                          alt="Delete"
                          className="w-4 mx-5 my-3 h-4"
                        />
                      </button>
                    )}
                  </div>
                  <div className="flex flex-col gap-[4px] ">
                    <CustomInputBox
                      label={`Operations Mail ID `}
                      name={`operations_${index}_email`}
                      value={operation.email}
                      onChange={(e) =>
                        handleOperationsChange(index, "email", e.target.value)
                      }
                      onBlur={() => {}}
                      containerStyle={
                        errors[`operations_${index}_email`] ? "mb-1" : "mb-4"
                      }
                      inputClassName="w-full !radius-lg"
                      className={"!rounded-[14px] "}
                      // isRequired={true}
                      // inputError={!!errors[`operations_${index}_email`]}
                      errorMessage={errors[`operations_${index}_email`]}
                      inputType="email"
                    />

                    <CustomInputBox
                      label={`Operations Contact No`}
                      name={`operations_${index}_contactNumber`}
                      value={operation.contactNumber}
                      onChange={(e) =>
                        handleOperationsChange(
                          index,
                          "contactNumber",
                          e.target.value
                        )
                      }
                      onBlur={() => {}}
                      containerStyle={
                        errors[`operations_${index}_contactNumber`]
                          ? "mb-1 mt-2"
                          : "mb-4 mt-2"
                      }
                      inputClassName="w-full"
                      className={"!rounded-[14px]"}
                      // isRequired={true}
                      // inputError={!!errors[`operations_${index}_contactNumber`]}
                      errorMessage={errors[`operations_${index}_contactNumber`]}
                      inputType="tel"
                    />
                  </div>
                </div>
              ))}

              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={addOperationsEntry}
                  className="py-1 px-4 text-[14px] leading-[20px] font-Open font-semibold underline border-[#160783]  text-[#160783] hover:border-blue-400 hover:text-[#160783] transition-colors"
                >
                  Add More
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="mt-8">
          <h2>Back</h2>
        </div>

        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">
                Upload Profile Picture
              </h3>
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

      <div className="absolute bottom-0 mt-4 left-0 right-0 p-4 rounded-[18px] shadow-[0_-4px_6px_-2px_rgba(0,0,0,0.1)] bg-white border-t border-gray-200 flex justify-end items-center">
        <OneButton
          text="Back"
          onClick={() => onClose(false)}
          className="px-4 py-2 mr-4 !rounded-[18px]"
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
            className="px-4 py-2 !rounded-[18px] "
            variant="primary"
          />
        )}
      </div>
    </>
  );
};

export default EditProfile;
