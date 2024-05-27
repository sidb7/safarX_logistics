import { capitalizeFirstLetterWithExclude } from "../../utils/utility";
import { Spinner } from "../Spinner";

interface OneButtonProps {
  text: any;
  onClick: (e: any) => void;
  className?: string;
  disabled?: boolean;
  type?: any;
  iconClass?: any;
  icon?: any;
  showIcon?: boolean;
  loading?: boolean;
  onlyIcon?: boolean;
  variant?: "primary" | "secondary" | "tertiary" | "quad" | "penta";
  size?: "small" | "medium" | "large";
  ref?: React.RefObject<HTMLButtonElement>;
  textTransform?: "uppercase" | "lowercase" | "capitalize" | "none";
}

const OneButton = (props: OneButtonProps) => {
  const {
    text,
    onClick,
    className,
    disabled,
    type = "button",
    showIcon = false,
    icon,
    iconClass,
    loading = false,
    onlyIcon = false,
    variant = "default",
    size = "medium",
    ref, // Added this line
    textTransform = "none",
  } = props;

  const excludeWords = ["B2B", "B2C", "KYC", "OTP"];

  const buttonClasses = `
    flex justify-center items-center rounded-md h-9 ${
      onlyIcon ? "w-9" : "w-full"
    }
    ${className}
    ${
      variant === "primary"
        ? "bg-[#1C1C1C] text-[#FFFFFF] hover:bg-[#606060] hover:shadow-cardShadow2a focus:bg-[#1C1C1C] focus:border focus:border-[#A4A4A4]"
        : ""
    }
    ${
      variant === "secondary"
        ? "bg-[#FFFFFF] text-[#1C1C1C] border border-[#A4A4A4] hover:bg-[#E8E8E8] hover:shadow-cardShadow2a hover:border-0 focus:bg-[#E8E8E8] focus:border focus:border-[#A4A4A4]"
        : ""
    }
    ${
      variant === "tertiary"
        ? "bg-[#FFFFFF] text-[#004EFF] underline underline-offset-4 hover:bg-[#F2F6FF] hover:shadow-cardShadow2a focus:bg-[#F2F6FF] focus:border focus:border-[#CCDCFF]"
        : ""
    }
    ${
      variant === "quad"
        ? "bg-[#FFFFFF] text-[#004EFF] hover:bg-[#F2F6FF] hover:shadow-cardShadow2a focus:bg-[#F2F6FF] focus:border focus:border-[#CCDCFF]"
        : ""
    }
    ${
      variant === "penta"
        ? "bg-[#FFFFFF] text-[#004EFF] inline-flex flex-col justify-center items-center !w-auto gap-1 !h-14 hover:bg-[#F2F6FF] hover:shadow-cardShadow2a "
        : ""
    }
    ${size === "small" ? "h-6 p-1" : ""}
    ${size === "medium" ? "h-9 p-2" : ""}
    ${size === "large" ? "h-12 p-3" : ""}
    ${
      disabled
        ? "!bg-[#E8E8E8] !text-[#BBBBBB] !border-0 cursor-not-allowed"
        : ""
    }
  `;

  const iconClasses = `
    ${iconClass}
    ${onlyIcon ? "" : "mr-2"}
  `;

  // const textClasses =
  //   "buttonClassName md:text-[14px] font-Open font-semibold leading-5 whitespace-nowrap capitalize";
  const textClasses = `buttonClassName md:text-[14px] font-Open font-semibold leading-5 whitespace-nowrap ${
    textTransform === "uppercase"
      ? "uppercase"
      : textTransform === "lowercase"
      ? "lowercase"
      : textTransform === "capitalize"
      ? "capitalize"
      : ""
  }`;
  return (
    <>
      {loading ? (
        <div
          className={`flex justify-center items-center text-white bg-black rounded-md h-9 w-full ${className}`}
        >
          <Spinner />
        </div>
      ) : (
        <div className="flex  justify-center">
          <button
            type={type}
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled}
            ref={ref} // Added this line
          >
            {showIcon && (
              <img
                className={`${iconClasses} ${
                  variant === "penta" ? "" : "mr-2"
                }`}
                src={icon}
                alt=""
              />
            )}

            <p className={textClasses}>
              {capitalizeFirstLetterWithExclude(text, excludeWords)}
            </p>
          </button>
        </div>
      )}
    </>
  );
};

export default OneButton;

