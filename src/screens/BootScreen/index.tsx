import { useNavigate } from "react-router-dom";
import CompanyLogo from "../../assets/CompanyLogo/shipyaari icon.svg";
import { LARGE_LOGO } from "../../utils/ApiUrls";

const Index = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/auth/login");
  }, 2000);

  return (
    <div className="flex items-center justify-center h-screen">
      <img
        className="animate-bounce object-contain"
        // src={LARGE_LOGO}
        src={LARGE_LOGO}
        alt="bootscreen"
      />
    </div>
  );
};

export default Index;
