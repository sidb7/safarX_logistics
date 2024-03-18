import React, { useEffect, useState } from "react";
import CrossIcon from "../../assets/CloseIcon.svg";
import GroupRadioButtons from "../../components/GroupRadioButtons/GroupRadioButtons";
import CustomInputBox from "../../components/Input";
import CustomDropDown from "../../components/DropDown";
import ServiceButton from "../../components/Button/ServiceButton";
import { DropDownWeightData } from "../../utils/dummyData";

import { createColumnHelper } from "@tanstack/react-table";
import { CustomTable } from "../../components/Table";
import { Spinner } from "../../components/Spinner";
import {
  date_DD_MMM,
  date_DD_MMM_YYY,
  date_DD_MMM_YYYY_HH_MM,
} from "../../utils/dateFormater";

interface ITypeProps {
  onClick: () => void;
  servicesData: any;
  serviceabilityData: any;
  setServiceabilityData: any;
  onSubmitServiceability: any;
  clearServiceabilityState: any;
  showTable?: boolean;
  serviceabilityTableData?: any;
  loader?: boolean;
  setServiceabilityTableData?: any;

  setShowTable: any;
}

const Serviceability = (props: ITypeProps) => {
  const {
    onClick,
    servicesData,
    serviceabilityData,
    setServiceabilityData,
    onSubmitServiceability,
    clearServiceabilityState,
    serviceabilityTableData,
    setServiceabilityTableData,
    showTable,
    setShowTable,
    loader,
  } = props;
  const columnsHelper = createColumnHelper<any>();

  // const [serviceValue, setServiceValue] = useState(
  //   serviceabilityData?.orderType
  // );
  const [serviceValue, setServiceValue] = useState("B2C");

  const [servicesDataArray, setServicesDataArray] = useState<any>();

  const weightData: any = [];
  let temp: any = [];

  useEffect(() => {
    servicesData &&
      servicesData?.map((eachData: any, index: number) => {
        if (eachData?.type === serviceValue) {
          let newData = {
            label: eachData.serviceName + " - " + eachData.serviceMode,
            value: eachData.serviceId,
          };
          temp.push(newData);
        }
      });
    setServicesDataArray(temp);
  }, [servicesData, serviceValue]);

  function validateData(data: any) {
    // Check if any of the required fields are empty
    if (
      !data?.pickupPincode ||
      !data?.deliveryPincode ||
      !data?.paymentMode ||
      !data?.weight ||
      !data?.orderType ||
      !data?.dimension ||
      !data?.dimension.width ||
      !data?.dimension.height ||
      !data?.dimension.length
      // !data?.invoiceValue ||
      // !data?.serviceId ||
    ) {
      return false;
    }
    return true;
  }

  const columns = [
    columnsHelper.accessor("partnerName", {
      header: () => {
        return (
          <p className=" flex items-center justify-start font-Open text-sm font-semibold leading-[18px] text-[#004EFF] whitespace-nowrap ">
            Partner Name
          </p>
        );
      },

      cell: (info: any) => {
        return (
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 whitespace-nowrap ">
            {info.row?.original?.partnerName}
          </p>
        );
      },
    }),
    columnsHelper.accessor("companyServiceName", {
      header: () => {
        return (
          <p className="font-Open flex items-center justify-start text-sm font-semibold leading-[18px] text-[#004EFF] text-start whitespace-nowrap ">
            {"Service Name"}
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 whitespace-nowrap ">
            {info.row?.original?.companyServiceName}
          </div>
        );
      },
    }),
    columnsHelper.accessor("appliedWeight", {
      header: () => {
        return (
          <p className="font-Open flex items-center justify-start text-sm font-semibold leading-[18px] text-[#004EFF] text-start whitespace-nowrap ">
            {"Weight"}
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 whitespace-nowrap">
            {info.row?.original?.appliedWeight}
          </div>
        );
      },
    }),
    columnsHelper.accessor("one", {
      header: () => {
        return (
          <p className="font-Open flex items-center justify-start text-sm font-semibold leading-[18px] text-[#004EFF] text-start whitespace-nowrap ">
            {"Zone"}
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 whitespace-nowrap">
            {info.row?.original?.zone}
          </div>
        );
      },
    }),
    columnsHelper.accessor("cod", {
      header: () => {
        return (
          <p className="font-Open flex justify-start items-center text-sm font-semibold leading-[18px] text-[#004EFF] text-start whitespace-nowrap ">
            {"COD"}
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 whitespace-nowrap">
            {info.row?.original?.cod}
          </div>
        );
      },
    }),
    columnsHelper.accessor("insurance", {
      header: () => {
        return (
          <p className="font-Open flex justify-start items-center text-sm font-semibold leading-[18px] text-[#004EFF] text-start whitespace-nowrap ">
            {"Insurance"}
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 whitespace-nowrap">
            {info.row?.original?.insurance}
          </div>
        );
      },
    }),
    columnsHelper.accessor("gst", {
      header: () => {
        return (
          <p className="font-Open flex justify-start items-center text-sm font-semibold leading-[18px] text-[#004EFF] text-start whitespace-nowrap ">
            {"GST"}
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 whitespace-nowrap">
            {info.row?.original?.gst || "---"}
          </div>
        );
      },
    }),
    columnsHelper.accessor("total", {
      header: () => {
        return (
          <p className="font-Open flex justify-start items-center text-sm font-semibold leading-[18px] text-[#004EFF] text-start whitespace-nowrap ">
            {"Total"}
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 whitespace-nowrap">
            {info.row?.original?.total}
          </div>
        );
      },
    }),
    columnsHelper.accessor("edt_epoch", {
      header: () => {
        return (
          <p className="font-Open flex justify-start items-center text-sm font-semibold leading-[18px] text-[#004EFF] text-start whitespace-nowrap ">
            {"EDD"}
          </p>
        );
      },
      cell: (info: any) => {
        console.log("EDT_Epoch", info.row?.original?.EDT_Epoch);
        return (
          <div className="flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 whitespace-nowrap">
            {info.row?.original?.EDT_Epoch
              ? date_DD_MMM_YYYY_HH_MM(info.row?.original?.EDT_Epoch)
              : "---"}
          </div>
        );
      },
    }),
  ];

  //Setting drop down weight data
  const setWeightData = () => {
    return DropDownWeightData.map((eachWeight, index) => {
      weightData.push({ label: eachWeight, value: eachWeight });
    });
  };

  setWeightData();

  const tableComponent = () => {
    return (
      <div className="customScroll h-full m-5">
        <CustomTable
          data={serviceabilityTableData}
          columns={columns}
          thclassName={"bg-white"}
          tdclassName={"bg-white"}
        />
      </div>
    );
  };

  return (
    <>
      {loader ? (
        <div className="flex justify-center items-center h-full">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col h-full w-full relative ">
          <div className="flex justify-between p-5">
            <p className="font-Open text-base text-[#004eff] font-semibold">
              {`${showTable ? "Availability & Pricing" : "Check Availability"}`}
            </p>
            <img
              src={CrossIcon}
              alt=""
              onClick={() => {
                onClick();
                if (showTable) {
                  setShowTable(false);
                }
              }}
              className="cursor-pointer"
            />
          </div>
          <hr />

          {showTable ? (
            tableComponent()
          ) : (
            <div className="h-full">
              <div className="flex items-center justify-start  p-5">
                <GroupRadioButtons
                  options={[
                    { text: "B2C", value: "B2C" },
                    // { text: "B2B", value: "B2B" },
                  ]}
                  value={serviceValue}
                  selectedValue={setServiceValue}
                />
              </div>
              <div className="grid grid-cols-2 gap-5 px-5">
                <CustomInputBox
                  label="Pickup Pincode"
                  value={serviceabilityData?.pickupPincode}
                  onChange={(e: any) => {
                    if (isNaN(e.target.value)) {
                    } else {
                      setServiceabilityData({
                        ...serviceabilityData,
                        pickupPincode: +e.target.value
                          ? Number(e.target.value)
                          : "",
                      });
                    }
                  }}
                />
                <CustomInputBox
                  label="Delivery Pincode"
                  value={serviceabilityData?.deliveryPincode}
                  onChange={(e: any) => {
                    if (isNaN(e.target.value)) {
                    } else {
                      setServiceabilityData({
                        ...serviceabilityData,
                        deliveryPincode: +e.target.value
                          ? Number(e.target.value)
                          : "",
                      });
                    }
                  }}
                />
                <CustomDropDown
                  onChange={(e: any) => {
                    setServiceabilityData({
                      ...serviceabilityData,
                      paymentMode: e.target.value,
                    });
                  }}
                  value={serviceabilityData?.paymentMode}
                  options={[
                    {
                      label: "COD",
                      value: "COD",
                    },
                    {
                      label: "Prepaid",
                      value: "PREPAID",
                    },
                  ]}
                  heading="Payment Mode"
                />
                <CustomDropDown
                  onChange={(e: any) => {
                    setServiceabilityData({
                      ...serviceabilityData,
                      weight: e.target.value ? Number(e.target.value) : "",
                    });
                  }}
                  value={serviceabilityData?.weight}
                  options={weightData}
                  heading="Select Weight(KG)"
                />
                <CustomDropDown
                  onChange={(e: any) => {
                    setServiceabilityData({
                      ...serviceabilityData,
                      serviceId: e.target.value,
                    });
                  }}
                  value={serviceabilityData?.serviceId}
                  options={servicesDataArray}
                  heading="Select Service"
                />
                <CustomInputBox
                  label="Invoice Value"
                  value={serviceabilityData?.invoiceValue}
                  onChange={(e: any) => {
                    if (isNaN(e.target.value)) {
                    } else {
                      setServiceabilityData({
                        ...serviceabilityData,
                        invoiceValue: +e.target.value
                          ? Number(e.target.value)
                          : "",
                      });
                    }
                  }}
                />
              </div>
              <div className="grid grid-cols-3 p-5 gap-5">
                <CustomInputBox
                  label="Length (CM)"
                  value={serviceabilityData?.dimension?.length}
                  onChange={(e: any) => {
                    if (isNaN(e.target.value)) {
                    } else {
                      let temp = serviceabilityData;
                      if (temp && temp.dimension)
                        temp.dimension.length = +e.target.value
                          ? Number(e.target.value)
                          : "";

                      setServiceabilityData({
                        ...temp,
                      });
                    }
                  }}
                />
                <CustomInputBox
                  label="Height (CM)"
                  value={serviceabilityData?.dimension?.height}
                  onChange={(e: any) => {
                    if (isNaN(e.target.value)) {
                    } else {
                      let temp = serviceabilityData;
                      if (temp && temp.dimension)
                        temp.dimension.height = +e.target.value
                          ? Number(e.target.value)
                          : "";

                      setServiceabilityData({
                        ...temp,
                      });
                    }
                  }}
                />
                <CustomInputBox
                  label="Width (CM)"
                  value={serviceabilityData?.dimension?.width || ""}
                  inputMode="numeric"
                  onChange={(e: any) => {
                    if (isNaN(e.target.value)) {
                    } else {
                      let temp = serviceabilityData;
                      if (temp && temp.dimension)
                        temp.dimension.width = +e.target.value
                          ? Number(e.target.value)
                          : "";

                      setServiceabilityData({
                        ...temp,
                      });
                    }
                  }}
                />
              </div>
            </div>
          )}
          <div>
            <hr />
            <div className="flex items-center justify-end p-5">
              {showTable ? (
                <div className="flex items-center space-x-2">
                  <ServiceButton
                    text={"Back"}
                    className="!p-2 !w-[120px] !text-[#ffffff] !bg-[#1c1c1c]"
                    onClick={() => {
                      setShowTable(false);
                      clearServiceabilityState();
                      setServiceabilityTableData([]);
                    }}
                  />
                  <ServiceButton
                    text={"Close"}
                    className="!p-2 !w-[120px] !text-[#ffffff] !bg-[#1c1c1c]"
                    onClick={() => {
                      onClick();
                      setShowTable(false);
                    }}
                  />
                </div>
              ) : (
                <ServiceButton
                  text={"Submit"}
                  onClick={() => {
                    if (validateData(serviceabilityData)) {
                      onSubmitServiceability({
                        ...serviceabilityData,
                        orderType: serviceValue,
                      });
                      clearServiceabilityState();
                    }
                  }}
                  className={`!p-2 !w-[120px] !text-[#ffffff] ${
                    validateData(serviceabilityData)
                      ? "!bg-[#1c1c1c]"
                      : "!bg-[#D2D2D2] border-none cursor-not-allowed"
                  }`}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Serviceability;
