import React, { useEffect, useState } from "react";

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
  options?: any;
  selectedValue?: any;
}

const GroupRadioButtons: React.FunctionComponent<IRadioButtonProps> = (
  props: IRadioButtonProps
) => {
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
    options = [],
    selectedValue,
  } = props;

  const [radioValue, setRadioValue] = useState<any>(value || "");

  const handleOnChange = (e: any) => {
    setRadioValue(e);
    selectedValue(e);
  };

  return (
    <div className="flex items-center cursor-pointer px-4">
      {options.map((option: any) => (
        <div key={option?.value} className="flex items-center px-2">
          <input
            type="radio"
            name={name}
            value={option?.value}
            className="!w-4"
            readOnly={true}
            checked={radioValue === option?.value}
            onChange={(e: any) => handleOnChange(e.target.value)}
          />
          <div className="px-2" onClick={() => handleOnChange(option.value)}>
            {option?.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupRadioButtons;
