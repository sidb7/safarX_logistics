import React, { useState, useEffect } from "react";
import TruckIcon from "../../../assets/serv/truck.svg";
import WebTruckIcon from "../../../assets/serv/WebTruck.svg";
import TickLogo from "../../../assets/common/Tick.svg";
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
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../../components/Spinner";
import CustomDropDown from "../../../components/DropDown";
import { getQueryJson } from "../../../utils/utility";
import RecommendatedServiceCard from "./RecommendatedServiceCard";
import ServiceBox from "./ServiceBox";

export const RecommendedServiceData = [
  {
    isRecommendation: true,
    recommendation: "Cheapest",
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

  const [response, setResponse] = useState<any>();
  const [serviceOptions, setServiceOptions] = useState<any>([]);

  const [loading, setLoading] = useState(false);

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
        setLoading(false);
      } else {
        setResponse([]);

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

  const postServiceDetails = async () => {
    if (selectedService === null) {
      toast.error("Please Select a Service");
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

    try {
      const { data: response } = await POST(SET_PARTNER_SERVICE_INFO, payload);

      if (response?.success) {
        toast.success(response?.message);
        navigate(
          `/orders/add-order/summary?shipyaari_id=${shipyaari_id}&source=${orderSource}`
        );
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      //
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
    <div className="w-full ">
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
            <div className="flex flex-col lg:flex-row gap-4 p-2 ">
              {/* <h1 className="font-Lato">Shipyaari Service</h1> */}
              <RecommendatedServiceCard
                options={serviceOptions}
                selectedValue={setSelectedService}
              />
            </div>
            <div className="mx-5 mb-5 mt-4 lg:mb-6">
              <FilterBy />
            </div>
            <div className="flex flex-col lg:flex-row gap-4 p-2 mb-[10%] ">
              {/* <h1 className="font-Lato">Shipyaari Service</h1> */}
              <ServiceBox
                options={serviceOptions}
                selectedValue={setSelectedService}
              />
            </div>
          </div>
        </>
      )}

      <BottomLayout
        finalButtonText="NEXT"
        callApi={() => {
          postServiceDetails();
        }}
      />
    </div>
  );
};

export default Index;
