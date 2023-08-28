import deliveryIcon from "../../../assets/serv/delivery.svg";
import editIcon from "../../../assets/serv/edit.svg";
import { useNavigate } from "react-router-dom";

interface ISummaryData {
  productName?: any;
  productWeight?: any;
  productDimension?: any;
}

const BoxDetails = ({
  productName = "",
  productWeight = "",
  productDimension = "",
}) => {
  const navigate = useNavigate();

  return (
    <div className="p-[12px] gap-[8px] rounded-lg border-[1px] shadow-lg border-[#E8E8E8] bg-[#FFFFFF] lg:w-[385px]">
      <div className="flex flex-col  ">
        <div className="flex flex-row justify-between items-center mb-4">
          <div className="flex flex-row items-center gap-x-2">
            <img src={deliveryIcon} alt="Location Icon" />
            <p className="text-[14px] font-medium font-Open lg:text-[18px]">
              Box Details
            </p>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              navigate("/neworder/product");
            }}
          >
            <img src={editIcon} alt="Edit Icon" />
          </div>
        </div>
        <div className="flex flex-col gap-y-2 mb-10">
          <p className="text-[12px] font-medium font-Open ml-[25px] text-[#004EFF] lg:text-[16px] lg:font-semibold">
            Combo Product 1 | Combo Product 2 |
          </p>
          <p className="text-[12px] font-medium ml-[25px] font-Open text-[#004EFF] lg:text-[16px] lg:font-semibold ">
            Combo Product 3
          </p>
          <p className="text-[12px] font-medium ml-[25px] font-Open lg:text-[16px] lg:font-semibold">
            Box Name
          </p>
          <p className="text-[12px] font-medium ml-[25px] font-Open lg:text-[16px] lg:font-semibold">
            Box Weight | Box Dimension
          </p>
        </div>
      </div>
    </div>
  );
};
export default BoxDetails;
