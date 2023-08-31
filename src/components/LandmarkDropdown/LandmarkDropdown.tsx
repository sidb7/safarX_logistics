import React, { useEffect, useState } from "react";
import CustomInputBox from "../Input";
import "./landmarkDropdown.css";

const CustomInputWithDropDown: React.FC = () => {
  const [arrayValue, setArrayValue] = useState([]);
  const [selected, setSelected] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     const { data } = await GET("https://dummyjson.com/products");
  //     if (data) {
  //       console.log(data);

  //       setArrayValue(data.products);
  //     }
  //   })();
  // }, []);
  return (
    <div
      className="relative  "
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
    >
      <CustomInputBox
        inputType="text"
        label="Landmark"
        value={selected}
        onChange={(e) => {
          setSelected(e.target.value);
        }}
      />

      {isDropdownOpen && (
        <div className=" custom-dropdown absolute mt-2 w-full overflow-y-scroll rounded-md bg-white h-60 ">
          {arrayValue?.map((ele: any, index: number) => (
            <div
              className="cursor-pointer py-2 px-3 hover:bg-slate-100"
              key={index}
              onClick={() => setSelected(ele.title)}
            >
              <p className="text-[12px] text-[#777777] leading-4 font-Open ">
                <p>Hi</p>
                {/* {ele?.title} */}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomInputWithDropDown;
