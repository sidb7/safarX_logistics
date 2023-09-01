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
  } = props;

  const dropdownRef: any = useRef(null);

  const addClass = () => {
    dropdownRef.current.children[1].classList.add("setLabel");
  };

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
          className="select-dropdown rounded border-[1px] border-[#A4A4A4] gap-[10px] h-[48px] font-Open text-[12px]  text-[#777777] outline-none appearance-none"
        >
          {options?.map((option: any, index: number) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <label
          htmlFor="selectDropdown"
          className="select-label text-[12px] text-[#777777] leading-4 pl-10 w-[80%]"
        >
          {placeHolder}
        </label>
      </div>
    </>
  );
};

export default CustomDropDown;
