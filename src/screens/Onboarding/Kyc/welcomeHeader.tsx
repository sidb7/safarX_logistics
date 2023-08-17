import React from "react";

interface ITypesProps {
  title: string;
  content: string;
}

const WelcomeHeader = (props: ITypesProps) => {
  const { title, content } = props;

  return (
    <div className="flex flex-col items-center gap-y-3 mt-[88px] mb-11  lg:my-6 lg:mb-6">
      <p className=" font-Lato font-bold text-[22px] text-center leading-7 text-[#323232]   lg:mb-0">
        {title}
      </p>
      <p className="font-light font-Open  leading-[22px] text-center  text-base text-[#494949]">
        {content}
      </p>
    </div>
  );
};

export default WelcomeHeader;
