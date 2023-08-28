import React, { useState, useEffect } from "react";
import TruckIcon from "../../../assets/serv/truck.svg";
import WebTruckIcon from "../../../assets/serv/WebTruck.svg";
import TickLogo from "../../../assets/common/Tick.svg";
import ServiceCard from "./ServiceCard";
import FilterBy from "./FilterBy";
// import { RecommendedServiceData } from "../../../utils/dummyData";
// import { FilterServiceData } from "../../../utils/dummyData";
import Stepper from "../../../components/Stepper";
import { Breadcum } from "../../../components/Layout/breadcrum";
import BottomLayout from "../../../components/Layout/bottomLayout";
import "../../../styles/radioButtonForServiceCard.css";
import { POST } from "../../../utils/webService";
import {
  GET_COURIER_PARTNER_SERVICE,
  GET_LATEST_ORDER,
  SET_PARTNER_SERVICE_INFO,
} from "../../../utils/ApiUrls";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
  const [latestOrder, setLatestOrder] = useState<any>([]);
  // const [payload, setPayload] = useState({
  //   mode: null,
  //   companyServiceId: null,
  //   companyServiceName: null,
  //   baseWeight: null,
  //   partnerServiceId: null,
  //   partnerServiceName: null,
  //   price: null,
  // });

  const navigate = useNavigate();

  //console.log("selectedService", selectedService);

  //console.log("recommendedData", recommendedData);

  //console.log("responsefromAPicall", response);
  const dataArray = (response as any).data;
  //console.log("dataArray", dataArray);

  // endpoint to maintain order state
  const getLatestOrderDetails = async () => {
    try {
      const { data: response } = await POST(GET_LATEST_ORDER);

      if (response?.success) {
        // const recommended = response.filter(
        //   (item: any) => item?.isRecommendation
        // );
        // const filter = response.filter((item: any) => !item?.isRecommendation);

        setLatestOrder(response);
        // setFilterData(filter);
      } else {
        setLatestOrder([]);
        // toast.error(response?.message);
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getLatestOrderDetails();
  }, []);

  const getServicePayload = latestOrder?.data?.codInfo;
  //console.log("getServicepayload", getServicePayload);

  /* getserviceAPI Static Payload */

  // const getServiceDetailsPayload = {
  //   paymentType: "COD",
  //   codCollectAmount: 123,
  //   invoiceValue: 1234,
  // };

  const getCourierPartnerService = async () => {
    try {
      const { data: response } = await POST(
        GET_COURIER_PARTNER_SERVICE,
        getServicePayload
      );

      if (response?.success) {
        console.log("responseeee", response);
        setResponse(response);
      } else {
        setResponse([]);

        if (response?.message) {
          toast.error(response.message);
        }
      }
    } catch (error) {
      console.error("Error in API call:", error);
    }
  };

  useEffect(() => {
    getCourierPartnerService();
  }, []);

  const handleServiceSelection = (serviceDetails: any) => {
    setSelectedService(serviceDetails);
  };

  // const postServiceDetailsPayload = dataArray.map((eachArray: any) => {
  //   eachArray.map((each: any) => {
  //     //console.log("eachforpayload", each);
  //     mode: each.mode,
  //     companyServiceId: each.companyServiceId,
  //   companyServiceName: each.companyServiceId,
  //   baseWeight:each.companyServiceName,
  //   partnerServiceId: each.partnerServiceId,
  //   partnerServiceName: each.partnerServiceId,
  //   price: each.partnerServiceId,

  //   });
  // });

  /* Static service payload data */
  // const postServiceDetailsPayload = {
  //   mode: "SURFACE",
  //   companyServiceId: "12",
  //   companyServiceName: "ECONOMY",
  //   baseWeight: 0.5,
  //   partnerServiceId: "123",
  //   partnerServiceName: "DART PLUS",
  //   price: 168,
  // };

  const selectedServiceData = dataArray?.map((eachArray: any) => {
    //console.log("eachArray for selectedData", eachArray);
    return eachArray?.find((service: any) => {
      return service.companyServiceId === selectedService;
    });
  });

  //console.log("selectedServiceEntireObject", selectedServiceData);

  let payloadData: any = "";
  if (
    selectedServiceData &&
    selectedServiceData.length > 0 &&
    selectedServiceData[0]
  ) {
    payloadData = {
      mode: selectedServiceData[0]?.mode,
      companyServiceId: selectedServiceData[0]?.companyServiceId,
      companyServiceName: selectedServiceData[0]?.companyServiceName,
      baseWeight: parseFloat(
        selectedServiceData[0].companyServiceName?.split(" ")[1]
      ),
      partnerServiceId: selectedServiceData[0]?.partnerServiceId,
      partnerServiceName: selectedServiceData[0]?.partnerServiceName,
      price: selectedServiceData[0]?.totalPayment,
    };
    // setPayload(payloadData);
    // //console.log("PayloadData:", payloadData);
  } else {
    //console.log("No matching service found.");
  }
  //console.log("Payload:", payloadData);
  const postServiceDetails = async (payload: any) => {
    try {
      if (payload.mode !== "") {
        const { data: response } = await POST(
          SET_PARTNER_SERVICE_INFO,
          payload
        );

        if (response?.success) {
          toast.success(response?.message);
          navigate("/orders/add-order/summary");
        } else {
          console.error("Service error");
          toast.error(response?.message);
        }
      } else {
        console.error("Payload is empty.");
      }
    } catch (error) {
      //console.log("Error in ServicePostAPI:", error);
      return error;
    }
  };

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
  return (
    <div>
      <Breadcum label="Add New Order" />
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
      <div className="flex flex-col lg:flex-row gap-y-[22px] px-5 mb-5 lg:gap-6 lg:mb-9">
        {/* {RecommendedServiceData.map((each) => {
          //console.log("eachhh", each);
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
        {/* key={each.companyServiceId + index} */}

        {dataArray?.map((eachArray: any) => {
          //console.log("eachArray", eachArray);
          return eachArray.map((each: any, index: number) => (
            <ServiceCard
              key={each.companyServiceId}
              isRecommendation={each.isRecommendation}
              recommendation={each.recommendation}
              courierPartner={each.partnerServiceName}
              serviceType={each.companyServiceName}
              minimumServiceWeight={each.minimumServiceWeight}
              totalPrice={each.totalPayment}
              savePrice={each.savePrice}
              etaDate={each?.EDT}
              name={"shipyaari"}
              value={each?.companyServiceId}
              onSelectService={handleServiceSelection}
              // serviceId={each.serviceId}
              serviceData={each}
            />
          ));
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
      <BottomLayout
        callApi={() => {
          postServiceDetails(payloadData);
        }}
      />
    </div>
  );
};

export default Index;
