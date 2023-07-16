import { OrderCard } from "./OrderCard";
import CustomButton from "../../components/Button";
import AddOrderIcon from "../../assets/Order/AddOrder.svg";
import BlukOrderIcon from "../../assets/Order/BlukOrderIcon.svg";
import SyncIcon from "../../assets/Order/SyncIcon.svg";
import { OrderStatus } from "./OrderStatus";
import { OrderDetails } from "./OrderDetails";

const Index = () => {
  return (
    <div className="mx-4">
      <div className="mt-4">
        <OrderCard />
      </div>

      <div className="grid grid-cols-4 gap-x-2 mt-4 h-[54px] items-center">
        <div className="grid col-span-2">
          <CustomButton
            text="ADD ORDER"
            onClick={() => {}}
            showIcon={true}
            icon={AddOrderIcon}
          />
        </div>

        <div className="flex flex-col items-center justify-center">
          <img src={SyncIcon} alt="" width="16px" />
          <span className="text-[#004EFF] text-[10px]">SYNC CHANNEL</span>
        </div>

        <div className="flex flex-col items-center justify-center">
          <img src={BlukOrderIcon} alt="" width="16px" />
          <span className="text-[#004EFF] text-[10px]">BLUK UPLOAD</span>
        </div>
      </div>

      <OrderStatus />

      <OrderDetails />
      <OrderDetails />
      <OrderDetails />
    </div>
  );
};

export default Index;
