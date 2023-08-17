import React, { useState } from "react";
// import "../../styles/customToggle.css"
// import "./customToggle.module.css";
// import ToggleSwitch from "../ToggleSwitch";

interface IPropTypes {
  // onClick : (event: React.MouseEventHandler<HTMLDivElement>) => void;
  // toggle?: boolean
  toggleValue?: any;
  initValue?: any;
}

const CustomSwitchToggle = (props: IPropTypes) => {
  const { toggleValue } = props;
  const [toggle, setToggle] = useState(props.initValue || false);
  const toggleClass = " transform translate-x-5";
  return (
    <>
      <div className="flex">
        <div
          className={
            toggle === true
              ? `w-[37px] h-[18px] flex items-center bg-[#7CCA62] rounded-full cursor-pointer`
              : `w-[37px] h-[18px] flex items-center bg-[#E8E8E8] rounded-full cursor-pointer`
          }
          //   onClick={()=>toggleValue}
          onClick={() => {
            setToggle(!toggle);
            toggleValue(!toggle);
          }}
        >
          <div
            className={
              "bg-[#fff] h-3 w-3 rounded-full shadow-md transform duration-300 ease-in-out" +
              (toggle ? toggleClass : null)
            }
          ></div>
        </div>
      </div>
    </>
  );
};

export default CustomSwitchToggle;
