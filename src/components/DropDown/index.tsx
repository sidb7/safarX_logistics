import "./dropDown.css";
import { useRef } from "react";

interface IDropDownProps {
  options?: any;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: any;
  wrapperClass?: string;
  selectClassName?: string;
  placeHolder?: string;
  name?: string;
  heading?: string;
  inputError?: boolean;
}

const CustomDropDown = (props: IDropDownProps) => {
  const {
    options,
    onChange,
    value,
    wrapperClass,
    selectClassName,
    placeHolder,
    name,
    heading,
    inputError,
  } = props;

  const dropdownRef: any = useRef(null);

  const addClass = () => {
    dropdownRef.current.children[1].classList.add("setLabel");
  };

  let label =
    placeHolder?.replace(/\b\w/g, (match) => match.toUpperCase()) || "";

  return (
    <>
      <div
        className={`${wrapperClass} select-container`}
        ref={dropdownRef}
        onClick={addClass}
      >
        <select
          id="selectDropdown"
          onChange={onChange}
          value={value}
          // className={` ${selectClassName} select-dropdown appearance-none pr-8 pl-2 form-select bg-no-repeat h-[48px] px-2 rounded block w-full bg-transparent border-[1px] border-[#A4A4A4] text-[12px] text-[#777777] outline-none cursor-pointer`}
          placeholder={placeHolder}
          name={name}
          className={`${selectClassName} select-dropdown rounded  ${
            inputError && !value
              ? "!border-red-500"
              : "border-[1px] border-[#A4A4A4]"
          } p-[10px] gap-[10px] h-[48px] font-sans text-[12px] text-[#1C1C1C] outline-none`}
        >
          {heading && (
            <option
              value={""}
              className="text-[16px] text-[#777777] absolute leading-4 font-Lato"
            >
              {heading}
            </option>
          )}
          {options?.map((option: any, index: number) => (
            <option
              key={index}
              value={option.value}
              className="text-[14px] text-[#1C1C1C] absolute leading-4 font-Open"
            >
              {option.label}
            </option>
          ))}
        </select>
        <label
          htmlFor="selectDropdown"
          className={` text-[12px] text-[#777777] font-normal font-sans absolute transition-all ease-out ${
            value && "valueFilled"
          } `}
        >
          {label}
        </label>
      </div>
      {inputError && !value && (
        <span
          className={`text-[red] transition-all ease-out h-0  h-[18px]  delay-100 font-Open text-[11px] mt-1 px-2 `}
        >
          Field is required
        </span>
      )}
    </>
  );
};

export default CustomDropDown;
