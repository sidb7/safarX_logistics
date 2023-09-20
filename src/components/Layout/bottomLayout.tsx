import { useState } from "react";
import ServiceButton from "../../components/Button/ServiceButton";
import { useNavigate } from "react-router-dom";

const BottomLayout = ({
  callApi,
  Button2Name,
  customButtonText,
  finalButtonText = "SAVE",
  className = "",
}: any) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <footer className="w-full fixed lg:-ml-2 bottom-0">
      <div className="grid grid-cols-2 shadow-lg border-[1px] bg-[#FFFFFF] gap-[32px] p-[24px] rounded-tr-[24px] rounded-tl-[24px] fixed w-full bottom-0 lg:flex lg:justify-end lg:!w-[calc(100%-64px)]">
        {Button2Name ? (
          <div className="lg:w-[100px]" />
        ) : (
          <ServiceButton
            className="lg:w-[100px]"
            text="BACK"
            onClick={() => navigate(-1)}
          />
        )}

        <ServiceButton
          text={
            loading
              ? "LOADING"
              : Button2Name
              ? `${customButtonText ? customButtonText : "NEXT"}`
              : finalButtonText
          }
          className={`bg-[#1C1C1C] text-[#FFFFFF] lg:w-[100px] ${className}`}
          onClick={async () => {
            setLoading(true);
            await callApi();
            setLoading(false);
          }}
        />
      </div>
    </footer>
  );
};

export default BottomLayout;
