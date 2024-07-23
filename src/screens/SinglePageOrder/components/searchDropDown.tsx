// import React from 'react'

// function SearchDropDown() {
//   return (
//     <div>

//     </div>
//   )
// }

// export default SearchDropDown

import React, { useEffect, useState, useRef } from "react";
import CustomInputBox from "../../../components/Input";
import "../../../../src/components/CategoriesDropDown/CategoriesDropDown.css";

import { GET_CATEGOROIES } from "../../../utils/ApiUrls";
// import { Spinner } from "../Spinner";
import { POST } from "../../../utils/webService";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import { capitalizeFirstLetter } from "../../../utils/utility";
import index from "../../NewOrder/Filter";
import { he } from "date-fns/locale";
import PinCode from "../../Order/ruleEngine/pinCode";

interface CustomInputWithDropDownProps {
  className?: any;
  apiUrl?: any;
  label?: any;
  setFunc?: any;
  identifier: any;
  // value?: any;
  // initValue?: any;
  // state?: any;
  //   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchDropDown: React.FC<CustomInputWithDropDownProps> = ({
  className,
  apiUrl,
  label,
  setFunc,
  identifier,
}) => {
  const [arrayValue, setArrayValue] = useState<any>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<any>("");
  const dropdownRef = useRef(null);
  let debounceTimer: any;

  const onSearchHandler = (e: any = "") => {
    setSearchInput(e);

    try {
      const payload: any = {
        searchValue: e || "",
      };

      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(async () => {
        setisLoading(true);
        const { data } = await POST(apiUrl, payload);

        if (data?.success) {
          setisLoading(false);
          setArrayValue(data?.data);
        } else {
          setisLoading(false);

          throw new Error(data?.meesage);
        }
      }, 800);
    } catch (error: any) {
      console.warn("Error in OrderStatus Debouncing: ", error.message);
    }
  };

  useEffect(() => {
    onSearchHandler();
  }, []);

  useEffect(() => {
    const closeDropdown = () => {
      setIsDropdownOpen(false);
    };
    window.addEventListener("click", closeDropdown);
    return () => {
      window.removeEventListener("click", closeDropdown);
    };
  }, []);

  const setSelectedDataToMainState = (value: any) => {
    setSearchInput(value?.name);

    switch (identifier) {
      case "ADDRESS": {
        setFunc(
          {
            contact: {
              name: value?.contact?.name,
              mobileNo: value?.contact?.mobileNo,
            },
            pincode: value?.pincode,
            fullAddress: value?.fullAddress,
          },
          {
            landmark: value?.landmark,
            country: value?.country,
            city: value?.city,
            state: value?.state,
          }
        );
        return;
      }
      case "BOX": {
        setFunc((prevState: any) => {
          return {
            ...prevState,
            name: value?.name,
            deadWeight: value?.deadWeight,
            length: value?.length,
            breadth: value?.breadth,
            height: value?.height,
          };
        });
        return;
      }
      case "PRODUCT": {
        setFunc((prevState: any) => {
          return {
            ...prevState,
            name: value?.name,
            category: value?.category,
            unitPrice: value?.unitPrice,
            deadWeight: value?.deadWeight,
            length: value?.length,
            breadth: value?.breadth,
            height: value?.height,
          };
        });
        return;
      }

      default:
        return {};
    }
  };

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
        value={searchInput}
        name="category"
        onChange={(e) => {
          if (!isDropdownOpen) setIsDropdownOpen(true);
          onSearchHandler(e.target.value);
        }}
        className={`${className} w-full downarrowImage`}
        data-cy="custom-input"
      />

      {isDropdownOpen && (
        <>
          <div
            ref={dropdownRef}
            className="custom-dropdown absolute  mt-2 w-full customScroll rounded-md bg-white max-h-60 min-h-[30px]"
            style={{ zIndex: 50 }}
            onClick={(e) => e.stopPropagation()}
            data-cy="dropdown-menu"
          >
            {isLoading && (
              <div className="" data-cy="loading-indicator">
                <ProgressBar />
              </div>
            )}
            {arrayValue.length ? (
              arrayValue?.map((item: any, index: number) => (
                <div
                  className="cursor-pointer flex botder-b justify-between items-center py-2 px-4 hover:bg-slate-100"
                  key={index}
                  onClick={(e: any) => {
                    setIsDropdownOpen(false);
                    setSelectedDataToMainState(item);
                  }}
                  data-cy={`dropdown-item-${index}`}
                >
                  <p className="text-[15px] text-[#777777] leading-4 font-Open">
                    {item?.name ? item?.name : item?.contact?.name}
                  </p>
                </div>
              ))
            ) : (
              <p className="flex justify-center items-center text-[15px] text-[#777777] font-semibold h-[50px] mx-1">
                NO SERVICE FOUND
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchDropDown;
