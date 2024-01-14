import CustomButton from "../../../components/Button";
import Checkbox from "../../../components/CheckBox";

export const KycActivation = () => {
  return (
    <div>
      <div className="flex flex-col px-4 py-4 border-[1px] border-[#E8E8E8] rounded-md shadow-lg mt-[50px]">
        <div>
          <span className="text-xl font-semibold">Benefits of doing KYC</span>
        </div>
        <div className="flex flex-col items-start mt-4">
          <Checkbox label="Faster COD pay-outs" className="text-base" />
          <Checkbox label="Faster hiccup free shipping" className="text-base" />
          <Checkbox
            label="Protection against identify theft"
            className="text-base"
          />
          <Checkbox label="Regulatory compliance" className="text-base" />
        </div>
      </div>

      <div className="mt-[84px]">
        <CustomButton text="PROCEED FOR KYC" onClick={() => {}} />
      </div>

      <div className="flex justify-center text-[#004EFF] text-sm underline underline-offset-4	decoration-[#004EFF] mt-4">
        SKIP FOR NOW
      </div>

      <div className="mt-6.5 text-[#494949] text-xs mt-6">
        NOTE: KYC is mandatory for shipping orders and identification.
      </div>
    </div>
  );
};
