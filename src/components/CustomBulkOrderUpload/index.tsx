import { useCallback, useRef } from "react";
import DownloadIconWhite from "../../assets/downloadIconWhite.svg";

interface ICustomuploadButtomProps {
  className?: string;
  setUploadFile?: (file: File | null) => void;
  setDisabled?: (disabled: boolean) => void;
  setAddButton?: (isVisible: boolean) => void;
}

const CustomBulkOrderUploadButton = (props: ICustomuploadButtomProps) => {
  const { setDisabled, setAddButton, setUploadFile } = props;
  const { className } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);
  console.log("props", props);

  const handleFileChange = useCallback((event: any) => {
    const file = event.target.files[0];
    const selectedFileName = event.target.files?.[0]?.name || null;
    if (file) {
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

  return (
    <>
      <input
        type="file"
        accept=".csv, application/pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        hidden
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <button
        onClick={() => fileInputRef?.current?.click()}
        className={`${className}text-[#FFF] text-[14px] flex gap-2 items-center  bg-black cursor-pointer rounded px-4 py-2 border-black border-2 text-sm font-semibold `}
      >
        <span>
          <img src={DownloadIconWhite} alt="" />
        </span>
        <span className="text-white font-semibold text-sm">UPLOAD</span>
      </button>
    </>
  );
};

export default CustomBulkOrderUploadButton;
