import { WelcomeQuestion } from "./welcome";
import CompanyLogo from "../../assets/Navbar/ShipyaariLogos.svg";

const WelcomeHeader: React.FunctionComponent = () => {
  return (
    <>
      <div className="flex items-center shadow-md w-full h-[60px]">
        <img src={CompanyLogo} alt="" className="ml-6" />
      </div>

      <div className="mx-4">
        <WelcomeQuestion label="Please complete your profile" />
      </div>
    </>
  );
};

export default WelcomeHeader;
