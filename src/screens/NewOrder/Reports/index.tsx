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
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { convertToXLSX } from "../../../utils/helper";

const Reports = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [reportValue, setReportValue] = useState<any>();
  const [isActive, setIsActive] = useState<any>(false);
  console.log("isActive", isActive);

  const reportMenu = [
    {
      label: "Shipment Status Report",
      value: "Shipment Status Report",
    },
  ];

  const convertEpoch = (epochDate: any) => {
    return epochDate.getTime();
  };

  const fetchReport = async () => {
    let startEpoch = convertEpoch(startDate);
    let endEpoch = convertEpoch(endDate);
    // const { data } = await POST(GET_CATEGOROIES, {});
    // if (data?.success) {
    // }

    /// console.log("startDate", startDate);

    const payload = {
      startDate: startEpoch,
      endDate: endEpoch,
      apiStatus: "SHIPMENTSTATUS",
    };
    const response = await POST(GET_REPORTS, payload);

    FileSaver.saveAs(
      new Blob([response.data.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
      "filename.xlsx"
    );
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
                isClearable={true}
                placeholderText="Select From & To Date"
                className="cursor-pointer border-solid border-2 !w-[350px] datepickerCss border-sky-500 p-0"
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
