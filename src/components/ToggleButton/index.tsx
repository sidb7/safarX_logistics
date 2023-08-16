import React, { useState } from "react";

interface ToggleButtonPropTypes {
  imgSrc: string;
  toggleValue?: any;
  initValue?: any;
}

export const ToggleButton = (props: ToggleButtonPropTypes) => {
  const { toggleValue, imgSrc } = props;
  const [toggle, setToggle] = useState(props.initValue || false);
  const toggleClass = " transform translate-x-5";
  return (
    <>
      <div
        className={`flex items-center gap-x-3 border-[1px] border-green rounded-[4px] py-1 px-4 ${
          toggle == true ? "bg-[#7CCA62] text-white" : "bg-[#E8E8E8] text-black"
        }  `}
        onClick={() => {
          setToggle(!toggle);
          // toggleValue(!toggle);
        }}
      >
        <div
          className={
            toggle === true
              ? `w-[37px] h-[15px] flex items-center bg-[white] rounded-full cursor-pointer`
              : `w-[37px] h-[15px] flex items-center bg-[white] rounded-full cursor-pointer`
          }
          //   onClick={()=>toggleValue}
        >
          <div
            className={
              "bg-[#7CCA62] h-2 w-2 rounded-full shadow-md transform duration-300 ease-in-out" +
              (toggle ? toggleClass : null)
            }
          ></div>
        </div>
        <p>{toggle === true ? "ACTIVE" : "DEACTIVE"}</p>
      </div>
    </>
  );
};

export default ToggleButton;
