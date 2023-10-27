import CustomDropDown from "../../../components/DropDown";
import { Breadcrum } from "../../../components/Layout/breadcrum";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ServiceButton from "../../../components/Button/ServiceButton";
import { POST } from "../../../utils/webService";

const Reports = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [reportValue, setReportValue] = useState<any>();

  const reportMenu = [
    {
      label: "Select Report Type",
      value: "Select Report Type",
    },
    {
      label: "Shipment Status Report",
      value: "Shipment Status Report",
    },
    {
      label: "COD Report",
      value: "COD Report",
    },
    {
      label: "RTO OFD Report",
      value: "RTO OFD Report",
    },
    {
      label: "RTO Physical Receivied Report",
      value: "RTO Physical Receivied Report",
    },
    {
      label: "RTO Reconciliation Report",
      value: "RTO Reconciliation Report",
    },
    {
      label: "Not Picked Report",
      value: "Not Picked Report",
    },
    {
      label: "Physical Picked Report",
      value: "Physical Picked Report",
    },
    {
      label: "Reconciliation Report",
      value: "Reconciliation Report",
    },
    {
      label: "Channel Module Report",
      value: "Channel Module Report",
    },
  ];

  const convertEpoch = (epochDate: any) => {
    return epochDate.getTime();
  };

  const fetchReport = async () => {
    let startEpoch = convertEpoch(startDate && startDate);
    let endEpoch = convertEpoch(endDate && endDate);
    // const { data } = await POST(GET_CATEGOROIES, {});
    // if (data?.success) {
    // }
  };

  return (
    <>
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
            isClearable={true}
            placeholderText="Select From & To Date"
            className="cursor-pointer border-solid border-2 !w-[350px] datepickerCss border-sky-500"
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <ServiceButton
          text={"FETCH REPORT"}
          className={`bg-[#1C1C1C] text-[#FFFFFF] py-3 w-[200px]`}
          onClick={() => fetchReport()}
        />
      </div>
      {/* ) : (
        <div>
          <AccessDenied />
        </div>
      )} */}
    </>
  );
};
export default Reports;
