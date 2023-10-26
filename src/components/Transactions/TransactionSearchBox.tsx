import { useState, useRef, useEffect } from "react";
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
  const [inputValue, setInputValue] = useState(value);
  const inputRef: any = useRef(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const resetValue = () => {
    setInputValue("");
    getFullContent();
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="relative">
      <input
        ref={inputRef}
        placeholder={customPlaceholder}
        type="text"
        className={`${className} rounded border-[1px] border-[#A4A4A4] py-[12px] pr-[35px]  w-[150px] h-[36px] font-normal text-[12px] text-[#8d8d8d] `}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          onChange(e);
        }}
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
