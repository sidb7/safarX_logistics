import { useState } from "react";
import ServiceButton from "../../components/Button/ServiceButton";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../Spinner";
import OneButton from "../Button/OneButton";

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
          <>
            {/* <ServiceButton
              className="lg:w-[100px]"
              text="BACK"
              onClick={() => navigate(-1)}
            /> */}
            <OneButton
              text="BACK"
              onClick={() => navigate(-1)}
              variant="secondary"
              className="lg:w-[100px]"
            />
          </>
        )}
        {/* 
        <ServiceButton
          disabled={loading}
          text={
            loading ? (
              <div className="flex">
                <Spinner />
              </div>
            ) : Button2Name ? (
              `${customButtonText ? customButtonText : "NEXT"}`
            ) : (
              finalButtonText
            )
          }
          className={`${
            loading ? "bg-white" : "bg-[#1C1C1C]"
          } text-[#FFFFFF] lg:w-[100px] ${className}`}
          onClick={async () => {
            setLoading(true);
            await callApi();
            setLoading(false);
          }}
        /> */}
        <OneButton
          text={
            loading ? (
              <div className="flex">
                <Spinner />
              </div>
            ) : Button2Name ? (
              `${customButtonText ? customButtonText : "NEXT"}`
            ) : (
              finalButtonText
            )
          }
          disabled={loading}
          className={`${
            loading ? "bg-white" : "bg-[#1C1C1C]"
          } text-[#FFFFFF] lg:w-[100px] ${className}`}
          variant={loading ? "secondary" : "primary"}
          onClick={async () => {
            setLoading(true);
            await callApi();
            setLoading(false);
          }}
          size="medium"
        />
      </div>
    </footer>
  );
};

export default BottomLayout;
