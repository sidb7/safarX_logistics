import React, { useEffect, useState } from "react";
import CloseIcon from "../../assets/CloseIcon.svg";

export const UploadInput = () => {
  const [files, setFiles] = useState<any>([]);

  useEffect(() => {}, [files]);

  const deleteFile = (index: number) => {
    const dt = new DataTransfer();
    const input = document.getElementById("uploadPackages") as HTMLInputElement;
    const { files }: any = input;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (Number(index) !== i) dt.items.add(file);
    }

    input.files = dt.files;
    setFiles(dt.files);
    console.log(files);
  };

  const fileComponent = (fileName: string, productImage: any, key: number) => {
    return (
      <div className="flex justify-between items-center border-[#E8E8E8] border-t-2 h-[62px] w-full ">
        <div className="flex items-center">
          <img className="ml-4" src={productImage} alt="Product" width="32px" />
          <span className="ml-4 text-[#1C1C1C] text-md">{fileName}</span>
        </div>
        <div className="flex">
          <img
            className="mr-4"
            src={CloseIcon}
            alt="Close"
            onClick={() => deleteFile(key)}
          />
        </div>
      </div>
    );
  };

  const renderFiles = (files: any) => {
    const keys = Object.keys(files);
    if (files && keys.length > 0) {
      const fileListComponents = keys.map((key: any) => {
        const imageDataUrl = window.URL.createObjectURL(files[key]);
        return fileComponent(files[key].name, imageDataUrl, key);
      });
      return fileListComponents;
    }
  };

  return (
    <div className="relative py-2">
      <div className="border-2 border-slate-300 rounded-md h-[48px] lg:w-[372px]">
        <input
          id="uploadPackages"
          className="relative opacity-0 top-0 left-0 right-0 bottom-0 w-full h-full"
          accept="image/*"
          type="file"
          multiple={true}
          onChange={(event: any) => setFiles(event.target.files)}
        />
        <p className="absolute top-6 text-gray-400 ml-4 text-sm">
          Upload package photo
        </p>
        <p className="absolute top-0 left-4 bg-sky-500 border-2 rounded-md border-sky-500 text-white text-xs font-semibold leading-4 px-4 h-[20px]">
          Get 100 yaari points
        </p>
      </div>
      {Object.keys(files).length > 0 && (
        <div className="flex flex-col items-center border-2 border-[#E8E8E8] rounded-b-lg ">
          {renderFiles(files)}
        </div>
      )}
    </div>
  );
};
