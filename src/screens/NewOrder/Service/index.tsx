import React, { useState, useEffect } from "react";
import TruckIcon from "../../../assets/serv/truck.svg";
import WebTruckIcon from "../../../assets/serv/WebTruck.svg";
import TickLogo from "../../../assets/common/Tick.svg";
import DownArrow from "../../../assets/BulkOrder/downArrow.svg";

import ServiceCard from "./ServiceCard";
import FilterBy from "./FilterBy";
// import { RecommendedServiceData } from "../../../utils/dummyData";
// import { FilterServiceData } from "../../../utils/dummyData";
import Stepper from "../../../components/Stepper";
import { Breadcrum } from "../../../components/Layout/breadcrum";
import BottomLayout from "../../../components/Layout/bottomLayout";
import "../../../styles/radioButtonForServiceCard.css";
import { POST } from "../../../utils/webService";
import {
  GET_COURIER_PARTNER_SERVICE,
  GET_LATEST_ORDER,
  SET_PARTNER_SERVICE_INFO,
} from "../../../utils/ApiUrls";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../../components/Spinner";
import CustomDropDown from "../../../components/DropDown";
import { getQueryJson } from "../../../utils/utility";
import RecommendatedServiceCard from "./RecommendatedServiceCard";
import ServiceBox from "./ServiceBox";
import FilterItems from "../../../components/FilterItemsScroll";
import FilterIcon from "../../../assets/serv/filter.svg";

// export const RecommendedServiceData = [
//   {
//     isRecommendation: true,
//     recommendation: "Cheapest",
//   },
// ];

// export const FilterServiceData = [
//   {
//     isRecommendation: false,
//     recommendation: "Recipient",
//     courierPartner: "DHL",
//     serviceType: "Economy",
//     weight: 1,
//     totalPrice: 2300,
//     savePrice: 200,
//     etaDate: "24 Jun 23",
//     name: "service",
//     value: "3",
//   },
//   {
//     isRecommendation: false,
//     recommendation: "Recipient",
//     courierPartner: "DHL",
//     serviceType: "Economy",
//     weight: 1,
//     totalPrice: 2300,
//     savePrice: 200,
//     etaDate: "24 Jun 23",
//     name: "service",
//     value: "4",
//   },
//   {
//     isRecommendation: false,
//     recommendation: "Recipient",
//     courierPartner: "DHL",
//     serviceType: "Economy",
//     weight: 1,
//     totalPrice: 2300,
//     savePrice: 200,
//     etaDate: "24 Jun 23",
//     name: "service",
//     value: "5",
//   },

//   {
//     isRecommendation: false,
//     recommendation: "Recipient",
//     courierPartner: "DHL",
//     serviceType: "Economy",
//     weight: 1,
//     totalPrice: 2300,
//     savePrice: 200,
//     etaDate: "24 Jun 23",
//     name: "service",
//     value: "5",
//   },
//   {
//     isRecommendation: false,
//     recommendation: "Recipient",
//     courierPartner: "DHL",
//     serviceType: "Economy",
//     weight: 1,
//     totalPrice: 2300,
//     savePrice: 200,
//     etaDate: "24 Jun 23",
//     name: "service",
//     value: "5",
//   },

//   {
//     isRecommendation: false,
//     recommendation: "Recipient",
//     courierPartner: "DHL",
//     serviceType: "Economy",
//     weight: 1,
//     totalPrice: 2300,
//     savePrice: 200,
//     etaDate: "24 Jun 23",
//     name: "service",
//     value: "5",
//   },
//   {
//     isRecommendation: false,
//     recommendation: "Recipient",
//     courierPartner: "DHL",
//     serviceType: "Economy",
//     weight: 1,
//     totalPrice: 2300,
//     savePrice: 200,
//     etaDate: "24 Jun 23",
//     name: "service",
//     value: "5",
//   },
// ];

interface IServiceOption {
  value: string;
  text: {
    partnerName: string;
    companyServiceName: string;
    total: number;
    serviceMode: string;
    EDT: string;
  };
}

