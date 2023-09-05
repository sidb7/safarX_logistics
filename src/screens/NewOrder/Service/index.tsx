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
import { Spinner } from "../../../components/Spinner";
import CustomDropDown from "../../../components/DropDown";

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
  const [response, setResponse] = useState<any>();
  const [latestOrder, setLatestOrder] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [companyServiceId, setCompanyServiceId] = useState<any>();
  const [companyServiceName, setCompanyServiceName] = useState<any>();
  const [partnerService, setPartnerService] = useState<any>();
  const [partnerServiceId, setPartnerServiceId] = useState<any>();
  const [partnerServiceName, setPartnerServiceName] = useState<any>();
  const [cardInfo, setCardInfo] = useState<any>();

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
  // const dataArray = (response as any).data;
  //console.log("dataArray", dataArray);

  // endpoint to maintain order state
  // const getLatestOrderDetails = async () => {
  //   try {
  //     setLoading(true);
  //     const { data: response } = await POST(GET_LATEST_ORDER);

  //     if (response?.success) {
  //       // const recommended = response.filter(
  //       //   (item: any) => item?.isRecommendation
  //       // );
  //       // const filter = response.filter((item: any) => !item?.isRecommendation);

  //       setLatestOrder(response);
  //       setLoading(false);
  //       // setFilterData(filter);
  //     } else {
  //       setLatestOrder([]);
  //       // toast.error(response?.message);
  //     }
  //   } catch (error) {
  //     return error;
  //   }
  // };

  // useEffect(() => {
  //   getLatestOrderDetails();
  // }, []);

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

  const postServiceDetails = async () => {
    const payload = {
      partnerServiceId: partnerServiceId,
      partnerServiceName: partnerServiceName,
      companyServiceId: companyServiceId,
      companyServiceName: companyServiceName,
    };
    try {
      const { data: response } = await POST(SET_PARTNER_SERVICE_INFO, payload);

      if (response?.success) {
        toast.success(response?.message);
        navigate("/orders/add-order/summary");
      } else {
        console.error("Service error");
        toast.error(response?.message);
      }
    } catch (error) {
      //console.log("Error in ServicePostAPI:", error);
      return error;
    }
  };

  const companyName =
    response &&
    response?.data?.map((el: any, i: number) => ({
      label: el?.companyServiceName,
      value: el?.companyServiceId,
    }));

  const fetchPartnerServiceName = (e: any) => {
    setCompanyServiceId(e.target.value);
    const filtered = response?.data?.filter((resp: any) => {
      return resp?.companyServiceId === e.target.value;
    });
    setCompanyServiceName(filtered[0].companyServiceName);

    const partnerDropdown = filtered?.map((el: any, i: number) => ({
      label: el?.partnerServiceName,
      value: el?.partnerServiceId,
    }));
    setPartnerService(partnerDropdown);
  };

  const setCardInfoFunction = (e: any) => {
    setPartnerServiceId(e.target.value);
    const CardInfo = response?.data?.filter((resp: any) => {
      return resp?.partnerServiceId === e.target.value;
    });
    setPartnerServiceName(CardInfo[0].partnerServiceName);
    setCardInfo(CardInfo[0]);
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

      <div className="flex gap-4 p-2">
        <div>
          <h1 className="font-Lato">Select Shipyaari Service</h1>
          <CustomDropDown
            value={companyServiceId}
            options={companyName}
            onChange={(e) => fetchPartnerServiceName(e)}
            wrapperClass="!w-[20rem] mt-4"
            heading="Select Shipyaari Service"
          />
        </div>
        {partnerService && (
          <div>
            <h1 className="font-Lato">Select Partner Service</h1>
            <CustomDropDown
              value={partnerServiceId}
              options={partnerService}
              onChange={(e) => setCardInfoFunction(e)}
              wrapperClass="!w-[20rem] mt-4"
              heading="Select Partner Service"
            />
          </div>
        )}
      </div>

      {cardInfo && (
        <div className="max-w-2xl rounded shadow-xl">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 underline">
              Service Information :
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-sm">
                <span className="font-bold font-Lato">
                  Partner Service Name :
                </span>{" "}
                {cardInfo.partnerServiceName}
              </div>
              <div className="text-sm">
                <span className="font-bold font-Lato">
                  Company Service Name :
                </span>{" "}
                {cardInfo.companyServiceName}
              </div>
              <div className="text-sm">
                <span className="font-bold font-Lato">EDT : </span>
                {cardInfo.EDT}
              </div>
              <div className="text-sm">
                <span className="font-bold font-Lato">Add Price : </span>{" "}
                &#8377; {cardInfo.add}
              </div>
              <div className="text-sm">
                <span className="font-bold font-Lato">
                  Applied Weight (KG) :{" "}
                </span>
                {cardInfo.appliedWeight}
              </div>
              <div className="text-sm">
                <span className="font-bold font-Lato">Base Price : </span>
                &#8377; {cardInfo.base}
              </div>
              <div className="text-sm">
                <span className="font-bold font-Lato">COD Price : </span>
                &#8377; {cardInfo.cod}
              </div>
              <div className="text-sm">
                <span className="font-bold font-Lato">GST % : </span>
                &#8377; {cardInfo.gst}
              </div>
              <div className="text-sm">
                <span className="font-bold font-Lato">Invoice Value : </span>
                &#8377; {cardInfo.invoiceValue}
              </div>
              <div className="text-sm">
                <span className="font-bold font-Lato">Total : </span>
                &#8377; {cardInfo.total}
              </div>
              <div className="text-sm">
                <span className="font-bold font-Lato">Variables : </span>
                &#8377; {cardInfo.variables}
              </div>
              {cardInfo?.insurance && (
                <div className="text-sm">
                  <span className="font-bold font-Lato">Insurance : </span>
                  &#8377; {cardInfo?.insurance}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <BottomLayout
        callApi={() => {
          postServiceDetails();
        }}
      />
    </div>
  );
};

export default Index;
