import { WelcomeQuestion } from "./welcome";
import CompanyLogo from "../../../assets/Navbar/shipyaariLogos.svg";
import { LARGE_LOGO } from "../../../utils/ApiUrls";

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
        <img src={LARGE_LOGO} alt="" className="ml-6" />
      </div>

      <div className="mx-4 text-base font-Open font-light leading-[22px] text-[#494949]">
        <WelcomeQuestion className={welcomeClassName} label={welcomeLabel} />
      </div>
    </>
  );
};

export default WelcomeHeader;