const Index: React.FC = () => {
  // const [recommendedData, setRecommendedData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [response, setResponse] = useState<any>();
  const [serviceOptions, setServiceOptions] = useState<any>([]);
  const [recommendedOptions, setRecommendatedOptions] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [surface, setSurface] = useState(true);
  const [air, setAir] = useState(true);
  const [sortingPrice, setSortingPrice] = useState(false);
  const [sortingFastest, setSortingFastest] = useState(false);
  const [sortedOptions, setSortedOptions] = useState<IServiceOption[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const params = getQueryJson();
  let shipyaari_id = params?.shipyaari_id || "";
  let orderSource = params?.source || "";

  const getCourierPartnerService = async () => {
    const payload = {
      tempOrderId: +shipyaari_id,
      source: orderSource,
    };

    try {
      setLoading(true);

      const { data: response } = await POST(
        GET_COURIER_PARTNER_SERVICE,
        payload
      );

      if (response?.success) {
        setResponse(response);

        let options = response?.data?.map((service: any, index: number) => {
          return {
            text: service,
            value: index,
          };
        });

        setServiceOptions(options);

        // console.log("options", options);
        const cheapestService = options.reduce(
          (minOption: any, currentOption: any) => {
            return currentOption.text.total < minOption.text.total
              ? currentOption
              : minOption;
          },
          options[0]
        );

        const fastestService = options.reduce(
          (minOption: any, currentOption: any) => {
            return currentOption.text.EDT_Epoch < minOption.text.EDT_Epoch
              ? currentOption
              : minOption;
          },
          options[0]
        );

        const balancedService = options.reduce(
          (minOption: any, currentOption: any) => {
            const minCost = cheapestService.text.total;
            const maxCost = fastestService.text.total;

            const currentCost = currentOption.text.total;

            return currentCost >= minCost && currentCost <= maxCost
              ? currentOption
              : minOption;
          },
          options[0]
        );

        setRecommendatedOptions([
          cheapestService,
          fastestService,
          balancedService,
        ]);

        setLoading(false);
      } else {
        setResponse([]);
        setLoading(false);

        if (response?.message) {
          toast.error(response?.message);
        }
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourierPartnerService();
  }, []);

  // const cheapestService = serviceOptions.reduce(
  //   (minOption: any, currentOption: any) => {
  //     return currentOption.text.total < minOption.text.total
  //       ? currentOption
  //       : minOption;
  //   },
  //   serviceOptions[0]
  // );

  // const fastestService = serviceOptions.reduce(
  //   (minOption: any, currentOption: any) => {
  //     return currentOption.text.EDT_Epoch < minOption.text.EDT_Epoch
  //       ? currentOption
  //       : minOption;
  //   },
  //   serviceOptions[0]
  // );

  const steps = [
    {
      label: "Pickup",
      isCompleted: true,
      isActive: true,
      imgSrc: TickLogo,
    },
    {
      label: "Delivery",
      isCompleted: true,
      isActive: true,
      imgSrc: TickLogo,
    },
    {
      label: "Product",
      isCompleted: true,
      isActive: true,
      imgSrc: TickLogo,
    },
    {
      label: "Service",
      isCompleted: false,
      isActive: true,
      imgSrc: TickLogo,
    },
    {
      label: "Summary",
      isCompleted: false,
      isActive: false,
      imgSrc: TickLogo,
    },
    {
      label: "Payment",
      isCompleted: false,
      isActive: false,
      imgSrc: TickLogo,
    },
  ];
  // console.log("services");

  useEffect(() => {
    const filters = serviceOptions?.filter((service: any) => {
      const serviceMode = service.text.serviceMode.toLowerCase();

      if (
        (surface && serviceMode === "surface") ||
        (air && serviceMode === "air") ||
        (!surface && !air)
      ) {
        return service;
      }
      return null;
    });
    // console.log("filters", filters);

    const cheapestService = filters.reduce(
      (minOption: any, currentOption: any) => {
        return currentOption.text.total < minOption.text.total
          ? currentOption
          : minOption;
      },
      filters[0]
    );

    const fastestService = filters.reduce(
      (minOption: any, currentOption: any) => {
        return currentOption.text.EDT_Epoch < minOption.text.EDT_Epoch
          ? currentOption
          : minOption;
      },
      filters[0]
    );

    const balancedService = filters.reduce(
      (minOption: any, currentOption: any) => {
        const minCost = cheapestService.text.total;
        const maxCost = fastestService.text.total;

        const currentCost = currentOption.text.total;

        return currentCost >= minCost && currentCost <= maxCost
          ? currentOption
          : minOption;
      },
      filters[0]
    );

    setRecommendatedOptions([cheapestService, fastestService, balancedService]);
  }, [surface, air]);

  const handleSortBy = (selectedItems: string[]) => {
    const isSurfaceSelected = selectedItems.includes("Surface");
    const isAirSelected = selectedItems.includes("Air");

    setSurface(isSurfaceSelected);
    setAir(isAirSelected);
  };
  // console.log("serviceOptions", serviceOptions);

  // console.log("recommendedOptions", recommendedOptions);

  // console.log("surface", surface);
  // console.log("air", air);

  const postServiceDetails = async () => {
    try {
      setLoading(true);
      if (selectedService === null) {
        toast.error("Please Select a Service");
        setLoading(false);
        return;
      }

      let {
        partnerServiceId,
        partnerServiceName,
        companyServiceId,
        companyServiceName,
      } = response.data[selectedService];

      const payload = {
        partnerServiceId,
        partnerServiceName,
        companyServiceId,
        companyServiceName,
        tempOrderId: +shipyaari_id,
        source: orderSource,
      };
      const { data: responseData } = await POST(
        SET_PARTNER_SERVICE_INFO,
        payload
      );

      if (responseData?.success) {
        toast.success(responseData?.message);
        setLoading(false);
        navigate(
          `/orders/add-order/summary?shipyaari_id=${shipyaari_id}&source=${orderSource}`
        );
      } else {
        setLoading(false);
        toast.error(responseData?.message);
      }
    } catch (error) {
      setLoading(false);
      return error;
    }
  };

  return (
    <div className="w-full h-[80vh] customScroll">
      <Breadcrum label="Add New Order" />
      <div className="lg:mb-8">
        <Stepper steps={steps} />
      </div>
      <div className="flex flex-row gap-x-2 mb-5 lg:mb-[38px] px-5">
        <img src={TruckIcon} alt="Truck Icon" className="lg:hidden" />
        <img src={WebTruckIcon} alt="" className="hidden lg:block" />
        <p className="font-semibold font-Lato text-center text-gray-900 lg:font-normal text-[1.5rem] lg:text-[#1C1C1C]  ">
          Service
        </p>
      </div>

      {loading ? (
        <div className="flex p-20 justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div>
            <div className="flex flex-row items-center gap-x-2 mb-5 ml-4">
              <img src={FilterIcon} alt="Filter" />
              <div className="text-[18px] font-bold lg:font-normal lg:text-2xl">
                Filter by
              </div>
            </div>
            <div className="grid lg:grid-cols-1 mx-5 mb-5 mt-4 lg:mb-6">
              <FilterItems
                items={["All", "Surface", "Air"]}
                onClick={handleSortBy}
                initialSelectedFilter="All"
              />
            </div>
            <div className="flex flex-col lg:flex-row gap-4 p-2 ">
              {/* <h1 className="font-Lato">Shipyaari Service</h1> */}
              <RecommendatedServiceCard
                // options={serviceOptions}
                options={recommendedOptions}
                selectedValue={setSelectedService}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
            </div>
            {/* <div className="mx-5 mb-5 mt-4 lg:mb-6">
              <FilterBy />
            </div> */}

            <div className=" gap-4 p-2 mb-[10%] ">
              <div
                className="flex gap-x-1"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <h1
                  className="font-Lato ml-4 mb-3 text-[14px] font-bold lg:font-normal cursor-pointer text-blue-500"
                  // onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  View All Services
                </h1>
                <img
                  src={DownArrow}
                  alt="Downarrow"
                  className="pb-4  cursor-pointer"
                />
              </div>

              {dropdownOpen && (
                <ServiceBox
                  options={serviceOptions}
                  selectedValue={setSelectedService}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                  ignoreRecommended={true}
                />
              )}
            </div>
          </div>
        </>
      )}

      <BottomLayout
        callApi={() => postServiceDetails()}
        finalButtonText="NEXT"
      />
    </div>
  );
};

export default Index;
