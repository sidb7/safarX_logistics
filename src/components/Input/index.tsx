import "../../styles/inputBox.css";
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
  onClick?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInputBox: React.FunctionComponent<propTypes> = (
  props: propTypes
) => {
  const {
    label,
    value,
    inputMode = "",
    onChange,
    placeholder = "",
    className,
    containerStyle,
    inputClassName,
    labelClassName,
    name,
    visibility,
    isDisabled,
    rightIcon,
    inputType = "text",
    isRequired = false,
    isRightIcon = false,
    setVisibility,
    maxLength,
  } = props;

  return (
    <div className="flex justify-center items-center w-full">
      <div className={`relative w-[100%] ${containerStyle}`}>
        <input
          name={name}
          type={inputType}
          placeholder={placeholder || ''}
          className={`${className} rounded border-[1px] border-[#A4A4A4] p-[10px] gap-[10px] h-[48px] font-Open text-[12px] text-[#1C1C1C] outline-none custom-input  `}
          required={isRequired}
          onChange={onChange}
          value={value}
          disabled={isDisabled}
          inputMode={inputMode}
          maxLength={maxLength}
        />
        <label
          className={`text-[12px] text-[#777777] absolute  leading-4 font-Open custom-label ${
            value && "filled"
          } `}
        >
          {label}
        </label>

        {isRightIcon && (
          <img
            src={rightIcon}
            alt=""
            className={`absolute z-20  right-5 top-[30%] cursor-pointer w-[20px] h-[20px]`}
            onClick={() => {
              setVisibility(!visibility);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CustomInputBox;
