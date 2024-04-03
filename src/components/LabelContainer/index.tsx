interface LabelProps {
  label: string;
  info?: string;
  className?: string;
  classNameInfo?: string;
}

const LabelContainer = (props: LabelProps) => {
  const { label, info, className, classNameInfo } = props;
  return (
    <div>
      <span
        className={`text-[10px] text-[#777777] font-normal font-Open leading-4 ${className}`}
      >
        {label}
      </span>
      <div className="flex">
        <span
          className={`text-xs text-[#1C1C1C] font-semibold font-Open leading-4 ${classNameInfo}`}
          title={info}
        >
          {info}
        </span>
      </div>
    </div>
  );
};

export default LabelContainer;
