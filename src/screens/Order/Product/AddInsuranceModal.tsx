import Cross from "../../../assets/cross.svg";
import shieldTick from "../../../assets/shield-tick.svg";
import shieldcross from "../../../assets/shieldcross.svg";
import Checkbox from "../../../components/CheckBox";
import CodIcon from "../../../assets/codIcon.svg";
import toggle from "../../../assets/toggle-off-circle.svg";
import CustomInputBox from "../../../components/Input";
import ServiceButton from "../../../components/Button/ServiceButton";

interface IProps {
  insurance: any;
  setInsurance: any;
}

const AddInsuranceModal = (props: IProps) => {
  const { insurance, setInsurance } = props;

  return (
    <div>
      <div className="flex justify-between items-center p-5">
        <div className="flex gap-x-2 items-center">
          <img src={shieldTick} alt="" className="w-6 h-6" />
          <p className="font-Lato text-2xl">Add Insurance</p>
        </div>
        <div onClick={() => setInsurance(false)}>
          <img src={Cross} alt="" className="w-6 h-6" />
        </div>
      </div>
      <div className="flex justify-center shadow-lg border-2 p-5 mx-5 gap-x-8 rounded-lg relative">
        <div className="flex flex-col justify-center items-center border-2 border-[] py-8 px-28 rounded-md ">
          <img src={shieldTick} alt="" className="w-16 h-12" />
          <p className="absolute top-2 left-12 bg-white">I want insurance</p>
        </div>
        <div className="flex flex-col justify-center items-center border-2 border-[] py-8 px-28 rounded-md">
          <img src={shieldcross} alt="" className="w-16 h-12" />
          <div className="flex absolute top-2 left-[335px] bg-white">
            <Checkbox />
            <p>I'll take risk</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between my-10 px-5">
        <div className="flex gap-x-2 items-center">
          <img src={CodIcon} alt="" />
          <p className="whitespace-nowrap text-2xl">Add COD</p>
        </div>

        <div className="border-2 border-[#F35838] bg-[#F35838] flex  items-center rounded-md gap-x-3 px-2 py-[10px]">
          <img src={toggle} alt="toggle" />
          <p className="text-[14px] text-white">DEACTIVATE</p>
        </div>
      </div>
      <div className="px-5 flex flex-col gap-y-4">
        <CustomInputBox label={"COD amount to collect from buyer"} />
        <CustomInputBox label={"Total invoice value"} />
      </div>
      <div
        className="hidden lg:flex justify-end  shadow-lg border-[1px]  bg-[#FFFFFF] p-6  rounded-tr-[32px] rounded-tl-[32px]    fixed bottom-0 "
        style={{ width: "-webkit-fill-available" }}
      >
        <ServiceButton
          text={"NEXT"}
          className="bg-[#1C1C1C] text-[#FFFFFF] lg:!py-2 lg:!px-4 "
        />
      </div>
    </div>
  );
};
export default AddInsuranceModal;
