import React, { useEffect, useState, useRef } from "react";
import CustomInputBox from "../../../components/Input";
import "../../../../src/components/CategoriesDropDown/CategoriesDropDown.css";

import { GET_CATEGOROIES } from "../../../utils/ApiUrls";
// import { Spinner } from "../Spinner";
import { POST } from "../../../utils/webService";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";

interface CustomInputWithDropDownProps {
  value?: any;
  initValue?: any;
  className?: any;
  apiUrl?: any;
  label?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomSearchDropDown: React.FC<CustomInputWithDropDownProps> = ({
  value,
  initValue,
  className,
  apiUrl,
  label,
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
    const { data } = await POST(apiUrl, {
      searchValue: inputValue ? inputValue : initValue,
    });
    if (data?.success) {
      let options = data?.data;
      options?.forEach((item: any) => {
        item.name = item?.name?.replace(/\w+/g, function (w: any) {
          return w[0].toUpperCase() + w.slice(1).toLowerCase();
        });
      });
      setArrayValue([...options, { name: "Others" }]);
      setTimeout(() => {
        setisLoading(false);
      }, 1000);
    } else {
      setisLoading(false);
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
      data-cy="dropdown-container"
    >
      <CustomInputBox
        inputType="select"
        label={label}
        autoComplete={"off"}
        value={inputValue}
        name="category"
        onChange={(e) => {
          if (!isDropdownOpen) setIsDropdownOpen(true);
          setInputValueInfo(e.target.value);
        }}
        className={`${className} w-full downarrowImage`}
        data-cy="custom-input"
      />

      {isDropdownOpen && (
        <>
          <div
            ref={dropdownRef}
            className="custom-dropdown absolute mt-2 w-full customScroll rounded-md bg-white max-h-60 min-h-[30px]"
            onClick={(e) => e.stopPropagation()}
            data-cy="dropdown-menu"
          >
            {isLoading && (
              <div className="" data-cy="loading-indicator">
                <ProgressBar />
              </div>
            )}
            {arrayValue?.map((item: any, index: number) => (
              <div
                className="cursor-pointer py-2 px-4 hover:bg-slate-100"
                key={index}
                onClick={(e: any) => {
                  setIsDropdownOpen(false);
                  setInputValueInfo(item.name);
                }}
                data-cy={`dropdown-item-${index}`}
              >
                <p className="text-[12px] text-[#777777] leading-4 font-Open">
                  {item?.name}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CustomSearchDropDown;
