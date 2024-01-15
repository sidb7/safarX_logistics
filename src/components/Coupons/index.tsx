import React, { useEffect, useState } from "react";
import successStatus from "../../assets/success.svg";
import failureIcon from "../../assets/failure.svg";
import NavigationIcon from "../../assets/navigatorIcon.svg";
import CustomButton from "../Button";
import "../../styles/progressBar.css";

interface IIndexProps {
  // statusImage?:any
}

const Index: React.FunctionComponent<IIndexProps> = () => {
  const dataset = {
    registration: true,
    kyc: false,
    bank: false,
  };

  const [progress, setProgress] = useState(0);

  const calculateProgress = () => {
    const totalSteps = Object.keys(dataset).length;
    const completedSteps = Object.values(dataset).filter(
      (value) => value === true
    ).length;

    // Calculate progress as a percentage
    const newProgress = (completedSteps / totalSteps) * 100;
    setProgress(+newProgress.toFixed(2));
  };
  useEffect(() => {
    setTimeout(() => {
      calculateProgress();
    }, 1000);
  }, []);

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="w-[440px] border-[1px] border-[#EEEEEE] rounded-[20px] p-5 shadow-lg">
        <div className="flex-col py-[10px] justify-center items-center">
          <h1 className="font-Lato text-[22px] text-[#1C1C1C] font-semibold leading-[30px]">
            Complete KYC & Bank Verification to get{" "}
            <span className="font-Lato text-[22px] text-[#004EFF] font-semibold leading-[30px]">
              {" "}
              ₹500
            </span>{" "}
            in your wallet.
          </h1>
          <p className="text-sm font-Open text-[#828282] font-semibold leading-6 uppercase tracking-[0.28px] mt-[10px]">
            Limited Period offer
          </p>
          <div className="my-[30px]">
            {/* the progress bar to go here */}
            <div className={`progress-bar`}>
              <div
                className={` h-full bg-[#06981d] transition-all duration-700 ease-in-out rounded-sm`}
                style={{
                  width: `${progress}%`,
                }}
              ></div>
            </div>
          </div>
          <div className="">
            <div className="flex gap-x-[10px] my-8">
              <img src={successStatus} alt="" />
              <span className="font-Open text-sm leading-6 font-semibold tracking-[0.28px] uppercase">
                Registration
              </span>
            </div>
            <div className="flex justify-between mb-8">
              <div className="flex gap-x-[10px]">
                <img src={failureIcon} alt="" />
                <span className="font-Open text-sm leading-6 font-semibold tracking-[0.28px] uppercase">
                  KYC
                </span>
              </div>
              <div>
                <img src={NavigationIcon} alt="" />
              </div>
            </div>
            <div className="flex justify-between mb-8">
              <div className="flex gap-x-[10px]">
                <img src={failureIcon} alt="" />
                <span className="font-Open text-sm leading-6 font-semibold tracking-[0.28px] whitespace-nowrap uppercase">
                  Bank Verification
                </span>
              </div>
              <div>
                <img src={NavigationIcon} alt="" />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center items-center">
            <CustomButton
              text="Redeem"
              onClick={() => {}}
              className="!w-[88px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
