// Login.jsx
import { useState } from "react";
import CustomInputBox from "../../components/Input";
import { GoogleLogin } from "@react-oauth/google";
import TrackCardComponent from "../TrackCard/TrackCardComponent";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
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
      <h2 className="text-xl font-bold mb-3 font-Open">SIGN IN</h2>

      {/* Email Field */}
      <CustomInputBox
        containerStyle="mt-4"
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

      {/* Password Field */}
      <CustomInputBox
        containerStyle="mt-4"
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

      <button className="w-full bg-[#160783] rounded-lg hover:shadow-md transition duration-200 text-white py-2  mt-4">
        Login
      </button>
      <p className="text-[9px] my-2 text-gray-500">
        By clicking on Login, I accept the{" "}
        <span className="text-[#160783]">Terms & Conditions</span> and{" "}
        <span className="text-[#160783]">Privacy Policy.</span>
      </p>
      <div className="flex items-center my-3">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-2 text-gray-500 text-xs">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>
      <div className="flex justify-center">
        <GoogleLogin onSuccess={(googleData) => {}} onError={() => {}} />
      </div>
      <div className="mt-5">
        <TrackCardComponent />
      </div>
    </div>
  );
}
