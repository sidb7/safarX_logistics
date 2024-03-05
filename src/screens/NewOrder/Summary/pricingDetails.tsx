import editIcon from "../../../assets/serv/edit.svg";
import serviceIcon from "../../../assets/serv/service.svg";
import { useNavigate } from "react-router-dom";
interface PricingData {
  appliedWeight?: any;
  appliedWeightUnit?: any;
  add?: string | number;
  base?: string | number;
  cod?: string | number;
  codCharge?: string | number;
  variables?: string | number;
  tax?: number;
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
  tax = "",
  codCharge = "",
  invoiceValue = "",
  insurance = "",
  appliedWeight = "",
  appliedWeightUnit = "",
}) => {
  // Parse numbers from string inputs
  const baseValue = +base;
  const addValue = +add;
  const codValue = +cod;
  const variablesValue = +variables;
  const orderPrice = baseValue + addValue + variablesValue;
  const codChargeValue = +codCharge;

  // Round off decimal numbers to the nearest whole number
  const roundedInvoiceValue = Math.round(+invoiceValue);
  const roundedCODValue = Math.round(codValue);
  const codChargeValuePrice = Math.round(codChargeValue);
  const roundedOrderPrice = Math.round(orderPrice);
  const roundedInsuranceValue = Math.round(+insurance);
  const roundedTaxValue = Math.round(+tax);
  const roundedPrice = Math.round(+price);

  return (
    <div className="p-[24px] rounded-lg border-[1px] shadow-lg border-[#E8E8E8] bg-[#F2F6FF] lg:w-[338px] lg:h-[505px]">
      <div className="flex flex-col ">
        <div className="flex flex-col gap-y-4  ">
          <div className="flex justify-between">
            <p className="text-[12px] font-normal font-Open lg:text-[16px]">
              Invoice Value:
            </p>
            {`\u20B9`} {roundedInvoiceValue?.toLocaleString("en-IN")}
          </div>
          <div className="flex justify-between">
            <p className="text-[12px] font-normal font-Open lg:text-[16px]">
              Collectible Amount:
            </p>
            {`\u20B9`} {roundedCODValue?.toLocaleString("en-IN")}
          </div>
          <div className="flex justify-between">
            <p className="text-[12px] font-normal font-Open lg:text-[16px]">
              Billable Weight:
            </p>
            <p> {appliedWeight} kg</p>
          </div>
          <div className="flex justify-between">
            <p className="text-[12px] font-normal font-Open lg:text-[16px]">
              Order Price:
            </p>
            <p>
              {`\u20B9`} {roundedOrderPrice?.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-[12px] font-normal font-Open lg:text-[16px]">
              COD:
            </p>
            <p>
              {`\u20B9`} {codChargeValuePrice?.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-[12px] font-normal font-Open lg:text-[16px]">
              Insurance Price:
            </p>
            <p>
              {`\u20B9`} {roundedInsuranceValue?.toLocaleString("en-IN")}
            </p>
          </div>
          {/* Additional sections... */}
          <div className="flex justify-between">
            <p className="text-[12px] font-normal font-Open lg:text-[16px]">
              Tax:
            </p>
            <p>
              {`\u20B9`} {roundedTaxValue?.toLocaleString("en-IN")}
            </p>
          </div>
          <hr className="mt-[100px]"></hr>
          <div className="flex justify-between mt-[5px] ">
            <p className="text-[12px] font-medium font-Open text-[#004EFF] lg:text-[16px] lg:font-semibold ">
              Gross Total:
            </p>
            <p className="text-[#004EFF]">
              {`\u20B9`} {roundedPrice?.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingDetails;
