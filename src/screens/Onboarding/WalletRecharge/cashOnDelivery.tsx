import NavBar from "../../../layout/Old_NavBar";
import { ResponsiveState } from "../../../utils/responsiveState";
import YaariPointsIcon from "../../../assets/Transaction/YaariPoints.svg";
import Checkbox from "../../../components/CheckBox";
import CustomButton from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import CompanyLogo from "./../../../assets/CompanyLogo/shipyaari icon.svg";
import CenterModal from "../../../components/CustomModal/customCenterModal";
import { getLocalStorage, removeLocalStorage } from "../../../utils/utility";
import { POST } from "../../../utils/webService";
import { PHONEPE_TRANSACTION_STATUS } from "../../../utils/ApiUrls";

const modalTitle = () => {
  return (
    <div className="product-box flex justify-between items-center w-full h-[60px] absolute top-0">
      <img
        className=" ml-6  h-[25px] object-contain"
        src={CompanyLogo}
        alt="Company Logo"
      />
    </div>
  );
};

const Cashondelivery = () => {
  const { isLgScreen, isMdScreen } = ResponsiveState();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();
  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);

  const WalletRechargeMain = () => {
    const handleRechargeNow = () => {
      navigate("/onboarding/wallet-details");
      setIsRechargeModalOpen(true);
      setIsModalOpen(false);
    };

    useEffect(() => {
      (async () => {
        try {
          const phonePeTransactionId = getLocalStorage("phonePeTransactionId");
          if (phonePeTransactionId) {
            await POST(PHONEPE_TRANSACTION_STATUS, {
              orderId: phonePeTransactionId,
              transactionId: phonePeTransactionId,
              paymentGateway: "PHONEPE",
            });
            removeLocalStorage("phonePeTransactionId");
          }
        } catch (error) {}
      })();
    }, []);

    return (
      <div
        className={`${
          isMdScreen
            ? " m-auto   !w-[31.25rem] h-[32.75rem] "
            : "w-full !h-full"
        }flex flex-col  justify-center relative md:px-0 md:gap-y-0`}
      >
        <div className={`${isMdScreen ? "custom_shadow" : ""}`}>
          <div className="product-box flex justify-between items-center w-full h-[60px] top-0 pl-5">
            <img
              className="my-auto h-[25px] object-contain"
              src={CompanyLogo}
              alt="Company Logo"
            />
          </div>
          <div className="h-[26rem] px-[5.62rem] pt-[5.25rem]">
            <div className="">
              <div className="">
                <div className="mx-5  mt-[44px] md:mt-[0px] text-center">
                  <h1 className="text-center text-[#323232] text-[22px] font-bold font-Lato leading-7">
                    Cash On Delivery
                  </h1>
                  <h4 className="text-center mt-3 text-base text-[#494949] font-light">
                    Do you accept COD orders?
                  </h4>
                </div>
              </div>
            </div>
            <div className="mx-5 mt-[6rem]">
              <CustomButton
                text={"YES"}
                onClick={() => navigate("/onboarding/wallet-details")}
              />
            </div>
            <div className="mx-5 mt-[4rem] md:mt-6">
              <CustomButton
                text={"Skip"}
                onClick={() => navigate("/dashboard/overview")}
                className="!bg-white !text-black border-solid border-2 border-[#A4A4A4]"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="md:flex   md:h-[100vh]">
      {isMdScreen && WalletRechargeMain()}
      {!isLgScreen && !isMdScreen && WalletRechargeMain()}
    </div>
  );
};
export default Cashondelivery;
