import EditIcon from "../../../assets/Profile/EditIcon.svg";
import DummyImage from "../../../assets/Profile/DummyImage.svg";
import { useNavigate } from "react-router-dom";
export const ProfileBankCard = () => {
  const navigate = useNavigate()
  return (
    <div
      className={`border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 mt-4`}
    >
      <div
        className={`flex justify-between items-center h-[44px] bg-[#F6F6F6]`}
      >
        <div>
          <span className="text-base font-semibold text-[#1C1C1C] ml-4">
            Bank Details
          </span>
        </div>
        <div>
          <img
            src={EditIcon}
            alt=""
            className="mr-4"
            onClick={() => navigate("/profile/profileEdit-bank")}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 ml-4 mt-2">
        <div className="flex flex-col">
          <span className="text-[10px] text-[#777777] font-normal">
            Account Holder Name
          </span>
          <div className="flex">
            <span className="text-xs text-[#1C1C1C] font-semibold	">
              Raj Sharma
            </span>
          </div>
        </div>

        <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
          <span className="ml-3 text-[10px] text-[#777777] font-normal">
            Bank Name
          </span>
          <span className="ml-3 flex text-xs text-[#1C1C1C] font-semibold">
            <span>HDFC</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 ml-4 mt-2">
        <div className="flex flex-col">
          <span className="text-[10px] text-[#777777] font-normal">
            Branch Name
          </span>
          <div className="flex">
            <span className="text-xs text-[#1C1C1C] font-semibold	">
              Malad East
            </span>
          </div>
        </div>

        <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
          <span className="ml-3 text-[10px] text-[#777777] font-normal">
            IFSC Code
          </span>
          <span className="ml-3 flex text-xs text-[#1C1C1C] font-semibold">
            <span>BOB2342</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 ml-4 mt-2">
        <div className="flex flex-col">
          <span className="text-[10px] text-[#777777] font-normal">
            Account Type
          </span>
          <div className="flex">
            <span className="text-xs text-[#1C1C1C] font-semibold	">Saving</span>
          </div>
        </div>

        <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
          <span className="ml-3 text-[10px] text-[#777777] font-normal">
            Account number
          </span>
          <span className="ml-3 flex text-xs text-[#1C1C1C] font-semibold">
            <span>3868316485</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 ml-4 my-2">
        <div className="flex flex-col">
          <span className="text-[10px] text-[#777777] font-normal">
            Cheque Details
          </span>
          <div className="flex">
            <img src={DummyImage} alt="Cheque" className="mr-1 h-[10px]" />
            <span className="text-xs text-[#1C1C1C] font-semibold	">
              Cheque. png
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
