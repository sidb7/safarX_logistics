// import React from "react";
// import "./ExactStepper.css"; // Make sure to create this CSS file

// export type Step = {
//   id: string | number;
//   title: string;
//   description?: string;
// };

// export interface ExactStepperProps {
//   steps: Step[];
//   activeStep: number;
//   setActiveStep: (step: number) => void;
//   className?: string;
// }

// export const ExactStepper = ({
//   steps,
//   activeStep,
//   setActiveStep,
//   className,
// }: ExactStepperProps) => {
//   const handleStepClick = (index: number) => {
//     // Only allow clicking on previous steps or the current step + 1
//     if (index <= activeStep || index === activeStep + 1) {
//       setActiveStep(index);
//     }
//   };

//   return (
//     <div className={`stepper ${className || ""}`}>
//       {steps.map((step, index) => {
//         const stepNumber = index + 1;
//         const isActive = stepNumber === activeStep;
//         const isCompleted = stepNumber < activeStep;
//         const isLast = index === steps.length - 1;
        
//         return (
//           <div
//             key={step.id}
//             className={`step ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""}`}
//             onClick={() => {
//               if (isCompleted || stepNumber === activeStep + 1) {
//                 handleStepClick(stepNumber);
//               }
//             }}
//             style={{
//               zIndex: steps.length - index, // Higher z-index for earlier steps
//               cursor: (isCompleted || stepNumber === activeStep + 1) ? "pointer" : "default"
//             }}
//           >
//             <div className="step-number">{stepNumber}</div>
//             <div className="step-content">
//               <div className="step-title">{step.title}</div>
//               {step.description && (
//                 <div className="step-desc">{step.description}</div>
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ExactStepper;

import React from "react";
import "./ExactStepper.css"; // Make sure to create this CSS file

export type Step = {
  id: string | number;
  title: string;
  description?: string;
};

export interface ExactStepperProps {
  steps: Step[];
  activeStep: number;
  setActiveStep: (step: number) => void;
  className?: string;
  completedSteps?: boolean[]; // New prop to track which steps are actually completed
}

export const ExactStepper = ({
  steps,
  activeStep,
  setActiveStep,
  className,
  completedSteps = [], // Default to empty array if not provided
}: ExactStepperProps) => {
  const handleStepClick = (index: number) => {
    const stepNumber = index + 1;
    
    // Allow clicking on current step
    if (stepNumber === activeStep) {
      return;
    }
    
    // Allow clicking on previous completed steps
    if (stepNumber < activeStep) {
      setActiveStep(stepNumber);
      return;
    }
    
    // Only allow clicking on next step if current step is completed
    if (stepNumber === activeStep + 1 && completedSteps[activeStep - 1]) {
      setActiveStep(stepNumber);
    }
  };

  return (
    <div className={`stepper ${className || ""}`}>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === activeStep;
        const isCompleted = completedSteps[index] || stepNumber < activeStep;
        const isPreviousCompleted = index === 0 || completedSteps[index - 1];
        const isClickable = isActive || isCompleted || (stepNumber === activeStep + 1 && isPreviousCompleted);
        
        return (
          <div
            key={step.id}
            className={`step ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""} ${!isClickable ? "disabled" : ""}`}
            onClick={() => {
              if (isClickable) {
                handleStepClick(index);
              }
            }}
            style={{
              zIndex: steps.length - index, // Higher z-index for earlier steps
              cursor: isClickable ? "pointer" : "not-allowed"
            }}
          >
            <div className="step-number">
              {isCompleted && stepNumber < activeStep ? (
                <svg className="tick-mark" viewBox="0 0 24 24" width="16" height="16">
                  <path 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    d="M20 6L9 17l-5-5"
                    className="tick-path"
                  />
                </svg>
              ) : (
                stepNumber
              )}
            </div>
            <div className="step-content">
              <div className="step-title">{step.title}</div>
              {step.description && (
                <div className="step-desc">{step.description}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExactStepper;