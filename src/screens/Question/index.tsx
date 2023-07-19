import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { QuestionComponent1, QuestionComponent2, QuestionComponent3, QuestionComponent4, QuestionComponent5 } from "./question";
import { WelcomeQuestion } from "./welcome";
import CustomBottomModal from "../../components/CustomModal/customBottomModal";
import { useEffect, useState } from "react";
import CompanyLogo from "../../assets/Navbar/ShipyaariLogos.svg";
import CrossLogo from "../../assets/cross.svg";
import "../../styles/navBar.css";
import NavBar from '../../layout/NavBar';
import CustomButton from '../../components/Button'
import Banner from "../../assets/Banner pagination.svg";

export const AccountQuestion = () => {
  const [isOpen, setOpen] = useState(true)
  const closeModal = () => setOpen(false);
  
  const isBigScreen = useMediaQuery({ query: '(min-width: 1024px)' })
  
  return (
    <>
        <div className="mx-4 lg:hidden">
          <WelcomeQuestion label="Please complete your profile" />
          <QuestionComponent1 />
        </div>

        {/* 1st screen of questionneir for desktop modal (What other services do you want?) */}
        {isBigScreen && 
        <div className="mx-4 hidden lg:block">
          <CustomBottomModal  isOpen={isOpen} 
                onRequestClose={closeModal} 
                className="!p-0 !w-[688px]"
                overlayClassName="flex  items-center">
                <div className=''>
                  <div className='flex justify-between items-center shadow-md  p-4 '>
                    <img src={CompanyLogo} alt=""/>
                    <img src={CrossLogo} alt="" onClick={closeModal}/>
                  </div>
                  
                 
                  <div className="flex gap-x-[70px] ml-10">
                    <WelcomeQuestion label="Please complete your profile"/>
                    <div className="mt-[31px] mb-32 w-[320px]">
                      <QuestionComponent1 />
                    </div>
            
                  </div>
                </div>
          
          </CustomBottomModal>
        </div>} 

        {/* 2nd screen */}
        {/* {isBigScreen && 
        <div className="mx-4 hidden lg:block">
          <CustomBottomModal  isOpen={isOpen} 
                onRequestClose={closeModal} 
                className="!p-0 !w-[688px]"
                overlayClassName="flex  items-center">
                <div className=''>
                  <div className='flex justify-between items-center shadow-md  p-4 '>
                    <img src={CompanyLogo} alt=""/>
                    <img src={CrossLogo} alt="" onClick={closeModal}/>
                  </div>
                  
                 
                  <div className="flex gap-x-[70px] ml-10">
                    <WelcomeQuestion label="Please complete your profile"/>
                    <div className="mt-[31px] mb-32 w-[320px]">
                      <QuestionComponent2 />
                    </div>
            
                  </div>
                </div>
          
          </CustomBottomModal>
        </div>
        } 
         */}

         {/* 3rd screen */}
         {/* {isBigScreen && 
        <div className="mx-4 hidden lg:block">
          <CustomBottomModal  isOpen={isOpen} 
                onRequestClose={closeModal} 
                className="!p-0 !w-[688px]"
                overlayClassName="flex  items-center">
                <div className=''>
                  <div className='flex justify-between items-center shadow-md  p-4 '>
                    <img src={CompanyLogo} alt=""/>
                    <img src={CrossLogo} alt="" onClick={closeModal}/>
                  </div>
                  
                 
                  <div className="flex gap-x-[70px] ml-10">
                    <WelcomeQuestion label="Please complete your profile"/>
                    <div className="mt-[31px] mb-32 w-[320px]">
                      <QuestionComponent3 />
                    </div>
            
                  </div>
                </div>
          
          </CustomBottomModal>
        </div>}  */}

        {/* 4th screen */}
        {/* {isBigScreen && 
        <div className="mx-4 hidden lg:block">
          <CustomBottomModal  isOpen={isOpen} 
                onRequestClose={closeModal} 
                className="!p-0 !w-[688px]"
                overlayClassName="flex  items-center">
                <div className=''>
                  <div className='flex justify-between items-center shadow-md  p-4 '>
                    <img src={CompanyLogo} alt=""/>
                    <img src={CrossLogo} alt="" onClick={closeModal}/>
                  </div>
                  
                 
                  <div className="flex gap-x-[70px] ml-10">
                    <WelcomeQuestion label="Please complete your profile"/>
                    <div className="mt-[31px] mb-32 w-[320px]">
                      <QuestionComponent4 />
                    </div>
            
                  </div>
                </div>
          
          </CustomBottomModal>
        </div>}  */}

        {/* 5th Screen */}
        {/* {isBigScreen && 
        <div className="mx-4 hidden lg:block"> */}
          {/* <CustomBottomModal  isOpen={isOpen} 
                onRequestClose={closeModal} 
                className="!p-0 !w-[688px]"
                overlayClassName="flex  items-center"> */}
                
                  {/* <div className='flex justify-between items-center shadow-md  p-4 '>
                    <img src={CompanyLogo} alt=""/>
                    <img src={CrossLogo} alt="" onClick={closeModal}/>
                  </div>
                   */}
                 
                  {/* <div className="flex gap-x-[30px] mx-4"> */}
                    {/* <WelcomeQuestion label="Please complete your profile"/> */}
                    {/* <div className='w-[300px]'>
                      <h1 className='text-center mt-8 text-[22px] font-bold'>Welcome to Shipyaari</h1>
                      <p className='text-center text-[16px] text-[#494949] mt-3'>For account activation kindly complete the KYC</p>
                      <p className='text-[12px] text-[#494949] mt-7 ml-[10px]'>NOTE: KYC is mandatory for shipping orders and identification.</p>
                    </div> */}
                    
                    {/* <div className="mt-[18px] mb-14 w-[320px]">
                        <QuestionComponent5 />
                        <CustomButton className="mt-4" text={"PROCEED FOR KYC"} onClick={function (): void {
                        throw new Error('Function not implemented.');
                        } } />
                        <div className='flex justify-center'>
                          <p className='text-center mt-4 text-[#004EFF] text-[14px] border-b-2 border-[#004EFF] w-[100px]'>SKIP FOR NOW</p>
                        </div>
                      
                    </div> */}
                    
                      
            
                  {/* </div> */}
                  {/* <div className='flex justify-center mb-4'>
                    <img src={Banner} alt="" />
                  </div> */}
                
          
          {/* </CustomBottomModal> */}
        {/* </div>
        }  */}
    </>
    
  );
};
