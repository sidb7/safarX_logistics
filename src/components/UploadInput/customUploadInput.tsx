import { useEffect, useState } from "react";
import DeleteIcon from "../../assets/UploadInput/DeleteIcon.svg";
import DummyIcon from "../../assets/UploadInput/DummyIcon.svg";

interface ICustomUploadInput {
  label: string
  id: string;
}

export const CustomUploadInput: React.FunctionComponent<ICustomUploadInput> = ({
  id,
  label,
}) => {
  const [files, setFiles] = useState<any>([]);
  useEffect(() => {}, [files]);

  const deleteFile = () => {
    const input = document.getElementById(id) as HTMLInputElement;
    input.files = null;
    setFiles([]);
  };

  return (
    <div className="relative w-full">
      <div className="border-[1px] border-[#A4A4A4] rounded-md h-[48px]">
        <input
          id={id}
          className="relative opacity-0 top-0 left-0 right-0 bottom-0 w-full h-full"
          accept="image/*"
          type="file"
          multiple={false}
          onChange={(event: any) => {
            setFiles(event.target.files);
          }}
        />
        <div className="flex justify-between absolute top-4 text-[12px] text-[#777777] px-4 w-full">
          <div className="flex">
            <img src={DummyIcon} alt="" />
            <p className="text-[12px] text-[#777777] ml-2">
              {files.length > 0 && files ? files[0]?.name : label}
            </p>
          </div>
          <div className="flex">
            <img
              src={DeleteIcon}
              alt="DeleteFile"
              onClick={() => deleteFile()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
