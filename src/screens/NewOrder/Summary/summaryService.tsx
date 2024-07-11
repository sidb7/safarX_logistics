import editIcon from "../../../assets/serv/edit.svg";
import serviceIcon from "../../../assets/serv/service.svg";
import { useNavigate } from "react-router-dom";

interface ISummaryData {
  companyServiceName?: string;
  partnerName?: string;
  add?: any;
  base?: any;
  cod?: any;
  gst?: any;
  invoiceValue?: any;

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
  mode?: any;
  shipyaari_id?: any;
  orderSource?: any;
  orderId?: any;
  isMasked?: any;
}
const SummaryService: React.FunctionComponent<ISummaryData> = ({
  companyServiceName = "",
  companyServiceId = "",
  baseWeight = "",
  price = "",
  add = "",
  base = "",
  cod = "",
  gst = "",
  invoiceValue = "",
  partnerServiceId = "",
  partnerServiceName = "",
  partnerName = "",
  productWeightUnit = "",
  productDimensionLength = "",
  productDimensionBreadth = "",
  productDimensionHeight = "",
  productDimensionUnit = "",
  mode = "",
  shipyaari_id = "",
  orderSource = "",
  orderId = "",
  isMasked,
}) => {
  const navigate = useNavigate();

  return (
    <div className="p-[12px] gap-[8px] rounded-lg border-[1px] shadow-lg border-[#E8E8E8] bg-[#FFFFFF] lg:w-[385px]">
      <div className="flex flex-col ">
        <div className="flex flex-row justify-between items-center mb-4">
          <div className="flex flex-row items-center gap-x-2">
            <img src={serviceIcon} alt="Location Icon" />
            <p className="text-[14px] font-medium font-Open font-semibold lg:text-[18px]">
              Service Details
            </p>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              navigate(
                `/orders/add-order/service?shipyaari_id=${shipyaari_id}&source=${orderSource}&orderId=${orderId}`
              );
            }}
          >
            <div style={{ width: "20px", height: "20px" }}>
              {" "}
              <img src={editIcon} alt="editIcon" className="w-full h-full" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-1  ml-[25px] mb-10 ">
          {isMasked ? (
            "Shipyaari"
          ) : (
            <>
              <p className=" text-[12px] font-medium font-Open text-[#004EFF]  lg:text-[16px] font-semibold">
                {partnerName}
              </p>
              <p className="text-[12px] font-medium font-Open lg:text-[16px] font-semibold">
                {companyServiceName}
              </p>
            </>
          )}
          <p className="text-[12px] font-medium font-Open lg:text-[16px] font-semibold">
            {baseWeight} kg
          </p>

          <p className="text-[12px] font-medium font-Open lg:text-[16px] font-semibold">
            {`\u20B9`} {Math.round(price)?.toLocaleString("en-IN")}
          </p>
          <p className="text-[12px] font-medium font-Open lg:text-[16px] font-semibold">
            {mode}
          </p>

          {/* <p className="text-[12px] font-medium font-Open lg:text-[16px] lg:font-semibold">
            Base:{base}
          </p>
          <p className="text-[12px] font-medium font-Open lg:text-[16px] lg:font-semibold">
            Add:{add}
          </p>
          <p className="text-[12px] font-medium font-Open lg:text-[16px] lg:font-semibold">
            COD:{cod}
          </p>
          <p className="text-[12px] font-medium font-Open lg:text-[16px] lg:font-semibold">
            GST No.:{gst}
          </p>
          <p className="text-[12px] font-medium font-Open lg:text-[16px] lg:font-semibold">
            Invoice Value:{invoiceValue}
          </p> */}
        </div>
      </div>
    </div>
  );
};
export default SummaryService;
