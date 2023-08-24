import React from "react";

interface IRadioButtonProps {
  name?: string;
  value?: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomSquaredRadioButton = (props: IRadioButtonProps) => {
  const { name, value, checked, onChange } = props;

  return (
    <label className="radio-label">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <div className="radio-button"></div>
    </label>
  );
};

export default CustomSquaredRadioButton;
