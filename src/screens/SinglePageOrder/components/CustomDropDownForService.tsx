import React, { useEffect, useState, useRef } from "react";
import CustomInputBox from "../../../components/Input";
import "../../../../src/components/CategoriesDropDown/CategoriesDropDown.css";

import { GET_CATEGOROIES } from "../../../utils/ApiUrls";
// import { Spinner } from "../Spinner";
import { POST } from "../../../utils/webService";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import { capitalizeFirstLetter } from "../../../utils/utility";
import index from "../../NewOrder/Filter";

interface CustomInputWithDropDownProps {
  value?: any;
  initValue?: any;
  className?: any;
  apiUrl?: any;
  label?: any;
  state?: any;
  setFunc?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomSearchBoxForService: React.FC<CustomInputWithDropDownProps> = ({
  value,
  initValue,
  className,
  apiUrl,
  label,
  state,
  setFunc,
  onChange = () => {},
}) => {
  const [arrayValue, setArrayValue] = useState<any>([]);
  const [inputValue, setInputValue] = useState<any>(value);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [filterData, setFilterData] = useState([]);
  const [searchInput, setSearchInput] = useState<any>("");
  const dropdownRef = useRef(null);

  const onSearchHandler = (e: any) => {
    setSearchInput(e);
    const filtered = arrayValue?.filter((service: any) => {
      return service.name.toLowerCase().includes(e.toLowerCase());
    });

    setFilterData(filtered);
  };

  useEffect(() => {
    const closeDropdown = () => {
      setIsDropdownOpen(false);
    };
    window.addEventListener("click", closeDropdown);
    return () => {
      window.removeEventListener("click", closeDropdown);
    };
  }, []);

  console.log(state);

  const sumInvoiceValue =
    state?.boxInfo.length > 0 &&
    state?.boxInfo.reduce(
      (sum: any, box: any) => sum + box.codInfo.invoiceValue,
      0
    );

  const getCombinationDimensionValueOfAllBoxes = () => {
    let length = 0;
    let breadth = 0;
    let height = 0;
    state?.boxInfo.forEach((box: any) => {
      length += box.length;
      breadth += box.breadth;
      height += box.height;
    });

    return { length, breadth, height };
  };

  const getServices = async () => {
    setisLoading(true);

    console.log("totalDimension", getCombinationDimensionValueOfAllBoxes());

    const { data } = await POST(apiUrl, {
      pickupPincode: +state?.pickupDetails?.pincode,
      deliveryPincode: +state?.deliveryDetails?.pincode,
      invoiceValue: sumInvoiceValue,
      paymentMode: state?.isCod ? "COD" : "PREPAID",
      weight: 1,
      orderType: "B2C",
      dimension: getCombinationDimensionValueOfAllBoxes(),
    });
    //  serviceId: "a07d01f5",
    if (data?.success) {
      let options = data?.data;
      options?.forEach((item: any) => {
        item.name = item?.partnerName?.replace(/\w+/g, function (w: any) {
          return w[0].toUpperCase() + w.slice(1).toLowerCase();
        });
      });

      setArrayValue(options);
      setFilterData(options);
      setTimeout(() => {
        setisLoading(false);
      }, 1000);
    } else {
      setisLoading(false);
    }
  };

  const setSelectedDataToMainState = (value: any) => {
    setSearchInput(
      `${value?.name} : ${capitalizeFirstLetter(value?.serviceMode)}`
    );
    setFunc((prevState: any) => {
      return {
        ...prevState,
        courierPartner: value?.name,
        serviceMode: value?.serviceMode,
      };
    });
  };

  useEffect(() => {
    if (state?.pickupDetails?.pincode && state?.deliveryDetails?.pincode) {
      getServices();
    }
  }, [state, state?.isCod]);

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
            {filterData.length ? (
              filterData?.map((item: any, index: number) => (
                <div
                  className="cursor-pointer flex botder-b justify-between items-center py-2 px-4 hover:bg-slate-100"
                  key={index}
                  onClick={(e: any) => {
                    setIsDropdownOpen(false);

                    setSelectedDataToMainState({
                      name: item?.name,
                      value: item?.total,
                      serviceMode: item?.serviceMode,
                    });
                  }}
                  data-cy={`dropdown-item-${index}`}
                >
                  <p className="text-[15px] text-[#777777] leading-4 font-Open">
                    {`${item?.name} : ${capitalizeFirstLetter(
                      item?.serviceMode
                    )}`}
                  </p>
                  <p className="text-[15px] text-[#777777] leading-4 font-Open">
                    ₹ {item?.total}
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

export default CustomSearchBoxForService;
