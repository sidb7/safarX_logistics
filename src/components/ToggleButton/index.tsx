import { useEffect, useState } from "react";

interface IPropTypes {
  toggleValue?: any;
  initValue?: any;
}

const ToggleButton = (props: IPropTypes) => {
  const { toggleValue } = props;
  const [toggle, setToggle] = useState(false);
  const toggleClass = " transform translate-x-5";

  useEffect(() => {
    setToggle(props.initValue);
  }, [props.initValue]);

  return (
    <>
      <div className="flex">
        <div
          className={
            toggle === true
              ? `w-[37px] h-[18px] flex items-center bg-[#7CCA62] rounded-full cursor-pointer`
              : `w-[37px] h-[18px] flex items-center bg-[#E8E8E8] rounded-full cursor-pointer`
          }
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

export default ToggleButton;
