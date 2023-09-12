import React, { useState } from "react";
import CancelIcon from "../../assets/common/cancel.svg";
import AddButton from "../../components/Button";
import CustomInputBox from "../../components/Input";
import { POST } from "../../utils/webService";
import { GET_SERVICABLE_PINCODE } from "../../utils/ApiUrls";
import "../../styles/scrollablePincodeServiceTale.css";
import { toast } from "react-toastify";

// import Button from "./Button";

interface ITypeProps {
  onClick?: any;
}

const ServicabilityPincode = (props: ITypeProps) => {
  const { onClick } = props;
  const [pincode, setPincode] = useState("");
  const [response, setResponse] = useState<any>(null);
  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPincode(e.target.value);
  };

  const payload = {
    pincode: pincode,
  };

  const postPickupOrderDetails = async (payload: any) => {
    try {
      const { data: response } = await POST(GET_SERVICABLE_PINCODE, payload);

      if (response?.success) {
        setResponse(response);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error("Error in  ServicablePincode API", error);
      return error;
    }
  };

  function convertToPascalCase(input: string): string {
    return input
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .split(/[_\s]/)
      ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  return (
    <div className="flex flex-col gap-y-8 lg:h-screen lg:w-full lg:py-5 ">
      <div className="flex justify-between lg:mb-10 lg:px-5">
        <div className="flex gap-x-2 lg:gap-x-3">
          <h3 className="lg:font-Lato lg:text-2xl lg:text-[#323232]">
            Servicable Pincode
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

      <div className="mb-4 lg:mb-6 lg:mr-10 ml-10 w-[50%]">
        <CustomInputBox
          label="Enter Pincode"
          value={pincode}
          onChange={handlePincodeChange}
        />
      </div>

      <div className="w-[50%] ml-10">
        <AddButton
          text="Check Availability"
          onClick={() => {
            {
              postPickupOrderDetails(payload);
              setPincode(pincode);
            }
          }}
        />
      </div>
      {response && response?.data && response.data.length > 0 && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                {Object.keys(response.data[0])
                  .filter((key) => key !== "companyId" && key !== "partnerId")
                  ?.map((key) => (
                    <th className="whitespace-nowrap" key={key}>
                      {convertToPascalCase(key)}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {response.data?.map((item: any, index: number) => (
                <tr key={index}>
                  {Object.keys(item)
                    .filter((key) => key !== "companyId" && key !== "partnerId")
                    ?.map((key) => (
                      <td key={key}>
                        {key === "isActive" ||
                        key === "isDeleted" ||
                        key === "pickup" ||
                        key === "cod" ||
                        key === "delivery" ||
                        key === "insurance"
                          ? item[key]
                            ? "YES"
                            : "NO"
                          : item[key]}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* <div className="table-container ">
        <table>
          <thead>
            <tr>
              {Object.keys(tableData[0])?.map((key) => (
                <th className="whitespace-nowrap" key={key}>
                  {convertToPascalCase(key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData?.map((item: any, index: any) => (
              <tr key={index}>
                {Object.keys(item)?.map((key) => (
                  <td key={key}>
                    {key === "isActive" ||
                    key === "isDeleted" ||
                    key === "pickup" ||
                    key === "cod" ||
                    key === "delivery" ||
                    key === "insurance"
                      ? item[key]
                        ? "YES"
                        : "NO"
                      : item[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default ServicabilityPincode;
