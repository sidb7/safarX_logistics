import CompanyLogo from "./../../assets/CompanyLogo/shipyaari icon.svg";
import ShippingSupplies from "./../../assets/Delivery/Shipping Supplies 1.svg";      
import CustomButton from "../../components/Button";
import Cross from "../../assets/cross.svg";

const Index = (props:any) => {
  return (
    <div className="flex flex-col gap-y-8 mb-28">
      <div className="product-box flex justify-between items-center">
        <img className="m-4 h-[25px] object-contain" src={CompanyLogo} />
        <img src={Cross} alt="" className="w-[24px] h-[24px] m-4" onClick={(e)=>props.closeModal()}/>
      </div>

      <div className="flex flex-col  mx-[100px] gap-y-6">
        <p className="text-center text-2xl font-medium text-[22px]">Get Started</p>
        <p className="text-center font-thin text-[16px]">
          Let us understand your requirements so that we can serve you better .
        </p>
      </div>

      <div className=" flex flex-col mx-28 gap-y-2">
        <img className="h-[180px] " src={ShippingSupplies} />

        <CustomButton onClick={() => {}} text="SET UP MY ACCOUNT" className="text-[14px]"/>
      </div>
    </div>
  );
};

export default Index;