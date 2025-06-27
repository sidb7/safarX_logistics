import React from "react";
import pageNotFoundIcon from "../../assets/pageNotFound.svg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/dashboard/overview");
  };
  return (
    <div className="flex items-center justify-center h-[calc(100vh-80px)] bg-gray-50 px-4">
      <div className="flex flex-col lg:flex-row items-center justify-center max-w-6xl w-full gap-8 lg:gap-12">
        {/* Left side - Text content */}
        <div className="flex flex-col items-start text-left lg:w-1/2">
          <h1 className="text-4xl lg:text-6xl font-bold text-[#004EFF] mb-4">
            Oops!
          </h1>
          <h2 className="text-2xl lg:text-4xl font-bold text-[#004EFF] mb-4">
            Page Not Found
          </h2>
          <p className="text-black font-Open font-normal text-base leading-[22px] tracking-normal align-middle mb-6">
            This page doesn't exist or is no longer available.
          </p>
          <Link
            to="/dashboard/overview"
            className="bg-[#004EFF] hover:bg-blue-700 text-white px-6 py-3  font-medium transition-colors duration-200 rounded-full "
          >
            Go Back Home
          </Link>
        </div>

        {/* Right side - Illustration */}
        <div className="lg:w-1/2 flex justify-center">
          <img
            className="w-full max-w-md lg:max-w-lg"
            src={pageNotFoundIcon}
            alt="Page Not Found"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
