import Cross from "../../../assets/cross.svg";
import CustomInputBox from "../../../components/Input";
import ServiceButton from "../../../components/Button/ServiceButton";
import layer from "../../../assets/layer.svg";
import { useState } from "react";
import RightSideModal from "../../../components/CustomModal/customRightModal";
import AddInsuranceModal from "./AddInsuranceModal";

interface Iprops {
  combo: any;
  setCombo: any;
  insuranceModal?: any;
}

const AddComboModal = (props: Iprops) => {
  const { combo, setCombo, insuranceModal } = props;

  const [insurance, setInsurance] = useState(false);
  console.log("insurance", insurance);

  const handleModals = () => {
    setCombo(false);
    setInsurance(true);
    insuranceModal(true);
  };

  return (
    <div className="">
      <div className="flex justify-between items-center p-5">
        <div className="flex gap-x-2 items-center">
          <img src={layer} alt="" className="w-6 h-6" />
          <p className="font-Lato text-2xl">Save Combo As</p>
        </div>
        <div onClick={() => setCombo(false)} className="cursor-pointer">
          <img src={Cross} alt="" className="w-6 h-6" />
        </div>
      </div>
      <div className="my-5 p-5">
        <CustomInputBox label={"Warehouse Associate"} />
      </div>
      <div
        className="hidden lg:flex justify-end  shadow-lg border-[1px]  bg-[#FFFFFF] p-6  rounded-tr-[32px] rounded-tl-[32px]    fixed bottom-0 "
        style={{ width: "-webkit-fill-available" }}
      >
        <ServiceButton
          text={"SAVE"}
          className="bg-[#1C1C1C] text-[#FFFFFF] lg:!py-2 lg:!px-4 "
          onClick={() => handleModals()}
        />
      </div>
      {/* {insurance && (
        <RightSideModal isOpen={insurance} onClose={() => setInsurance(false)}>
          <AddInsuranceModal
            insurance={insurance}
            setInsurance={setInsurance}
          />
        </RightSideModal>
      )} */}
    </div>
  );
};
export default AddComboModal;
