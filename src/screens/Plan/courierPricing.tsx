import React, { useEffect, useState } from "react";
import { CustomTable } from "../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { POST } from "../../utils/webService";
import { COURIER_PRICING } from "../../utils/ApiUrls";
import { ScrollNav } from "../../components/ScrollNav";
import upArrowBlue from "../../assets/upArrorwBlue.svg";
import UpArrowIcon from "../../assets/Filter/upArrow.svg";
import DownArrowIcon from "../../assets/Filter/downArrow.svg";
import RateCardTable from "./rateCardTable";
import { capitalizeFirstLetter } from "../../utils/utility";
import { toast } from "react-hot-toast";
import { Spinner } from "../../components/Spinner";
interface ICourierPricingPropTypes {
  logisticsData?: any;
  setLogisticsData?: any;
  isLoading?: boolean;
}

const CourierPricing = (props: ICourierPricingPropTypes) => {
  const { logisticsData, setLogisticsData, isLoading } = props;

  const columnsHelper = createColumnHelper<any>();

  const [data, setData] = useState<any>({ b2bData: [], b2cData: [] });

  const [renderingComponents, setRenderingComponents] = useState(0);
  const [isMasked, setIsMasked] = useState(false);

  const arrayData = [
    { index: 0, label: "B2C" },
    { index: 1, label: "B2B" },
  ];

  useEffect(() => {
    let temp = JSON.parse(localStorage.getItem("userInfo") as any);
    if (temp) {
      setIsMasked(temp?.isMaskedUser);
    }
  }, []);

  let variableData: any;
  let filterVariableData: any;

  const setScrollIndex = (id: number) => {
    setRenderingComponents(id);
  };

  const RatesB2CForpartners: any = () => {
    let logisticsB2CData: any = logisticsData?.filter(
      (el: any) => el?.accountType === "B2C"
    );
    return logisticsB2CData?.map((logisticsInfo: any, index: number) => {
      if (logisticsB2CData.length > 0) {
        variableData = logisticsInfo?.variables;
        filterVariableData = variableData?.filter(
          (obj: any) => obj?.isActive === true
        );
      }
      return (
        <>
          <div className="mt-5">
            {logisticsInfo?.rates.map((rateCard: any, index: number) => {
              if (rateCard?.isActive === true) {
                return (
                  <>
                    <div className="flex flex-col mb-2 " key={index}>
                      <div
                        className={`grid grid-cols-2 px-4  h-[50px] gap-y-6 cursor-pointer
                        ${
                          rateCard?.isCollapse
                            ? "bg-[#E8E8E8] rounded-tr-lg rounded-tl-lg border-[1px]"
                            : "shadow-md rounded "
                        }
                        `}
                        onClick={() => {
                          let temp = [...logisticsData];

                          if (rateCard.isCollapse === true) {
                            rateCard.isCollapse = false;
                            setLogisticsData(temp);
                          } else {
                            rateCard.isCollapse = true;
                            setLogisticsData(temp);
                          }
                        }}
                      >
                        <div className="flex items-center gap-x-2">
                          <h1 className="self-center justify-start text-[16px] font-semibold font-Lato text-[#1C1C1C] whitespace-nowrap ">
                            {capitalizeFirstLetter(rateCard.partnerName)}
                          </h1>
                        </div>
                        <div className="flex justify-end items-center gap-x-1">
                          <img
                            src={
                              rateCard.isCollapse === true
                                ? UpArrowIcon
                                : DownArrowIcon
                            }
                            alt=""
                            className="cursor-pointer"
                            onClick={() => {}}
                          />
                        </div>
                      </div>
                      {rateCard.isCollapse && (
                        <>
                          <div className="overflow-auto ">
                            <RateCardTable serviceData={rateCard?.service} />
                          </div>

                          {/* variable charges code commented for now as no requirement for now */}

                          {/* <div className="ml-4 mt-6">
                            {" "}
                            <h4 className="text-[22px] font-Lato font-semibold">
                              Variable Charges{" "}
                            </h4>{" "}
                            <div className="mt-7">
                              <CustomTable
                                data={filterVariableData || []}
                                columns={variableColumns}
                              />
                            </div>
                          </div> */}
                        </>
                      )}
                    </div>
                  </>
                );
              }
            })}
          </div>
        </>
      );
    });
  };

  // if user isMasked then it will work
  const RatesB2CForMaskedpartners: any = () => {
    let logisticsB2CData: any = logisticsData?.filter(
      (el: any) => el?.accountType === "B2C"
    );

    return logisticsB2CData?.map((logisticsInfo: any, index: number) => {
      let firstB2CObject = logisticsInfo?.rates?.[0];

      let serviceArray = firstB2CObject?.service?.slice(0, 2);
      serviceArray?.forEach((element: any, i: number) => {
        if (i < 2) {
          if (element?.mode === "AIR") {
            element.partnerServiceName = "Air";
          } else if (element?.mode === "SURFACE") {
            element.partnerServiceName = "SURFACE";
          }
        }
      });

      return (
        <>
          <div className="mt-5">
            {/* {console.log("logisticsInfo?.rates", logisticsInfo?.rates)} */}
            <div className="flex flex-col mb-2 " key={index}>
              <div
                className={`grid grid-cols-2 px-4  h-[50px] gap-y-6 cursor-pointer
                        ${
                          firstB2CObject?.isCollapse
                            ? "bg-[#E8E8E8] rounded-tr-lg rounded-tl-lg border-[1px]"
                            : "shadow-md rounded "
                        }
                        `}
                onClick={() => {
                  let temp = [...logisticsData];

                  if (firstB2CObject.isCollapse === true) {
                    firstB2CObject.isCollapse = false;
                    setLogisticsData(temp);
                  } else {
                    firstB2CObject.isCollapse = true;
                    setLogisticsData(temp);
                  }
                }}
              >
                <div className="flex items-center gap-x-2">
                  <h1 className="self-center justify-start text-[16px] font-semibold font-Lato text-[#1C1C1C] whitespace-nowrap ">
                    {/* {capitalizeFirstLetter(firstB2CObject.partnerName)} */}
                    {capitalizeFirstLetter("Shipyaari")}
                  </h1>
                </div>
                <div className="flex justify-end items-center gap-x-1">
                  <img
                    src={
                      firstB2CObject.isCollapse === true
                        ? UpArrowIcon
                        : DownArrowIcon
                    }
                    alt=""
                    className="cursor-pointer"
                    onClick={() => {}}
                  />
                </div>
              </div>
              {firstB2CObject.isCollapse && (
                <>
                  <div className="overflow-auto ">
                    <RateCardTable serviceData={serviceArray} />
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      );
    });
  };

  const RatesB2BForpartners: any = () => {
    let logisticsB2CData: any = logisticsData?.filter(
      (el: any) => el?.accountType === "B2B"
    );
    return logisticsB2CData?.map((logisticsInfo: any, index: number) => {
      if (logisticsB2CData.length > 0) {
        variableData = logisticsInfo?.variables;
        filterVariableData = variableData?.filter(
          (obj: any) => obj?.isActive === true
        );
      }
      return (
        <>
          <div className="mt-5">
            {logisticsInfo?.rates.map((rateCard: any, index: number) => {
              if (rateCard?.isActive === true) {
                return (
                  <>
                    <div className="flex flex-col mb-2 " key={index}>
                      <div
                        className={`grid grid-cols-2 px-4  h-[50px] gap-y-6 cursor-pointer
                        ${
                          rateCard?.isCollapse
                            ? "bg-[#E8E8E8] rounded-tr-lg rounded-tl-lg border-[1px]"
                            : "shadow-md rounded "
                        }
                        `}
                        onClick={() => {
                          let temp = [...logisticsData];

                          if (rateCard.isCollapse === true) {
                            rateCard.isCollapse = false;
                            setLogisticsData(temp);
                          } else {
                            rateCard.isCollapse = true;
                            setLogisticsData(temp);
                          }
                        }}
                      >
                        <div className="flex items-center gap-x-2">
                          <h1 className="self-center justify-start text-[16px] font-semibold font-Lato text-[#1C1C1C] whitespace-nowrap ">
                            {capitalizeFirstLetter(rateCard.partnerName)}
                          </h1>
                        </div>
                        <div className="flex justify-end items-center gap-x-1">
                          <img
                            src={
                              rateCard.isCollapse === true
                                ? UpArrowIcon
                                : DownArrowIcon
                            }
                            alt=""
                            className="cursor-pointer"
                            onClick={() => {}}
                          />
                        </div>
                      </div>
                      {rateCard.isCollapse && (
                        <>
                          <div className="overflow-auto ">
                            <RateCardTable serviceData={rateCard?.service} />
                          </div>

                          {/* variable charges code commented for now as no requirement for now */}

                          {/* <div className="ml-4 mt-6">
                            {" "}
                            <h4 className="text-[22px] font-Lato font-semibold">
                              Variable Charges{" "}
                            </h4>{" "}
                            <div className="mt-7">
                              <CustomTable
                                data={filterVariableData || []}
                                columns={variableColumns}
                              />
                            </div>
                          </div> */}
                        </>
                      )}
                    </div>
                  </>
                );
              }
            })}
          </div>
        </>
      );
    });
  };

  // if user isMasked then it will work
  const RatesB2BForMaskedpartners: any = () => {
    let logisticsB2BData: any = logisticsData?.filter(
      (el: any) => el?.accountType === "B2B"
    );

    return logisticsB2BData?.map((logisticsInfo: any, index: number) => {
      let firstB2BObject = logisticsInfo?.rates?.[0];

      let serviceArray = firstB2BObject?.service?.slice(0, 2);
      serviceArray?.forEach((element: any, i: number) => {
        if (i < 2) {
          if (element?.mode === "AIR") {
            element.partnerServiceName = "Air";
          } else if (element?.mode === "SURFACE") {
            element.partnerServiceName = "SURFACE";
          }
        }
      });
      return (
        <>
          <div className="mt-5">
            {/* {console.log("logisticsInfo?.rates", logisticsInfo?.rates)} */}
            <div className="flex flex-col mb-2 " key={index}>
              <div
                className={`grid grid-cols-2 px-4  h-[50px] gap-y-6 cursor-pointer
                        ${
                          firstB2BObject?.isCollapse
                            ? "bg-[#E8E8E8] rounded-tr-lg rounded-tl-lg border-[1px]"
                            : "shadow-md rounded "
                        }
                        `}
                onClick={() => {
                  let temp = [...logisticsData];

                  if (firstB2BObject.isCollapse === true) {
                    firstB2BObject.isCollapse = false;
                    setLogisticsData(temp);
                  } else {
                    firstB2BObject.isCollapse = true;
                    setLogisticsData(temp);
                  }
                }}
              >
                <div className="flex items-center gap-x-2">
                  <h1 className="self-center justify-start text-[16px] font-semibold font-Lato text-[#1C1C1C] whitespace-nowrap ">
                    {/* {capitalizeFirstLetter(firstB2BObject.partnerName)} */}
                    {capitalizeFirstLetter("Shipyaari")}
                  </h1>
                </div>
                <div className="flex justify-end items-center gap-x-1">
                  <img
                    src={
                      firstB2BObject.isCollapse === true
                        ? UpArrowIcon
                        : DownArrowIcon
                    }
                    alt=""
                    className="cursor-pointer"
                    onClick={() => {}}
                  />
                </div>
              </div>
              {firstB2BObject.isCollapse && (
                <>
                  <div className="overflow-auto ">
                    <RateCardTable serviceData={serviceArray} />
                  </div>

                  {/* variable charges code commented for now as no requirement for now */}

                  {/* <div className="ml-4 mt-6">
                            {" "}
                            <h4 className="text-[22px] font-Lato font-semibold">
                              Variable Charges{" "}
                            </h4>{" "}
                            <div className="mt-7">
                              <CustomTable
                                data={filterVariableData || []}
                                columns={variableColumns}
                              />
                            </div>
                          </div> */}
                </>
              )}
            </div>
          </div>
        </>
      );
    });
  };

  useEffect(() => {
    (async () => {
      const { data } = await POST(COURIER_PRICING);
      if (data?.success) {
        // if (data.data[0].accountType === "B2C") {
        //   setData(data?.data);
        // } else {
        //   setData({ ...data, b2bData: data.data[0].rates });
        // }
        setData(data?.data);
      } else {
        toast.error(data.message);
      }
    })();
  }, [renderingComponents]);

  function getComponentToRender(renderingComponents: any, isMasked: any) {
    if (renderingComponents === 0) {
      return isMasked ? <RatesB2CForMaskedpartners /> : <RatesB2CForpartners />;
    } else if (renderingComponents === 1) {
      return isMasked ? <RatesB2BForMaskedpartners /> : <RatesB2BForpartners />;
    } else {
      return null; // Default case if no conditions are met
    }
  }

  return (
    <div>
      <div className="mx-5 lg:ml-[20px]">
        <ScrollNav
          arrayData={arrayData}
          showNumber={false}
          setScrollIndex={setScrollIndex}
        />
      </div>

      <div className="mx-5 lg:ml-[20px] mb-[68px] customScroll ">
        {getComponentToRender(renderingComponents, isMasked)}
      </div>
    </div>
  );
};

export default CourierPricing;
