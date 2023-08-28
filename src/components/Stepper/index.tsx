import React from "react";

interface Step {
  label: string;
  isCompleted: boolean;
  isActive: boolean;
  imgSrc: any;
}

interface StepperProps {
  steps: Step[];
}

const Stepper: React.FC<StepperProps> = ({ steps }) => {
  return (
    <div className="w-full ">
      <div className="flex">
        {steps?.map((step, index) => (
          <div key={index} className="w-1/4">
            <div className="relative mb-2">
              {index !== 0 && (
                <div
                  className="absolute flex align-center items-center align-middle content-center"
                  style={{
                    width: "calc(100% - 2.5rem - 1rem)",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                    <div
                      className={`w-0 py-[2px] rounded ${
                        step.isActive || step.isCompleted ? "bg-[#A4A4A4]" : ""
                      }`}
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
              )}
              <div
                className={`w-6 h-6 mx-auto  ${
                  step.isCompleted || step.isActive
                    ? "bg-black"
                    : "  bg-[#A4A4A4] "
                } rounded-full text-lg text-white  flex items-center justify-center `}
              >
                {step.isCompleted ? <img src={step.imgSrc} alt="" /> : ""}
              </div>
            </div>
            <div
              className={`text-xs text-center font-Lato font-semibold md:text-base ${
                step.isActive || step.isCompleted ? "" : "text-[#A4A4A4]"
              }`}
            >
              {step.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
