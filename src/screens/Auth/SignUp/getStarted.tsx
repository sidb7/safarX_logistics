import CompanyLogo from "./../../../assets/CompanyLogo/shipyaari icon.svg";
import ShippingSupplies from "./../../../assets/Delivery/Shipping Supplies 1.svg";
import CustomButton from "../../../components/Button/index";

const Index = () => {
  return (
    <div className="flex flex-col gap-y-8">
      <div className="product-box flex items-center">
        <img className="m-4 h-[25px] object-contain" src={CompanyLogo} />
      </div>

      <div className="flex flex-col mt-7 mx-4 gap-y-6">
        <p className="text-center text-2xl font-medium">Get Started</p>
        <p className="text-center font-thin">
          Let us understand your requirements so that we can serve you better .
        </p>
      </div>

      <div className=" flex flex-col mx-4 gap-y-6">
        <img className="h-[180px] " src={ShippingSupplies} />

        <CustomButton onClick={() => {}} text="SET UP MY ACCOUNT" />
      </div>
    </div>
  );
};

export default Index;
