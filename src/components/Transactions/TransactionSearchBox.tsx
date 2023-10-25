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
export const TransactionSearchBox: React.FunctionComponent<ISearchBoxProps> = ({
  className = "",
  label,
  value,
  onChange,
  getFullContent,
  customPlaceholder,
}) => {
  const resetRef: any = useRef(null);
  const resetValue = () => {
    if (resetRef.current.value) getFullContent();
    resetRef.current.value = "";
  };

  return (
    <div className="relative">
      <input
        ref={resetRef}
        placeholder={customPlaceholder}
        type="text"
        className={`${className} rounded border-[1px] border-[#A4A4A4] py-[12px] pr-[35px] !pl-[36px] w-[150px] h-[36px] font-normal text-[12px] text-[#8d8d8d] `}
        value={value}
        onChange={onChange}
        title="searchBox"
      />
      <img
        src={CrossIcon}
        alt=""
        className="absolute top-[28%] right-[5%] cursor-pointer"
        onClick={resetValue}
      />
      <img
        src={SearchBoxIcon}
        alt=""
        className="absolute top-[28%] left-[5%]"
      />
    </div>
  );
};
