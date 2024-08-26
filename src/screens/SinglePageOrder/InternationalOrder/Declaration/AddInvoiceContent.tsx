import React, { useEffect, useState } from "react";
import ServiceButton from "../../../../components/Button/ServiceButton";
import InvoiceIcon from "../../../../assets/invoiceIcon.svg";
import CrossIcon from "../../../../assets/CloseIcon.svg";
import DatePicker from "react-datepicker";
import DateButton from "../../../../components/Button/DateButton";
import CustomInputBox from "../../../../components/Input";
import uploadImgPre from "../../../../assets/uploadImgPre.svg";
import UploadIcon from "../../../../assets/uploadinbutton.svg";
import CustomUploadSinglePage from "../../../../components/CustomUploadSinglePage";

interface IAddInvoiceContentProps {
  setIsInvoiceModalOpen?: any;
}

const AddInvoiceContent: React.FunctionComponent<IAddInvoiceContentProps> = ({
  setIsInvoiceModalOpen,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [uploadFile, setUploadFile]: any = useState(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [addButton, setAddButton]: any = useState(false);
  const [disabled, setDisabled]: any = useState(true);

  const handleClear = () => {
    setSelectedDate(null);
  };

  const handleFileUpload = async () => {
    if (!uploadFile) {
      console.log("Please select a file to upload.");
      return;
    }

    let formData = new FormData();
    let newData = formData.append("file", uploadFile);
    console.log("🚀 ~ handleFileUpload ~ newData:", newData);
    // formData.append("orderType", selectedOption);
    // Append transit type only if the selected option is "B2C"
    // if (selectedOption === "B2C") {
    //   formData.append("transit", transitType);
    // }

    // try {
    //   setIsLoading(true);

    //   const { data: response } = await POST(BULK_UPLOAD, formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });

    //   if (response?.success) {
    //     toast.success(response?.message);
    //     window.location.replace("/orders/view-orders?activeTab=booked");
    //   } else {
    //     toast.error(response?.message);
    //   }
    // } catch (error) {
    //   console.error("Error uploading file:", error);
    //   toast.error("An error occurred during file upload.");
    // } finally {
    //   setIsLoading(false);
    //   await new Promise((resolve) => setTimeout(resolve, 800));

    //   // navigate("/orders/view-orders");
    // }
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

  useEffect(() => {
    console.log("Updated uploadFile:", uploadFile);
  }, [uploadFile]);

  return (
    <>
      <div className="mx-5">
        <div className="flex justify-between py-5 items-center text-center">
          <div className="flex gap-x-[8px] ">
            <img src={InvoiceIcon} alt="locationIcon" />
            <p className="font-Lato font-normal text-2xl text-[#323232] leading-8 capitalize">
              Add Invoice
            </p>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setIsInvoiceModalOpen(false)}
          >
            <img src={CrossIcon} alt="close button" />
          </div>
        </div>
        <div className="flex gap-x-5">
          <div className="flex-1">
            <CustomInputBox
              label="Invoice Number"
              value={""}
              onChange={() => {}}
              //   onChange={handleTextInputChange}
              name="invoice-number"
              //   className={"!w-full"}
            />
            {/* {validationErrors?.name && (
              <div className="flex items-center gap-x-1 mt-1">
                <img src={InfoCircle} alt="info" width={10} height={10} />
                <span className="font-normal text-[#F35838] text-xs leading-3">
                  {validationErrors?.name}
                </span>
              </div>
            )} */}
          </div>
          <div className="flex-1">
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              customInput={
                <DateButton
                  text="Invoice Date"
                  onClick={() => {}} // Managed by DatePicker
                  value={selectedDate ? selectedDate.toLocaleDateString() : ""}
                  onClear={handleClear}
                  className="!w-[300px]"
                />
              }
            />
          </div>
        </div>
        {/* <div
          className={`p-3 mt-5 relative flex justify-between  border-[1px] rounded-[4px] border-[#A4A4A4] cursor-pointer `}
        >
          <div className="flex gap-x-2  text-center items-center">
            <img src={uploadImgPre} alt="" />
            <p className="text-[#777777] font-Open font-normal text-xs leading-4 text-center items-center">
              Upload Invoice
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
              //   multiple
              //   ref={imageInputRef}
              //   onChange={handleFileChange}
            />
          </div>
        </div> */}
        <div className="mt-5">
          <CustomUploadSinglePage
            // className="!mt-[5rem]"
            setDisabled={setDisabled}
            setAddButton={setAddButton}
            setUploadFile={setUploadFile}
            placeholder="Upload Invoice"
            requiredIcon={true}
            showUploadText={true}
          />
        </div>
      </div>
      <div
        className="flex justify-end gap-x-5 shadow-lg border-[1px] h-[68px] bg-[#FFFFFF] px-6 py-4 rounded-tr-[32px] rounded-tl-[32px] fixed bottom-0"
        style={{ width: "-webkit-fill-available" }}
      >
        <ServiceButton
          text={"SAVE"}
          onClick={handleFileUpload}
          // onClick={() => {}}
          className={`bg-[#1C1C1C] text-[#FFFFFF] h-[36px] lg:!py-2 lg:!px-4 disabled:bg-[#E8E8E8] disabled:text-[#BBB] disabled:border-none`}
        />
      </div>
    </>
  );
};

export default AddInvoiceContent;
