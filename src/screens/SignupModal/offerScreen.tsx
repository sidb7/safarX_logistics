import CompanyLogo from "./../../assets/CompanyLogo/shipyaari icon.svg"
import MobileIcon from "../../assets/PhoneVerificationOtp/mobileVerificationIcon.svg";
import { useNavigate } from "react-router-dom";
import Card from "./offerCard";    
import Cross from "../../assets/cross.svg";          

const Index = (props:any) => {
  const navigate = useNavigate();

  const skipForNowOnClick = () => {
    navigate("/auth/getStarted");
  };

  return (
    <div className="flex flex-col gap-y-1">
      <div className="product-box flex justify-between items-center">
        <img className="m-4 h-[25px] object-contain" src={CompanyLogo} />
        <img src={Cross} alt="" className="w-[24px] h-[24px] m-4" onClick={(e)=>props.closeModal()}/>
      </div>

      <div className="flex flex-col mt-5 mx-[100px]  gap-y-3">
        <p className="text-center text-2xl font-medium text-[22px]">Offers</p>
        <p className="text-center font-thin text-[16px]">
          Choose from our lists of offers that suits you the best.
        </p>
      </div>
      <div className="mx-28 mt-5">
        <Card
            cardHeaderText="10 % EXTRA up to ₹1000"
            cardBodyText="Use standard charter Digismart credit card"
            cardFooterText="Save up to ₹500 with this code"
            wrapperClassName="!bg-[#FDF6EA] !p-2 !w-[260px]"
        />
      </div>
      <div className="mx-28">
        <Card
            cardHeaderText="10 % EXTRA up to ₹1000"
            cardBodyText="Use standard charter Digismart credit card"
            cardFooterText="Save up to ₹500 with this code"
            wrapperClassName="!bg-[#F2FAEF] !p-2 !w-[260px]"
        />
      </div>
    
      
      
      <div className="flex justify-center mb-20 mt-6">
        <button
          type="button"
          onClick={skipForNowOnClick}
          className="text-[#004EFF] border-b-[1px] border-[#004EFF] text-[14px]"
        >
          SKIP FOR NOW
        </button>
      </div>
    </div>
  );
};

export default Index;
