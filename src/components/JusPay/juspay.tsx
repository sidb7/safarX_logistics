import React, { useEffect, useState } from "react";
import JusPayIcon from "../../assets/juspay.png";
import { INITIAL_RECHARGE, SELLER_WEB_URL } from "../../utils/ApiUrls";
import { POST } from "../../utils/webService";
import PaymentLoader from "../paymentLoader/paymentLoader";
import { Spinner } from "../../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { PaymentSlice } from "../../redux/reducers/paymentReducer";

interface IProps {
  isDisabled?: boolean;
  amount?: any;
  callbackUrl?: any;
}

const JusPay = (props: IProps) => {
  const { isDisabled, amount, callbackUrl } = props;
  const [paymentLoader, setpaymentLoader] = useState<any>(false);
  const [loading, setLoading] = useState<any>(false);
  const dispatch = useDispatch();

  const rechargeAmountFromRedux = useSelector(
    (state: any) => state?.payment?.amount
  );

  const startPayments = async (
    amountFromRedux?: any,
    callbackUrlRedux?: any
  ) => {
    setLoading(true);
    let initialObject = {
      amount: amountFromRedux ? amountFromRedux.toString() : amount,
      callbackUrl: callbackUrlRedux ? callbackUrlRedux : callbackUrl,
    };

    const { data: response } = await POST(INITIAL_RECHARGE, {
      paymentObject: initialObject,
      paymentGateway: "JUSPAY",
    });
    if (response?.success === true) {
      if (response?.data?.status === "NEW") {
        localStorage.setItem("order_id", response?.data?.order_id);
        window.location.replace(response?.data?.payment_links?.web);
        // setLoading(false);
      }
    } else {
      setLoading(false);
    }
    dispatch(PaymentSlice.actions.paymentAmount(0));
  };

  // Added This UseEffect and following code for direct payment from View-Orders Draft Page Errors Section
  useEffect(() => {
    let callbackUrl = `${SELLER_WEB_URL}/orders/view-orders`;
    if (rechargeAmountFromRedux)
      startPayments(rechargeAmountFromRedux, callbackUrl);
  }, []);
  return (
    <>
      {paymentLoader ? (
        <PaymentLoader />
      ) : loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center gap-y-2 ">
          <div className="w-20 h-20 flex justify-center items-center">
            <img
              src={JusPayIcon}
              alt=""
              height={60}
              width={60}
              className="ml-0 object-contain"
            />
          </div>
          <button
            disabled={isDisabled}
            type="button"
            //as a part of ui figma fixes commneted
            // className={`${
            //   !isDisabled
            //     ? "!bg-opacity-50  hover:!bg-black hover:-translate-y-[2px] hover:scale-100 duration-150"
            //     : "!bg-opacity-50"
            // } flex p-2 justify-center items-center text-white bg-black rounded-md h-9 w-full`}
            onClick={() => startPayments()}
          >
            <p className="buttonClassName lg:text-[14px] whitespace-nowrap">
              JusPay
            </p>
          </button>
        </div>
      )}
    </>
  );
};

export default JusPay;
