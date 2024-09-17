import React, { useState } from 'react';
// import { ChevronDown, ChevronUp } from 'lucide-react';
import accordianCloseIcon from "../../assets/AccordianCloseIcon.svg"
import accordianOpenIcon from "../../assets/AccordianOpen.svg"

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full p-4 text-left"
        onClick={onToggle}
      >
        <span className="font-medium">{title}</span>
        {isOpen ? <img src={accordianOpenIcon} className='h-2 w-2' /> : <img src={accordianCloseIcon} className='h-2 w-2' />}
      </button>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
};

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full">
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

export default Accordion;