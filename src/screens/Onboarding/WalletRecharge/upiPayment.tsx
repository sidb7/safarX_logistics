import crossIcon from '../../../assets/Payment/crossIcon.svg';
import upiIcon from '../../../assets/Payment/upiIcon.svg';
import gpay from '../../../assets/Payment/gpay.svg';
import downwardArrow from '../../../assets/Payment/downwardArrow.svg';
import paytm from '../../../assets/Payment/paytm.svg';
import phonepe from '../../../assets/Payment/phonepe.svg';
import { useState } from 'react';
import CustomButton from '../../../components/Button';
import IUpiPaymentData from '../../../interface/paymentInterface';
import {useSelector, useDispatch} from 'react-redux';                    
import {paymentState, yaariPointsAvailState} from "../../../redux/reducers/paymentReducer";

const UpiPayment = (props:any) => {

    const dispatch = useDispatch()

    const [upiPayment, setUpiPayment] = useState<IUpiPaymentData>({
        googlePay: false,
        paytm: false,
        phonepe: false
    })

    const checkYaariPoints = useSelector((state:any)=>state.payment.yaariPointsAvail)
    
    const [payNow, setPayNow] = useState(false)

    const handleClickgpay = () => {
        let temp = {...upiPayment}
        if(temp.googlePay === true){
            temp.googlePay = false
        }
        else{
            temp.googlePay = true
            temp.paytm = false;
            temp.phonepe = false;
        }
        setUpiPayment(temp)
    }

    const handlePaytm = () => {
        let temp = {...upiPayment}
        if(temp.paytm === true){
            temp.paytm = false
        }
        else{
            temp.googlePay = false
            temp.paytm = true
            temp.phonepe = false
        }
        setUpiPayment(temp)
    }
 
    const handlePhonepe = () => {
        let temp = {...upiPayment}
        if(temp.phonepe === true){
            temp.phonepe = false
        }
        else{
            temp.googlePay = false
            temp.paytm = false
            temp.phonepe = true
        }
        setUpiPayment(temp)
    }

    const handlePayNow = () => {
        dispatch(paymentState(true))
        dispatch(yaariPointsAvailState(true))
    }
    
    const {upiPayment1}  = useSelector((state:any)=>state.payment) 
    
    return(
        <div className='bg-[#FFFFFF] drop-shadow-2xl pb-8 pt-1'>
        
            <div className='mx-5 mt-10 '>
                <div className='flex justify-between items-center  mt-5'>
                    <div className='flex items-center gap-2'>
                        <img src={upiIcon} alt="" className='w-[12px] h-[16px]'/>
                        <p className='text-[18px] font-bold'>UPI Payment</p>
                    </div>
                    <div  onClick={(e)=>props.closeModal()}>

                    <img src={crossIcon} alt=""/>
                    </div>
                </div>
                <div onClick={handleClickgpay} className='rounded-[4px] border-2 border-solid border-[#A4A4A4] my-2' >
                    <div  className='flex justify-between items-center my-4  px-4 '>
                        <div className='flex gap-4'>
                            <img src={gpay} alt="" />
                            <p className='font-medium text-[12px]'>Pay using Gpay</p>
                        </div>
                        <div>
                            <img src={downwardArrow} alt=""/>
                        </div>
                        
                        
                    </div>
                    {
                        upiPayment.googlePay && <div className='mx-5 w-[100px] my-2'>
                            <CustomButton className="!text-[14px]" text="Pay Now" onClick={()=>{
                                handlePayNow();
                                props.closeModal()
                            }} />
                        </div>
                    }
                </div>
                
                <div onClick={handlePaytm} className='rounded-[4px] border-2 border-solid border-[#A4A4A4] my-2' >
                    <div  className='flex justify-between items-center my-4  px-4 '>
                        <div className='flex gap-4'>
                            <img src={paytm} alt="" />
                            <p className='font-medium text-[12px]'>Pay using Paytm</p>
                        </div>
                        <div>
                            <img src={downwardArrow} alt=""/>
                        </div>
                        
                        
                    </div>
                    {
                        upiPayment.paytm && <div className='mx-5 w-[100px] my-2'>
                            <CustomButton className="!text-[14px]" text="Pay Now" onClick={()=>{
                                handlePayNow();
                                props.closeModal()
                            }} />
                        </div>
                    }
                </div>

                <div onClick={handlePhonepe} className='rounded-[4px] border-2 border-solid border-[#A4A4A4] my-2' >
                    <div  className='flex justify-between items-center my-4  px-4 '>
                        <div className='flex gap-4'>
                            <img src={phonepe} alt="" />
                            <p className='font-medium text-[12px]'>Pay using Phonepe</p>
                        </div>
                        <div>
                            <img src={downwardArrow} alt=""/>
                        </div>
                        
                        
                    </div>
                    {
                        upiPayment.phonepe && <div className='mx-5 w-[100px] my-2'>
                            <CustomButton className="!text-[14px]" text="Pay Now" onClick={()=>
                                {
                                handlePayNow();
                                props.closeModal()
                                }} />
                        </div>
                    }
                </div>
            </div>
            
        </div>
    )
}
export default UpiPayment;