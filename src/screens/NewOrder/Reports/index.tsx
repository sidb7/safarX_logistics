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
import { toast } from "react-toastify";
import { convertXMLToXLSX } from "../../../utils/helper";

const Reports = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [reportValue, setReportValue] = useState<any>();
  const [isActive, setIsActive] = useState<any>(false);
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
    {
      label: "NDR Report",
      value: "NDRSTATUS",
    },
    {
      label: "PRODUCT WISE STATUS",
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

        const response = await POST(GET_REPORTS, payload);
        // const apiData = response.data;
        if (!response?.data?.success) {
          toast.error(response?.data?.message);
          return;
        }
        const date: any = JSON.stringify(new Date());
        const result = await convertXMLToXLSX(
          response?.data?.data,
          `${reportValue}${date
            .substr(1, 10)
            .split("-")
            .reverse()
            .join("-")}.xlsx`
        );
        if (result) {
          toast.success(response?.data?.message);
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
            <div className=" w-[350px] md:w-[250px]">
              <CustomDropDown
                heading="Select Report Type"
                value={reportValue}
                options={reportMenu}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                  setReportValue(event.target.value);
                }}
              />
            </div>
            <div className="w-[350px]">
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
                className="cursor-pointer border-solid border-2 !w-[350px] datepickerCss border-sky-500 p-6"
                dateFormat="dd/MM/yyyy"
              />
            </div>
            <ServiceButton
              text={"FETCH REPORT"}
              className={`bg-[#1C1C1C] text-[#FFFFFF] py-3 w-[200px]`}
              onClick={() => fetchReport()}
            />
          </div>
        </div>
      ) : (
        <AccessDenied />
      )}
    </>
  );
};
export default Reports;
