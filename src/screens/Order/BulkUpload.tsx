import React, { useState } from "react";
import CancelIcon from "../../assets/common/cancel.svg";
import AddButton from "../../components/Button";
import CustomInputBox from "../../components/Input";
import { POST } from "../../utils/webService";
import "../../styles/scrollablePincodeServiceTale.css";
import { toast } from "react-toastify";
import Checkbox from "../../components/CheckBox";
import InputWithFileUpload from "../../components/InputBox/InputWithFileUpload";
import { v4 as uuidv4 } from "uuid";
import { FILE_UPLOAD } from "../../utils/ApiUrls";
interface ITypeProps {
  onClick?: any;
}

const BulkUpload = (props: ITypeProps) => {
  const { onClick } = props;
  const [bulkOrderUploadFile, setBulkOrderUploadFile]: any = useState([]);

  const [selectedOption, setSelectedOption] = useState<string>("");
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  console.log("selectedOption", selectedOption);

  return (
    <div className="flex flex-col gap-y-8 lg:h-screen lg:w-full lg:py-5 ">
      <div className="flex justify-between lg:px-5">
        <div className="flex gap-x-2 lg:gap-x-3">
          <h3 className="lg:font-Lato lg:text-2xl lg:text-[#323232]">
            Bulk Upload
          </h3>
        </div>
        <div>
          <img
            src={CancelIcon}
            alt=""
            onClick={onClick}
            className="cursor-pointer"
          />
        </div>
      </div>

      <div className="m-5  lg:font-semibold lg:font-Open lg:text-sm">
        <div className="flex flex-row  items-center   ">
          <p className="bg-white mr-1  lg:font-semibold lg:font-Open lg:text-sm">
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
          <p className="bg-white   lg:font-semibold lg:font-Open lg:text-sm">
            B2C
          </p>
          <div className="w-[20%] ml-[250px]">
            <AddButton
              text="Download Sample"
              onClick={() => {
                {
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="m-5  lg:font-semibold lg:font-Open lg:text-sm">
        <p className="bg-white   lg:font-semibold lg:font-Open lg:text-sm">
          File Upload:
        </p>
        <div>
          <InputWithFileUpload type="file" />
        </div>
      </div>

      <div className="w-[20%] ml-5 mt-[-25px]">
        <AddButton
          text="Upload Order"
          onClick={() => {
            {
            }
          }}
        />
      </div>
    </div>
  );
};

export default BulkUpload;
