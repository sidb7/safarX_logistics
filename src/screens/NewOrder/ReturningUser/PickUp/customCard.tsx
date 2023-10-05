import EditImageWithBlack from "../../../../assets/Catalogue/edit.svg";
import PhoneIcon from "../../../../assets/ReturningUser/phoneIcon.svg";
import ProfileImage from "../../../../assets/Catalogue/profileIcon.svg";
import { useNavigate } from "react-router-dom";
import CustomRadioButton from "../../../../components/RadioButton/Index";
import CustomCheckbox from "../../../../components/CheckBox";

interface IPickUpData {
  cardData: {
    label?: string;
    address?: string;
    name?: any;
    phoneNumber?: string;
  };
  key?: string;
  checked?: boolean;
}

const PickupCard: React.FunctionComponent<IPickUpData> = ({
  cardData: { label, address, name, phoneNumber },
  key,
  checked,
}) => {
  const navigate = useNavigate();
  const cardClasses = `p-4 shadow-lg rounded-lg cursor-pointer ${
    checked ? "border-[2px] border-green-500" : "border-[1px] border-[#E8E8E8]"
  } bg-white w-[372px] h-auto ${checked ? "bg-gray-100" : "bg-white"}`;
  return (
    <div className={cardClasses} key={key}>
      <div className="flex justify-between ml-3 mb-1">
        <div className="flex items-center space-x-2">
          <CustomCheckbox
            checked={checked}

            // onChange={(e) => {
            //   setIsReturnAddress(e.target.checked);
            // }}
          />
          <p className="text-[#004EFF] text-[16px] font-medium cursor-pointer capitalize">
            {label}
          </p>
        </div>
        {/* <div>
          <img src={EditImageWithBlack} alt="" onClick={() => navigate("")} />
        </div> */}
      </div>

      <p className="px-4 w-[250px] w-[95%]  text-[16px] font-Open font-semibold leading-6 capatalize">
        {address}
      </p>

      <div className="flex flex-col gap-y-4 px-4 w-[250px] lg:w-[280px] mt-4">
        <div className="flex gap-x-2 ">
          <img src={ProfileImage} alt="" className="w-[16px] h-[16px]" />
          <p className="text-[14px] font-semibold font-Open leading-[18px]">
            {name}
          </p>
        </div>
        <div className="flex gap-x-2">
          <img src={PhoneIcon} alt="" className="w-[16px] h-[16px]" />
          <p className="text-xs font-semibold font-Open leading-[18px]">
            +91 {phoneNumber}
          </p>
        </div>
      </div>
    </div>
  );
};
export default PickupCard;
