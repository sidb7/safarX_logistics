import GIF from "../../../assets/OrderCard/Gif.gif"
export const OrderCard = () => {
  return (
    <div className="relative">
      <div className="flex border-[1px] border-[#A4A4A4] rounded-md h-[96px]">
        <div className="flex flex-col justify-center ">
          <span className="ml-4 text-base font-medium">Today's delivery</span>
          <span className="ml-4 mt-2.5 text-base font-bold text-[#004EFF]">
            0
          </span> 
        </div>
        <div className="absolute bottom-0 right-8 z-1">
          <img src={GIF} alt="" width="124px"/>
        </div>
      </div>
    </div>
  );
};
