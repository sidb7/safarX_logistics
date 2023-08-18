import { useState } from "react";
import ServiceButton from "../../components/Button/ServiceButton";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const BottomLayout = ({ callApi }: any) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const isLgScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  return (
    <div>
      <div
        className={`mt-5 h-[70px] fixed bottom-0 w-full`}
        style={{ width: "-webkit-fill-available" }}
      >
        <div
          className={`  ${
            isLgScreen
              ? "flex items-center justify-end  gap-x-4"
              : " grid grid-cols-2 gap-x-4"
          }   shadow-lg border-[1px]  bg-[#FFFFFF]  py-[16px] rounded-tr-[24px] rounded-tl-[24px] `}
          style={{ width: "-webkit-fill-available" }}
        >
          <div className="flex flex-row gap-3 mr-3">
            <button
              type="submit"
              className=" w-full  bg-[white] text-black px-4 py-2 text-sm font-semibold rounded shadow-md hover:shadow-lg border-2 border-[#A4A4A4] "
            >
              BACK
            </button>

            <button
              type="submit"
              className=" w-full  bg-[#1C1C1C] text-white px-4 py-2 text-sm font-semibold rounded shadow-md hover:shadow-lg border-2 border-[#A4A4A4] "
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomLayout;
