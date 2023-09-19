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

const ServiceBox: React.FunctionComponent<IRadioButtonProps> = (
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
    <div className="flex items-center cursor-pointer px-4 gap-4">
      {options?.map((option: any) => (
        <div
          key={option?.value}
          className="flex items-center p-2 shadow-md border border-[#c1c1c1] rounded-lg w-72"
          onClick={(e: any) => handleOnChange(option.value)}
        >
          <div className="self-start px-2">
            <input
              type="radio"
              name={name}
              value={option?.value}
              className="!w-4 !p-0 !m-0"
              readOnly={true}
              checked={radioValue === option?.value}
              onChange={(e: any) => handleOnChange(e.target.value)}
            />
          </div>
          <div
            className="px-2  text-lg"
            onClick={() => handleOnChange(option.value)}
          >
            <p className="my-2">
              {`${option.text?.partnerName} ${option.text?.companyServiceName}`}
            </p>

            <p className="">
              {option.text?.total.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
              })}
            </p>

            <p className="text-[#004EFF] font-medium py-2">
              ETA: {option.text?.EDT}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceBox;
