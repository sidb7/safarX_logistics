import { useNavigate } from "react-router-dom";
import BackArrowIcon from "../../assets/backArrow.svg";
import { ReactElement } from "react";
interface IBreadcumProps {
  label: string;
  component?: ReactElement;
}

export const Breadcum = ({ label, component }: IBreadcumProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <div className="inline-flex space-x-2 items-center justify-start px-5 my-4 mt-20 lg:mt-10">
        <img
          src={BackArrowIcon}
          alt=""
          className="lg:w-[16px] cursor-pointer"
          onClick={() => navigate(-1)}
        />

        <p className="text-lg font-bold text-center text-[#1C1C1C] lg:text-[28px]">
          {label}
        </p>
      </div>
      {component && (
        <div className="inline-flex space-x-2 items-center justify-start px-5 my-4 mt-20 lg:mt-10">
          {component}
        </div>
      )}
    </div>
  );
};
