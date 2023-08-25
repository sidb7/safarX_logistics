import "./inputStyle.css";
interface propTypes {
  label: string;
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
}

const CustomInputBox = (props: propTypes) => {
  const {
    label,
    value,
    inputMode,
    onChange,
    placeholder,
    className,
    containerStyle,
    inputClassName,
    labelClassName,
    name,
    isDisabled,
    inputType = "text",
    isRequired = false,
    isRightIcon = false,
    maxLength,
  } = props;
  return (
    <div className="flex justify-center items-center w-full">
      <div className={`relative w-[100%] ${containerStyle}`}>
        <input
          placeholder=""
          type={inputType}
          className={`${className} rounded border-[1px] border-[#A4A4A4] p-[10px] gap-[10px] h-[48px] font-Open text-[12px] text-[#1C1C1C] outline-none custom-input  `}
          required={isRequired}
          onChange={onChange}
          value={value}
          disabled={isDisabled}
          inputMode={inputMode}
          maxLength={maxLength}
        />
        <label
          className={`text-[12px] text-[#777777] absolute left-0 top-[50%] leading-4 font-Open custom-label ${labelClassName}`}
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default CustomInputBox;
