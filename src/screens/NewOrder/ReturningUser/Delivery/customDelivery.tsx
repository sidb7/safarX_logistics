import Checkbox from "../../../../components/CheckBox";

interface IPickupData {
  props: {
    locationImage: any;
    header: string;
    editImage: any;
    text: string;
    address: string;
  }[];
}

const CustomDelivery: React.FunctionComponent<IPickupData> = ({ props }) => {
  return (
    <>
      <div className="p-[12px] shadow-lg rounded-lg border-[1px] border-[#E8E8E8] bg-[#FFFFFF]  my-4">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-[11px]">
            <img src={props[0].locationImage} alt="" className="w-4 h-4" />
            <p className="text-[14px] font-medium">{props[0].header}</p>
          </div>
          <div>
            <img src={props[0].editImage} alt="" className="w-5 h-5" />
          </div>
        </div>
        {props?.map((each: any, index: any) => {
          return (
            <div key={index}>
              <div className="flex items-center mt-5">
                <Checkbox checkboxClassName="gap-2" />
                <span className="text-[12px] text-[#3371FF] font-medium">
                  {each.text}
                </span>
              </div>
              <div>
                <p className="text-[12px] font-normal ml-7 w-[200px]">
                  {each.address}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default CustomDelivery;
