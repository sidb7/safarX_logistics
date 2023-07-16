import CompanyLogo from "./../../../assets/CompanyLogo/shipyaari icon.svg";
import MobileIcon from "../../../assets/PhoneVerificationOtp/mobileVerificationIcon.svg";
import { useNavigate } from "react-router-dom";
import Card from "./offersCard";

const Index = () => {
  const navigate = useNavigate();

  const skipForNowOnClick = () => {
    navigate("/auth/getStarted");
  };

  return (
    <div className="flex flex-col gap-y-1">
      <div className="product-box flex items-center">
        <img className="m-4 h-[25px] object-contain" src={CompanyLogo} />
      </div>

      <div className="flex flex-col mt-[55px] mx-4 gap-y-3">
        <p className="text-center text-2xl font-medium">Offers</p>
        <p className="text-center font-thin">
          Choose from our lists of offers that suits you the best.
        </p>
      </div>
      <Card
        cardHeaderText="10 % EXTRA up to ₹1000"
        cardBodyText="Use standard charter Digismart credit card"
        cardFooterText="Save up to ₹500 with this code"
        wrapperClassName="!bg-[#F2FAEF]"
      />
      <Card
        cardHeaderText="10 % EXTRA up to ₹1000"
        cardBodyText="Use standard charter Digismart credit card"
        cardFooterText="Save up to ₹500 with this code"
        wrapperClassName="!bg-[#FDF6EA]"
      />
      <Card
        cardHeaderText="10 % EXTRA up to ₹1000"
        cardBodyText="Use standard charter Digismart credit card"
        cardFooterText="Save up to ₹500 with this code"
        wrapperClassName="!bg-[#F2FAEF]"
      />
      <div className="flex justify-center">
        <button
          type="button"
          onClick={skipForNowOnClick}
          className="text-[#004EFF] border-b-[1px] border-[#004EFF]"
        >
          SKIP FOR NOW
        </button>
      </div>
    </div>
  );
};

export default Index;
