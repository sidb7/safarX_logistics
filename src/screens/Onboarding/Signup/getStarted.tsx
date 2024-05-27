import CompanyLogo from "./../../../assets/CompanyLogo/shipyaari icon.svg";
// import CloseIcon from "./../../../assets/CloseIcon.svg";
import shippingSupplies from "../../../assets/Shipping Supplies 1.gif";
// import ShippingSupplies from "./../../../assets/Delivery/Shipping Supplies 1.svg";
import CustomButton from "../../../components/Button/index";
import CenterModal from "../../../components/CustomModal/customCenterModal";
import { ResponsiveState } from "../../../utils/responsiveState";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { constructNavigationObject } from "../../../utils/utility";
import { LARGE_LOGO } from "../../../utils/ApiUrls";
import OneButton from "../../../components/Button/OneButton";

const Index = () => {
  const { isLgScreen, isMdScreen } = ResponsiveState();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();

  const modalTitle = () => {
    return (
      <div className="product-box sticky z-10 bg-white flex justify-between items-center w-full h-[60px] top-0">
        <img
          className="my-auto ml-6  h-[25px] object-contain"
          src={LARGE_LOGO}
          alt="Company Logo"
        />
        {/* <img
          className="my-auto mr-6"
          src={CloseIcon}
          alt="Close"
          onClick={() => setIsModalOpen(false)}
        /> */}
      </div>
    );
  };

  const getStarted = () => {
    return (
      <div
        className={` ${
          isMdScreen ? "custom_shadow m-auto  !w-[500px]" : ""
        } flex flex-col relative lg:px-0 lg:gap-y-0 rounded-lg`}
      >
        <div className="product-box flex items-center ">
          <img
            className="m-4 h-[25px] object-contain"
            src={LARGE_LOGO}
            alt="CompanyLogo"
          />
        </div>
        {/* {isLgScreen && modalTitle()} */}
        <div className="">
          <div className="flex flex-col md:mx-[90px] gap-y-8">
            <div className="flex flex-col mt-11 md:mt-6 mx-4 gap-y-6">
              <p className="text-center font-Lato text-[22px] font-bold leading-7">
                Get Started
              </p>
              <p className="text-center font-Open text-base font-light leading-5 text-[#494949]">
                Let us understand your requirements so that we can serve you
                better .
              </p>
            </div>

            <div className=" flex flex-col mx-4 md:mb-44 gap-y-6">
              <div className="flex justify-center">
                <img
                  className="h-[180px] w-[180px] "
                  src={shippingSupplies}
                  alt="SupplyGif"
                />
              </div>

              {/* <CustomButton
                className=" bg-black  "
                onClick={() => {
                  const navigationObject = constructNavigationObject(
                    "/onboarding/questionnaire/question1",
                    window.location.search
                  );
                  navigate(navigationObject);
                }}
                text="SET UP MY ACCOUNT"
              /> */}
              <OneButton
                variant="primary"
                onClick={() => {
                  const navigationObject = constructNavigationObject(
                    "/onboarding/questionnaire/question1",
                    window.location.search
                  );
                  navigate(navigationObject);
                }}
                text="SET UP MY ACCOUNT"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {isMdScreen && (
        // <CenterModal
        //   shouldCloseOnOverlayClick={false}
        //   isOpen={isModalOpen}
        //   // onRequestClose={() => setIsModalOpen(false)}
        // >
        <div className="flex justify-center items-center h-screen">
          {" "}
          {getStarted()}
        </div>
        // </CenterModal>
      )}

      {!isLgScreen && getStarted()}
    </>
  );
};

export default Index;
