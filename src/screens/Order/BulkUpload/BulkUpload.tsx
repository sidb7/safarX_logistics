import React, { useState, useEffect } from "react";
import CancelIcon from "../../../assets/common/cancel.svg";
import AddButton from "../../../components/Button";
import CustomInputBox from "../../../components/Input";
import { POST } from "../../../utils/webService";
import { toast } from "react-toastify";
import Checkbox from "../../../components/CheckBox";
import InputWithFileUpload from "../../../components/InputBox/InputWithFileUpload";
import { v4 as uuidv4 } from "uuid";
import whiteDownloadIcon from "../../../assets/whiteDownloadIcon.svg";
import { Breadcrum } from "../../../components/Layout/breadcrum";
import CustomUploadButton from "../../NewOrder/Product/CustomUploadButton";
import CustomBulkOrderUploadButton from "../../../components/CustomBulkOrderUpload";
import CustomButton from "../../../components/Button";
import BottomLayout from "../../../components/Layout/bottomLayout";
import { BULK_UPLOAD } from "../../../utils/ApiUrls";
import { Spinner } from "../../../components/Spinner";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AccessDenied from "../../../components/AccessDenied";
import { checkPageAuthorized } from "../../../redux/reducers/role";

interface ITypeProps {
  onClick?: any;
}

const BulkUpload = (props: ITypeProps) => {
  const { onClick } = props;
  const roles = useSelector((state: any) => state?.roles);

  const [bulkOrderUploadFile, setBulkOrderUploadFile]: any = useState([]);
  const [file, setFile] = useState<File | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("B2B");
  const [fileName, setFileName] = useState<string | null>(null);
  const [addButton, setAddButton]: any = useState(false);
  const [disabled, setDisabled]: any = useState(true);
  const [uploadFile, setUploadFile]: any = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // const isActive = roles.roles?.[0]?.menu?.[1]?.menu?.[2]?.pages?.[0]?.isActive;
  const isActive = checkPageAuthorized("Add Bulk");

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleFileUpload = async () => {
    if (!uploadFile) {
      toast.error("Please select a file to upload.");
      return;
    }

    let uuid = uuidv4();
    let formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("orderType", selectedOption);

    try {
      setIsLoading(true);

      const { data: response } = await POST(BULK_UPLOAD, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.success) {
        toast.success(response?.message);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("An error occurred during file upload.");
    } finally {
      setIsLoading(false);
      await new Promise((resolve) => setTimeout(resolve, 800));

      // navigate("/orders/view-orders");
      window.location.replace("/orders/view-orders");
    }
  };

  const handleDroppedFiles = (droppedFiles: File[]) => {
    if (droppedFiles.length > 0) {
      const selectedFile = droppedFiles[0];

      setUploadFile(selectedFile);

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
    }
  };

  const renderHeaderComponent = () => {
    const baseUrl = "https://sy-seller.s3.ap-south-1.amazonaws.com/files/";

    const downloadUrlB2B = `${baseUrl}SY_BULK_B2B_ORDER.xlsx`;
    const downloadUrlB2C = `${baseUrl}SY_BULK_B2C_ORDER.xlsx`;

    const downloadUrl =
      selectedOption === "B2B" ? downloadUrlB2B : downloadUrlB2C;

    return (
      <a
        href={downloadUrl}
        download="SY_BULK_ORDER.xlsx"
        className="flex items-center"
      >
        <CustomButton
          icon={whiteDownloadIcon}
          showIcon={true}
          text={`Download ${selectedOption} Sample`}
          className="!p-5"
          onClick={() => {}}
        />
      </a>
    );
  };

  return (
    <>
      {isActive ? (
        <div className="flex flex-col gap-y-8 lg:h-screen lg:w-full lg:py-5 ">
          <Breadcrum
            label="Add Bulk Upload"
            component={renderHeaderComponent()}
          />

          <div className="m-5  lg:font-semibold lg:font-Open lg:text-sm">
            <div className="flex flex-row  items-center   ">
              <p className="bg-white mr-1  lg:font-semibold lg:font-Open lg:text-base">
                Order Type:
              </p>
              <Checkbox
                checked={selectedOption === "B2B"}
                onChange={() => handleOptionSelect("B2B")}
              />
              <p className="bg-white mr-4  lg:font-semibold lg:font-Open lg:text-sm">
                B2B
              </p>
              <Checkbox
                checked={selectedOption === "B2C"}
                onChange={() => handleOptionSelect("B2C")}
              />
              <p className="bg-white lg:font-semibold lg:font-Open lg:text-sm">
                B2C
              </p>
              {/* <div className="w-[20%] ml-[250px]">
            <AddButton
              text={`Download ${selectedOption} Sample`}
              showIcon={true}
              icon={whiteDownloadIcon}
              onClick={handleDownloadSample}
              className=""
            />
          </div> */}
            </div>
          </div>

          {isLoading ? (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Spinner />
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center mt-[155px]">
              <CustomBulkOrderUploadButton
                className="!mt-[5rem]"
                setDisabled={setDisabled}
                setAddButton={setAddButton}
                setUploadFile={setUploadFile}
              />

              {/* <p className="text-[16px] mt-1 font-semibold font-Open">
          or Drop files here  ; 
        </p> */}
              <div
                className="flex flex-col justify-center items-center mt-5"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <p className="text-[16px] mt-1 font-semibold font-Open">
                  or Drop files here
                </p>
                <p className="text-[12px] mt-1 text-black text-opacity-30 font-Open">
                  only CSV files are supported
                </p>
              </div>

              {addButton && (
                <>
                  <p className="text-[16px] mt-5 font-semibold font-Open lg:text-[16px]">
                    <span className="font-semibold font-Open text-[12px] text-[#004EFF] lg:text-[16px]">
                      Selected File:
                    </span>{" "}
                    {uploadFile?.name || null}
                  </p>
                  {/* <button
              onClick={handleFileUpload}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
            >
              Upload File
            </button> */}
                </>
              )}
            </div>
          )}
          <BottomLayout
            customButtonText="Upload Bulk Order"
            callApi={() => {
              handleFileUpload();
            }}
            className="lg:w-[150px]"
            Button2Name={true}
          />
        </div>
      ) : (
        <AccessDenied />
      )}
    </>
  );
};

export default BulkUpload;
