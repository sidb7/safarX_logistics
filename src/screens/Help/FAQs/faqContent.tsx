import React, { useState } from "react";

// Define a type for FAQ data
type FAQData = {
  [key: string]: { question: string; answer: string }[];
};

interface FAQContentProps {
  faqType: string;
}

const FAQContent: React.FC<FAQContentProps> = ({ faqType }) => {
  const faqData: FAQData = {
    All: [
      { question: "Question 1", answer: "Answer 1" },
      { question: "Question 2", answer: "Answer 2" },
    ],
    Order: [
      { question: "Order Question 1", answer: "Order Answer 1" },
      { question: "Order Question 2", answer: "Order Answer 2" },
    ],
    Billing: [
      { question: "Billing Question 1", answer: "Billing Answer 1" },
      { question: "Billing Question 2", answer: "Billing Answer 2" },
    ],
    Plan: [
      { question: "Plan Question 1", answer: "Plan Answer 1" },
      { question: "Plan Question 2", answer: "Plan Answer 2" },
    ],
    Help: [
      { question: "Help Question 1", answer: "Help Answer 1" },
      { question: "Help Question 2", answer: "Help Answer 2" },
    ],
  };

  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);

  const toggleQuestion = (question: string) => {
    setActiveQuestion(activeQuestion === question ? null : question);
  };

  return (
    <div>
      {faqData[faqType]?.map((faq, index) => (
        <div key={index} className="mb-4 mt-4">
          <div
            className={`flex justify-between items-center cursor-pointer ${
              activeQuestion === faq.question ? "bg-[#E8E8E8]" : "bg-white"
            } rounded-lg w-[1148px] h-[48px] border-r-0 border-b-2 border-t-1 border-l-0 border-[#E8E8E8] gap-2 p-4 ${
              activeQuestion === faq.question
                ? "border-r-1 border-[#E8E8E8] "
                : ""
            }`}
            onClick={() => toggleQuestion(faq.question)}
          >
            <p className="font-medium text-lg ">{faq.question}</p>
            <svg
              className={`w-6 h-6 ${
                activeQuestion === faq.question ? "transform rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          {activeQuestion === faq.question && (
            <p className="mt-2 ml-8">{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQContent;
