import React from "react";
import ArrowDownIcon from "../../../assets/OrderDetails/ArrowDownIcon.svg";
interface IProductData {
  props: {
    header: string;
    header2: string;
    orders: string;
    nameOfTheOrder?: string;
    recharge?: string;
  }[];
}
const ErrorFile: React.FunctionComponent<IProductData> = ({ props }) => {
  return (
    <div className="mt-5">
      <div>
        {props.map((each: any, index: any) => {
          return (
            <div className="border-2 rounded-lg p-4  mt-4 border-[#E8E8E8]">
              <div className="flex justify-between">
                <p className="text-[16px] font-medium">{each.header}</p>
                <div className="flex gap-x-4">
                  <p className="border-b-[1.5px] border-[#004EFF] text-[#004EFF] text-[14px] font-medium">
                    {each.header2}
                  </p>
                  <img src={ArrowDownIcon} alt="" />
                </div>
              </div>
              <p className="text-[14px] mt-2">{each.orders}</p>
              {each.nameOfTheOrder ? (
                <>
                  <div className="flex justify-between mt-2">
                    <p>{each.nameOfTheOrder}</p>
                    <p className="border-b-[1.5px] border-[#004EFF] text-[#004EFF]">
                      {each.recharge}
                    </p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p>{each.nameOfTheOrder}</p>
                    <p className="border-b-[1.5px] border-[#004EFF] text-[#004EFF]">
                      {each.recharge}
                    </p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p>{each.nameOfTheOrder}</p>
                    <p className="border-b-[1.5px] border-[#004EFF] text-[#004EFF]">
                      {each.recharge}
                    </p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p>{each.nameOfTheOrder}</p>
                    <p className="border-b-[1.5px] border-[#004EFF] text-[#004EFF]">
                      {each.recharge}
                    </p>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ErrorFile;
