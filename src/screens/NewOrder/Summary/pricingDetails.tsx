import editIcon from "../../../assets/serv/edit.svg";
import serviceIcon from "../../../assets/serv/service.svg";
import { useNavigate } from "react-router-dom";

interface PricingData {
  appliedWeight?: any;
  appliedWeightUnit?: any;
  add?: string | number;
  base?: string | number;
  cod?: string | number;
  variables?: string | number;
  gst?: number;
  invoiceValue?: number;
  insurance?: number;
  baseWeight?: number;
  price?: number;
}
const PricingDetails: React.FunctionComponent<PricingData> = ({
  baseWeight = "",
  price = "",
  add = "",
  base = "",
  cod = "",
  variables = "",
  gst = "",
  invoiceValue = "",
  insurance = "",
  appliedWeight = "",
  appliedWeightUnit = "",
}) => {
  const navigate = useNavigate();
  const baseValue = +base;
  const addValue = +add;
  const codValue = +cod;
  const variablesValue = +variables;

  const orderPrice = baseValue + addValue + variablesValue;

  return (
    <div className="p-[24px]  rounded-lg border-[1px] shadow-lg border-[#E8E8E8] bg-[#F2F6FF] lg:w-[338px] lg:h-[505px] ">
      <div className="flex flex-col ">
        <div className="flex flex-col gap-y-4  ">
          <div className="flex justify-between">
            <p className=" text-[12px] font-normal font-Open   lg:text-[16px] ">
              Billable Weight:
            </p>
            <p> {appliedWeight} kg</p>
          </div>
          <div className="flex justify-between">
            <p className=" text-[12px] font-normal font-Open   lg:text-[16px] ">
              Order Price:
            </p>
            <p>
              {" "}
              {`\u20B9`} {orderPrice}
            </p>
          </div>
          <div className="flex justify-between">
            <p className=" text-[12px] font-normal font-Open   lg:text-[16px] ">
              COD:
            </p>
            <p>
              {" "}
              {`\u20B9`} {cod}
            </p>
          </div>
          <div className="flex justify-between">
            <p className=" text-[12px] font-normal font-Open   lg:text-[16px] ">
              Insurance Price:
            </p>
            <p>
              {" "}
              {`\u20B9`} {insurance}
            </p>
          </div>
          {/* <p className="text-[12px] font-medium font-Open lg:text-[16px] text-[#004EFF] lg:font-semibold">
            {`\u20B9`} {price}
          </p> */}
          {/* <div className="flex justify-between">
            <p className=" text-[12px] font-normal font-Open   lg:text-[16px] ">
              Discount Price:
            </p>
            <p className="text-[#004EFF]"> - {`\u20B9`} 20</p>
          </div> */}
          {/* <div className="flex justify-between mt-4">
            <p className=" text-[12px] font-medium font-Open   lg:text-[16px] lg:font-semibold">
              Amount:
            </p>
            <p>
              {" "}
              {`\u20B9`} {price}
            </p>
          </div> */}
          {/* <hr></hr>
          <div className="flex justify-between ">
            <p className=" text-[12px] font-medium font-Open   lg:text-[16px] lg:font-semibold">
              Additional Charges:
            </p>
            <p> {`\u20B9`} 3000</p>
          </div> */}
          <div className="flex justify-between">
            <p className=" text-[12px] font-normal font-Open   lg:text-[16px] ">
              GST :
            </p>
            <p>
              {`\u20B9`} {gst}{" "}
            </p>
          </div>
          <hr className="mt-[100px]"></hr>
          <div className="flex justify-between mt-[5px] ">
            <p className=" text-[12px] font-medium font-Open text-[#004EFF]  lg:text-[16px] lg:font-semibold ">
              Total:
            </p>
            <p className="text-[#004EFF]">
              {" "}
              {`\u20B9`} {price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PricingDetails;
