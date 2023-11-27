import EditImageWithBlack from "../../../../assets/Catalogue/edit.svg";
import PhoneIcon from "../../../../assets/ReturningUser/phoneIcon.svg";
import ProfileImage from "../../../../assets/Catalogue/profileIcon.svg";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "../../../../assets/DeleteIconRedColor.svg";

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
  setIsModalOpen: () => void;
  setAddressToBeDeleted: () => void;
}

const AddressCard: React.FunctionComponent<IPickUpData> = ({
  cardData: { addressLabel, address, name, phoneNumber },
  addressData,
  key,
  activeTab,
  setIsModalOpen,
  setAddressToBeDeleted,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="p-[16px] shadow-lg rounded-lg border-[1px] border-[#E8E8E8] bg-[#FFFFFF] w-[372px]"
      key={key}
    >
      <div className="flex justify-between">
        <p className="text-[#004EFF] text-[16px] font-Open font-semibold leading-5 capitalize">
          {addressLabel}
        </p>

        <div className="flex items-center gap-x-2">
          <img
            src={EditImageWithBlack}
            alt=""
            className="cursor-pointer"
            onClick={() =>
              navigate("/catalogues/catalogue/edit-address", {
                state: { addressData, activeTab },
              })
            }
          />
          <img
            src={DeleteIcon}
            alt=""
            width={18}
            onClick={() => {
              setIsModalOpen();
              setAddressToBeDeleted();
            }}
          />
        </div>
      </div>
      <p className="text-[16px] break-words font-Open font-semibold capitalize leading-[30px] mt-2 w-[250px]">
        {address}
      </p>

      <div className="flex items-center gap-x-2 mt-2">
        <img src={ProfileImage} alt="" className="w-[16px] h-[16px]" />
        <p className="text-[16px] font-Open font-semibold leading-5 capitalize">
          {name}
        </p>
      </div>
      <div className="flex items-center gap-x-2 mt-2">
        <img src={PhoneIcon} alt="" className="w-[16px] h-[16px]" />
        <p className="text-[16px] font-Open font-semibold leading-5 capitalize">
          {phoneNumber}
        </p>
      </div>
    </div>
  );
};
export default AddressCard;
