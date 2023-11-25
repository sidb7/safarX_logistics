import React from "react";
interface IProps {
  label?: string;
  checked?: boolean;
  className?: string;
  checkboxClassName?: string;
  labelClassName?: string;
  name?: string;
  value?: string;

  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Checkbox: React.FC<IProps> = ({
  label,
  checked,
  className,
  checkboxClassName,
  onChange,
  labelClassName,
  name,
  value,
}) => {
  return (
    <div className="flex items-center justify-start p-1 transition-colors duration-200 text-gray-600 rounded-md hover:bg-gray-100 whitespace-nowrap">
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        title="Checkbox"
        className={`${checkboxClassName} form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out`}
      />
      <span className={`ml-2 ${labelClassName} text-sm`}>{label}</span>
    </div>
  );
};
export default Checkbox;
