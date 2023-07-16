import { GoogleLogin } from "@react-oauth/google";
import CompanyLogo from "./../../../assets/CompanyLogo/shipyaari icon.svg";
import "../../../styles/signupPages.css";
import CustomButton from "../../../components/Button/index";
import CustomInputBox from "../../../components/Input";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const signUpOnClick = () => {
    navigate("/auth/signup");
  };

  const responseMessage = (response: any) => {
    console.log("GoogleLogin Response Message :", response);
  };

  return (
    <div className="flex flex-col gap-y-8">
      <div className="product-box flex items-center">
        <img className="m-4 h-[25px] object-contain" src={CompanyLogo} />
      </div>

      <div className="flex flex-col mt-7 mx-4 gap-y-6">
        <p className="text-center	 text-2xl font-medium">Welcome to Shipyaari</p>
        <p className="text-center	 font-thin">
          Fast and Easy Shipping from your doorstep to your customer's.{" "}
        </p>
      </div>
      <div className=" flex flex-col mx-4 gap-y-6">
        <CustomInputBox containerStyle="mt-[17px]" label="Email" />
        <CustomInputBox inputType="password" label="Password" />
        <CustomButton onClick={() => {}} text="LOG IN" />
        <hr className="mb-[-30px]" />
        <div className="flex justify-center my-[-7px]">
          <button className="bg-[#FEFEFE] px-2 font-medium">OR</button>
        </div>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={responseMessage}
            onError={() => {
              console.log("Google Login Failed");
            }}
          />
        </div>

        <div className="flex justify-center">
          <p className="text-[#777777] font-light">Don't Have An Account ? </p>
          <button
            type="button"
            onClick={signUpOnClick}
            className="text-[#004EFF]"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
