import React, { useEffect, useState, useRef } from "react";
import CustomInputBox from "../Input";
import "./landmarkDropdown.css";
import { POST } from "../../utils/webService";
import { constants } from "buffer";

interface CustomInputWithDropDownProps {
  pastedData: any;
  handlePickupAddressChange: (field: any, value: any) => any;
  handleReturnAddressChange?: (field: any, value: any) => any;

  handleLandmarkSelected: (landmark: string) => any;
}

const CustomInputWithDropDown: React.FC<CustomInputWithDropDownProps> = ({
  pastedData,
  handlePickupAddressChange,
  handleLandmarkSelected,
  handleReturnAddressChange,
}) => {
  const [arrayValue, setArrayValue] = useState<string[]>([]);
  const [selected, setSelected] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  console.log("selectedLandmark", selected);

  useEffect(() => {
    (async () => {
      const payload = {
        address: pastedData,
      };

      const headers = {
        Authorization: "6481876edafb412cf0294413",
        "Content-Type": "application/json",
      };

      try {
        const response = await fetch(
          "http://65.2.176.43:8006/api/v1/landmark/landmark",
          {
            method: "POST",
            headers,
            body: JSON.stringify(payload),
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data && data.data && Array.isArray(data.data)) {
            const names = data.data.map((item: any) => item.name);
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
  }, [pastedData]);

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
        value={selected}
        onChange={(e) => {
          setSelected(e.target.value);
          handlePickupAddressChange("landmark", e.target.value);
          if (handleReturnAddressChange) {
            handleReturnAddressChange("landmark", e.target.value);
          }
          handleLandmarkSelected(e.target.value);
          console.log(
            "selectedLandmarkhandler",
            handlePickupAddressChange("landmark", e.target.value)
          );
        }}
        className="downarrowImage"
      />

      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="custom-dropdown absolute mt-2 w-full overflow-y-scroll rounded-md bg-white h-60"
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
