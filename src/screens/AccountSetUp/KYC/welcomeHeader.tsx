import React from "react";

interface ITypesProps {
  title: string;
  content: string;
}

const WelcomeHeader = (props: ITypesProps) => {
  const { title, content } = props;

  return (
    <div className="flex flex-col items-center gap-y-4 mt-28 mb-11  ">
      <p className="font-bold text-[22px] text-[#323232] mb-4 ">{title}</p>
      <p className="font-light text-[16px] text-[#494949]">{content}</p>
    </div>
  );
};

export default WelcomeHeader;
