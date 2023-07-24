import CompanyLogo from "./../../../assets/CompanyLogo/shipyaari icon.svg";
import CloseIcon from "./../../../assets/CloseIcon.svg";
import ShippingSupplies from "./../../../assets/Delivery/Shipping Supplies 1.svg";
import CustomButton from "../../../components/Button/index";
import CenterModal from "../../../components/CustomModal/customCenterModal";
import { ResponsiveState } from "../../../utils/responsiveState";
import { useState } from "react";

const Index = () => {
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

  const getStarted = () => {
    return (
      <div className="relative h-full w-full">
        {isLgScreen && modalTitle()}
        <div className="lg:mx-24 lg:mt-[84px]">
          <div className="flex flex-col gap-y-8">
            <div className="product-box flex items-center lg:hidden">
              <img
                className="m-4 h-[25px] object-contain"
                src={CompanyLogo}
                alt="CompanyLogo"
              />
            </div>

            <div className="flex flex-col mt-7 mx-4 gap-y-6">
              <p className="text-center text-2xl font-medium">Get Started</p>
              <p className="text-center font-thin">
                Let us understand your requirements so that we can serve you
                better .
              </p>
            </div>

            <div className=" flex flex-col mx-4 gap-y-6">
              <img
                className="h-[180px] "
                src={ShippingSupplies}
                alt="SupplyGif"
              />

              <CustomButton onClick={() => {}} text="SET UP MY ACCOUNT" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {isLgScreen && isModalOpen && (
        <CenterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {getStarted()}
        </CenterModal>
      )}

      {!isLgScreen && getStarted()}
    </>
  );
};

export default Index;
