import React, { useEffect, useState, useRef } from "react";
import CustomInputBox from "../Input";
import "../../../src/components/CategoriesDropDown/CategoriesDropDown.css";
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

const RuleEngineCustomInputWithDropDown: React.FC<
  CustomInputWithDropDownProps
> = ({ value, initValue, className, onChange = () => {} }) => {
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
    try {
      const response = await POST(GET_CATEGOROIES, {
        productName: inputValue ? inputValue : initValue,
      });

      // Check if the response is valid and contains 'data'
      if (response && response.data) {
        const { data } = response;

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
        }
      } else {
        // Handle the case where the response is undefined or does not contain data
        console.error("No valid data received from the POST request.");
        setisLoading(false);
      }
    } catch (error) {
      console.log("🚀 ~ getCategories ~ error:", error);
      setisLoading(false); // Ensure loading state is turned off in case of error
    }
  };

  const setInputValueInfo = (value: any) => {
    setInputValue(value);
    onChange(value);
  };

  useEffect(() => {
    getCategories();
  }, [inputValue, initValue]);

  // useEffect(() => {
  //   setInputValue(initValue);
  // }, [initValue]);

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
        label="Categories"
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
            {arrayValue?.map((name: any, index: number) => (
              <div
                className="cursor-pointer py-2 px-4 hover:bg-slate-100"
                key={index}
                onClick={(e: any) => {
                  setIsDropdownOpen(false);
                  setInputValueInfo(name.categoryName);
                }}
                data-cy={`dropdown-item-${index}`}
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

export default RuleEngineCustomInputWithDropDown;
