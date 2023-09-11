import React, { useEffect, useState } from "react";
import Checkbox from "../../../components/CheckBox";
import Moneylogo from "../../../assets/common/moneyWeb.svg";
import Accountlogo from "../../../assets/Payment/Account.svg";

import upiIcon from "../../../assets/Payment/upiIcon.svg";
import cardPayment from "../../../assets/Payment/cardPaymentIcon.svg";
import bankTransfer from "../../../assets/Payment/bankTransferIcon.svg";
import netBanking from "../../../assets/Payment/netBankingIcon.svg";
import customerReward from "../../../assets/Payment/Customer Reward 1.svg";
import CustomInputBox from "../../../components/Input";

import discountIcon from "../../../assets/Payment/discount-shape.svg";
import CustomButton from "../../../components/Button";
import UpiPayment from "./upiPayment";
import { useNavigate } from "react-router-dom";
import CongratulationsModal from "./congratulationsModal";
import Toast from "./toast";
import { useSelector, useDispatch } from "react-redux";
import "react-tooltip/dist/react-tooltip.css";
import TickLogo from "../../../assets/common/Tick.svg";
import { Tooltip } from "react-tooltip";
import NavBar from "../../../layout/Old_NavBar";
import CustomBottomModal from "../../../components/CustomModal/customBottomModal";
import { paymentState } from "../../../redux/reducers/paymentReducer";
import BackArrowIcon from "../../../assets/common/backArrowWeb.svg";
import Stepper from "../../../components/Stepper";
import TransactionHistoryIcon from "../../../assets/Transaction/receipt-item.svg";
import ForwardArrowIcon from "../../../assets/Transaction/forwardArrow.svg";
import PaymentIcon from "../../../assets/Transaction/Payment.svg";
import YaariPointsIcon from "../../../assets/Transaction/YaariPoints.svg";

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
    isCompleted: false,
    isActive: true,
    imgSrc: TickLogo,
  },
  {
    label: "Payment",
    isCompleted: false,
    isActive: true,
    imgSrc: TickLogo,
  },
];

