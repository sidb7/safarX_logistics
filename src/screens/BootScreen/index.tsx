import { useNavigate } from "react-router-dom";
import CompanyLogo from "../../assets/CompanyLogo/shipyaari icon.svg"

const Index = () => {
  const navigate = useNavigate();

    setTimeout(() => {navigate("/auth/login"); },2000)
    
  return (
      <div className="flex items-center justify-center h-screen">
      <img className="animate-bounce object-contain" src={CompanyLogo}/>
    </div>
  );
};

export default Index;

