import EditIcon from "../../../assets/Profile/EditIcon.svg";
import BlackEditIcon from "../../../assets/Profile/BlackEditIcon.svg";
import EmailIcon from "../../../assets/Profile/EmailIcon.svg";
import PhoneIcon from "../../../assets/Profile/PhoneIcon.svg";
import WebsiteIcon from "../../../assets/Profile/WebsiteIcon.svg";
import ProfileIcon from "../../../assets/Profile/ProfileIcon.svg";

export const ProfileCard = () => {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-3 border-[1px] border-[#E8E8E8] rounded-md mt-4">
        <div className="flex flex-col col-span-1 items-center py-4">
          <img src={ProfileIcon} alt="Profile" className="w-[82px]" />
          <span className="text-[12px] text-[#1C1C1C]">Seller ID: 5943</span>
        </div>
        <div className="col-span-2 whitespace-nowrap flex flex-col space-y-1 text-[14px] font-normal py-4">
          <span className="flex justify-between">
            Divya Sharma
            <img src={BlackEditIcon} alt="" className="pr-4" />
          </span>
          <span className="flex">
            <img src={EmailIcon} alt="Email" className="w-[16px] mr-1" />
            Divya.Sharma@gmail.com
          </span>
          <span className="flex">
            <img src={PhoneIcon} alt="Phone" className="w-[16px] mr-1" />
            +91 7387324442
          </span>
          <span className="flex">
            <img src={WebsiteIcon} alt="Website" className="w-[16px] mr-1" />
            FreeProducts.com
          </span>
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <div className="flex flex-col drop-shadow-sm rounded-md bg-[#F2F6FF] w-[148px] h-[74px]">
          <span className="text-[14px] text-[#1C1C1C] font-semibold pl-2 py-2">
            Yaari Points
          </span>
          <span className="text-[16px] text-[#004EFF] font-semibold pl-2 py-2">
            100
          </span>
        </div>
        <div className="flex flex-col drop-shadow-sm rounded-md bg-[#FDF6EA] w-[148px] h-[74px]">
          <span className="text-[14px] text-[#1C1C1C] font-semibold pl-2 py-2">
            Wallet Balance
          </span>
          <span className="text-[16px] text-[#004EFF] font-semibold pl-2 py-2">
            5,000
          </span>
        </div>
      </div>

      <div className="flex flex-col w-full font-semibold border-[1px] border-[#E8E8E8] rounded-md h-[86px] p-2 mt-4">
        <div className="flex justify-between mt-4">
          <span className="text-[16px] font-[#1C1C1C]">Sliver plan</span>
          <span className="text-[14px] text-[#004EFF] underline underline-offset-4 decoration-[#004EFF]">
            CHANGE
          </span>
        </div>
        <div className="flex mt-2">
          <span className="text-[14px] text-[#494949]">
            Activited since Jun 2023
          </span>
        </div>
      </div>
    </div>
  );
};
