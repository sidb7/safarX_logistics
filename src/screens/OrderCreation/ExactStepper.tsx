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
}

export const ExactStepper = ({
  steps,
  activeStep,
  setActiveStep,
  className,
}: ExactStepperProps) => {
  const handleStepClick = (index: number) => {
    // Only allow clicking on previous steps or the current step + 1
    if (index <= activeStep || index === activeStep + 1) {
      setActiveStep(index);
    }
  };

  return (
    <div className={`stepper ${className || ""}`}>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === activeStep;
        const isCompleted = stepNumber < activeStep;
        const isLast = index === steps.length - 1;
        
        return (
          <div
            key={step.id}
            className={`step ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""}`}
            onClick={() => {
              if (isCompleted || stepNumber === activeStep + 1) {
                handleStepClick(stepNumber);
              }
            }}
            style={{
              zIndex: steps.length - index, // Higher z-index for earlier steps
              cursor: (isCompleted || stepNumber === activeStep + 1) ? "pointer" : "default"
            }}
          >
            <div className="step-number">{stepNumber}</div>
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