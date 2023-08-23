import React, { useState, useEffect } from "react";
import TruckIcon from "../../../assets/serv/truck.svg";
import WebTruckIcon from "../../../assets/serv/WebTruck.svg";
import TickLogo from "../../../assets/common/Tick.svg";
import ServiceCard from "./ServiceCard";
import FilterBy from "./FilterBy";
// import { RecommendedServiceData } from "../../../utils/dummyData";
// import { FilterServiceData } from "../../../utils/dummyData";
import Stepper from "../../../components/Stepper";
import { Breadcum } from "../../../components/Layout/breadcum";
import BottomLayout from "../../../components/Layout/bottomLayout";
import "../../../styles/radioButtonForServiceCard.css";
import { POST } from "../../../utils/webService";
import { GET_COURIER_PARTNER_SERVICE } from "../../../utils/ApiUrls";

export const RecommendedServiceData = [
  {
    isRecommendation: true,
    recommendation: "Cheapest",
    courierPartner: "DHL",
    serviceType: "Economy",
    weight: 1,
    totalPrice: 2300,
    savePrice: 200,
    etaDate: "24 Jun 23",
    name: "service",
    value: "1",
  },
  {
    isRecommendation: true,
    recommendation: "Fastest",
    courierPartner: "DHL",
    serviceType: "Economy",
    weight: 1,
    totalPrice: 2300,
    savePrice: 200,
    etaDate: "24 Jun 23",
    name: "service",
    value: "2",
  },
];

export const FilterServiceData = [
  {
    isRecommendation: false,
    recommendation: "Recipient",
    courierPartner: "DHL",
    serviceType: "Economy",
    weight: 1,
    totalPrice: 2300,
    savePrice: 200,
    etaDate: "24 Jun 23",
    name: "service",
    value: "3",
  },
  {
    isRecommendation: false,
    recommendation: "Recipient",
    courierPartner: "DHL",
    serviceType: "Economy",
    weight: 1,
    totalPrice: 2300,
    savePrice: 200,
    etaDate: "24 Jun 23",
    name: "service",
    value: "4",
  },
  {
    isRecommendation: false,
    recommendation: "Recipient",
    courierPartner: "DHL",
    serviceType: "Economy",
    weight: 1,
    totalPrice: 2300,
    savePrice: 200,
    etaDate: "24 Jun 23",
    name: "service",
    value: "5",
  },

  {
    isRecommendation: false,
    recommendation: "Recipient",
    courierPartner: "DHL",
    serviceType: "Economy",
    weight: 1,
    totalPrice: 2300,
    savePrice: 200,
    etaDate: "24 Jun 23",
    name: "service",
    value: "5",
  },
  {
    isRecommendation: false,
    recommendation: "Recipient",
    courierPartner: "DHL",
    serviceType: "Economy",
    weight: 1,
    totalPrice: 2300,
    savePrice: 200,
    etaDate: "24 Jun 23",
    name: "service",
    value: "5",
  },

  {
    isRecommendation: false,
    recommendation: "Recipient",
    courierPartner: "DHL",
    serviceType: "Economy",
    weight: 1,
    totalPrice: 2300,
    savePrice: 200,
    etaDate: "24 Jun 23",
    name: "service",
    value: "5",
  },
  {
    isRecommendation: false,
    recommendation: "Recipient",
    courierPartner: "DHL",
    serviceType: "Economy",
    weight: 1,
    totalPrice: 2300,
    savePrice: 200,
    etaDate: "24 Jun 23",
    name: "service",
    value: "5",
  },
];

