import React, { useEffect, useState, useRef } from "react";
import CustomInputBox from "../../../components/Input";
import "../../../../src/components/CategoriesDropDown/CategoriesDropDown.css";

import { GET_CATEGOROIES } from "../../../utils/ApiUrls";
// import { Spinner } from "../Spinner";
import { POST } from "../../../utils/webService";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import { capitalizeFirstLetter } from "../../../utils/utility";
import index from "../../NewOrder/Filter";
import toast from "react-hot-toast";

interface CustomInputWithDropDownProps {
  value?: any;
  initValue?: any;
  sortIdentifier?: any;
  className?: any;
  apiUrl?: any;
  label?: any;
  state?: any;
  setFunc?: any;
  disabled?: boolean;
  showDownloadLebal: any;
  setShowPickupDate: any;
  resetOtherAddressDetails: any;
  setResetOtherAddressDetails: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomSearchBoxForService: React.FC<CustomInputWithDropDownProps> = ({
  value,
  initValue,
  sortIdentifier,
  className,
  apiUrl,
  label,
  state,
  setFunc,
  disabled = false,
  showDownloadLebal,
  setShowPickupDate,
  resetOtherAddressDetails,
  setResetOtherAddressDetails,
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

  const getServices = async () => {
    setisLoading(true);

    const { data } = await POST(apiUrl, {
      pickupPincode: +state?.pickupDetails?.pincode,
      deliveryPincode: +state?.deliveryDetails?.pincode,
      boxInfo: state?.boxInfo,
      transit: state?.transit,
      orderType: state?.orderType,
    });

    if (data?.success) {
      let options = data?.data;
      options?.forEach((item: any) => {
        item.name = item?.partnerName?.replace(/\w+/g, function (w: any) {
          return w[0].toUpperCase() + w.slice(1).toLowerCase();
        });
      });

      if (sortIdentifier === "Cheapest") {
        options.sort((a: any, b: any) => a.total - b.total);
      }

      setArrayValue(options);
      setFilterData(options);
      setIsDropdownOpen(true);
      setTimeout(() => {
        setisLoading(false);
      }, 1000);
    } else {
      setisLoading(false);
      toast.error(data?.message);
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
        totalPrice: value?.value,
        courierPartnerServices: value?.courierPartnerServices,
      };
    });
    setShowPickupDate("");
  };

  useEffect(() => {
    if (sortIdentifier.length !== 0 && disabled === false) {
      getServices();
    }
  }, [sortIdentifier, disabled]);

  useEffect(() => {
    if (sortIdentifier.length === 0) {
      setSearchInput("");
      setFilterData([]);
      setArrayValue([]);
    }
    setFunc((prevState: any) => {
      return {
        ...prevState,
        courierPartner: "",
        serviceMode: "",
        totalPrice: 0,
        courierPartnerServices: "",
        pickupDate: "",
      };
    });
  }, [sortIdentifier]);
  useEffect(() => {
    if (resetOtherAddressDetails) {
      setSearchInput("");
      const timer = setTimeout(() => {
        setResetOtherAddressDetails(false);
      }, 3000);

      // Clean up the timer if the component unmounts or dependencies change
      return () => clearTimeout(timer);
    }
  }, [state?.orderType, state?.transit]);

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
        isDisabled={
          (disabled && sortIdentifier.length === 0) || showDownloadLebal
        }
        name="category"
        onChange={(e) => {
          if (!isDropdownOpen) setIsDropdownOpen(true);
          onSearchHandler(e.target.value);
        }}
        className={`${className} ${
          disabled && sortIdentifier.length === 0 && "border-[#e4e4e4]"
        } w-full downarrowImage`}
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
            {filterData.length > 0 && sortIdentifier.length !== 0 ? (
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
                      courierPartnerServices: item?.partnerServiceName,
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
                    ₹ {item?.total.toFixed(2)}
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
