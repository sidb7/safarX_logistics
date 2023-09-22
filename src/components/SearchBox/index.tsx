import SearchBoxIcon from "../../assets/SearchBox/SearchIcon.svg";

interface ISearchBoxProps {
  className?: string;
  label: string;
  value: string;
  onChange: any;
}
export const SearchBox: React.FunctionComponent<ISearchBoxProps> = ({
  className = "",
  label,
  value,
  onChange,
}) => {
  return (
    <div className="relative">
      <input
        // placeholder={label}
        type="text"
        className={`${className} rounded border-[1px] border-[#A4A4A4] py-[12px] pr-[10px] !pl-[36px] w-[174px] h-[36px] font-normal text-[12px] text-[#8d8d8d] `}
        // value={value}
        onChange={onChange}
        title="searchBox"
      />

      <img
        src={SearchBoxIcon}
        alt=""
        className="absolute top-[28%] left-[5%]"
      />
    </div>
  );
};
