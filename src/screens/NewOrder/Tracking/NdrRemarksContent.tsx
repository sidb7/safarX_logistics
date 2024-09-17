import React, { useState } from "react";
import CustomBulkOrderUploadButton from "../../../components/CustomBulkOrderUpload";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { POST } from "../../../utils/webService";
import { v4 as uuidv4 } from "uuid";
import Close from "../../../assets/CloseIcon.svg";
import { UPLOAD_NDR_REMARKS } from "../../../utils/ApiUrls";
import CrossIcon from "../../../assets/CloseIcon.svg";
import ServiceButton from "../../../components/Button/ServiceButton";
import { Spinner } from "../../../components/Spinner";

interface INdrRemarksContentProps {
  openUploadModal: boolean;
  setOpenUploadModal: any;
}

const NdrRemarksContent: React.FunctionComponent<INdrRemarksContentProps> = ({
  setOpenUploadModal,
  openUploadModal,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [addButton, setAddButton]: any = useState(false);
  const [uploadFile, setUploadFile]: any = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const navigate = useNavigate();

  const handleFileUpload = async () => {
    if (!uploadFile) {
      toast.error("Please select a file to upload.");
      return;
    }

    let uuid = uuidv4();
    let formData = new FormData();
    formData.append("file", uploadFile);

    try {
      setIsLoading(true);

      const { data: response } = await POST(UPLOAD_NDR_REMARKS, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.success) {
        toast.success(response?.message);
      } else {
        toast.error("Failed To Upload!" || response?.message);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("An error occurred during file upload.");
    } finally {
      setIsLoading(false);
      // navigate("/catalogues/box-catalogue");
      setOpenUploadModal(false);
    }
    // finally {
    //   setIsLoading(false);
    //   navigate("/catalogues/product-catalogue");
    // }
  };

  const handleDroppedFiles = (droppedFiles: File[]) => {
    if (droppedFiles.length > 0) {
      const selectedFile = droppedFiles[0];

      setUploadFile(selectedFile);
      setIsDragging(true);
      setFileName(selectedFile.name);
      setAddButton(true);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.items) {
      const files = Array.from(e.dataTransfer.items)
        ?.map((item: DataTransferItem) =>
          item.kind === "file" ? item.getAsFile() : null
        )
        .filter((file): file is File => file !== null);
      handleDroppedFiles(files);
      setIsDragging(false);
    }
  };
  return (
    <>
      <div className="relative h-full w-full">
        <div className="flex justify-between py-5 items-center text-center mx-5 ">
          <div className="flex gap-x-[8px] ">
            {/* <img src={ServiceVerification} alt="locationIcon" /> */}
            <p className="font-Lato font-normal text-2xl text-[#323232] leading-8 capitalize">
              Upload File
            </p>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setOpenUploadModal(false)}
          >
            <img src={CrossIcon} alt="close button" />
          </div>
        </div>

        {isLoading ? (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="">
              <div
                className={`${
                  isDragging && "outline-[4px] bg-[#e6e6e6] outline-[#6e6e6e] "
                } flex flex-col justify-center  items-center lg:mt-36 xl:mt-24 outline-none  rounded-lg bg-[white] transition-all delay-100   `}
                onDragEnter={() => setIsDragging(true)}
                onDragLeave={() => {
                  setIsDragging(false);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDrop={handleDrop}
              >
                <CustomBulkOrderUploadButton
                  //   className="!mt-[5rem]"
                  setAddButton={setAddButton}
                  setUploadFile={setUploadFile}
                />

                <div className="flex flex-col justify-center items-center mt-2">
                  <p className="text-[16px] mt-1 font-semibold font-Open">
                    or Drop files here
                  </p>
                  <p className="text-[12px] mt-1 text-black text-opacity-30 font-Open">
                    only CSV files are supported
                  </p>
                </div>

                {uploadFile && (
                  <div className="flex items-center">
                    <div className="text-[16px] py-2 font-semibold font-Open lg:text-[16px] flex">
                      <div className="font-semibold font-Open text-[12px] text-[#004EFF] lg:text-[16px]">
                        Selected File:
                      </div>
                      <div className="px-2">{uploadFile?.name || null}</div>
                    </div>
                    <div
                      className="px-2 cursor-pointer"
                      onClick={() => setUploadFile(null)}
                    >
                      <img src={Close} alt="" className="!w-5 !h-5" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        <div
          className="flex justify-end gap-x-5 shadow-lg border-[1px] h-[68px] bg-[#FFFFFF] px-6 py-4 rounded-tr-[32px] rounded-tl-[32px] absolute !bottom-0 w-full"
          style={{ width: "-webkit-fill-available" }}
        >
          <ServiceButton
            text={"SAVE"}
            onClick={handleFileUpload}
            // onClick={() => {}}
            className={`bg-[#1C1C1C] text-[#FFFFFF] h-[36px] lg:!py-2 lg:!px-4 disabled:bg-[#E8E8E8] disabled:text-[#BBB] disabled:border-none`}
            disabled={isLoading ? true : false}
          />
        </div>
      </div>
    </>
  );
};

export default NdrRemarksContent;
