import React, { useState, useEffect } from "react";
import UpwardArrow from "../../../assets/AccordionUp.svg";
import DownwardArrow from "../../../assets/downwardArrow.svg";
import { capitalizeFirstLetter } from "../../../utils/utility";
// import OneButton from "../../../components/Button/OneButton";
// import { SET_SERVICE_INFO } from "../../../utils/ApiUrls";
// import { POST } from "../../../utils/webService";
// import toast from "react-hot-toast";

const Services = ({
  completeData,
  serviceList,
  enableShowServicesOption,
  enabled,
  setUpdatedData,
  updatedData,
  serviceIndex,
  setServiceIndex,
}: any) => {
  const [serviceAccordian, setServiceAccordian] = useState<any>(false);
  // const [serviceIndex, setServiceIndex] = useState(0);

  // Add "Auto Select Service" to the beginning of the service list
  const updatedServiceList = [
    { partnerName: "Auto Select", serviceMode: "", total: "" },
    ...serviceList,
  ];

  const handleService = (index: any) => {
    setServiceIndex(index);
  };

  // const setServices = async () => {
  //   try {
  //     const payload: any = {
  //       partnerServiceId: serviceList[serviceIndex - 1]?.partnerServiceId,
  //       partnerServiceName: serviceList[serviceIndex - 1]?.partnerServiceName,
  //       companyServiceId: serviceList[serviceIndex - 1]?.companyServiceId,
  //       companyServiceName: serviceList[serviceIndex - 1]?.companyServiceName,
  //       tempOrderId: updatedData?.tempOrderId,
  //       source: updatedData?.source,
  //       category: "Service",
  //     };

  //     const { data: response }: any = await POST(SET_SERVICE_INFO, payload);
  //     if (response.success) {
  //       toast.success("Services added successfully");
  //     } else {
  //       toast.error("Failed to set services");
  //     }
  //   } catch (error: any) {
  //     console.log(error.message);
  //   }
  // };

  // Set initial service data based on the initial selection
  useEffect(() => {
    if (updatedServiceList[serviceIndex]?.partnerName === "Auto Select") {
      setUpdatedData({
        ...updatedData,
        service: {}, // Set empty object for "Auto Select"
      });
    } else {
      setUpdatedData({
        ...updatedData,
        service: updatedServiceList[serviceIndex],
      });
    }
  }, []);

  // Use useEffect to update the data whenever serviceIndex changes
  useEffect(() => {
    if (updatedServiceList[serviceIndex]?.partnerName === "Auto Select") {
      setUpdatedData({
        ...updatedData,
        service: {}, // Set empty object for "Auto Select"
      });
    } else {
      setUpdatedData({
        ...updatedData,
        service: updatedServiceList[serviceIndex],
      });
    }
  }, [serviceIndex]);

  return (
    <div>
      <div>
        <div
          className={`border-[1.5px] ${
            serviceList?.length === 0 ? "border-red-600" : "border-[#E8E8E8]"
          } rounded-lg py-2 mx-4 mt-4
             ${enableShowServicesOption ? "bg-white" : "bg-slate-50"} `}
        >
          <div
            className="px-4 py-2 flex justify-between w-full"
            onClick={() => {
              setServiceAccordian(!serviceAccordian);
            }}
          >
            <div className="flex justify-between items-center w-full">
              <div>
                <p className="">Services</p>
              </div>
              <div>
                <img
                  src={
                    serviceAccordian && enableShowServicesOption
                      ? UpwardArrow
                      : DownwardArrow
                  }
                  alt="Arrow Image"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          {enabled
            ? enableShowServicesOption &&
              serviceAccordian && (
                <div
                  className={`mx-4 border-[1.5px] border-[#E8E8E8]  pb-4 pt-[0.5px] rounded-lg`}
                >
                  <div className="mx-4">
                    {updatedServiceList.length === 1 ? (
                      <div className="flex justify-center items-center h-24 mt-2 border border-[#E8E8E8] rounded-lg">
                        <p className="open-sans text-12">No Data Found</p>
                      </div>
                    ) : (
                      <div>
                        {updatedServiceList?.map((service: any, index: any) => {
                          return (
                            <>
                              <div
                                key={index}
                                className={`flex cursor-pointer min-w-[90%] border-2 rounded-br rounded-bl border-t-0 ${
                                  index === serviceIndex &&
                                  "shadow-inner bg-[#F7F7F7]"
                                } hover:shadow-inner hover:bg-[#F7F7F7]`}
                                onClick={() => handleService(index)}
                              >
                                <div
                                  className="flex flex-col items-center gap-y-[1rem] my-2 w-[100%]"
                                  style={{
                                    boxShadow:
                                      "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
                                  }}
                                >
                                  <div
                                    className="flex items-center max-w-[90%] min-w-[90%]"
                                    style={{
                                      justifyContent: "space-between",
                                      marginRight: "1rem",
                                    }}
                                  >
                                    <div
                                      className={`flex gap-x-3 items-center ${
                                        index === serviceIndex &&
                                        "font-Lato font-semibold text-[16px] leading-5"
                                      }`}
                                    >
                                      <input
                                        type="radio"
                                        value={service.partnerName}
                                        className="!w-4"
                                        readOnly={true}
                                        checked={index === serviceIndex}
                                        onChange={(e: any) =>
                                          handleService(index)
                                        }
                                      />
                                      {capitalizeFirstLetter(
                                        service.partnerName
                                      ) +
                                        " " +
                                        capitalizeFirstLetter(
                                          service.serviceMode
                                        )}
                                    </div>
                                    <div
                                      className={`${
                                        index === serviceIndex &&
                                        "font-semibold"
                                      }`}
                                    >
                                      {service.total}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                        {/* not needed */}
                        {/* <div className="flex justify-end">
                          <OneButton
                            text={"Save Services"}
                            variant="primary"
                            className="!w-[120px] mt-4"
                            onClick={() => setServices()}
                          />
                        </div> */}
                      </div>
                    )}
                  </div>
                </div>
              )
            : enableShowServicesOption &&
              serviceAccordian && (
                <div className="mx-4 border-b border-l border-r rounded-lg">
                  <div className="mx-4 py-4">
                    <div className="bg-gray-50">
                      <div className="flex flex-col border-[1.5px] gap-y-2 pl-4 py-2">
                        <div className="flex justify-between">
                          <p className="text-base mt-2">Partner Name</p>
                          <p className="text-base mt-2 mr-4">
                            {completeData?.service?.partnerName}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-base">Service Mode</p>
                          <p className="text-base mr-4">
                            {completeData?.service?.serviceMode}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-base">Applied Weight</p>
                          <p className="text-base mr-4">
                            {completeData?.service?.appliedWeight}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-base">Freight Charges</p>
                          <p className="text-base mr-4">
                            {completeData?.service?.appliedWeight}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-base">Other Charges</p>
                          <p className="text-base mr-4">
                            {completeData?.service?.appliedWeight}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-base">COD Charges</p>
                          <p className="text-base mr-4">
                            {completeData?.service?.cod}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-base">Insurance</p>
                          <p className="text-base mr-4">
                            {completeData?.service?.insurance}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-base">Tax</p>
                          <p className="text-base mr-4">
                            {completeData?.service?.tax}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-base mb-2">Total</p>
                          <p className="text-base mb-2 mr-4">
                            {completeData?.service?.total}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
        </div>
      </div>
    </div>
  );
};

export default Services;
