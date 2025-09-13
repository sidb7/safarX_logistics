import { useNavigate } from "react-router-dom";
import CompanyLogo from "../../assets/CompanyLogo/shipyaari icon.svg";
import { LARGE_LOGO } from "../../utils/ApiUrls";

const BootScreen = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/auth/framer-motion/login");
  }, 2000);

  return (
    <div className="flex items-center justify-center h-screen">
      <img
        className="animate-pulse object-contain w-[200px] h-[200px]"
        src={LARGE_LOGO}
        alt="bootscreen"
      />
    </div>
  );
};

export default BootScreen;
