import { useNavigate } from "react-router-dom";
import EditIcon from "../../../assets/Profile/EditIcon.svg";
export const ProfileKycCard = () => {
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
            KYC Details
          </span>
        </div>
        <div>
          <img
            src={EditIcon}
            alt=""
            className="mr-4"
            onClick={() => navigate("/profile/profileEdit-kyc")}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 ml-4 mt-2">
        <div className="flex flex-col">
          <span className="text-[10px] text-[#777777] font-normal">
            User Name
          </span>
          <div className="flex">
            <span className="text-xs text-[#1C1C1C] font-semibold	">Bunty</span>
          </div>
        </div>

        <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
          <span className="ml-3 text-[10px] text-[#777777] font-normal">
            GST Details
          </span>
          <span className="ml-3 flex text-xs text-[#1C1C1C] font-semibold">
            <span>HD35K3JDT4D5D2</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 ml-4 mt-2">
        <div className="flex flex-col">
          <span className="text-[10px] text-[#777777] font-normal">
            Aadhar Details
          </span>
          <div className="flex">
            <span className="text-xs text-[#1C1C1C] font-semibold	">
              114626443
            </span>
          </div>
        </div>

        <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
          <span className="ml-3 text-[10px] text-[#777777] font-normal">
            PAN Details
          </span>
          <span className="ml-3 flex text-xs text-[#1C1C1C] font-semibold">
            <span>DI4RI4IR3</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 ml-4 mt-2">
        <div className="flex flex-col">
          <span className="text-[10px] text-[#777777] font-normal">
            Plot no, Sector
          </span>
          <div className="flex">
            <span className="text-xs text-[#1C1C1C] font-semibold	">
              Plot no. 8 Sector 1
            </span>
          </div>
        </div>

        <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
          <span className="ml-3 text-[10px] text-[#777777] font-normal">
            Locality, Landmark
          </span>
          <span className="ml-3 flex text-xs text-[#1C1C1C] font-semibold">
            <span>Locality details</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 ml-4 my-2">
        <div className="flex flex-col">
          <span className="text-[10px] text-[#777777] font-normal">
            City, Pin code
          </span>
          <div className="flex">
            <span className="text-xs text-[#1C1C1C] font-semibold	">
              Mumbai 324212
            </span>
          </div>
        </div>

        <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
          <span className="ml-3 text-[10px] text-[#777777] font-normal">
            State, Country
          </span>
          <span className="ml-3 flex text-xs text-[#1C1C1C] font-semibold">
            <span>Maharashtra, India</span>
          </span>
        </div>
      </div>
    </div>
  );
};
