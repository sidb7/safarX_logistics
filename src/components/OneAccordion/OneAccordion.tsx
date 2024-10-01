
import React, { useState } from 'react';
import accordianCloseIcon from "../../assets/AccordianCloseIcon.svg"
import accordianOpenIcon from "../../assets/AccordianOpen.svg"
import downwardArrowIcon from "../../assets/downwardArrow.svg"

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className="border border-gray-200 rounded-md mb-2">
      <button
        className="flex justify-between items-center w-full p-4 text-left"
        onClick={onToggle}
      >
        <span className="font-medium text-gray-800">{title}</span>
        <img 
          src={downwardArrowIcon} 
          className='h-4 w-4 transition-transform duration-300'
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          alt={isOpen ? "Open" : "Closed"}
        />
      </button>
      {isOpen && <div className="p-4 border border-gray-200">{children}</div>}
    </div>
  );
};

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface OneAccordionProps {
  items: AccordionItem[];
}

const OneAccordion: React.FC<OneAccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full  mx-auto">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={openIndex === index}
          onToggle={() => toggleAccordion(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

export default OneAccordion;