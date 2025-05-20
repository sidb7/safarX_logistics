

// import { useState, ReactNode, useRef, FC, useEffect } from "react";

// interface FloatingLabelInputProps {
//   placeholder: string;
//   type?: string;
//   icon?: ReactNode;
//   counter?: string;
//   value?: string;
//   onChangeCallback?: (value: string) => void;
//   onFocus?: () => void;
//   onBlur?: () => void;
//   error?: boolean;
//   errorMessage?: string;
//   showNumberControls?: boolean;
//   isPhoneField?: boolean;
//   isPincodeField?: boolean;
//   readOnly?: boolean;
//   maxLength?: number;
// }

// const FloatingLabelInput: FC<FloatingLabelInputProps> = ({
//   placeholder,
//   type = "text",
//   icon = null,
//   counter = null,
//   value = "",
//   onChangeCallback,
//   onFocus,
//   onBlur,
//   error = false,
//   errorMessage = "This field is required",
//   showNumberControls = false,
//   isPhoneField = false,
//   isPincodeField = false,
//   readOnly = false,
//   maxLength,
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

//   // Disable wheel scrolling on number inputs globally
//   useEffect(() => {
//     // Only add the event listener if this is a number input
//     if (type === "number" && inputRef.current) {
//       const handleWheelingGlobally = (e: WheelEvent) => {
//         // Check if the event target is our input element
//         if (document.activeElement === inputRef.current) {
//           e.preventDefault();
//         }
//       };

//       // Use passive: false to allow preventDefault()
//       window.addEventListener("wheel", handleWheelingGlobally, { passive: false });
      
//       // Clean up
//       return () => {
//         window.removeEventListener("wheel", handleWheelingGlobally);
//       };
//     }
//   }, [type]);

//   const handleLabelClick = () => {
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     let newValue = e.target.value;
    
//     // Handle different field types
//     if (isPhoneField) {
//       // Only allow digits
//       newValue = newValue.replace(/\D/g, "");
//       // Limit to 10 digits
//       newValue = newValue.slice(0, 10);
//     } else if (isPincodeField) {
//       // Only allow digits
//       newValue = newValue.replace(/\D/g, "");
//       // Limit to 6 digits
//       newValue = newValue.slice(0, 6);
//       // Ensure it doesn't start with zero
//       if (newValue.length > 0 && newValue[0] === "0") {
//         newValue = newValue.substring(1);
//       }
//     } else if (type === "number") {
//       // For number fields, prevent negative values
//       if (newValue.startsWith("-")) {
//         newValue = newValue.substring(1);
//       }
//     }
    
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

//   // Number control handlers
//   const incrementValue = () => {
//     if (type === "number") {
//       const currentValue = parseFloat(internalValue) || 0;
//       const newValue = (currentValue + 1).toString();
//       setInternalValue(newValue);

//       if (onChangeCallback) {
//         onChangeCallback(newValue);
//       }
//     }
//   };

//   const decrementValue = () => {
//     if (type === "number") {
//       const currentValue = parseFloat(internalValue) || 0;
//       const newValue = Math.max(0, currentValue - 1).toString(); // Prevent negative values
//       setInternalValue(newValue);

//       if (onChangeCallback) {
//         onChangeCallback(newValue);
//       }
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
//           readOnly={readOnly}
//           min="0" // Prevent negative values
//           maxLength={maxLength}
//           className={`w-full ${showIcon ? "pl-10" : "pl-4"} ${
//             counter
//               ? "pr-10"
//               : showNumberControls && type === "number"
//               ? "pr-8"
//               : "pr-4"
//           } py-4 border ${
//             error ? "border-red-500" : "border-gray-300"
//           } !rounded-2xl focus:outline-none focus:ring-2 ${
//             error ? "focus:ring-red-500" : "focus:ring-blue-500"
//           } font-Open text-sm ${
//             hasValue
//               ? "font-semibold text-[#1C1C1C]"
//               : "font-normal text-gray-500"
//           } ${readOnly ? "bg-gray-50 cursor-not-allowed" : ""}`}
//         />

//         {/* Integrated Number Controls - inside the input */}
//         {showNumberControls && type === "number" && (
//           <div className="absolute inset-y-0 right-3 flex flex-col justify-center">
//             <button
//               type="button"
//               onClick={incrementValue}
//               className="h-1/2 flex items-center justify-center text-gray-500 hover:text-gray-700 focus:outline-none"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="14"
//                 height="14"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M18 15l-6-6-6 6" />
//               </svg>
//             </button>
//             <button
//               type="button"
//               onClick={decrementValue}
//               className="h-1/2 flex items-center justify-center text-gray-500 hover:text-gray-700 focus:outline-none"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="14"
//                 height="14"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M6 9l6 6 6-6" />
//               </svg>
//             </button>
//           </div>
//         )}

//         {counter && !error && (
//           <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400 text-sm">
//             {counter}
//           </div>
//         )}
//         {error && (
//           <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-red-500">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </div>
//         )}
//       </div>

