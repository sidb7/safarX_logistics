import Checkbox from "../../components/CheckBox";
// import WarehouseTruckGif from "../../../assets/AccountQuestions/WarehouseTruck.gif"
import WarehouseTruckGif from "../../assets/AccountQuestions/WarehouseTruck.gif";
import CargoRatingGif from "../../assets/AccountQuestions/CargoRating.gif";
import DroneDeliveryGif from "../../assets/AccountQuestions/DroneDelivery.gif";
import CustomButton from "../../components/Button";
export const QuestionComponent1 = () => {
  return (
    <div className="w-full">
      <div className="flex justify-center">
        <img src={WarehouseTruckGif} alt="" width="180px" />
      </div>
      <div className="flex flex-col px-4 py-4 border-[1px] border-[#E8E8E8] rounded-md shadow-lg mt-4">
        <div className="">
          <span className="text-xl font-semibold">
            What other services do you want?
          </span>
        </div>
        <div className="flex flex-col items-start mt-4">
          <Checkbox label="Courier" className="text-base" />
          <Checkbox label="Warehouse" className="text-base" />
          <Checkbox label="Fulfilment" className="text-base" />
        </div>
      </div>
      <div className="mt-6">
        <CustomButton text="SUBMIT" onClick={() => {}} />
      </div>
    </div>
  );
};

export const QuestionComponent2 = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col px-4 py-4 border-[1px] border-[#E8E8E8] rounded-md shadow-lg mt-[224px] lg:mt-[18px]">
        <div className="">
          <span className="text-xl font-semibold">Describe yourself</span>
        </div>
        <div className="flex flex-col items-start mt-4">
          <Checkbox
            label="Trader / wholesaler / Reseller"
            className="text-base"
          />
          <Checkbox label="D2C Brand" className="text-base" />
          <Checkbox
            label="Individual selling on marketplace"
            className="text-base"
          />
          <Checkbox label="Social seller" className="text-base" />
          <Checkbox label="Other" className="text-base" />
        </div>
      </div>
    </div>
  );
};

export const QuestionComponent3 = () => {
  return (
    <div className="w-full">
      <div className="flex justify-center">
        <img src={CargoRatingGif} alt="" width="180px" />
      </div>
      <div className="flex flex-col px-4 py-4 border-[1px] border-[#E8E8E8] rounded-md shadow-lg mt-4">
        <div className="">
          <span className="text-xl font-semibold">
            What is your monthly order volume?
          </span>
        </div>
        <div className="flex flex-col items-start mt-4">
          <Checkbox label="1-100" className="text-base" />
          <Checkbox label="100-500" className="text-base" />
          <Checkbox label="500-1000" className="text-base" />
          <Checkbox label="1000-5000" className="text-base" />
          <Checkbox label="Above 5000" className="text-base" />
        </div>
      </div>
    </div>
  );
};

export const QuestionComponent4 = () => {
  return (
    <div className="w-full">
      <div className="flex justify-center">
        <img src={DroneDeliveryGif} alt="" width="180px" />
      </div>
      <div className="flex flex-col px-4 py-4 border-[1px] border-[#E8E8E8] rounded-md shadow-lg mt-4">
        <div className="">
          <span className="text-xl font-semibold">
            How do you sell your products?
          </span>
        </div>
        <div className="flex flex-col items-start mt-4">
          <Checkbox
            label="Online Marketplaces (Amazon, Filpkart etc.)"
            className="text-base"
          />
          <Checkbox label="Own Website" className="text-base" />
          <Checkbox
            label="Social Channels (Facebook, Instagram etc.)"
            className="text-base"
          />
          <Checkbox label="Physical Store" className="text-base" />
        </div>
      </div>
      <div className="mt-6">
        <CustomButton text="SUBMIT" onClick={() => {}} />
      </div>
    </div>
  );
};

export const QuestionComponent5 = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col px-4 py-4 border-[1px] border-[#E8E8E8] rounded-md shadow-lg mt-[50px]">
        <div className="">
          <span className="text-xl font-semibold">Benefits of doing KYC</span>
        </div>
        <div className="flex flex-col items-start mt-4">
          <Checkbox label="Faster COD pay-outs" className="text-base" />
          <Checkbox label="Faster hiccup free shipping" className="text-base" />
          <Checkbox
            label="Protection against Identity Theft"
            className="text-base"
          />
          <Checkbox label="Regulatory compliance" className="text-base" />
        </div>
      </div>
      <div className="mt-6">
        <CustomButton text="PROCEED FOR KYC" onClick={() => {}} />
      </div>

      <div className="flex justify-center text-[#004EFF] text-sm underline underline-offset-4	decoration-[#004EFF] mt-4">
        SKIP FOR NOW
      </div>

      <div className="mt-6.5 text-[#494949] text-xs mt-[86px]">
        NOTE: KYC is mandatory for shipping orders and identification.
      </div>
    </div>
  );
};
