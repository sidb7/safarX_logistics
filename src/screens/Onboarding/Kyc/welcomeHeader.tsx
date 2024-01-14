import React from "react";

interface ITypesProps {
  title: string;
  content: string;
  className?: string;
  contentText?: string;
  whichAddress?: string;
  Address?: string;
}

const WelcomeHeader = (props: ITypesProps) => {
  const { title, content, className, contentText, whichAddress, Address } =
    props;

  return (
    <div
      className={` flex flex-col items-center gap-y-3 mb-11 md:my-6  ${className}`}
    >
      <p className=" font-Lato font-bold text-[22px] text-center leading-7 text-[#323232] md:mb-0">
        {title}
      </p>
      <div className="flex">
        <p className="font-light font-Open  leading-[22px] text-center  text-base text-[#494949]">
          {content}
        </p>
        <p className="font-extrabold font-Open  leading-[22px] text-center text-base text-[#323232] ml-[4px] mr-[6px] italic">
          {whichAddress}
        </p>
        <p className="font-light font-Open  leading-[22px] text-center  text-base text-[#494949]">
          {Address}
        </p>
      </div>
    </div>
  );
};

export default WelcomeHeader;
