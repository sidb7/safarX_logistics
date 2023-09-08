import CompanyLogo from "../../assets/CompanyLogo/shipyaari icon.svg";
import CustomButton from "../../components/Button";
import { GoogleLogin } from "@react-oauth/google";
import CustomInputBox from "../../components/Input";
import { useNavigate } from "react-router-dom";
import Cross from "../../assets/cross.svg";

const Index = (props: any) => {
  const navigate = useNavigate();

  const signUpOnClick = () => {
    navigate("/auth/sendOtp");
  };
  const logInOnClick = () => {
    navigate("/auth/login");
  };

  const responseMessage = (response: any) => {};

  return (
    <div className="flex flex-col gap-y-1 ">
      <div className="product-box flex justify-between items-center">
        <img className="m-4 h-[25px] object-contain" src={CompanyLogo} />
        <img
          src={Cross}
          alt=""
          className="w-[24px] h-[24px] m-4"
          onClick={(e) => props.closeModal()}
        />
      </div>

      <div className="flex flex-col mt-7 mx-[70px] gap-y-2">
        <p className="text-center	 text-[22px] font-medium">
          Welcome to Shipyaari
        </p>
        <p className="text-center	 font-thin">
          Fast and Easy Shipping from your doorstep to your customer's.{" "}
        </p>
      </div>
      <div className=" flex flex-col mx-20 mt-4 gap-y-6 mb-8">
        <div className="flex ">
          <CustomInputBox containerStyle="mr-4" label="First Name" />
          <CustomInputBox containerStyle="ml-4" label="Last Name" />
        </div>
        <CustomInputBox label="Email" />
        <CustomInputBox inputType="password" label="Password" />
        <CustomInputBox inputType="password" label="Referral code(Optional)" />
        <CustomButton onClick={signUpOnClick} text="SIGN UP" />
        <hr className="mb-[-30px]" />
        <div className="flex justify-center my-[-7px]">
          <button className="bg-[#FEFEFE] px-2 font-medium">OR</button>
        </div>
        <div className="flex justify-center">
          <GoogleLogin
            text="signup_with"
            onSuccess={responseMessage}
            onError={() => {}}
          />
        </div>
        <div className="flex justify-center">
          <p className="text-[#777777] font-light text-[12px]">
            Already Have An Account ?{" "}
          </p>
          <button
            type="button"
            onClick={logInOnClick}
            className="text-[#004EFF] text-[12px]"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
