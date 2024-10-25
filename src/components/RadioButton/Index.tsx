import React from "react";

interface IRadioButtonProps {
  name?: string;
  value?: string;
  inputClassName?: string;
  labelClassName?: string;
  onChange?: (e: any) => void;
  id?: string;
  label?: string;
  style?: any;
  checked?: boolean;
  disabled?: any;
}

const Index = (props: IRadioButtonProps) => {
  const {
    name,
    value,
    onChange,
    inputClassName,
    label,
    id,
    labelClassName,
    style,
    checked,
    disabled,
  } = props;

  return (
    <div className="flex items-center cursor-pointer ">
      <input
        type="radio"
        name={name}
        value={value}
        onChange={onChange}
        className={`  ${inputClassName} cursor-pointer`}
        id={id}
        style={style}
        checked={checked}
        disabled={disabled}
      />

      <label htmlFor={id} className={`${labelClassName} cursor-pointer  `}>
        {label}
      </label>
    </div>
  );
};

export default Index;
