import React, { useEffect, useState, useRef } from "react";
import CustomInputBox from "../Input";
import "./landmarkDropdown.css";
import { LANDMARK_API } from "../../utils/ApiUrls";
import { useDebounce } from "../../hooks";

interface CustomInputWithDropDownProps {
  pastedData: any;
  value: any;
  inputError?: boolean;
  handlePickupAddressChange: (field: any, value: any) => any;
  handleReturnAddressChange?: (field: any, value: any) => any;
  handleLandmarkSelected: (landmark: string) => any;
}

const CustomInputWithDropDown: React.FC<CustomInputWithDropDownProps> = ({
  pastedData,
  value,
  handlePickupAddressChange,
  handleLandmarkSelected,
  handleReturnAddressChange,
  inputError,
}) => {
  const [arrayValue, setArrayValue] = useState<string[]>([]);
  const [selected, setSelected] = useState(value || "");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 2000);
  const [apiCallMade, setApiCallMade] = useState(false);
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

  useEffect(() => {
    if (isDropdownOpen && !apiCallMade) {
      (async () => {
        const payload = {
          address: pastedData,
        };

        const headers = {
          Authorization: "6481876edafb412cf0294413",
          "Content-Type": "application/json",
        };

        try {
          const response = await fetch(LANDMARK_API, {
            method: "POST",
            headers,
            body: JSON.stringify(payload),
          });
          console.log("LandmarkApi called");
          if (response.ok) {
            const data = await response.json();
            if (data && data.data && Array.isArray(data.data)) {
              const names = data.data?.map((item: any) => item.name);
              setArrayValue(names);
            } else {
              console.error("Data structure is not as expected");
            }
          } else {
            console.error("Error:", response.status, response.statusText);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      })();
    } else {
      setApiCallMade(false);
    }
  }, [isDropdownOpen, setApiCallMade]);

  return (
    <div
      className="relative"
      onClick={(e) => {
        e.stopPropagation();
        setIsDropdownOpen(!isDropdownOpen);
      }}
    >
      <CustomInputBox
        inputType="text"
        label="Landmark"
        value={searchTerm || value}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setSelected(e.target.value);
          handlePickupAddressChange("landmark", e.target.value);
          if (handleReturnAddressChange) {
            handleReturnAddressChange("landmark", e.target.value);
          }
          handleLandmarkSelected(e.target.value);
        }}
        inputError={inputError}
        className="downarrowImage"
        name="landmark-dropdown"
      />

      {isDropdownOpen && arrayValue.length > 0 && (
        <div
          ref={dropdownRef}
          className="custom-dropdown absolute mt-2 w-full customScroll rounded-md bg-white h-60"
          onClick={(e) => e.stopPropagation()}
        >
          {arrayValue?.map((name: string, index: number) => (
            <div
              className="cursor-pointer py-2 px-3 hover:bg-slate-100"
              key={index}
              onClick={(e: any) => {
                setSelected(name);
                setIsDropdownOpen(false);
                handlePickupAddressChange("landmark", name);
                if (handleReturnAddressChange) {
                  handleReturnAddressChange("landmark", name);
                }
                handleLandmarkSelected(e.target.value);
              }}
            >
              <p className="text-[12px] text-[#777777] leading-4 font-Open">
                {name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomInputWithDropDown;
