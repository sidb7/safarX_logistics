import React, { useCallback, useRef, useState } from "react";
import uploadImgPre from "../../assets/uploadImgPre.svg";
import UploadIcon from "../../assets/uploadinbutton.svg";
import viewIcon from "../../assets/Label/view.svg";
import CrossIcon from "../../assets/crossIconBlue.svg";
interface ICustomUploadSinglePageProps {
  setUploadFile?: (file: File | null) => void;
  setDisabled?: (disabled: boolean) => void;
  setAddButton?: (isVisible: boolean) => void;
  placeholder?: string;
  requiredIcon?: boolean;
  showUploadText?: boolean;
}

const CustomUploadSinglePage: React.FunctionComponent<
  ICustomUploadSinglePageProps
> = ({
  setUploadFile,
  setDisabled,
  setAddButton,
  placeholder,
  requiredIcon,
  showUploadText,
}) => {
  const [fileName, setFileName] = useState<string | null>(null);
  console.log("🚀 ~ fileName:", fileName);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((event: any) => {
    const file = event.target.files[0];
    const selectedFileName = event.target.files?.[0]?.name || null;
    if (file) {
      setFileName(file.name); // Update the file name state
      setAddButton?.(true);
      readFileAsBlob(file);
      setDisabled?.(false);
      setUploadFile?.(file);
    }
  }, []);

  const readFileAsBlob = useCallback((file: any) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      // Get the ArrayBuffer from the reader result
      const buffer: any = reader.result;
      // Create a Blob from the ArrayBuffer
      const blob = new Blob([buffer], { type: file.type });

      // Now you can upload the blob to the server or process it further
      // For example, you can send it via an API using Fetch or Axios
      uploadBlobToServer(blob);
    };

    reader.readAsArrayBuffer(file);
  }, []);

  const uploadBlobToServer = useCallback((blob: any) => {
    // Your code to upload the blob to the server goes here
    // For example, you can use the Fetch API or any other library to perform the upload
    // For simplicity, let's just log the Blob's information to the console
  }, []);

  // const handleRemoveFile = () => {
  //   setFileName(null); // Clear the file name state
  //   setUploadFile?.(null); // Clear the uploaded file
  //   setDisabled?.(true); // Optionally disable related buttons
  //   setAddButton?.(false); // Hide the add button
  //   if (fileInputRef.current) {
  //     fileInputRef.current.value = ""; // Clear the input value
  //   }
  // };

  const handleClearFile = () => {
    setFileName(null);
    setUploadFile?.(null);
    setAddButton?.(false);
    setDisabled?.(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input
    }
  };

  return (
    <>
      <div
        className={`p-3 relative flex justify-between border-[1px] rounded-[4px] border-[#A4A4A4] cursor-pointer`}
      >
        <div className="flex gap-x-2  text-center items-center">
          <img src={uploadImgPre} alt="" />
          <p className="text-[#777777] font-Open font-normal text-xs leading-4 text-center items-center">
            {fileName || placeholder}
          </p>{" "}
          {requiredIcon && <span className="text-red-500">*</span>}
          {/* <span className="text-red-500">*</span>{" "} */}
        </div>
        <div className="">
          {fileName === null || fileName === "" ? (
            <div className="flex gap-2">
              <img src={UploadIcon} height={16} width={16} alt="" />
              {showUploadText && (
                <span className="font-Open font-semibold text-sm leading-5 text-center items-center text-[#004EFF]">
                  UPLOAD
                </span>
              )}
            </div>
          ) : (
            <div className="flex gap-x-2 mt-1">
              <div>
                <img src={viewIcon} height={16} width={16} alt="View File" />
              </div>
              <div>
                <img
                  src={CrossIcon}
                  height={16}
                  width={16}
                  alt="Remove File"
                  className="cursor-pointer"
                  onClick={handleClearFile}
                />
              </div>
            </div>
          )}

          {/* <div>UPLOAD</div> */}
          <div>
            <input
              className="absolute cursor-pointer left-0 opacity-0 top-0 h-[48px]"
              type="file"
              accept="image/jpg, image/jpeg, image/png, application/pdf,"
              multiple
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomUploadSinglePage;
