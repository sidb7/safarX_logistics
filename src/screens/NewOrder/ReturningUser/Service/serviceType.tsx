import Checkbox from "../../../../components/CheckBox";

interface IServiceData {
  props: {
    serviceType: string;
    servicePrice: string;
    serviceSpan: string;
    serviceETA: string;
  }[];
}
const ServiceType: React.FunctionComponent<IServiceData> = ({ props }) => {
  return (
    <>
      {props?.map((each, index) => {
        return (
          <div
            className="p-[12px] shadow-lg rounded-lg border-[1px] border-[#E8E8E8] bg-[#FFFFFF]  my-4"
            key={index}
          >
            <div className="flex items-center">
              <Checkbox checkboxClassName="gap-2" />
              <p className="text-[16px] font-medium">{each.serviceType}</p>
            </div>
            <div className="flex">
              <p className="text-[14px] font-medium ml-1">
                {each.servicePrice}
              </p>
              <p className="text-[14px] ml-1 text-[#004EFF]">
                {each.serviceSpan}
              </p>
            </div>
            <div>
              <p className="text-[14px] text-[#004EFF] ml-1">
                {each.serviceETA}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default ServiceType;
