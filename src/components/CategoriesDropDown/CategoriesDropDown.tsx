import React, { useEffect, useState, useRef } from "react";
import CustomInputBox from "../Input";
import "./CategoriesDropDown.css";
import { POST } from "../../utils/webService";
import { GET_CATEGOROIES } from "../../utils/ApiUrls";
import { Spinner } from "../Spinner";
import ProgressBar from "../ProgressBar/ProgressBar";

interface CustomInputWithDropDownProps {
  value?: any;
  initValue?: any;
  className?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInputWithDropDown: React.FC<CustomInputWithDropDownProps> = ({
  value,
  initValue,
  className,
  onChange = () => {},
}) => {
  const [arrayValue, setArrayValue] = useState<any>([]);
  const [inputValue, setInputValue] = useState<any>(value);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const closeDropdown = () => {
      setIsDropdownOpen(false);
    };
    window.addEventListener("click", closeDropdown);
    return () => {
      window.removeEventListener("click", closeDropdown);
    };
  }, []);

  const getCategories = async () => {
    setisLoading(true);
    const { data } = await POST(GET_CATEGOROIES, {
      productName: inputValue ? inputValue : initValue,
    });
    if (data?.success) {
      let obj = data?.data[0];
      obj?.forEach((category: any) => {
        category.categoryName = category?.categoryName?.replace(
          /\w+/g,
          function (w: any) {
            return w[0].toUpperCase() + w.slice(1).toLowerCase();
          }
        );
      });
      setArrayValue([...obj, { categoryName: "Others" }]);
      setTimeout(() => {
        setisLoading(false);
      }, 1000);
    } else {
      setisLoading(false);
      console.log("No Categories Found");
    }
  };

  const setInputValueInfo = (value: any) => {
    setInputValue(value);
    onChange(value);
  };

  useEffect(() => {
    getCategories();
  }, [inputValue, initValue]);

  return (
    <div
      className="relative w-full"
      onClick={(e) => {
        e.stopPropagation();
        setIsDropdownOpen(!isDropdownOpen);
      }}
    >
      <CustomInputBox
        inputType="select"
        label="Categories"
        value={inputValue}
        name="category"
        onChange={(e) => {
          if (!isDropdownOpen) setIsDropdownOpen(true);
          setInputValueInfo(e.target.value);
        }}
        className={`${className} w-full downarrowImage`}
      />

      {isDropdownOpen && (
        <>
          <div
            ref={dropdownRef}
            className="custom-dropdown absolute mt-2 w-full overflow-y-scroll rounded-md bg-white max-h-60 min-h-[30px]"
            onClick={(e) => e.stopPropagation()}
          >
            {isLoading && (
              <div className="">
                <ProgressBar />
              </div>
            )}
            {arrayValue?.map((name: any, index: number) => (
              <div
                className="cursor-pointer py-2 px-4 hover:bg-slate-100"
                key={index}
                onClick={(e: any) => {
                  setIsDropdownOpen(false);
                  setInputValueInfo(name.categoryName);
                }}
              >
                <p className="text-[12px] text-[#777777] leading-4 font-Open">
                  {name?.categoryName}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CustomInputWithDropDown;
