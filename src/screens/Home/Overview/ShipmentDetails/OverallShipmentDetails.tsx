import React from "react";
import ReactApexChart from "react-apexcharts";
import LateTruckIcon from "../../../../assets/Menu.svg";
import ComingSoonGif from "../../../../assets/Coming Soon.gif";
interface IOverallShipmentDetailsProps {
  series?: any;
  options?: any;
}

const OverallShipmentDetails: React.FunctionComponent<
  IOverallShipmentDetailsProps
> = (props) => {
  const {
    series = [5, 6, 1, 0.5, 0.5],
    options = {
      labels: ["Delivered", "NDR", "RTO", "Lost/Damaged", "Reverse"],
    },
  } = props;
  return (
    <>
      <div className="h-full">
        <div className="h-full flex flex-col ">
          <div className="rounded-tr-xl rounded-tl-xl px-4  h-[50px] bg-[#F6F6F6] ">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img src={LateTruckIcon} className="px-2" alt="" />
                <span className="font-Open text-base font-semibold leading-[22px] text-[#1C1C1C]">
                  {"Overall Shipment Status"}
                </span>
              </div>
              <div className="pt-2">
                <div className="!h-9"></div>
              </div>
            </div>
          </div>
          <div className=" h-full flex-1  border-[#E8E8E8] border-x-[1px] border-b-[1px] rounded-b-xl pr-2 !shadow-[0px_0px_0px_0px_rgba(133,133,133,0.05),0px_6px_13px_0px_rgba(133,133,133,0.05)] ">
            {/* <ReactApexChart
              type="donut"
              series={series}
              options={options}
              height={398}
            /> */}
            <div className="flex flex-col justify-center items-center">
              <img
                src={ComingSoonGif}
                alt="Feature Coming Soon"
                width={250}
                height={250}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverallShipmentDetails;
