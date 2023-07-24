import "./inputStyle.css";
interface propTypes {
  label: string;
  value?: string | number;
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
}

const CustomInputBox = (props: propTypes) => {
  const {
    label,
    value,
    onChange,
    placeholder,
    className,
    containerStyle,
    inputClassName,
    labelClassName,
    name,
    isDisabled,
    inputType,
    isRequired = false,
  } = props;
  return (
    <div className="flex justify-center items-center ">
      <div className={`relative w-[100%] ${containerStyle}`}>
        <input
          placeholder=" "
          type={inputType}
          className={`${className} rounded border-[1px] border-[#A4A4A4] p-[10px] gap-[10px] h-[48px] font-semibold text-[12px] text-[#1C1C1C] outline-none custom-input  `}
          required={isRequired}
          onChange={onChange}
        />
        <label
          className={`text-[12px] text-[#777777] absolute left-0 top-[50%] leading-4  custom-label ${labelClassName}`}
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default CustomInputBox;