//       {/* Floating Label */}
//       <div
//         onClick={handleLabelClick}
//         className={`absolute transition-all duration-200 px-1 font-Open text-xs leading-4 tracking-normal cursor-pointer ${
//           isFocused || hasValue
//             ? `left-3 top-0 translate-y-[-50%] bg-white z-10 ${
//                 error
//                   ? "text-red-500"
//                   : isFocused
//                   ? "text-blue-600"
//                   : "text-gray-600"
//               }`
//             : `${showIcon ? "left-10" : "left-4"} top-4 ${
//                 error ? "text-red-500" : "text-gray-500"
//               } bg-transparent`
//         }`}
//       >
//         {placeholder}
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="text-red-500 text-xs mt-1 ml-1 font-medium">
//           {errorMessage}
//         </div>
//       )}
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
  showNumberControls?: boolean;
  isPhoneField?: boolean;
  isPincodeField?: boolean;
  readOnly?: boolean;
  maxLength?: number;
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
  errorMessage = "This field is required",
  showNumberControls = false,
  isPhoneField = false,
  isPincodeField = false,
  readOnly = false,
  maxLength,
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

  // Use a robust approach to prevent number changes while allowing scrolling
  // This has been replaced with the text input + validation approach

  useEffect(() => {
    // Create stylesheet to hide number input spinners
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      input[type="number"]::-webkit-inner-spin-button,
      input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      input[type="number"] {
        -moz-appearance: textfield;
      }
    `;
    document.head.appendChild(styleEl);
    
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  const handleLabelClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    
    // Handle different field types
    if (isPhoneField) {
      // Only allow digits
      newValue = newValue.replace(/\D/g, "");
      // Limit to 10 digits
      newValue = newValue.slice(0, 10);
    } else if (isPincodeField) {
      // Only allow digits
      newValue = newValue.replace(/\D/g, "");
      // Limit to 6 digits
      newValue = newValue.slice(0, 6);
      // Ensure it doesn't start with zero
      if (newValue.length > 0 && newValue[0] === "0") {
        newValue = newValue.substring(1);
      }
    } else if (type === "number") {
      // For number fields, only allow digits and decimal point
      newValue = newValue.replace(/[^\d.]/g, "");
      
      // Ensure only one decimal point
      const decimalPoints = newValue.match(/\./g);
      if (decimalPoints && decimalPoints.length > 1) {
        newValue = newValue.replace(/\./, "x").replace(/\./g, "").replace(/x/, ".");
      }
      
      // Prevent negative values
      if (newValue.startsWith("-")) {
        newValue = newValue.substring(1);
      }
    }
    
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

  // Number control handlers
  const incrementValue = () => {
    if (type === "number") {
      const currentValue = parseFloat(internalValue) || 0;
      const newValue = (currentValue + 1).toString();
      setInternalValue(newValue);

      if (onChangeCallback) {
        onChangeCallback(newValue);
      }
    }
  };

  const decrementValue = () => {
    if (type === "number") {
      const currentValue = parseFloat(internalValue) || 0;
      const newValue = Math.max(0, currentValue - 1).toString(); // Prevent negative values
      setInternalValue(newValue);

      if (onChangeCallback) {
        onChangeCallback(newValue);
      }
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
          type={type === "number" ? "text" : type}
          pattern={type === "number" ? "[0-9]*" : undefined}
          inputMode={type === "number" ? "numeric" : undefined}
          value={internalValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          readOnly={readOnly}
          min="0" // Prevent negative values
          maxLength={maxLength}
          step="any" // Disables mousewheel increment/decrement
          className={`w-full ${showIcon ? "pl-10" : "pl-4"} ${
            counter
              ? "pr-10"
              : showNumberControls && type === "number"
              ? "pr-8"
              : "pr-4"
          } py-4 border ${
            error ? "border-red-500" : "border-gray-300"
          } !rounded-2xl focus:outline-none focus:ring-2 ${
            error ? "focus:ring-red-500" : "focus:ring-blue-500"
          } font-Open text-sm ${
            hasValue
              ? "font-semibold text-[#1C1C1C]"
              : "font-normal text-gray-500"
          } ${readOnly ? "bg-gray-50 cursor-not-allowed" : ""}`}
        />

        {/* Integrated Number Controls - inside the input */}
        {showNumberControls && type === "number" && (
          <div className="absolute inset-y-0 right-3 flex flex-col justify-center">
            <button
              type="button"
              onClick={incrementValue}
              className="h-1/2 flex items-center justify-center text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 15l-6-6-6 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={decrementValue}
              className="h-1/2 flex items-center justify-center text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>
        )}

        {counter && !error && (
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400 text-sm">
            {counter}
          </div>
        )}
        {error && (
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
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
                error
                  ? "text-red-500"
                  : isFocused
                  ? "text-blue-600"
                  : "text-gray-600"
              }`
            : `${showIcon ? "left-10" : "left-4"} top-4 ${
                error ? "text-red-500" : "text-gray-500"
              } bg-transparent`
        }`}
      >
        {placeholder}
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-500 text-xs mt-1 ml-1 font-medium">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default FloatingLabelInput;
