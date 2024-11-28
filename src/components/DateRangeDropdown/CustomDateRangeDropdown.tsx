import "./dropDown.css";
import { useRef } from "react";

interface IDropDownProps {
  dateRanges?: any;
  onChange: (event: any) => void;
  value?: any;
  wrapperClass?: string;
  selectClassName?: string;
  placeHolder?: any;
  name?: string;
  isDisabled?: boolean;
}

const CustomDateRangeDropDown = (props: IDropDownProps) => {
  const {
    dateRanges,
    onChange,
    value,
    wrapperClass,
    selectClassName,
    placeHolder,
    name,
    isDisabled,
  } = props;

  const dropdownRef: any = useRef(null);
  let label =
    placeHolder?.replace(/\b\w/g, (match: any) => match.toUpperCase()) || "";

  return (
    <>
      <div className={`${wrapperClass} select-container`} ref={dropdownRef}>
        <select
          id="selectDropdown"
          onChange={onChange}
          disabled={isDisabled}
          value={value}
          //  placeholder={typeof placeHolder === "string" ? placeHolder : ""}
          name={name}
          className={`${selectClassName} select-dropdown rounded border-[1px] border-[#A4A4A4] p-[10px] gap-[10px] h-[48px] font-normal font-sans text-[12px] text-[#1C1C1C] outline-none`}
        >
          {label !== "" && (
            <option disabled value="">
              {label}
            </option>
          )}
          {typeof placeHolder === "string" && (
            <option value="" disabled hidden>
              {placeHolder}
            </option>
          )}
          {dateRanges &&
            Object.keys(dateRanges).map((period) => (
              <option key={period} value={period}>
                {dateRanges[period].period}
              </option>
            ))}
        </select>
      </div>
    </>
  );
};

export default CustomDateRangeDropDown;
