import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import InfoCircle from "../../assets/info-circle.svg";



interface OneInputBoxProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
  type?: string;
  isRequired?: boolean;
  errorMessage?: string;
  tooltipContent?: string;
  disabled?: boolean; // New prop for disability
}

const OneInputBox: React.FC<OneInputBoxProps> = ({
  label,
  value,
  onChange,
  placeholder = '',
  name,
  type = 'text',
  isRequired = false,
  errorMessage,
  tooltipContent,
  disabled = false, // Default to not disabled
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex flex-col text-start w-full">
      <div className="relative w-full">
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          className={`w-full p-[10px] h-[48px] rounded border text-[12px] outline-none
            ${errorMessage ? 'border-[#F35838]' : 'border-[#A4A4A4]'}
            ${isFocused ? 'border-[#004eff]' : ''}
            ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}
          `}
          required={isRequired}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled} // Apply disability
        />
        <label
          className={`text-[12px] transition-all
            ${(value || isFocused) ? '-top-2 text-[10px] bg-white px-1' : 'top-[14px]'}
            ${errorMessage ? 'text-[#F35838]' : 'text-[#777777]'}
            ${disabled ? 'text-gray-500' : ''}
            absolute left-[10px]
          `}
        >
          {label}
        </label>
        {tooltipContent && !disabled && ( // Hide tooltip when disabled
          <>
            <img
              src={InfoCircle}
              alt="Info"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer"
              data-tooltip-id="input-tooltip"
              data-tooltip-content={tooltipContent}
            />
            <Tooltip
              id="input-tooltip"
              style={{
                backgroundColor: "#4D83FF",
                color: "#FFFFFF",
                fontSize: "12px",
              }}
            />
          </>
        )}
      </div>
      {errorMessage && !disabled && ( // Hide error message when disabled
        <div className="flex items-center gap-x-1 mt-1">
          <img src={InfoCircle} alt="" width={16} height={16} />
          <span className="font-normal text-[#F35838] text-xs leading-3">
            {errorMessage}
          </span>
        </div>
      )}
    </div>
  );
};

export default OneInputBox;