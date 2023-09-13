import React, { useState } from "react";
import CancelIcon from "../../../assets/common/cancel.svg";
import AddButton from "../../../components/Button";
import CustomInputBox from "../../../components/Input";
import { POST } from "../../../utils/webService";
import { toast } from "react-toastify";
import Checkbox from "../../../components/CheckBox";
import InputWithFileUpload from "../../../components/InputBox/InputWithFileUpload";
import { v4 as uuidv4 } from "uuid";
import whiteDownloadIcon from "../../../assets/whiteDownloadIcon.svg";
import { Breadcum } from "../../../components/Layout/breadcrum";
import CustomUploadButton from "../../NewOrder/Product/CustomUploadButton";
import CustomBulkOrderUploadButton from "../../../components/CustomBulkOrderUpload";
import CustomButton from "../../../components/Button";

interface ITypeProps {
  onClick?: any;
}

const BulkUpload = (props: ITypeProps) => {
  const { onClick } = props;
  const [bulkOrderUploadFile, setBulkOrderUploadFile]: any = useState([]);
  const [file, setFile] = useState<File | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("B2B");
  const [fileName, setFileName] = useState<string | null>(null);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleFileUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    let uuid = uuidv4();
    let formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", uuid);

    try {
      const { data: response } = await POST("", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.success) {
        toast.success(response?.message);
      } else {
        toast.error("Failed To Upload!");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("An error occurred during file upload.");
    }
  };

  const handleDownloadSample = async () => {
    try {
      const payload = { fileType: selectedOption };
      console.log("payload", payload);

      const { data: response } = await POST("", payload);

      if (response?.success) {
        toast.success(response?.message);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error("Error downloading sample:", error);
      toast.error("An error occurred during sample download.");
    }
  };

  const handleDroppedFiles = (droppedFiles: FileList) => {
    if (droppedFiles.length > 0) {
      const selectedFile = droppedFiles[0];
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const renderHeaderComponent = () => {
    return (
      <CustomButton
        icon={whiteDownloadIcon}
        showIcon={true}
        text={`Download ${selectedOption} Sample`}
        className="!p-5"
        onClick={handleDownloadSample}
      />
    );
  };
  return (
    <div className="flex flex-col gap-y-8 lg:h-screen lg:w-full lg:py-5 ">
      <Breadcum label="Add Bulk Upload" component={renderHeaderComponent()} />

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

      <div className="flex flex-col justify-center items-center">
        <CustomBulkOrderUploadButton className="!mt-[15rem] " />
        <p className="text-[16px] mt-1 font-semibold">or Drop files here</p>
        <p className="text-[12px] mt-1 text-black text-opacity-30">
          Pdf, excels files are supported
        </p>
      </div>
    </div>
  );
};

export default BulkUpload;
