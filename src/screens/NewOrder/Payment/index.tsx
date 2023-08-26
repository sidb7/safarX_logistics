import React, { useEffect, useState } from "react";
import Checkbox from "../../../components/CheckBox";
import Moneylogo from "../../../assets/Payment/money.svg";
import Accountlogo from "../../../assets/Payment/Account.svg";
import rechargeIcon from "../../../assets/Payment/rechargeIcon.svg";
import upiIcon from "../../../assets/Payment/upiIcon.svg";
import cardPayment from "../../../assets/Payment/cardPaymentIcon.svg";
import bankTransfer from "../../../assets/Payment/bankTransferIcon.svg";
import netBanking from "../../../assets/Payment/netBankingIcon.svg";
import customerReward from "../../../assets/Payment/Customer Reward 1.svg";
import CustomInputBox from "../../../components/Input";
import discountIcon from "../../../assets/Payment/discount-shape.svg";
import WebBackArrowIcon from "../../../assets/PickUp/EssentialWeb.svg";
import UpiPayment from "./upiPayment";
import ServiceButton from "../../../components/Button/ServiceButton";
import { useNavigate } from "react-router-dom";
import Toast from "./toast";
import { useSelector, useDispatch } from "react-redux";
import "react-tooltip/dist/react-tooltip.css";
import BackArrowIcon from "../../../assets/backArrow.svg";
import Stepper from "../../../components/Stepper";
import TickLogo from "../../../assets/common/Tick.svg";
import { Tooltip } from "react-tooltip";
import NavBar from "../../../layout/Old_NavBar";
import CustomModal from "../../../components/CustomModal";
import CustomBottomModal from "../../../components/CustomModal/customBottomModal";
import { paymentState } from "../../../redux/reducers/paymentReducer";
import YaariPointsIcon from "../../../assets/Transaction/YaariPoints.svg";
import { useMediaQuery } from "react-responsive";
import Label from "../Label";
import RightSideModal from "../../../components/CustomModal/customRightModal";
import CustomCenterModal from "../../../components/CustomModal/customCenterModal";
import { Link } from "react-router-dom";
import DoneIcon from "../../../assets/Payment/Done.gif";
import WebCrossIcon from "../../../assets/PickUp/ModalCrossWeb.svg";
import { Breadcum } from "../../../components/Layout/breadcrum";

const steps = [
  {
    label: "Pickup",
    isCompleted: true,
    isActive: false,
    imgSrc: TickLogo,
  },
  {
    label: "Delivery",
    isCompleted: true,
    isActive: false,
    imgSrc: TickLogo,
  },
  {
    label: "Product",
    isCompleted: true,
    isActive: false,
    imgSrc: TickLogo,
  },
  {
    label: "Service",
    isCompleted: true,
    isActive: false,
    imgSrc: TickLogo,
  },
  {
    label: "Payment",
    isCompleted: false,
    isActive: true,
    imgSrc: TickLogo,
  },
];

