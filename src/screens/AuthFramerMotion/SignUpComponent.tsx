// Login.jsx
import { useState } from "react";
import CustomInputBox from "../../components/Input";
import { GoogleLogin } from "@react-oauth/google";
import TrackCardComponent from "../TrackCard/TrackCardComponent";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignUpComponent() {
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLoginCredentials((prev) => ({ ...prev, [name]: value }));

    // Clear error on change
    setLoginError((prev) => ({ ...prev, [name]: "" }));
  };

  const validateEmail = (value: any) => {
    if (!value) return "Please enter your email ID";
    if (!emailRegex.test(value)) return "Incorrect Email ID";
    return "";
  };

  const validatePassword = (value: any) => {
    if (!value) return "Please enter your password";
    if (value.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  return (
    <div className="px-6 py-5 w-full border shadow-lg rounded-xl bg-white">
      <h2 className="text-xl font-bold mb-1 font-Open">SIGN UP</h2>
      <div className="w-full">
        {/* First + Last Name */}
        <div className="w-full flex gap-2">
          <div className="w-full">
            <CustomInputBox
              containerStyle="mt-4 flex-1"
              className="!h-[35px]"
              label="First Name"
              id="firstName"
              name="firstName"
              inputType="text"
              fixedLabel
              value={""}
              onChange={() => {}}
              onBlur={(e) => {}}
              errorCondition={{}}
            />
          </div>
          <div className="w-full">
            <CustomInputBox
              containerStyle="mt-4 flex-1"
              className="!h-[35px]"
              label="Last Name"
              id="lastName"
              name="lastName"
              inputType="text"
              fixedLabel
              value={""}
              onChange={() => {}}
              onBlur={(e) => {}}
              errorCondition={{}}
            />
          </div>
        </div>

        {/* Email */}
        <CustomInputBox
          containerStyle="mt-4"
          className="!h-[35px]"
          label="Email"
          id="email"
          name="email"
          inputType="email"
          fixedLabel
          value={loginCredentials.email}
          onChange={handleChange}
          onBlur={(e) => {
            const errorMsg = validateEmail(e.target.value);
            setLoginError((prev) => ({ ...prev, email: errorMsg }));
          }}
          errorCondition={{
            message: loginError.email,
          }}
        />

        {/* Password */}
        <CustomInputBox
          containerStyle="mt-4"
          className="!h-[35px]"
          label="Password"
          id="password"
          name="password"
          inputType="password"
          fixedLabel
          value={loginCredentials.password}
          onChange={handleChange}
          onBlur={(e) => {
            const errorMsg = validatePassword(e.target.value);
            setLoginError((prev) => ({ ...prev, password: errorMsg }));
          }}
          errorCondition={{
            message: loginError.password,
          }}
        />

        {/* Referral + Coupon Code (side by side) */}
        <CustomInputBox
          containerStyle="mt-4 flex-1"
          className="!h-[35px]"
          label="Referral code"
          id="referralCode"
          name="referralCode"
          inputType="text"
          fixedLabel
          value={""}
          onChange={() => {}}
          onBlur={(e) => {}}
          errorCondition={{}}
        />
        <div className="w-full flex gap-2">
          <div className="w-full">
            <CustomInputBox
              containerStyle="mt-4 flex-1"
              className="!h-[35px]"
              label="Coupon code"
              id="couponCode"
              name="couponCode"
              inputType="text"
              fixedLabel
              value={""}
              onChange={() => {}}
              onBlur={(e) => {}}
              errorCondition={{}}
            />
          </div>
          <div className="w-1/2">
            <button className="w-full h-[35px] items-center flex justify-center hover:bg-[#160783] border border-[#160783] text-[#160783] rounded-lg hover:shadow-md transition duration-200 hover:text-white py-2 mt-4">
              Verify
            </button>
          </div>
        </div>
      </div>

      {/* Login Button */}
      <button className="w-full bg-[#160783] rounded-lg hover:shadow-md transition duration-200 text-white py-2 mt-4">
        Sign Up
      </button>

      {/* Terms */}
      <p className="text-[9px] my-2 text-gray-500">
        By clicking on Login, I accept the{" "}
        <span className="text-[#160783]">Terms & Conditions</span> and{" "}
        <span className="text-[#160783]">Privacy Policy.</span>
      </p>

      {/* OR Divider */}
      <div className="flex items-center my-3">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-2 text-gray-500 text-xs">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* Google Login */}
      <div className="flex justify-center">
        <GoogleLogin onSuccess={(googleData) => {}} onError={() => {}} />
      </div>

      {/* Track Card */}
      <div className="mt-5">
        <TrackCardComponent />
      </div>
    </div>
  );
}
