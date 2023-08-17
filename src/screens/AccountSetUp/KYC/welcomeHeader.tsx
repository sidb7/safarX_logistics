import React from "react";

interface ITypesProps {
  title: string;
  content: string;
}

const WelcomeHeader = (props: ITypesProps) => {
  const { title, content } = props;

  return (
    <div className="flex flex-col items-center gap-y-3 mt-28 mb-11  lg:mb-6 lg:mt-3">
      <p className="font-bold text-[22px] text-[#323232]  mt-2 lg:mb-0">
        {title}
      </p>
      <p className="font-light text-[16px] text-[#494949]">{content}</p>
    </div>
  );
};

export default WelcomeHeader;