const Index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [payment, setPayment] = useState(false);
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState(false);
  const [placeOrder, setPlaceOrder] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [footer, setFooter] = useState(true);
  const [isLabelRightModal, setIsLabelRightModal] = useState(false);
  const [isPostPaymentModal, setIsPostPaymentModal] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const isItLgScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const handleUpiPayment: any = () => {
    if (payment === true) {
      setPayment(false);
    }
  };

  const handleUpi = () => {
    if (modal === true) {
      setModal(false);
    } else {
      setModal(true);
    }
  };

  const checkBoolean = useSelector((state: any) => state.payment.payNow);
  const checkYaariPoints = useSelector(
    (state: any) => state.payment.yaariPointsAvail
  );

  useEffect(() => {
    if (modalIsOpen === true) {
      setFooter(false);
    } else {
      setFooter(true);
    }
  });

  useEffect(() => {
    if (checkBoolean === true) {
      setToast(true);
      setPlaceOrder(true);
      setTimeout(() => {
        setToast(false);
        dispatch(paymentState(false));
      }, 5000);
    }
  }, [checkBoolean]);

  const ModalContent = () => {
    return (
      <div className="flex flex-col  w-full h-full p-5">
        <div className="flex justify-end">
          <img
            src={WebCrossIcon}
            alt=""
            className="cursor-pointer"
            onClick={() => setIsPostPaymentModal(false)}
          />
        </div>
        <div className="flex flex-col  mt-4">
          <div className="flex justify-center items-center mt-7   ">
            <img src={DoneIcon} alt="Done Gif" width={124} height={125} />
          </div>
          <div className="flex flex-col items-center mt-4 font-semibold text-[18px]  ">
            <p>Thank you!</p>
            <p>Your order has been placed.</p>
            <p>You can find your orders in order section</p>
          </div>
        </div>
        <div className="flex justify-center items-center mt-10">
          <ServiceButton
            text="GO TO ORDER"
            className="bg-[#1C1C1C] px-4 py-2 text-white font-semibold text-sm"
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      <Breadcum label="Add New Order" />
      <div className="lg:mb-8">
        <Stepper steps={steps} />
      </div>
      <div className="inline-flex space-x-2 items-center px-3">
        <img src={Moneylogo} alt="" />
        <p className="text-lg font-semibold text-[#202427] lg:font-normal lg:text-[24px] ">
          Payment
        </p>
      </div>
      <div className=" lg:mb-8 h-[49.667px] bg-[#4D83FF] rounded-[4px] flex justify-center items-center mt-5 lg:mx-5  lg:justify-start">
        <div className="flex text-center  lg:w-full text-sm font-semibold text-[#FFFFFF]  leading-5">
          <p
            className={`${
              isItLgScreen
                ? "px-[16px] py-[13px] text-[16px] font-semibold"
                : ""
            }`}
          >
            Get welcome gift of 100 bonus point with wallet payments
          </p>
        </div>
      </div>

      <div className="mx-5 ">
        <div className="grid lg:grid-cols-2 gap-x-[27px] lg:mb-4">
          <div className="w-full  my-5 p-3 rounded-lg border-2 border-solid border-[#E8E8E8] shadow-sm h-[174px]">
            <div className="flex items-center gap-2">
              <img src={Accountlogo} alt="" />
              <p className="text-sm lg:text-[18px] lg:font-semibold lg:text-[#1C1C1C]">
                Your wallet balance
              </p>
              <p className="lg:text-[18px] lg:font-semibold lg:text-[#1C1C1C]">
                ₹0
              </p>
            </div>
            <p className="text-[12px] leading-4 text-[#BBBBBB] my-1 lg:font-normal">
              Endless wallet balance with automatic add money
            </p>
            <p className="text-[16px] my-2 lg:font-semibold lg:text-[#1C1C1C]">
              ₹2000
            </p>
            <div className="grid grid-cols-4 gap-2 mt-3">
              <div className="border-[1.5px] p-2 rounded-lg items-center border-solid border-[#004EFF]">
                <p className="text-[16px] text-[#004EFF] lg:font-semibold lg:text-[14px]">
                  ₹2000
                </p>
              </div>
              <div className="border-[1.5px] p-2 rounded-[4px] items-center border-solid border-[#1C1C1C]">
                <p className="text-[16px] lg:font-semibold lg:text-[14px]">
                  ₹3000
                </p>
              </div>
              <div className="border-[1.5px] p-2 rounded-[4px] items-center border-solid border-[#1C1C1C]">
                <p className="text-[16px] lg:font-semibold lg:text-[14px]">
                  ₹4000
                </p>
              </div>
              <div className="border-[1.5px] p-2 rounded-[4px] items-center border-solid border-[#1C1C1C]">
                <p className="text-[16px] lg:font-semibold lg:text-[14px]">
                  ₹5000
                </p>
              </div>
            </div>
          </div>

          {/*Second */}

          <div className="hidden lg:block">
            <div className="flex items-center justify-between mt-5   p-4 rounded-lg border-2 border-solid  border-[#E8E8E8]   shadow-sm h-[174px]  ">
              {checkYaariPoints ? (
                <div className="w-[200px] flex flex-col justify-between">
                  <div>
                    <div className="flex ">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-x-2 mt-4">
                        <span
                          className="font-medium"
                          data-tooltip-id="my-tooltip-inline"
                          data-tooltip-content="Welcome 100 yaari points has been added"
                        >
                          Yaari Points
                        </span>
                        <span className="text-center text-[16px] font-bold">
                          100
                        </span>
                      </div>
                      <Tooltip
                        id="my-tooltip-inline"
                        style={{ backgroundColor: "#4D83FF", color: "#FFFFFF" }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center items-center mt-12">
                    <Checkbox />
                    <p className="text-[14px] font-medium lg:whitespace-nowrap uppercase text-[#004EFF]">
                      REDEEM ON EVERY ORDER
                    </p>
                  </div>

                  <Tooltip
                    id="my-tooltip"
                    style={{
                      backgroundColor: "rgb(0, 255, 30)",
                      color: "#222",
                    }}
                  />
                </div>
              ) : (
                <div className="flex flex-col h-full ">
                  <div className="flex flex-col mb-12">
                    <p className="text-[12px] lg:text-[18px] lg:font-semibold lg:text-[#1C1C1C]  ">
                      Yaari points are availed after first
                    </p>
                    <p className="g:text-[18px] lg:font-semibold lg:text-[#1C1C1C] ">
                      order is placed
                    </p>
                  </div>

                  <p className="text-[12px] text-[#004EFF] lg:font-semibold lg:text-[16px] ">
                    Tap to know how it works
                  </p>
                </div>
              )}
              <div>
                <img
                  src={YaariPointsIcon}
                  alt=""
                  className="object-contain"
                  height={170}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-x-2 lg:mb-2">
          <Checkbox />
          <p className="text-[14px] font-medium lg:font-semibold uppercase text-[#CCDCFF]">
            INSTANT RECHARGE WITH COD
          </p>
        </div>

        <p className="mt-3 text-[12px] text-[#BBBBBB] mb-10 lg:font-normal lg:mb-5">
          Add money to wallet with COD
        </p>

        {/* Available Offers Mobile */}
        <div className="flex  gap-2 lg:hidden">
          <img src={discountIcon} alt="" />
          <p className="text-lg font-semibold">Available offers</p>
        </div>
        <div className="flex flex-nowwrap overflow-x-scroll space-x-4 mb-7 lg:hidden">
          <div className="bg-[#f0faf6] p-3 border-2 border-solid border-[#E8E8E8]  my-3 rounded-lg">
            <p className="text-[14px] font-semibold">10% EXTRA up to ₹1000</p>
            <p className="mt-[7px] text-[12px] text-[#606060]">
              Use standard charter Digismart credit card
            </p>
            <div className="w-[245px] flex flex-row justify-between my-3">
              <p className="text-[12px] text-[#004EFF] mt-1">
                Save up to ₹500 with this code
              </p>
              <p className="text-[16px]">Apply</p>
            </div>
          </div>
          <div className="bg-[#FDF6EA] p-3 border-2 border-solid border-[#E8E8E8]  my-3 rounded-lg">
            <p className="text-[14px] font-semibold">10% EXTRA up to ₹1000</p>
            <p className="mt-[7px] text-[12px] text-[#606060]">
              Use standard charter Digismart credit card
            </p>
            <div className="w-[245px] flex flex-row justify-between my-3">
              <p className="text-[12px] text-[#004EFF] mt-1">
                Save up to ₹500 with this code
              </p>
              <p className="text-[16px]">Apply</p>
            </div>
          </div>
        </div>

        {/* Available Offers Web */}
        <div className=" gap-2 hidden lg:flex ">
          <img src={discountIcon} alt="" />
          <p className="text-lg font-semibold  lg:font-normal lg:text-2xl lg:text-[#323232]">
            Available offers
          </p>
        </div>
        <div className="lg:flex flex-nowrap w-full overflow-x-scroll gap-x-4 hidden lg:mb-5">
          <div className="bg-[#f0faf6] p-3 lg:p-4 border-2 border-solid border-[#E8E8E8]  my-3 rounded-lg lg:min-w-[33.33%]">
            <p className="text-[14px] font-semibold">10% EXTRA up to ₹1000</p>
            <p className="mt-[7px] text-[12px] text-[#606060]">
              Use standard charter Digismart credit card
            </p>
            <div className="w-[245px] flex flex-row justify-between my-3">
              <p className="text-[12px] text-[#004EFF] mt-1">
                Save up to ₹500 with this code
              </p>
              <p className="text-[16px]">Apply</p>
            </div>
          </div>
          <div className="bg-[#FDF6EA] p-3 lg:p-4  border-2 border-solid border-[#E8E8E8]  my-3 rounded-lg  lg:min-w-[33.33%]">
            <p className="text-[14px] font-semibold">10% EXTRA up to ₹1000</p>
            <p className="mt-[7px] text-[12px] text-[#606060]">
              Use standard charter Digismart credit card
            </p>
            <div className="w-[245px] flex flex-row justify-between my-3">
              <p className="text-[12px] text-[#004EFF] mt-1">
                Save up to ₹500 with this code
              </p>
              <p className="text-[16px]">Apply</p>
            </div>
          </div>

          <div className="bg-[#FDEDEA] p-3 lg:p-4  border-2 border-solid border-[#E8E8E8]  my-3 rounded-lg  lg:min-w-[33.33%]">
            <p className="text-[14px] font-semibold">10% EXTRA up to ₹1000</p>
            <p className="mt-[7px] text-[12px] text-[#606060]">
              Use standard charter Digismart credit card
            </p>
            <div className="w-[245px] flex flex-row justify-between my-3">
              <p className="text-[12px] text-[#004EFF] mt-1">
                Save up to ₹500 with this code
              </p>
              <p className="text-[16px]">Apply</p>
            </div>
          </div>
        </div>

        <div className=" mb-7 lg:mb-6 lg:w-1/3">
          <CustomInputBox
            inputClassName="border-2 border-solid border-[#A4A4A4]"
            label="Have a gift card?"
            labelClassName="text-[#A4A4A4]"
          />
        </div>
        {/* Yaari Points Mobile */}
        <div className=" lg:hidden  grid grid-cols-2 w-100%  mb-7 p-3 rounded-lg border-2 border-solid border-[#E8E8E8] shadow-sm">
          {checkYaariPoints ? (
            <div className="w-[200px] flex flex-col justify-between">
              <div>
                <div className="flex ">
                  <div className="flex flex-col mt-4">
                    <span
                      className="font-medium"
                      data-tooltip-id="my-tooltip-inline"
                      data-tooltip-content="Welcome 100 yaari points has been added"
                    >
                      Yaari Points
                    </span>
                    <span className="text-center text-[16px] font-bold">
                      100
                    </span>
                  </div>
                  <Tooltip
                    id="my-tooltip-inline"
                    style={{ backgroundColor: "#4D83FF", color: "#FFFFFF" }}
                  />
                </div>
              </div>
              <div className="flex justify-center items-center mt-12">
                <Checkbox />
                <p className="text-[14px] font-medium uppercase text-[#004EFF]">
                  REDEEM ON EVERY ORDER
                </p>
              </div>

              <Tooltip
                id="my-tooltip"
                style={{ backgroundColor: "rgb(0, 255, 30)", color: "#222" }}
              />
            </div>
          ) : (
            <div className="w-[200px] flex flex-col justify-between gap-y-5">
              <p className="text-[12px]">
                Yaari points are availed after first order is placed
              </p>
              <p className="text-[12px] text-[#004EFF]">
                Tap to know how it works
              </p>
            </div>
          )}
          <div className="col-end-7">
            <img src={customerReward} alt="" className="object-contain" />
          </div>
        </div>
        {/* Payment Gateway */}
        <div className="lg:grid grid-cols-2">
          <div className="w-full   my-5 p-3 rounded-lg border-2 border-solid border-[#E8E8E8] shadow-sm lg:p-4">
            <div className="flex  gap-x-2 text-[14px]">
              <img src={rechargeIcon} alt="" className="object-contain" />
              <p className="  font-semibold text-sm lg:text-lg lg:text-[#1C1C1C]">
                {isItLgScreen
                  ? "Payment gateway"
                  : "Recharge with payment gateway"}
              </p>
            </div>

            <div className="flex mt-4 mb-6  justify-between lg:mb-0 ml-4 mr-5">
              <div
                className="flex flex-col items-center gap-y-2"
                onClick={handleUpi}
              >
                <img
                  src={upiIcon}
                  onClick={openModal}
                  alt=""
                  className="ml-0 object-contain"
                />
                <p className="text-[12px]">UPI</p>
              </div>
              <div className="flex flex-col items-center gap-y-2">
                <img src={cardPayment} alt="" className="object-contain" />
                <p className="text-[12px]">Cardpayment</p>
              </div>
              <div className="flex flex-col items-center gap-y-2">
                <img src={bankTransfer} alt="" className="object-contain" />
                <p className="text-[12px]">Bank transfer</p>
              </div>
              <div className="flex flex-col items-center gap-y-2">
                <img src={netBanking} alt="" className="object-contain" />
                <p className="text-[12px]">Netbanking</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {toast && <Toast />}

      <CustomBottomModal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <UpiPayment closeModal={closeModal} />
      </CustomBottomModal>
      {footer && (
        <div className="mt-24">
          <footer className="w-full fixed  bottom-0 ">
            <div
              className={` ${
                isItLgScreen ? "flex justify-end" : "grid grid-cols-2"
              } shadow-lg border-[1px]  bg-[#FFFFFF] gap-[32px] p-[24px] rounded-tr-[24px] rounded-tl-[24px] fixed w-full bottom-0`}
            >
              <ServiceButton
                text="BACK"
                className="lg:!py-2 lg:!px-4"
                onClick={() => {
                  window.history.back();
                }}
              />
              {placeOrder ? (
                <ServiceButton
                  text="PLACE ORDER"
                  className="bg-[#1C1C1C] text-[#FFFFFF] text-[14px] border-none lg:!py-2 lg:!px-4"
                  onClick={() => {
                    isItLgScreen
                      ? setIsLabelRightModal(true)
                      : navigate("/neworder/label");
                  }}
                />
              ) : (
                <ServiceButton
                  text="PAY NOW ₹2000"
                  className="bg-[#E8E8E8] text-[#BBBBBB] text-[14px] border-none lg:!py-2 lg:!px-4"
                  onClick={() => {}}
                />
              )}
            </div>
          </footer>
        </div>
      )}

      <RightSideModal
        isOpen={isLabelRightModal}
        onClose={() => setIsLabelRightModal(false)}
      >
        <Label
          onClick={setIsLabelRightModal}
          setIsPostPaymentModal={setIsPostPaymentModal}
        />
      </RightSideModal>

      <CustomCenterModal
        isOpen={isPostPaymentModal}
        onClose={() => setIsPostPaymentModal(false)}
        className="!h-[450px] !w-[580px]"
      >
        <ModalContent />
      </CustomCenterModal>
    </div>
  );
};

export default Index;
