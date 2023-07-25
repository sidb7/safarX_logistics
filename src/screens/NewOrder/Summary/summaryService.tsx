import editIcon from "../../../assets/serv/edit.svg";
import serviceIcon from "../../../assets/serv/service.svg";

const SummaryService = () => {
  return (
    <div className="p-[12px] gap-[8px] rounded-lg border-[1px] shadow-lg border-[#E8E8E8] bg-[#FFFFFF] lg:w-[385px]">
      <div className="flex flex-col ">
        <div className="flex flex-row justify-between items-center mb-4">
          <div className="flex flex-row items-center gap-x-2">
            <img src={serviceIcon} alt="Location Icon" />
            <p className="text-[14px] font-medium lg:text-[18px]">
              Service Details
            </p>
          </div>
          <div>
            <img src={editIcon} alt="Edit Icon" />
          </div>
        </div>
        <div className="flex flex-col gap-y-1  ml-[25px] mb-10 ">
          <p className="text-[12px] font-medium  text-[#004EFF]  lg:text-[16px] lg:font-semibold">
            Service Name
          </p>
          <p className="text-[12px] font-medium lg:text-[16px] lg:font-semibold">
            Partner Name
          </p>

          <p className="text-[12px] font-medium lg:text-[16px] lg:font-semibold">
            Price
          </p>
          <p className="text-[12px] font-medium lg:text-[16px] lg:font-semibold">
            Weight | Dimension
          </p>
        </div>
      </div>
    </div>
  );
};
export default SummaryService;
