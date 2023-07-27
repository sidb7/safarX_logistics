import cancelledicon from "../../../assets/Transaction/cancelledIcon.svg";
import bookedIcon from "../../../assets/Transaction/bookedIcon.svg";

export const Cancelled: React.FunctionComponent = () => {
  return (
    <div className="inline-flex justify-center gap-x-1 bg-[#FEEEEB] rounded-sm border-2 border-[#F35838] px-3 py-[6px] ">
      <img src={cancelledicon} alt="" />
      <span className="text-xs font-semibold text-[#F35838] items-center ">
        Cancelled
      </span>
    </div>
  );
};

export const Returned: React.FC = () => {
  return (
    <div className="inline-flex justify-center gap-x-1 bg-[#FDF6EA] rounded-sm border-2 border-[#F0A22E] px-3 py-[6px] ">
      <img src={cancelledicon} alt="" />
      <span className="text-xs font-semibold text-[#F0A22E] items-center ">
        Returned
      </span>
    </div>
  );
};

export const Booked: React.FC = () => {
  return (
    <div className="inline-flex justify-center gap-x-1 bg-[#F2FAEF] rounded-sm border-2 border-[#7CCA62] px-3 py-[6px] ">
      <img src={bookedIcon} alt="" />
      <span className="text-xs font-semibold text-[#7CCA62] items-center ">
        Booked
      </span>
    </div>
  );
};
