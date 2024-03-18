import React, { useEffect, useState } from "react";
import uploadImgPre from "../../../assets/uploadImgPre.svg";
import UploadIcon from "../../../assets/uploadinbutton.svg";
import BlackUploadIcon from "../../../assets/Upload.svg";
import DeleteIcon from "../../../assets/DeleteIconRedColor.svg";
import toast from "react-hot-toast";
import CrossIcon from "../../../assets/cross.svg";
import CustomButton from "../../../components/Button";
import ServiceButton from "../../../components/Button/ServiceButton";
import { UPLOAD_DISPUTE_IMAGE } from "../../../utils/ApiUrls";
import { POST } from "../../../utils/webService";
import { Spinner } from "../../../components/Spinner";

function UploadImg({ setUploadImgModal, uploadImgModal, reloadMethod }: any) {
  const [uploadedFiles, setUploadedFiles] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const imageInputRef: any = React.useRef();

  const handleFileChange = (e: any) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    // Check file size for each selected file
    for (let i = 0; i < selectedFiles?.length; i++) {
      const fileSize = selectedFiles[i].size; // File size in bytes
      const maxSize = 2 * 1024 * 1024; // 2MB in bytes

      if (fileSize > maxSize) {
        // If file size exceeds 2MB, display error message and skip uploading
        toast.error("File size must be less than 2MB.");
        return;
      }
    }

    // If all selected files are within the size limit, proceed with upload
    if (selectedFiles && selectedFiles?.length + uploadedFiles?.length <= 5) {
      const newUploadedFiles: any = Array.from(selectedFiles).map(
        (file: any) => ({
          awbNo: "",
          privateCompanyId: "",
          file,
          image: file.name, // Set image as the file name
          imageUrl: URL.createObjectURL(file),
        })
      );
      setUploadedFiles((prevUploadedFiles: any) => [
        ...prevUploadedFiles,
        ...newUploadedFiles,
      ]);
      imageInputRef.current.value = "";
    } else {
      toast.error("You can upload a maximum of 5 files at a time.");
      imageInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    try {
      imageInputRef.current.value = "";
      let formData = new FormData();

      formData.append("awbNo", uploadImgModal?.data?.awb);
      formData.append(
        "privateCompanyId",
        uploadImgModal?.data?.privateCompanyId
      );

      for (let i = 0; i < uploadedFiles?.length; i++) {
        formData.append("files", uploadedFiles[i]?.file);

        let img: any = new Image();
        img.src = uploadedFiles[i]?.imageUrl;
      }

      setIsLoading(true);

      const { data } = await POST(UPLOAD_DISPUTE_IMAGE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data?.success) {
        setUploadedFiles([]);
        toast.success(data?.message);
        setUploadImgModal({
          isOpen: false,
          data: {
            awb: "",
            privateCompanyId: "",
          },
        });
        setIsLoading(false);
        reloadMethod();
      } else {
        setIsLoading(false);
        toast.error(data?.message);
      }
    } catch (error) {
      setIsLoading(false);
      return error;
    }
  };

  const handleDelete = (index: number) => {
    const newUploadedFiles = [...uploadedFiles];
    newUploadedFiles.splice(index, 1);
    setUploadedFiles(newUploadedFiles);
    imageInputRef.current.value = "";
  };

  const handleDeleteAll = () => {
    setUploadedFiles([]);
    imageInputRef.current.value = "";
  };

  return (
    <div className={`pt-5 px-5 pb-0 relative h-[100%]`}>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <img src={BlackUploadIcon} height={30} width={30} alt="" />
          <p className="text-[24px]">Upload Weight</p>
        </div>
        <div
          className="cursor-pointer"
          onClick={() =>
            setUploadImgModal({
              isOpen: false,
              data: {
                awb: "",
                privateCompanyId: "",
              },
            })
          }
        >
          <img src={CrossIcon} height={30} width={30} alt="" />
        </div>
      </div>

      <div className="flex flex-col h-full justify-between upload__image-wrapper">
        <div className="mt-5">
          <div
            className={`p-3 mt-5 relative flex justify-between border-dashed border-[1px] rounded-[4px] border-[#A4A4A4]  ${
              uploadedFiles?.length >= 5
                ? "cursor-not-allowed pointer-events-none "
                : "cursor-pointer"
            }`}
          >
            <div className="flex gap-x-2  text-center items-center">
              <img src={uploadImgPre} alt="" />
              <p className="text-[#777777] font-Open font-normal text-xs leading-4 text-center items-center">
                Upload package Images{" "}
              </p>{" "}
              <span className="text-red-500">*</span>{" "}
            </div>
            <div className="text-[#004EFF] flex gap-2 font-Open font-semibold text-sm leading-5 text-center items-center">
              <img src={UploadIcon} height={16} width={16} alt="" />
              <div>UPLOAD</div>
              <input
                className="absolute cursor-pointer left-0 opacity-0 top-0 border h-[48px]"
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                multiple
                ref={imageInputRef}
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="h-[670px] mt-2 overflow-auto">
            {uploadedFiles.map((image: any, index: any) => (
              <>
                <div key={index} className="image-item mt-5 ">
                  <img
                    src={image.imageUrl}
                    alt={`Preview ${index}`}
                    width="700"
                  />
                  <div className="flex justify-end gap-x-4 m-1">
                    <img
                      src={DeleteIcon}
                      height={23}
                      width={23}
                      alt="delete"
                      onClick={() => handleDelete(index)}
                      className="-hover:flex hover:-translate-y-1 hover:scale-110 duration-300 cursor-pointer my-2 "
                    />
                  </div>
                </div>
                <hr />
              </>
            ))}
          </div>
        </div>
        <div className="flex gap-x-3 mx-2 p-2 absolute bottom-0 bg-[#ffffff] left-0 right-0 ">
          {uploadedFiles?.length > 0 && (
            <ServiceButton
              text={"Remove All Images"}
              onClick={() => {
                handleDeleteAll();
              }}
              className="!font-Open !leading-5 !rounded !bg-white !text-black !w-full"
            />
          )}
          {isLoading ? (
            <button className=" flex justify-center items-center border-2 w-full  px-4 py-2 text-sm font-semibold rounded shadow-md hover:shadow-lg">
              <Spinner />
            </button>
          ) : (
            <ServiceButton
              text={"Accept"}
              onClick={handleSubmit}
              disabled={uploadedFiles?.length > 0 ? false : true}
              className={`!font-Open !leading-5 !rounded !w-full ${
                uploadedFiles?.length > 0
                  ? "!bg-[#1C1C1C] !text-[#FFFFFF] cursor-pointer"
                  : "!bg-[#E8E8E8] !text-[#BBBBBB] !border-0 cursor-not-allowed"
              }`}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadImg;
