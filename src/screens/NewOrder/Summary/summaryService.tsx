import editIcon from "../../../assets/serv/edit.svg";
import serviceIcon from "../../../assets/serv/service.svg";
import { useNavigate } from "react-router-dom";

interface ISummaryData {
  companyServiceName?: string;
  companyServiceId?: any;
  baseWeight?: any;
  price?: any;
  partnerServiceId?: any;
  partnerServiceName?: string;
  productWeightUnit?: any;
  productDimensionLength?: any;
  productDimensionBreadth?: any;
  productDimensionHeight?: any;
  productDimensionUnit?: any;
}
const SummaryService: React.FunctionComponent<ISummaryData> = ({
  companyServiceName = "",
  companyServiceId = "",
  baseWeight = "",
  price = "",
  partnerServiceId = "",
  partnerServiceName = "",
  productWeightUnit = "",
  productDimensionLength = "",
  productDimensionBreadth = "",
  productDimensionHeight = "",
  productDimensionUnit = "",
}) => {
  const navigate = useNavigate();
  return (
    <div className="p-[12px] gap-[8px] rounded-lg border-[1px] shadow-lg border-[#E8E8E8] bg-[#FFFFFF] lg:w-[385px]">
      <div className="flex flex-col ">
        <div className="flex flex-row justify-between items-center mb-4">
          <div className="flex flex-row items-center gap-x-2">
            <img src={serviceIcon} alt="Location Icon" />
            <p className="text-[14px] font-medium lg:text-[18px]">
              Service Details
            </p>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              navigate("/orders/add-order/pickup");
            }}
          >
            <img src={editIcon} alt="Edit Icon" />
          </div>
        </div>
        <div className="flex flex-col gap-y-1  ml-[25px] mb-10 ">
          <p className="text-[12px] font-medium  text-[#004EFF]  lg:text-[16px] lg:font-semibold">
            {companyServiceName}
          </p>
          <p className="text-[12px] font-medium lg:text-[16px] lg:font-semibold">
            {partnerServiceName}
          </p>

          <p className="text-[12px] font-medium lg:text-[16px] lg:font-semibold">
            {`\u20B9`} {price}
          </p>
          <p className="text-[12px] font-medium lg:text-[16px] lg:font-semibold">
            {baseWeight} {productWeightUnit} | {productDimensionLength} x{" "}
            {productDimensionBreadth} x {productDimensionHeight}{" "}
            {productDimensionUnit}
          </p>
        </div>
      </div>
    </div>
  );
};
export default SummaryService;
