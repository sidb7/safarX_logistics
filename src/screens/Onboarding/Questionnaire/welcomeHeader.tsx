import { WelcomeQuestion } from "./welcome";
import CompanyLogo from "../../../assets/Navbar/ShipyaariLogos.svg";

interface IWelcomeProps {
  className?: string;
  welcomeLabel?: string;
  welcomeClassName?: string;
}

const WelcomeHeader: React.FunctionComponent<IWelcomeProps> = ({
  className,
  welcomeClassName,
  welcomeLabel = "Please complete your profile",
}) => {
  return (
    <>
      <div
        className={`${className} flex items-center shadow-md w-full h-[60px]`}
      >
        <img src={CompanyLogo} alt="" className="ml-6" />
      </div>

      <div className="mx-4">
        <WelcomeQuestion className={welcomeClassName} label={welcomeLabel} />
      </div>
    </>
  );
};

export default WelcomeHeader;
