import editIcon from "../../../assets/serv/edit.svg";
import serviceIcon from "../../../assets/serv/service.svg";

const Service = () => {
    return(
        <div className="p-[12px] gap-[8px] rounded-lg border-[1px] shadow-lg border-[#E8E8E8] bg-[#FFFFFF]">
          <div className="flex flex-col gap-y-3 ">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row items-center gap-2">
                <img src={serviceIcon} alt="Location Icon" />
                <p className="text-[14px] font-medium">Service Details</p>
              </div>
              <div>
                <img src={editIcon} alt="Edit Icon" />
              </div>
            </div>
            <div className="flex flex-col gap-y-1  ml-[25px]">
              <p className="text-[12px] font-medium">Delhivery | Economy</p>
              
              <p className="text-[12px] font-medium">4kg | ₹ 4,000</p>
            </div>
          </div>
        </div>
    )
}
export default Service;