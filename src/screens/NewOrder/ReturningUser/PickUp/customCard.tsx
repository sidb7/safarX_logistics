import EditImageWithBlack from "../../../../assets/Catalogue/edit.svg";
import PhoneIcon from "../../../../assets/ReturningUser/phoneIcon.svg";
import ProfileImage from "../../../../assets/Catalogue/profileIcon.svg";
import { useNavigate } from "react-router-dom";
import CustomRadioButton from "../../../../components/RadioButton/Index";

interface IPickUpData {
  cardData: {
    label?: string;
    address?: string;
    name?: any;
    phoneNumber?: string;
  };
  key?: string;
}

const PickupCard: React.FunctionComponent<IPickUpData> = ({
  cardData: { label, address, name, phoneNumber },
  key,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="p-4 shadow-lg rounded-lg border-[1px] border-[#E8E8E8] bg-[#FFFFFF] w-[372px]"
      key={key}
    >
      <div className="flex justify-between">
        <div className="flex space-x-2">
          <CustomRadioButton
            name="radio"
            inputClassName="!mt-[-12px]"
            style={{ accentColor: "black" }}
          />
          <p className="text-[#004EFF] text-[16px] font-medium cursor-pointer">
            {label}
          </p>
        </div>
        <div>
          <img src={EditImageWithBlack} alt="" onClick={() => navigate("")} />
        </div>
      </div>

      {address && (
        <p className="px-4 w-[250px] lg:w-[280px] text-[16px] font-Open font-semibold leading-6 capatalize">
          {address}
        </p>
      )}

      {name && (
        <div className="flex flex-col gap-y-4 px-4 w-[250px] lg:w-[280px]">
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
      )}
    </div>
  );
};
export default PickupCard;
