// import { useState, ReactNode, useRef, FC } from 'react';

// interface FloatingLabelInputProps {
//   placeholder: string;
//   type?: string;
//   icon?: ReactNode;
//   counter?: string;
// }

// const FloatingLabelInput: FC<FloatingLabelInputProps> = ({ 
//   placeholder, 
//   type = "text", 
//   icon = null, 
//   counter = null 
// }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [value, setValue] = useState('');
//   const hasValue = value.length > 0;
//   const showIcon = !(isFocused || hasValue) && icon;
//   const inputRef = useRef<HTMLInputElement>(null);

//   const handleLabelClick = () => {
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   };

//   return (
//     <div className="relative">
//       <div className="relative">
//         {showIcon && (
//           <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
//             {icon}
//           </div>
//         )}
//         <input
//           ref={inputRef}
//           type={type}
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => setIsFocused(false)}
//           className={`w-full ${showIcon ? 'pl-10' : 'pl-4'} ${counter ? 'pr-10' : 'pr-4'} py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-Open text-sm ${hasValue ? 'font-semibold text-[#1C1C1C]' : 'font-normal text-gray-500'}`}
//         />
//         {counter && (
//           <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400 text-sm">
//             {counter}
//           </div>
//         )}
//       </div>
      
//       {/* Floating Label */}
//       <div
//         onClick={handleLabelClick}
//         className={`absolute transition-all duration-200 px-1 font-Open text-xs leading-4 tracking-normal cursor-pointer ${
//           isFocused || hasValue
//             ? `left-3 -top-2.5 bg-white z-10 ${isFocused ? 'text-blue-600' : 'text-gray-600'}`
//             : `${showIcon ? 'left-10' : 'left-4'} top-4 text-gray-500 bg-transparent`
//         }`}
//       >
//         {placeholder}
//       </div>
//     </div>
//   );
// };

// export default FloatingLabelInput;


import { useState, ReactNode, useRef, FC } from 'react';

interface FloatingLabelInputProps {
  placeholder: string;
  type?: string;
  icon?: ReactNode;
  counter?: string;
  onChangeCallback?: (value: string) => void;
}

const FloatingLabelInput: FC<FloatingLabelInputProps> = ({ 
  placeholder, 
  type = "text", 
  icon = null, 
  counter = null,
  onChangeCallback
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');
  const hasValue = value.length > 0;
  const showIcon = !(isFocused || hasValue) && icon;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleLabelClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    // Call the callback if provided
    if (onChangeCallback) {
      onChangeCallback(newValue);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        {showIcon && (
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full ${showIcon ? 'pl-10' : 'pl-4'} ${counter ? 'pr-10' : 'pr-4'} py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-Open text-sm ${hasValue ? 'font-semibold text-[#1C1C1C]' : 'font-normal text-gray-500'}`}
        />
        {counter && (
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400 text-sm">
            {counter}
          </div>
        )}
      </div>
      
      {/* Floating Label */}
      <div
        onClick={handleLabelClick}
        className={`absolute transition-all duration-200 px-1 font-Open text-xs leading-4 tracking-normal cursor-pointer ${
          isFocused || hasValue
            ? `left-3 -top-2.5 bg-white z-10 ${isFocused ? 'text-blue-600' : 'text-gray-600'}`
            : `${showIcon ? 'left-10' : 'left-4'} top-4 text-gray-500 bg-transparent`
        }`}
      >
        {placeholder}
      </div>
    </div>
  );
};

export default FloatingLabelInput;