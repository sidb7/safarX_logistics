import NavBar from "../../../layout/Old_NavBar";
import { ResponsiveState } from "../../../utils/responsiveState";
import YaariPointsIcon from "../../../assets/Transaction/YaariPoints.svg";
import Checkbox from "../../../components/CheckBox";
import CustomButton from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CompanyLogo from "./../../../assets/CompanyLogo/shipyaari icon.svg";
import CenterModal from "../../../components/CustomModal/customCenterModal";

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

const WalletMain = () => {
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

    const note = (className = "") => {
      return (
        <>
          <p
            className={`${className} mx-5 mt-[26px] text-[#494949] text-[12px] font-Open font-normal leading-4`}
          >
            NOTE: Recharge is mandatory for shipping orders.
          </p>
        </>
      );
    };

    return (
      <div
        className={`${
          isMdScreen ? " m-auto   !w-[688px] h-[100%] " : "w-full !h-full"
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
          <div className="overflow-y-auto">
            <div className="md:grid md:grid-cols-2 md:py-6  md:mt-6">
              <div className="md:grid">
                <div className="mx-5  mt-[148px] md:mt-[0px] ">
                  <h1 className="font-Lato text-[22px] font-bold leading-7 text-center">
                    Welcome to Shipyaari
                  </h1>
                  {/* Temporary Comment */}
                  {/* <p className="mt-3 text-[#494949] text-[16px] font-light text-center">
                Recharge your wallet with minimum of
                <span className="text-[#323232] font-medium md:block">
                  {" "}
                  ₹100
                </span>
              </p> */}
                  <div className="flex justify-center items-center">
                    <img src={YaariPointsIcon} alt="" />
                  </div>
                  {isMdScreen && note("text-left")}
                </div>
              </div>
              <div className="md:grid  ">
                <div className="mx-5 md:mt-0  rounded-md border-[1.5px] border-[#E8E8E8] py-6 px-3 drop-shadow-sm">
                  <div className="md:space-y-4">
                    <h1 className="ml-2 font-Lato font-semibold text-[20px] text-[#1C1C1C] leading-[26px]">
                      Benefits of shipyaari wallet
                    </h1>
                    <div className="flex mt-[26px]">
                      <Checkbox
                        checked={true}
                        checkboxClassName="text-black"
                        style={{ accentColor: "black" }}
                      />
                      <p className="ml-2 mt-[2px] text-[16px] font-Open font-normal leading-[22px]">
                        Get Discounts/Offers on Recharge
                      </p>
                    </div>
                    <div className="flex">
                      <Checkbox
                        checked={true}
                        checkboxClassName="text-black"
                        style={{ accentColor: "black" }}
                      />
                      <p className="ml-2 mt-[2px] text-[16px] font-Open font-normal leading-[22px]">
                        Faster order processing
                      </p>
                    </div>
                    <div className="flex">
                      <Checkbox
                        checked={true}
                        checkboxClassName="text-black"
                        style={{ accentColor: "black" }}
                      />
                      <p className="ml-2 mt-[2px] text-[16px] font-Open font-normal leading-[22px]">
                        Instant Payment Processing
                      </p>
                    </div>
                    <div className="flex">
                      <Checkbox
                        checked={true}
                        checkboxClassName="text-black"
                        style={{ accentColor: "black" }}
                      />
                      <p className="ml-2 mt-[2px] text-[16px] font-Open font-normal leading-[22px]">
                        Simplified Accounting
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mx-5 mt-[50px] md:mt-4">
                  <CustomButton
                    text={"VERIFY BANK"}
                    // onClick={() => }
                    onClick={() => handleRechargeNow()}
                  />
                </div>

                <div
                  className="flex justify-center mt-4 cursor-pointer"
                  onClick={() => navigate("/dashboard/overview")}
                >
                  {/* <p className="text-[14px] font-semibold font-Open leading-5  text-[#004EFF] text-sm underline underline-offset-4	decoration-[#004EFF]">
                  SKIP FOR NOW{" "}
                </p> */}
                </div>
              </div>
              {!isMdScreen && note()}
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
export default WalletMain;
