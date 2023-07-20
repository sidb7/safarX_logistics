import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import WelcomeHeader from "../welcomeHeader";
import ServiceButton from "../../../../components/Button/ServiceButton";
import CustomCheckBox from "../../../../components/CheckBox";
import CompanyLogo from "../../../../assets/Navbar/ShipyaariLogos.svg";
import CrossLogo from "../../../../assets/cross.svg";
import Card from "./Card";
import CustomBottomModal from "../../../../components/CustomModal/customBottomModal";

import { useNavigate } from "react-router-dom";

type Props = {};

export const GSTComponent = (props: Props) => {
    const isBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(true);
    const closeModal = () => setOpenModal(false);
    const [checkbox, setCheckbox] = useState();
    
    const BottomButton = () => { 
      return (
        <div className="flex flex-col items-center lg:items-start pb-4 gap-y- bg-white">
          <div className="flex items-center mx-5">
            <CustomCheckBox onChange={(e:any)=>setCheckbox(e.target.checked)}/>
            <p className="font-normal text-[12px] text-[#494949]">
              I Agree with the terms & conditions
            </p>
          </div>
        
          <ServiceButton
              text="ACCEPT AND CONTINUE"
              className={` w-[300px] mb-1 mt-2 ml-20 ${checkbox === true ?"bg-[#1C1C1C] text-white":"bg-[#E8E8E8] text-[#BBBBBB]"}`}
              onClick={() => {
                navigate("/account/kyc-terms/ServiceComponent");
              }}
            />
        
          
        </div>
      );
    };
  
    return (
      <div>
        
        <div className="relative px-5 lg:hidden">
          <WelcomeHeader title="Welcome to Shipyaari" content="Terms & Agreement" />
          <div className="mb-1">
            <Card
              title="DECLARATION OF GST NON-ENROLMENT"
              subTitleOne="Sub: Declaration of"
            />
          </div>
          {BottomButton()}
        </div>
  
        {isBigScreen && (
          <div className="mx-4 my-10 hidden lg:block lg:h-[902px]">
            <CustomBottomModal
              isOpen={openModal}
              onRequestClose={closeModal}
              className="!p-0 !w-[500px] !h-[700px]"
              overlayClassName="flex  items-center"
            >
                <div className="hidden lg:block relative">
                <div className="flex justify-between items-center shadow-md  p-4 ">
                  <img src={CompanyLogo} alt="" />
                  <img src={CrossLogo} alt="" onClick={closeModal} />
                </div>
                  <WelcomeHeader title="Welcome to Shipyaari" content="Terms & Agreement" />
                  <div className="mb-2 px-5">
                    <Card
                      title="DECLARATION OF GST NON-ENROLMENT"
                      titleClassName="w-[450px]"
                      subTitleOne="Sub: Declaration of"
                    />
                    
                  </div>
                  {BottomButton()}
                </div>
              </CustomBottomModal>
      </div>
       )}
       </div>
    );
  };
  