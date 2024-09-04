import react from "react";
import ViewIcon from "../../assets/Label/view.svg";

interface LabelProps {
  label: string;
  info?: string;
  className?: string;
  classNameInfo?: string;
  viewIconVisible?: boolean;
}

const LabelContainer = (props: LabelProps) => {
  const { label, info, className, classNameInfo, viewIconVisible } = props;
  return (
    <div>
      <span
        className={`text-[10px] text-[#777777] font-normal font-Open leading-4 ${className}`}
      >
        {label}
      </span>
      <div className="flex gap-x-1">
        <span
          className={`text-xs text-[#1C1C1C] font-semibold font-Open leading-4 ${classNameInfo}`}
          title={info}
        >
          {info}
        </span>
        {viewIconVisible && (
          <img src={ViewIcon} alt="" width={16} height={16} />
        )}
      </div>
    </div>
  );
};

export default LabelContainer;
