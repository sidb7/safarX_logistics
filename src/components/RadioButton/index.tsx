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
}

const index = (props: IRadioButtonProps) => {
  const {
    name,
    value,
    onChange,
    inputClassName,
    label,
    id,
    labelClassName,
    style,
  } = props;

  return (
    <div className="flex items-center ">
      <input
        type="radio"
        name={name}
        value={value}
        onChange={onChange}
        className={`  ${inputClassName} `}
        id={id}
        style={style}
      />
      <label htmlFor={id} className={`${labelClassName}`}>
        {label}
      </label>
    </div>
  );
};

export default index;
