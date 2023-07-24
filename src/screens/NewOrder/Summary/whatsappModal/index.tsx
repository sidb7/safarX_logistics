import RightSideModal from "../../../../components/CustomModal/customRightModal";
import CloseIcon from "../../../../assets/CloseIcon.svg";
import WhatsappIcon from "../../../../assets/common/WhatsappIcon.svg";
import Checkbox from "../../../../components/CheckBox";
interface IHighRiskPincodeModalProps {
  ishighRisk: boolean;
  setIsHighRisk: any;
}

export const HighRiskPincodeModal = ({
  ishighRisk,
  setIsHighRisk,
}: IHighRiskPincodeModalProps) => {
  return (
    <div>
      <RightSideModal
        isOpen={ishighRisk}
        onClose={() => setIsHighRisk(false)}
        className="!justify-start"
      >
        <div className="flex flex-col px-4 mt-4 w-full">
          <div className="flex justify-between w-full">
            <span className="text-[24px] font-normal">
              Fix High Risk Pincode
            </span>
            <img
              src={CloseIcon}
              alt=""
              className="flex justify-center items-center"
              onClick={() => setIsHighRisk(false)}
            />
          </div>

          <div className="flex items-center p-[12px] w-full h-[46px] mt-4 border-[1px] rounded-md border-[#E8E8E8]">
            <Checkbox />
            <img src={WhatsappIcon} alt="Whatsapp" className="mr-2" />
            <span className="text-[16px] text-[#1C1C1C] font-semibold">
              Take pre order confirmation
            </span>
          </div>

          <div className="flex items-center p-[12px] w-full h-[46px] mt-4 border-[1px] rounded-md border-[#E8E8E8]">
            <Checkbox />
            <span className="text-[16px] text-[#1C1C1C] font-semibold">
              Pre-charge courier expense
            </span>
          </div>

          <div className="flex items-center p-[12px] w-full h-[46px] mt-4 border-[1px] rounded-md border-[#E8E8E8]">
            <Checkbox />
            <span className="text-[16px] text-[#1C1C1C] font-semibold">
              Change COD to Prepaid
            </span>
          </div>
        </div>
      </RightSideModal>
    </div>
  );
};