const RechargePayment = () => {
  const dispatch = useDispatch();

  const [payment, setPayment] = useState(false);
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState(false);
  const [placeOrder, setPlaceOrder] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [footer, setFooter] = useState(true);

  const [congratulations, setCongratulations] = useState(false);

  const congo = () => setCongratulations(true);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const congratulationsCloseModal = () => setCongratulations(false);

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

  return (
    <div className="mb-5">
      <header className="fixed top-0 z-50 w-full ">
        <NavBar />
      </header>

      <div className=" hidden lg:block  mt-20 mx-5 mb-5">
        <p className="pl-5 font-normal text-[14px] text-[#777777]">
          Home /
          <span className="font-semibold text-[14px] text-[#1C1C1C] ">
            &nbsp;Partner list
          </span>
        </p>

        <div className="inline-flex gap-x-2 items-center  mb-8 ">
          <img src={BackArrowIcon} alt="" />

          <p className="text-[#1C1C1C] font-semibold text-[28px]  ">
            Add new order
          </p>
        </div>

        <div className="mb-8">
          <Stepper steps={steps} />
        </div>
        <div className="inline-flex space-x-2 items-center ">
          <img src={Moneylogo} alt="" />
          <p className=" text-[24px] font-normal text-[#323232]">Payment</p>
        </div>
      </div>

      <div className="inline-flex space-x-2 items-center px-3 lg:hidden">
        <img src={Moneylogo} alt="" />
        <p className="text-lg font-semibold text-[#202427]">Payment</p>
      </div>

      <div className="w-100% h-[49.667px] bg-[#4D83FF]  rounded-[4px] flex justify-center items-center  mt-5 lg:mx-5 lg:justify-start ">
        <div className="flex text-center w-[297px] lg:w-full  text-sm font-semibold text-[#FFFFFF]  leading-5   ">
          <p className="lg:hidden">
            Get welcome gift of 100 bonus point with wallet payments
          </p>
          <p className="hidden lg:block px-[16px] py-[13px] text-[16px] font-semibold">
            Get welcome gift of 100 Yaari points with wallet payment
          </p>
        </div>
      </div>

      <div className="mx-5">
        <div className="grid  lg:grid-cols-2 gap-x-[27px]">
          <div className="w-100%    my-5 p-3 rounded-lg border-2 border-solid border-[#E8E8E8] shadow-sm h-[174px] ">
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
                <p className="text-[16px]  lg:font-semibold lg:text-[14px]">
                  ₹3000
                </p>
              </div>
              <div className="border-[1.5px] p-2 rounded-[4px] items-center border-solid border-[#1C1C1C]">
                <p className="text-[16px] lg:font-semibold lg:text-[14px]">
                  ₹4000
                </p>
              </div>
              <div className="border-[1.5px] p-2 rounded-[4px] items-center border-solid border-[#1C1C1C]">
                <p className="text-[16px]  lg:font-semibold lg:text-[14px]">
                  ₹5000
                </p>
              </div>
            </div>
          </div>

          {/* Second */}

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

        <div className="flex items-center gap-[8px]">
          <Checkbox />
          <p className="text-[14px] font-medium  lg:font-semibold lg:text-[#004EFF] uppercase text-[#CCDCFF]">
            INSTANT RECHARGE WITH COD
          </p>
        </div>

        <p className="mt-3 text-[12px] text-[#BBBBBB] lg:font-normal">
          Add money to wallet with COD
        </p>

        <div className="flex  gap-2 mt-10">
          <img src={discountIcon} alt="" />
          <p className="text-lg font-semibold lg:font-normal lg:text-2xl lg:text-[#323232]">
            Available offers
          </p>
        </div>
        <div className="flex flex-nowrap w-full overflow-x-scroll gap-x-4	">
          <div className="bg-[#f0faf6] p-3 lg:p-4 border-2 border-solid border-[#E8E8E8]  my-3 rounded-lg lg:min-w-[33.33%] ">
            <p className="text-[14px] font-semibold lg:text-[16px] lg:text-[#202427] ">
              10% EXTRA up to ₹1000
            </p>
            <p className="mt-[7px] text-[12px] text-[#606060] lg:font-normal lg:text-[#323232]">
              Use standard charter Digismart credit card
            </p>
            <div className="w-[245px] lg:w-full flex flex-row items-center justify-between my-3">
              <p className="text-[12px] text-[#004EFF] mt-1 lg:font-semibold lg:text-[16px] lg:whitespace-nowrap ">
                Save up to ₹500 with this code
              </p>
              <p className="text-[16px] lg:text-[#1C1C1C] lg:font-semibold">
                Apply
              </p>
            </div>
          </div>
          <div className="bg-[#FDF6EA] p-3 lg:p-4 border-2 border-solid border-[#E8E8E8]  my-3 rounded-lg lg:min-w-[33.33%]">
            <p className="text-[14px] font-semibold lg:text-[16px] lg:text-[#202427] ">
              10% EXTRA up to ₹1000
            </p>
            <p className="mt-[7px] text-[12px] text-[#606060] lg:font-normal lg:text-[#323232]">
              Use standard charter Digismart credit card
            </p>
            <div className="w-[245px] lg:w-full flex flex-row items-center justify-between my-3">
              <p className="text-[12px] text-[#004EFF] mt-1 lg:font-semibold lg:text-[16px] lg:whitespace-nowrap ">
                Save up to ₹500 with this code
              </p>
              <p className="text-[16px] lg:text-[#1C1C1C] lg:font-semibold">
                Apply
              </p>
            </div>
          </div>
          <div className="bg-[#FDEDEA] p-3 lg:p-4 border-2 border-solid border-[#E8E8E8]  my-3 rounded-lg lg:min-w-[33.33%] ">
            <p className="text-[14px] font-semibold lg:text-[16px] lg:text-[#202427] ">
              10% EXTRA up to ₹1000
            </p>
            <p className="mt-[7px] text-[12px] text-[#606060] lg:font-normal lg:text-[#323232]">
              Use standard charter Digismart credit card
            </p>
            <div className="w-[245px] lg:w-full flex flex-row items-center justify-between my-3">
              <p className="text-[12px] text-[#004EFF] mt-1 lg:font-semibold lg:text-[16px] lg:whitespace-nowrap ">
                Save up to ₹500 with this code
              </p>
              <p className="text-[16px] lg:text-[#1C1C1C] lg:font-semibold">
                Apply
              </p>
            </div>
          </div>
        </div>

        <div className="lg:w-1/3 ">
          <CustomInputBox
            inputClassName="border-2 border-solid border-[#A4A4A4]"
            label="Have a gift card?"
            labelClassName="text-[#A4A4A4]"
          />
        </div>

        <div className="grid grid-cols-2 w-100%  p-3 rounded-lg border-2 border-solid  border-[#E8E8E8] mt-5  shadow-sm  lg:hidden ">
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

        <div className="lg:grid grid-cols-2">
          <div className="w-100%   my-5 p-3 rounded-lg border-2 border-solid border-[#E8E8E8] shadow-sm lg:p-4 ">
            <div className="flex  gap-x-2 text-[14px]">
              <img src={PaymentIcon} alt="" className="object-contain" />
              <p className="lg:font-semibold lg:text-[18px] lg:text-[#1C1C1C]">
                Payment Gateway
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
                <p className="text-[12px] font-normal text-[#1C1C1C]">UPI</p>
              </div>
              <div className="flex flex-col items-center gap-y-2">
                <img src={cardPayment} alt="" className="object-contain" />
                <p className="text-[12px]  font-normal text-[#1C1C1C] ">
                  Cardpayment
                </p>
              </div>
              <div className="flex flex-col items-center gap-y-2">
                <img src={bankTransfer} alt="" className="object-contain" />
                <p className="text-[12px] font-normal text-[#1C1C1C] ">
                  Bank transfer
                </p>
              </div>
              <div className="flex flex-col items-center gap-y-2">
                <img src={netBanking} alt="" className="object-contain" />
                <p className="text-[12px] font-normal text-[#1C1C1C]">
                  Netbanking
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:grid grid-cols-2 mb-5">
          <div className="flex justify-between px-3 py-5 rounded shadow-md ">
            <div className="flex gap-x-1">
              <img src={TransactionHistoryIcon} alt="Transaction" />
              <p className="font-semibold text-[18px] text-[#1C1C1C] whitespace-nowrap">
                View Transaction History
              </p>
            </div>
            <img src={ForwardArrowIcon} alt="ForwardArrow" />
          </div>
        </div>

        <CustomButton text={"Recharge Now"} onClick={congo} />
      </div>

      {toast && <Toast />}

      <CustomBottomModal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <UpiPayment closeModal={closeModal} />
      </CustomBottomModal>

      <CustomBottomModal
        isOpen={congratulations}
        onRequestClose={congratulationsCloseModal}
        overlayClassName="flex p-5 items-center"
        className="lg:h-[340px] lg:w-[500px]"
      >
        <CongratulationsModal setCongratulations={setCongratulations} />
      </CustomBottomModal>
    </div>
  );
};

export default RechargePayment;
