import WebCrossIcon from "../../../../assets/PickUp/ModalCrossWeb.svg";
import ServiceButton from "../../../../components/Button/ServiceButton";
import CustomInputBox from "../../../../components/Input";
import InputWithFileUpload from "../../../../components/InputBox/InputWithFileUpload";
import { toast } from "react-toastify";
import { POST } from "../../../../utils/webService";
import { FILE_UPLOAD } from "../../../../utils/ApiUrls";
import { v4 as uuidv4 } from "uuid";

interface ITypeProps {
  data: {
    pickupAddress: any;
    setPickupAddress: any;
  };
  titleIcon?: string;
  title?: any;
  inputLabel?: string;
  buttonText?: string;
  onClick?: () => void;
}

const CustomBrandingContent = (props: ITypeProps) => {
  const {
    titleIcon,
    title,
    inputLabel,
    buttonText,
    onClick,
    data: {
      pickupAddress: { branding },
      setPickupAddress,
    },
  } = props;

  const handleCustomBrandingChange = (
    fieldName: keyof typeof branding,
    value: string
  ) => {
    setPickupAddress((prevData: any) => ({
      ...prevData,
      branding: { ...prevData.branding, [fieldName]: value },
    }));
  };

  const uploadedInputFile = async (e: any) => {
    let uuid = uuidv4();

    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("fileName", uuid);
    const { data: response } = await POST(FILE_UPLOAD, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response?.success) {
      toast.success(response?.message);
      handleCustomBrandingChange("logo", uuid);
    } else {
      toast.error("Failed To Upload!");
    }
  };

  return (
    <div className="flex flex-col h-screen w-full relative pt-5">
      <div className="flex items-center justify-between mb-5 px-5">
        <div className="flex items-center gap-x-3">
          <img src={titleIcon} alt="" />
          <p className="font-normal text-2xl">{title}</p>
        </div>
        <div>
          <img
            src={WebCrossIcon}
            alt=""
            onClick={onClick}
            className="cursor-pointer"
          />
        </div>
      </div>
      <div className="px-5 space-y-4">
        <CustomInputBox
          label={inputLabel}
          value={branding.name}
          onChange={(e) => handleCustomBrandingChange("name", e.target.value)}
        />

        <CustomInputBox
          label="Brand Address"
          value={branding.address}
          onChange={(e) =>
            handleCustomBrandingChange("address", e.target.value)
          }
        />

        <CustomInputBox
          label="Brand Contact"
          value={branding.contact.mobileNo}
          onChange={(e) =>
            setPickupAddress((prevData: any) => ({
              ...prevData,
              branding: {
                ...prevData.branding,
                contact: {
                  ...prevData.branding.contact,
                  mobileNo: e.target.value,
                },
              },
            }))
          }
        />
        <InputWithFileUpload
          type="file"
          onChange={(e) => uploadedInputFile(e)}
        />
      </div>

      <div
        className=" flex justify-end lg:flex md:justify-end shadow-lg border-[1px] bg-[#FFFFFF] p-6 rounded-tr-[32px] rounded-tl-[32px] fixed bottom-0"
        style={{ width: "-webkit-fill-available" }}
      >
        <ServiceButton
          text={buttonText}
          onClick={onClick}
          className="bg-[#1C1C1C] text-[#FFFFFF] lg:!py-2 lg:!px-4"
        />
      </div>
    </div>
  );
};

export default CustomBrandingContent;