const Index: React.FC = () => {
  const [recommendedData, setRecommendedData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [response, setResponse] = useState([]);

  console.log("selectedService", selectedService);

  console.log("recommendedData", recommendedData);

  console.log("responsefromAPicall", response);
  const dataArray = (response as any).data;
  console.log("dataArray", dataArray);

  const getCourierPartnerService = async () => {
    try {
      const { data: response } = await POST(GET_COURIER_PARTNER_SERVICE);

      if (response?.success) {
        // const recommended = response.filter(
        //   (item: any) => item?.isRecommendation
        // );
        // const filter = response.filter((item: any) => !item?.isRecommendation);

        setResponse(response);
        // setFilterData(filter);
      } else {
        setResponse([]);
        // toast.error(response?.message);
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getCourierPartnerService();
  }, []);

  const handleServiceSelection = (serviceDetails: any) => {
    setSelectedService(serviceDetails);
  };

  const selectedServiceData = dataArray?.find(
    (service: any) => service.serviceId === selectedService
  );

  console.log("selectedServiceEntireObject", selectedServiceData);

  const steps = [
    {
      label: "Pickup",
      isCompleted: true,
      isActive: false,
      imgSrc: TickLogo,
    },
    {
      label: "Delivery",
      isCompleted: true,
      isActive: false,
      imgSrc: TickLogo,
    },
    {
      label: "Product",
      isCompleted: true,
      isActive: false,
      imgSrc: TickLogo,
    },
    {
      label: "Service",
      isCompleted: false,
      isActive: true,
      imgSrc: TickLogo,
    },
    {
      label: "Payment",
      isCompleted: false,
      isActive: false,
      imgSrc: TickLogo,
    },
  ];
  return (
    <div>
      <div className="hidden lg:flex lg:items-center px-5 ml-6 mb-1 ">
        <p className="font-Open text-[14px] text-[#777777] mr-1">Home</p>
        <span className="font-Open text-[14px] text-[#777777] mr-1">/</span>
        <span className="font-Open font-semibold text-[14px] text-[#1C1C1C]">
          Partner list
        </span>
      </div>
      <Breadcum label="Add New Order" />
      <div className="lg:mb-8">
        <Stepper steps={steps} />
      </div>
      <div className="flex flex-row gap-x-2 mb-5 lg:mb-[38px] mx-5">
        <img src={TruckIcon} alt="Truck Icon" className="lg:hidden" />
        <img src={WebTruckIcon} alt="" className="hidden lg:block" />
        <p className="text-[18px] text-[#202427] font-semibold font-Lato lg:font-normal lg:text-2xl lg:text-[#323232] ">
          Service
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-y-[22px] mx-5 mb-5 lg:gap-6 lg:mb-9">
        {/* {RecommendedServiceData.map((each) => {
          console.log("eachhh", each);
          return (
            <ServiceCard
              key={each.value}
              isRecommendation={each.isRecommendation}
              recommendation={each.recommendation}
              courierPartner={each.courierPartner}
              serviceType={each.serviceType}
              weight={each.weight}
              totalPrice={each.totalPrice}
              savePrice={each.savePrice}
              etaDate={each.etaDate}
              name={each.name}
              value={each.value}
              onSelectService={handleServiceSelection}
              serviceData={each}
            />
          );
        })} */}
        {dataArray?.map((each: any) => {
          console.log("eachhh", each);
          return (
            <ServiceCard
              key={each.value}
              isRecommendation={each.isRecommendation}
              recommendation={each.recommendation}
              courierPartner={each.partnerName}
              serviceType={each.serviceMode}
              minimumServiceWeight={each.minimumServiceWeight}
              totalPrice={each.totalPrice}
              savePrice={each.savePrice}
              etaDate={each.etaDate}
              name={each.accountName}
              value={each.serviceId}
              onSelectService={handleServiceSelection}
              serviceId={each.serviceId}
              serviceData={each}
            />
          );
        })}
      </div>

      {/* <div className="mx-5  mb-5 lg:mb-6">
        <FilterBy />
      </div> */}

      {/* <div className="mx-5 flex flex-col lg:flex-row h-[500px] lg:h-full   gap-y-[13px] overflow-y-scroll  lg:overflow-x-scroll flex-nowrap   lg:gap-x-6  ">
        {dataArray?.map((each: any) => {
          return (
            <ServiceCard
              key={each.value}
              isRecommendation={each.isRecommendation}
              recommendation={each.recommendation}
              courierPartner={each.courierPartner}
              serviceType={each.serviceType}
              minimumServiceWeight={each?.minimumServiceWeight}
              totalPrice={each.totalPrice}
              savePrice={each.savePrice}
              etaDate={each.etaDate}
              name={each.name}
              value={each.value}
              onSelectService={handleServiceSelection}
              serviceData={each}
            />
          );
        })}
      </div> */}
      <BottomLayout callApi={() => {}} />
    </div>
  );
};

export default Index;
