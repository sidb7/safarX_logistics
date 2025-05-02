// import { useState, ReactNode, useRef, FC, useEffect } from "react";

// interface FloatingLabelInputProps {
//   placeholder: string;
//   type?: string;
//   icon?: ReactNode;
//   counter?: string;
//   value?: string;
//   onChangeCallback?: (value: string) => void;
//   onFocus?: () => void; // Added onFocus prop
//   onBlur?: () => void; // Added onBlur prop
// }

// const FloatingLabelInput: FC<FloatingLabelInputProps> = ({
//   placeholder,
//   type = "text",
//   icon = null,
//   counter = null,
//   value = "",
//   onChangeCallback,
//   onFocus, // Added onFocus prop
//   onBlur, // Added onBlur prop
// }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [internalValue, setInternalValue] = useState(value);
//   const hasValue = internalValue.length > 0;
//   const showIcon = !(isFocused || hasValue) && icon;
//   const inputRef = useRef<HTMLInputElement>(null);

//   // Update internal state when external value changes
//   useEffect(() => {
//     setInternalValue(value);
//   }, [value]);

//   const handleLabelClick = () => {
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newValue = e.target.value;
//     setInternalValue(newValue);

//     // Call the callback if provided
//     if (onChangeCallback) {
//       onChangeCallback(newValue);
//     }
//   };

//   const handleFocus = () => {
//     setIsFocused(true);
//     // Call the custom onFocus handler if provided
//     if (onFocus) {
//       onFocus();
//     }
//   };

//   const handleBlur = () => {
//     setIsFocused(false);
//     // Call the custom onBlur handler if provided
//     if (onBlur) {
//       onBlur();
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
//           value={internalValue}
//           onChange={handleChange}
//           onFocus={handleFocus}
//           onBlur={handleBlur}
//           className={`w-full ${showIcon ? "pl-10" : "pl-4"} ${
//             counter ? "pr-10" : "pr-4"
//           } py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-Open text-sm ${
//             hasValue
//               ? "font-semibold text-[#1C1C1C]"
//               : "font-normal text-gray-500"
//           }`}
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
//             ? `left-3 top-0 translate-y-[-50%] bg-white z-10 ${
//                 isFocused ? "text-blue-600" : "text-gray-600"
//               }`
//             : `${
//                 showIcon ? "left-10" : "left-4"
//               } top-4 text-gray-500 bg-transparent`
//         }`}
//       >
//         {placeholder}
//       </div>
//     </div>
//   );
// };

// export default FloatingLabelInput;
import { useState, ReactNode, useRef, FC, useEffect } from "react";

interface FloatingLabelInputProps {
  placeholder: string;
  type?: string;
  icon?: ReactNode;
  counter?: string;
  value?: string;
  onChangeCallback?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  error?: boolean;  
  errorMessage?: string;
}

const FloatingLabelInput: FC<FloatingLabelInputProps> = ({
  placeholder,
  type = "text",
  icon = null,
  counter = null,
  value = "",
  onChangeCallback,
  onFocus,
  onBlur,
  error = false,
  errorMessage = "This field is required" 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(value);
  const hasValue = internalValue.length > 0;
  const showIcon = !(isFocused || hasValue) && icon;
  const inputRef = useRef<HTMLInputElement>(null);

  // Update internal state when external value changes
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleLabelClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);

    // Call the callback if provided
    if (onChangeCallback) {
      onChangeCallback(newValue);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    // Call the custom onFocus handler if provided
    if (onFocus) {
      onFocus();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Call the custom onBlur handler if provided
    if (onBlur) {
      onBlur();
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
          value={internalValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`w-full ${showIcon ? "pl-10" : "pl-4"} ${
            counter ? "pr-10" : "pr-4"
          } py-4 border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 ${
            error ? "focus:ring-red-500" : "focus:ring-blue-500"
          } font-Open text-sm ${
            hasValue
              ? "font-semibold text-[#1C1C1C]"
              : "font-normal text-gray-500"
          }`}
        />
        {counter && !error && (
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400 text-sm">
            {counter}
          </div>
        )}
        {error && (
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>

      {/* Floating Label */}
      <div
        onClick={handleLabelClick}
        className={`absolute transition-all duration-200 px-1 font-Open text-xs leading-4 tracking-normal cursor-pointer ${
          isFocused || hasValue
            ? `left-3 top-0 translate-y-[-50%] bg-white z-10 ${
                error ? "text-red-500" : isFocused ? "text-blue-600" : "text-gray-600"
              }`
            : `${
                showIcon ? "left-10" : "left-4"
              } top-4 ${error ? "text-red-500" : "text-gray-500"} bg-transparent`
        }`}
      >
        {placeholder}
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="text-red-500 text-xs mt-1 ml-1 font-medium">{errorMessage}</div>
      )}
    </div>
  );
};

export default FloatingLabelInput;