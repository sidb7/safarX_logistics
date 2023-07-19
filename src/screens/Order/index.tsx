import { OrderCard } from "./OrderCard";
import CustomButton from "../../components/Button";
import AddOrderIcon from "../../assets/Order/AddOrder.svg";
import BlukOrderIcon from "../../assets/Order/BlukOrderIcon.svg";
import SyncIcon from "../../assets/Order/SyncIcon.svg";
import BackArrowIcon from "../../assets/backArrow.svg";
import { OrderStatus } from "./OrderStatus";
import { OrderDetails } from "./OrderDetails";
import DeliveryGIF from "../../assets/OrderCard/Gif.gif";

const ArrowNavigator = () => {
  return (
    <div className="flex items-center mb-4 lg:mb-0 lg:text-[28px] lg:font-semibold">
      <div className="inline-flex space-x-2 items-center justify-start ">
        <img src={BackArrowIcon} alt="" />
        <p className="text-lg font-semibold text-center text-gray-900 ">
          Orders
        </p>
      </div>
    </div>
  );
};

const Buttons = (className?: string) => {
  return (
    <div
      className={
        className
          ? className
          : `lg:flex lg:flex-row-reverse hidden grid-cols-4 gap-x-2 mt-4 lg:mt-0 h-[54px] items-center`
      }
    >
      <div className="grid col-span-2">
        <CustomButton
          className="lg:px-2 lg:py-4 lg:font-semibold lg:text-[14px]"
          text="ADD ORDER"
          onClick={() => {}}
          showIcon={true}
          icon={AddOrderIcon}
        />
      </div>

      <div className="flex flex-col items-center justify-center lg:px-2 lg:py-4 lg:border-[1px] lg:rounded-md lg:border-[#A4A4A4] lg:flex-row lg:space-x-2 lg:h-[36px]">
        <img src={SyncIcon} alt="" width="16px" />
        <span className="text-[#004EFF] text-[10px] whitespace-nowrap lg:font-semibold lg:text-[14px] lg:text-[#1C1C1C]">
          SYNC CHANNEL
        </span>
      </div>

      <div className="flex flex-col items-center justify-center lg:px-2 lg:py-4 lg:border-[1px] lg:rounded-md lg:border-[#A4A4A4] lg:flex-row lg:space-x-2 lg:h-[36px]">
        <img src={BlukOrderIcon} alt="" width="16px" />
        <span className="text-[#004EFF] text-[10px] whitespace-nowrap lg:font-semibold lg:text-[14px] lg:text-[#1C1C1C]">
          BLUK UPLOAD
        </span>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <div className="mx-4">
      <div className="flex flex-col gay-y-4">
        <div className="flex lg:justify-between">
          {ArrowNavigator()}
          {Buttons()}
        </div>
        <div className="lg:mt-[29px] lg:flex lg:gap-x-5">
          <OrderCard
            gif={DeliveryGIF}
            showGif={true}
            label="Today's delivery"
            number="23"
          />
          <OrderCard
            label="COD"
            number="2,000"
          />
          {/* <OrderCard
            gif={DeliveryGIF}
            showGif={true}
            label="Online Payment"
            number="23,000"
          /> */}
          <OrderCard
            label="Success Rate"
            number="5%"
          />
        </div>
        {Buttons(
          "lg:hidden grid grid-cols-4 gap-x-2 mt-4 h-[54px] items-center"
        )}
      </div>

      <OrderStatus />
      <OrderDetails />
      <OrderDetails />
      <OrderDetails />
    </div>
  );
};

export default Index;
