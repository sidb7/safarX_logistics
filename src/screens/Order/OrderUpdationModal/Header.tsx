import React from "react";
import { COMPANY_NAME } from "../../../utils/ApiUrls";

//Header file of the Order Updatation Modal
const Header = (getIdData: any) => {
  //getting the whole data
  const OrderData = getIdData?.getIdData?.getIdData?.data;
  //destructuring the OrderID
  const OrderID = OrderData?.orderNumber;
  //destructuring the ShipyaariID/
  const ShipyaariID = OrderData?.orderId;

  return (
    <div>
      <div className="flex justify-between mt-[1rem] rounded-lg mx-[1rem] h-[3rem] items-center bg-[#E5EDFF] border-b-2 w-[95%] px-[1rem] text-[16px]  py-8 ">
        {
          <>
            <div className="flex flex-col gap-y-1 py-1">
              <p>
                <span>Order ID :</span> {OrderID}
              </p>
              <p>
                <span>{COMPANY_NAME} ID :</span>{" "}
                {ShipyaariID?.[0] === "T"
                  ? ShipyaariID?.split("T")[1]
                  : ShipyaariID}
              </p>
            </div>
          </>
        }
      </div>
    </div>
  );
};

export default Header;
