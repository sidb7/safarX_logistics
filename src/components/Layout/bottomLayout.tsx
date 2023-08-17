import ServiceButton from "../../components/Button/ServiceButton";
import { useNavigate } from "react-router-dom";

const BottomLayout = () => {
  const navigate = useNavigate();

  return (
    <footer className="w-full fixed bottom-0">
      <div className="grid grid-cols-2  shadow-lg border-[1px]  bg-[#FFFFFF] gap-[32px] p-[24px] rounded-tr-[24px] rounded-tl-[24px] fixed w-full bottom-0 lg:flex lg:justify-end">
        <ServiceButton
          className="lg:w-[100px]"
          text="BACK"
          onClick={() => navigate(-1)}
        />

        <ServiceButton
          text="SAVE"
          className="bg-[#1C1C1C] text-[#FFFFFF] lg:w-[100px]"
          onClick={() => {}}
        />
      </div>
    </footer>
  );
};

export default BottomLayout;
