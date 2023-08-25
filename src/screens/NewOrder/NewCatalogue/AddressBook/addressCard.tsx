import EditImageWithBlack from "../../../../assets/Catalogue/edit.svg";
import PhoneIcon from "../../../../assets/ReturningUser/phoneIcon.svg";
import ProfileImage from "../../../../assets/Catalogue/profileIcon.svg";
import { useNavigate } from "react-router-dom";

interface IPickUpData {
  cardData: {
    addressLabel: string;
    address: string;
    name: any;
    phoneNumber: string;
  };
  addressData: object;
  key: string;
  activeTab: string;
}

const AddressCard: React.FunctionComponent<IPickUpData> = ({
  cardData: { addressLabel, address, name, phoneNumber },
  addressData,
  key,
  activeTab,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="p-[16px] shadow-lg rounded-lg border-[1px] border-[#E8E8E8] bg-[#FFFFFF] w-[372px]"
      key={key}
    >
      <div className="flex justify-between">
        <p className="text-[#004EFF] text-[16px] font-medium cursor-pointer">
          {addressLabel}
        </p>
        <img
          src={EditImageWithBlack}
          alt=""
          onClick={() =>
            navigate("/catalogue/edit-address", {
              state: { addressData, activeTab },
            })
          }
        />
      </div>
      <p className="text-[16px] font-medium mt-2 w-[250px]">{address}</p>

      <div className="flex gap-x-2 mt-1">
        <img src={ProfileImage} alt="" className="w-[16px] h-[16px]" />
        <p className="text-[16px] font-medium">{name}</p>
      </div>
      <div className="flex gap-x-2 mt-1">
        <img src={PhoneIcon} alt="" className="w-[16px] h-[16px]" />
        <p className="text-[16px] font-medium">{phoneNumber}</p>
      </div>
    </div>
  );
};
export default AddressCard;
