import React, { useState } from "react";
import { POST } from "../../../../../utils/webService";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import whiteDownloadIcon from "../../../../../assets/whiteDownloadIcon.svg";
import { Breadcrum } from "../../../../../components/Layout/breadcrum";
import CustomBulkOrderUploadButton from "../../../../../components/CustomBulkOrderUpload";
import CustomButton from "../../../../../components/Button";
import BottomLayout from "../../../../../components/Layout/bottomLayout";
import * as XLSX from "xlsx";
import {
  UPLOAD_BULK_BOXES,
  GET_SELLER_BOX,
} from "../../../../../utils/ApiUrls";
import { Spinner } from "../../../../../components/Spinner";
import { useNavigate } from "react-router-dom";
import Close from "../../../../../assets/CloseIcon.svg";

interface ITypeProps {
  onClick?: any;
}

const BulkUpload = (props: ITypeProps) => {
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

      const { data: response } = await POST(UPLOAD_BULK_BOXES, formData, {
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
      navigate("/catalogues/box-catalogue");
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

  const generateExcelFile = async (data: any) => {
    const ws: any = XLSX.utils.json_to_sheet(data);

    // // Get the range of the first column
    // const range = XLSX.utils.decode_range(ws["!ref"]);
    // for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
    //   const cellAddress = { r: rowNum, c: 0 }; // First column (index 0)
    //   const cellRef = XLSX.utils.encode_cell(cellAddress);
    //   const cell = ws[cellRef];
    //   if (!cell) continue;
    //   cell.s = { protection: { locked: true } }; // Set cell protection to locked
    // }

    // ws["!protect"] = {
    //   selectLockedCells: false,
    //   selectUnlockedCells: false,
    //   sheet: true,
    // };

    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    const dataBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(dataBlob);

    // Create a download link and trigger a click event
    const a = document.createElement("a");
    a.href = url;
    a.download = `Box_SampleFile.xlsx`;
    a.click();

    // Clean up
    URL.revokeObjectURL(url);
  };

  // const generateExcelFile = async (data: any) => {
  //   const wb = XLSX.utils.book_new();
  //   const ws = XLSX.utils.json_to_sheet(data, { skipHeader: true });

  //   // Define the custom headers, including merged headers
  //   const headerRow1 = [
  //     "Source",
  //     "Product Id",
  //     "Name",
  //     "Category",
  //     "Product Details",
  //     "Product Details",
  //     "Product Details",
  //     "Product Details",
  //     // "Box Details",
  //     // "Box Details",
  //     // "Box Details",
  //     // "Box Details",
  //   ];

  //   const headerRow2 = [
  //     "",
  //     "",
  //     "",
  //     "",
  //     "Length (cm)",
  //     "Breadth (cm)",
  //     "Height (cm)",
  //     "Dead Weight (Kg)",
  //     // "Box Length (cm)",
  //     // "Box Breadth (cm)",
  //     // "Box Height (cm)",
  //     // "Box Dead Weight (Kg)",
  //   ];

  //   // Apply custom headers to the worksheet
  //   XLSX.utils.sheet_add_aoa(ws, [headerRow1, headerRow2], { origin: "A1" });

  //   // Define the merge configuration
  //   const merges = [
  //     { s: { r: 0, c: 4 }, e: { r: 0, c: 7 } }, // Merge for "Product Details"
  //     { s: { r: 0, c: 8 }, e: { r: 0, c: 11 } }, // Merge for "Box Details"
  //   ];

  //   // Add merges to the worksheet
  //   ws["!merges"] = merges;

  //   // Append the data under the custom headers
  //   XLSX.utils.sheet_add_json(ws, data, { origin: "A3", skipHeader: true });

  //   // Append the worksheet to the workbook
  //   XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  //   // Write the Excel buffer and create a download link
  //   const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

  //   const dataBlob = new Blob([excelBuffer], {
  //     type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //   });
  //   const url = URL.createObjectURL(dataBlob);

  //   // Create a download link and trigger a click event
  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = `Product_SampleFile.xlsx`;
  //   a.click();

  //   // Clean up
  //   URL.revokeObjectURL(url);
  // };

  const downloadSampleProducts = async () => {
    const { data } = await POST(GET_SELLER_BOX, {
      skip: 0,
      limit: 1000,
      pageNo: 1,
    });

    let specificData = data.data.map((item: any) => {
      return {
        "Box Id": item?.boxId,
        Name: item?.name,
        Color: item?.color,
        "Length (cm)": item?.length,
        "Breadth (cm)": item?.breadth,
        "Height (cm)": item?.height,
        "Dead Weight (Kg)": item?.deadWeight,
        "Price (Rs)": item?.price,
        // "Box Length (cm)": "",
        // "Box Breadth (cm)": "",
        // "Box Height (cm)": "",
        // "Box Dead Weight (Kg)": "",
      };
    });

    await generateExcelFile(specificData);

    // generateExcelFile([
    //   {
    //     "Product Name": "",
    //     Category: "",
    //     SKU: "",
    //     "Unit Price": "",
    //     "Unit Tax": "",
    //     "Measure Unit": "",
    //     Length: "",
    //     Breadth: "",
    //     Height: "",
    //     "Dead Weight": "",
    //     "Weight Unit": "",
    //     "Volumetric Weight": "",
    //     "Applied Weight": "",
    //     Divisor: "",
    //   },
    // ]);
  };

  const renderHeaderComponent = () => {
    return (
      <CustomButton
        icon={whiteDownloadIcon}
        showIcon={true}
        text={`Download Sample`}
        className="!p-5"
        onClick={() => {
          downloadSampleProducts();
        }}
      />
    );
  };

  return (
    <>
      <Breadcrum label="Add Bulk Boxes" component={renderHeaderComponent()} />
      <div className="h-[calc(100%-260px)] flex justify-center items-center">
        {isLoading ? (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Spinner />
          </div>
        ) : (
          <div
            className={`${
              isDragging && "outline-[4px] bg-[#e6e6e6] outline-[#6e6e6e] "
            } flex flex-col justify-center  items-center w-[500px] h-[500px] outline-none  rounded-lg bg-[white] transition-all delay-100   `}
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
              className="!mt-[5rem]"
              setAddButton={setAddButton}
              setUploadFile={setUploadFile}
            />

            {/* <p className="text-[16px] mt-1 font-semibold font-Open">
          or Drop files here  ; 
        </p> */}
            <div className="flex flex-col justify-center items-center mt-5">
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
        )}
      </div>
      <BottomLayout
        customButtonText="Upload Boxes"
        callApi={() => {
          handleFileUpload();
        }}
        className="lg:w-[150px]"
        Button2Name={true}
      />
    </>
  );
};

export default BulkUpload;
