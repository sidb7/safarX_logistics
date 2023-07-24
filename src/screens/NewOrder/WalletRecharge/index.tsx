import NavBar from "../../../layout/NavBar";
import Checkbox from "../../../components/CheckBox";
import CustomButton from "../../../components/Button";
import BannerPagination from "../../../assets/Banner pagination.svg";
import { useNavigate } from "react-router-dom";
import { ResponsiveState } from "../../../utils/responsiveState";
import { useState } from "react";
import CenterSideModal from "../../../components/CustomModal/customCenterModal";
import CompanyLogo from "./../../../assets/CompanyLogo/shipyaari icon.svg";
import CloseIcon from "../../../assets/CloseIcon.svg";

const WalletRecharge = () => {
  const navigate = useNavigate();
  const { isLgScreen } = ResponsiveState();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const modalTitle = () => {
    return (
      <div className="product-box flex justify-between items-center w-full h-[60px] absolute top-0">
        <img
          className="my-auto ml-6  h-[25px] object-contain"
          src={CompanyLogo}
          alt="Company Logo"
        />
        <img
          className="my-auto mr-6"
          src={CloseIcon}
          alt="Close"
          onClick={() => setIsModalOpen(false)}
        />
      </div>
    );
  };

  const walletRecharge = () => {
    return (
      <div className="relative h-full">
        {!isLgScreen ? (
          <header className="fixed top-0 z-50 w-full ">
            <NavBar />
          </header>
        ) : (
          modalTitle()
        )}
        <div className="lg:grid lg:grid-cols-2">
          <div className="lg:grid">
            <div className="mx-5  mt-[148px] lg:mt-[110px]">
              <h1 className="text-[22px] font-semibold leading-7 text-center">
                Welcome to Shipyaari
              </h1>
              <p className="mt-3 text-[#494949] font-light text-center">
                Recharge your wallet with minimum of
                <span className="text-[#323232] font-medium lg:block"> ₹100</span>
              </p>
              {isLgScreen && note("text-left")}
            </div>
          </div>
          <div className="lg:grid">
            <div className="mx-5 mt-24 rounded-lg border-[1.5px] border-[#E8E8E8] py-6 px-3 drop-shadow-sm">
              <div className="lg:space-y-4">
                <h1 className="ml-2 text-[20px] font-medium">
                  Benefits of shipyaari wallet
                </h1>
                <div className="flex mt-[26px]">
                  <Checkbox checked={true} checkboxClassName="text-black" />
                  <p className="ml-2 mt-[2px]">
                    Get Discounts/Offers on Recharge
                  </p>
                </div>
                <div className="flex">
                  <Checkbox checked={true} checkboxClassName="text-black" />
                  <p className="ml-2 mt-[2px]">Fater order processing</p>
                </div>
                <div className="flex">
                  <Checkbox checked={true} checkboxClassName="text-black" />
                  <p className="ml-2 mt-[2px]">Instant Payment Processing</p>
                </div>
                <div className="flex">
                  <Checkbox checked={true} checkboxClassName="text-black" />
                  <p className="ml-2 mt-[2px]">Simplified Accounting</p>
                </div>
              </div>
            </div>
            <div className="mx-5 mt-[84px] lg:mt-4">
              <CustomButton
                text={"RECHARGE NOW"}
                onClick={() => navigate("/neworder/rechargepayment")}
              />
            </div>

            <div className="flex justify-center mt-4">
              <p className="text-[14px] text-[#004EFF] font-semibold border-b-2 border-[#004EFF]">
                SKIP FOR NOW{" "}
              </p>
            </div>
          </div>
          {!isLgScreen && note()}
        </div>
      </div>
    );
  };

  const note = (className = "") => {
    return (
      <>
        <p className={`${className} mx-5 mt-[26px] text-[#494949] text-[12px]`}>
          NOTE: Recharge is mandatory for shipping orders.
        </p>
        {/* <div className="mt-[26px] flex justify-center">
          <img src={BannerPagination} alt="" />
        </div> */}
      </>
    );
  };
  return (
    <>
      {isLgScreen && isModalOpen && (
        <CenterSideModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          className="h-[490px] w-[688px]"
        >
          {walletRecharge()}
        </CenterSideModal>
      )}

      {!isLgScreen && walletRecharge()}
    </>
  );
};
export default WalletRecharge;