// import { capitalizeFirstLetterWithExclude } from "../../utils/utility";
// import { Spinner } from "../Spinner";

// interface OneButtonProps {
//   text: any;
//   onClick: (e: any) => void;
//   className?: string;
//   disabled?: boolean;
//   type?: any;
//   iconClass?: any;
//   icon?: any;
//   showIcon?: boolean;
//   loading?: boolean;
//   onlyIcon?: boolean;
//   variant?: "primary" | "secondary" | "tertiary" | "quad" | "penta";
//   size?: "small" | "medium" | "large";
//   ref?: React.RefObject<HTMLButtonElement>;
//   textTransform?: "uppercase" | "lowercase" | "capitalize" | "none";
// }

// const OneButton = (props: OneButtonProps) => {
//   const {
//     text,
//     onClick,
//     className,
//     disabled,
//     type = "button",
//     showIcon = false,
//     icon,
//     iconClass,
//     loading = false,
//     onlyIcon = false,
//     variant = "default",
//     size = "medium",
//     ref,
//     textTransform = "none",
//   } = props;

//   const excludeWords = ["B2B", "B2C", "KYC", "OTP"];
//   const buttonClasses = ` flex justify-center items-center rounded-md h-9 ${
//     onlyIcon ? "w-9" : "w-full"
//   } ${className} ${
//     variant === "primary"
//       ? "bg-[#1C1C1C] text-[#FFFFFF] hover:bg-[#606060] hover:shadow-cardShadow2a focus:bg-[#1C1C1C] focus:border focus:border-[#A4A4A4]"
//       : ""
//   } ${
//     variant === "secondary"
//       ? "bg-[#FFFFFF] text-[#1C1C1C] border border-[#A4A4A4] hover:bg-[#E8E8E8] hover:shadow-cardShadow2a hover:border-0 focus:bg-[#E8E8E8] focus:border focus:border-[#A4A4A4]"
//       : ""
//   } ${
//     variant === "tertiary"
//       ? "bg-[#FFFFFF] text-[#004EFF] underline underline-offset-4 hover:bg-[#F2F6FF] hover:shadow-cardShadow2a focus:bg-[#F2F6FF] focus:border focus:border-[#CCDCFF]"
//       : ""
//   } ${
//     variant === "quad"
//       ? "bg-[#FFFFFF] text-[#004EFF] hover:bg-[#F2F6FF] hover:shadow-cardShadow2a focus:bg-[#F2F6FF] focus:border focus:border-[#CCDCFF]"
//       : ""
//   } ${
//     variant === "penta"
//       ? "bg-[#FFFFFF] text-[#004EFF] inline-flex flex-col justify-center items-center !w-auto gap-1 !h-14 hover:bg-[#F2F6FF] hover:shadow-cardShadow2a "
//       : ""
//   } ${size === "small" ? "h-6 p-1" : ""} ${
//     size === "medium" ? "h-9 p-2" : ""
//   } ${size === "large" ? "h-12 p-3" : ""} ${
//     disabled ? "!bg-[#E8E8E8] !text-[#BBBBBB] !border-0 cursor-not-allowed" : ""
//   } `;

//   const iconClasses = ` ${iconClass} ${onlyIcon ? "" : "mr-2"} `;

//   const textClasses = `buttonClassName md:text-[14px] font-Open font-semibold leading-5 whitespace-nowrap ${
//     textTransform === "uppercase"
//       ? "uppercase"
//       : textTransform === "lowercase"
//       ? "lowercase"
//       : textTransform === "capitalize"
//       ? "capitalize"
//       : ""
//   }`;

//   return (
//     <div className="flex justify-center">
//       <button
//         type={type}
//         className={buttonClasses}
//         onClick={onClick}
//         disabled={disabled}
//         ref={ref}
//       >
//         {showIcon && (
//           <div
//             className={`flex items-center ${variant === "penta" ? "" : "mr-2"}`}
//           >
// {loading ? (
//   <div className="flex justify-center items-center">
//     <Spinner className={"!w-[13px] !h-[13px] !border-2"} />
//   </div>
// ) : (
//   <img
//     className={`${iconClasses} ${
//       variant === "penta" ? "" : "mr-2"
//     }`}
//     src={icon}
//     alt=""
//   />
// )}
//           </div>
//         )}
//         <p className={textClasses}>
//           {capitalizeFirstLetterWithExclude(text, excludeWords)}
//         </p>
//       </button>
//     </div>
//   );
// };

// export default OneButton;
