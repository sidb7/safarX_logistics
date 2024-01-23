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
          {brandingModalDetails?.imageUrl && (
            <div className="w-full h-[200px] overflow-hidden flex justify-center items-center mb-5">
              <img
                src={brandingModalDetails?.imageUrl}
                alt=""
                className="w-[700px] h-[200px] object-contain"
                style={{
                  border: "1px solid #cccccc",
                  borderRadius: "4px",
                }}
              />
            </div>
          )}

          <CustomInputWithFileUpload
            label="Upload logo"
            className="font-Open  "
            inputClassName="!w-full"
            type="file"
            onChange={handleImageChange}
            isRequired={false}
          />
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
