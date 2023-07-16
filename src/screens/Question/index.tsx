import { QuestionComponent1 } from "./question";
import { WelcomeQuestion } from "./welcome";

export const AccountQuestion = () => {
  return (
    <div className="mx-4">
      <WelcomeQuestion label="For account activation kindly complete the KYC" />
      <QuestionComponent1 />
    </div>
  );
};
