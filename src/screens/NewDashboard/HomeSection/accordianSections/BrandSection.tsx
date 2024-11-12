import React, { useState } from "react";
import CustomInputBox from "../../../../components/Input";
import CustomInputWithFileUpload from "../../../../components/InputBox/InputWithFileUpload";
import OneButton from "../../../../components/Button/OneButton";
import toast from "react-hot-toast";
import { POST } from "../../../../utils/webService";
import { LOGO_AND_BRAND } from "../../../../utils/ApiUrls";
import { retrieveLocalStorageData } from "../../../../utils/utility";

interface IBrandSectionProps {
  setBrandLoadingState: any;
}

const BrandSection: React.FunctionComponent<IBrandSectionProps> = ({
  setBrandLoadingState,
}) => {
  // const privateCompanyDetails = retrieveLocalStorageData("kycValue");

  // let privateCompanyName = privateCompanyDetails?.privateCompany?.name;

  // // Add a condition to check if the name is "N/A", an empty string, or undefined
  // const isCompanyNameInvalid =
  //   !privateCompanyName ||
  //   privateCompanyName.trim() === "" ||
  //   privateCompanyName === "N/A";

  const [loading, setLoading] = useState(false);
  const [brandingDetails, setBrandingDetails] = useState<any>({
    image: "",
    imageUrl: "",
    brandName: "",
    // companyName: isCompanyNameInvalid ? "" : privateCompanyName,
    file: null,
  });

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const url: any = URL.createObjectURL(file) || null;
      setBrandingDetails({
        ...brandingDetails,
        image: event.target.files[0].name,
        imageUrl: url,
        file: file,
      });
    }
  };

  const isFormValid = () => {
    return brandingDetails.brandName.trim() !== "";
  };

  // const updateBrandingDetails = async () => {
  //   if (!isFormValid()) {
  //     return toast.error("All the above fields are required.");
  //   }

  //   let formData = new FormData();
  //   formData.append("brandName", brandingDetails.brandName);
  //   // formData.append("companyName", brandingDetails.companyName);
  //   formData.append("file", brandingDetails?.file);

  //   let img: any = new Image();
  //   img.src = brandingDetails?.imageUrl;

  //   img.onload = async function () {
  //     // Access the natural height and width of the image
  //     var height = img.naturalHeight;
  //     var width = img.naturalWidth;

  //     if (height > 200 || width > 700) {
  //       return toast.error(
  //         "Image size must be no larger than 200 pixels in height and 700 pixels in width. Please resize your image and try again."
  //       );
  //     } else {
  //       const { data } = await POST(LOGO_AND_BRAND, formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       });
  //       setBrandLoadingState(true);
  //       setLoading(true);
  //       if (data?.success) {
  //         toast.success(data?.message);
  //         setLoading(false);
  //         setBrandLoadingState(false);
  //         localStorage.setItem("brandDetails", "true");
  //         //   setBrandingModal(false);
  //         //   window.location.reload();
  //         // getProfileData();
  //       } else {
  //         toast.error(data?.message);
  //         setBrandLoadingState(null);
  //         setLoading(false);
  //       }
  //     }
  //   };
  // };

  const updateBrandingDetails = async () => {
    if (!isFormValid()) {
      return toast.error("All the above fields are required.");
    }

    let formData = new FormData();
    formData.append("brandName", brandingDetails.brandName);
    formData.append("file", brandingDetails?.file);

    // Check if image URL is provided
    if (brandingDetails?.imageUrl) {
      const img = new Image();
      img.src = brandingDetails.imageUrl;

      img.onload = async () => {
        const { naturalHeight: height, naturalWidth: width } = img;

        if (height > 200 || width > 700) {
          return toast.error(
            "Image size must be no larger than 200 pixels in height and 700 pixels in width. Please resize your image and try again."
          );
        } else {
          await submitFormData(formData); // Call function to handle form submission
        }
      };

      img.onerror = () => {
        toast.error("Failed to load the image. Please check the URL or file.");
      };
    } else {
      // If no image URL, proceed directly to form submission
      await submitFormData(formData);
    }
  };

  // Function to handle form submission
  const submitFormData = async (formData: any) => {
    try {
      setLoading(true);
      setBrandLoadingState(true);
      const { data } = await POST(LOGO_AND_BRAND, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data?.success) {
        toast.success(data.message);
        localStorage.setItem("brandDetails", "true");
        // window.location.reload(); // Uncomment if needed
        // getProfileData(); // Uncomment if needed
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred while updating branding details.");
      console.error(error);
    } finally {
      setLoading(false);
      setBrandLoadingState(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-y-5">
        <div className="flex justify-start gap-x-5">
          <p className="font-Open font-normal text-base text-[#1C1C1C] leading-4 pt-4 tracking-wide">
            Fill details of your Brand
          </p>
          {/* {!isCompanyNameInvalid && (
            <p className="font-Open font-normal text-base text-[#1C1C1C] leading-4 pt-4 tracking-wide">
              Company Name :{" "}
              <span className="font-Open font-bold text-base text-[#1C1C1C] leading-4 pt-4 tracking-wide">
                {privateCompanyName}
              </span>
            </p>
          )} */}
        </div>

        <div className="flex  flex-col xl:flex xl:flex-row gap-5">
          {/* {isCompanyNameInvalid && (
            <>
              <div className="min-w-[240px]">
                <CustomInputBox
                  label="Company Name"
                  containerStyle={`lg:!w-auto`}
                  //   className="font-Open !w-[320px] md:!w-[370px]"
                  labelClassName="!font-Open"
                  onChange={(e: any) =>
                    setBrandingDetails({
                      ...brandingDetails,
                      companyName: e.target.value,
                    })
                  }
                  value={brandingDetails.companyName}
                />
              </div>
            </>
          )} */}
          <div className="min-w-[240px]">
            <CustomInputBox
              label="Brand Name"
              containerStyle={`lg:!w-auto`}
              //   className="font-Open !w-[320px] md:!w-[370px]"
              labelClassName="!font-Open"
              onChange={(e: any) =>
                setBrandingDetails({
                  ...brandingDetails,
                  brandName: e.target.value,
                })
              }
              value={brandingDetails.brandName}
            />
          </div>
          <div className="min-w-[240px]">
            <CustomInputWithFileUpload
              label="Upload logo"
              className="!font-Open "
              //   inputClassName="!w-[320px] md:!w-[370px]"
              type="file"
              onChange={handleImageChange}
              isRequired={false}
            />
          </div>
        </div>
        <div className="flex justify-start">
          <OneButton
            text={loading ? "SUBMITTING..." : "SUBMIT"}
            onClick={updateBrandingDetails}
            // onClick={() => {}}
            variant="tertiary"
            className="!bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isFormValid() || loading}
          />
        </div>
      </div>
    </>
  );
};

export default BrandSection;
