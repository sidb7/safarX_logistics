import { OrderCard } from "./OrderCard";
import CustomButton from "../../components/Button";
import AddOrderIcon from "../../assets/Order/AddOrder.svg";
import BlukOrderIcon from "../../assets/Order/BlukOrderIcon.svg";
import SyncIcon from "../../assets/Order/SyncIcon.svg";
import { OrderStatus } from "./OrderStatus";
import { OrderDetails } from "./OrderDetails";
import { useState } from "react";
import ErrorFile from "./OrderStatus/errorFile"
import { insufficientBalance } from "../../utils/dummyData";

const Index = () => {
  const [filterId, setFilterId] = useState(-1);
  
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
          <span className="text-[#004EFF] text-[10px]">BULK UPLOAD</span>
        </div>
      </div>

     
     
      <OrderStatus filterId={filterId} setFilterId={setFilterId} />
      {filterId === -1  && 
        <>
          <OrderDetails />
          <OrderDetails />
          <OrderDetails />
          <ErrorFile props={insufficientBalance}/>
        </>
      }
      
      {filterId === 0 && 
      <>
        <OrderDetails />
      <OrderDetails />
      <OrderDetails />
      <ErrorFile props={insufficientBalance}/>
      </>}
    { filterId === 1 && 
    <>
      <OrderDetails />
      <OrderDetails />
      <OrderDetails />
    </>
    }
    { filterId === 2 && 
    <>
      <ErrorFile props={insufficientBalance}/>
    </>
     
  }
    </div>
  );
};

export default Index;
