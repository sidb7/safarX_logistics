import React, { useEffect, useState } from "react";
interface IProps {
  label?: string;
  checked?: boolean;
  className?: string;
  checkboxClassName?: string;
  labelClassName?: string;
  name?: string;
  value?: boolean;
  style?: any;
  disabled?: any;
  inputElementClass?: any;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showCase?: boolean;
  id?: any;
}
const Checkbox: React.FC<IProps> = ({
  label,
  checked,
  disabled,
  className,
  checkboxClassName,
  onChange = () => {},
  labelClassName,
  name,
  value = false,
  style,
  inputElementClass,
  required,
  showCase = false,
  id,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckboxChange = (e: any) => {
    if (showCase) return;
    if (disabled) return;
    setIsChecked(!isChecked);
    onChange({ ...e, name, value: !isChecked });
  };

  let textLabel: any = label;
  textLabel = textLabel?.split("-");

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <div
      className={`${checkboxClassName} ${className} ${
        disabled ? "text-[#f8f8f8]" : ""
      } cursor-pointer flex items-center justify-start py-1 transition-colors duration-200 text-gray-600 rounded-md`}
      onClick={handleCheckboxChange}
    >
      <input
        required={required}
        type="checkbox"
        disabled={disabled}
        name={name}
        checked={isChecked}
        onChange={(e) => handleCheckboxChange(e)}
        title="Checkbox"
        style={style}
        id={id}
        className={`${checkboxClassName} ${inputElementClass} form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out cursor-pointer`}
      />
      <p
        className={`${labelClassName} text-balance select-none text-sm cursor-pointer`}
        onClick={handleCheckboxChange} // Handle checkbox change when the span is clicked
      >
        {/* <HtmlParser htmlString={label} /> */}
        {textLabel?.[1] !== undefined ? (
          <>
            {textLabel?.[0]}{" "}
            <span className="text-[0.800rem]">-{textLabel?.[1]}</span>
          </>
        ) : (
          textLabel?.[0]
        )}
      </p>
    </div>
  );
};
export default Checkbox;
