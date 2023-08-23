import React, { useState } from "react";
import BackArrowIcon from "../../assets/backArrow.svg";
import CustomButton from "../../components/Button";
import downArrow from "../../assets/BulkOrder/downArrow.svg";
import uploadIcon from "../../assets/BulkOrder/uploadIcon.svg";
import NavBar from "../../layout/Old_NavBar";
import CustomBottomModal from "../../components/CustomModal/customBottomModal";
import Signup from "./signup";
import MobileVerification from "./mobileVerification";
import VerifyOtp from "./verifyOtp";
import Offers from "./offerScreen";
import GetStarted from "./getStarted";

const BulkOrder = () => {
    const [mobileVerificationModal, setMobileVerificationModal] = useState(false);
    const [verifyOtp, setVerifyOtp] = useState(false);
    const [offers, setOffers] = useState(false);
    const [started, setStarted] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const mbModal = () => setMobileVerificationModal(true);
    const mbCloseModal = () => setMobileVerificationModal(false);
    const verifyOtpOpenModal =  () =>setVerifyOtp(true);
    const verifyOtpCloseModal = () => setVerifyOtp(false)
    const openOffersModal = () => setOffers(true);
    const closeOffersModal = () => setOffers(false);
    const openStartedModal = () => setStarted(true);
    const closeStartedModal = () => setStarted(false);

    return(
        
        <div className="h-screen flex flex-col justify-between">
            
                <header className="fixed top-0 z-10 w-full ">
                    <NavBar />
                </header>
                <div className="mt-20">
                    <div className="flex mx-5 gap-2">
                            <img src={BackArrowIcon} alt="" />
                            <p className="font-bold">Add Bulk Order</p>
                    </div>
                    </div>
                    <div className="flex justify-center">
                    <div >
                                    <div className="flex justify-center ">
                                        <CustomButton showIcon={true} icon={uploadIcon} text="UPLOAD" className="w-[114px] h-[36px]" 
                                        onClick={openModal}
                                         />
                                    </div>
                                    <div className="flex justify-center mt-2">
                                        <CustomButton showIcon={true} icon={uploadIcon} text="MobileVerification" className="w-[114px] h-[36px]" 
                                        onClick={mbModal}
                                         />
                                    </div>
                                    <div className="flex justify-center mt-2">
                                        <CustomButton showIcon={true} icon={uploadIcon} text="verifytotp" className="w-[114px] h-[36px]" 
                                        onClick={verifyOtpOpenModal}
                                         />
                                    </div>
                                    <div className="flex justify-center mt-2">
                                        <CustomButton showIcon={true} icon={uploadIcon} text="offers" className="w-[114px] h-[36px]" 
                                        onClick={openOffersModal}
                                         />
                                    </div>
                                    <div className="flex justify-center mt-2">
                                        <CustomButton showIcon={true} icon={uploadIcon} text="getstarted" className="w-[114px] h-[36px]" 
                                        onClick={openStartedModal}
                                         />
                                    </div>
                                    <p className="text-[16px] font-semibold leading-5  text-center">Drop files here</p>
                                    <p className="text-center text-[12px] font-normal leading-4 text-[#BBBBBB] mt-2">Pdf, excel files are supported</p>
                                <div className="flex justify-center mt-5 gap-2">
                                        <img src={downArrow} alt="" />
                                        <p className="text-[14px] text-[#004EFF] font-semibold border-b-2 border-[#004EFF]">SAMPLE FILE</p>
                                </div>
                                </div>
                    </div>
                    
                    <div className="flex justify-center px-5 my-5">
                            <CustomButton  className="!bg-[#E8E8E8] !font-medium !text-[14px] !text-[#BBBBBB]" text={"continue"} onClick={function (): void {
                                throw new Error("Function not implemented.");
                            } } />
                </div>
                
                <CustomBottomModal isOpen={modalIsOpen} 
                onRequestClose={closeModal} 
                className="!p-0 !w-[500px]"
                overlayClassName="flex p-4 items-center">
                    <Signup  closeModal={closeModal}/>
                </CustomBottomModal>

                <CustomBottomModal isOpen={mobileVerificationModal} 
                onRequestClose={mbCloseModal} 
                className="!p-0 !w-[500px]"
                overlayClassName="flex p-4 items-center">
                    <MobileVerification  closeModal={mbCloseModal}/>
                </CustomBottomModal>
                
                <CustomBottomModal isOpen={verifyOtp} 
                onRequestClose={verifyOtpCloseModal} 
                className="!p-0 !w-[500px]"
                overlayClassName="flex p-4 items-center">
                    <VerifyOtp  closeModal={verifyOtpCloseModal}/>
                </CustomBottomModal>

                <CustomBottomModal isOpen={offers} 
                onRequestClose={closeOffersModal} 
                className="!p-0 !w-[500px]"
                overlayClassName="flex p-4 items-center">
                    <Offers  closeModal={closeOffersModal}/>
                </CustomBottomModal>
                <CustomBottomModal isOpen={started} 
                onRequestClose={closeStartedModal} 
                className="!p-0 !w-[500px]"
                overlayClassName="flex p-4 items-center">
                    <GetStarted  closeModal={closeStartedModal}/>
                </CustomBottomModal>
            
        </div>
        
        
    )
}
export default BulkOrder;