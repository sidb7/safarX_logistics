import React from 'react';

interface RadioButtonProps {
  id: string;
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  id,
  name,
  value,
  label,
  checked,
  onChange,
  disabled = false,
  className = '',
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      />
      <label
        htmlFor={id}
        className={`ml-2 text-sm font-medium text-gray-900 cursor-pointer select-none ${
          disabled ? 'cursor-not-allowed opacity-50' : ''
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default RadioButton;