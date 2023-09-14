import React, { useState } from "react";
import CancelIcon from "../../../assets/common/cancel.svg";
import CustomInputBox from "../../../components/Input";
import AddButton from "../../../components/Button/addButton";
import { POST } from "../../../utils/webService";
import { toast } from "react-toastify";
import { FORGOT_PASSWORD } from "../../../utils/ApiUrls";

interface ITypeProps {
  onClick?: any;
}

const ForgotPassword = (props: ITypeProps) => {
  const { onClick } = props;
  const [response, setResponse] = useState<any>(null);

  const [formData, setFormData] = useState({
    email: "",
    companyName: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //   const handleSaveClick = () => {
  //     const { email, companyName } = formData;

  //     console.log("Email:", email);
  //     console.log("companyName:", companyName);

  //     setFormData({ email: "", companyName: "" });
  //   };

  const postServicablePincode = async () => {
    const { email, companyName } = formData;

    try {
      const { data: response } = await POST(FORGOT_PASSWORD, formData);

      if (response?.success) {
        setResponse(response);
        setFormData({ email: "", companyName: "" });
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error("Error in ForgotPasswordAPI", error);
      return error;
    }
  };

  return (
    <div className="flex flex-col gap-y-8 lg:h-screen lg:w-full lg:py-5">
      <div className="flex justify-between lg:mb-10 lg:px-5">
        <div className="flex gap-x-2 lg:gap-x-3 ">
          <h3 className="lg:font-Lato lg:text-2xl lg:text-[#323232] ml-4">
            Forgot Password
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

      <div className="mb-4 lg:mb-6 lg:mr-10 ml-10 w-[20%]">
        <CustomInputBox
          label="Enter Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-4 lg:mb-6 lg:mr-10 ml-10 w-[20%]">
        <CustomInputBox
          label="Enter companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
        />
      </div>

      <div className="w-[20%] ml-10">
        <AddButton text="Save" onClick={postServicablePincode} />
      </div>
    </div>
  );
};

export default ForgotPassword;
