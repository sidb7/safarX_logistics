import React, { useState } from "react";
import BackArrowIcon from "../../assets/backArrow.svg";
import CustomButton from "../../components/Button";
import downArrow from "../../assets/BulkOrder/downArrow.svg";
import uploadIcon from "../../assets/BulkOrder/uploadIcon.svg";
import NavBar from "../../layout/NavBar";
import CustomBottomModal from "../../components/CustomModal/customBottomModal";
import Signup from "./signup";

const BulkOrder = () => {

    const [modalIsOpen, setIsOpen] = useState(false);
    const [congratulations, setCongratulations] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const congo = () => setCongratulations(true);

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
                    <div>
                                    <div className="flex justify-center">
                                        <CustomButton showIcon={true} icon={uploadIcon} text="UPLOAD" className="w-[114px] h-[36px]" 
                                        onClick={openModal}
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
                className="!p-0 w-[500px]"
                overlayClassName="flex p-4 items-center">
                    <Signup  />
                </CustomBottomModal>
                
            
        </div>
        
        
    )
}
export default BulkOrder;