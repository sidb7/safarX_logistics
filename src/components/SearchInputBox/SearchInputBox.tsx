import "../../styles/inputBox.css";
import SearchIcon from "../../assets/Search.svg";
interface propTypes {
  label?: string;
  value?: string | number;
  inputMode?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  containerStyle?: string;
  inputClassName?: string;
  labelClassName?: string;
  name?: string;
  isDisabled?: boolean;
  inputType?: string;
  isRequired?: boolean;
  maxLength?: number;
  isRightIcon?: boolean;
  rightIcon?: string;
  setVisibility?: any;
  visibility?: any;
  onClick?: any;
  imageClassName?: string;
  tempLabel?: any;
}

const SearchInputBox: React.FunctionComponent<propTypes> = (
  props: propTypes
) => {
  const {
    label,
    value = undefined,
    onChange = () => {},
    className,
    containerStyle,
    tempLabel,
    isDisabled,
    imageClassName,
  } = props;

  return (
    <div className="flex justify-center items-center w-full">
      <div className={`relative w-[100%] ${containerStyle}`}>
        <input
          name="search"
          type="text"
          placeholder="Search"
          className={`${className} rounded border-[1px] border-[#A4A4A4] p-[10px] gap-[10px] h-[48px] font-Open text-[12px] text-[#1C1C1C] outline-none custom-input  `}
          onChange={(e: any) => onChange(e)}
          value={value}
          disabled={isDisabled}
        />
        <label
          className={`text-[12px] text-[#777777] absolute  leading-4 font-Open custom-label ${
            value && tempLabel && "filled"
          }  ${tempLabel ? "filled" : ""}`}
        >
          {label}
        </label>

        <img
          src={SearchIcon}
          alt=""
          className={`${imageClassName} absolute z-20  right-5  top-[30%] cursor-pointer w-[20px] h-[20px]`}
          onClick={() => {
            // setVisibility(!visibility);
            // onClick();
          }}
        />
      </div>
    </div>
  );
};

export default SearchInputBox;
