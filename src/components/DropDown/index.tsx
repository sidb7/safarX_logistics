import "./dropDown.css";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { updateDropdownValue } from "../../redux/reducers/paginationReducer";
import InfoCircle from "../../assets/info-circle.svg";

interface IDropDownProps {
  options?: any;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: any;
  wrapperClass?: string;
  selectClassName?: string;
  placeHolder?: string;
  name?: string;
  heading?: string;
  inputError?: boolean;
  disabled?: boolean;
}

const CustomDropDown = (props: IDropDownProps) => {
  const {
    options,
    onChange,
    value,
    wrapperClass,
    selectClassName,
    placeHolder,
    name,
    heading,
    inputError,
    disabled,
  } = props;
  const dispatch = useDispatch();

  const dropdownRef: any = useRef(null);

  const addClass = () => {
    dropdownRef.current.children[1].classList.add("setLabel");
  };

  let label =
    placeHolder?.replace(/\b\w/g, (match) => match.toUpperCase()) || "";

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    dispatch(updateDropdownValue(newValue)); // Dispatch action to update Redux state
  };

  const handleCombinedChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    handleChange(event);
    onChange && onChange(event); // Call the external onChange handler if provided
  };

  return (
    <>
      <div
        className={`${wrapperClass} select-container`}
        ref={dropdownRef}
        onClick={addClass}
      >
        <select
          id="selectDropdown"
          onChange={handleCombinedChange}
          value={value}
          // className={` ${selectClassName} select-dropdown appearance-none pr-8 pl-2 form-select bg-no-repeat h-[48px] px-2 rounded block w-full bg-transparent border-[1px] border-[#A4A4A4] text-[12px] text-[#777777] outline-none cursor-pointer`}
          placeholder={placeHolder}
          name={name}
          disabled={disabled}
          className={`${selectClassName} select-dropdown rounded  ${
            inputError && !value
              ? "!border-red-500"
              : "border-[1px] border-[#A4A4A4]"
          } p-[10px] gap-[10px] h-[48px] font-Open text-[12px] text-[#1C1C1C] outline-none`}
        >
          {heading && (
            <option
              value={""}
              className="text-[12px] text-[#777777] absolute leading-4 font-Open"
            >
              {heading}
            </option>
          )}
          {options?.map((option: any, index: number) => (
            <option
              key={index}
              value={option.value}
              className="text-[12px] text-[#1C1C1C] absolute leading-4 font-Open"
            >
              {option.label}
            </option>
          ))}
        </select>
        <label
          htmlFor="selectDropdown"
          className={` text-[12px] text-[#777777] font-normal font-sans absolute transition-all ease-out ${
            value && "valueFilled"
          } `}
        >
          {label}
        </label>
      </div>
      {/* {inputError && !value && (
        <span
          className={`text-[red] transition-all ease-out h-0  h-[18px]  delay-100 font-Open text-[11px] mt-1 px-2 `}
        >
          Field is required
        </span>
      )} */}
      {inputError && !value && (
        <div className="flex items-center gap-x-1 mt-1">
          <img src={InfoCircle} alt="" width={16} height={16} />
          <span className="font-normal text-[#F35838] text-xs leading-3 transition-all ease-out delay-100">
            Field is required
          </span>
        </div>
      )}
    </>
  );
};

export default CustomDropDown;

// import { useRef } from "react";
// import { useDispatch } from "react-redux";
// import { updateDropdownValue } from "../../redux/reducers/paginationReducer";
// import InfoCircle from "../../assets/info-circle.svg";

// interface IDropDownProps {
//   options?: any;
//   onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
//   value?: any;
//   wrapperClass?: string;
//   selectClassName?: string;
//   placeHolder?: string;
//   name?: string;
//   heading?: string;
//   inputError?: boolean;
//   disabled?: boolean;
// }

// const CustomDropDown = (props: IDropDownProps) => {
//   const {
//     options,
//     onChange,
//     value,
//     wrapperClass,
//     selectClassName,
//     placeHolder,
//     name,
//     heading,
//     inputError,
//     disabled,
//   } = props;
//   const dispatch = useDispatch();

//   const dropdownRef: any = useRef(null);

//   const addClass = () => {
//     dropdownRef.current.children[1].classList.add("setLabel");
//   };

//   let label =
//     placeHolder?.replace(/\b\w/g, (match) => match.toUpperCase()) || "";

//   const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const newValue = event.target.value;
//     dispatch(updateDropdownValue(newValue)); // Dispatch action to update Redux state
//   };

//   const handleCombinedChange = (
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     handleChange(event);
//     onChange && onChange(event); // Call the external onChange handler if provided
//   };

//   return (
//     <>
//       <div
//         className={`${wrapperClass} relative`}
//         ref={dropdownRef}
//         onClick={addClass}
//       >
//         <select
//           id="selectDropdown"
//           onChange={handleCombinedChange}
//           value={value}
//           placeholder={placeHolder}
//           name={name}
//           disabled={disabled}
//           className={`${selectClassName} rounded border ${
//             inputError && !value ? "border-red-500" : "border-gray-400"
//           } p-2 h-12 text-sm text-gray-700 outline-none w-full appearance-none bg-white bg-no-repeat pr-8 font-sans`}
//           style={{
//             backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>')`,
//             backgroundPosition: "calc(100% - 0.5rem) center",
//           }}
//         >
//           {heading && (
//             <option value={""} className="text-base text-gray-500">
//               {heading}
//             </option>
//           )}
//           {options?.map((option: any, index: number) => (
//             <option
//               key={index}
//               value={option.value}
//               className="text-sm text-gray-700"
//             >
//               {option.label}
//             </option>
//           ))}
//         </select>
//         <label
//           htmlFor="selectDropdown"
//           className={`absolute text-sm text-gray-500 transition-all ${
//             value && "transform -translate-y-5 scale-90"
//           }`}
//         >
//           {label}
//         </label>
//       </div>
//       {inputError && !value && (
//         <div className="flex items-center gap-x-1 mt-1">
//           <img src={InfoCircle} alt="" width={16} height={16} />
//           <span className="font-normal text-red-500 text-xs leading-3 transition-all ease-out delay-100">
//             Field is required
//           </span>
//         </div>
//       )}
//     </>
//   );
// };

// export default CustomDropDown;
