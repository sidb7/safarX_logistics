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
import CustomButton from "../../../components/Button";
import UpiPayment from "./upiPayment";
import { useNavigate } from "react-router-dom";
import CongratulationsModal from  "./congratulationsModal";
import Toast from "./toast";
import {useSelector, useDispatch} from 'react-redux'; 
import "react-tooltip/dist/react-tooltip.css";
import TickLogo from "../../../assets/common/Tick.svg";
import {Tooltip} from "react-tooltip";
import NavBar from "../../../layout/NavBar";
import CustomBottomModal from "../../../components/CustomModal/customBottomModal";
import { paymentState } from "../../../redux/reducers/paymentReducer";


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

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [payment, setPayment] = useState(false);
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState(false);
  const [placeOrder, setPlaceOrder] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [footer, setFooter] = useState(true);
  
  const [congratulations, setCongratulations] = useState(false);
  
  const congo = () => setCongratulations(true);
  console.log("congratulations", congratulations)

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const congratulationsCloseModal = () => setCongratulations(false)

  const handleUpiPayment:any = () => {
    
    if(payment === true){
      setPayment(false)
    }
  };

  const handleUpi = () => {
    if(modal === true){
      setModal(false)
    }
    else{
      setModal(true)
    }
  }

  const checkBoolean  = useSelector((state:any)=>state.payment.payNow)
  const checkYaariPoints = useSelector((state:any)=>state.payment.yaariPointsAvail)
 
  
  useEffect(()=>{
    if(modalIsOpen === true){
      setFooter(false)
    }
    else{
      setFooter(true)
    }
  })

  useEffect(()=>{
    

    if(checkBoolean === true){
      setToast(true);
      setPlaceOrder(true);
      setTimeout(()=>{
        setToast(false)
        dispatch(paymentState(false))
      },5000)
    }
  },[checkBoolean])

  return (
    <div className="mb-5">
      <header className="fixed top-0 z-50 w-full ">
          <NavBar />
      </header>
     
      
      <div className="inline-flex space-x-2 items-center px-3">
        <img src={Moneylogo} alt="" />
        <p className="text-lg font-semibold text-[#202427]">Payment</p>
      </div>
      <div className="w-100% h-[49.667px] bg-[#4D83FF] rounded-[4px] flex justify-center items-center mt-5">
        <div className="flex text-center w-[297px]  text-sm font-semibold text-[#FFFFFF]  leading-5">
          <p>Get welcome gift of 100 bonus point with wallet payments</p>
        </div>
      </div>

      <div className="mx-5">
        <div className="w-100%   my-5 p-3 rounded-lg border-2 border-solid border-[#E8E8E8] shadow-sm">
          <div className="flex gap-2">
            <img src={Accountlogo} alt="" />
            <p className="text-sm">Your wallet balance</p>
            <p>₹0</p>
          </div>
          <p className="text-[12px] leading-4 text-[#BBBBBB] my-1">
            Endless wallet balance with automatic add money
          </p>
          <p className="text-[16px] my-2">₹2000</p>
          <div className="grid grid-cols-4 gap-2 mt-3">
            <div className="border-[1.5px] p-2 rounded-lg items-center border-solid border-[#004EFF]">
              <p className="text-[16px] text-[#004EFF]">₹2000</p>
            </div>
            <div className="border-[1.5px] p-2 rounded-[4px] items-center border-solid border-[#1C1C1C]">
              <p className="text-[16px]">₹3000</p>
            </div>
            <div className="border-[1.5px] p-2 rounded-[4px] items-center border-solid border-[#1C1C1C]">
              <p className="text-[16px]">₹4000</p>
            </div>
            <div className="border-[1.5px] p-2 rounded-[4px] items-center border-solid border-[#1C1C1C]">
              <p className="text-[16px]">₹5000</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-[8px]">
        <Checkbox />
        <p className="text-[14px] font-medium uppercase text-[#CCDCFF]">
          INSTANT RECHARGE WITH COD
        </p>
        </div>

        <p className="mt-3 text-[12px] text-[#BBBBBB]">
          Add money to wallet with COD
        </p>

        <div className="flex  gap-2 mt-10">
          <img src={discountIcon} alt="" />
          <p className="text-lg font-semibold">Available offers</p>
        </div>
        <div className="flex flex-nowwrap overflow-x-scroll space-x-4">
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


        <div className="my-5">
          <CustomInputBox
            inputClassName="border-2 border-solid border-[#A4A4A4]"
            label="Have a gift card?"
            labelClassName="text-[#A4A4A4]"
          />
        </div>
        

        <div className="grid grid-cols-2 w-100%  p-3 rounded-lg border-2 border-solid border-[#E8E8E8] shadow-sm">
          {checkYaariPoints ? 
          (
            <div className="w-[200px] flex flex-col justify-between">
              <div>
            <div className="flex ">
              <div className="flex flex-col mt-4">
              <span 
              className="font-medium"
              data-tooltip-id="my-tooltip-inline"
              data-tooltip-content="Welcome 100 yaari points has been added"
              >Yaari Points</span>
              <span className="text-center text-[16px] font-bold">100</span>
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
              
              <Tooltip id="my-tooltip"   style={{ backgroundColor: "rgb(0, 255, 30)", color: "#222" }}
 />
            </div>
          
            ):
          (
          <div className="w-[200px] flex flex-col justify-between gap-y-5">
            <p className="text-[12px]">
              Yaari points are availed after first order is placed
            </p>
            <p className="text-[12px] text-[#004EFF]">
              Tap to know how it works
            </p>
          </div>
          )
            
          }
          <div className="col-end-7">
            <img src={customerReward} alt="" className="object-contain" />
          </div>
        </div>
       
        
        

        <div className="W-100%   my-5 p-3 rounded-lg border-2 border-solid border-[#E8E8E8] shadow-sm">
          <div className="flex  gap-2 text-[14px]">
            <img src={rechargeIcon} alt="" className="object-contain" />
            <p>Payment gateway</p>
          </div>

          <div className="flex mt-4 mb-6  justify-between">
            <div className="flex flex-col items-center gap-y-2" onClick={handleUpi}>
              <img src={upiIcon} onClick={openModal} alt="" className="ml-0 object-contain" />
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
        <CustomButton text={"Recharge Now"} onClick={congo} />
      </div>

      {toast && <Toast />}
      
        <CustomBottomModal isOpen={modalIsOpen} onRequestClose={closeModal}>
            <UpiPayment closeModal={closeModal} />
        </CustomBottomModal>
        
        <CustomBottomModal isOpen={congratulations} onRequestClose={congratulationsCloseModal} overlayClassName="flex p-5 items-center">
                <CongratulationsModal   />
        </CustomBottomModal>
       
      
    </div>
  );
};

export default RechargePayment;
