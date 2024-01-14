import { useRef } from "react";
import SearchBoxIcon from "../../assets/SearchBox/SearchIcon.svg";
import CrossIcon from "../../assets/cross.svg";
import "../../styles/placeHolderPadding.css";

interface ISearchBoxProps {
  className?: string;
  label: string;
  value: string;
  onChange: any;
  getFullContent?: any;
  customPlaceholder?: string;
}
export const SearchBox: React.FunctionComponent<ISearchBoxProps> = ({
  className = "",
  label,
  value,
  onChange,
  getFullContent,
  customPlaceholder,
}) => {
  const resetRef: any = useRef<HTMLInputElement | null>(null);
  const resetValue = () => {
    if (resetRef.current.value) getFullContent();
    resetRef.current.value = "";
  };

  return (
    <div className="relative ">
      {/* <div className="absolute flex h-full justify-between "> */}
      <img
        src={CrossIcon}
        alt=""
        className="absolute right-0 h-full cursor-pointer p-2 z-10"
        onClick={resetValue}
      />
      <img
        src={SearchBoxIcon}
        alt=""
        className="absolute left-0 h-full p-2 z-10"
      />
      {/* </div> */}
      {/* <CustomInputBox
        ref={resetRef}
        placeholder={customPlaceholder}
        inputType="text"
        className={`${className}   transactionSearhBox rounded border-[1px] border-[#A4A4A4]  !pr-[10px]  h-[36px] font-normal text-[12px] text-[#8d8d8d] `}
        // value={value}
        onChange={onChange}
        // label="Search Products"
      /> */}
      <input
        ref={resetRef}
        placeholder={customPlaceholder}
        type="text"
        className={`${className}  focus:border-[#004eff] transition-all duration-300 transactionSearhBox rounded border-[1px] border-[#A4A4A4] py-[12px] pr-[5px] !pl-[36px] h-[36px] font-normal text-[12px] `}
        // value={value}
        onChange={onChange}
        title="Search Box"
      />
    </div>
  );
};
