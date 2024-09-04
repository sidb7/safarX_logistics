import React, { useState } from "react";
import SelfDeclaration from "../../../../assets/selfDeclaration.svg";
import OneButton from "../../../../components/Button/OneButton";
import PlusIcon from "../../../../assets/plusIcon.svg";
import RightSideModal from "../../../../components/CustomModal/customRightModal";
import SelfDeclarationContent from "./selfDeclarationContent";
import AddInvoiceContent from "./AddInvoiceContent";
import KycContent from "./KycContent";
import { ResponsiveState } from "../../../../utils/responsiveState";
interface IIndexProps {}

const Index: React.FunctionComponent<IIndexProps> = (props) => {
  const { isLgScreen, isXlScreen } = ResponsiveState();
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isSelfDeclarationModalOpen, setIsSelfDeclarationModalOpen] =
    useState<boolean>(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState<boolean>(false);
  const [isKycModalOpen, setIsKycModalOpen] = useState<boolean>(false);

  return (
    <>
      <div
        className={`max-h-[100%] px-3 py-[12px] border-[1px] rounded-lg border-[#E8E8E8] overflow-auto scroll-smooth`}
      >
        <div className="flex gap-x-[6px] items-center">
          <img src={SelfDeclaration} alt="declaration-icon" />
          <p className="text-base font-Open font-semibold leading-5 capitalize">
            Self Declaration
          </p>
        </div>
        <div className="flex items-start pt-3 px-5 ">
          <OneButton
            text={"COMPLETE SELF DECLARATION"}
            // onClick={() => {}}
            onClick={() => {
              setIsSelfDeclarationModalOpen(true);
            }}
            variant="quad"
            showIcon={true}
            icon={PlusIcon}
            textTransform="capitalize"
          />
        </div>
      </div>
      {/* invoice flow  */}
      <div className="border-[1px] rounded-lg border-[#E8E8E8] mt-[10px]">
        <div className="flex justify-between items-center p-5">
          <p className="text-base font-Open font-semibold leading-5 capitalize">
            Add Invoice
          </p>
          <OneButton
            text={"UPLOAD"}
            // onClick={() => {}}
            onClick={() => {
              // setCurrentEditType("delivery");
              setIsInvoiceModalOpen(true);
            }}
            className={`bg-[#1C1C1C] text-[#FFFFFF] h-[36px] lg:!py-2 lg:!px-4 disabled:bg-[#E8E8E8] disabled:text-[#BBB] disabled:border-none`}
            textTransform="capitalize"
          />
        </div>
      </div>
      {/* kyc flow  */}
      <div className="border-[1px] rounded-lg border-[#E8E8E8] mt-[10px]">
        <div className="flex justify-between items-center p-5">
          <p className="text-base font-Open font-semibold leading-5 capitalize">
            Add KYC Details
          </p>
          <OneButton
            text={"DO KYC"}
            // onClick={() => {}}
            onClick={() => {
              // setCurrentEditType("delivery");
              setIsKycModalOpen(true);
            }}
            className={`bg-[#1C1C1C] text-[#FFFFFF] h-[36px] lg:!py-2 lg:!px-4 disabled:bg-[#E8E8E8] disabled:text-[#BBB] disabled:border-none`}
            textTransform="capitalize"
          />
        </div>
      </div>
      {/* self Declaration modal  */}
      <RightSideModal
        isOpen={isSelfDeclarationModalOpen}
        onClose={() => setIsSelfDeclarationModalOpen(false)}
        // className={`w-full ${
        //   isLgScreen ? "md:!w-[450px]" : "mobile-modal-styles"
        // }`}
        className={`${isXlScreen ? "!w-1/3" : isLgScreen ? "!w-2/3" : ""}`}
      >
        <SelfDeclarationContent
          setIsSelfDeclarationModalOpen={setIsSelfDeclarationModalOpen}
        />
      </RightSideModal>
      {/* invoice modal  */}
      <RightSideModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        // className={`w-full ${
        //   isLgScreen ? "md:!w-[450px]" : "mobile-modal-styles"
        // }`}
        className={`${isXlScreen ? "!w-1/3" : isLgScreen ? "!w-2/3" : ""}`}
      >
        <AddInvoiceContent setIsInvoiceModalOpen={setIsInvoiceModalOpen} />
      </RightSideModal>
      {/* kyc modal  */}
      <RightSideModal
        isOpen={isKycModalOpen}
        onClose={() => setIsKycModalOpen(false)}
        // className={`w-full ${
        //   isLgScreen ? "md:!w-[450px]" : "mobile-modal-styles"
        // }`}
        className={`${isXlScreen ? "!w-1/3" : isLgScreen ? "!w-2/3" : ""}`}
      >
        <KycContent setIsKycModalOpen={setIsKycModalOpen} />
      </RightSideModal>
    </>
  );
};

export default Index;
