import CustomDropDown from "../../../components/DropDown";
import { Breadcrum } from "../../../components/Layout/breadcrum";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ServiceButton from "../../../components/Button/ServiceButton";
import { POST } from "../../../utils/webService";
import { GET_REPORTS } from "../../../utils/ApiUrls";
import AccessDenied from "../../../components/AccessDenied";
import { checkPageAuthorized } from "../../../redux/reducers/role";
import { toast } from "react-hot-toast";
import { convertXMLToXLSX } from "../../../utils/helper";
import { capitalizeFirstLetter } from "../../../utils/utility";
import { Spinner } from "../../../components/Spinner";
import OneButton from "../../../components/Button/OneButton";

const Reports = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [reportValue, setReportValue] = useState<any>();
  const [isActive, setIsActive] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<any>(false);

  const [dataset, setDataset] = useState<any>();
  const reportMenu = [
    {
      label: "Shipment Status Report",
      value: "SHIPMENTSTATUS",
    },
    {
      label: "Shipment Error Report",
      value: "ERRORSHIPMENTSTATUS",
    },
    {
      label: "NPR Report",
      value: "NPRSTATUS",
    },
    // {
    //   label: "NDR Report",
    //   value: "NDRSTATUS",
    // },
    {
      label: "Product Wise Status",
      value: "PRODUCTWISESTATUS",
    },
  ];

  const convertEpoch = (epochDate: any) => {
    return epochDate?.getTime() || "";
  };

  const reportEndDate = new Date();

  const isDateDisabled = (date: any) => {
    return date <= reportEndDate;
  };

  const fetchReport = async () => {
    // console.log("startandenddate", startDate, endDate);

    if (reportValue === "" || reportValue === undefined) {
      toast.error("Please Select Report Type");
    } else {
      if (startDate === null && endDate === null) {
        toast.error("Please Select Start and End Date");
      } else if (endDate === null) {
        toast.error("Please Select End Date");
      } else {
        const endEpoch: any = endDate;
        endEpoch.setHours(23, 59, 59, 59);
        const lastendEpoch = endEpoch?.getTime();
        const payload = {
          startDate: convertEpoch(startDate),
          endDate: lastendEpoch,
          apiStatus: reportValue,
        };
        setIsLoading(true);
        const response = await POST(GET_REPORTS, payload);
        // const apiData = response.data;
        if (!response?.data?.success) {
          toast.error(response?.data?.message);
          setIsLoading(false);
          return;
        }
        const date: any = JSON.stringify(new Date());
        const result = await convertXMLToXLSX(
          response?.data?.data,
          `${capitalizeFirstLetter(reportValue)}${date
            .substr(1, 10)
            .split("-")
            .reverse()
            .join("-")}.xlsx`
        );
        if (result) {
          toast.success(response?.data?.message);
          setIsLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    setIsActive(checkPageAuthorized("Reports"));
  }, [isActive]);

  return (
    <>
      {isActive === undefined || isActive ? (
        <div>
          <div className="w-full">
            <Breadcrum label="Reports" />
          </div>
          <div className="p-4 flex flex-wrap gap-2">
            <div className=" w-[350px] md:w-[250px]  ">
              <div className=" h-14">
                <CustomDropDown
                  heading="Select Report Type"
                  value={reportValue}
                  options={reportMenu}
                  onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                    setReportValue(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="w-[350px] h-6">
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update: any) => {
                  setDateRange(update);
                }}
                filterDate={isDateDisabled}
                isClearable={true}
                placeholderText="Select From & To Date"
                className="cursor-pointer border !w-[350px] datepickerCss border-[#AFAFAF] p-6 !h-12"
                dateFormat="dd/MM/yyyy"
              />
            </div>
            {isLoading ? (
              <div className="border py-2 w-[200px] flex items-center justify-center ">
                <Spinner />
              </div>
            ) : (
              // <ServiceButton
              //   text={"FETCH REPORT"}
              //   className={`bg-[#1C1C1C] text-[#FFFFFF] py-3 w-[200px]`}
              //   onClick={() => fetchReport()}
              // />
              <OneButton
                onClick={() => fetchReport()}
                text="FETCH REPORT"
                className=" px-3 py-6  w-[200px]"
                variant="primary"
              />
            )}
          </div>
        </div>
      ) : (
        <AccessDenied />
      )}
    </>
  );
};
export default Reports;
