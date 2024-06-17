import React, { forwardRef } from "react";
import { capitalizeFirstLetterWithExclude } from "../../utils/utility";
import { Spinner } from "../Spinner";
import dateIcon from "../../assets/dateIcon.svg";
import cross from "../../assets/cross.svg";

interface DateButtonProps {
  text: any;
  onClick: (e: any) => void;
  className?: string;
  disabled?: boolean;
  type?: any;
  iconClass?: string;
  loading?: boolean;
  onlyIcon?: boolean;
  textClassName?: string;
  value?: string; // Add value prop
  onClear?: () => void; // Add onClear prop
}

const DateButton = forwardRef<HTMLButtonElement, DateButtonProps>(
  (props, ref) => {
    const {
      text,
      onClick,
      className,
      disabled,
      type = "button",
      iconClass,
      loading = false,
      onlyIcon = false,
      textClassName,
      value, // Add value prop
      onClear, // Add onClear prop
    } = props;

    const excludeWords = ["B2B", "B2C", "KYC", "OTP"];

    return (
      <>
        {loading ? (
          <div
            className={`flex justify-center items-center text-white bg-black rounded-md h-9 w-full  ${className}`}
          >
            <Spinner />
          </div>
        ) : (
          <div className="relative">
            <button
              type={type}
              className={`flex items-center gap-2 px-4 py-2 h-12 rounded-md border border-gray-400 min-w-[226px] ${className}`}
              onClick={onClick}
              disabled={disabled}
              ref={ref} // Forward the ref
            >
              {!value && ( // Show dateIcon only if no value
                <img
                  className={`${iconClass} ${onlyIcon ? "" : "mr-2"}`}
                  src={dateIcon}
                  alt="Icon"
                />
              )}
              <p
                className={`${textClassName} text-center text-primary-100 font-openSans text-[12px] font-normal leading-5`}
              >
                {value || capitalizeFirstLetterWithExclude(text, excludeWords)}
              </p>
              {value &&
                onClear && ( // Show crossIcon only if value exists
                  <img
                    src={cross}
                    alt="Clear"
                    className=" relative  cursor-pointer ml-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      onClear();
                    }}
                  />
                )}
            </button>
          </div>
        )}
      </>
    );
  }
);

export default DateButton;

// import React, { forwardRef } from "react";
// import { capitalizeFirstLetterWithExclude } from "../../utils/utility";
// import { Spinner } from "../Spinner";
// import dateIcon from "../../assets/dateIcon.svg";
// import cross from "../../assets/cross.svg"

// interface DateButtonProps {
//   text: any;
//   onClick: (e: any) => void;
//   className?: string;
//   disabled?: boolean;
//   type?: any;
//   iconClass?: string;
//   loading?: boolean;
//   onlyIcon?: boolean;
//   textClassName?: string;
//   value?: string; // Add value prop
// }

// const DateButton = forwardRef<HTMLButtonElement, DateButtonProps>(
//   (props, ref) => {
//     const {
//       text,
//       onClick,
//       className,
//       disabled,
//       type = "button",
//       iconClass,
//       loading = false,
//       onlyIcon = false,
//       textClassName,
//       value, // Add value prop
//     } = props;

//     const excludeWords = ["B2B", "B2C", "KYC", "OTP"];

//     return (
//       <>
//         {loading ? (
//           <div
//             className={`flex justify-center items-center text-white bg-black rounded-md h-9 w-full ${className}`}
//           >
//             <Spinner />
//           </div>
//         ) : (
//           <button
//             type={type}
//             className={`flex items-center gap-2 px-4 py-2 h-12 rounded-md border border-[#A4A4A4] ${className}`}
//             onClick={onClick}
//             disabled={disabled}
//             ref={ref} // Forward the ref
//           >
//             <img
//               className={`${iconClass} ${onlyIcon ? "" : "mr-2"}`}
//               src={dateIcon}
//               alt="Icon"
//             />
//             <p
//               className={`${textClassName} text-center text-primary-100 font-openSans text-[14px]  leading-5 `}
//             >
//               {value || capitalizeFirstLetterWithExclude(text, excludeWords)}{" "}
//               {/* Use value if provided, otherwise use text */}
//             </p>
//           </button>
//         )}
//       </>
//     );
//   }
// );

// export default DateButton;
